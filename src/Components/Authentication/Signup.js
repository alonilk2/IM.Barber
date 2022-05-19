import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../Actions/authActions'
import '../../CSS/SignIn.css'
import bg from '../../Images/login-bg.png'
import useWindowSize from '../../Hooks/useWindowSize'
import Alert from '@mui/material/Alert';

function SignupComponent (props) {
  const [Email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [firstname, setFirstName] = useState('[empty]')
  const [lastname, setLastName] = useState('false')
  const dispatch = useDispatch()
  const errorFromServer = useSelector(state => state.user.error)
  const size = useWindowSize()

  const handleSubmit = event => {
    event.preventDefault()
    if (ValidateEmail(Email.toLowerCase()) && checkPwd(password)) {
      dispatch(signup(Email.toLowerCase(), password, firstname, lastname))
    } else {
      return false
    }
  }

  function ValidateEmail (mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(
        mail
      )
    )
      return true
    else if (
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\.[a-zA-Z0-9-]+)$/.test(
        mail
      )
    )
      return true
    alert('האימייל שהוזן אינו חוקי')
    return false
  }
  function checkPwd (str) {
    if (str.length < 6 || str.search(/\d/) === -1 || str.search(/[a-zA-Z]/) === -1) {
      alert('הסיסמה חייבת להכיל לפחות שישה תווים, ביניהם אותיות באנגלית ומספרים')
      return false
    } 
    return true
  }

  return (
    <div>
      <div id='SignIncontainer'>
        <div className='row justify-content-center'>
          <div id='SignIn'>
            {size.width > 768 ? (
              <div className='col'>
                <img src={bg} width={'100%'} alt=''/>
              </div>
            ) : null}
            <form
              onSubmit={handleSubmit}
              className='col signin-form'
              autocomplete='on'
            >
              {errorFromServer === 0 && (
                <Alert severity="error" sx={{direction: 'rtl'}}>אימייל זה כבר רשום במערכת.</Alert>
              )}
              <p id='title'>הרשמה</p>
              <div className='webflow-style-input-transparent'>
                <input
                  id='Firstname'
                  type='text'
                  required
                  onChange={e => setFirstName(e.target.value)}
                  placeholder='שם פרטי'
                  aria-label='Fullname'
                  aria-describedby='basic-addon1'
                ></input>
                <div className='inner-grad-1'> </div>
              </div>
              <div className='webflow-style-input-transparent'>
                <input
                  id='Lastname'
                  type='text'
                  required
                  onChange={e => setLastName(e.target.value)}
                  placeholder='שם משפחה'
                  aria-label='Lastname'
                  aria-describedby='basic-addon1'
                ></input>
                <div className='inner-grad-1'> </div>
              </div>
              <div className='webflow-style-input-transparent'>
                <input
                  id='email'
                  type='text'
                  required
                  onChange={e => setEmail(e.target.value)}
                  placeholder='אימייל'
                  aria-label='user name or email'
                  aria-describedby='basic-addon1'
                ></input>
                <div className='invalid-feedback'>בחר אימייל.</div>
                <div className='inner-grad-1'> </div>
              </div>
              <div className='webflow-style-input-transparent'>
                <input
                  id='password'
                  type='password'
                  required
                  onChange={e => setPassword(e.target.value)}
                  placeholder='סיסמה'
                  aria-label='password:'
                  aria-describedby='basic-addon2'
                ></input>
                <div className='invalid-feedback'>
                  Please enter your password.
                </div>
                <div className='inner-grad-1'> </div>
              </div>
              <div className='row'>
                <button
                  className='signin-custom-btn signup-btn home-btn '
                  type='submit'
                >
                  הרשמה
                </button>
              </div>
              <div className='row'>
                <div className='need-acc-txt'>
                  כבר רשום אצלנו ?{' '}
                  <a href='/Signin'>
                    <b>התחבר</b>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignupComponent
