import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavbarClient from "@/components/NavbarClient";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Nexus Web Studio | Разработка и Хостинг",
  description: "Профессиональная разработка современных сайтов и надежный хостинг для вашего бизнеса.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read auth token securely from the server
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-token");
  const isLoggedIn = !!token;

  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-transparent`}
      >
        <CustomCursor />
        <ParticleBackground />
        <NavbarClient initialAuth={isLoggedIn} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
