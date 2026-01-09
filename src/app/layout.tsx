import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PromptPal - AI-Powered Content Creation Platform",
    template: "%s | PromptPal",
  },
  description:
    "Create stunning images, videos, and content with intelligent AI prompt assistance. Smart suggestions help everyone become an AI content expert.",
  keywords: [
    "AI content creation",
    "image generation",
    "prompt engineering",
    "AI art",
    "stable diffusion",
    "DALL-E",
    "video generation",
    "social media content",
  ],
  authors: [{ name: "PromptPal" }],
  creator: "PromptPal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://promptpal.ai",
    siteName: "PromptPal",
    title: "PromptPal - AI-Powered Content Creation Platform",
    description:
      "Create stunning images, videos, and content with intelligent AI prompt assistance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PromptPal - AI Content Creation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptPal - AI-Powered Content Creation Platform",
    description:
      "Create stunning images, videos, and content with intelligent AI prompt assistance.",
    images: ["/og-image.png"],
    creator: "@promptpal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
