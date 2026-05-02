"use client";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t, translations } from "@/lib/translations";

interface WorkItem {
  id: number;
  titleKey: keyof typeof translations.en;
  descKey: keyof typeof translations.en;
  image: string;
  previewUrl: string;
}

const works: WorkItem[] = [
  {
    id: 1,
    titleKey: "portfolio_1_title",
    descKey: "portfolio_1_desc",
    image: "/work/work1.jpg",       // ← replace with actual image
    previewUrl: "/preview1", // ← replace with actual URL
  },
  {
    id: 2,
    titleKey: "portfolio_2_title",
    descKey: "portfolio_2_desc",
    image: "/work/work2.jpg",
    previewUrl: "/preview2",
  },
  {
    id: 3,
    titleKey: "portfolio_3_title",
    descKey: "portfolio_3_desc",
    image: "/work/work3.jpg",
    previewUrl: "/preview3",
  },
  {
    id: 4,
    titleKey: "portfolio_4_title",
    descKey: "portfolio_4_desc",
    image: "/work/work4.jpg",
    previewUrl: "/preview4",
  },
];

export default function PeekIntoWork() {
  const { lang } = useLang();

  return (
    <section className="w-full bg-zinc-950 py-24 px-6 md:px-16" style={{ background: "#090909", borderTop: "1px solid #131313" }}>

      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-[11px] tracking-[0.2em] uppercase mb-4 inline-block" style={{ fontFamily: "var(--font-mono)", color: "#FF771C" }}>
          {t(lang, "portfolio_label")}
        </p>
        <h2 className="font-bold mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 56px)", color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          {t(lang, "portfolio_title")}
        </h2>
        <p className="mt-4 max-w-lg mx-auto" style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "#6B6D70", lineHeight: 1.7 }}>
          {t(lang, "portfolio_desc")}
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
                alt={t(lang, work.titleKey)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x450/111111/FF771C?text=${t(lang, work.titleKey)}`;
                }}
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
              <span className="text-white text-lg font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-display)" }}>
                {t(lang, work.titleKey)}
              </span>
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#FF771C", fontFamily: "var(--font-mono)" }}>
                {t(lang, work.descKey)}
              </span>
              <span className="mt-3 px-5 py-2 border border-white text-white text-[11px] rounded-full tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                {t(lang, "portfolio_view")}
              </span>
            </div>

            {/* Bottom label (always visible) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-body)" }}>{t(lang, work.titleKey)}</p>
              <p className="text-xs" style={{ color: "#98989E", fontFamily: "var(--font-body)" }}>{t(lang, work.descKey)}</p>
            </div>
          </motion.a>
        ))}
      </div>

    </section>
  );
}
