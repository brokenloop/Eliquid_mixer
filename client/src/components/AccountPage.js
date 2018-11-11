import React, { Component } from 'react';
import axios from 'axios';

class AccountPage extends Component {

constructor() {
    super();
    this.url = "http://127.0.0.1:5000/"
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
      <div className="AccountPage">
        <h1>RECIPES HERE</h1>
        {this.state.recipes}
      </div>
    );
  }
}

export default AccountPage;