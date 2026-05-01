"use client";

import { MaskedAvatars } from "@/components/ui/masked-avatars";

const avatars = [
  { avatar: "/avatars/AV1.png", name: "Tyler" },
  { avatar: "/avatars/AV2.png", name: "Dora" },
  { avatar: "/avatars/AV3.png", name: "Johan" },
  { avatar: "/avatars/AV4.png", name: "Vegeta" },
  { avatar: "/avatars/AV6.png", name: "Robin" },
];

export function MaskedAvatarsDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <MaskedAvatars avatars={avatars} />
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          letterSpacing: "0.12em",
          color: "#6B6D70",
          textTransform: "uppercase",
        }}
      >
        Trusted by our clients
      </p>
    </div>
  );
}
