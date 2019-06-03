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
    recipeService.getUserRecipes()
        .then(recipes => {
            this.setState({recipes});
        })
        .catch(error => {
          console.log(error);
          // this.props.history.push('/')
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