var router = require("express").Router();

const db = require("../../models/index.js");

// ------------------ GETTERS ------------------ //

router.get("/coupons/getcoupons", async (req, res) => {
  try {
    const coupons = await db.coupons.findAll();
    res.send(coupons);
  } catch (error) {
    res.json({
      success: false,
    });
  }
});


router.post("/coupons/testcoupon", async (req, res) => {
  try {
    const coupon = await db.coupons.findOne({
      where: {
        code: req.body.code,
      },
    });
    res.json({
      coupon: coupon,
      success: true
    });
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
    });
  }
});

// ------------------ SETTERS ------------------ //

router.post("/coupons/addcoupon", async (req, res) => {
  try {
    console.log(req)
    const coupon = await db.coupons.create(
      {
        code: req.body.code,
        discount: req.body.discount,
        expiredate: req.body.date,
      },
      { returning: ["id"] }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
});

router.post("/coupons/removecoupon", async (req, res) => {
  try {
    const coupon = await db.coupons.destroy(
      {
        where: {
          code: req.body.code,
        },
      },
      { returning: ["id"] }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
});

module.exports = router;
