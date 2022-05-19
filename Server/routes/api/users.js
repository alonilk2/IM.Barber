var router = require('express').Router(),
  bcrypt = require('bcrypt'),
  saltRounds = 10,
  MailMessages = require('../../MailMessages'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  crypto = require('crypto')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const { transporter } = require('../../config/NodeMailerTransporter.js')
const db = require('../../models/index.js')

const handleError = (err, res) => {
  res
    .status(500)
    .contentType('text/plain')
    .end(err)
}

router.post('/forgotPass', async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: { email: req.body.email }
    })
    await db.passrecovery.destroy({
      where: {
        key: req.body.token
      }
    })
    token = crypto.randomBytes(32).toString('hex')
    bcrypt.hash(token, saltRounds, async function (err, hash) {
      try {
        const recoveryentry = await db.passrecovery.create({
          email: user.email,
          key: hash
        })
        transporter.sendMail(
          MailMessages.PasswordRecovery(req.body.email, hash),
          function (error, info) {
            if (error) {
              res.json({
                error: error,
                status: 1
              })
            } else {
              res.json({
                success: true,
                message: info
              })
            }
          }
        )
      } catch (error) {
        console.log(error)
        res.send(error)
      }
    })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

router.post('/restorepass', async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: { email: req.body.email }
    })
    await db.passrecovery.destroy({
      where: {
        key: req.body.token
      }
    })
    await bcrypt.hash(req.body.newpass, saltRounds, async function (err, hash) {
      await user.update(
        { password: hash },
        {
          where: {
            email: req.body.email
          }
        }
      )
    })
    transporter.sendMail(MailMessages.ChangedPass(req.body.email), function (
      error,
      info
    ) {
      if (error) {
        res.json({
          error: error,
          status: 1
        })
      } else {
        res.json({
          success: true,
          message: info
        })
      }
    })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

router.post('/updatePass', async (req, res) => {
  try {
    if (req.body) {
      const user = await db.users.findOne({
        where: { email: req.body.email }
      })
      await bcrypt.compare(
        req.body.oldpass,
        user.dataValues.password,
        async function (err, result) {
          if (result == true) {
            await bcrypt.hash(req.body.newpass, saltRounds, async function (
              err,
              hash
            ) {
              await user.update(
                { password: hash },
                {
                  where: {
                    email: req.body.email
                  }
                }
              )
              transporter.sendMail(MailMessages.ChangedPass(), function (
                error,
                info
              ) {
                if (error) {
                  console.log(error)
                  res.json({
                    error: error,
                    status: 0
                  })
                } else {
                  res.json({
                    success: true,
                    message: info
                  })
                }
              })
              res.json({
                success: true
              })
            })
          } else {
            res.json({
              error: err,
              success: false,
              status: 1
            })
          }
        }
      )
    } else
      res.json({
        error: 'error',
        status: 2
      })
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

router.post('/signin', async (req, res) => {
  try {
    const user = await db.users.findOne({ where: { email: req.body.email } })
    await bcrypt.compare(
      req.body.password,
      user.dataValues.password,
      async function (err, result) {
        if (result == true) {
          if (user.dataValues.active == false) {
            res.json({
              success: false,
              error: 1
            }) // 1 Means user was not activated.
          } else {
            let tok = jwt.sign({ user }, 'manyplacees are awsome 4now', {
              expiresIn: 129600
            })
            res.json({
              success: true,
              error: null,
              user: user,
              tok
            })
          }
        } else res.json({ error: err }) // 0 Means user not found.
      }
    )
  } catch (error) {
    res.json({
      success: false,
      error: error,
      code: 2
    })
  }
})

router.post('/signup', async (req, res) => {
  try {
    if (req.body) {
      await bcrypt.hash(req.body.password, saltRounds, async function (
        err,
        hash
      ) {
        token = crypto.randomBytes(32).toString('hex')
        await bcrypt.hash(token, saltRounds, async function (err, hashtok) {
          const [user, created] = await db.users.findOrCreate({
            where: { email: req.body.email },
            defaults: {
              email: req.body.email,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              password: hash,
              active: 0,
              isAdmin: req.body.isadmin,
              token: hashtok
            }
          })
          if (created) {
            transporter.sendMail(
              MailMessages.Activate(user, token, req.body.email),
              function (error, info) {
                if (error) {
                  res.json({
                    error: error,
                    status: 1
                  })
                } else {
                  res.json({
                    success: true,
                    message: info,
                    user: user
                  })
                }
              }
            )
          } else
            res.json({
              success: false,
              error: 0 // 0 Means user already registered.
            })
        })
      })
    } else
      res.json({
        success: false,
        error: 1 // 1 Means no request body
      })
  } catch (err) {
    console.log(err)
    res.json({
      success: false,
      error: err
    })
  }
})

router.post('/approve_user', async (req, res) => {
  try {
    const userId = req.body.userid
    const token = req.body.token
    const user = await db.users.findOne({ where: { id: userId } })
    if (user) {
      try {
        await bcrypt.compare(token, user.token, async function (
          error1,
          result
        ) {
          if (result) {
            await db.users.update(
              { active: 1 },
              { where: { email: user.email } }
            )
            res.json({ success: true })
          } else {
            console.log(error1)
            res.json({ success: false, error: 1 })
          }
        })
      } catch (error0) {
        console.log(error0)
        res.json({ success: false, error: 2 })
      }
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, error: 3 })
  }
})

router.post('/sendmail', async (req, res) => {
  transporter.sendMail(MailMessages.Contact(req.body.mailContent), function (
    error,
    info
  ) {
    console.log(req.body.mailContent)
    if (error) {
      console.log(error)
      res.json({
        error: error,
        status: 1
      })
    } else {
      res.json({
        success: true,
        message: info
      })
    }
  })
})
module.exports = router
