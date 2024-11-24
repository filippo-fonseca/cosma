"use client";

import React from "react";
import OrbitAnimation from "../components/OrbitAnimation";

export default function Home() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="flex items-center justify-center h-screen bg-black">
      <OrbitAnimation />
      <div
        className="absolute bottom-3 left-3 rounded-full p-4"
        onClick={toggleMusic}
      >
        Click
      </div>
      <audio ref={audioRef} loop>
        <source src="/interstellar.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </main>
  );
}
