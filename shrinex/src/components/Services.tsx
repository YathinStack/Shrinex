"use client";

import { motion } from "framer-motion";
import { LayoutTemplate, Globe, ShoppingCart, LayoutDashboard, PenTool, Terminal } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const services = [
  {
    icon: LayoutTemplate,
    titleKey: "service_1_name" as const,
    descKey: "service_1_desc" as const,
    delay: 0.1
  },
  {
    icon: Globe,
    titleKey: "service_2_name" as const,
    descKey: "service_2_desc" as const,
    delay: 0.2
  },
  {
    icon: ShoppingCart,
    titleKey: "service_3_name" as const,
    descKey: "service_3_desc" as const,
    delay: 0.3
  },
  {
    icon: LayoutDashboard,
    titleKey: "service_4_name" as const,
    descKey: "service_4_desc" as const,
    delay: 0.1
  },
  {
    icon: PenTool,
    titleKey: "service_5_name" as const,
    descKey: "service_5_desc" as const,
    delay: 0.2
  },
  {
    icon: Terminal,
    titleKey: "service_6_name" as const,
    descKey: "service_6_desc" as const,
    delay: 0.3
  }
];

export default function Services() {
  const { lang } = useLang();
  return (
    <section id="services" className="bg-bg-primary py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-[640px] mx-auto mb-16"
        >
          <span className="inline-block bg-bg-panel border border-border-strong text-[12px] font-bold tracking-wider py-1 px-3 rounded-full text-text-primary mb-6">
            {t(lang, "services_label")}
          </span>
          <h2 className="font-display text-[48px] font-bold tracking-[-0.01em] leading-[1.1] text-text-primary mb-4">
            {t(lang, "services_title")}
          </h2>
          <p className="font-body text-[16px] leading-[1.6] text-text-secondary">
            {t(lang, "services_subtitle")}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: service.delay, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 0 30px rgba(255,119,28,0.25), 0 0 60px rgba(255,119,28,0.10), 0 8px 32px rgba(0,0,0,0.4)",
                borderColor: "rgba(255,119,28,0.5)",
                transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] }
              }}
              className="group relative bg-bg-card border border-border-default rounded-xl p-8 flex flex-col items-start overflow-hidden cursor-pointer"
              style={{ transition: "background 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, transform 0.15s ease" }}
            >
              {/* Orange ambient glow overlay on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{ 
                  background: "radial-gradient(ellipse at 50% 0%, rgba(255,119,28,0.12) 0%, rgba(255,119,28,0.04) 40%, transparent 70%)",
                  transition: "opacity 0.15s ease"
                }}
              />
              {/* Bottom edge ambient line */}
              <div 
                className="absolute bottom-0 left-[10%] right-[10%] h-[1px] opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{ 
                  background: "linear-gradient(90deg, transparent, rgba(255,119,28,0.6), transparent)",
                  transition: "opacity 0.15s ease"
                }}
              />

              <div className="relative mb-6 text-border-strong group-hover:text-[#FF771C] transition-all duration-150 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,119,28,0.5)]">
                <service.icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className="relative font-display text-[24px] font-bold leading-[1.2] tracking-tight text-text-primary mb-4 group-hover:text-white transition-colors duration-150">
                {t(lang, service.titleKey)}
              </h3>
              <p className="relative font-body text-[14px] leading-[1.6] text-text-secondary mb-6 line-clamp-3 group-hover:text-[#a0a0a5] transition-colors duration-150">
                {t(lang, service.descKey)}
              </p>
              <Link 
                href="#contact" 
                className="relative mt-auto font-body text-[14px] font-medium text-accent hover:underline transition-all duration-150 group-hover:text-[#FF771C] group-hover:drop-shadow-[0_0_8px_rgba(255,119,28,0.4)]"
              >
                Learn More &rarr;
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
