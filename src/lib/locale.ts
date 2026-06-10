export type Lang = "nl" | "en";

export type LocaleField =
  | { nl?: string | null; en?: string | null }
  | null
  | undefined;

/** Kies de juiste taal uit een NL/EN-veld, met NL als terugval. */
export function L(field: LocaleField, lang: Lang): string {
  if (!field) return "";
  return (field[lang] ?? field.nl ?? field.en ?? "") as string;
}
