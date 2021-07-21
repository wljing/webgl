/**
 * @description 路径
 */
// import { Martix4 } from './martix';

// interface DrawStep {
//   mode: int, // 绘图模式
//   first: int, // 顶点起始位置
//   count: int, // 顶点数量
//   xformMartix: Martix4, // 模型变换
//   color: Color, // 画笔颜色
//   pointWidth: float, // 点的宽度
//   vertices: Float32Array, // 顶点数据
// }

/**
 * @description 路径类
 */
// export default class GLPath {
//   /**
//    * @description 宽度为1的线段
//    */
//   static genLine(x1: float, y1: float, z1: float, x2: float, y2: float, z2: float, pointWidth: float = null, ): DrawStep {
//     const data = [x1, y1, z1, x2, y2, z2];
//     const step: DrawStep = {
//       mode: WebGLRenderingContext.LINES,
//       first: 0,
//       count: 2,
//       xformMartix: null,
//       pointWidth,
//       color: null,
//       vertices: new Float32Array(data),
//     };
//     return step;
//   }

//   static init() {
//     return new GLPath();
//   }

//   steps: Array<DrawStep> = []; // 保存路径

//   // isBegin: boolean = false;

//   // beginPath() {
//   //   this.isBegin = true;
//   // }

//   /**
//    * @description 整合多个path为一个
//    * @param path 
//    */
//   add(...path: Array<GLPath | DrawStep>): GLPath {
//     path.forEach(v => {
//       if (v instanceof GLPath) {
//         this.steps.push(...v.steps);
//       } else {
//         this.steps.push(v);
//       }
//     })
//     return this;  
//   }

//   /**
//    * @description 获取渲染数据
//    */
//   getRender() {
//     let vertices: Array<float> = [];
//     let steps: Array<DrawStep> = [];
//     let first = 0;
//     this.steps.forEach(v => {
//       vertices = vertices.concat(Array.from(v.vertices));
//       const item = Object.assign({}, v);
//       item.first += first;
//       first += item.count;
//       steps.push(item);
//     });
//     return {
//       vertices,
//       steps
//     }
//   }

// }
