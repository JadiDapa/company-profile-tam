"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Network,
  Share2,
  ShieldCheck,
  PackageSearch,
  ChevronRight,
  Stars,
} from "lucide-react";

const services = [
  {
    name: "IT Consultant",
    description:
      "IT consulting services include IT governance, information security management systems, IT infrastructure design, training services, IT master planning, and more.",
    image: "https://picsum.photos/1000/2000",
    icon: Network,
  },
  {
    name: "Integrator",
    description:
      "Installation, Configuration, and Integration Services for Information and Telecommunication Technology Infrastructure.",
    image: "https://picsum.photos/900/2000",
    icon: Share2,
  },
  {
    name: "Maintenance",
    description:
      "Regular and Routine IT Equipment Maintenance Services to minimize the risk of damage and address any existing IT equipment issues.",
    image: "https://picsum.photos/800/2000",
    icon: ShieldCheck,
  },
  {
    name: "Trading & Supplier",
    description:
      "IT Equipment Trading & Supply Services with competitive prices and high quality.",
    image: "https://picsum.photos/700/2000",
    icon: PackageSearch,
  },
];

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
      className="relative flex w-full flex-col items-center justify-between px-4 py-24 lg:px-12"
    >
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <div className="text-primary border-primary flex max-w-fit items-center gap-2 rounded-full border-2 px-4 py-0.5">
          <h3 className="font-medium">Services</h3>
          <Stars className="size-4" />
        </div>
        <h2 className="max-w-xs text-3xl font-medium lg:max-w-none lg:text-5xl">
          We Provide
          <span className="text-primary"> Innovative Solutions</span>
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm lg:text-base">
          Achieve seamless technology and advanced networks with IT solutions
          tailored for modern infrastructure. Each solution supports growth,
          control, and long-term reliability.
        </p>
      </div>

      <div className="relative mt-8 flex w-full flex-col flex-wrap justify-center gap-4 sm:flex-row md:gap-5 lg:gap-6">
        {services.map((service) => {
          const isExpanded = isMobile || expandedId === service.name;

          return (
            <div
              key={service.name}
              className={`group relative h-[280px] cursor-pointer rounded-lg transition-all duration-300 ease-in-out hover:scale-105 lg:h-[360px] ${
                isExpanded
                  ? "w-full sm:w-[25vw]"
                  : "w-full sm:w-[32vw] lg:w-[17vw]"
              }`}
              onClick={() => toggleExpand(service.name)}
            >
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                fill
                className="rounded-lg object-cover"
              />
              <div className="bg-primary/40 absolute h-full w-full rounded-lg" />
              <div className="absolute top-6 left-6 grid size-10 place-items-center rounded-lg border border-slate-200 bg-white/20">
                <service.icon className="size-6 text-slate-200" />
              </div>

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
                          href={"/division/brand-and-marketing"}
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
