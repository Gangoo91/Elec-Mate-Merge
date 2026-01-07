import { useState } from 'react';
import { format } from 'date-fns';
import {
  X, Check, DollarSign, Clock, User, Briefcase,
  Receipt, Calendar, AlertCircle, Trash2, Edit,
  Wrench, Car, ParkingCircle, Hammer, HardHat,
  GraduationCap, UtensilsCrossed, Package, ExternalLink
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatCurrency } from '@/hooks/useExpenses';
import type { ExpenseClaim } from '@/services/financeService';

interface ExpenseDetailSheetProps {
  expense: ExpenseClaim | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string, reason: string) => void;
  onMarkPaid?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (expense: ExpenseClaim) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  Materials: Wrench,
  Travel: Car,
  Parking: ParkingCircle,
  Tools: Hammer,
  PPE: HardHat,
  Training: GraduationCap,
  Meals: UtensilsCrossed,
  Other: Package,
};

const statusConfig: Record<string, { color: string; bgColor: string; icon: React.ElementType }> = {
  Pending: { color: 'text-amber-500', bgColor: 'bg-amber-500/10', icon: Clock },
  Approved: { color: 'text-green-500', bgColor: 'bg-green-500/10', icon: Check },
  Paid: { color: 'text-blue-500', bgColor: 'bg-blue-500/10', icon: DollarSign },
  Rejected: { color: 'text-red-500', bgColor: 'bg-red-500/10', icon: X },
};

export function ExpenseDetailSheet({
  expense,
  open,
  onOpenChange,
  onApprove,
  onReject,
  onMarkPaid,
  onDelete,
  onEdit,
}: ExpenseDetailSheetProps) {
  const isMobile = useIsMobile();
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  if (!expense) return null;

  const CategoryIcon = categoryIcons[expense.category] || Package;
  const status = statusConfig[expense.status] || statusConfig.Pending;
  const StatusIcon = status.icon;

  const isPending = expense.status === 'Pending';
  const isApproved = expense.status === 'Approved';
  const isRejected = expense.status === 'Rejected';

  const handleReject = () => {
    if (onReject && rejectReason.trim()) {
      onReject(expense.id, rejectReason);
      setRejectReason('');
      setShowRejectDialog(false);
      onOpenChange(false);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(expense.id);
      setShowDeleteDialog(false);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={cn(
            "flex flex-col p-0",
            isMobile ? "h-[90vh] rounded-t-2xl" : "w-[450px]"
          )}
        >
          {/* Header */}
          <SheetHeader className="p-4 border-b border-border shrink-0">
            <div className="flex items-center justify-between">
              <SheetTitle>Expense Details</SheetTitle>
              <Badge
                variant="outline"
                className={cn("gap-1", status.bgColor, status.color, "border-transparent")}
              >
                <StatusIcon className="h-3 w-3" />
                {expense.status}
              </Badge>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Amount Card */}
            <Card className="p-4 bg-gradient-to-br from-elec-yellow/10 to-transparent border-elec-yellow/30">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Amount</p>
                <p className="text-3xl font-bold text-foreground">
                  {formatCurrency(Number(expense.amount))}
                </p>
              </div>
            </Card>

            {/* Employee Info */}
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-elec-dark font-semibold">
                    {expense.employees?.avatar_initials || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{expense.employees?.name || 'Unknown'}</p>
                  <p className="text-sm text-muted-foreground">Submitted expense</p>
                </div>
              </div>
            </Card>

            {/* Details */}
            <Card className="p-4 space-y-4">
              {/* Description */}
              <div>
                <Label className="text-xs text-muted-foreground">Description</Label>
                <p className="mt-1 text-sm">{expense.description}</p>
              </div>

              {/* Category */}
              <div className="flex items-center justify-between py-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground">Category</span>
                <Badge variant="outline" className="gap-1">
                  <CategoryIcon className="h-3 w-3" />
                  {expense.category}
                </Badge>
              </div>

              {/* Submitted Date */}
              <div className="flex items-center justify-between py-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground">Submitted</span>
                <span className="text-sm font-medium flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(expense.submitted_date), 'dd MMM yyyy')}
                </span>
              </div>

              {/* Job Link */}
              {expense.job_id && (
                <div className="flex items-center justify-between py-2 border-t border-border/50">
                  <span className="text-sm text-muted-foreground">Linked Job</span>
                  <Button variant="link" size="sm" className="h-auto p-0 gap-1">
                    <Briefcase className="h-3 w-3" />
                    View Job
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {/* Receipt */}
              <div className="flex items-center justify-between py-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground">Receipt</span>
                {expense.receipt_url ? (
                  <Button variant="outline" size="sm" className="gap-1">
                    <Receipt className="h-3 w-3" />
                    View Receipt
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground">Not attached</span>
                )}
              </div>
            </Card>

            {/* Approval Timeline */}
            {(expense.approved_by || expense.paid_date) && (
              <Card className="p-4">
                <Label className="text-xs text-muted-foreground mb-3 block">Timeline</Label>
                <div className="space-y-3">
                  {expense.approved_date && (
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-1.5 rounded-full",
                        isRejected ? "bg-red-500/10" : "bg-green-500/10"
                      )}>
                        {isRejected ? (
                          <X className="h-4 w-4 text-red-500" />
                        ) : (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {isRejected ? 'Rejected' : 'Approved'} by {expense.approved_by}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(expense.approved_date), 'dd MMM yyyy, HH:mm')}
                        </p>
                      </div>
                    </div>
                  )}
                  {expense.paid_date && (
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full bg-blue-500/10">
                        <DollarSign className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Marked as paid</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(expense.paid_date), 'dd MMM yyyy')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Rejection Reason */}
            {isRejected && expense.rejection_reason && (
              <Card className="p-4 bg-red-500/5 border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-500">Rejection Reason</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {expense.rejection_reason}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Footer Actions */}
          <SheetFooter className="p-4 border-t border-border shrink-0 pb-safe">
            {isPending && (
              <div className="flex gap-3 w-full">
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
                  onClick={() => {
                    onApprove?.(expense.id);
                    onOpenChange(false);
                  }}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            )}

            {isApproved && onMarkPaid && (
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => {
                  onMarkPaid(expense.id);
                  onOpenChange(false);
                }}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Mark as Paid
              </Button>
            )}

            {(isRejected || expense.status === 'Paid') && (
              <div className="flex gap-3 w-full">
                {onEdit && isPending && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => onEdit(expense)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500/50 text-red-500 hover:bg-red-500/10"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                )}
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Expense</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting this expense claim.
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
              disabled={!rejectReason.trim()}
              className="bg-red-500 hover:bg-red-600"
            >
              Reject Expense
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this expense? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ExpenseDetailSheet;
