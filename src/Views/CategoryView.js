import React from 'react'
import '../CSS/HomePageCSS.css'
import Product from '../Components/Store/Product'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'

function CategoryView (props) {
  return (
    <>
      <MenuComponent />
      <Product pid={props.match.params.pid}/>
      <Footer />
    </>
  )
}
export default CategoryView
