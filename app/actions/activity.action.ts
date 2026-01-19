"use server";

import { ActivityService } from "@/lib/services/activity.service";
import { CreateActivitySchema } from "@/lib/validators/activity.validator";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createMedia } from "./media.action";
import { MediaTable, MediaType } from "@/generated/prisma";

export async function getAllActivities() {
  return await ActivityService.getAll();
}

export async function getActivityById(id: number) {
  return await ActivityService.getById(id);
}

export async function getActivityBySlug(slug: string) {
  return await ActivityService.getBySlug(slug);
}

export async function createActivity({
  activity,
  image,
}: {
  activity: z.input<typeof CreateActivitySchema>;
  image: File;
}) {
  const data = CreateActivitySchema.parse({ ...activity });

  const created = await ActivityService.create({
    ...data,
  });

  await createMedia({
    entityId: created!.id,
    file: image,
    mediaTable: MediaTable.ACTIVITY,
    mediaType: MediaType.IMAGE,
    description: "Evidence Submission",
  });

  revalidatePath("/activities");
}

export async function updateActivity(
  activityId: number,
  {
    activity,
    image,
  }: {
    activity: z.input<typeof CreateActivitySchema>;
    image: File;
  },
) {
  const data = CreateActivitySchema.parse({ ...activity });

  const created = await ActivityService.update(activityId, {
    ...data,
  });

  await createMedia({
    entityId: created!.id,
    file: image,
    mediaTable: MediaTable.ACTIVITY,
    mediaType: MediaType.IMAGE,
    description: "Evidence Submission",
  });

  revalidatePath("/activities/" + activity.slug);
  revalidatePath("/activities");
}

export async function deleteActivity(activityId: number) {
  await ActivityService.delete(activityId);
  revalidatePath("/activities");
}
