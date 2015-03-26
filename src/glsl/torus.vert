
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
  normalMapTexCoord = vec2(parametric.x, parametric.y);
  vec2 angleDeg = normalMapTexCoord * 360.0;
  vec2 uv = radians(angleDeg);

  float cosU = cos(uv.x);
  float cosV = cos(uv.y);
  float sinU = sin(uv.x);
  float sinV = sin(uv.y);

  float x = (torusInfo.x + torusInfo.y * cosV) * cosU;
  float y = (torusInfo.x + torusInfo.y * cosV) * sinU;
  float z = torusInfo.y * sinV;

  vec3 surfaceCoords = vec3(x, y, z);
  gl_Position = gl_ModelViewProjectionMatrix * vec4(surfaceCoords, 1);

  vec3 tangentVector = vec3((torusInfo.x + torusInfo.y * cosV) * -sinU, (torusInfo.x + torusInfo.y * cosV) * cosU, 0);
  tangentVector = normalize(tangentVector);

  vec3 gradientVector = vec3( (-torusInfo.y * sinV) * cosU, (-torusInfo.y * sinV) * sinU, torusInfo.y * cosV);
  gradientVector = normalize(gradientVector);

  vec3 surfaceNormal = cross(tangentVector, gradientVector);
  surfaceNormal = normalize(surfaceNormal);

  vec3 biNormal = cross(surfaceNormal, tangentVector);

  mat3 M = mat3(tangentVector, biNormal, surfaceNormal);
  mat3 Minv = transpose(M);

  vec3 objectCoords = M * surfaceCoords;

  eyeDirection = Minv * (eyePosition - objectCoords);
  lightDirection = Minv * (lightPosition - objectCoords);
  halfAngle = (eyeDirection + lightDirection) / 2.0;
  c0 = tangentVector;
  c1 = biNormal;
  c2 = surfaceNormal;
}