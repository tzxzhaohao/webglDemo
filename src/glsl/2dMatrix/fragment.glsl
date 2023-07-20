precision mediump float;
uniform vec2 u_resolution;

void main() {
   // gl_FragCoord 内置变量 
  vec2 st = gl_FragCoord.xy/u_resolution;
  gl_FragColor = vec4(st,0.0,1.0);
}

