"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ActivityType } from "@/lib/validators/activity.validator";
import SearchBar from "@/components/root/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_CATEGORIES = "All Categories";

export default function ActivityList({
  activities,
}: {
  activities: ActivityType[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);

  const categories = useMemo(
    () => Array.from(new Set(activities.map((activity) => activity.category))),
    [activities],
  );

  const filteredActivities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return activities.filter((activity) => {
      const matchesSearch =
        !query || activity.title.toLowerCase().includes(query);
      const matchesCategory =
        category === ALL_CATEGORIES || activity.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [activities, search, category]);

  return (
    <section id="activity-list" className="bg-primary/5 px-4 py-16 pb-28 lg:px-28">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search for Activity"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="border-primary w-full rounded-none border-0 border-b-2 bg-transparent px-2 shadow-none focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent lg:w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_CATEGORIES}>{ALL_CATEGORIES}</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="capitalize">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 gap-12 pt-6 lg:grid-cols-3">
          {filteredActivities.map((activity) => (
            <Link href={`/activities/${activity.slug}`} key={activity.id}>
              <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-md">
                <Image
                  src={activity.image?.url ?? "/images/image-placeholder.svg"}
                  alt={activity.title}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h2 className="mt-3 line-clamp-2 text-xl font-semibold">
                {activity.title}
              </h2>
              <div className="text-muted-foreground mt-1.5 flex items-center gap-1.5 text-xs">
                <span className="font-medium tracking-wide uppercase">
                  {activity.category}
                </span>
                <span className="opacity-40">•</span>
                <span className="opacity-70">
                  {format(activity.createdAt, "dd MMM yyyy")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-primary/60 pt-12 text-center">
          No activities found.
        </p>
      )}
    </section>
  );
}
