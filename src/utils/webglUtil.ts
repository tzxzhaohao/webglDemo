const createShader = (
  gl: WebGLRenderingContext,
  type: number,
  shaderSource: string
) => {
  const shader = gl.createShader(type)
  if (shader) {
    gl.shaderSource(shader, shaderSource)
    gl.compileShader(shader) // 编译 -> 生成着色器
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success) {
      return shader
    }
    console.warn(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
  }
}

const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) => {
  var program = gl.createProgram()
  if (program) {
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    var success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (success) {
      return program
    }
    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
  }
}

export const resizeCanvasToDisplaySize = (
  canvas: HTMLCanvasElement,
  multiplier = 1
) => {
  const width = (canvas.clientWidth * multiplier) | 0
  const height = (canvas.clientHeight * multiplier) | 0
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    return true
  }
  return false
}

export const initWebgl = (
  gl: WebGLRenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
) => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  )
  if (vertexShader && fragmentShader) {
    const program = createProgram(gl, vertexShader, fragmentShader)
    if (program) {
      gl.useProgram(program)
      return program
    }
  }
}
