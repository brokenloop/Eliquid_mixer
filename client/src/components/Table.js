import React, { Component } from 'react';
import './Table.css';

class Table extends Component {
  render() {
    return (
      <div className="Table">
        <table>
          <thead>
            <tr className="tableHeader">
                <th>Ingredient</th>
                <th>Volume (ml)</th>
                <th>Weight (g)</th>
            </tr>
          </thead>
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
