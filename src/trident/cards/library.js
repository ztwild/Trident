import React, { Component } from 'react';
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
            <div key={i} className="align" >
              <div className="frame-library">
                <img
                  // id="image"
                  className="profile"
                  src={e.url}
                  alt=""/>
              </div>
              <label>{e.name}</label>
            </div>
        )})}
      </div>
    );
  }
}

export default Library;