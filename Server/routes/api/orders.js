var router = require("express").Router(),
  bodyParser = require("body-parser"),
  MailMessages = require("../../MailMessages");

const db = require("../../models/index.js");
const { transporter } = require("../../config/NodeMailerTransporter.js");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/postorder", async (req, res) => {
  try {
    const result = await db.orders.create(
      {
        email: req.body.email,
        cart: req.body.cart,
        price: req.body.price,
        paymentid: req.body.paymentid,
        address: req.body.address,
        phone: req.body.phone,
        shipped: false,
      },
      { returning: ["id", "email", "cart", "price", "address"] }
    );
    transporter.sendMail(MailMessages.NewOrder(result), function (error, info) {
      if (error) {
        res.json({
          error: error,
          status: 1,
        });
      } else {
        res.json({
          success: true,
          message: info,
          user: user,
        });
      }
    });
    res.json({
      success: true,
      result: result,
    });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

router.post("/getordersperuser", async (req, res) => {
  try {
    const result = await db.orders.findAll({
      where: {
        email: req.body.email,
      },
    });
    res.json({
      success: true,
      result: result,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

router.get("/getallorders", async (req, res) => {
  try {
    const result = await db.orders.findAll({
      include: [{ model: db.users, as: "owner" }],
    });
    res.json({
      success: true,
      result: result,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

router.post("/shiporder", async (req, res) => {
  try {
    const result = await db.orders.update(
      {
        shipped: true,
      },
      {
        where: {
          id: req.body.order,
        },
      }
    );
    res.json({
      success: true,
      result: result,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

module.exports = router;
