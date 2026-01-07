import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CashFlowDashboardLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  mobileStats?: ReactNode;
  chart: ReactNode;
  tabs: ReactNode;
  tabContent: ReactNode;
  className?: string;
}

export const CashFlowDashboardLayout = ({
  header,
  sidebar,
  mobileStats,
  chart,
  tabs,
  tabContent,
  className,
}: CashFlowDashboardLayoutProps) => {
  return (
    <div className={cn("min-h-screen", className)}>
      {/* Header */}
      <div className="border-b border-white/10 bg-background">
        {header}
      </div>

      {/* Mobile Stats - Only on mobile */}
      {mobileStats && (
        <div className="lg:hidden">
          {mobileStats}
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Main Content Column */}
          <div className="space-y-4 lg:space-y-6 min-w-0">
            {/* Chart - Always visible on desktop, compact on mobile */}
            <div className="rounded-2xl overflow-hidden">
              {chart}
            </div>

            {/* Tabs Navigation */}
            <div>
              {tabs}
            </div>

            {/* Tab Content */}
            <div className="pb-6">
              {tabContent}
            </div>
          </div>

          {/* Sidebar - Desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-6 space-y-4">
              {sidebar}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
