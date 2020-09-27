import { Martix4, WebGL, GLPath, angle2radian } from './lib/index';
const { sin, cos } = Math;
const gl = new WebGL();
let transform = Martix4.init(); // 模型矩阵
let view = Martix4.init(); //  视图变换矩阵
gl.setBgColor('#000');
gl.setPointWidth(4);
gl.setColor('#a00');

const path = GLPath.init();
const gap = .01;
const coorX = GLPath.genPointsXY(gap, -.1, 0, .1, 0,);
const coorY = GLPath.genPointsXY(gap, 0, -.1, 0, .1);
const coorZ = GLPath.genPointsXY(gap, 0, 0, 0, 0, -.1, .1);
const zeroPoint = GLPath.genPointsXY(.1, 0, 0, 0, 0,);
path.push(coorX, coorY, coorZ);
path.push(zeroPoint);
gl.drawPath(zeroPoint);

const p = .5;
let angle = 0;
function animate() {
  gl.clear();
  gl.setViewMartix(Martix4.default());
  gl.drawPath(zeroPoint);
  view = Martix4.viewTransform(p * sin(angle2radian(angle)), p * cos(angle2radian(angle)), 0, 0, 0, 0, 0)
  gl.setViewMartix(view);
  gl.drawPath(path);
  angle += 1;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);



