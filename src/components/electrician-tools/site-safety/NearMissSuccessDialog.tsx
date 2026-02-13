import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Eye, Sparkles, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreateBriefing: () => void;
  onViewReport: () => void;
  reportId: string;
}

export const NearMissSuccessDialog = ({ 
  open, 
  onClose, 
  onCreateBriefing, 
  onViewReport 
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              <DialogTitle>Near Miss Reported</DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Your near miss report has been submitted successfully
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 pt-4">
          <p className="text-sm text-white">
            What would you like to do next?
          </p>

          <Button
            onClick={() => {
              onCreateBriefing();
              onClose();
            }}
            className="w-full justify-start h-auto py-4 px-4"
            variant="default"
          >
            <div className="flex items-start gap-3 text-left w-full">
              <Sparkles className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold">Create Team Briefing</p>
                <p className="text-xs opacity-90 font-normal mt-1">
                  Generate a professional safety briefing to share with your team
                </p>
              </div>
            </div>
          </Button>

          <Button
            onClick={() => {
              onViewReport();
              onClose();
            }}
            className="w-full justify-start h-auto py-4 px-4"
            variant="outline"
          >
            <div className="flex items-start gap-3 text-left w-full">
              <Eye className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold">View Report</p>
                <p className="text-xs opacity-70 font-normal mt-1">
                  See the details of your submitted report
                </p>
              </div>
            </div>
          </Button>

          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
