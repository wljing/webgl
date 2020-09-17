// 初始化webgl程序
export const initProgram = (gl, VSHADER, FSHADER) => { 
  let result = true;
  try {
    // 创建着色器
    const vshader = gl.createShader(gl.VERTEX_SHADER); //vertex_shader
    const fshader = gl.createShader(gl.FRAGMENT_SHADER); // fragment_shader
    // 写入着色器
    gl.shaderSource(vshader, VSHADER);
    gl.shaderSource(fshader, FSHADER);
    // 编译着色器
    gl.compileShader(vshader);
    gl.compileShader(fshader);
    // 创建webgl程序
    const program = gl.createProgram();
    // 绑定着色器
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    // 链接程序
    gl.linkProgram(program);
    // 使用程序
    gl.useProgram(program);
    gl.program = program;
  } catch(e) {
    console.log(e);
    result = false;
  }
  return result;
}

// 单击显示随机颜色点
export const bindClickPoint = (el, gl) => {
  const onClickHandle = (() => {
    const style = getComputedStyle(el);
    const width = +style.width.split('px')[0] / 2;
    const height = +style.height.split('px')[0] / 2;
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    const points = [];
    return e => {
      const { offsetX: x, offsetY: y } = e;
      const r = Math.random();
      const g = Math.random();
      const b = Math.random();
      const a = Math.random();
      points.push([( x - width ) / width, ( height - y ) / height, [r, g, b, a]]);    
      gl.clear(gl.COLOR_BUFFER_BIT);
      points.forEach(v => {
        gl.vertexAttrib3f(a_Position, v[0], v[1], 0.0);
        gl.uniform4f(u_FragColor, v[2][0], v[2][1], v[2][2], v[2][3]);
        gl.drawArrays(gl.POINTS, 0, 1);
      })
    }
  })()
  el.addEventListener('click', onClickHandle);
}
