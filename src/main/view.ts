import '@/style.css'
import vertext from '@/glsl/view/vertext.glsl?raw'
import fragment from '@/glsl/view/fragment.glsl?raw'
import {
  resizeCanvasToDisplaySize,
  initWebgl,
  createBuffer,
} from '@/utils/webglUtil'
import { mat4 } from 'gl-matrix'
import * as dat from 'dat.gui'
const canvas = document.createElement('canvas') as HTMLCanvasElement
const gl = canvas.getContext('webgl')!
const app = document.getElementById('app') as HTMLDivElement
app.appendChild(canvas)
const program = initWebgl(gl, vertext, fragment)!
// 使用webgl绘制一个点

resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

// 定义位置信息
const a_position = gl.getAttribLocation(program, 'a_position')
const positionArr = new Float32Array([
  -0.5,-0.5,-0.5, 1,0,0,  
  0.5,-0.5,-0.5, 1,0,0,
  0.0,0.5,-0.5, 1,0,0, // 最后面的三角形 颜色红色
   -0.5,0.5,0,0,1,0, // 中间的三角形 颜色绿色
   0.5,0.5,0,0,1,0,
   0,-0.5,0,0,1,0,
   -0.5,-0.5,0.5, 0,0,1,  
  0.5,-0.5,0.5, 0,0,1,
  0.0,0.5,0.5, 0,0,1, // 最前面的三角形 颜色蓝色
])

const size = positionArr.BYTES_PER_ELEMENT

createBuffer(gl, positionArr, a_position)
gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, size * 6, 0)

// 定义颜色信息
const a_color = gl.getAttribLocation(program, 'a_color')
/* const colosArr = new Float32Array(colorArr) */
createBuffer(gl, positionArr, a_color)
gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, size * 6, size * 3)

// 获取viewMatraix 视图矩阵
const u_viewMatrix = gl.getUniformLocation(program, 'u_viewMatrix')

const viewMatrix = mat4.create()


const obj = {
  x:0,
  y:0,
  z:0.5,
  upX:0,
  upY:1,
  upZ:0
}
const gui = new dat.GUI()



gui
  .add(obj, 'x', -2, 2, 0.01)
  .name('位置：x')
  .onChange((e) => {
    changeView()
    draw()
  })
  gui.add(obj, 'y', -2, 2, 0.01)
  .name('位置：y')
  .onChange((e) => {
    changeView()
    draw()
  })
  gui.add(obj, 'z', -2, 2, 0.01)
  .name('位置：z')
  .onChange((e) => {
    changeView()
    draw()
  })
  gui.add(obj, 'upX', -2, 2, 0.01)
  .name('视角：x')
  .onChange((e) => {
    changeView()
    draw()
  })
  gui.add(obj, 'upY', -2, 2, 0.01)
  .name('视角：y')
  .onChange((e) => {
    changeView()
    draw()
  })
  gui.add(obj, 'upZ', -2, 2, 0.01)
  .name('视角：z')
  .onChange((e) => {
    changeView()
    draw()
  })

const changeView = ()=>{
  mat4.lookAt(viewMatrix, [obj.x, obj.y, obj.z], [0, 0, 0], [obj.upX, obj.upY, obj.upZ])
  gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix)
}
changeView()
gl.enable(gl.DEPTH_TEST)

const draw = () => {
  gl.clearColor(0.5, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.clear(gl.DEPTH_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
}
draw()

/* const tick = (time) => {
  obj.angleY = time / 10
  rotateFun([1, 1, 1], 'angleY')
  draw()
  requestAnimationFrame(tick)
}
requestAnimationFrame(tick) */

window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  draw()
})
