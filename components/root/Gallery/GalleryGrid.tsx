"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useMemo, useState } from "react";
import SearchBar from "@/components/root/SearchBar";
import { StaggerGroup, StaggerItem } from "@/components/root/StaggerGroup";
import { GalleryType } from "@/lib/validators/gallery.validator";

export default function GalleryGrid({
  galleries,
}: {
  galleries: GalleryType[];
}) {
  const [search, setSearch] = useState("");

  const filteredGalleries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return galleries;

    return galleries.filter((gallery) =>
      gallery.title.toLowerCase().includes(query),
    );
  }, [galleries, search]);

  return (
    <>
      <div className="flex justify-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search for Gallery"
        />
      </div>

      {filteredGalleries.length > 0 ? (
        <StaggerGroup
          as="section"
          id="gallery-list"
          className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {filteredGalleries.map((gallery, index) => (
            <StaggerItem
              key={gallery.id}
              index={index % 3}
              className="group relative w-full overflow-hidden rounded-lg"
            >
              <div className="relative z-0 h-56 w-full overflow-hidden shadow-md">
                <Image
                  src={gallery.image?.url ?? "/images/image-placeholder.svg"}
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
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <p className="text-primary/60 text-center">No galleries found.</p>
      )}
    </>
  );
}
