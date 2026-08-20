"use client";

import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

interface Props {
  children: ReactNode;
}

export default function AuthProviders({ children }: Props) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
