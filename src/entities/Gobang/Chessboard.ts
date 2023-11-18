import CanvasBase from '../CanvasBase'

export default class Chessboard extends CanvasBase {
  private _width: number
  private _height: number
  private _id!: number
  private _step!: number

  constructor(element: HTMLCanvasElement, width: number, height: number, step: number) {
    super(element)
    if (!width || !height) throw '形参width和height必须大于0'
    this._width = width
    this._height = height
    this._step = step
    this.draw()
  }

  draw() {
    this.chessboard()
  }

  chessboard() {
    const ctx = this.context
    const width = this._width
    const height = this._height
    const step = this._step
    ctx.fillStyle = '#b7ae8f'
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 1
    ctx.fillRect(0, 0, width, height)
    ctx.save()
    ctx.translate(step / 2, step / 2)
    for (let i = 0; i < 15; i++) {
      ctx.beginPath()
      ctx.moveTo(10, 10 + i * step)
      ctx.lineTo(width - 10 - step, 10 + i * step)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(10 + i * step, 10)
      ctx.lineTo(10 + i * step, height - 10 - step)
      ctx.stroke()
      ctx.closePath()
      if ((i + 1) % 4 === 0) {
        ctx.beginPath()
        ctx.fillStyle = '#000'
        ctx.arc(10 + i * step, 10 + i * step, 5, 0, 2 * Math.PI)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(width - 10 - (i + 1) * step, 10 + i * step, 5, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
    ctx.restore()
  }
}
