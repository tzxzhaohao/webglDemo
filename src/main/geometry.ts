import '@/style.css'
import vertext from '@/glsl/geometry/vertext.glsl?raw'
import fragment from '@/glsl/geometry/fragment.glsl?raw'
import {
  resizeCanvasToDisplaySize,
  initWebgl,
  createBuffer,
} from '@/utils/webglUtil'
import * as dat from 'dat.gui'
import { mat4 } from 'gl-matrix'
import { pointsArr, colorArr } from '@/utils/geometry'
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
const positionArr = new Float32Array(pointsArr)
createBuffer(gl, positionArr, a_position)
gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 0, 0)

// 定义颜色信息
const a_color = gl.getAttribLocation(program, 'a_color')
const colosArr = new Float32Array(colorArr)
createBuffer(gl, colosArr, a_color)
gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 0, 0)

/* const u_resolution = gl.getUniformLocation(program, 'u_resolution')
gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height) */
// 平移操作
const u_transform = gl.getUniformLocation(program, 'u_transform')
const gui = new dat.GUI()
const transform = {
  x: -0.5,
  y: -0.5,
  z: -0.5,
}
const transformMatrix = mat4.create()

const transformFun = () => {
  // 从当前位置到下一位置的偏移量
  /*  mat4.translate(transformMatrix, transformMatrix, [
    transform.x,
    transform.y,
    transform.z,
  ])
  gl.uniformMatrix4fv(u_transform, false, transformMatrix) */
  mat4.fromTranslation(transformMatrix, [transform.x, transform.y, transform.z])
  gl.uniformMatrix4fv(u_transform, false, transformMatrix)
}
transformFun()
gui
  .add(transform, 'x', -1, 1, 0.01)
  .name('位置：x')
  .onChange((e) => {
    transformFun()
    draw()
  })
gui
  .add(transform, 'y', -1, 1, 0.01)
  .name('位置：y')
  .onChange((e) => {
    transformFun()
    draw()
  })
gui
  .add(transform, 'z', -1, 1, 0.01)
  .name('位置：z')
  .onChange((e) => {
    transformFun()
    draw()
  })
// 旋转操作
const u_rotate = gl.getUniformLocation(program, 'u_rotate')
const obj = {
  angleX: 0,
  angleY: 0,
  angleZ: 0,
}

const rotateFun = (arr: any, type: any) => {
  mat4.fromRotation(transformMatrix, (obj[type] / 180) * Math.PI, arr)
  gl.uniformMatrix4fv(u_rotate, false, transformMatrix)
}
rotateFun([0, 0, 1], 'angleZ')
gui
  .add(obj, 'angleZ', 0, 360, 1)
  .name('z轴旋转角度')
  .onChange((e) => {
    rotateFun([0, 0, 1], 'angleZ')
    draw()
  })
gui
  .add(obj, 'angleX', 0, 360, 1)
  .name('x轴旋转角度')
  .onChange((e) => {
    rotateFun([1, 0, 0], 'angleX')
    draw()
  })
gui
  .add(obj, 'angleY', 0, 360, 1)
  .name('y轴旋转角度')
  .onChange((e) => {
    rotateFun([1, 1, 1], 'angleY')
    draw()
  })

// 缩放操作
const u_scale = gl.getUniformLocation(program, 'u_scale')

const scale = {
  x: 0.5,
  y: 0.5,
  z: 0.5,
}
const scaleFunction = () => {
  mat4.fromScaling(transformMatrix, [scale.x, scale.y, scale.z])
  gl.uniformMatrix4fv(u_scale, false, transformMatrix)
}

scaleFunction()

gui
  .add(scale, 'x', 0.1, 10, 0.1)
  .name('缩放倍数x')
  .onChange((e) => {
    scaleFunction()
    draw()
  })
gui
  .add(scale, 'y', 0.1, 10, 0.1)
  .name('缩放倍数y')
  .onChange((e) => {
    scaleFunction()
    draw()
  })

gui
  .add(scale, 'z', 0.1, 10, 0.1)
  .name('缩放倍数z')
  .onChange((e) => {
    scaleFunction()
    draw()
  })
gl.enable(gl.DEPTH_TEST)

const draw = () => {
  gl.clearColor(0.5, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.clear(gl.DEPTH_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 36)
}
draw()

const tick = (time: number) => {
  obj.angleY = time / 10
  rotateFun([1, 1, 1], 'angleY')
  draw()
  requestAnimationFrame(tick)
}
requestAnimationFrame(tick)

window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  draw()
})
