import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Navbar: React.FC = () => {
  const navRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(navRef.current, { 
        position: 'relative',
        top: 0
      });

      // Change to sticky position on scroll
      ScrollTrigger.create({
        trigger: navRef.current,
        start: "top top",
        onEnter: () => {
          gsap.to(navRef.current, {
            position: 'sticky',
            top: 0,
            duration: 0.1
          });
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            position: 'relative',
            duration: 0.1
          });
        }
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="w-full bg-black pt-6 px-6 md:px-16 m-0 z-50">
      <div className="flex items-center justify-between min-h-[72px]">
        <div className="text-white text-[24px] uppercase tracking-[-0.32px]">
          Radio Tarkeeb
        </div>
        <div className="flex items-center gap-24 md:gap-32 text-[24px] uppercase">
          <a href="#live" className="text-white hover:text-gray-300 transition-colors">
            Live
          </a>
          <a href="#playback" className="text-white hover:text-gray-300 transition-colors">
            Playback
          </a>
          <a href="#about" className="text-white hover:text-gray-300 transition-colors">
            About
          </a>
          <a href="#contact" className="text-white hover:text-gray-300 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};
