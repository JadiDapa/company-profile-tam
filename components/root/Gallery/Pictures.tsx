import { getAllGalleries } from "@/app/actions/gallery.action";
import GalleryGrid from "@/components/root/Gallery/GalleryGrid";

export default async function Pictures() {
  const galleries = await getAllGalleries();

  return (
    <section className="bg-primary/5 w-full space-y-12 px-4 py-28 lg:px-28">
      <GalleryGrid galleries={galleries} />
    </section>
  );
}
