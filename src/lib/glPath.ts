import { p2p } from './util';
import { Martix4 } from './martix';

type DrawStep = {
  mode: int,
  first: int,
  count: int,
  xformMartix: Martix4,
  color: Color,
  pointWidth: float,
}

/**
 * @description 路径类
 */
export default class GLPath {
  /**
   * @description 生成两点之间的一系列点
   * @param gap 两点的间距
   */
  static genPointsXY(gap: float, x1: float, y1: float, x2: float, y2: float, z1: float = 0, z2: float = 0) {
    const data = [];
    const result = new GLPath();
    gap = Math.abs(gap);
    if (gap <= 0) {
      throw new Error('gap Must be greater than 0');
    }
    let step: DrawStep = {
      mode: WebGLRenderingContext.POINTS,
      first: 0,
      count: 0,
      xformMartix: null,
      pointWidth: null,
      color: null,
    };
    const lineLength = p2p(x1, y1, z1, x2, y2, z2);
    if (lineLength === 0) {
      data.push(x1, y1, z1);
      step.count = 1;
    } else {
      const symbolX = (x2 - x1) > 0 ? 1 : -1;
      const symbolY = (y2 - y1) > 0 ? 1 : -1;
      const symbolZ = (z2 - z1) > 0 ? 1 : -1;
      const pointCount = Math.floor(lineLength / gap);
      const diffX = Math.abs(x2 - x1) / pointCount;
      const diffY = Math.abs(y2 - y1) / pointCount;
      const diffZ = Math.abs(z2 - z1) / pointCount;
      for (let i = 0; i < pointCount + 1; i++) {
        data.push(x1 + i * diffX * symbolX , y1 + i * diffY * symbolY, z1 + i * diffZ * symbolZ);
      }
      step.count = pointCount + 1;
    }
    result.vertices = new Float32Array(data);
    result.steps.push(step);
    return result;
  }

  /**
   * @description 生成连续的线段
   */
  static genLines() {

  }

  static init() {
    return new GLPath();
  }

  /**
   * @description 整合两个path
   * @param path 
   */
  push(...path: Array<GLPath>): GLPath {
    let vertices = Array.from(this.vertices);
    const last = this.steps[this.steps.length - 1] || null; 
    let first = last ? (last.first + last.count) : 0;
    path.forEach(v => {
      vertices.push(...Array.from(v.vertices));
      v.steps.map(v => {
        v.first += first;
        first += v.count;
        return v;
      })
      this.steps.push(...v.steps);
    })
    this.vertices = new Float32Array(vertices);
    return this;  
  }

  steps: Array < DrawStep > =[];
  vertices: Float32Array = new Float32Array();
}
