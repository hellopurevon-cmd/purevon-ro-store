import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Purevon — RO Spare Parts & Filters | Original Compatible",
  description:
    "Buy original compatible RO filters and spare parts for all brands. Expert guidance, best prices, pan India shipping.",
  keywords: "RO filters, RO spare parts, water purifier filters, Nexus Membrane, Aquaguard filter",
  openGraph: {
    title: "Purevon — RO Spare Parts",
    description: "Original compatible RO filters delivered to your doorstep.",
    url: "https://purevon.in",
    siteName: "Purevon",
    images: [
      {
        url: "https://purevon.in/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <AuthProvider>
            {/* HEADER */}
            <Header />

            {/* 🔥 TOAST NOTIFICATIONS */}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#18181b",
                  color: "#fff",
                  border: "1px solid #27272a",
                },
                success: {
                  iconTheme: {
                    primary: "#22c55e",
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#fff",
                  },
                },
              }}
            />

            {/* PAGE CONTENT */}
            <main className="flex-1">{children}</main>

            {/* FOOTER */}
            <footer className="bg-zinc-900 border-t border-zinc-800 py-8 mt-auto">
              <div className="max-w-7xl mx-auto px-6 text-center text-zinc-500 text-sm">
                <p>
                  © {new Date().getFullYear()} Purevon — RO Spare Parts. All
                  rights reserved.
                </p>
                <p className="mt-1">
                  <Link
                    href="/recommend"
                    className="text-yellow-400 hover:underline"
                  >
                    🔍 RO Doctor
                  </Link>
                  {" • "}
                  <Link href="/products" className="hover:underline">
                    Products
                  </Link>
                  {" • "}
                  <Link href="/cart" className="hover:underline">
                    Cart
                  </Link>
                </p>
              </div>
            </footer>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}