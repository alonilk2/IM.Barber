import Axios from 'axios'
import { history } from '../history'
import {
  ORDER_SUBMIT,
  ORDER_ERROR,
  ORDERS_FETCH_ERROR,
  ORDERS_FETCHED,
  SERVER_ADDRESS
} from '../Constants/generalConstants'

function PostOrder (cart, user, totalSum, address, paymentid, phone) {
  return dispatch => {
    Axios.post(SERVER_ADDRESS + '/postorder', {
      email: user.email,
      cart: JSON.stringify(cart),
      price: totalSum,
      paymentid: paymentid,
      phone: phone,
      address: JSON.stringify(address)
    })
      .then(function (response) {
        dispatch({ type: ORDER_SUBMIT, payload: response })
        history.push('/store/SuccessOrder')
      })
      .catch(function (error) {
        dispatch({ type: ORDER_ERROR, payload: error })
      })
  }
}
function FetchOrdersPerUser (email) {
  return dispatch => {
    Axios.post(SERVER_ADDRESS + '/getordersperuser', {
      email: email
    })
      .then(function (response) {
        dispatch({ type: ORDERS_FETCHED, payload: response })
      })
      .catch(function (error) {
        dispatch({ type: ORDERS_FETCH_ERROR, payload: error })
      })
  }
}
function FetchAllOrders () {
  return dispatch => {
    Axios.get(SERVER_ADDRESS + '/getallorders')
      .then(function (response) {
        
        dispatch({ type: ORDERS_FETCHED, payload: response })
      })
      .catch(function (error) {
        dispatch({ type: ORDERS_FETCH_ERROR, payload: error })
      })
  }
}

export { PostOrder, FetchOrdersPerUser, FetchAllOrders }
