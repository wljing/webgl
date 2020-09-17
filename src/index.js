import { initProgram, bindClickPoint } from "./lib";

const el = document.querySelector('#webgl');
const gl = el.getContext('webgl');
gl.clearColor(0, 0, 0, 1);

const VSHADER_SRC = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`
const FSHADER_SRC = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`
initProgram(gl, VSHADER_SRC, FSHADER_SRC);
gl.clear(gl.COLOR_BUFFER_BIT);

// 创建缓冲区对象
const vertexBuffer = gl.createBuffer();
const vertices = new Float32Array([0.0, .5, -.5, -.5, .5, -.5]);
const n = 3;

// 将缓冲区对象绑定到目标
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// 向缓冲区写入数据
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const a_Position = gl.getAttribLocation(gl.program, 'a_Position');

// 将缓冲区对象分配给a_Position变量
gl.vertexAttribPointer(gl.program, 2, gl.FLOAT, false, 0, 0);

// 连接a_Position变量与分配给它的缓冲区对象
gl.enableVertexAttribArray(a_Position);

gl.drawArrays(gl.POINTS, 0, n);





