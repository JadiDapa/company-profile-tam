import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const siteName = "Taruna Anugrah Mandiri";
const defaultDescription =
  "Taruna Anugrah Mandiri is a leading IT solutions provider, specializing in hardwared & software development, system integration, and IT consulting services.";
const defaultOgImage = "/images/open-graph.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://tarunagroup.co.id"),
  title: {
    default: `${siteName} | Your IT Solutions Partner`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    siteName,
    title: `${siteName} | Your IT Solutions Partner`,
    description: defaultDescription,
    url: "/",
    locale: "id_ID",
    type: "website",
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Your IT Solutions Partner`,
    description: defaultDescription,
    images: [defaultOgImage],
  },
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
