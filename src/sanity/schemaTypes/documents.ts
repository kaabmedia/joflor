import { defineField, defineType } from "sanity";

/* ---------- Figuurmodel (Boog, Cascade, Waterval, T-model, 1 en 2 tak) ---------- */
export const modelType = defineType({
  name: "model",
  title: "Figuurmodel",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Volgorde", type: "number" }),
    defineField({ name: "tagje", title: "Label (bv. Model 1)", type: "localeString" }),
    defineField({ name: "name", title: "Naam", type: "localeString" }),
    defineField({ name: "description", title: "Omschrijving", type: "localeText" }),
    defineField({ name: "image", title: "Afbeelding", type: "mediaImage" }),
  ],
  orderings: [
    { title: "Volgorde", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name.nl", subtitle: "tagje.nl", order: "order" },
    prepare: ({ title, subtitle, order }) => ({
      title: title || "Model",
      subtitle: [order != null ? `#${order}` : null, subtitle].filter(Boolean).join(" · "),
    }),
  },
});

/* ---------- Certificaat ---------- */
export const certificateType = defineType({
  name: "certificate",
  title: "Certificaat",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Volgorde", type: "number" }),
    defineField({ name: "title", title: "Titel", type: "string" }),
    defineField({ name: "description", title: "Omschrijving", type: "localeText" }),
    defineField({
      name: "pdf",
      title: "PDF-bestand (upload)",
      type: "file",
      options: { accept: ".pdf,application/pdf" },
    }),
    defineField({
      name: "pdfUrl",
      title: "of externe PDF-link",
      description: "Alleen nodig als er geen bestand is geüpload.",
      type: "url",
    }),
    defineField({
      name: "chipLabel",
      title: "Korte labeltekst (voor chip op home)",
      type: "localeString",
    }),
  ],
  orderings: [
    { title: "Volgorde", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "title", order: "order" } },
});

/* ---------- Contactpersoon ---------- */
export const personType = defineType({
  name: "person",
  title: "Contactpersoon",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Volgorde", type: "number" }),
    defineField({ name: "name", title: "Naam", type: "string" }),
    defineField({ name: "initial", title: "Initiaal", type: "string" }),
    defineField({ name: "role", title: "Functie", type: "localeString" }),
    defineField({ name: "phone", title: "Telefoon (weergave)", type: "string" }),
    defineField({ name: "phoneHref", title: "Telefoon (tel:-link)", type: "string" }),
    defineField({ name: "email", title: "E-mail", type: "string" }),
  ],
  orderings: [
    { title: "Volgorde", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "name", subtitle: "role.nl" } },
});

/* ---------- Seizoen / feestdag ---------- */
export const seasonType = defineType({
  name: "season",
  title: "Seizoen / feestdag",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Volgorde", type: "number" }),
    defineField({ name: "month", title: "Maand/periode", type: "localeString" }),
    defineField({ name: "title", title: "Titel", type: "localeString" }),
    defineField({ name: "description", title: "Omschrijving", type: "localeText" }),
  ],
  orderings: [
    { title: "Volgorde", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "title.nl", subtitle: "month.nl", order: "order" } },
});
