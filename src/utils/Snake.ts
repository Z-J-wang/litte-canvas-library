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

type unit = { x: number; y: number }

export class Snake extends Canvas {
  private _width: number
  private _height: number
  private _x: number = 0
  private _y: number = 0
  private _direction: Direction = 'right'
  private _id!: number
  private _timer!: NodeJS.Timeout
  private _body: unit[] = []
  private _foods: unit[] = []
  private _bodySize: number = 20
  private _isDead: boolean = false
  private _subject: any
  private _isNoBoundaryMode: boolean = false // 无边界模式
  speed: number = 200 // 运动速度，默认200ms前进一格

  public get isDead(): boolean {
    return this._isDead
  }

  /**
   * @param element canvas元素
   * @param width canvas的宽度
   * @param height canvas的高度
   * @param subject rxjs的Subject实例，在死亡时将向该subject发送通知
   * @param speed 行走速度
   * @param isNoBoundaryMode 是否启用无边界模式，无边界模式下贪吃蛇会穿过边界从另外一边墙壁进来
   */
  constructor(
    element: HTMLCanvasElement,
    width: number,
    height: number,
    subject: any,
    speed?: number,
    isNoBoundaryMode?: boolean
  ) {
    super(element)
    if (!width || !height) throw '形参width和height必须大于0'
    this._subject = subject
    this._width = width
    this._height = height
    speed && (this.speed = speed)
    isNoBoundaryMode && (this._isNoBoundaryMode = isNoBoundaryMode)
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
    this._initFood()
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
    this._foods.forEach((item) => {
      ctx.fillStyle = 'green'
      ctx.fillRect(item.x, item.y, this._bodySize, this._bodySize)
    })
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
    if (
      (['left', 'right'].includes(direction) && ['left', 'right'].includes(this._direction)) ||
      (['up', 'down'].includes(direction) && ['up', 'down'].includes(this._direction))
    ) {
      return // 不允许反方向转弯
    }
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
    this._gameOver()
  }

  private _move(x: number, y: number) {
    this._eat()
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

  private _eat() {
    const body = this._body
    const len = body.length
    const head = this._body[0]
    const foods = this._foods
    for (let index = 0; index < foods.length; index++) {
      const food = foods[index]
      if (head.x === food.x && head.y === food.y) {
        // head坐标与food重合，触发吃的动作
        if (body[len - 1].x === body[len - 2].x) {
          // 比较最后两节的身体判断新增身体的位置。通过观察可知，最后两节身体必定存在一个坐标轴一致的。
          body.push({ x: body[len - 1].x, y: body[len - 1].y + this._bodySize })
        } else if (body[len - 1].y === body[len - 2].y) {
          body.push({ x: body[len - 1].x + this._bodySize, y: body[len - 1].y })
        }
        this._foods.splice(index, 1) // 删除被吃掉的food
        break
      }
    }
  }

  private _initFood() {
    const getRandomIntInclusive = (min: number, max: number) => {
      min = Math.ceil(min / this._bodySize)
      max = Math.floor(max / this._bodySize)
      return (Math.floor(Math.random() * (max - min + 1)) + min) * this._bodySize //含最大值，含最小值
    }

    const createFood = () => {
      const x = getRandomIntInclusive(0, this._width)
      const y = getRandomIntInclusive(0, this._height)
      return { x, y }
    }

    const foods: unit[] = []
    while (foods.length < 200) {
      const food = createFood()
      if (![...foods, ...this._body].some((f) => f.x === food.x && f.y === food.y)) {
        foods.push(food)
      }
    }

    this._foods = foods
  }

  // TODO 后面可以在地图中增加随机生成的障碍物
  private _death() {
    const head = this._body[0]
    const stumblingBlock = [...this._body.slice(1)] // 障碍物集合，head触碰到障碍物就会死亡

    if (!this._isNoBoundaryMode) {
      // 非无边界模式，触碰边界就会死亡
      if (
        head.x === 0 ||
        head.x === this._width - this._bodySize ||
        head.y === 0 ||
        head.y === this._height - this._bodySize
      ) {
        return true
      }
    }

    return stumblingBlock.some((body) => body.x === head.x && body.y === head.y)
  }

  private _gameOver() {
    this._isDead = this._death()
    if (this._isDead) {
      clearTimeout(this._timer)
      setTimeout(() => {
        this._subject.next(true) // 每次死亡都对外通知一次
      }, this.speed)
    }
  }
}
