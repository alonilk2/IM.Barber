import React from 'react'
import '../CSS/HomePageCSS.css'
import SuccessOrder from '../Components/Store/SuccessOrder'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'
import Breadcrumb from '../Components/Breadcrumb'
function SuccessOrderView (props) {
  return (
    <>
      <MenuComponent />
      <Breadcrumb PageArr={[
        {name: "דף הבית", url: "/"},
        {name: "חנות המוצרים", url: "/store"},
      ]} />
      <SuccessOrder />
      <Footer />
    </>
  )
}
export default SuccessOrderView
