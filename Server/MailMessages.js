
exports.Activate = (user, token, email) => {
  return {
    from: 'idan@imbarber.com',
    to: email,
    subject: 'ברוכים הבאים לIM.Barber ! אימות כתובת אימייל',
    html:
      '<h4><b>ברוכים הבאים לIM.Barber ! </b></h4>' +
      '<p>על מנת לאמת את זהותכם ולאשר את חשבונכם, אנא הכנסו לקישור הבא:</p>' +
      '<a href=https://imbarber.com/activate/' +
      user.id +
      '/' +
      token +
      '>' +
      'https://imbarber.com/activate/' +
      user.id +
      '/' +
      token +
      '</a>' +
      '<br><br>' +
      '<p>--Team</p>'
  }
}
exports.ChangedPass = (email) => {
  return {
    from: 'idan@barberidan1.herokuapp.com',
    to: email,
    subject: 'סיסמתך לאתר של IM.Barber שונתה',
    text: `סיסמתך לאתר IM.Barber שונתה בהצלחה.
  באם השינוי לא בוצע לבקשתך, יש ליצור עמנו קשר במיידי.`
  }
}
exports.NewOrder = order => {
  let cart = JSON.parse(order.cart)
  let address = JSON.parse(order.address)
  const map = cart.map(product => {
    return `<tr style='height: 18px'>
        <td style='width: 33.3333%; height: 18px;'>${product.price}</td>
        <td style='width: 33.3333%; height: 18px;'>${product.brand}</td>
        <td style='width: 33.3333%; height: 18px;'>${product.producttitle}</td>
      </tr>`
  })
  return {
    from: 'idan@imbarber.com',
    to: order.email,
    subject: 'התקבלה הזמנה חדשה בIM.Barber!',
    html: `<p style="text-align: center;"><img src="https://alonilk2.github.io/map1/logo.svg" alt="" width="300" height="105" /></p>
        <p style="text-align: right;">שלום ${address.firstname +
          ' ' +
          address.lastname}  ! התקבלה הזמנה חדשה. תודה על בחירתך בנו !<br />מס' הזמנה: ${
      order.id
    }<br />פירוט הזמנה:</p>
        <table style="border-collapse: collapse; width: 100%; height: 36px;" border="1">
        <tbody>
        <tr style="height: 18px;">
        <td style="width: 33.3333%; text-align: center; height: 18px;">מחיר</td>
        <td style="width: 33.3333%; text-align: center; height: 18px;">מותג</td>
        <td style="width: 33.3333%; text-align: center; height: 18px;">שם המוצר</td>
        </tr>
        ${map}
        </tbody>
        </table>
        <table style="border-collapse: collapse; width: 33.5773%; height: 42px;" border="1">
        <tbody>
        <tr>
        <td style="width: 50%;">₪20</td>
        <td style="width: 27.1242%;">עלות המשלוח</td>
        </tr>
        <tr>
        <td style="width: 50%;">${order.price}</td>
        <td style="width: 27.1242%;">סה"כ לתשלום</td>
        </tr>
        </tbody>
        </table>
        <p style="text-align: right;">&nbsp;</p>
        <p style="text-align: right;">כתובת למשלוח:</p>
        <p style="text-align: right;">${address.street +
          ' ' +
          address.house +
          ' ' +
          address.city +
          ' ' +
          address.zip}</p>`
  }
}
exports.PasswordRecovery = (email, key) => {
  return {
    from: 'idan@imbarber.com',
    to: email,
    subject: 'Reset Password',
    html:
      '<h4><b>Reset Password</b></h4>' +
      '<p>To reset your password, complete this form:</p>' +
      '<a href=https://imbarber.com/reset/' +
      email +
      '/' +
      key +
      '>' +
      'https://imbarber.com/reset/' +
      email +
      '/' +
      token +
      '</a>' +
      '<br><br>' +
      '<p>--Team</p>'
  }
}

exports.Contact = contact => {
  return {
    from: 'idan@imbarber.com',
    to: 'imbarberil2@gmail.com',
    subject: `התקבלה הודעה חדשה מלקוח ${contact.name} IM.Academy`,
    html: `<p style="text-align: center;"><img src="https://alonilk2.github.io/map1/logo.svg" alt="" width="300" height="105" /></p>
            <p> אימייל: ${contact.email} <br />
                פלאפון: ${contact.phone} <br />
                תוכן ההודעה: ${contact.content}
            </p>`
  }
}
// const ResetPassword = {
//   from: 'idan@imbarber.com',
//   to: req.body.email,
//   subject: 'Reset Password',
//   html:
//     '<h4><b>Reset Password</b></h4>' +
//     '<p>To reset your password, complete this form:</p>' +
//     '<a href=https://imbarber.com/reset/' +
//     user.id +
//     '/' +
//     token +
//     '>' +
//     'https://imbarber.com/reset/' +
//     user.id +
//     '/' +
//     token +
//     '</a>' +
//     '<br><br>' +
//     '<p>--Team</p>'
// }
