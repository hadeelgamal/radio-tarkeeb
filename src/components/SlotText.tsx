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
  const containerRef = useRef<HTMLDivElement>(null);

  // Container animation - runs once on mount
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      {
        y: -100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    );
  }, []); // Empty dependency array means this runs once

  // Slot machine animation - runs once on mount
  useEffect(() => {
    reelRefs.current = reelRefs.current.slice(0, text.length);

    const tl = gsap.timeline();

    reelRefs.current.forEach((reelRef, index) => {
      if (!reelRef) return;
    
      const finalPosition = -((REPEAT_COUNT - 1) * CHAR_HEIGHT);
      gsap.set(reelRef, { y: 0 });
    
      tl.to(
        reelRef,
        {
          y: finalPosition,
          duration: 2.2,
          ease: "power4.inOut",
          delay: index * 0.05, // faster stagger
          onComplete: () => {
            if (index === text.length - 1) {
              onComplete?.();
            }
          },
        },
        index * 0.05
      );
    });

    return () => {
      reelRefs.current.forEach((ref) => {
        if (ref) gsap.killTweensOf(ref);
      });
    };
  }, []); // Empty dependency array means this runs once

  return (
    <div ref={containerRef} className="slot-text-container tracking-[-0.1em]">
      {text.split("").map((char, i) => (
        <div key={i} className="slot-column">
          <div className="slot-reel" ref={(el) => (reelRefs.current[i] = el)}>
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
