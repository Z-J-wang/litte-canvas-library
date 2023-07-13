import Canvas from './Canvas'

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
    ctx.clearRect(0, 0, this._width, this._height)
    this.renderWatchFace()
    // const date = new Date()
    // const h = date.getHours()
    // const m = date.getMinutes()
    // const s = date.getSeconds()

    // const hh = h < 12? h : h - 12
    // const mm = m < 10? '0' + m : m
  }

  renderWatchFace(): void {
    const ctx = super.context
    ctx.save()
    ctx.translate(this._width / 2, this._height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.beginPath()
    ctx.arc(0, 0, 4, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(0, 0, this._r, 0, Math.PI * 2, false)
    ctx.stroke()

    for (let i = 0; i < 60; i++) {
      ctx.beginPath()
      if (i % 5 === 0) {
        const text = i / 5 ? i / 5 : 12
        ctx.moveTo(this._r - 10, 0)
        ctx.save()
        ctx.translate(this._r - 25, 0)
        ctx.rotate(Math.PI / 2 - i * (Math.PI / 30))
        ctx.font = '16px sans-serif'
        ctx.fillText(text.toString(), -4, 6)
        ctx.restore()
      } else {
        ctx.moveTo(this._r - 5, 0)
      }
      ctx.lineTo(this._r, 0)
      ctx.rotate(Math.PI / 30)
      ctx.stroke()
    }
    ctx.restore()
  }
}
