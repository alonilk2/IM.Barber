import React, { Component } from 'react'
import MenuComponent from '../Components/MenuComponent'
import ChangePass from '../Components/Authentication/ChangePass'

class ChangePassView extends Component {
  render () {
    return (
      <div>
        <MenuComponent />
        <ChangePass
          email={this.props.match.params.email}
          token={this.props.match.params.token}
        />
      </div>
    )
  }
}
export default ChangePassView
