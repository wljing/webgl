var initProgram = (gl, VSHADER, FSHADER) => { 
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
  } catch(e) {
    console.log(e);
    result = false;
  }
  return result;
}