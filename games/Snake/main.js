/*
    TO DO:
        Stop loop - button and disable everything else
        Score count
        Animation
*/


const idxs = [  [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15],
                [4, 8, 12, 5, 9, 13, 6, 10, 14, 7, 11, 15],
                [2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12],
                [8, 4, 0, 9, 5, 1, 10, 6, 2, 11, 7, 3]      ];
const dir = [-1, -4, 1, 4];
const stop = [  [-1, 3, 7, 11],
                [-1, 0, 1, 2],
                [4, 8, 12, 16],
                [13, 14, 15, 16]    ];

function windowResized() {
    size = calculateCanvasSize();
    resizeCanvas(size, size);
    let canvas_start_pos = updateCanvasStart();
    canvas.position(canvas_start_pos, init_top);
    getBlockPositions();
    updateBlocks();
    let blockArray = updateKeys(canvas_start_pos);
    updateScoreBlock(blockArray);
}

function calculateCanvasSize() {
    if (windowWidth > windowHeight) {
        size = 0.5 * windowWidth;
        size = Math.min(size, (windowHeight - 1.2*init_top));
    }
    else {
        size = 0.9 * windowWidth;
        let max_height = 0.6* windowHeight - 1.2*init_top;
        size = Math.min(size, max_height);
    }
    return size
}

function updateCanvasStart() {
    let canvas_start_pos = 0;
    if (windowWidth > windowHeight) {
        canvas_start_pos = 0.95*windowWidth - size;
    }
    else {
        canvas_start_pos = (windowWidth - size)/2.0;
    }
    return canvas_start_pos;
}

function updateScoreBlock(arr) {
    if (windowWidth > windowHeight) {
        updateScoreBlockPC(arr);
    } 
    else {
        updateScoreBlockMobile(arr);
    }
}

function updateScoreBlockMobile(arr) {
    let keys_start_left = arr[0];
    let keys_start_top = arr[1];
    let keys_width = arr[2];
    let keys_height = arr[3];
    let keys_gap = arr[4];
    let ratio = 1.0/6;
    const scoreBlockDiv = document.querySelector(".score-table");
    const scoreBlock = document.querySelector(".score");
    const restartButtonContainer = document.querySelector(".restart-button-container");
    const restartButton = document.querySelector(".restart-button");
    let occupied_height =  1*init_top + size;
    let score_block_height = ratio * keys_width;
    let score_block_width = keys_width - keys_gap - score_block_height;
    let restart_button_size = score_block_height;
    let score_start_top = occupied_height + (keys_start_top - occupied_height)/2.0 - (score_block_height/2.0);
    let restart_start_left = keys_start_left;
    let score_start_left = keys_start_left + keys_gap + restart_button_size;
    scoreBlockDiv.style.width = String(score_block_width) + "px";
    scoreBlockDiv.style.height = String(score_block_height) + "px";
    scoreBlockDiv.style.marginTop = String(score_start_top) + "px";
    scoreBlockDiv.style.marginLeft = String(score_start_left) + "px";
    scoreBlock.style.width = String(score_block_width) + "px";
    scoreBlock.style.height = String(score_block_height) + "px";
    let font_size = (5.0/6) * ratio * keys_width;
    scoreBlock.style.fontSize = String(font_size) + "px";
    restartButton.style.width = String(restart_button_size) + "px";
    restartButton.style.height = String(restart_button_size) + "px";
    restartButtonContainer.style.width = String(restart_button_size) + "px";
    restartButtonContainer.style.height = String(restart_button_size) + "px";
    restartButtonContainer.style.marginTop = String(score_start_top) + "px";
    restartButtonContainer.style.marginLeft = String(restart_start_left) + "px";
    restartButtonContainer.style.fontSize = String(font_size) + "px";
}

function updateScoreBlockPC(arr) {
    let keys_start_left = arr[0];
    let keys_start_top = arr[1];
    let keys_width = arr[2];
    let keys_height = arr[3];
    let keys_gap = arr[4];
    const scoreBlockDiv = document.querySelector(".score-table");
    const scoreBlock = document.querySelector(".score");
    const restartButtonContainer = document.querySelector(".restart-button-container");
    const restartButton = document.querySelector(".restart-button");
    ratio = 1.0/6;
    let score_block_height = ratio * keys_width;
    let score_block_width = keys_width - keys_gap - score_block_height;
    let restart_button_size = score_block_height;
    let score_start_top = init_top + 5*keys_gap;
    let restart_start_left = keys_start_left;
    let score_start_left = keys_start_left + keys_gap + restart_button_size;
    scoreBlockDiv.style.marginTop = String(score_start_top) + "px";
    scoreBlockDiv.style.marginLeft = String(score_start_left) + "px";
    restartButtonContainer.style.marginTop = String(score_start_top) + "px";
    restartButtonContainer.style.marginLeft = String(restart_start_left) + "px";
    scoreBlockDiv.style.width = String(score_block_width) + "px";
    scoreBlockDiv.style.height = String(score_block_height) + "px";
    scoreBlock.style.width = String(score_block_width) + "px";
    scoreBlock.style.height = String(score_block_height) + "px";
    restartButtonContainer.style.width = String(restart_button_size) + "px";
    restartButtonContainer.style.height = String(restart_button_size) + "px";
    restartButton.style.width = String(restart_button_size) + "px";
    restartButton.style.height = String(restart_button_size) + "px";
    let font_size = (5.0/6) * ratio * keys_width;
    restartButtonContainer.style.fontSize = String(font_size) + "px";
    scoreBlock.style.fontSize = String(font_size) + "px";
}

function updateKeys(pos) {
    let arr = [];
    if (windowWidth > windowHeight) {
        arr = updateKeysPC(pos);
    } 
    else {
        arr = updateKeysMobile(pos);
    }
    return arr;
}

function updateKeysMobile(pos) {
    const keys = document.querySelector(".arrow-buttons");
    let top_space = 0.1*windowHeight;
    let bot_space = 0.05*windowHeight;
    const keys_style = getComputedStyle(keys);
    let keys_gap = parseInt(keys_style.getPropertyValue("gap"));
    let keys_height = windowHeight - 1.2*init_top - size - top_space - bot_space;
    let key_width = (keys_height - keys_gap)/2.0;
    key_width = Math.min(key_width, (0.7*size)/3.0);
    let keys_width = 3*key_width + 2*keys_gap;
    let key = document.querySelectorAll(".arrow-button");
    let key_width_value = String(key_width) + "px";
    let key_font_size = key_width * (2/3);
    let key_font_size_value = String(key_font_size) + "px";
    let key_start_top = windowHeight - bot_space - keys_height;
    let key_start_left = (windowWidth - keys_width)/2.0;
    let key_start_top_value = String(key_start_top) + "px";
    let key_start_left_value = String(key_start_left) + "px";
    key.forEach((k) => {
        k.style.width = key_width_value;
        k.style.height = key_width_value;
        k.style.fontSize = key_font_size_value;
    });
    keys.style.marginTop = key_start_top_value;
    keys.style.marginLeft = key_start_left_value;
    let keybox_width_value = String(keys_width) + "px";
    let keybox_height_value = String(keys_height) + "px";
    keys.style.width = keybox_width_value;
    keys.style.height = keybox_height_value;
    return [key_start_left, key_start_top, keys_width, keys_height, keys_gap]
}

function updateKeysPC(pos) {
    const keys = document.querySelector(".arrow-buttons");
    let space = windowWidth - pos - size;
    let keys_width = windowWidth - (windowWidth - pos) - 2*space;
    const keys_style = getComputedStyle(keys);
    let keys_gap = parseInt(keys_style.getPropertyValue("gap"));
    let key_width = (keys_width - 2*keys_gap)/3.0;
    key_width = Math.min(key_width, 160, ((0.5*size)/2.0 - keys_gap));
    key_width = Math.max(key_width, 60);
    keys_width = 3*key_width + 2*keys_gap;
    let key = document.querySelectorAll(".arrow-button");
    let key_width_value = String(key_width) + "px";
    let key_start_top = init_top + size - 2*key_width - 5*keys_gap;
    let key_start_left = (windowWidth - size - space)/2 - 1.5*key_width - keys_gap;
    let key_start_top_value = String(key_start_top) + "px";
    let key_start_left_value = String(key_start_left) + "px";
    let key_font_size = key_width * (2/3);
    let key_font_size_value = String(key_font_size) + "px";
    key.forEach((k) => {
        k.style.width = key_width_value;
        k.style.height = key_width_value;
        k.style.fontSize = key_font_size_value;
    });
    keys.style.marginTop = key_start_top_value;
    keys.style.marginLeft = key_start_left_value;
    let keybox_width_value = String(keys_width) + "px";
    let keybox_height_value = String(2*key_width + keys_gap) + "px";
    keys.style.width = keybox_width_value;
    keys.style.height = keybox_height_value;
    return [key_start_left, key_start_top, keys_width, 0, keys_gap]
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

function addButtonEventListeners() {
    buttonIds = ["left-arrow", "up-arrow", "right-arrow", "down-arrow"];
    for (let i = 0; i < buttonIds.length; i++) {
        const button = document.getElementById(buttonIds[i]);
        button.addEventListener("click", function() {
            buttonPressed(i);
        });
    }
    restartButton = document.querySelector(".restart-button")
    restartButton.addEventListener("click", function() {
        setup();
    });
}

function setup() {
    gameOver = false;
    score = 0;
    canvas = createCanvas(size, size);
    for (let i = 0; i < n*n; i++) {
        blocks[i] = null;
        isEmpty[i] = true;
    }
    windowResized();   
    generateBlock();
    addButtonEventListeners();
}
  
function draw() {
    background(140, 140, 140);    
    noStroke();
    fill(200);

    drawScore();

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
    let scoreDiv = document.querySelector(".score");
    scoreDiv.innerHTML = String(score);
}

function buttonPressed(idx) {
    moveBlocks(idxs[idx], dir[idx], stop[idx]);
}

function keyPressed() {
    let idx = 0;
    if (keyCode === LEFT_ARROW || keyCode === 65) {
        idx = 0;
    }
    else if(keyCode === UP_ARROW || keyCode === 87) {
        idx = 1;
    }
    else if (keyCode === RIGHT_ARROW || keyCode === 68) {
        idx = 2;
    }
    else if (keyCode === DOWN_ARROW || keyCode === 83) {
        idx = 3;
    }
    else if (keyCode === 82) {
        setup();
        return;
    }
    else return;
    moveBlocks(idxs[idx], dir[idx], stop[idx]);
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
