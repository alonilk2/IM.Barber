import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../Actions/authActions'
import '../../CSS/SignIn.css'
import Alert from '@mui/material/Alert';
import bg from '../../Images/login-bg.png'
import useWindowSize from '../../Hooks/useWindowSize'

function ForgotPassword (props) {
  const [Email, setEmail] = useState('')
  const dispatch = useDispatch()
  const errorFromServer = useSelector(state => state.error)
  const size = useWindowSize()

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(forgotPassword(Email.toLowerCase()))
  }

  return (
    <div>
      <div id='SignIncontainer'>
        <div className='row justify-content-center'>
          <div id='SignIn'>
            {size.width > 768 && (
              <div className='col'>
                <img src={bg} width={'100%'} alt='' />
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className='col signin-form'
              autocomplete='on'
            >
              {errorFromServer === 0 && (
                <Alert severity='error' sx={{ direction: 'rtl' }}>
                  אימייל אינו רשום במערכת.
                </Alert>
              )}
              <p id='title'>שחזור סיסמה</p>
              <div className='input-field' style={{ marginBottom: '30px' }}>
                <div className='webflow-style-input-transparent'>
                  <input
                    className=''
                    type='email'
                    placeholder='הכנס את כתובת המייל'
                    required
                    onChange={e => setEmail(e.target.value)}
                  ></input>
                  <div className='inner-grad-1'> </div>
                </div>
              </div>
              <div className='row'>
                <button className='home-btn signin-custom-btn' type='submit'>
                  שלח
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ForgotPassword
