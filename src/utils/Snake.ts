import Canvas from './Canvas'

export default class Ball extends Canvas {
  private _width: number
  private _height: number

  constructor(element: HTMLCanvasElement, width: number, height: number) {
    super(element)
    if (!width || !height) throw '形参width和height必须大于0'
    this._width = width
    this._height = height
  }
}
