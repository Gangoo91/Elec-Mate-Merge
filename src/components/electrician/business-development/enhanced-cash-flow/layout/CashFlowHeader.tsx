import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Download,
  FileSpreadsheet,
  Copy,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CashFlowHeaderProps {
  isHealthy: boolean;
  healthMessage: string;
  onExportCSV: () => void;
  onCopySummary: () => void;
  onLoadTemplates: () => void;
  hasData: boolean;
  className?: string;
}

export const CashFlowHeader = ({
  isHealthy,
  healthMessage,
  onExportCSV,
  onCopySummary,
  onLoadTemplates,
  hasData,
  className,
}: CashFlowHeaderProps) => {
  return (
    <div className={cn("px-4 sm:px-6 lg:px-8 py-4", className)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Title and Health */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 shrink-0">
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              Cash Flow Planner
            </h1>
            {hasData && (
              <div className="flex items-center gap-1.5 mt-0.5">
                {isHealthy ? (
                  <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                ) : (
                  <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium truncate",
                    isHealthy ? "text-green-400" : "text-red-400"
                  )}
                >
                  {healthMessage}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <SmartBackButton />

          {/* Templates - Mobile only */}
          <button
            onClick={onLoadTemplates}
            className="lg:hidden h-10 px-3 flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </button>

          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-10 px-3 sm:px-4 flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-card border-white/10 w-48"
            >
              <DropdownMenuItem
                onClick={onExportCSV}
                className="text-white py-3 cursor-pointer focus:bg-white/10"
              >
                <FileSpreadsheet className="h-5 w-5 mr-3" />
                <span>Export to CSV</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onCopySummary}
                className="text-white py-3 cursor-pointer focus:bg-white/10"
              >
                <Copy className="h-5 w-5 mr-3" />
                <span>Copy Summary</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
