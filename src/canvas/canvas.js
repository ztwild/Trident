import React, { Component } from 'react';
import { convertToHex } from '../utils/convert';
import { clone } from '../utils/deepClone';
import './style.css';

var ctx = null;
const colors = {
  RED: "red",
  GREEN: "green",
  BLUE: "blue",
}

export class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 5000,
      height: 5000,
      x: {
        pos: null,
        color: colors.RED,
        max: null
      },
      y: {
        pos: null,
        color: colors.BLUE,
        max: null
      },
      slider: {
        color: colors.GREEN,
        value: 255
      },
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    ctx = canvas.getContext("2d");
    canvas.addEventListener('mousedown', (e) => this.clickHandler(e), false);
  }

  drawCircle(x, y, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  getColor(xRatio, yRatio) {
    var r = convertToHex(xRatio * 255);
    var g = convertToHex(this.state.slider.value);
    var b = convertToHex(yRatio * 255);
    return `#${r}${g}${b}`;
  }

  clickHandler(event) {
    var radius = 80;
    var { x, y, xRatio, yRatio } = this.pointerPosition(event);
    const color = this.getColor(xRatio, yRatio);
    // this.drawCircle(x, y, radius, color);
    const timerId = setInterval(() => {
      radius += 10;
      this.drawCircle(x, y, radius, color);
    }, 100);

    setTimeout(() => { 
      clearInterval(timerId); 
    }, 5000);
    
    this.setState({
      x: {
        pos: event.offsetX,
        max: event.currentTarget.clientWidth,
      },
      y: {
        pos: event.offsetY,
        max: event.currentTarget.clientHeight,
      }
    });
  }

 

  pointerPosition(event) {
    const xRatio = event.offsetX / event.currentTarget.clientWidth;
    const yRatio = event.offsetY / event.currentTarget.clientHeight;
    return {
      x: xRatio * event.currentTarget.width,
      y: yRatio * event.currentTarget.height,
      xRatio,
      yRatio
    };
  }

  getRadio(axis, color) {
    return(
      <span>
        <input 
          type="radio" 
          name={`${axis}-coordinate-color`} 
          checked={this.state[axis].color === color}
          onChange={() => this.changeColor(axis, color)}/>
        <label>{color}</label>
      </span>
    );
  }

  changeColor(axis, color) {
    var state = clone(this.state);
    const otherAxis = axis === 'x' ? 'y' : 'x';
    if(color === state[otherAxis].color) {
      state[otherAxis].color = state[axis].color;
      state[axis].color = color; 
    }
    else if(color === state.slider.color) {
      state.slider.color = state[axis].color;
      state[axis].color = color;
    }
    this.setState({ ...state });
  }

  sliderHandler(event) {
    var state = clone(this.state);
    state.slider.value = event.currentTarget.value;
    this.setState({ ...state });
  }

  render() {
    return(
      <div height="500px">
        <div>
          <label className="coordinate-label">x coordinate: {this.state.x.pos}</label>
          <label className="coordinate-label">x max: {this.state.x.max}</label>
          <span className="form-check">
            {this.getRadio("x", colors.RED)}
            {this.getRadio("x", colors.GREEN)}
            {this.getRadio("x", colors.BLUE)}
          </span>
        </div>
        <div >
          <label className="coordinate-label">y coordinate: {this.state.y.pos}</label>
          <label className="coordinate-label">y max: {this.state.y.max}</label>
          <span className="form-check">
            {this.getRadio("y", colors.RED)}
            {this.getRadio("y", colors.GREEN)}
            {this.getRadio("y", colors.BLUE)}
          </span>
        </div>
        <div className="color-range">
        <label>{this.state.slider.value}</label>
          <input 
            className={`slider ${this.state.slider.color}`} 
            type="range" min={0} max={255}
            value={this.state.slider.value}
            onChange={(e) => this.sliderHandler(e)}
            />
        </div>
        <canvas ref="canvas" className="canvas" width={`${this.state.width}px`} height={`${this.state.height}px`}/>
      </div>
    );
  }
}

export default Canvas;