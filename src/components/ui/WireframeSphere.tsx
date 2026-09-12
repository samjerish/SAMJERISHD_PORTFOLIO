import React, { useEffect, useRef, useState } from "react";
import "./WireframeSphere.css";

// 3D Point Tuple
type Point3D = [number, number, number];

// Normalize a 3D vector to unit sphere length
function normalize(v: Point3D): Point3D {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

// Generate mathematically precise Geodesic Icosahedron (42 Vertices, 120 Edges, 80 Faces)
function generateGeodesicSphere(): {
  vertices: Point3D[];
  edges: [number, number][];
} {
  const phi = (1.0 + Math.sqrt(5.0)) / 2.0;

  // 12 base vertices of an icosahedron
  const rawBaseVerts: Point3D[] = [
    [-1, phi, 0],
    [1, phi, 0],
    [-1, -phi, 0],
    [1, -phi, 0],
    [0, -1, phi],
    [0, 1, phi],
    [0, -1, -phi],
    [0, 1, -phi],
    [phi, 0, -1],
    [phi, 0, 1],
    [-phi, 0, -1],
    [-phi, 0, 1],
  ];
  const baseVerts = rawBaseVerts.map(normalize);

  // 20 triangular faces of an icosahedron
  const baseFaces: [number, number, number][] = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  const vertices: Point3D[] = [...baseVerts];
  const midpointMap = new Map<string, number>();

  function getMidpoint(idx1: number, idx2: number): number {
    const key = idx1 < idx2 ? `${idx1}_${idx2}` : `${idx2}_${idx1}`;
    if (midpointMap.has(key)) {
      return midpointMap.get(key)!;
    }
    const v1 = vertices[idx1];
    const v2 = vertices[idx2];
    const mid = normalize([
      (v1[0] + v2[0]) * 0.5,
      (v1[1] + v2[1]) * 0.5,
      (v1[2] + v2[2]) * 0.5,
    ]);
    const newIdx = vertices.length;
    vertices.push(mid);
    midpointMap.set(key, newIdx);
    return newIdx;
  }

  const edgeMap = new Set<string>();
  const edges: [number, number][] = [];

  function addEdge(i: number, j: number) {
    const key = i < j ? `${i}_${j}` : `${j}_${i}`;
    if (!edgeMap.has(key)) {
      edgeMap.add(key);
      edges.push([i, j]);
    }
  }

  // Subdivide each face into 4 smaller triangles
  baseFaces.forEach(([a, b, c]) => {
    const ab = getMidpoint(a, b);
    const bc = getMidpoint(b, c);
    const ca = getMidpoint(c, a);

    // 4 new triangles
    const subTriangles: [number, number, number][] = [
      [a, ab, ca],
      [b, bc, ab],
      [c, ca, bc],
      [ab, bc, ca],
    ];

    subTriangles.forEach(([v1, v2, v3]) => {
      addEdge(v1, v2);
      addEdge(v2, v3);
      addEdge(v3, v1);
    });
  });

  return { vertices, edges };
}

// Pre-calculate geometry once
const GEODESIC_GEOMETRY = generateGeodesicSphere();

export const WireframeSphere: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  // 3D Euler rotation angles
  const rotXRef = useRef(0.35);
  const rotYRef = useRef(0.2);
  const rotZRef = useRef(0.1);

  // Dynamic user velocity and drag states
  const velXRef = useRef(0.0035);
  const velYRef = useRef(0.007);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Intersection observer to pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Main 3D Canvas Rendering and Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    // Handle HiDPI / Retina canvas sizing
    const updateSize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    const { vertices, edges } = GEODESIC_GEOMETRY;

    const render = () => {
      if (isIntersecting) {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Ambient rotation loop + drag inertia decay
        if (!isDraggingRef.current) {
          velXRef.current += (0.0035 - velXRef.current) * 0.04;
          velYRef.current += (0.0068 - velYRef.current) * 0.04;
          rotXRef.current += velXRef.current;
          rotYRef.current += velYRef.current;
          rotZRef.current += 0.0018;
        }

        const rx = rotXRef.current;
        const ry = rotYRef.current;
        const rz = rotZRef.current;

        const cosX = Math.cos(rx);
        const sinX = Math.sin(rx);
        const cosY = Math.cos(ry);
        const sinY = Math.sin(ry);
        const cosZ = Math.cos(rz);
        const sinZ = Math.sin(rz);

        const centerX = width * 0.5;
        const centerY = height * 0.5;
        const sphereRadius = Math.min(width, height) * 0.38;
        const cameraDistance = 2.85;

        // Transform and project all vertices
        const projectedVerts: { x: number; y: number; z: number; depth: number }[] = [];

        for (let i = 0; i < vertices.length; i++) {
          const [vx, vy, vz] = vertices[i];

          // Rotate around Y
          const x1 = vx * cosY + vz * sinY;
          const y1 = vy;
          const z1 = -vx * sinY + vz * cosY;

          // Rotate around X
          const x2 = x1;
          const y2 = y1 * cosX - z1 * sinX;
          const z2 = y1 * sinX + z1 * cosX;

          // Rotate around Z
          const x3 = x2 * cosZ - y2 * sinZ;
          const y3 = x2 * sinZ + y2 * cosZ;
          const z3 = z2;

          // Perspective projection
          const perspective = cameraDistance / (cameraDistance - z3);
          const screenX = centerX + x3 * sphereRadius * perspective;
          const screenY = centerY + y3 * sphereRadius * perspective;

          projectedVerts.push({
            x: screenX,
            y: screenY,
            z: z3,
            depth: (z3 + 1) * 0.5, // Normalized 0 (back) to 1 (front)
          });
        }

        // Draw 3D Wireframe Edges with Depth Shading
        // To achieve stereoscopic depth, render back edges first, then front edges
        const sortedEdges = edges
          .map(([u, v]) => {
            const p1 = projectedVerts[u];
            const p2 = projectedVerts[v];
            const avgZ = (p1.z + p2.z) * 0.5;
            return { u, v, p1, p2, avgZ };
          })
          .sort((a, b) => a.avgZ - b.avgZ);

        for (let i = 0; i < sortedEdges.length; i++) {
          const { p1, p2, avgZ } = sortedEdges[i];

          // Normalized depth factor from 0.0 (far back) to 1.0 (nearest front)
          const depthFactor = Math.max(0, Math.min(1, (avgZ + 0.95) / 1.9));

          // Front lines are bright, back lines fade into dark depth
          const alpha = 0.18 + depthFactor * 0.76;
          const strokeWidth = 0.75 + depthFactor * 1.35;

          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.lineWidth = strokeWidth;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }

        // Draw subtle glowing vertex nodes
        for (let i = 0; i < projectedVerts.length; i++) {
          const p = projectedVerts[i];
          if (p.z > -0.2) {
            const dotAlpha = 0.2 + p.depth * 0.8;
            const dotRadius = 1.0 + p.depth * 1.6;

            ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateSize);
    };
  }, [isIntersecting]);

  // Pointer & Touch Drag Handlers (Interactive Spin)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;

    rotYRef.current += dx * 0.009;
    rotXRef.current -= dy * 0.009;

    velYRef.current = dx * 0.007;
    velXRef.current = -dy * 0.007;

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div
      ref={containerRef}
      className={`wireframe-polyhedron-container ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      data-cursor-text="ROTATE"
      aria-label="Interactive 3D Wireframe Geodesic Polyhedron"
    >
      {/* Ambient Spotlight Glow */}
      <div className="wireframe-ambient-glow" aria-hidden="true" />
      <div className="wireframe-orbit-accent" aria-hidden="true" />

      {/* Render Canvas */}
      <canvas ref={canvasRef} className="wireframe-canvas" />
    </div>
  );
};
