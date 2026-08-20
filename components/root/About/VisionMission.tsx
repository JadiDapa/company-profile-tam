import Image from "next/image";

const missionPoints = [
  "To provide satisfying services to customers, business partners, and enterprises",
  "To become the best solution and a trusted partner for every customer, business partner, and enterprise",
  "To deliver high-quality, timely, and professional services",
];

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden px-4 py-16 lg:px-28 lg:py-28">
      <Image
        src={"/elements/grid.svg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center opacity-30"
      />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <div className="flex max-w-fit items-stretch gap-0.5">
            <div className="bg-primary w-1 shrink-0 -skew-x-12" />
            <div className="text-primary border-primary -skew-x-12 border-2 bg-transparent px-4 py-0.5">
              <p className="skew-x-12 font-medium">Vision & Mission</p>
            </div>
          </div>
          <h2 className="max-w-xs text-3xl font-medium lg:max-w-none lg:text-5xl">
            Always Delivering
            <span className="text-primary"> Quality Services</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm lg:text-base">
            Everything we do is guided by one goal, helping clients run
            their operations without worrying about downtime or outdated
            systems.
          </p>
        </div>

        <div className="mx-auto flex max-w-3xl flex-col divide-y divide-gray-200">
          <div className="py-10">
            <h3 className="mb-4 text-2xl font-medium text-gray-800">
              Our Vision
            </h3>
            <blockquote className="border-primary mb-6 border-l-2 pl-6 text-gray-600 italic">
              &quot;To become a company that provides effective IT solutions
              with a solid foundation, taking into account the long-term
              growth of clients and customer satisfaction.&quot;
            </blockquote>
            <p className="text-base leading-relaxed text-gray-700">
              We envision a future where technology empowers businesses to
              achieve their full potential. Through our expertise and
              dedication, we aim to be at the forefront of digital
              transformation, delivering solutions that not only meet
              current needs but anticipate future challenges.
            </p>
          </div>

          <div className="py-10">
            <h3 className="mb-4 text-2xl font-medium text-gray-800">
              Our Mission
            </h3>
            <ul className="space-y-3">
              {missionPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-base leading-relaxed text-gray-700"
                >
                  <span className="text-primary">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
