import * as React from "react";
import { RadioControls } from "./RadioControls";

export const RadioPlayer: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-black">
      <div className="relative w-[1000px] mt-20">
        <RadioControls />
      </div>
    </div>
  );
}; 