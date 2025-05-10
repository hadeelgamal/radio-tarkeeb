import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { RadioControls } from "../components/RadioControls";
import { SplashScreen } from "../components/SplashScreen";
import { GenericButton } from "../components/ui/GenericButton";

export default function Index() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black">
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <Navbar showLogo={splashDone} />
      <main className="relative">
        <RadioControls />
        <div className="absolute bottom-20 left-1/4">
          <GenericButton 
            label="More Episodes" 
            withArrow={true}
            onClick={() => console.log('More episodes clicked')}
          />
        </div>
      </main>
    </div>
  );
}
