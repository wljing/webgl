import { Martix4, WebGL, GLPath, OrthoCamera } from './lib/index';
const gl = new WebGL('#webgl_test');
let transform = Martix4.init(); // 模型变换矩阵

const width = gl.width;
const height = gl.height;
const k = width / height;
let left = -k / gl.width,
  right = k / gl.width,
  top = 1 / gl.width,
  bottom = -1 / gl.width,
  near = -1,
  far = 1;

const camera = new OrthoCamera(-1, 1, 1, -1, -1, 1);
camera.setPosition(1, 1, 1);
camera.lookAt(0, 0, 0);
camera.setUp(0, 0, 1);

gl.setCamera(camera);

gl.setBgColor('#000'); // 设置背景颜色
gl.setPointWidth(10); // 设置点宽
gl.clear();
gl.gl.enable(gl.gl.DEPTH_TEST);

const vertices = [
  -1, 0, 0, 1.0, 0.0, 0.0,
  1, 0, 0, 1.0, 0.0, 0.0,

  0, -1, 0, 1.0, 0.0, 0.0,
  0, 1, 0, 1.0, 0.0, 0.0,

  0, 0, -1, 1.0, 0.0, 0.0,
  0, 0, 1, 1.0, 0.0, 0.0,
];

const cube = [
  0, 0, 0, 1.0, 0.0, 0.0,
  0, .5, 0, 0, 1.0, 0.0,
  .5, 0, 0, 0, 0.0, 1.0,
  .5, .5, 0, 1.0, 0.0, 0.0,

  .5, 0, .5, 0, 1.0, 0.0,
  .5, .5, .5, 0, 0.0, 1.0,
  0, 0, .5, 0, 0.0, 1.0,
  0, .5, .5, 0, 0.0, 1.0,
];

const indeces = new Uint8Array([
  0, 1, 2, 2, 1, 3,    // 下
  3, 2, 4, 4, 3, 5,    // 前
  5, 4, 6, 6, 5, 7,    // 上

  7, 6, 0, 0, 7, 1,    // 后
  0, 2, 4, 0, 4, 6,    // 左
  1, 3, 5, 1, 5, 7,    // 右
]);

document.querySelector('#webgl_test').addEventListener('mousewheel', e => {
  const { deltaY } = e;
  const { x, y, z } = camera.position;
  const step = deltaY > 0 ? .1 : -.1;
  camera.setPosition(x, y, z + step);
  gl.setCamera(camera);
})

let index = 1;

function animate() {
  gl.clear();

  gl.setVertices(vertices);
  gl.gl.drawArrays(gl.gl.LINES, 0, 6);

  gl.setVertices(cube)
  gl.setIndeces(indeces);
  gl.gl.drawElements(gl.gl.TRIANGLES, indeces.length, gl.gl.UNSIGNED_BYTE, 0);

  transform = transform.rotateZ(index);
  gl.setXFormMatrix(transform);

  requestAnimationFrame(animate);
}
animate();


