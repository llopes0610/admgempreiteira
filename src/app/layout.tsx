import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
