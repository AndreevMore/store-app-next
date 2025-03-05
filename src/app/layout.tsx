import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import QueryProvider from "@/providers/QueryProvider";
import { ModalProvider } from "@/providers/ModalContext";
import { ThemeProvider } from "@/providers/ThemeContext";
import Link from "next/link";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { ProductsProvider } from "@/providers/ProductsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orders App",
  description: "Morev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Orders App</title>
        <meta name="description" content="Manage your orders efficiently" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ModalProvider>
            <nav className="flex justify-between bg-gray-500 p-4">
              <h1 className="cursor-pointer text-center text-2xl font-bold">
                <Link href="/">Orders Manager</Link>
              </h1>

              <ThemeSwitcher />
            </nav>

            <QueryProvider>
              <ProductsProvider>{children}</ProductsProvider>
            </QueryProvider>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
