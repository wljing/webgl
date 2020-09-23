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

/**
 * @description 角度转弧度
 * @param angle 角度
 */
export const angle2radian = (angle: float) => angle / 180 * Math.PI;

/**
 * @description 弧度转角度
 * @param radian 弧度
 */
export const radian2angle = (radian: float) => radian * 180 / Math.PI;

/**
 * @description 矩阵基类
 */
export class Martix {
  data: Float32Array;
  row: int;
  col: int;

  static multi(a: Martix, b: Martix): Martix {
    if (a.col !== b.row) {
      throw new Error('a.col not equal b.row');
    }
    let result = new Martix([], b.row, b.col);
    result.data = result.data.map((v, i) => {
      const rowIndex = Math.floor(i / b.col), colIndex = i % b.col;
      const rowData = a.getRow(rowIndex), colData = b.getCol(colIndex);
      return rowData.map((v, i) => v * colData[i]).reduce((a, b) => a + b);
    })
    return result;
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
    return this.data.filter((v, index) => {
      return index % this.col == col;
    })
  }

  copy(): Martix {
    return new Martix(this.data.slice(), this.row);
  }

  rank():float {
    return 0;
  }

  transpose(): Martix {
    const arr = new Array(this.col);
    for(let i = 0; i < this.col; i++) {
      arr[i] = [];
    }
    for(let i = 0; i < this.data.length; i++) {
      arr[i % this.row].push(this.data[i]);
    }    
    let newMartixArray: float[] = [];
    arr.forEach(v => {
      newMartixArray = newMartixArray.concat(v);
    })
    this.data = new Float32Array(newMartixArray);
    const t = this.row;
    this.row = this.col;
    this.col = t;
    return this;
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
   * @param angle 摄像机旋转的角度
   */
  static viewTransform(x: float, y: float, z: float, fx: float, fy: float, fz: float, angle: float):Martix4 {
    angle = angle2radian(angle); 
    const rx = new Float32Array([sin(angle), cos(angle) , 0]);
    const ry = new Float32Array([-sin(angle), cos(angle), 0]);
    const rz = new Float32Array([fx - x, fy - y, fz - z]);
    const positionMartix = Martix4.init().translate(-x, -y, -z);
    const viewMartix = Martix4.init();
    viewMartix.data.set(rx, 0);
    viewMartix.data.set(ry, 4);
    viewMartix.data.set(rz, 8);
    console.log(positionMartix);
    console.log(positionMartix.transpose());
    
    console.log(viewMartix);
    console.log();
    
    return positionMartix.multi(viewMartix);; 
  }
  constructor(martix?: Float32List) {
    super(martix || Martix4.default().data, 4, 4);
  }

  /**
   * @description 4 * 4 矩阵乘法
   * @return 新矩阵
   */
  multi(a: Martix4): Martix4 {
    return new Martix4(Martix.multi(a, this).data);
  }
  /**
   * @description 添加平移变换
   * @param x 
   * @param y 
   * @param z 
   */
  translate(x: float = 0, y: float = 0, z: float = 0):Martix4 {
    const martix = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1,
    ]);
    return this.multi(Martix4.init(martix));;
  }

  /**
   * @description 添加旋转变换
   * @param angle 旋转的角度 
   */
  rotate(angle: float = 0): Martix4 {
    const sinB = sin(angle2radian(angle)),
          cosB = cos(angle2radian(angle));
    const martix = new Float32Array([
      cosB, sinB, 0, 0,
      -sinB, cosB, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
    return this.multi(Martix4.init(martix));;
  }

  /**
   * @description 添加缩放变换
   * @param rateX 缩放比例
   * @param rateY 
   * @param rateY 
   */
  scaling(rateX: float = 1, rateY: float = 1, rateZ: float = 1):Martix4 {
    const martix = new Float32Array([
      rateX, 0, 0, 0,
      0, rateY, 0, 0,
      0, 0, rateZ, 0,
      0, 0, 0, 1,
    ]);
    return this.multi(Martix4.init(martix));;
  }
};
