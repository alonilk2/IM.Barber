var router = require('express').Router(),
  multer = require('multer')


const uploadpath = 'categories'
const db = require('../../models/index.js')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadpath)
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (_req, file, cb) => {
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

router.get('/category/getcategories', async (_req, res) => {
  try {
    const categoryarr = await db.categories.findAll()
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
  async (_req, res) => {
    try {
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
router.post('/category/removecategory', async (_req, res) => {
  try {
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
