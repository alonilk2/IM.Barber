import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import AdminView from './Views/AdminView'
import Store from './Views/StoreView'
import Signin from './Views/Signin'
import Signup from './Views/Signup'
import Cart from './Views/CartView'
import Delivery from './Views/DeliveryView'
import Profile from './Views/ProfileView'
import SuccessOrder from './Views/SuccessOrderView'
import Academy from './Views/AcademyView'
import ApproveView from './Views/ApproveView'
import ChangePassView from './Views/ChangePassView'
import ForgotView from './Views/ForgotPassView'
import productView from './Views/ProductView'

import { initialOptions } from './Constants/generalConstants'
import * as serviceWorker from './serviceWorker'
import { Router, Route, Switch } from 'react-router-dom'
import { history } from './history'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import { Provider } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import ScrollToTop from './ScrollToTop'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider options={initialOptions}>
        <Router history={history}>
          <ScrollToTop />
          <Switch>
            <Route exact path='/' component={App} />
            <Route path='/admin' component={AdminView} />
            <Route path='/delivery' component={Delivery} />
            <Route path='/cart' component={Cart} />
            <Route path='/store/SuccessOrder' component={SuccessOrder} />
            <Route path='/store' component={Store} />
            <Route path='/Signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <Route path='/Profile' component={Profile} />
            <Route path='/Academy' component={Academy} />
            <Route path='/product/:pid' component={productView} />
            <Route path='/category/:cid' component={Store} />
            <Route path='/activate/:userid/:token' component={ApproveView} />
            <Route path='/reset/:email/:token' component={ChangePassView} />
            <Route path='/Forgot' component={ForgotView} />
            <Route
              path='/whatsapp'
              component={() => {
                window.location.href = 'https://bit.ly/3L7waFg'
                return null
              }}
            />
            <Route component={App} />
          </Switch>
        </Router>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
