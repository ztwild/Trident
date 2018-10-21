import React, { Component } from 'react';
// import Card from './card';
import CardForm from './cardForm';
import { clone } from '../../utils/deepClone';
import './style.css';

import Api from './cardApi';

const initCard = {
  name: "",
  url: "",
  deploy: "",
  attack: "",
  defense: "",
  hp: "",
  move: "",
  range: "",
  armorSlots: 0,
  weaponSlots: 0
}

export class CardEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      card: initCard
    }
  }

  validCard() {
    for(var attr in this.state.card) {
      if(this.state.card[attr] === "") {
        return false;
      }
    }
    return true;
  }

  saveImage() {
    if(this.validCard()) {
      Api.instertCard(this.state.card)
      .then(
        () => this.successMessage(), 
        (error) => this.setState({message: error})
      );
    }
  }

  successMessage() {
    this.setState({message: "Success"});
    setTimeout(() => {
      this.setState({card: initCard, message: null});
    }, 1000);
  }

  handleChange(e) {
    var card = clone(this.state.card);
    card[e.currentTarget.id] = e.target.value;
    this.setState({card});
  }

  render() {
    return(
      <div>
        <div className="frame-editor">
          <img 
            id="image"
            className="profile-editor"
            src={this.state.card.url}
            alt=""
            />
        </div>

        <div style={{display:"inline-block"}}>
          <CardForm
            card={this.state.card}
            onChange={(e) => this.handleChange(e)}
            submit={() => this.saveImage()}
            message={this.state.message}
          />
        </div>
      </div>
    );
  }
}

export default CardEditor;