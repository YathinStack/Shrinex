"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Calendar, Globe, Pin } from "lucide-react";
import SocialFlipButton from "@/components/ui/social-flip-button";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Contact() {
  const { lang } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let value = e.target.value;
    if (e.target.name === "phone") {
      value = value.replace(/[^\d+]/g, "");
    }
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          businessName: form.business,
          budgetRange: form.budget,
          requiredService: form.service,
          description: form.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-24 px-6"
      style={{ background: "#000000", borderTop: "1px solid #131313" }}
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left — Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="uppercase tracking-[0.2em] text-[11px] mb-4 inline-block"
            style={{ fontFamily: "var(--font-mono)", color: "#FF771C" }}
          >
            {t(lang, "contact_label")}
          </span>
          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {t(lang, "contact_title")}
          </h2>
          <p
            className="mb-10"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              color: "#6B6D70",
              lineHeight: 1.75,
            }}
          >
            {t(lang, "contact_subtitle")}
          </p>

          <div className="flex flex-col gap-5 mb-10">
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                style={{ background: "#111111", border: "1px solid #1A1A1A" }}
              >
                <Calendar size={18} style={{ color: "#FF771C" }} />
              </div>
              <div>
                <span className="block font-body text-[15px] text-text-primary font-bold mb-1">
                  {t(lang, "contact_booking_title")}
                </span>
                <span className="flex items-start gap-1.5 font-body text-[14px] text-text-secondary">
                  <Pin size={12} className="flex-shrink-0 mt-[3px] text-white/60" strokeWidth={1.8} />
                  {t(lang, "contact_booking_note")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                style={{ background: "#111111", border: "1px solid #1A1A1A" }}
              >
                <MapPin size={18} style={{ color: "#FF771C" }} />
              </div>
              <span className="font-body text-[15px] text-text-secondary">
                Andhra Pradesh, India
              </span>
            </div>
          </div>
          
          <p className="font-body text-[14px] text-accent mb-8 italic">
            {t(lang, "contact_lang_note")}
          </p>

          {/* Social Flip Buttons */}
          <div className="mt-8 flex items-start justify-start">
            <SocialFlipButton />
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl p-8"
          style={{ background: "#0D0D0D", border: "1px solid #1A1A1A" }}
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "#FF771C22", border: "1px solid #FF771C" }}
              >
                <Send size={24} style={{ color: "#FF771C" }} />
              </div>
              <h3
                className="font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  color: "#FFFFFF",
                }}
              >
                Message Sent!
              </h3>
              <p style={{ fontFamily: "var(--font-body)", color: "#6B6D70", fontSize: "15px" }}>
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: "name", label: t(lang, "contact_name"), type: "text" },
                  { id: "email", label: t(lang, "contact_email"), type: "email" },
                  { id: "phone", label: t(lang, "contact_phone"), type: "tel" },
                  { id: "business", label: t(lang, "contact_business"), type: "text" },
                  { id: "service", label: t(lang, "contact_service"), type: "text" },
                  { id: "budget", label: t(lang, "contact_budget"), type: "text" },
                ].map((field) => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label
                      htmlFor={field.id}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "#6B6D70",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required={field.id === "name" || field.id === "email"}
                      value={form[field.id as keyof typeof form]}
                      onChange={handleChange}
                      className="w-full rounded-md px-4 py-3 outline-none transition-all"
                      style={{
                        background: "#111111",
                        border: "1px solid #1A1A1A",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#FF771C")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#1A1A1A")}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label
                  htmlFor="message"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "#6B6D70",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {t(lang, "contact_message")}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={form.message}
                  name="message"
                  onChange={handleChange}
                  className="w-full rounded-md px-4 py-3 outline-none resize-none transition-all"
                  style={{
                    background: "#111111",
                    border: "1px solid #1A1A1A",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#FF771C")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#1A1A1A")}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm -mb-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full py-3.5 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "#FF771C",
                  color: "#000000",
                  fontFamily: "var(--font-body)",
                }}
              >
                {loading ? "Sending..." : t(lang, "contact_submit")}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
