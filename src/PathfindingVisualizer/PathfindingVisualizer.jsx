import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { BFS } from "../algorithms/bfs";
import { recursiveDivision } from "../Mazes/RecursiveDivision";
import { simpleMaze } from "../Mazes/SimpleMaze";

import "./PathfindingVisualizer.css";

let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;

const GRID_HEIGHT = 20;
const GRID_LENGTH = 45;

let clickedIsStart = false;
let clickedIsFinish = false;
var mouseIsPressed = false;
var isRunning = false;

let mazeCreationSpeed = 1;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  updateStartAndFinishNodes(row, col) {
    const { grid } = this.state;
    const newGrid = grid.slice();

    if (clickedIsStart) {
      newGrid[START_NODE_ROW][START_NODE_COL].isStart = false;
      START_NODE_ROW = row;
      START_NODE_COL = col;
      newGrid[row][col].isStart = true;
      clickedIsStart = false;
    }

    if (clickedIsFinish) {
      newGrid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = false;
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
      newGrid[row][col].isFinish = true;
      clickedIsFinish = false;
    }

    this.setState({ grid: newGrid });
  }

  handleMouseDown(row, col) {
    if (isRunning) return;

    const grid = this.state.grid;
    mouseIsPressed = true;

    var node = grid[row][col];

    // allows the starting node to be positioned at any node on the grid
    if (node.isStart) {
      clickedIsStart = true;
      return;
    }

    // allows the finish node to be positioned similar to the starting node
    if (node.isFinish) {
      clickedIsFinish = true;
      return;
    }
    node.isWall = !node.isWall;
    if (node.isWall && !node.isStart && !node.isFinish) {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-wall";
    } else if (!node.isStart && !node.isFinish) {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node";
    }
  }

  handleMouseEnter(row, col) {
    if (!mouseIsPressed || isRunning) return;
    var div = document.getElementById("grid");

    const grid = this.state.grid;

    var node = grid[row][col];

    if (clickedIsStart) {
      if (node.isFinish || node.isWall) return;

      var startNode = grid[START_NODE_ROW][START_NODE_COL];
      document.getElementById(
        `node-${START_NODE_ROW}-${START_NODE_COL}`
      ).className = "node";
      startNode.isStart = false;
      startNode.isWall = false;
      node.isStart = true;
      node.isWall = false;
      START_NODE_ROW = row;
      START_NODE_COL = col;
      document.getElementById(`node-${row}-${col}`).className =
        "node node-start";
      return;
    } else if (clickedIsFinish) {
      if (node.isStart || node.isWall) return;

      var finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      document.getElementById(
        `node-${finishNode.row}-${finishNode.col}`
      ).className = "node";
      finishNode.isFinish = false;
      finishNode.isWall = false;
      node.isFinish = true;
      node.isWall = false;
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-finish";
      return;
    }

    if (node.isStart || node.isFinish) return;

    node.isWall = !node.isWall;
    if (node.isWall && !node.isStart && !node.isFinish) {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-wall";
    } else if (!node.isStart && !node.isFinish) {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node";
    }
  }

  handleMouseUp() {
    if (isRunning) return;
    clickedIsStart = false;
    clickedIsFinish = false;
    mouseIsPressed = false;
  }

  animateShortestPath(nodesInShortestPathOrder) {
    console.log(nodesInShortestPathOrder);
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  // visualizeDijkstra() {
  //   const { grid } = this.state;
  //   let startNode = grid[START_NODE_ROW][START_NODE_COL];
  //   const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  //   const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
  //   const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  //   this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  // }

  // visualizeAstar() {
  //   const { grid } = this.state;
  //   const startNode = grid[START_NODE_ROW][START_NODE_COL];
  //   const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  //   const visitedNodesInOrder = astar(grid, startNode, finishNode);
  //   const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  //   this.animateAstar(visitedNodesInOrder, nodesInShortestPathOrder);
  // }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  visualizeAlgorithm(algorithm) {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    var nodesInShortestPathOrder;
    var visitedNodesInOrder = null;

    if (algorithm === 0) {
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    }
    if (algorithm === 1) {
      visitedNodesInOrder = astar(grid, startNode, finishNode);
    }

    nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    if (visitedNodesInOrder !== false) {
      this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button
          id="dijkstra-button"
          className="button"
          onClick={() => this.visualizeAlgorithm(0)}
        >
          Dijkstra
        </button>
        <button
          id="astar-button"
          className="button"
          onClick={() => this.visualizeAlgorithm(1)}
        >
          A*
        </button>
        <button
          id="clear-button"
          className="button"
          onClick={() => this.clearGrid()}
        >
          Clear Board!
        </button>
        <button
          id="simple-maze"
          className="button"
          onClick={() => this.visualizeWalls(0)}
        >
          Simple Maze
        </button>

        <button
          id="recursive-maze"
          className="button"
          onClick={() => this.visualizeWalls(1)}
        >
          Recursive
        </button>

        <div className="button">
          <select>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
            <option>Option 5</option>
          </select>
        </div>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  let { row, col, isFinish, isStart, isWall } = node;

                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      // Pass the clickedIsStart and clickedIsFinish as props
                      clickedIsStart={clickedIsStart}
                      clickedIsFinish={clickedIsFinish}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  clearGrid() {
    if (isRunning) return;
    const newgrid = clearGridHelper();
    this.setState({ grid: newgrid });
    return newgrid;
  }

  clearPath(grid) {
    if (isRunning) return;
    const newgrid = clearGridHelperKeepWalls(grid);
    this.setState({ grid: newgrid });
  }

  visualizeWalls(maze) {
    this.clearGrid();
    if (isRunning) return;
    isRunning = true;

    const grid = clearGridHelper();
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var turnNodesToWalls = null;
    if (maze === 0) {
      turnNodesToWalls = simpleMaze(grid, startNode, finishNode);
    }
    if (maze === 1) {
      turnNodesToWalls = recursiveDivision(
        grid,
        1,
        GRID_HEIGHT - 2,
        1,
        GRID_LENGTH - 2,
        "HORIZONTAL",
        "regularMaze",
        mazeCreationSpeed
      );
    }
    if (turnNodesToWalls != null) {
      this.animateWalls(turnNodesToWalls, grid);
    }
  }

  animateWalls(turnNodesToWalls, grid) {
    for (let i = 0; i <= turnNodesToWalls.length; i++) {
      setTimeout(() => {
        const node = turnNodesToWalls[i];
        if (typeof node !== "undefined") {
          if (!node.isStart && !node.isFinish && node.isWall) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-wall";
          }
        }
        if (i === turnNodesToWalls.length - 1) {
          isRunning = false;
          this.setState({ grid: grid });
        }
      }, 10 * i);
    }
  }
}

function clearGridHelperKeepWalls(oldGrid) {
  const grid = [];
  for (let row = 0; row < GRID_HEIGHT; row++) {
    const currentRow = [];

    for (let col = 0; col < GRID_LENGTH; col++) {
      var node = createNode(col, row);

      if (oldGrid[row][col].isWall) node.isWall = true;

      if (node.isWall) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall";
      } else if (!node.isFinish && !node.isStart) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
      } else if (node.isFinish) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-finish";
      } else if (node.isStart) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-start";
      }

      currentRow.push(node);
    }
    grid.push(currentRow);
  }
  return grid;
}

function clearGridHelper() {
  const grid = [];
  for (let row = 0; row < GRID_HEIGHT; row++) {
    const currentRow = [];

    for (let col = 0; col < GRID_LENGTH; col++) {
      var node = createNode(col, row);
      node.isWall = false;

      if (!node.isFinish && !node.isStart) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
      } else if (node.isFinish) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-finish";
      } else if (node.isStart) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-start";
      }

      currentRow.push(node);
    }
    grid.push(currentRow);
  }
  return grid;
}

let getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < GRID_HEIGHT; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_LENGTH; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

let createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

let getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
