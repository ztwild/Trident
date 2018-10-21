import React from 'react';
// import logo from './logo.svg';
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <header className="App-header">
      <nav>
        <Link to="/chat">Chat</Link>{" | "}
        {/* <Link to="/spotify">Spotify</Link>{" | "} */}
        <Link to="/ticktacktoe">Tick Tack Toe</Link>{" | "}
        <Link to="/canvas">Canvas</Link>{" | "}
        <Link to="/minesweeper">Mine Sweeper</Link>{" | "}
        {/* <Link to="/sudoku">Sudoku</Link>{" | "} */}
        <Link to="/trident">Trident</Link>
      </nav>
      {/* <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1> */}
    </header>
  );
}

export default NavBar;