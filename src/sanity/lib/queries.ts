import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]`);

export const ALL_CERTS_QUERY = defineQuery(
  `*[_type == "certificate"] | order(order asc){ _id, title, "pdfHref": coalesce(pdf.asset->url, pdfUrl) }`
);

export const HOME_QUERY = defineQuery(`{
  "page": *[_type == "homePage"][0]{
    ...,
    featuredModels[]->
  },
  "certificates": *[_type == "certificate"] | order(order asc)
}`);

export const ABOUT_QUERY = defineQuery(`*[_type == "aboutPage"][0]`);

export const COLLECTION_QUERY = defineQuery(`{
  "page": *[_type == "collectionPage"][0],
  "models": *[_type == "model"] | order(order asc),
  "seasons": *[_type == "season"] | order(order asc)
}`);

export const FLORAX_QUERY = defineQuery(`*[_type == "floraxchangePage"][0]`);

export const SHOWROOM_QUERY = defineQuery(`*[_type == "showroomPage"][0]`);

export const CARE_QUERY = defineQuery(`*[_type == "carePage"][0]`);

export const CERTIFICATES_QUERY = defineQuery(`{
  "page": *[_type == "certificatesPage"][0],
  "certificates": *[_type == "certificate"] | order(order asc){
    ...,
    "pdfHref": coalesce(pdf.asset->url, pdfUrl)
  }
}`);

export const CONTACT_QUERY = defineQuery(`{
  "page": *[_type == "contactPage"][0],
  "persons": *[_type == "person"] | order(order asc)
}`);
