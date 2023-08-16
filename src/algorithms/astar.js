import { getUnvisitedNeighbors } from "./bfs";
import Heap from "heap";

var notVisited;

export function astar(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) return false;

  const visitedNodesInOrder = [];

  notVisited = new Heap(function (a, b) {
    return a.fCost - b.fCost;
  });

  initializeCosts(grid);

  startNode.fCost = 0;
  startNode.gCost = 0;
  startNode.hCost = 0;

  notVisited.heapify();

  while (notVisited.length !== 0) {
    const currentNode = notVisited.pop();

    if (typeof currentNode === "undefined" || currentNode.fCost === Infinity) {
      return visitedNodesInOrder;
    }

    if (currentNode.isWall) continue;

    currentNode.visited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;

    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      if (!neighbor.isWall) {
        let hCost = manhattanDistance(
          neighbor.col,
          finishNode.col,
          neighbor.row,
          finishNode.row
        );
        if (currentNode.gCost + 1 < neighbor.gCost) {
          neighbor.hCost = hCost;
          neighbor.gCost = currentNode.gCost + 1;
          neighbor.fCost = neighbor.hCost + neighbor.gCost;
          neighbor.previousNode = currentNode;
          notVisited.updateItem(neighbor);
        }
      }
    }
  }

  return visitedNodesInOrder;
}

export function euclideanDistance(col1, col2, row1, row2) {
  const first = Math.abs(col1 - col2);
  const second = Math.abs(row1 - row2);
  const firstSquared = first * first;
  const secondSquared = second * second;
  return Math.pow(firstSquared + secondSquared, 0.5);
}

export function manhattanDistance(col1, col2, row1, row2) {
  const first = Math.abs(col1 - col2);
  const second = Math.abs(row1 - row2);
  return first + second;
}

function initializeCosts(grid) {
  for (let row of grid) {
    for (let node of row) {
      node.fCost = Infinity;
      node.gCost = Infinity;
      node.hCost = Infinity;
      notVisited.push(node);
    }
  }
}
