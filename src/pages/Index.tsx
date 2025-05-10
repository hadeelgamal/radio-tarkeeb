import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { RadioControls } from "../components/RadioControls";
import { SplashScreen } from "../components/SplashScreen";

export default function Index() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone ? (
        <SplashScreen onComplete={() => setSplashDone(true)} />
      ) : (
        <div className="h-screen w-full bg-black">
          <Navbar />
          <div className="flex items-center justify-center h-[calc(100vh-64px)] pb-20">
            <RadioControls />
          </div>
        </div>
      )}
    </>
  );
}
