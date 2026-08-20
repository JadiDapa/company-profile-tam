import { Button } from "@/components/ui/button";
import {
  RiArrowRightSLine as ChevronRight,
  RiPhoneLine as Phone,
} from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section
      id="CTA"
      className="bg-primary/5 relative flex w-full flex-col items-center justify-between px-4 pb-28 lg:flex-row lg:px-28"
    >
      <div className="relative z-10 w-full overflow-hidden rounded-2xl border px-4 py-16 text-white lg:px-0 lg:py-24">
        <div className="relative z-20 flex w-full flex-col items-center gap-5 text-center">
          <h2 className="text-2xl font-medium sm:text-3xl lg:text-4xl">
            Ready To
            <span className="text-primary"> Transform </span>
            Your Infrastructure?
          </h2>
          <p className="text-background mx-auto max-w-2xl text-sm lg:text-base">
            Let us talk about what your business needs and build a setup
            that keeps everything running smoothly for years to come.
          </p>
          <div className="flex items-center gap-4">
            <Button className="flex h-10 w-36 items-center rounded-full px-6 py-2">
              <Link href="/about">Contact</Link>
              <Phone className="size-4" />
            </Button>
            <Button className="text-primary hover:bg-primary flex h-10 w-36 items-center rounded-full border border-white bg-transparent px-6 py-2 hover:text-white">
              <Link href="/about" className="text-white">
                Learn More
              </Link>
              <ChevronRight className="size-4 text-white" />
            </Button>
          </div>
        </div>
        <Image
          src="/images/illust-1.jpg"
          alt="Illustration"
          fill
          className="object-cover object-top brightness-75"
        />
        <div className="bg-primary/30 absolute inset-0 z-10" />
      </div>
    </section>
  );
}
