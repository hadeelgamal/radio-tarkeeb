import * as React from "react";

interface ContentProps {
  text: string;
}

export const Content: React.FC<ContentProps> = ({ text }) => {
  return (
    <main className="w-full bg-black px-6 md:px-16 py-16 md:py-[120px] m-0">
      <div className="max-w-[700px] mx-auto text-[24px] md:text-[32px] lg:text-[40px] text-white font-light leading-tight md:leading-[48px]">
        {text}
      </div>
    </main>
  );
};
