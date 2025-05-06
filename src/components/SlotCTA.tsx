import * as React from "react";
import { SlotText } from "./SlotText";

interface SlotCTAProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const SlotCTA: React.FC<SlotCTAProps> = ({ text, onClick, className = "" }) => {
  const [key, setKey] = React.useState(0);

  const handleMouseEnter = () => {
    setKey(prev => prev + 1);
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      className={`
        relative
        px-1 py-0.5
        rounded-full
        bg-black/20
        backdrop-blur-sm
        border border-white/10
        hover:bg-black/30
        hover:border-white/20
        hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
        transition-all
        duration-300
        text-white text-[6px] font-medium
        scale-[0.25]
        flex items-center gap-8
        ${className}
      `}
    >
      <SlotText 
        key={key}
        text={text} 
      />
      <span className="text-[200px] flex items-center justify-center">→</span>
    </button>
  );
}; 