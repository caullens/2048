class Board {

  static init(tiles) {
    for(let i = 0; i < cols; i++) {
      tiles[i] = []
      for(let j = 0; j < cols; j++) {
        tiles[i][j] = new Tile(i, j, res, 0)
      }
    }
    return tiles
  }

  static spawnTile(tiles) {
    while(true) {
      let randX = floor(random(0, cols))
      let randY = floor(random(0, cols))
      for(let i = 0; i < cols; i++) {
        for(let j = 0; j < cols; j++) {
          if(tiles[i][j].x === randX && tiles[i][j].y === randY && tiles[i][j].value === 0) {
            random(0, 1) >= 0.25 ? tiles[i][j].value = 2 : tiles[i][j].value = 4
            return tiles
          }
        }
      }
    }
  }

  static shift() {
    for(let k = 0; k < cols; k++) {
      for(let i = 0; i < cols; i++) {
        for(let j = cols - 2; j >= 0; j--) {
          if(tiles[i][j].value !== 0 && tiles[i][j+1].value === 0) {
            tiles[i][j+1].value = tiles[i][j].value
            tiles[i][j].value = 0
            moved = true
          }
        }
      }
    }
    return tiles
  }

  static merge() {
    for(let k = 0; k < cols; k++) {
      for(let i = 0; i < cols; i++) {
        for(let j = cols - 1; j >= 1; j--) {
          if(tiles[i][j].value === tiles[i][j-1].value) {
            tiles[i][j].value *= 2
            tiles[i][j-1].value = 0
            moved = true
          }
        }
      }
    }
    return tiles
  }

  static rotateClock() {
    tiles = Board.transpose(tiles)
    tiles = Board.mirror(tiles)
    return tiles
  }

  static rotateCounter() {
    tiles = Board.mirror(tiles)
    tiles = Board.transpose(tiles)
    return tiles
  }

  static mirror(tiles) {
    let result = []
    result = Board.init(result)
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < cols; j++) {
        result[i][j] = tiles[cols - i - 1][j]
      }
    }
    tiles = result
    return tiles
  }

  static transpose(tiles) {
    let result = []
    result = Board.init(result)
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < cols; j++) {
        result[j][i].value = tiles[i][j].value
      }
    }
    return result
  }

  static printBoard(tiles) {
    let string = ''
    for(let j = 0; j < cols; j++) {
      for(let i = 0; i < cols; i++) {
        string += `${tiles[i][j].value} `
      }
      string += '\n'
    }
    console.log(string)
  }

  static sampleBoard(tiles) {
    let lastNum = 1
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < cols; j++) {
        if(lastNum < Math.pow(2, maxTile)) {
          lastNum *= 2
          tiles[i][j].value = lastNum
        } else {
          tiles[i][j].value = 0
        }
      }
    }
  }
}
