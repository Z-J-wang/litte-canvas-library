import Canvas from './Canvas'

export default class Clock extends Canvas {
  private _width: number
  private _height: number

  private _id!: number

  private _second!: number
  private _minute!: number
  private _hour!: number

  private _r: number = 100

  constructor(element: HTMLCanvasElement, width: number, height: number) {
    super(element)
    if (!width || !height) throw '形参width和height必须大于0'
    this._width = width
    this._height = height
  }

  draw() {
    this._id = window.requestAnimationFrame(() => {
      const ctx = super.context
      window.cancelAnimationFrame(this._id)
      ctx.clearRect(0, 0, this._width, this._height)
      this.second()
      this.minute()
      this.hour()
      this.renderWatchFace()
      this._id = window.requestAnimationFrame(() => this.draw())
    })
  }

  renderWatchFace(): void {
    const ctx = super.context
    ctx.save()
    ctx.translate(this._width / 2, this._height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.save()
    ctx.beginPath()
    ctx.arc(0, 0, 4, 0, Math.PI * 2, false)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.restore()
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

  second() {
    const ctx = super.context
    this._second = new Date().getSeconds()
    ctx.save()
    ctx.translate(this._width / 2, this._height / 2)
    ctx.rotate((Math.PI * this._second) / 30 - Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(-10, 0)
    ctx.lineTo(this._r - 12, 0)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }

  minute() {
    const ctx = super.context
    this._minute = new Date().getMinutes()
    ctx.save()
    ctx.translate(this._width / 2, this._height / 2)
    ctx.rotate((Math.PI * this._minute) / 30 + (Math.PI * this._second) / 1800 - Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(-10, 0)
    ctx.lineWidth = 3
    ctx.lineTo(this._r - 15, 0)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }

  hour() {
    const ctx = super.context
    const hour = new Date().getHours()
    this._hour = hour >= 12 ? hour - 12 : hour
    ctx.save()
    ctx.translate(this._width / 2, this._height / 2)
    ctx.rotate(
      (Math.PI * this._hour) / 6 + (Math.PI * this._minute) / 360 + (Math.PI * this._second) / 21600 - Math.PI / 2
    )
    ctx.beginPath()
    ctx.moveTo(-10, 0)
    ctx.lineWidth = 5
    ctx.lineTo(this._r - 30, 0)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }
}
