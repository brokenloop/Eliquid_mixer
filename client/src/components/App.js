// https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0

import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Calculator from './Calculator';
import UserPage from './Pages/UserPage';
import AccountPage from './Pages/RecipePage';
import SignUpPage from './Pages/SignUpPage';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class App extends Component {
  render() {
      return (
				<Router>
					<div>
						<Navbar />
						<div>
							<Route exact path="/" component={Calculator} />
							<Route path = "/account" component={UserPage} />
							<Route path = "/create_account" component={SignUpPage} />
							<Route path="/recipes" component={AccountPage} />
							<Route path = "/Calculator/:recipename" component={Calculator} />
						</div>
					</div>
				</Router>
      );
    }
  }

export default App;
