import { Content } from "../components/layout/Content";
import { Navbar } from "../components/layout/Navbar";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-black m-0 p-0">
      <Navbar />
      <Content text="Welcome to Tarkeeb Online Radio – A digital platform reimagining classic radio. Tune in through our vintage-inspired dial interface to explore curated music shows, eclectic mixes, and cultural programming. Our live radio streaming feature is coming soon, bringing you an immersive audio experience that bridges the gap between traditional radio and modern digital media." />
    </div>
  );
} 