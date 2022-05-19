import React, { Component } from 'react'
import '../CSS/HomePage.css'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'
import SignupComponent from '../Components/Authentication/Signup'
import Breadcrumb from '../Components/Breadcrumb'

class Signup extends Component {
  render () {
    return (
      <div className='signin-container'>
        <div className='blur-bg'>
          <MenuComponent />
          <Breadcrumb
            PageArr={[
              { name: 'דף הבית', url: '/' },
              { name: 'הרשמה', url: '/signup' }
            ]}
          />
          <SignupComponent />
          <Footer />
        </div>
      </div>
    )
  }
}
export default Signup
