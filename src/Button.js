import React, { Component } from 'react';
import './Button.css';


class Button extends Component {

  render() {
    return (
      <div className="Button">
        <button className={this.props.action + " button"} onClick={this.props.onClick}>{this.props.children}</button>
      </div>
    );
  }
}

export default Button;
