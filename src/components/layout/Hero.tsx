import * as React from "react";

interface HeroProps {
  title: string;
}

export const Hero: React.FC<HeroProps> = ({ title }) => {
  return (
    <header className="items-center flex min-h-[412px] w-full flex-col overflow-hidden text-[360px] text-white whitespace-nowrap text-center uppercase leading-[1.2] bg-black pb-28 max-md:max-w-full max-md:text-[40px] max-md:pb-[100px]">
      <div className="items-center flex w-full flex-col flex-1 gap-[var(--sds-size-space-0)] max-md:max-w-full max-md:text-[40px]">
        <div className="text-white min-h-[412px] max-w-full w-[1436px] max-md:max-w-full max-md:text-[40px]">
          {title}
        </div>
      </div>
    </header>
  );
};