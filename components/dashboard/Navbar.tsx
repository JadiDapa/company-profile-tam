"use client";

import { LogOut, Menu } from "lucide-react";
import SearchDialog from "./SearchDialog";
import useSidebarStore from "@/stores/SidebarStore";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const { openSidebar } = useSidebarStore();

  return (
    <div className="flex w-full flex-row items-center justify-between gap-4 bg-white p-3 shadow-sm lg:gap-6 lg:py-4">
      <div className="flex items-center gap-6">
        <Menu
          strokeWidth={1.5}
          size={28}
          onClick={openSidebar}
          className="lg:hidden"
        />
        <SearchDialog />
      </div>
      <div className="flex items-center gap-6">
        <LogOut onClick={() => signOut()} strokeWidth={1.8} size={24} />
      </div>
    </div>
  );
}
