import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, Stars } from "lucide-react";
import Image from "next/image";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative flex w-full flex-col items-center justify-between px-4 py-24 lg:flex-row lg:px-28"
    >
      <Image
        src={"/elements/grid.svg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center opacity-30"
      />
      <div className="relative z-10 flex-1 space-y-4">
        <div className="text-primary border-primary flex max-w-fit items-center gap-2 rounded-full border-2 px-4 py-0.5">
          <h3 className="font-medium">FAQ</h3>
          <Stars className="size-4" />
        </div>
        <h2 className="text-3xl font-medium lg:text-5xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            className="border-primary mt-2 rounded-2xl border-2 px-2 lg:px-4"
            value="item-1"
          >
            <AccordionTrigger className="text-base text-slate-800 lg:text-lg">
              How can I contact you?
            </AccordionTrigger>
            <AccordionContent className="text-slate-800">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border-primary mt-2 rounded-2xl border-2 px-2 lg:px-4"
            value="item-2"
          >
            <AccordionTrigger className="text-base text-slate-800 lg:text-lg">
              Is there any minimum project value?
            </AccordionTrigger>
            <AccordionContent className="text-slate-800">
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border-primary mt-2 rounded-2xl border-2 border-b-2 px-2 lg:px-4"
            value="item-3"
          >
            <AccordionTrigger className="text-base text-slate-800 lg:text-lg">
              How can we discuss the project?
            </AccordionTrigger>
            <AccordionContent className="text-slate-800">
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border-primary mt-2 rounded-2xl border-2 px-2 lg:px-4"
            value="item-4"
          >
            <AccordionTrigger className="text-base text-slate-800 lg:text-lg">
              How can I contact you?
            </AccordionTrigger>
            <AccordionContent className="text-slate-800">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="relative flex flex-1 cursor-pointer items-center justify-center px-12">
        <div className="border-primary absolute -bottom-0 left-8 z-20 hidden size-36 flex-col items-center justify-center gap-0.5 rounded-full border-6 bg-white p-4 text-center shadow-2xl lg:flex">
          <Phone className="text-primary size-14" />
          <p className="text-primary text-lg font-medium">Contact Us!</p>
        </div>

        <div className="relative z-10 h-60 w-[360px] overflow-hidden rounded-md lg:h-80 lg:w-[480px]">
          <Image
            src={"/images/faq-illust.png"}
            alt="Illustration"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
