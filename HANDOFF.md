# Joflor — Next.js + Sanity

Brochure-site voor Joflor op **Next.js 16 (App Router) + Sanity + Tailwind**, met
Sanity **visual editing** en **NL/EN** als velden in de CMS. De look & het gedrag
(animaties, verfdoek-overgang, taalwissel) zijn 1-op-1 overgenomen van de originele site.

## Lokaal draaien

```bash
npm install          # eenmalig
npm run dev          # site op http://localhost:3000
```

- **Site:** http://localhost:3000
- **Studio (CMS):** http://localhost:3000/studio
- **Visual editing:** open in Studio links de **Presentation**-tab → je ziet de site
  en kunt direct op teksten klikken om ze aan te passen (NL én EN).

> Draait de site op een andere poort dan 3000? Voeg die poort dan toe aan de
> Sanity CORS-origins (zie prompt hieronder), anders werkt het inloggen/preview niet.

## Hoe het in elkaar zit

- `src/app/` — de pagina's (`/`, `/over-ons`, `/collectie`, `/floraxchange`,
  `/showroom`, `/verzorging`, `/certificaten`, `/contact`) + `/studio`.
- `src/sanity/schemaTypes/` — het content-model (per pagina één "singleton",
  plus losse documenten: figuurmodellen, certificaten, contactpersonen, seizoenen).
- `src/components/Chrome.tsx` — nav, mobiel menu, het verfdoek-effect en alle
  GSAP-animaties (geport uit de oude `script.js`).
- `src/app/joflor.css` — de originele stijl, ongewijzigd overgenomen.
- Taal staat in een cookie (`lang`); de NL/EN-knop wisselt en onthoudt de keuze.

## Sanity-project

- **Project:** Joflor — `projectId: 4vf75z4g`
- **Dataset:** `production`
- Alle teksten staan al in de CMS (NL + EN) en zijn gepubliceerd.

## Benodigde environment-variabelen

Staan lokaal al in `.env.local`. Voor productie (Vercel) zijn nodig:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=4vf75z4g
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-15
SANITY_API_READ_TOKEN=<read-token uit .env.local>
```

---

# Prompts voor je collega / Cursor (dingen die ik niet vanaf hier kon doen)

## 1) Deployen naar Vercel

> Deploy deze Next.js-app naar Vercel (de app staat in de root van de repo).
> - Maak een nieuw Vercel-project en koppel deze git-repo (**Root Directory** = repo-root, standaard).
> - Framework preset: Next.js (build command en output laten op standaard).
> - Voeg deze Environment Variables toe (Production + Preview):
>   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `4vf75z4g`
>   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
>   - `NEXT_PUBLIC_SANITY_API_VERSION` = `2026-05-15`
>   - `SANITY_API_READ_TOKEN` = (kopieer de waarde uit `.env.local`)
> - Deploy en geef me de productie-URL.

## 2) Sanity CORS + productiedomein koppelen (ná de eerste deploy)

> We hebben nu een Vercel-URL (bijv. `https://joflor-xyz.vercel.app`) en straks een
> eigen domein. Voeg deze toe als toegestane CORS-origins op het Sanity-project
> `4vf75z4g` (met credentials), zodat Studio/preview daar werkt:
> ```bash
> npx sanity@latest cors add https://joflor-xyz.vercel.app --credentials
> npx sanity@latest cors add https://www.joflor.nl --credentials
> ```
> (vervang door de echte URL's). Login met het Sanity-account info@kaabmedia.nl.

## 3) (Optioneel) Studio los hosten + schema/typegen

> In de projectroot: deploy het schema en genereer types voor type-veilige queries:
> ```bash
> npx sanity@latest schema deploy
> npx sanity@latest typegen generate
> ```
> En eventueel de Studio los hosten op `joflor.sanity.studio`:
> ```bash
> npx sanity@latest deploy
> ```

## 4) (Optioneel) Direct updaten zonder herdeploy (webhook revalidation)

> Zet in Sanity (project `4vf75z4g`) een GROQ-webhook naar
> `https://<vercel-url>/api/revalidate/tag` zodat content-wijzigingen direct live komen,
> en maak de bijbehorende route handler aan volgens de next-sanity docs.

---

## Bekende vervolgstappen (nice to have)

- **Afbeeldingen:** staan nu als URL-velden (de bestaande joflor.nl/Unsplash-beelden).
  Wil de klant beelden in Studio kunnen uploaden, dan kunnen de `mediaImage`-velden
  later omgezet worden naar echte Sanity-image-assets.
- **SEO:** elke pagina kan nog een eigen `<title>`/meta krijgen (nu site-breed één titel).
- **TypeGen:** zie prompt 3 — vervangt de `any`-casts in de pagina's door echte types.
