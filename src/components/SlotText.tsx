import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./SlotText.css";

interface SlotTextProps {
  text: string;
  onComplete?: () => void;
}

const CHAR_HEIGHT = 200; // Height of each character in pixels
const REPEAT_COUNT = 10; // Number of times to repeat each character

export const SlotText = ({ text, onComplete }: SlotTextProps) => {
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Reset refs array to match text length
    reelRefs.current = reelRefs.current.slice(0, text.length);

    // Create a timeline for smooth animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Call onComplete callback after a small delay to ensure all animations are done
        setTimeout(() => onComplete?.(), 100);
      }
    });

    // Animate each reel
    reelRefs.current.forEach((reelRef, index) => {
      if (!reelRef) return;
    
      const finalPosition = -((REPEAT_COUNT - 1) * CHAR_HEIGHT);
      gsap.set(reelRef, { y: 0 });
    
      tl.to(reelRef, {
        y: finalPosition,
        duration: 1.5,
        ease: "power4.inOut",
        delay: index * 0.05,
        onComplete: () => {
          // Only call onComplete after the LAST letter animates
          if (index === text.length - 1) {
            onComplete?.();
          }
        },
      }, index * 0.1);
    });
    
    return () => {
      // Cleanup animations
      reelRefs.current.forEach(ref => {
        if (ref) gsap.killTweensOf(ref);
      });
    };
  }, [text, onComplete]);

  return (
    <div className="slot-text-container tracking-[-0.1em]">
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
