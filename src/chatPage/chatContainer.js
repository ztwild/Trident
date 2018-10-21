import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, InputGroup, Collapse, Well } from 'react-bootstrap';
import { Input } from 'reactstrap';
import { sendMessageStart } from './chatActions';
// import readline from 'readline';
// import io from 'socket.io-client';
import './chat.css';

// const options = {
//   hostname: 'localhost',
//   port: 5000,
// }

class ChatPage extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      open: false,
      message: "",
      data: [],
      socket: null
    };
  }


  // componentDidMount(){
  //   try{
  //     var socket = io.connect(`http://${options.hostname}:${options.port}`);
  //     socket.on('getMessage', req => {
  //       var data = this.state.data;
  //       data.push(req);
  //       this.setState({ data });
  //     });
  //     this.setState({socket});
  //   }
  //   catch(err){
  //     console.log(`this is an error: ${err}`);
  //     this.setState({socket: null});
  //   }
  // }

  // componentWillUnmount(){
  //   this.socket.close();
  // }

  pingServer(){
    var ns = this.state;
    this.state.socket.emit('sendMessage', ns.message );
    ns.data.push(ns.message);
    this.setState({ data: ns.data, message: "" });
  }

  render(){
    return (
      <div>
        <Button onClick={() => this.setState({ open: !this.state.open })}>
          { this.state.open ? "Close" : "Open" }
        </Button>
        <Collapse in={this.state.open}>
          <div>
            
            <Well>
                <InputGroup>
                  <Input 
                    placeholder={"Message"}
                    value={ this.state.message }
                    onChange={(e) => this.setState({ message: e.target.value }) }/> 
                  <Button onClick={ () => this.pingServer() }>
                    Send
                  </Button>
                </InputGroup>

                <Table >
                  <tbody className="scroll" >
                    {this.state.data.map((element, i) => {
                      return(
                        <tr key={i}>
                          <td>{element}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Well>

            </div>
          </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.chat.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (message) => {
      if(message.trim()){
        dispatch(sendMessageStart(message));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);