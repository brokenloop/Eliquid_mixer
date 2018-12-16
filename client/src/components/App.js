// https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0

import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Calculator from './Calculator';
import LoginPage from './LoginPage';
import AccountPage from './RecipePage';


import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';


//import LandingPage from './Landing';
// import SignUpPage from './SignUp';
// import SignInPage from './SignIn';
// import PasswordForgetPage from './PasswordForget';
// import HomePage from './Home';
// import AccountPage from './Account';

// import * as routes from '../constants/routes';



// const App = () =>

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

render() {
    return (
     <Router>
      <div>
      <Navbar />
      <div>
        <Route exact path="/" component={Calculator} />
        <Route path = "/login" component={LoginPage} />
        <Route path="/recipes" component={AccountPage} />
        <Route path = "/Calculator/:recipename" component={Calculator} />

      </div>
      </div>
    </Router>
    );
  }
}

export default App;


// <Route
//   exact path={routes.SIGN_UP}
//   component={SignUpPage}
// />
// <Route
//   exact path={routes.SIGN_IN}
//   component={SignInPage}
// />
// <Route
//   exact path={routes.PASSWORD_FORGET}
//   component={PasswordForgetPage}
// />
// <Route
//   exact path={routes.HOME}
//   component={HomePage}
//      />
 // <Route
 //        exact path={routes.ACCOUNT}
 //        component={AccountPage}
 //      />