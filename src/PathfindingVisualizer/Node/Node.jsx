import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
      weight,
    } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : weight
      ? "node-weight"
      : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col, weight)}
        onMouseEnter={() => onMouseEnter(row, col, weight)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export const DEFAULT_NODE = {
  row: 0,
  col: 0,
  weight: 0,
};
