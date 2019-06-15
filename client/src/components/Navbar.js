import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { userService } from '../services/user-service';

class Navbar extends Component {

  render() {
    let isLoggedIn = userService.isLoggedIn();
    let accountLink = isLoggedIn ? <Link onClick={userService.logout}>Log Out</Link> : <Link to={'/account'}>Log In</Link>;
    return (
      <div className="navbar">
        <ul>
          <li>{accountLink}</li>
          {isLoggedIn ? <li><Link to={'/recipes'}>My Recipes</Link></li> : null}
          <li><Link to={'/'}>Calculator</Link></li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
