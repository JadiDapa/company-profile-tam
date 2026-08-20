import {
  RiSettings3Line as Settings,
  RiUserSettingsLine as UserRoundCogIcon,
  RiHomeLine as House,
  RiArticleLine as NotebookPen,
  RiGalleryLine as Images,
  RiUserLine as Users,
} from "react-icons/ri";

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
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
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
