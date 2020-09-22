import WebGL from './lib';
import { Martix4, Matrix } from './util';

const gl = new WebGL();
gl.setBgColor('#000');
gl.setPointWidth(10);
gl.setVertices(new Float32Array([0.0, 0.0, .5, -.5, -.5, -.5]));
gl.setColor('#a00');
let start = 0;
let x = 0;
let y = 0;
const transform = new Martix4();
// transform.translate(0.5, 0.2);

function animate() {
  gl.clear();
  transform.rotate(start += 0.1)
  gl.setXFormMatrix(transform.martix)
  gl.drawLine(-100, 0, 0, 100);
  requestAnimationFrame(animate);
}
// requestAnimationFrame(animate);

// gl.drawLine(0, 0, 0, 0);
gl.drawLine(0, 0, -100, 100);













