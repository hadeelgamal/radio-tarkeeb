import type { FC } from 'react';
import { stations } from '../data/stations';

const minFreq = 1.0;
const maxFreq = 110.0;

function scaleFreq(freq: number): string {
  const normalized = (freq - minFreq) / (maxFreq - minFreq);
  const scaled = Math.pow(normalized, 0.6);
  return `${scaled * 100}%`;
}

interface FrequencyBarProps {
  currentFrequency: number;
}

const FrequencyBar: FC<FrequencyBarProps> = ({ currentFrequency }) => {
  const nearestStation = stations.reduce((prev, curr) => {
    return Math.abs(curr.freq - currentFrequency) < Math.abs(prev.freq - currentFrequency) ? curr : prev;
  });

  return (
    <div className="relative w-full max-w-5xl h-24 mx-auto mt-10">
      {/* Horizontal Frequency Line */}
      <div className="absolute top-1/2 w-full h-[3px] bg-sky-200 rounded-full" />

      {/* Center Red Needle */}
      {/* <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[4px] h-10 bg-red-500 opacity-80" /> */}

      {/* Station Ticks */}
      {stations.map((station) => (
        <div
          key={station.name}
          className="absolute top-[25%] flex flex-col items-center -translate-x-1/2"
          style={{ left: scaleFreq(station.freq) }}
        >
          <div className={`w-[2px] rounded-full h-6 ${station === nearestStation ? 'bg-red-500' : 'bg-white'} mb-1`} />
          <span className="text-xs text-cyan-300 whitespace-nowrap">
            {station.freq.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FrequencyBar; 