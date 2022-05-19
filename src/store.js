import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './Reducers/authReducer'
import generalReducer from './Reducers/generalReducer'
import searchReducer from './Reducers/searchReducer'
import ordersReducer from './Reducers/ordersReducer'
import cartReducer from './Reducers/cartReducer'

import Cookie from 'js-cookie'

const user = Cookie.getJSON('userInstance') || null
var initialState
if (user) {
  initialState = {
    loggedin: true,
    user: user,
    cart: {
      show_add: false
    }
  }
} else {
  initialState = {
    cart: {
      show_add: false
    }
  }
}
const Red = combineReducers({
  user: authReducer,
  general: generalReducer,
  orders: ordersReducer,
  search: searchReducer,
  cart: cartReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  Red,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
)

export default store
