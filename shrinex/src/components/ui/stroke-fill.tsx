"use client";

import { motion } from "framer-motion";

interface StrokeFillProps {
  text?: string;
  duration?: number;
}

export default function StrokeFill({ text = "SHRINEX", duration = 3 }: StrokeFillProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <svg viewBox="0 0 2400 400" overflow="visible" className="w-full h-auto">
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="240"
          fontWeight="900"
          strokeWidth="3"
          letterSpacing="24"
          stroke="#FFFFFF"
          fill="transparent"
          style={{ fontFamily: "'Aurellis', var(--font-display), sans-serif", fontWeight: 900 }}
          initial={{ strokeDasharray: 1500, strokeDashoffset: 1500 }}
          animate={{ strokeDashoffset: 0, fill: "#FFFFFF" }}
          transition={{
            duration,
            ease: "easeInOut",
            fill: {
              delay: duration * 0.67,
              duration: duration * 0.33,
              ease: "easeIn",
            },
          }}
        >
          {text.toUpperCase()}
        </motion.text>
      </svg>
    </div>
  );
}
