import type { StructureResolver } from "sanity/structure";

const SINGLETONS: { type: string; title: string }[] = [
  { type: "siteSettings", title: "Site-instellingen" },
  { type: "homePage", title: "Home" },
  { type: "aboutPage", title: "Over ons" },
  { type: "collectionPage", title: "Collectie" },
  { type: "floraxchangePage", title: "FloraXchange" },
  { type: "showroomPage", title: "Showroom" },
  { type: "carePage", title: "Verzorging" },
  { type: "certificatesPage", title: "Certificaten" },
  { type: "contactPage", title: "Contact" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Joflor")
    .items([
      ...SINGLETONS.map(({ type, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type))
      ),
      S.divider(),
      S.documentTypeListItem("model").title("Figuurmodellen"),
      S.documentTypeListItem("certificate").title("Certificaten (los)"),
      S.documentTypeListItem("person").title("Contactpersonen"),
      S.documentTypeListItem("season").title("Seizoenen / feestdagen"),
    ]);

/** Document-types die als singleton beheerd worden (geen "nieuw" knop). */
export const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.type));
