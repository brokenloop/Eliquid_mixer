import React, { Component } from 'react';
import RecipeList from '.././RecipeList';
import { Redirect } from 'react-router-dom';
import {recipeService} from '../../services/recipe-service.js';
import UserContext from '../Context/ContextProvider';

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
    if (this.context.isLoggedIn) {
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
RecipePage.contextType = UserContext;

export default RecipePage;