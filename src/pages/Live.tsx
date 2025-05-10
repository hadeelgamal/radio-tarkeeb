import { Navbar } from "../components/layout/Navbar";

export default function Live() {
  return (
    <div className="min-h-screen w-full bg-black m-0 p-0">
      <Navbar />
      <div className="text-white pt-24 px-6 md:px-16">
        <h1 className="text-4xl font-bold mb-8">Live Radio</h1>
        <div className="text-xl">
          Coming soon - Live radio streaming feature is under development.
        </div>
      </div>
    </div>
  );
} 