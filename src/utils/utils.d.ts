declare module '@/utils/canvas'

declare namespace Utils {
  export interface Canvas {
    _element: HTMLCanvasElement
    _context: CanvasRenderingContext2D
    renderRect(): void
    draw(): void
  }

  export type SportType = 'uniform motion' | 'decelerated motion' // uniform motion=>匀速运动；decelerated motion=>减速运动
}
