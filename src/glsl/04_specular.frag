
uniform vec4 LMa; // Light-Material ambient
uniform vec4 LMd; // Light-Material diffuse
uniform vec4 LMs; // Light-Material specular
uniform float shininess;

uniform sampler2D normalMap;
uniform sampler2D decal;
uniform sampler2D heightField;
uniform samplerCube envmap;

uniform mat3 objectToWorld;

varying vec2 normalMapTexCoord;
varying vec3 lightDirection;
varying vec3 eyeDirection;
varying vec3 halfAngle;
varying vec3 c0, c1, c2;

void main()
{
  vec3 halfAngleNorm = normalize(halfAngle);
  vec3 lightDirNorm = normalize(lightDirection);
  vec3 eyeDirNorm = normalize(eyeDirection);
  float clampMax = max(lightDirNorm.z, 0);
  float specDot = dot(halfAngleNorm, eyeDirNorm);
  specDot = max(0, specDot);
  gl_FragColor = LMs * pow(specDot, shininess);
}
