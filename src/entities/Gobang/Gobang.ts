import CanvasBase from '../CanvasBase'
import Chessboard from './Chessboard'
import Helper from './Helper'

type Player = 'blacker' | 'whiter' // 玩家
type winner = 'blacker' | 'whiter' | null // 胜利者

export default class Gobang extends CanvasBase {
  private _width: number
  private _height: number
  private _step!: number
  private _subject: any // rxjs的Subject实例
  private _blackChessPieceSet: string[] = [] // 黑棋位置信息集
  private _whiteChessPieceSet: string[] = [] // 白棋位置信息集
  private _helper!: Helper // Helper实例
  public get helper(): Helper {
    return this._helper
  }

  private _player: Player = 'blacker' // 当前玩家
  public get player(): Player {
    return this._player
  }

  private _winner: winner = null // 胜利者，默认null
  public get winner(): winner {
    return this._winner
  }

  // 棋子基础信息集
  private chessPieces = {
    size: 30,
    color: {
      blacker: '#000000', // 白子
      whiter: '#ffffff' // 黑子
    }
  }

  constructor(
    gobangElement: HTMLCanvasElement,
    chessboardElement: HTMLCanvasElement,
    helperElement: HTMLCanvasElement,
    width: number,
    height: number,
    subject: any
  ) {
    super(gobangElement)
    if (!width || !height) throw '形参width和height必须大于0'
    this._width = width
    this._height = height
    this._subject = subject
    this._step = (this._width - 20) / 15
    new Chessboard(chessboardElement, width, height, this._step)
    this._helper = new Helper(helperElement, width, height, this._step, this.chessPieces.size)
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
    const loc = `${x}${y}`
    const isUsed = [...this._blackChessPieceSet, ...this._whiteChessPieceSet].some((item) => item === loc)
    if (x >= 0 && x <= 14 && y >= 0 && y <= 14 && !isUsed) {
      if (this._player === 'blacker') this._blackChessPieceSet.push(loc)
      else this._whiteChessPieceSet.push(loc)
      this.drawChessPiece(x, y, this.chessPieces.color[this._player])
      this._player = this._player === 'blacker' ? 'whiter' : 'blacker'

      this.isWin()
    }
  }

  /**
   * 绘制棋子
   * @param x 棋子横坐标
   * @param y 棋子纵坐标
   * @param color 棋子颜色
   */
  drawChessPiece(x: number, y: number, color: string | CanvasGradient | CanvasPattern): void {
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

  // 判断是否任何一方已经达到胜利的条件。胜利条件：同色棋子五子连线
  isWin(): void {
    const blackRecordLeft = new Map() // 记录水平方向个各行的黑棋
    const whiteRecordLeft = new Map() // 记录水平方向个各行的白棋
    const blackRecordTop = new Map() // 记录垂直方向个各列的黑棋
    const whiteRecordTop = new Map() // 记录垂直方向个各列的白棋
    const blackRecordLeftTop = new Map() // 记录从左上角方向个各列的黑棋
    const whiteRecordLeftTop = new Map() // 记录从左上角方向个各列的黑棋
    const blackRecordRightTop = new Map() // 记录从右上角方向个各列的黑棋
    const whiteRecordRightTop = new Map() // 记录从右上角方向个各列的白棋

    // 遍历棋盘，按左、上、左上、右上四个方向汇总棋子
    !(() => {
      const blackData = this._blackChessPieceSet
      const whiteData = this._whiteChessPieceSet

      const helper = (
        recordLeft: Map<any, any>,
        recordTop: Map<any, any>,
        recordLeftTop: Map<any, any>,
        recordRightTop: Map<any, any>,
        x: number,
        y: number
      ) => {
        if (recordLeft.has(y)) {
          const arr = recordLeft.get(y)
          arr.push({ x, y })
          recordLeft.set(y, arr)
        } else {
          recordLeft.set(y, [{ x, y }])
        }

        if (recordTop.has(x)) {
          const arr = recordTop.get(x)
          arr.push({ x, y })
          recordTop.set(x, arr)
        } else {
          recordTop.set(x, [{ x, y }])
        }

        const leftTopKey = x - y
        if (recordLeftTop.has(leftTopKey)) {
          const arr = recordLeftTop.get(leftTopKey)
          arr.push({ x, y })
          recordLeftTop.set(leftTopKey, arr)
        } else {
          recordLeftTop.set(leftTopKey, [{ x, y }])
        }

        const rightTopKey = x + y
        if (recordRightTop.has(rightTopKey)) {
          const arr = recordRightTop.get(rightTopKey)
          arr.push({ x, y })
          recordRightTop.set(rightTopKey, arr)
        } else {
          recordRightTop.set(rightTopKey, [{ x, y }])
        }
      }

      for (let x = 0; x < 15; x++) {
        for (let y = 0; y < 15; y++) {
          const loc = `${x}${y}`
          if (blackData.includes(loc)) {
            helper(blackRecordLeft, blackRecordTop, blackRecordLeftTop, blackRecordRightTop, x, y)
          }
          if (whiteData.includes(loc)) {
            helper(whiteRecordLeft, whiteRecordTop, whiteRecordLeftTop, whiteRecordRightTop, x, y)
          }
        }
      }
    })()

    // 判断是否五子连线
    const judge = (map: any[] | Map<any, any>, direction: string) => {
      for (const value of map.values()) {
        if (value.length < 5) continue // 棋子数量不足5个，不用判断

        let len = 0 // 记录连续的棋子数量
        let prevX = 0
        let prevY = 0
        for (const { x, y } of value) {
          if (len === 0) {
            len++
          } else if (len >= 5) {
            break
          } else {
            switch (direction) {
              case 'left':
                if (prevX === x - 1) len++
                break
              case 'top':
                if (prevY === y - 1) len++
                break
              case 'leftTop':
                if (prevX === x - 1 && prevY === y - 1) len++
                break
              case 'rightTop':
                if (prevX === x - 1 && prevY === y + 1) len++
                else len = 1
                break
              default:
                len = 1
                break
            }
          }
          prevX = x
          prevY = y
        }

        if (len >= 5) return true // 记录连续的棋子数量达到5个，中断遍历，返回true
      }
    }
    if (
      judge(blackRecordLeft, 'left') ||
      judge(blackRecordTop, 'top') ||
      judge(blackRecordLeftTop, 'leftTop') ||
      judge(blackRecordRightTop, 'rightTop')
    ) {
      this._winner = 'blacker'
      this._subject.next({ message: 'blacker win' })
    } else if (
      judge(whiteRecordLeft, 'left') ||
      judge(whiteRecordTop, 'top') ||
      judge(whiteRecordLeftTop, 'leftTop') ||
      judge(whiteRecordRightTop, 'rightTop')
    ) {
      this._winner = 'whiter'
      this._subject.next({ message: 'whiter win' })
    }
  }

  reset(): void {
    super.clear()
    this._blackChessPieceSet = this._whiteChessPieceSet = []
    this._player = 'blacker'
  }
}
