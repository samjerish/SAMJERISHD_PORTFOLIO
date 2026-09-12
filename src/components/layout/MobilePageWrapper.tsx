import React, { useState, useRef, useEffect, useCallback } from "react";
import "./MobilePageWrapper.css";

interface MobilePageWrapperProps {
  children: React.ReactNode;
  onSwipeBack: () => void;
  isExiting: boolean;
  onExitComplete: () => void;
}

export const MobilePageWrapper: React.FC<MobilePageWrapperProps> = ({
  children,
  onSwipeBack,
  isExiting,
  onExitComplete,
}) => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isEntering, setIsEntering] = useState<boolean>(true);

  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const isGestureActiveRef = useRef<boolean>(false);
  const shellRef = useRef<HTMLDivElement>(null);

  // End initial entry animation after 320ms
  useEffect(() => {
    if (!isMobile) return;
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 330);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Handle programmatic exit rightwards (e.g. Back button or menu tap)
  useEffect(() => {
    if (isExiting && isMobile) {
      const timer = setTimeout(() => {
        onExitComplete();
      }, 270);
      return () => clearTimeout(timer);
    }
  }, [isExiting, isMobile, onExitComplete]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile || isExiting) return;
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    startYRef.current = touch.clientY;
    startTimeRef.current = performance.now();
    isGestureActiveRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile || isExiting) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startXRef.current;
    const dy = touch.clientY - startYRef.current;

    // Trigger edge-swipe gesture like Instagram on iPhone:
    // User touches within left edge zone (< 95px) and swipes rightwards horizontally
    if (!isGestureActiveRef.current) {
      if (startXRef.current < 95 && dx > 10 && dx > Math.abs(dy) * 1.2) {
        isGestureActiveRef.current = true;
        setIsDragging(true);
      }
    }

    if (isGestureActiveRef.current && dx >= 0) {
      // 1:1 hardware-accelerated finger tracking rightwards
      setDragOffset(dx);
    }
  };

  const completeSwipeBack = useCallback(() => {
    setIsDragging(false);
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 390;
    setDragOffset(screenWidth);
    setTimeout(() => {
      onSwipeBack();
    }, 250);
  }, [onSwipeBack]);

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isGestureActiveRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - startXRef.current;
    const dt = Math.max(1, performance.now() - startTimeRef.current);
    const velocity = dx / dt; // px per ms

    isGestureActiveRef.current = false;

    // iOS threshold: dragged > 75px or flick velocity > 0.35 px/ms
    if (dx > 75 || velocity > 0.35) {
      completeSwipeBack();
    } else {
      // Snap back smoothly to 0
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  if (!isMobile) {
    return <>{children}</>;
  }

  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 390;
  const progress = Math.min(1, Math.max(0, dragOffset / screenWidth));
  const scrimOpacity = Math.max(0, 0.55 * (1 - progress));

  return (
    <>
      <div
        className="mobile-page-backdrop-scrim"
        style={{ opacity: isExiting ? 0 : scrimOpacity }}
        onClick={onSwipeBack}
      />
      <div
        ref={shellRef}
        className={`mobile-page-slide-shell ${isEntering ? "is-entering" : ""} ${
          isExiting ? "is-shifting-right" : ""
        }`}
        style={{
          transform:
            dragOffset > 0 && !isExiting
              ? `translate3d(${dragOffset}px, 0, 0)`
              : undefined,
          transition: isDragging
            ? "none"
            : dragOffset > 0
            ? "transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1)"
            : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {children}
      </div>
    </>
  );
};
