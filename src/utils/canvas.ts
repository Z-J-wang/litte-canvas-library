export default class Canvas {
  private _element: HTMLCanvasElement
  private _context: CanvasRenderingContext2D
  public get element(): HTMLCanvasElement {
    return this._element
  }
  public set element(value: HTMLCanvasElement) {
    this._element = value
  }

  constructor(element: HTMLCanvasElement) {
    if (!element.getContext) throw '当前元素不是canvasElement'
    this._element = element
    this._context = element.getContext('2d') as CanvasRenderingContext2D
  }

  renderRect(): void {
    this._context.fillStyle = 'rgb(200,0,0)'
    this._context.fillRect(10, 10, 55, 50)
  }
}
