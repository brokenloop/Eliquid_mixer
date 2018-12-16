import React, { Component } from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';

class RecipePage extends Component {

constructor() {
    super();
    this.url = "http://127.0.0.1:5000/";
    this.state = {
      recipes: []
    };
  }


componentDidMount() {
	axios.get(this.url + "recipes")
		.then(res => {
			const recipes = res.data;
			console.log(recipes);
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