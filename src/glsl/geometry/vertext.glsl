// 一个属性变量，将会从缓冲中获取数据
  attribute vec3 a_position;
  attribute vec3 a_color;
  // 平移操作
  uniform mat4 u_transform;
  // 旋转操作
  uniform mat4 u_rotate;
  // 缩放操作
  uniform mat4 u_scale; 

  varying vec3 v_color;

  // 所有着色器都有一个main方法
  void main() {
    // gl_Position 是一个顶点着色器主要设置的变量
    vec4 t_position = u_transform * vec4(a_position,1);
    vec4 u_position = u_rotate * t_position;
    gl_Position = u_scale * u_position;
    gl_PointSize = 10.0;
    v_color = a_color;
  
  } 