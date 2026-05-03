"use client";

import { GlassDock } from "@/components/ui/glass-dock";
import {
  Home,
  Layers,
  GitBranch,
  DollarSign,
  Phone,
  Globe,
  Camera,
} from "lucide-react";

export function GlassDockDemo() {
  const items = [
    { title: "Home",      icon: Home,        href: "#" },
    { title: "Services",  icon: Layers,      href: "#services" },
    { title: "Process",   icon: GitBranch,   href: "#process" },
    { title: "Pricing",   icon: DollarSign,  href: "#pricing" },
    { title: "Contact",   icon: Phone,       href: "#contact" },
    { title: "Website",   icon: Globe,       href: "#" },
    { title: "Instagram", icon: Camera,      href: "#" },
  ];

  return (
    <div className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-[100] flex-col items-center">
      <GlassDock items={items} direction="vertical" />
    </div>
  );
}
