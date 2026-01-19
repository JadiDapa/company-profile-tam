import { getAllActivities } from "@/app/actions/activity.action";
import ActivityList from "@/components/root/Activities/ActivityList";
import LatestActivity from "@/components/root/Activities/LatestActivity";
import PageHeader from "@/components/root/PageHeader";

export default async function ActivitiesPage() {
  const getActivities = await getAllActivities();
  const latestActivity = getActivities?.[0];
  const activities = getActivities?.slice(1);

  return (
    <section id="activities">
      <PageHeader
        page="Activities"
        title="This Is What We Do For"
        accent="All Of Them"
        subtitle="Achieve seamless technology and advanced networks with IT solutions tailored for modern infrastructure. Each solution supports growth, control, and long-term"
      />
      {getActivities.length > 0 && (
        <>
          <LatestActivity latestActivity={latestActivity} />
          <ActivityList activities={activities} />
        </>
      )}
    </section>
  );
}
