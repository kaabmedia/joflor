"use client";

import { useVisualEditingEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {
  const environment = useVisualEditingEnvironment();

  // Alleen tonen wanneer je de site los bekijkt (niet in de Presentation-tool)
  if (environment !== "standalone" && environment !== null) return null;

  return (
    <a
      href="/api/draft-mode/disable"
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
        zIndex: 1000,
        background: "#121D16",
        color: "#fff",
        padding: "8px 14px",
        borderRadius: "999px",
        fontSize: "13px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      Preview uitschakelen
    </a>
  );
}
