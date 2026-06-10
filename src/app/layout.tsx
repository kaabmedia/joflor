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
    icons: {
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23D29A15'/%3E%3Ccircle cx='16' cy='16' r='5' fill='%23F4F5F0'/%3E%3C/svg%3E",
    },
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
