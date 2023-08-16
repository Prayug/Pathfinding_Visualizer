export function BFS(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  const visitedNodesInOrder = [];
  
  var queue = new Queue();

  startNode.distance = 0;
  queue.enqueue(startNode);

  while(queue.lenght !== 0) {
    var currentNode = queue.dequeue();

    if(typeof currentNode === "undefined") return visitedNodesInOrder;

    if(currentNode.isWall) continue;

    currentNode.distance = 0;
    currentNode.visited = true;
    visitedNodesInOrder.push(currentNode);

    if(currentNode === finishNode) return visitedNodesInOrder;

    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for(const neighbor of unvisitedNeighbors) {
        if(!neighbor.isWall){
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
  // initialise the queue and offset
  var queue = [];
  var offset = 0;

  // Returns the length of the queue.
  this.getLength = function () {
    return queue.length - offset;
  };

  // Returns true if the queue is empty, and false otherwise.
  this.isEmpty = function () {
    return queue.length === 0;
  };

  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  this.enqueue = function (item) {
    queue.push(item);
  };

  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  this.dequeue = function () {
    // if the queue is empty, return immediately
    if (queue.length === 0) return undefined;

    // store the item at the front of the queue
    var item = queue[offset];

    // increment the offset and remove the free space if necessary
    if (++offset * 2 >= queue.length) {
      queue = queue.slice(offset);
      offset = 0;
    }

    // return the dequeued item
    return item;
  };

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function () {
    return queue.length > 0 ? queue[offset] : undefined;
  };
}
