import React, { Component } from 'react';
import './RecipeName.css';

class RecipeName extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {value: this.props.name};

  //     //this.handleChange = this.handleChange.bind(this);
  //   }

  // handleChange(event) {
  //   let newValue = event.target.value;
  //   this.setState({value: newValue});
  //   this.props.onChange(newValue);
  // }

  // componentDidMount() {
  //     let newValue = this.props.value;
  //     console.log(newValue);
  //     this.setState({value: });
  // }

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
