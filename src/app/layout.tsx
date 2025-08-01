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
    default: "DevOps Learning Hub",
    template: "%s | DevOps Learning Hub"
  },
  description: "Comprehensive DevOps learning platform with Docker containerization, MongoDB database, and Nginx proxy. Master Docker, Kubernetes, AWS, Terraform, and more with interactive tutorials and hands-on examples.",
  keywords: [
    "DevOps", "Docker", "Kubernetes", "AWS", "MongoDB", "Nginx", 
    "Terraform", "CI/CD", "Containerization", "Cloud", "Infrastructure",
    "Learning", "Tutorial", "Education", "Technology", "Programming"
  ],
  authors: [{ name: "Emanuel Garcia", url: "https://github.com/EmanuelGarciaDev" }],
  creator: "Emanuel Garcia",
  publisher: "DevOps Learning Hub",
  
  // Open Graph for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devops-learning-hub.vercel.app",
    title: "DevOps Learning Hub - Master Modern DevOps Technologies",
    description: "Learn DevOps with hands-on Docker, MongoDB, and cloud technologies. Interactive tutorials, containerized examples, and real-world projects.",
    siteName: "DevOps Learning Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevOps Learning Hub - Docker, MongoDB, Kubernetes & More"
      }
    ]
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "DevOps Learning Hub",
    description: "Master DevOps with Docker, MongoDB, Kubernetes & cloud technologies",
    creator: "@EmanuelGarciaDev",
    images: ["/og-image.png"]
  },
  
  // Technical meta tags
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
  
  // Verification and other meta
  verification: {
    google: 'your-google-verification-code', // Add your actual verification code
  },
  
  category: "Education",
  classification: "DevOps Learning Platform",
  
  // Additional metadata
  metadataBase: new URL('https://devops-learning-hub.vercel.app'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Additional performance and security meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0070f3" />
        <meta name="color-scheme" content="light dark" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
