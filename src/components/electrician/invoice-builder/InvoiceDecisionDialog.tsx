import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MobileButton } from "@/components/ui/mobile-button";
import { FileText, Edit } from "lucide-react";

interface InvoiceDecisionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNoChanges: () => void;
  onHasChanges: () => void;
  loading?: boolean;
}

export const InvoiceDecisionDialog = ({
  open,
  onOpenChange,
  onNoChanges,
  onHasChanges,
  loading = false,
}: InvoiceDecisionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-[calc(100%-2rem)]">
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-lg sm:text-xl">Create Invoice</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Were there any changes in costs from the original quote?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2.5 pt-3 pb-1">
          <MobileButton
            onClick={onNoChanges}
            disabled={loading}
            className="w-full justify-start h-auto py-3.5 px-4 border-2 hover:bg-accent/50 hover:border-primary/20 transition-all"
            variant="outline"
          >
            <div className="flex items-start gap-3 w-full">
              <FileText className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
              <div className="text-left flex-1">
                <div className="font-semibold text-sm sm:text-base mb-0.5">No Changes</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-normal">
                  Use the exact quote amounts to generate the invoice
                </div>
              </div>
            </div>
          </MobileButton>

          <MobileButton
            onClick={onHasChanges}
            disabled={loading}
            className="w-full justify-start h-auto py-3.5 px-4 border-2 hover:bg-accent/50 hover:border-primary/20 transition-all"
            variant="outline"
          >
            <div className="flex items-start gap-3 w-full">
              <Edit className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
              <div className="text-left flex-1">
                <div className="font-semibold text-sm sm:text-base mb-0.5">Yes, There Are Changes</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-normal">
                  Adjust costs, add or remove items before generating
                </div>
              </div>
            </div>
          </MobileButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
