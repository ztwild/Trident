import React, { Component } from 'react';
import PropTypes from 'prop-types';
export const WINNER = 'winner';
export const LOSER = 'loser';
export const IN_PROGRESS = 'in_progress';

export class Board extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { }
  }

  getBoard() {
    var board = [];
    for(var i = 0; i < this.props.height; i++) {
      board.push(<div key={i}>{ this.getRow(i) }</div>);
    }
    return board;
  }

  getRow(row) {
    var arr = [];
    for(var i = 0; i < this.props.width; i++) {
      arr.push(<span key={i}>{ this.getGrid(i, row) }</span>);
    }
    return arr;
  }

  getGrid(col, row) {
    return (
      <this.props.button
        element={this.props.board[col][row]}
        onClickHandler={(e) => this.props.onClickHandler(e, col, row)}
        rightClickHandler={(e) => this.props.rightClickHandler(e, col, row)}
        />
    );
  }

  render(){
    return (
      <div>
        { 
          this.props.gameStatus === WINNER ? 
          <h1>{this.props.gameStatus}</h1> :
          this.getBoard()
        }
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  rightClickHandler: PropTypes.func,
  button: PropTypes.func.isRequired,
};

export default Board;