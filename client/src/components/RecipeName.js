import React, { Component } from 'react';
import './RecipeName.css';

class RecipeName extends Component {

  render() {
    return (
      <div className="recipeName">
            <input
           type="text"
           className="recipeNameInput"
           onChange={this.props.onChange}
           value={this.props.name}
           placeholder="Recipe Name"
           />
      </div>
    );
  }
}

export default RecipeName;
