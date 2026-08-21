import Image from "next/image";
import { RiCheckboxLine as CheckSquare2 } from "react-icons/ri";
import { services } from "@/lib/data/services";

import FadeIn from "@/components/root/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/root/StaggerGroup";

export default function ServiceDetails() {
  return (
    <div className="relative">
      {services.map((service, index) => {
        const reversed = index % 2 === 1;

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-32 relative flex w-full flex-col items-center justify-between gap-12 px-4 py-28 lg:px-28 ${
              reversed ? "lg:flex-row-reverse" : "lg:flex-row"
            } ${index % 2 === 0 ? "bg-primary/5" : ""}`}
          >
            <Image
              src={"/elements/grid.svg"}
              alt="Grid Line"
              fill
              className="z-0 object-cover object-center opacity-30"
            />

            <FadeIn
              direction={reversed ? "right" : "left"}
              className="relative order-2 flex flex-1 items-center justify-center px-4 lg:order-none lg:px-12"
            >
              <div className="relative z-10 h-56 w-full max-w-[480px] overflow-hidden rounded-md shadow-xl lg:h-80">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div
                className={`absolute -top-12 z-0 hidden h-60 w-[400px] rounded-md bg-blue-200 lg:block ${
                  reversed ? "left-0" : "right-0"
                }`}
              />
            </FadeIn>

            <FadeIn
              direction={reversed ? "left" : "right"}
              delay={0.1}
              className="relative z-10 order-1 flex-1 space-y-4 lg:order-none"
            >
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-medium lg:text-5xl">
                  {service.name}
                </h2>
                <div className="bg-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white lg:h-14 lg:w-14">
                  <service.icon className="h-6 w-6 lg:h-7 lg:w-7" />
                </div>
              </div>
              <p className="text-muted-foreground max-w-2xl text-sm lg:text-base">
                {service.description}
              </p>
              <StaggerGroup className="space-y-3 pt-2">
                {service.points.map((point, i) => (
                  <StaggerItem
                    key={i}
                    index={i}
                    direction={reversed ? "left" : "right"}
                    className="flex items-start gap-4"
                  >
                    <CheckSquare2 className="text-primary mt-0.5 size-4 lg:size-6" />
                    <p className="text-muted-foreground flex-1 text-sm lg:text-base">
                      {point}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </FadeIn>
          </section>
        );
      })}
    </div>
  );
}
