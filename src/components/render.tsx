import { L, type Lang, type LocaleField } from "@/lib/locale";

/* ---------- iconen ---------- */
export function ArrowR() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/* ---------- kop met accentwoord ---------- */
type Parts = {
  pre?: LocaleField;
  accent?: LocaleField;
  post?: LocaleField;
  style?: string | null;
} | null | undefined;

export function Accent({ parts, lang }: { parts: Parts; lang: Lang }) {
  if (!parts) return null;
  const pre = L(parts.pre, lang);
  const accent = L(parts.accent, lang);
  const post = L(parts.post, lang);
  const dye = parts.style === "dye";
  const none = parts.style === "none";
  return (
    <>
      {pre ? <>{pre} </> : null}
      {accent ? (
        none ? (
          <>{accent}</>
        ) : (
          <em className={dye ? "it dye" : "it"} {...(dye ? { "data-dye": "" } : {})}>
            {accent}
          </em>
        )
      ) : null}
      {post ? <> {post}</> : null}
    </>
  );
}

/* ---------- knop ---------- */
type Btn = { label?: LocaleField; href?: string | null; style?: string | null } | null | undefined;

export function Cta({
  btn,
  lang,
  className = "",
  arrow = true,
}: {
  btn: Btn;
  lang: Lang;
  className?: string;
  arrow?: boolean;
}) {
  if (!btn) return null;
  const style = btn.style || "ink";
  return (
    <a className={`btn btn-${style} ${className}`.trim()} href={btn.href || "#"}>
      {L(btn.label, lang)}
      {arrow ? <ArrowR /> : null}
    </a>
  );
}

/* ---------- afbeelding ---------- */
type Img = { url?: string | null; alt?: string | null; fallback?: string | null } | null | undefined;

export function Figure({
  image,
  className = "",
  imgClassName = "",
  caption,
  style,
}: {
  image: Img;
  className?: string;
  imgClassName?: string;
  caption?: string;
  style?: React.CSSProperties;
}) {
  return (
    <figure className={`ph ${className}`.trim()} data-fb={image?.fallback || ""} style={style}>
      {image?.url ? (
        <img className={imgClassName} loading="lazy" src={image.url} alt={image?.alt || ""} />
      ) : null}
      {caption ? (
        <figcaption className="cap">
          <i />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ---------- chips ---------- */
export function Chips({
  items,
  lang,
  className = "",
  style,
}: {
  items?: LocaleField[] | null;
  lang: Lang;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (!items?.length) return null;
  return (
    <div className={`chips ${className}`.trim()} style={style}>
      {items.map((c, i) => (
        <span className="chip" key={i}>
          <i />
          {L(c, lang)}
        </span>
      ))}
    </div>
  );
}
