import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <ul>
          <li><a href="default.asp">Home</a></li>
          <li><a href="about.asp">About</a></li>
          <li><a href="login.asp">Login</a></li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
