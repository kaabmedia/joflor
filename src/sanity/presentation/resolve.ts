import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

const page = (href: string, title: string) =>
  defineLocations({
    select: {},
    resolve: () => ({
      locations: [{ title, href }],
    }),
  });

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    siteSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: "Home", href: "/" }],
      }),
    }),
    homePage: page("/", "Home"),
    aboutPage: page("/over-ons", "Over ons"),
    collectionPage: page("/collectie", "Collectie"),
    floraxchangePage: page("/floraxchange", "FloraXchange"),
    showroomPage: page("/showroom", "Showroom"),
    carePage: page("/verzorging", "Verzorging"),
    certificatesPage: page("/certificaten", "Certificaten"),
    contactPage: page("/contact", "Contact"),
    model: defineLocations({
      select: { name: "name.nl" },
      resolve: (doc) => ({
        locations: [
          { title: (doc?.name as string) || "Model", href: "/collectie" },
          { title: "Home", href: "/" },
        ],
      }),
    }),
    certificate: page("/certificaten", "Certificaten"),
    person: page("/contact", "Contact"),
    season: page("/collectie", "Collectie"),
  },
};
