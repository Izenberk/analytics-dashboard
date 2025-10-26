import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeRegistry } from "@/providers/ThemeRegistry";
import { AuthProvider } from "@/lib/auth/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Analytics Dashboard - Professional React Components',
  description: 'Modern analytics dashboard built with Next.js, TypeScript, and Material-UI. Demonstrating clean architecture and professional component design patterns.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
