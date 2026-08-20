export const revalidate = 0;

import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { getUser } from "../actions/user.actions";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/dashboard/Navbar";
import AuthProviders from "@/providers/AuthProviders";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AuthProviders>
      <SidebarProvider>
        <Sidebar user={user} />
        <main className="bg-background flex min-h-screen w-full flex-col gap-2 overflow-hidden py-2 pe-2">
          <Navbar user={user} />
          {children}
        </main>
      </SidebarProvider>
    </AuthProviders>
  );
}
