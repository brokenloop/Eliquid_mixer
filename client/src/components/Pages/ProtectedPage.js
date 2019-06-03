import React, { Component } from 'react';
import { userService } from '../../services/user-service';

class ProtectedPage extends Component {
    

  render() {
      let message = "Not logged in";
      if (userService.isLoggedIn()) {
	      message = "Logged in";
      }

    return message;
  }
}

export default ProtectedPage;
