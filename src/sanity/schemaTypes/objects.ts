import { defineField, defineType } from "sanity";

/* ---------- Lokalisatie: veld-niveau NL/EN ---------- */
export const localeString = defineType({
  name: "localeString",
  title: "Tekst (NL/EN)",
  type: "object",
  fields: [
    defineField({ name: "nl", title: "Nederlands", type: "string" }),
    defineField({ name: "en", title: "Engels", type: "string" }),
  ],
  options: { columns: 2 },
});

export const localeText = defineType({
  name: "localeText",
  title: "Tekst lang (NL/EN)",
  type: "object",
  fields: [
    defineField({ name: "nl", title: "Nederlands", type: "text", rows: 4 }),
    defineField({ name: "en", title: "Engels", type: "text", rows: 4 }),
  ],
  options: { columns: 2 },
});

/* ---------- Kop met accentwoord (italic of "verf"-gradient) ---------- */
export const headingParts = defineType({
  name: "headingParts",
  title: "Kop met accent",
  type: "object",
  fields: [
    defineField({ name: "pre", title: "Tekst voor accent", type: "localeString" }),
    defineField({ name: "accent", title: "Accentwoord", type: "localeString" }),
    defineField({ name: "post", title: "Tekst na accent", type: "localeString" }),
    defineField({
      name: "style",
      title: "Accentstijl",
      type: "string",
      options: {
        list: [
          { title: "Italic", value: "italic" },
          { title: "Verf (goud gradient)", value: "dye" },
          { title: "Geen", value: "none" },
        ],
        layout: "radio",
      },
      initialValue: "italic",
    }),
  ],
});

/* ---------- Afbeelding via URL (+ alt en terugval-label) ---------- */
export const mediaImage = defineType({
  name: "mediaImage",
  title: "Afbeelding",
  type: "object",
  fields: [
    defineField({ name: "url", title: "Afbeelding-URL", type: "url" }),
    defineField({ name: "alt", title: "Alt-tekst", type: "string" }),
    defineField({
      name: "fallback",
      title: "Terugval-label",
      description: "Tekst die getoond wordt als de afbeelding niet laadt",
      type: "string",
    }),
  ],
});

/* ---------- Knop ---------- */
export const ctaButton = defineType({
  name: "ctaButton",
  title: "Knop",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Tekst", type: "localeString" }),
    defineField({ name: "href", title: "Link", type: "string" }),
    defineField({
      name: "style",
      title: "Stijl",
      type: "string",
      options: {
        list: [
          { title: "Donker (ink)", value: "ink" },
          { title: "Omlijnd (ghost)", value: "ghost" },
          { title: "Goud (verf)", value: "verf" },
        ],
        layout: "radio",
      },
      initialValue: "ink",
    }),
  ],
});

/* ---------- Cijfer / statistiek ---------- */
export const statItem = defineType({
  name: "statItem",
  title: "Cijfer",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Getal", type: "number" }),
    defineField({ name: "suffix", title: "Achtervoegsel (bv. %)", type: "string" }),
    defineField({ name: "label", title: "Omschrijving", type: "localeText" }),
  ],
  preview: {
    select: { value: "value", label: "label.nl" },
    prepare: ({ value, label }) => ({ title: `${value ?? ""}`, subtitle: label }),
  },
});

/* ---------- Processtap ---------- */
export const stepItem = defineType({
  name: "stepItem",
  title: "Stap",
  type: "object",
  fields: [
    defineField({ name: "nr", title: "Nummer", type: "string" }),
    defineField({ name: "title", title: "Titel", type: "localeString" }),
    defineField({ name: "text", title: "Tekst", type: "localeText" }),
  ],
  preview: {
    select: { nr: "nr", title: "title.nl" },
    prepare: ({ nr, title }) => ({ title: `${nr ?? ""} ${title ?? ""}` }),
  },
});
