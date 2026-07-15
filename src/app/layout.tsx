import type { Metadata } from "next";
import "./globals.css";
import VantaBackground from "@/components/VantaBackground";

export const metadata: Metadata = {
  title: "AWS Student Builder Group | RV University",
  description: "We're building what's missing — a builder-first community. AWS SBG at RV University hosts hands-on workshops, hackathons, and real cloud projects for students who ship.",
  keywords: "AWS, cloud computing, student community, RV University, builder, hackathon, workshops, Amazon Web Services",
  openGraph: {
    title: "AWS Student Builder Group | RV University",
    description: "We're building what's missing — a builder-first community.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <VantaBackground />
        {children}
      </body>
    </html>
  );
}
