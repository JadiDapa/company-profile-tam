import { getAllGalleries } from "@/app/actions/gallery.action";
import CreateGalleryModal from "@/components/dashboard/galleries/CreateGalleryModal";
import GalleryTable from "@/components/dashboard/galleries/GalleryTable";

export default async function ActivitesPage() {
  const galleries = await getAllGalleries();
  return (
    <section className="flex h-full w-full flex-col gap-4 rounded-md border p-6 lg:gap-6">
      {/* Header Title */}
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">Gallery List</h1>
          <p className="hidden lg:inline">
            These are the Galleries that shared to the Publics
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <CreateGalleryModal />
        </div>
      </div>
      {galleries.length > 0 && <GalleryTable galleries={galleries} />}
    </section>
  );
}
