import { str2rgb } from './util';
import GLPath from './glPath';
import { Martix4 } from './martix';
const { sin, cos } = Math;


const VSHADER_SRC = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  uniform mat4 u_xformMatrix;
  uniform mat4 u_ViewMartix;
  uniform mat4 u_PerspectiveMartix;
  void main() {
    gl_Position = u_PerspectiveMartix * u_ViewMartix * u_xformMatrix * a_Position;
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

type WebGLConfig = {
  color: Color,
  pointWidth: float,
}
// const _pixelRatio = window.screen.width / screen.height;


class WebGL {
  gl: WebGLRenderingContext; // webGL环境

  width: float; // canvas 宽度
  height: float; // canvas 高度
  viewport: Array<float> = [];

  private program: WebGLProgram; // 程序

  private a_Position: GLint; // 顶点指针
  private a_PointSize: GLint; // 点的宽度指针

  private u_FragColor: WebGLUniformLocation; // 画笔颜色指针
  private u_xformMatrix: WebGLUniformLocation; // 基本变换矩阵指针
  private u_ViewMartix: WebGLUniformLocation; //视图变换矩阵指针
  private u_PerspectiveMartix: WebGLUniformLocation; // 投影变换矩阵指针

  vertices: Float32Array; // 顶点数组
  private defaultMartix: Martix4; // 默认变换矩阵 
  xformMatrix: Martix4; // 基本变换矩阵 
  viewMartix: Martix4; // 视图变换矩阵
  perspectiveMartix: Martix4; //投影变换矩阵

  bgc: Color; // 背景色
  starde:int = 0;
  offset:int = 0;
  private pointSize:int = 3;

  config: WebGLConfig = {
    color: '#000',
    pointWidth: 1,
  }

  private store: Array<WebGLConfig> = [this.config];

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
  private _getAttr(name: string): any {
    return name[0] === 'u' ? this.gl.getUniformLocation(this.program, name) : this.gl.getAttribLocation(this.program, name);
  }

  // 初始化着色器相关
  private _init(VSHADER: Glsl, FSHADER: Glsl): void {
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
    this.u_ViewMartix = this._getAttr('u_ViewMartix'); // 视图变换矩阵
    this.u_PerspectiveMartix = this._getAttr('u_PerspectiveMartix'); // 投影变换矩阵

    // 设置顶点buffer
    const vertexBuffer = gl.createBuffer(); //创建
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); //绑定
    gl.enableVertexAttribArray(this.a_Position); //使用

    // 默认变换矩阵
    const def = Martix4.default();
    this.defaultMartix = def;
    // this.defaultMartix = def.scaling(this.height / this.width, this.width / this.height, 1);
    // this.defaultMartix = def.scaling(1 / this.width, 1 / this.height, 1);

    // 设置默认变换矩阵
    this.setXFormMatrix(def);
    // 设置默认视图变换矩阵
    this.setViewMartix(def);
    // 设置默认投影变换矩阵
    this.setPerspectiveMartix(def.scaling(1, this.width / this.height, 1));
  }

  /**
   * @description 设置背景色
   * @param color 
   */
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

  /**
   * @description 清空画布
   */
  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  /**
   * @description 设置顶点数组
   * @param vertices 顶点数据
   * @param size 一个点所用数组值的个数
   * @param strade 间距
   * @param offset 偏移
   */
  setVertices(vertices: Float32List, size: int = 2, strade: int = 0, offset: int = 0): void {
    this.vertices = vertices instanceof Float32Array ? vertices : new Float32Array(vertices);
    this.pointSize = size;
    this.starde = strade;
    this.offset = offset;
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW); // 写入
    this.gl.vertexAttribPointer(this.a_Position, this.pointSize, this.gl.FLOAT, false, strade, offset); //分配
  }

  /**
   * @description 设置画笔颜色
   * @param color 
   */
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
      this.config.color = res;
      this.gl.uniform4f(this.u_FragColor, res.r / 255, res.g / 255, res.b / 255, res.a);
    } else {
      throw Error('color is not valid')
    }
  }

  /**
   * @description 设置点宽
   * @param width 
   */
  setPointWidth(width: float) {
    if (width >= 0) {
      this.config.pointWidth = width;
      this.gl.vertexAttrib1f(this.a_PointSize, width);
    } else {
      throw new Error('width is not valid');
    }
  }

  /**
   * @description 设置基本变换矩阵
   * @param martix 
   */
  setXFormMatrix(martix: Martix4 | Float32Array ) {
    martix = martix instanceof Martix4 ? martix : Martix4.init(martix);
    this.xformMatrix = martix.multiX(this.defaultMartix);
    this.gl.uniformMatrix4fv(this.u_xformMatrix, false, this.xformMatrix.data);
  }

  /**
   * @description 设置视图变换矩阵
   * @param martix 
   */
  setViewMartix(martix: Martix4 | Float32Array ) {
    this.viewMartix = martix instanceof Martix4 ? martix : Martix4.init(martix);
    this.gl.uniformMatrix4fv(this.u_ViewMartix, false, this.viewMartix.data);
  }

  /**
   * @description 设置投影变换矩阵
   * @param martix 
   */
  setPerspectiveMartix(martix: Martix4 | Float32Array ) {
    this.perspectiveMartix = martix instanceof Martix4 ? martix : Martix4.init(martix);
    this.gl.uniformMatrix4fv(this.u_PerspectiveMartix, false, this.perspectiveMartix.data);
  }

  /**
   * @description 暂存配置到栈 
   */
  save() {
    const last = this.store[this.store.length - 1];
    if (last !== this.config) {
      this.store.push(this.config);
    }
  }

  /**
   * @description 从配置栈加载配置
   */
  pop() {
    if (this.store.length > 1) {
      this.config = this.store.pop();
    }
  }

  /**
   * @description canvas坐标 转换到 webgl坐标
   * @param v 
   */
  real(v: float) {
    return v / this.width * 2;
  }

  /**
   * @description 基本画图函数
   * @param mode 画图模式 POINTS | LINES | LINE_STRIP | LINE_LOOP | TRIANGLES | TRIANGEL_STRIP | TRIANGLE_FAN
   * @param first 起始位置
   * @param count 数量
   */
  draw(mode: number, first: int = 0, count?: int) {
    const gl = this.gl;
    count = count ? count : this.vertices.length / this.pointSize;
    gl.drawArrays(mode, first, Math.floor(count));
  }

  /**
   * @description 绘画路径
   * @param path 保存顶点数据 画图步骤
   */
  drawPath(path: GLPath) {
    const vertices = path.vertices.map((v) => {
      return v / this.width;
    });
    this.setVertices(vertices, 3);
    path.steps.forEach(v => {
      if (v.xformMartix) {
        this.setXFormMatrix(v.xformMartix);
      }
      if (v.color) {
        this.setColor(v.color);
      }
      if (v.pointWidth) {
        this.setPointWidth(v.pointWidth);
      }
      this.draw(v.mode, v.first, v.count);
    })
  }

  /**
   * @description 画点
   * @vertices 点数组
   * @pointSize 一个点使用的值的数量
   * 已废弃
   */
  drawPoints(vertices: Float32List, pointSize: int = 2, first:int = 0, strade:int = 0, offset:int = 0) {
    vertices = vertices instanceof Float32Array ? vertices : new Float32Array(vertices);
    this.setVertices(vertices, pointSize, strade, offset);
    this.draw(this.gl.POINTS, first, vertices.length / pointSize);
  }

  /**
   * @description 画线 
   * 已废弃
   */
  drawLine(x1: float, y1: float, x2: float, y2: float, z1: float = 0, z2: float = 0) {
    const _x1 = this.real(x1),
      _x2 = this.real(x2),
      _y1 = this.real(y1),
      _y2 = this.real(y2),
      diffX = _x1 - _x2,
      diffY = _y1 - _y2,
      lineWidth = this.config.pointWidth,
      lineWidthX = this.real(lineWidth),
      lineWidthY = this.real(lineWidth);
    let x11 = _x1,
      x12 = _x1,
      y11 = _y1,
      y12 = _y1,
      x21 = _x2,
      x22 = _x2,
      y21 = _y2,
      y22 = _y2;
    if (diffX === 0 && diffY === 0) {
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
    this.setVertices(vertices, 3, 0, 0);
    this.draw(this.gl.TRIANGLE_STRIP, 0, 4);
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
