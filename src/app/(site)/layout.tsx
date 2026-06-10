import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { SETTINGS_QUERY, ALL_CERTS_QUERY } from "@/sanity/lib/queries";
import { Chrome } from "@/components/Chrome";
import { Footer } from "@/components/Footer";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { getLang } from "@/lib/getLang";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const [settingsRes, certsRes] = await Promise.all([
    sanityFetch({ query: SETTINGS_QUERY }),
    sanityFetch({ query: ALL_CERTS_QUERY }),
  ]);
  const settings: any = settingsRes.data;
  const certificates: any = certsRes.data;

  return (
    <>
      <Chrome lang={lang} settings={settings}>
        {children}
      </Chrome>
      <Footer settings={settings} certificates={certificates ?? []} lang={lang} />
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </>
  );
}
