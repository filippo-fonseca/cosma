import React from "react";
import { IconProps } from ".";

const MinusIcon = (props: IconProps) => {
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
      <path d="m17,12c0,.829-.671,1.5-1.5,1.5h-7c-.829,0-1.5-.671-1.5-1.5s.671-1.5,1.5-1.5h7c.829,0,1.5.671,1.5,1.5Zm7-6.5v13c0,3.033-2.467,5.5-5.5,5.5H5.5c-3.033,0-5.5-2.467-5.5-5.5V5.5C0,2.467,2.467,0,5.5,0h13c3.033,0,5.5,2.467,5.5,5.5Zm-3,0c0-1.378-1.122-2.5-2.5-2.5H5.5c-1.378,0-2.5,1.122-2.5,2.5v13c0,1.378,1.122,2.5,2.5,2.5h13c1.378,0,2.5-1.122,2.5-2.5V5.5Z" />
    </svg>
  );
};

export default MinusIcon;
