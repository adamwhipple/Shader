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
  vec2 bumpCoords;
  vec3 bumpNormal;
  if (normalMapTexCoord.y > 0.5)
  {
    bumpCoords = vec2(normalMapTexCoord.x * 6, normalMapTexCoord.y * -2);
    bumpNormal = (2 * texture(normalMap, bumpCoords).xyz) - 1;
    bumpNormal.x = bumpNormal.x;
    bumpNormal.y = -bumpNormal.y;
    bumpNormal.z = bumpNormal.z;
  }
  else if (normalMapTexCoord.y <= 0.5)
  {
    bumpCoords = vec2(normalMapTexCoord.x * -6, normalMapTexCoord.y * 2);
    bumpNormal = (2 * texture(normalMap, bumpCoords).xyz) - 1;
    bumpNormal.x = -bumpNormal.x;
    bumpNormal.y = bumpNormal.y;
    bumpNormal.z = bumpNormal.z;
  }

  mat3 M = mat3(c0, c1, c2);
  vec3 eyeDirNorm = normalize(eyeDirection);
  vec3 reflectedLocal = reflect(eyeDirNorm, bumpNormal);
  vec3 reflectedWorld = M * reflectedLocal;
  vec3 reflectedObject = objectToWorld * reflectedWorld;

  gl_FragColor = texture(envmap, -reflectedObject);
  gl_FragColor = clamp(gl_FragColor, 0.0, 1.0);
}
