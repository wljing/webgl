import { angle2radian } from './util';
import { Vector3 } from './vector';

const { sin, cos } = Math;
/**
 * @description 矩阵基类
 */
export class Martix {
  static Martix4: any;
  data: Float32Array;
  row: int;
  col: int;

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

  /**
   * @description 矩阵点乘
   * @param a 
   */
  multi(a: Martix): Martix {
    if (this.col !== a.row || this.row !== a.col) {
      throw new Error('The row and col of two matrices are not equal');
    }
    let result = new Martix([], this.row, a.col);
    result.data = result.data.map((v, i) => {
      const rowIndex = Math.floor(i / a.col), colIndex = i % a.col;
      const rowData = this.getRow(rowIndex), colData = a.getCol(colIndex);
      return rowData.map((v, i) => v * colData[i]).reduce((a, b) => a + b);
    })
    return result;
  }

  /**
   * @description 矩阵叉乘
   * @param a 
   * @param b 
   */
  multiX(a: Martix): Martix {
    if (this.col !== a.row) {
      throw new Error('a.col not equal b.row');
    }
    let result = new Martix([], this.row, a.col);
    result.data = result.data.map((v, i) => {
      const rowIndex = Math.floor(i / a.col), colIndex = i % a.col;
      const rowData = this.getRow(rowIndex), colData = a.getCol(colIndex);
      return rowData.map((v, i) => v * colData[i]).reduce((a, b) => a + b);
    })
    return result;
  }

  /**
    * @description 标量乘法
    * @num 
    */
  multiScalar(num: float) {
    return new Martix(this.data.map(v => v * num), this.row, this.col); 
  }

  getRow(row: int) {
    const start = row * this.col;
    return this.data.slice(start, start + this.col);
  }

  getCol(col: int) {
    return this.data.filter((v, index) => {
      return index % this.col == col;
    })
  }

  copy(): Martix {
    return new Martix(this.data.slice(), this.row);
  }

  rank(): float {
    return 0;
  }

  transpose(): Martix {
    const arr = new Array(this.col);
    for (let i = 0; i < this.col; i++) {
      arr[i] = [];
    }
    for (let i = 0; i < this.data.length; i++) {
      arr[i % this.row].push(this.data[i]);
    }
    let newMartixArray: float[] = [];
    arr.forEach(v => {
      newMartixArray = newMartixArray.concat(v);
    })
    return new Martix(newMartixArray, this.col, this.row);
  }
}

/**
 * @description 4 * 4矩阵
 */
export class Martix4 extends Martix {
  static default() {
    return Martix4.init(new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]));
  }
  static init(array?: Float32List) {
    return new Martix4(array);
  }

  /**
   * @description 设置视图变换矩阵（摄像机）
   * @param x 摄像机x
   * @param y 摄像机y
   * @param z 摄像机z
   * @param fx 摄像机朝向x
   * @param fy 摄像机朝向y
   * @param fz 摄像机朝向z
   * @param upx,upy,upz 正方向
   */
  static viewTransform(x: float, y: float, z: float, fx: float, fy: float, fz: float, upx: float, upy: float, upz: float): Martix4 {
    const up = Vector3.init([upx, upy, upz]); // 正方向
    const eye = Vector3.init([x, y, z]); // 眼睛（摄像机）位置
    const look = Vector3.init([fx, fy, fz]); // 看向的位置
    const f = look.sub(eye);
    const w = f.toUnit();  
    const u = w.multiX(up).toUnit();
    const v = u.multiX(w); 
    
    const viewMartix = Martix4.init();
    viewMartix.data.set([u.data[0], v.data[0], -w.data[0]], 0);
    viewMartix.data.set([u.data[1], v.data[1], -w.data[1]], 4);
    viewMartix.data.set([u.data[2], v.data[2], -w.data[2]], 8);
    return viewMartix;
  }

  constructor(martix?: Float32List) {
    super(martix || Martix4.default().data, 4, 4);
  }

  /**
   * @description 4 * 4 矩阵点乘
   * @return 新矩阵
   */
  multi(a: Martix4): Martix4 {
    return Martix4.init(Martix.prototype.multi.call(this, a).data);
  }

  /**
   * @description 4 * 4 矩阵叉乘
   * @return 新矩阵
   */
  multiX(a: Martix4): Martix4 {
    return Martix4.init(Martix.prototype.multiX.call(this, a).data);
  }

  /**
   * @description 转置
   */
  transpose(): Martix4 {
    return Martix4.init(Martix.prototype.transpose.call(this).data);
  }
  /**
   * @description 添加平移变换
   * @param x 
   * @param y 
   * @param z 
   */
  translate(x: float = 0, y: float = 0, z: float = 0): Martix4 {
    const martix = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0, 
      0, 0, 1, 0,
      x, y, z, 1,
    ]);
    return this.multiX(Martix4.init(martix));;
  }

  /**
   * @description 添加旋转变换 绕X轴 
   * @param angle 旋转的角度 
   */
  rotateZ(angle: float = 0): Martix4 {
    const sinB = sin(angle2radian(angle)),
      cosB = cos(angle2radian(angle));
    const martix = new Float32Array([
      cosB, sinB, 0, 0,
      -sinB, cosB, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
    return this.multiX(Martix4.init(martix));;
  }

  /**
   * @description 添加旋转变换 绕X轴 
   * @param angle 旋转的角度 
   */
  rotateX(angle: float = 0): Martix4 {
    const sinB = sin(angle2radian(angle)),
      cosB = cos(angle2radian(angle));
    const martix = new Float32Array([
      1,  0,    0,    0,
      0, cosB, -sinB, 0,
      0, sinB, cosB, 0,
      0, 0,     0,    1,
    ]);
    return this.multiX(Martix4.init(martix));;
  }

  /**
   * @description 添加旋转变换 绕X轴 
   * @param angle 旋转的角度 
   */
  rotateY(angle: float = 0): Martix4 {
    const sinB = sin(angle2radian(angle)),
      cosB = cos(angle2radian(angle));
    const martix = new Float32Array([
      cosB, 0, -sinB, 0,
      0,    1, 0,     0,
      sinB, 0, cosB,  0,
      0,    0, 0,     1,
    ]);
    return this.multiX(Martix4.init(martix));;
  }

  /**
   * @description 添加缩放变换
   * @param rateX 缩放比例
   * @param rateY 
   * @param rateY 
   */
  scaling(rateX: float = 1, rateY: float = 1, rateZ: float = 1): Martix4 {
    const martix = new Float32Array([
      rateX, 0, 0, 0,
      0, rateY, 0, 0,
      0, 0, rateZ, 0,
      0, 0, 0, 1,
    ]);
    return this.multiX(Martix4.init(martix));;
  }
};