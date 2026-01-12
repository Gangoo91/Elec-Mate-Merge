import { useState } from "react";
import { format } from "date-fns";
import {
  Check,
  X,
  Clock,
  FileText,
  Calendar,
  PoundSterling,
  Building2,
  User,
  AlertCircle,
  Edit,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import {
  useUpdateVariationOrderStatus,
  useUpdateVariationOrder,
  useDeleteVariationOrder,
  type VariationOrder,
} from "@/hooks/useJobFinancials";

interface VariationOrderDetailSheetProps {
  variationOrder: VariationOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle?: string;
}

const statusConfig = {
  Pending: {
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: Clock,
  },
  Approved: {
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    icon: Check,
  },
  Rejected: {
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: X,
  },
};

export function VariationOrderDetailSheet({
  variationOrder,
  open,
  onOpenChange,
  jobTitle,
}: VariationOrderDetailSheetProps) {
  const isMobile = useIsMobile();
  const { profile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [editValue, setEditValue] = useState(0);
  const [editNotes, setEditNotes] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const updateStatus = useUpdateVariationOrderStatus();
  const updateOrder = useUpdateVariationOrder();
  const deleteOrder = useDeleteVariationOrder();

  if (!variationOrder) return null;

  const status = statusConfig[variationOrder.status] || statusConfig.Pending;
  const StatusIcon = status.icon;
  const isPending = variationOrder.status === "Pending";

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
    }).format(amount);

  const handleClose = () => {
    setIsEditing(false);
    onOpenChange(false);
  };

  const handleApprove = () => {
    updateStatus.mutate(
      {
        id: variationOrder.id,
        status: "Approved",
        approvedBy: profile?.full_name || "Manager",
      },
      {
        onSuccess: () => handleClose(),
      }
    );
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;

    updateOrder.mutate(
      {
        id: variationOrder.id,
        updates: {
          status: "Rejected",
          approved_by: profile?.full_name || "Manager",
          approved_date: new Date().toISOString().split("T")[0],
          notes: `Rejected: ${rejectReason}\n\n${variationOrder.notes || ""}`.trim(),
        },
      },
      {
        onSuccess: () => {
          setShowRejectDialog(false);
          setRejectReason("");
          handleClose();
        },
      }
    );
  };

  const handleDelete = () => {
    deleteOrder.mutate(variationOrder.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
        handleClose();
      },
    });
  };

  const startEditing = () => {
    setEditDescription(variationOrder.description);
    setEditValue(Number(variationOrder.value));
    setEditNotes(variationOrder.notes || "");
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    updateOrder.mutate(
      {
        id: variationOrder.id,
        updates: {
          description: editDescription,
          value: editValue,
          notes: editNotes,
        },
      },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  return (
    <>
      <Sheet open={open} onOpenChange={handleClose}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className={cn(
            "flex flex-col p-0",
            isMobile ? "h-[85vh] rounded-t-2xl" : "w-[450px]"
          )}
        >
          {/* Header */}
          <SheetHeader className="p-4 border-b border-border shrink-0">
            <div className="flex items-center justify-between">
              <SheetTitle>Variation Order</SheetTitle>
              <Badge
                variant="outline"
                className={cn(
                  "gap-1",
                  status.bgColor,
                  status.color,
                  "border-transparent"
                )}
              >
                <StatusIcon className="h-3 w-3" />
                {variationOrder.status}
              </Badge>
            </div>
            {jobTitle && (
              <p className="text-sm text-muted-foreground">{jobTitle}</p>
            )}
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Value Card */}
            <Card
              className={cn(
                "p-4 bg-gradient-to-br from-elec-yellow/10 to-transparent",
                status.borderColor
              )}
            >
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Value</p>
                {isEditing ? (
                  <div className="relative max-w-[200px] mx-auto">
                    <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="number"
                      step="1"
                      min="0"
                      className="pl-10 text-2xl font-bold text-center h-14"
                      value={editValue || ""}
                      onChange={(e) =>
                        setEditValue(parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-foreground">
                    {formatCurrency(Number(variationOrder.value))}
                  </p>
                )}
              </div>
            </Card>

            {/* Details */}
            <Card className="p-4 space-y-4">
              {/* Description */}
              <div>
                <Label className="text-xs text-muted-foreground">
                  Description
                </Label>
                {isEditing ? (
                  <Textarea
                    className="mt-1 min-h-[100px]"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Describe the variation..."
                  />
                ) : (
                  <p className="mt-1 text-sm">{variationOrder.description}</p>
                )}
              </div>

              {/* Created Date */}
              <div className="flex items-center justify-between py-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Created
                </span>
                <span className="text-sm font-medium">
                  {format(new Date(variationOrder.created_at), "dd MMM yyyy")}
                </span>
              </div>

              {/* Job Link */}
              <div className="flex items-center justify-between py-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  Job
                </span>
                <span className="text-sm font-medium">
                  {jobTitle || "Unknown Job"}
                </span>
              </div>

              {/* Notes */}
              <div className="pt-2 border-t border-border/50">
                <Label className="text-xs text-muted-foreground">Notes</Label>
                {isEditing ? (
                  <Textarea
                    className="mt-1 min-h-[80px]"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Additional notes..."
                  />
                ) : variationOrder.notes ? (
                  <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                    {variationOrder.notes}
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground italic">
                    No notes
                  </p>
                )}
              </div>
            </Card>

            {/* Approval Info */}
            {variationOrder.approved_by && (
              <Card className="p-4">
                <Label className="text-xs text-muted-foreground mb-3 block">
                  Approval Details
                </Label>
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "p-1.5 rounded-full",
                      variationOrder.status === "Rejected"
                        ? "bg-red-500/10"
                        : "bg-green-500/10"
                    )}
                  >
                    {variationOrder.status === "Rejected" ? (
                      <X className="h-4 w-4 text-red-500" />
                    ) : (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {variationOrder.approved_by}
                    </p>
                    {variationOrder.approved_date && (
                      <p className="text-xs text-muted-foreground">
                        {format(
                          new Date(variationOrder.approved_date),
                          "dd MMM yyyy"
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Impact Warning */}
            {isPending && (
              <Card className="p-3 bg-amber-500/10 border-amber-500/30">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-500">
                      Pending Approval
                    </p>
                    <p className="text-muted-foreground">
                      Approving this variation will add{" "}
                      {formatCurrency(Number(variationOrder.value))} to the job
                      budget.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Footer */}
          <SheetFooter className="p-4 border-t border-border shrink-0 pb-safe">
            {isEditing ? (
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  onClick={handleSaveEdit}
                  disabled={updateOrder.isPending}
                >
                  {updateOrder.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            ) : isPending ? (
              <div className="flex flex-col gap-3 w-full">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500/50 text-red-500 hover:bg-red-500/10"
                    onClick={() => setShowRejectDialog(true)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    onClick={handleApprove}
                    disabled={updateStatus.isPending}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {updateStatus.isPending ? "Approving..." : "Approve"}
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={startEditing}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
              </div>
            ) : (
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  className="flex-1 border-red-500/50 text-red-500 hover:bg-red-500/10"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Variation Order</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting this variation order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              disabled={!rejectReason.trim() || updateOrder.isPending}
              className="bg-red-500 hover:bg-red-600"
            >
              {updateOrder.isPending ? "Rejecting..." : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Variation Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this variation order? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteOrder.isPending}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteOrder.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default VariationOrderDetailSheet;
