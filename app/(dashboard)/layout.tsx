"use client";

import { redirect } from "next/navigation";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { ReactNode } from "react";
import { useUser } from "@clerk/nextjs";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  const { user } = useUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <section className="bg-primary/5 flex min-h-screen w-full overflow-hidden lg:gap-12">
      <div>
        <Sidebar />
      </div>

      <main className="w-full lg:ml-[232px]">
        <Navbar />
        <div className="px-3 pb-6">{children}</div>
      </main>
    </section>
  );
}
