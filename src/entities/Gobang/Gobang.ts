import CanvasBase from '../CanvasBase'
import Chessboard from './Chessboard'
import Helper from './Helper'

export default class Gobang extends CanvasBase {
  private _width: number
  private _height: number
  private _id!: number
  private _step!: number
  private _helper!: Helper
  public get helper(): Helper {
    return this._helper
  }
  public set helper(value: Helper) {
    this._helper = value
  }

  private chessPieces = {
    size: 30
  }

  constructor(
    gobangElement: HTMLCanvasElement,
    chessboardElement: HTMLCanvasElement,
    helperElement: HTMLCanvasElement,
    width: number,
    height: number
  ) {
    super(gobangElement)
    if (!width || !height) throw '形参width和height必须大于0'
    this._width = width
    this._height = height
    this._step = (this._width - 20) / 15
    new Chessboard(chessboardElement, width, height, this._step)
    this.helper = new Helper(helperElement, width, height, this._step, this.chessPieces.size)
  }
}
