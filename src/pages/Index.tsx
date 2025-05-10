import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { RadioPlayer } from "../components/RadioPlayer";
import { SplashScreen } from "../components/SplashScreen";

export default function Index() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black">
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <Navbar showLogo={splashDone} />
      <main className="relative">
        <RadioPlayer />
      </main>
    </div>
  );
} 
