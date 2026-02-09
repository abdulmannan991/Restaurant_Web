import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { ToastProvider } from "@/context/ToastContext";
import { MenuProvider } from "@/context/MenuContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Savory & Sage - Fine Dining Restaurant",
  description: "Experience fine dining redefined with our curated menu of gourmet dishes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-white`}
      >
        <AppProvider>
          <MenuProvider>
            <ToastProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </ToastProvider>
          </MenuProvider>
        </AppProvider>
      </body>
    </html>
  );
}

