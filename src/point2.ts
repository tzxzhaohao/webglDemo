import './style.css'
import vertext from './glsl/point2/vertext.glsl?raw'
import fragment from './glsl/point2/fragment.glsl?raw'
import { resizeCanvasToDisplaySize, initWebgl } from './utils/webglUtil'

const canvas = document.createElement('canvas') as HTMLCanvasElement
const gl = canvas.getContext('webgl')!
const app = document.getElementById('app') as HTMLDivElement
app.appendChild(canvas)
const program = initWebgl(gl, vertext, fragment)!
// 使用webgl绘制一个点
const a_position = gl.getAttribLocation(program, 'a_position')
resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

const a_size = gl.getAttribLocation(program, 'a_size')

const u_time = gl.getUniformLocation(program, 'u_time')
/* const u_time2 = gl.getUniformLocation(program, 'u_time2') */
// 更改数据的传递方式

const count = 100
const positonDataArray = new Float32Array(count * 3)
const size = positonDataArray.BYTES_PER_ELEMENT
for (let i = 0; i < count; i++) {
  positonDataArray[i * 3] = Math.random() * 2 - 1
  positonDataArray[i * 3 + 1] = Math.random() * 2 - 1
  positonDataArray[i * 3 + 2] = Math.random() * 10
}

const buffferData = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffferData)
gl.bufferData(gl.ARRAY_BUFFER, positonDataArray, gl.STATIC_DRAW)

gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, size * 3, size * 0)
gl.enableVertexAttribArray(a_position)

gl.vertexAttribPointer(a_size, 1, gl.FLOAT, false, size * 3, size * 2)
gl.enableVertexAttribArray(a_size)

gl.uniform1f(u_time, 0)

const draw = () => {
  gl.clearColor(0.5, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.drawArrays(gl.LINE_STRIP, 0, count)
}

window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  draw()
})

const tick = (time: number) => {
  gl.uniform1f(u_time, time / 1000)
  draw()
  requestAnimationFrame(tick)
}
requestAnimationFrame(tick)
