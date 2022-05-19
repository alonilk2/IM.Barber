import React, { Component } from 'react'
import '../CSS/HomePage.css'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'
import ForgotPassword from '../Components/Authentication/ForgotPassword'
import Breadcrumb from '../Components/Breadcrumb'

class ForgotPasswordView extends Component {
  render () {
    return (
      <div className='signin-container'>
        <div className='blur-bg'>
          <MenuComponent />
          <Breadcrumb
            PageArr={[
              { name: 'דף הבית', url: '/' },
              { name: 'התחברות', url: '/signin' },
			  { name: 'שכחתי סיסמה', url: '/forgot' }

            ]}
          />
          <ForgotPassword />
          <Footer />
        </div>
      </div>
    )
  }
}
export default ForgotPasswordView
