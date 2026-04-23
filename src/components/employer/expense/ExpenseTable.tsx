import { format } from 'date-fns';
import {
  Check,
  X,
  DollarSign,
  Clock,
  Receipt,
  MoreHorizontal,
  Wrench,
  Car,
  ParkingCircle,
  Hammer,
  HardHat,
  GraduationCap,
  UtensilsCrossed,
  Package,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/hooks/useExpenses';
import type { ExpenseClaim } from '@/services/financeService';

interface ExpenseTableProps {
  expenses: ExpenseClaim[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onMarkPaid?: (id: string) => void;
  onView: (expense: ExpenseClaim) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
  /** When true, hides action buttons and selection checkboxes (for employee view) */
  readOnly?: boolean;
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

export function ExpenseTable({
  expenses,
  selectedIds,
  onSelectionChange,
  onApprove,
  onReject,
  onMarkPaid,
  onView,
  sortField,
  sortDirection,
  onSort,
  readOnly = false,
}: ExpenseTableProps) {
  const allSelected = expenses.length > 0 && selectedIds.length === expenses.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < expenses.length;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(expenses.map((e) => e.id));
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((i) => i !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <TableHead
      className={cn(
        'cursor-pointer text-white hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors touch-manipulation',
        onSort && 'select-none'
      )}
      onClick={() => onSort?.(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <SortIcon field={field} />
      </div>
    </TableHead>
  );

  return (
    <div className="border border-white/[0.06] rounded-2xl overflow-hidden bg-[hsl(0_0%_12%)]">
      <Table>
        <TableHeader>
          <TableRow className="bg-white/[0.04] hover:bg-white/[0.04] border-white/[0.06]">
            {!readOnly && (
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                  className={cn(
                    'h-5 w-5 rounded border border-white/[0.15] bg-[hsl(0_0%_9%)] data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black',
                    someSelected && 'data-[state=checked]:bg-white/[0.08]'
                  )}
                />
              </TableHead>
            )}
            <SortableHeader field="submitted_date">Date</SortableHeader>
            <SortableHeader field="employee">Employee</SortableHeader>
            <SortableHeader field="category">Category</SortableHeader>
            <TableHead className="text-white">Description</TableHead>
            <SortableHeader field="amount">Amount</SortableHeader>
            <SortableHeader field="status">Status</SortableHeader>
            <TableHead className="w-12 text-white">Receipt</TableHead>
            {!readOnly && <TableHead className="w-12"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow className="border-white/[0.06]">
              <TableCell
                colSpan={readOnly ? 7 : 9}
                className="text-center py-8 text-white"
              >
                No expenses found
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => {
              const CategoryIcon = categoryIcons[expense.category] || Package;
              const status = statusConfig[expense.status] || statusConfig.Pending;
              const StatusIcon = status.icon;
              const isSelected = selectedIds.includes(expense.id);
              const isPending = expense.status === 'Pending';
              const isApproved = expense.status === 'Approved';

              return (
                <TableRow
                  key={expense.id}
                  className={cn(
                    'cursor-pointer border-white/[0.06] hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors touch-manipulation',
                    isSelected && 'bg-elec-yellow/5'
                  )}
                  onClick={() => onView(expense)}
                >
                  {!readOnly && (
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleSelectOne(expense.id)}
                        aria-label={`Select expense from ${expense.employees?.name}`}
                        className="h-5 w-5 rounded border border-white/[0.15] bg-[hsl(0_0%_9%)] data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                      />
                    </TableCell>
                  )}
                  <TableCell className="text-sm text-white">
                    {format(new Date(expense.submitted_date), 'dd MMM')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-black text-xs font-semibold">
                          {expense.employees?.avatar_initials || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm text-white">
                        {expense.employees?.name || 'Unknown'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="gap-1 text-xs bg-white/[0.04] text-white border-white/[0.08]"
                    >
                      <CategoryIcon className="h-3 w-3" />
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <span className="text-sm text-white truncate block">
                      {expense.description}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-white">
                    {formatCurrency(Number(expense.amount))}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        'gap-1 text-xs',
                        status.bgColor,
                        status.color,
                        'border-transparent'
                      )}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {expense.receipt_url && <Receipt className="h-4 w-4 text-white" />}
                  </TableCell>
                  {!readOnly && (
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            aria-label="Actions"
                            className="h-8 w-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors touch-manipulation"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white"
                        >
                          <DropdownMenuItem onClick={() => onView(expense)} className="text-white">
                            View details
                          </DropdownMenuItem>
                          {isPending && onApprove && onReject && (
                            <>
                              <DropdownMenuSeparator className="bg-white/[0.06]" />
                              <DropdownMenuItem
                                onClick={() => onApprove(expense.id)}
                                className="text-green-400"
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onReject(expense.id)}
                                className="text-red-400"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {isApproved && onMarkPaid && (
                            <>
                              <DropdownMenuSeparator className="bg-white/[0.06]" />
                              <DropdownMenuItem
                                onClick={() => onMarkPaid(expense.id)}
                                className="text-blue-400"
                              >
                                <DollarSign className="h-4 w-4 mr-2" />
                                Mark as paid
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ExpenseTable;
