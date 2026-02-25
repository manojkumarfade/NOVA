
export const sphereVertexShader = `
varying vec3 vNormal;
varying vec3 vPosition; 
void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const sphereFragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform float time;
uniform float audioIntensity;
uniform vec3 baseColor;
uniform vec3 glowColor;

void main() {
    // Fresnel Effect (Rim lighting)
    vec3 viewDirection = normalize(cameraPosition - vPosition); // Approximate for local
    // Actually in ShaderMaterial, viewMatrix transforms geometry. 
    // Let's use standard dot product for rim.
    // vNormal is already view-space in ThreeJS if passed correctly, but we computed it manually.
    // Standard Rim: dot(view, normal)
    
    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
    
    // Pulsing inner glow
    float pulse = sin(time * 3.0) * 0.5 + 0.5;
    vec3 atmosphere = glowColor * intensity * (1.0 + audioIntensity * 2.0);
    
    // Base transparency look
    float op = 0.2 + intensity * 0.8;
    
    gl_FragColor = vec4(baseColor + atmosphere, op);
}
`;

export const particleVertexShader = `
attribute float size;
varying vec3 vColor;
uniform float time;
uniform float audioBass;

void main() {
    vColor = color;
    vec3 pos = position;
    
    // Audio displace
    pos += normal * audioBass * 0.5;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;

export const particleFragmentShader = `
varying vec3 vColor;
void main() {
    // Circular particle
    float r = distance(gl_PointCoord, vec2(0.5, 0.5));
    if (r > 0.5) discard;
    
    // Soft edge
    float glow = 1.0 - (r * 2.0);
    glow = pow(glow, 1.5);
    
    gl_FragColor = vec4(vColor, glow);
}
`;
