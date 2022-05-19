import { SHOW_ADD_CART, HIDE_ADD_CART } from '../Constants/generalConstants'

export default function cartReducer (state = {}, action) {
  switch (action.type) {
    case SHOW_ADD_CART: {
      return {
        ...state,
        show_add_animation: true
      }
    }
    case HIDE_ADD_CART: {
      return {
        ...state,
        show_add_animation: false
      }
    }
    default:
      return state
  }
}
