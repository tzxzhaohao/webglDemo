precision mediump float;
varying vec4 v_position;
uniform float u_time;
void main() {
  
  gl_FragColor = vec4(abs(v_position).xy,abs(sin(u_time)),1 );
}

