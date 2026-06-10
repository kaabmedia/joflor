import { sanityFetch } from "@/sanity/lib/live";
import { FLORAX_QUERY } from "@/sanity/lib/queries";
import { getLang } from "@/lib/getLang";
import { L } from "@/lib/locale";
import { Cta, Chips, ArrowUpRight } from "@/components/render";

export default async function FloraxchangePage() {
  const lang = await getLang();
  const p: any = (await sanityFetch({ query: FLORAX_QUERY })).data;
  const d = p ?? {};
  const t = (f: any) => L(f, lang);

  return (
    <article className="page active" data-page="floraxchange">
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
                {t(d.heroTitle?.pre) ? <>{t(d.heroTitle?.pre)} </> : null}
                <em className="it dye" data-dye="">
                  {t(d.heroTitle?.accent)}
                </em>
              </span>
            </span>
          </h1>
          <p className="lede rv">{t(d.heroLede)}</p>
          <div className="phead-bar" />
        </div>
      </header>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="wrap fx">
          {(d.cards ?? []).map((c: any, i: number) => (
            <a className="fx-card rv" href={c.href || "#"} target="_blank" rel="noopener" key={i}>
              <figure className="ph" data-fb={c.image?.fallback || ""}>
                {c.image?.url ? <img loading="lazy" src={c.image.url} alt={c.image.alt || ""} /> : null}
              </figure>
              <div className="fx-in">
                <p className="eyebrow" style={{ color: "#FBFBF8" }}>
                  {t(c.eyebrow)}
                </p>
                <h3>{t(c.title)}</h3>
                <p>{t(c.text)}</p>
                <span className="tlink">
                  {t(c.linkLabel)}
                  <ArrowUpRight />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="split-copy">
            <h2 className="d3 rv">{t(d.contactHeading)}</h2>
            <p className="rv" style={{ marginTop: 14 }}>
              {t(d.contactText)}
            </p>
            <Cta
              btn={{ label: d.contactCtaLabel, href: "/contact", style: "ink" }}
              lang={lang}
              className="rv"
            />
          </div>
          <Chips items={d.contactChips} lang={lang} className="rv" style={{ alignContent: "start" }} />
        </div>
      </section>
    </article>
  );
}
