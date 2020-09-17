const el = document.querySelector('#webgl');
const gl = el.getContext('webgl');
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

const VSHADER_SRC = `
  void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
  }
`
const FSHADER_SRC = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`
initProgram(gl, VSHADER_SRC, FSHADER_SRC);

gl.drawArrays(gl.POINTS, 0, 1);