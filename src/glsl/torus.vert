
attribute vec2 parametric;

uniform vec3 lightPosition;  // Object-space
uniform vec3 eyePosition;    // Object-space
uniform vec2 torusInfo;

varying vec2 normalMapTexCoord;

varying vec3 lightDirection;
varying vec3 halfAngle;
varying vec3 eyeDirection;
varying vec3 c0, c1, c2;

void main()
{
  normalMapTexCoord = vec2(parametric.x, parametric.y);  // XXX fix me
  vec2 angleDeg = normalMapTexCoord * 360;
  vec2 uv = radians(angleDeg);

  float cosU = cos(uv.x);
  float cosV = cos(uv.y);
  float sinU = sin(uv.x);
  float sinV = sin(uv.y);

  float x = (torusInfo.x + torusInfo.y * cosV) * cosU;
  float y = (torusInfo.x + torusInfo.y * cosV) * sinU;
  float z = torusInfo.y * sinV;

  vec3 xyz = vec3(x, y, z);
  gl_Position = gl_ModelViewProjectionMatrix * vec4(xyz, 1);  // XXX fix me
  eyeDirection = vec3(0);  // XXX fix me
  lightDirection = vec3(0);  // XXX fix me
  halfAngle = vec3(0);  // XXX fix me
  c0 = vec3(0);  // XXX fix me
  c1 = vec3(0);  // XXX fix me
  c2 = vec3(0);  // XXX fix me
}