precision mediump float;
varying vec2 v_uv;
uniform float u_time;
void main() {
  // 颜色渐变
  // gl_FragColor = vec4(v_uv.x, v_uv.y, abs(sin(u_time)),1 );

  // 造型函数 从左到右颜色从黑色渐变到白色  rgb颜色值一致的话颜色是白色 - 灰色 - 黑色
  /* vec3 color = vec3(v_uv.x);
  gl_FragColor = vec4(color,1); */

  // 插值函数 step(a, b)  对于小于a的值返回0 大于a的值返回1
/*   float rgb = step(0.5,v_uv.x);
  vec3 color = vec3(rgb);
  gl_FragColor = vec4(color,1); */

  // 插值函数 smoothstep
  float rgb = smoothstep(0.8,0.1,v_uv.x);

  vec3 color = vec3(rgb);
  gl_FragColor = vec4(color,1);


}

