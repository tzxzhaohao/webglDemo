precision mediump float;
varying vec4 v_position;
uniform float u_time;
void main() {
  vec2 trans = vec2(1.0,1.0 );
  
  gl_FragColor = vec4(abs(v_position).xy + sin(u_time) * trans, 0.0 ,1.0);
}

