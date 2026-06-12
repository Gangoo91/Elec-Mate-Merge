import { useState, useMemo, useCallback } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SparkProfileSheet } from '@/components/employer/SparkProfileSheet';
import { MessageDialog } from '@/components/employer/talent-pool/MessageDialog';
import { InviteToApplyDialog } from '@/components/employer/talent-pool/InviteToApplyDialog';
import { TalentFilterChips } from '@/components/employer/talent-pool/TalentFilterChips';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  Divider,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  fieldLabelClass,
  type Tone,
} from '@/components/employer/editorial';
import { SlidersHorizontal, Shield, Check, Award, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  useTalentPool,
  type TalentPoolWorker,
  type ExperienceLevel,
} from '@/hooks/useTalentPool';
import { Slider } from '@/components/ui/slider';

/* ==========================================================================
   TalentPoolSection — browse Elec-ID candidates. Every signal on screen is
   real: declared rates, declared skill years, admin-verified documents.
   ========================================================================== */

type TierFilter = 'all' | 'verified' | 'premium';

const ECS_CARD_TYPES = ['Gold', 'Blue', 'Green', 'Apprentice'];

const specialisms = [
  'Commercial',
  'Industrial',
  'Domestic',
  'EV Charging',
  'Solar PV',
  'Fire Alarm',
  'Smart Home',
  'Testing',
];

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const tierToneFor = (tier: string | undefined): Tone => {
  if (tier === 'premium') return 'yellow';
  if (tier === 'verified') return 'emerald';
  return 'blue';
};

export function TalentPoolSection() {
  // Saved list persists per device
  const [savedCandidates, setSavedCandidates] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('talent_saved_candidates') || '[]');
    } catch {
      return [];
    }
  });
  const toggleSaveCandidate = (id: string) => {
    setSavedCandidates((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem('talent_saved_candidates', JSON.stringify(next));
      return next;
    });
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<TalentPoolWorker | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [selectedSpecialisms, setSelectedSpecialisms] = useState<string[]>([]);
  const [experienceFilter, setExperienceFilter] = useState<ExperienceLevel>('all');
  const [selectedEcsCards, setSelectedEcsCards] = useState<string[]>([]);
  const [rateRange, setRateRange] = useState<[number, number]>([150, 500]);

  const { workers, isLoading, error, verifiedCount, refetch } = useTalentPool({
    searchQuery,
    tierFilter,
    specialismsFilter: selectedSpecialisms,
    experienceFilter,
    ecsCardFilter: selectedEcsCards,
    minRate: rateRange[0] > 150 ? rateRange[0] : undefined,
    maxRate: rateRange[1] < 500 ? rateRange[1] : undefined,
  });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
    toast({ title: 'Refreshed', description: 'Talent pool updated.' });
  }, [refetch]);

  const activeFilterCount = [
    tierFilter !== 'all',
    selectedSpecialisms.length > 0,
    experienceFilter !== 'all',
    selectedEcsCards.length > 0,
    rateRange[0] > 150 || rateRange[1] < 500,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setTierFilter('all');
    setSelectedSpecialisms([]);
    setExperienceFilter('all');
    setSelectedEcsCards([]);
    setRateRange([150, 500]);
  };

  const toggleSpecialism = (spec: string) => {
    setSelectedSpecialisms((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const handleOpenProfile = (worker: TalentPoolWorker) => {
    setSelectedWorker(worker);
    setProfileSheetOpen(true);
  };

  const handleSave = (worker: TalentPoolWorker) => {
    const wasSaved = savedCandidates.includes(worker.profileId);
    toggleSaveCandidate(worker.profileId);
    toast({
      title: wasSaved ? 'Removed from Saved' : 'Candidate Saved',
      description: wasSaved
        ? `${worker.name} removed from your saved list.`
        : `${worker.name} added to your saved list.`,
    });
  };

  const handleMessage = (worker: TalentPoolWorker) => {
    setSelectedWorker(worker);
    setMessageDialogOpen(true);
  };

  const handleInvite = (worker: TalentPoolWorker) => {
    setSelectedWorker(worker);
    setInviteDialogOpen(true);
  };

  const skillTabs = useMemo(
    () => [
      { value: 'all', label: 'All' },
      { value: 'verified', label: 'Verified+' },
      { value: 'premium', label: 'Premium' },
      { value: 'ev', label: 'EV Charging' },
      { value: 'solar', label: 'Solar PV' },
      { value: 'senior', label: 'Senior 8+ yrs' },
    ],
    []
  );

  const activeQuickTab: string = useMemo(() => {
    if (tierFilter === 'verified') return 'verified';
    if (tierFilter === 'premium') return 'premium';
    if (selectedSpecialisms.includes('EV Charging')) return 'ev';
    if (selectedSpecialisms.includes('Solar PV')) return 'solar';
    if (experienceFilter === 'senior') return 'senior';
    return 'list';
  }, [tierFilter, selectedSpecialisms, experienceFilter]);

  const handleQuickTab = (value: string) => {
    switch (value) {
      case 'all':
        clearFilters();
        return;
      case 'verified':
        setTierFilter(tierFilter === 'verified' ? 'all' : 'verified');
        return;
      case 'premium':
        setTierFilter(tierFilter === 'premium' ? 'all' : 'premium');
        return;
      case 'ev':
        toggleSpecialism('EV Charging');
        return;
      case 'solar':
        toggleSpecialism('Solar PV');
        return;
      case 'senior':
        setExperienceFilter(experienceFilter === 'senior' ? 'all' : 'senior');
        return;
    }
  };

  const shortlistedCount = savedCandidates.length;
  const declaredRateCount = workers.filter((w) => w.dayRate != null).length;

  return (
    <PageFrame>
      <PageHero
        eyebrow="Hiring"
        title="Talent Pool"
        description="Browse Elec-ID verified electricians by skill, rate and credentials."
        tone="blue"
        actions={
          <IconButton onClick={handleRefresh} aria-label="Refresh talent pool">
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </IconButton>
        }
      />

      {error && (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
            <p className="text-[13px] text-white">{error}</p>
          </div>
        </div>
      )}

      <StatStrip
        columns={4}
        stats={[
          { label: 'In the pool', value: workers.length, tone: 'blue' },
          { label: 'Verified', value: verifiedCount, tone: 'emerald' },
          { label: 'Shortlisted', value: shortlistedCount, tone: 'yellow' },
          { label: 'Rate declared', value: declaredRateCount, accent: true },
        ]}
      />

      <FilterBar
        tabs={skillTabs}
        activeTab={activeQuickTab}
        onTabChange={handleQuickTab}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search sparkies by name or skill…"
        actions={
          <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
            <SheetTrigger asChild>
              <button
                className="relative h-10 px-4 rounded-full bg-white/[0.06] border border-white/[0.1] text-[12.5px] font-medium text-white inline-flex items-center gap-2 hover:bg-white/[0.1] transition-colors touch-manipulation"
                aria-label="Open filters"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-elec-yellow text-black text-[10px] font-semibold tabular-nums">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[85vh] rounded-t-2xl p-0 overflow-hidden">
              <div className="flex flex-col h-full bg-[hsl(0_0%_8%)]">
                <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
                  <div className="h-1 w-10 rounded-full bg-white/20" />
                </div>
                <div className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <Eyebrow>Hiring</Eyebrow>
                      <div className="mt-1 text-[20px] font-semibold text-white leading-tight">
                        Filters
                      </div>
                    </div>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
                  <div className="space-y-3">
                    <label className={fieldLabelClass}>Elec-ID verification</label>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { value: 'all', label: 'Any', icon: null },
                        { value: 'verified', label: 'Verified+', icon: Shield },
                        { value: 'premium', label: 'Premium', icon: Award },
                      ].map((opt) => {
                        const Icon = opt.icon;
                        const isActive = tierFilter === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setTierFilter(opt.value as TierFilter)}
                            className={`h-11 px-4 rounded-full text-[12.5px] font-medium border touch-manipulation transition-colors inline-flex items-center gap-1.5 ${isActive ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.08]'}`}
                          >
                            {Icon && <Icon className="h-4 w-4" />}
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[11.5px] text-white">
                      Verified = ECS + qualification. Premium = full credentials.
                    </p>
                  </div>

                  <Divider />

                  <div className="space-y-3">
                    <label className={fieldLabelClass}>Specialisms</label>
                    <div className="flex flex-wrap gap-2">
                      {specialisms.map((spec) => {
                        const isActive = selectedSpecialisms.includes(spec);
                        return (
                          <button
                            key={spec}
                            onClick={() => toggleSpecialism(spec)}
                            className={`h-11 px-4 rounded-full text-[12.5px] font-medium border touch-manipulation transition-colors inline-flex items-center gap-1.5 ${isActive ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.08]'}`}
                          >
                            {isActive && <Check className="h-3 w-3" />}
                            {spec}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Divider />

                  <div className="space-y-3">
                    <label className={fieldLabelClass}>Experience (declared on skills)</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'all', label: 'Any' },
                        { value: 'entry', label: 'Entry (0-2 yr)' },
                        { value: 'mid', label: 'Mid (3-7 yr)' },
                        { value: 'senior', label: 'Senior (8+ yr)' },
                      ].map((opt) => {
                        const isActive = experienceFilter === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setExperienceFilter(opt.value as ExperienceLevel)}
                            className={`h-11 px-4 rounded-full text-[12.5px] font-medium border touch-manipulation transition-colors ${isActive ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.08]'}`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Divider />

                  <div className="space-y-3">
                    <label className={fieldLabelClass}>ECS card type</label>
                    <div className="flex flex-wrap gap-2">
                      {ECS_CARD_TYPES.map((card) => {
                        const isActive = selectedEcsCards.includes(card);
                        return (
                          <button
                            key={card}
                            onClick={() =>
                              setSelectedEcsCards((prev) =>
                                prev.includes(card)
                                  ? prev.filter((c) => c !== card)
                                  : [...prev, card]
                              )
                            }
                            className={`h-11 px-4 rounded-full text-[12.5px] font-medium border touch-manipulation transition-colors inline-flex items-center gap-1.5 ${isActive ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.08]'}`}
                          >
                            {isActive && <Check className="h-3 w-3" />}
                            {card}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Divider />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className={fieldLabelClass}>Day rate (declared)</label>
                      <span className="text-[12.5px] font-semibold text-white tabular-nums">
                        £{rateRange[0]} – £{rateRange[1]}
                        {rateRange[1] >= 500 ? '+' : ''}
                      </span>
                    </div>
                    <div className="px-2">
                      <Slider
                        value={rateRange}
                        min={150}
                        max={500}
                        step={25}
                        onValueChange={(value) => setRateRange(value as [number, number])}
                        className="touch-manipulation"
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-white">
                      <span>£150</span>
                      <span>£500+</span>
                    </div>
                    <p className="text-[11.5px] text-white/50">
                      Filtering by rate only shows candidates who declared one.
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 border-t border-white/[0.06] p-4 flex flex-row gap-2">
                  {activeFilterCount > 0 && (
                    <SecondaryButton onClick={clearFilters} fullWidth>
                      Clear
                    </SecondaryButton>
                  )}
                  <PrimaryButton onClick={() => setFilterSheetOpen(false)} fullWidth size="lg">
                    Done
                  </PrimaryButton>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        }
      />

      <TalentFilterChips
        tierFilter={tierFilter}
        selectedSpecialisms={selectedSpecialisms}
        experienceFilter={experienceFilter}
        selectedEcsCards={selectedEcsCards}
        rateRange={rateRange}
        onRemoveTier={() => setTierFilter('all')}
        onRemoveSpecialism={(spec) =>
          setSelectedSpecialisms((prev) => prev.filter((s) => s !== spec))
        }
        onRemoveExperience={() => setExperienceFilter('all')}
        onRemoveEcsCard={(card) => setSelectedEcsCards((prev) => prev.filter((c) => c !== card))}
        onResetRateRange={() => setRateRange([150, 500])}
        onOpenFilters={() => setFilterSheetOpen(true)}
        totalResults={workers.length}
      />

      {isLoading && <LoadingBlocks />}

      {!isLoading && (
        <ListCard>
          <ListCardHeader
            tone="blue"
            title="Available talent"
            meta={<Pill tone="blue">{workers.length}</Pill>}
          />
          {workers.length === 0 ? (
            <div className="px-5 py-10">
              <EmptyState
                title="No candidates match"
                description={
                  activeFilterCount > 0
                    ? 'Try removing a filter or widening the rate range.'
                    : 'No electricians match your search.'
                }
                action={activeFilterCount > 0 ? 'Clear filters' : undefined}
                onAction={activeFilterCount > 0 ? clearFilters : undefined}
              />
            </div>
          ) : (
            <ListBody>
              {workers.map((worker) => {
                const isSaved = savedCandidates.includes(worker.profileId);
                const tierTone = tierToneFor(worker.verificationTier);
                const subtitleParts = [
                  worker.jobTitle || 'Electrician',
                  worker.dayRate != null ? `£${worker.dayRate}/day` : 'Rate on request',
                ];
                if (worker.yearsExperience != null) {
                  subtitleParts.push(`${worker.yearsExperience} yrs`);
                }

                return (
                  <ListRow
                    key={worker.profileId}
                    lead={<Avatar initials={getInitials(worker.name)} />}
                    title={
                      <span className="inline-flex items-center gap-2">
                        <span className="text-white">{worker.name}</span>
                        {isSaved && <Pill tone="amber">Saved</Pill>}
                      </span>
                    }
                    subtitle={subtitleParts.join(' · ')}
                    trailing={
                      <>
                        <Pill tone={tierTone}>{worker.verificationTier}</Pill>
                        {worker.verifiedDocuments.length > 0 && (
                          <Pill tone="emerald">
                            {worker.verifiedDocuments.length} doc
                            {worker.verifiedDocuments.length !== 1 ? 's' : ''} ✓
                          </Pill>
                        )}
                      </>
                    }
                    onClick={() => handleOpenProfile(worker)}
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>
      )}

      <SparkProfileSheet
        open={profileSheetOpen}
        onOpenChange={setProfileSheetOpen}
        worker={selectedWorker}
        isSaved={selectedWorker ? savedCandidates.includes(selectedWorker.profileId) : false}
        onSave={() => selectedWorker && handleSave(selectedWorker)}
        onContact={() => selectedWorker && handleMessage(selectedWorker)}
        onInvite={() => {
          setProfileSheetOpen(false);
          if (selectedWorker) handleInvite(selectedWorker);
        }}
      />

      <MessageDialog
        open={messageDialogOpen}
        onOpenChange={setMessageDialogOpen}
        electrician={
          selectedWorker
            ? {
                id: selectedWorker.profileId,
                elecIdProfileId: selectedWorker.profileId,
                name: selectedWorker.name,
                location: selectedWorker.jobTitle || 'Electrician',
                verificationTier: selectedWorker.verificationTier,
              }
            : null
        }
      />

      <InviteToApplyDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
        electrician={
          selectedWorker
            ? {
                id: selectedWorker.profileId,
                elecIdProfileId: selectedWorker.profileId,
                name: selectedWorker.name,
                location: selectedWorker.jobTitle || 'Electrician',
              }
            : null
        }
      />
    </PageFrame>
  );
}
