"use client";

import { IoMdTime } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import {
  RiFacebookLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiWhatsappLine,
} from "react-icons/ri";
import Link from "next/link";
import { formatDate } from "@/lib/utils/format-date";
import { getActivityBySlug, getAllActivities } from "@/lib/networks/activity";
import { useParams } from "next/navigation";

export default function NewsDetail() {
  const { slug } = useParams();

  const { data: anotherNews } = useQuery({
    queryFn: () => getAllActivities(),
    queryKey: ["news"],
  });

  const { data: news } = useQuery({
    queryFn: () => getActivityBySlug(slug as string),
    queryKey: ["news", slug],
    enabled: !!slug,
  });

  if (news) {
    const validTime = format(
      new Date(news.createdAt || "2024-07-25T08:17:41.095Z") || new Date(),
      "HH:mm ",
      {
        locale: id,
      },
    );

    const validDate = format(
      new Date(news.createdAt || "2024-07-25T08:17:41.095Z") || new Date(),
      "PPPP ",
      {
        locale: id,
      },
    );

    return (
      <div className="flex flex-col justify-between gap-12 px-4 pt-24 pb-24 lg:flex-row lg:px-24">
        <section
          id="berita"
          className="flex w-full flex-[2] flex-col gap-4 lg:gap-6"
        >
          <h2 className="border-secondary text-primary text-center text-2xl font-bold sm:text-3xl lg:text-3xl">
            {news?.title}
          </h2>
          <div className="text-text-400 mx-auto flex items-center gap-3 text-center text-base">
            <div className="flex items-center gap-[2px]">
              <IoMdTime />
              <p>{validTime}</p>
            </div>
            <div className="flex items-center gap-[2px]">
              <CiCalendar />
              <p>{validDate}</p>
            </div>
          </div>

          <figure className="relative aspect-video w-full">
            <Image
              src={news.image!.toString()}
              alt={news.title}
              className="object-cover object-center"
              fill
            />
            <figcaption className="mt-2">{news.title}</figcaption>
          </figure>

          <div className="prose-sm lg:prose min-w-full">
            <div
              className="prose-sm lg:prose"
              dangerouslySetInnerHTML={{ __html: news.content }}
            ></div>
            <div className="mt-8 grid grid-cols-4 gap-4 md:mt-10">
              <div className="min-h-8 cursor-pointer rounded-md bg-[#3b5998] text-center hover:opacity-80 lg:min-h-12">
                <RiFacebookLine
                  size={24}
                  strokeWidth={2}
                  className="m-auto h-full text-white"
                />
              </div>
              <div className="min-h-8 cursor-pointer rounded-md bg-[#55acee] text-center hover:opacity-80 lg:min-h-12">
                <RiTwitterXLine
                  size={24}
                  className="m-auto h-full text-white"
                />
              </div>
              <div className="min-h-8 cursor-pointer rounded-md bg-[#E1306C] text-center hover:opacity-80 lg:min-h-12">
                <RiInstagramLine
                  size={24}
                  className="m-auto h-full text-white"
                />
              </div>
              <div className="min-h-8 cursor-pointer rounded-md bg-[#4dc247] text-center hover:opacity-80 lg:min-h-12">
                <RiWhatsappLine
                  size={24}
                  className="m-auto h-full text-white"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="#berita-lainnya" className="flex-[1]">
          <h3 className="border-secondary text-primary max-w-fit border-b-4 text-xl font-bold sm:text-3xl lg:text-2xl">
            Berita lainnya
          </h3>
          <div className="mt-6 flex cursor-pointer flex-col divide-y">
            {anotherNews &&
              Array.isArray(anotherNews) &&
              anotherNews
                .filter((news) => news.slug !== slug)
                .slice(0, 10)
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center gap-1 py-2 first:pt-0 lg:py-3"
                  >
                    <Link
                      href={`/activities/${item.slug}`}
                      className="line-clamp-2 text-sm transition hover:underline lg:text-base"
                    >
                      {item.title}
                    </Link>
                    <div className="flex justify-between">
                      <div className="text-secondary min-w-16 text-xs">
                        {formatDate(item.createdAt!.toString())}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </div>
    );
  }
}
