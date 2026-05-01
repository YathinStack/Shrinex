"use client";
import React, { useEffect, useRef } from 'react';
import { Renderer, Geometry, Program, Mesh, Vec2, Color } from 'ogl';

interface VantaVaporProps {
    smokeColor?: string;    // Silver/White highlight
    voidColor?: string;     // Deep Black
    density?: number;       // How "thick" the smoke is (1-10)
    speed?: number;
    opacity?: number;       // Overall visibility
}

const VERTEX_SHADER = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uSmokeColor;
  uniform vec3 uVoidColor;
  uniform float uDensity;
  uniform float uSpeed;
  uniform float uOpacity;

  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    for (int i = 0; i < 6; ++i) {
      v += a * snoise(p);
      p = p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float ratio = uResolution.x / uResolution.y;
    vec2 pos = vec2(uv.x * ratio, uv.y);
    
    float t = uTime * uSpeed * 0.2;
    float mDist = distance(uv, uMouse);
    pos += (uv - uMouse) * smoothstep(0.5, 0.0, mDist) * 0.3;

    float n = fbm(pos * 1.0 - vec2(0.0, t));
    float ridge = 1.0 - abs(snoise(pos * 2.0 + n));
    
    // HEAVY SMOKE CALCULATION
    float thickSmoke = pow(ridge * n, 3.0 - uDensity * 0.2);
    thickSmoke = smoothstep(0.0, 0.5, thickSmoke);

    // --- FADE REMOVED FROM HERE ---

    vec3 color = mix(uVoidColor, uSmokeColor * 0.3, thickSmoke); 
    float spec = pow(thickSmoke, 4.0) * 2.0;
    color += spec * uSmokeColor * uOpacity;
    color = pow(color, vec3(1.1));

    gl_FragColor = vec4(color, 1.0);
  }
`;


const VantaVapor: React.FC<VantaVaporProps> = ({
    smokeColor = "#ffffff", // Pure white for the highlights
    voidColor = "#000000",
    density = 8.0,         // Scale 1 to 10
    speed = 0.6,
    opacity = 1.0
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef(new Vec2(0.5, 0.5));
    const targetMouse = useRef(new Vec2(0.5, 0.5));

    useEffect(() => {
        if (!containerRef.current) return;
        const renderer = new Renderer({ alpha: true, antialias: true });
        const gl = renderer.gl;
        containerRef.current.appendChild(gl.canvas);

        const geometry = new Geometry(gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        const program = new Program(gl, {
            vertex: VERTEX_SHADER,
            fragment: FRAGMENT_SHADER,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Vec2() },
                uMouse: { value: mousePos.current },
                uSmokeColor: { value: new Color(smokeColor) },
                uVoidColor: { value: new Color(voidColor) },
                uDensity: { value: density },
                uSpeed: { value: speed },
                uOpacity: { value: opacity },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            program.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', resize);
        resize();

        const onMouseMove = (e: MouseEvent) => {
            targetMouse.current.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', onMouseMove);

        let requestId: number;
        const update = (t: number) => {
            requestId = requestAnimationFrame(update);
            mousePos.current.lerp(targetMouse.current, 0.05);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
        };
        requestId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(requestId);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
            if (containerRef.current?.contains(gl.canvas)) containerRef.current.removeChild(gl.canvas);
        };
    }, [smokeColor, voidColor, density, speed, opacity]);

    return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default VantaVapor;
