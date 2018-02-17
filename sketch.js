let tiles = []
let res = 0
let cols = 4
let wWidth = 501
let maxTile = 0
let gameOver = false
let sample = false
let score = 0
let pScore

function setup() {
	res = floor(wWidth / cols)
	createCanvas(wWidth, wWidth)
	maxTile = (cols + 1) * (cols + 1)
	colors = generateColors()
	tiles = Board.init(tiles)
	tiles = Board.spawnTile(tiles)
	tiles = Board.spawnTile(tiles)
	pScore = createP()
	pScore.html(`Score: ${score}`)
}

function mousePressed() {
	if(gameOver && !sample) location.reload()
	return false
}

function keyPressed() {
	let rotations = 0
  let played = true;
  let past = tiles.slice()
  switch(keyCode) {
		case DOWN_ARROW:
			tiles = Board.rotateClock(tiles)
			tiles = Board.rotateClock(tiles)
			tiles = Board.rotateClock(tiles)
			tiles = Board.rotateClock(tiles)
			rotations = 4
			break
		case UP_ARROW:
			tiles = Board.rotateClock(tiles)
			tiles = Board.rotateClock(tiles)
			rotations = 2
			break
		case RIGHT_ARROW:
			tiles = Board.rotateClock(tiles)
			rotations = 1
			break
		case LEFT_ARROW:
			tiles = Board.rotateClock(tiles)
			tiles = Board.rotateClock(tiles)
			tiles = Board.rotateClock(tiles)
			rotations = 3
			break
		default:
			played = false
		}

  if (played) {
		for(let i = 0; i < cols; i++) {
			tiles[i] = Board.shift(tiles[i], i)
			tiles[i] = Board.merge(tiles[i], i)
			tiles[i] = Board.shift(tiles[i], i)
		}

		for(let i = 0; i < rotations; i++) {
			tiles = Board.rotateCounter(tiles)
		}

		let changed = compare(past, tiles)
    if (changed) {
      tiles = Board.spawnTile(tiles)
    }
		pScore.html(`Score: ${score}`)
  }
}

function blankGrid() {
	return Array(cols).fill(Array(cols).fill(0))
}

function rotateGrid(tiles) {
  let newGrid = blankGrid()
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      newGrid[i][j] = tiles[j][i]
    }
  }
  return newGrid
}

function flipGrid(tiles) {
  for (let i = 0; i < cols; i++) {
    tiles[i].reverse()
  }
  return tiles
}

function compare(a, b) {
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < cols; j++) {
			if(a[i][j].value !== b[i][j].value) return true
		}
	}
	return false
}

function draw() {
	background(184)
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < cols; j++) {
			tiles[i][j].show()
			noFill()
			stroke(0)
			rectMode(CORNER)
			rect(i * res, j * res, res, res, res / 5)
		}
	}
	gameOver = isGameOver()
	if(gameOver && !sample) {
		noStroke()
		fill('rgba(255, 150, 150, 0.7)')
		let size = map(width, 1, window.innerWidth, 1, 100)
		rect(0, 0, width, height)
		textAlign(CENTER, CENTER)
		textSize(size)
		fill(255)
		text("Game Over, Click Anywhere To Play Again", width/2, height/2)
	}
}

function generateColors() {
	let temp = []
	temp[0] = [255, 255, 255, 0]
	for(let i = 2; i <= Math.pow(2, maxTile); i *= 2) {
		let r = map(Math.log2(i), 1, maxTile, 207, 92)
		let g = map(Math.log2(i), 1, maxTile, 207, 92)
		let b = 255
		let a = 255
		temp[i] = [r, g, b, a]
	}
	return temp
}

function isGameOver() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      if (tiles[i][j].value == 0) {
        return false;
      }
      if (i !== cols - 1 && tiles[i][j].value === tiles[i + 1][j].value) {
        return false;
      }
      if (j !== cols - 1 && tiles[i][j].value === tiles[i][j + 1].value) {
        return false;
      }
    }
  }
  return true;
}
