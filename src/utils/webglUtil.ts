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
    console.log(`宽：${canvas.width}px,高：${canvas.height}px`)
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

export const getReactArrayData = () => {
  // 再canvas随意出一个点 x,y
  const x = Math.random() * 2
  const y = Math.random() * 2
  const width = (2 - x) * Math.random()
  const height = width
  const arr = new Float32Array(6 * 2)
  arr[0] = x - 1
  arr[1] = y - 1
  arr[2] = x - 1
  arr[3] = y + height - 1
  arr[4] = x + width - 1
  arr[5] = y - 1
  arr[6] = x + width - 1
  arr[7] = y - 1
  arr[8] = x - 1
  arr[9] = y + height - 1
  arr[10] = x + width - 1
  arr[11] = y + height - 1
  return {
    arr,
    width,
  }
}

export const createImage = (src: string) => {
  const image = document.createElement('img') as HTMLImageElement
  image.src = src
  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve(image)
    }
    image.onerror = (e) => {
      reject(e)
    }
  })
}

export const createTexture = (
  gl: WebGLRenderingContext,
  image: HTMLImageElement,
  type: number,
  u_texture: WebGLUniformLocation
) => {
  var texture = gl.createTexture()
  // 翻转Y轴
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
  gl.activeTexture(type)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  // Set the parameters so we can render any size image.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  // Upload the image into the texture.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
  gl.uniform1i(u_texture, type)
}

export const createBuffer = (
  gl: WebGLRenderingContext,
  floatArr: Float32Array,
  attribute: number
) => {
  const texCoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, floatArr, gl.STATIC_DRAW)
  gl.enableVertexAttribArray(attribute)
}
