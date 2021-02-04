import { p2p } from './util';
import { Martix4 } from './martix';
import { Vector3 } from './vector';

type DrawStep = {
  mode: int,
  first: int,
  count: int,
  xformMartix: Martix4,
  color: Color,
  pointWidth: float,
  vertices: Float32Array,
}

/**
 * @description 路径类
 */
export default class GLPath {
  /**
   * @description 生成宽度为1的线段
   */
  static genLine(x1: float, y1: float, z1: float, x2: float, y2: float, z2: float): DrawStep {
    const data = [x1, y1, z1, x2, y2, z2];
    let step: DrawStep = {
      mode: WebGLRenderingContext.LINES,
      first: 0,
      count: 2,
      xformMartix: null,
      pointWidth: null,
      color: null,
      vertices: new Float32Array(data),
    };
    return step;
  }

  static init() {
    return new GLPath();
  }

  /**
   * @description 整合多个path为一个
   * @param path 
   */
  add(...path: Array<GLPath | DrawStep>): GLPath {
    path.forEach(v => {
      if (v instanceof GLPath) {
        this.steps.push(...v.steps);
      } else {
        this.steps.push(v);
      }
    })
    return this;  
  }

  /**
   * @description 获取渲染数据
   */
  getRender() {
    let vertices: Array<float> = [];
    let steps : Array<DrawStep> = [];
    let first = 0;
    this.steps.forEach(v => {
      vertices = vertices.concat(Array.from(v.vertices));
      const item = Object.assign({}, v);
      item.first += first;
      first += item.count;
      steps.push(item);
    });
    return {
      vertices,
      steps
    }
  }
  steps: Array < DrawStep > =[];
}
