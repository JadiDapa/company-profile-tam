"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MobileNav from "./MobileNav";
import { Button } from "../ui/button";

const links = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "About",
    route: "/about",
  },
  {
    name: "Services",
    route: "/services",
  },
  {
    name: "Activities",
    route: "/activities",
  },
  {
    name: "Gallery",
    route: "/gallery",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-5 transition lg:px-24",
        { "bg-stone-50 shadow-sm": isScrolled },
      )}
    >
      <figure className="flex items-center gap-3">
        <div className="relative h-8 w-12 lg:h-10 lg:w-20">
          <Image
            src="/images/logo.png"
            alt="TAM Logo"
            fill
            className="object-contain object-top"
          />
        </div>
      </figure>
      <div className="block lg:hidden">
        <MobileNav links={links} />
      </div>

      <div className="hidden gap-6 lg:flex">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.route}
            className={`hover:border-primary border-b-2 border-transparent text-lg transition ${
              pathname === link.route
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <Button
        onClick={() => router.push("/services")}
        className="hidden rounded-full px-9 lg:flex"
      >
        Explore
      </Button>
    </nav>
  );
};

export default Navbar;
