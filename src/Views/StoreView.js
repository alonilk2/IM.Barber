import React from 'react'
import '../CSS/HomePageCSS.css'
import Store from '../Components/Store'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'

function StoreView (props) {
  return (
    <>
      <MenuComponent />
      <Store cid={props.match?.params?.cid}/>
      <Footer />
    </>
  )
}
export default StoreView
