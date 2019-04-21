import React, { Component } from 'react';
import RecipeList from '.././RecipeList';
import {recipeService} from '../../services/recipe-service.js';

class RecipePage extends Component {

constructor() {
    super();
    this.state = {
      recipes: []
    };
  }


componentDidMount() {
    recipeService.getAllRecipes()
        .then(recipes => {
            this.setState({recipes});
        })
}

  render() {
      
    return (
      <div className="RecipePage">
        <RecipeList recipes={this.state.recipes} />
      </div>
    );
  }
}

export default RecipePage;