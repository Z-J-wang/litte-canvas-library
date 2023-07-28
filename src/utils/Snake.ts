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

export class Snake extends Canvas {
  private _width: number
  private _height: number
  private _x: number = 0
  private _y: number = 0
  private _speed: number = 10
  private _direction: Direction
  private _id!: number

  constructor(element: HTMLCanvasElement, width: number, height: number) {
    super(element)
    if (!width || !height) throw '形参width和height必须大于0'
    this._width = width
    this._height = height
  }

  render() {
    this._id = window.requestAnimationFrame(() => {
      this._drawSnake()
      this._id = window.requestAnimationFrame(() => this._drawSnake())
    })
  }

  // 绘制snake
  private _drawSnake() {
    const ctx = super.context
    ctx.clearRect(0, 0, this._width, this._height)
    ctx.save()
    ctx.strokeStyle = 'red'
    ctx.strokeRect(this._x, this._y, 10, 10)
    ctx.stroke()
  }

  walk(direction: Direction) {
    this._direction = direction
    switch (direction) {
      case 'left':
      case 'right':
        this._move(this._x + DirectionEnum[direction] * this._speed, this._y)
        break
      case 'up':
      case 'down':
        this._move(this._x, this._y + DirectionEnum[direction] * this._speed)
        break
    }
  }

  private _move(x: number, y: number) {
    if (x > this._width - 10) {
      this._x = x - this._width
    } else if (x < 0) {
      this._x = x + this._width
    } else {
      this._x = x
    }

    if (y > this._height - 10) {
      this._y = y - this._height
    } else if (y < 0) {
      this._y = y + this._height
    } else {
      this._y = y
    }

    this._drawSnake()
  }
}
