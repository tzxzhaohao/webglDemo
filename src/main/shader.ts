import '@/style.css'
import vertext from '@/glsl/shader/vertext.glsl?raw'
import fragment from '@/glsl/shader/fragment.glsl?raw'
import { resizeCanvasToDisplaySize, initWebgl,createBuffer } from '@/utils/webglUtil'

const canvas = document.createElement('canvas') as HTMLCanvasElement
const gl = canvas.getContext('webgl')!
const app = document.getElementById('app') as HTMLDivElement
app.appendChild(canvas)
const program = initWebgl(gl, vertext, fragment)!

// 使用webgl绘制一个点
const a_position = gl.getAttribLocation(program, 'a_position')

const positionArr = new Float32Array([
  -0.8, -0.8,0,0,
  0.8,-0.8,1,0,
  0.8,0.8,1,1,
  -0.8,0.8,0,1
])
const size = positionArr.BYTES_PER_ELEMENT

createBuffer(gl, positionArr, a_position)
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, size * 4, 0)

const a_uv = gl.getAttribLocation(program, 'a_uv')
createBuffer(gl, positionArr, a_uv)

gl.vertexAttribPointer(a_uv, 2, gl.FLOAT, false, size * 4, size * 2)


gl.vertexAttrib2f(a_position, 0, 0)
// Tell WebGL how to convert from clip space to pixels
resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

const draw = () => {
  gl.clearColor(0.5, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
}
draw()

const u_time = gl.getUniformLocation(program, "u_time")

gl.uniform1f(u_time,0)

const tick = (time:number) => {
  // time为毫秒数
  gl.uniform1f(u_time,time / 1000)
  draw()
  requestAnimationFrame(tick)
}
requestAnimationFrame(tick)





window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  draw()
})
