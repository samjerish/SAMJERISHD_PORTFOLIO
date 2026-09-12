import React, { useEffect, useRef } from "react";
import "./HeroSection.css";
import ImageTrail from "../ui/ImageTrail";
import animatedPhoto from "../../assets/animated_profile.png";

interface HeroSectionProps {
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}

const basePath = import.meta.env.BASE_URL;

// Photography items directly from "Beyond the Frame" (MyMediaPage)
const BEYOND_THE_FRAME_PHOTOS: string[] = [
  `${basePath}media/media-1.jpg`,
  `${basePath}media/media-2.jpg`,
  `${basePath}media/media-3.jpg`,
  `${basePath}media/media-4.png`,
  `${basePath}media/media-5.jpg`,
  `${basePath}6.JPG`,
  `${basePath}7.JPG`,
  `${basePath}8.JPG`,
  `${basePath}9.JPG`,
  `${basePath}10.jpg`,
  `${basePath}11.JPG`,
  `${basePath}12.JPG`,
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.58.05.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.58.18.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.58.25.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.58.30.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.58.42.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.58.51.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.58.56.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.59.03.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.59.12.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.59.20.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.59.29.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.59.43.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 19.59.49.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 20.00.04.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 20.00.15.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 20.00.23.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 20.00.40.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 20.00.46.png`),
  encodeURI(`${basePath}Screenshot 2026-08-29 at 20.00.51.png`),
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const rafId = useRef<number | null>(null);

  // Spring lerp state tracking without triggering React component re-renders
  const targetState = useRef({
    rx: 0,
    ry: 0,
    ty: 0,
    scale: 1,
    gx: 50,
    gy: 50,
  });

  const currentState = useRef({
    rx: 0,
    ry: 0,
    ty: 0,
    scale: 1,
    gx: 50,
    gy: 50,
  });

  const animate = () => {
    // 0.16 interpolation factor gives snappy, zero-lag response with silky-smooth continuity
    const factor = 0.16;
    const cur = currentState.current;
    const tgt = targetState.current;

    cur.rx += (tgt.rx - cur.rx) * factor;
    cur.ry += (tgt.ry - cur.ry) * factor;
    cur.ty += (tgt.ty - cur.ty) * factor;
    cur.scale += (tgt.scale - cur.scale) * factor;
    cur.gx += (tgt.gx - cur.gx) * factor;
    cur.gy += (tgt.gy - cur.gy) * factor;

    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg) translateY(${cur.ty.toFixed(2)}px) scale3d(${cur.scale.toFixed(3)}, ${cur.scale.toFixed(3)}, ${cur.scale.toFixed(3)})`;
      cardRef.current.style.setProperty("--glare-x", `${cur.gx.toFixed(1)}%`);
      cardRef.current.style.setProperty("--glare-y", `${cur.gy.toFixed(1)}%`);
    }

    const delta =
      Math.abs(tgt.rx - cur.rx) +
      Math.abs(tgt.ry - cur.ry) +
      Math.abs(tgt.ty - cur.ty) +
      Math.abs(tgt.scale - cur.scale);

    if (isHoveredRef.current || delta > 0.005) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      if (cardRef.current) {
        cardRef.current.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)";
      }
      rafId.current = null;
    }
  };

  const startAnimation = () => {
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate);
    }
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    isHoveredRef.current = true;
    if (cardRef.current) {
      cardRef.current.classList.add("is-hovered");
    }
    startAnimation();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalized bounds between -1 and +1 across the stationary wrapper
    const normX = Math.max(-1, Math.min(1, (mouseX / rect.width - 0.5) * 2));
    const normY = Math.max(-1, Math.min(1, (mouseY / rect.height - 0.5) * 2));

    targetState.current = {
      rx: normY * -11,
      ry: normX * 13,
      ty: -8,
      scale: 1.02,
      gx: ((normX + 1) / 2) * 100,
      gy: ((normY + 1) / 2) * 100,
    };

    isHoveredRef.current = true;
    startAnimation();
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
    targetState.current = {
      rx: 0,
      ry: 0,
      ty: 0,
      scale: 1,
      gx: 50,
      gy: 50,
    };
    if (cardRef.current) {
      cardRef.current.classList.remove("is-hovered");
    }
    startAnimation();
  };

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const handleScrollDown = () => {
    if (onNavigate) {
      onNavigate("about");
      return;
    }

    const nextEl =
      document.getElementById("about") || document.getElementById("projects");
    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (
            target: HTMLElement | string,
            options?: { duration?: number; offset?: number },
          ) => void;
        };
      }
    ).__lenis;

    if (lenis && nextEl) {
      lenis.scrollTo(nextEl, { duration: 1.1, offset: -20 });
    } else if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section className="hero-badge-section" id="home">
      {/* Subtle Dot Grid Background Overlay */}
      <div className="hero-dot-matrix" aria-hidden="true" />

      {/* Interactive Cursor Image Trail Effect featuring Beyond the Frame photography */}
      <ImageTrail items={BEYOND_THE_FRAME_PHOTOS} variant={5} />

      {/* Main Content Container */}
      <div className="hero-badge-stage">
        {/* Stationary Hitbox Wrapper - Handles all hover events cleanly without boundary jitter or feedback loops */}
        <div
          ref={wrapperRef}
          className="hero-id-card-wrapper"
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          data-cursor-text="HOVER"
        >
          {/* The Centerpiece: Interactive Retro ID Card Badge */}
          <div ref={cardRef} className="hero-id-card">
            {/* Specular Glare Sheen Reflection */}
            <div className="id-card-glare" aria-hidden="true" />
          {/* Outer Stitch / Decorative Border */}
          <div className="id-card-stitch-border">
            <span className="stitch-corner stitch-tl">♥</span>
            <span className="stitch-corner stitch-tr">✦</span>
            <span className="stitch-corner stitch-bl">✦</span>
            <span className="stitch-corner stitch-br">♥</span>
          </div>

          {/* Top Right Serial Number */}
          <div className="id-card-serial">NO. 7061</div>

          {/* Two-Column Card Interior */}
          <div className="id-card-grid">
            {/* Left Column: Polaroid Photo & Signature */}
            <div className="id-polaroid-column">
              <div className="id-polaroid-frame">
                {/* Frosted Scotch Tape */}
                <div className="id-polaroid-tape" aria-hidden="true" />

                {/* Animated Avatar Portrait Photo */}
                <div className="id-photo-wrapper">
                  <img
                    src={animatedPhoto}
                    alt="Sam Jerish D"
                    className="id-photo-img"
                    draggable={false}
                  />
                </div>

                {/* Handwritten Name on Polaroid Chin */}
                <div className="id-polaroid-chin">
                  <span className="id-chin-name">Sam Jerish</span>
                  <span className="id-chin-flower" aria-hidden="true">
                    🌸
                  </span>
                </div>
              </div>

              {/* Signature Line Below Polaroid */}
              <div className="id-signature-block">
                <div className="id-signature-line" />
                <span className="id-signature-caption">
                  Signature of
                  <br />
                  Authorized Owner
                </span>
              </div>
            </div>

            {/* Right Column: Metadata Fields & Rubber Stamp */}
            <div className="id-details-column">
              <div className="id-field-row">
                <span className="id-field-label">Name:</span>
                <span className="id-field-value">SAM JERISH D</span>
              </div>

              <div className="id-field-row">
                <span className="id-field-label">Job role:</span>
                <span className="id-field-value">FULL-STACK DEVELOPER</span>
              </div>

              <div className="id-field-row">
                <span className="id-field-label">Status:</span>
                <span className="id-field-value">THIRD YEAR STUDENT</span>
              </div>

              <div className="id-field-row">
                <span className="id-field-label">Looking for:</span>
                <span className="id-field-value">INTERNSHIP OPPORTUNITIES</span>
              </div>

              <div className="id-field-row">
                <span className="id-field-label">Thinks in:</span>
                <span className="id-field-value">
                  SYSTEMS &amp; CREATIVE CODE
                </span>
              </div>

              {/* Red Ink Rubber Stamp */}
              <div className="id-rubber-stamp" aria-hidden="true">
                <div className="stamp-inner-ring">
                  <span className="stamp-sub-text">AUTHENTIC</span>
                  <span className="stamp-main-text">HUMAN MADE</span>
                  <span className="stamp-year">2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Sleek Animated Scroll Down Indicator */}
      <div
        className="hero-scroll-indicator"
        onClick={handleScrollDown}
        data-cursor-text="SCROLL"
        role="button"
        tabIndex={0}
        aria-label="Scroll down to content"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleScrollDown();
          }
        }}
      >
        <span className="scroll-indicator-label">SCROLL</span>
        <div className="scroll-indicator-pill">
          <span className="scroll-indicator-wheel" />
        </div>
      </div>
    </section>
  );
};


