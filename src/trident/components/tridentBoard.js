import React, { Component } from 'react';
// import Board from '../../board/board';
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
        {/* <CardEditor/> */}
        <CardLibrary/>
      </div>
    );
  }
}

export default TridentBoard;