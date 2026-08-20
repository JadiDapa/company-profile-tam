"use server";

import {
  ActivityService,
  ActivityListOptions,
} from "@/lib/services/activity.service";
import { CreateActivitySchema } from "@/lib/validators/activity.validator";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createMedia } from "./media.action";
import { MediaTable, MediaType } from "@/generated/prisma";
import { MediaService } from "@/lib/services/media.service";
import { requireAuth } from "@/lib/requireAuth";

export async function getAllActivities() {
  return await ActivityService.getAll();
}

export async function listActivities(options: ActivityListOptions = {}) {
  return await ActivityService.list(options);
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
  await requireAuth();

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
  await requireAuth();

  const data = CreateActivitySchema.parse({ ...activity });

  const created = await ActivityService.update(activityId, {
    ...data,
  });

  await MediaService.deleteByEntity(created.id, MediaTable.ACTIVITY);

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
  await requireAuth();

  await MediaService.deleteByEntity(activityId, MediaTable.ACTIVITY);
  await ActivityService.delete(activityId);
  revalidatePath("/activities");
}
