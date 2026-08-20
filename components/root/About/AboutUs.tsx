import { Button } from "@/components/ui/button";
import { RiArrowRightSLine as ChevronRight } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="bg-primary/5 relative flex w-full flex-col items-center justify-between gap-12 px-4 py-20 lg:flex-row lg:gap-0 lg:py-40 lg:px-28"
    >
      <div className="flex-1 space-y-4">
        <div className="flex max-w-fit items-stretch gap-0.5">
          <div className="bg-primary w-1 shrink-0 -skew-x-12" />
          <div className="text-primary border-primary -skew-x-12 border-2 bg-transparent px-4 py-0.5">
            <p className="skew-x-12 font-medium">About</p>
          </div>
        </div>
        <h2 className="text-3xl font-medium lg:text-5xl">
          Innovation Shape
          <span className="text-primary"> The Future</span>
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm lg:text-base">
          We started as a small IT team and grew into a trusted partner for
          companies that need dependable networks and infrastructure
          support.
        </p>
        <div className="flex items-center gap-4">
          <Button className="flex h-10 w-36 items-center rounded-full px-6 py-2">
            <Link href="/about">Read More</Link>
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 lg:px-12">
        <div className="border-primary absolute -bottom-4 left-0 z-20 flex size-24 flex-col items-center justify-center gap-0.5 rounded-full border-4 bg-white p-4 text-center shadow-2xl lg:size-36 lg:border-6">
          <p className="text-primary text-2xl font-medium lg:text-4xl">100%</p>
          <p className="text-xs lg:text-sm">Customer Satisfaction</p>
        </div>

        <div className="relative z-10 h-56 w-full max-w-[480px] overflow-hidden rounded-md shadow-xl lg:h-80">
          <Image
            src={"/images/illust-1.jpg"}
            alt="Illustration"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute -top-12 right-0 z-0 hidden h-60 w-[400px] rounded-md bg-red-200 lg:block" />
      </div>
    </section>
  );
}
