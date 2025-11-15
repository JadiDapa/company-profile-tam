"use client";

import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteActivity } from "@/lib/networks/activity";

export default function DeleteActivityButton({ slug }: { slug: string }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteActivity(slug),
    onSuccess: () => {
      toast.success("Activity deleted");
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    onError: () => {
      toast.error("Failed to delete activity");
    },
  });

  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    mutation.mutate();
  };

  return (
    <button
      onClick={handleDelete}
      disabled={mutation.isPending}
      className="text-red-500 hover:text-red-600"
    >
      <Trash className="size-5" />
    </button>
  );
}
