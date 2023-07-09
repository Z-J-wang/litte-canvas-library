export default class Canvas {
  private _element: HTMLCanvasElement
  private _context: CanvasRenderingContext2D

  public get element(): HTMLCanvasElement {
    return this._element
  }
  public set element(value: HTMLCanvasElement) {
    this._element = value
  }
  public get context(): CanvasRenderingContext2D {
    return this._context
  }
  public set context(value: CanvasRenderingContext2D) {
    this._context = value
  }

  constructor(element: HTMLCanvasElement) {
    if (!element.getContext) throw '当前元素不是canvasElement'
    this._element = element
    this._context = element.getContext('2d') as CanvasRenderingContext2D
  }

  draw(): void {
    this.renderRect()
    this.renderRectStroke()
    this.renderCircle()
    this.renderTriangle()
    this.renderPacMan()
    this.renderAntLine()
    this.renderText()
  }

  clear(): void {
    this._context.clearRect(0, 0, this.element.width, this.element.height)
  }

  renderRect(): void {
    this._context.save() // 保存变更前的canvas状态
    this._context.fillStyle = 'rgb(200,0,0)'
    this._context.fillRect(10, 200, 55, 50)
    this._context.restore() // 回退到变更前的canvas状态
  }
  renderRectStroke(): void {
    this._context.strokeRect(100, 200, 55, 50)
  }

  renderCircle(): void {
    const ctx = this._context
    ctx.save()
    ctx.beginPath()
    ctx.arc(250, 250, 50, 0, 2 * Math.PI, false)
    ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.restore()
  }

  renderTriangle(): void {
    const ctx = this._context
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(200, 10)
    ctx.lineTo(200, 100)
    ctx.lineTo(300, 100)
    ctx.closePath()
    ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.restore()
  }

  // 吃豆人
  renderPacMan(): void {
    const ctx = this._context
    ctx.save()
    roundedRect(ctx, 12, 12, 150, 150, 15)
    roundedRect(ctx, 19, 19, 150, 150, 9)
    roundedRect(ctx, 53, 53, 49, 33, 10)
    roundedRect(ctx, 53, 119, 49, 16, 6)
    roundedRect(ctx, 135, 53, 49, 33, 10)
    roundedRect(ctx, 135, 119, 25, 49, 10)

    ctx.beginPath()
    ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false)
    ctx.lineTo(31, 37)
    ctx.fill()

    for (let i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 35, 4, 4)
    }

    for (let i = 0; i < 6; i++) {
      ctx.fillRect(115, 51 + i * 16, 4, 4)
    }

    for (let i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 99, 4, 4)
    }

    ctx.beginPath()
    ctx.moveTo(83, 116)
    ctx.lineTo(83, 102)
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88)
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102)
    ctx.lineTo(111, 116)
    ctx.lineTo(106.333, 111.333)
    ctx.lineTo(101.666, 116)
    ctx.lineTo(97, 111.333)
    ctx.lineTo(92.333, 116)
    ctx.lineTo(87.666, 111.333)
    ctx.lineTo(83, 116)
    ctx.fill()

    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(91, 96)
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101)
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106)
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101)
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96)
    ctx.moveTo(103, 96)
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101)
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106)
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101)
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96)
    ctx.fill()

    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.restore()

    // 封装的一个用于绘制圆角矩形的函数。
    function roundedRect(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) {
      ctx.beginPath()
      ctx.moveTo(x, y + radius)
      ctx.lineTo(x, y + height - radius)
      ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
      ctx.lineTo(x + width - radius, y + height)
      ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
      ctx.lineTo(x + width, y + radius)
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
      ctx.lineTo(x + radius, y)
      ctx.quadraticCurveTo(x, y, x, y + radius)
      ctx.stroke()
    }
  }

  // 蚂蚁线
  renderAntLine() {
    const ctx = this._context
    ctx.save()
    let offset = 0
    function draw() {
      ctx.clearRect(309, 9, 102, 102)
      ctx.setLineDash([4, 2])
      ctx.lineDashOffset = offset
      ctx.strokeRect(310, 10, 100, 100)
    }

    function march() {
      offset++
      if (offset > 16) {
        offset = 0
      }
      draw()
      setTimeout(march, 200)
    }

    march()
    ctx.restore()
  }

  renderText(): void {
    const ctx = this._context
    ctx.font = '24px sans-serif'
    ctx.fillText('Hello Canvas!', 200, 150)
  }
}
