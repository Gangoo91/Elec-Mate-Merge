import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { 
  Receipt, 
  Clock, 
  CheckCircle, 
  XCircle, 
  PoundSterling,
  ChevronDown,
  ChevronUp,
  Image,
  User,
  Briefcase,
  Plus
} from "lucide-react";
import { useExpenseClaims, useApproveExpense, useRejectExpense, useMarkExpensePaid } from "@/hooks/useFinance";
import { CreateExpenseDialog } from "@/components/employer/dialogs/CreateExpenseDialog";
import type { ExpenseClaim } from "@/services/financeService";

export function ExpensesSection() {
  const [activeTab, setActiveTab] = useState("pending");
  const [expandedClaim, setExpandedClaim] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const { data: expenseClaims = [], isLoading } = useExpenseClaims();
  const approveExpenseMutation = useApproveExpense();
  const rejectExpenseMutation = useRejectExpense();
  const markPaidMutation = useMarkExpensePaid();

  const pendingClaims = expenseClaims.filter(e => e.status === "Pending");
  const approvedClaims = expenseClaims.filter(e => e.status === "Approved" || e.status === "Paid");
  const rejectedClaims = expenseClaims.filter(e => e.status === "Rejected");

  const totalPending = pendingClaims.reduce((sum, c) => sum + Number(c.amount), 0);
  const totalApproved = approvedClaims.reduce((sum, c) => sum + Number(c.amount), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-warning text-warning-foreground text-xs">{status}</Badge>;
      case "Approved":
        return <Badge className="bg-info text-info-foreground text-xs">{status}</Badge>;
      case "Paid":
        return <Badge className="bg-success text-success-foreground text-xs">{status}</Badge>;
      case "Rejected":
        return <Badge variant="destructive" className="text-xs">{status}</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Materials":
        return "🔧";
      case "Parking":
        return "🅿️";
      case "Tools":
        return "🛠️";
      case "Travel":
        return "🚗";
      case "PPE":
        return "🦺";
      default:
        return "📦";
    }
  };

  const handleApprove = (id: string) => {
    approveExpenseMutation.mutate({ id, approvedBy: "Admin" });
  };

  const handleReject = (id: string) => {
    rejectExpenseMutation.mutate({ id, approvedBy: "Admin", reason: "Not approved" });
  };

  const handleMarkPaid = (id: string) => {
    markPaidMutation.mutate(id);
  };

  const renderClaimsList = (claims: ExpenseClaim[]) => (
    <div className="space-y-3">
      {claims.length === 0 ? (
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-8 text-center">
            <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">No claims in this category</p>
          </CardContent>
        </Card>
      ) : (
        claims.map((claim) => {
          const isExpanded = expandedClaim === claim.id;
          const employeeName = claim.employees?.name || "Unknown";

          return (
            <Card key={claim.id} className="bg-elec-gray border-border overflow-hidden">
              <CardContent className="p-0">
                <div 
                  className="p-4 cursor-pointer touch-feedback"
                  onClick={() => setExpandedClaim(isExpanded ? null : claim.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{getCategoryIcon(claim.category)}</div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground text-sm">{claim.description}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <User className="h-3 w-3" />
                          <span>{employeeName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Briefcase className="h-3 w-3" />
                          <span>{claim.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-foreground">£{Number(claim.amount).toFixed(2)}</p>
                      {getStatusBadge(claim.status)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(claim.submitted_date).toLocaleDateString()}</span>
                      {claim.receipt_url && (
                        <Badge variant="outline" className="text-xs">
                          <Image className="h-3 w-3 mr-1" />
                          Receipt
                        </Badge>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-border p-4 bg-muted/30 space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <span className="ml-2 font-medium">{claim.category}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Claim ID:</span>
                        <span className="ml-2 font-medium text-xs">{claim.id.slice(0, 8)}</span>
                      </div>
                      {claim.approved_by && (
                        <div>
                          <span className="text-muted-foreground">
                            {claim.status === "Rejected" ? "Rejected by:" : "Approved by:"}
                          </span>
                          <span className="ml-2 font-medium">{claim.approved_by}</span>
                        </div>
                      )}
                      {claim.paid_date && (
                        <div>
                          <span className="text-muted-foreground">Paid:</span>
                          <span className="ml-2 font-medium">
                            {new Date(claim.paid_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {claim.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(claim.id);
                          }}
                          disabled={rejectExpenseMutation.isPending}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(claim.id);
                          }}
                          disabled={approveExpenseMutation.isPending}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    )}

                    {claim.status === "Approved" && (
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkPaid(claim.id);
                        }}
                        disabled={markPaidMutation.isPending}
                      >
                        <PoundSterling className="h-4 w-4 mr-2" />
                        Mark as Paid
                      </Button>
                    )}

                    {claim.receipt_url && (
                      <Button variant="outline" size="sm" className="w-full">
                        <Image className="h-4 w-4 mr-2" />
                        View Receipt
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <SectionHeader title="Expense Claims" description="Review and approve team expenses" />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-40 shrink-0" />
          ))}
        </div>
        <Skeleton className="h-10 w-full" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Expense Claims"
        description="Review and approve team expenses"
        action={
          <Button size="sm" className="gap-2" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Submit Expense</span>
          </Button>
        }
      />

      {/* Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-warning/10 border-warning/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-warning" />
            <div>
              <p className="text-lg font-bold text-foreground">£{totalPending.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{pendingClaims.length} Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">£{totalApproved.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{approvedClaims.length} Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <XCircle className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-lg font-bold text-foreground">{rejectedClaims.length}</p>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="pending" className="text-xs">
            Pending ({pendingClaims.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="text-xs">
            Approved ({approvedClaims.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="text-xs">
            Rejected ({rejectedClaims.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          {renderClaimsList(pendingClaims)}
        </TabsContent>

        <TabsContent value="approved" className="mt-4">
          {renderClaimsList(approvedClaims)}
        </TabsContent>

        <TabsContent value="rejected" className="mt-4">
          {renderClaimsList(rejectedClaims)}
        </TabsContent>
      </Tabs>

      <FloatingActionButton
        icon={<Plus className="h-5 w-5" />}
        onClick={() => setShowCreateDialog(true)}
        label="Submit Expense"
      />

      <CreateExpenseDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </div>
  );
}
