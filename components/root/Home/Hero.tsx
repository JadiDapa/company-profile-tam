import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen border">
      <Image
        src={"/elements/grid.svg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center opacity-50"
      />

      <div className="relative z-10 mt-52 flex w-full flex-col items-center justify-center gap-7 px-4 lg:mt-32 lg:px-28">
        <h1 className="text-center">
          <span className="text-2xl font-medium lg:text-start lg:text-4xl/relaxed">
            Empowering Infrastructure Through
          </span>
          <br />
          <span className="text-3xl font-medium lg:text-start lg:text-7xl">
            <span className="text-accent">Innovative</span>{" "}
            <span className="text-primary">IT Solutions</span>
          </span>
        </h1>
        <p className="max-w-2xl text-center text-sm text-slate-700 lg:text-base">
          Achieve seamless technology and advanced networks with IT solutions
          tailored for modern infrastructure. Each solution supports growth,
          control, and long-term reliability.
        </p>
        <div className="flex items-center gap-4">
          <Button className="flex h-10 rounded-full px-6 py-2">
            <Link href="/about">Get Started</Link>
          </Button>
          <Button className="text-primary flex h-10 rounded-full border bg-transparent px-6 py-2">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
      <div className="relative w-full">
        <div className="relative mx-auto mt-24 h-[200px] w-[320px] overflow-hidden rounded-lg rounded-b-none bg-blue-200 p-4 pb-0 lg:mt-12 lg:h-[400px] lg:w-[800px]">
          <div className="relative h-full w-full overflow-hidden rounded-md rounded-b-none">
            <Image
              src={"/images/illust-4.jpg"}
              alt="Illustration"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="absolute bottom-6 left-20 hidden h-[240px] w-[240px] overflow-hidden rounded-lg bg-yellow-200 p-2 lg:block">
          <div className="relative h-full w-full overflow-hidden rounded-md">
            <Image
              src={"/images/illust-3.jpg"}
              alt="Illustration"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="absolute top-12 right-32 hidden h-[120px] w-[200px] overflow-hidden rounded-lg bg-red-300 p-1.5 lg:block">
          <div className="relative h-full w-full overflow-hidden rounded-md">
            <Image
              src={"/images/illust-3.jpg"}
              alt="Illustration"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
