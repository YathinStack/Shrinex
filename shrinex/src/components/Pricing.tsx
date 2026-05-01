"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const plans = [
  {
    nameKey: "plan_1_name" as const,
    priceKey: "plan_1_price" as const,
    featuresKey: "plan_1_features" as const,
    ctaKey: "plan_1_cta" as const,
    highlight: false,
  },
  {
    nameKey: "plan_2_name" as const,
    badgeKey: "plan_2_badge" as const,
    priceKey: "plan_2_price" as const,
    featuresKey: "plan_2_features" as const,
    ctaKey: "plan_2_cta" as const,
    highlight: true,
  },
  {
    nameKey: "plan_3_name" as const,
    priceKey: "plan_3_price" as const,
    featuresKey: "plan_3_features" as const,
    ctaKey: "plan_3_cta" as const,
    highlight: false,
  },
];

export default function Pricing() {
  const { lang } = useLang();
  
  return (
    <section
      id="pricing"
      className="w-full py-24 px-6"
      style={{ background: "#090909", borderTop: "1px solid #131313" }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span
            className="uppercase tracking-[0.2em] text-[11px] mb-4 inline-block"
            style={{ fontFamily: "var(--font-mono)", color: "#FF771C" }}
          >
            {t(lang, "pricing_label")}
          </span>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 56px)",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {t(lang, "pricing_title")}
          </h2>
          <p
            className="mt-4 max-w-lg mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              color: "#6B6D70",
              lineHeight: 1.7,
            }}
          >
            {t(lang, "pricing_subtitle")}
          </p>
          <p
            className="mt-2 max-w-lg mx-auto italic"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "#98989E",
              lineHeight: 1.7,
            }}
          >
            {t(lang, "pricing_note")}
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const features = t(lang, plan.featuresKey) as string[];
            
            return (
              <motion.div
                key={plan.nameKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col rounded-xl p-8"
                style={{
                  background: plan.highlight ? "#111111" : "#0D0D0D",
                  border: plan.highlight ? "1px solid #FF771C" : "1px solid #1A1A1A",
                }}
              >
                {plan.highlight && plan.badgeKey && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap"
                    style={{
                      background: "#FF771C",
                      color: "#000000",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {t(lang, plan.badgeKey)}
                  </span>
                )}

                {/* Plan name */}
                <h3
                  className="font-bold mb-1 mt-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "24px",
                    color: "#FFFFFF",
                  }}
                >
                  {t(lang, plan.nameKey)}
                </h3>

                {/* Price */}
                <div className="my-6">
                  <span
                    className="font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "36px",
                      color: plan.highlight ? "#FF771C" : "#FFFFFF",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {t(lang, plan.priceKey)}
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-10 flex-1 mt-4">
                  {features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check
                        size={16}
                        style={{ color: "#FF771C", marginTop: "2px", flexShrink: 0 }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "14px",
                          color: "#B7B7BC",
                        }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="#contact"
                  className="block text-center py-3 rounded-md font-semibold text-sm transition-all"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: plan.highlight ? "#FF771C" : "transparent",
                    color: plan.highlight ? "#000000" : "#FFFFFF",
                    border: plan.highlight ? "none" : "1px solid #282828",
                  }}
                  onMouseEnter={(e) => {
                    if (!plan.highlight) e.currentTarget.style.borderColor = "#FF771C";
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.highlight) e.currentTarget.style.borderColor = "#282828";
                  }}
                >
                  {t(lang, plan.ctaKey)}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
