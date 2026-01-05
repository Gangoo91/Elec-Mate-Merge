import { useState } from "react";
import { FileSearch, Send, Clock, Trophy, Plus, Eye, Download, Brain, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/employer/StatusBadge";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { CreateTenderDialog } from "@/components/employer/dialogs/CreateTenderDialog";
import {
  useTenders,
  useAllTenderEstimates,
  useUpdateTenderStatus,
  useDeleteTender,
  useTenderStats,
  type Tender
} from "@/hooks/useTenders";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
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

export function TenderSection() {
  const [showAIEstimator, setShowAIEstimator] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [tenderToDelete, setTenderToDelete] = useState<Tender | null>(null);
  const isMobile = useIsMobile();

  const { data: tenders = [], isLoading: tendersLoading } = useTenders();
  const { data: aiEstimates = [], isLoading: estimatesLoading } = useAllTenderEstimates();
  const updateStatusMutation = useUpdateTenderStatus();
  const deleteMutation = useDeleteTender();
  const stats = useTenderStats();

  const isLoading = tendersLoading || estimatesLoading;

  const openTenders = tenders.filter(t => t.status === "Open");
  const submittedTenders = tenders.filter(t => t.status === "Submitted");
  const wonTenders = tenders.filter(t => t.status === "Won");
  const lostTenders = tenders.filter(t => t.status === "Lost");

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      "Open": "active",
      "Submitted": "pending",
      "Won": "completed",
      "Lost": "rejected"
    };
    return statusMap[status] || status;
  };

  const handleSubmitTender = (tender: Tender) => {
    updateStatusMutation.mutate({ id: tender.id, status: "Submitted" });
  };

  const handleDeleteTender = () => {
    if (tenderToDelete) {
      deleteMutation.mutate(tenderToDelete.id);
      setTenderToDelete(null);
    }
  };

  const handleGenerateEstimate = () => {
    toast({
      title: "AI Estimate Generated",
      description: "Your estimate package is ready for review.",
    });
    setShowAIEstimator(false);
  };

  const AIEstimatorContent = () => (
    <div className="space-y-4 py-4">
      <p className="text-sm text-muted-foreground">
        Upload your tender documents and our AI will generate a comprehensive estimate package including:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="font-medium text-sm">Scoped RAMS</p>
          <p className="text-xs text-muted-foreground">Auto-generated risk assessments</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="font-medium text-sm">Labour Hours</p>
          <p className="text-xs text-muted-foreground">Estimated man-hours breakdown</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="font-medium text-sm">Materials List</p>
          <p className="text-xs text-muted-foreground">Complete material requirements</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="font-medium text-sm">Hazard Profile</p>
          <p className="text-xs text-muted-foreground">Identified hazards and controls</p>
        </div>
      </div>

      <div className="border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center">
        <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Upload Tender Documents</p>
        <p className="text-sm text-muted-foreground">Drawings, specs, BOQs, job descriptions</p>
        <Button variant="outline" className="mt-4">
          Select Files
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <Button variant="outline" onClick={() => setShowAIEstimator(false)} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button onClick={handleGenerateEstimate} className="gap-2 w-full sm:w-auto">
          <Sparkles className="h-4 w-4" />
          Generate Estimate
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <SectionHeader
          title="Tender Portal"
          description="Track tenders and generate AI estimates"
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-28 shrink-0" />
          ))}
        </div>
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-10 w-full" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <SectionHeader
        title="Tender Portal"
        description="Track tenders and generate AI estimates"
        action={
          <div className="flex gap-2">
            <Sheet open={showAIEstimator} onOpenChange={setShowAIEstimator}>
              <SheetTrigger asChild>
                <Button variant="outline" size={isMobile ? "icon" : "default"} className="gap-2">
                  <Brain className="h-4 w-4" />
                  {!isMobile && "AI Estimator"}
                </Button>
              </SheetTrigger>
              <SheetContent side={isMobile ? "bottom" : "right"} className={isMobile ? "h-[85vh]" : ""}>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-elec-yellow" />
                    AI Tender Estimator
                  </SheetTitle>
                </SheetHeader>
                <AIEstimatorContent />
              </SheetContent>
            </Sheet>
            <Button size={isMobile ? "icon" : "sm"} className="gap-2" onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4" />
              {!isMobile && "Track Tender"}
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <FileSearch className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{stats.open}</p>
              <p className="text-xs text-muted-foreground">Open</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Send className="h-4 w-4 text-warning" />
            <div>
              <p className="text-lg font-bold text-foreground">{stats.submitted}</p>
              <p className="text-xs text-muted-foreground">Submitted</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{stats.won}</p>
              <p className="text-xs text-muted-foreground">Won</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <div>
              <p className="text-lg font-bold text-success">£{(stats.wonValue / 1000).toFixed(0)}k</p>
              <p className="text-xs text-muted-foreground">Won Value</p>
            </div>
          </CardContent>
        </Card>
        {stats.winRate > 0 && (
          <Card className="bg-info/10 border-info/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <div>
                <p className="text-lg font-bold text-info">{stats.winRate.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">Win Rate</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* AI Estimates Section */}
      {aiEstimates.length > 0 && (
        <Card className="bg-gradient-to-r from-elec-yellow/5 to-elec-yellow/10 border-elec-yellow/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-elec-yellow" />
              AI Generated Estimates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiEstimates.map((estimate) => (
              <div key={estimate.id} className="p-3 md:p-4 bg-background/50 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm md:text-base">
                      {estimate.tender?.title || 'Untitled Tender'}
                    </h4>
                    <div className="grid grid-cols-3 gap-2 mt-2 md:flex md:items-center md:gap-4 text-xs md:text-sm text-muted-foreground">
                      <div className="bg-muted/50 p-2 rounded md:bg-transparent md:p-0">
                        <p className="text-muted-foreground text-[10px] md:hidden">Labour</p>
                        <p className="font-medium text-foreground md:text-muted-foreground">
                          <span className="hidden md:inline">Labour: </span>£{Number(estimate.labour_cost).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-muted/50 p-2 rounded md:bg-transparent md:p-0">
                        <p className="text-muted-foreground text-[10px] md:hidden">Materials</p>
                        <p className="font-medium text-foreground md:text-muted-foreground">
                          <span className="hidden md:inline">Materials: </span>£{Number(estimate.materials_cost).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-muted/50 p-2 rounded md:bg-transparent md:p-0">
                        <p className="text-muted-foreground text-[10px] md:hidden">Programme</p>
                        <p className="font-medium text-foreground md:text-muted-foreground">
                          <span className="hidden md:inline">Programme: </span>{estimate.programme || 'TBD'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:flex-col md:text-right gap-2">
                    <p className="text-lg font-bold text-elec-yellow">
                      £{Number(estimate.total_estimate).toLocaleString()}
                    </p>
                    <Badge className={estimate.confidence === "High" ? "bg-success/20 text-success border-0" : estimate.confidence === "Medium" ? "bg-warning/20 text-warning border-0" : "bg-muted text-muted-foreground border-0"}>
                      {estimate.confidence}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {tenders.length === 0 && (
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-8 text-center">
            <FileSearch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No Tenders Yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start tracking your tender opportunities to manage bids and win more work.
            </p>
            <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Track Your First Tender
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      {tenders.length > 0 && (
        <Tabs defaultValue="open" className="space-y-4">
          <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            <TabsList className="w-max md:w-auto">
              <TabsTrigger value="open" className="text-xs md:text-sm">Open ({openTenders.length})</TabsTrigger>
              <TabsTrigger value="submitted" className="text-xs md:text-sm">Submitted ({submittedTenders.length})</TabsTrigger>
              <TabsTrigger value="won" className="text-xs md:text-sm">Won ({wonTenders.length})</TabsTrigger>
              <TabsTrigger value="lost" className="text-xs md:text-sm">Lost ({lostTenders.length})</TabsTrigger>
            </TabsList>
          </div>

          {(["open", "submitted", "won", "lost"] as const).map(tab => {
            const filteredTenders = tenders.filter(t => t.status.toLowerCase() === tab);

            return (
              <TabsContent key={tab} value={tab}>
                <div className="space-y-3">
                  {filteredTenders.length === 0 ? (
                    <Card className="bg-elec-gray border-border">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground">
                          No {tab} tenders
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredTenders.map(tender => (
                      <Card key={tender.id} className="bg-elec-gray border-border overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-semibold text-sm md:text-base">{tender.title}</h3>
                                  <StatusBadge status={getStatusBadge(tender.status)} />
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{tender.client}</p>
                                {tender.tender_number && (
                                  <p className="text-xs text-muted-foreground">{tender.tender_number}</p>
                                )}
                              </div>
                              <p className="font-bold text-elec-yellow shrink-0">
                                £{(Number(tender.value) / 1000).toFixed(0)}k
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                              {tender.category && <Badge variant="outline">{tender.category}</Badge>}
                              {tender.deadline && (
                                <span className={cn(
                                  "text-muted-foreground",
                                  new Date(tender.deadline) < new Date() && "text-destructive"
                                )}>
                                  Due: {new Date(tender.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                                </span>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 flex-wrap">
                              <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                                <Eye className="h-4 w-4 mr-1 md:mr-2" />
                                View
                              </Button>
                              {tender.status === "Open" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 md:flex-none"
                                    onClick={() => setShowAIEstimator(true)}
                                  >
                                    <Brain className="h-4 w-4 mr-1 md:mr-2" />
                                    Estimate
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="flex-1 md:flex-none"
                                    onClick={() => handleSubmitTender(tender)}
                                    disabled={updateStatusMutation.isPending}
                                  >
                                    <Send className="h-4 w-4 mr-1 md:mr-2" />
                                    Submit
                                  </Button>
                                </>
                              )}
                              {tender.status === "Submitted" && (
                                <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                                  <Download className="h-4 w-4 mr-1 md:mr-2" />
                                  Docs
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => setTenderToDelete(tender)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      )}

      {/* Potential Value */}
      {tenders.length > 0 && stats.openValue > 0 && (
        <Card className="bg-gradient-to-r from-elec-yellow/5 to-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="font-semibold text-base md:text-lg">Total Open Tender Value</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Combined value of all open opportunities</p>
              </div>
              <p className="text-3xl md:text-4xl font-bold text-elec-yellow">
                £{(stats.openValue / 1000).toFixed(0)}k
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Tender Dialog */}
      <CreateTenderDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!tenderToDelete} onOpenChange={() => setTenderToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tender</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{tenderToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTender}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
