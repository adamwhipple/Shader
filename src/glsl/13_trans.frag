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
  vec4 tempColor;
  if (normalMapTexCoord.y > 0.5)
  {
    vec2 textureCoords = vec2(normalMapTexCoord.x * 6, normalMapTexCoord.y * -2);
    tempColor = texture(decal, textureCoords);
  }
  else
  {
    vec2 textureCoords = vec2(normalMapTexCoord.x * -6, normalMapTexCoord.y * 2);
    tempColor = texture(decal, textureCoords);
  }
  tempColor.rgb = tempColor.rgb * (alpha);
  gl_FragColor = tempColor;
  gl_FragColor = clamp(gl_FragColor, 0.0, 1.0);
  return;
}