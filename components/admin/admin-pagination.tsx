import Link from "next/link";
import { TributeStatus } from "@/types";

type AdminPaginationProps = {
  currentPage: number;
  totalPages: number;
  tab: TributeStatus;
};

export function AdminPagination({
  currentPage,
  totalPages,
  tab,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label={`${tab} tribute pagination`}
    >
      {currentPage > 1 ? (
        <Link
          href={`/admin?tab=${tab}&page=${currentPage - 1}`}
          className="border border-accent/30 px-4 py-2 font-sans text-xs uppercase tracking-[0.16em] text-accent hover:bg-accent/10"
        >
          Previous
        </Link>
      ) : null}

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={`/admin?tab=${tab}&page=${page}`}
            aria-current={isActive ? "page" : undefined}
            className={`grid h-10 w-10 place-items-center border font-sans text-xs transition-colors ${
              isActive
                ? "border-accent bg-accent text-background"
                : "border-accent/25 text-accent hover:bg-accent/10"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={`/admin?tab=${tab}&page=${currentPage + 1}`}
          className="border border-accent/30 px-4 py-2 font-sans text-xs uppercase tracking-[0.16em] text-accent hover:bg-accent/10"
        >
          Next
        </Link>
      ) : null}
    </nav>
  );
}
