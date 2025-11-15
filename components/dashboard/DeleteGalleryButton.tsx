"use client";

import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteGallery } from "@/lib/networks/gallery";

export default function DeleteGalleryButton({ slug }: { slug: string }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteGallery(slug),
    onSuccess: () => {
      toast.success("Gallery deleted");
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
    },
    onError: () => {
      toast.error("Failed to delete gallery");
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
