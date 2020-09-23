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
  const xformMatrix = transform.multi(viewMartix);
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
// requestAnimationFrame(animate);
gl.clear();
gl.drawLine(0, 0, 300, 0);
gl.drawLine(0, 0, 0, 300);
// gl.setModelViewMartix(Martix4.viewTransform(10, 10, 10, 0, 0, 0, 45));
// gl.drawLine(0, 0, 300, 0);


