import './type';
const { sin, cos } = Math;


export const str2rgb = (str: string): Rgba | boolean => {
  let result: any = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  };
  try {
    str = str[0] === '#' ? str.slice(1) : str;
    const len = str.length;
    if (len === 3) {
      result.r = Number(`0x${str[0]}${str[0]}`)
      result.g = Number(`0x${str[1]}${str[1]}`)
      result.b = Number(`0x${str[2]}${str[2]}`)
    } else if (len === 6) {
      result.r = Number(`0x${str[0]}${str[1]}`)
      result.g = Number(`0x${str[2]}${str[3]}`)
      result.b = Number(`0x${str[4]}${str[5]}`)
    } else {
      throw new Error('str is not valid');
    }
  } catch (e) {
    result = false;
  }
  return result;
}

export const angle2radian = (angle: float) => angle / 180 * Math.PI;

export const radian2angle = (radian: float) => radian * 180 / Math.PI;

export const Martix4 = class Martix4 {
  martix: Float32Array;
  _x: float = 0;
  _y: float = 0;
  _z: float = 0;
  _angle: float = 0;
  _rate: float = 1;
  static default() {
    return new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }
  static multi(a: Martix4, b: Martix4) {

  }
  constructor(martix: Float32Array = null) {
    this.martix = martix || Martix4.default();
  }
  /**
   * 
   * @description 添加平移变换
   * @param x 
   * @param y 
   * @param z 
   */
  translate(x: float = 0, y: float = 0, z: float = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
    this.update();
  }

  /**
   * @description 添加旋转变换
   * @param angle 旋转的角度
   */
  rotate(angle: float = 0) {
    this._angle = angle;
    this.update();
  }

  /**
   * @description 添加缩放变换
   * @param rate 缩放比例
   */
  scaling(rate: float) {
    this._rate = rate;
    this.update();
  }

  update() {
    const x = this._x,
          y = this._y,
          z = this._z,
          sinB = sin(angle2radian(this._angle)),
          cosB = cos(angle2radian(this._angle)),
          rate = this._rate;

    this.martix = new Float32Array([
      cosB * rate,  sinB * rate, 0, 0,
      -sinB * rate, cosB * rate, 0, 0,
      0, 0, rate, 0,
      x, y, z, 1,
    ])
    console.log(sinB, cosB);
    console.log(this.martix);
  }
};
