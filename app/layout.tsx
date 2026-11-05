import type { Metadata } from "next";
import "./globals.css";
import { founder } from "../lib/founder";

export const metadata: Metadata = {
  title: "Choosing Abstinence | Your choice, at your pace",
  description: "You can choose to wait. Explore practical abstinence guidance, a relationship story, boundary scripts and a free seven-day starter plan.",
  openGraph: { title: "Choosing Abstinence", description: "You can choose to wait. Read the guide samples, find words for your boundaries and try a free seven-day starter plan.", type: "website", url: "https://choosing-abstinence-alexia.timidan-x.chatgpt.site", images: [{ url: "https://choosing-abstinence-alexia.timidan-x.chatgpt.site/images/choosing-abstinence-book.webp", width: 1536, height: 1024, alt: "Choosing Abstinence guide and workbook" }] },
  authors: [{ name: founder.name, url: founder.xUrl }],
  creator: founder.name,
  twitter: { card: "summary_large_image", creator: founder.xHandle, title: "Choosing Abstinence", description: "You can choose to wait. Read the guide samples, find words for your boundaries and try a free seven-day starter plan.", images: ["https://choosing-abstinence-alexia.timidan-x.chatgpt.site/images/choosing-abstinence-book.webp"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
