import CanvasBase from '../CanvasBase'

export default class Helper extends CanvasBase {
  private _width: number
  private _height: number
  private _step!: number
  private chessPiecesSize!: number

  constructor(element: HTMLCanvasElement, width: number, height: number, step: number, size: number) {
    super(element)
    if (!width || !height) throw '形参width和height必须大于0'
    this._width = width
    this._height = height
    this._step = step
    this.chessPiecesSize = size
  }

  draw() {
    this.coordinate(3, 3)
  }

  coordinate(x: number, y: number) {
    const ctx = this.context
    const width = this._width
    const height = this._height
    const step = this._step
    const size = this.chessPiecesSize
    const translateX = step / 2 + 10 + x * step
    const translateY = step / 2 + 10 + y * step
    ctx.fillStyle = '#fff'
    ctx.globalAlpha = 0.3
    ctx.save()
    ctx.translate(translateX, translateY)
    ctx.fillRect(-translateX, -size / 2, width, size)
    ctx.fillRect(-size / 2, -translateY, size, height)
    ctx.restore()
  }
}
