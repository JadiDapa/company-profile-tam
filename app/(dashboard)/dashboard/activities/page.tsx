import { RiAddLine as Plus } from "react-icons/ri";
import Link from "next/link";
import { listActivities } from "@/app/actions/activity.action";
import ActivityTable from "@/components/dashboard/activities/ActivityTable";

export default async function DashboardActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  const { data: activities, totalPages } = await listActivities({
    page,
    pageSize: 10,
  });

  return (
    <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
      {/* Header Title */}
      <div className="flex w-full flex-col items-end justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">Activity List</h1>
          <p className="hidden lg:inline">
            These Are The Activities That Shared to the Publics
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <Link href="/dashboard/activities/create">
            <div className="bg-primary text-tertiary flex items-center gap-4 rounded-md px-6 py-2 text-lg shadow-sm">
              <p className="text-white">Add New Activity</p>
              <Plus className="text-white" size={24} />
            </div>
          </Link>
        </div>
      </div>

      {activities.length > 0 && (
        <ActivityTable
          activities={activities}
          page={page}
          totalPages={totalPages}
        />
      )}
    </section>
  );
}
