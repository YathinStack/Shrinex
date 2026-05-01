"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function FlipTextSection() {
  const { lang } = useLang();
  const phrases = t(lang, "flip_phrases") as string[];
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [phrases.length]);

  if (!mounted) return null;

  return (
    <section
      id="fliptext"
      className="w-full flex flex-col items-center justify-center py-28 px-6 text-center overflow-hidden"
      style={{
        background: "#090909",
        borderTop: "1px solid #131313",
        borderBottom: "1px solid #131313",
      }}
    >
      <span
        className="mb-6 uppercase tracking-[0.2em] text-[11px]"
        style={{ fontFamily: "var(--font-mono)", color: "#FF771C" }}
      >
        {t(lang, "flip_label")}
      </span>

      <h2
        className="font-bold leading-none mb-2"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 5vw, 60px)",
          letterSpacing: "-0.02em",
          color: "#6B6D70",
        }}
      >
        {t(lang, "flip_static")}
      </h2>

      <div
        className="relative overflow-hidden w-full flex justify-center"
        style={{ height: "clamp(48px, 8vw, 80px)" }}
      >
        <AnimatePresence mode="wait">
          <motion.h2
            key={phrases[index]}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold leading-none absolute"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 5vw, 60px)",
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #B7B7BC, #FEFEFE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {phrases[index]}
          </motion.h2>
        </AnimatePresence>
      </div>

      <p
        className="mt-10 max-w-xl"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "16px",
          fontWeight: 300,
          color: "#98989E",
          lineHeight: 1.75,
        }}
      >
        {t(lang, "flip_body")}
      </p>
    </section>
  );
}
