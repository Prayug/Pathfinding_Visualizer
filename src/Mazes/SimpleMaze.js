export function simpleMaze(grid, startNode, finishNode){
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    const turnNodesToWalls = [];

    for (const row of grid) {
        for (const node of row) {
            if (getRandomNumber(0, 100) < 50 && getRandomNumber(0, 4) < 2) {
                if (!node.isStart && !node.isFinish) {
                    turnNodesToWalls.push(node);
                    node.isWall = true;
                }
            }
        }
    }
    return turnNodesToWalls;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}