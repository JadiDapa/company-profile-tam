"use server";

import { UserService } from "@/lib/services/user.service";
import {
  CreateUserSchema,
  UpdateUserSchema,
} from "@/lib/validators/user.validator";
import { revalidatePath } from "next/cache";
import z from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@/generated/prisma";

export async function createUser(input: z.input<typeof CreateUserSchema>) {
  const data = CreateUserSchema.parse({
    password: input.password,
    username: input.username,
    fullName: input.fullName,
  });

  await UserService.create(data);

  revalidatePath("/users");
}
export async function getUser() {
  const clerkUser = await currentUser();
  if (!clerkUser?.username) return null;

  const user = await UserService.getByUsername(clerkUser.username);
  return user;
}

export async function getAllUsers() {
  return await UserService.getAll();
}

export async function getUsersByRole(role: UserRole) {
  return await UserService.getManyByRole(role);
}

export async function getUserByUsername(username: string) {
  return await UserService.getByUsername(username);
}

export async function updateUser(
  userId: number,
  input: z.input<typeof UpdateUserSchema>,
) {
  const data = UpdateUserSchema.parse(input);

  await UserService.update(userId, {
    ...data,
  });

  revalidatePath("/users/" + input.username);
  revalidatePath("/users");
}
