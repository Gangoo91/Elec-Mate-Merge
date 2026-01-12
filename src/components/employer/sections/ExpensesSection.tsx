import { useState, useCallback, useMemo } from "react";
import { Search, Filter, Plus, Receipt, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { ExpenseStatsBar } from "@/components/employer/expense/ExpenseStatsBar";
import { ExpenseCard } from "@/components/employer/expense/ExpenseCard";
import { ExpenseTable } from "@/components/employer/expense/ExpenseTable";
import { ExpenseFilterSheet } from "@/components/employer/expense/ExpenseFilterSheet";
import { CreateExpenseSheet } from "@/components/employer/expense/CreateExpenseSheet";
import { ExpenseDetailSheet } from "@/components/employer/expense/ExpenseDetailSheet";
import {
  useExpenses,
  exportExpensesToCSV,
  type ExpenseFilters,
  type ExpenseStatus,
} from "@/hooks/useExpenses";
import { useJobs } from "@/hooks/useJobs";
import type { ExpenseClaim } from "@/services/financeService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ExpensesSectionProps {
  /**
   * View mode: 'admin' for employer view (all expenses, approve/reject),
   * 'employee' for personal view (own expenses only)
   */
  mode?: 'admin' | 'employee';
  /** Employee ID for filtering in employee mode (if not using auto-detection) */
  currentEmployeeId?: string;
}

export function ExpensesSection({ mode, currentEmployeeId }: ExpensesSectionProps) {
  const { profile } = useAuth();

  // Determine if we're in employee mode based on prop or user role
  const isEmployeeMode = useMemo(() => {
    if (mode === 'admin') return false;
    if (mode === 'employee') return true;
    // Auto-detect based on role if no mode specified
    return profile?.role === 'electrician' || profile?.role === 'apprentice';
  }, [mode, profile?.role]);

  // Get employee ID for filtering (use prop or profile ID)
  const employeeIdForFilter = currentEmployeeId || (isEmployeeMode ? profile?.id : undefined);
  const isMobile = useIsMobile();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const [selectedExpense, setSelectedExpense] = useState<ExpenseClaim | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>("submitted_date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Sheets state
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showDetailSheet, setShowDetailSheet] = useState(false);

  // Merge employee filter with other filters
  const mergedFilters = useMemo(() => ({
    ...filters,
    ...(employeeIdForFilter ? { employeeId: employeeIdForFilter } : {}),
  }), [filters, employeeIdForFilter]);

  // Hook
  const {
    expenses,
    isLoading,
    stats,
    refetch,
    approve: handleApprove,
    reject: handleReject,
    markPaid: handleMarkPaid,
    create: handleCreate,
    delete: handleDelete,
    isApproving,
  } = useExpenses(mergedFilters);

  // Get jobs for linking expenses
  const { data: jobsData = [] } = useJobs();
  const jobs = useMemo(() =>
    jobsData.map(j => ({ id: j.id, title: j.title || j.client || 'Untitled Job' })),
    [jobsData]
  );

  // Get employees for filter and create sheets
  const employees = expenses.reduce<{ id: string; name: string }[]>((acc, expense) => {
    if (expense.employees && !acc.find(e => e.id === expense.employee_id)) {
      acc.push({ id: expense.employee_id, name: expense.employees.name });
    }
    return acc;
  }, []);

  // Filter expenses by search query
  const filteredExpenses = expenses.filter((expense) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      expense.description?.toLowerCase().includes(query) ||
      expense.employees?.name?.toLowerCase().includes(query) ||
      expense.category?.toLowerCase().includes(query)
    );
  });

  // Sort expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    let aVal: any, bVal: any;
    switch (sortField) {
      case "submitted_date":
        aVal = new Date(a.submitted_date).getTime();
        bVal = new Date(b.submitted_date).getTime();
        break;
      case "employee":
        aVal = a.employees?.name || "";
        bVal = b.employees?.name || "";
        break;
      case "category":
        aVal = a.category;
        bVal = b.category;
        break;
      case "amount":
        aVal = Number(a.amount);
        bVal = Number(b.amount);
        break;
      case "status":
        aVal = a.status;
        bVal = b.status;
        break;
      default:
        return 0;
    }
    if (sortDirection === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    }
    return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
  });

  // Handlers
  const handleStatusFilter = useCallback((status: ExpenseStatus | undefined) => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  const handleSort = useCallback((field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  }, [sortField]);

  const handleView = useCallback((expense: ExpenseClaim) => {
    setSelectedExpense(expense);
    setShowDetailSheet(true);
  }, []);

  const handleCreateSubmit = useCallback((data: any) => {
    handleCreate(data);
    setShowCreateSheet(false);
  }, [handleCreate]);

  const handleRejectWithReason = useCallback((id: string, reason?: string) => {
    handleReject({ id, reason: reason || "Rejected" });
  }, [handleReject]);

  const handleBulkApprove = useCallback(() => {
    selectedIds.forEach((id) => {
      const expense = expenses.find((e) => e.id === id);
      if (expense?.status === "Pending") {
        handleApprove(id);
      }
    });
    setSelectedIds([]);
  }, [selectedIds, expenses, handleApprove]);

  const handleBulkReject = useCallback(() => {
    selectedIds.forEach((id) => {
      const expense = expenses.find((e) => e.id === id);
      if (expense?.status === "Pending") {
        handleRejectWithReason(id, "Bulk rejected");
      }
    });
    setSelectedIds([]);
  }, [selectedIds, expenses, handleRejectWithReason]);

  const handleExport = useCallback(async () => {
    try {
      await exportExpensesToCSV(sortedExpenses);
      toast.success("Expenses exported to CSV");
    } catch (error) {
      toast.error("Failed to export expenses");
    }
  }, [sortedExpenses]);

  // Count active filters
  const activeFilterCount = [
    filters.status,
    filters.category,
    filters.employeeId,
    filters.hasReceipt !== undefined,
    filters.dateFrom,
  ].filter(Boolean).length;

  // Dynamic titles based on mode
  const sectionTitle = isEmployeeMode ? "My Expenses" : "Expense Claims";
  const sectionDescription = isEmployeeMode
    ? "Submit and track your expense claims"
    : "Review and approve team expenses";
  const addButtonLabel = isEmployeeMode ? "Submit Expense" : "Add Expense";

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <SectionHeader title={sectionTitle} description={sectionDescription} />
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-36 md:w-auto shrink-0" />
          ))}
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-20" />
        </div>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <SectionHeader
        title={sectionTitle}
        description={sectionDescription}
        action={
          <div className="flex gap-2">
            {!isEmployeeMode && sortedExpenses.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={handleExport}
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            )}
            <Button
              size="sm"
              className="gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              onClick={() => setShowCreateSheet(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">{addButtonLabel}</span>
            </Button>
          </div>
        }
      />

      {/* Pull to Refresh wrapper for mobile */}
      <PullToRefresh onRefresh={refetch} disabled={!isMobile}>
        <div className="space-y-4">
          {/* Stats Bar */}
          <ExpenseStatsBar
            stats={stats}
            activeStatus={filters.status as ExpenseStatus}
            onStatusClick={handleStatusFilter}
          />

          {/* Search and Filter Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 bg-card border-border"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 shrink-0 relative"
              onClick={() => setShowFilterSheet(true)}
            >
              <Filter className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-elec-yellow text-black text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Bulk Actions (desktop only, admin mode only) */}
          {!isMobile && !isEmployeeMode && selectedIds.length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
              <span className="text-sm font-medium">
                {selectedIds.length} selected
              </span>
              <div className="flex gap-2 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedIds([])}
                >
                  Clear
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                  onClick={handleBulkReject}
                >
                  Reject All
                </Button>
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleBulkApprove}
                >
                  Approve All
                </Button>
              </div>
            </div>
          )}

          {/* Expense List */}
          {sortedExpenses.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No expenses found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery || activeFilterCount > 0
                    ? "Try adjusting your search or filters"
                    : "No expense claims have been submitted yet"}
                </p>
                {(searchQuery || activeFilterCount > 0) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setFilters({});
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : isMobile ? (
            // Mobile: Swipeable Cards
            <div className="space-y-3">
              {sortedExpenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onApprove={isEmployeeMode ? undefined : handleApprove}
                  onReject={isEmployeeMode ? undefined : handleRejectWithReason}
                  onClick={() => handleView(expense)}
                  showSwipeActions={!isEmployeeMode && expense.status === 'Pending'}
                />
              ))}
            </div>
          ) : (
            // Desktop: Data Table
            <ExpenseTable
              expenses={sortedExpenses}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onApprove={isEmployeeMode ? undefined : handleApprove}
              onReject={isEmployeeMode ? undefined : (id) => handleRejectWithReason(id)}
              onMarkPaid={isEmployeeMode ? undefined : handleMarkPaid}
              onView={handleView}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              readOnly={isEmployeeMode}
            />
          )}
        </div>
      </PullToRefresh>

      {/* FAB for mobile */}
      <FloatingActionButton
        icon={<Plus className="h-5 w-5" />}
        onClick={() => setShowCreateSheet(true)}
        label={addButtonLabel}
      />

      {/* Filter Sheet - hide employee filter in employee mode */}
      <ExpenseFilterSheet
        open={showFilterSheet}
        onOpenChange={setShowFilterSheet}
        filters={filters}
        onFiltersChange={setFilters}
        employees={isEmployeeMode ? [] : employees}
      />

      {/* Create Expense Sheet */}
      <CreateExpenseSheet
        open={showCreateSheet}
        onOpenChange={setShowCreateSheet}
        onSubmit={handleCreateSubmit}
        employees={employees}
        jobs={jobs}
        isSubmitting={isApproving}
        employeeMode={isEmployeeMode}
        currentEmployeeId={employeeIdForFilter}
      />

      {/* Detail Sheet - hide actions in employee mode */}
      <ExpenseDetailSheet
        expense={selectedExpense}
        open={showDetailSheet}
        onOpenChange={setShowDetailSheet}
        onApprove={isEmployeeMode ? undefined : handleApprove}
        onReject={isEmployeeMode ? undefined : handleRejectWithReason}
        onMarkPaid={isEmployeeMode ? undefined : handleMarkPaid}
        onDelete={isEmployeeMode ? undefined : handleDelete}
      />
    </div>
  );
}

export default ExpensesSection;
