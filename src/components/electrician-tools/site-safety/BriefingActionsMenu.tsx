import { useState } from "react";
import {
  MoreVertical,
  Edit,
  Calendar,
  XCircle,
  Copy,
  PlayCircle,
  CheckCircle,
  Eye,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { RescheduleBriefingDialog } from "./RescheduleBriefingDialog";
import { CancelBriefingDialog } from "./CancelBriefingDialog";
import { DeleteBriefingDialog } from "./DeleteBriefingDialog";
import { InBriefingMode } from "./InBriefingMode";
import { BriefingStatusTimeline } from "./BriefingStatusTimeline";
import { QuickActionsPanel } from "./QuickActionsPanel";

interface BriefingActionsMenuProps {
  briefing: any;
  onEdit: () => void;
  onDuplicate: () => void;
  onStatusChange: (status: string) => void;
  onRefresh: () => void;
}

export const BriefingActionsMenu = ({
  briefing,
  onEdit,
  onDuplicate,
  onStatusChange,
  onRefresh,
}: BriefingActionsMenuProps) => {
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showInBriefingMode, setShowInBriefingMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const canStart = briefing.status === "scheduled";
  const canComplete = briefing.status === "in_progress";
  const canEdit =
    briefing.status !== "cancelled" && briefing.status !== "completed";
  const canDelete =
    briefing.status === "cancelled" || briefing.status === "draft";

  const handleStartBriefing = () => {
    onStatusChange("in_progress");
    setShowInBriefingMode(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 touch-manipulation"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {canEdit && (
            <>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Briefing
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowReschedule(true)}
                className="text-amber-600 dark:text-amber-400 focus:text-amber-600"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Reschedule
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem onClick={onDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setShowDetails(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>

          {canStart && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleStartBriefing}>
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Briefing
              </DropdownMenuItem>
            </>
          )}

          {canComplete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onStatusChange("completed")}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Complete
              </DropdownMenuItem>
            </>
          )}

          {canEdit && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowCancel(true)}
                className="text-destructive focus:text-destructive"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel Briefing
              </DropdownMenuItem>
            </>
          )}

          {canDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowDelete(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Permanently
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <RescheduleBriefingDialog
        open={showReschedule}
        onOpenChange={setShowReschedule}
        briefing={briefing}
        onSuccess={onRefresh}
      />

      <CancelBriefingDialog
        open={showCancel}
        onOpenChange={setShowCancel}
        briefing={briefing}
        onSuccess={onRefresh}
        onReschedule={() => {
          setShowCancel(false);
          setShowReschedule(true);
        }}
      />

      <DeleteBriefingDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        briefing={briefing}
        onSuccess={onRefresh}
      />

      {/* In-Briefing Mode — bottom sheet */}
      <Sheet open={showInBriefingMode} onOpenChange={setShowInBriefingMode}>
        <SheetContent
          side="bottom"
          className="h-[90vh] p-0 rounded-t-2xl overflow-hidden"
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <InBriefingMode
              briefing={briefing}
              onComplete={() => {
                onStatusChange("completed");
                setShowInBriefingMode(false);
                onRefresh();
              }}
              onClose={() => setShowInBriefingMode(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* View Details — bottom sheet */}
      <Sheet open={showDetails} onOpenChange={setShowDetails}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
        >
          <div className="flex flex-col h-full bg-background overflow-y-auto">
            <div className="px-5 pt-6 pb-4 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">
                {briefing.briefing_name}
              </h2>
            </div>
            <div className="p-5 space-y-6">
              <QuickActionsPanel briefing={briefing} onRefresh={onRefresh} />
              <BriefingStatusTimeline briefingId={briefing.id} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
