import * as React from "react";
import { SlotText } from "../SlotText";

interface HeroProps {
  title: string;
  onComplete?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ title, onComplete }) => {
  return (
    <header className="w-full min-h-[412px] bg-black flex items-center justify-center tracking-tighter">
      <SlotText text={title} onComplete={onComplete} />
    </header>
  );
};
