import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import Navbar from '@/app/components/Navbar';
import Logo from '@/app/components/Logo';
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AniRater",
  description: "Created by Myeken with the use of Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className= {`${roboto.className} antialiased bg-gray-600 min-h-screen`}>
        <header className="flex space-x-4 max-w-5xl mx-auto p-4">
          <Logo />
          <h1 className="text-4xl font-bold">MyAnimeRater</h1>
          <p className="pt-3">Rate and Review your favorite Anime!</p>
        </header>
        <Navbar />
        <main className="flex-1 ">
          {children}
        </main>
      </body>
    </html>
  );
}
