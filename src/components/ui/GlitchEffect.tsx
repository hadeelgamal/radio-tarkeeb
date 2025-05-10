import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GlitchEffectProps {
  children: React.ReactNode;
  className?: string;
}

export const GlitchEffect: React.FC<GlitchEffectProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const glitchTimeline = gsap.timeline({ repeat: -1 });
    
    // Create glitch effect sequence
    glitchTimeline
      .to(containerRef.current, {
        x: '2px',
        y: '-2px',
        duration: 0.1,
        ease: 'power1.inOut'
      })
      .to(containerRef.current, {
        x: '-2px',
        y: '2px',
        duration: 0.1,
        ease: 'power1.inOut'
      })
      .to(containerRef.current, {
        x: '0px',
        y: '0px',
        duration: 0.1,
        ease: 'power1.inOut'
      })
      .to(containerRef.current, {
        opacity: 0.8,
        duration: 0.1,
        ease: 'power1.inOut'
      })
      .to(containerRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: 'power1.inOut'
      })
      .to({}, { duration: 2 }); // Pause between glitches

    return () => {
      glitchTimeline.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
    </div>
  );
}; 