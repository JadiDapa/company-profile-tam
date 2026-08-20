"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowRightSLine as ChevronRight } from "react-icons/ri";
import { services } from "@/lib/data/services";

export default function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleExpand = (id: string) => {
    if (!isMobile) {
      setExpandedId(expandedId === id ? null : id);
    }
  };

  return (
    <section
      id="services"
      className="relative flex w-full flex-col items-center justify-between px-4 py-28 lg:px-12"
    >
      <Image
        src={"/elements/grid.svg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center opacity-30"
      />
      <div className="relative z-10 mb-12 flex flex-col items-center gap-4 text-center">
        <div className="flex max-w-fit items-stretch gap-0.5">
          <div className="bg-primary w-1 shrink-0 -skew-x-12" />
          <div className="text-primary border-primary -skew-x-12 border-2 bg-transparent px-4 py-0.5">
            <h3 className="skew-x-12 font-medium">Services</h3>
          </div>
        </div>
        <h2 className="max-w-xs text-3xl font-medium lg:max-w-none lg:text-5xl">
          We Provide
          <span className="text-primary"> Innovative Solutions</span>
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm lg:text-base">
          Our services cover everything from planning to maintenance, so you
          get one team handling your IT needs instead of juggling multiple
          vendors.
        </p>
      </div>

      <div className="relative mt-8 flex w-full flex-col flex-wrap justify-center gap-4 sm:flex-row md:gap-5 lg:gap-6">
        {services.map((service) => {
          const isExpanded = isMobile || expandedId === service.slug;

          return (
            <div
              key={service.slug}
              className={`group relative h-[280px] cursor-pointer rounded-lg transition-all duration-300 ease-in-out hover:scale-105 lg:h-[360px] ${
                isExpanded
                  ? "w-full sm:w-[25vw]"
                  : "w-full sm:w-[32vw] lg:w-[17vw]"
              }`}
              onClick={() => toggleExpand(service.slug)}
            >
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                fill
                className="rounded-lg object-cover"
              />
              <div className="bg-primary/40 absolute h-full w-full rounded-lg" />
              {/* <div className="absolute top-6 left-6 grid size-10 place-items-center rounded-lg border border-slate-200 bg-white/20">
                <service.icon className="size-6 text-slate-200" />
              </div> */}

              <div className="absolute flex h-full w-full flex-col justify-end p-4 text-white md:p-5 lg:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold md:text-lg lg:text-2xl">
                      {service.name}
                    </h3>

                    {isExpanded && (
                      <div className="mt-4 opacity-100 transition-all duration-300">
                        <p className="line-clamp-3 text-sm">
                          {service.description}
                        </p>
                        <Link
                          href={`/services#${service.slug}`}
                          className="mt-4 flex max-w-fit items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
                        >
                          Detail <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {!isMobile && (
                    <div
                      className={`rounded-full border border-slate-200 bg-white/20 p-1 transition-all duration-300 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    >
                      <ChevronRight className="size-4 md:size-6" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
