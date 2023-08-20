import { getAllFourNeighbors } from "../algorithms/bfs";

export var INTERSECT_NODE_ROW;
export var INTERSECT_NODE_COL;

export function biDirectional(grid, startNode, finishNode) {
  INTERSECT_NODE_ROW = -1;
  INTERSECT_NODE_COL = -1;
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  const visitedNodesInOrder = [];

  var queueStart = new Queue();
  var queueFinish = new Queue();
  queueStart.enqueue(startNode);
  queueFinish.enqueue(finishNode);

  while (queueStart.length !== 0 && queueFinish.length !== 0) {
    var currStartNode = queueStart.dequeue();
    var currFinishNode = queueFinish.dequeue();

    if (typeof currStartNode === "undefined") {
      return visitedNodesInOrder;
    }
    if (typeof currFinishNode === "undefined") {
      return visitedNodesInOrder;
    }

    currStartNode.visited = true;
    currFinishNode.visited = true;
    visitedNodesInOrder.push(currStartNode);
    visitedNodesInOrder.push(currFinishNode);

    if (isIntersecting(visitedNodesInOrder)) {
      return visitedNodesInOrder;
    }

    const unvisitedNeighborsStart = getUnvisitedNeighborsStart(
      currStartNode,
      grid
    );
    const unvisitedNeighborsFinish = getUnvisitedNeighborsFinish(
      currFinishNode,
      grid
    );

    for (const neighbor of unvisitedNeighborsStart) {
      if (!neighbor.isWall) {
        neighbor.visited = true;
        neighbor.visitedByStart = true;
        neighbor.previousNode = currStartNode;
        queueStart.enqueue(neighbor);
      }
    }

    for (const neighbor of unvisitedNeighborsFinish) {
      if (!neighbor.isWall) {
        neighbor.visited = true;
        neighbor.visitedByFinish = true;
        neighbor.previousNode = currFinishNode;
        queueFinish.enqueue(neighbor);
      }
    }
  }
}

function isIntersecting(visitedNodesInOrder) {
  for (var node of visitedNodesInOrder) {
    if (node.visitedByStart && node.visitedByFinish && !node.isWall) {
      INTERSECT_NODE_ROW = node.row;
      INTERSECT_NODE_COL = node.col;
      return true;
    }
  }
  return false;
}

function getUnvisitedNeighborsStart(node, grid) {
  var neighbors = getAllFourNeighbors(node, grid);
  return neighbors.filter(
    (neighbor) => neighbor.visitedByFinish || !neighbor.visited
  );
}

function getUnvisitedNeighborsFinish(node, grid) {
  var neighbors = getAllFourNeighbors(node, grid);
  return neighbors.filter(
    (neighbor) => neighbor.visitedByStart || !neighbor.visited
  );
}

/*

Queue.js

A function to represent a queue

Created by Kate Morley - http://code.iamkate.com/ - and released under the terms
of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

function Queue() {
  var queue = [];
  var offset = 0;

  this.getLength = function () {
    return queue.length - offset;
  };

  this.isEmpty = function () {
    return queue.length === 0;
  };

  this.enqueue = function (item) {
    queue.push(item);
  };

  this.dequeue = function () {
    if (queue.length === 0) return undefined;

    var item = queue[offset];

    if (++offset * 2 >= queue.length) {
      queue = queue.slice(offset);
      offset = 0;
    }

    return item;
  };

  this.peek = function () {
    return queue.length > 0 ? queue[offset] : undefined;
  };
}
