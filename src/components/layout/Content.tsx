
import * as React from "react";

interface ContentProps {
  text: string;
}

export const Content: React.FC<ContentProps> = ({ text }) => {
  return (
    <main className="items-stretch flex min-h-[594px] w-full flex-col overflow-hidden text-[40px] text-white font-light leading-[48px] justify-center bg-black px-16 py-[195px] max-md:max-w-full max-md:px-5 max-md:py-[100px]">
      <div className="flex h-[204px] w-full justify-end max-md:max-w-full">
        <div className="text-white w-[699px] max-w-full ml-auto mr-0">
          {text}
        </div>
      </div>
    </main>
  );
};
