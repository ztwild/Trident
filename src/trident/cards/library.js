import React, { Component } from 'react';
import Card from './card';
import Api from './cardApi';
import './style.css';

const style = {
  // width: "1000px"
}

export class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      error: null
    }
    
  }

  componentDidMount() {
     Api.GetCards()
    .then(cards => { this.setState({ cards }) })
    .catch(error =>  this.setState({ error }));
  }

  render() {
    return(
      <div style={{...style}}>
        {this.state.cards.map((e, i) => {
          return(
            <Card key={i} card={e}/>
        )})}
      </div>
    );
  }
}

export default Library;