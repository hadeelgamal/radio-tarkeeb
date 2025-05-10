import * as React from "react";
import { Meter } from "./Meter";
import { Knob } from "./Knob";
import staticAudio from '../assets/static.wav';
import { DropdownMenu } from "../components/ui/DropdownMenu";
import { GenericButton } from "../components/ui/GenericButton";
import { VolumeSlider } from "../components/ui/VolumeSlider";

interface Station {
  label: string;
  frequency: number;
}

export const RadioControls: React.FC = () => {
  const [rotation, setRotation] = React.useState(-165);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [volume, setVolume] = React.useState(1);
  const knobRef = React.useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout>();
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const stations: Station[] = [
    { label: "Tarkeeb 98.5", frequency: 98.5 },
    { label: "Studio 95.2", frequency: 95.2 },
    { label: "Archive 102.3", frequency: 102.3 },
  ];

  const dropdownItems = [
    {
      label: "Latest Episodes",
      onClick: () => console.log("Latest Episodes clicked")
    },
    {
      label: "Popular Shows",
      onClick: () => console.log("Popular Shows clicked")
    },
    {
      label: "Categories",
      onClick: () => console.log("Categories clicked")
    },
    {
      label: "About Us",
      onClick: () => console.log("About Us clicked")
    }
  ];

  // FM range and snapping
  const minFreq = 88;
  const maxFreq = 110;
  const step = 0.5;
  const maxAngle = 270;

  // Snap frequency to 0.2 MHz steps
  const rawFreq = minFreq + ((rotation + 165) / maxAngle) * (maxFreq - minFreq);
  const frequency = Math.round(rawFreq / step) * step;

  // Find current station
  const currentStation = stations.find(
    (s) => Math.abs(s.frequency - frequency) < 0.2
  );

  // Helper to convert frequency to rotation
  const freqToRotation = (freq: number) =>
    ((freq - minFreq) / (maxFreq - minFreq)) * maxAngle - 165;

  // Handle station change
  const handleStationChange = (freq: number) => {
    const snappedAngle = freqToRotation(freq);
    setRotation(snappedAngle);
  };

  // Initialize audio on component mount
  React.useEffect(() => {
    // Create and configure audio element
    const audio = new Audio(staticAudio);
    audio.loop = true;
    audio.volume = 1.0; // Set volume to maximum
    audioRef.current = audio;

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Handle frequency changes
  React.useEffect(() => {
    if (!audioRef.current || !isInitialized) return;

    // Check if we're within the target frequency range
    const isInRange = Math.abs(frequency - currentStation?.frequency) <= 0.2;
    console.log('Frequency:', frequency, 'In range:', isInRange);

    if (isInRange) {
      // Stop static and play music stream
      if (audioRef.current.src === staticAudio) {
        audioRef.current.pause();
        // TODO: Add your music stream URL here
        // audioRef.current.src = 'YOUR_MUSIC_STREAM_URL';
        // audioRef.current.play().catch(error => {
        //   console.error('Error playing music:', error);
        // });
      }
    } else {
      // Play static if not in range
      if (audioRef.current.src !== staticAudio) {
        audioRef.current.pause();
        audioRef.current.src = staticAudio;
        audioRef.current.play().catch(error => {
          console.error('Error playing static:', error);
        });
      }
    }
  }, [frequency, isInitialized, currentStation]);

  const handleWheel = React.useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsScrolling(true);
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    const delta = e.deltaY / 3;
    
    setRotation(prev => {
      const next = prev + delta;
      return Math.max(-165, Math.min(105, next)); // total range = 270°
    });

    // Initialize audio on first interaction
    if (!isInitialized && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsInitialized(true);
      }).catch(error => {
        console.error('Error starting audio:', error);
      });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      // Snap rotation to match snapped frequency
      const snappedAngle = freqToRotation(frequency);
      setRotation(snappedAngle);
    }, 100);
  }, [frequency, maxAngle, maxFreq, minFreq, step, isInitialized]);

  React.useEffect(() => {
    const knob = knobRef.current;
    if (!knob) return;

    knob.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      knob.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleWheel]);

  // Handle volume changes
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      <div className="w-full">
        <Meter frequency={frequency} />
      </div>
      
      <div className="absolute w-full flex justify-center">
        <div
          ref={knobRef}
          className="w-[150px] h-[150px] top-[200px] mt-20 cursor-pointer select-none"
          style={{ 
            transform: `rotate(${rotation + 90}deg)`,
            transformOrigin: "center center",
            transition: isScrolling ? 'none' : 'transform 0.15s ease-out'
          }}
        >
          <Knob />
        </div>
      </div>

      {/* Controls Container */}
      <div className="absolute top-[440px]  left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 w-[800px]">
        <GenericButton 
          label="More Episode" 
          withArrow={true}
          onClick={() => console.log('Play now clicked')}
        />
        
        <div className="w-8" /> {/* Spacer */}

        <DropdownMenu
          activeLabel={currentStation?.label ?? `${frequency.toFixed(1)} MHz`}
          items={stations.map(station => ({
            label: station.label,
            onClick: () => handleStationChange(station.frequency),
          }))}
        />
        
        <div className="w-8" /> {/* Spacer */}
        
        <VolumeSlider
          value={volume}
          onChange={setVolume}
          className="bg-black/50  rounded-full"
        />
      </div>

      {/* Red lamp indicator */}
      <div className="absolute top-[150px] left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div 
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isInitialized 
              ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' 
              : 'bg-red-500/20'
          }`}
        />
        <span className="text-white/60 text-sm">
          {isInitialized ? 'ON AIR' : 'OFF'}
        </span>
      </div>
    </>
  );
}; 