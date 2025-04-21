import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Taruna Anugrah Mandiri | Your IT Solutions Partner",
  description:
    "Taruna Anugrah Mandiri is a leading IT solutions provider, specializing in hardwared & software development, system integration, and IT consulting services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`antialiased ${poppins.className}`}>
        <Toaster richColors position="top-right" theme="light" />
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
