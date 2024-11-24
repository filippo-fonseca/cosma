"use client";

import React from "react";
import styled, { keyframes } from "styled-components";

const EARTH_RADIUS = 40; // Earth radius in pixels
const SUN_RADIUS = 80; // Sun radius in pixels

type PlanetData = {
  orbitRadius: number;
  orbitPeriod: number;
  size: number;
  color: string;
};

const PLANETARY_DATA: Record<string, PlanetData> = {
  Earth: {
    orbitRadius: 200,
    orbitPeriod: 365, // days
    size: EARTH_RADIUS,
    color: "blue",
  },
  Mars: {
    orbitRadius: 300,
    orbitPeriod: 687, // days
    size: EARTH_RADIUS * 0.53,
    color: "red",
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

const OrbitContainer = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
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
  return (
    <OrbitContainer>
      <Sun />
      {Object.entries(PLANETARY_DATA).map(([name, data]) =>
        renderPlanetWithOrbit(name, data)
      )}
    </OrbitContainer>
  );
}
