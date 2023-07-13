import './style.css'
import vertext from './glsl/point/vertext.glsl?raw'
import fragment from './glsl/point/fragment.glsl?raw'
import { resizeCanvasToDisplaySize, initWebgl } from './utils/webglUtil'

const canvas = document.createElement('canvas') as HTMLCanvasElement
const gl = canvas.getContext('webgl')!
const app = document.getElementById('app') as HTMLDivElement
app.appendChild(canvas)
const program = initWebgl(gl, vertext, fragment)!

// 使用webgl绘制一个点
const a_position = gl.getAttribLocation(program, 'a_position')
const u_size = gl.getUniformLocation(program, 'u_size')
const a_color = gl.getAttribLocation(program, 'a_color')
const u_time = gl.getUniformLocation(program, 'u_time')

gl.vertexAttrib4f(a_color, Math.random(), Math.random(), 0, 1)
gl.vertexAttrib2f(a_position, 0.5, 0.5)
gl.uniform1f(u_size, Math.random() * 10)
gl.uniform1f(u_time, 0)
// Tell WebGL how to convert from clip space to pixels
resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
const count = 100
const pointArr = []
const draw = (time = 0.0) => {
  gl.clearColor(0.5, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  if (!pointArr.length) {
    for (let i = 0; i < count; i++) {
      const ranPosition = Math.random() * 2 - 1
      const ranPosition2 = Math.random() * 2 - 1
      const ranSize = Math.random() * 10
      gl.uniform1f(u_time, time)
      gl.vertexAttrib2f(a_position, ranPosition, ranPosition2)
      gl.uniform1f(u_size, ranSize)

      pointArr.push([ranPosition, ranPosition2, ranSize])
      gl.drawArrays(gl.POINTS, 0, 1)
    }
  } else {
    for (let i = 0; i < count; i++) {
      gl.uniform1f(u_time, time)
      gl.vertexAttrib2f(a_position, pointArr[i][0], pointArr[i][1])
      gl.uniform1f(u_size, pointArr[i][2])

      gl.drawArrays(gl.POINTS, 0, 1)
    }
  }
}

const tick = (time: number) => {
  draw(time / 1000)

  requestAnimationFrame(tick)
}
requestAnimationFrame(tick)

window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  draw()
})
