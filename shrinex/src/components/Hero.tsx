"use client";

import { motion } from "framer-motion";
import { MoveDown } from "@/components/animate-ui/icons/move-down";
import StrokeFill from "@/components/ui/stroke-fill";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#FF771C"
            strokeWidth={path.width}
            strokeOpacity={0.06 + path.id * 0.015}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  const { lang } = useLang();

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Floating path animations */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Faint grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #131313 0px, #131313 1px, transparent 1px, transparent calc(100%/12))",
          opacity: 0.4,
        }}
      />

      {/* Brand Name */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <StrokeFill text={t(lang, "hero_shrinex")} duration={3} />

          {/* Spacer between title and subtitle */}
          <div className="mt-16" />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "#FF771C",
              marginTop: "0px",
              textTransform: "uppercase",
            }}
          >
            {t(lang, "hero_label")}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 flex gap-4 justify-center flex-wrap"
          >
            <a
              href="#contact"
              className="px-8 py-4 rounded-md text-sm font-medium transition-all hover:scale-105"
              style={{
                fontFamily: "var(--font-body)",
                background: "#FF771C",
                color: "#F5EDE0",
              }}
            >
              {t(lang, "hero_cta_primary")}
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-md text-sm font-medium transition-all"
              style={{
                fontFamily: "var(--font-body)",
                border: "1px solid #282828",
                color: "#FFFFFF",
                background: "transparent",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#FF771C")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#282828")
              }
            >
              {t(lang, "hero_cta_secondary")}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Arrow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => {
          document.getElementById("fliptext")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <MoveDown
          animateOnHover
          loop
          size={40}
          style={{ color: "#FFFFFF" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
