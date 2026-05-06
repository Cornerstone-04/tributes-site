import Link from "next/link";
import { TributeStatus } from "@/types";

type AdminTabsProps = {
  activeTab: TributeStatus;
  pendingCount: number;
  approvedCount: number;
};

export function AdminTabs({
  activeTab,
  pendingCount,
  approvedCount,
}: AdminTabsProps) {
  const tabs = [
    {
      value: "pending" as const,
      label: "Pending",
      count: pendingCount,
    },
    {
      value: "approved" as const,
      label: "Approved",
      count: approvedCount,
    },
  ];

  return (
    <div className="mb-8 flex flex-wrap gap-2 border-b border-accent/15 pb-3">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <Link
            key={tab.value}
            href={`/admin?tab=${tab.value}&page=1`}
            className={`inline-flex items-center gap-2 border px-4 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
              isActive
                ? "border-accent bg-accent text-background"
                : "border-accent/20 text-accent hover:bg-accent/10"
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                isActive
                  ? "bg-background/20 text-background"
                  : "bg-accent/10 text-accent"
              }`}
            >
              {tab.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
