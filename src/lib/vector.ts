/**
 * @description 向量类
 */

/**
 * @description 向量基类
 */
export class Vector {
  data: Float32Array;
  len: int;
  static init(array: Float32List, len?: int):Vector {
    return new Vector(array, len);
  }
  constructor(array: Float32List, len?: int) {
    array = array instanceof Float32Array ? array : new Float32Array(array);
    this.len = len ? len : array.length
    this.data = array;
  }
  /**
   * @description 向量的模长
   */
  norm(): float {
    let count = 0;
    for(let i = 0; i < this.data.length; i++) {
      count += this.data[i] ** 2;
    }
    return Math.sqrt(count);
  }
  /**
   * @description 生成为单位向量
   */
  toUnit(): Vector {
    const norm = this.norm();
    return Vector.init(this.data.map(v => v / norm));
  }
  /**
   * @description 点乘
   */
  multi(a: Vector): float {
    if (a.len !== this.len) {
      throw new Error('The length of the two vectors must be equal')
    }
    let result = 0;
    this.data.forEach((v, i) => {
      result += v * a.data[i];
    });
    return result;
  }
  /**
   * @description 标量乘法
   * @param num 
   */
  multiScalar(num: float):Vector {
    return new Vector(this.data.map(v => v * num));
  }
  /**
   * @description 向量加法
   */
  add(a: Vector) {
    if (a.len !== this.len) {
      throw new Error('The length of the two vectors must be equal')
    }
    return new Vector(this.data.map((v, i) => {
      return v + a.data[i];
    }))
  }
  /**
   * @description 向量减法
   */
  sub(a: Vector) {
    if (a.len !== this.len) {
      throw new Error('The length of the two vectors must be equal')
    }
    return new Vector(this.data.map((v, i) => {
      return v - a.data[i];
    }))
  }
}

/**
 * @description 三维向量
 */
export class Vector3 extends Vector{
  static init(array: Float32List):Vector3 {
    return new Vector3(array);
  }
  constructor(array: Float32List) {
    super(array.slice(0, 3), 3);
  }
  /**
   * @description 叉乘
   */
  multiX(vector3: Vector3):Vector3 {
    const a = this.data, b = vector3.data;
    const arr = new Float32Array([a[1] * b[2] - b[1] * a[2], a[2] * b[0] - b[2] * a[0], a[0] * b[1] - b[0] * a[1]]);
    return Vector3.init(arr);
  }
  /**
   * @description 生成单位向量
   */
  toUnit():Vector3 {
    return Vector3.init(Vector.init(this.data).toUnit().data);
  }
    /**
   * @description 标量乘法
   * @param num 
   */
  multiScalar(num: float):Vector3 {
    return Vector3.init(Vector.init(this.data).multiScalar(num).data);
  }
  /**
   * @description 向量加法
   */
  add(a: Vector3):Vector3 {
    return Vector3.init(Vector.init(this.data).add(Vector.init(a.data)).data);
  }
  /**
   * @description 向量减法
   */
  sub(a: Vector) {
    return Vector3.init(Vector.init(this.data).sub(Vector.init(a.data)).data);
  }

  get x() {
    return this.data[0];
  }
  set x(value: float) {
    this.data[0] = value;
  }

  get y() {
    return this.data[1];
  }
  set y(value: float) {
    this.data[1] = value;
  }

  get z() {
    return this.data[2];
  }
  set z(value: float) {
    this.data[2] = value;
  }
}