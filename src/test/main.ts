import '@/style.css'
import vertext from '@/glsl/坐标转换/vertext.glsl?raw'
import fragment from '@/glsl/坐标转换/fragment.glsl?raw'
import { resizeCanvasToDisplaySize, initWebgl, createBuffer } from '@/utils/webglUtil'
import { mat3,vec3 } from 'gl-matrix'

const canvas = document.createElement('canvas') as HTMLCanvasElement
const gl = canvas.getContext('webgl')!

const app = document.getElementById('app') as HTMLDivElement
app.appendChild(canvas)
const program = initWebgl(gl, vertext, fragment)!
// 使用webgl绘制一个点
const a_position = gl.getAttribLocation(program, 'a_position')
// Tell WebGL how to convert from clip space to pixels
resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
const u_resolution =  gl.getUniformLocation(program, 'u_resolution')
gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height)
const w = gl.canvas.width
const h = gl.canvas.height


const draw = () => {


  const bufferData = new Float32Array([300.0, 453.9,200.4,780.7,200.3,207.0])




  createBuffer(gl, bufferData, a_position)
  gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0)
 
  gl.drawArrays(gl.TRIANGLES,0,3)
 
}
draw()
window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  draw()
})
