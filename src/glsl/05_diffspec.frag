
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
  vec3 lightDirNorm = normalize(lightDirection);
  float diffuseMax = max(lightDirNorm.z, 0);
  vec3 halfAngleNorm = normalize(halfAngle);
  float specularMax = max(halfAngleNorm.z, 0);

  gl_FragColor = LMa + (LMd * diffuseMax);
  // + (LMs * specularMax * pow(dot(halfAngleNorm, eyeDirection), shininess))
}
