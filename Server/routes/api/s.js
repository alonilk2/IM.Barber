
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