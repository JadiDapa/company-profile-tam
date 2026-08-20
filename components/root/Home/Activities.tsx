import { getAllActivities } from "@/app/actions/activity.action";
import { formatDate } from "@/lib/utils/format-date";
import Image from "next/image";
import Link from "next/link";

export default async function Activities() {
  const activities = await getAllActivities();

  if (activities.length === 0) return null;

  return (
    <section
      id="reports"
      className="bg-primary/5 relative flex w-full flex-col items-center justify-between px-4 py-28 lg:px-28"
    >
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <div className="flex max-w-fit items-stretch gap-0.5">
          <div className="bg-primary w-1 shrink-0 -skew-x-12" />
          <div className="text-primary border-primary -skew-x-12 border-2 bg-transparent px-4 py-0.5">
            <h3 className="skew-x-12 font-medium">Activities</h3>
          </div>
        </div>
        <h2 className="text-3xl font-medium lg:text-5xl">
          Our Team
          <span className="text-primary"> Activities</span>
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm lg:text-base">
          From on-site installations to remote troubleshooting, our team
          stays active in the field to keep your systems running the way
          they should.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-5">
        {/* Main Article */}
        {activities[0] && (
          <Link
            href={`/activities/${activities[0].slug}`}
            className="relative w-full overflow-hidden rounded-lg max-lg:hover:cursor-pointer lg:col-span-2"
          >
            <div className="absolute inset-0 z-10 block bg-gradient-to-t from-black/60 to-transparent lg:hidden" />

            <div className="absolute bottom-0 left-0 z-20 p-2 lg:relative lg:block lg:p-0">
              <h1 className="lg:text-foreground mb-2 line-clamp-2 cursor-pointer text-lg font-medium text-white transition hover:underline lg:text-3xl lg:font-semibold">
                {activities[0].title}
              </h1>
              <div className="text-white/80 lg:text-muted-foreground flex cursor-pointer items-center gap-1.5 text-xs lg:mb-4 lg:text-sm">
                <span className="font-medium tracking-wide uppercase">
                  {activities[0].category}
                </span>
                <span className="opacity-40">•</span>
                <span className="opacity-70">
                  {formatDate(activities[0].createdAt.toString())}
                </span>
              </div>
            </div>
            <div className="relative z-0 h-40 w-full cursor-pointer overflow-hidden rounded-lg md:h-80">
              <Image
                src={activities[0].image?.url ?? "/images/image-placeholder.svg"}
                alt={activities[0].title}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </Link>
        )}

        {/* Right Side Articles */}
        <div className="space-y-6 lg:col-span-3">
          {/* Article 1 */}
          {activities.slice(1, 3).map((activity) => (
            <Link
              href={`/activities/${activity.slug}`}
              key={activity.id}
              className="relative flex w-full cursor-pointer flex-col gap-4 overflow-hidden rounded-lg border-b border-gray-200 pb-6 md:flex-row"
            >
              <div className="absolute inset-0 z-10 block bg-gradient-to-t from-black/60 to-transparent lg:hidden" />

              <div className="absolute bottom-0 left-0 z-20 flex-1 p-2 lg:relative lg:block lg:p-0">
                <h2 className="lg:text-foreground mb-2 line-clamp-2 text-lg font-medium text-white transition hover:underline lg:text-xl lg:font-semibold">
                  {activity.title}
                </h2>
                <div
                  className="prose prose-sm mb-2 line-clamp-2 hidden max-w-none text-sm text-gray-700 lg:block"
                  dangerouslySetInnerHTML={{ __html: activity.content }}
                />
                <div className="text-white/80 lg:text-muted-foreground flex items-center gap-1.5 text-xs lg:text-sm">
                  <span className="font-medium tracking-wide uppercase">
                    {activity.category}
                  </span>
                  <span className="opacity-40">•</span>
                  <span className="opacity-70">
                    {formatDate(activity.createdAt.toString())}
                  </span>
                </div>
              </div>
              <div className="relative z-0 h-40 w-full shrink-0 overflow-hidden rounded-lg md:w-40 lg:h-28">
                <Image
                  src={activity.image?.url ?? "/images/image-placeholder.svg"}
                  alt="Breaking competition at the Olympics"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
