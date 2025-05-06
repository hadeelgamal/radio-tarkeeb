
import * as React from "react";

interface HeroProps {
  title: string;
}

export const Hero: React.FC<HeroProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-center min-h-[412px] w-full overflow-hidden bg-black">
      <div className="text-[200px] sm:text-[240px] md:text-[300px] lg:text-[360px] text-white whitespace-nowrap uppercase leading-[1.2] text-center max-w-full px-4">
        {title}
      </div>
    </header>
  );
};
