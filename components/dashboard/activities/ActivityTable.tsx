"use client";

import DataTable from "@/components/dashboard/DataTable";
import ServerPagination from "@/components/dashboard/ServerPagination";
import { activityColumn } from "@/lib/columns/activity-column";
import SearchDataTable from "@/components/dashboard/SearchDataTable";
import { ActivityType } from "@/lib/validators/activity.validator";

interface ActivityTableProps {
  activities: ActivityType[];
  page: number;
  totalPages: number;
}

export default function ActivityTable({
  activities,
  page,
  totalPages,
}: ActivityTableProps) {
  return (
    <DataTable
      columns={activityColumn}
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
      pagination={
        <ServerPagination
          page={page}
          totalPages={totalPages}
          makeHref={(p) => `/dashboard/activities?page=${p}`}
        />
      }
    />
  );
}
