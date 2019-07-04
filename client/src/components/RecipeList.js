import React, { Component } from 'react';
import './RecipeList.css';
import { Link } from 'react-router-dom';

class RecipeList extends Component {

  generateList(recipes) {
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
    let hasRecipes = this.props.recipes && this.props.recipes.length > 0;      
    let recipeList = <ul>
                      {this.generateList(this.props.recipes)}
                    </ul>;
    let calculatorLink = <Link to={"/"}>calculator</Link>;
    let noRecipesMessage = <p>You don't have any recipes yet. Create some using the {calculatorLink}</p>;
    return (
      <div className="recipeList">
        <div className="pageTitle">Recipes</div>
        {hasRecipes ? recipeList : noRecipesMessage}
      </div>
    );
  }
}

export default RecipeList;