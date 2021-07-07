import { Martix4, WebGL, GLPath, angle2radian, OrthoCamera, Camera } from './lib/index';
const gl = new WebGL();
let transform = Martix4.init(); // 模型变换矩阵

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
let left = -k / gl.width,
    right = k / gl.width,
    top = 1 / gl.width,
    bottom = -1 / gl.width,
    near = -1,
    far = 1;
const camera = new OrthoCamera(left, right, top, bottom, near, far);
camera.setPosition(10, 10, 10);
camera.lookAt(1000, 1000, 1000);
camera.setUp(0, 0, 1);

gl.setBgColor('#000'); // 设置背景颜色
gl.setPointWidth(1); // 设置点宽
gl.setColor('#a00'); // 设置画笔颜色
gl.setCamera(camera);

const path = GLPath.init();
const coorX = GLPath.genLine(100, 0, 0, -100, 0, 0);
const coorY = GLPath.genLine(0, 100, 0, 0, -100, 0);
const coorZ = GLPath.genLine(0, 0, 500, 0, 0, -500);
path.add(coorX, coorY, coorZ);

let step = 0;

function animate() {
  transform = transform.rotateZ(1);
  gl.setXFormMatrix(transform); // 模型变换
  // camera.translate(.001, 0.001);
  gl.setCamera(camera);
  gl.clear();
  gl.drawPath(path);
  requestAnimationFrame(animate);
}
animate();


