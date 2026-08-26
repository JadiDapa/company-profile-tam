import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import FadeIn from "@/components/root/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/root/StaggerGroup";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen border">
      <Image
        src={"/elements/grid.svg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center opacity-50"
      />

      <FadeIn className="relative z-10 mt-32 flex w-full flex-col items-center justify-center gap-7 px-4 lg:px-28">
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
          At Taruna Anugerah Mandiri we turn complexity into control with IT
          solutions built for reliable networks and long-term growth.
        </p>
        <div className="flex items-center gap-4">
          <Button className="flex h-10 rounded-full px-6 py-2">
            <Link href="/about">Get Started</Link>
          </Button>
          <Button className="text-primary flex h-10 rounded-full border bg-transparent px-6 py-2">
            <Link href="/about">
              Learn More
              <span className="sr-only"> about Taruna Anugrah Mandiri</span>
            </Link>
          </Button>
        </div>
      </FadeIn>
      <StaggerGroup className="relative w-full">
        <StaggerItem
          index={0}
          direction="up"
          className="bg-primary relative mx-auto mt-16 h-[180px] w-[85vw] max-w-[320px] overflow-hidden rounded-lg rounded-b-none p-4 pb-0 sm:h-[200px] lg:mt-12 lg:h-[400px] lg:w-[800px] lg:max-w-none"
        >
          <div className="relative h-full w-full overflow-hidden rounded-md rounded-b-none">
            <Image
              src={"/images/hero-1.jpg"}
              alt="Illustration"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 320px, 800px"
              priority
            />
          </div>
        </StaggerItem>
        <StaggerItem
          index={1}
          direction="left"
          className="bg-primary/70 absolute bottom-6 left-20 hidden h-[240px] w-[240px] overflow-hidden rounded-lg p-2 lg:block"
        >
          <div className="relative h-full w-full overflow-hidden rounded-md">
            <Image
              src={
                "https://images.unsplash.com/photo-1530240852689-f7a9c6d9f6c7?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="Illustration"
              fill
              className="object-cover object-top"
              sizes="240px"
            />
          </div>
        </StaggerItem>
        <StaggerItem
          index={2}
          direction="right"
          className="bg-primary/70 absolute top-12 right-32 hidden h-[120px] w-[200px] overflow-hidden rounded-lg p-1.5 lg:block"
        >
          <div className="relative h-full w-full overflow-hidden rounded-md">
            <Image
              src={
                "https://images.unsplash.com/photo-1589935447067-5531094415d1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="Illustration"
              fill
              className="object-cover object-center"
              sizes="200px"
            />
          </div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
