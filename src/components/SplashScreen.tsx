import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import LogoSvg from '../assets/logo-01.svg?react';
import staticAudio from '../assets/static.wav';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const elements = logoWrapperRef.current?.querySelectorAll('*');
    if (!elements) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete
    });

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

    // 3. Glitch effect
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
      '+=0.2'
    );

    // 4. Reset position after glitch
    tl.to(elements, {
      x: 0,
      y: 0,
      duration: 0.3,
    });

    // 5. Calculate and animate to final position
    tl.add(() => {
      const splashEl = logoWrapperRef.current;
      const targetEl = document.getElementById('navbar-logo');
      if (!splashEl || !targetEl) return;

      const splashBox = splashEl.getBoundingClientRect();
      const targetBox = targetEl.getBoundingClientRect();

      const dx = targetBox.left - splashBox.left;
      const dy = targetBox.top - splashBox.top;
      const scaleX = targetBox.width / splashBox.width;
      const scaleY = targetBox.height / splashBox.height;
      const scale = Math.min(scaleX, scaleY); // uniform scale

      // Set splashEl to absolute for smooth transform
      splashEl.style.position = 'absolute';
      splashEl.style.top = '0';
      splashEl.style.left = '0';
      splashEl.style.transformOrigin = 'top left';

      gsap.to(splashEl, {
        x: dx,
        y: dy,
        scale,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
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
          splashEl.style.display = 'none';
          onComplete();
        },
      });
    }, "+=0.1");

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      tl.kill();
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
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center" 
      style={{ zIndex: 9999 }}
    >
      <div
        ref={logoWrapperRef}
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100vw',
          height: 'auto',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <LogoSvg className="w-full h-auto [&>path]:fill-white" />
      </div>
      <button
        onClick={toggleMute}
        className="fixed bottom-8 right-8 bg-black/50 p-4 rounded-full text-white hover:text-white/80 transition-colors"
        style={{ zIndex: 10000 }}
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