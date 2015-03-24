
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
  vec4 textureColor;
  if (normalMapTexCoord.y > 0.5)
  {
  	vec2 textureCoords = vec2(normalMapTexCoord.x * 6, normalMapTexCoord.y * -2);
  	textureColor = texture(decal, textureCoords);
  }
  else if (normalMapTexCoord.y <= 0.5)
  {
  	vec2 textureCoords = vec2(normalMapTexCoord.x * -6, normalMapTexCoord.y * 2);
  	textureColor = texture(decal, textureCoords);
  }
  vec2 bumpCoords = vec2(normalMapTexCoord.x * 6, normalMapTexCoord.y * 2);
  vec3 bumpNormal = (2 * texture(normalMap, bumpCoords).xyz) - 1;

  vec3 lightDirNorm = normalize(lightDirection);
  float diffuseMax = max(dot(lightDirNorm, bumpNormal), 0);
  vec3 halfAngleNorm = normalize(halfAngle);
  float specMax = max(dot(halfAngleNorm, bumpNormal), 0);
  if (diffuseMax == 0)
  {
    specMax = 0.0;
  }

  gl_FragColor = (LMa) + (LMd * textureColor * diffuseMax) + (LMs * textureColor * pow(specMax, shininess));
  gl_FragColor = clamp(gl_FragColor, 0.0, 1.0);
}
