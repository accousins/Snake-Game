clearColor = [0.5,0.5,0.5,1];
use2D = true;

//the tile system is based off the sample code here: http://jsfiddle.net/Selkcip/m6Cff/
var tileX = 10;
var tileY = 10;
var tileTexture = "http://www.jar42.com/brine/laststop/images/trash.png";

function Tile(texture){
	this.texture = Textures.load(texture);
}

function Grid(cols, rows, tileSize){
	Sprite.call(this);
	
	this.image = Textures.load(tileTexture);
	
	this.cols = cols;
	this.rows = rows;
	this.tileSize = tileSize;
	
	this.tile = new Sprite();

	this.tiles = [];
	for(var c = 0; c < cols; c++){
		this.tiles[c] = [];
		for(var r = 0; r < rows; r++){
			this.tiles[c][r] = new Tile(tileTexture);
		}
	}	
}

Grid.prototype = new Sprite();

