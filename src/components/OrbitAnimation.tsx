"use client";

import React from "react";
import styled, { keyframes } from "styled-components";

const EARTH_RADIUS = 10; // Earth radius in pixels
const SUN_RADIUS = 200; // Sun radius in pixels

type PlanetData = {
  orbitRadius: number;
  orbitPeriod: number;
  size: number;
  color: string;
};

const EARTH_ORBIT_RADIUS = 150 + SUN_RADIUS; // Earth's orbit radius in million km

const PLANETARY_DATA: Record<string, PlanetData> = {
  Mercury: {
    orbitRadius: 0.39 * EARTH_ORBIT_RADIUS, // 57.9 / 149.6
    orbitPeriod: 88, // in Earth days
    size: 0.45 * EARTH_RADIUS, // relative to Earth's radius
    color: "gray",
  },
  Venus: {
    orbitRadius: 0.72 * EARTH_ORBIT_RADIUS, // 108.2 / 149.6
    orbitPeriod: 225, // in Earth days
    size: 0.95 * EARTH_RADIUS, // relative to Earth's radius
    color: "yellow",
  },
  Earth: {
    orbitRadius: 1 * EARTH_ORBIT_RADIUS, // Earth is the reference
    orbitPeriod: 365, // in Earth days
    size: EARTH_RADIUS,
    color: "blue",
  },
  Mars: {
    orbitRadius: 1.52 * EARTH_ORBIT_RADIUS, // 227.9 / 149.6
    orbitPeriod: 687, // in Earth days
    size: 0.53 * EARTH_RADIUS, // relative to Earth's radius
    color: "red",
  },
  Jupiter: {
    orbitRadius: (5.2 / 2) * EARTH_ORBIT_RADIUS, // 778.3 / 149.6
    orbitPeriod: 4331, // in Earth days
    size: (11.2 / 2) * EARTH_RADIUS, // relative to Earth's radius
    color: "orange",
  },
  Saturn: {
    orbitRadius: (9.54 / 2) * EARTH_ORBIT_RADIUS, // 1427 / 149.6
    orbitPeriod: 10747, // in Earth days
    size: (9.45 / 2) * EARTH_RADIUS, // relative to Earth's radius
    color: "gold",
  },
  Uranus: {
    orbitRadius: (19.2 / 2) * EARTH_ORBIT_RADIUS, // 2871 / 149.6
    orbitPeriod: 30589, // in Earth days
    size: (4.01 / 2) * EARTH_RADIUS, // relative to Earth's radius
    color: "lightblue",
  },
  Neptune: {
    orbitRadius: (30.1 / 2) * EARTH_ORBIT_RADIUS, // 4497.1 / 149.6
    orbitPeriod: 59800, // in Earth days
    size: (3.88 / 2) * EARTH_RADIUS, // relative to Earth's radius
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
`;

const OrbitPath = styled.div<{ radius: number }>`
  position: absolute;
  width: ${(props) => props.radius * 2}px;
  height: ${(props) => props.radius * 2}px;
  border: 2px dashed rgba(255, 255, 255, 0.5);
  border-radius: 50%;
`;

const PlanetOrbit = styled.div<{ duration: number; radius: number }>`
  position: absolute;
  animation: ${(props) => orbitAnimation(props.radius)}
    ${(props) => props.duration}s linear infinite;
`;

const renderPlanetWithOrbit = (
  name: string,
  { orbitRadius, orbitPeriod, size, color }: PlanetData
) => {
  const orbitDuration = determineOrbitDurationInSec(orbitPeriod);
  return (
    <React.Fragment key={name}>
      <OrbitPath radius={orbitRadius} />
      <PlanetOrbit duration={orbitDuration} radius={orbitRadius}>
        <Planet size={size} color={color} />
      </PlanetOrbit>
    </React.Fragment>
  );
};

export default function OrbitAnimation() {
  const [scale, setScale] = React.useState(1);

  return (
    <>
      <button
        onClick={() => setScale((prev) => Math.max(prev - 0.05, 0.05))}
        style={{ backgroundColor: "red", zIndex: 999 }}
      >
        Zoom out
      </button>
      <OrbitContainer scale={scale}>
        <Sun />
        {Object.entries(PLANETARY_DATA).map(([name, data]) =>
          renderPlanetWithOrbit(name, data)
        )}
      </OrbitContainer>
    </>
  );
}
