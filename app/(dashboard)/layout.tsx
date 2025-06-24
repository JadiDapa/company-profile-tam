// app/dashboard/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = await auth();

  if (!session) {
    redirect("/login");
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
