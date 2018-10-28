import React, { Component } from 'react';
// import Board from '../../board/board';
import { Tabs, Tab, } from 'react-bootstrap';
import CardEditor from '../cards/cardEditor';
import CardLibrary from '../cards/library';

export class TridentBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    return(
      <div>
        <Tabs defaultActiveKey={1} >
          <Tab eventKey={1} title="Card Library">
            <CardLibrary/>
          </Tab>
          <Tab eventKey={2} title="Card Editor">
            <CardEditor/>
          </Tab>
        </Tabs>;
      </div>
    );
  }
}

export default TridentBoard;