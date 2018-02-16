class Tile {
  constructor(x, y, wh, value) {
    this.x = x
    this.y = y
    this.wh = wh
    this.value = value
  }

  show() {
    fill(colors[this.value][0], colors[this.value][1], colors[this.value][2], colors[this.value][3])
    rect(this.x * this.wh, this.y * this.wh, this.wh, this.wh, this.wh / 5)
    textFont('Acme')
    textSize(floor(this.wh / 2.5))
    if(this.value.toString().length > 5) textSize(floor(1.9 * this.wh / this.value.toString().length))
    textAlign(CENTER, CENTER)
    fill(51)
    if(this.value !== 0) text(this.value, this.x * this.wh + (this.wh / 2), this.y * this.wh + (this.wh / 2))
  }

  spawnAnimation() {

  }
}
