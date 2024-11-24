"use client";

import LogoIcon from "@/icons/LogoIcon";
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
    color: "#9f5e26",
  },
  Venus: {
    orbitRadius: 0.72 * EARTH_ORBIT_RADIUS,
    orbitPeriod: 225,
    size: 0.95 * EARTH_RADIUS,
    color: "#beb768",
  },
  Earth: {
    orbitRadius: 1 * EARTH_ORBIT_RADIUS,
    orbitPeriod: 365,
    size: EARTH_RADIUS,
    color: "#11abe9",
  },
  Mars: {
    orbitRadius: 1.52 * EARTH_ORBIT_RADIUS,
    orbitPeriod: 687,
    size: 0.53 * EARTH_RADIUS,
    color: "#cf3921",
  },
  Jupiter: {
    orbitRadius: (5.2 / 2) * EARTH_ORBIT_RADIUS,
    orbitPeriod: 4331,
    size: (11.2 / 2) * EARTH_RADIUS,
    color: "#c76e2a",
  },
  Saturn: {
    orbitRadius: (9.54 / 2) * EARTH_ORBIT_RADIUS,
    orbitPeriod: 10747,
    size: (9.45 / 2) * EARTH_RADIUS,
    color: "#e7c194",
  },
  Uranus: {
    orbitRadius: (19.2 / 2) * EARTH_ORBIT_RADIUS,
    orbitPeriod: 30589,
    size: (4.01 / 2) * EARTH_RADIUS,
    color: "#b5e3e3",
  },
  Neptune: {
    orbitRadius: (30.1 / 2) * EARTH_ORBIT_RADIUS,
    orbitPeriod: 59800,
    size: (3.88 / 2) * EARTH_RADIUS,
    color: "#175e9e",
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
  background: radial-gradient(
    ellipse at center,
    #ffd000 1%,
    #f9b700 39%,
    #f9b700 39%,
    #e06317 100%
  );
  border-radius: 50%;
  box-shadow: 0 0 50px rgba(255, 223, 0, 0.8);
  box-shadow: 0 0 10px 2px rgba(255, 107, 0, 0.4),
    0 0 22px 11px rgba(255, 203, 0, 0.13);
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
  background-color: rgba(255, 255, 255, 0.2);
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: #000000b3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ec4899;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  width: 50%;
  min-width: 400px;
  max-width: 500px;
`;

const ModalButton = styled.button<{ secondary?: boolean }>`
  margin-top: 20px;
  padding: 10px 20px;
  width: 100%;
  background: ${(props) => (props.secondary ? "#080808" : "white")};
  color: ${(props) => (props.secondary ? "white" : "#080808")};
  border: ${(props) => (props.secondary ? "1px solid #242424" : "none")};
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;

  &:hover {
    background: #444;
  }
`;

const OrbitAnimation = () => {
  const [scale, setScale] = React.useState(1.6);
  const [duration, setDuration] = React.useState(100);
  const [showModal, setShowModal] = React.useState(true); // State to show/hide modal

  const zoomIn = () => setScale((prev) => prev + 0.05);
  const zoomOut = () => {
    setScale((prev) => (prev > 0.05 ? prev - 0.05 : prev - 0.005));
  };

  const animateScaleOut = () => {
    let currentScale = scale;
    const interval = setInterval(() => {
      if (currentScale <= 0.001) {
        clearInterval(interval);
      } else {
        currentScale = Math.max(currentScale - 0.02, 0.001);
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
      {/* Welcome Modal */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <div className="flex flex-col items-center justify-center gap-3">
              <LogoIcon height={50} width={50} className="fill-pink-500" />
              <h1 className="text-3xl font-semibold">
                Welcome to <i>cosma</i>.
              </h1>
            </div>
            <br />
            <p className="text-sm font-semibold text-gray-700">
              Our place in the universe is incredibly unpriviledged and mundane
              (at least according to Copernicus). Though the Copernican
              Principle is a widely accepted phenomenon, the <i>true</i> scale
              of its physical manifestation is, at least to me, widely
              underappreciated by most. Ergo, what better way to appreciate the
              wonders of astrophysics and cosmology than an interactive
              visualizer of just how small we truly are! Also, wouldn't it be
              cool if this app could double as a way to gain a sense for the
              differences in elements like orbital period, radial dimensions,
              and much more within the planets of our the Solar System? You're
              in luck. Enjoy! :).
            </p>
            <br />
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="flex items-center justify-center gap-3 w-full">
                <ModalButton onClick={() => setShowModal(false)}>
                  🚀 Launch
                </ModalButton>
                <ModalButton onClick={() => setShowModal(false)} secondary>
                  📜 See docs
                </ModalButton>
              </div>
              <p className="text-xs font-semibold text-gray-600">
                Made with ❤️ by Filippo Fonseca. Final project for Yale's ASTR
                170.
              </p>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Control Panel */}
      <ControlPanel>
        <ControlButton onClick={zoomIn}>Zoom In</ControlButton>
        <ControlButton onClick={zoomOut}>Zoom Out</ControlButton>
        <ControlButton
          onClick={() => {
            setScale(1.6);
            animateScaleOut();
          }}
        >
          Auto Scale Out
        </ControlButton>
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
};

export default OrbitAnimation;
