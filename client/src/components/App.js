// https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0

import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Calculator from './Calculator';
import UserPage from './Pages/UserPage';
import AccountPage from './Pages/RecipePage';
import SignUpPage from './Pages/SignUpPage';
import { UserContext } from './Context/ContextProvider';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { userService } from '../services/user-service';

class App extends Component {
	constructor(props) {
		super(props);

		this.login = (username, password) => {
			userService.login(username, password)
			.then(response => response.success ? this.setState({isLoggedIn: true}) : null);
		}

		this.logout = () => {
			userService.logout()
			.then(this.setState({isLoggedIn: false}))
		}

		this.refreshLogin = () => {
			this.setState({isLoggedIn: userService.isLoggedIn()});
		}

		this.state = {
			isLoggedIn: false,
			login: this.login,
			logout: this.logout,
			refreshLogin: this.refreshLogin,
		};
	}

	componentDidMount() {
		this.refreshLogin();
	}

	render() {
		return (
			<UserContext.Provider value={this.state}>
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
			</UserContext.Provider>
		);
    }
}

export default App;
