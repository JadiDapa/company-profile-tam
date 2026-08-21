import type { Metadata } from "next";
import { IoMdTime } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
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
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils/format-date";
import {
  getActivityBySlug,
  getAllActivities,
} from "@/app/actions/activity.action";
import FadeIn from "@/components/root/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/root/StaggerGroup";

function stripHtml(html: string, maxLength = 160) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await getActivityBySlug(slug);

  if (!news) {
    return {};
  }

  const description = stripHtml(news.content);
  const image = news.image?.url ?? "/images/open-graph.png";

  return {
    title: news.title,
    description,
    alternates: { canonical: `/activities/${slug}` },
    openGraph: {
      title: news.title,
      description,
      url: `/activities/${slug}`,
      type: "article",
      publishedTime: news.createdAt?.toISOString(),
      modifiedTime: news.updatedAt?.toISOString(),
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description,
      images: [image],
    },
  };
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const otherNews = await getAllActivities();

  const news = await getActivityBySlug(slug);

  if (!news) {
    notFound();
  }

  {
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
        <FadeIn
          as="section"
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
              src={news.image?.url ?? "/images/image-placeholder.svg"}
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
        </FadeIn>
        <FadeIn as="section" id="#berita-lainnya" direction="left" delay={0.1} className="flex-[1]">
          <h3 className="border-secondary text-primary max-w-fit border-b-4 text-xl font-bold sm:text-3xl lg:text-2xl">
            Berita lainnya
          </h3>
          <StaggerGroup as="div" className="mt-6 flex cursor-pointer flex-col divide-y">
            {otherNews &&
              Array.isArray(otherNews) &&
              otherNews
                .filter((news) => news.slug !== slug)
                .slice(0, 10)
                .map((item, index) => (
                  <StaggerItem
                    key={index}
                    index={index}
                    staggerStep={0.08}
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
                  </StaggerItem>
                ))}
          </StaggerGroup>
        </FadeIn>
      </div>
    );
  }
}
