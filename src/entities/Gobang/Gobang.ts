import CanvasBase from '../CanvasBase'
import Chessboard from './Chessboard'
import Helper from './Helper'

type Poll = 'black' | 'white'

export default class Gobang extends CanvasBase {
  private _width: number
  private _height: number
  private _step!: number
  private _helper!: Helper
  private _blackChessPieceSet: { x: number; y: number }[] = [] // 黑棋位置信息集
  private _whiteChessPieceSet: { x: number; y: number }[] = [] // 白棋位置信息集
  public get helper(): Helper {
    return this._helper
  }
  public set helper(value: Helper) {
    this._helper = value
  }

  private _poll: Poll = 'black'
  public get poll(): Poll {
    return this._poll
  }

  private chessPieces = {
    size: 30,
    color: {
      black: '#000000', // 白子
      white: '#ffffff' // 黑子
    }
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

  /**
   * 落子
   * @param elementX 相对于棋盘左上角的x坐标值
   * @param elementY 相对于棋盘左上角的y坐标值
   * @param isOutside 是否超出棋盘
   * @returns 无
   */
  drop(elementX: number, elementY: number, isOutside: Boolean): void {
    if (isOutside) return
    const x = Math.floor((elementX - 10) / this._step)
    const y = Math.floor((elementY - 10) / this._step)
    const isUsed = [...this._blackChessPieceSet, ...this._whiteChessPieceSet].some(
      (item) => item.x === x && item.y === y
    )
    if (x >= 0 && x <= 14 && y >= 0 && y <= 14 && !isUsed) {
      if (this._poll === 'black') this._blackChessPieceSet.push({ x, y })
      else this._whiteChessPieceSet.push({ x, y })
      this.drawChessPiece(x, y, this.chessPieces.color[this._poll])
      this._poll = this._poll === 'black' ? 'white' : 'black'
    }
  }

  drawChessPiece(x: number, y: number, color: string | CanvasGradient | CanvasPattern) {
    const ctx = this.context
    const size = this.chessPieces.size
    const step = this._step
    const translateX = step / 2 + 10 + x * step
    const translateY = step / 2 + 10 + y * step
    ctx.beginPath()
    ctx.save()
    ctx.translate(translateX, translateY)
    ctx.fillStyle = color
    ctx.arc(0, 0, size / 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()
    ctx.closePath()
  }
}
