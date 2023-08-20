export function BFS(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  const visitedNodesInOrder = [];

  var queue = new Queue();

  startNode.distance = 0;
  queue.enqueue(startNode);

  while (queue.lenght !== 0) {
    var currentNode = queue.dequeue();

    if (typeof currentNode === "undefined") return visitedNodesInOrder;

    if (currentNode.isWall) continue;

    currentNode.distance = 0;
    currentNode.visited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;

    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      if (!neighbor.isWall) {
        queue.enqueue(neighbor);
        neighbor.visited = true;
        neighbor.previousNode = currentNode;
        neighbor.distance = 0;
      }
    }
  }
}

export function getAllFourNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

export function getUnvisitedNeighbors(node, grid) {
  var neighbors = getAllFourNeighbors(node, grid);
  return neighbors.filter((neighbor) => !neighbor.visited);
}

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
