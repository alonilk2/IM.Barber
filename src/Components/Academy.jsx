import React, { useEffect, useState } from 'react'
import '../CSS/Store.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Axios from 'axios'
import { SERVER_ADDRESS } from '../Constants/generalConstants'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import { Helmet } from 'react-helmet'

export default function Academy () {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  async function handleSubmit () {
    const mailContent = {
      name: name,
      email: email,
      content: content,
      phone: phone
    }
    try {
      let response = await Axios.post(SERVER_ADDRESS + '/sendmail', {
        mailContent
      })
      if (response) {
        console.log(response)
        if (response.data.success) alert('פנייתך נתקבלה בהצלחה. תודה ולהתראות.')
      } else console.log('Error: could not fetch posts list from server.')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='academy-container'>
            <Helmet>
        <title>I.M Academy - האקדמיה לספרות</title>‍
        <meta
          name='description'
          content='האקדמיה לספרות של I.M Barber - תמיד חלמת להיות ספר גברים ? בוא להגשים אותו עכשיו!'
        />
      </Helmet>
      <h1 style={{ width: '100%', textAlign: 'center' }}>
        {' '}
        האקדמיה לספרות <span className='academy-beauty'> IM.Academy </span>{' '}
      </h1>
      <div className='about'>
        <h4 className='academy-beauty sub-title'>על האקדמיה</h4>
        <p className='acadeny-body'>
          תמיד חלמת להיות ספר גברים ? זה הזמן להפוך את החלום למציאות.
          <br />
          אנו מציעים לכם להתחיל קריירה בתור Barber מקצועי, עם הדרכה צמודה במסגרת
          קורס מקיף. <br />
          חושבים שהגיע זמנכם להיות הדור הבא של הBarber's בישראל ? צרו איתנו קשר
          ותתחילו לגזור! <br />
        </p>
        <div className='space'></div>
        <h4 className='academy-beauty sub-title'>איך זה מתנהל?</h4>
        <p className='acadeny-body'>
          תכנית הקורס של <span className='academy-beauty'> IM.Academy </span>{' '}
          כוללת עשרה שיעורים, חלקם עיוניים וחלקם עם התנסויות מעשיות ומפוקחות,{' '}
          <br />
          המבטיחים ליווי והכוונה צמודה לכל תלמיד. אנחנו מאמינים כי אין תחליף
          להתנסות מעשית עקבית, <br /> ולכן במהלך הקורס, כל תלמיד יתנסה על מספר
          רב של דוגמנים ומודלים אמיתיים ויצבור נסיון במגוון סגנונות והעדפות.
        </p>
        <div className='space'></div>
        <h4 className='academy-beauty sub-title'>מה מקבלים?</h4>
        <p className='acadeny-body'>
          מעבר להתנסות המעשית וצבירת הניסיון, בתום הקורס לכל תלמיד תוענק ערכת
          BARBER (עיצוב שיער לגברים) מקצועית <br />
          ותעודת הכשרה בתחום עיצוב השיער לגבר.
        </p>
        <div className='space'></div>
        <h4 className='academy-beauty sub-title'>השתכנעת?</h4>
        <p className='acadeny-body'>
          זה הזמן לבנות קריירה. צור קשר עוד היום וקבל פרטים על המחזור הבא של{' '}
          <span className='academy-beauty'>IM.Academy</span>
        </p>
      </div>
      <h4 className='academy-beauty sub-title'>צור קשר</h4>
      <div className='col academy-contact-container'>
        <InputGroup className='mb-3'>
          <FormControl
            className='input-contact'
            placeholder='שם מלא'
            aria-label='Username'
            aria-describedby='basic-addon1'
            onChange={e => setName(e.target.value)}
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <FormControl
            className='input-contact'
            placeholder='כתובת אימייל'
            aria-label="Recipient's username"
            aria-describedby='basic-addon2'
            onChange={e => setEmail(e.target.value)}
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <FormControl
            className='input-contact'
            placeholder='מספר פלאפון'
            aria-label="Recipient's username"
            aria-describedby='basic-addon2'
            onChange={e => setPhone(e.target.value)}
          />{' '}
        </InputGroup>

        <InputGroup>
          <FormControl
            className='input-contact field'
            as='textarea'
            aria-label='With textarea'
            placeholder='מה תרצה לשאול?'
            onChange={e => setContent(e.target.value)}
          />
        </InputGroup>
        <button onClick={handleSubmit} className='submit-btn'>
          שליחה
        </button>
      </div>
    </div>
  )
}
