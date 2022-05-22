import {
  SHOW_ADD_CART,
  HIDE_ADD_CART,
  COUPON_FALSE,
  COUPON_TRUE,
} from "../Constants/generalConstants";

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case SHOW_ADD_CART: {
      return {
        ...state,
        show_add_animation: true,
      };
    }
    case HIDE_ADD_CART: {
      return {
        ...state,
        show_add_animation: false,
      };
    }
    case COUPON_FALSE: {
      return {
        ...state,
        success: false,
        error: action.payload,
      };
    }
    case COUPON_TRUE: {
      return {
        ...state,
        success: true,
        coupon: action.payload,
        error: false
      };
    }
    default:
      return state;
  }
}
