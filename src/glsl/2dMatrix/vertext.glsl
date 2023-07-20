// 一个属性变量，将会从缓冲中获取数据
  attribute vec2 a_position;
  // 平移操作
  uniform mat4 u_transform;
  // 旋转操作
  uniform mat4 u_rotate;
  // 缩放操作
  uniform mat4 u_scale; 

  // 所有着色器都有一个main方法
  void main() {
    // gl_Position 是一个顶点着色器主要设置的变量
    vec4 t_position = u_transform * vec4(a_position,0,1);
    vec4 u_position = u_rotate * t_position;
    gl_Position = u_scale * u_position;
  
  } 