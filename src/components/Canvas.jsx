import React, { Component } from "react";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hexSize: 20,
      hexOrigin: { x: 300, y: 300 }
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      canvasSize: { canvasWidth: 800, canvasHeight: 600 }
    });
  }

  componentDidMount() {
    const { canvasWidth, canvasHeight } = this.state.canvasSize;
    this.canvasHexWidth = canvasWidth;
    this.canvasHexHeight = canvasHeight;
    this.drawHexes();
  }

  drawHexes() {
    for (let r = 0; r <= 4; r++) {
      for (let q = 0; q <= 4; q++) {
        let center = this.hexToPixel(this.Hex(q, r));
        this.drawHex(this.canvasHex, center);
        this.drawHexCoordinates(this.canvasHex, center, this.Hex(q, r));
      }
    }
  }

  drawHex = (canvasID, center) => {
    for (let i = 0; i < 6; i++) {
      let start = this.getHexCornerCoord(center, i);
      let end = this.getHexCornerCoord(center, i + 1);
      this.drawLine(
        canvasID,
        { x: start.x, y: start.y },
        { x: end.x, y: end.y }
      );
    }
  };

  getHexCornerCoord = (center, i) => {
    let angle_deg = 60 * i - 30;
    let angle_rad = (Math.PI / 180) * angle_deg;
    let x = center.x + this.state.hexSize * Math.cos(angle_rad);
    let y = center.y + this.state.hexSize * Math.sin(angle_rad);
    return this.Point(x, y);
  };

  hexToPixel(h) {
    const hexOrigin = this.state.hexOrigin;
    const size = this.state.hexSize;
    let x = size * (Math.sqrt(3) * h.q + (Math.sqrt(3) / 2) * h.r);
    let y = size * ((3 / 2) * h.r);
    return this.Point(x, y);
  }

  Point = (x, y) => {
    return { x: x, y: y };
  };

  Hex(q, r) {
    return { q: q, r: r };
  }

  drawLine = (canvasID, start, end) => {
    const ctx = canvasID.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  };

  drawHexCoordinates(canvasID, center, h) {
    const ctx = canvasID.getContext("2d");
    ctx.fillText(h.q, center.x - 10, center.y);
    ctx.fillText(h.r, center.x + 7, center.y);
  }

  render() {
    return (
      <div>
        <canvas ref={canvasHex => (this.canvasHex = canvasHex)}></canvas>
      </div>
    );
  }
}
