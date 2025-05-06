import * as React from "react";

interface ContentProps {
  text: string;
}

export const Content: React.FC<ContentProps> = ({ text }) => {
  return (
    <main className="w-full bg-black pl-[668px] pr-[140px] py-[180px] m-0">
      <div className="max-w-[700px] text-[18px] md:text-[24px] lg:text-[28px] text-white font-light leading-tight md:leading-[36px] text-left">
        Welcome to Tarkeeb Online Radio A digital platform reimagining classic radio.
        Tune in through our vintage-inspired dial interface to explore curated music shows, eclectic mixes, and cultural programming.
      </div>

      <div className="max-w-[700px] mt-[120px] text-[18px] md:text-[24px] lg:text-[28px] text-white font-light leading-tight md:leading-[36px] text-left">
        Our carefully curated playlists blend contemporary sounds with timeless classics, creating a unique listening experience that bridges generations. Each show is crafted to take you on a musical journey through different eras and styles.
      </div>

      <div className="max-w-[700px] mt-[120px] text-[18px] md:text-[24px] lg:text-[28px] text-white font-light leading-tight md:leading-[36px] text-left">
        Join our community of music enthusiasts and discover new sounds every day. Whether you're looking for background music or an immersive listening experience, Tarkeeb Online Radio has something for everyone.
      </div>
    </main>
  );
};
