"use client";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AccountProvider } from "./AccountProvider";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <AccountProvider>{children}</AccountProvider>
        <NextNProgress />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
