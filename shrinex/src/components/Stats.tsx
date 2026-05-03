"use client";

import { useEffect, useRef, useState } from "react";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const stats = [
  { value: 3, suffix: "x", labelKey: "stat_1_label" as const },
  { value: 100, suffix: "%", labelKey: "stat_2_label" as const },
  { value: 5, suffix: "+", labelKey: "stat_3_label" as const },
  { value: 48, suffix: "hr", labelKey: "stat_4_label" as const },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1500;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { lang } = useLang();
  return (
    <section
      id="stats"
      className="w-full py-16"
      style={{
        background: "#090909",
        borderTop: "1px solid #131313",
        borderBottom: "1px solid #131313",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-20 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-center py-10 md:py-8 text-center border-[#1A1A1A] 
              ${i % 2 === 0 ? "border-r" : ""} 
              ${i < 2 ? "border-b md:border-b-0" : ""} 
              md:border-r md:[&:last-child]:border-r-0`}
          >
            <span
              className="font-bold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 8vw, 56px)",
                color: "#FF771C",
                lineHeight: 1.1,
              }}
            >
              <Counter target={stat.value} suffix={stat.suffix} />
            </span>
            <span
              className="mt-2 uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "#6B6D70",
                letterSpacing: "0.1em",
              }}
            >
              {t(lang, stat.labelKey)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
