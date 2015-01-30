use2D = true;

// -- GRID --

var squareSize = 10;
//the size of each square
var gridSize = 60;
//the number of lines in the grid
//Makes a 2d array for the gride, with gridSize columns and gridSize rows
var grid = new Array(gridSize);

//clears the grid
function clearGrid() {
	for (var i = 0; i < grid.length; i++) {
		grid[i] = new Array(gridSize);
	}
}

clearGrid();
//call it first initially

//draws all the objects in the grid
function drawGrid() {
	
	//Clear the Grid
	clearGrid();
	//put things into the grid
	putSnakeInGrid();
	putFoodInGrid();
	//iterate through the whole grid and draw things
	for (var x = 0; x < grid.length; x++) {
		for (var y = 0; y < grid.length; y++) {
			if (grid[x][y] == 'food') {//if its food draw food
				drawFood(x * squareSize, y * squareSize);
			} else if (grid[x][y] == 'snake') {//if its snake draw snake
				drawSnake(x * squareSize, y * squareSize);
			}
		}
	}
}

// -- SNAKE --

var snakeSize = 10;
//the initial size of the snake
var snakeDir = "right";
//the direction the snake is moving in.
//the snake is an array of objects with an x and y value.
var snake = new Array(10);
function newSnake() {
	var snakeX = snakeSize, //starting location for the snake's head
	    snakeY = 0;
	for (var i = 0; i < snake.length; i++) {//runs over the length of the snake
		snake[i] = {//adds each object with an x and y value
			x : snakeX - i,
			y : snakeY
		};
	}

}

//Puts the snake in the grid
function putSnakeInGrid() {
	for (var i = 0; i < snake.length; i++) {
		grid[snake[i].x][snake[i].y] = 'snake';
	}
}

//draws one snake block in the world
//Param: x,y coordinates of the canvas, no offset
function drawSnake(x, y) {
	var snakeSprite = new Sprite();
	snakeSprite.height = squareSize;
	snakeSprite.width = squareSize;
	snakeSprite.x = x;
	snakeSprite.y = y;
	snakeSprite.image = Textures.load("blueSquare.png");
	world.addChild(snakeSprite);
}

//updates the snake
function moveSnake() {
	//only need to add a new square at the fron and remove the one in the back

	//add a new link
	var frontX = snake[0].x + 1;
	var frontY = snake[0].y;
	snake.unshift({
		x : frontX,
		y : frontY
	});
	//remove the last element
	snake.pop();
}

// -- FOOD --

var food = new Array();

//makes a new food block and puts it the food array
function newFood() {
	//randomly picks coordinates
	var randX = Math.floor(Math.random() * gridSize);
	var randY = Math.floor(Math.random() * gridSize);
	//adds those coordinates to the food array
	food.push({
		x : randX,
		y : randY
	});
	grid[randX][randY] = 'food';
	//tells the grid where the food is
}

//adds the food to the grid
function putFoodInGrid() {
	for (var i = 0; i < food.length; i++) {
		grid[food[i].x][food[i].y] = 'food';
	}
}

//draws the food in the world
//param: x,y coordinates of the canvas, no offset
function drawFood(x, y) {
	var foodSprite = new Sprite();
	foodSprite.height = squareSize;
	foodSprite.width = squareSize;
	foodSprite.x = x;
	foodSprite.y = y;
	foodSprite.image = Textures.load("blackSquare.png");
	world.addChild(foodSprite);
}

// -- CONTROLS --

//we'll let WASD or the arrow keys work
//Left
// gInput.addBool(65, "left");//a
// gInput.addBool(37, "left");
// //Right
// gInput.addBool(68, "right");//d
// gInput.addBool(39, "right");
// //Down
// gInput.addBool(83, "down");//s
// gInput.addBool(40, "down");
// //Up
// gInput.addBool(87, "up");//w
// gInput.addBool(38, "up");

// -- Start the Game --
newSnake();
newFood();

world.update = function(d) {
	moveSnake();
	drawGrid();
};
