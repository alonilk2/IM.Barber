import React from 'react'
import '../CSS/HomePageCSS.css'
import Academy from '../Components/Academy'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'

function AcademyView (props) {
  return (
    <>
      <MenuComponent />
      <Academy />
      <Footer />
    </>
  )
}
export default AcademyView
