"use client";

import React from "react";
import styled, { keyframes } from "styled-components";

const EARTH_RADIUS = 10; // Earth radius in pixels
const SUN_RADIUS = 175; // Sun radius in pixels

type PlanetData = {
  orbitRadius: number;
  orbitPeriod: number;
  size: number;
  color: string;
};

const EARTH_ORBIT_RADIUS = 75 + SUN_RADIUS; // Earth's orbit radius in million km

const PLANETARY_DATA: Record<string, PlanetData> = {
  Mercury: {
    orbitRadius: 0.39 * EARTH_ORBIT_RADIUS,
    orbitPeriod: 88,
    size: 0.45 * EARTH_RADIUS,
    color: "gray",
  },
  Venus: {
    orbitRadius: 0.72 * EARTH_ORBIT_RADIUS,
    orbitPeriod: 225,
    size: 0.95 * EARTH_RADIUS,
    color: "yellow",
  },
  Earth: {
    orbitRadius: 1 * EARTH_ORBIT_RADIUS,
    orbitPeriod: 365,
    size: EARTH_RADIUS,
    color: "blue",
  },
  Mars: {
    orbitRadius: 1.52 * EARTH_ORBIT_RADIUS,
    orbitPeriod: 687,
    size: 0.53 * EARTH_RADIUS,
    color: "red",
  },
  Jupiter: {
    orbitRadius: (5.2 / 2) * EARTH_ORBIT_RADIUS,
    orbitPeriod: 4331,
    size: (11.2 / 2) * EARTH_RADIUS,
    color: "orange",
  },
  Saturn: {
    orbitRadius: (9.54 / 2) * EARTH_ORBIT_RADIUS,
    orbitPeriod: 10747,
    size: (9.45 / 2) * EARTH_RADIUS,
    color: "gold",
  },
  Uranus: {
    orbitRadius: (19.2 / 2) * EARTH_ORBIT_RADIUS,
    orbitPeriod: 30589,
    size: (4.01 / 2) * EARTH_RADIUS,
    color: "lightblue",
  },
  Neptune: {
    orbitRadius: (30.1 / 2) * EARTH_ORBIT_RADIUS,
    orbitPeriod: 59800,
    size: (3.88 / 2) * EARTH_RADIUS,
    color: "darkblue",
  },
};

const determineOrbitDurationInSec = (periodInDays: number) => {
  return 10 * (periodInDays / 365); // Scaled to Earth's year as 10 seconds
};

const orbitAnimation = (orbitRadius: number) => keyframes`
  0% {
    transform: rotate(0deg) translateX(${orbitRadius}px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(${orbitRadius}px) rotate(-360deg);
  }
`;

const Sun = styled.div`
  width: ${SUN_RADIUS}px;
  height: ${SUN_RADIUS}px;
  background: yellow;
  border-radius: 50%;
  box-shadow: 0 0 50px rgba(255, 223, 0, 0.8);
`;

const Planet = styled.div<{ size: number; color: string }>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  background: ${(props) => props.color};
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 255, 0.8);
`;

const OrbitContainer = styled.div<{ scale: number }>`
  transform: scale(${(props) => props.scale});
  transition: transform 0.3s ease; /* Smooth transition for scaling */
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
`;

const OrbitPath = styled.div<{ radius: number; scale: number }>`
  position: absolute;
  width: ${(props) => props.radius * 2}px;
  height: ${(props) => props.radius * 2}px;
  border: ${(props) =>
    props.scale > 0.4
      ? "2px dashed rgba(255, 255, 255, 0.7)"
      : "2px dashed white"};
  border-radius: 50%;
`;

const PlanetOrbit = styled.div<{ duration: number; radius: number }>`
  position: absolute;
  animation: ${(props) => orbitAnimation(props.radius)}
    ${(props) => props.duration}s linear infinite;
`;

const Star = styled.div<{ x: number; y: number; size: number }>`
  position: absolute;
  top: ${(props) => props.y}%;
  left: ${(props) => props.x}%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: white;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  text-align: center;
  pointer-events: none; /* Ensures it doesn’t interfere with user interactions */
`;

const renderStars = (scale: number) => {
  let amount;

  if (scale == 0.001) amount = 10;

  if (scale < 0.001) amount = 500;

  const stars = [];
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 2 + 1;
    stars.push(<Star key={i} x={x} y={y} size={size} />);
  }

  return (
    <>
      {stars}
      <TextOverlay>
        don't take things too seriously. remember, we are seriously
        insignificant.
      </TextOverlay>
    </>
  );
};

const Label = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -150%);
  font-size: 1rem;
  color: white;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8),
    0 0 10px rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.7);
  padding: 2px 6px;
  border-radius: 5px;
  pointer-events: none; /* Ensures it doesn’t interfere with user interactions */
`;

const renderPlanetWithOrbit = (
  name: string,
  scale: number,
  { orbitRadius, orbitPeriod, size, color }: PlanetData
) => {
  const orbitDuration = determineOrbitDurationInSec(orbitPeriod);
  return (
    <React.Fragment key={name}>
      <OrbitPath radius={orbitRadius} scale={scale} />
      <PlanetOrbit duration={orbitDuration} radius={orbitRadius}>
        <Planet size={size} color={color} />
        <Label>{name}</Label> {/* Add the label here */}
      </PlanetOrbit>
    </React.Fragment>
  );
};

const ControlPanel = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999; /* Ensures it is above other elements */
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
`;

const ControlButton = styled.button`
  padding: 5px 10px;
  background: #444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #666;
  }

  &:active {
    background: #222;
  }
`;

export default function OrbitAnimation() {
  const [scale, setScale] = React.useState(1.6);
  const [duration, setDuration] = React.useState(100);

  const zoomIn = () => setScale((prev) => prev + 0.05);
  const zoomOut = () => {
    setScale((prev) => (prev > 0.05 ? prev - 0.05 : prev - 0.005));
  };

  const animateScaleOut = () => {
    setScale(1.6);
    let currentScale = scale;
    const interval = setInterval(() => {
      if (currentScale <= 0.001) {
        clearInterval(interval);
      } else {
        currentScale = Math.max(currentScale - 0.02, 0.001); // Decrease scale
        setScale(currentScale);
      }
    }, duration);
  };

  React.useEffect(() => {
    if (scale <= 0.4) {
      setDuration(350);
    } else {
      setDuration(200);
    }
  }, [scale]);

  return (
    <>
      {/* Control Panel */}
      <ControlPanel>
        <ControlButton onClick={zoomIn}>Zoom In</ControlButton>
        <ControlButton onClick={zoomOut}>Zoom Out</ControlButton>
        <ControlButton onClick={animateScaleOut}>Auto Scale Out</ControlButton>
      </ControlPanel>

      {/* Orbit Animation */}
      {scale > 0.001 ? (
        <OrbitContainer scale={scale}>
          <Sun />
          {Object.entries(PLANETARY_DATA).map(([name, data]) =>
            renderPlanetWithOrbit(name, scale, data)
          )}
        </OrbitContainer>
      ) : (
        renderStars(scale)
      )}
    </>
  );
}
