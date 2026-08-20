"use client";

import { RiDeleteBinLine as Trash } from "react-icons/ri";
import { startTransition } from "react";
import { toast } from "sonner";
import { deleteActivity } from "@/app/actions/activity.action";

export default function DeleteActivityButton({
  activityId,
}: {
  activityId: number;
}) {
  function handleDelete() {
    const ok = confirm("Are you sure you want to delete this?");
    if (!ok) return;

    startTransition(async () => {
      try {
        await deleteActivity(activityId);

        toast.success("Activity deleted!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete activity");
      }
    });
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
      <Trash className="size-5" />
    </button>
  );
}
