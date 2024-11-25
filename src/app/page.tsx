"use client";

import React from "react";
import OrbitAnimation from "../components/OrbitAnimation";
import VolumeOnIcon from "@/icons/VolumeOnIcon";
import VolumeOffIcon from "@/icons/VolumeOffIcon";

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
        className={`absolute bottom-3 left-3 rounded-full hover:opacity-50 p-4 ${
          isPlaying ? "bg-pink-500" : "bg-pink-300"
        } cursor-pointer`}
        onClick={toggleMusic}
      >
        {isPlaying ? (
          <VolumeOnIcon width={15} height={15} fill="white" />
        ) : (
          <VolumeOffIcon width={15} height={15} className="fill-pink-50" />
        )}
      </div>
      <audio ref={audioRef} loop>
        <source src="/interstellar.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </main>
  );
}
