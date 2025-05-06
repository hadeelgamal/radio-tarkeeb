
import * as React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="justify-center items-stretch flex min-h-[72px] w-full flex-col text-[32px] uppercase tracking-[-0.32px] leading-none bg-black px-16 max-md:max-w-full max-md:px-5">
      <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
        <div className="self-stretch flex h-10 items-center text-white justify-center my-auto">
          <div className="self-stretch w-auto overflow-visible my-auto px-2">
            Radio Tarkeeb
          </div>
        </div>
        <div className="self-stretch flex min-w-60 items-center gap-8 text-white whitespace-nowrap justify-center my-auto max-md:max-w-full">
          <div className="self-stretch flex min-w-60 items-center gap-[40px_95px] flex-wrap my-auto max-md:max-w-full">
            <a href="#live" className="text-white self-stretch gap-1 my-auto hover:text-gray-300 transition-colors">
              Live
            </a>
            <a href="#playback" className="text-white self-stretch gap-1 my-auto hover:text-gray-300 transition-colors">
              Playback
            </a>
            <a href="#about" className="text-white self-stretch gap-1 my-auto hover:text-gray-300 transition-colors">
              About
            </a>
            <div className="self-stretch flex items-center gap-1 justify-center my-auto">
              <a href="#contact" className="text-white self-stretch gap-1 my-auto hover:text-gray-300 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
