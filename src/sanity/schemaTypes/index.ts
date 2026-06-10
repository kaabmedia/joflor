import { type SchemaTypeDefinition } from "sanity";

import {
  localeString,
  localeText,
  headingParts,
  mediaImage,
  ctaButton,
  statItem,
  stepItem,
} from "./objects";
import {
  modelType,
  certificateType,
  personType,
  seasonType,
} from "./documents";
import { siteSettings } from "./siteSettings";
import {
  homePage,
  aboutPage,
  collectionPage,
  floraxchangePage,
  showroomPage,
  carePage,
  certificatesPage,
  contactPage,
} from "./pages";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // objects
    localeString,
    localeText,
    headingParts,
    mediaImage,
    ctaButton,
    statItem,
    stepItem,
    // singletons
    siteSettings,
    homePage,
    aboutPage,
    collectionPage,
    floraxchangePage,
    showroomPage,
    carePage,
    certificatesPage,
    contactPage,
    // documents
    modelType,
    certificateType,
    personType,
    seasonType,
  ],
};
