import React, { Component } from 'react';
import './TableRow.css';

class TableRow extends Component {
  render() {
    return (
        <tr>
            <td>{this.props.ingredient}</td>
            <td>{this.props.volume}</td>
            <td>{this.props.weight}</td>
        </tr>
    );
  }
}

export default TableRow;
