import * as React from "react";
import { SlotText } from "../SlotText";
import { gsap } from "gsap";

interface HeroProps {
  title: string;
  onComplete?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ title, onComplete }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Set a timeout to call onComplete after the animation
    const timeout = setTimeout(() => {
      onComplete?.();
    }, 3000); // Wait 3 seconds for the animation to complete

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <header 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full bg-black flex items-center justify-center z-50"
    >
      <SlotText text={title} />
    </header>
  );
};
