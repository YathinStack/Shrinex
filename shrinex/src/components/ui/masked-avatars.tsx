"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Avatar {
  avatar: string;
  name: string;
}

interface MaskedAvatarsProps {
  avatars: Avatar[];
  size?: number;
  overlap?: number;
}

export function MaskedAvatars({ avatars, size = 48, overlap = 16 }: MaskedAvatarsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="flex items-center"
      style={{ paddingRight: `${overlap}px`, overflow: "visible" }}
    >
      {avatars.map((av, i) => (
        <motion.div
          key={av.name}
          title={av.name}
          onHoverStart={() => setHoveredIndex(i)}
          onHoverEnd={() => setHoveredIndex(null)}
          animate={{
            y: hoveredIndex === i ? -10 : 0,
            scale: hoveredIndex === i ? 1.2 : 1,
            zIndex: hoveredIndex === i ? 50 : avatars.length - i,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            marginLeft: i === 0 ? 0 : -overlap,
            border: "2px solid #000000",
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          <Image
            src={av.avatar}
            alt={av.name}
            width={size}
            height={size}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent && !parent.querySelector(".avatar-fallback")) {
                const fallback = document.createElement("div");
                fallback.className = "avatar-fallback";
                fallback.style.cssText = `
                  width:100%;height:100%;display:flex;
                  align-items:center;justify-content:center;
                  background:#1a1a1a;color:#FF771C;
                  font-size:${size * 0.38}px;font-weight:700;
                  font-family:var(--font-display);
                `;
                fallback.textContent = av.name[0].toUpperCase();
                parent.appendChild(fallback);
              }
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
