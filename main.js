/*
    TO DO:
        Stop loop - button and disable everything else
        Score count
        Animation
*/

let size;
let canvas;
let blockPositions = [];
let space = 10;
let blockBorderRadius = 10;
let n = 4;
let blockSize;
let blocks = [];
let isEmpty = []
let gameOver;
let score;
let scoreLabel;

function windowResized() {
    size = 0.8 * Math.min(windowWidth, windowHeight);
    resizeCanvas(size, size);
    canvas.center("horizontal");
    getBlockPositions();
    updateBlocks();
}

function getBlockPositions() {
    blockSize = round((size - (n+1)*space)/n);
    blockPositions = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {    
            let idx = i*n + j;
            let x = (j + 1)*space + j*blockSize;
            let y = (i + 1)*space + i*blockSize;
            blockPositions[idx] = [x, y];
        }
    }
}

function updateBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] === null) continue;
        blocks[i].pos = blockPositions[i];
        blocks[i].size = blockSize;
    }   
}

function setup() {
    gameOver = false;
    score = 0;
    scoreLabel = createElement("p", "Score");
    canvas = createCanvas(size, size);
    for (let i = 0; i < n*n; i++) {
        blocks[i] = null;
        isEmpty[i] = true;
    }
    windowResized();   
    generateBlock();
}
  
function draw() {
    background(140, 140, 140);    

    noStroke();
    fill(200);
    for (let i = 0; i < blockPositions.length; i++) {
        rect(blockPositions[i][0], blockPositions[i][1], blockSize, blockSize, blockBorderRadius);
    }

    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] === null) continue;
        blocks[i].drawBlock();
    }

    if (checkGameOver()) {
        if (gameOver) {
            stopGame();
        }
        else {
            gameOver = true;
        }
    }
}

function drawScore() {
    let pos = canvas.position();
    let posX = pos["x"] + 20;
    let posY = pos["y"] + n*blockSize + (n+1)*space + 20;
    let txt = "Score: " + String(score);
    //scoreLabel.(txt);
    scoreLabel.style("color", "black");
    scoreLabel.position(posX, posY);
    /*textStyle(BOLD);
    textSize(0.1*blockSize);
    textAlign(LEFT, CENTER);*/
    //text(txt 50, 50);
}

function keyPressed() {
    let idxs = [];
    let dir = 0;
    let stop = [];
    if (keyCode === LEFT_ARROW || keyCode === 65) {
        idxs = [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15];
        dir = -1;
        stop = [-1, 3, 7, 11];
    }
    else if(keyCode === UP_ARROW || keyCode === 87) {
        idxs = [4, 8, 12, 5, 9, 13, 6, 10, 14, 7, 11, 15];
        dir = -4;
        stop = [-1, 0, 1, 2];
    }
    else if (keyCode === RIGHT_ARROW || keyCode === 68) {
        idxs = [2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12];
        dir = 1;
        stop = [4, 8, 12, 16];
    }
    else if (keyCode === DOWN_ARROW || keyCode === 83) {
        idxs = [8, 4, 0, 9, 5, 1, 10, 6, 2, 11, 7, 3];
        dir = 4;
        stop = [13, 14, 15, 16];
    }
    else if (keyCode === 82) {
        setup();
        return;
    }
    else return;
    moveBlocks(idxs, dir, stop);
}

function moveBlocks(idxs, dir, stop) {
    isMerged = [];
    for (let i = 0; i < idxs.length; i++) {
        isMerged[i] = false;
    }

    let change = false;
    for (let i = 0; i < idxs.length; i++) {
        idx = idxs[i];
        if (isEmpty[idx]) continue;
        block = blocks[idx];

        let tmp_idx = idx;
        let stop_idx = 0;
        let merged = false;
        if (Math.abs(dir) === 1) stop_idx = Math.floor(idx / n);
        else if (Math.abs(dir) === 4) stop_idx = Math.floor(idx % n);
        if (dir < 0) {
            while (tmp_idx > stop[stop_idx]) {
                tmp_idx += dir;
                if (tmp_idx <= stop[stop_idx]) break;
                if (!isEmpty[tmp_idx]) {
                    if (!isMerged[tmp_idx]) {
                        merged = tryMerge(idx, tmp_idx);
                        if (merged) isMerged[tmp_idx] = true;
                        break;
                    }
                    else break;
                }
            }
        }
        else {
            while (tmp_idx < stop[stop_idx]) {
                tmp_idx += dir;
                if (tmp_idx >= stop[stop_idx]) break;
                if (!isEmpty[tmp_idx]) {
                    if (!isMerged[tmp_idx]) {
                        merged = tryMerge(idx, tmp_idx);
                        if (merged) isMerged[tmp_idx] = true;
                        break;
                    }
                    else break;
                }
            }
        }   
        tmp_idx -= dir;
        if (tmp_idx === idx) continue;

        addBlock(tmp_idx, block);
        removeBlock(idx);
        change = true;
    }
    console.log(isEmpty)
    console.log(isMerged)
    if (change) generateBlock();
}

function tryMerge(idx1, idx2) {
    block1 = blocks[idx1];
    block2 = blocks[idx2];

    if (block1.value === block2.value) {
        removeBlock(idx1);
        removeBlock(idx2);
        createBlock(idx2, block1.value*2);
        return true;
    }   
    else return false; 
}

function generateBlock() {
    let value = 2 * Math.ceil(random(0, 2));
    let idxs = [];
    let i = 0;
    for (let j = 0; j < isEmpty.length; j++) {
        if (isEmpty[j]) {
            idxs[i] = j;
            i++;
        }
    }
    let idx = idxs[Math.round(random(0, idxs.length - 1))];
    console.log(idx);
    createBlock(idx, value);
}

function createBlock(idx, value) {
    blocks[idx] = new Block(blockPositions[idx], blockSize, blockBorderRadius, value);
    isEmpty[idx] = false;
    score += value;
}

function removeBlock(idx) {
    blocks[idx] = null;
    isEmpty[idx] = true;
}

function addBlock(idx, block) {
    block.pos = blockPositions[idx];
    blocks[idx] = block;
    isEmpty[idx] = false;
}

function checkGameOver() {
    for (let i = 0; i < isEmpty.length; i++) {
        if (isEmpty[i]) {
            return false;
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let mainValue = blocks[n*i + j].value;
            let values = [];
            if (i !== n-1) {
                values[0] = blocks[n*(i+1) + j].value;
            }
            if (j !== n-1) {
                values[1] = blocks[n*i + (j+1)].value;
            }
            for (let k = 0; k < values.length; k++) {
                if (mainValue === values[k]) return false;
            }
        }
    }
    return true;
}

function stopGame() {
    background(50, 50, 50);
    let d = new Date();
    let init_time = d.getTime();
    while (true) {
        d = new Date();
        if ((d.getTime() - init_time) > 5000) break;
    }
    setup();
}
