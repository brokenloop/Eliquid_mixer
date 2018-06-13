import React, { Component } from 'react';
import './Card.css';
import {Collapse} from 'react-collapse';

class Card extends Component {
  constructor() {
    super();
    this.state = {isOpened: true};
  }

  toggleOpened(event) {
    var newState = !this.state.isOpened;
    this.setState({isOpened: newState});
    // alert(this.state.isOpened);
  }

  render() {
    return (
      <div className="Card">
        <div className="header" onClick={this.toggleOpened.bind(this)}> {this.props.cardHeader}</div>
        <Collapse isOpened={this.state.isOpened}>
          <div className="body"> {this.props.children}</div>
        </Collapse>
      </div>
    );
  }
}

export default Card;
