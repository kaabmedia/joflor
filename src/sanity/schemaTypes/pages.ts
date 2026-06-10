import { defineArrayMember, defineField, defineType } from "sanity";

const heroFields = (titleDefault = "Titel") => [
  defineField({ name: "heroEyebrow", title: "Eyebrow", type: "localeString" }),
  defineField({ name: "heroTitleLine1", title: "Titel — regel 1", type: "localeString" }),
  defineField({ name: "heroTitle", title: `Titel — regel 2 (${titleDefault})`, type: "headingParts" }),
  defineField({ name: "heroLede", title: "Inleiding", type: "localeText" }),
];

/* ============================ HOME ============================ */
export const homePage = defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "collectie", title: "Collectie" },
    { name: "proces", title: "Verfproces" },
    { name: "showroom", title: "Showroom-banner" },
    { name: "cert", title: "Certificaten-teaser" },
  ],
  fields: [
    ...heroFields("Kleur").map((f) => ({ ...f, group: "hero" })),
    defineField({ name: "heroPrimaryCta", title: "Knop 1", type: "ctaButton", group: "hero" }),
    defineField({ name: "heroSecondaryCta", title: "Knop 2", type: "ctaButton", group: "hero" }),
    defineField({ name: "heroMainImage", title: "Hoofdafbeelding", type: "mediaImage", group: "hero" }),
    defineField({ name: "heroMainCaption", title: "Bijschrift hoofdafbeelding", type: "localeString", group: "hero" }),
    defineField({ name: "heroSideImage", title: "Zijafbeelding", type: "mediaImage", group: "hero" }),
    defineField({ name: "heroSideCaption", title: "Bijschrift zijafbeelding", type: "localeString", group: "hero" }),
    defineField({
      name: "marquee",
      title: "Lopende band (woorden)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "hero",
    }),

    defineField({
      name: "stats",
      title: "Cijfers",
      type: "array",
      of: [defineArrayMember({ type: "statItem" })],
      group: "hero",
    }),

    defineField({ name: "collectionEyebrow", title: "Eyebrow", type: "localeString", group: "collectie" }),
    defineField({ name: "collectionHeading", title: "Kop", type: "headingParts", group: "collectie" }),
    defineField({ name: "collectionLinkLabel", title: "Link-tekst", type: "localeString", group: "collectie" }),
    defineField({
      name: "featuredModels",
      title: "Uitgelichte modellen",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "model" }] })],
      group: "collectie",
    }),

    defineField({ name: "procesEyebrow", title: "Eyebrow", type: "localeString", group: "proces" }),
    defineField({ name: "procesHeading", title: "Kop", type: "headingParts", group: "proces" }),
    defineField({ name: "procesLede", title: "Inleiding", type: "localeText", group: "proces" }),
    defineField({ name: "procesImage", title: "Afbeelding", type: "mediaImage", group: "proces" }),
    defineField({ name: "procesImageCaption", title: "Bijschrift", type: "localeString", group: "proces" }),
    defineField({
      name: "procesSteps",
      title: "Stappen",
      type: "array",
      of: [defineArrayMember({ type: "stepItem" })],
      group: "proces",
    }),
    defineField({ name: "procesCtaLabel", title: "Knop-tekst", type: "localeString", group: "proces" }),

    defineField({ name: "bannerEyebrow", title: "Eyebrow", type: "localeString", group: "showroom" }),
    defineField({ name: "bannerHeading", title: "Kop", type: "headingParts", group: "showroom" }),
    defineField({ name: "bannerImage", title: "Afbeelding", type: "mediaImage", group: "showroom" }),
    defineField({ name: "bannerCtaLabel", title: "Knop-tekst", type: "localeString", group: "showroom" }),

    defineField({ name: "certEyebrow", title: "Eyebrow", type: "localeString", group: "cert" }),
    defineField({ name: "certHeading", title: "Kop", type: "localeString", group: "cert" }),
    defineField({ name: "certLinkLabel", title: "Link-tekst", type: "localeString", group: "cert" }),
    defineField({
      name: "certExtraChips",
      title: "Extra chips (naast certificaten)",
      type: "array",
      of: [defineArrayMember({ type: "localeString" })],
      group: "cert",
    }),
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});

/* ============================ OVER ONS ============================ */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "Over ons",
  type: "document",
  fields: [
    ...heroFields("Westland"),
    defineField({ name: "storyEyebrow", title: "Verhaal — eyebrow", type: "localeString" }),
    defineField({ name: "storyHeading", title: "Verhaal — kop", type: "localeString" }),
    defineField({ name: "storyImage", title: "Verhaal — afbeelding", type: "mediaImage" }),
    defineField({ name: "storyImageCaption", title: "Verhaal — bijschrift", type: "localeString" }),
    defineField({
      name: "storyParagraphs",
      title: "Verhaal — alinea's",
      type: "array",
      of: [defineArrayMember({ type: "localeText" })],
    }),
    defineField({ name: "quote", title: "Citaat", type: "localeText" }),
    defineField({ name: "quoteBy", title: "Citaat — door", type: "string" }),

    defineField({ name: "sustainEyebrow", title: "Duurzaam — eyebrow", type: "localeString" }),
    defineField({ name: "sustainHeading", title: "Duurzaam — kop", type: "headingParts" }),
    defineField({
      name: "sustainSteps",
      title: "Duurzaam — stappen",
      type: "array",
      of: [defineArrayMember({ type: "stepItem" })],
    }),
    defineField({ name: "sustainImage", title: "Duurzaam — afbeelding", type: "mediaImage" }),
    defineField({ name: "sustainImageCaption", title: "Duurzaam — bijschrift", type: "localeString" }),

    defineField({ name: "futureEyebrow", title: "Toekomst — eyebrow", type: "localeString" }),
    defineField({ name: "futureHeading", title: "Toekomst — kop", type: "headingParts" }),
    defineField({ name: "futureText", title: "Toekomst — tekst", type: "localeText" }),
    defineField({ name: "futurePrimaryCta", title: "Toekomst — knop 1", type: "ctaButton" }),
    defineField({ name: "futureSecondaryCta", title: "Toekomst — knop 2", type: "ctaButton" }),
    defineField({ name: "futureImage", title: "Toekomst — afbeelding", type: "mediaImage" }),
  ],
  preview: { prepare: () => ({ title: "Over ons" }) },
});

/* ============================ COLLECTIE ============================ */
export const collectionPage = defineType({
  name: "collectionPage",
  title: "Collectie",
  type: "document",
  fields: [
    ...heroFields("kleur"),
    defineField({ name: "modelsEyebrow", title: "Modellen — eyebrow", type: "localeString" }),
    defineField({ name: "modelsHeading", title: "Modellen — kop", type: "headingParts" }),

    defineField({ name: "namingImage", title: "Naamgeving — afbeelding", type: "mediaImage" }),
    defineField({ name: "namingImageCaption", title: "Naamgeving — bijschrift", type: "localeString" }),
    defineField({ name: "namingEyebrow", title: "Naamgeving — eyebrow", type: "localeString" }),
    defineField({ name: "namingHeading", title: "Naamgeving — kop", type: "headingParts" }),
    defineField({ name: "namingText", title: "Naamgeving — tekst", type: "localeText" }),
    defineField({
      name: "namingChips",
      title: "Naamgeving — chips",
      type: "array",
      of: [defineArrayMember({ type: "localeString" })],
    }),
    defineField({ name: "namingNote", title: "Naamgeving — kleine tekst", type: "localeText" }),

    defineField({ name: "seasonsEyebrow", title: "Seizoenen — eyebrow", type: "localeString" }),
    defineField({ name: "seasonsHeading", title: "Seizoenen — kop", type: "headingParts" }),
    defineField({ name: "seasonsLede", title: "Seizoenen — inleiding", type: "localeText" }),
    defineField({ name: "seasonsCtaLabel", title: "Seizoenen — knop", type: "localeString" }),
  ],
  preview: { prepare: () => ({ title: "Collectie" }) },
});

/* ============================ FLORAXCHANGE ============================ */
export const floraxchangePage = defineType({
  name: "floraxchangePage",
  title: "FloraXchange",
  type: "document",
  fields: [
    ...heroFields("FloraXchange"),
    defineField({
      name: "cards",
      title: "Webshop-kaarten",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "fxCard",
          fields: [
            defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
            defineField({ name: "title", title: "Titel", type: "localeString" }),
            defineField({ name: "text", title: "Tekst", type: "localeText" }),
            defineField({ name: "href", title: "Link", type: "url" }),
            defineField({ name: "linkLabel", title: "Link-tekst", type: "localeString" }),
            defineField({ name: "image", title: "Afbeelding", type: "mediaImage" }),
          ],
          preview: { select: { title: "title.nl" } },
        }),
      ],
    }),
    defineField({ name: "contactHeading", title: "Contactblok — kop", type: "localeString" }),
    defineField({ name: "contactText", title: "Contactblok — tekst", type: "localeText" }),
    defineField({ name: "contactCtaLabel", title: "Contactblok — knop", type: "localeString" }),
    defineField({
      name: "contactChips",
      title: "Contactblok — chips",
      type: "array",
      of: [defineArrayMember({ type: "localeString" })],
    }),
  ],
  preview: { prepare: () => ({ title: "FloraXchange" }) },
});

/* ============================ SHOWROOM ============================ */
export const showroomPage = defineType({
  name: "showroomPage",
  title: "Showroom",
  type: "document",
  fields: [
    ...heroFields("meedenken"),
    defineField({ name: "image", title: "Afbeelding", type: "mediaImage" }),
    defineField({ name: "imageCaption", title: "Bijschrift", type: "localeString" }),
    defineField({ name: "introEyebrow", title: "Intro — eyebrow", type: "localeString" }),
    defineField({ name: "introHeading", title: "Intro — kop", type: "localeString" }),
    defineField({ name: "introText", title: "Intro — tekst", type: "localeText" }),
    defineField({ name: "cardEyebrow", title: "Kaart — eyebrow", type: "localeString" }),
    defineField({ name: "cardHeading", title: "Kaart — kop", type: "localeString" }),
    defineField({ name: "cardText", title: "Kaart — tekst", type: "localeText" }),
    defineField({ name: "cardCtaLabel", title: "Kaart — knop", type: "localeString" }),
  ],
  preview: { prepare: () => ({ title: "Showroom" }) },
});

/* ============================ VERZORGING ============================ */
export const carePage = defineType({
  name: "carePage",
  title: "Verzorging",
  type: "document",
  fields: [
    ...heroFields("Phalaenopsis"),
    defineField({
      name: "cards",
      title: "Verzorgingskaarten",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "careCard",
          fields: [
            defineField({
              name: "icon",
              title: "Icoon",
              type: "string",
              options: {
                list: [
                  { title: "Zon", value: "sun" },
                  { title: "Druppel", value: "drop" },
                ],
                layout: "radio",
              },
            }),
            defineField({ name: "title", title: "Titel", type: "localeString" }),
            defineField({
              name: "paragraphs",
              title: "Alinea's",
              type: "array",
              of: [defineArrayMember({ type: "localeText" })],
            }),
          ],
          preview: { select: { title: "title.nl" } },
        }),
      ],
    }),
    defineField({ name: "summaryImage", title: "Samenvatting — afbeelding", type: "mediaImage" }),
    defineField({ name: "summaryImageCaption", title: "Samenvatting — bijschrift", type: "localeString" }),
    defineField({ name: "summaryEyebrow", title: "Samenvatting — eyebrow", type: "localeString" }),
    defineField({ name: "summaryHeading", title: "Samenvatting — kop", type: "localeString" }),
    defineField({
      name: "summaryChips",
      title: "Samenvatting — vuistregels (chips)",
      type: "array",
      of: [defineArrayMember({ type: "localeString" })],
    }),
    defineField({ name: "summaryNote", title: "Samenvatting — kleine tekst", type: "localeText" }),
    defineField({ name: "summaryCtaLabel", title: "Samenvatting — knop", type: "localeString" }),
  ],
  preview: { prepare: () => ({ title: "Verzorging" }) },
});

/* ============================ CERTIFICATEN ============================ */
export const certificatesPage = defineType({
  name: "certificatesPage",
  title: "Certificaten",
  type: "document",
  fields: [
    ...heroFields("duurzaam"),
    defineField({ name: "meaningEyebrow", title: "Betekenis — eyebrow", type: "localeString" }),
    defineField({ name: "meaningHeading", title: "Betekenis — kop", type: "headingParts" }),
    defineField({
      name: "meaningParagraphs",
      title: "Betekenis — alinea's",
      type: "array",
      of: [defineArrayMember({ type: "localeText" })],
    }),
    defineField({ name: "meaningLogoUrl", title: "Betekenis — logo URL", type: "url" }),
  ],
  preview: { prepare: () => ({ title: "Certificaten" }) },
});

/* ============================ CONTACT ============================ */
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact",
  type: "document",
  fields: [
    ...heroFields("mee"),
    defineField({ name: "locationEyebrow", title: "Locatie — eyebrow", type: "localeString" }),
    defineField({ name: "locationNote", title: "Locatie — kleine tekst", type: "localeString" }),
    defineField({ name: "locationCtaLabel", title: "Locatie — knop", type: "localeString" }),
    defineField({ name: "locationImage", title: "Locatie — afbeelding", type: "mediaImage" }),
  ],
  preview: { prepare: () => ({ title: "Contact" }) },
});
