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
      <DialogContent className="sm:max-w-lg w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 text-center pb-2">
          <DialogTitle className="text-xl sm:text-2xl">Create Invoice</DialogTitle>
          <DialogDescription className="text-sm sm:text-base leading-relaxed">
            Were there any changes in costs from the original quote?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-2 pb-2">
          <MobileButton
            onClick={onNoChanges}
            disabled={loading}
            className="w-full justify-start h-auto py-5 px-5 border-2 hover:bg-accent/50 hover:border-primary/20 transition-all"
            variant="outline"
          >
            <div className="flex items-start gap-4 w-full">
              <FileText className="h-6 w-6 mt-0.5 flex-shrink-0 text-primary" />
              <div className="text-left flex-1">
                <div className="font-semibold text-base sm:text-lg mb-1">No Changes</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                  Use the exact quote amounts to generate the invoice
                </div>
              </div>
            </div>
          </MobileButton>

          <MobileButton
            onClick={onHasChanges}
            disabled={loading}
            className="w-full justify-start h-auto py-5 px-5 border-2 hover:bg-accent/50 hover:border-primary/20 transition-all"
            variant="outline"
          >
            <div className="flex items-start gap-4 w-full">
              <Edit className="h-6 w-6 mt-0.5 flex-shrink-0 text-primary" />
              <div className="text-left flex-1">
                <div className="font-semibold text-base sm:text-lg mb-1">Yes, There Are Changes</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
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
