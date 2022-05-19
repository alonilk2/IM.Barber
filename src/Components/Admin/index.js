import React, { Component, useState } from 'react'
import { useDispatch } from 'react-redux'
import { history } from '../../history'
import '../../CSS/HomePageCSS.css'
import Accordion from 'react-bootstrap/Accordion'
import ProductsManagement from './ProductsManagement'
import OrdersManagement from './OrdersManagement'
import OrdersSummery from './OrdersSummery'
import useOrders from '../../Hooks/useOrders'
import useUser from '../../Hooks/useUser'
import CategoryManagement from './CategoryManagement'
import { SIGNIN_AS_ADMIN } from '../../Constants/userConst'

function AdminComponent (props) {
  const [ordersList, newOrdersCounter] = useOrders()
  const user = useUser()
  const dispatch = useDispatch()
  function renderByPermission () {
    if (user) {
      if (user.data.user.isadmin === true) {
        return (
          <>
            <h1 className='title'> ברוך הבא לפאנל הניהול !</h1>
            <OrdersSummery newOrdersCounter={newOrdersCounter} />
            <Accordion>
              <ProductsManagement />
              <CategoryManagement />
              <OrdersManagement />
            </Accordion>
          </>
        )
      } else {
        history.push('/')
      }
    } else {
      history.push('/signin')
      dispatch({type: SIGNIN_AS_ADMIN})
    }
  }
  return <div className='content-container admin'>{renderByPermission()}</div>
}
export default AdminComponent
