import {
  USER_SIGNIN_ATTEMPT,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILED,
  USER_SIGNUP_ATTEMPT,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  USER_SIGNOUT_SUCCESS,
  SIGNIN_AS_ADMIN
} from '../Constants/userConst'

export default function authReducer (state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_ATTEMPT: {
      return {
        ...state, 
        logging: true
      }
    }
    case USER_SIGNIN_SUCCESS: {
      return {
        ...state, 
        logging: false,
        loggedin: true,
        user: action.payload
      }
    }
    case USER_SIGNIN_FAILED: {
      return {
        ...state, 
        logging: false,
        loggedin: false,
        error: action.payload
      }
    }
    case USER_SIGNUP_ATTEMPT: {
      return {
        registering: true
      }
    }
    case USER_SIGNUP_SUCCESS: {
      return {
        registering: false,
        loggedin: true,
        user: action.payload
      }
    }
    case USER_SIGNUP_FAILED: {
      return {
        registering: false,
        loggedin: false,
        error: action.payload
      }
    }
    case USER_SIGNOUT_SUCCESS: {
      return {
        loggedin: false,
        user: null,
        error: null
      }
    }
    case SIGNIN_AS_ADMIN: {
      return {
        ...state, 
        admin: true
      }
    }
    default: {
      return state
    }
  }
}
