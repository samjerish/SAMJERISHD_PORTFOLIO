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
  // Dynamic swipe out in Hero and Contact sections on home page
  const [isHidden, setIsHidden] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return currentPage === "home" && window.scrollY < 200;
  });

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
  const liquidPillRef = useRef<HTMLDivElement>(null);
  const specularEdgeRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  const activeIndex = useMemo(() => {
    return NAV_ITEMS.findIndex((item) => item.id === currentPage);
  }, [currentPage]);

  // Dynamic scroll listener: Swipes out menu bar in Hero (#home) and Contact (#contact)
  useEffect(() => {
    if (currentPage !== "home") {
      setIsHidden(false);
      return;
    }

    let ticking = false;

    const checkVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroEl = document.getElementById("home");
          const contactEl = document.getElementById("contact");
          const scrollY = window.scrollY;
          const vh = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;

          // 1. Hero Section Detection: Swiped out when Hero occupies the viewport
          let inHero = false;
          if (heroEl) {
            const heroRect = heroEl.getBoundingClientRect();
            inHero = heroRect.bottom > vh * 0.4 || scrollY < 120;
          } else {
            inHero = scrollY < vh * 0.5;
          }

          // 2. Contact Section Detection: Swiped out when Contact section comes into view
          let inContact = false;
          if (contactEl) {
            const contactRect = contactEl.getBoundingClientRect();
            const atBottom = vh + scrollY >= docHeight - 70;
            inContact = contactRect.top <= vh * 0.7 || atBottom;
          }

          setIsHidden(inHero || inContact);
          ticking = false;
        });
        ticking = true;
      }
    };

    checkVisibility();

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);

    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", checkVisibility);
    }

    const timeoutId = setTimeout(checkVisibility, 150);

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", checkVisibility);
      }
      clearTimeout(timeoutId);
    };
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

  // Update pill position based on active page when not dragging
  useEffect(() => {
    if (!isDraggingRef.current) {
      updatePillToItem(activeIndex);
      const timer = setTimeout(() => updatePillToItem(activeIndex), 60);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, updatePillToItem]);

  useEffect(() => {
    const handleResize = () => {
      if (!isDraggingRef.current) {
        updatePillToItem(activeIndex);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, updatePillToItem]);

  const handleItemClick = (item: NavItem) => {
    if (item.id === "home") {
      if (currentPage === "home") {
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.1 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        onNavigate("home");
      }
    } else if (item.id === "contact") {
      if (currentPage === "home") {
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          const lenis = (window as any).__lenis;
          if (lenis) {
            lenis.scrollTo(contactEl, { duration: 1.1 });
          } else {
            contactEl.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
      }
      onNavigate("contact");
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

      if (liquidPillRef.current) {
        liquidPillRef.current.style.transition = "none";
        liquidPillRef.current.style.transform = `translate3d(${pillLeft}px, 0, 0)`;
        liquidPillRef.current.style.width = `${targetWidth}px`;
        liquidPillRef.current.style.opacity = "1";
      }
    }
  };

  // Apple Liquid Glass Drag: Pointer Move (Dragging through options with 120fps direct transform)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    // Check drag threshold
    const dx = Math.abs(e.clientX - dragStartCoordRef.current.x);
    const dy = Math.abs(e.clientY - dragStartCoordRef.current.y);
    if (dx > 4 || dy > 4) {
      hasDraggedRef.current = true;
    }

    const clientX = e.clientX;
    const closestIdx = getClosestOptionIndex(clientX);

    // Haptic feedback on switching options
    if (closestIdx !== lastHoveredIndexRef.current) {
      lastHoveredIndexRef.current = closestIdx;
      setHoveredIndex(closestIdx);
      triggerHaptic();
    }

    if (dockContainerRef.current) {
      const dockRect = dockContainerRef.current.getBoundingClientRect();
      const relX = clientX - dockRect.left;
      const itemEl = itemRefs.current[closestIdx];
      const targetWidth = itemEl ? itemEl.offsetWidth : 68;

      // Center pill smoothly on pointer, constrained within dock
      const minLeft = 8;
      const maxLeft = Math.max(minLeft, dockRect.width - targetWidth - 8);
      const pillLeft = Math.max(minLeft, Math.min(maxLeft, relX - targetWidth / 2));

      // Direct hardware-accelerated transform via rAF (zero buffering, zero React lag)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        if (liquidPillRef.current && isDraggingRef.current) {
          liquidPillRef.current.style.transition = "none";
          liquidPillRef.current.style.transform = `translate3d(${pillLeft}px, 0, 0)`;
          liquidPillRef.current.style.width = `${targetWidth}px`;
          liquidPillRef.current.style.opacity = "1";
        }
        if (specularEdgeRef.current && isDraggingRef.current) {
          specularEdgeRef.current.style.background = `radial-gradient(ellipse 90px 2px at ${
            pillLeft + targetWidth / 2
          }px 0%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.3) 50%, transparent 100%)`;
        }
      });
    }
  };

  // Apple Liquid Glass Drag: Pointer Up (Release to navigate)
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const finalIdx = getClosestOptionIndex(e.clientX);
    const selectedItem = NAV_ITEMS[finalIdx];

    // Re-enable smooth spring transitions on release
    if (liquidPillRef.current) {
      liquidPillRef.current.style.transition = "";
    }
    if (specularEdgeRef.current) {
      specularEdgeRef.current.style.background = "";
    }

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

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (liquidPillRef.current) {
      liquidPillRef.current.style.transition = "";
    }
    if (specularEdgeRef.current) {
      specularEdgeRef.current.style.background = "";
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
      >
        {/* Specular curved top rim light reflection that tracks with the pill */}
        <div
          ref={specularEdgeRef}
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
          ref={liquidPillRef}
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
            >
              <Icon size={24} strokeWidth={1.85} className="dock-icon" />

              {/* Active liquid dot indicator: strictly one dot even during dragging */}
              <span
                className={`active-dot ${(isDragging ? isItemHovered : isActive) ? "visible" : ""}`}
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
