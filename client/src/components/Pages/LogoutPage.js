import React from 'react';
import { userService } from '../../services/user-service.js';

class LogoutPage extends React.Component {
	handleClick() {
		userService.logout();
		window.location.reload(true);	
	}
  render() {
      return (
	  <div className="form-group">
	      <button className="btn btn-primary" onClick={this.handleClick}>Logout</button>
	  </div>
      );
  }
}

export default LogoutPage;
