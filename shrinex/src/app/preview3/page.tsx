import VantaVapor from "@/components/VantaVapor";

export default function Preview3Page() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden font-sans">
      <VantaVapor />
      
      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 mix-blend-difference text-white">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-widest">
          Vanta Vapor
        </h1>
      </div>
    </main>
  );
}
