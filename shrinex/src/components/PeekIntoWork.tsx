"use client";
import { motion } from "framer-motion";

interface WorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
  previewUrl: string;
}

const works: WorkItem[] = [
  {
    id: 1,
    title: "Fluid Simulation",
    description: "WebGL Interaction",
    image: "/work/work1.jpg",       // ← replace with actual image
    previewUrl: "/preview1", // ← replace with actual URL
  },
  {
    id: 2,
    title: "Liquid Chrome",
    description: "WebGL 2.0 Animation",
    image: "/work/work2.jpg",
    previewUrl: "/preview2",
  },
  {
    id: 3,
    title: "Vanta Vapor",
    description: "WebGL Smoke Effect",
    image: "/work/work3.jpg",
    previewUrl: "/preview3",
  },
  {
    id: 4,
    title: "Russian Samurai",
    description: "GSAP Animation",
    image: "/work/work4.jpg",
    previewUrl: "/preview4",
  },
];

export default function PeekIntoWork() {
  return (
    <section className="w-full bg-zinc-950 py-24 px-6 md:px-16" style={{ background: "#090909", borderTop: "1px solid #131313" }}>

      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-[11px] tracking-[0.2em] uppercase mb-4 inline-block" style={{ fontFamily: "var(--font-mono)", color: "#FF771C" }}>
          Our Portfolio
        </p>
        <h2 className="font-bold mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 56px)", color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Peek Into Our Work
        </h2>
        <p className="mt-4 max-w-lg mx-auto" style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "#6B6D70", lineHeight: 1.7 }}>
          Click any project to see it live.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[1280px] mx-auto">
        {works.map((work, i) => (
          <motion.a
            key={work.id}
            href={work.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 cursor-pointer block"
            style={{ borderColor: "#1A1A1A" }}
          >
            {/* Project Image */}
            <div className="w-full aspect-video overflow-hidden bg-[#111111]">
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x450/111111/FF771C?text=${work.title}`;
                }}
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
              <span className="text-white text-lg font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-display)" }}>
                {work.title}
              </span>
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#FF771C", fontFamily: "var(--font-mono)" }}>
                {work.description}
              </span>
              <span className="mt-3 px-5 py-2 border border-white text-white text-[11px] rounded-full tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                View Live →
              </span>
            </div>

            {/* Bottom label (always visible) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-body)" }}>{work.title}</p>
              <p className="text-xs" style={{ color: "#98989E", fontFamily: "var(--font-body)" }}>{work.description}</p>
            </div>
          </motion.a>
        ))}
      </div>

    </section>
  );
}
