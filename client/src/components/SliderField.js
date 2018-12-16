import React, { Component } from 'react';
import './SliderField.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

// const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class SliderField extends Component {

  handleChange = (value) => {
    let fieldName = this.props.name;
    this.props.onChange(value, fieldName);
  }

  render() {
    return (
      <div className="SliderField ">
      	<label> {this.props.label} </label>

        <div className="sliderFieldInput">
          <div className="value">
            {this.props.placeholder}%
          </div>
          <div className="slider">
            <Slider min={0} max={100} step={5} value={this.props.placeholder} handle={handle} onChange={this.handleChange}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SliderField;
