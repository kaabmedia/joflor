import type { Lang } from "./locale";

type NavItem = { href: string; nl: string; en: string; pageLink?: string };

export const MAIN_NAV: NavItem[] = [
  { href: "/over-ons", nl: "Over ons", en: "About us", pageLink: "over-ons" },
  // Certificaten tijdelijk verborgen
  // { href: "/certificaten", nl: "Certificaten", en: "Certificates", pageLink: "certificaten" },
  { href: "/contact", nl: "Contact", en: "Contact", pageLink: "contact" },
];

export const SUB_NAV: NavItem[] = [
  { href: "/collectie", nl: "Joflor collectie", en: "Joflor collection" },
  { href: "/floraxchange", nl: "FloraXchange", en: "FloraXchange" },
  { href: "/showroom", nl: "Showroom", en: "Showroom" },
  { href: "/verzorging", nl: "Verzorging", en: "Care" },
];

export const MOBILE_NAV: NavItem[] = [
  { href: "/", nl: "Home", en: "Home" },
  { href: "/over-ons", nl: "Over ons", en: "About us" },
  { href: "/collectie", nl: "Collectie", en: "Collection" },
  { href: "/floraxchange", nl: "FloraXchange ›", en: "FloraXchange ›" },
  { href: "/showroom", nl: "Showroom ›", en: "Showroom ›" },
  { href: "/verzorging", nl: "Verzorging ›", en: "Care ›" },
  // Certificaten tijdelijk verborgen
  // { href: "/certificaten", nl: "Certificaten", en: "Certificates" },
  { href: "/contact", nl: "Contact", en: "Contact" },
];

export const UI = {
  assortiment: { nl: "Assortiment", en: "Assortment" },
  planVisit: { nl: "Plan een bezoek", en: "Plan a visit" },
  skip: { nl: "Direct naar de inhoud", en: "Skip to content" },
};

export const tNav = (item: NavItem, lang: Lang) => (lang === "en" ? item.en : item.nl);
