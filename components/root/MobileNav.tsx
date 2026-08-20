import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenuLine as Menu } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Links {
  name: string;
  route: string;
}

interface MobileNavProps {
  links: Links[];
}

const MobileNav: React.FC<MobileNavProps> = ({ links }) => {
  const pahtname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu size={28} />
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-primary w-3/4 max-w-xs">
        <SheetHeader>
          <SheetTitle className="flex w-full items-center justify-center gap-3">
            <div className="relative h-8 w-16 brightness-0 invert filter">
              <Image
                src="/images/logo.png"
                className="object-cover object-center"
                fill
                alt="Gizmo Logo"
              />
            </div>
          </SheetTitle>
          <SheetDescription className="text-background text-center">
            Providing Innovative Solutions
          </SheetDescription>
          <div className="flex flex-col pt-6">
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.route}
                  onClick={() => setOpen(false)}
                  className={`text-start text-lg text-white sm:text-xl ${
                    pahtname === link.route
                      ? "font-semibold underline"
                      : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <Button
                variant={"outline"}
                className="border-background hover:text-foreground text-primary cursor-pointer rounded-md bg-white px-9 hover:bg-white"
                onClick={() => setOpen(false)}
              >
                Learn More
              </Button>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
