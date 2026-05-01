"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function WhyWebsite() {
  const { lang } = useLang();
  
  return (
    <section id="why-website" className="bg-bg-card border-y border-border-subtle py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Stats */}
        <div className="flex flex-col items-start gap-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block bg-bg-panel border border-border-strong text-[12px] font-bold tracking-wider py-1 px-3 rounded-full text-text-primary"
          >
            {t(lang, "why_label")}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[40px] md:text-[48px] font-bold tracking-[-0.01em] leading-[1.1] text-text-primary mb-6"
          >
            {t(lang, "why_title")}
          </motion.h2>
          
          <div className="space-y-6 w-full">
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.div 
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, delay: 0.1 * num, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4 items-start"
              >
                <div className="w-[60px] flex-shrink-0 font-display text-[24px] font-bold" style={{ color: "#FF771C" }}>
                  {t(lang, `why_stat_${num}_number` as any)}
                </div>
                <div>
                  <p className="font-body text-[16px] text-text-primary font-bold">
                    {t(lang, `why_stat_${num}_bold` as any)}
                  </p>
                  <p className="font-body text-[14px] text-text-secondary mt-1">
                    {t(lang, `why_stat_${num}_desc` as any)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Story Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative sticky top-32"
        >
          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-accent blur-[60px] opacity-[0.05] -z-10 rounded-full"></div>
          
          <div className="bg-bg-panel border border-border-mid rounded-xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Subtle grid bg inside card */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(var(--color-border-strong) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}></div>
            
            <div className="relative z-10">
              <span className="inline-block mb-4 font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "#FF771C" }}>
                {t(lang, "why_story_label")}
              </span>
              <h3 className="font-display text-[28px] font-bold text-text-primary mb-4 leading-[1.2]">
                {t(lang, "why_story_title")}
              </h3>
              
              <p className="font-body text-[16px] text-text-secondary leading-[1.7] mb-8">
                {t(lang, "why_story_body")}
              </p>
              
              <Link
                href="#contact"
                className="inline-block w-full text-center font-body font-semibold px-6 py-3 rounded-md transition-all duration-300"
                style={{ background: "#FFFFFF", color: "#000000" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #6AAE8A 0%, #4A6FA5 100%)";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#FFFFFF";
                  e.currentTarget.style.color = "#000000";
                }}
              >
                {t(lang, "why_story_cta")}
              </Link>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
