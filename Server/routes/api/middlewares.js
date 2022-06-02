const db = require("../../models/index.js"),
  config = require("../../config/index.json"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  saltRounds = 10,
  crypto = require("crypto");

async function userMiddleware(req, res, next) {
  try {
    req.user = await db.users.findOne({
      where: { email: req.body.email },
    });

    if (!req.user) return res.json({ error: "User not found" });
    next();
  } catch (err) {
    return res.send(err);
  }
}

const hashMiddleware = async (req, res, next) => {
  bcrypt.hash(req.token, saltRounds, async function (err, hash) {
    if (err) return res.json({ error: err, status: 1 });
    !req.hash ? (req.hash = hash) : (req.hash1 = hash);
    next();
  });
};

const randomTokenMiddleware = (req, _res, next) => {
  req.token = crypto
    .randomBytes(32)
    .toString("hex")
    .replace(/[^A-Za-z0-9]/g, "");
  next();
};

const setNewPassTokenMiddleware = (req, _res, next) => {
  req.token = req.body.newpass;
  next();
};
const setPassTokenMiddleware = (req, _res, next) => {
  req.token = req.body.password;
  next();
};
const updatePasswordMiddleware = async (req, res, next) => {
  try {
    await req.user.update(
      { password: req.hash },
      {
        where: {
          email: req.body.email,
        },
      }
    );
    next();
  } catch (err) {
    res.send(err);
  }
};

const destroyTokenMiddleware = async (req, res, next) => {
  try {
    if (req.body.token) {
      let token = await db.passrecovery.findOne({
        where: {
          key: req.body.token,
        },
      });
      if (req.body.token == token.dataValues.key) {
        await db.passrecovery.destroy({
          where: {
            key: req.body.token,
          },
        });
      } else return res.json({ error: "Token not found" });
    } else
      await db.passrecovery.destroy({
        where: {
          email: req.body.email,
        },
      });
    next();
  } catch (err) {
    res.send(err);
  }
};

const saveRecoveryToken = async (req, res, next) => {
  try {
    await db.passrecovery.create({
      email: req.body.email,
      key: req.hash,
    });
    next();
  } catch (err) {
    res.send(err);
  }
};

const compareOldPassword = async (req, res, next) => {
  await bcrypt.compare(
    req.body.oldpass,
    user.dataValues.password,
    async function (err, _result) {
      if (err) return res.send(err);
      next();
    }
  );
};

const comparePassword = async (req, res, next) => {
  await bcrypt.compare(
    req.body.password,
    req.user.dataValues.password,
    async function (err, _result) {
      if (err) return res.send(err);
      next();
    }
  );
};

const validateUserActive = async (req, res, next) => {
  if (req.user.dataValues.active == false)
    return res.json({
      success: false,
      error: 1,
    });
  next();
};

const signJWT = (req, _res, next) => {
  let user = req.user;
  req.tok = jwt.sign({ user }, config.jwt, {
    expiresIn: 129600,
  });
  next();
};

module.exports = {
  userMiddleware: userMiddleware,
  hashMiddleware: hashMiddleware,
  randomTokenMiddleware: randomTokenMiddleware,
  setNewPassTokenMiddleware: setNewPassTokenMiddleware,
  updatePasswordMiddleware: updatePasswordMiddleware,
  destroyTokenMiddleware: destroyTokenMiddleware,
  saveRecoveryToken: saveRecoveryToken,
  compareOldPassword: compareOldPassword,
  comparePassword: comparePassword,
  validateUserActive: validateUserActive,
  signJWT: signJWT,
  setPassTokenMiddleware: setPassTokenMiddleware,
};
