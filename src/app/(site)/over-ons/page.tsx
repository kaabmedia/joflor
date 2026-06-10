import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import { getLang } from "@/lib/getLang";
import { L } from "@/lib/locale";
import { Accent, Cta } from "@/components/render";

export default async function AboutPage() {
  const lang = await getLang();
  const p: any = (await sanityFetch({ query: ABOUT_QUERY })).data;
  const t = (f: any) => L(f, lang);
  const d = p ?? {};

  return (
    <article className="page active" data-page="over-ons">
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
        <div className="wrap split">
          <figure
            className="ph ph-arch rv-l"
            data-fb={d.storyImage?.fallback || ""}
            style={{ borderRadius: "50% 50% var(--r) var(--r) / 40% 40% var(--r) var(--r)" }}
          >
            {d.storyImage?.url ? <img loading="lazy" src={d.storyImage.url} alt={d.storyImage.alt || ""} /> : null}
            <figcaption className="cap">
              <i />
              {t(d.storyImageCaption)}
            </figcaption>
          </figure>
          <div className="split-copy">
            <p className="eyebrow rv">{t(d.storyEyebrow)}</p>
            <h2 className="d2 rv">{t(d.storyHeading)}</h2>
            {(d.storyParagraphs ?? []).map((para: any, i: number) => (
              <p className="rv" key={i}>
                {t(para)}
              </p>
            ))}
            <blockquote className="quote rv">
              {t(d.quote)}
              <span className="quote-by">{d.quoteBy}</span>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section on-dark">
        <div className="wrap proces-grid">
          <div>
            <p className="eyebrow rv">{t(d.sustainEyebrow)}</p>
            <h2 className="d2 rv" style={{ margin: "18px 0 14px" }}>
              <Accent parts={d.sustainHeading} lang={lang} />
            </h2>
            <div className="steps" style={{ marginTop: 26 }}>
              {(d.sustainSteps ?? []).map((s: any, i: number) => (
                <div className="step rv" key={i}>
                  <span className="nr">{s.nr}</span>
                  <div>
                    <h3>{t(s.title)}</h3>
                    <p>{t(s.text)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="proces-art rv-r">
            <figure className="ph" data-fb={d.sustainImage?.fallback || ""}>
              {d.sustainImage?.url ? <img className="px" loading="lazy" src={d.sustainImage.url} alt={d.sustainImage.alt || ""} /> : null}
              <figcaption className="cap">
                <i />
                {t(d.sustainImageCaption)}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="split-copy">
            <p className="eyebrow rv">{t(d.futureEyebrow)}</p>
            <h2 className="d2 rv">
              <Accent parts={d.futureHeading} lang={lang} />
            </h2>
            <p className="rv">{t(d.futureText)}</p>
            <div className="hero-actions rv" style={{ marginTop: 28 }}>
              <Cta btn={d.futurePrimaryCta} lang={lang} />
              <Cta btn={d.futureSecondaryCta} lang={lang} arrow={false} />
            </div>
          </div>
          <figure className="ph rv-r" data-fb={d.futureImage?.fallback || ""} style={{ aspectRatio: "4 / 4.2" }}>
            {d.futureImage?.url ? <img className="dye-img" loading="lazy" src={d.futureImage.url} alt={d.futureImage.alt || ""} /> : null}
          </figure>
        </div>
      </section>

    </article>
  );
}
