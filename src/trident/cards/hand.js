import React, { Component } from 'react';
import Card from './card';
import './style.css';

const style = {
  // width: "1000px"
}

export class Hand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: "10px"
    }
  }

  render() {
    return(
      <div style={{...style}} onHover={()=>this.setState({offset: "50px"})}>
        {
          this.props.hand.map((e, i) => {
            return(<Card key={i} card={e} index={i}/>);
          })
        }
      </div>
    );
  }
}

export default Hand;