import { sanityFetch } from "@/sanity/lib/live";
import { CARE_QUERY } from "@/sanity/lib/queries";
import { getLang } from "@/lib/getLang";
import { L } from "@/lib/locale";
import { Accent, Cta, Chips } from "@/components/render";
import { Sun, Drop } from "@phosphor-icons/react/dist/ssr";

function CareIcon({ icon }: { icon?: string }) {
  return icon === "drop" ? <Drop weight="regular" /> : <Sun weight="regular" />;
}

export default async function CarePage() {
  const lang = await getLang();
  const p: any = (await sanityFetch({ query: CARE_QUERY })).data;
  const d = p ?? {};
  const t = (f: any) => L(f, lang);

  return (
    <article className="page active" data-page="verzorging">
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
        <div className="wrap zorg">
          {(d.cards ?? []).map((c: any, i: number) => (
            <div className="zorg-card rv" key={i}>
              <div className="icoon" aria-hidden="true">
                <CareIcon icon={c.icon} />
              </div>
              <h3>{t(c.title)}</h3>
              {(c.paragraphs ?? []).map((para: any, j: number) => (
                <p key={j}>{t(para)}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap split">
          <figure className="ph ph-arch rv-l" data-fb={d.summaryImage?.fallback || ""}>
            {d.summaryImage?.url ? <img className="px" loading="lazy" src={d.summaryImage.url} alt={d.summaryImage.alt || ""} /> : null}
            <figcaption className="cap">
              <i />
              {t(d.summaryImageCaption)}
            </figcaption>
          </figure>
          <div className="split-copy">
            <p className="eyebrow rv">{t(d.summaryEyebrow)}</p>
            <h2 className="d2 rv">{t(d.summaryHeading)}</h2>
            <Chips items={d.summaryChips} lang={lang} className="rv" style={{ marginTop: 22 }} />
            <p className="small rv" style={{ marginTop: 22 }}>
              {t(d.summaryNote)}
            </p>
            <Cta btn={{ label: d.summaryCtaLabel, href: "/contact", style: "ink" }} lang={lang} className="rv" />
          </div>
        </div>
      </section>
    </article>
  );
}
