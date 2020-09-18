import WebGL from './lib';
import { str2rgb } from './util';

const gl = new WebGL('#webgl');
gl.setBgColor('#000');
gl.setPointWidth(10);

requestAnimationFrame(() => {
  gl.clear();
  gl.setVertices(new Float32Array([0.0, 0.0, .5, -.5, -.5, -.5]));
  gl.draw(gl.POINTS, 2);
  gl.setColor('#a00');
  gl.setTranslateMartix(new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    .1, .1, 0, 1,
  ]))
})

gl.draw(gl.TRIANGLES, 2);









