import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, FileText, X, Loader2 } from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkStatusChange: (status: 'draft' | 'in-progress' | 'completed') => void;
  onBulkExport: () => void;
  onDeselectAll: () => void;
  isExporting?: boolean;
}

const BulkActionsBar = ({
  selectedCount,
  onBulkDelete,
  onBulkStatusChange,
  onBulkExport,
  onDeselectAll,
  isExporting = false,
}: BulkActionsBarProps) => {
  return (
    <div className="bg-accent/50 backdrop-blur-sm border border-border rounded-lg p-4 mb-4 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
      <span className="text-sm font-medium">
        {selectedCount} selected
      </span>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <Button
          variant="destructive"
          size="default"
          onClick={onBulkDelete}
          className="gap-2 flex-1 sm:flex-none min-h-[44px]"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="default" className="flex-1 sm:flex-none min-h-[44px]">
              Change Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onBulkStatusChange('draft')}>
              Draft
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onBulkStatusChange('in-progress')}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onBulkStatusChange('completed')}>
              Completed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="default"
          onClick={onBulkExport}
          disabled={isExporting}
          className="gap-2 flex-1 sm:flex-none min-h-[44px]"
        >
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <FileText className="h-4 w-4" />
              <span>Export PDFs</span>
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          size="default"
          onClick={onDeselectAll}
          className="gap-2 sm:ml-auto min-h-[44px]"
        >
          <X className="h-4 w-4" />
          Deselect All
        </Button>
      </div>
    </div>
  );
};

export { BulkActionsBar };
