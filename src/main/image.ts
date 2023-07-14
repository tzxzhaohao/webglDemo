import '@/style.css'
import vertext from '@/glsl/image/vertext.glsl?raw'
import fragment from '@/glsl/image/fragment.glsl?raw'
import {
  resizeCanvasToDisplaySize,
  initWebgl,
  getReactArrayData,
  createImage,
  createTexture,
  createBuffer,
} from '@/utils/webglUtil'
/* import grass from '../public/assets/images/grass.png' */
import grass from '/assets/images/floor1.jpg?url'

//
const image: HTMLImageElement = (await createImage(grass)) as HTMLImageElement

const canvas = document.createElement('canvas') as HTMLCanvasElement
const gl = canvas.getContext('webgl')!
const app = document.getElementById('app') as HTMLDivElement
app.appendChild(canvas)
const program = initWebgl(gl, vertext, fragment)!
// 使用webgl绘制一个点
const a_position = gl.getAttribLocation(program, 'a_position')
resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

// 定义位置信息
const { arr, width } = getReactArrayData()
createBuffer(gl, arr, a_position)
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0)

// 找到纹理的地址
var a_uv = gl.getAttribLocation(program, 'a_uv')
// 根据图片的大小定义纹理方式
console.log(gl.canvas.width, width / 2)
const natureWidth = image.naturalWidth
const uv_max = Math.ceil((gl.canvas.width * width * 0.5) / natureWidth)
console.log(uv_max)

const unArr = new Float32Array([
  0.0,
  uv_max,
  0.0,
  0.0,
  uv_max,
  uv_max,
  uv_max,
  uv_max,
  0.0,
  0.0,
  uv_max,
  0.0,
])
createBuffer(gl, unArr, a_uv)
gl.vertexAttribPointer(a_uv, 2, gl.FLOAT, false, 0, 0)

// 处理图片信息
const u_texture = gl.getUniformLocation(program, 'u_texture')!
createTexture(gl, image, gl.TEXTURE0, u_texture)

const draw = () => {
  gl.clearColor(0.5, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6)
}
draw()
window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  draw()
})

/* const tick = (time: number) => {
  gl.uniform1f(u_time, time / 1000)
  draw()
  requestAnimationFrame(tick)
}
requestAnimationFrame(tick) */
