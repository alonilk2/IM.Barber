import React, { Component } from 'react'
import '../CSS/HomePage.css'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'
import SigninComponent from '../Components/Authentication/Signin'
import Breadcrumb from '../Components/Breadcrumb'

class Signin extends Component {
  render () {
    return (
      <div className='signin-container'>
        <div className='blur-bg'>
          <MenuComponent />
          <Breadcrumb
            PageArr={[
              { name: 'דף הבית', url: '/' },
              { name: 'התחברות', url: '/signin' },
            ]}
          />
          <SigninComponent />
          <Footer />
        </div>
      </div>
    )
  }
}
export default Signin
