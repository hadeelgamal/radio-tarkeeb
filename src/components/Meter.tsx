import MeterSvg from '../assets/meter-01.svg?react'
import { useState, useEffect, useRef } from 'react'

interface MeterProps {
  frequency: number;
}

export const Meter: React.FC<MeterProps> = ({ frequency }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorX, setIndicatorX] = useState(0);

  const minFreq = 88;
  const maxFreq = 110;

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.getBoundingClientRect().width;

    // These are relative % values from the original SVG range
    const minRatio = 485 / 1097.78;
    const maxRatio = 850 / 1097.78;

    const minX = containerWidth * minRatio;
    const maxX = containerWidth * maxRatio;

    const mappedX = minX + ((frequency - minFreq) / (maxFreq - minFreq)) * (maxX - minX);

    setIndicatorX(mappedX);
  }, [frequency]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[1097/163] overflow-visible"
      style={{
        '--st0-color': '#DB6D58',
        '--st1-color': '#B9EDF9',
      } as React.CSSProperties}
    >
      <MeterSvg className="w-full h-full [&_.st0]:fill-[#DB6D58] [&_.st1]:fill-[#B9EDF9]" />
      <div
        className="absolute top-[68px] w-[7px] h-[69px] bg-gradient-to-b from-[#E27A8F]/60 via-[#DB4733]/80 to-[#BC322E]"
        style={{
          left: `${indicatorX}px`,
          transition: 'left 0.2s ease-out',
        }}
      />
    </div>
  );
}