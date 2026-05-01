"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";

interface DockItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

interface GlassDockProps {
  items: DockItem[];
  direction?: "horizontal" | "vertical";
}

function DockIcon({
  item,
  mouseX,
  mouseY,
  direction = "horizontal",
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  direction?: "horizontal" | "vertical";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  // Horizontal magnification
  const distanceX = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Vertical magnification
  const distanceY = useTransform(mouseY, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  const sizeSync = useTransform(
    direction === "vertical" ? distanceY : distanceX,
    [-100, 0, 100],
    [36, 56, 36]
  );
  const size = useSpring(sizeSync, { stiffness: 300, damping: 28 });

  return (
    <Link href={item.href}>
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center rounded-xl cursor-pointer"
        style={{
          width: size,
          height: size,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(8px)",
        }}
        whileHover={{
          background: "rgba(255,119,28,0.14)",
          borderColor: "rgba(255,119,28,0.40)",
        }}
        transition={{ duration: 0.15 }}
      >
        <Icon
          size={18}
          style={{ color: hovered ? "#FF771C" : "#FFFFFF", transition: "color 0.15s" }}
        />

        {/* Tooltip — right side for vertical, top for horizontal */}
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: direction === "vertical" ? -6 : 0, y: direction === "vertical" ? 0 : 4 }}
            animate={{ opacity: 1, x: direction === "vertical" ? 0 : 0, y: 0 }}
            className="absolute whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-medium pointer-events-none"
            style={{
              ...(direction === "vertical"
                ? { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
                : { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }),
              background: "rgba(0,0,0,0.85)",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em",
            }}
          >
            {item.title}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
}

export function GlassDock({ items, direction = "horizontal" }: GlassDockProps) {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  const isVertical = direction === "vertical";

  return (
    <motion.div
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
        mouseY.set(e.pageY);
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        mouseY.set(Infinity);
      }}
      className={`flex ${isVertical ? "flex-col" : "flex-row"} items-center gap-2 p-3 rounded-2xl`}
      style={{
        background: "rgba(10,10,10,0.65)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {items.map((item) => (
        <DockIcon
          key={item.title}
          item={item}
          mouseX={mouseX}
          mouseY={mouseY}
          direction={direction}
        />
      ))}
    </motion.div>
  );
}
