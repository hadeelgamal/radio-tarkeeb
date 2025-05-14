import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import LogoSvg from "../../assets/logo-01.svg?react";
import { GlitchEffect } from '../ui/GlitchEffect';

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  showLogo?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ showLogo = true }) => {
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
        <div id="navbar-logo" className="h-12 w-[93.039px] relative overflow-hidden">
          <GlitchEffect>
            {showLogo && <LogoSvg className="h-full w-auto [&>path]:fill-white" />}
          </GlitchEffect>
        </div>
        <div className="flex items-center gap-24 md:gap-32 text-[16px] uppercase">
          <Link to="/playback" className="text-white hover:text-gray-300 transition-colors">
            Playback
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300 transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-300 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};
