import React, { Component } from 'react';
import { userService } from '../../services/user-service.js';
import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';

class UserPage extends React.Component {
  render() {
	  if (userService.isLoggedIn()) {
	      return (
		     <LogoutPage /> 
	      );
	  } else {
		  return (
			  <LoginPage />
		  )
	  }
  }
}

export default UserPage;
