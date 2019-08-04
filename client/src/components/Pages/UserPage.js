import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import UserContext from '../Context/ContextProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserPage extends React.Component {
  render() {
	  if (this.context.isLoggedIn) {
          return <Redirect to="/" />
	  } else {
		  toast('something');
		  return (
			  <LoginPage />
		  )
	  }
  }
}

UserPage.contextType = UserContext;

export default UserPage;
