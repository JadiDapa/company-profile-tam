import type { Metadata } from "next";
import { getAllActivities } from "@/app/actions/activity.action";
import ActivityList from "@/components/root/Activities/ActivityList";
import LatestActivity from "@/components/root/Activities/LatestActivity";
import PageHeader from "@/components/root/PageHeader";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "A look at the projects and installations the Taruna Anugrah Mandiri team has completed for clients who trust us with their infrastructure.",
  alternates: { canonical: "/activities" },
  openGraph: { url: "/activities" },
};

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
        subtitle="A look at the projects and installations our team has completed for clients who trust us with their infrastructure."
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
