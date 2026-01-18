import { useState } from 'react';
import { format } from 'date-fns';
import {
  Check, X, DollarSign, Clock, Receipt, MoreHorizontal,
  Wrench, Car, ParkingCircle, Hammer, HardHat,
  GraduationCap, UtensilsCrossed, Package, ChevronDown, ChevronUp
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
import { Button } from '@/components/ui/button';
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
      className={cn("cursor-pointer hover:bg-muted/50 active:bg-muted/70 transition-all touch-manipulation", onSort && "select-none")}
      onClick={() => onSort?.(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <SortIcon field={field} />
      </div>
    </TableHead>
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            {!readOnly && (
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                  className={cn(someSelected && "data-[state=checked]:bg-muted")}
                />
              </TableHead>
            )}
            <SortableHeader field="submitted_date">Date</SortableHeader>
            <SortableHeader field="employee">Employee</SortableHeader>
            <SortableHeader field="category">Category</SortableHeader>
            <TableHead>Description</TableHead>
            <SortableHeader field="amount">Amount</SortableHeader>
            <SortableHeader field="status">Status</SortableHeader>
            <TableHead className="w-12">Receipt</TableHead>
            {!readOnly && <TableHead className="w-12"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={readOnly ? 7 : 9} className="text-center py-8 text-muted-foreground">
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
                    "cursor-pointer hover:bg-muted/50 active:bg-muted/70 transition-all touch-manipulation",
                    isSelected && "bg-elec-yellow/5"
                  )}
                  onClick={() => onView(expense)}
                >
                  {!readOnly && (
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleSelectOne(expense.id)}
                        aria-label={`Select expense from ${expense.employees?.name}`}
                      />
                    </TableCell>
                  )}
                  <TableCell className="text-sm">
                    {format(new Date(expense.submitted_date), 'dd MMM')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-elec-dark text-xs font-semibold">
                          {expense.employees?.avatar_initials || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">
                        {expense.employees?.name || 'Unknown'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1 text-xs">
                      <CategoryIcon className="h-3 w-3" />
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <span className="text-sm text-muted-foreground truncate block">
                      {expense.description}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(Number(expense.amount))}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("gap-1 text-xs", status.bgColor, status.color, "border-transparent")}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {expense.receipt_url && (
                      <Receipt className="h-4 w-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  {!readOnly && (
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onView(expense)}>
                            View Details
                          </DropdownMenuItem>
                          {isPending && onApprove && onReject && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => onApprove(expense.id)}
                                className="text-green-500"
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onReject(expense.id)}
                                className="text-red-500"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {isApproved && onMarkPaid && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => onMarkPaid(expense.id)}
                                className="text-blue-500"
                              >
                                <DollarSign className="h-4 w-4 mr-2" />
                                Mark as Paid
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
