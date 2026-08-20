import type { Metadata } from "next";
import AboutUs from "@/components/root/About/AboutUs";
import FindUs from "@/components/root/About/FindUs";
import VisionMission from "@/components/root/About/VisionMission";
import PageHeader from "@/components/root/PageHeader";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "From humble beginnings to becoming a trusted IT partner, here is a quick look at who Taruna Anugrah Mandiri is and what drives us.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <section id="about">
      <PageHeader
        page="About"
        title="This Is Our"
        accent="Story"
        subtitle="From humble beginnings to becoming a trusted IT partner, here is a quick look at who we are and what drives us."
      />
      <AboutUs />
      <VisionMission />
      <FindUs />
    </section>
  );
}
