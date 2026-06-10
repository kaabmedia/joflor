import { cookies } from "next/headers";

import type { Lang } from "./locale";

/** Leest de taalkeuze uit de cookie (default NL). Server-only. */
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return store.get("lang")?.value === "en" ? "en" : "nl";
}
