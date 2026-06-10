import { sanityFetch } from "@/sanity/lib/live";
import { SHOWROOM_QUERY } from "@/sanity/lib/queries";
import { getLang } from "@/lib/getLang";
import { L } from "@/lib/locale";
import { Accent, Cta } from "@/components/render";

export default async function ShowroomPage() {
  const lang = await getLang();
  const p: any = (await sanityFetch({ query: SHOWROOM_QUERY })).data;
  const d = p ?? {};
  const t = (f: any) => L(f, lang);

  return (
    <article className="page active" data-page="showroom">
      <header className="phead">
        <div className="wrap">
          <p className="eyebrow">
            <span className="ln">
              <span>{t(d.heroEyebrow)}</span>
            </span>
          </p>
          <h1 className="d1">
            <span className="ln">
              <span>{t(d.heroTitleLine1)}</span>
            </span>
            <span className="ln">
              <span>
                <Accent parts={d.heroTitle} lang={lang} />
              </span>
            </span>
          </h1>
          <p className="lede rv">{t(d.heroLede)}</p>
          <div className="phead-bar" />
        </div>
      </header>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <figure className="ph rv" data-fb={d.image?.fallback || ""} style={{ aspectRatio: "16 / 8" }}>
            {d.image?.url ? <img className="px" loading="lazy" src={d.image.url} alt={d.image.alt || ""} /> : null}
            <figcaption className="cap">
              <i />
              {t(d.imageCaption)}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="split-copy">
            <p className="eyebrow rv">{t(d.introEyebrow)}</p>
            <h2 className="d2 rv">{t(d.introHeading)}</h2>
            <p className="rv">{t(d.introText)}</p>
          </div>
          <div className="zorg-card rv" style={{ background: "var(--kas)", color: "var(--wit)", border: 0 }}>
            <p className="eyebrow" style={{ color: "#FBFBF8" }}>
              {t(d.cardEyebrow)}
            </p>
            <h3 style={{ fontFamily: "var(--disp)", fontWeight: 500, fontSize: 24, margin: "14px 0 10px" }}>
              {t(d.cardHeading)}
            </h3>
            <p style={{ opacity: 0.85 }}>{t(d.cardText)}</p>
            <Cta
              btn={{ label: d.cardCtaLabel, href: "/contact", style: "verf" }}
              lang={lang}
              className="rv"
            />
          </div>
        </div>
      </section>
    </article>
  );
}
