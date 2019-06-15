import React, { Component } from 'react';
import RecipeList from '.././RecipeList';
import { Redirect } from 'react-router-dom';
import {recipeService} from '../../services/recipe-service.js';
import { userService } from '../../services/user-service.js';

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
     if (userService.isLoggedIn()) {
      return (
        <div className="RecipePage">
          <RecipeList recipes={this.state.recipes} />
        </div>
      );
     } 
     else {
       return <Redirect to="/" />
     }
  }
}

export default RecipePage;