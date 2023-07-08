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
  }

  renderRect(): void {
    this._context.fillStyle = 'rgb(200,0,0)'
    this._context.fillRect(10, 10, 55, 50)
  }
}
