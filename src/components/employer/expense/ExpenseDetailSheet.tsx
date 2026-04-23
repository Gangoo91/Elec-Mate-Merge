import { useState } from 'react';
import { format } from 'date-fns';
import {
  X,
  Check,
  DollarSign,
  Clock,
  Briefcase,
  Receipt,
  Calendar,
  AlertCircle,
  Trash2,
  Edit,
  Wrench,
  Car,
  ParkingCircle,
  Hammer,
  HardHat,
  GraduationCap,
  UtensilsCrossed,
  Package,
  ExternalLink,
} from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
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
import {
  SheetShell,
  FormCard,
  Field,
  Pill,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  textareaClass,
} from '@/components/employer/editorial';

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

type StatusTone = 'amber' | 'green' | 'blue' | 'red';

const statusConfig: Record<
  string,
  { tone: StatusTone; icon: React.ElementType }
> = {
  Pending: { tone: 'amber', icon: Clock },
  Approved: { tone: 'green', icon: Check },
  Paid: { tone: 'blue', icon: DollarSign },
  Rejected: { tone: 'red', icon: X },
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

  const footer = (
    <>
      {isPending && (
        <>
          <SecondaryButton fullWidth onClick={() => setShowRejectDialog(true)}>
            <X className="h-4 w-4 mr-2" />
            Reject
          </SecondaryButton>
          <PrimaryButton
            fullWidth
            onClick={() => {
              onApprove?.(expense.id);
              onOpenChange(false);
            }}
          >
            <Check className="h-4 w-4 mr-2" />
            Approve
          </PrimaryButton>
        </>
      )}

      {isApproved && onMarkPaid && (
        <PrimaryButton
          fullWidth
          onClick={() => {
            onMarkPaid(expense.id);
            onOpenChange(false);
          }}
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Mark as paid
        </PrimaryButton>
      )}

      {(isRejected || expense.status === 'Paid') && (
        <>
          {onEdit && isPending && (
            <SecondaryButton fullWidth onClick={() => onEdit(expense)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </SecondaryButton>
          )}
          {onDelete && (
            <DestructiveButton fullWidth onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DestructiveButton>
          )}
        </>
      )}
    </>
  );

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={cn(
            'flex flex-col p-0 overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.08]',
            isMobile ? 'h-[90vh] rounded-t-2xl' : 'w-[450px]'
          )}
        >
          <SheetShell
            eyebrow="Expense"
            title="Expense details"
            description={
              <span className="inline-flex items-center gap-2">
                <Pill tone={status.tone}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {expense.status}
                </Pill>
              </span>
            }
            footer={footer}
          >
            {/* Amount Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-elec-yellow/10 to-transparent border border-elec-yellow/30">
              <div className="text-center">
                <p className="text-sm text-white mb-1">Amount</p>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(Number(expense.amount))}
                </p>
              </div>
            </div>

            {/* Employee Info */}
            <FormCard eyebrow="Employee">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-black font-semibold">
                    {expense.employees?.avatar_initials || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-white">
                    {expense.employees?.name || 'Unknown'}
                  </p>
                  <p className="text-sm text-white">Submitted expense</p>
                </div>
              </div>
            </FormCard>

            {/* Details */}
            <FormCard eyebrow="Details">
              <div>
                <p className="text-[11.5px] text-white mb-1.5">Description</p>
                <p className="text-sm text-white">{expense.description}</p>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-white/[0.06]">
                <span className="text-sm text-white">Category</span>
                <Pill tone="yellow">
                  <CategoryIcon className="h-3 w-3 mr-1" />
                  {expense.category}
                </Pill>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-white/[0.06]">
                <span className="text-sm text-white">Submitted</span>
                <span className="text-sm font-medium flex items-center gap-1 text-white">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(expense.submitted_date), 'dd MMM yyyy')}
                </span>
              </div>

              {expense.job_id && (
                <div className="flex items-center justify-between py-2 border-t border-white/[0.06]">
                  <span className="text-sm text-white">Linked job</span>
                  <button
                    type="button"
                    className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors inline-flex items-center gap-1"
                  >
                    <Briefcase className="h-3 w-3" />
                    View job
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between py-2 border-t border-white/[0.06]">
                <span className="text-sm text-white">Receipt</span>
                {expense.receipt_url ? (
                  <SecondaryButton size="sm">
                    <Receipt className="h-3 w-3 mr-1" />
                    View receipt
                  </SecondaryButton>
                ) : (
                  <span className="text-sm text-white">Not attached</span>
                )}
              </div>
            </FormCard>

            {/* Approval Timeline */}
            {(expense.approved_by || expense.paid_date) && (
              <FormCard eyebrow="Timeline">
                <div className="space-y-3">
                  {expense.approved_date && (
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          'p-1.5 rounded-full',
                          isRejected ? 'bg-red-500/10' : 'bg-green-500/10'
                        )}
                      >
                        {isRejected ? (
                          <X className="h-4 w-4 text-red-400" />
                        ) : (
                          <Check className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {isRejected ? 'Rejected' : 'Approved'} by {expense.approved_by}
                        </p>
                        <p className="text-xs text-white">
                          {format(new Date(expense.approved_date), 'dd MMM yyyy, HH:mm')}
                        </p>
                      </div>
                    </div>
                  )}
                  {expense.paid_date && (
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full bg-blue-500/10">
                        <DollarSign className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Marked as paid</p>
                        <p className="text-xs text-white">
                          {format(new Date(expense.paid_date), 'dd MMM yyyy')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </FormCard>
            )}

            {/* Rejection Reason */}
            {isRejected && expense.rejection_reason && (
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-400">Rejection reason</p>
                    <p className="text-sm text-white mt-1">{expense.rejection_reason}</p>
                  </div>
                </div>
              </div>
            )}
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent className="bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Reject expense</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              Please provide a reason for rejecting this expense claim.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Field label="Reason">
              <Textarea
                placeholder="Enter rejection reason..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className={cn(textareaClass, 'min-h-[100px]')}
              />
            </Field>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <SecondaryButton>Cancel</SecondaryButton>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <DestructiveButton onClick={handleReject} disabled={!rejectReason.trim()}>
                Reject expense
              </DestructiveButton>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete expense</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              Are you sure you want to delete this expense? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <SecondaryButton>Cancel</SecondaryButton>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <DestructiveButton onClick={handleDelete}>Delete</DestructiveButton>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ExpenseDetailSheet;
