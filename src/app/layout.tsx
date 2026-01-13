import type { Metadata } from "next";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navigation from "@/components/Navigation";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { BlockedUsersProvider } from "@/contexts/BlockedUsersContext";
import { UserProfileProvider } from "@/contexts/UserProfileContext";

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
        <FavoritesProvider>
          <BlockedUsersProvider>
            <UserProfileProvider>
              <AnimatedBackground />
              <Navigation />
              <main style={{ paddingTop: "4rem", minHeight: "100vh" }}>
                {children}
              </main>
            </UserProfileProvider>
          </BlockedUsersProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
