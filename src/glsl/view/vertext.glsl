// 一个属性变量，将会从缓冲中获取数据
  attribute vec3 a_position;
  attribute vec3 a_color;
  // 平移操作

  varying vec3 v_color;
  // 定义视图矩阵 MVP 中的view矩阵
  uniform mat4 u_viewMatrix;

  // 所有着色器都有一个main方法
  void main() {
    // gl_Position 是一个顶点着色器主要设置的变量

    gl_Position = u_viewMatrix * vec4(a_position,1.0);
    gl_PointSize = 10.0;
    v_color = a_color;
  } 