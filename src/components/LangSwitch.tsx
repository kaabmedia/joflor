"use client";

import { useRouter } from "next/navigation";

import type { Lang } from "@/lib/locale";

export function LangSwitch({ lang, className = "" }: { lang: Lang; className?: string }) {
  const router = useRouter();

  function set(l: Lang) {
    if (l === lang) return;
    document.cookie = `lang=${l};path=/;max-age=31536000;samesite=lax`;
    router.refresh();
  }

  return (
    <div className={`lang-sw ${className}`.trim()} role="group" aria-label="Taal / Language">
      <button type="button" className={lang === "nl" ? "on" : ""} onClick={() => set("nl")}>
        NL
      </button>
      <i>/</i>
      <button type="button" className={lang === "en" ? "on" : ""} onClick={() => set("en")}>
        EN
      </button>
    </div>
  );
}
