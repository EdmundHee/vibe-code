import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Master Full-Stack Development with Vibe Coding | Launch Your MVP in 30 Days",
  description: "Launch your MVP in 30 days with our intensive, project-based course. From concept to deployment. Join thousands learning full-stack development with AI-powered guidance.",
  keywords: ["full-stack development", "web development course", "MVP development", "AI-powered learning", "coding bootcamp", "project-based learning"],
  authors: [{ name: "Vibe Coding" }],
  creator: "Vibe Coding",
  publisher: "Vibe Coding",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vibecoding.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Master Full-Stack Development with Vibe Coding | Launch Your MVP in 30 Days",
    description: "Launch your MVP in 30 days with our intensive, project-based course. From concept to deployment.",
    url: 'https://vibecoding.com',
    siteName: 'Vibe Coding',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vibe Coding - Master Full-Stack Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Master Full-Stack Development with Vibe Coding | Launch Your MVP in 30 Days",
    description: "Launch your MVP in 30 days with our intensive, project-based course. From concept to deployment.",
    images: ['/og-image.jpg'],
    creator: '@vibecoding',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-text`}
      >
        {children}
      </body>
    </html>
  );
}
