declare module '@/utils/canvas'

declare namespace Utils {
  export interface Canvas {
    _element: HTMLCanvasElement
    _context: CanvasRenderingContext2D
    renderRect(): void
  }
}
