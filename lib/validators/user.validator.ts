import { User } from "@/generated/prisma/client";
import { z } from "zod";

export type UserType = User;

export const UserSearchSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  search: z.string().min(1).max(50).optional(),
});

export const UserRoleEnum = z.enum(["ADMIN", "TECHNICIAN", "USER"]);

const UserBaseSchema = z.object({
  username: z.string().min(8).max(30).optional(),
  fullName: z.string().min(1).optional(),
  role: UserRoleEnum.optional(),
});

export const CreateUserSchema = UserBaseSchema.extend({
  username: z.string().min(8).max(30),
  fullName: z.string().min(1),
  role: UserRoleEnum,
});

export const UpdateUserSchema = UserBaseSchema.partial();

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
