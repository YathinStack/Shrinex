"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import Link from 'next/link';
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] py-4`}
      style={{
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #131313" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display font-extrabold text-2xl tracking-tight text-text-primary">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
            }}
          >
            Shrinex{" "}
            <span style={{ color: "#FF771C" }}>Studios</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#services" className="font-body text-[15px] font-medium text-white hover:text-[#FF771C] transition-colors">{t(lang, "nav_services")}</Link>
          <Link href="#process" className="font-body text-[15px] font-medium text-white hover:text-[#FF771C] transition-colors">{t(lang, "nav_process")}</Link>
          <Link href="#pricing" className="font-body text-[15px] font-medium text-white hover:text-[#FF771C] transition-colors">{t(lang, "nav_pricing")}</Link>
          <Link href="#contact" className="font-body text-[15px] font-medium text-white hover:text-[#FF771C] transition-colors">{t(lang, "nav_contact")}</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-2 items-center">
            {(["en", "te", "hi"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: lang === l ? "#FF771C" : "#FFFFFF",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => { if (lang !== l) e.currentTarget.style.color = "#FF771C"; }}
                onMouseLeave={(e) => { if (lang !== l) e.currentTarget.style.color = "#FFFFFF"; }}
              >
                {l === "en" ? "EN" : l === "te" ? "తె" : "हि"}
              </button>
            ))}
          </div>
          <Link
            href="#contact"
            className="font-body font-semibold text-[15px] px-6 py-2.5 rounded-md transition-colors duration-200"
            style={{ background: "#FFFFFF", color: "#000000" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#FF771C"; e.currentTarget.style.color = "#000000"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = "#000000"; }}
          >
            {t(lang, "nav_cta")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text-primary p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-bg-primary border-b border-border-subtle overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[400px] py-4' : 'max-h-0 py-0 border-transparent'
        }`}
      >
        <nav className="flex flex-col items-center gap-6">
          <Link href="#services" onClick={() => setMobileMenuOpen(false)} className="font-body text-[18px] font-medium text-text-primary">{t(lang, "nav_services")}</Link>
          <Link href="#process" onClick={() => setMobileMenuOpen(false)} className="font-body text-[18px] font-medium text-text-primary">{t(lang, "nav_process")}</Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="font-body text-[18px] font-medium text-text-primary">{t(lang, "nav_pricing")}</Link>
          <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="font-body text-[18px] font-medium text-text-primary">{t(lang, "nav_contact")}</Link>
          <div className="w-full px-6 flex justify-between items-center pt-4 border-t border-border-subtle">
            <div className="flex gap-2 items-center">
              {(["en", "te", "hi"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setMobileMenuOpen(false);
                  }}
                  className="transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: lang === l ? "#FF771C" : "#FFFFFF",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => { if (lang !== l) e.currentTarget.style.color = "#FF771C"; }}
                  onMouseLeave={(e) => { if (lang !== l) e.currentTarget.style.color = "#FFFFFF"; }}
                >
                  {l === "en" ? "EN" : l === "te" ? "తె" : "हि"}
                </button>
              ))}
            </div>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-body font-semibold text-[15px] px-6 py-2 rounded-md transition-colors duration-200"
              style={{ background: "#FFFFFF", color: "#000000" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#FF771C"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}
            >
              {t(lang, "nav_cta")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
