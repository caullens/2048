class Board {

  static init(tiles) {
    for(let i = 0; i < cols; i++) {
      tiles[i] = []
      for(let j = 0; j < cols; j++) {
        tiles[i][j] = new Tile(i, j, res, res / 10, 0)
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
            random(0, 1) >= 0.1 ? tiles[i][j].value = 2 : tiles[i][j].value = 4
            tiles[i][j].spawning = true
            return tiles
          }
        }
      }
    }
  }

  static shift(row, idx) {
    let arr = row.filter(tile => tile.value)
    let missing = cols - arr.length
    let zeros = Array(missing).fill(new Tile(0, 0, res, res / 10, 0))
    for(let i = 0; i < zeros.length; i++) {
      zeros[i].y = idx
      zeros[i].x = i
    }
    for(let i = 0; i < arr.length; i++) {
      arr[i].x = i + zeros.length
    }
    arr = zeros.concat(arr)
    return arr
  }

  static merge(row) {
    for(let i = cols - 1; i >= 1; i--) {
      if(row[i].value === row[i-1].value) {
        row[i].value *= 2
        score += row[i].value
        row[i-1].value = 0
      }
    }
    return row
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
    sample = true
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
