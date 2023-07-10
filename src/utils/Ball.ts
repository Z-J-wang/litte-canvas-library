import Canvas from './canvas'

export default class Ball extends Canvas {
  _v: number = 0.3 //小球的速度
  _pervTimestamp: number = 0 // requestAnimationFrame前一次的渲染的时间戳,初始值为0
  _prevY: number = -250 // 前一次渲染的Y坐标值，默认-250（中间）

  _direction: number = 0 // 小球运动方向，1表示向上，0表示向下

  constructor(element: HTMLCanvasElement) {
    super(element)
  }

  draw(): void {
    window.requestAnimationFrame((timestamp) => this.jump(timestamp))
  }

  jump(timestamp: number) {
    let y = this._prevY
    const distance = Math.abs(timestamp - this._pervTimestamp) * this._v
    if (this._pervTimestamp) {
      if (this._direction === 0) {
        y += distance
        if (y >= -20) {
          this._direction = 1
          y = -20
        }
      } else {
        y -= distance
        if (y <= -480) {
          this._direction = 0
          y = -480
        }
      }
    }
    this._prevY = y
    this._pervTimestamp = timestamp
    this.renderBall(0, y)
    window.requestAnimationFrame((timestamp) => this.jump(timestamp))
  }

  renderBall(x: number, y: number): void {
    const ctx = super.context
    ctx.clearRect(0, 0, 1000, 500)
    ctx.save()
    ctx.translate(500, 500)
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, Math.PI * 2, false)
    ctx.fillStyle = '#e74c3c'
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
}
