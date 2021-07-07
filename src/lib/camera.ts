/**
 * @description 摄像机类
 */

import { Vector3 } from "./vector";
import './type';
import { Martix4 } from "./martix";
import WebGL from "./webGL";

class Camera {
  xformMartix: Martix4 = Martix4.init();
  viewMartix: Martix4 = Martix4.init();
  perspectMartix: Martix4 = Martix4.init();
  position: Vector3; // 摄像机位置
  look: Vector3; // 摄像机朝向
  up: Vector3; // 摄像机正方向

  setPosition(eyeX: float, eyeY: float, eyeZ: float) {
    this.position = new Vector3([eyeX, eyeY, eyeZ]);
  }

  lookAt(lookX: float, lookY: float, lookZ: float) {
    this.look = new Vector3([lookX, lookY, lookZ]);
  }

  setUp(x: float, y: float, z: float) {
    this.up = new Vector3([x, y, z]);
  }

  updateViewMartix() {
    this.viewMartix = Martix4.viewTransform(this.position.x, this.position.y, this.position.z, this.look.x, this.look.y, this.look.z, this.up.x, this.up.y, this.up.z);
  }

  updateMartix() {
    this.updateViewMartix();
  }

  bind(gl: WebGL) {
  }

  translate(x: number = 0, y: number = 0, z: number = 0) {
    this.xformMartix = this.xformMartix.translate(x, y, z);
  }

  rotateX(angle: number) {
    this.xformMartix.rotateX(angle);
  }

  rotateY(angle: number) {
    this.xformMartix.rotateY(angle);
  }

  rotateZ(angle: number) {
    this.xformMartix.rotateY(angle);
  }

  scaling(rateX: number = 0, rateY: number = 0, rateZ: number = 0) {
    this.xformMartix.scaling(rateX, rateY, rateZ);
  }
}

/**
 * 正交投影摄像机
 */
class OrthoCamera extends Camera {
  left: float;
  right: float;
  top: float;
  bottom: float;
  near: float;
  far: float;

  constructor(left: float, right: float, top: float, bottom: float, near: float, far: float) {
    super();
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.near = near;
    this.far = far;
  }

  updatePerspectMartix() {
    const { left, right, top, bottom, near, far } = this;
    this.perspectMartix = Martix4.orthoTransform(left, right, top, bottom, near, far);

  }

  updateMartix() {
    this.updateViewMartix();
    this.updatePerspectMartix();
  }


  bind(gl: WebGL) {
    this.updateMartix();
    gl.setViewMartix(this.viewMartix);
    gl.setPerspectiveMartix(this.perspectMartix.multi(this.xformMartix));
  }
}

/**
 * 透视投影摄像机
 */
class PerspectiveCamera extends Camera {
  fovy: float;
  aspect: float;
  near: float;
  far: float;
  martix: Martix4;

  constructor(fovy: float, aspect: float, near: float, far: float) {
    super();
    this.fovy = fovy;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
  }

  updateMartix() {
    this.updateViewMartix();
    let { fovy, aspect, near, far } = this;
    if (near === far || aspect == 0) {
      throw new Error('null frustum');
    }
    if (near <= 0) {
      throw new Error('near <= 0');
    }
    if (far <= 0) {
      throw new Error('far <= 0');
    }
    fovy = Math.PI * fovy / 180 / 2;
    let s = Math.sin(fovy);
    if (s === 0) {
      throw new Error('null frustum');
    }
    let rd = 1 / (far - near);
    let ct = Math.cos(fovy) / s;
    this.perspectMartix = Martix4.init([
      ct / aspect, 0, 0, 0,
      0, ct, 0, 0,
      0, 0, -(far + near) * rd, -1,
      0, 0, -2 * near * far * rd, 0,
    ]);
  }

  bind(gl: WebGL) {
    this.updateMartix();
    gl.setPerspectiveMartix(this.perspectMartix);
    gl.setViewMartix(this.viewMartix);
  }
}

export {
  OrthoCamera,
  PerspectiveCamera,
  Camera,
}