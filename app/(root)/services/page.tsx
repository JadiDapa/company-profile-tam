import type { Metadata } from "next";
import ServiceDetails from "@/components/root/Services/ServiceDetails";
import PageHeader from "@/components/root/PageHeader";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore the range of IT services Taruna Anugrah Mandiri offers, built to keep your business connected and running without interruption.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

export default function ServicePage() {
  return (
    <section id="services">
      <PageHeader
        page="Services"
        title="Neat Quality Provided"
        accent="For You"
        subtitle="Explore the range of IT services we offer, built to keep your business connected and running without interruption."
      />
      <ServiceDetails />
    </section>
  );
}
