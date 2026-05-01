"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface TestimonialItem {
  id: number | string;
  title: string;
  description: string;
  image: string;
}

interface TestimonialsCardProps {
  items: TestimonialItem[];
  width?: number;
  showNavigation?: boolean;
  showCounter?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const TestimonialsCard = ({
  items,
  width = 520,
  showNavigation = true,
  showCounter = true,
  autoPlay = true,
  autoPlayInterval = 4000,
}: TestimonialsCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlide]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-2xl border p-8"
      style={{
        background: "#1A1A1A",
        borderColor: "#282828",
        width: "100%",
        maxWidth: `${width}px`,
      }}
    >
      {/* Content */}
      <div className="flex flex-col flex-1 min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Header: Avatar + Title */}
            <div className="flex items-center gap-4">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-14 h-14 rounded-full object-cover border"
                style={{ borderColor: "#282828" }}
              />
              <h3
                className="text-lg font-semibold"
                style={{ color: "#FFFFFF" }}
              >
                {currentItem.title}
              </h3>
            </div>

            {/* Description */}
            <p
              className="text-base leading-relaxed"
              style={{ color: "#98989E" }}
            >
              "{currentItem.description}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="mt-8 flex items-center justify-between border-t pt-6" style={{ borderColor: "#282828" }}>
        {showCounter ? (
          <span className="text-sm font-medium" style={{ color: "#98989E" }}>
            {currentIndex + 1} / {items.length}
          </span>
        ) : <div />}

        {showNavigation && (
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border transition-colors hover:bg-white/5"
              style={{ borderColor: "#282828", color: "#FFFFFF" }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border transition-colors hover:bg-white/5"
              style={{ borderColor: "#282828", color: "#FFFFFF" }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
