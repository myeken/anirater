import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Logo from "@/app/components/Logo";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AniRater",
  description: "Created by Myeken with the use of Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} min-h-screen antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        {/* ---- THEME PROVIDER WRAPS EVERYTHING ---- */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {/* Header */}
          <header className="flex space-x-4 max-w-5xl mx-auto p-4">
            <Logo />
            <h1 className="text-4xl font-bold">MyAnimeRater</h1>
            <p className="pt-3">Rate and Review your favorite Anime!</p>
          </header>

          {/* Navbar (with toggle inside it) */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

        </ThemeProvider>
      </body>
    </html>
  );
}
