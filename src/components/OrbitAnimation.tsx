"use client";

import styled, { keyframes } from "styled-components";

const orbitAnimation = keyframes`
  0% {
    transform: rotate(0deg) translateX(200px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(200px) rotate(-360deg);
  }
`;

const Sun = styled.div`
  width: 80px;
  height: 80px;
  background: yellow;
  border-radius: 50%;
  box-shadow: 0 0 50px rgba(255, 223, 0, 0.8);
`;

const Earth = styled.div`
  width: 40px;
  height: 40px;
  background: blue;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 255, 0.8);
`;

const OrbitContainer = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrbitPath = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border: 2px dashed rgba(255, 255, 255, 0.5);
  border-radius: 50%;
`;

const EarthOrbit = styled.div`
  position: absolute;
  animation: ${orbitAnimation} 10s linear infinite;
`;

export default function OrbitAnimation() {
  return (
    <OrbitContainer>
      <Sun />
      <OrbitPath />
      <EarthOrbit>
        <Earth />
      </EarthOrbit>
    </OrbitContainer>
  );
}
