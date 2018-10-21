import React, { Component } from 'react';
import NavBar from './navBar';
import './App.css';
import 'jquery';
// import Spotify from './spotify/spotifyComponent';
// import ChatPage from './chatPage/chatContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
