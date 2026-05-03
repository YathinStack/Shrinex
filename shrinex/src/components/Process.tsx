"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const steps = [
  { number: "01", titleKey: "process_1_title" as const, descKey: "process_1_desc" as const },
  { number: "02", titleKey: "process_2_title" as const, descKey: "process_2_desc" as const },
  { number: "03", titleKey: "process_3_title" as const, descKey: "process_3_desc" as const },
  { number: "04", titleKey: "process_4_title" as const, descKey: "process_4_desc" as const },
];

// Each step's activation threshold along the scroll (0 → 1)
const DOT_THRESHOLDS = steps.map((_, i) => i / (steps.length - 1));

export default function Process() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Update how many dots are active based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const count = DOT_THRESHOLDS.filter((threshold) => progress >= threshold - 0.02).length;
    setActiveCount(count);
  });

  return (
    <section id="process" className="bg-bg-primary py-24" ref={sectionRef}>
      <div className="max-w-[800px] mx-auto px-6 md:px-20">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-bg-panel border border-border-strong text-[12px] font-bold tracking-wider py-1 px-3 rounded-full text-text-primary mb-6">
            {t(lang, "process_label")}
          </span>
          <h2 className="font-display text-[40px] md:text-[48px] font-bold tracking-[-0.01em] leading-[1.1] text-text-primary">
            {t(lang, "process_title")}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Grey base line */}
          <div className="absolute left-[28px] md:left-[50%] top-4 bottom-4 w-px bg-border-mid md:-translate-x-1/2 block" />

          {/* Orange scroll-fill line */}
          <motion.div
            className="absolute left-[28px] md:left-[50%] top-4 bottom-4 w-px md:-translate-x-1/2 block"
            style={{ scaleY: lineScaleY, transformOrigin: "top", background: "#FF771C" }}
          />

          <div className="space-y-12 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const isActive = index < activeCount;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col md:flex-row items-start md:items-center justify-between w-full"
                >
                  {/* Card */}
                  <div className={`md:w-[45%] order-2 md:order-1 ${isEven ? "md:text-right" : "md:text-left md:order-3"} pl-16 sm:pl-20 md:pl-0`}>
                    <div className="bg-bg-panel border border-border-default rounded-xl p-6 transition-all duration-300 group-hover:border-border-strong group-hover:-translate-y-1">
                      <span className="font-mono text-lg mb-2 block" style={{ color: "#FF771C" }}>{step.number}</span>
                      <h3 className="font-display text-[24px] font-bold text-text-primary mb-3">{t(lang, step.titleKey)}</h3>
                      <p className="font-body text-[15px] text-text-secondary leading-[1.6]">{t(lang, step.descKey)}</p>
                    </div>
                  </div>

                  {/* Timeline Dot — glows orange when scroll line passes it */}
                  <div
                    className="absolute left-[16px] md:left-[50%] md:-translate-x-1/2 top-6 md:top-auto flex items-center justify-center w-6 h-6 rounded-full z-10 order-1 md:order-2 transition-all duration-500"
                    style={{
                      background: "#0D0D0D",
                      border: isActive ? "2px solid #FF771C" : "2px solid #2A2A2A",
                      boxShadow: isActive ? "0 0 16px 4px rgba(255,119,28,0.55)" : "none",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full transition-all duration-500"
                      style={{ background: isActive ? "#FF771C" : "#2A2A2A" }}
                    />
                  </div>

                  {/* Right Side spacer */}
                  <div className={`md:w-[45%] hidden md:block ${isEven ? "order-3" : "order-1"}`} />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
