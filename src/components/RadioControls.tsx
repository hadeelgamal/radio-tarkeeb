import * as React from "react";
import { Meter } from "./Meter";
import { Knob } from "./Knob";
import staticAudio from '../assets/static.wav';

export const RadioControls: React.FC = () => {
  const [rotation, setRotation] = React.useState(-165);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const knobRef = React.useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout>();
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // FM range and snapping
  const minFreq = 88;
  const maxFreq = 110;
  const step = 0.5;
  const maxAngle = 270;

  // Snap frequency to 0.2 MHz steps
  const rawFreq = minFreq + ((rotation + 165) / maxAngle) * (maxFreq - minFreq);
  const frequency = Math.round(rawFreq / step) * step;

  // Define the target frequency and tolerance
  const targetFreq = 98.5; // Example frequency to tune into
  const tolerance = 0.2; // ±0.2 MHz tolerance

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
    const isInRange = Math.abs(frequency - targetFreq) <= tolerance;
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
  }, [frequency, isInitialized]);

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
      const snappedAngle = ((frequency - minFreq) / (maxFreq - minFreq)) * maxAngle - 165;
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

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center">
      <div className="relative w-[1000px] mt-40">
        <div className="w-full">
          <Meter frequency={frequency} />
        </div>
        
        <div
          ref={knobRef}
          className="absolute w-[150px] h-[150px] top-[200px] mt-10 left-1/2 cursor-pointer select-none"
          style={{ 
            transform: `translateX(-50%) rotate(${rotation + 90}deg)`,
            transformOrigin: "center center",
            transition: isScrolling ? 'none' : 'transform 0.15s ease-out'
          }}
        >
          <Knob />
        </div>

        <div className="absolute top-[460px] left-1/2 -translate-x-1/2 text-white text-xl tracking-wide">
          {frequency.toFixed(1)} MHz
        </div>

        {/* Red lamp indicator */}
        <div className="absolute top-[500px] left-1/2 -translate-x-1/2 flex items-center gap-2">
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
      </div>
    </div>
  );
}; 