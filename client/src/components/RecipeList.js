import React, { Component } from 'react';
import './RecipeList.css';
import { Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Calculator from './Calculator';


class RecipeList extends Component {

  generateList(recipes) {
    console.log(recipes);
    let listRecipes = [];
    if (recipes) {
      for (let i = 0; i < recipes.length; i++) {
        listRecipes.push(
          
            <Link className="link" to={"/Calculator/" + recipes[i]}>
              <li key = {i} >
                {recipes[i]}
              </li>
            </Link>
          );
      }
      return listRecipes;
    }
  }


  render() {
      
    return (
      <div className="recipeList">
      <div className="pageTitle">Recipes</div>
        <ul>
          {this.generateList(this.props.recipes)}
        </ul>
      </div>
    );
  }
}

export default RecipeList;