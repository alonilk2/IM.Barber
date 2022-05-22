var router = require('express').Router(),
  multer = require('multer')


const uploadpath = 'categories'

const db = require('../../models/index.js')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadpath)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb('Type file is not access', false)
  }
}

const upload = multer({
  storage,
  fileFilter
})

// ------------------ GETTERS ------------------ //

router.get('/category/getcategories', async (req, res) => {
  try {
    const categoryarr = await db.categories.findAll()
    console.log(categoryarr)
    res.send(categoryarr)
  } catch (error) {
    console.log(error)
    res.json({
      success: false
    })
  }
})

// ------------------ SETTERS ------------------ //

router.post(
  '/category/addcategory',
  upload.single('image'),
  async (req, res) => {
    try {
      const product = await db.categories.create(
        {
          categoryid: req.body.categoryid,
          imgname: req.body.imgname
        },
        { returning: ['id'] }
      )
      res.json({
        success: true
      })
    } catch (error) {
      console.log(error)
      res.json({
        success: false
      })
    }
  }
)
router.post(
  '/category/updatecategory',
  upload.single('image'),
  async (req, res) => {
    console.log(req)
    let img, prevname
    try {
      img = await db.categories.findOne({
        where: { id: req.body.id }
      })
      prevname = img.dataValues.categoryid
      const category = await db.categories.update(
        {
          categoryid: req.body.categoryid,
          imgname: req.body.imgname ? req.body.imgname : img.dataValues.imgname
        },
        { where: { id: req.body.id } },
        { returning: ['id'] }
      )
      const result = await db.producttable.update(
        {
          categoryid: req.body.categoryid
        },
        {
          where: { categoryid: prevname }
        },
        { returning: ['id'] }
      )

      res.json({
        success: true
      })
    } catch (error) {
      console.log(error)
      res.json({
        success: false
      })
    }
  }
)
router.post('/category/removecategory', async (req, res) => {
  try {
    const product = await db.categories.destroy(
      {
        where: {
          categoryid: req.body.categoryid
        }
      },
      { returning: ['id'] }
    )
    res.json({
      success: true
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false
    })
  }
})
module.exports = router
