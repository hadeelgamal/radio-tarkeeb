import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SlotText.css';

interface SlotTextProps {
  text: string;
}

const CHAR_HEIGHT = 360; // Height of each character in pixels
const REPEAT_COUNT = 10; // Number of times to repeat each character

export const SlotText = ({ text }: SlotTextProps) => {
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Reset refs array to match text length
    reelRefs.current = reelRefs.current.slice(0, text.length);

    // Create a timeline for smooth animation
    const tl = gsap.timeline();

    // Animate each reel
    reelRefs.current.forEach((reelRef, index) => {
      if (!reelRef) return;

      // Calculate final position (9 * CHAR_HEIGHT for 10 copies)
      const finalPosition = -((REPEAT_COUNT - 1) * CHAR_HEIGHT);

      // Set initial position
      gsap.set(reelRef, { y: 0 });

      // Add animation to timeline with stagger
      tl.to(reelRef, {
        y: finalPosition,
        duration: 2.5,
        ease: "power4.inOut",
        delay: index * 0.1,
      }, index * 0.1);
    });

    return () => {
      // Cleanup animations
      reelRefs.current.forEach(ref => {
        if (ref) gsap.killTweensOf(ref);
      });
    };
  }, [text]);

  return (
    <div className="slot-text-container">
      {text.split('').map((char, i) => (
        <div key={i} className="slot-column">
          <div 
            className="slot-reel"
            ref={el => reelRefs.current[i] = el}
          >
            {/* Create array of repeated characters */}
            {Array.from({ length: REPEAT_COUNT }).map((_, j) => (
              <div key={j} className="slot-char">
                {char}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}; 