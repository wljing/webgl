/**
 * @description 工具方法
 */

/**
 * @description 字符串转数字
 * @param str #000 #efefef
 */
export const str2rgb = (str: string): Rgba | boolean => {
  const result: Rgba = {
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
    return false;
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
 * @description 两点的距离
 */
export const p2p = (x1: float, y1: float, z1: float, x2: float, y2: float = 1, z2: float = 1) => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
}
