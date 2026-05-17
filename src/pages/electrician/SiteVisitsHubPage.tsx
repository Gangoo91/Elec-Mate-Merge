import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Search, X, Loader2 } from 'lucide-react';
import { useSiteVisitStorage, type EnrichedSiteVisit } from '@/hooks/useSiteVisitStorage';
import {
  Eyebrow,
  StatStrip,
  Pill,
  Dot,
  Arrow,
  HubGrid,
  HubCard,
} from '@/components/college/primitives';
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
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

type StatusKey = 'in_progress' | 'completed' | 'scope_sent' | 'signed' | 'post_job';
type FilterTab = 'all' | StatusKey;
type PropertyType = 'residential' | 'commercial' | 'industrial';

const statusPillTone: Record<StatusKey, 'amber' | 'green' | 'blue' | 'emerald' | 'purple'> = {
  in_progress: 'amber',
  completed: 'green',
  scope_sent: 'blue',
  signed: 'emerald',
  post_job: 'purple',
};

const statusLabel: Record<StatusKey, string> = {
  in_progress: 'In progress',
  completed: 'Completed',
  scope_sent: 'Scope sent',
  signed: 'Signed',
  post_job: 'Post-job',
};

const propertyTypeLabel: Record<PropertyType, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  industrial: 'Industrial',
};

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'scope_sent', label: 'Scope sent' },
  { key: 'signed', label: 'Signed' },
];

function relativeDate(dateStr?: string): string {
  if (!dateStr) return 'No activity';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const SiteVisitsHubPage = () => {
  const navigate = useNavigate();
  const { listSiteVisits, deleteSiteVisit, isLoading } = useSiteVisitStorage();
  const [visits, setVisits] = useState<EnrichedSiteVisit[]>([]);
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [propertyFilter, setPropertyFilter] = useState<PropertyType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Quick-create dropdown
  const [showQuickCreateMenu, setShowQuickCreateMenu] = useState(false);
  const quickCreateRef = useRef<HTMLDivElement | null>(null);

  // Bulk select
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  // Resume banner dismiss
  const [resumeDismissed, setResumeDismissed] = useState(false);

  useEffect(() => {
    listSiteVisits().then(setVisits);
  }, [listSiteVisits]);

  const refresh = useCallback(async () => {
    const data = await listSiteVisits();
    setVisits(data);
  }, [listSiteVisits]);

  // Close quick-create on outside click
  useEffect(() => {
    if (!showQuickCreateMenu) return;
    const handler = (e: MouseEvent) => {
      if (!quickCreateRef.current?.contains(e.target as Node)) {
        setShowQuickCreateMenu(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [showQuickCreateMenu]);

  // KPIs
  const kpis = useMemo(() => {
    const byStatus = (s: StatusKey) => visits.filter((v) => v.status === s).length;
    return {
      total: visits.length,
      inProgress: byStatus('in_progress'),
      completed: byStatus('completed'),
      scopeSent: byStatus('scope_sent'),
      signed: byStatus('signed'),
    };
  }, [visits]);

  // Resume candidate: in_progress + updated more than 1hr ago
  const resumeCandidate = useMemo(() => {
    const hourAgo = Date.now() - 60 * 60_000;
    const candidates = visits
      .filter((v) => v.status === 'in_progress')
      .filter((v) => !v.updatedAt || new Date(v.updatedAt).getTime() < hourAgo)
      .sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
    return candidates[0] || null;
  }, [visits]);

  // Filter logic
  const filteredVisits = useMemo(() => {
    return visits.filter((v) => {
      if (filterTab !== 'all' && v.status !== filterTab) return false;
      if (propertyFilter && v.propertyType !== propertyFilter) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matches =
          (v.propertyAddress || '').toLowerCase().includes(q) ||
          (v.customerName || '').toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [visits, filterTab, propertyFilter, searchTerm]);

  // Bulk select handlers
  const enterSelectionMode = (seedId?: string) => {
    setSelectionMode(true);
    setSelectedIds(seedId ? new Set([seedId]) : new Set());
  };
  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedIds(new Set());
  };
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const selectAllVisible = () => {
    setSelectedIds(new Set(filteredVisits.map((v) => v.id)));
  };
  const handleBulkDelete = async () => {
    setIsBulkDeleting(true);
    for (const id of selectedIds) {
      await deleteSiteVisit(id);
    }
    setIsBulkDeleting(false);
    setShowBulkDeleteConfirm(false);
    exitSelectionMode();
    refresh();
  };

  const visitCount = (v: EnrichedSiteVisit) => ({
    rooms: v.rooms?.length ?? 0,
    items: v.rooms?.reduce((s, r) => s + (r.items?.length ?? 0), 0) ?? 0,
  });

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <Helmet>
        <title>Site Visits | Elec-Mate</title>
        <meta
          name="description"
          content="Site visits — pre-site scope, photos, sign-off and invoice in one flow."
        />
      </Helmet>

      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
        <div className="px-4 py-2">
          {showSearch ? (
            <div className="flex h-11 items-center gap-2">
              <div className="relative flex-1">
                {!searchTerm && (
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                )}
                <input
                  placeholder="Search address or customer…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    'h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.06] pr-9 text-[14px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:outline-none',
                    !searchTerm && 'pl-9'
                  )}
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.1] touch-manipulation"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchTerm('');
                }}
                className="px-2 text-xs font-medium text-elec-yellow touch-manipulation"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex h-11 items-center gap-2">
              <button
                onClick={() => navigate('/electrician/business')}
                aria-label="Back"
                className="-ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="min-w-0 flex-1 truncate text-sm font-bold uppercase tracking-wide text-white">
                Site visits
                <span className="ml-1.5 text-xs font-normal normal-case tracking-normal text-white/30">
                  {kpis.total}
                </span>
              </h1>
              <button
                onClick={() => setShowSearch(true)}
                aria-label="Search"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.98]"
              >
                <Search className="h-4 w-4" />
              </button>
              <div ref={quickCreateRef} className="relative">
                <button
                  onClick={() => setShowQuickCreateMenu((v) => !v)}
                  aria-label="New site visit"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-elec-yellow touch-manipulation active:scale-[0.98]"
                >
                  <Plus className="h-4 w-4 text-black" />
                </button>
                <AnimatePresence>
                  {showQuickCreateMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)] shadow-xl"
                    >
                      <button
                        onClick={() => {
                          setShowQuickCreateMenu(false);
                          navigate('/electrician/site-visit/new?phase=pre');
                        }}
                        className="block w-full px-4 py-3 text-left text-[13px] text-white transition-colors hover:bg-white/[0.04] touch-manipulation"
                      >
                        <div className="font-medium">New pre-site visit</div>
                        <div className="text-[11px] text-white/55">Scope · photos · quote</div>
                      </button>
                      <button
                        onClick={() => {
                          setShowQuickCreateMenu(false);
                          navigate('/electrician/site-visit/new?phase=post');
                        }}
                        className="block w-full border-t border-white/[0.06] px-4 py-3 text-left text-[13px] text-white transition-colors hover:bg-white/[0.04] touch-manipulation"
                      >
                        <div className="font-medium">New post-site visit</div>
                        <div className="text-[11px] text-white/55">After photos · sign-off · invoice</div>
                      </button>
                      {visits.some((v) => v.status === 'in_progress') && (
                        <button
                          onClick={() => {
                            setShowQuickCreateMenu(false);
                            const latest = visits.find((v) => v.status === 'in_progress');
                            if (latest) navigate(`/electrician/site-visit/${latest.id}`);
                          }}
                          className="block w-full border-t border-white/[0.06] px-4 py-3 text-left text-[13px] text-elec-yellow transition-colors hover:bg-elec-yellow/[0.06] touch-manipulation"
                        >
                          <div className="font-medium">Resume latest</div>
                          <div className="text-[11px] text-white/55">
                            In progress · {visits.filter((v) => v.status === 'in_progress').length}
                          </div>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
        <div className="h-px bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </header>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl space-y-6 px-4 py-5 sm:space-y-8 sm:py-6"
      >
        {/* Editorial intro */}
        {visits.length > 0 && (
          <motion.div variants={itemVariants}>
            <Eyebrow>BUSINESS HUB · SITE VISITS</Eyebrow>
            <h2 className="mt-1.5 text-[28px] font-semibold leading-tight tracking-tight text-white sm:text-[34px]">
              Every job, captured.
            </h2>
            <p className="mt-2 max-w-[44rem] text-[13px] leading-relaxed text-white/65 sm:text-[14px]">
              Walk the site, capture the scope, generate the quote. Come back to finish — sign-off,
              after-photos and invoice without leaving the app.
            </p>
          </motion.div>
        )}

        {/* StatStrip */}
        {visits.length > 0 && (
          <motion.div variants={itemVariants}>
            <StatStrip
              columns={5}
              stats={[
                { label: 'Total', value: kpis.total, accent: true },
                { label: 'In progress', value: kpis.inProgress, tone: 'amber' },
                { label: 'Completed', value: kpis.completed, tone: 'green' },
                { label: 'Scope sent', value: kpis.scopeSent, tone: 'blue' },
                { label: 'Signed', value: kpis.signed, tone: 'emerald' },
              ]}
            />
          </motion.div>
        )}

        {/* Resume banner */}
        {!resumeDismissed && !selectionMode && resumeCandidate && (
          <motion.div variants={itemVariants}>
            <div className="flex flex-col gap-3 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/[0.08] to-transparent p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-start gap-3">
                <Dot tone="amber" className="mt-[7px] !h-2 !w-2" />
                <div className="min-w-0">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-400">
                    Resume in progress
                  </div>
                  <div className="mt-1 truncate text-[14px] font-semibold text-white">
                    {resumeCandidate.propertyAddress || 'Untitled visit'}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-white/65">
                    Last touched {relativeDate(resumeCandidate.updatedAt)} ·{' '}
                    {resumeCandidate.customerName || 'No customer'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/electrician/site-visit/${resumeCandidate.id}`)}
                  className="flex h-9 items-center rounded-full bg-elec-yellow px-3.5 text-[12px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
                >
                  Resume →
                </button>
                <button
                  onClick={() => setResumeDismissed(true)}
                  className="flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Entry cards — editorial HubGrid */}
        <motion.section variants={itemVariants}>
          <HubGrid columns={2}>
            <HubCard
              number="01"
              eyebrow="PRE-SITE"
              title="Capture the scope."
              description="Walk the site, room-by-room. Photos, items, AI prompts, scope of works, quote."
              meta="Pre-photos · Rooms · AI scope"
              tone="emerald"
              size="md"
              cta="Start →"
              onClick={() => navigate('/electrician/site-visit/new?phase=pre')}
            />
            <HubCard
              number="02"
              eyebrow="POST-SITE"
              title="Finish the job."
              description="After-photos, client signature, completion PDF, invoice raise — all in one flow."
              meta="After-photos · Sign-off · Invoice"
              tone="blue"
              size="md"
              cta="Continue →"
              onClick={() => {
                // If there's a sensible candidate (accepted quote), open it; else go to hub list
                const candidate = visits.find(
                  (v) =>
                    ['completed', 'scope_sent', 'signed'].includes(v.status) &&
                    v.quoteId &&
                    v.quoteAcceptanceStatus === 'accepted'
                );
                if (candidate) {
                  navigate(`/electrician/site-visit/${candidate.id}?tab=post-job`);
                } else {
                  // Scroll the user to the list — they'll pick manually
                  document
                    .getElementById('visit-list')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            />
          </HubGrid>
        </motion.section>

        {/* FilterBar */}
        {!showSearch && visits.length > 0 && (
          <motion.section variants={itemVariants} className="space-y-3" id="visit-list">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-[hsl(0_0%_12%)] p-1">
                {filterTabs.map((tab) => {
                  const count =
                    tab.key === 'all'
                      ? visits.length
                      : visits.filter((v) => v.status === tab.key).length;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setFilterTab(tab.key)}
                      className={cn(
                        'h-8 whitespace-nowrap rounded-full px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation',
                        filterTab === tab.key
                          ? 'bg-elec-yellow text-black'
                          : 'text-white hover:bg-white/[0.04]'
                      )}
                    >
                      {tab.label}
                      <span
                        className={cn(
                          'ml-1.5 tabular-nums',
                          filterTab === tab.key ? 'text-black/55' : 'text-white/55'
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Property type filter chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
                Property
              </span>
              {(['residential', 'commercial', 'industrial'] as PropertyType[]).map((pt) => {
                const active = propertyFilter === pt;
                const count = visits.filter((v) => v.propertyType === pt).length;
                if (count === 0) return null;
                return (
                  <button
                    key={pt}
                    onClick={() => setPropertyFilter(active ? null : pt)}
                    className={cn(
                      'inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[11.5px] font-medium transition-colors touch-manipulation',
                      active
                        ? 'border-elec-yellow/40 bg-elec-yellow/[0.12] text-elec-yellow'
                        : 'border-white/[0.08] bg-white/[0.04] text-white/75 hover:border-elec-yellow/30 hover:bg-elec-yellow/[0.04] hover:text-elec-yellow'
                    )}
                  >
                    {propertyTypeLabel[pt]}
                    <span
                      className={cn(
                        'tabular-nums',
                        active ? 'text-elec-yellow/70' : 'text-white/45'
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
              {propertyFilter && (
                <button
                  onClick={() => setPropertyFilter(null)}
                  className="text-[11.5px] font-medium text-white/55 transition-colors hover:text-white touch-manipulation"
                >
                  Clear ✕
                </button>
              )}
            </div>

            {/* Secondary action row */}
            <div className="flex flex-wrap items-center gap-2 text-[12px]">
              {!selectionMode ? (
                <button
                  onClick={() => enterSelectionMode()}
                  className="text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                >
                  Select multiple →
                </button>
              ) : (
                <>
                  <button
                    onClick={selectAllVisible}
                    className="text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                  >
                    Select all ({filteredVisits.length})
                  </button>
                  <span className="text-white/30">·</span>
                  <button
                    onClick={exitSelectionMode}
                    className="text-white/65 hover:text-white transition-colors touch-manipulation"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </motion.section>
        )}

        {/* Visit list */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
          </div>
        ) : visits.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] px-6 py-12 text-center"
          >
            <h3 className="text-[18px] font-semibold text-white">No site visits yet</h3>
            <p className="mt-2 text-[13px] text-white/65">
              Start your first site visit to capture scope and generate quotes on the spot.
            </p>
            <button
              onClick={() => navigate('/electrician/site-visit/new?phase=pre')}
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
            >
              <Plus className="h-4 w-4" /> New site visit
            </button>
          </motion.div>
        ) : filteredVisits.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] px-6 py-10 text-center"
          >
            <p className="text-[15px] font-medium text-white">No matches</p>
            <p className="mt-1 text-[12.5px] text-white/55">
              Try clearing filters or a different search term.
            </p>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
            <AnimatePresence mode="popLayout">
              {filteredVisits.map((visit) => {
                const sc = statusPillTone[visit.status as StatusKey] || 'amber';
                const sLabel = statusLabel[visit.status as StatusKey] || visit.status;
                const counts = visitCount(visit);
                const isSelected = selectedIds.has(visit.id);
                const longPressTimer = { current: null as number | null };
                return (
                  <motion.div
                    key={visit.id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        if (selectionMode) toggleSelect(visit.id);
                        else navigate(`/electrician/site-visit/${visit.id}`);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (selectionMode) toggleSelect(visit.id);
                          else navigate(`/electrician/site-visit/${visit.id}`);
                        }
                      }}
                      onTouchStart={() => {
                        longPressTimer.current = window.setTimeout(() => {
                          enterSelectionMode(visit.id);
                          longPressTimer.current = null;
                        }, 500);
                      }}
                      onTouchEnd={() => {
                        if (longPressTimer.current) {
                          window.clearTimeout(longPressTimer.current);
                          longPressTimer.current = null;
                        }
                      }}
                      className={cn(
                        'group relative cursor-pointer overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 active:scale-[0.995] touch-manipulation sm:p-5',
                        isSelected
                          ? 'border-elec-yellow/50 bg-elec-yellow/[0.06]'
                          : 'border-white/[0.08] bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)]'
                      )}
                    >
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/40 to-elec-yellow/0 opacity-70"
                      />

                      <div className="flex items-start gap-3">
                        {selectionMode && (
                          <div
                            className={cn(
                              'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
                              isSelected
                                ? 'border-elec-yellow bg-elec-yellow'
                                : 'border-white/30 bg-transparent'
                            )}
                          >
                            {isSelected && (
                              <svg className="h-3 w-3 text-black" viewBox="0 0 16 16" fill="none">
                                <path
                                  d="M3 8.5l3 3 6-7"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-[15px] font-semibold leading-tight text-white sm:text-[16px]">
                            {visit.propertyAddress || 'Untitled visit'}
                          </h3>
                          <p className="mt-1 truncate text-[12px] text-white/65">
                            {visit.customerName || 'No customer'} · {relativeDate(visit.updatedAt)}
                          </p>
                          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                            {counts.rooms > 0 && (
                              <span className="inline-flex h-5 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2 text-[10.5px] font-medium text-white/75">
                                {counts.rooms} room{counts.rooms !== 1 ? 's' : ''}
                              </span>
                            )}
                            {counts.items > 0 && (
                              <span className="inline-flex h-5 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2 text-[10.5px] font-medium text-white/75">
                                {counts.items} item{counts.items !== 1 ? 's' : ''}
                              </span>
                            )}
                            {visit.propertyType && (
                              <span className="inline-flex h-5 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2 text-[10.5px] font-medium text-white/75">
                                {propertyTypeLabel[visit.propertyType as PropertyType]}
                              </span>
                            )}
                            {visit.quoteAcceptanceStatus === 'accepted' && (
                              <Pill tone="emerald">Quote accepted</Pill>
                            )}
                          </div>
                        </div>

                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <Pill tone={sc}>
                            <Dot tone={sc} className="mr-1.5" />
                            {sLabel}
                          </Pill>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
                        <span className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-white/55">
                          Tap to open
                        </span>
                        <span className="ml-1 group-hover:translate-x-0.5 transition-transform">
                          <Arrow />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.main>

      {/* Bulk action floating bar */}
      <AnimatePresence>
        {selectionMode && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3"
          >
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] px-3 py-2.5 shadow-2xl backdrop-blur-xl sm:px-4 sm:py-3">
              <div className="flex items-center gap-2">
                <Pill tone="yellow">
                  <Dot tone="yellow" className="mr-1.5" />
                  {selectedIds.size} selected
                </Pill>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setShowBulkDeleteConfirm(true)}
                  disabled={selectedIds.size === 0}
                  className="flex h-9 items-center rounded-full border border-red-500/25 bg-red-500/[0.12] px-3 text-[12px] font-medium text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-40 touch-manipulation"
                >
                  Delete
                </button>
                <button
                  onClick={exitSelectionMode}
                  className="flex h-9 items-center rounded-full bg-elec-yellow px-4 text-[12px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk delete confirm */}
      <AlertDialog open={showBulkDeleteConfirm} onOpenChange={setShowBulkDeleteConfirm}>
        <AlertDialogContent className="max-w-[90vw] rounded-2xl border border-white/[0.08] bg-[#111114] shadow-2xl sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-white">
              Delete {selectedIds.size} site visit{selectedIds.size === 1 ? '' : 's'}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-white/65">
              This will permanently remove the selected visits and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={isBulkDeleting}
              className="h-11 w-full touch-manipulation rounded-xl border border-red-500/25 bg-red-500/15 font-medium text-red-400 transition-all hover:bg-red-500/25 active:scale-[0.98] disabled:opacity-50"
            >
              {isBulkDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                `Delete ${selectedIds.size}`
              )}
            </AlertDialogAction>
            <AlertDialogCancel className="mt-0 h-11 w-full touch-manipulation rounded-xl border border-white/[0.08] bg-white/[0.04] font-medium text-white transition-all hover:bg-white/[0.08] active:scale-[0.98]">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export default SiteVisitsHubPage;
