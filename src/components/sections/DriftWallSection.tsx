import React, { useState, useEffect, useMemo } from "react";
import DriftWall, { type DriftWallItem } from "../ui/DriftWall";
import "./DriftWallSection.css";

export const DriftWallSection: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = () => {
  const basePath = import.meta.env.BASE_URL;

  const [columns, setColumns] = useState<number>(6);
  const [tileWidth, setTileWidth] = useState<number>(245);
  const [tileHeight, setTileHeight] = useState<number>(168);
  const [gap, setGap] = useState<number>(18);
  const [tilt, setTilt] = useState<number>(12);
  const [turn, setTurn] = useState<number>(-10);
  const [roll, setRoll] = useState<number>(-8);
  const [speed, setSpeed] = useState<number>(34);

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 480) {
        // Mobile view: 3 spacious columns so photos are large, readable, and 100% unique without crowding
        setColumns(3);
        setTileWidth(140);
        setTileHeight(98);
        setGap(12);
        setTilt(7);
        setTurn(-3);
        setRoll(-2);
        setSpeed(22);
      } else if (w < 768) {
        // Large mobile / small tablet: 4 columns
        setColumns(4);
        setTileWidth(165);
        setTileHeight(115);
        setGap(14);
        setTilt(8);
        setTurn(-4);
        setRoll(-3);
        setSpeed(26);
      } else if (w < 1200) {
        // Tablet / Small Laptop: 5 columns
        setColumns(5);
        setTileWidth(215);
        setTileHeight(148);
        setGap(16);
        setTilt(11);
        setTurn(-8);
        setRoll(-6);
        setSpeed(32);
      } else if (w < 1600) {
        // Standard Desktop: 6 columns
        setColumns(6);
        setTileWidth(245);
        setTileHeight(168);
        setGap(18);
        setTilt(12);
        setTurn(-10);
        setRoll(-8);
        setSpeed(34);
      } else {
        // Ultra-wide Desktop: 7 columns
        setColumns(7);
        setTileWidth(265);
        setTileHeight(180);
        setGap(20);
        setTilt(12);
        setTurn(-10);
        setRoll(-8);
        setSpeed(36);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Exclusively the 31 photography moments from the "Beyond the Frame" visual archive
  const items = useMemo<DriftWallItem[]>(() => [
    { image: `${basePath}media-opt/media-1.jpg` },
    { image: `${basePath}media-opt/media-2.jpg` },
    { image: `${basePath}media-opt/media-3.jpg` },
    { image: `${basePath}media-opt/media-4.jpg` },
    { image: `${basePath}media-opt/media-5.jpg` },
    { image: `${basePath}media-opt/6.jpg` },
    { image: `${basePath}media-opt/7.jpg` },
    { image: `${basePath}media-opt/8.jpg` },
    { image: `${basePath}media-opt/9.jpg` },
    { image: `${basePath}media-opt/10.jpg` },
    { image: `${basePath}media-opt/11.jpg` },
    { image: `${basePath}media-opt/12.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.05.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.18.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.25.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.30.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.42.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.51.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.56.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.59.03.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.59.12.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.59.20.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.59.29.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.59.43.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 19.59.49.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 20.00.04.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 20.00.15.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 20.00.23.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 20.00.40.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 20.00.46.jpg` },
    { image: `${basePath}media-opt/Screenshot 2026-08-29 at 20.00.51.jpg` },
  ], [basePath]);

  return (
    <section className="drift-wall-section" aria-label="Visual Drift Wall">
      <div className="drift-wall-ambient-glow" aria-hidden="true" />

      <div className="drift-wall-container">
        <DriftWall
          items={items}
          columns={columns}
          tileWidth={tileWidth}
          tileHeight={tileHeight}
          gap={gap}
          tilt={tilt}
          turn={turn}
          roll={roll}
          perspective={1100}
          depth={50}
          speed={speed}
          direction="up"
          variance={0.35}
          parallax={0.35}
          lift={40}
          fade={0.35}
          dim={0.8}
          pauseOnHover={false}
          overlayColor="#050010"
        />
      </div>
    </section>
  );
};
