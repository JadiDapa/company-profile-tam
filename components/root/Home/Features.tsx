import { Button } from "@/components/ui/button";
import {
  RiCheckboxLine as CheckSquare2,
  RiArrowRightSLine as ChevronRight,
} from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

import FadeIn from "@/components/root/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/root/StaggerGroup";

const features = [
  {
    title: "Advanced Technology",
    description:
      "Delivering exceptional service experiences to every customer and business partner.",
  },
  {
    title: "Seamless Integration",
    description:
      "Becoming the best solution and a trusted partner for every client and business associate.",
  },
  {
    title: "Scalability",
    description: "Providing high-quality, timely, and professional services.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-primary/5 relative flex w-full flex-col items-center justify-between gap-12 px-4 py-28 lg:flex-row lg:px-28"
    >
      <FadeIn
        direction="right"
        className="relative order-2 flex w-full flex-1 items-center justify-center gap-1.5 px-6 sm:gap-2 sm:px-12 lg:order-1"
      >
        <div className="absolute -top-4 left-1/2 z-0 h-72 w-[85%] -translate-x-1/2 rounded-xl bg-white shadow-xl sm:left-0 sm:h-96 sm:w-[440px] sm:translate-x-0" />
        <div className="relative z-10 flex flex-col gap-1.5 sm:gap-2">
          <div className="relative z-10 h-28 w-36 overflow-hidden rounded-md sm:h-40 sm:w-52">
            <Image
              src={"/images/illust-1.jpg"}
              alt="Illustration"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="relative z-10 h-28 w-36 overflow-hidden rounded-md sm:h-40 sm:w-52">
            <Image
              src={"/images/illust-2.jpeg"}
              alt="Illustration"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="relative z-10 h-56 w-40 overflow-hidden rounded-md sm:h-[324px] sm:w-60">
          <Image
            src={"/images/illust-3.jpg"}
            alt="Illustration"
            fill
            className="object-cover object-center"
          />
        </div>
      </FadeIn>
      <FadeIn direction="left" delay={0.1} className="order-1 flex-1 space-y-4 lg:order-2 lg:px-12">
        <div className="flex max-w-fit items-stretch gap-0.5">
          <div className="bg-primary w-1 shrink-0 -skew-x-12" />
          <div className="text-primary border-primary -skew-x-12 border-2 bg-transparent px-4 py-0.5">
            <p className="skew-x-12 font-medium">Mission</p>
          </div>
        </div>
        <h2 className="text-3xl font-medium lg:text-5xl">
          Innovation Shape
          <span className="text-primary"> The Future</span>
        </h2>
        <StaggerGroup>
          {features.map((feature, index) => (
            <StaggerItem key={feature.title} index={index} className="mt-4 flex items-start gap-4">
              <CheckSquare2 className="text-primary mt-0.5 size-4 lg:size-6" />
              <p className="text-muted-foreground flex-1 text-sm lg:text-base">
                {feature.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="flex items-center gap-4">
          <Button className="flex h-10 w-36 items-center rounded-full px-6 py-2">
            <Link href="/about">
              Read More<span className="sr-only"> about our mission and innovation</span>
            </Link>
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
