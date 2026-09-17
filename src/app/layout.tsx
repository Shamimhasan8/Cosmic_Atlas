import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cosmic Atlas — Interactive 3D Space Explorer",
  description:
    "Explore the Solar System and beyond in an interactive 3D atlas. Click any planet, moon, star, or galaxy to dive into scientifically accurate data sourced from NASA, ESA, JPL, and peer-reviewed publications.",
  keywords: [
    "astronomy",
    "solar system",
    "3D atlas",
    "space exploration",
    "planets",
    "NASA",
    "Three.js",
    "interactive",
    "education",
    "cosmology",
  ],
  authors: [{ name: "Cosmic Atlas" }],
  openGraph: {
    title: "Cosmic Atlas — Interactive 3D Space Explorer",
    description:
      "Explore the Solar System and beyond in an interactive 3D atlas with scientifically accurate data from NASA, ESA, JPL, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmic Atlas — Interactive 3D Space Explorer",
    description:
      "Explore the Solar System and beyond in an interactive 3D atlas.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#04060f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
