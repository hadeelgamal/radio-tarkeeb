import type { FC } from 'react';
import FrequencyBar from './FrequencyBar';

const RadioPlayer: FC = () => (
  <div className="flex flex-col items-center gap-8 w-full">
    <div className="w-full flex justify-center">
      <FrequencyBar />
    </div>
    <div className="flex justify-center">
      <img src="/knob.svg" width={180} height={180} alt="Knob" />
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
      <span className="text-sm text-red-500">LIVE</span>
    </div>
  </div>
);

export default RadioPlayer;
