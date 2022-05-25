var router = require("express").Router(),
  bcrypt = require("bcrypt"),
  saltRounds = 10,
  MailMessages = require("../../MailMessages"),
  bodyParser = require("body-parser"),
  middlewares = require("./middlewares"),
  crypto = require("crypto");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { transporter } = require("../../config/NodeMailerTransporter.js");
const db = require("../../models/index.js");

router.post(
  "/forgotPass",
  middlewares.destroyTokenMiddleware,
  middlewares.userMiddleware,
  middlewares.randomTokenMiddleware,
  middlewares.hashMiddleware,
  middlewares.saveRecoveryToken,
  (req, res) => {
    try {
      transporter.sendMail(
        MailMessages.PasswordRecovery(req.body.email, req.hash),
        function (error, info) {
          if (error) {
            return res.json({
              error: error,
              status: 1,
            });
          }
          res.json({
            success: true,
          });
        }
      );
    } catch (error) {
      res.send(error);
    }
  }
);

router.post(
  "/restorepass",
  middlewares.userMiddleware,
  middlewares.destroyTokenMiddleware,
  middlewares.setNewPassTokenMiddleware,
  middlewares.hashMiddleware,
  middlewares.updatePasswordMiddleware,
  (req, res) => {
    try {
      transporter.sendMail(
        MailMessages.ChangedPass(req.body.email),
        function (error, info) {
          if (error) {
            res.json({
              error: error,
              status: 1,
            });
          }
          res.json({
            success: true,
            message: info,
          });
        }
      );
    } catch (error) {
      res.send(error);
    }
  }
);

router.post(
  "/updatePass",
  middlewares.userMiddleware,
  middlewares.compareOldPassword,
  middlewares.setNewPassTokenMiddleware,
  middlewares.hashMiddleware,
  middlewares.updatePasswordMiddleware,
  (req, res) => {
    try {
      transporter.sendMail(MailMessages.ChangedPass(), (error, info) => {
        if (error)
          res.json({
            error: error,
            status: 0,
          });
        res.json({
          success: true,
          message: info,
        });
      });
    } catch (err) {
      res.send(err);
    }
  }
);

router.post(
  "/signin",
  middlewares.userMiddleware,
  middlewares.comparePassword,
  middlewares.validateUserActive,
  middlewares.signJWT,
  (req, res) => {
    res.json({
      success: true,
      error: null,
      user: req.user,
      tok: req.tok,
    });
  }
);

router.post(
  "/signup",
  middlewares.setPassTokenMiddleware,
  middlewares.hashMiddleware,
  middlewares.randomTokenMiddleware,
  middlewares.hashMiddleware,
  async (req, res) => {
    try {
      const [user, created] = await db.users.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: req.hash,
          active: 0,
          isAdmin: req.body.isadmin,
          token: req.hash1,
        },
      });
      if (created) {
        transporter.sendMail(
          MailMessages.Activate(user, req.token, req.body.email),
          (error, info) => {
            if (error)
              res.json({
                error: error,
                status: 1,
              });
            res.json({
              success: true,
              message: info,
              user: user,
            });
          }
        );
      } else
        res.json({
          success: false,
          error: 0, // 0 Means user already registered.
        });
    } catch (err) {
      res.json({
        success: false,
        error: err,
      });
    }
  }
);

router.post("/approve_user", async (req, res) => {
  try {
    const userId = req.body.userid;
    const token = req.body.token;
    const user = await db.users.findOne({ where: { id: userId } });
    if (user) {
      try {
        await bcrypt.compare(
          token,
          user.token,
          async function (error1, result) {
            if (result) {
              await db.users.update(
                { active: 1 },
                { where: { email: user.email } }
              );
              res.json({ success: true });
            } else {
              res.json({ success: false, error: 1 });
            }
          }
        );
      } catch (error0) {
        res.json({ success: false, error: 2 });
      }
    }
  } catch (error) {
    res.json({ success: false, error: 3 });
  }
});

router.post("/sendmail", async (req, res) => {
  transporter.sendMail(
    MailMessages.Contact(req.body.mailContent),
    function (error, info) {
      if (error) {
        res.json({
          error: error,
          status: 1,
        });
      }
      res.json({
        success: true,
        message: info,
      });
    }
  );
});
module.exports = router;
