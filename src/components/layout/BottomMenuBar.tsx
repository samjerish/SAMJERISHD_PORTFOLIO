import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./BottomMenuBar.css";
import { Film, FileText, Mail } from "lucide-react";

export type PageType = "home" | "media" | "about" | "projects" | "contact" | "resume";

interface BottomMenuBarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

// Apple-style Minimal Home Icon with inner dot
const HomeDotIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-9z" />
    <circle cx="12" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

interface NavItem {
  id: "home" | "media" | "resume" | "contact";
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  cursor: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: HomeDotIcon,
    cursor: "HOME",
  },
  {
    id: "media",
    label: "Media",
    icon: Film,
    cursor: "MEDIA",
  },
  {
    id: "resume",
    label: "Resume",
    icon: FileText,
    cursor: "RESUME",
  },
  {
    id: "contact",
    label: "Contact",
    icon: Mail,
    cursor: "CONTACT",
  },
];

export const BottomMenuBar: React.FC<BottomMenuBarProps> = ({
  currentPage,
  onNavigate,
}) => {
  // Swipe out logic: Hide in Hero section and Contact section
  const [isHidden, setIsHidden] = useState<boolean>(
    () => currentPage === "home" || currentPage === "contact",
  );

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [pillStyle, setPillStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartCoordRef = useRef({ x: 0, y: 0 });
  const lastClientXRef = useRef(0);
  const lastHoveredIndexRef = useRef<number | null>(null);

  const dockContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = useMemo(() => {
    return NAV_ITEMS.findIndex((item) => item.id === currentPage);
  }, [currentPage]);

  const updatePillToItem = useCallback((targetIdx: number) => {
    if (targetIdx >= 0 && itemRefs.current[targetIdx]) {
      const el = itemRefs.current[targetIdx];
      if (el) {
        setPillStyle({
          left: el.offsetLeft,
          width: el.offsetWidth,
          opacity: 1,
        });
      }
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, []);

  // Update pill position based on hover or active page when not dragging
  useEffect(() => {
    if (!isDraggingRef.current) {
      const targetIdx = hoveredIndex !== null ? hoveredIndex : activeIndex;
      updatePillToItem(targetIdx);
      const timer = setTimeout(() => updatePillToItem(targetIdx), 60);
      return () => clearTimeout(timer);
    }
  }, [hoveredIndex, activeIndex, updatePillToItem]);

  useEffect(() => {
    const handleResize = () => {
      if (!isDraggingRef.current) {
        const targetIdx = hoveredIndex !== null ? hoveredIndex : activeIndex;
        updatePillToItem(targetIdx);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hoveredIndex, activeIndex, updatePillToItem]);

  // Swipe out logic: Hide in Hero section and Contact section
  useEffect(() => {
    if (currentPage === "contact") {
      setIsHidden(true);
      return;
    }

    if (currentPage !== "home") {
      setIsHidden(false);
      return;
    }

    let ticking = false;

    const evaluateVisibility = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // 1. Hero section threshold: top ~60% of viewport
      const inHero = scrollY < viewportHeight * 0.6;

      // 2. Contact section threshold: when contact section enters viewport
      const contactEl = document.getElementById("contact");
      let inContact = false;
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        // Trigger swipe-out as contact section approaches viewport
        if (rect.top <= viewportHeight * 0.8 && rect.bottom >= 0) {
          inContact = true;
        }
      }

      setIsHidden(inHero || inContact);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          evaluateVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    evaluateVisibility();
    const timer = setTimeout(evaluateVisibility, 150);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [currentPage]);

  const handleItemClick = (item: NavItem) => {
    if (item.id === "home") {
      if (currentPage === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        onNavigate("home");
      }
    } else {
      onNavigate(item.id);
    }
  };

  // Helper to find the option index closest to a given clientX
  const getClosestOptionIndex = (clientX: number): number => {
    let closestIdx = 0;
    let minDistance = Infinity;

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dist = Math.abs(clientX - centerX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = index;
      }
    });

    return closestIdx;
  };

  // Trigger Apple-style Taptic tactile vibration feedback on option transition
  const triggerHaptic = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(12);
      } catch {
        // ignore
      }
    }
  };

  // Apple Liquid Glass Drag: Pointer Down
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Left click or touch only
    if (e.button !== 0) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartCoordRef.current = { x: e.clientX, y: e.clientY };
    lastClientXRef.current = e.clientX;
    setIsDragging(true);

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const closestIdx = getClosestOptionIndex(e.clientX);
    lastHoveredIndexRef.current = closestIdx;
    setHoveredIndex(closestIdx);

    // Position liquid pill to match pointer touch location
    if (dockContainerRef.current) {
      const dockRect = dockContainerRef.current.getBoundingClientRect();
      const relX = e.clientX - dockRect.left;
      const itemEl = itemRefs.current[closestIdx];
      const targetWidth = itemEl ? itemEl.offsetWidth : 68;
      const minLeft = 8;
      const maxLeft = dockRect.width - targetWidth - 8;
      const pillLeft = Math.max(minLeft, Math.min(maxLeft, relX - targetWidth / 2));

      setPillStyle({
        left: pillLeft,
        width: targetWidth,
        opacity: 1,
      });
    }
  };

  // Apple Liquid Glass Drag: Pointer Move (Dragging through options)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    // Check drag threshold
    const dx = Math.abs(e.clientX - dragStartCoordRef.current.x);
    const dy = Math.abs(e.clientY - dragStartCoordRef.current.y);
    if (dx > 4 || dy > 4) {
      hasDraggedRef.current = true;
    }

    const vx = e.clientX - lastClientXRef.current;
    lastClientXRef.current = e.clientX;

    const closestIdx = getClosestOptionIndex(e.clientX);

    // Haptic feedback on switching options
    if (closestIdx !== lastHoveredIndexRef.current) {
      lastHoveredIndexRef.current = closestIdx;
      setHoveredIndex(closestIdx);
      triggerHaptic();
    }

    if (dockContainerRef.current) {
      const dockRect = dockContainerRef.current.getBoundingClientRect();
      const relX = e.clientX - dockRect.left;
      const itemEl = itemRefs.current[closestIdx];
      const baseWidth = itemEl ? itemEl.offsetWidth : 68;

      // Fluid viscous stretch: elongates slightly with movement velocity
      const velocityStretch = Math.min(22, Math.abs(vx) * 1.6);
      const currentWidth = baseWidth + velocityStretch;

      // Center pill on pointer, constrained within dock
      const minLeft = 8;
      const maxLeft = Math.max(minLeft, dockRect.width - currentWidth - 8);
      const pillLeft = Math.max(minLeft, Math.min(maxLeft, relX - currentWidth / 2));

      setPillStyle({
        left: pillLeft,
        width: currentWidth,
        opacity: 1,
      });
    }
  };

  // Apple Liquid Glass Drag: Pointer Up (Release to navigate)
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const finalIdx = getClosestOptionIndex(e.clientX);
    const selectedItem = NAV_ITEMS[finalIdx];

    // If dragged or clicked on an option, navigate to it
    if (selectedItem) {
      handleItemClick(selectedItem);
      triggerHaptic();
    }

    // Snap pill smoothly to the selected option's slot
    updatePillToItem(finalIdx);
  };

  // Apple Liquid Glass Drag: Pointer Cancel
  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const targetIdx = activeIndex >= 0 ? activeIndex : 0;
    setHoveredIndex(null);
    updatePillToItem(targetIdx);
  };

  return (
    <nav
      className={`bottom-menu-bar ${isHidden ? "is-hidden" : ""}`}
      aria-label="Apple Liquid Glass Navigation Dock"
    >
      <div
        ref={dockContainerRef}
        className={`dock-liquid-glass ${isDragging ? "is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onMouseLeave={() => {
          if (!isDraggingRef.current) {
            setHoveredIndex(null);
          }
        }}
        data-cursor-text={
          isDragging && hoveredIndex !== null
            ? NAV_ITEMS[hoveredIndex].cursor
            : undefined
        }
      >
        {/* Specular curved top rim light reflection that tracks with the pill */}
        <div
          className="dock-specular-edge"
          style={{
            background: isDragging
              ? `radial-gradient(ellipse 90px 2px at ${
                  pillStyle.left + pillStyle.width / 2
                }px 0%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.3) 50%, transparent 100%)`
              : undefined,
          }}
          aria-hidden="true"
        />

        {/* Apple Fluid Liquid Morphing Pill Indicator */}
        <div
          className={`liquid-pill ${isDragging ? "is-dragging" : ""}`}
          style={{
            transform: `translate3d(${pillStyle.left}px, 0, 0)`,
            width: `${pillStyle.width}px`,
            opacity: pillStyle.opacity,
          }}
          aria-hidden="true"
        >
          <div className="liquid-pill-inner-glow" />
        </div>

        {/* Dock Items: Home, Media, Resume, Contact */}
        {NAV_ITEMS.map((item, index) => {
          const isActive = currentPage === item.id;
          const isItemHovered = hoveredIndex === index;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              type="button"
              className={`dock-item ${isActive ? "is-active" : ""} ${
                isItemHovered ? "is-hovered is-drag-hovered" : ""
              }`}
              onClick={(e) => {
                // If user dragged significantly, handlePointerUp already handled selection
                if (!hasDraggedRef.current) {
                  handleItemClick(item);
                }
                e.stopPropagation();
              }}
              onMouseEnter={() => {
                if (!isDraggingRef.current) {
                  setHoveredIndex(index);
                }
              }}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              data-cursor-text={item.cursor}
            >
              <Icon size={24} strokeWidth={1.85} className="dock-icon" />

              {/* Active liquid dot indicator */}
              <span
                className={`active-dot ${isActive || (isDragging && isItemHovered) ? "visible" : ""}`}
                aria-hidden="true"
              />

              {/* Apple-style Frosted Glass Tooltip */}
              <span
                className={`dock-tooltip ${
                  isDragging && isItemHovered ? "is-drag-visible" : ""
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
