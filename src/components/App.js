import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Calculator from './Calculator';
import LoginPage from './LoginPage';
import AccountPage from './AccountPage';

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

const App = () =>
  <Router>
    <div>
      
    <Navbar />
      <div>
        <Route exact path="/" component={Calculator} />
        <Route path = "/login" component={LoginPage} />
        <Route path="/account" component={AccountPage} />
      </div>
    </div>
  </Router>



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