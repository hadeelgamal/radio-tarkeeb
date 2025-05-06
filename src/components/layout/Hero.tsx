import * as React from "react";
import { SlotText } from "../SlotText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  title: string;
  onComplete?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ title, onComplete }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        opacity: 0,
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={containerRef} className="w-full bg-black flex items-start justify-center">
      <SlotText text={title} onComplete={onComplete} />
    </header>
  );
};
