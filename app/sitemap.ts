import type { MetadataRoute } from "next";
import { getAllActivities } from "@/app/actions/activity.action";

const baseUrl = "https://tarunagroup.co.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/gallery`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/activities`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const activities = await getAllActivities();

  const activityRoutes: MetadataRoute.Sitemap = (activities ?? []).map(
    (activity) => ({
      url: `${baseUrl}/activities/${activity.slug}`,
      lastModified: activity.updatedAt ?? activity.createdAt ?? undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...activityRoutes];
}
