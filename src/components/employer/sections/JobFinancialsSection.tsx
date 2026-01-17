import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronUp,
  Plus,
  Filter,
  Briefcase,
  Edit,
  PoundSterling
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  useJobFinancials,
  useJobFinancialStats,
  useCreateVariationOrder,
  useUpdateVariationOrderStatus,
  type JobFinancialWithJob,
  type VariationOrder
} from "@/hooks/useJobFinancials";
import { RecordActualCostSheet } from "./sheets/RecordActualCostSheet";
import { EditJobBudgetSheet } from "./sheets/EditJobBudgetSheet";
import { VariationOrderDetailSheet } from "./sheets/VariationOrderDetailSheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function JobFinancialsSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [showAddVariation, setShowAddVariation] = useState<string | null>(null);
  const [variationDesc, setVariationDesc] = useState("");
  const [variationValue, setVariationValue] = useState("");

  // New sheet states
  const [showRecordCostSheet, setShowRecordCostSheet] = useState<{ jobId: string; jobTitle: string } | null>(null);
  const [showEditBudgetSheet, setShowEditBudgetSheet] = useState<{ jobId: string; jobTitle: string } | null>(null);
  const [showVariationSheet, setShowVariationSheet] = useState<{ vo: VariationOrder; jobTitle: string } | null>(null);

  const { data: financials = [], isLoading } = useJobFinancials();
  const stats = useJobFinancialStats();
  const createVariationMutation = useCreateVariationOrder();
  const updateVariationStatusMutation = useUpdateVariationOrderStatus();

  const filteredFinancials = financials.filter(
    fin => fin.job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           fin.job?.client?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddVariation = async () => {
    if (!showAddVariation || !variationDesc.trim()) return;

    await createVariationMutation.mutateAsync({
      job_id: showAddVariation,
      description: variationDesc,
      value: parseFloat(variationValue) || 0,
    });

    setShowAddVariation(null);
    setVariationDesc("");
    setVariationValue("");
  };

  const handleApproveVariation = (vo: VariationOrder) => {
    updateVariationStatusMutation.mutate({
      id: vo.id,
      status: 'Approved',
      approvedBy: 'Admin',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Job Financials</h1>
          <p className="text-sm text-muted-foreground">Budget tracking and profitability analysis</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn("w-full bg-elec-gray", !searchQuery && "pl-9")}
            />
          </div>
          <Button variant="outline" className="touch-feedback">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="bg-elec-gray touch-feedback">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg md:text-2xl font-bold text-foreground">
                  £{(stats.totalBudget / 1000).toFixed(0)}k
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">Budget</p>
              </div>
              <PieChart className="h-6 w-6 md:h-8 md:w-8 text-elec-yellow opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray touch-feedback">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg md:text-2xl font-bold text-foreground">
                  £{(stats.totalActual / 1000).toFixed(0)}k
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">Spent</p>
              </div>
              <DollarSign className="h-6 w-6 md:h-8 md:w-8 text-info opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray touch-feedback">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg md:text-2xl font-bold text-success">
                  £{(stats.totalOutstanding / 1000).toFixed(0)}k
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">Outstanding</p>
              </div>
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-warning opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/30 touch-feedback">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg md:text-2xl font-bold text-success">{stats.avgMargin.toFixed(1)}%</p>
                <p className="text-xs md:text-sm text-muted-foreground">Avg Margin</p>
              </div>
              <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-success opacity-70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      {filteredFinancials.length === 0 && (
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-8 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No Job Financials</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery
                ? "No jobs match your search criteria."
                : "Create jobs to start tracking financials. Financial tracking is automatically created for each job."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Jobs Financial Breakdown */}
      <div className="space-y-3">
        {filteredFinancials.map((fin) => {
          const isExpanded = expandedJob === fin.id;
          const budgetUsed = fin.budget_total > 0
            ? (Number(fin.actual_total) / Number(fin.budget_total)) * 100
            : 0;
          const isOverBudget = Number(fin.actual_total) > Number(fin.budget_total);

          return (
            <Card key={fin.id} className="bg-elec-gray overflow-hidden touch-feedback">
              <CardContent className="p-0">
                {/* Header Row */}
                <div
                  className="p-3 md:p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setExpandedJob(isExpanded ? null : fin.id)}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-foreground text-sm truncate">
                            {fin.job?.title || 'Untitled Job'}
                          </h4>
                          <Badge
                            variant={fin.status === "On Budget" ? "default" : "secondary"}
                            className={cn(
                              "text-[10px]",
                              fin.status === "On Budget" && "bg-success",
                              fin.status === "Over Budget" && "bg-destructive"
                            )}
                          >
                            {fin.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{fin.job?.client || 'No client'}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-center">
                          <p className={cn(
                            "text-lg font-bold",
                            Number(fin.margin) > 20 ? "text-success" : Number(fin.margin) > 10 ? "text-warning" : "text-destructive"
                          )}>
                            {Number(fin.margin).toFixed(0)}%
                          </p>
                          <p className="text-[10px] text-muted-foreground">Margin</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Budget Used</span>
                        <span className={cn(
                          "font-medium",
                          isOverBudget ? "text-destructive" : "text-foreground"
                        )}>
                          £{(Number(fin.actual_total) / 1000).toFixed(0)}k / £{(Number(fin.budget_total) / 1000).toFixed(0)}k
                        </span>
                      </div>
                      <Progress
                        value={Math.min(budgetUsed, 100)}
                        className={cn(
                          "h-2",
                          isOverBudget && "[&>div]:bg-destructive"
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-border p-3 md:p-4 bg-muted/30 space-y-4">

                    {/* Budget vs Actual Breakdown */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-semibold text-foreground mb-3">Budget Breakdown</h5>
                        <div className="space-y-2">
                          {[
                            { key: 'labour', label: 'Labour', budget: fin.budget_labour, actual: fin.actual_labour },
                            { key: 'materials', label: 'Materials', budget: fin.budget_materials, actual: fin.actual_materials },
                            { key: 'equipment', label: 'Equipment', budget: fin.budget_equipment, actual: fin.actual_equipment },
                            { key: 'overheads', label: 'Overheads', budget: fin.budget_overheads, actual: fin.actual_overheads },
                          ].map(({ key, label, budget, actual }) => {
                            const percentage = Number(budget) > 0 ? (Number(actual) / Number(budget)) * 100 : 0;
                            const isOver = percentage > 100;

                            return (
                              <div key={key}>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="capitalize text-muted-foreground">{label}</span>
                                  <span className={cn(
                                    "font-medium",
                                    isOver ? "text-destructive" : "text-foreground"
                                  )}>
                                    £{(Number(actual) / 1000).toFixed(1)}k / £{(Number(budget) / 1000).toFixed(1)}k
                                  </span>
                                </div>
                                <Progress
                                  value={Math.min(percentage, 100)}
                                  className={cn(
                                    "h-1.5",
                                    isOver && "[&>div]:bg-destructive"
                                  )}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-foreground mb-3">Payment Status</h5>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-elec-gray rounded-lg text-xs">
                            <span className="text-muted-foreground">Total Value</span>
                            <span className="font-semibold text-foreground">
                              £{Number(fin.budget_total).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-elec-gray rounded-lg text-xs">
                            <span className="text-muted-foreground">Invoiced</span>
                            <span className="font-semibold text-foreground">
                              £{Number(fin.invoiced).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-success/10 rounded-lg text-xs">
                            <span className="text-success">Paid</span>
                            <span className="font-semibold text-success">
                              £{Number(fin.paid).toLocaleString()}
                            </span>
                          </div>
                          {Number(fin.invoiced) - Number(fin.paid) > 0 && (
                            <div className="flex items-center justify-between p-2 bg-warning/10 rounded-lg text-xs">
                              <span className="text-warning">Outstanding</span>
                              <span className="font-semibold text-warning">
                                £{(Number(fin.invoiced) - Number(fin.paid)).toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Variation Orders */}
                    {fin.variation_orders && fin.variation_orders.length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-foreground mb-2">Variation Orders</h5>
                        <div className="space-y-2">
                          {fin.variation_orders.map((vo) => (
                            <div
                              key={vo.id}
                              className="flex items-center justify-between p-2 bg-elec-gray rounded-lg text-xs cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => setShowVariationSheet({ vo, jobTitle: fin.job?.title || 'Untitled Job' })}
                            >
                              <div className="min-w-0">
                                <p className="font-medium text-foreground truncate">{vo.description}</p>
                                <p className="text-muted-foreground">
                                  {new Date(vo.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Badge
                                  variant={vo.status === "Approved" ? "default" : "secondary"}
                                  className={cn(
                                    "text-[10px]",
                                    vo.status === "Approved" && "bg-success",
                                    vo.status === "Rejected" && "bg-destructive"
                                  )}
                                >
                                  {vo.status}
                                </Badge>
                                <span className="font-semibold text-foreground">
                                  +£{Number(vo.value).toLocaleString()}
                                </span>
                                {vo.status === 'Pending' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-6 text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApproveVariation(vo);
                                    }}
                                    disabled={updateVariationStatusMutation.isPending}
                                  >
                                    Approve
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="touch-feedback"
                        onClick={() => setShowRecordCostSheet({ jobId: fin.job_id, jobTitle: fin.job?.title || 'Untitled Job' })}
                      >
                        <PoundSterling className="h-4 w-4 mr-1" />
                        Record Cost
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="touch-feedback"
                        onClick={() => setShowEditBudgetSheet({ jobId: fin.job_id, jobTitle: fin.job?.title || 'Untitled Job' })}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Budget
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="touch-feedback"
                        onClick={() => setShowAddVariation(fin.job_id)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Variation
                      </Button>
                      <Button variant="outline" size="sm" className="touch-feedback">
                        <FileText className="h-4 w-4 mr-1" />
                        Generate Invoice
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Variation Dialog */}
      <Dialog open={!!showAddVariation} onOpenChange={() => setShowAddVariation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Variation Order</DialogTitle>
            <DialogDescription>
              Add a variation to adjust the job scope and budget.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="variation-desc">Description</Label>
              <Textarea
                id="variation-desc"
                placeholder="Describe the variation..."
                value={variationDesc}
                onChange={(e) => setVariationDesc(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variation-value">Value (£)</Label>
              <Input
                id="variation-value"
                type="number"
                placeholder="0"
                value={variationValue}
                onChange={(e) => setVariationValue(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddVariation(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddVariation}
              disabled={!variationDesc.trim() || createVariationMutation.isPending}
            >
              {createVariationMutation.isPending ? 'Adding...' : 'Add Variation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Record Actual Cost Sheet */}
      <RecordActualCostSheet
        open={!!showRecordCostSheet}
        onOpenChange={() => setShowRecordCostSheet(null)}
        jobId={showRecordCostSheet?.jobId || ""}
        jobTitle={showRecordCostSheet?.jobTitle}
      />

      {/* Edit Budget Sheet */}
      <EditJobBudgetSheet
        open={!!showEditBudgetSheet}
        onOpenChange={() => setShowEditBudgetSheet(null)}
        jobId={showEditBudgetSheet?.jobId || ""}
        jobTitle={showEditBudgetSheet?.jobTitle}
      />

      {/* Variation Order Detail Sheet */}
      <VariationOrderDetailSheet
        open={!!showVariationSheet}
        onOpenChange={() => setShowVariationSheet(null)}
        variationOrder={showVariationSheet?.vo || null}
        jobTitle={showVariationSheet?.jobTitle}
      />
    </div>
  );
}
