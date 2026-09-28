import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './DriftWall.css';

export interface DriftWallItem {
  image: string;
  title?: string;
  href?: string;
}

export interface DriftWallProps {
  items?: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'up' | 'down';
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_ITEMS: DriftWallItem[] = Array.from({ length: 15 }, (_, i) => {
  const ids = [1015, 1025, 1039, 1043, 1044, 1050, 1062, 1069, 1074, 1080, 1084, 106, 110, 133, 164];
  return {
    image: `https://picsum.photos/id/${ids[i % ids.length]}/600/400`,
    title: `Tile ${i + 1}`,
    href: undefined
  };
});

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index: number, variance: number): number => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

export const DriftWall: React.FC<DriftWallProps> = ({
  items = DEFAULT_ITEMS,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 14,
  tilt = 16,
  turn = -14,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = 'up',
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = '#060010',
  className = '',
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const hoveredColRef = useRef<number>(-1);
  const wallHoveredRef = useRef<boolean>(false);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pointerDampedRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTsRef = useRef<number | null>(null);

  const [containerHeight, setContainerHeight] = useState<number>(600);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const columnItems = useMemo(() => {
    const cols: DriftWallItem[][] = Array.from({ length: columns }, () => []);
    items.forEach((item, i) => cols[i % columns].push(item));
    return cols.map((col, colIdx) => {
      let result = col.length ? [...col] : items.slice(0, 1);
      while (result.length < 8 && items.length > 0) {
        const additions = items.filter((_, idx) => (idx + colIdx) % 3 === 0);
        result.push(...(additions.length ? additions : items.slice(0, 2)));
      }
      return result;
    });
  }, [items, columns]);

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map(col => {
      const copyHeight = Math.max(unit, col.length * unit);
      const copies = Math.max(8, Math.ceil((containerHeight * 5.0) / copyHeight) + 6);
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 600);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
    velocitiesRef.current = baseVelocities.map((v) => v);
  }, [columnMeta, columnItems, baseVelocities]);

  const isVisibleRef = useRef<boolean>(true);

  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current;
      if (!plane) return;
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      const isSmallMobile = w <= 480;
      const isMobile = w <= 768;

      if (tilt === 0 && turn === 0 && roll === 0 && depth === 0) {
        const scaleVal = isSmallMobile ? 1.05 : isMobile ? 1.15 : 1.35;
        plane.style.transform = `translate(-50%, -50%) scale(${scaleVal})`;
        return;
      }

      // On mobile viewports, center strictly at -50% with tailored scale
      // On desktop, scale to fill wide perspective with edge compensation
      const planeScale = isSmallMobile ? 1.12 : isMobile ? 1.22 : 1.95;
      const planeOffsetX = isMobile ? -50 : -52;

      plane.style.transform =
        `translate(${planeOffsetX}%, -50%) scale(${planeScale}) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth]
  );

  useLayoutEffect(() => {
    applyPlaneTransform(0, 0);
  }, [applyPlaneTransform]);

  useEffect(() => {
    const handleResize = () => {
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [applyPlaneTransform]);

  useEffect(() => {
    let animId: number | null = null;

    const animate = (ts: number) => {
      if (!isVisibleRef.current) {
        rafRef.current = null;
        return;
      }

      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, (ts - lastTsRef.current) / 1000));
      lastTsRef.current = ts;

      if (parallax > 0 && !reduced) {
        const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
        const maxTilt = parallax * (isMobile ? 3 : 8);
        const targetX = pointerRef.current.x * maxTilt;
        const targetY = -pointerRef.current.y * maxTilt;
        const damp = 1 - Math.exp(-dt / 0.12);
        pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
        pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
        applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);
      } else {
        applyPlaneTransform(0, 0);
      }

      for (let c = 0; c < trackRefs.current.length; c++) {
        const meta = columnMeta[c];
        if (!meta) continue;
        const target = baseVelocities[c];

        const ease = 1 - Math.exp(-dt / 0.28);
        velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
        let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
        next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
        offsetsRef.current[c] = next;

        const el = trackRefs.current[c];
        if (el) {
          el.style.transform = `translate3d(0, ${-next}px, 0)`;
        }
      }

      animId = requestAnimationFrame(animate);
      rafRef.current = animId;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        isVisibleRef.current = visible;
        if (visible && rafRef.current === null) {
          lastTsRef.current = null;
          animId = requestAnimationFrame(animate);
          rafRef.current = animId;
        } else if (!visible && rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
          lastTsRef.current = null;
        }
      },
      { rootMargin: "300px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    animId = requestAnimationFrame(animate);
    rafRef.current = animId;

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (animId) cancelAnimationFrame(animId);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, applyPlaneTransform]);

  const activate = useCallback((id: string, index: number) => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);

  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (parallax > 0 && !reduced) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          pointerRef.current = {
            x: (e.clientX - rect.left) / rect.width - 0.5,
            y: (e.clientY - rect.top) / rect.height - 0.5
          };
        }
      }
    },
    [parallax, reduced]
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVars = useMemo(
    () => ({
      ['--dw-tile-w' as any]: `${tileWidth}px`,
      ['--dw-tile-h' as any]: `${tileHeight}px`,
      ['--dw-gap' as any]: `${gap}px`,
      ['--dw-radius' as any]: `${radius}px`,
      ['--dw-perspective' as any]: `${perspective}px`,
      ['--dw-lift' as any]: `${lift}px`,
      ['--dw-dim' as any]: dim,
      ['--dw-gray' as any]: grayscale ? 1 : 0,
      ['--dw-overlay' as any]: overlayColor,
      ['--dw-edge' as any]: `${Math.max(0, (1 - fade) * 100)}%`,
      ...style
    }),
    [tileWidth, tileHeight, gap, radius, perspective, lift, dim, grayscale, overlayColor, fade, style]
  );

  const renderTile = (item: DriftWallItem, id: string, colIndex: number) => {
    const inner = (
      <span className="drift-wall__inner">
        <img src={item.image} alt={item.title ?? ''} loading="eager" decoding="async" draggable={false} />
        <span className="drift-wall__overlay" aria-hidden="true" />
      </span>
    );
    const commonProps = {
      className: `drift-wall__tile${activeId === id ? ' is-active' : ''}`,
      'data-tile-id': id,
      'data-col': colIndex,
      onPointerEnter: () => activate(id, colIndex),
      onPointerLeave: release,
      onFocus: () => activate(id, colIndex),
      onBlur: release
    };
    if (item.href) {
      return (
        <a key={id} href={item.href} target="_blank" rel="noreferrer noopener" {...commonProps}>
          {inner}
        </a>
      );
    }
    return (
      <div key={id} tabIndex={0} role="button" aria-label={item.title ?? 'tile'} {...commonProps}>
        {inner}
      </div>
    );
  };

  const rootClass = ['drift-wall', reduced ? 'drift-wall--reduced' : '', className].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="Drifting wall of tiles"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          if (!meta) return null;
          const copies = Array.from({ length: meta.copies });
          return (
            <div className="drift-wall__col" key={`col-${c}`}>
              <div className="drift-wall__track" ref={el => { trackRefs.current[c] = el; }}>
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) => renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriftWall;
