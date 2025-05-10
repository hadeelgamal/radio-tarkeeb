import * as React from "react";
import { gsap } from "gsap";

interface ContentProps {
  text: string;
}

export const Content: React.FC<ContentProps> = ({ text }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const hasPlayedRef = React.useRef(false);
  const lastScrollY = React.useRef(0);
  const vignetteRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      if (videoRef.current) {
        if (isScrollingDown) {
          // Play video when scrolling down
          if (!hasPlayedRef.current) {
            // First time playing
            gsap.set(videoRef.current, { 
              scale: 0.9,
              x: window.innerWidth * 0.5 // Position at rightmost edge
            });

            // Animate vignette opacity
            gsap.fromTo(vignetteRef.current,
              { opacity: 0 },
              { 
                opacity: 1,
                duration: 1.5,
                ease: "power2.inOut"
              }
            );
          }
          videoRef.current.play();
          hasPlayedRef.current = true;
        } else if (!isScrollingDown && hasPlayedRef.current) {
          // Rewind video when scrolling up
          if (videoRef.current.currentTime > 0) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 0.1);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && !hasPlayedRef.current) {
            videoRef.current.play();
            hasPlayedRef.current = true;
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = React.useCallback(() => {
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        scale: 1.1,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        scale: 0.9,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <main className="w-full bg-black">
      <div className="pl-[668px] pr-[140px] pt-[180px] pb-[80px]">
        <div className="max-w-[700px] text-[18px] md:text-[24px] lg:text-[28px] text-white font-light leading-tight md:leading-[36px] text-left">
          {text}
        </div>
      </div>

      <div 
        ref={containerRef}
        className="w-screen h-screen overflow-hidden relative"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          className="w-[100vw] h-[100vh] object-cover"
        >
          <source src="/20250506_2056_Mesmerizing Liquid Geometry_simple_compose_01jtkbwq3jerqard1mrbrhzmps.mp4" type="video/mp4" />
        </video>
        <div 
          ref={vignetteRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)',
            mixBlendMode: 'multiply'
          }}
        />
      </div>
    </main>
  );
};
