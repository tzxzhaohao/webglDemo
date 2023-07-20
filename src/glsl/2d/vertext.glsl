// 一个属性变量，将会从缓冲中获取数据
  attribute vec2 a_position;
  // 平移操作
  uniform vec2 u_transform;
  // 旋转操作
  // x2 = x1 * cos(a) - y1 * sin(a)
  // y2 = x1 * cos(a) + y1 * sin(a)
  uniform float u_rotate;
  // 缩放操作
  uniform float u_scale; 

  // 所有着色器都有一个main方法
  void main() {
    // gl_Position 是一个顶点着色器主要设置的变量
    vec2 positon = u_transform + a_position;
    vec2 sPositon = positon;
    sPositon.x =  positon.x * cos(u_rotate) - positon.y * sin(u_rotate);
    sPositon.y =  positon.x * sin(u_rotate) + positon.y * cos(u_rotate);
   
    gl_Position =  vec4(u_scale * sPositon,0,1);
  } 