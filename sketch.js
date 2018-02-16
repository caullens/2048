let tiles = []
let res = 0
let cols = 4
let wWidth = 501
let moved = false;
let maxTile = 0

let colors = {}

function setup() {
	res = floor(wWidth / cols)
	createCanvas(wWidth, wWidth)
	maxTile = cols * cols
	colors = generateColors()
	tiles = Board.init(tiles)
	tiles = Board.spawnTile(tiles)
	tiles = Board.spawnTile(tiles)
}

function keyPressed() {
	switch(keyCode) {
		case DOWN_ARROW:
			down()
			break;
		case LEFT_ARROW:
			left()
			break
		case RIGHT_ARROW:
			right()
			break
		case UP_ARROW:
			up()
			break
		case 32:
			autoPilot()
			break
		default:
			// Invalid Input, do nothing
	}
	if(moved) {
		tiles = Board.spawnTile(tiles)
		moved = false
	}
}

function draw() {
	background(120)
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < cols; j++) {
			tiles[i][j].show()
		}
	}
}

function generateColors() {
	let temp = []
	temp[0] = [255, 255, 255, 0]
	for(let i = 2; i <= Math.pow(2, maxTile); i *= 2) {
		console.log(i)
		let r = 255
		let g = map(Math.log2(i), 1, maxTile, 207, 92)
		let b = map(Math.log2(i), 1, maxTile, 207, 92)
		let a = 255
		temp[i] = [r, g, b, a]
	}
	return temp
}

function right() {
	tiles = Board.rotateClock()
	tiles = Board.shift()
	tiles = Board.merge()
	tiles = Board.shift()
	tiles = Board.rotateCounter()
}

function left() {
	tiles = Board.rotateClock()
	tiles = Board.rotateClock()
	tiles = Board.rotateClock()
	tiles = Board.shift()
	tiles = Board.merge()
	tiles = Board.shift()
	tiles = Board.rotateCounter()
	tiles = Board.rotateCounter()
	tiles = Board.rotateCounter()
}

function up() {
		tiles = Board.rotateClock()
		tiles = Board.rotateClock()
		tiles = Board.shift()
		tiles = Board.merge()
		tiles = Board.shift()
		tiles = Board.rotateCounter()
		tiles = Board.rotateCounter()
}

function down() {
	tiles = Board.shift()
	tiles = Board.merge()
	tiles = Board.shift()
}

function autoPilot() {

}
