import React, { Component } from 'react';
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
          <li key = {i} >
            <Link to={"/Calculator/" + recipes[i]}>
              {recipes[i]}
            </Link>
          </li>);
      }
      return listRecipes;
    }
  }


  render() {
  	
    return (
      <div className="RecipeList">
        <ul>
          {this.generateList(this.props.recipes)}
        </ul>
      </div>
    );
  }
}

export default RecipeList;