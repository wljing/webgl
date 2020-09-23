import WebGL from './lib';
import {
  Martix4
} from './util';

const gl = new WebGL();
gl.setBgColor('#000');
gl.setPointWidth(10);
gl.setVertices(new Float32Array([0.0, 0.0, .5, -.5, -.5, -.5]));
gl.setColor('#a00');

let transform = Martix4.init();
let view = Martix4.init();
let start = 0;
function animate() {
  const viewMartix = view.rotate(start);
  const xformMatrix = transform.mul(viewMartix);
  gl.clear();
  gl.setXFormMatrix(xformMatrix.rotate(0))
  gl.drawPoint(0, 0);
  gl.drawLine(0, 100, 100, 100);
  gl.setXFormMatrix(xformMatrix.rotate(90))
  gl.drawLine(0, 100, 100, 100);
  gl.setXFormMatrix(xformMatrix.rotate(180))
  gl.drawLine(0, 100, 100, 100);
  gl.setXFormMatrix(xformMatrix.rotate(270))
  gl.drawLine(0, 100, 100, 100);
  start += 15;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
// gl.clear();
// gl.drawLine(10, 10, 20, 10);
// console.log(Martix4.init().rotate(0));
// gl.setXFormMatrix(Martix4.init().rotate(90));
// console.log(gl.xformMatrix);
// gl.drawLine(10, 10, 20, 10);
// gl.setPointWidth(1)
// for(let i = -500; i < 500; i += 2) {
//   gl.drawPoint(i, 0)
// }
// for(let i = -500; i < 500; i += 2) {
//   gl.drawPoint(0, i)
// }
