"use client";

import { Trash } from "lucide-react";
import { startTransition } from "react";
import { toast } from "sonner";
import { deleteGallery } from "@/app/actions/gallery.action";

export default function DeleteGalleryButton({
  galleryId,
}: {
  galleryId: number;
}) {
  function handleDelete() {
    const ok = confirm("Are you sure you want to delete this?");
    if (!ok) return;

    startTransition(async () => {
      try {
        await deleteGallery(galleryId);

        toast.success("Gallery deleted!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete gallery");
      }
    });
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
      <Trash className="size-5" />
    </button>
  );
}
