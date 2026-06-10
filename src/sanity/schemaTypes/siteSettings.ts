import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site-instellingen",
  type: "document",
  groups: [
    { name: "contact", title: "Contact & adres", default: true },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({ name: "phone", title: "Telefoon (weergave)", type: "string", group: "contact" }),
    defineField({ name: "phoneHref", title: "Telefoon (tel:-link)", type: "string", group: "contact" }),
    defineField({ name: "email", title: "E-mail", type: "string", group: "contact" }),
    defineField({ name: "addressLine1", title: "Straat + nr", type: "string", group: "contact" }),
    defineField({ name: "postalCity", title: "Postcode + plaats", type: "string", group: "contact" }),
    defineField({ name: "country", title: "Land", type: "localeString", group: "contact" }),
    defineField({ name: "mapsUrl", title: "Google Maps-link", type: "url", group: "contact" }),

    defineField({ name: "footerIntro", title: "Footer-intro", type: "localeText", group: "footer" }),
    defineField({ name: "mpsLogoUrl", title: "MPS-logo URL", type: "url", group: "footer" }),
    defineField({ name: "copyright", title: "Copyright-regel", type: "localeString", group: "footer" }),
    defineField({ name: "credit", title: "Credit-regel", type: "localeString", group: "footer" }),
  ],
  preview: { prepare: () => ({ title: "Site-instellingen" }) },
});
