import React, { Component } from 'react';
// import {clone} from '../utils/deepClone';
import './style.css';

const imgPath = '../../pics/mage01.jpg';

export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  getStyle() {
    return {
      objectPosition: `${this.props.card.x}px ${this.props.card.y}px`,
      // zoom: `${this.props.card.zoom}%`
    }
  }

  render() {
    return(
      <div className="card">
        <div className="frame">
          <img className="profile"
          src={this.props.card.url}
          // style={this.getStyle()}
          />
        </div>
      </div>
    )
  }
}

export default Card;