import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import LogoSvg from '../assets/logo-01.svg?react';
import staticAudio from '../assets/static.wav';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const elements = logoRef.current?.querySelectorAll('*');
    if (!elements) return;

    const tl = gsap.timeline({ onComplete });

    // 1. Set initial scattered state
    gsap.set(elements, {
      x: () => gsap.utils.random(-300, 300),
      y: () => gsap.utils.random(-300, 300),
      opacity: 0,
    });

    // 2. Animate into position
    tl.to(elements, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: 'power3.out',
    });

    // 3. Glitch effect: rapid displacements
    tl.to(
      elements,
      {
        x: () => gsap.utils.random(-10, 10),
        y: () => gsap.utils.random(-10, 10),
        repeat: 3,
        yoyo: true,
        duration: 0.05,
        ease: 'rough({strength: 1, points: 20, template: none, taper: none, randomize: true})',
      },
      '+=0.2' // wait a bit after settle
    );

    // 4. Fade out the whole splash screen container
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onStart: () => {
        if (audioRef.current) {
          gsap.to(audioRef.current, {
            volume: 0,
            duration: 0.8,
            onComplete: () => {
              audioRef.current?.pause();
              audioRef.current = null;
            }
          });
        }
      }
    }, '+=0.1');

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onComplete]);

  const initializeAudio = () => {
    if (!audioRef.current) {
      try {
        audioRef.current = new Audio(staticAudio);
        audioRef.current.volume = 0.5;
        audioRef.current.muted = true;
        audioRef.current.loop = true;
        audioRef.current.play()
          .then(() => console.log('Audio started playing'))
          .catch(error => console.error('Error playing audio:', error));
      } catch (error) {
        console.error('Error setting up audio:', error);
      }
    }
  };

  const toggleMute = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      initializeAudio();
    }
    
    if (audioRef.current) {
      console.log('Toggling mute, current state:', audioRef.current.muted);
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
      console.log('New mute state:', audioRef.current.muted);
    }
  };

  return (
    <div 
      className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center" 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999
      }}
    >
      <div ref={logoRef}>
        <LogoSvg className="w-screen h-auto px-8" />
      </div>
      <button
        onClick={toggleMute}
        className="fixed bottom-8 right-8 bg-black/50 p-4 rounded-full text-white hover:text-white/80 transition-colors z-[10000]"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 10000
        }}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
    </div>
  );
}; 