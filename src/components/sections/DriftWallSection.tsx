import React, { useState, useEffect, useMemo } from "react";
import DriftWall, { type DriftWallItem } from "../ui/DriftWall";
import "./DriftWallSection.css";

export const DriftWallSection: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = () => {
  const basePath = import.meta.env.BASE_URL;

  const [columns, setColumns] = useState<number>(12);
  const [tileWidth, setTileWidth] = useState<number>(240);
  const [tileHeight, setTileHeight] = useState<number>(160);
  const [gap, setGap] = useState<number>(18);
  const [tilt, setTilt] = useState<number>(12);
  const [turn, setTurn] = useState<number>(-10);
  const [roll, setRoll] = useState<number>(-8);
  const [speed, setSpeed] = useState<number>(36);

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setColumns(5);
        setTileWidth(110);
        setTileHeight(76);
        setGap(10);
        setTilt(7);
        setTurn(-3);
        setRoll(-2);
        setSpeed(28);
      } else if (w < 768) {
        setColumns(6);
        setTileWidth(130);
        setTileHeight(90);
        setGap(12);
        setTilt(9);
        setTurn(-5);
        setRoll(-4);
        setSpeed(32);
      } else if (w < 1200) {
        setColumns(12);
        setTileWidth(200);
        setTileHeight(135);
        setGap(16);
        setTilt(12);
        setTurn(-10);
        setRoll(-8);
        setSpeed(36);
      } else if (w < 1600) {
        setColumns(15);
        setTileWidth(235);
        setTileHeight(155);
        setGap(18);
        setTilt(12);
        setTurn(-10);
        setRoll(-8);
        setSpeed(38);
      } else {
        setColumns(18);
        setTileWidth(260);
        setTileHeight(172);
        setGap(20);
        setTilt(12);
        setTurn(-10);
        setRoll(-8);
        setSpeed(40);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

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
