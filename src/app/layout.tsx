import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "PoC Walkthroughs | Idyllwood Lab",
  description: "Interactive walkthroughs demonstrating real-world Claude Cowork automation workflows for enterprise teams.",
  keywords: ["Claude", "AI automation", "workflow", "PoC", "enterprise"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || '';

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
