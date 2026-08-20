import type { Metadata } from "next";
import Pictures from "@/components/root/Gallery/Pictures";
import PageHeader from "@/components/root/PageHeader";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse through photos of Taruna Anugrah Mandiri's completed projects and see the quality we bring to every job.",
  alternates: { canonical: "/gallery" },
  openGraph: { url: "/gallery" },
};

export default function GalleryPage() {
  return (
    <section id="gallery">
      <PageHeader
        page="Gallery"
        title="Every Works Done"
        accent="With Love"
        subtitle="Browse through photos of our completed projects and see the quality we bring to every job."
      />
      <Pictures />
    </section>
  );
}
