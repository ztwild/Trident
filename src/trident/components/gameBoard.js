import React, { Component } from 'react';
import GridButton from './gridButton';
import Board from '../../board/board';
import Hand from '../cards/hand';
import Api from '../cards/cardApi';
import { ENVR, MOCK, BORDER_STATE } from './constants';
import { clone } from '../../utils/deepClone';

const _x = 10;
const _y = 10;

const bordStyle = {
  width: `${50 * _x + 3}px`, 
  // borderStyle: "solid", 
  // backgroundColor: "blue"
}

const _element_template = {
  marker: null,
  owner: null,
  environment: ENVR.TREE,
  borderState: BORDER_STATE.NEUTRAL,
}

const _character_template = {
  owner: null,
  img: MOCK.CHARACTER,
  move: 4,
  range: 3,
  visible: true,
  health: null,
}


export class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      selected: null,
      hand: [],
      deck: [],
    }
  }

  initBoard() {
    var board = new Array(_x);
    for(var i = 0; i < _x; i++) {
      board[i] = new Array(_y);
      for(var j = 0; j < _y; j++) {
        board[i][j] = clone(_element_template);
      }
    }
    return board;
  }

  componentDidMount() {
    this.randomizeInit();
    Api.GetCards()
    .then(cards => {
      const hand = cards.slice(0, 10);
      const deck = cards.slice(10, cards.length);
      this.setState({ hand, deck });
    })
    .catch(err => console.log(err));
  }

  randomizeInit() {
    var board = clone(this.state.board);
    var arr = [];
    var marker;
    
    for(var i = 0; i < 5; i ++) {
      const x = Math.floor(Math.random() * _x);
      const y = Math.floor(Math.random() * _y);
      arr.push({x, y});
      marker =  clone(_character_template);
      marker.owner = Math.floor(Math.random() * 2) === 0;
      marker.health = Math.floor(Math.random() * 100) + 1;
      board[x][y].marker = marker;
    }
    var marker = clone(_character_template);
    marker.owner = true;
    marker.img = MOCK.LEADER;
    marker.health = 100;
    board[4][9].marker = marker;
    this.setState({board});
  }

  moveSelectedTo(state, to) {
    const from = state.selected;
    var board = state.board;
    board[from.col][from.row].borderState = BORDER_STATE.NEUTRAL;
    this.moveMarkerTo(board, from, to);
  }

  moveMarkerTo(board, from, to) {
    board[to.col][to.row].marker = board[from.col][from.row].marker;
    board[from.col][from.row].marker = null;
  }

  inBounds(coordinate) {
    const xCoordinate = coordinate.col < _x && coordinate.col >= 0;
    const yCoordinate = coordinate.row < _y && coordinate.row >= 0;
    return xCoordinate && yCoordinate;
  }

  setBorder(board, coordinate, state) {
    if(this.inBounds(coordinate)) {
      const { col, row } = coordinate;
      board[col][row].borderState = state;
    }
  }

  selectGrid(state, col, row) {
    // const {col, row} = coordinate;
    state.selected = { col, row };
    state.board[col][row].borderState = BORDER_STATE.SELECTED;

    // state.board[col + 1][row].borderState = BORDER_STATE.MOVE;
    // state.board[col - 1][row].borderState = BORDER_STATE.MOVE;
    // state.board[col][row + 1].borderState = BORDER_STATE.MOVE;
    // state.board[col][row - 1].borderState = BORDER_STATE.MOVE;

    // state.board[col + 1][row + 1].borderState = BORDER_STATE.MOVE;
    // state.board[col - 1][row + 1].borderState = BORDER_STATE.MOVE;
    // state.board[col + 1][row - 1].borderState = BORDER_STATE.MOVE;
    // state.board[col - 1][row - 1].borderState = BORDER_STATE.MOVE;
  }

  onClickHandler(e, col, row) {
    // debugger;
    var state = clone(this.state);
    if(state.selected) {
      const prevSelected = clone(state.selected);
      const samePosition = prevSelected.col === col && prevSelected.row === row;
      if(samePosition) {
        state.board[state.selected.col][state.selected.row].borderState = BORDER_STATE.NEUTRAL;
        state.selected = null;
      }
      else if(state.board[col][row].marker) {
        state.board[state.selected.col][state.selected.row].borderState = BORDER_STATE.NEUTRAL;
        this.selectGrid(state, col, row);
      }
      else {
        if(state.board[state.selected.col][state.selected.row].marker) {
          this.moveSelectedTo(state, { col, row });
        }
      }
    }
    else if(state.board[col][row].marker){
      this.selectGrid(state, col, row);
    }
    this.setState({ ...state });
  }

  render() {
    return (
      <div>
        <Board
          style={{...bordStyle}}
          board={this.state.board}
          width={_x}
          height={_y}
          onClickHandler={(e, col, row) => this.onClickHandler(e, col, row)}
          rightClickHandler={() => console.log("right click handler")}
          button={GridButton}/>
        <Hand hand={this.state.hand}/>
      </div>
    );
  }
}

export default GameBoard;