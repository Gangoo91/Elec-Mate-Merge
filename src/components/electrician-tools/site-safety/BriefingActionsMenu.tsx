import { useState } from "react";
import { MoreVertical, Edit, Calendar, XCircle, Copy, PlayCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RescheduleBriefingDialog } from "./RescheduleBriefingDialog";
import { CancelBriefingDialog } from "./CancelBriefingDialog";

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

  const canStart = briefing.status === 'scheduled';
  const canComplete = briefing.status === 'in_progress';
  const canEdit = briefing.status !== 'cancelled' && briefing.status !== 'completed';

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
              <DropdownMenuItem onClick={() => setShowReschedule(true)}>
                <Calendar className="mr-2 h-4 w-4" />
                Reschedule
              </DropdownMenuItem>
            </>
          )}
          
          <DropdownMenuItem onClick={onDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>

          {canStart && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onStatusChange('in_progress')}>
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
      />
    </>
  );
};
