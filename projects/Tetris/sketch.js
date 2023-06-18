var game;

// Variables for letters
var font;
var vehicles = [];
var letterPoints = [];

// For the tiles
var spriteSheet;
var spriteData;

function preload() {
	font = loadFont("PEPSI_pl.ttf");
	spriteData = loadJSON("Tiles.json");
	spriteSheet = loadImage("images/tetris-tiles.png");
}

function setup() {
	textFont(font);
	setGameMessages();

	// Create a new game
	// game = new TetrisGame();
	game = new TetrisGame(16, 20, 20, spriteSheet, spriteData)

	console.log("New game created");
	console.log("game.gridSizeX = " + game.gridSizeX);
	console.log("game.gridSizeY = " + game.gridSizeY);

	console.log(spriteData);

}

function setGameMessages() {
	// textFont(font);
	var gameOverMessage = "Game Over";

	var points = font.textToPoints(gameOverMessage, 20, 200, 64
	, {
		sampleFactor: 0.4,
		simplifyThreshold: 0
	});
	for (pt of points) {
		// point(pt.x, pt.y);
		var vehicle = new Vehicle(pt.x, pt.y);
		vehicles.push(vehicle);
	}
}

// function setAnimatingLetters() {
// 	textFont(font);
// 	var letters = "abcdefghijklmnopqrstuvwxyz";
// 	for (letter in letters) {
// 		var points = font.textToPoints(letter, 0, 0, 64, {
// 			sampleFactor: 0.4,
// 			simplifyThreshold: 0
// 		});
// 		for (pt of points) {
// 			var letterPoint[i] = new Vehicle(pt.x, pt.y);
// 			letterPoints[i].push(letterPoint);
// 		}
// 	}
//
// }

function draw() {
	game.drawPlayingField();
	drawControlWindow();

	// game.update();
	// noLoop();
	if (!game.gameOver) {
		game.update();
		checkKeyDown();
		// game.gameOver = true;
	} else {
		showGameMessage();
	}

		// if (tetromino.landed && !game.gameOver) {
		//
		// 	tetromino = new Tetromino();
		// 	tetromino.pos.x = floor(game.gridSizeX / 2);
		// 	tetromino.pos.y = 0;
		// 	// tetromino.render();
		// 	game.animate(tetromino);
		// 	if (game.gameOver) {
		// 		game.end();
		// 	}
		// }

}

function drawControlWindow() {
	var posX = game.tetrominoWindowX - 30;
	push();
	textSize(18);
	fill(109, 191, 79);
	stroke(255);
	strokeWeight(4);

	// var points = font.textToPoints("Score: ", 10, 10, 18);
	// console.log(usedFont);
	text("Score: \n" + game.score, posX, 10);
	text("Next", posX, 100);
	game.nextTetromino.pos.x = game.gridSizeX + 2;
	game.nextTetromino.pos.y = 7;
	game.nextTetromino.render();

	pop();
}

function checkKeyDown() {
	if (keyIsDown(LEFT_ARROW)) {
		if ((millis() - game.keyHoldTime) > 150) {
			game.animate(1, 2);
			// console.log("key is down")
		}
	} else if (keyIsDown(RIGHT_ARROW)) {
		if ((millis() - game.keyHoldTime) > 150) {
			game.animate(2, 2);
		}
	} else if (keyIsDown(DOWN_ARROW)) {
		game.animate(4, 5);
		// console.log("key is down");
	}
}

function keyPressed() {
	if (game.gameOver) { return; }
  if (keyCode == LEFT_ARROW) {
		game.keyHoldTime = millis();
    game.animate(1);
  } else if (keyCode == RIGHT_ARROW) {
		game.keyHoldTime = millis();
    game.animate(2);
  } else if (keyCode == UP_ARROW) {
    console.log("rotate");
		game.animate(3);
  } else if (keyCode == DOWN_ARROW) {
    console.log("speed up");
		game.animate(4);
  } else if (keyCode == 32) {
		game.pauseIt();
  }
  return 0;
}

function keyReleased() {
  if (keyCode == LEFT_ARROW) {
		game.keyHoldTime = millis();
  } else if (keyCode == RIGHT_ARROW) {
		game.keyHoldTime = millis();
  }
  return 0;
}

function showGameMessage() {

	for (var vehicle of vehicles) {
		vehicle.behaviors();
		vehicle.update();
		vehicle.show();
	}


}
