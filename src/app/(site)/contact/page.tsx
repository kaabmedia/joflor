import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";
import { getLang } from "@/lib/getLang";
import { L } from "@/lib/locale";
import { Accent, ArrowUpRight } from "@/components/render";
import { Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

function PhoneIcon() {
  return <Phone size={15} weight="regular" />;
}
function MailIcon() {
  return <EnvelopeSimple size={15} weight="regular" />;
}

export default async function ContactPage() {
  const lang = await getLang();
  const [contactRes, settingsRes] = await Promise.all([
    sanityFetch({ query: CONTACT_QUERY }),
    sanityFetch({ query: SETTINGS_QUERY }),
  ]);
  const data: any = contactRes.data;
  const settings: any = settingsRes.data;
  const d = data?.page ?? {};
  const persons = data?.persons ?? [];
  const t = (f: any) => L(f, lang);

  return (
    <article className="page active" data-page="contact">
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
        <div className="wrap personen">
          {persons.map((person: any) => (
            <div className="persoon rv" key={person._id}>
              <div className="ini" aria-hidden="true">
                {person.initial}
              </div>
              <span>{t(person.role)}</span>
              <h3>{person.name}</h3>
              {person.phoneHref ? (
                <a href={`tel:${person.phoneHref}`}>
                  <PhoneIcon />
                  {person.phone}
                </a>
              ) : null}
              {person.email ? (
                <a href={`mailto:${person.email}`}>
                  <MailIcon />
                  {person.email}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="locatie rv">
            <figure className="ph" data-fb={d.locationImage?.fallback || ""}>
              {d.locationImage?.url ? <img loading="lazy" src={d.locationImage.url} alt={d.locationImage.alt || ""} /> : null}
            </figure>
            <div className="loc-in">
              <p className="eyebrow">{t(d.locationEyebrow)}</p>
              <h2 className="d3" style={{ marginTop: 14 }}>
                {settings?.addressLine1}
              </h2>
              <address>
                {settings?.postalCity}
                <br />
                {L(settings?.country, lang)}
              </address>
              <p className="small" style={{ marginTop: 10 }}>
                {t(d.locationNote)}
              </p>
              <a className="btn btn-ink" href={settings?.mapsUrl || "#"} target="_blank" rel="noopener">
                {t(d.locationCtaLabel)}
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
