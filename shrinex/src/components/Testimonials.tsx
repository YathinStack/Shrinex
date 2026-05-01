"use client";

import { TestimonialsCard } from "@/components/ui/testimonials-card";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const items = [
  {
    id: 1,
    title: "Ravi Kumar",
    description:
      "Shrinex built our restaurant website in under a week. Customers now find us on Google and our online orders doubled.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi",
  },
  {
    id: 2,
    title: "Priya Sharma",
    description:
      "As a boutique owner in Vijayawada, I never thought I needed a website. Shrinex proved me wrong — sales are up 40%.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
  },
  {
    id: 3,
    title: "Suresh Reddy",
    description:
      "Professional, fast, and affordable. They understood exactly what my clinic needed and delivered beyond expectations.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh",
  },
  {
    id: 4,
    title: "Ananya Rao",
    description:
      "Booked a call, approved the design, went live — all in 10 days. The process was smooth from start to finish.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
  },
];

export default function Testimonials() {
  const { lang } = useLang();
  return (
    <section
      id="testimonials"
      className="w-full py-24 px-6"
      style={{
        background: "#090909",
        borderTop: "1px solid #131313",
      }}
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <span
          className="uppercase tracking-[0.15em] text-[11px]"
          style={{ fontFamily: "var(--font-mono)", color: "#FF771C" }}
        >
          {t(lang, "testimonials_label")}
        </span>
        <h2
          className="mt-4 font-bold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 5vw, 48px)",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
          }}
        >
          {t(lang, "testimonials_title")}
        </h2>
        <p
          className="mt-4 max-w-xl mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            fontWeight: 300,
            color: "#98989E",
            lineHeight: 1.75,
          }}
        >
          {t(lang, "testimonials_subtitle")}
        </p>
      </div>

      {/* Testimonials Card Component */}
      <div className="flex justify-center">
        <TestimonialsCard
          items={items}
          width={520}
          showNavigation={true}
          showCounter={true}
          autoPlay={true}
          autoPlayInterval={4000}
        />
      </div>

      {/* Note since no real clients yet */}
      <p
        className="text-center mt-10 text-xs"
        style={{
          fontFamily: "var(--font-body)",
          color: "#404040",
        }}
      >
        {t(lang, "testimonials_note")}
      </p>
    </section>
  );
}
