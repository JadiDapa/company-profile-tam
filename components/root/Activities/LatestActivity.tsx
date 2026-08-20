import {
  RiTimeLine as Clock,
  RiArrowRightLine as ArrowRight,
} from "react-icons/ri";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { ActivityType } from "@/lib/validators/activity.validator";

export default async function LatestActivity({
  latestActivity,
}: {
  latestActivity: ActivityType;
}) {
  return (
    <div className="text-primary bg-primary/5 relative px-4 pt-16 pb-4 lg:px-28 lg:pt-24">
      {/* Header */}

      {/* News Hero Section */}
      <div className="relative z-10 mb-4">
        <h2 className="text-primary text-2xl font-medium lg:text-4xl">Latest Activity</h2>
      </div>

      {/* News Content */}

      {/* Featured Post */}
      <Link href={`/activities/${latestActivity.slug}`}>
        <div className="relative h-[320px] w-full overflow-hidden rounded-lg shadow-xl sm:h-[400px] lg:h-[500px]">
          <Image
            fill
            src={latestActivity.image?.url ?? "/images/image-placeholder.svg"}
            alt={latestActivity.title}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 w-full p-4 md:w-2/3 md:p-8">
            <span className="mb-4 inline-block rounded-full border border-slate-200 bg-white/20 px-3 py-1 text-xs font-semibold text-slate-200 capitalize sm:text-sm">
              {latestActivity.category}
            </span>
            <h3 className="mb-4 line-clamp-2 text-xl text-slate-200 md:text-4xl">
              {latestActivity.title}
            </h3>
            <div
              className="prose mb-6 line-clamp-2 text-gray-300"
              dangerouslySetInnerHTML={{ __html: latestActivity.content }}
            ></div>
            <div className="mb-6 flex items-center text-sm text-gray-300">
              <span className="mr-4 capitalize">{latestActivity.category}</span>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{format(latestActivity.createdAt, "dd MMM yyyy")}</span>
              </div>
            </div>
            <Link
              href={`/activities/${latestActivity.slug}`}
              className="flex items-center text-white transition-colors hover:text-gray-300"
            >
              <span className="mr-2 font-medium">Read More</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Link>

      {/* Recent Posts */}
    </div>
  );
}
