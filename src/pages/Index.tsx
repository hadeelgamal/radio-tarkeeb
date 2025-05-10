import { useState } from "react";
import { Hero } from "../components/layout/Hero";
import { Navbar } from "../components/layout/Navbar";
import { RadioControls } from "../components/RadioControls";

interface IndexProps {
  animationDone: boolean;
  onAnimationComplete: () => void;
}

export default function Index({ animationDone, onAnimationComplete }: IndexProps) {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
    onAnimationComplete();
  };

  return (
    <div className="h-screen w-full bg-black overflow-hidden">
      {showSplash && <Hero title="Tarkeeb" onComplete={handleSplashComplete} />}
      
      <div
        className={`transition-all duration-700 ease-out h-full ${
          !showSplash
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] pb-20">
          <RadioControls />
        </div>
      </div>
    </div>
  );
}
