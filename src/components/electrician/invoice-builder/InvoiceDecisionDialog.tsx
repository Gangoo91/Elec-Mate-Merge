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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Were there any changes in costs from the original quote?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-2">
          <MobileButton
            onClick={onNoChanges}
            disabled={loading}
            className="w-full justify-start h-auto py-4 px-4"
            variant="outline"
          >
            <div className="flex items-start gap-3 w-full">
              <FileText className="h-5 w-5 mt-0.5 shrink-0" />
              <div className="text-left flex-1">
                <div className="font-semibold mb-1">No Changes</div>
                <div className="text-sm text-muted-foreground font-normal whitespace-normal break-words">
                  Use the exact quote amounts to generate the invoice
                </div>
              </div>
            </div>
          </MobileButton>

          <MobileButton
            onClick={onHasChanges}
            disabled={loading}
            className="w-full justify-start h-auto py-4 px-4"
            variant="outline"
          >
            <div className="flex items-start gap-3 w-full">
              <Edit className="h-5 w-5 mt-0.5 shrink-0" />
              <div className="text-left flex-1">
                <div className="font-semibold mb-1">Yes, There Are Changes</div>
                <div className="text-sm text-muted-foreground font-normal whitespace-normal break-words">
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
