// 一个属性变量，将会从缓冲中获取数据
  attribute vec4 a_position;
  varying vec4 v_position;
  uniform vec2 u_resolution;


  // 所有着色器都有一个main方法
  void main() {
    // gl_Position 是一个顶点着色器主要设置的变量
    // 矩阵先缩放 再位移 然后翻转x轴
    mat3 truncF =  mat3(2.0/u_resolution.x,0.0 ,0.0,0.0,-2.0/u_resolution.y,0.0,-1.0,1.0,1.0);

    // mat3 truncF =  mat3(2.0/u_resolution.x,0.0,-1.0,0.0,2.0/u_resolution.y,-1.0,0.0,0.0,1.0);
    vec3 position = truncF * vec3(a_position.xy,1.0);
    
    gl_Position  = vec4(position,1.0);
    gl_PointSize = 30.0;

  }