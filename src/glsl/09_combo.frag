
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
  //gl_FragColor = vec4(1,0,0,1);  // XXX fix me
  vec2 bumpCoords = vec2(normalMapTexCoord.x * 6, normalMapTexCoord.y * 2);
  vec3 bumpNormal = (2 * texture(normalMap, bumpCoords).xyz) - 1;

  mat3 M = mat3(c0, c1, c2);
  vec3 eyeDirNorm = normalize(eyeDirection);
  vec3 reflectedLocal = reflect(eyeDirNorm, bumpNormal);
  vec3 reflectedWorld = M * reflectedLocal;
  vec3 reflectedObject = objectToWorld * reflectedWorld;

  vec4 bumpReflection = texture(envmap, -reflectedObject);

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

  vec3 lightDirNorm = normalize(lightDirection);
  float diffuseMax = max(dot(lightDirNorm, bumpNormal), 0);
  vec4 bumpDiffAmbient = (LMa * textureColor) + (LMd * textureColor * diffuseMax);
  //vec4 bumpDiffAmbient = (LMa) + (LMd * diffuseMax);

  vec3 halfAngleNorm = normalize(halfAngle);
  float specMax = max(dot(halfAngleNorm, bumpNormal), 0);
  vec4 bumpSpecular = (LMs * textureColor * pow(specMax, shininess));
  //vec4 bumpSpecular = (LMs * pow(specMax, shininess));

  gl_FragColor = 0.5 * bumpDiffAmbient + 0.5 * bumpSpecular + 0.6 * bumpReflection; 
}
