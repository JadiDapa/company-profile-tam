import Image from "next/image";

export default function FindUs() {
  return (
    <section id="about" className="relative w-full px-4 py-20 lg:px-28 lg:py-40">
      <Image
        src={"/elements/grid.svg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center opacity-50"
      />
      <div className="mb-8 flex flex-col items-start gap-4 lg:mb-0 lg:flex-row lg:items-center lg:justify-between">
        <div className="">
          <div className="flex max-w-fit items-stretch gap-0.5">
            <div className="bg-primary w-1 shrink-0 -skew-x-12" />
            <div className="text-primary border-primary -skew-x-12 border-2 bg-transparent px-4 py-0.5">
              <h3 className="skew-x-12 font-medium">Location</h3>
            </div>
          </div>
          <h2 className="max-w-xl text-3xl font-medium lg:text-5xl">
            You Can Found
            <span className="text-primary"> Us Here!</span>
          </h2>
        </div>
        <p className="text-muted-foreground max-w-lg text-start text-sm lg:text-end lg:text-base">
          Stop by our office or reach out online, whichever works best for you.
        </p>
      </div>
      <div className="relative mt-6 flex h-64 w-full flex-1 items-center justify-center overflow-hidden rounded-md lg:mt-0 lg:h-80">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.47351487016!2d104.78739117449534!3d-2.9660298397682303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b77006ef8e1fd%3A0x3dffc0491764f9c5!2sPT.%20Taruna%20Anugerah%20Mandiri!5e0!3m2!1sid!2sid!4v1744704239240!5m2!1sid!2sid"
          className="h-full w-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
