import React, {Component} from 'react';
import MenuComponent from '../Components/MenuComponent';
import ApproveMyProfile from '../Components/Authentication/ApproveMyProfile';

class ApproveView extends Component 
{
    render() 
    {
		return (
			<div>
				<MenuComponent />
				<ApproveMyProfile userid={this.props.match.params.userid} token={this.props.match.params.token} />
			</div>
		)
	}
}
export default ApproveView;