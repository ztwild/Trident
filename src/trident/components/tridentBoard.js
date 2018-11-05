import React, { Component } from 'react';
// import Board from '../../board/board';
import { Tabs, Tab, } from 'react-bootstrap';
import CardEditor from '../cards/cardEditor';
import CardLibrary from '../cards/library';
import GameBoard from './gameBoard';
import './style.css';

export class TridentBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    return(
      <div>
        <Tabs defaultActiveKey={2} >
          
          <Tab eventKey={2} title="Game Board">
            <GameBoard/>
          </Tab>

          <Tab eventKey={3} title="Card Editor">
            <CardEditor/>
          </Tab>

          <Tab eventKey={1} title="Card Library">
            <CardLibrary/>
          </Tab>
          <Tab eventKey={4} title="Hexagon Grid">
            <div className="triangle"/>
            <div className="triangle-top"/>
            <div className="triangle-bottom"/>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default TridentBoard;