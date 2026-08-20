"use client";

import { startTransition } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUser } from "@/app/actions/user.actions";
import { UserRole } from "@/generated/prisma";

const ROLES: UserRole[] = [
  UserRole.ADMIN,
  UserRole.TECHNICIAN,
  UserRole.USER,
];

export default function UserRoleSelect({
  userId,
  role,
}: {
  userId: number;
  role: UserRole;
}) {
  function handleChange(value: string) {
    startTransition(async () => {
      try {
        await updateUser(userId, { role: value as UserRole });
        toast.success("Role updated!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to update role");
      }
    });
  }

  return (
    <Select defaultValue={role} onValueChange={handleChange}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ROLES.map((r) => (
          <SelectItem key={r} value={r}>
            {r}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
