import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App';
import ChatPage from './chatPage/chatContainer';
import TickTackToe from './tickTackToe/tickTackToe';
import Canvas from './canvas/canvas';
import MineSweeper from './mineSweeper/mineSweeper';
import Sudoku from './sudoku/sudoku';
import Trident from './trident/components/tridentBoard';

const Routes = () => {
  return(
    <BrowserRouter>
      <App>
        <Route exact={true} path="/chat" component={ChatPage}/>
        <Route path='/ticktacktoe' component={TickTackToe}/>
        <Route path='/canvas' component={Canvas}/>
        <Route path='/minesweeper' component={MineSweeper}/>
        <Route path='/sudoku' component={Sudoku}/>
        <Route path='/trident' component={Trident}/>
      </App>
    </BrowserRouter>
  );
}

export default Routes;