import { Button } from "@/components/ui/button";
import { ChevronRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section
      id="CTA"
      className="relative flex w-full flex-col items-center justify-between px-4 py-24 lg:flex-row lg:px-28"
    >
      <Image
        src={"/elements/grid.svg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center opacity-30"
      />
      <div className="relative z-10 w-full overflow-hidden rounded-2xl border py-24 text-white">
        <div className="relative z-20 flex w-full flex-col items-center gap-5 text-center">
          <h2 className="text-4xl font-medium">
            Ready To
            <span className="text-primary"> Transform </span>
            Your Infrastructure?
          </h2>
          <p className="text-background mx-auto max-w-2xl">
            Achieve seamless technology and advanced networks with IT solutions
            tailored for modern infrastructure. Each solution supports growth,
            control.
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
