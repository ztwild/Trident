import React, { Component } from 'react';
// import { Glyphicon } from 'react-bootstrap';
import './style.css';

export class SudokuButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { }
  }

  render(){
    return (
      <div className={`grid ${this.props.element ? "grey" : "white"}`}>
        {this.props.element}
      </div>
    );
  }
}

export default SudokuButton;