import React from 'react'
import '../CSS/HomePageCSS.css'
import OrderAccepted from '../Components/Store/OrderAccepted'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'
import Breadcrumb from '../Components/Breadcrumb'
function OrderAcceptedView (props) {
  return (
    <>
      <MenuComponent />
      <Breadcrumb PageArr={[
        {name: "דף הבית", url: "/"},
        {name: "חנות המוצרים", url: "/store"},
      ]} />
      <OrderAccepted />
      <Footer />
    </>
  )
}
export default OrderAcceptedView
