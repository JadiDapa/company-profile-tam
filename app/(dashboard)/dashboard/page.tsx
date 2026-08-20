import {
  RiCalendarEventLine as CalendarEvent,
  RiImageLine as ImageIcon,
  RiUserLine as UserIcon,
} from "react-icons/ri";
import StatisticCard from "@/components/dashboard/StatisticCard";
import { getAllActivities } from "@/app/actions/activity.action";
import { getAllGalleries } from "@/app/actions/gallery.action";
import { getAllUsers } from "@/app/actions/user.actions";

export default async function DashboardGalleryPage() {
  const [activities, galleries, users] = await Promise.all([
    getAllActivities(),
    getAllGalleries(),
    getAllUsers(),
  ]);

  return (
    <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
      {/* Header Title */}
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">Dashboard</h1>
          <p className="hidden lg:inline"></p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <StatisticCard
          Icon={CalendarEvent}
          title="Total Activities"
          value={activities.length}
        />
        <StatisticCard
          Icon={ImageIcon}
          title="Total Galleries"
          value={galleries.length}
        />
        <StatisticCard Icon={UserIcon} title="Total Users" value={users.length} />
      </div>
    </section>
  );
}
