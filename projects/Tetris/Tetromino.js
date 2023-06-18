class Tetromino {
  constructor(type) {
    // if (type === undefined) { type = 0; }
    this.selectedType = type;
    this.tetrominoes = this.getTetrominoes();
    this.type = this.makeType();
    this.currentType;
    this.shape;
    this.tileImage;

    this._blockSize = 15;
    this.rotation = 0;
    this._pos = createVector(0, 0);
    this.collisionDetect = true;
    this.landed = false;
  }
  getTetrominoes() {
    var tet = [];
    tet.push( [[0, 0, 0, 0],
    					 [0, 0, 0, 0],
    					 [1, 1, 1, 1],
    					 [0, 0, 0, 0]]);
    tet.push( [[0, 0, 0, 0],
  						 [0, 0, 0, 0],
  						 [0, 1, 1, 1],
  						 [0, 0, 0, 1]]);
    tet.push( [[0, 0, 0, 0],
   						 [0, 0, 0, 0],
   						 [1, 1, 1, 0],
   						 [1, 0, 0, 0]]);
    tet.push( [[0, 0, 0, 0],
  						 [0, 1, 1, 0],
  						 [0, 1, 1, 0],
  						 [0, 0, 0, 0]]);
    tet.push( [[0, 0, 0, 0],
   						 [0, 1, 1, 0],
   						 [1, 1, 0, 0],
   						 [0, 0, 0, 0]]);
    tet.push( [[0, 0, 0, 0],
               [0, 1, 1, 0],
               [0, 0, 1, 1],
               [0, 0, 0, 0]]);
    tet.push( [[0, 0, 0, 0],
               [0, 1, 0, 0],
               [1, 1, 1, 0],
               [0, 0, 0, 0]]);
    return tet;
  }
  makeType() {
    var numberOfTetrominoes = this.tetrominoes.length;

    this.type = (this.selectedType >= 0) &&
                (this.selectedType < numberOfTetrominoes) &&
                floor(this.selectedType) == this.selectedType ?
                this.selectedType :
                round(random(numberOfTetrominoes - 1));
    console.log("this.type = " + this.type);

    this.shape = this.tetrominoes[this.type];
    this.currentType = this.type;
  }


  get blockSize() {
    return this._blockSize;
  }

  set blockSize(newBlockSize) {
    this._blockSize = newBlockSize;
  }

  get pos() {
    return this._pos;
  }

  set pos(newValue) {
    this._pos = newValue;
  }

  rotate(rotateCounterClocwise) {
    this.rotation = (this.rotation  + 1) % 4;
    var rotatedShape = [];
    for (var row of this.shape) {
      rotatedShape.push([...row]);
    }
    var maxRow = this.shape.length - 1;
    var maxCol = this.shape[0].length - 1;

    if (rotateCounterClocwise) {
      for (var row in this.shape) {
        for (var col in this.shape) {
          rotatedShape[maxCol - col][row] = this.shape[row][col];
        }
      }
    } else {
      for (var row in this.shape) {
        for (var col in this.shape) {
          rotatedShape[col][maxRow - row] = this.shape[row][col];
        }
      }
    }


    for (var row in this.shape) {
      this.shape[row] = [...rotatedShape[row]];
    }


  }

  render() {
    push();
    translate(this.pos.x * this.blockSize, this.pos.y * this.blockSize);
    for (var row = 0; row < this.shape.length; row++) {
      for (var col = 0; col < this.shape[0].length; col++) {
        var fillData = this.shape[row][col];
        if (fillData == 1) {
          if (this.tileImage === undefined) {
            rect(this.blockSize * col,
                 this.blockSize * row,
                 this.blockSize,
                 this.blockSize);
          } else {
            image(this.tileImage,
                  this.blockSize * col,
                  this.blockSize * row,
                  this.blockSize,
                  this.blockSize)
          }

        }
      }
    }
    pop();
  }
}
