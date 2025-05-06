import * as React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between w-full min-h-[72px] bg-black pt-6 px-6 md:px-16 m-0">
      <div className="text-white text-[32px] uppercase tracking-[-0.32px]">
        Radio Tarkeeb
      </div>
<div className="flex items-center gap-20 md:gap-24 text-[32px] uppercase">
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
    </nav>
  );
};
