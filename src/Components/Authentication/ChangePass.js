import '../../CSS/SignIn.css'
import bg from '../../Images/login-bg.png'
import useWindowSize from '../../Hooks/useWindowSize'
import { restorePass } from '../../Actions/authActions'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

function ChangePass (props) {
  const dispatch = useDispatch()
  const size = useWindowSize()
  const [Password, setPassword] = useState()
  const [Password1, setPassword1] = useState()

  const handleSubmit = event => {
    event.preventDefault()
    if (Password === Password1)
      dispatch(restorePass(props.email, props.token, Password))
    else alert('הסיסמאות שהוזנו לא זהות.')
  }

  return (
    <div>
      <div id='SignIncontainer'>
        <div className='row justify-content-center'>
          <div id='SignIn'>
            {size.width > 768 && (
              <div className='col'>
                <img src={bg} width={'100%'} alt=''/>
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className='col signin-form'
              autocomplete='on'
            >
              <p id='title'>שינוי סיסמה</p>
              <div className='input-field'>
                <div className='webflow-style-input-transparent'>
                  <input
                    className=''
                    type='password'
                    placeholder='סיסמה'
                    required
                    onChange={e => setPassword(e.target.value)}
                  ></input>
                  <button type='submit'>
                    <i className='icon ion-android-arrow-forward'></i>
                  </button>
                  <div className='inner-grad-1'> </div>
                </div>
              </div>
              <div className='input-field'>
                <div className='webflow-style-input-transparent'>
                  <input
                    className=''
                    type='password'
                    placeholder='שוב אותה סיסמה'
                    required
                    onChange={e => setPassword1(e.target.value)}
                  ></input>
                  <button type='submit'>
                    <i className='icon ion-android-arrow-forward'></i>
                  </button>
                  <div className='inner-grad-1'> </div>
                </div>
              </div>
              <div className='row'>
                <button className='home-btn signin-custom-btn' type='submit' style={{marginTop: '5%'}}>
                  שנה סיסמה
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChangePass
