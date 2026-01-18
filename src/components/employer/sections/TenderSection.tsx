import { useState, useRef } from "react";
import { FileSearch, Send, Clock, Trophy, Plus, Eye, Download, Brain, Sparkles, Trash2, TrendingUp, Upload, X, FileIcon, Loader2, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/employer/StatusBadge";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { CreateTenderDialog } from "@/components/employer/dialogs/CreateTenderDialog";
import { ViewTenderSheet } from "@/components/employer/sheets/ViewTenderSheet";
import { ConvertTenderToJobDialog } from "@/components/employer/dialogs/ConvertTenderToJobDialog";
import { TenderOpportunitiesSection } from "@/components/employer/sections/TenderOpportunitiesSection";
import { QuickStats, QuickStat } from "@/components/employer/QuickStats";
import { type TenderOpportunity } from "@/hooks/useOpportunities";
import {
  useTenders,
  useAllTenderEstimates,
  useUpdateTenderStatus,
  useDeleteTender,
  useTenderStats,
  useUploadTenderDocument,
  useGenerateTenderEstimate,
  useCreateTenderEstimate,
  type Tender,
  type TenderDocument
} from "@/hooks/useTenders";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
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
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [showViewSheet, setShowViewSheet] = useState(false);
  const [showConvertDialog, setShowConvertDialog] = useState(false);
  const [estimatorTender, setEstimatorTender] = useState<Tender | null>(null);
  const [estimatorFiles, setEstimatorFiles] = useState<File[]>([]);
  const [isGeneratingEstimate, setIsGeneratingEstimate] = useState(false);
  const [isUploadingForEstimate, setIsUploadingForEstimate] = useState(false);
  const [showDiscoverSheet, setShowDiscoverSheet] = useState(false);
  const [createTenderInitialData, setCreateTenderInitialData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const { data: tenders = [], isLoading: tendersLoading } = useTenders();
  const { data: aiEstimates = [], isLoading: estimatesLoading } = useAllTenderEstimates();
  const updateStatusMutation = useUpdateTenderStatus();
  const deleteMutation = useDeleteTender();
  const uploadDocMutation = useUploadTenderDocument();
  const generateEstimateMutation = useGenerateTenderEstimate();
  const createEstimateMutation = useCreateTenderEstimate();
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

  const handleViewTender = (tender: Tender) => {
    setSelectedTender(tender);
    setShowViewSheet(true);
  };

  const handleOpenEstimator = (tender: Tender) => {
    setEstimatorTender(tender);
    setEstimatorFiles([]);
    setShowAIEstimator(true);
  };

  const handleEstimatorFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    setEstimatorFiles(prev => [...prev, ...Array.from(files)]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveEstimatorFile = (index: number) => {
    setEstimatorFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerateEstimate = async () => {
    if (!estimatorTender) return;

    setIsGeneratingEstimate(true);
    try {
      // First upload all files to storage
      const documentUrls: string[] = [];
      setIsUploadingForEstimate(true);

      for (const file of estimatorFiles) {
        const result = await uploadDocMutation.mutateAsync({
          tenderId: estimatorTender.id,
          file
        });
        documentUrls.push(result.url);
      }
      setIsUploadingForEstimate(false);

      // Call the AI estimation function
      const estimate = await generateEstimateMutation.mutateAsync({
        tenderId: estimatorTender.id,
        documentUrls,
        description: estimatorTender.description || undefined
      });

      toast({
        title: "AI Estimate Generated",
        description: "Your estimate package is ready for review.",
      });
      setShowAIEstimator(false);
      setEstimatorFiles([]);
      setEstimatorTender(null);
    } catch (error: any) {
      console.error('Estimate generation error:', error);
      // If AI fails, still show that documents were uploaded
      if (estimatorFiles.length > 0) {
        toast({
          title: "Documents Uploaded",
          description: "Files saved. AI estimation will be available soon.",
        });
      }
    } finally {
      setIsGeneratingEstimate(false);
      setIsUploadingForEstimate(false);
    }
  };

  const handleConvertToJob = (tender: Tender) => {
    setSelectedTender(tender);
    setShowConvertDialog(true);
  };

  const handleStartTenderFromOpportunity = (opportunity: TenderOpportunity) => {
    // Map opportunity data to tender create data
    const sectorToCategory: Record<string, string> = {
      'public': 'Public Sector',
      'housing': 'Residential',
      'healthcare': 'Healthcare',
      'education': 'Education',
      'commercial': 'Commercial',
      'industrial': 'Industrial',
    };

    const initialData = {
      title: opportunity.title,
      client: opportunity.client_name,
      value: opportunity.value_exact || opportunity.value_high || opportunity.value_low || 0,
      deadline: opportunity.deadline ? opportunity.deadline.split('T')[0] : '',
      category: sectorToCategory[opportunity.sector || ''] || 'Other',
      description: opportunity.scope_of_works || opportunity.description || '',
      contact_name: opportunity.contact_name || '',
      contact_email: opportunity.contact_email || '',
      notes: `Source: ${opportunity.source?.replace('_', ' ')}${opportunity.location_text ? `\nLocation: ${opportunity.location_text}` : ''}`,
      opportunity_id: opportunity.id,
      source_url: opportunity.source_url || '',
      fromOpportunity: true,
    };

    // Close discover sheet and open create dialog pre-filled
    setShowDiscoverSheet(false);
    setCreateTenderInitialData(initialData);
    setShowCreateDialog(true);
  };

  const AIEstimatorContent = () => (
    <div className="space-y-4 py-4">
      {estimatorTender && (
        <div className="p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/20">
          <p className="text-sm text-muted-foreground">Estimating for:</p>
          <p className="font-semibold">{estimatorTender.title}</p>
          <p className="text-sm text-muted-foreground">{estimatorTender.client}</p>
        </div>
      )}

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

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
        onChange={handleEstimatorFileSelect}
        className="hidden"
      />

      <div
        className="border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center cursor-pointer hover:border-elec-yellow/50 active:bg-muted/30 transition-all touch-manipulation"
        onClick={() => fileInputRef.current?.click()}
      >
        <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Upload Tender Documents</p>
        <p className="text-sm text-muted-foreground">Drawings, specs, BOQs, job descriptions</p>
        <Button variant="outline" className="mt-4" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
          <Upload className="h-4 w-4 mr-2" />
          Select Files
        </Button>
      </div>

      {/* Selected Files List */}
      {estimatorFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected Files ({estimatorFiles.length})</p>
          <div className="space-y-1">
            {estimatorFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 min-w-0">
                  <FileIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={() => handleRemoveEstimatorFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setShowAIEstimator(false);
            setEstimatorFiles([]);
            setEstimatorTender(null);
          }}
          className="w-full sm:w-auto"
          disabled={isGeneratingEstimate}
        >
          Cancel
        </Button>
        <Button
          onClick={handleGenerateEstimate}
          className="gap-2 w-full sm:w-auto"
          disabled={estimatorFiles.length === 0 || !estimatorTender || isGeneratingEstimate}
        >
          {isGeneratingEstimate ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isUploadingForEstimate ? 'Uploading...' : 'Generating...'}
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Estimate
            </>
          )}
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
        description="Discover contracts and generate AI estimates"
        action={
          <div className="flex gap-2">
            {/* Discover Tenders Button */}
            <Button
              variant="outline"
              size={isMobile ? "icon" : "default"}
              className="gap-2 border-elec-yellow/50 hover:bg-elec-yellow/10"
              onClick={() => setShowDiscoverSheet(true)}
            >
              <Search className="h-4 w-4 text-elec-yellow" />
              {!isMobile && "Discover"}
            </Button>

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
            <Button size={isMobile ? "icon" : "sm"} className="gap-2" onClick={() => {
              setCreateTenderInitialData(null);
              setShowCreateDialog(true);
            }}>
              <Plus className="h-4 w-4" />
              {!isMobile && "Track Tender"}
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <QuickStats
        stats={[
          {
            icon: FileSearch,
            value: stats.open,
            label: "Open",
            color: "yellow",
            pulse: stats.open > 0,
          },
          {
            icon: Send,
            value: stats.submitted,
            label: "Submitted",
            color: "orange",
          },
          {
            icon: Trophy,
            value: stats.won,
            label: "Won",
            color: "green",
          },
          {
            icon: Trophy,
            value: `£${(stats.wonValue / 1000).toFixed(0)}k`,
            label: "Won Value",
            color: "green",
          },
          ...(stats.winRate > 0 ? [{
            icon: TrendingUp,
            value: stats.winRate.toFixed(0),
            label: "Win Rate",
            color: "blue" as const,
            suffix: "%",
          }] : []),
        ]}
      />

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
            <Button onClick={() => {
              setCreateTenderInitialData(null);
              setShowCreateDialog(true);
            }} className="gap-2">
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
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 md:flex-none"
                                onClick={() => handleViewTender(tender)}
                              >
                                <Eye className="h-4 w-4 mr-1 md:mr-2" />
                                View
                              </Button>
                              {tender.status === "Open" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 md:flex-none"
                                    onClick={() => handleOpenEstimator(tender)}
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
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 md:flex-none"
                                  onClick={() => handleViewTender(tender)}
                                >
                                  <Download className="h-4 w-4 mr-1 md:mr-2" />
                                  Docs
                                </Button>
                              )}
                              {tender.status === "Won" && (
                                <Button
                                  size="sm"
                                  className="flex-1 md:flex-none bg-success hover:bg-success/90"
                                  onClick={() => handleConvertToJob(tender)}
                                >
                                  <Trophy className="h-4 w-4 mr-1 md:mr-2" />
                                  Convert
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
      <CreateTenderDialog
        open={showCreateDialog}
        onOpenChange={(open) => {
          setShowCreateDialog(open);
          if (!open) setCreateTenderInitialData(null);
        }}
        initialData={createTenderInitialData}
      />

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

      {/* View Tender Sheet */}
      <ViewTenderSheet
        open={showViewSheet}
        onOpenChange={setShowViewSheet}
        tender={selectedTender}
        onConvertToJob={handleConvertToJob}
      />

      {/* Convert to Job Dialog */}
      <ConvertTenderToJobDialog
        open={showConvertDialog}
        onOpenChange={setShowConvertDialog}
        tender={selectedTender}
      />

      {/* Discover Tenders Sheet */}
      <Sheet open={showDiscoverSheet} onOpenChange={setShowDiscoverSheet}>
        <SheetContent side="bottom" className="h-[95vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 pb-0 flex-shrink-0">
              <SheetTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-elec-yellow" />
                Discover Tender Opportunities
              </SheetTitle>
              <p className="text-sm text-muted-foreground">
                Find electrical contracts from 20+ UK sources
              </p>
            </SheetHeader>
            <div className="flex-1 overflow-hidden">
              <TenderOpportunitiesSection onStartTender={handleStartTenderFromOpportunity} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
