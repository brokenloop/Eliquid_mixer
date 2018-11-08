import React, { Component } from 'react';
import './InputField.css';
import Button from './Button.js';

class InputField extends Component {
  render() {
  	var labelField, removeButton, onChange;
  	if (this.props.editable) {
      console.log("InputID");
      console.log(this.props.inputId);
  		labelField = <label>
                    <input

                      placeholder={this.props.label}
                      className="editableLabel"
                      onChange={this.props.onLabelChange.bind(this, this.props.inputId)}>
                    </input>
                  </label>;
      removeButton = <Button
                        action="remove"
                        onClick={this.props.buttonAction.bind(this, this.props.inputId)}>
                          x
                    </Button>
      onChange = this.props.onChange.bind(this, this.props.inputId);
  	} else {
      labelField = <label> {this.props.label} </label>;
      onChange = this.props.onChange;
    }

    return (
      <div className="InputField form-group">
      	{labelField}
      	<span className="inputSymbol" symbol={this.props.symbol}>
	     	   <input
             className="inputFieldInput"
             type={this.props.type}
             onChange={onChange}
             name={this.props.name}
             placeholder={this.props.placeholder}/>
     	  </span>
        {removeButton}
      </div>
    );
  }
}

export default InputField;
