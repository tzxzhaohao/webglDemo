import './style.css'
import vertext from './glsl/page1/vertext.glsl?raw'
import fragment from './glsl/page1/fragment.glsl?raw'
import { resizeCanvasToDisplaySize, initWebgl } from './utils/webglUtil'

const canvas = document.createElement('canvas') as HTMLCanvasElement
const gl = canvas.getContext('webgl')!
const app = document.getElementById('app') as HTMLDivElement
app.appendChild(canvas)
const program = initWebgl(gl, vertext, fragment)!

// 使用webgl绘制一个点
const a_position = gl.getAttribLocation(program, 'a_position')
gl.vertexAttrib2f(a_position, 0.5, 0.5)
// Tell WebGL how to convert from clip space to pixels
resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

const draw = () => {
  gl.clearColor(0.5, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, 1)
}
draw()

window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  draw()
})
