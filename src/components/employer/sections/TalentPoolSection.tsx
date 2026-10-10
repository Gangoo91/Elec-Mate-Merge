import { useState, useMemo, useCallback, useEffect } from 'react';
import { getEcsCardLabel } from '@/data/uk-electrician-constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { getMyInvitations } from '@/services/conversationService';
import FormSheet from '@/components/forms/FormSheet';
import { cn } from '@/lib/utils';
import { SparkProfileSheet } from '@/components/employer/SparkProfileSheet';
import { MessageDialog } from '@/components/employer/talent-pool/MessageDialog';
import { InviteToApplyDialog } from '@/components/employer/talent-pool/InviteToApplyDialog';
import { TalentFilterChips } from '@/components/employer/talent-pool/TalentFilterChips';
import { useNavigate } from 'react-router-dom';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { TALENT_POOL_HELP } from '@/components/employer/help/people';
import {
  PageFrame,
  PageHero,
  StatStrip,
  Avatar,
  LoadingBlocks,
  fieldLabelClass,
} from '@/components/employer/editorial';
import {
  frameClass,
  twoColClass,
  colClass,
  panel,
  PanelTitle,
  Row,
  RowList,
  rowsClass,
  StatusPill,
  PlainEmpty,
  Segments,
  SearchField,
  ToolButton,
  ToolBadge,
  HeroActions,
  rowBtnPrimary,
  rowBtnSecondary,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { SlidersHorizontal, Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useTalentPool, type TalentPoolWorker, type ExperienceLevel } from '@/hooks/useTalentPool';
import { Slider } from '@/components/ui/slider';

/* ==========================================================================
   TalentPoolSection — browse Elec-ID candidates. Every signal on screen is
   real: declared rates, declared skill years, admin-verified documents.
   ========================================================================== */

type TierFilter = 'all' | 'verified' | 'premium';

// Matches live Elec-ID data — card colours stored on profiles, plus
// 'Apprentice' which the hook also matches against declared job titles
// (apprentices rarely record a card type).
const ECS_CARD_TYPES = ['Gold', 'Experienced Worker', 'Trainee', 'Apprentice', 'Labourer'];

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

export function TalentPoolSection() {
  const navigate = useNavigate();
  // Invite outcomes — which invitations converted (viewed/applied/declined)
  const { data: sentInvitations = [] } = useQuery({
    queryKey: ['my-vacancy-invitations'],
    queryFn: getMyInvitations,
    staleTime: 60_000,
  });
  const invitationsByProfile = useMemo(() => {
    // Terminal outcomes (applied/declined) beat a newer 'pending' — re-inviting
    // someone who already applied must not hide the conversion signal. Expired
    // invites carry no signal at all.
    const rank: Record<string, number> = { applied: 3, declined: 2, viewed: 1, pending: 0 };
    const byProfile = new Map<string, string>();
    for (const inv of sentInvitations) {
      if (inv.status === 'expired') continue;
      const current = byProfile.get(inv.electrician_profile_id);
      if (current === undefined || (rank[inv.status] ?? 0) > (rank[current] ?? 0)) {
        byProfile.set(inv.electrician_profile_id, inv.status);
      }
    }
    return byProfile;
  }, [sentInvitations]);

  // ELE-1958: shortlist is per firm (employer_talent_shortlist), shared with
  // co-admins. Anything saved on this device under the old localStorage key is
  // moved up once, then the key is cleared.
  const queryClient = useQueryClient();
  const { data: savedCandidates = [] } = useQuery({
    queryKey: ['talent-shortlist'],
    queryFn: async (): Promise<string[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      const employerId = (await getActingEmployerId(user.id)) ?? user.id;
      try {
        const legacy: string[] = JSON.parse(
          localStorage.getItem('talent_saved_candidates') || '[]'
        );
        if (legacy.length > 0) {
          // One row at a time: the server refuses anyone no longer in the pool
          // (they withdrew consent) and an existing row is a duplicate — either
          // way that row is skipped, the rest still land.
          for (const profile_id of legacy) {
            await supabase
              .from('employer_talent_shortlist')
              .insert({ employer_id: employerId, profile_id });
          }
          localStorage.removeItem('talent_saved_candidates');
        }
      } catch {
        /* old device list unreadable — ignore */
      }
      const { data, error } = await supabase
        .from('employer_talent_shortlist')
        .select('profile_id')
        .eq('employer_id', employerId);
      if (error) throw error;
      return ((data as { profile_id: string }[] | null) ?? []).map((r) => r.profile_id);
    },
  });
  const toggleSaveCandidate = async (id: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const employerId = (await getActingEmployerId(user.id)) ?? user.id;
    const isSaved = savedCandidates.includes(id);
    queryClient.setQueryData<string[]>(['talent-shortlist'], (prev = []) =>
      isSaved ? prev.filter((x) => x !== id) : [...prev, id]
    );
    const { error } = isSaved
      ? await supabase
          .from('employer_talent_shortlist')
          .delete()
          .eq('employer_id', employerId)
          .eq('profile_id', id)
      : await supabase
          .from('employer_talent_shortlist')
          .insert({ employer_id: employerId, profile_id: id });
    if (error) {
      queryClient.invalidateQueries({ queryKey: ['talent-shortlist'] });
      toast({ title: 'Shortlist not updated', description: error.message, variant: 'destructive' });
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<TalentPoolWorker | null>(null);

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

  // Paging: the pool can run to 100+ cards (≈18,000px on a phone). Show
  // PAGE_SIZE at a time; filters and search still apply to the whole set,
  // and any change to them starts again from the first page.
  const PAGE_SIZE = 20;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filterKey = [
    searchQuery,
    tierFilter,
    selectedSpecialisms.join(','),
    experienceFilter,
    selectedEcsCards.join(','),
    rateRange.join('-'),
  ].join('|');
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filterKey]);
  const visibleWorkers = workers.slice(0, visibleCount);
  const remaining = workers.length - visibleWorkers.length;

  const handleRefresh = useCallback(async () => {
    await refetch();
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
    void toggleSaveCandidate(worker.profileId);
    toast({
      title: wasSaved ? 'Removed from shortlist' : 'Added to shortlist',
      description: wasSaved
        ? `${worker.name} removed from your firm's shortlist.`
        : `${worker.name} added. Everyone managing the firm can see it.`,
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

  // Live "Before you start" line for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] =
    !isLoading && workers.length === 0 && activeFilterCount === 0 && !searchQuery
      ? [
          {
            text: 'Nobody has switched on “Let firms find me” yet. Post a vacancy so people can apply.',
            fixLabel: 'Post a vacancy',
            onFix: () => navigate('/employer?section=vacancies'),
          },
        ]
      : [];
  const declaredRateCount = workers.filter((w) => w.dayRate != null).length;

  const chip = (on: boolean) =>
    cn(
      'h-11 shrink-0 whitespace-nowrap rounded-full border px-3.5 text-[13px] font-semibold touch-manipulation transition-colors',
      on
        ? 'border-elec-yellow bg-elec-yellow text-black'
        : 'border-white/[0.14] bg-white/[0.04] text-white hover:bg-white/[0.08]'
    );

  const ecsText = (worker: TalentPoolWorker) => {
    // Stored values are mixed-case colours or role slugs: resolve via the
    // canonical label map, never leak 'none'
    if (!worker.ecsCardType || worker.ecsCardType.toLowerCase() === 'none') return null;
    const label = getEcsCardLabel(worker.ecsCardType);
    return /^ECS\b/.test(label) ? label : `${label} ECS`;
  };

  const outcomePill = (profileId: string) => {
    // Invite outcome: did the invitation convert?
    const inv = invitationsByProfile.get(profileId);
    if (!inv) return null;
    return inv === 'applied' ? (
      <StatusPill tone="green">Applied</StatusPill>
    ) : inv === 'viewed' ? (
      <StatusPill>Invite seen</StatusPill>
    ) : inv === 'declined' ? (
      <StatusPill tone="red">Declined</StatusPill>
    ) : (
      <StatusPill>Invited</StatusPill>
    );
  };

  const shortlisted = workers.filter((w) => savedCandidates.includes(w.profileId));
  const liveLine =
    workers.length === 0 && activeFilterCount === 0 && !searchQuery
      ? 'Nobody has switched on Let firms find me yet.'
      : activeFilterCount > 0 || searchQuery
        ? `${plural(workers.length, 'person', 'people')} match your filters, ${shortlistedCount} on your shortlist.`
        : `${plural(workers.length, 'person', 'people')} available, ${verifiedCount} verified, ${shortlistedCount} on your shortlist.`;

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Talent pool"
        description={liveLine}
        actions={
          <HeroActions>
            <PageHelpButton
              help={TALENT_POOL_HELP}
              blockers={helpBlockers}
              askContext={{ page: 'talentpool', tab: activeQuickTab }}
            />
          </HeroActions>
        }
      />

      <HowItWorks
        help={TALENT_POOL_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'talentpool', tab: activeQuickTab }}
      />

      {error && <PlainEmpty text={error} action="Try again" onAction={handleRefresh} />}

      <StatStrip
        columns={4}
        stats={[
          { label: 'In the pool', value: workers.length, sub: 'Chose to be found' },
          { label: 'Verified', value: verifiedCount, sub: 'ECS and a qualification' },
          {
            label: 'Shortlisted',
            value: shortlistedCount,
            sub: 'Shared with your admins',
          },
          { label: 'Rate declared', value: declaredRateCount, sub: 'Say what they charge' },
        ]}
      />

      <div className={twoColClass}>
        <div className={colClass}>
          <div data-help="talentpool.tabs" className="space-y-3">
            <Segments
              wrap
              items={skillTabs}
              value={activeQuickTab === 'list' ? 'all' : activeQuickTab}
              onChange={handleQuickTab}
            />
            <div className="flex gap-2">
              <SearchField
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Name, skill or area"
                className="flex-1"
              />
              <ToolButton
                label="Filters"
                icon={<SlidersHorizontal className="h-4 w-4" />}
                onClick={() => setFilterSheetOpen(true)}
              >
                <ToolBadge count={activeFilterCount} />
              </ToolButton>
            </div>
            <TalentFilterChips
              tierFilter={tierFilter}
              selectedSpecialisms={selectedSpecialisms}
              experienceFilter={experienceFilter}
              selectedEcsCards={selectedEcsCards}
              rateRange={rateRange}
              onRemoveTier={() => setTierFilter('all')}
              onRemoveSpecialism={(spec) =>
                setSelectedSpecialisms((prev) => prev.filter((x) => x !== spec))
              }
              onRemoveExperience={() => setExperienceFilter('all')}
              onRemoveEcsCard={(card) =>
                setSelectedEcsCards((prev) => prev.filter((c) => c !== card))
              }
              onResetRateRange={() => setRateRange([150, 500])}
              onOpenFilters={() => setFilterSheetOpen(true)}
              totalResults={workers.length}
            />
          </div>

          {isLoading ? (
            <LoadingBlocks />
          ) : workers.length === 0 ? (
            <PlainEmpty
              text={
                activeFilterCount > 0
                  ? 'Nobody matches. Remove a filter or widen the rate range.'
                  : searchQuery
                    ? 'No electricians match your search.'
                    : 'Electricians only appear here after they switch on Let firms find me in their Elec-ID. Post a vacancy so people can apply in the meantime.'
              }
              action={activeFilterCount > 0 ? 'Clear filters' : undefined}
              onAction={activeFilterCount > 0 ? clearFilters : undefined}
            />
          ) : (
            <section>
              <PanelTitle title="Available" meta={`${workers.length}`} />
              <div className={cn(panel, 'overflow-hidden')} data-help="talentpool.list">
                <div className={rowsClass}>
                  {visibleWorkers.map((worker) => {
                    const isSaved = savedCandidates.includes(worker.profileId);
                    const facts = [
                      worker.dayRate != null ? `£${worker.dayRate} a day` : 'Rate on request',
                      worker.yearsExperience != null ? `${worker.yearsExperience} yrs` : null,
                      ecsText(worker),
                      worker.verifiedDocuments.length > 0
                        ? `${worker.verifiedDocuments.length} checked`
                        : null,
                    ].filter(Boolean);
                    const tier =
                      worker.verificationTier === 'premium'
                        ? 'Premium'
                        : worker.verificationTier === 'verified'
                          ? 'Verified'
                          : null;
                    return (
                      <div
                        key={worker.profileId}
                        className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-5"
                      >
                        <button
                          type="button"
                          onClick={() => handleOpenProfile(worker)}
                          className="flex min-w-0 flex-1 items-center gap-3 text-left touch-manipulation"
                          aria-label={`View ${worker.name}`}
                        >
                          <Avatar
                            size="md"
                            photo={worker.photoUrl}
                            initials={getInitials(worker.name)}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[15px] font-semibold leading-snug text-white">
                              {worker.name}
                            </span>
                            <span className="mt-0.5 block truncate text-[13px] text-white">
                              {worker.jobTitle || 'Electrician'}
                              {worker.area ? ` · ${worker.area}` : ''}
                            </span>
                            <span className="mt-0.5 block truncate text-[12.5px] text-white">
                              {facts.join(' · ')}
                              {worker.specialisms.length > 0
                                ? ` · ${worker.specialisms.slice(0, 3).join(', ')}`
                                : ''}
                            </span>
                          </span>
                          <span className="shrink-0">
                            {outcomePill(worker.profileId) ??
                              (tier ? <StatusPill tone="green">{tier}</StatusPill> : null)}
                          </span>
                        </button>
                        <div className="flex shrink-0 items-center gap-2 pl-[52px] sm:pl-0">
                          <button
                            type="button"
                            onClick={() => handleMessage(worker)}
                            className={cn(rowBtnSecondary, 'flex-1 sm:flex-none')}
                          >
                            Message
                          </button>
                          <button
                            type="button"
                            onClick={() => handleInvite(worker)}
                            className={cn(rowBtnSecondary, 'flex-1 sm:flex-none')}
                          >
                            Invite
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSave(worker)}
                            aria-pressed={isSaved}
                            aria-label={isSaved ? 'Remove from shortlist' : 'Add to shortlist'}
                            title={isSaved ? 'On your shortlist' : 'Add to shortlist'}
                            className={cn(
                              'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border touch-manipulation transition-colors',
                              isSaved
                                ? 'border-elec-yellow bg-elec-yellow text-black'
                                : 'border-white/[0.14] text-white hover:bg-white/[0.06]'
                            )}
                          >
                            {isSaved ? (
                              <BookmarkCheck className="h-4 w-4" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {workers.length > PAGE_SIZE && (
                  <div className="flex flex-col gap-3 border-t border-white/[0.07] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <p className="text-[13px] tabular-nums text-white" aria-live="polite">
                      Showing {visibleWorkers.length} of {workers.length}
                    </p>
                    {remaining > 0 && (
                      <button
                        type="button"
                        onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                        className={cn(rowBtnSecondary, 'w-full sm:w-auto')}
                      >
                        Show {Math.min(PAGE_SIZE, remaining)} more
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        <div className={colClass}>
          <section>
            <PanelTitle
              title="Your shortlist"
              meta={shortlistedCount > 0 ? `${shortlistedCount}` : undefined}
            />
            {shortlisted.length === 0 ? (
              <PlainEmpty
                stacked
                text="Tap the bookmark on anyone to keep them here. Everyone managing the firm sees the same shortlist."
              />
            ) : (
              <RowList>
                {shortlisted.map((w) => (
                  <Row
                    key={w.profileId}
                    title={w.name}
                    detail={`${w.jobTitle || 'Electrician'}${w.area ? ` · ${w.area}` : ''}`}
                    trailing={outcomePill(w.profileId) ?? undefined}
                    onClick={() => handleOpenProfile(w)}
                  />
                ))}
              </RowList>
            )}
          </section>

          <section>
            <PanelTitle title="How contact works" />
            <div className={cn(panel, 'px-4 py-3 text-[13px] leading-relaxed text-white sm:px-5')}>
              Everyone here chose to be found. You see their first name, area and credentials. Their
              phone and email stay private: message them, or invite them to apply for one of your
              live vacancies.
            </div>
          </section>
        </div>
      </div>

      <FormSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        width="wide"
        title="Filters"
        description="Narrow the pool. Every value is what the person declared or had checked."
        headerTrailing={
          activeFilterCount > 0 ? (
            <button
              type="button"
              onClick={clearFilters}
              className="mr-8 h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              Clear all
            </button>
          ) : undefined
        }
        footer={
          <button
            type="button"
            onClick={() => setFilterSheetOpen(false)}
            className={cn(rowBtnPrimary, 'h-12 w-full text-[15px]')}
          >
            Show {plural(workers.length, 'match', 'matches')}
          </button>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <section className="space-y-2">
            <p className={fieldLabelClass}>Elec-ID verification</p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'Any' },
                { value: 'verified', label: 'Verified+' },
                { value: 'premium', label: 'Premium' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTierFilter(opt.value as TierFilter)}
                  className={chip(tierFilter === opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-[12.5px] text-white">
              Verified means an ECS card and a qualification. Premium means full credentials.
            </p>
          </section>

          <section className="space-y-2">
            <p className={fieldLabelClass}>Experience (declared on skills)</p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'Any' },
                { value: 'entry', label: 'Entry (0 to 2 yrs)' },
                { value: 'mid', label: 'Mid (3 to 7 yrs)' },
                { value: 'senior', label: 'Senior (8+ yrs)' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setExperienceFilter(opt.value as ExperienceLevel)}
                  className={chip(experienceFilter === opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <p className={fieldLabelClass}>Specialisms</p>
            <div className="flex flex-wrap gap-2">
              {specialisms.map((spec) => (
                <button
                  key={spec}
                  type="button"
                  onClick={() => toggleSpecialism(spec)}
                  aria-pressed={selectedSpecialisms.includes(spec)}
                  className={chip(selectedSpecialisms.includes(spec))}
                >
                  {spec}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <p className={fieldLabelClass}>ECS card type</p>
            <div className="flex flex-wrap gap-2">
              {ECS_CARD_TYPES.map((card) => (
                <button
                  key={card}
                  type="button"
                  aria-pressed={selectedEcsCards.includes(card)}
                  onClick={() =>
                    setSelectedEcsCards((prev) =>
                      prev.includes(card) ? prev.filter((c) => c !== card) : [...prev, card]
                    )
                  }
                  className={chip(selectedEcsCards.includes(card))}
                >
                  {card}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <p className={fieldLabelClass}>Day rate (declared)</p>
              <span className="text-[13px] font-semibold tabular-nums text-white">
                £{rateRange[0]} to £{rateRange[1]}
                {rateRange[1] >= 500 ? '+' : ''}
              </span>
            </div>
            <div className="px-2 lg:max-w-xl">
              <Slider
                value={rateRange}
                min={150}
                max={500}
                step={25}
                onValueChange={(value) => setRateRange(value as [number, number])}
                className="touch-manipulation"
              />
            </div>
            <p className="text-[12.5px] text-white">
              Filtering by rate only shows people who declared one.
            </p>
          </section>
        </div>
      </FormSheet>

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
                location: selectedWorker.area || selectedWorker.jobTitle || 'Electrician',
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
                location: selectedWorker.area || selectedWorker.jobTitle || 'Electrician',
              }
            : null
        }
      />
    </PageFrame>
  );
}
