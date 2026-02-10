import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Outpitch",
  description: "Create stunning pitch cards.",
};

import { Toaster } from "sonner";
import { AuthListener } from "@/components/features/auth/AuthListener";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
        <AuthListener />
        <Toaster />
      </body>
    </html>
  );
}
