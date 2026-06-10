import { sanityFetch } from "@/sanity/lib/live";
import { COLLECTION_QUERY } from "@/sanity/lib/queries";
import { getLang } from "@/lib/getLang";
import { L } from "@/lib/locale";
import { Accent, Cta, Chips } from "@/components/render";

export default async function CollectionPage() {
  const lang = await getLang();
  const data: any = (await sanityFetch({ query: COLLECTION_QUERY })).data;
  const d = data?.page ?? {};
  const models = data?.models ?? [];
  const seasons = data?.seasons ?? [];
  const t = (f: any) => L(f, lang);

  return (
    <article className="page active" data-page="collectie">
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
          <div className="sec-head">
            <div>
              <p className="eyebrow rv">{t(d.modelsEyebrow)}</p>
              <h2 className="d2 rv">
                <Accent parts={d.modelsHeading} lang={lang} />
              </h2>
            </div>
          </div>
          <div className="cards cards-5">
            {models.map((m: any) => (
              <a className="card rv" href="/floraxchange" key={m._id}>
                <figure className="ph" data-fb={m.image?.fallback || ""}>
                  {m.image?.url ? <img loading="lazy" src={m.image.url} alt={m.image.alt || ""} /> : null}
                </figure>
                <span className="tagje">{t(m.tagje)}</span>
                <h3>{t(m.name)}</h3>
                <p>{t(m.description)}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-dark">
        <div className="wrap split">
          <figure className="ph ph-arch rv-l" data-fb={d.namingImage?.fallback || ""}>
            {d.namingImage?.url ? <img className="px" loading="lazy" src={d.namingImage.url} alt={d.namingImage.alt || ""} /> : null}
            <figcaption className="cap">
              <i />
              {t(d.namingImageCaption)}
            </figcaption>
          </figure>
          <div className="split-copy">
            <p className="eyebrow rv">{t(d.namingEyebrow)}</p>
            <h2 className="d2 rv">
              <Accent parts={d.namingHeading} lang={lang} />
            </h2>
            <p className="rv">{t(d.namingText)}</p>
            <Chips items={d.namingChips} lang={lang} className="rv" style={{ marginTop: 24 }} />
            <p className="small rv" style={{ marginTop: 18 }}>
              {t(d.namingNote)}
            </p>
          </div>
        </div>
      </section>

      <section className="section band-blush">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow rv">{t(d.seasonsEyebrow)}</p>
              <h2 className="d2 rv">
                <Accent parts={d.seasonsHeading} lang={lang} />
              </h2>
              <p className="lede rv">{t(d.seasonsLede)}</p>
            </div>
          </div>
          <div className="seizoen">
            {seasons.map((s: any) => (
              <div className="sz rv" key={s._id}>
                <span>{t(s.month)}</span>
                <b>{t(s.title)}</b>
                <p>{t(s.description)}</p>
              </div>
            ))}
          </div>
          <div className="rv" style={{ marginTop: 38 }}>
            <Cta btn={{ label: d.seasonsCtaLabel, href: "/floraxchange", style: "ink" }} lang={lang} />
          </div>
        </div>
      </section>
    </article>
  );
}
