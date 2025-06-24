import { Award, Clock, EyeIcon, Stars, Target } from "lucide-react";

const missionPoints = [
  {
    icon: <Target className="h-6 w-6" />,
    text: "To provide satisfying services to customers, business partners, and enterprises",
    delay: 100,
  },
  {
    icon: <Award className="h-6 w-6" />,
    text: "To become the best solution and a trusted partner for every customer, business partner, and enterprise",
    delay: 200,
  },
  {
    icon: <Clock className="h-6 w-6" />,
    text: "To deliver high-quality, timely, and professional services",
    delay: 300,
  },
];

export default function VisionMission() {
  return (
    <section className="overflow-hiddenpx-4 relative py-24 lg:px-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <div className="text-primary border-primary flex max-w-fit items-center gap-2 rounded-full border-2 px-4 py-0.5">
            <h3 className="font-medium">Vision & Mission</h3>
            <Stars className="size-4" />
          </div>
          <h2 className="max-w-xs text-3xl font-medium lg:max-w-none lg:text-5xl">
            Always Delivering
            <span className="text-primary"> Quality Services</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm lg:text-base">
            Achieve seamless technology and advanced networks with IT solutions
            for modern infrastructure. Each solution supports growth, control,
            and long-term reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div
            className={`relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-700 ease-out`}
          >
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-blue-500/10"></div>
            <div className="mb-6 flex items-center">
              <div className="bg-primary mr-4 flex h-14 w-14 items-center justify-center rounded-full text-white">
                <EyeIcon className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">Our Vision</h3>
            </div>

            <div className="relative">
              <blockquote className="border-primary mb-6 border-l-4 pl-6 text-gray-600 italic">
                &quot;To become a company that provides effective IT solutions
                with a solid foundation, taking into account the long-term
                growth of clients and customer satisfaction.&quot;
              </blockquote>

              <div className="mt-8">
                <p className="text-lg text-gray-700">
                  We envision a future where technology empowers businesses to
                  achieve their full potential. Through our expertise and
                  dedication, we aim to be at the forefront of digital
                  transformation, delivering solutions that not only meet
                  current needs but anticipate future challenges.
                </p>
              </div>
            </div>
          </div>
          <div
            className={`relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-700 ease-out`}
          >
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-blue-500/10"></div>
            <div className="mb-8 flex items-center">
              <div className="bg-primary mr-4 flex h-14 w-14 items-center justify-center rounded-full text-white">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">Our Mission</h3>
            </div>

            <div className="mt-8">
              {missionPoints.map((point, index) => (
                <div
                  key={index}
                  className={`mb-6 flex transition-all duration-700 ease-out`}
                >
                  <div className="text-primary mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    {point.icon}
                  </div>
                  <div>
                    <p className="text-lg text-gray-700">{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
