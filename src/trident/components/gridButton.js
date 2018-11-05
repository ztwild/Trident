import React, { Component } from 'react';
import { Tooltip, ProgressBar, OverlayTrigger } from 'react-bootstrap';
// import { ENVR, MOCK } from './constants';
import './style.css';

// const style = {
  
// }

const health = 60;

export class GridButton extends Component {
  // constructor(props) {
  //   super(props);
  // }

  
  tooltip() {
    return(
      <Tooltip id="tooltip">
        <progress value={`${this.props.element.marker.health}`} max="100" style={{width:"50px"}}/>
      </Tooltip>
    );
  }


  renderImg() {
    const marker = this.props.element.marker;
    return (
      marker ?
        <OverlayTrigger placement="top" overlay={this.tooltip()}>
          <img
            id="image"
            className={`marker ${marker.owner ? "" : "enemy"}`}
            src={marker.img}
            alt=""/>
        </OverlayTrigger>
      : null
    );
  }


  render() {
    return (
      <div 
        className={`grid ${this.props.element.environment}`}
        style={{borderColor: this.props.element.borderState}}
        onClick={e => this.props.onClickHandler(e)}
        onContextMenu={e => this.props.rightClickHandler(e)}>
        {this.renderImg()}
      </div>
    );
  }
}

export default GridButton;