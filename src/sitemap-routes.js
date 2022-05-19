import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

export default (
  <Switch>
    <Route exact path='/' />
    <Route path='/admin' />
    <Route path='/delivery' />
    <Route path='/cart' />
    <Route path='/store/SuccessOrder' />
    <Route path='/store' />
    <Route path='/Signin' />
    <Route path='/signup' />
    <Route path='/Profile' />
    <Route path='/Academy' />
    <Route path='/product' />
    <Route path='/activate/:userid/:token' />
    <Route path='/reset/:email/:token' />
    <Route path='/Forgot' />
    <Route path='/whatsapp' />
    <Redirect from='*' to='/404' />
  </Switch>
)
