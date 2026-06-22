import { sanityFetch } from "@/sanity/lib/live";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { getLang } from "@/lib/getLang";
import { L } from "@/lib/locale";
import { Accent, Cta, ArrowR, Chips } from "@/components/render";

export default async function HomePage() {
  const lang = await getLang();
  const data: any = (await sanityFetch({ query: HOME_QUERY })).data;
  const p = data?.page ?? {};
  const certs = data?.certificates ?? [];
  const t = (f: any) => L(f, lang);

  const chipItems = [
    ...certs.map((c: any) => c?.chipLabel).filter(Boolean),
    ...(p.certExtraChips ?? []),
  ];

  return (
    <article className="page active" data-page="home">
      {/* ---------- hero ---------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="ln">
                <span>{t(p.heroEyebrow)}</span>
              </span>
            </p>
            <h1 className="d1">
              <span className="ln">
                <span>{t(p.heroTitleLine1)}</span>
              </span>
              <span className="ln">
                <span>
                  <Accent parts={p.heroTitle} lang={lang} />
                </span>
              </span>
            </h1>
            <p className="lede rv">{t(p.heroLede)}</p>
            <div className="hero-actions rv">
              <Cta btn={p.heroPrimaryCta} lang={lang} />
              <Cta btn={p.heroSecondaryCta} lang={lang} arrow={false} />
            </div>
          </div>
          <div className="hero-art">
            <figure className="ph ph-arch hero-main" data-fb={p.heroMainImage?.fallback || ""}>
              {p.heroMainImage?.url ? (
                <img className="px" src={p.heroMainImage.url} alt={p.heroMainImage.alt || ""} />
              ) : null}
              <figcaption className="cap">
                <i />
                {t(p.heroMainCaption)}
              </figcaption>
            </figure>
            <figure className="ph hero-side" data-fb={p.heroSideImage?.fallback || ""}>
              {p.heroSideImage?.url ? (
                <img className="dye-img" src={p.heroSideImage.url} alt={p.heroSideImage.alt || ""} />
              ) : null}
              <figcaption className="cap">
                <i />
                {t(p.heroSideCaption)}
              </figcaption>
            </figure>
            <div className="hero-stamp" aria-hidden="true">
              <svg viewBox="0 0 100 100">
                <defs>
                  <path id="cir" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
                </defs>
                <circle cx="50" cy="50" r="49" fill="#1C3326" />
                <circle cx="50" cy="50" r="7" fill="#D29A15" />
                <text fill="#FBFBF8" fontSize="9" letterSpacing="1.7" fontFamily="Archivo,sans-serif" fontWeight="600">
                  <textPath href="#cir">JOFLOR · PHALAENOPSIS · NAALDWIJK ·</textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- marquee ---------- */}
      <div className="marquee" aria-hidden="true">
        <div className="mq-track" id="mq">
          {(p.marquee ?? []).map((s: string, i: number) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>

      {/* ---------- cijfers ---------- */}
      <section className="section-tight">
        <div className="wrap">
          <div className="stats">
            {(p.stats ?? []).map((st: any, i: number) => (
              <div className="stat rv" key={i}>
                <div className="num">
                  <span data-count={st.value}>0</span>
                  {st.suffix ? <em>{st.suffix}</em> : null}
                </div>
                <p>{t(st.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- collectie ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow rv">{t(p.collectionEyebrow)}</p>
              <h2 className="d2 rv">
                <Accent parts={p.collectionHeading} lang={lang} />
              </h2>
            </div>
            <a className="tlink rv" href="/collectie">
              {t(p.collectionLinkLabel)}
              <ArrowR />
            </a>
          </div>
          <div className="cards">
            {(p.featuredModels ?? []).map((m: any) => (
              <a className="card rv" href="/collectie" key={m._id}>
                <figure className="ph" data-fb={m.image?.fallback || ""}>
                  {m.image?.url ? <img loading="lazy" src={m.image.url} alt={m.image.alt || ""} /> : null}
                </figure>
                <span className="tagje">Model</span>
                <h3>
                  {t(m.name)} <ArrowR />
                </h3>
                <p>{t(m.description)}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- verfproces ---------- */}
      <section className="section on-dark">
        <div className="wrap proces-grid">
          <div className="proces-art rv-l">
            <figure className="ph ph-arch" data-fb={p.procesImage?.fallback || ""}>
              {p.procesImage?.url ? <img className="px" loading="lazy" src={p.procesImage.url} alt={p.procesImage.alt || ""} /> : null}
              <figcaption className="cap">
                <i />
                {t(p.procesImageCaption)}
              </figcaption>
            </figure>
          </div>
          <div>
            <p className="eyebrow rv">{t(p.procesEyebrow)}</p>
            <h2 className="d2 rv" style={{ margin: "18px 0 14px" }}>
              <Accent parts={p.procesHeading} lang={lang} />
            </h2>
            <p className="lede rv" style={{ marginBottom: 34 }}>
              {t(p.procesLede)}
            </p>
            <div className="steps">
              {(p.procesSteps ?? []).map((s: any, i: number) => (
                <div className="step rv" key={i}>
                  <span className="nr">{s.nr}</span>
                  <div>
                    <h3>{t(s.title)}</h3>
                    <p>{t(s.text)}</p>
                  </div>
                </div>
              ))}
            </div>
            <a className="btn btn-ghost" href="/over-ons" style={{ marginTop: 34 }}>
              {t(p.procesCtaLabel)}
              <ArrowR />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- showroom banner ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="banner rv">
            <figure className="ph" data-fb={p.bannerImage?.fallback || ""}>
              {p.bannerImage?.url ? <img className="px" loading="lazy" src={p.bannerImage.url} alt={p.bannerImage.alt || ""} /> : null}
            </figure>
            <div className="banner-ov">
              <p className="eyebrow" style={{ color: "#FBFBF8" }}>
                {t(p.bannerEyebrow)}
              </p>
              <h2 className="d2">
                <Accent parts={p.bannerHeading} lang={lang} />
              </h2>
              <div>
                <Cta btn={{ label: p.bannerCtaLabel, href: "/showroom", style: "verf" }} lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- certificaten-teaser (tijdelijk verborgen) ---------- */}
      {/* <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 30 }}>
            <div>
              <p className="eyebrow rv">{t(p.certEyebrow)}</p>
              <h2 className="d3 rv">{t(p.certHeading)}</h2>
            </div>
            <a className="tlink rv" href="/certificaten">
              {t(p.certLinkLabel)}
              <ArrowR />
            </a>
          </div>
          <Chips items={chipItems} lang={lang} className="rv" />
        </div>
      </section> */}
    </article>
  );
}
