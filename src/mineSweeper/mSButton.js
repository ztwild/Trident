import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import './style.css';

export class MineSweeperButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { }
  }

  render(){
    return (
      this.props.element.visible ? 
      <div className="grid">
        {
          this.props.element.mine ?
            <Glyphicon glyph="screenshot" /> :
            this.props.element.count ?
              this.props.element.count:
              null
        }
      </div> :
      <button
        className={`grid ${this.props.element.flag ? "mine" : "white"}`}
        onClick={(e) => this.props.onClickHandler(e)}
        onContextMenu={(e) => this.props.rightClickHandler(e)}
        />
    );
  }
}

export default MineSweeperButton;