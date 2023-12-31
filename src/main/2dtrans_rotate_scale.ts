import '@/style.css'
import vertext from '@/glsl/2d/vertext.glsl?raw'
import fragment from '@/glsl/2d/fragment.glsl?raw'
import {
  resizeCanvasToDisplaySize,
  initWebgl,
  createBuffer,
} from '@/utils/webglUtil'
import * as dat from 'dat.gui'
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
const positionArr = new Float32Array([0, 0.5, -0.5, 0, 0.5, 0])

createBuffer(gl, positionArr, a_position)
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0)

const u_resolution = gl.getUniformLocation(program, 'u_resolution')
gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height)
// 平移操作
const u_transform = gl.getUniformLocation(program, 'u_transform')
const gui = new dat.GUI()
const transform = {
  x: 0,
  y: 0,
}
gl.uniform2f(u_transform, transform.x, transform.y)

gui
  .add(transform, 'x', -1, 1, 0.01)
  .name('位置：x')
  .onChange((e) => {
    gl.uniform2f(u_transform, transform.x, transform.y)
    draw()
  })
gui
  .add(transform, 'y', -1, 1, 0.01)
  .name('位置：y')
  .onChange((e) => {
    gl.uniform2f(u_transform, transform.x, transform.y)
    draw()
  })

// 旋转操作
const u_rotate = gl.getUniformLocation(program, 'u_rotate')
const obj = {
  angle: 0,
  scale: 1,
}
gl.uniform1f(u_rotate, obj.angle)
gui
  .add(obj, 'angle', 0, 360, 1)
  .name('旋转角度')
  .onChange((e) => {
    gl.uniform1f(u_rotate, (obj.angle / 180) * Math.PI)
    draw()
  })

// 缩放操作
const u_scale = gl.getUniformLocation(program, 'u_scale')

gl.uniform1f(u_scale, obj.scale)
gui
  .add(obj, 'scale', 0.1, 10, 0.1)
  .name('缩放倍数')
  .onChange((e) => {
    gl.uniform1f(u_scale, obj.scale)
    draw()
  })

const draw = () => {
  gl.clearColor(0.5, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}
draw()
window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  draw()
})
