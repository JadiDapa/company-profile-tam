"use client";

import { RiDeleteBinLine as Trash } from "react-icons/ri";
import { startTransition } from "react";
import { toast } from "sonner";
import { deleteUser } from "@/app/actions/user.actions";

export default function DeleteUserButton({ userId }: { userId: number }) {
  function handleDelete() {
    const ok = confirm("Are you sure you want to delete this user?");
    if (!ok) return;

    startTransition(async () => {
      try {
        await deleteUser(userId);

        toast.success("User deleted!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete user");
      }
    });
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
      <Trash className="size-5" />
    </button>
  );
}
