import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface VolumeSliderProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updateValue(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      updateValue(e);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const updateValue = (e: MouseEvent | React.MouseEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    onChange(percentage);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (knobRef.current) {
      gsap.to(knobRef.current, {
        x: `${value * 100}%`,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  }, [value]);

  return (
    <div className={`relative flex items-center gap-2 ${className}`}>
      {/* Volume Icon */}
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
        />
      </svg>

      {/* Slider Track */}
      <div
        ref={sliderRef}
        className="relative h-1 w-32 bg-white/20 rounded-full cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        {/* Active Track */}
        <div
          className="absolute h-full bg-white rounded-full"
          style={{ width: `${value * 100}%` }}
        />
        
        {/* Knob */}
        <div
          ref={knobRef}
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full cursor-grab active:cursor-grabbing"
          style={{ left: 0 }}
        />
      </div>
    </div>
  );
}; 