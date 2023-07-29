import Canvas from './Canvas'

export type Direction = 'left' | 'right' | 'up' | 'down' // 运动方向数据类型，可选值：'left' | 'right' | 'up' | 'down'

export enum keyCodeEnum {
  left = 37,
  right = 39,
  up = 38,
  down = 40
}

enum DirectionEnum {
  left = -1,
  right = 1,
  up = -1,
  down = 1
}

type SnakeBody = { x: number; y: number }[]

export class Snake extends Canvas {
  private _width: number
  private _height: number
  private _x: number = 0
  private _y: number = 0
  private _direction: Direction = 'right'
  private _id!: number

  private _timer!: NodeJS.Timeout

  private _body: SnakeBody = []

  private _bodySize: number = 20

  private _isDead: boolean = false

  private _isGameOver: boolean = false

  speed: number = 200 // 运动速度，默认200ms前进一格

  constructor(element: HTMLCanvasElement, width: number, height: number, speed?: number) {
    super(element)
    if (!width || !height) throw '形参width和height必须大于0'
    this._width = width
    this._height = height
    speed && (this.speed = speed)
    this._initSnake()
  }

  private _initSnake() {
    this._body = [
      { x: 60, y: 20 },
      { x: 40, y: 20 },
      { x: 20, y: 20 }
    ]
  }

  start() {
    this.walk()
    this.render()
  }

  render() {
    this._id = window.requestAnimationFrame(() => {
      this._drawSnake()
      this._id = window.requestAnimationFrame(() => this.render())
    })
  }

  // 绘制snake
  private _drawSnake() {
    const ctx = super.context
    const { _body: body } = this
    ctx.clearRect(0, 0, this._width, this._height)
    ctx.save()
    body.forEach((item, i) => {
      if (i === 0) {
        ctx.fillStyle = 'red'
      } else {
        ctx.fillStyle = 'grey'
      }
      ctx.fillRect(item.x, item.y, this._bodySize, this._bodySize)
    })
    ctx.stroke()
  }

  control(direction: Direction) {
    if (DirectionEnum[direction] === -DirectionEnum[this._direction]) return // 不允许反方向转弯
    this._direction = direction
    this._timer && clearTimeout(this._timer)
    this.walk()
  }

  walk() {
    const direction = this._direction
    const { x: headX, y: headY } = this._body[0]
    switch (direction) {
      case 'left':
      case 'right':
        this._move(headX + DirectionEnum[direction] * this._bodySize, headY)
        break
      case 'up':
      case 'down':
        this._move(headX, headY + DirectionEnum[direction] * this._bodySize)
        break
    }
    this._timer = setTimeout(() => {
      clearTimeout(this._timer)
      this.walk()
    }, this.speed)
  }

  private _move(x: number, y: number) {
    let targetX: number,
      targetY: number = 0

    if (x > this._width - 10) {
      targetX = x - this._width
    } else if (x < 0) {
      targetX = x + this._width
    } else {
      targetX = x
    }

    if (y > this._height - 10) {
      targetY = y - this._height
    } else if (y < 0) {
      targetY = y + this._height
    } else {
      targetY = y
    }
    this._body.unshift({ x: targetX, y: targetY })
    this._body.pop()
  }
}
