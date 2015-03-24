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
  /* vec4 tempCoord = inverse(gl_ModelViewProjectionMatrix) * gl_FragCoord;
  if (gl_FragCoord.y > 250)
  {
    discard; // stop processing the fragment if y coordinate is positive
  }
  if (gl_FrontFacing) // are we looking at a front face?
  {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // yes: green
  }
  else
  {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // no: red
  } */

  if (normalMapTexCoord.y > 0.5)
  {
  	vec2 textureCoords = vec2(normalMapTexCoord.x * 6, normalMapTexCoord.y * -2);
  	gl_FragColor = texture(decal, textureCoords);
  }
  else if (normalMapTexCoord.y <= 0.5)
  {
  	vec2 textureCoords = vec2(normalMapTexCoord.x * -6, normalMapTexCoord.y * 2);
  	gl_FragColor = texture(decal, textureCoords);
  }
  gl_FragColor = clamp(gl_FragColor, 0.0, 1.0);
}
