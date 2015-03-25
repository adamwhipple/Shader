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
  float specularMax = halfAngleNorm.z;
  specularMax = max(0, specularMax);
  if (diffuseMax == 0)
  {
    specularMax = 0.0;
  }

  float diffIntensity = 0.0;
	if (diffuseMax > 0.95)
  {
    diffIntensity = 1.0;
  }
  else if (diffuseMax > 0.5)
  {
    diffIntensity = 0.7;
  }
  else if (diffuseMax > 0.05)
  {
    diffIntensity = 0.3;
  }
  else
  {
    diffIntensity = 0.05;
  }

  float specIntensity = 0.0;
  if (specularMax > 0.95)
  {
    specIntensity = 1.0;
  }
  else if (specularMax > 0.5)
  {
    specIntensity = 0.7;
  }
  else if (specularMax > 0.05)
  {
    specIntensity = 0.3;
  }
  else
  {
    specIntensity = 0.05;
  }

	gl_FragColor = LMa + (LMd * diffIntensity) + (LMs * pow(specIntensity,shininess));
  gl_FragColor = clamp(gl_FragColor, 0.0, 1.0);
}
