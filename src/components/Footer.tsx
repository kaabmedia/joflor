import { L, type Lang } from "@/lib/locale";
import { SUB_NAV, tNav } from "@/lib/nav";
import { RootsGrow } from "./RootsGrow";
import { Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";

type Settings = Record<string, any> | null | undefined;
type Cert = { _id: string; title?: string; pdfHref?: string } & Record<string, any>;

export function Footer({
  settings,
  certificates = [],
  lang,
}: {
  settings: Settings;
  certificates?: Cert[];
  lang: Lang;
}) {
  return (
    <footer>
      <RootsGrow className="footer-roots" color="#FBFBF8" />
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a className="fmark" href="/">
              Jo<em>flor</em>
            </a>
            <p>{L(settings?.footerIntro, lang)}</p>
            {settings?.mpsLogoUrl ? (
              <img loading="lazy" src={settings.mpsLogoUrl} alt="MPS keurmerk" />
            ) : null}
          </div>
          <div>
            <h4>{lang === "en" ? "Assortment" : "Assortiment"}</h4>
            <ul>
              {SUB_NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{tNav(item, lang)}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Certificaten tijdelijk verborgen
          <div>
            <h4>{lang === "en" ? "Certificates" : "Certificaten"}</h4>
            <ul>
              {certificates.map((c) => (
                <li key={c._id}>
                  <a href={c.pdfHref || "#"} target="_blank" rel="noopener">
                    {c.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="/certificaten">
                  {lang === "en" ? "All certificates ›" : "Alle certificaten ›"}
                </a>
              </li>
            </ul>
          </div>
          */}
          <div>
            <h4>Contact</h4>
            <address className="foot-contact">
              <span className="row row--top">
                <MapPin size={16} weight="regular" />
                <span>
                  {settings?.addressLine1}
                  <br />
                  {settings?.postalCity}
                </span>
              </span>
              {settings?.phoneHref ? (
                <a className="row" href={`tel:${settings.phoneHref}`}>
                  <Phone size={16} weight="regular" />
                  {settings.phone}
                </a>
              ) : null}
              {settings?.email ? (
                <a className="row" href={`mailto:${settings.email}`}>
                  <EnvelopeSimple size={16} weight="regular" />
                  {settings.email}
                </a>
              ) : null}
            </address>
          </div>
        </div>
        <div className="foot-bot">
          <span>{L(settings?.copyright, lang)}</span>
          <span>{L(settings?.credit, lang)}</span>
        </div>
      </div>
    </footer>
  );
}
