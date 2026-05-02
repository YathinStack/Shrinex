"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "shrinex-desktop-view-choice";

export default function DesktopPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Don't run on server
    if (typeof window === "undefined") return;

    // Check if user already made a choice
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "dismissed") {
      // If they previously accepted, re-apply desktop viewport
      if (stored === "accepted") {
        applyDesktopViewport();
      }
      return;
    }

    // Detect mobile / tablet via screen width or user agent
    const isMobileScreen = window.innerWidth < 1024;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobileScreen || isMobileUA) {
      // Small delay so the page loads first
      const timer = setTimeout(() => setShowPrompt(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  function applyDesktopViewport() {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement("meta");
      viewport.setAttribute("name", "viewport");
      document.head.appendChild(viewport);
    }
    // Force a 1280px-wide layout — the browser will zoom out to fit
    viewport.setAttribute("content", "width=1280, initial-scale=0.1");
  }

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    applyDesktopViewport();
    setShowPrompt(false);
  }

  function handleDismiss() {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setShowPrompt(false);
  }

  if (!showPrompt) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99998,
          background: "rgba(0, 0, 0, 0.70)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          animation: "dtp-fadeIn 0.4s ease-out forwards",
        }}
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            maxWidth: "420px",
            width: "100%",
            background:
              "linear-gradient(135deg, rgba(13,13,13,0.95) 0%, rgba(20,18,16,0.95) 100%)",
            border: "1px solid rgba(255, 119, 28, 0.2)",
            borderRadius: "16px",
            padding: "32px 28px",
            boxShadow:
              "0 0 60px rgba(255, 119, 28, 0.08), 0 25px 50px rgba(0,0,0,0.5)",
            animation: "dtp-slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "56px",
              height: "56px",
              margin: "0 auto 20px",
              borderRadius: "14px",
              background: "rgba(255, 119, 28, 0.1)",
              border: "1px solid rgba(255, 119, 28, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF771C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: "0 0 8px",
              letterSpacing: "-0.02em",
            }}
          >
            Desktop View Recommended
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#98989E",
              margin: "0 0 28px",
            }}
          >
            This site is crafted for desktop screens. Switch to desktop view for
            the best experience with all animations and layouts.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* Accept button */}
            <button
              id="desktop-view-accept"
              onClick={handleAccept}
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.02em",
                color: "#000000",
                background: "linear-gradient(135deg, #FF771C 0%, #FF9A4D 100%)",
                boxShadow:
                  "0 0 20px rgba(255, 119, 28, 0.3), 0 4px 12px rgba(255, 119, 28, 0.2)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(255, 119, 28, 0.4), 0 6px 16px rgba(255, 119, 28, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(255, 119, 28, 0.3), 0 4px 12px rgba(255, 119, 28, 0.2)";
              }}
            >
              Switch to Desktop View
            </button>

            {/* Dismiss button */}
            <button
              id="desktop-view-dismiss"
              onClick={handleDismiss}
              style={{
                width: "100%",
                padding: "12px 24px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                color: "#6B6D70",
                background: "rgba(255,255,255,0.03)",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#98989E";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6B6D70";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              Continue on mobile
            </button>
          </div>
        </div>
      </div>

      {/* Keyframe animations injected via style tag */}
      <style>{`
        @keyframes dtp-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes dtp-slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
