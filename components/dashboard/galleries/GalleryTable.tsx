"use client";

import DataTable from "@/components/dashboard/DataTable";
import ServerPagination from "@/components/dashboard/ServerPagination";
import { galleryColumn } from "@/lib/columns/gallery-column";
import SearchDataTable from "@/components/dashboard/SearchDataTable";
import { GalleryType } from "@/lib/validators/gallery.validator";

interface GalleryTableProps {
  galleries: GalleryType[];
  page: number;
  totalPages: number;
}

export default function GalleryTable({
  galleries,
  page,
  totalPages,
}: GalleryTableProps) {
  return (
    <DataTable
      columns={galleryColumn}
      data={galleries}
      filters={(table) => (
        <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
          <SearchDataTable
            table={table}
            column="title"
            placeholder="Search Gallery Name..."
          />
        </div>
      )}
      pagination={
        <ServerPagination
          page={page}
          totalPages={totalPages}
          makeHref={(p) => `/dashboard/galleries?page=${p}`}
        />
      }
    />
  );
}
