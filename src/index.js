import { Martix4, WebGL, GLPath, angle2radian } from './lib/index';
const { sin, cos } = Math;
const gl = new WebGL();
const width = gl.width, height = gl.height;
let transform = Martix4.init(); // 模型变换矩阵
let view = Martix4.init(); //  视图变换矩阵
gl.setBgColor('#000');
gl.setPointWidth(4);
gl.setColor('#a00');

const path = GLPath.init();
const coorX = GLPath.genLine(0, 100, 0, 0, -100, 0);
const coorY = GLPath.genLine(100, 0, 0, -100, 0, 0);
const coorZ = GLPath.genLine(0, 0, 300000, 0, 0, -300000);
// const line = GLPath.genLine(0, 0, 0, 600, 100, 1000);
path.push(coorX, coorY, coorZ);

const p = 10;
let angle = 45;
function animate() {
  gl.clear();
  view = Martix4.viewTransform(p * sin(angle2radian(angle)), p * cos(angle2radian(angle)), 10, 0, 0, 0, 0, 0, 1);
  gl.setViewMartix(view);
  gl.drawPath(path);
  angle += 1;
  requestAnimationFrame(animate);
}
// requestAnimationFrame(animate);
// view = Martix4.viewTransform(p * sin(angle2radian(angle)), p * cos(angle2radian(angle)) , .5, 0, 0, 0, 0, 0, 1);
view = Martix4.viewTransform(1, 1, 1, 0, 0, 0, 0, 0, 1);
// gl.setViewMartix(view);
gl.clear();
gl.drawPath(path);



