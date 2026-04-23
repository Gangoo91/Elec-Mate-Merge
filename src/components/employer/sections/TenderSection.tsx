import { useState, useRef } from 'react';
import {
  RefreshCw,
  Plus,
  Brain,
  Sparkles,
  Upload,
  X,
  FileIcon,
  Loader2,
  Search,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CreateTenderDialog } from '@/components/employer/dialogs/CreateTenderDialog';
import { ViewTenderSheet } from '@/components/employer/sheets/ViewTenderSheet';
import { ConvertTenderToJobDialog } from '@/components/employer/dialogs/ConvertTenderToJobDialog';
import { TenderOpportunitiesSection } from '@/components/employer/sections/TenderOpportunitiesSection';
import { type TenderOpportunity } from '@/hooks/useOpportunities';
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
} from '@/hooks/useTenders';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
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
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/employer/editorial';

type TenderTab = 'matching' | 'shortlisted' | 'bidding' | 'closed';

const tabToStatus: Record<TenderTab, Tender['status']> = {
  matching: 'Open',
  shortlisted: 'Open',
  bidding: 'Submitted',
  closed: 'Won',
};

const stageToTone = (status: Tender['status']): Tone => {
  switch (status) {
    case 'Open':
      return 'purple';
    case 'Submitted':
      return 'blue';
    case 'Won':
      return 'emerald';
    case 'Lost':
      return 'red';
    default:
      return 'amber';
  }
};

const formatDeadline = (deadline?: string | null): string => {
  if (!deadline) return 'No deadline';
  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return 'No deadline';
  const now = new Date();
  const overdue = d < now;
  const formatted = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  return overdue ? `Overdue · ${formatted}` : `Closes ${formatted}`;
};

const formatGbp = (value: number): string => {
  if (value >= 1_000_000) return `£${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `£${(value / 1_000).toFixed(0)}k`;
  return `£${value.toFixed(0)}`;
};

export function TenderSection() {
  const [activeTab, setActiveTab] = useState<TenderTab>('matching');
  const [search, setSearch] = useState('');
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
  const queryClient = useQueryClient();

  const { data: tenders = [], isLoading: tendersLoading } = useTenders();
  const { data: aiEstimates = [], isLoading: estimatesLoading } = useAllTenderEstimates();
  const updateStatusMutation = useUpdateTenderStatus();
  const deleteMutation = useDeleteTender();
  const uploadDocMutation = useUploadTenderDocument();
  const generateEstimateMutation = useGenerateTenderEstimate();
  const createEstimateMutation = useCreateTenderEstimate();
  const stats = useTenderStats();

  const isLoading = tendersLoading || estimatesLoading;

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['tenders'] });
    queryClient.invalidateQueries({ queryKey: ['tender-estimates'] });
    toast({ title: 'Refreshed', description: 'Pipeline updated.' });
  };

  const handleSubmitTender = (tender: Tender) => {
    updateStatusMutation.mutate({ id: tender.id, status: 'Submitted' });
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
    setEstimatorFiles((prev) => [...prev, ...Array.from(files)]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveEstimatorFile = (index: number) => {
    setEstimatorFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerateEstimate = async () => {
    if (!estimatorTender) return;

    setIsGeneratingEstimate(true);
    try {
      const documentUrls: string[] = [];
      setIsUploadingForEstimate(true);

      for (const file of estimatorFiles) {
        const result = await uploadDocMutation.mutateAsync({
          tenderId: estimatorTender.id,
          file,
        });
        documentUrls.push(result.url);
      }
      setIsUploadingForEstimate(false);

      await generateEstimateMutation.mutateAsync({
        tenderId: estimatorTender.id,
        documentUrls,
        description: estimatorTender.description || undefined,
      });

      toast({
        title: 'AI Estimate Generated',
        description: 'Your estimate package is ready for review.',
      });
      setShowAIEstimator(false);
      setEstimatorFiles([]);
      setEstimatorTender(null);
    } catch (error) {
      console.error('Estimate generation error:', error);
      if (estimatorFiles.length > 0) {
        toast({
          title: 'Documents Uploaded',
          description: 'Files saved. AI estimation will be available soon.',
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
    const sectorToCategory: Record<string, string> = {
      public: 'Public Sector',
      housing: 'Residential',
      healthcare: 'Healthcare',
      education: 'Education',
      commercial: 'Commercial',
      industrial: 'Industrial',
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

    setShowDiscoverSheet(false);
    setCreateTenderInitialData(initialData);
    setShowCreateDialog(true);
  };

  const filteredTenders = tenders.filter((t) => {
    const matchesTab = t.status === tabToStatus[activeTab] ||
      (activeTab === 'closed' && t.status === 'Lost');
    if (!matchesTab) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.client?.toLowerCase().includes(q) ||
      t.tender_number?.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q)
    );
  });

  const tabCounts = {
    matching: tenders.filter((t) => t.status === 'Open').length,
    shortlisted: tenders.filter((t) => t.status === 'Open').length,
    bidding: stats.submitted,
    closed: stats.won + stats.lost,
  };

  const heroActions = (
    <div className="flex items-center gap-2">
      <IconButton onClick={handleRefresh} aria-label="Refresh pipeline">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
      <SecondaryButton onClick={() => setShowDiscoverSheet(true)}>
        <Search className="h-4 w-4 mr-2 text-elec-yellow" />
        Discover
      </SecondaryButton>
      <PrimaryButton
        onClick={() => {
          setCreateTenderInitialData(null);
          setShowCreateDialog(true);
        }}
      >
        <Plus className="h-4 w-4 mr-2" />
        Track tender
      </PrimaryButton>
    </div>
  );

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Money"
          title="Tenders"
          description="Public sector bid opportunities and your live pipeline."
          tone="purple"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <>
      <PageFrame>
        <PageHero
          eyebrow="Money"
          title="Tenders"
          description="Public sector bid opportunities and your live pipeline."
          tone="purple"
          actions={heroActions}
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Matching', value: stats.open, tone: 'purple' },
            { label: 'Shortlisted', value: stats.open, tone: 'yellow' },
            { label: 'Bidding', value: stats.submitted, tone: 'blue' },
            {
              label: 'Won this year £',
              value: formatGbp(stats.wonValue),
              accent: true,
            },
          ]}
        />

        <FilterBar
          tabs={[
            { value: 'matching', label: 'Matching', count: tabCounts.matching },
            { value: 'shortlisted', label: 'Shortlisted', count: tabCounts.shortlisted },
            { value: 'bidding', label: 'Bidding', count: tabCounts.bidding },
            { value: 'closed', label: 'Closed', count: tabCounts.closed },
          ]}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as TenderTab)}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search tenders, clients, refs…"
        />

        {aiEstimates.length > 0 && (
          <ListCard>
            <ListCardHeader
              tone="yellow"
              title="AI estimates"
              meta={<Pill tone="yellow">{aiEstimates.length}</Pill>}
            />
            <ListBody>
              {aiEstimates.map((estimate) => (
                <ListRow
                  key={estimate.id}
                  title={estimate.tender?.title || 'Untitled tender'}
                  subtitle={`Labour ${formatGbp(Number(estimate.labour_cost))} · Materials ${formatGbp(Number(estimate.materials_cost))} · ${estimate.programme || 'Programme TBD'}`}
                  trailing={
                    <>
                      <span className="text-[13px] font-semibold text-elec-yellow tabular-nums">
                        {formatGbp(Number(estimate.total_estimate))}
                      </span>
                      <Pill
                        tone={
                          estimate.confidence === 'High'
                            ? 'emerald'
                            : estimate.confidence === 'Medium'
                              ? 'amber'
                              : 'red'
                        }
                      >
                        {estimate.confidence}
                      </Pill>
                    </>
                  }
                />
              ))}
            </ListBody>
          </ListCard>
        )}

        {tenders.length === 0 ? (
          <EmptyState
            title="No tenders tracked yet"
            description="Discover live opportunities from 20+ UK sources or track your first bid manually."
            action="Discover opportunities"
            onAction={() => setShowDiscoverSheet(true)}
          />
        ) : filteredTenders.length === 0 ? (
          <EmptyState
            title={`No ${activeTab} tenders`}
            description={
              search
                ? 'Try a different search term or switch tab.'
                : 'Nothing in this stage yet.'
            }
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="purple"
              title="Opportunities"
              meta={<Pill tone="purple">{filteredTenders.length}</Pill>}
            />
            <ListBody>
              {filteredTenders.map((tender) => {
                const tone = stageToTone(tender.status);
                return (
                  <ListRow
                    key={tender.id}
                    title={tender.title}
                    subtitle={`${tender.client} · ${formatGbp(Number(tender.value))} · ${formatDeadline(tender.deadline)}`}
                    trailing={
                      <>
                        {tender.category && (
                          <span className="hidden sm:inline text-[11px] text-white tabular-nums">
                            {tender.category}
                          </span>
                        )}
                        <Pill tone={tone}>{tender.status}</Pill>
                      </>
                    }
                    onClick={() => handleViewTender(tender)}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}
      </PageFrame>

      <CreateTenderDialog
        open={showCreateDialog}
        onOpenChange={(open) => {
          setShowCreateDialog(open);
          if (!open) setCreateTenderInitialData(null);
        }}
        initialData={createTenderInitialData}
      />

      <AlertDialog open={!!tenderToDelete} onOpenChange={() => setTenderToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete tender</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{tenderToDelete?.title}"? This action cannot be
              undone.
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

      <ViewTenderSheet
        open={showViewSheet}
        onOpenChange={setShowViewSheet}
        tender={selectedTender}
        onConvertToJob={handleConvertToJob}
      />

      <ConvertTenderToJobDialog
        open={showConvertDialog}
        onOpenChange={setShowConvertDialog}
        tender={selectedTender}
      />

      <Sheet open={showAIEstimator} onOpenChange={setShowAIEstimator}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl bg-[hsl(0_0%_10%)]">
          <div className="flex flex-col h-full">
            <SheetHeader className="px-5 py-4 border-b border-white/[0.06]">
              <SheetTitle className="flex items-center gap-2 text-white">
                <Sparkles className="h-5 w-5 text-elec-yellow" />
                AI tender estimator
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
              {estimatorTender && (
                <ListCard>
                  <ListCardHeader tone="yellow" title="Estimating for" />
                  <div className="px-5 py-4">
                    <div className="text-[14px] font-semibold text-white">
                      {estimatorTender.title}
                    </div>
                    <div className="mt-1 text-[12px] text-white">{estimatorTender.client}</div>
                  </div>
                </ListCard>
              )}

              <p className="text-[13px] text-white">
                Upload your tender documents and our AI will generate a comprehensive estimate
                package including:
              </p>

              <StatStrip
                columns={4}
                stats={[
                  { label: 'Scoped RAMS', value: '01', tone: 'purple' },
                  { label: 'Labour hours', value: '02', tone: 'blue' },
                  { label: 'Materials', value: '03', tone: 'emerald' },
                  { label: 'Hazards', value: '04', tone: 'amber' },
                ]}
              />

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                onChange={handleEstimatorFileSelect}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-[hsl(0_0%_12%)] border border-dashed border-white/[0.12] rounded-2xl px-5 py-8 text-center hover:bg-[hsl(0_0%_14%)] transition-colors touch-manipulation"
              >
                <Brain className="h-10 w-10 text-elec-yellow mx-auto mb-3" />
                <div className="text-[14px] font-semibold text-white">Upload tender documents</div>
                <div className="mt-1 text-[12px] text-white">
                  Drawings, specs, BOQs, job descriptions
                </div>
                <span className="mt-4 inline-flex items-center gap-2 h-11 px-4 rounded-full border border-white/[0.08] text-[12.5px] font-medium text-white">
                  <Upload className="h-4 w-4" />
                  Select files
                </span>
              </button>

              {estimatorFiles.length > 0 && (
                <ListCard>
                  <ListCardHeader
                    tone="blue"
                    title="Selected files"
                    meta={<Pill tone="blue">{estimatorFiles.length}</Pill>}
                  />
                  <ListBody>
                    {estimatorFiles.map((file, index) => (
                      <ListRow
                        key={index}
                        lead={<FileIcon className="h-4 w-4 text-white" />}
                        title={file.name}
                        subtitle={`${(file.size / 1024).toFixed(0)} KB`}
                        trailing={
                          <button
                            onClick={() => handleRemoveEstimatorFile(index)}
                            className="h-9 w-9 rounded-full flex items-center justify-center text-white hover:bg-white/[0.06] touch-manipulation"
                            aria-label="Remove file"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        }
                      />
                    ))}
                  </ListBody>
                </ListCard>
              )}
            </div>

            <div className="px-5 py-4 border-t border-white/[0.06] flex flex-col sm:flex-row justify-end gap-2 bg-[hsl(0_0%_10%)]">
              <SecondaryButton
                onClick={() => {
                  setShowAIEstimator(false);
                  setEstimatorFiles([]);
                  setEstimatorTender(null);
                }}
                disabled={isGeneratingEstimate}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleGenerateEstimate}
                disabled={
                  estimatorFiles.length === 0 || !estimatorTender || isGeneratingEstimate
                }
              >
                {isGeneratingEstimate ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {isUploadingForEstimate ? 'Uploading…' : 'Generating…'}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate estimate
                  </>
                )}
              </PrimaryButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showDiscoverSheet} onOpenChange={setShowDiscoverSheet}>
        <SheetContent
          side="bottom"
          className="h-[95vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)]"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="px-5 py-4 border-b border-white/[0.06] flex-shrink-0">
              <SheetTitle className="flex items-center gap-2 text-white">
                <MapPin className="h-5 w-5 text-elec-yellow" />
                Discover tender opportunities
              </SheetTitle>
              <p className="text-[12.5px] text-white">
                Find electrical contracts from 20+ UK sources.
              </p>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <TenderOpportunitiesSection onStartTender={handleStartTenderFromOpportunity} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
