import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { userService } from '../services/user-service';

class Navbar extends Component {

  render() {
    let accountMessage = userService.isLoggedIn() ? "My account" : "Sign in"
    return (
      <div className="navbar">
        <ul>
          <li><Link to={'/account'}>{accountMessage}</Link></li>
          {userService.isLoggedIn() ? <li><Link to={'/recipes'}>Recipes</Link></li> : null}
          <li><Link to={'/'}>Home</Link></li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
