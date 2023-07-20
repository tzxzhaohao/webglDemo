// 一个属性变量，将会从缓冲中获取数据
  attribute vec2 a_position;
  uniform vec2 u_transform;
  // 所有着色器都有一个main方法
  void main() {
    // gl_Position 是一个顶点着色器主要设置的变量
    vec2 positon = u_transform + a_position;
    gl_Position =  vec4(positon,0,1);
  } 