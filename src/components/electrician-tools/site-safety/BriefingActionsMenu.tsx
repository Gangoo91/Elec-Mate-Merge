import { useState } from "react";
import { MoreVertical, Edit, Calendar, XCircle, Copy, PlayCircle, CheckCircle, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

  const canStart = briefing.status === 'scheduled';
  const canComplete = briefing.status === 'in_progress';
  const canEdit = briefing.status !== 'cancelled' && briefing.status !== 'completed';
  const canDelete = briefing.status === 'cancelled' || briefing.status === 'draft';

  const handleStartBriefing = () => {
    onStatusChange('in_progress');
    setShowInBriefingMode(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
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
              <DropdownMenuItem onClick={() => onStatusChange('completed')}>
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

      <Dialog open={showInBriefingMode} onOpenChange={setShowInBriefingMode}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <InBriefingMode
            briefing={briefing}
            onComplete={() => {
              onStatusChange('completed');
              setShowInBriefingMode(false);
              onRefresh();
            }}
            onClose={() => setShowInBriefingMode(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-elec-light">{briefing.briefing_name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <QuickActionsPanel briefing={briefing} onRefresh={onRefresh} />
            <BriefingStatusTimeline briefingId={briefing.id} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
