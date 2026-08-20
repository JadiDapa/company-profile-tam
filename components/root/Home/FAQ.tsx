import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RiPhoneLine as Phone } from "react-icons/ri";
import Image from "next/image";

const faqs = [
  {
    question: "How can I contact your team?",
    answer:
      "You can reach us through WhatsApp, email, or our contact form. Our team typically replies within 1–3 hours.",
  },
  {
    question: "Do you have a minimum project value?",
    answer:
      "Yes, our minimum project value depending on the type of IT service required.",
  },
  {
    question: "What IT solutions do you provide?",
    answer:
      "We provide CCTV installation, networking setup, system development, server installation, troubleshooting, and custom IT infrastructure services.",
  },
  {
    question: "How do we discuss or request a quotation?",
    answer:
      "Simply contact us and tell us your needs. We will schedule a free consultation and provide a custom quotation.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-primary/5 relative flex w-full flex-col items-center justify-between gap-12 px-4 py-28 lg:flex-row lg:px-28"
    >
      {/* Left Content */}
      <div className="relative z-10 flex-1 space-y-4">
        <div className="flex max-w-fit items-stretch gap-0.5">
          <div className="bg-primary w-1 shrink-0 -skew-x-12" />
          <div className="text-primary border-primary -skew-x-12 border-2 bg-transparent px-4 py-0.5">
            <h3 className="skew-x-12 font-medium">FAQ</h3>
          </div>
        </div>

        <h2 className="text-3xl font-medium lg:text-5xl">
          Frequently Asked
          <span className="text-primary"> Questions</span>
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="border-primary mt-2 rounded-2xl border-2 px-2 lg:px-4"
            >
              <AccordionTrigger className="text-base text-slate-800 lg:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-800">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Right Image */}
      <div className="relative flex w-full flex-1 cursor-pointer items-center justify-center px-4 lg:px-12">
        <div className="border-primary absolute bottom-0 left-8 z-20 hidden size-36 flex-col items-center justify-center gap-0.5 rounded-full border-6 bg-white p-4 text-center shadow-2xl lg:flex">
          <Phone className="text-primary size-14" />
          <p className="text-primary text-lg font-medium">Contact Us!</p>
        </div>

        <div className="relative z-10 h-56 w-full max-w-[360px] rounded-md lg:h-80 lg:w-[480px] lg:max-w-none">
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
