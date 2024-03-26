import React, { Component } from "react";
import Modal from "../Modal/Modal";

import Node from "./Node/Node";
import {
  dijkstra,
  getNodesInShortestPathOrder,
  getNodesInShortestPathOrderBiDirectional,
} from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { BFS } from "../algorithms/bfs";
import {
  biDirectional,
  INTERSECT_NODE_COL,
  INTERSECT_NODE_ROW,
} from "../algorithms/biDirectional";
import { recursiveDivision } from "../Mazes/RecursiveDivision";
import { simpleMaze } from "../Mazes/SimpleMaze";

import "./PathfindingVisualizer.css";

let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 29;

const GRID_HEIGHT = 21;
const GRID_LENGTH = 45;

let clickedIsStart = false;
let clickedIsFinish = false;
var mouseIsPressed = false;
var isRunning = false;
var stopWatchOn = false;

let mazeCreationSpeed = 10;
let algorithmSpeed = 10;

let weightsActive = false;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      algorithmStartTime: null,
      algorithmEndTime: null,
      stopwatchInterval: null,
      weightsActive: false,
    };
  }

  callHelpScreen(screen) {
    switch (screen) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
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

  handleMouseDown(row, col, weight) {
    if (isRunning) return;

    const grid = this.state.grid;
    mouseIsPressed = true;

    var node = grid[row][col];

    if (node.isStart) {
      clickedIsStart = true;
      return;
    }

    if (node.isFinish) {
      clickedIsFinish = true;
      return;
    }
    if (weight == 0) {
      node.isWall = !node.isWall;
      if (node.isWall && !node.isStart && !node.isFinish) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall";
      } else if (!node.isStart && !node.isFinish && node.weight == 0) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
      } else if (node.weight != 0 && !node.isStart && !node.isFinish) {
      }
    } else {
    }
  }

  handleMouseEnter(row, col, weight) {
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

    console.log(this.state.weightsActive);
    if (this.state.weightsActive) {
      console.log("here rn");
      node.isWall = !node.isWall;
      if (node.isWall && !node.isStart && !node.isFinish) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall";
        node.weight = weight;
      } else if (!node.isStart && !node.isFinish) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
        node.weight = 1;
      }
    } else {
      console.log("here instead");
      node.isWall = !node.isWall;
      if (node.isWall && !node.isStart && !node.isFinish) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall";
      } else if (!node.isStart && !node.isFinish) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
      }
    }
  }

  handleMouseUp() {
    if (isRunning) return;
    clickedIsStart = false;
    clickedIsFinish = false;
    mouseIsPressed = false;
  }

  startStopwatch() {
    this.setState({
      stopwatchInterval: setInterval(() => {
        const currentTime = new Date().getTime();
        this.setState({ algorithmEndTime: currentTime });
      }, 10),
    });
  }

  stopStopwatch() {
    clearInterval(this.state.stopwatchInterval);
    this.setState({ stopwatchInterval: null });
  }

  animateShortestPath(nodesInShortestPathOrder) {
    console.log(nodesInShortestPathOrder);

    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 5 * algorithmSpeed * i);
    }
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    const startTime = new Date().getTime();
    this.setState({ algorithmStartTime: startTime });

    this.startStopwatch();

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";

        if (i === visitedNodesInOrder.length - 1) {
          this.stopStopwatch();
          setTimeout(() => {
            this.animateShortestPath(nodesInShortestPathOrder);
          }, 10 * nodesInShortestPathOrder.length);
        }
      }, algorithmSpeed * i);
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
    if (algorithm === 2) {
      visitedNodesInOrder = BFS(grid, startNode, finishNode);
    }
    if (algorithm === 3) {
      visitedNodesInOrder = biDirectional(grid, startNode, finishNode);
      nodesInShortestPathOrder = this.biDirectionalHelper(
        grid,
        visitedNodesInOrder
      );
    }

    if (algorithm !== 3) {
      nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    }

    if (visitedNodesInOrder !== false) {
      if (algorithm === 3) {
        this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
      } else {
        this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
      }
    }
  }

  biDirectionalHelper(grid, visitedNodesInOrder) {
    var nodesInShortestPathOrder = [];
    if (
      typeof INTERSECT_NODE_COL !== "undefined" &&
      typeof INTERSECT_NODE_ROW !== "undefined" &&
      INTERSECT_NODE_ROW !== -1 &&
      INTERSECT_NODE_COL !== -1
    ) {
      const intersectNode = grid[INTERSECT_NODE_ROW][INTERSECT_NODE_COL];
      const nodesInShortestPathOrder1 =
        getNodesInShortestPathOrder(intersectNode);
      const nodesInShortestPathOrder2 = this.findSecondBranch(
        grid,
        nodesInShortestPathOrder1,
        visitedNodesInOrder
      );
      const nodesInShortestPathOrderCombined = nodesInShortestPathOrder1.concat(
        nodesInShortestPathOrder2
      );
      nodesInShortestPathOrder = nodesInShortestPathOrderCombined;
    }
    return nodesInShortestPathOrder;
  }

  findSecondBranch(grid, firstBranch, visitedNodesInOrder) {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    let rightBesideIntersectNode = null;
    let rightWithinBounds = true;
    if (INTERSECT_NODE_COL + 1 >= GRID_LENGTH) rightWithinBounds = false;
    else
      rightBesideIntersectNode =
        grid[INTERSECT_NODE_ROW][INTERSECT_NODE_COL + 1];

    let belowBesideIntersectNode = null;
    let belowWithinBounds = true;
    if (INTERSECT_NODE_ROW + 1 >= GRID_HEIGHT) belowWithinBounds = false;
    else
      belowBesideIntersectNode =
        grid[INTERSECT_NODE_ROW + 1][INTERSECT_NODE_COL];

    let leftBesideIntersectNode = null;
    let leftWithinBounds = true;
    if (INTERSECT_NODE_COL - 1 < 0) leftWithinBounds = false;
    else
      leftBesideIntersectNode =
        grid[INTERSECT_NODE_ROW][INTERSECT_NODE_COL - 1];

    let aboveBesideIntersectNode = null;
    let aboveWithinBounds = true;
    if (INTERSECT_NODE_ROW - 1 < 0) aboveWithinBounds = false;
    else
      aboveBesideIntersectNode =
        grid[INTERSECT_NODE_ROW - 1][INTERSECT_NODE_COL];

    let nodesInShortestPathOrderTestRight = [];

    if (rightWithinBounds) {
      nodesInShortestPathOrderTestRight =
        getNodesInShortestPathOrderBiDirectional(
          rightBesideIntersectNode,
          visitedNodesInOrder
        );
    }
    let nodesInShortestPathOrderTestBelow = [];
    if (belowWithinBounds) {
      nodesInShortestPathOrderTestBelow =
        getNodesInShortestPathOrderBiDirectional(
          belowBesideIntersectNode,
          visitedNodesInOrder
        );
    }
    let nodesInShortestPathOrderTestLeft = [];
    if (leftWithinBounds) {
      nodesInShortestPathOrderTestLeft =
        getNodesInShortestPathOrderBiDirectional(
          leftBesideIntersectNode,
          visitedNodesInOrder
        );
    }
    let nodesInShortestPathOrderTestAbove = [];
    if (aboveWithinBounds) {
      nodesInShortestPathOrderTestAbove =
        getNodesInShortestPathOrderBiDirectional(
          aboveBesideIntersectNode,
          visitedNodesInOrder
        );
    }

    if (this.arrayContainsGivenNode(firstBranch, startNode)) {
      if (
        rightWithinBounds &&
        this.arrayContainsGivenNode(
          nodesInShortestPathOrderTestRight,
          finishNode
        )
      )
        return nodesInShortestPathOrderTestRight;

      if (
        belowWithinBounds &&
        this.arrayContainsGivenNode(
          nodesInShortestPathOrderTestBelow,
          finishNode
        )
      )
        return nodesInShortestPathOrderTestBelow;

      if (
        leftWithinBounds &&
        this.arrayContainsGivenNode(
          nodesInShortestPathOrderTestLeft,
          finishNode
        )
      )
        return nodesInShortestPathOrderTestLeft;

      if (
        aboveWithinBounds &&
        this.arrayContainsGivenNode(
          nodesInShortestPathOrderTestAbove,
          finishNode
        )
      )
        return nodesInShortestPathOrderTestAbove;
    } else {
      if (
        this.arrayContainsGivenNode(
          rightWithinBounds && nodesInShortestPathOrderTestRight,
          startNode
        )
      )
        return nodesInShortestPathOrderTestRight;

      if (
        this.arrayContainsGivenNode(
          belowWithinBounds && nodesInShortestPathOrderTestBelow,
          startNode
        )
      )
        return nodesInShortestPathOrderTestBelow;

      if (
        leftWithinBounds &&
        this.arrayContainsGivenNode(nodesInShortestPathOrderTestLeft, startNode)
      )
        return nodesInShortestPathOrderTestLeft;

      if (
        aboveWithinBounds &&
        this.arrayContainsGivenNode(
          nodesInShortestPathOrderTestAbove,
          startNode
        )
      )
        return nodesInShortestPathOrderTestAbove;
    }
  }

  arrayContainsGivenNode(array, node) {
    for (let element of array) {
      if (element.row === node.row && element.col === node.col) {
        return true;
      }
    }
    return false;
  }

  toggleWeights = () => {
    this.setState((prevState) => ({
      weightsActive: !prevState.weightsActive,
    }));
  };

  render() {
    const { grid, mouseIsPressed, algorithmStartTime, algorithmEndTime } =
      this.state;

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
          id="bfs-button"
          className="button"
          onClick={() => this.visualizeAlgorithm(2)}
        >
          Breadth First
        </button>
        <button
          id="BiD-button"
          className="button"
          onClick={() => this.visualizeAlgorithm(3)}
        >
          Bi Directional
        </button>
        <button
          id="clear-button"
          className="button"
          onClick={() => this.clearGrid()}
        >
          Clear Board!
        </button>
        <button
          id="clearPath-button"
          className="button"
          onClick={() => this.clearPath(grid)}
        >
          Clear Path!
        </button>
        <button
          id="simple-maze"
          className="button"
          onClick={() => this.visualizeWalls(0)}
        >
          Simple Maze
        </button>
        <button
          id="weights"
          className="button"
          onClick={() => this.toggleWeights()}
        >
          Weights
        </button>
        <button
          id="recursive-maze"
          className="button"
          onClick={() => this.visualizeWalls(1)}
        >
          Recursive
        </button>

        <div class="algoDropdown">
          <button className="button" id="algoSpeedDropdown">
            {" "}
            Algorithm Speed
          </button>
          <ul class="algoDropdown-list">
            <li class="algoDropdown-item" onClick={() => this.setAlgoSpeed(0)}>
              Instant
            </li>
            <li class="algoDropdown-item" onClick={() => this.setAlgoSpeed(5)}>
              Fast
            </li>
            <li class="algoDropdown-item" onClick={() => this.setAlgoSpeed(10)}>
              Normal
            </li>
            <li class="algoDropdown-item" onClick={() => this.setAlgoSpeed(15)}>
              Slow
            </li>
            <li class="algoDropdown-item" onClick={() => this.setAlgoSpeed(25)}>
              Slower
            </li>
          </ul>
        </div>

        <div class="mazeDropdown">
          <button class="button" id="speedDropdown">
            {" "}
            Generation Speed
          </button>
          <ul class="mazeDropdown-list">
            <li class="mazeDropdown-item" onClick={() => this.setMazeSpeed(0)}>
              Instant
            </li>
            <li class="mazeDropdown-item" onClick={() => this.setMazeSpeed(5)}>
              Fast
            </li>
            <li class="mazeDropdown-item" onClick={() => this.setMazeSpeed(10)}>
              Normal
            </li>
            <li class="mazeDropdown-item" onClick={() => this.setMazeSpeed(15)}>
              Slow
            </li>
            <li class="mazeDropdown-item" onClick={() => this.setMazeSpeed(25)}>
              Slower
            </li>
          </ul>
        </div>

        <div className="stopwatch">
          {(algorithmEndTime - algorithmStartTime) / 1000} seconds
        </div>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  let { row, col, isFinish, isStart, isWall, weight } = node;

                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      weight={weight}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col, weight) =>
                        this.handleMouseDown(row, col, weight)
                      }
                      onMouseEnter={(row, col, weight) =>
                        this.handleMouseEnter(row, col, weight)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      clickedIsStart={clickedIsStart}
                      clickedIsFinish={clickedIsFinish}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <Modal />
      </>
    );
  }

  setMazeSpeed(speed) {
    mazeCreationSpeed = speed;
  }

  setAlgoSpeed(speed) {
    algorithmSpeed = speed;
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
        "regularMaze"
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
      }, mazeCreationSpeed * i);
    }
  }
}

function clearGridHelperKeepWalls(oldGrid) {
  const grid = [];
  for (let row = 0; row < GRID_HEIGHT; row++) {
    const currentRow = [];

    for (let col = 0; col < GRID_LENGTH; col++) {
      var node = createNode(col, row, 0);

      if (oldGrid[row][col].isWall) node.isWall = true;
      node.weight = 1;

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
      var node = createNode(col, row, 0);
      node.isWall = false;
      node.weight = 1;

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
      currentRow.push(createNode(col, row, 0));
    }
    grid.push(currentRow);
  }
  return grid;
};

let createNode = (col, row, weight) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    weight,
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
