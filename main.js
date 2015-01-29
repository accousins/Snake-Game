use2D = true;

var squareSize = 10;
var gridSize = 60;
var grid = new Array(gridSize);
for (var i = 0; i < grid.length; i++) {
	grid[i] = new Array(gridSize);
}

var snake = new Array(10);
function newSnake() {
	var snakeX = 10,
	    snakeY = 0;
	for (var i = 0; i < snake.length; i++) {
		snake[i] = {
			x : snakeX - i,
			y : snakeY
		};
		grid[snakeX - i][snakeY] = 'snake';
	}

}

function newFood() {
	var randX = Math.floor(Math.random() * gridSize);
	var randY = Math.floor(Math.random() * gridSize);
	grid[randX][randY] = 'food';
}

function drawFood(x, y) {
	var foodSprite = new Sprite();
	foodSprite.height = squareSize;
	foodSprite.width = squareSize;
	foodSprite.x = x;
	foodSprite.y = y;
	foodSprite.image = Textures.load("blackSquare.png");
	world.addChild(foodSprite);
}

function drawSnake(x, y) {
	var snakeSprite = new Sprite();
	snakeSprite.height = squareSize;
	snakeSprite.width = squareSize;
	snakeSprite.x = x;
	snakeSprite.y = y;
	snakeSprite.image = Textures.load("blueSquare.png");
	world.addChild(snakeSprite);
}

function drawGame() {
	for (var x = 0; x < grid.length; x++) {
		for (var y = 0; y < grid.length; y++) {
			if (grid[x][y] == 'food') {
				drawFood(x * squareSize, y * squareSize);
			} else if (grid[x][y] == 'snake') {
				drawSnake(x * squareSize, y * squareSize);
			}
		}
	}
}

newSnake();
newFood();
drawGame();
