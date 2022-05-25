var router = require("express").Router(),
  multer = require("multer");

const uploadpath = "uploads";
const db = require("../../models/index.js");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadpath);
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb("Type file is not access", false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

// ------------------ GETTERS ------------------ //
router.get("/products/getproduct/:productid", async (req, res) => {
  //    By product ID
  try {
    const product = await db.producttable.findOne({
      where: { id: req.params.productid },
    });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

router.get("/products/getproduct/category/:categoryid", async (req, res) => {
  try {
    const product = await db.producttable.findAndCountAll({
      limit: 6,
      offset: req.params.pageNum,
      where: { categoryid: req.params.categoryid },
    });
    res.json({
      success: true,
      products: product,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/products/getproducts&p=:pageNum", async (req, res) => {
  try {
    const product = await db.producttable.findAndCountAll({
      limit: 6,
      offset: req.params.pageNum,
    });
    res.send({
      success: true,
      products: product,
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/products/getproducts", async (req, res) => {
  try {
    const product = await db.producttable.findAll();
    res.send({
      success: true,
      products: product,
    });
  } catch (error) {
    res.send(error);
  }
});
// ------------------ SETTERS ------------------ //

router.post(
  "/products/addproduct",
  upload.array("image", 6),
  async (req, res) => {
    try {
      await db.producttable.create(
        {
          price: req.body.price,
          producttitle: req.body.producttitle,
          brand: req.body.brand,
          categoryid: req.body.categoryid,
          imgname: req.files[0] ? req.files[0].filename : null,
          imgname2: req.files[1] ? req.files[1].filename : null,
          imgname3: req.files[2] ? req.files[2].filename : null,
          imgname4: req.files[3] ? req.files[3].filename : null,
          imgname5: req.files[4] ? req.files[4].filename : null,
          imgname6: req.files[5] ? req.files[5].filename : null,
          inStock: req.body.instock,
          description: req.body.description,
        },
        { returning: ["id"] }
      );
      res.json({
        success: true,
      });
    } catch (error) {
      res.json({
        error: error,
      });
    }
  }
);
router.post(
  "/products/updateproduct",
  upload.array("image", 6),
  async (req, res) => {
    let img;
    try {
      img = await db.producttable.findOne({
        where: { id: req.body.id },
      });
      await db.producttable.update(
        {
          price: req.body.price,
          producttitle: req.body.producttitle,
          brand: req.body.brand,
          categoryid: req.body.categoryid,
          imgname: req.files[0]
            ? req.files[0].filename
            : img.dataValues.imgname,
          imgname2: req.files[1]
            ? req.files[1].filename
            : img.dataValues.imgname2,
          imgname3: req.files[2]
            ? req.files[2].filename
            : img.dataValues.imgname3,
          imgname4: req.files[3]
            ? req.files[3].filename
            : img.dataValues.imgname4,
          imgname5: req.files[4]
            ? req.files[4].filename
            : img.dataValues.imgname5,
          imgname6: req.files[5]
            ? req.files[5].filename
            : img.dataValues.imgname6,
          inStock: req.body.instock,
          description: req.body.description,
        },
        { where: { id: req.body.id } },
        { returning: ["id"] }
      );
      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.json({
        error: error,
      });
    }
  }
);
router.post("/products/removeproduct", async (req, res) => {
  try {
    await db.producttable.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

module.exports = router;
