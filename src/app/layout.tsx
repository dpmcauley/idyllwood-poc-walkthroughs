import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Claude Workflows | Idyllwood Lab",
  description: "See real Claude automation workflows in action — from meeting chaos to morning briefings to expense tracking.",
  keywords: ["Claude", "AI automation", "workflow", "PoC", "enterprise"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rawGaId = process.env.NEXT_PUBLIC_GA_ID || '';
  const gaId = /^G-[A-Z0-9]+$/.test(rawGaId) ? rawGaId : '';

  return (
    <html lang="en" className="antialiased">
      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      <body className="bg-slate-950">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
