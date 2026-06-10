import { sanityFetch } from "@/sanity/lib/live";
import { CERTIFICATES_QUERY } from "@/sanity/lib/queries";
import { getLang } from "@/lib/getLang";
import { L } from "@/lib/locale";
import { Accent, ArrowUpRight } from "@/components/render";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";

function Zegel() {
  return <SealCheck weight="regular" />;
}

export default async function CertificatesPage() {
  const lang = await getLang();
  const data: any = (await sanityFetch({ query: CERTIFICATES_QUERY })).data;
  const d = data?.page ?? {};
  const certificates = data?.certificates ?? [];
  const t = (f: any) => L(f, lang);
  const viewLabel = lang === "en" ? "View certificate (PDF)" : "Bekijk certificaat (PDF)";

  return (
    <article className="page active" data-page="certificaten">
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
        <div className="wrap certs">
          {certificates.map((c: any) => (
            <a className="cert rv" href={c.pdfHref || "#"} target="_blank" rel="noopener" key={c._id}>
              <div className="zegel" aria-hidden="true">
                <Zegel />
              </div>
              <h3>{c.title}</h3>
              <p>{t(c.description)}</p>
              <span className="tlink">
                {viewLabel}
                <ArrowUpRight />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap split">
          <div className="split-copy">
            <p className="eyebrow rv">{t(d.meaningEyebrow)}</p>
            <h2 className="d2 rv">
              <Accent parts={d.meaningHeading} lang={lang} />
            </h2>
            {(d.meaningParagraphs ?? []).map((para: any, i: number) => (
              <p className="rv" key={i}>
                {t(para)}
              </p>
            ))}
          </div>
          <div className="zorg-card rv-r" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300, background: "#FFF" }}>
            {d.meaningLogoUrl ? (
              <img loading="lazy" src={d.meaningLogoUrl} alt="MPS keurmerk" style={{ width: "min(100%,380px)", height: "auto", objectFit: "contain" }} />
            ) : (
              <span className="d3 it">MPS</span>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
