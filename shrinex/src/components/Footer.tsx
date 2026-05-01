"use client";

import Link from "next/link";
import { Camera, MessageCircle, Link2, Users } from "lucide-react";
import { MaskedAvatarsDemo } from "@/components/ui/masked-avatars-demo";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();

  const linkCategories = [
    {
      title: t(lang, "footer_services"),
      items: [
        t(lang, "service_1_name"),
        t(lang, "service_2_name"),
        t(lang, "service_3_name"),
        t(lang, "service_5_name"),
        t(lang, "service_6_name"),
      ]
    },
    {
      title: t(lang, "footer_links"),
      items: [
        t(lang, "nav_services"),
        t(lang, "nav_process"),
        t(lang, "nav_pricing"),
        t(lang, "nav_contact"),
      ]
    }
  ];

  return (
    <footer
      className="w-full pt-16 pb-8 px-6"
      style={{ background: "#000000", borderTop: "1px solid #131313" }}
    >

      <div className="max-w-[1280px] mx-auto">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12" style={{ borderBottom: "1px solid #131313" }}>
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                }}
              >
                Shrinex{" "}
                <span style={{ color: "#FF771C" }}>Studios</span>
              </span>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "#6B6D70",
                lineHeight: 1.75,
                maxWidth: "320px",
              }}
            >
              {t(lang, "footer_tagline")}
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-2">
              {[
                { icon: Camera, href: "#", label: "Instagram" },
                { icon: Link2, href: "#", label: "LinkedIn" },
                { icon: MessageCircle, href: "#", label: "WhatsApp" },
                { icon: Users, href: "#", label: "Facebook" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
                  style={{ background: "#111111", border: "1px solid #1A1A1A", color: "#6B6D70" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#FF771C";
                    e.currentTarget.style.color = "#FF771C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#1A1A1A";
                    e.currentTarget.style.color = "#6B6D70";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Trusted clients avatars */}
            <div className="mt-4">
              <MaskedAvatarsDemo />
            </div>
          </div>

          {/* Link Columns */}
          {linkCategories.map((category) => (
            <div key={category.title} className="flex flex-col gap-4">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "#FF771C",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {category.title}
              </span>
              <ul className="flex flex-col gap-3">
                {category.items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        color: "#6B6D70",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6D70")}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
            <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "#3A3A3A",
            }}
          >
            {t(lang, "footer_copy")}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "#3A3A3A",
            }}
          >
            {t(lang, "footer_rx7")}
          </span>
        </div>
      </div>
    </footer>
  );
}
