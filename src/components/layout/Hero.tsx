import * as React from "react";
import { SlotText } from "../SlotText";

interface HeroProps {
  title: string;
}

export const Hero: React.FC<HeroProps> = ({ title }) => {
  return (
    <header className="w-screen min-h-[412px] bg-black flex items-center justify-center">
      <div className="w-full flex items-center justify-center">
        <SlotText text={title} />
      </div>
    </header>
  );
};
