import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Were there any changes in costs from the original quote?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-4">
          <Button
            onClick={onNoChanges}
            disabled={loading}
            className="w-full justify-start h-auto py-4"
            variant="outline"
          >
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold">No Changes</div>
                <div className="text-sm text-muted-foreground font-normal">
                  Use the exact quote amounts to generate the invoice
                </div>
              </div>
            </div>
          </Button>

          <Button
            onClick={onHasChanges}
            disabled={loading}
            className="w-full justify-start h-auto py-4"
            variant="outline"
          >
            <div className="flex items-start gap-3">
              <Edit className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold">Yes, There Are Changes</div>
                <div className="text-sm text-muted-foreground font-normal">
                  Adjust costs, add or remove items before generating
                </div>
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
