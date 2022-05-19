import {
  DISPLAY_CATEGORY,
  DISPLAY_CONTACT,
  HIDE_CATEGORY
} from '../Constants/generalConstants'

export default function generalReducer (state = {}, action) {
  switch (action.type) {
    case DISPLAY_CATEGORY: {
      return {
        ...state,
        category: action.payload
      }
    }
    case HIDE_CATEGORY: {
      return {
        ...state,
        category: null
      }
    }
    case DISPLAY_CONTACT: {
      return {
        ...state,
        contact: true
      } 
    }
    default:
      return state
  }
}

