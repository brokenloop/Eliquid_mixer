// http://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example#login-page-jsx

import React, { Component } from 'react';
import './InputField.css';
import Button from './Button.js';

class InputField extends Component {
  
  render() {
      var labelField, removeButton, onChange;
      if (this.props.editable) {
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
                // type="text"
            
             className="inputFieldInput"
             type="text"
             onChange={onChange}
             name={this.props.name}
             value={this.props.placeholder}/>
           </span>
        {removeButton}
      </div>
    );
  }
}

export default InputField;
