import WebGL from './lib';
import { str2rgb } from './util';

const gl = new WebGL('#webgl');
gl.setBgColor('#000');
gl.setPointWidth(10);
gl.setVertices(new Float32Array([0.0, 0.0, .5, -.5, -.5, -.5]));
gl.setColor('#a00');
let start = 0;
let dir = 1;
const transform = new Float32Array([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  start, start, 0, 1,
]);

function animate() {
  gl.clear();
  gl.rotate(start);
  gl.drawPoint(100, 0);
  start += 0.5;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
// gl.clear();
// gl.rotate();
gl.drawLine(100, 0, 100, 100);
// gl.drawLine(0, 0, 0, 0);
// gl.drawLine(0, 0, -100, 100);













