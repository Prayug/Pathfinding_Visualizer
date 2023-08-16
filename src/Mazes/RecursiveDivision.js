var nodesToBeWalls = [];
var typeOfMaze = "";
var mazeSpeed;

export function recursiveDivision(
  grid,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  order,
  type,
  mazeCreationSpeed
) {
  nodesToBeWalls = [];
  typeOfMaze = type;
  mazeSpeed = mazeCreationSpeed;

  recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, colEnd, order);
  return nodesToBeWalls;
}

export function recursiveDivisionMaze(
  grid,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  order
) {
  if(mazeSpeed === "normal");
  if(mazeSpeed === "fast"){

  }
  if(mazeSpeed === "slow"){
    setTimeout(() => {},50*nodesToBeWalls.length+300*(colEnd-colStart));
  }

  if (rowEnd < rowStart || colEnd < colStart) return;

  if (order === "HORIZONTAL") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }

    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }

    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];

    const row = grid[currentRow];
    for (const node of row) {
      if (
        node.row === currentRow &&
        !node.isStart &&
        !node.isFinish &&
        node.col !== colRandom &&
        !node.visited &&
        node.col >= colStart - 1 &&
        node.col <= colEnd + 1
      ) {
        node.isWall = true;
        node.visited = true;
        nodesToBeWalls.push(node);
      }
    }

    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        switchType(order, order, "VERTICAL")
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        switchType("VERTICAL", "VERTICAL", "VERTICAL")
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        switchType(order, order, "VERTICAL")
      );
    } else {
      recursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        switchType("VERTICAL", "VERTICAL", "VERTICAL")
      );
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];

    for (let row = rowStart - 1; row <= rowEnd + 1; row++) {
      const nodes = grid[row];
      const node = nodes[currentCol];
      if (
        !node.isStart &&
        !node.isFinish &&
        node.col === currentCol &&
        !node.visited &&
        node.row >= rowStart - 1 &&
        node.row <= rowEnd + 1 &&
        node.row !== rowRandom
      ) {
        node.visited = true;
        node.isWall = true;
        nodesToBeWalls.push(node);
      }
    }

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        switchType("HORIZONTAL", "HORIZONTAL", order)
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        switchType(order, "HORIZONTAL", order)
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        switchType("HORIZONTAL", "HORIZONTAL", "HORIZONTAL")
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        switchType(order, "HORIZONTAL", order)
      );
    }
  }
}

function switchType(maze1, maze2, maze3) {
  if (typeOfMaze === "regularMaze") {
    return maze1;
  } else if (typeOfMaze === "horizontalMaze") {
    return maze2;
  } else if (typeOfMaze === "verticalMaze") {
    return maze3;
  }
}
