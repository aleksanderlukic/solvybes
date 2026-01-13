import type { Metadata } from "next";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Solvybes - Fly vintern. Känn solen.",
  description:
    "Your summer escape. Experience warmth, calm, and premium vibes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>
        <AnimatedBackground />
        <Navigation />
        <main style={{ paddingTop: "4rem", minHeight: "100vh" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
