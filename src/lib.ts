import './type';
import { str2rgb, Martix4, Martix } from './util';
const sin = Math.sin;
const cos = Math.cos;

const VSHADER_SRC = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  uniform mat4 u_xformMatrix;
  uniform mat4 u_ModelViewMartix;
  void main() {
    gl_Position = u_ModelViewMartix * u_xformMatrix * a_Position;
    gl_PointSize = a_PointSize;
  }
`
const FSHADER_SRC = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`

class WebGL {
  gl: WebGLRenderingContext; // webGL环境

  width: float; // canvas 宽度
  height: float; // canvas 高度

  program: WebGLProgram; // 程序

  a_Position: GLint; // 顶点指针
  a_PointSize: GLint; // 点的宽度指针

  u_FragColor: WebGLUniformLocation; // 画笔颜色指针
  u_xformMatrix: WebGLUniformLocation; // 变换矩阵指针
  u_ModelViewMartix: WebGLUniformLocation; //视图变换矩阵指针

  vertices: Float32Array; // 顶点数组
  defaultMartix: Mat4; // 默认变换矩阵 
  xformMatrix: Mat4; // 模型变换矩阵 
  modelViewMartix: Mat4; // 视图变换矩阵

  bgc: Color; // 背景色
  color: Color; // 画笔颜色
  penWidth: float; // 画笔宽度

  pointSize: int = 2; // 一个点用使用顶点数组的值的个数
  isChangePointSize: boolean = true; // 是否修改 pointSize

  starde: int; // buffer 跨度
  offset: int; // buffer 偏移

  _params: Object;

  constructor(selector: string = null) {
    if (typeof selector === 'string') {
      const e: HTMLCanvasElement = document.querySelector(selector);
      const rect = e.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
      this.gl = e.getContext('webgl');
    } else {
      const canvas = document.createElement('canvas');
      canvas.setAttribute('width', window.innerWidth + '');
      canvas.setAttribute('height', window.innerHeight + '');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.gl = canvas.getContext('webgl');
      document.body.appendChild(canvas);
    }
    this._init(VSHADER_SRC, FSHADER_SRC);
  }

  // 约定的获取着色器变量的方式
  _getAttr(name: string): any {
    return name[0] === 'u' ? this.gl.getUniformLocation(this.program, name) : this.gl.getAttribLocation(this.program, name);
  }

  // 初始化
  _init(VSHADER: Glsl, FSHADER: Glsl): void {
    const gl = this.gl;
    // 创建着色器
    const vshader = gl.createShader(gl.VERTEX_SHADER); //vertex_shader
    const fshader = gl.createShader(gl.FRAGMENT_SHADER); // fragment_shader
    // 写入着色器
    gl.shaderSource(vshader, VSHADER);
    gl.shaderSource(fshader, FSHADER);
    // 编译着色器
    gl.compileShader(vshader);
    gl.compileShader(fshader);
    // 创建webgl程序
    const program = gl.createProgram();
    // 绑定着色器
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    // 链接程序
    gl.linkProgram(program);
    // 使用程序
    gl.useProgram(program);

    this.program = program;

    // 读取着色器变量
    this.a_Position = this._getAttr('a_Position') // 顶点
    this.a_PointSize = this._getAttr('a_PointSize'); // 点的宽度
    this.u_FragColor = this._getAttr('u_FragColor'); // 颜色
    this.u_xformMatrix = this._getAttr('u_xformMatrix'); // 变换矩阵
    this.u_ModelViewMartix = this._getAttr('u_ModelViewMartix'); // 视图变换矩阵

    // 设置顶点buffer
    const vertexBuffer = gl.createBuffer(); //创建
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); //绑定
    gl.enableVertexAttribArray(this.a_Position); //使用

    // 默认变换矩阵
    this.defaultMartix = Martix4.default().scaling(this.height / this.width).data;

    // 设置默认变换矩阵
    this.setXFormMatrix(this.defaultMartix);
    // 设置默认视图变换矩阵
    this.setModelViewMartix(Martix4.default());
  }

  // 设置背景色
  setBgColor(color: Color) {
    let res: Color | any = {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    };
    if (typeof color === 'string') {
      res = str2rgb(color);
    } else if (typeof color === 'object') {
      res = Object.assign(res, color);
    }
    if (res) {
      this.gl.clearColor(res.r, res.g, res.b, res.a);
    } else {
      throw Error('color is not valid')
    }
  }

  // 清空画板
  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  // 设置顶点数组
  setVertices(vertices: Float32Array, starde: int = 0, offset: int = 0): void {
    this.vertices = vertices;
    this.starde = starde;
    this.offset = offset;
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW); // 写入
  }

  // 设置画笔颜色
  setColor(color: Color) {
    let res: Color | any = {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    };
    if (typeof color === 'string') {
      res = str2rgb(color);
    } else if (typeof color === 'object') {
      res = Object.assign(res, color);
    }
    if (res) {
      this.color = res;
      this.gl.uniform4f(this.u_FragColor, res.r / 255, res.g / 255, res.b / 255, res.a);
    } else {
      throw Error('color is not valid')
    }
  }

  // 设置点的宽度
  setPointWidth(width: float) {
    if (width > 0) {
      this.penWidth = width;
      this.gl.vertexAttrib1f(this.a_PointSize, width);
    } else {
      throw new Error('width is not valid');
    }
  }

  // 设置变换矩阵
  setXFormMatrix(martix: Float32Array | Martix4) {
    martix = martix instanceof Float32Array ? Martix4.init(martix) : martix;
    this.xformMatrix = martix.mul(Martix4.init(this.defaultMartix)).data;
    this.gl.uniformMatrix4fv(this.u_xformMatrix, false, this.xformMatrix);
  }

  // 设置视图变换矩阵
  setModelViewMartix(martix: Float32Array | Martix4) {
    this.modelViewMartix = martix instanceof Float32Array ? martix : martix.data;
    this.gl.uniformMatrix4fv(this.u_ModelViewMartix, false, this.modelViewMartix);
  }

  // 设置一个点用使用顶点数组的值的个数（1-3）
  setPointSize(size: int) {
    this.isChangePointSize = size !== this.pointSize;
    this.pointSize = size;
  }

  // 保存参数
  _saveParam() {
    this._params = {
      vertices: this.vertices,
      pointSize: this.pointSize,
      starde: this.starde,
      offset: this.offset,
    }
  }

  // 重新加载参数
  _reloadParam() {
    const _params: any = this._params;
    this.setVertices(_params.vertices);
    this.setPointSize(_params.pointSize);
    this.starde = _params.strade;
    this.offset = _params.offset;
  }

  // 坐标转换
  realX(v: float) {
    return v / this.width * 2;
  }
  realY(v: float) {
    return v / this.height * 2;
  }

  /**
   * 
   * @param mode 画图模式 POINTS | LINES | LINE_STRIP | LINE_LOOP | TRIANGLES | TRIANGEL_STRIP | TRIANGLE_FAN
   * @param first 起始位置
   * @param count 数量
   */
  draw(mode: number, first: int = 0, count?: int, size?: int) {
    const gl = this.gl;
    if (size) {
      this.setPointSize(size);
    }
    const pointSize = this.pointSize;
    if (this.isChangePointSize) {
      gl.vertexAttribPointer(this.a_Position, pointSize, gl.FLOAT, false, this.starde, this.offset); //分配
      this.isChangePointSize = false;
    }
    count = count ? count : this.vertices.length / pointSize;
    gl.drawArrays(mode, first, count);
  }

  /**
   * @description 画点
   */
  drawPoint(x: float, y: float, z: float = 0) {
    this._saveParam();
    const _x = this.realX(x),
      _y = this.realY(y);
    const vertices = new Float32Array([_x, _y, z]);
    this.setVertices(vertices);
    this.draw(this.gl.POINTS, 0, 1, 3);
    this._reloadParam();
  }

  /**
   * @description 画线
   */
  drawLine(x1: float, y1: float, x2: float, y2: float, z1: float = 0, z2: float = 0) {
    this._saveParam();
    const _x1 = this.realX(x1),
      _x2 = this.realX(x2),
      _y1 = this.realY(y1),
      _y2 = this.realY(y2),
      diffX = _x1 - _x2,
      diffY = _y1 - _y2,
      lineWidth = this.penWidth,
      lineWidthX = this.realX(lineWidth),
      lineWidthY = this.realY(lineWidth);
    let x11 = _x1,
      x12 = _x1,
      y11 = _y1,
      y12 = _y1,
      x21 = _x2,
      x22 = _x2,
      y21 = _y2,
      y22 = _y2;
    if (diffX === 0 && diffY === 0) {
      this.drawPoint(x1, y1);
      this._reloadParam();
      return;
    } else if (diffX === 0) {
      x11 += lineWidthX;
      x12 -= lineWidthX;
      x21 += lineWidthX;
      x22 -= lineWidthX;
    } else if (diffY === 0) {
      y11 += lineWidthY;
      y12 -= lineWidthY;
      y21 += lineWidthY;
      y22 -= lineWidthY;
    } else {
      const k = -1 / (diffY / diffX);
      const angle = Math.atan(k);
      const sinB = sin(angle);
      const cosB = cos(angle);
      const _x = lineWidthX * cosB;
      const _y = lineWidthY * sinB;
      x11 += _x,
        x12 -= _x,
        y11 += _y,
        y12 -= _y,
        x21 += _x,
        x22 -= _x,
        y21 += _y,
        y22 -= _y
    }
    const vertices = new Float32Array([
      x11, y11, z1,
      x12, y12, z1,
      x21, y21, z2,
      x22, y22, z2,
    ]);
    this.setVertices(vertices);
    this.draw(this.gl.TRIANGLE_STRIP, 0, 4, 3);
    this._reloadParam();
  }
}

// 将WebGLRenderingContext的常量复制到 WebGL类
(() => {
  let a: any = WebGLRenderingContext.prototype;
  try {
    for (const key in a) {
      const value = a[key];
      if (typeof value !== 'function') {
        Reflect.defineProperty(WebGL.prototype, key, {
          value,
          writable: false,
          configurable: true,
          enumerable: true,
        })
      }
    }
  } catch (error) {

  }
})()



export default WebGL;
