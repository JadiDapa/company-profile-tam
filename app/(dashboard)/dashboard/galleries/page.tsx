"use client";

import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/dashboard/DataTable";
import { galleryColumn } from "@/lib/columns/gallery-column";
import SearchDataTable from "@/components/dashboard/SearchDataTable";
import CreateGalleryModal from "@/components/dashboard/Dashboard/gallery/CreateGalleryModal";
import { getAllGalleries } from "@/lib/networks/gallery";

export default function ActivitesPage() {
  const { data: galleries } = useQuery({
    queryFn: getAllGalleries,
    queryKey: ["galleries"],
  });

  if (galleries) {
    return (
      <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
        {/* Header Title */}
        <div className="flex w-full flex-col items-end justify-between gap-4 lg:flex-row lg:gap-6">
          <div className="">
            <h1 className="text-4xl font-medium">Gallery List</h1>
            <p className="hidden lg:inline">
              These are the Items that Consist in the Inventory
            </p>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <CreateGalleryModal />
          </div>
        </div>

        <DataTable
          columns={galleryColumn}
          data={galleries}
          filters={(table) => (
            <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
              <SearchDataTable
                table={table}
                column="name"
                placeholder="Search Item Type..."
              />
            </div>
          )}
        />
      </section>
    );
  }
}
