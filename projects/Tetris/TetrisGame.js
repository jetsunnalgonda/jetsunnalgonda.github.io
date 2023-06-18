class TetrisGame {
  constructor(fieldX, fieldY, blockSize, spriteSheet, spriteData) {
    this.gameOver = false;
    this.paused = false;
    this.score = 0;
    this.border = 10;
    this.backgroundColor = color(255, 224, 204);
    this.fieldColor = color(204, 204, 204);

    this._gridSizeX = fieldX || 20;
    this._gridSizeY = fieldY || 30;
    this._blockSize = blockSize || 15;
    this.grid;
    this._tetrominoWindowX;
    this._tetrominoWindowY;
    this.controlWindowX = 100;
    this.setupGrid();
    this.keyHoldTime = 0;
    this.slowness = 2;

    this.spriteSheet = spriteSheet;
    this.spriteData = spriteData;
    this.imagesForTiles = this.getImagesForTiles();

    this.nextTetromino = new Tetromino();
    this.nextTetromino.pos.x = 2;
    this.nextTetromino.pos.y = 2;
    this.nextTetromino.blockSize = this.blockSize;
    this.nextTetromino.render();

    this.tetromino = this.spawnTetromino();

    // this.drawPlayingField();
  }

  get blockSize() {
    return this._blockSize;
  }

  set blockSize(newBlockSize) {
    this._blockSize = newBlockSize;
  }

  get gridSizeX() {
    return this._gridSizeX;
  }

  set gridSizeX(newValue) {
    this._gridSizeX = newValue;
  }
  get gridSizeY() {
    return this._gridSizeY;
  }

  set gridSizeY(newValue) {
    this._gridSizeY = newValue;
  }

  get tetrominoWindowX() {
    return this._tetrominoWindowX;
  }

  set tetrominoWindowX(newValue) {
    this._tetrominoWindowX = newValue;
  }

  get tetrominoWindowY() {
    return this._tetrominoWindowY;
  }

  set tetrominoWindowY(newValue) {
    this._tetrominoWindowY = newValue;
  }

  setupGrid() {
    this.grid = [];
    for (var i = 0; i < this.gridSizeY; i++) {
      var row = [];
      for (var j = 0; j < this.gridSizeX; j++) {
        row.push(0);
      }
      this.grid.push(row);
    }
  }

  getImagesForTiles() {
    if (this.spriteData === undefined ||
        this.spriteSheet === undefined) { return; }
    let images = []
    // let tetrominoLetters = ["I", "J", "L", "O", "S", "Z"];
    let tiles = this.spriteData.tiles;
    for (var tile of tiles) {
      let pos = tile.position;
      images.push(this.spriteSheet.get(pos.x, pos.y, pos.w, pos.h));
    }
    console.log("images.length = " + images.length)
    return images;
  }

  drawPlayingField() {
    var w = this.gridSizeX * this.blockSize;
    var h = this.gridSizeY * this.blockSize;
    var padding = 20;

    this.tetrominoWindowX = w + this.border * 2 + 1 + padding * 2;
    this.tetrominoWindowY = h + this.border * 2 + 1 + padding * 2;

    createCanvas(this.tetrominoWindowX + this.controlWindowX, this.tetrominoWindowY);
    background(this.backgroundColor);

  	translate(this.border / 2 + padding, this.border / 2 + padding);
  	push()
  	stroke(255);
  	strokeWeight(this.border);
  	// noFill();
    fill(this.fieldColor);
  	rect(0, 0, w + this.border + 1, h + this.border + 1);
  	pop();
  	translate(this.border / 2, this.border / 2);

    // Draw the landed blocks
    this.renderGrid();

  }

  drawControlWindow() {
    this.nextTetromino.render();
  }

  spawnTetromino() {
    var currentTetromino;
    if (this.gameOver == false) {
      // If the game just started

      if (this.tetromino === undefined) {
        console.log("this.tetromino === undefined");
        currentTetromino = new Tetromino();
      } else {
        currentTetromino = new Tetromino(this.nextTetromino.currentType);
        this.nextTetromino = new Tetromino();
        this.nextTetromino.blockSize = this.blockSize;
      }
    }
    console.log("this.nextTetromino.currentType = " + this.nextTetromino.currentType);
    currentTetromino.tileImage = this.imagesForTiles[currentTetromino.currentType];
    currentTetromino.blockSize = this.blockSize;
    currentTetromino.pos.x = floor(this.gridSizeX / 2);
    currentTetromino.pos.y = 0;
    return currentTetromino;
  }

  animate(opt, multiplier) {
    var tetromino = this.tetromino;
    if (tetromino.landed) { return; }
    if (opt === undefined) { opt = 0; }
    if (multiplier === undefined) { multiplier = 1; }
    var posX = tetromino.pos.x;
    var posY = tetromino.pos.y;

    if (this.paused) {
      tetromino.render()
      return;
    }

    // Check if when first spawned it is already colliding
    if (this.checkCollision(tetromino)) {
      this.gameOver = true;
      return;
    }

    if (opt == 0) {
      tetromino.pos.y *= 10 * this.slowness;
      tetromino.pos.y += 1;
      tetromino.pos.y /= 10 * this.slowness;
      if (this.checkCollision(tetromino)) {
        tetromino.pos.y = posY;
        if (tetromino.landed) { this.addToGrid(tetromino); }
      }
    } else if (opt == 1) {
      tetromino.pos.x *= multiplier;
      tetromino.pos.x -= 1;
      tetromino.pos.x /= multiplier;
      if (this.checkCollision(tetromino, -1)) {
        tetromino.pos.x = posX;
        if (tetromino.landed) { this.addToGrid(tetromino); }
      }
    } else if (opt == 2) {
      tetromino.pos.x *= multiplier;
      tetromino.pos.x += 1;
      tetromino.pos.x /= multiplier;
      if (this.checkCollision(tetromino, 1)) {
        tetromino.pos.x = posX;
        if (tetromino.landed) { this.addToGrid(tetromino); }
      }
    } else if (opt == 3) {
      // console.log("tetromino.pos.y = " + tetromino.pos.y);
      tetromino.rotate();
      if (this.checkCollision(tetromino, 1)) {
        tetromino.rotate(true);
        if (tetromino.landed) { this.addToGrid(tetromino); }
      }
      // console.log("tetromino.pos.y = " + tetromino.pos.y);
    } else if (opt == 4) {
      tetromino.pos.y += 1;
      if (this.checkCollision(tetromino)) {
        tetromino.pos.y = posY;
        if (tetromino.landed) { this.addToGrid(tetromino); }
      }
    }
    var tmpX = tetromino.pos.x;
    var tmpY = tetromino.pos.y;
    tetromino.pos.x = floor(tmpX);
    tetromino.pos.y = floor(tmpY);
    tetromino.render();
    tetromino.pos.x = tmpX;
    tetromino.pos.y = tmpY;
  }

  checkCollision(tetromino, direction) {
    if (direction === undefined) { direction = 0; }
    // console.log("direction = " + direction);
    var rowMax = tetromino.shape.length - 1;
    var posX = tetromino.pos.x;
    var posY = tetromino.pos.y;
    if (posY < 0) { return; }
    for (var i = rowMax; i >= 0; i--) {
      var row = tetromino.shape[i];
      for (var j = 0; j < row.length; j++) {
        if (row[j] == 1) {
          var checkX = floor(posX + j);
          var checkY = floor(posY + i);
          // console.log("checkX, checkY = " + checkX, checkY);
          // console.log("this.grid[checkY][checkX] = " + this.grid[checkY][checkX]);
          if (checkY > this.grid.length - 1) {
            // Landed on the ground
            console.log("Landed on the ground");
            console.log("checkY = " + checkY);
            console.log("tetromino.pos.y = " + tetromino.pos.y);
            console.log("j = " + j);

            tetromino.landed = true;
            return true;
          } else if ((this.grid[checkY][checkX] >= 1) && (abs(direction == 1))) {
            // console.log("direction = " + direction);
            // console.log("abs(direction) = " + abs(direction));
            // Sliding on a piece
            console.log("Sliding on a piece");
            console.log("direction = " + direction);
            console.log("abs(direction) = " + abs(direction));
            // tetromino.landed = true;
            return true;
          } else if ((this.grid[checkY][checkX] >= 1) && direction == -1) {
            // console.log("direction = " + direction);
            // Landed on a piece
            console.log("Sliding on a piece");
            console.log("direction = " + direction);
            console.log("abs(direction) = " + abs(direction));

            return true;
          } else if ((this.grid[checkY][checkX] >= 1) && direction == 0) {
            // console.log("direction = " + direction);
            // Landed on a piece
            console.log("Landed on a piece");
            console.log("direction = " + direction);
            console.log("abs(direction) = " + abs(direction));

            tetromino.landed = true;
            return true;
          } else if ((checkX > this.grid[0].length - 1) || (checkX < 0)) {
            // Colliding to the side walls
            console.log("Colliding to the side walls");
            return true;
          }
        }
      }
    }
    return false;
  }

  addToGrid() {
    var tetromino = this.tetromino;
    for (var row = 0; row < tetromino.shape.length; row++) {
      for (var col = 0; col < tetromino.shape[row].length; col++) {
        var posCol = floor(col + tetromino.pos.x);
        var posRow = floor(row + tetromino.pos.y);
        if (tetromino.shape[row][col] == 1) {
          this.grid[posRow][posCol] = tetromino.currentType + 1;
        }
      }
    }

  }

  renderGrid() {
    for (var row = 0; row < this.grid.length; row++) {
      for (var col = 0; col < this.grid[0].length; col++) {
        var fillData = this.grid[row][col];
        // if (fillData == 1) {
        //   rect(this.blockSize * col,
        //        this.blockSize * row,
        //        this.blockSize,
        //        this.blockSize);
        // }
        if (fillData >= 1) {
          image(this.imagesForTiles[fillData - 1],
                this.blockSize * col,
                this.blockSize * row,
                this.blockSize,
                this.blockSize)
        }
      }
    }

  }

  update() {
    if (this.paused) {
      textSize(32);
      text("Game Paused", 20, 80);
    }
    if (this.tetromino.landed) {
      // Score for landing
      this.score += 1;
			this.tetromino = this.spawnTetromino();
			// this.tetromino.pos.x = floor(this.gridSizeX / 2);
			// this.tetromino.pos.y = 0;

      this.blowFullRows();
    }
    // console.log("Score: " + this.score);
    this.animate();
  }

  blowFullRows() {
    var rows = this.getFullRow();
    var completedRows = rows.length;
    // Score for completing rows
    this.score += 2 * pow(completedRows, 3) + 10 * completedRows;
    for (var row of rows) {
      if (this.grid[row] = row) {
        for (var col of this.grid[row]) {
          col = 0;
          // Animate
        }
        this.grid.splice(row, 1);
        this.grid.splice(0, 0, new Array(this.gridSizeX).fill(0));
      }
    }
  }

  getFullRow() {
    var rows = [];
    for (var row in this.grid) {
      var count = 0;
      for (var col of this.grid[row]) {
        if (col >= 1) { count += 1; }
      }
      if (count == this.grid[row].length) {
        rows.push(row);
      }
    }
    return rows;
  }

  pauseIt() {
    this.paused = !this.paused;
    console.log("pause = " + this.paused);
  }

  // end() {
  //   console.log("Game Over");
  //
  // }

}
