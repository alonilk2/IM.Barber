import {
  ORDER_SUBMIT,
  ORDER_ERROR,
  ORDERS_FETCHED,
  ORDERS_FETCH_ERROR
} from '../Constants/generalConstants'

export default function ordersReducer (state = {}, action) {
  switch (action.type) {
    case ORDER_SUBMIT: {
      return {
        success: true,
        orderId: action.payload
      }
    }
    case ORDER_ERROR: {
      return {
        error: action.payload
      }
    }
    case ORDERS_FETCHED: {
      return {
        ...state,
        success: true,
        orders: action.payload
      }
    }
    case ORDERS_FETCH_ERROR: {
      return {
        error: action.payload
      }
    }
    default:
      return state
  }
}
