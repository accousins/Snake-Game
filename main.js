use2D = true;

// -- GRID --

//The grid holds the positions of things in the world
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

//Draw grid is no longer used

// //draws all the objects in the grid
// function drawGrid() {
//
// //Clear the Grid
// clearGrid();
// //put things into the grid
// putSnakeInGrid();
// putFoodInGrid();
// //iterate through the whole grid and draw things
// for (var x = 0; x < grid.length; x++) {
// for (var y = 0; y < grid.length; y++) {
// if (grid[x][y] == 'food') {//if its food draw food
// drawFood(x * squareSize, y * squareSize);
// } else if (grid[x][y] == 'snake') {//if its snake draw snake
// drawSnake(x * squareSize, y * squareSize);
// }
// }
// }
// }

// -- SNAKE --

var snakeSize = 10;
//the initial size of the snake
var snakeDir = 'r';
//the direction the snake is moving in.
//the snake is an array of objects with an x and y value.
var snake = new Array(snakeSize);
function newSnake() {
	var snakeX = snakeSize, //starting location for the snake's head
	    snakeY = 0;
	for (var i = 0; i < snake.length; i++) {//runs over the length of the snake
		snake[i] = {//adds each object with an x and y value
			x : snakeX - i,
			y : snakeY,
			snakeSprite : drawSnake(snakeX - i, snakeY)
		};
		//puts the snake in the grid
		grid[snakeX - i][snakeY] = 'snake';
	}

}

//draws one snake block in the world
//Param: x,y coordinates of grid, offset is delt with here
function drawSnake(x, y) {
	x = x * squareSize;
	y = y * squareSize;
	var snakeSprite = new Sprite();
	snakeSprite.height = squareSize;
	snakeSprite.width = squareSize;
	snakeSprite.x = x;
	snakeSprite.y = y;
	snakeSprite.image = Textures.load("blueSquare.png");
	world.addChild(snakeSprite);
	return snakeSprite;
}

//updates the snake, and just about everything else
function moveSnake() {
	//only need to move the square at the back to the front
	//moves the last square in the array to the front of the array.
	var temp = snake.pop();
	grid[temp.x][temp.y] = '';
	snake.unshift(temp);
	//snake[0] needs to be the current head
	//snake[1] is the current head
	snake[0].x = snake[1].x;
	snake[0].y = snake[1].y;
	if (snakeDir == 'r') {
		snake[0].x++;
	} else if (snakeDir == 'l') {
		snake[0].x--;
	} else if (snakeDir == 'u') {
		snake[0].y--;
	} else if (snakeDir == 'd') {
		snake[0].y++;
	}
	checkCollision(snake[0].x, snake[0].y);
	grid[snake[0].x][snake[0].y] = 'snake';
	snake[0].snakeSprite.x = snake[0].x * squareSize;
	snake[0].snakeSprite.y = snake[0].y * squareSize;
}

//checks if the snake is hitting the wall, itself, or eating food.
function checkCollision(x, y) {
	if (x < 0 || y < 0 || x >= gridSize || y >= gridSize) {
		alert("GAME OVER");
	} else {
		var check = grid[x][y];
		if (check == 'snake') {
			alert("GAME OVER");
		} else if (check == 'food') {
			//make a new snake segment
			//we'll put it on the end and make its locations the current ones,
			//since it will be changed the next snake update
			snake.push({
				x : x,
				y : y,
				snakeSprite : drawSnake(x, y)
			});
			//then we change the food's location
			//start by removing it from the grid
			grid[x][y] = '';
			//then find a new food location
			newFoodLocation();
		}
	}
}

// -- FOOD --

var food;

//makes a new food block and puts it the food array
function newFood() {
	//start by putting the food somewhere off the map
	food = {
		x : -1,
		y : -1,
		foodSprite : drawFood(-1, -1)
	};
	//puts the food in the world
	newFoodLocation();
}

function newFoodLocation(){
	//randomly picks coordinates
	var randX = Math.floor(Math.random() * gridSize);
	var randY = Math.floor(Math.random() * gridSize);
	//set food's coordinates to those
	food.x = randX;
	food.y = randY;
	//put it in the grid
	grid[randX][randY] = 'food';
	//change the sprite's coordinates
	food.foodSprite.x = randX*squareSize;
	food.foodSprite.y = randY*squareSize;
}

//draws the food in the world
//param: x,y coordinates of the grid, offset is taken care of.
function drawFood(x, y) {
	x = x * squareSize;
	y = y * squareSize;
	var foodSprite = new Sprite();
	foodSprite.height = squareSize;
	foodSprite.width = squareSize;
	foodSprite.x = x;
	foodSprite.y = y;
	foodSprite.image = Textures.load("blackSquare.png");
	world.addChild(foodSprite);
	return foodSprite;
}

// -- CONTROLS --

//snake will be controlled with the WASD keys
//Left
gInput.addBool(65, "left");
//a
// //Right
gInput.addBool(68, "right");
//d
// //Down
gInput.addBool(83, "down");
//s
// //Up
gInput.addBool(87, "up");
//w

function checkDir() {
	if (gInput.right && snakeDir != 'l') {
		snakeDir = 'r';
	} else if (gInput.left && snakeDir != 'r') {
		snakeDir = 'l';
	} else if (gInput.down && snakeDir != 'u') {
		snakeDir = 'd';
	} else if (gInput.up && snakeDir != 'd') {
		snakeDir = 'u';
	}
}

// -- Start the Game --
newSnake();
newFood();

world.update = function(d) {
	checkDir();
	moveSnake();
};
