import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VolumeControl = () => {
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setMuted(true);
    } else if (muted) {
      setMuted(false);
    }
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={toggleMute}
        className="flex items-center justify-center w-13 h-13 rounded-full bg-white hover:bg-white transition-colors"
      >
        {muted ? <VolumeX size={25} className="text-black" /> : <Volume2 size={25} className="text-black" />}
      </button>
      {hovered && (
        <div className="ml-2 flex items-center transition-all duration-300 ease-in-out">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default VolumeControl; 