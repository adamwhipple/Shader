
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

  vec3 objectCoords = vec3(x, y, z);
  gl_Position = gl_ModelViewProjectionMatrix * vec4(objectCoords, 1);  // XXX fix me

  vec3 tangentVector = vec3((torusInfo.x + torusInfo.y * cosV) * -sinU, (torusInfo.x + torusInfo.y * cosV) * cosU, 0);
  tangentVector = normalize(tangentVector);

  vec3 gradientVector = vec3( (-torusInfo.y * sinV) * cosU, (-torusInfo.y * sinV) * sinU, torusInfo.y * cosV);
  gradientVector = normalize(gradientVector);

  vec3 surfaceNormal = cross(tangentVector, gradientVector);
  surfaceNormal = normalize(surfaceNormal);

  vec3 biNormal = cross(surfaceNormal, tangentVector);

  mat3 M = mat3(tangentVector, biNormal, surfaceNormal);
  mat3 Minv = transpose(M);

  vec3 surfaceCoords = M * objectCoords;

  eyeDirection = Minv * (eyePosition - surfaceCoords);
  lightDirection = Minv * (lightPosition - surfaceCoords);
  halfAngle = (eyeDirection + lightDirection) / 2.0;  // XXX fix me
  c0 = tangentVector;  // XXX fix me
  c1 = biNormal;  // XXX fix me
  c2 = surfaceNormal;  // XXX fix me
}