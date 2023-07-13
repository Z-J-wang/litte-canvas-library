import Canvas from './canvas'

export default class Clock extends Canvas {
  private _width: number
  private _height: number

  private _id!: number

  private _r: number = 100

  constructor(element: HTMLCanvasElement, width: number, height: number) {
    super(element)
    if (!width || !height) throw '形参width和height必须大于0'
    this._width = width
    this._height = height
  }

  draw() {
    const ctx = super.context
    ctx.save()
    ctx.translate(this._width / 2, this._height / 2)
    ctx.beginPath()
    ctx.arc(0, 0, this._r, 0, Math.PI * 2, false)
    ctx.stroke()

    for (let i = 0; i < 12; i++) {
      ctx.beginPath()
      ctx.rotate(Math.PI / 6)
      ctx.moveTo(this._r - 10, 0)
      ctx.lineTo(this._r, 0)
      ctx.stroke()
    }
    ctx.restore()
    // const date = new Date()
    // const h = date.getHours()
    // const m = date.getMinutes()
    // const s = date.getSeconds()

    // const hh = h < 12? h : h - 12
    // const mm = m < 10? '0' + m : m
  }
}
