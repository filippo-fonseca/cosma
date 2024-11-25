import React from "react";
import { IconProps } from ".";

const PlayIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="512"
      height="512"
      {...props}
    >
      <path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,21c-4.963,0-9-4.038-9-9S7.037,3,12,3s9,4.038,9,9-4.037,9-9,9Zm3.914-7.999l-5.202,2.85c-.766.431-1.712-.123-1.712-1.001v-5.699c0-.879.946-1.432,1.712-1.001l5.202,2.85c.781.439.781,1.563,0,2.002Z" />
    </svg>
  );
};

export default PlayIcon;
