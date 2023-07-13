import Canvas from './Canvas'

export enum SportTypeEnum {
  'uniform motion', // 匀速运动
  'decelerated motion' // 减速运动
}

export class Ball extends Canvas {
  private _width: number
  private _height: number
  private _xv: number = 0.3 // 小球水平方向的速度
  private _yv: number = 0.25 // 小球垂直方向的速度
  private _a: number = -0.04 // 加速度
  private _pervTimestamp: number = 0 // requestAnimationFrame前一次的渲染的时间戳,初始值为0
  private _prevX: number // 前一次渲染的X坐标值
  private _prevY: number // 前一次渲染的Y坐标值，默认-250（中间）

  private _id!: number

  constructor(element: HTMLCanvasElement, width: number, height: number) {
    super(element)
    if (!width || !height) throw '形参width和height必须大于0'
    this._width = width
    this._height = height
    this._prevX = width / 2
    this._prevY = 0
  }

  init(): void {
    this._xv = 0.3
    this._yv = 0.25
    this._a = -0.04
    this._prevX = this._width / 2
    this._prevY = 0
  }

  drawBall(sportType: SportTypeEnum): void {
    window.cancelAnimationFrame(this._id)
    this.init()
    if (sportType === SportTypeEnum['uniform motion']) {
      this._id = window.requestAnimationFrame((timestamp) => this.uniformMotion(timestamp))
    }
    if (sportType === SportTypeEnum['decelerated motion']) {
      this._id = window.requestAnimationFrame((timestamp) => this.deceleratedMotion(timestamp))
    }
  }

  // 减速运动
  deceleratedMotion(timestamp: number) {
    this._yv *= 0.99
    this._yv -= this._a
    let y = this._prevY + Math.abs(timestamp - this._pervTimestamp) * this._yv
    let x = this._prevX + Math.abs(timestamp - this._pervTimestamp) * this._xv
    const boundaryLeft = 20
    const boundaryRight = this._width - 20
    const boundaryTop = 20
    const boundaryBottom = this._height - 20
    if (x <= boundaryLeft) {
      this._xv = -this._xv
      x = boundaryLeft
    }
    if (x >= boundaryRight) {
      this._xv = -this._xv
      x = boundaryRight
    }
    if (y >= boundaryBottom) {
      this._yv = -this._yv
      y = boundaryBottom
    }
    if (y <= boundaryTop) {
      this._yv = -this._yv
      y = boundaryTop
    }
    this._prevY = y
    this._prevX = x
    this._pervTimestamp = timestamp
    this.renderBall(x, y)
    this._id = window.requestAnimationFrame((timestamp) => this.deceleratedMotion(timestamp))
  }

  // 匀速运动
  uniformMotion(timestamp: number) {
    let y = this._prevY + Math.abs(timestamp - this._pervTimestamp) * this._yv
    let x = this._prevX + Math.abs(timestamp - this._pervTimestamp) * this._xv
    const boundaryLeft = 20
    const boundaryRight = this._width - 20
    const boundaryTop = 20
    const boundaryBottom = this._height - 20
    if (x <= boundaryLeft) {
      this._xv = -this._xv
      x = boundaryLeft
    }
    if (x >= boundaryRight) {
      this._xv = -this._xv
      x = boundaryRight
    }
    if (y >= boundaryBottom) {
      this._yv = -this._yv
      y = boundaryBottom
    }
    if (y <= boundaryTop) {
      this._yv = -this._yv
      y = boundaryTop
    }
    this._prevY = y
    this._prevX = x
    this._pervTimestamp = timestamp
    this.renderBall(x, y)
    this._id = window.requestAnimationFrame((timestamp) => this.uniformMotion(timestamp))
  }

  renderBall(x: number, y: number): void {
    const ctx = super.context
    ctx.clearRect(0, 0, 1000, 500)
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, Math.PI * 2, false)
    ctx.fillStyle = '#e74c3c'
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
}
