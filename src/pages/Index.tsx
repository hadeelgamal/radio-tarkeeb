import { useState } from "react";
import { Hero } from "../components/layout/Hero";
import { Navbar } from "../components/layout/Navbar";
import { Content } from "../components/layout/Content";

interface IndexProps {
  animationDone: boolean;
  onAnimationComplete: () => void;
}

export default function Index({ animationDone, onAnimationComplete }: IndexProps) {
  return (
    <div className="min-h-screen w-full bg-black m-0 p-0">
      <Hero title="Tarkeeb" onComplete={onAnimationComplete} />
      
      <div
        className={`transition-all duration-700 ease-out m-0 p-0 ${
          animationDone
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <Navbar />
        <Content text="Welcome to Tarkeeb Online Radio – where analog nostalgia meets digital sound. Tune in, loop out." />
      </div>
    </div>
  );
}
