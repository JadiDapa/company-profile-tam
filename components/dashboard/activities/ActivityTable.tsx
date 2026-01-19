"use client";

import DataTable from "@/components/dashboard/DataTable";
import { galleryColumn } from "@/lib/columns/gallery-column";
import SearchDataTable from "@/components/dashboard/SearchDataTable";
import { Activity } from "@/generated/prisma";

interface ActivityTableProps {
  activities: Activity[];
}

export default function ActivityTable({ activities }: ActivityTableProps) {
  return (
    <DataTable
      columns={galleryColumn}
      data={activities}
      filters={(table) => (
        <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
          <SearchDataTable
            table={table}
            column="title"
            placeholder="Search Activity Name..."
          />
        </div>
      )}
    />
  );
}
