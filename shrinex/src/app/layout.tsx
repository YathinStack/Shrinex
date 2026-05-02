import type { Metadata } from "next";
import { Syne, DM_Sans, Syne_Mono, Geist } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { LanguageProvider } from "@/lib/LanguageContext";
import { GlassDockDemo } from '@/components/ui/glass-dock-demo';
import DesktopPrompt from '@/components/DesktopPrompt';
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const syne = Syne({ 
  subsets: ['latin'], 
  weight: ['600','700','800'], 
  variable: '--font-display' 
});

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['300','400','500'], 
  variable: '--font-body' 
});

const syneMono = Syne_Mono({ 
  subsets: ['latin'], 
  weight: ['400'], 
  variable: '--font-mono' 
});

export const metadata: Metadata = {
  title: "Shrinex | Web Design Agency",
  description: "Websites that work for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark scroll-smooth", syne.variable, dmSans.variable, syneMono.variable, "font-sans", geist.variable)}>
      <body className="antialiased bg-bg-primary text-text-primary">
        <DesktopPrompt />
        <LanguageProvider>
          <Navbar />
          <GlassDockDemo />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
