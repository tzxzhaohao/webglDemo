precision mediump float;
varying vec2 v_uv;
uniform float u_time;
uniform mat4 u_transform;
float plot(vec2 st) {    
    return smoothstep(0.02, 0.0, abs(st.y - st.x));
}
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
  vec4 n_uv = u_transform * vec4(v_uv,0,1);
  vec2 c_uv = vec2(n_uv.x,n_uv.y);

  float color =  step( 0.1,distance(c_uv,vec2(0.5)) )   ;
  gl_FragColor = vec4(color,color,color,1);


}

