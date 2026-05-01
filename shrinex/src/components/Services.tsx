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
              className="group bg-bg-card border border-border-default rounded-xl p-8 flex flex-col items-start transition-all duration-200 hover:-translate-y-1 hover:border-border-mid hover:bg-[#111111]"
            >
              <div className="mb-6 text-border-strong group-hover:text-accent transition-colors duration-200">
                <service.icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-[24px] font-bold leading-[1.2] tracking-tight text-text-primary mb-4">
                {t(lang, service.titleKey)}
              </h3>
              <p className="font-body text-[14px] leading-[1.6] text-text-secondary mb-6 line-clamp-3">
                {t(lang, service.descKey)}
              </p>
              <Link 
                href="#contact" 
                className="mt-auto font-body text-[14px] font-medium text-accent hover:underline transition-all"
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
