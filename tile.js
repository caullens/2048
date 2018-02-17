class Tile {
  constructor(x, y, wh, dx, value) {
    this.x = x
    this.y = y
    this.wh = wh
    this.starting = floor(wh / dx)
    this.dx = dx
    this.value = value
    this.centerX = (this.x * this.wh) + (this.wh / 2)
    this.centerY = (this.y * this.wh) + (this.wh / 2)
    this.spawning = false
  }

  show() {
    noStroke()
    if(this.spawning && this.starting < this.wh) this.starting += this.dx
    if(this.starting > this.wh) this.starting = this.wh
    fill(colors[this.value][0], colors[this.value][1], colors[this.value][2], colors[this.value][3])
    rectMode(CENTER)
    if(this.spawning) rect(this.centerX, this.centerY, this.starting, this.starting, this.wh / 5)
    else rect(this.centerX, this.centerY, this.wh, this.wh, this.wh / 5)
    textFont('Acme')
    textSize(floor(this.wh / 2.5))
    if(this.value.toString().length > 5) textSize(floor(1.9 * this.wh / this.value.toString().length))
    textAlign(CENTER, CENTER)
    fill(51)
    if(this.value !== 0) text(this.value, this.x * this.wh + (this.wh / 2), this.y * this.wh + (this.wh / 2))
  }
}
