import { str2rgb } from './util';
import { Martix4 } from './martix';
import { Camera } from './camera';

const VSHADER_SRC = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  attribute vec4 a_Color;

  uniform mat4 u_xformMatrix;
  uniform mat4 u_ViewMartix;
  uniform mat4 u_PerspectiveMartix;
  
  varying vec4 v_Color;
  
  void main() {
    gl_Position = u_PerspectiveMartix * u_ViewMartix * u_xformMatrix * a_Position;
    gl_PointSize = a_PointSize;
    v_Color = a_Color;
  }
`
const FSHADER_SRC = `
  precision mediump float;
  varying vec4 v_Color;
  void main() {
    gl_FragColor = v_Color;
  }
`

class WebGL {
  gl: WebGLRenderingContext; // webGL环境

  width: float; // canvas 宽度
  height: float; // canvas 高度
  viewport: Array<float> = [];

  private program: WebGLProgram; // glsl程序

  private a_Position: GLint; // 顶点指针
  private a_PointSize: GLint; // 点的宽度指针
  private a_Color: GLint; // 画笔颜色指针

  private u_xformMatrix: WebGLUniformLocation; // 模型变换矩阵指针
  private u_ViewMartix: WebGLUniformLocation; //视图变换矩阵指针
  private u_PerspectiveMartix: WebGLUniformLocation; // 投影变换矩阵指针

  vertices: Float32Array; // 顶点数组
  xformMatrix: Martix4; // 模型变换矩阵
  viewMartix: Martix4; // 视图变换矩阵
  perspectiveMartix: Martix4; //投影变换矩阵

  bgc: Color; // 背景色
  
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

  // 初始化
  private _init(VSHADER: GLSL, FSHADER: GLSL): void {
    const gl = this.gl;
    // 创建着色器
    const vshader = gl.createShader(gl.VERTEX_SHADER); // vertex_shader
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

    // 读取着色器变量地址
    this.a_Position = this._getAttr('a_Position') // 顶点
    this.a_PointSize = this._getAttr('a_PointSize'); // 点的宽度
    this.a_Color = this._getAttr('a_Color'); // 点的颜色
    this.u_xformMatrix = this._getAttr('u_xformMatrix'); // 模型变换矩阵
    this.u_ViewMartix = this._getAttr('u_ViewMartix'); // 视图变换矩阵
    this.u_PerspectiveMartix = this._getAttr('u_PerspectiveMartix'); // 投影变换矩阵

    // 设置顶点buffer
    const vertexBuffer = gl.createBuffer(); // 顶点缓存
    const indexBuffer = gl.createBuffer(); // 索引缓存
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // 绑定
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer); // 绑定
    
    gl.enableVertexAttribArray(this.a_Position); // 启用
    gl.enableVertexAttribArray(this.a_Color);

    // 默认变换矩阵 
    const def = Martix4.default();

    // 设置模型变换矩阵
    this.setXFormMatrix(def);
    // 设置视图变换矩阵
    this.setViewMartix(def);
    // 设置投影变换矩阵
    this.setPerspectiveMartix(def);
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
   * @param pointSize 一个点所用数组值的个数
   * @param colorSize 一个点所用数组值的个数
   * @param strade 间距
   * @param offset 偏移
   */
  setVertices(vertices: Float32List, pointSize: int = 3, colorSize: int = 3, strade: int = 0, offset: int = 0): void {
    this.vertices = vertices instanceof Float32Array ? vertices : new Float32Array(vertices);
    const byteSize = this.vertices.BYTES_PER_ELEMENT;
    strade = strade + pointSize + colorSize;
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW); // 写入
    this.gl.vertexAttribPointer(this.a_Position, pointSize, this.gl.FLOAT, false, strade * byteSize, offset * byteSize); //分配顶点
    this.gl.vertexAttribPointer(this.a_Color, colorSize, this.gl.FLOAT, false, strade * byteSize, pointSize * byteSize); // 分配颜色
  }

  /**
   * @description 设置索引数组
   */
  setIndeces(indeces: Uint8Array) {
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indeces, this.gl.STATIC_DRAW);
  }

  /**
   * @description 设置点宽
   * @param width 
   */
  setPointWidth(width: float) {
    if (width >= 0) {
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
    this.xformMatrix = martix instanceof Martix4 ? martix : Martix4.init(martix);
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

  setCamera(camera: Camera) {
    camera.bind(this);
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
