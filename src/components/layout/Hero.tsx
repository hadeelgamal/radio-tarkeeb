import * as React from "react";
import { SlotText } from "../SlotText";

interface HeroProps {
  title: string;
  onComplete?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ title, onComplete }) => {
  return (
    <header className="w-full bg-black flex items-start justify-center">
      <SlotText text={title} onComplete={onComplete} />
    </header>
  );
};
