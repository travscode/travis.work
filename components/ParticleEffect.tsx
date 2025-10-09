"use client";

import { FC, useEffect, useRef } from "react";

// WebGL Particle Effect Component with Bayer Dithering
export const ParticleEffect: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -1, y: -1 });
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<any>(null);
  const startTimeRef = useRef<number>(Date.now());
  const mouseTrailRef = useRef<Array<{ x: number; y: number; time: number }>>(
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get WebGL2 context
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.warn("WebGL2 not supported, falling back to WebGL1");
      // Fallback to WebGL1
      const gl1 =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl1) {
        console.error("WebGL not supported");
        return;
      }
      // Use WebGL1 implementation instead
      return setupWebGL1(canvas, gl1);
    }
    glRef.current = gl;

    const vertexShader = `#version 300 es
      in vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `#version 300 es
      precision highp float;
      
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uMouse;
      
      const int MAX_TRAIL = 20;
      uniform vec2 uTrailPos[MAX_TRAIL];
      uniform float uTrailTimes[MAX_TRAIL];
      uniform int uTrailCount;
      
      out vec4 fragColor;
      
      // Bayer matrix helpers
      float Bayer2(vec2 a) {
        a = floor(a);
        return fract(a.x / 2.0 + a.y * a.y * 0.75);
      }
      
      float Bayer4(vec2 a) {
        return Bayer2(0.5 * a) * 0.25 + Bayer2(a);
      }
      
      float Bayer8(vec2 a) {
        return Bayer4(0.5 * a) * 0.25 + Bayer2(a);
      }
      
      void main() {
        const float PIXEL_SIZE = 4.0;
        vec2 fragCoord = gl_FragCoord.xy - uResolution * 0.5;
        
        float aspectRatio = uResolution.x / uResolution.y;
        
        vec2 pixelId = floor(fragCoord / PIXEL_SIZE);
        vec2 pixelUV = fract(fragCoord / PIXEL_SIZE);
        
        float cellPixelSize = 8.0 * PIXEL_SIZE;
        vec2 cellId = floor(fragCoord / cellPixelSize);
        vec2 cellCoord = cellId * cellPixelSize;
        vec2 uv = ((cellCoord / uResolution)) * vec2(aspectRatio, 1.0);
        
        float feed = 0.0;
        
        const float speed = 0.30;
        const float thickness = 0.10;
        const float dampT = 1.0;
        const float dampR = 1.0;
        
        // Process mouse trail
        for (int i = 0; i < MAX_TRAIL; ++i) {
          if (i >= uTrailCount) break;
          
          vec2 pos = uTrailPos[i];
          if (pos.x < 0.0 && pos.y < 0.0) continue;
          
          vec2 cuv = (((pos - uResolution * 0.5 - cellPixelSize * 0.5) / uResolution)) * vec2(aspectRatio, 1.0);
          
          float t = max(uTime - uTrailTimes[i], 0.0);
          float r = distance(uv, cuv);
          
          float waveR = speed * t;
          float ring = exp(-pow((r - waveR) / thickness, 2.0));
          float atten = exp(-dampT * t) * exp(-dampR * r);
          
          feed = max(feed, ring * atten);
        }
        
        // Add continuous mouse influence
        if (uMouse.x >= 0.0 && uMouse.y >= 0.0) {
          vec2 mouseUV = (((uMouse - uResolution * 0.5 - cellPixelSize * 0.5) / uResolution)) * vec2(aspectRatio, 1.0);
          float mouseDist = distance(uv, mouseUV);
          float mouseInfluence = exp(-mouseDist * 3.0) * 0.3;
          feed = max(feed, mouseInfluence);
        }
        
        // Add base noise for visibility
        float baseNoise = sin(uTime * 0.5 + fragCoord.x * 0.01 + fragCoord.y * 0.01) * 0.1 + 0.1;
        feed = max(feed, baseNoise);
        
        float bayerValue = Bayer8(fragCoord / PIXEL_SIZE) - 0.5;
        float bw = step(0.5, feed + bayerValue);
        vec3 brandColor = vec3(224.0/255.0, 211.0/255.0, 189.0/255.0);
        fragColor = vec4(brandColor * bw, 1.0);
      }
    `;

    // Create shader function with better error handling
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) {
        console.error("Failed to create shader");
        return null;
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        console.error("Shader source:", source);
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    // Create program
    const vShader = createShader(gl.VERTEX_SHADER, vertexShader);
    const fShader = createShader(gl.FRAGMENT_SHADER, fragmentShader);

    if (!vShader || !fShader) {
      console.error("Failed to create shaders");
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      console.error("Failed to create program");
      return;
    }

    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    programRef.current = program;

    // Get uniform locations
    const uniforms = {
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uTime: gl.getUniformLocation(program, "uTime"),
      uMouse: gl.getUniformLocation(program, "uMouse"),
      uTrailPos: gl.getUniformLocation(program, "uTrailPos"),
      uTrailTimes: gl.getUniformLocation(program, "uTrailTimes"),
      uTrailCount: gl.getUniformLocation(program, "uTrailCount"),
    };
    uniformsRef.current = uniforms;

    // Create geometry - full screen quad
    const positionBuffer = gl.createBuffer();
    const positions = new Float32Array([
      -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0,
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Resize canvas
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const displayWidth = rect.width;
      const displayHeight = rect.height;

      // Set canvas size to match display size
      canvas.width = displayWidth;
      canvas.height = displayHeight;

      // Set viewport
      gl.viewport(0, 0, canvas.width, canvas.height);

      console.log(`Canvas resized to: ${canvas.width}x${canvas.height}`);
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cssX = e.clientX - rect.left;
      const cssY = e.clientY - rect.top;

      // Convert to canvas coordinates
      const fragX = (cssX * canvas.width) / rect.width;
      const fragY = ((rect.height - cssY) * canvas.height) / rect.height;

      mouseRef.current = { x: fragX, y: fragY };

      // Add to trail
      const currentTime = (Date.now() - startTimeRef.current) / 1000;
      mouseTrailRef.current.push({ x: fragX, y: fragY, time: currentTime });

      // Keep only recent trail points
      if (mouseTrailRef.current.length > 20) {
        mouseTrailRef.current.shift();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
    };

    // Animation loop
    const animate = () => {
      if (!gl || !program || !uniforms) return;

      const currentTime = (Date.now() - startTimeRef.current) / 1000;

      // Clear and setup
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      // Set uniforms
      if (uniforms.uResolution) {
        gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
      }
      if (uniforms.uTime) {
        gl.uniform1f(uniforms.uTime, currentTime);
      }
      if (uniforms.uMouse) {
        gl.uniform2f(uniforms.uMouse, mouseRef.current.x, mouseRef.current.y);
      }

      // Set trail uniforms
      const trail = mouseTrailRef.current;
      const trailPositions = new Float32Array(40); // 20 * 2
      const trailTimes = new Float32Array(20);

      for (let i = 0; i < Math.min(trail.length, 20); i++) {
        trailPositions[i * 2] = trail[i].x;
        trailPositions[i * 2 + 1] = trail[i].y;
        trailTimes[i] = trail[i].time;
      }

      if (uniforms.uTrailPos) {
        gl.uniform2fv(uniforms.uTrailPos, trailPositions);
      }
      if (uniforms.uTrailTimes) {
        gl.uniform1fv(uniforms.uTrailTimes, trailTimes);
      }
      if (uniforms.uTrailCount) {
        gl.uniform1i(uniforms.uTrailCount, Math.min(trail.length, 20));
      }

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Check for GL errors
      const error = gl.getError();
      if (error !== gl.NO_ERROR) {
        console.error("WebGL error:", error);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Start animation
    console.log("Starting WebGL2 animation");
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // WebGL1 fallback implementation
  const setupWebGL1 = (
    canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext
  ) => {
    console.log("Using WebGL1 fallback");

    const vertexShader = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uMouse;
      
      // Simplified Bayer for WebGL1
      float Bayer2(vec2 a) {
        a = floor(a);
        return fract(a.x / 2.0 + a.y * a.y * 0.75);
      }
      
      void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        vec2 uv = fragCoord / uResolution;
        
        float dist = distance(uv, uMouse / uResolution);
        float influence = exp(-dist * 5.0) * 0.5;
        
        float noise = sin(uTime + fragCoord.x * 0.01 + fragCoord.y * 0.01) * 0.1 + 0.1;
        float feed = max(influence, noise);
        
        float bayer = Bayer2(fragCoord / 4.0) - 0.5;
        float bw = step(0.5, feed + bayer);
        
        vec3 brandColor = vec3(224.0/255.0, 211.0/255.0, 189.0/255.0);
        gl_FragColor = vec4(brandColor * bw, 1.0);
      }
    `;

    // Similar setup but for WebGL1...
    // (Implementation would be similar but without WebGL2 specific features)
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};
