import React, { Component } from 'react'
import '../CSS/HomePage.css'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'
import Profile from '../Components/Profile/Profile'
import Breadcrumb from '../Components/Breadcrumb'

class ProfileView extends Component {
  render () {
    return (
      <div className='signin-container'>
        <div className='blur-bg'>
          <MenuComponent />
          <div style={{margin: '5%'}}></div>
          <Breadcrumb
            PageArr={[
              { name: 'דף הבית', url: '/' },
              { name: 'חנות המוצרים', url: '/store' },
              { name: 'פרופיל משתמש', url: '/profile' }
            ]}
          />
          <Profile />
          <Footer />
        </div>
      </div>
    )
  }
}
export default ProfileView
