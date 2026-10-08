
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Empreiteira | Reformas, Construção e Acabamento",
  description:
    "Soluções em reformas, hidráulica, elétrica, pintura, drywall, gesso, alvenaria, pisos e montagem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}

        {/* Google Ads - Global Site Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18496169343"
          strategy="afterInteractive"
        />

        {/* Configuração Google Ads */}
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18496169343');
          `}
        </Script>
      </body>
    </html>
  );
}
