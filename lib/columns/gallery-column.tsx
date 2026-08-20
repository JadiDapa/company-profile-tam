import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import TableSorter from "@/components/dashboard/TableSorter";
import Image from "next/image";
import { RiEyeLine as Eye, RiPencilLine as Pencil } from "react-icons/ri";
import { GalleryType } from "../validators/gallery.validator";
import DeleteGalleryButton from "@/components/dashboard/DeleteGalleryButton";

export const galleryColumn: ColumnDef<GalleryType>[] = [
  {
    accessorKey: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => <TableSorter isFirst column={column} header="#" />,
    cell: ({ row }) => (
      <div className="text-primary translate-x-4">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "image",
    accessorFn: (row) => row.image,
    header: ({ column }) => <TableSorter column={column} header="IMAGE" />,
    cell: ({ row }) => (
      <div className="relative aspect-square h-32 w-40 overflow-hidden rounded-sm">
        <Image
          unoptimized
          src={row.original.image?.url ?? "/images/image-placeholder.svg"}
          className="object-cover object-center"
          alt={row.original.image?.filename as string}
          fill
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    accessorFn: (row) => row.title,
    header: ({ column }) => <TableSorter column={column} header="TITLE" />,
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: "function",
    header: ({ column }) => <TableSorter column={column} header="ACT" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Link href="/gallery" className="text-primary size-5">
          <Eye />
        </Link>
        <Link
          href={`/dashboard/galleries/update/${row.original.slug}`}
          className="text-primary size-5"
        >
          <Pencil />
        </Link>
        <DeleteGalleryButton galleryId={row.original.id} />
      </div>
    ),
  },
];
