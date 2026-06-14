import type { Metadata } from "next";
import { Bodoni_Moda, Archivo } from "next/font/google";

import "./globals.css";
import { getLang } from "@/lib/getLang";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-disp",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title:
      lang === "en"
        ? "Joflor · Phalaenopsis nursery · Naaldwijk"
        : "Joflor · Phalaenopsis kwekerij · Naaldwijk",
    description:
      lang === "en"
        ? "Joflor grows and dyes Phalaenopsis with added value. Year round top quality from Naaldwijk, the Westland."
        : "Joflor kweekt en verft Phalaenopsis met toegevoegde waarde. Jaarrond topkwaliteit vanuit Naaldwijk, het Westland.",
    // Favicon/icons komen uit de bestandsconventies: src/app/{icon.svg,favicon.ico,apple-icon.png}.
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();

  return (
    <html lang={lang} className={`${bodoni.variable} ${archivo.variable}`} suppressHydrationWarning>
      <head>
        {/* pre-hide reveal-elementen vóór paint, net als het origineel */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
