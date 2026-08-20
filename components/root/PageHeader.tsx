import Image from "next/image";

interface PageHeaderProps {
  page: string;
  title: string;
  accent: string;
  subtitle: string;
}

export default function PageHeader({
  page,
  title,
  subtitle,
  accent,
}: PageHeaderProps) {
  return (
    <section id="hero" className="relative h-[60vh] border-t sm:h-[70vh]">
      <Image
        src={"/elements/grid.svg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center opacity-50"
      />

      <div className="relative z-10 mt-24 flex w-full flex-col items-center justify-center gap-7 px-4 lg:mt-32 lg:px-28">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex max-w-fit items-stretch gap-0.5">
            <div className="bg-primary w-1 shrink-0 -skew-x-12" />
            <div className="text-primary border-primary -skew-x-12 border-2 bg-transparent px-4 py-0.5">
              <p className="skew-x-12 font-medium">{page}</p>
            </div>
          </div>
          <h1 className="text-center">
            <span className="text-2xl font-medium lg:text-start lg:text-4xl/relaxed">
              {title}
            </span>
            <br />
            <span className="text-4xl font-medium lg:text-start lg:text-7xl">
              <span className="text-primary">{accent}</span>
            </span>
          </h1>
        </div>
        <p className="max-w-2xl text-center text-sm text-slate-700 lg:text-base">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
