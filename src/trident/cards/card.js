import React, { Component } from 'react';
import './style.css';

export class Card extends Component {
  constructor(props) {
    super(props);
  }

  getStyle() {
    const index = this.props.index;
    return(
      index === undefined ? 
      { } :
      {
        left: `${index * 50}px`,
      }
    )
  }

  getClassName() {
    const overlap = this.props.index !== undefined;
    return `align ${overlap ? "hand" : ""}`;
    // return "align";
  }

  render() {
    return(
      <div className={this.getClassName()} style={this.getStyle()}>
        <div className="frame-library">
          <img
            className="profile"
            src={this.props.card.url}
            alt=""/>
        </div>
        <label>{this.props.card.name}</label>
      </div>
    )
  }
}

export default Card;