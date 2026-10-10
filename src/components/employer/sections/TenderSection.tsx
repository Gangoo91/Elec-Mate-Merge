import { useState, useRef, useEffect, type ComponentProps } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { TENDERS_HELP } from '@/components/employer/help/finance';
import { Plus, Upload, X, Loader2, Search, Target } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import FormSheet from '@/components/forms/FormSheet';
import { cn } from '@/lib/utils';
import { CreateTenderDialog } from '@/components/employer/dialogs/CreateTenderDialog';
import { ViewTenderSheet } from '@/components/employer/sheets/ViewTenderSheet';
import { ConvertTenderToJobDialog } from '@/components/employer/dialogs/ConvertTenderToJobDialog';
import { TenderOpportunitiesSection } from '@/components/employer/sections/TenderOpportunitiesSection';
import { type OpportunityEstimate } from '@/components/employer/sheets/OpportunityDetailSheet';
import { type TenderOpportunity } from '@/hooks/useOpportunities';
import {
  useTenders,
  useAllTenderEstimates,
  useTenderStats,
  useUploadTenderDocument,
  useGenerateTenderEstimate,
  useCreateTenderEstimate,
  type Tender,
} from '@/hooks/useTenders';
import { toast } from '@/hooks/use-toast';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { useQueryClient } from '@tanstack/react-query';
import { TenderMatchesCard } from '@/components/employer/tenders/TenderMatchesCard';
import { TenderCriteriaSheet } from '@/components/employer/tenders/TenderCriteriaSheet';
import {
  useTenderMatches,
  useTenderFeedSources,
  TENDER_MATCHES_KEY,
  type TenderMatch,
} from '@/hooks/useTenderMatches';
import {
  PageFrame,
  PageHero,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
} from '@/components/employer/editorial';
import {
  frameClass,
  twoColClass,
  colClass,
  panel,
  PanelTitle,
  Row,
  RowList,
  StatusPill,
  PlainEmpty,
  Segments,
  SearchField,
  FigureStrip,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  RefreshIcon,
  plural,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';

type TenderTab = 'matching' | 'bidding' | 'closed';

// Closed includes Withdrawn — otherwise a withdrawn tender vanishes from
// every tab and its "Reopen" action becomes unreachable.
const tabToStatuses: Record<TenderTab, Tender['status'][]> = {
  matching: ['Open'],
  bidding: ['Submitted'],
  closed: ['Won', 'Lost', 'Withdrawn'],
};

// One status pill per row: green won, red lost, the rest plain
const stageToTone = (status: Tender['status']): PillTone =>
  status === 'Won' ? 'green' : status === 'Lost' ? 'red' : 'neutral';

const STAGE_LABEL: Record<Tender['status'], string> = {
  Open: 'Open',
  Submitted: 'Submitted',
  Won: 'Won',
  Lost: 'Lost',
  Withdrawn: 'Withdrawn',
};

const WEEK_MS = 7 * 86_400_000;

/** The deadline line, and how loud it is: red past it, volt inside a week. */
const deadlineOf = (
  deadline: string | null | undefined,
  live: boolean
): { text: string; tone: 'red' | 'volt' | null } => {
  if (!deadline) return { text: 'No deadline', tone: null };
  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return { text: 'No deadline', tone: null };
  const formatted = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const ms = d.getTime() - Date.now();
  if (ms < 0) return { text: `Overdue, closed ${formatted}`, tone: live ? 'red' : null };
  return { text: `Closes ${formatted}`, tone: live && ms < WEEK_MS ? 'volt' : null };
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
  const [showCriteria, setShowCriteria] = useState(false);
  const [matchLimit, setMatchLimit] = useState(6);
  const [startingId, setStartingId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [scrollToMatches, setScrollToMatches] = useState(false);
  // Office managers never see the firm's bid values or AI estimates (can_see_firm_money)
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = !!roleInfo?.canSeeMoney;
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [showViewSheet, setShowViewSheet] = useState(false);
  const [showConvertDialog, setShowConvertDialog] = useState(false);
  const [estimatorTender, setEstimatorTender] = useState<Tender | null>(null);
  const [estimatorFiles, setEstimatorFiles] = useState<File[]>([]);
  const [isGeneratingEstimate, setIsGeneratingEstimate] = useState(false);
  const [isUploadingForEstimate, setIsUploadingForEstimate] = useState(false);
  const [showDiscoverSheet, setShowDiscoverSheet] = useState(false);
  const [createTenderInitialData, setCreateTenderInitialData] = useState<
    ComponentProps<typeof CreateTenderDialog>['initialData'] | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: tenders = [], isLoading: tendersLoading } = useTenders();
  const { data: aiEstimates = [], isLoading: estimatesLoading } = useAllTenderEstimates();
  const matchesQuery = useTenderMatches(matchLimit);
  const { data: feedSources = [] } = useTenderFeedSources();
  const liveSources = feedSources.filter((x) => x.live > 0).length;
  const sourcesCopy = liveSources
    ? `${liveSources} public tender sources, checked every morning`
    : 'UK public tender sources, checked every morning';
  const uploadDocMutation = useUploadTenderDocument();
  const generateEstimateMutation = useGenerateTenderEstimate();
  const createEstimateMutation = useCreateTenderEstimate();
  const stats = useTenderStats();

  const isLoading = tendersLoading || estimatesLoading;
  useEffect(() => {
    if (!scrollToMatches || isLoading || matchesQuery.isLoading) return;
    setScrollToMatches(false);
    requestAnimationFrame(() =>
      document
        .querySelector('[data-help="tenders.matches"]')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  }, [scrollToMatches, isLoading, matchesQuery.isLoading]);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['tenders'] });
    queryClient.invalidateQueries({ queryKey: ['tender-estimates'] });
    toast({ title: 'Refreshed', description: 'Pipeline updated.' });
  };

  // The Monday digest and Overview link here with ?matches=1: land on the
  // matches list once the page (not the loading state) has rendered. Watches
  // the param, so a bell tap while already on Tenders still scrolls.
  const matchesParam = searchParams.get('matches');
  useEffect(() => {
    if (matchesParam !== '1') return;
    setScrollToMatches(true);
    const next = new URLSearchParams(searchParams);
    next.delete('matches');
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchesParam]);

  // "Start bid" on a match: load the full notice and pre-fill the tender
  const handleStartFromMatch = async (m: TenderMatch) => {
    setStartingId(m.id);
    try {
      const { data, error } = await supabase
        .from('tender_opportunities')
        .select('*')
        .eq('id', m.id)
        .maybeSingle();
      if (error || !data) throw error ?? new Error('Not found');
      handleStartTenderFromOpportunity(data as unknown as TenderOpportunity);
    } catch {
      toast({
        title: "Couldn't open that tender",
        description: 'It may have just closed. Refresh and try again.',
        variant: 'destructive',
      });
    } finally {
      setStartingId(null);
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
      // The upload/estimate mutations already surface their own destructive
      // toasts — no reassuring second toast over a failure.
      console.error('Estimate generation error:', error);
    } finally {
      setIsGeneratingEstimate(false);
      setIsUploadingForEstimate(false);
    }
  };

  const handleConvertToJob = (tender: Tender) => {
    setSelectedTender(tender);
    setShowConvertDialog(true);
  };

  const handleStartTenderFromOpportunity = (
    opportunity: TenderOpportunity,
    estimate?: OpportunityEstimate
  ) => {
    const sectorToCategory: Record<string, string> = {
      public: 'Public Sector',
      housing: 'Residential',
      healthcare: 'Healthcare',
      education: 'Education',
      commercial: 'Commercial',
      industrial: 'Industrial',
    };

    const fmt = (n: number) => `£${Math.round(n).toLocaleString()}`;
    // Carry the AI estimate (including any manual edits) into the tracked
    // tender so "Use this estimate" isn't a dead end.
    const estimateNote =
      estimate && canSeeMoney
        ? `\nAI estimate: ${fmt(estimate.total_estimate)} (labour ${fmt(estimate.labour_cost)}, materials ${fmt(estimate.materials_cost)}, equipment ${fmt(estimate.equipment_cost)}, overheads ${fmt(estimate.overheads)}, profit ${fmt(estimate.profit)})${estimate.programme ? `\nProgramme: ${estimate.programme}` : ''}`
        : '';

    const initialData = {
      title: opportunity.title,
      client: opportunity.client_name,
      // Under £100 is a placeholder in the notice ("£1"), not a contract value
      // Roles that can't see firm money get no value pre-filled (can_see_firm_money)
      value: !canSeeMoney
        ? 0
        : estimate?.total_estimate ||
          [opportunity.value_exact, opportunity.value_high, opportunity.value_low]
            .map(Number)
            .find((v) => Number.isFinite(v) && v >= 100) ||
          0,
      deadline: opportunity.deadline ? opportunity.deadline.split('T')[0] : '',
      category: sectorToCategory[opportunity.sector || ''] || 'Other',
      description: opportunity.scope_of_works || opportunity.description || '',
      contact_name: opportunity.contact_name || '',
      contact_email: opportunity.contact_email || '',
      notes: `Source: ${opportunity.source?.replace('_', ' ')}${opportunity.location_text ? `\nLocation: ${opportunity.location_text}` : ''}${estimateNote}`,
      opportunity_id: opportunity.id,
      source_url: opportunity.source_url || '',
      fromOpportunity: true,
    };

    setShowDiscoverSheet(false);
    setCreateTenderInitialData(initialData);
    setShowCreateDialog(true);
  };

  const filteredTenders = tenders.filter((t) => {
    if (!tabToStatuses[activeTab].includes(t.status)) return false;
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
    bidding: stats.submitted,
    closed: tenders.filter((t) => tabToStatuses.closed.includes(t.status)).length,
  };

  // One live line: what needs doing first, else where the pipeline stands.
  const matches = matchesQuery.data;
  const newMatches = matches?.has_criteria ? matches.new_this_week : 0;
  const openTenders = tenders.filter((t) => t.status === 'Open');
  const overdue = openTenders.filter(
    (t) => t.deadline && new Date(t.deadline).getTime() < Date.now()
  ).length;
  const closingSoon = openTenders.filter((t) => {
    if (!t.deadline) return false;
    const ms = new Date(t.deadline).getTime() - Date.now();
    return ms >= 0 && ms < WEEK_MS;
  }).length;
  const todo: string[] = [];
  if (overdue > 0) todo.push(`${plural(overdue, 'bid')} past the deadline`);
  if (closingSoon > 0) todo.push(`${plural(closingSoon, 'bid')} closing this week`);
  if (newMatches > 0)
    todo.push(
      newMatches === 1
        ? '1 new tender fits what you bid for'
        : `${newMatches} new tenders fit what you bid for`
    );
  const standing =
    tenders.length === 0
      ? matches && !matches.has_criteria
        ? 'No bids yet. Say what you bid for and matching tenders arrive here'
        : 'No bids tracked yet'
      : `${stats.open} open, ${stats.submitted} submitted and waiting`;
  const liveLine =
    todo.length > 0
      ? `${todo.join(', ')}. ${standing}.`
      : `${standing}.${tenders.length > 0 ? ' Nothing due this week.' : ''}`;

  const openTrack = () => {
    setCreateTenderInitialData(null);
    setShowCreateDialog(true);
  };

  const heroActions = (
    <HeroActions>
      <HeroPrimary
        data-help="tenders.track"
        onClick={openTrack}
        icon={<Plus className="h-4 w-4" />}
      >
        Track tender
      </HeroPrimary>
      <HeroSecondary
        data-help="tenders.discover"
        label="Discover"
        onClick={() => setShowDiscoverSheet(true)}
        icon={<Search className="h-4 w-4" />}
      >
        Discover
      </HeroSecondary>
      <HeroSecondary
        label="What we bid for"
        onClick={() => setShowCriteria(true)}
        icon={<Target className="h-4 w-4" />}
      >
        What we bid for
      </HeroSecondary>
      <PageHelpButton help={TENDERS_HELP} askContext={{ page: 'tenders', tab: activeTab }} />
      <RefreshIcon onClick={handleRefresh} />
    </HeroActions>
  );

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Tenders" description="Loading your bids." />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const scrollToMatchList = () =>
    document
      .querySelector('[data-help="tenders.matches"]')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <PageFrame className={frameClass}>
        <PageHero title="Tenders" description={liveLine} actions={heroActions} />

        <HowItWorks help={TENDERS_HELP} askContext={{ page: 'tenders', tab: activeTab }} />

        <FigureStrip
          figures={[
            matches?.has_criteria
              ? {
                  label: 'New matches',
                  value: newMatches,
                  tone: newMatches > 0 ? 'volt' : undefined,
                  sub: `${matches.total} open that fit`,
                  onOpen: scrollToMatchList,
                }
              : {
                  label: 'New matches',
                  value: 'None yet',
                  sub: 'Set what you bid for',
                  onOpen: () => setShowCriteria(true),
                },
            {
              label: 'Open',
              value: stats.open,
              sub:
                overdue > 0
                  ? `${overdue} past the deadline`
                  : closingSoon > 0
                    ? `${closingSoon} closing this week`
                    : stats.open > 0
                      ? 'Being priced'
                      : 'Nothing being priced',
              tone: overdue > 0 ? 'red' : undefined,
              onOpen: () => setActiveTab('matching'),
            },
            {
              label: 'Bidding',
              value: stats.submitted,
              sub: 'Submitted, waiting on a result',
              onOpen: () => setActiveTab('bidding'),
            },
            canSeeMoney
              ? {
                  label: 'Won this year',
                  value: formatGbp(stats.wonValueThisYear),
                  sub: stats.won > 0 ? `${plural(stats.won, 'tender')} won in all` : 'None won yet',
                  onOpen: () => setActiveTab('closed'),
                }
              : {
                  label: 'Won',
                  value: stats.won,
                  sub:
                    stats.won + stats.lost > 0
                      ? `${Math.round(stats.winRate)}% of results`
                      : 'No results yet',
                  onOpen: () => setActiveTab('closed'),
                },
          ]}
        />

        <div className={twoColClass}>
          <div className={colClass}>
            <div data-help="tenders.matches" className="scroll-mt-24">
              <TenderMatchesCard
                data={matchesQuery.data}
                isLoading={matchesQuery.isLoading}
                error={matchesQuery.error}
                startingId={startingId}
                onStart={handleStartFromMatch}
                onEditCriteria={() => setShowCriteria(true)}
                onDiscover={() => setShowDiscoverSheet(true)}
                onShowAll={() => setMatchLimit(100)}
              />
            </div>
          </div>

          <div className={colClass}>
            <section>
              <PanelTitle
                title="Your bids"
                meta={tenders.length > 0 ? plural(tenders.length, 'tender') : undefined}
              />
              <div className="space-y-3">
                <div data-help="tenders.tabs">
                  <Segments<TenderTab>
                    items={[
                      { value: 'matching', label: 'Open', count: tabCounts.matching },
                      { value: 'bidding', label: 'Bidding', count: tabCounts.bidding },
                      { value: 'closed', label: 'Closed', count: tabCounts.closed },
                    ]}
                    value={activeTab}
                    onChange={setActiveTab}
                  />
                </div>
                {tenders.length > 0 && (
                  <SearchField
                    value={search}
                    onChange={setSearch}
                    placeholder="Search tenders, clients, refs"
                  />
                )}
                {tenders.length === 0 ? (
                  <PlainEmpty
                    text={`No tenders tracked yet. Start a bid from a match, browse ${sourcesCopy.split(',')[0]}, or track one you heard about.`}
                    action="Discover tenders"
                    onAction={() => setShowDiscoverSheet(true)}
                  />
                ) : filteredTenders.length === 0 ? (
                  <PlainEmpty
                    text={
                      search
                        ? 'Nothing matches that search. Try another word or switch tab.'
                        : activeTab === 'matching'
                          ? 'No open bids. Start one from a match.'
                          : activeTab === 'bidding'
                            ? 'Nothing submitted and waiting on a result.'
                            : 'No closed tenders yet.'
                    }
                  />
                ) : (
                  <div data-help="tenders.list">
                    <RowList>
                      {filteredTenders.map((tender) => {
                        const live = tender.status === 'Open';
                        const dl = deadlineOf(tender.deadline, live);
                        return (
                          <Row
                            key={tender.id}
                            title={tender.title}
                            detail={[
                              tender.client,
                              canSeeMoney && Number(tender.value) > 0
                                ? formatGbp(Number(tender.value))
                                : null,
                              tender.category,
                            ]
                              .filter(Boolean)
                              .join(' · ')}
                            meta={
                              <span
                                className={
                                  dl.tone === 'red'
                                    ? 'text-red-400'
                                    : dl.tone === 'volt'
                                      ? 'text-elec-yellow'
                                      : 'text-white'
                                }
                              >
                                {dl.text}
                              </span>
                            }
                            trailing={
                              <StatusPill tone={stageToTone(tender.status)}>
                                {STAGE_LABEL[tender.status] ?? tender.status}
                              </StatusPill>
                            }
                            onClick={() => handleViewTender(tender)}
                          />
                        );
                      })}
                    </RowList>
                  </div>
                )}
              </div>
            </section>

            {canSeeMoney && aiEstimates.length > 0 && (
              <section>
                <PanelTitle title="AI estimates" meta={plural(aiEstimates.length, 'estimate')} />
                <RowList>
                  {aiEstimates.map((estimate) => (
                    <Row
                      key={estimate.id}
                      title={estimate.tender?.title || 'Untitled tender'}
                      detail={`Labour ${formatGbp(Number(estimate.labour_cost))} · Materials ${formatGbp(Number(estimate.materials_cost))} · ${estimate.programme || 'Programme to be confirmed'}`}
                      meta={
                        <span
                          className={estimate.confidence === 'Low' ? 'text-red-400' : 'text-white'}
                        >
                          {estimate.confidence} confidence
                        </span>
                      }
                      trailing={
                        <span className="text-[15px] font-semibold tabular-nums text-white">
                          {formatGbp(Number(estimate.total_estimate))}
                        </span>
                      }
                    />
                  ))}
                </RowList>
              </section>
            )}
          </div>
        </div>
      </PageFrame>

      <CreateTenderDialog
        open={showCreateDialog}
        onOpenChange={(open) => {
          setShowCreateDialog(open);
          if (!open) {
            setCreateTenderInitialData(null);
            // A bid started from a match now shows as "In your pipeline"
            queryClient.invalidateQueries({ queryKey: [TENDER_MATCHES_KEY] });
          }
        }}
        initialData={createTenderInitialData}
        hideValue={!canSeeMoney}
      />

      <TenderCriteriaSheet
        open={showCriteria}
        onOpenChange={setShowCriteria}
        initial={matchesQuery.data?.criteria ?? null}
      />

      <ViewTenderSheet
        open={showViewSheet}
        onOpenChange={setShowViewSheet}
        tender={selectedTender}
        onConvertToJob={handleConvertToJob}
        onAIEstimate={handleOpenEstimator}
      />

      <ConvertTenderToJobDialog
        open={showConvertDialog}
        onOpenChange={setShowConvertDialog}
        tender={selectedTender}
      />

      <FormSheet
        open={showAIEstimator}
        onOpenChange={setShowAIEstimator}
        width="wide"
        title="AI estimate"
        description={
          estimatorTender
            ? `${estimatorTender.title}${estimatorTender.client ? `, for ${estimatorTender.client}` : ''}`
            : undefined
        }
        bodyClassName="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-start"
        footer={
          <div className="flex gap-2">
            <SecondaryButton
              onClick={() => {
                setShowAIEstimator(false);
                setEstimatorFiles([]);
                setEstimatorTender(null);
              }}
              disabled={isGeneratingEstimate}
              fullWidth
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={handleGenerateEstimate}
              disabled={estimatorFiles.length === 0 || !estimatorTender || isGeneratingEstimate}
              fullWidth
            >
              {isGeneratingEstimate ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploadingForEstimate ? 'Uploading…' : 'Generating…'}
                </>
              ) : (
                'Generate estimate'
              )}
            </PrimaryButton>
          </div>
        }
      >
        <section>
          <PanelTitle title="What it drafts" />
          <div className={cn(panel, 'px-4 py-4 sm:px-5')}>
            <p className="text-[14px] leading-relaxed text-white">
              Upload the tender documents and the AI drafts an estimate package: scoped RAMS, labour
              hours, materials and hazards.
            </p>
          </div>
        </section>

        <section>
          <PanelTitle
            title="Tender documents"
            meta={estimatorFiles.length > 0 ? plural(estimatorFiles.length, 'file') : undefined}
          />
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            onChange={handleEstimatorFileSelect}
            className="hidden"
          />
          <div className={cn(panel, 'overflow-hidden')}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center gap-3 px-4 py-4 text-left touch-manipulation hover:bg-white/[0.04] sm:px-5"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-white">
                  Add drawings, specs and BOQs
                </span>
                <span className="mt-0.5 block text-[13px] text-white">
                  PDF, Word, Excel or photos. The more detail, the better the estimate.
                </span>
              </span>
              <span className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white">
                <Upload className="h-4 w-4" />
                Choose files
              </span>
            </button>
            {estimatorFiles.length > 0 && (
              <ul className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
                {estimatorFiles.map((file, index) => (
                  <li key={index} className="flex items-center gap-3 px-4 py-2.5 sm:px-5">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-semibold text-white">{file.name}</p>
                      <p className="text-[13px] text-white">{(file.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveEstimatorFile(index)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </FormSheet>

      <Sheet open={showDiscoverSheet} onOpenChange={setShowDiscoverSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
        >
          <div className="flex h-full flex-col">
            <div className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-white/15" aria-hidden />
            <SheetHeader className="shrink-0 space-y-1 px-4 pb-4 pt-2 text-left sm:px-6 lg:px-10">
              <SheetTitle className="text-[20px] font-semibold leading-tight tracking-tight text-white sm:text-[24px]">
                Discover tenders
              </SheetTitle>
              <SheetDescription className="text-[13px] leading-snug text-white">
                Electrical contracts from {sourcesCopy}.
              </SheetDescription>
            </SheetHeader>
            <div className="min-h-0 flex-1 border-t border-white/[0.08]">
              <TenderOpportunitiesSection onStartTender={handleStartTenderFromOpportunity} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
