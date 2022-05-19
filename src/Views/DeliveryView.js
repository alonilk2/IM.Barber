import React from 'react'
import '../CSS/HomePageCSS.css'
import Delivery from '../Components/Store/Delivery'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'
import Breadcrumb from '../Components/Breadcrumb'
import { useLocation } from 'react-router-dom'
function DeliveryView (props) {
  const location = useLocation()
  return (
    <>
      <MenuComponent />
      <div style={{ paddingTop: '5%' }}></div>
      <Breadcrumb
        PageArr={[
          { name: 'דף הבית', url: '/' },
          { name: 'חנות המוצרים', url: '/store' },
          { name: 'סל הקניות', url: '/cart' },
          { name: 'משלוח וסליקה', url: '/delivery' },
        ]}
      />

      <Delivery />
      <Footer />
    </>
  )
}
export default DeliveryView
