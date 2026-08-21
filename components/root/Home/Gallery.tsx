import Image from "next/image";
import { MarqueeGallery } from "./GalleryMarquee";
import { getAllGalleries } from "@/app/actions/gallery.action";

import FadeIn from "@/components/root/FadeIn";

export default async function Gallery() {
  const galleries = await getAllGalleries();

  if (galleries.length === 0) return null;

  return (
    <section id="services" className="relative w-full py-28">
      <Image
        src={"/elements/grid.svg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center opacity-30"
      />
      <FadeIn className="mb-12 flex w-full flex-col items-center justify-between gap-4 px-4 text-center lg:px-28">
        <div className="flex max-w-fit items-stretch gap-0.5">
          <div className="bg-primary w-1 shrink-0 -skew-x-12" />
          <div className="text-primary border-primary -skew-x-12 border-2 bg-transparent px-4 py-0.5">
            <p className="skew-x-12 font-medium">Gallery</p>
          </div>
        </div>
        <h2 className="text-3xl font-medium lg:text-5xl">
          Every Customer Is
          <span className="text-primary"> Special</span>
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm lg:text-base">
          Take a look at the projects and installations we have completed
          for clients across different industries and locations.
        </p>
      </FadeIn>

      <MarqueeGallery data={galleries} />
    </section>
  );
}

// only needed if used in app directory
