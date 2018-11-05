import React, { Component } from 'react';
// import logo from './logo.svg';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { setHostnameStart } from './serverConnection/connectionActions';

export class NavBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      hostname: ""
    }
  }

  validIpAddress(ip) {
    const regex = /^\d+\.\d+\.\d+\.\d+$/;
    const found = ip.match(regex);
    return found !== null;
  }

  clickHandler() {
    if (this.validIpAddress(this.state.hostname)) {
      this.props.setHostname(this.state.hostname);
    }
  }

  changeHandler(e) {
    this.setState({hostname: e.target.value});
  }

  render() {
    return (
      <header className="App-header">
        <nav style={{display: "inline"}}>
          <Link to="/chat">Chat</Link>{" | "}
          {/* <Link to="/spotify">Spotify</Link>{" | "} */}
          <Link to="/ticktacktoe">Tick Tack Toe</Link>{" | "}
          <Link to="/canvas">Canvas</Link>{" | "}
          <Link to="/minesweeper">Mine Sweeper</Link>{" | "}
          {/* <Link to="/sudoku">Sudoku</Link>{" | "} */}
          <Link to="/trident">Trident</Link>
        </nav>
        <div style={{display: "inline", float: "right", color: "black"}}>
          <input 
            type="text" 
            placeholder="ip address" 
            onChange={e => this.changeHandler(e)}/>
          <button 
            onClick={() => this.clickHandler()}>
            Set Hostname
          </button>
        </div>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1> */}
      </header>
    );
  }
}

export const mapStateToProps = () => {
  return {};
}

export const mapDispatchToProps = dispatch => {
  return {
    setHostname: (hostname) => {
      dispatch(setHostnameStart(hostname));
    } 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);