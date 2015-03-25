uniform vec4 LMa; // Light-Material ambient
uniform vec4 LMd; // Light-Material diffuse
uniform vec4 LMs; // Light-Material specular
uniform float shininess;
uniform float alpha;

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
  gl_FragColor = vec4(1, 0, 0, alpha);
  /* vec3 lightDirNorm = normalize(lightDirection);
  float diffuseMax = max(lightDirNorm.z, 0);

  vec3 halfAngleNorm = normalize(halfAngle);
  float specDot = halfAngleNorm.z;
  specDot = max(0, specDot);
  if (diffuseMax == 0)
  {
    specDot = 0.0;
  }
  
  tempColor = LMa + (LMd * diffuseMax) + (LMs * pow(specDot, shininess));
  if (normalMapTexCoord.y > 0.5)
  {
    tempColor.a = 1;
  }
  else
  {
    tempColor.a = 0.5;
  }
  gl_FragColor = clamp(tempColor, 0.0, 1.0); */
}