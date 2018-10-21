import React, { Component } from 'react';
import Api from './cardApi';

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
    .then(cards => this.setState({ cards }))
    .catch(error =>  this.setState({ error }));
  }

  render() {
    debugger
    return(
      <div>
       {this.state.cards.map((e, i) => {
         return(
         <label 
          key={i}
          style={{color: "#ffffff"}}
          >{JSON.stringify(e)}</label>);
       })}
      </div>
    );
  }
}

export default Library;