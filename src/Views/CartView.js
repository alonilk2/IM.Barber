import React from 'react'
import '../CSS/HomePageCSS.css'
import Cart from '../Components/Store/Cart'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'
import Breadcrumb from '../Components/Breadcrumb'

function CartView (props) {
  return (
    <div>
      <MenuComponent />
      <div style={{ margin: '5%' }}></div>

      <Breadcrumb
        PageArr={[
          { name: 'דף הבית', url: '/' },
          { name: 'חנות המוצרים', url: '/store' },
          { name: 'סל הקניות', url: '/cart' }
        ]}
      />
      <Cart />
      <Footer />
    </div>
  )
}
export default CartView
