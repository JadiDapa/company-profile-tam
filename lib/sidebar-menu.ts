import {
  Settings,
  UserRoundCogIcon,
  House,
  NotebookPen,
  Images,
} from "lucide-react";

export const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: House,
  },
  {
    title: "Activities",
    url: "/dashboard/activities",
    icon: NotebookPen,
  },
  {
    title: "Gallery",
    url: "/dashboard/galleries",
    icon: Images,
  },
];

export const settingsItems = [
  {
    title: "Profil",
    url: "/profile",
    icon: UserRoundCogIcon,
  },
  {
    title: "Pengaturan",
    url: "/settings",
    icon: Settings,
  },
];
