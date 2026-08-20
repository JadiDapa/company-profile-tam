import Link from "next/link";
import {
  RiArrowLeftSLine as ChevronLeft,
  RiArrowRightSLine as ChevronRight,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";

export default function ServerPagination({
  page,
  totalPages,
  makeHref,
}: {
  page: number;
  totalPages: number;
  makeHref: (page: number) => string;
}) {
  return (
    <div className="mr-6 flex items-center justify-end gap-4 py-4">
      <span className="text-muted-foreground text-sm">
        Page {page} of {Math.max(totalPages, 1)}
      </span>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" className="h-10 w-10 p-0" disabled={page <= 1}>
          <Link
            href={makeHref(Math.max(page - 1, 1))}
            aria-disabled={page <= 1}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          >
            <ChevronLeft strokeWidth={1.5} />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-10 w-10 p-0"
          disabled={page >= totalPages}
        >
          <Link
            href={makeHref(Math.min(page + 1, totalPages))}
            aria-disabled={page >= totalPages}
            className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
          >
            <ChevronRight strokeWidth={1.5} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
