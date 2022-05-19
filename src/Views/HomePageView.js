import React, { useRef } from 'react'
import '../CSS/HomePageCSS.css'
import HomeComponent from '../Components/HomeComponent'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'

function HomeView (props) {
  const ContactRef = useRef()

  return (
    <div style={{height: "100%"}}>
      <MenuComponent ref={ContactRef}/>
      <HomeComponent ref={ContactRef}/>
      <Footer />
    </div>
  )
}
export default HomeView
