import { useState, useEffect, useRef } from 'react';
import FrequencyBar from './FrequencyBar';
import { stations } from '../data/stations';
import SmartDropdownMenu from './SmartDropdownMenu';
import VolumeControl from './VolumeControl';
import PillButtonWithHoverIcon from './PillButtonWithHoverIcon';

const RadioPlayer = () => {
  const [frequency, setFrequency] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const knobRef = useRef<HTMLImageElement | null>(null);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const step = 0.5;
    const delta = e.deltaY > 0 ? -step : step;
    const newFrequency = Math.max(1.0, Math.min(110.0, frequency + delta));
    setFrequency(Number(newFrequency.toFixed(1)));
  };

  useEffect(() => {
    const knobEl = knobRef.current;
    if (knobEl) {
      knobEl.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (knobEl) {
        knobEl.removeEventListener('wheel', handleWheel);
      }
    };
  }, [frequency]);

  useEffect(() => {
    const normalizedFreq = (frequency - 1.0) / (110.0 - 1.0);
    const newRotation = normalizedFreq * 270;
    setRotation(newRotation);
  }, [frequency]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const nearestStation = stations.reduce((prev, curr) => {
        return Math.abs(curr.freq - frequency) < Math.abs(prev.freq - frequency) ? curr : prev;
      });
      setFrequency(nearestStation.freq);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [frequency]);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="w-full flex justify-center">
        <FrequencyBar currentFrequency={frequency} />
      </div>
      <div className="flex justify-center">
        <img
          ref={knobRef}
          src="/knob.svg"
          width={180}
          height={180}
          alt="Knob"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.1s ease-in-out',
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        <span className="text-sm text-red-500">LIVE</span>
      </div>
      <div className="flex flex-row justify-center items-center gap-20 mt-6 mr-20">
        <PillButtonWithHoverIcon />
        <SmartDropdownMenu currentFrequency={frequency} />
        <VolumeControl />

      </div>
    </div>
  );
};

export default RadioPlayer;
