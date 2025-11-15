import Image from "next/image";
import Link from "next/link";
import { RiFacebookFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";

const resourcesLinks = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Services",
    link: "/services",
  },
  {
    label: "Activities",
    link: "/activities",
  },
  {
    label: "Gallery",
    link: "/gallery",
  },
];

const categoryLink = [
  {
    label: "IT Consultant",
    link: "#",
  },
  {
    label: "Integrator",
    link: "#",
  },
  {
    label: "Maintenance",
    link: "#",
  },
  {
    label: "Trading & Supplier",
    link: "#",
  },
];

const socialMediaLinks = [
  {
    link: "/",
    Icon: RiInstagramFill,
  },
  {
    link: "/product",
    Icon: RiFacebookFill,
  },
  {
    link: "/categories",
    Icon: RiTwitterFill,
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-primary bottom-0 left-0 border-t pt-12 pb-4"
    >
      <div className="flex flex-col gap-6 px-6 lg:px-24">
        <div className="relative mx-auto flex w-full flex-col gap-6">
          <div className="flex flex-col gap-9 text-sm md:gap-20 lg:flex-row">
            <div className="flex flex-col gap-4">
              <figure className="relative h-20 w-32 gap-6">
                <Image
                  src={"/images/logo.png"}
                  alt="Logo GIZMO"
                  fill
                  className="object-contain object-center brightness-0 invert filter"
                />
              </figure>
              <div className="text-primary-foreground flex flex-col gap-1">
                <h4 className="text-lg font-bold">+62 7111 710 600</h4>
                <h4 className="text-lg font-bold">info@tarunagroup.co.id</h4>
                <p className="text-lg leading-relaxed tracking-wide lg:w-[60%]">
                  Jl. R. E Martadinata No. 2091 Sungai Buah, Ilir Timur II,
                  Palembang, Sumatera Selatan
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-8 tracking-wide max-lg:justify-between md:flex-row lg:gap-14 xl:gap-28">
              <div className="flex flex-col gap-2 md:gap-6">
                <h4 className="border-background text-primary-foreground w-fit border-b-4 text-lg font-bold lg:text-xl">
                  RESOURCES
                </h4>
                <ul className="flex flex-col gap-2 text-base text-slate-500 md:gap-4 md:text-lg">
                  {resourcesLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.link}
                        className="text-primary-foreground duration-200 hover:opacity-75"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 md:gap-6">
                <h4 className="border-background text-primary-foreground w-fit border-b-4 text-lg font-bold lg:text-xl">
                  CATEGORY
                </h4>
                <ul className="flex flex-col gap-2 text-base text-slate-500 md:gap-4 md:text-lg">
                  {categoryLink.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.link}
                        className="text-primary-foreground duration-200 hover:opacity-75"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 md:gap-6">
                <h4 className="border-background text-primary-foreground w-fit border-b-4 text-lg font-bold lg:text-xl">
                  FOLLOW US
                </h4>
                <ul className="flex gap-2 text-base text-slate-500 md:gap-4 md:text-lg">
                  {socialMediaLinks.map((link) => (
                    <a
                      href={link.link}
                      key={link.link}
                      className="text-primary-foreground text-3xl duration-200 hover:opacity-75"
                    >
                      <link.Icon />
                    </a>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex w-full justify-center">
          <small className="text-primary-foreground text-base font-medium">
            &copy; Copyright 2025 TAM. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
