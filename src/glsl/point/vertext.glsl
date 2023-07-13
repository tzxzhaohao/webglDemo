// 一个属性变量，将会从缓冲中获取数据
  attribute vec4 a_position;
  uniform float u_size;
  varying vec4 v_position;
  uniform float u_time;
  // 所有着色器都有一个main方法
  void main() {
    // gl_Position 是一个顶点着色器主要设置的变量
    gl_Position = a_position;
    gl_PointSize =  u_size;
    v_position = a_position;

  }