import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

interface VolumeButtonProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export const VolumeButton: React.FC<VolumeButtonProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      width: hovered ? 180 : 48,
      duration: 0.3,
      ease: 'power2.inOut'
    });
  }, [hovered]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const percent = value * 100;
      slider.style.background = `linear-gradient(to right, #06b6d4 ${percent}%, rgba(6, 182, 212, 0.2) ${percent}%)`;
    }
  }, [value]);

  return (
    <div
      className={`relative flex items-center ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={containerRef}
        className="
          h-12 w-12 flex items-center px-2 overflow-visible 
          bg-white border border-black/10 rounded-full 
          transition-all duration-300
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-6 h-6 fill-black flex-shrink-0"
        >
          <path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
        </svg>

        <input
          ref={sliderRef}
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={`
            ml-2 transition-opacity duration-200 w-28
            appearance-none bg-transparent
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:hover:bg-cyan-400
            [&::-webkit-slider-thumb]:active:bg-cyan-600
            [&::-webkit-slider-runnable-track]:h-0.5
            [&::-webkit-slider-runnable-track]:rounded-full
            ${hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        />
      </div>
    </div>
  );
}; 