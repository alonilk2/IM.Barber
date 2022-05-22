var router = require("express").Router();

const db = require("../../models/index.js");

// ------------------ GETTERS ------------------ //

router.post("/coupon/testcoupon", async (req, res) => {
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
    res.json({
      success: false,
    });
  }
});

// ------------------ SETTERS ------------------ //

router.post("/coupon/addcoupon", async (req, res) => {
  try {
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

router.post("/coupon/removecoupon", async (req, res) => {
  try {
    const coupon = await db.coupon.destroy(
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
