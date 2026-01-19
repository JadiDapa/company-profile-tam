import { getAllGalleries } from "@/app/actions/gallery.action";
import { format } from "date-fns";
import Image from "next/image";

export default async function Pictures() {
  const galleries = await getAllGalleries();

  return (
    <section className="bg-primary/5 w-full space-y-12 px-4 py-24 lg:px-28">
      {/* <SearchGalleryBar setQuery={setQuery} /> */}

      {galleries.length > 0 && (
        <section
          id="gallery-list"
          className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {galleries?.map((gallery) => (
            <div
              key={gallery.id}
              className="group relative w-full overflow-hidden rounded-lg"
            >
              <div className="relative z-0 h-56 w-full overflow-hidden shadow-md">
                <Image
                  src={gallery.image?.url as string}
                  alt={gallery.title}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute bottom-0 left-0 z-10 flex h-full w-full flex-col justify-end overflow-hidden p-4 transition-all duration-500 lg:translate-y-full lg:group-hover:translate-y-0">
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="z-30">
                  <h2 className="mt-1 line-clamp-2 text-xl font-medium text-white">
                    {gallery.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <p className="text-white">
                      {format(gallery.createdAt, "dd MMM yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  );
}
