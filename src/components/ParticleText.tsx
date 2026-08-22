import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export interface ParticleTextProps {
  lines?: string[];
  fontSizeDivider?: number;
  fontSizeMax?: number;
  gap?: number;
  colors?: string[];
  letterSpacing?: string;
  lineSpacingRatio?: number;
}

export interface ParticleTextRef {
  scatter: () => void;
}

export const ParticleText = forwardRef<ParticleTextRef, ParticleTextProps>(({
  lines = ["SAM", "JERISH D"],
  fontSizeDivider = 4,
  fontSizeMax = 300,
  gap = 6,
  colors = ['#ffffff', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b'],
  letterSpacing = '15px',
  lineSpacingRatio = 0.9
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // We store the scatter function in a ref so we can call the latest version from useImperativeHandle
  const scatterRef = useRef<() => void>(() => {});

  useImperativeHandle(ref, () => ({
    scatter: () => scatterRef.current()
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    
    let springForceMultiplier = 1;
    let targetSpringForceMultiplier = 1;
    let currentFriction = 0.85;
    let targetFriction = 0.85;
    
    let mouse = {
      x: -1000,
      y: -1000,
      radius: 80
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    scatterRef.current = () => {
      // Disable spring force to let them fly freely
      springForceMultiplier = 0;
      targetSpringForceMultiplier = 0;
      // Reduce friction to let them glide far
      currentFriction = 0.99;
      targetFriction = 0.99;

      particles.forEach(p => {
        // Explode outward with high random velocity
        p.vx = (Math.random() - 0.5) * 80;
        p.vy = (Math.random() - 0.5) * 80;
      });

      // After a delay, slowly pull them back
      setTimeout(() => {
        targetSpringForceMultiplier = 1;
        targetFriction = 0.85;
      }, 2500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const init = () => {
      // Set canvas size to container size
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;

      // Draw text to read its pixels
      ctx.fillStyle = 'white';
      
      // Make it massive, occupying most of the width
      const fontSize = Math.min(canvas.width / fontSizeDivider, fontSizeMax); 
      
      // Calculate dynamic height to perfectly fit the lines of text
      const calculatedHeight = fontSize * (lines.length * 1.1 + 0.5);
      canvas.height = calculatedHeight;
      container.style.height = `${calculatedHeight}px`;

      // Use a very bold, wide font like Arial Black or Impact
      ctx.font = `900 ${fontSize}px 'Arial Black', 'Impact', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      if ('letterSpacing' in ctx) {
        (ctx as any).letterSpacing = letterSpacing;
      }
      
      // Tighter line spacing for that blocked-in look
      const lineSpacing = fontSize * lineSpacingRatio;
      
      // Calculate total height of the text block to center it vertically
      const totalTextHeight = (lines.length - 1) * lineSpacing;
      const startY = (canvas.height - totalTextHeight) / 2;

      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, startY + (index * lineSpacing));
      });

      const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = [];
      
      for (let y = 0; y < textCoordinates.height; y += gap) {
        for (let x = 0; x < textCoordinates.width; x += gap) {
          const index = (y * textCoordinates.width + x) * 4;
          const alpha = textCoordinates.data[index + 3];

          if (alpha > 128) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push({
              x: x, // Perfectly aligned to grid initially
              y: y,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              color: color,
              size: 1.5 // Uniform dot size for the grid look
            });
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolate physics constants for smooth transitions
      springForceMultiplier += (targetSpringForceMultiplier - springForceMultiplier) * 0.02;
      currentFriction += (targetFriction - currentFriction) * 0.02;

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        // Interaction with mouse
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        // Max distance, past that the force is 0
        const maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;

        // If distance is less than radius, apply repulsive force
        if (distance < maxDistance) {
          p.vx -= forceDirectionX * force * 5;
          p.vy -= forceDirectionY * force * 5;
        }

        // Spring force returning to origin (scales with multiplier)
        p.vx += (p.originX - p.x) * 0.1 * springForceMultiplier;
        p.vy += (p.originY - p.y) * 0.1 * springForceMultiplier;

        // Friction
        p.vx *= currentFriction;
        p.vy *= currentFriction;

        p.x += p.vx;
        p.y += p.vy;

        // Screen boundary collisions so they bounce around when scattered
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        // Draw squares or circles? Reference is dots (circles)
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Make sure fonts are loaded before init
    document.fonts.ready.then(() => {
      init();
      animate();
    });

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'block',
          cursor: 'default' 
        }} 
      />
    </div>
  );
});
