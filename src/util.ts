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

export const martixMulti = (a: Float32Array, b: Float32Array, ) => {

}

export class Martix {
  data: Float32Array;
  row: int;
  col: int;

  static multi(a: Martix, b: Martix):Martix{
    if (a.col !== b.row) {
      throw new Error('Two matrices cannot be multiplied');
    }
  }

  constructor(data: Float32List, row: int, col: int = null) {
    if (Array.isArray(data)) {
      data = new Float32Array(data);
    }
    const length = data.length;
    col = col ? col : Math.ceil(length / row);
    const len = row * col;
    if (len > length) {
      const mat = new Float32Array(len);
      mat.set(data, 0);
      data = mat;
    } else if (len < length) {
      const mat = new Float32Array(len);
      data = mat.map((v, i) => data[i]);
    }
    this.data = data;
    this.row = row;
    this.col = col;
  }

  getRow(row: int) {
    const start = row * this.col;
    return this.data.slice(start, start + this.col);
  }

  getCol(col: int) {
    const arr = [];
    return this.data.filter((v, index) => {
      return index % this.col == col;
    })
  }
}

export class Martix4 {
  martix: Float32Array;
  _x: float = 0;
  _y: float = 0;
  _z: float = 0;
  _angle: float = 0;
  _rate = {
    x: 1,
    y: 1,
    z: 1,
  }
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
    this.martix = Martix4.default()
    if (martix instanceof Float32Array) {
      let len = martix.length;
      martix = len <= 12 ? martix : martix.slice(0, 12);
      this.martix.set(martix, 0);
    }
  }
  /**
   * 
   * @description 添加平移变换
   * @param x 
   * @param y 
   * @param z 
   */
  translate(x: float = 0, y: float = 0, z: float = 0) {
    const martix = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1,
    ])
    // this.martix = ;
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
  scaling(rateX: float = 1, rateY: float = 1, rateZ: float = 1) {
    const matrix = new Float32Array([
      rateX, 0, 0, 0,
      0, rateY, 0, 0,
      0, 0, rateZ, 0,
      0, 0, 0, 1,
    ]);
  }

  update() {
    const x = this._x,
          y = this._y,
          z = this._z,
          sinB = sin(angle2radian(this._angle)),
          cosB = cos(angle2radian(this._angle)),
          // rate = this._rate;
          rate = 1;

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
