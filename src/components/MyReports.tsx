import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  X,
  Loader2,
  Users,
  SlidersHorizontal,
} from 'lucide-react';
import { SortDropdown, SortOption } from './reports/SortDropdown';
import { BulkActionsBar } from './reports/BulkActionsBar';
import { reportCloud, CloudReport, ReportsResponse, LibraryScope } from '@/utils/reportCloud';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { openOrDownloadPdf } from '@/utils/pdf-download';
// ELE-1443 — needed at render time to decide whether to OFFER the duplicate
// action. The heavy duplicateCertificate() stays lazily imported below.
import { isDuplicable } from '@/utils/duplicateCertificate';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { CertificateImportDialog } from '@/components/certificates/CertificateImportDialog';
import { ExportToEICDialog } from '@/components/ExportToEICDialog';
import { ExportToEICRDialog } from '@/components/ExportToEICRDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useCustomers } from '@/hooks/useCustomers';
import { linkCustomerToReport, unlinkCustomerFromReport } from '@/utils/customerHelper';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
// SegmentedControl removed - replaced with scrollable filter chips
import { CertificateCard, CertificateData } from './certificates/CertificateCard';
import { CertificateActionSheet } from './certificates/CertificateActionSheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  useQsTeamContext,
  useQsReviewStatuses,
  QS_REVIEWABLE_TYPES,
  type QsReviewableType,
} from '@/hooks/useQsReview';
import { motion, AnimatePresence } from 'framer-motion';
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

interface MyReportsProps {
  onBack: () => void;
  onNavigate: (section: string) => void;
  onEditReport: (reportId: string, reportType?: string) => void;
}

type StatusFilter = 'all' | 'draft' | 'in-progress' | 'completed';
type TypeFilter = 'all' | string;

// Cert types grouped by category for the filter row. Core types always show;
// the rest only appear once the user has at least one of that type (keeps the
// row short and relevant instead of a wall of 17 chips).
const CORE_TYPES = ['eicr', 'eic', 'minor-works'];
const TYPE_GROUPS: { label: string; types: { value: string; label: string }[] }[] = [
  {
    label: 'Core',
    types: [
      { value: 'eicr', label: 'EICR' },
      { value: 'eic', label: 'EIC' },
      { value: 'minor-works', label: 'MW' },
    ],
  },
  {
    label: 'Fire',
    types: [
      { value: 'fire-alarm', label: 'FA G1' },
      { value: 'fire-alarm-commissioning', label: 'FA G2' },
      { value: 'fire-alarm-inspection', label: 'FA G7' },
      { value: 'fire-alarm-modification', label: 'FA G4' },
    ],
  },
  {
    label: 'Renewables',
    types: [
      { value: 'ev-charging', label: 'EV' },
      { value: 'solar-pv', label: 'Solar PV' },
      { value: 'bess', label: 'BESS' },
      { value: 'heat-pump', label: 'Heat Pump' },
    ],
  },
  {
    label: 'Other',
    types: [
      { value: 'emergency-lighting', label: 'EM LTG' },
      { value: 'pat-testing', label: 'PAT' },
      { value: 'smoke-co-alarm', label: 'Smoke/CO' },
      /*
       * The two condition-and-maintenance reports. Both were shipped without an
       * entry here, so once a user had a few of them there was no way to filter
       * them out of the list — and no label for the active-filter chip either.
       *
       * Safe to add unconditionally: the filter above hides any non-core type
       * with a zero count, so neither chip appears until the user has one.
       */
      { value: 'visual-condition', label: 'Visual' },
      { value: 'routine-inspection', label: 'Routine' },
      { value: 'pre-purchase-survey', label: 'Survey' },
    ],
  },
  {
    label: 'Notices',
    types: [
      { value: 'danger-notice', label: 'Danger' },
      { value: 'isolation-cert', label: 'Isolation' },
      { value: 'permit-to-work', label: 'Permit' },
    ],
  },
];

/** Flat value → short label lookup, for naming an active type filter. */
const TYPE_LABELS: Record<string, string> = Object.fromEntries(
  TYPE_GROUPS.flatMap((g) => g.types.map((t) => [t.value, t.label]))
);

const DATE_PRESETS = [
  { value: 'all' as const, label: 'All time' },
  { value: '30d' as const, label: 'Last 30 days' },
  { value: '12m' as const, label: 'Last 12 months' },
  { value: 'custom' as const, label: 'Custom' },
];

const STATUS_LABELS: Record<string, string> = {
  draft: 'Drafts',
  'in-progress': 'In progress',
  completed: 'Done',
};

const SCOPE_OPTIONS: { value: LibraryScope; label: string; hint: string }[] = [
  { value: 'all', label: 'Everyone', hint: "Mine and my team's" },
  { value: 'mine', label: 'Mine', hint: 'Only certificates I created' },
  { value: 'team', label: 'My team', hint: 'Signed-off team work' },
];

const MyReports: React.FC<MyReportsProps> = ({ onBack, onNavigate, onEditReport }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  // ELE-1236 — date-range filter (NAPIT/NICEIC assessments: "certs from the
  // last 12 months"). Presets map to a rolling updated_at window; custom takes
  // explicit from/to dates.
  const [datePreset, setDatePreset] = useState<'all' | '30d' | '12m' | 'custom'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<CloudReport | null>(null);
  // ELE-881 — confirmation when duplicating a cert with >=20 circuits
  const [duplicateConfirm, setDuplicateConfirm] = useState<{
    reportId: string;
    reportType: string;
    circuitCount: number;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allReports, setAllReports] = useState<CloudReport[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNewCertSheet, setShowNewCertSheet] = useState(false);
  // ELE-1458 — on phones the audience/type/date rows live in here instead of
  // stacking above the list. Desktop still shows them inline and never opens it.
  const [showFiltersSheet, setShowFiltersSheet] = useState(false);
  // ELE-1421 — whose certificates: the company's (default), only mine, only the
  // team's. Defaults to 'all' deliberately. The bug being fixed was a signed-off
  // cert sitting behind a view nobody opened, so team work has to be present on
  // arrival, not one tap away.
  const [scope, setScope] = useState<LibraryScope>('all');

  // Action sheet state
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<CloudReport | null>(null);
  /*
   * ELE-1616 — the scheme's returned certificate for the cert in the action
   * sheet. Fetched ON DEMAND for one report rather than joined into the list
   * query: almost no certificate has one, and the list already carries enough.
   */
  const [schemeCert, setSchemeCert] = useState<{
    url: string;
    name: string | null;
    ref: string | null;
  } | null>(null);

  // Customer linking state
  const [linkCustomerDialogOpen, setLinkCustomerDialogOpen] = useState(false);
  const [reportToLink, setReportToLink] = useState<CloudReport | null>(null);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [isLinking, setIsLinking] = useState(false);

  // Export to EIC state
  const [exportToEICDialogOpen, setExportToEICDialogOpen] = useState(false);
  const [exportToEICReportId, setExportToEICReportId] = useState<string | null>(null);

  // Export to EICR state (EIC → EICR conversion)
  const [exportToEICRDialogOpen, setExportToEICRDialogOpen] = useState(false);
  const [exportToEICRReportId, setExportToEICRReportId] = useState<string | null>(null);

  // Get customers for linking
  const { customers, isLoading: isLoadingCustomers } = useCustomers();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ELE-1236 — resolve the date preset once, day-floored, so the window is
  // stable across paginated fetches and cache keys (not a per-fetch timestamp).
  // Invalid custom dates resolve to undefined instead of throwing in queryFn.
  const resolvedDateRange = useMemo((): { from?: string; to?: string } => {
    const safeIso = (d: Date): string | undefined => (isNaN(d.getTime()) ? undefined : d.toISOString());
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    if (datePreset === '30d') {
      const d = new Date(startOfToday);
      d.setDate(d.getDate() - 30);
      return { from: safeIso(d) };
    }
    if (datePreset === '12m') {
      const d = new Date(startOfToday);
      d.setFullYear(d.getFullYear() - 1);
      return { from: safeIso(d) };
    }
    if (datePreset === 'custom') {
      return {
        from: dateFrom ? safeIso(new Date(`${dateFrom}T00:00:00`)) : undefined,
        // Inclusive end-of-day so "to 2026-06-30" includes certs from that day
        to: dateTo ? safeIso(new Date(`${dateTo}T23:59:59.999`)) : undefined,
      };
    }
    return {};
  }, [datePreset, dateFrom, dateTo]);

  const {
    data: reportsData,
    isLoading: isLoadingReports,
    isFetching: isFetchingReports,
    refetch: refetchReports,
  } = useQuery<ReportsResponse>({
    // ELE-NEW — page key includes type + status so changing tab fetches fresh
    // server-filtered results instead of using a stale paginated subset.
    // ELE-1236 — the RESOLVED date strings go in the key (not the preset name):
    // rolling presets resolve to day-floored boundaries, so every page of a
    // paginated load uses the identical window and the cache key moves with it.
    queryKey: [
      'my-reports',
      user?.id,
      currentPage,
      typeFilter,
      statusFilter,
      resolvedDateRange.from,
      resolvedDateRange.to,
      // ELE-1421 — scope is part of the key: switching Mine/Team must refetch
      // server-side, not re-slice a page that was never fetched.
      scope,
    ],
    queryFn: async () => {
      if (!user) {
        return { reports: [], totalCount: 0, hasMore: false };
      }
      const options = {
        page: currentPage,
        pageSize: 20,
        reportType: typeFilter,
        status: statusFilter,
        dateFrom: resolvedDateRange.from,
        dateTo: resolvedDateRange.to,
        // ELE-1305 — the library shows auto-saved work (badged "Auto-saved");
        // only the dashboard's Recent Certs hides it.
        includeAutoDrafts: true,
      };
      try {
        // ELE-1421 — one path for everyone. For a solo account the RPC resolves
        // no team, so it returns exactly the personal query's rows; for a company
        // owner or QS it also carries their team's finished work. A single path
        // means the library can't behave differently depending on who you are.
        return await reportCloud.getCertificateLibrary({ ...options, scope });
      } catch (error) {
        // Fall back to the personal query rather than showing an empty library.
        // "You have no certificates" is the most alarming lie this screen can
        // tell, so a broken RPC degrades to your own certs, never to nothing.
        console.error('[MyReports] Company library failed, using personal certs:', error);
        return await reportCloud.getUserReports(user.id, options);
      }
    },
    enabled: !!user,
    // ELE-1459 — hold the previous page on screen while the new filter loads.
    // Every filter change mints a new query key, so without this `data` goes
    // undefined for a beat, the list collapses to nothing and the page's height
    // drops out from under the scroll position. That collapse-and-refill IS the
    // "weird jump". Keeping the old rows means the layout never loses height.
    placeholderData: (previous) => previous,
  });

  // ELE-NEW — per-type counts across the WHOLE library (not just the current
  // page) so tabs always show real numbers like "EIC (12)" even when the
  // user has 100+ certs and EICs only appear on page 3.
  // Company-team membership. Declared up here because both the team realtime
  // subscription and the QS badge lookup below depend on it.
  const { data: qsTeamContext } = useQsTeamContext();

  const { data: countsData, refetch: refetchCounts } = useQuery({
    queryKey: ['my-reports-counts', user?.id, scope],
    queryFn: async () => {
      if (!user)
        return { total: 0, mine: 0, team: 0, scopedTotal: 0, byType: {}, byStatus: {} };
      const counts = await reportCloud.getCertificateLibraryCounts({
        includeAutoDrafts: true,
        scope,
      });
      // getCertificateLibraryCounts swallows its own errors and returns zeroes.
      // Zero total with certs on screen means the RPC is unavailable, so fall
      // back rather than render every tab as "0" over a populated list.
      if (counts.total === 0) {
        const personal = await reportCloud.getReportCounts(user.id, { includeAutoDrafts: true });
        return { ...personal, mine: personal.total, team: 0, scopedTotal: personal.total };
      }
      return counts;
    },
    enabled: !!user,
    // ELE-1459 — the counts drive which filter rows render at all (the audience
    // row only exists when team > 0). Letting them go undefined mid-refetch
    // unmounts a whole row and shunts everything below it up the screen.
    placeholderData: (previous) => previous,
  });

  useEffect(() => {
    if (reportsData?.reports) {
      if (currentPage === 1) {
        setAllReports(reportsData.reports);
      } else {
        setAllReports((prev) => [...prev, ...reportsData.reports]);
      }
    }
  }, [reportsData, currentPage]);

  // ELE-NEW — when filter changes, reset to page 1 so the new server query
  // starts from the beginning of the filtered set.
  // NOTE: do NOT clear allReports here. The page-1 data effect above already
  // replaces it when the new results arrive. Clearing caused a stuck empty
  // state when switching to a cached filter (e.g. "All" after it had loaded):
  // the cached data resolves synchronously, so both effects ran in the same
  // commit and this clear ran last, wiping the just-set list.
  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, statusFilter, datePreset, dateFrom, dateTo, scope]);

  // ELE-1421 — a selection is a set of report_ids from the previous scope's page.
  // Carrying it across a scope switch would act on rows no longer on screen.
  useEffect(() => {
    setSelectedReports(new Set());
  }, [scope]);

  /**
   * ELE-1421 — change scope and reset the page in ONE update.
   *
   * Resetting the page from an effect instead would leave a render in which the
   * query key is {new scope, old page}: React Query fires that fetch, and if
   * "page 4 of Mine" resolves after the page reset, the accumulator appends it
   * to a list it doesn't belong to. Setting both together means the stale key
   * never exists. The effect above keeps `scope` in its deps as a backstop —
   * setting currentPage to 1 when it is already 1 is a no-op.
   */
  const changeScope = useCallback((next: LibraryScope) => {
    setScope(next);
    setCurrentPage(1);
  }, []);

  // Realtime subscription — show toast + refetch when agent creates/updates certs
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(realtimeChannelName('reports-realtime'))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reports',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const r = payload.new as { report_type?: string };
            toast({
              title: 'New Certificate',
              description: `A new ${(r.report_type || 'certificate').replace(/-/g, ' ')} has been created`,
            });
          }
          setCurrentPage(1);
          refetchReports();
          refetchCounts();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, refetchReports, refetchCounts, toast]);

  // ELE-1421 — the channel above filters on `user_id=eq.<me>`, so by definition
  // it can never fire for a team member's cert. QS sign-off is the moment a team
  // cert becomes visible here, so watch the review table too — the same signal
  // the QS queue already refreshes on. A team member merely completing a cert
  // (no review) still lands via refetch-on-mount or pull-to-refresh.
  // Opened only for accounts on a company team — this screen is the app's
  // most-visited list, so a sole trader should not hold a subscription that can
  // never deliver them a row. Keyed on team MEMBERSHIP rather than on the team
  // cert count, or the very first cert a team member gets signed off would be
  // the one event nobody was listening for.
  const watchTeamReviews = !!user && !!qsTeamContext?.is_team_member;
  useEffect(() => {
    if (!watchTeamReviews) return;
    const channel = supabase
      .channel(realtimeChannelName('library-team-certs'))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'report_qs_reviews' },
        () => {
          refetchReports();
          refetchCounts();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [watchTeamReviews, refetchReports, refetchCounts]);

  const reports = allReports;
  const hasMore = reportsData?.hasMore || false;
  const totalCount = reportsData?.totalCount || 0;

  // ELE-NEW — counts come from the WHOLE library, not just loaded pages.
  // Falls back to loaded reports while counts query is still pending.
  const statusCounts = useMemo(() => {
    if (countsData) {
      // ELE-1305 — auto-saved forms count as drafts; the Drafts tab shows them.
      const draftCount =
        (countsData.byStatus.draft || 0) + (countsData.byStatus['auto-draft'] || 0);
      return {
        // Scoped, not company-wide: this row describes the list on screen.
        all: countsData.scopedTotal,
        draft: draftCount,
        'in-progress': countsData.byStatus['in-progress'] || 0,
        completed: countsData.byStatus.completed || 0,
      };
    }
    return {
      all: reports.length,
      draft: reports.filter((r) => r.status === 'draft' || r.status === 'auto-draft').length,
      'in-progress': reports.filter((r) => r.status === 'in-progress').length,
      completed: reports.filter((r) => r.status === 'completed').length,
    };
  }, [reports, countsData]);

  /**
   * ELE-1458 — the secondary filters, described once.
   *
   * On a phone these three rows now live behind one pill instead of stacking
   * above the list, so the pill needs to say how many are on and the summary
   * row needs to name them. Status is deliberately excluded: it stays visible
   * as its own control, so counting it here would double-report it.
   */
  const activeSecondaryFilters = useMemo(() => {
    const active: { key: string; label: string; clear: () => void }[] = [];
    if (scope !== 'all') {
      active.push({
        key: 'scope',
        label: SCOPE_OPTIONS.find((s) => s.value === scope)?.label ?? scope,
        clear: () => changeScope('all'),
      });
    }
    if (typeFilter !== 'all') {
      active.push({
        key: 'type',
        label: TYPE_LABELS[typeFilter] ?? typeFilter.replace(/-/g, ' '),
        clear: () => setTypeFilter('all'),
      });
    }
    if (datePreset !== 'all') {
      active.push({
        key: 'date',
        label:
          datePreset === 'custom'
            ? dateFrom || dateTo
              ? `${dateFrom || 'Any'} to ${dateTo || 'Any'}`
              : 'Custom dates'
            : DATE_PRESETS.find((d) => d.value === datePreset)?.label ?? 'Dates',
        clear: () => {
          setDatePreset('all');
          setDateFrom('');
          setDateTo('');
        },
      });
    }
    return active;
  }, [scope, typeFilter, datePreset, dateFrom, dateTo, changeScope]);

  const clearSecondaryFilters = useCallback(() => {
    changeScope('all');
    setTypeFilter('all');
    setDatePreset('all');
    setDateFrom('');
    setDateTo('');
  }, [changeScope]);

  /**
   * Everything currently narrowing the list, search and status included.
   *
   * The empty state uses this rather than a generic "try adjusting your
   * filters": an empty library is alarming, and the useful thing to show
   * someone is exactly which of five controls is hiding their work — and to
   * let them drop one without losing the rest.
   */
  const activeLibraryFilters = useMemo(() => {
    const active = [...activeSecondaryFilters];
    if (statusFilter !== 'all') {
      active.unshift({
        key: 'status',
        label: STATUS_LABELS[statusFilter] ?? statusFilter,
        clear: () => setStatusFilter('all'),
      });
    }
    if (searchQuery.trim()) {
      active.unshift({
        key: 'search',
        label: `“${searchQuery.trim()}”`,
        clear: () => setSearchQuery(''),
      });
    }
    return active;
  }, [activeSecondaryFilters, statusFilter, searchQuery]);

  const clearAllLibraryFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('all');
    clearSecondaryFilters();
  }, [clearSecondaryFilters]);

  // ELE-NEW — type/status filtering now happens server-side (see queryKey
  // above), so the loaded `reports` array is already pre-filtered. Only
  // search is still client-side because Supabase ilike on JSON would be
  // slow without an index — and search is typically used to narrow down
  // the visible page rather than the full library.
  const filteredReports = useMemo(() => {
    if (!searchQuery) return reports;
    const query = searchQuery.toLowerCase();
    return reports.filter(
      (report) =>
        report.report_id.toLowerCase().includes(query) ||
        report.client_name?.toLowerCase().includes(query) ||
        report.installation_address?.toLowerCase().includes(query) ||
        // ELE-1421 — a QS looking for "Rad" means their team member, not a
        // client. Owner is only ever set on team rows, so this adds nothing to
        // a sole trader's search.
        report.owner_name?.toLowerCase().includes(query)
    );
  }, [reports, searchQuery]);

  const sortedReports = useMemo(() => {
    const sorted = [...filteredReports];

    switch (sortBy) {
      case 'date-desc':
        return sorted.sort(
          (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      case 'date-asc':
        return sorted.sort(
          (a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        );
      case 'cert-asc':
        return sorted.sort((a, b) => a.report_id.localeCompare(b.report_id));
      case 'cert-desc':
        return sorted.sort((a, b) => b.report_id.localeCompare(a.report_id));
      case 'client-asc':
        return sorted.sort((a, b) => (a.client_name || '').localeCompare(b.client_name || ''));
      case 'client-desc':
        return sorted.sort((a, b) => (b.client_name || '').localeCompare(a.client_name || ''));
      case 'status':
        const statusOrder = { draft: 0, 'in-progress': 1, completed: 2 };
        return sorted.sort(
          (a, b) =>
            (statusOrder[a.status as keyof typeof statusOrder] || 999) -
            (statusOrder[b.status as keyof typeof statusOrder] || 999)
        );
      default:
        return sorted;
    }
  }, [filteredReports, sortBy]);

  // ELE-1421 — the library RPC returns each row's review state inline, so this
  // extra round-trip is only needed when the personal fallback served the page.
  // `is_team_cert` is defined on every RPC row and on none of the fallback's,
  // so a loaded page tells us which path produced it.
  const reviewStateInline =
    reports.length > 0 && reports.every((r) => r.is_team_cert !== undefined);
  const { data: qsReviewMap } = useQsReviewStatuses(
    reports
      .filter((r) => QS_REVIEWABLE_TYPES.includes(r.report_type as QsReviewableType))
      .map((r) => r.report_id),
    !reviewStateInline && !!qsTeamContext?.is_team_member
  );

  // Convert CloudReport to CertificateData for the card
  const toCertificateData = (report: CloudReport): CertificateData => ({
    id: report.report_id,
    reportType: report.report_type,
    // The library RPC already carries the review state for every row it returns;
    // the batched map only covers rows fetched by the personal fallback path.
    qsReviewStatus: report.qs_review_status ?? qsReviewMap?.[report.report_id]?.status,
    qsReviewerName: report.qs_reviewer_name ?? qsReviewMap?.[report.report_id]?.reviewer_name,
    ownerName: report.is_team_cert ? report.owner_name || 'Team member' : undefined,
    clientName: report.client_name || undefined,
    installationAddress: report.installation_address || undefined,
    inspectionDate: report.data?.inspectionDate || report.data?.dateOfInspection || undefined,
    status: report.status,
    lockedAt: report.locked_at || undefined,
    lastModified: new Date(report.updated_at).getTime(),
    customerId: report.customer_id,
    canExportToEICR:
      (report.report_type === 'eic' || report.report_type === 'minor-works') &&
      (report.status === 'completed' || report.status === 'in-progress'),
    canExportToEIC:
      report.report_type === 'eicr' &&
      report.status === 'completed' &&
      // ELE-1342 — startsWith catches 'yes' AND 'yes-with-recommendations'
      // (a C3-only pass is still a valid EICR to convert), but not 'no'.
      Boolean(report.data?.satisfactoryForContinuedUse?.toLowerCase().startsWith('yes')),
  });

  // Pull-to-refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      setCurrentPage(1);
      await refetchReports();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetchReports]);

  // Certificate card tap handler - opens action sheet
  const handleCardTap = (report: CloudReport) => {
    setSelectedCertificate(report);
    /* Clear first — otherwise the previous cert's scheme PDF flashes up on this one. */
    setSchemeCert(null);
    void (async () => {
      /*
       * ⚠️ `select('*')` and cast, rather than naming the columns.
       *
       * The generated `types.ts` predates the ELE-1616 `scheme_certificate_*`
       * columns, and PostgREST's typing validates the column list in `.select()`
       * against it — so naming them fails to compile even though they exist.
       * Regenerating types.ts wholesale would drag in unrelated schema drift.
       */
      const { data } = await supabase
        .from('part_p_notifications')
        .select('*')
        .eq('report_id', report.report_id)
        .maybeSingle();
      const row = data as {
        scheme_certificate_url?: string | null;
        scheme_certificate_name?: string | null;
        scheme_certificate_ref?: string | null;
      } | null;
      if (row?.scheme_certificate_url) {
        setSchemeCert({
          url: row.scheme_certificate_url,
          name: row.scheme_certificate_name ?? null,
          ref: row.scheme_certificate_ref ?? null,
        });
      }
    })();
    setActionSheetOpen(true);
  };

  // Delete handlers
  const handleDeleteReport = (reportId: string) => {
    const report = reports.find((r) => r.report_id === reportId);
    if (!report) return;
    // ELE-1421 — belt and braces behind the hidden delete button. Soft-delete
    // sets deleted_at, which the `QS can update team reports` policy rejects, so
    // this would fail server-side after the user confirmed a scary dialog.
    if (report.is_team_cert) {
      toast({
        title: 'Not yours to delete',
        description: `This certificate belongs to ${report.owner_name || 'a team member'}. Only they can delete it.`,
        variant: 'destructive',
      });
      return;
    }
    setReportToDelete(report);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!reportToDelete || !user) return;

    setIsDeleting(true);
    const reportIdToDelete = reportToDelete.report_id;
    setAllReports((prev) => prev.filter((r) => r.report_id !== reportIdToDelete));
    setDeleteDialogOpen(false);
    setReportToDelete(null);
    setActionSheetOpen(false);

    try {
      const result = await reportCloud.softDeleteReport(reportIdToDelete, user.id);

      if (!result.success) {
        refetchReports();
        toast({
          title: 'Delete failed',
          description: result.error?.message || 'Failed to delete the report.',
          variant: 'destructive',
        });
        return;
      }

      refetchReports();
      toast({
        title: 'Certificate deleted',
        description: 'Certificate has been removed successfully.',
      });
    } catch (error: any) {
      refetchReports();
      toast({
        title: 'Delete failed',
        description: error?.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Customer linking
  const handleLinkCustomer = (reportId: string) => {
    const report = reports.find((r) => r.report_id === reportId);
    if (report) {
      setReportToLink(report);
      setCustomerSearchQuery('');
      setLinkCustomerDialogOpen(true);
      setActionSheetOpen(false);
    }
  };

  const confirmLinkCustomer = async (customerId: string) => {
    if (!reportToLink || !user) return;

    setIsLinking(true);

    try {
      const result = await linkCustomerToReport(reportToLink.report_id, customerId);

      if (result.success) {
        setAllReports((prev) =>
          prev.map((r) =>
            r.report_id === reportToLink.report_id ? { ...r, customer_id: customerId } : r
          )
        );

        const customer = customers.find((c) => c.id === customerId);
        toast({
          title: 'Customer linked',
          description: `Certificate linked to ${customer?.name || 'customer'} successfully.`,
        });

        setLinkCustomerDialogOpen(false);
        setReportToLink(null);
      } else {
        toast({
          title: 'Link failed',
          description: 'Failed to link customer to certificate.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Link failed',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLinking(false);
    }
  };

  const handleUnlinkCustomer = async (reportId: string) => {
    try {
      const result = await unlinkCustomerFromReport(reportId);
      if (result.success) {
        setAllReports((prev) =>
          prev.map((r) => r.report_id === reportId ? { ...r, customer_id: null } : r)
        );
        toast({ title: 'Customer unlinked', description: 'Certificate is no longer linked to a customer.' });
      } else {
        toast({ title: 'Unlink failed', description: 'Failed to unlink customer.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Unlink failed', description: 'An unexpected error occurred.', variant: 'destructive' });
    }
  };

  const filteredCustomers = useMemo(() => {
    if (!customerSearchQuery.trim()) return customers;
    const query = customerSearchQuery.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email?.toLowerCase().includes(query) ||
        c.address?.toLowerCase().includes(query)
    );
  }, [customers, customerSearchQuery]);

  // Export handlers
  const handleExportToEIC = (reportId: string) => {
    setExportToEICReportId(reportId);
    setExportToEICDialogOpen(true);
    setActionSheetOpen(false);
  };

  const handleExportToEICComplete = (eicReportId: string) => {
    refetchReports();
    navigate(`/electrician/inspection-testing?section=eic&reportId=${eicReportId}`);
  };

  const handleExportToEICR = (reportId: string) => {
    setExportToEICRReportId(reportId);
    setExportToEICRDialogOpen(true);
    setActionSheetOpen(false);
  };

  const handleExportToEICRComplete = (eicrReportId: string) => {
    refetchReports();
    navigate(`/electrician/inspection-testing?section=eicr&reportId=${eicrReportId}`);
  };

  // ELE-881 — Duplicate cert as a template (block-of-apartments workflow).
  // Confirms with user if the source is large (>=20 circuits), then loads
  // source, strips identity, generates a new cert number, and persists the
  // new draft row. Routes into the new draft via onEditReport.
  const performDuplicate = async (reportId: string, reportType: string) => {
    if (!user?.id) {
      toast({
        title: 'Not signed in',
        description: 'You must be signed in to duplicate certificates.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Duplicating certificate…',
      description: 'Copying spec to a new draft.',
    });
    try {
      const { duplicateCertificate, isDuplicable } = await import(
        '@/utils/duplicateCertificate'
      );
      if (!isDuplicable(reportType)) {
        toast({
          title: 'Not supported',
          description: `Duplicate isn't available for ${reportType.toUpperCase()} yet.`,
          variant: 'destructive',
        });
        return;
      }
      const { newReportId: newCertNumber, data, sourceReportId } =
        await duplicateCertificate(reportId, reportType);
      // ELE-881 — use the canonical reportCloud.createReport so the row gets
      // the correct shape (UUID-style report_id, separate certificate_number
      // column, status calculation, customer_id null, last_synced_at).
      // Direct .insert() previously bypassed all of this and got a 400 from
      // the unique-constraint / NOT NULL columns on the reports table.
      const result = await reportCloud.createReport(
        user.id,
        reportType as Parameters<typeof reportCloud.createReport>[1],
        data,
        undefined,
        false
      );
      if (!result.success || !result.reportId) {
        throw new Error(
          result.error instanceof Error
            ? result.error.message
            : typeof result.error === 'string'
              ? result.error
              : 'Could not create duplicate'
        );
      }
      toast({
        title: 'Duplicated',
        description: `New ${reportType.toUpperCase()} ${newCertNumber} ready — change client + address.`,
      });
      refetchReports();
      onEditReport(result.reportId, reportType);
      void sourceReportId;
    } catch (err) {
      toast({
        title: 'Duplicate failed',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  // Pre-flight: load enough of the source to count circuits, then confirm if
  // it's a large cert before kicking off the duplicate.
  const handleDuplicate = async (reportId: string, reportType: string) => {
    setActionSheetOpen(false);
    try {
      const { countCircuits, LARGE_CERT_CIRCUIT_THRESHOLD } = await import(
        '@/utils/duplicateCertificate'
      );
      const sourceRow = reports.find((r) => r.report_id === reportId);
      const circuitCount = countCircuits(sourceRow?.data);
      if (circuitCount >= LARGE_CERT_CIRCUIT_THRESHOLD) {
        setDuplicateConfirm({
          reportId,
          reportType,
          circuitCount,
        });
        return;
      }
      await performDuplicate(reportId, reportType);
    } catch (err) {
      toast({
        title: 'Duplicate failed',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  // Download PDF handler (replaces preview - viewer was unreliable)
  // Share the cert's PDF straight to a client — native share sheet where
  // supported, clipboard fallback otherwise. Uses the stored pdf_url, so it's
  // offered only on completed certs (which have a generated PDF).
  const handleSharePdf = async (report: CloudReport | null) => {
    if (!report) return;
    setActionSheetOpen(false);
    const url = report.pdf_url;
    const client = (report.data?.clientName as string | undefined) || '';
    const title = `${report.report_type.replace(/-/g, ' ').toUpperCase()}${client ? ` — ${client}` : ''}`;
    if (!url) {
      toast({
        title: 'No PDF to share yet',
        description: 'Open the cert and download the PDF once, then share it.',
      });
      return;
    }
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title, text: 'Electrical certificate', url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast({ title: 'Link copied', description: 'Certificate PDF link copied to clipboard.' });
    } catch (err) {
      // AbortError = user dismissed the share sheet; only surface real errors.
      if (err instanceof Error && err.name !== 'AbortError') {
        toast({ title: 'Could not share', description: err.message, variant: 'destructive' });
      }
    }
  };

  const handleDownloadPdf = async (reportId: string) => {
    setActionSheetOpen(false);

    toast({
      title: 'Preparing PDF',
      description: 'Generating certificate PDF for download...',
    });

    try {
      const { generateBulkPDFs } = await import('@/utils/bulkPdfExport');
      const result = await generateBulkPDFs([reportId], user?.id || '', {
        onProgress: () => {},
      });

      if (result.successful > 0) {
        toast({
          title: 'Download Complete',
          description: 'Your PDF has been downloaded.',
        });
      } else {
        // Surface the actual validation message from bulkPdfExport so the user
        // knows WHY it failed (missing fields, etc.) instead of a generic
        // "PDF generation failed".
        // result.errors entries are formatted "EICR-XXXX: Please complete: …"
        // — strip the cert-id prefix so the toast is cleaner.
        const firstError = result.errors[0] || '';
        const message = firstError.includes(':')
          ? firstError.substring(firstError.indexOf(':') + 1).trim()
          : firstError || 'PDF generation failed.';
        throw new Error(message);
      }
    } catch (error: unknown) {
      const description =
        error instanceof Error ? error.message : 'Could not generate PDF. Please try again.';
      const isMissingFields = description.toLowerCase().includes('please complete');
      // ELE-NEW — diagnostic bundle the user can copy + paste to support if
      // they're stuck. Includes everything we need for triage without asking
      // for screenshots: cert id, type, user id, full error message, app
      // version + UA so we can spot client-specific bugs.
      const diagnostic = JSON.stringify(
        {
          when: new Date().toISOString(),
          reportId,
          userId: user?.id || null,
          error: description,
          ua: typeof navigator !== 'undefined' ? navigator.userAgent : null,
          url: typeof window !== 'undefined' ? window.location.href : null,
        },
        null,
        2
      );
      toast({
        title: isMissingFields ? 'Missing required fields' : 'Download failed',
        description,
        variant: 'destructive',
        duration: 12000,
        action: !isMissingFields ? (
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(diagnostic);
                toast({ title: 'Copied diagnostic', description: 'Paste it to support.' });
              } catch {
                /* clipboard blocked — fall back silently */
              }
            }}
            className="h-8 px-3 text-xs font-semibold rounded-md border border-white/20 hover:bg-white/10 touch-manipulation"
          >
            Copy diagnostic
          </button>
        ) : undefined,
      });
    }
  };

  // Bulk mode handlers
  const handleSelectToggle = (id: string) => {
    // ELE-1421 — a team cert can't be bulk-edited (see CertificateCard), and the
    // card won't offer it. Enforced here too so a selection can never survive a
    // scope switch and reach a bulk mutation that would silently no-op.
    if (reports.find((r) => r.report_id === id)?.is_team_cert) return;
    setSelectedReports((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleBulkMode = () => {
    setIsBulkMode(!isBulkMode);
    setSelectedReports(new Set());
  };

  const handleBulkDelete = async () => {
    if (!user || selectedReports.size === 0) return;

    setIsDeleting(true);
    const reportsToDelete = Array.from(selectedReports);
    setAllReports((prev) => prev.filter((r) => !reportsToDelete.includes(r.report_id)));
    setShowBulkDeleteDialog(false);

    try {
      const results = await Promise.all(
        reportsToDelete.map((id) => reportCloud.softDeleteReport(id, user.id))
      );

      const successCount = results.filter((r) => r.success).length;
      const failCount = results.filter((r) => !r.success).length;

      if (successCount > 0) {
        refetchReports();
        toast({
          title: 'Success',
          description: `${successCount} certificate${successCount > 1 ? 's' : ''} deleted${
            failCount > 0 ? `. ${failCount} failed.` : ''
          }`,
        });
      }

      if (failCount > 0) {
        refetchReports();
        toast({
          title: failCount === reportsToDelete.length ? 'All deletions failed' : 'Partial failure',
          description: 'Some certificates could not be deleted.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      refetchReports();
      toast({
        title: 'Error',
        description: error?.message || 'Failed to delete certificates',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setSelectedReports(new Set());
      setIsBulkMode(false);
    }
  };

  const handleBulkStatusChange = async (newStatus: 'draft' | 'in-progress' | 'completed') => {
    if (!user || selectedReports.size === 0) return;

    try {
      const { error } = await supabase
        .from('reports')
        .update({ status: newStatus })
        .in(
          'id',
          Array.from(selectedReports)
            .map((reportId) => {
              const report = reports.find((r) => r.report_id === reportId);
              return report?.id;
            })
            .filter(Boolean)
        )
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `${selectedReports.size} certificate${
          selectedReports.size > 1 ? 's' : ''
        } updated to ${newStatus}`,
      });

      refetchReports();
      setSelectedReports(new Set());
      setIsBulkMode(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update certificate status',
        variant: 'destructive',
      });
    }
  };

  const handleBulkExport = async () => {
    if (!user || selectedReports.size === 0) return;

    setIsExporting(true);
    const reportCount = selectedReports.size;
    const willUseZip = reportCount >= 5;

    toast({
      title: 'Export Started',
      description: willUseZip
        ? `Preparing ${reportCount} PDFs for download as a ZIP archive...`
        : `Preparing ${reportCount} PDF${reportCount > 1 ? 's' : ''} for download...`,
    });

    try {
      const reportIds = Array.from(selectedReports);
      const { generateBulkPDFs } = await import('@/utils/bulkPdfExport');

      const result = await generateBulkPDFs(reportIds, user.id, {
        onProgress: () => {},
      });

      if (result.successful > 0) {
        toast({
          title: 'Export Complete',
          description: willUseZip
            ? `ZIP archive with ${result.successful} PDF${result.successful > 1 ? 's' : ''} ready`
            : `${result.successful} PDF${result.successful > 1 ? 's' : ''} downloaded`,
        });
      }

      if (result.failed > 0) {
        toast({
          title: result.successful === 0 ? 'Export Failed' : 'Partial Export',
          description: `${result.failed} certificate${result.failed > 1 ? 's' : ''} could not be exported.`,
          variant: 'destructive',
        });
      }

      setSelectedReports(new Set());
      setIsBulkMode(false);
    } catch (error: any) {
      toast({
        title: 'Export Failed',
        description: error?.message || 'An error occurred during bulk export',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeselectAll = () => {
    setSelectedReports(new Set());
  };

  // Loading state — FIRST load only.
  //
  // ELE-1459 — this early return used to fire on `isLoadingReports` alone, and
  // `isLoading` is true whenever the active query key has no cached data. Every
  // filter tap mints a new key, so tapping a tab tore down the entire screen —
  // sticky header, filter rows, list — and replaced it with three skeletons,
  // then rebuilt it a moment later. That full unmount/remount was the jump.
  // With placeholderData above it can no longer fire mid-filter; the length
  // guard makes that impossible rather than merely unlikely.
  if (!user || (isLoadingReports && allReports.length === 0)) {
    return (
      // Mirrors the loaded header exactly — same Back line, same title scale,
      // same gutters — so the first paint settles into place instead of
      // swapping one header shape for another.
      <div className="min-h-screen bg-background text-foreground pb-8">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-1 px-4 pt-2 lg:px-8">
            <button
              type="button"
              onClick={onBack}
              className="h-11 px-1 -ml-1 text-[13px] font-semibold text-white touch-manipulation"
            >
              Back
            </button>
          </div>
          <div className="px-4 pb-3 lg:px-8">
            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white">
              My Certificates
            </h1>
            <p className="mt-0.5 text-[13px] text-white">Loading…</p>
          </div>
          <div className="h-px bg-white/[0.08]" />
        </header>
        <div className="px-4 py-4 lg:px-8 lg:max-w-[1600px]">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[132px] w-full rounded-2xl bg-white/[0.03]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground pb-24 prevent-shortcuts">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
          {/*
            Header, rebuilt to the pattern the other three I&T section pages
            already use (Certificates / Specialist / Notices & Labels): a quiet
            Back link on its own line, then a big title.

            The old single row put Back, the title, Search, More and New on one
            line at 390px, which truncated the page's own name to "My Cer…" and
            left three grey text buttons competing with each other. Splitting it
            gives the title the width it needs and lets the utility actions sit
            where they belong — small, on the line above, out of the way.
          */}
          <div className="flex items-center gap-1 px-4 pt-2 lg:px-8">
            {/* Back */}
            <button
              type="button"
              onClick={onBack}
              className="h-11 px-1 -ml-1 text-[13px] font-semibold text-white flex-shrink-0 touch-manipulation active:scale-[0.97]"
            >
              Back
            </button>

            <div className="flex-1" />

            {/* Search Toggle */}
            <button
              onClick={() => {
                navigator.vibrate?.(10);
                setShowSearch(!showSearch);
              }}
              className={cn(
                'h-11 px-2 rounded-lg text-[13px] font-semibold flex-shrink-0 touch-manipulation active:scale-[0.97] transition-colors',
                showSearch ? 'text-elec-yellow' : 'text-white'
              )}
            >
              Search
            </button>

            {/* Overflow Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-11 px-2 -mr-2 rounded-lg flex-shrink-0 text-[13px] font-semibold text-white touch-manipulation active:scale-[0.97] transition-colors">
                  More
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[hsl(240_5.9%_12%)] border-white/10">
                <DropdownMenuItem
                  onClick={() => {
                    navigator.vibrate?.(10);
                    toggleBulkMode();
                  }}
                  className="text-white focus:text-white focus:bg-white/10"
                >
                  {isBulkMode ? 'Cancel Selection' : 'Select Multiple'}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  onClick={() => {
                    navigator.vibrate?.(10);
                    setShowImportDialog(true);
                  }}
                  className="text-white focus:text-white focus:bg-white/10"
                >
                  Import CSV
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    navigator.vibrate?.(10);
                    navigate('/electrician/inspection-testing/legacy-certificates');
                  }}
                  className="text-white focus:text-white focus:bg-white/10"
                >
                  Legacy PDFs
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <div className="px-2 py-1.5">
                  <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>

          {/* Title row — the page's name at section-page scale, with the one
              primary action beside it. The subtitle carries the count, so the
              title doesn't need a number bolted to its end. */}
          <div className="flex items-end justify-between gap-3 px-4 pb-3 lg:px-8">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white">
                My Certificates
              </h1>
              <p className="mt-0.5 text-[13px] text-white tabular-nums">
                {totalCount} {totalCount === 1 ? 'certificate' : 'certificates'}
                {/* The tab's own label, not the raw column value — this line
                    read "0 certificates · draft" against a tab saying Drafts. */}
                {statusFilter !== 'all' && ` · ${STATUS_LABELS[statusFilter] ?? statusFilter}`}
              </p>
            </div>

            {/* New Certificate */}
            <button
              className="h-11 px-5 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[13px] font-bold flex-shrink-0 touch-manipulation active:scale-[0.97] transition-colors"
              onClick={() => {
                navigator.vibrate?.(10);
                setShowNewCertSheet(true);
              }}
            >
              New
            </button>
          </div>

          {/* Collapsible Search */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-3 overflow-hidden"
              >
                <div className="relative">
                  <Input
                    placeholder="Search by name, address, or certificate..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 bg-white/[0.08] border-white/[0.14] text-base touch-manipulation text-white placeholder:text-white/40"
                    autoFocus
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 touch-manipulation text-white"
                      onClick={() => {
                        navigator.vibrate?.(10);
                        setSearchQuery('');
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ELE-1421 — whose certificates. Rendered only for accounts that
              actually have team work to show, so a sole trader's library is
              untouched. Sits above the status control because it's the wider
              question: whose work first, then what state it's in. */}
          {(countsData?.team ?? 0) > 0 && (
            // ELE-1458 — inline from lg up only; on a phone this row is the
            // first of four and it's the least often changed, so it moves into
            // the filter sheet rather than costing a row of the first screen.
            <div className="hidden lg:block px-4 pt-2">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />
                <div
                  role="group"
                  aria-label="Filter by whose certificates"
                  className="flex flex-1 gap-1 p-0.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  {[
                    { value: 'all' as LibraryScope, label: 'Everyone', count: countsData?.total },
                    { value: 'mine' as LibraryScope, label: 'Mine', count: countsData?.mine },
                    { value: 'team' as LibraryScope, label: 'My team', count: countsData?.team },
                  ].map(({ value, label, count }) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={scope === value}
                      onClick={() => {
                        navigator.vibrate?.(10);
                        changeScope(value);
                      }}
                      className={cn(
                        // h-9 inside the p-0.5 rail matches the status control
                        // below and keeps the tappable row at ~44px.
                        'flex-1 min-w-0 h-9 rounded-md text-[11px] font-semibold transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center gap-1.5',
                        scope === value
                          ? 'bg-white/[0.10] text-white ring-1 ring-inset ring-white/15'
                          : 'text-white'
                      )}
                    >
                      <span className="truncate">{label}</span>
                      {(count ?? 0) > 0 && (
                        <span className="text-[10px] tabular-nums leading-none text-white">
                          {count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Status filter — the one control that stays on screen at every
              width. ELE-1458 pairs it with the filter pill on phones so the
              whole filter surface is a single row before the list starts. */}
          <div className="px-4 py-2 lg:px-8 flex items-center gap-2">
            <div className="flex-1 min-w-0 flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              {[
                { value: 'all' as StatusFilter, label: 'All', count: statusCounts.all },
                { value: 'draft' as StatusFilter, label: 'Drafts', count: statusCounts.draft },
                { value: 'in-progress' as StatusFilter, label: 'In progress', count: statusCounts['in-progress'] },
                { value: 'completed' as StatusFilter, label: 'Done', count: statusCounts.completed },
              ].map(({ value, label, count }) => (
                <button
                  key={value}
                  onClick={() => {
                    navigator.vibrate?.(10);
                    setStatusFilter(value);
                  }}
                  className={cn(
                    'flex-1 min-w-0 h-9 rounded-lg text-[11px] sm:text-[12px] font-semibold transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center gap-1',
                    // Inactive tabs are full white — the volt fill is what marks
                    // the active one, so dimming the rest only made them read as
                    // disabled grey.
                    statusFilter === value ? 'bg-elec-yellow text-black' : 'text-white'
                  )}
                >
                  <span className="truncate">{label}</span>
                  {/* Counts only where there's room — phones show the label clean. */}
                  {count > 0 && (
                    <span
                      className={cn(
                        'hidden sm:inline text-[10px] tabular-nums leading-none',
                        statusFilter === value ? 'text-black/70' : 'text-white'
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* ELE-1458 — the phone's single door to audience, type and time.
                The badge is the whole point: filters that live behind a sheet
                have to announce themselves, or a user forgets a narrow filter
                is on and reads a short list as lost work. */}
            <button
              type="button"
              onClick={() => {
                navigator.vibrate?.(10);
                setShowFiltersSheet(true);
              }}
              aria-label={
                activeSecondaryFilters.length > 0
                  ? `Filters, ${activeSecondaryFilters.length} active`
                  : 'Filters'
              }
              className={cn(
                'lg:hidden shrink-0 h-11 px-3 rounded-xl border flex items-center gap-1.5 text-[12px] font-semibold transition-colors touch-manipulation active:scale-[0.98]',
                activeSecondaryFilters.length > 0
                  ? 'bg-elec-yellow border-elec-yellow text-black'
                  : 'bg-white/[0.03] border-white/[0.06] text-white'
              )}
            >
              <SlidersHorizontal className="h-4 w-4 shrink-0" aria-hidden />
              {activeSecondaryFilters.length > 0 && (
                <span className="tabular-nums leading-none">{activeSecondaryFilters.length}</span>
              )}
            </button>
          </div>

          {/* ELE-1458 — names the filters hiding in the sheet, and lets each be
              dropped in one tap. Absent at rest, so the default library is a
              status row and then certificates. */}
          {activeSecondaryFilters.length > 0 && (
            <div className="lg:hidden flex items-center gap-1.5 px-4 pb-2 overflow-x-auto scrollbar-hide">
              {activeSecondaryFilters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    navigator.vibrate?.(10);
                    f.clear();
                  }}
                  aria-label={`Remove filter: ${f.label}`}
                  className="shrink-0 h-7 pl-2.5 pr-2 rounded-md bg-white/[0.06] border border-white/[0.12] text-[11px] font-medium text-white flex items-center gap-1.5 touch-manipulation active:scale-[0.98]"
                >
                  <span className="truncate max-w-[9rem]">{f.label}</span>
                  <X className="h-3 w-3 shrink-0 text-white/60" aria-hidden />
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  navigator.vibrate?.(10);
                  clearSecondaryFilters();
                }}
                className="shrink-0 h-7 px-2 text-[11px] font-semibold text-elec-yellow touch-manipulation"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Type filter row — grouped by category; non-core types appear only
              once the user has at least one, so the row stays short and relevant. */}
          <div className="hidden lg:flex items-center gap-1.5 px-4 pb-2.5 overflow-x-auto scrollbar-hide">
            {(() => {
              type ChipItem =
                | { kind: 'chip'; value: string; label: string }
                | { kind: 'divider'; key: string };
              // ELE-1306 — no 'All' chip here: the status row already carries the
              // global count, and a second "All 23" read as a duplicate. Tapping
              // the active type chip clears the type filter instead.
              const items: ChipItem[] = [];
              for (const group of TYPE_GROUPS) {
                const visible = group.types.filter(
                  (t) =>
                    CORE_TYPES.includes(t.value) ||
                    (countsData?.byType[t.value] ?? 0) > 0 ||
                    typeFilter === t.value
                );
                if (visible.length === 0) continue;
                if (items.length > 0) items.push({ kind: 'divider', key: `div-${group.label}` });
                for (const t of visible)
                  items.push({ kind: 'chip', value: t.value, label: t.label });
              }
              return items.map((item) => {
                if (item.kind === 'divider') {
                  return (
                    <div
                      key={item.key}
                      className="w-px h-4 bg-white/10 shrink-0 self-center"
                      aria-hidden
                    />
                  );
                }
                const { value, label } = item;
                const count =
                  value === 'all' ? countsData?.scopedTotal ?? 0 : countsData?.byType[value] ?? 0;
                return (
                  <button
                    key={value}
                    onClick={() => {
                      navigator.vibrate?.(10);
                      // Tap the active chip again to clear the type filter.
                      setTypeFilter(typeFilter === value ? 'all' : value);
                    }}
                    className={cn(
                      'flex-shrink-0 h-7 px-2.5 rounded-md text-[11px] font-medium transition-all touch-manipulation active:scale-[0.98] flex items-center gap-1.5',
                      typeFilter === value
                        ? 'bg-elec-yellow text-black border border-elec-yellow'
                        : 'bg-white/[0.03] text-white border border-white/[0.06] hover:bg-white/[0.06]'
                    )}
                  >
                    <span>{label}</span>
                    {count > 0 && (
                      <span
                        className={cn(
                          'text-[9px] px-1 py-0.5 rounded-sm tabular-nums leading-none',
                          typeFilter === value
                            ? 'bg-black/[0.15] text-black'
                            : 'bg-white/[0.06] text-white'
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              });
            })()}
          </div>

          {/* Date range filter row — ELE-1236 (NAPIT/NICEIC: "certs from the
              last 12 months"). Presets are rolling windows on last-updated;
              Custom reveals from/to date inputs. */}
          <div className="hidden lg:flex gap-2 px-4 pb-2.5 overflow-x-auto scrollbar-hide">
            {DATE_PRESETS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => {
                  navigator.vibrate?.(10);
                  setDatePreset(value);
                }}
                className={cn(
                  'flex-shrink-0 h-7 px-2.5 rounded-md text-[11px] font-medium transition-all touch-manipulation active:scale-[0.98]',
                  datePreset === value
                    ? 'bg-elec-yellow text-black border border-elec-yellow'
                    : 'bg-white/[0.03] text-white border border-white/[0.06] hover:bg-white/[0.06]'
                )}
              >
                {label}
              </button>
            ))}
          </div>
          {datePreset === 'custom' && (
            <div className="hidden lg:flex items-center gap-2 px-4 pb-2.5">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                aria-label="From date"
                className="h-9 flex-1 min-w-0 rounded-md bg-white/[0.04] border border-white/[0.08] px-2.5 text-xs text-white touch-manipulation focus:outline-none focus:border-elec-yellow/40 [color-scheme:dark]"
              />
              <span className="text-[11px] text-white shrink-0">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                aria-label="To date"
                className="h-9 flex-1 min-w-0 rounded-md bg-white/[0.04] border border-white/[0.08] px-2.5 text-xs text-white touch-manipulation focus:outline-none focus:border-elec-yellow/40 [color-scheme:dark]"
              />
            </div>
          )}

          {/* Plain hairline. The gold gradient rule that used to sit here was
              the last of the accent bars — the same one already stripped from
              Certificates, Specialist and Notices & Labels. Volt is for the
              things you press, not for decorating the page's seams. */}
          <div className="h-px bg-white/[0.08]" />

          {/* Bulk Actions Bar */}
          {isBulkMode && selectedReports.size > 0 && (
            <div className="px-4 pb-3">
              <BulkActionsBar
                selectedCount={selectedReports.size}
                onBulkDelete={() => setShowBulkDeleteDialog(true)}
                onBulkStatusChange={handleBulkStatusChange}
                onBulkExport={handleBulkExport}
                onDeselectAll={handleDeselectAll}
                isExporting={isExporting}
              />
            </div>
          )}
        </header>

        {/* Content */}
        <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefreshing}>
          {/* Matches the width the header and filter rows already run at, and
              the lg:max-w-[1600px] the other section pages settled on. The old
              centred max-w-6xl left the grid floating in the middle of a
              full-width header, which read as two different pages. */}
          <div className="px-4 py-4 lg:px-8 lg:max-w-[1600px]">
            {filteredReports.length === 0 ? (
              // ELE-1421 — a QS filtered to their team's work hasn't got an empty
              // library, they've got a team with nothing finished yet. Offering
              // "Create Certificate" here would be answering a question nobody
              // asked; the way out is back to their own certs.
              scope === 'team' &&
              !searchQuery &&
              statusFilter === 'all' &&
              typeFilter === 'all' &&
              datePreset === 'all' ? (
                <div className="mx-auto max-w-md py-16 text-center sm:py-24">
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Nothing from your team yet
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-white">
                    Certificates your team completes, or that you sign off as QS, appear here
                    alongside your own.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.vibrate?.(10);
                      changeScope('mine');
                    }}
                    className="mt-6 h-11 rounded-xl border border-white/[0.14] bg-white/[0.05] px-6 text-[13px] font-semibold text-white touch-manipulation active:scale-[0.98]"
                  >
                    Show my certificates
                  </button>
                </div>
              ) : activeLibraryFilters.length > 0 ? (
                /*
                  Filtered to nothing. "Try adjusting your search or filter
                  criteria" is the least useful sentence this screen can print:
                  the user has five controls and no idea which one is at fault.
                  So name every active filter, and make each one droppable on
                  its own — clearing all is the blunt option, not the only one.
                */
                <div className="mx-auto max-w-md py-14 text-center sm:py-20">
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Nothing matches
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-white">
                    {activeLibraryFilters.length === 1
                      ? 'One filter is narrowing your library. Tap it to remove it.'
                      : `${activeLibraryFilters.length} filters are narrowing your library. Tap one to remove it.`}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                    {activeLibraryFilters.map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => {
                          navigator.vibrate?.(10);
                          f.clear();
                        }}
                        aria-label={`Remove filter: ${f.label}`}
                        className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.14] bg-white/[0.05] pl-3 pr-2.5 text-[12px] font-medium text-white touch-manipulation active:scale-[0.98]"
                      >
                        <span className="max-w-[11rem] truncate">{f.label}</span>
                        <X className="h-3.5 w-3.5 shrink-0 text-white" aria-hidden />
                      </button>
                    ))}
                  </div>

                  {activeLibraryFilters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        navigator.vibrate?.(10);
                        clearAllLibraryFilters();
                      }}
                      className="mt-5 h-11 rounded-xl bg-elec-yellow px-6 text-[13px] font-bold text-black touch-manipulation active:scale-[0.98]"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                /* A genuinely empty library — no filters to blame. */
                <div className="mx-auto max-w-md py-16 text-center sm:py-24">
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    No certificates yet
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-white">
                    Everything you issue is stored here — searchable, exportable and ready to send
                    to a client or a scheme assessor.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.vibrate?.(10);
                      setShowNewCertSheet(true);
                    }}
                    className="mt-6 h-11 rounded-xl bg-elec-yellow px-6 text-[13px] font-bold text-black touch-manipulation active:scale-[0.98]"
                  >
                    New certificate
                  </button>
                </div>
              )
            ) : (
              <div className="space-y-2.5">
                {/* Section label — only when it says something the header
                    doesn't. At rest the page title already reads "My
                    Certificates / N certificates", so a second "Certificates
                    20" directly beneath it was pure duplication. It earns its
                    place once a type or scope narrows the list.
                    ELE-1421 — naming the scope is what tells a QS at a glance
                    they're looking at the company's work, not only their own. */}
                {(typeFilter !== 'all' || scope !== 'all') && (
                  <div className="flex items-end justify-between gap-3 px-0.5">
                    <h2 className="text-[14px] font-semibold tracking-tight text-white capitalize">
                      {typeFilter === 'all' ? 'Certificates' : typeFilter.replace(/-/g, ' ')}
                      {scope !== 'all' && (
                        <span className="ml-1.5 font-normal normal-case tracking-normal text-white">
                          · {scope === 'mine' ? 'mine only' : 'my team'}
                        </span>
                      )}
                    </h2>
                    <span className="text-[11px] text-white tabular-nums">
                      {sortedReports.length}
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3 items-stretch">
                  {sortedReports.map((report) => (
                    <CertificateCard
                      key={report.report_id}
                      certificate={toCertificateData(report)}
                      onTap={() => handleCardTap(report)}
                      onDelete={() => handleDeleteReport(report.report_id)}
                      onEdit={() => {
                        navigator.vibrate?.(10);
                        onEditReport(report.report_id, report.report_type);
                      }}
                      onConvert={
                        report.report_type === 'eic'
                          ? () => handleExportToEICR(report.report_id)
                          : undefined
                      }
                      isBulkMode={isBulkMode}
                      isSelected={selectedReports.has(report.report_id)}
                      onSelectToggle={() => handleSelectToggle(report.report_id)}
                      // ELE-1458 — every card in a status-filtered list carries
                      // the same state word, so it stops being information.
                      // Drafts are the exception: 'draft' and 'auto-draft' both
                      // land in that tab and the difference matters.
                      hideStatus={statusFilter !== 'all' && statusFilter !== 'draft'}
                    />
                  ))}
                </div>

                {/* ELE-NEW — Load More with X-of-Y context. totalCount comes
                    from the server for the current filtered set, so the user
                    sees how much is left to load within their selected tab. */}
                {(hasMore || totalCount > 0) && (
                  <div className="py-4 flex flex-col items-center gap-2">
                    <span className="text-[11px] text-white tabular-nums">
                      Showing {filteredReports.length} of {totalCount}
                      {typeFilter !== 'all' && ` ${typeFilter.replace(/-/g, ' ')}`}
                      {statusFilter !== 'all' && ` · ${STATUS_LABELS[statusFilter] ?? statusFilter}`}
                    </span>
                    {hasMore && (
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={isLoadingReports}
                        className="h-11 touch-manipulation"
                      >
                        {isLoadingReports ? 'Loading…' : 'Load more'}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </PullToRefresh>

        {/* FAB removed - using header + button instead */}
      </div>

      {/*
        ELE-1458 — Filters bottom sheet (phones only).

        Everything that used to stack above the list lives here: whose work,
        which type, and over what period. Grouped and labelled rather than
        rendered as three anonymous chip rails, because with the controls off
        screen the headings are the only thing telling you what you're setting.
        The footer counts the result so the sheet can be judged before closing.
      */}
      <Sheet open={showFiltersSheet} onOpenChange={setShowFiltersSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-background border-white/[0.06]"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="px-4 pt-5 pb-3 text-left shrink-0">
              <SheetTitle className="text-white text-[18px]">Filter certificates</SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
              {/* Whose certificates — only for accounts with team work. */}
              {(countsData?.team ?? 0) > 0 && (
                <section>
                  <h3 className="mb-2 text-[13px] font-semibold text-white">
                    Whose certificates
                  </h3>
                  <div className="space-y-1.5">
                    {SCOPE_OPTIONS.map(({ value, label, hint }) => {
                      const count =
                        value === 'all'
                          ? countsData?.total
                          : value === 'mine'
                            ? countsData?.mine
                            : countsData?.team;
                      return (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={scope === value}
                          onClick={() => {
                            navigator.vibrate?.(10);
                            changeScope(value);
                          }}
                          className={cn(
                            'w-full min-h-11 px-3 py-2.5 rounded-xl border text-left flex items-center gap-3 transition-colors touch-manipulation active:scale-[0.99]',
                            scope === value
                              ? 'bg-elec-yellow border-elec-yellow'
                              : 'bg-white/[0.03] border-white/[0.08]'
                          )}
                        >
                          <span className="min-w-0 flex-1">
                            <span
                              className={cn(
                                'block text-[13px] font-semibold',
                                scope === value ? 'text-black' : 'text-white'
                              )}
                            >
                              {label}
                            </span>
                            <span
                              className={cn(
                                'block text-[11px]',
                                scope === value ? 'text-black/70' : 'text-white'
                              )}
                            >
                              {hint}
                            </span>
                          </span>
                          {(count ?? 0) > 0 && (
                            <span
                              className={cn(
                                'shrink-0 text-[12px] font-semibold tabular-nums',
                                scope === value ? 'text-black/70' : 'text-white'
                              )}
                            >
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Certificate type — same "earn your place" rule as the desktop
                  rail: a type appears once the user has one, so a domestic
                  sparks never scrolls past BESS and lightning protection. */}
              <section>
                <h3 className="mb-2 text-[13px] font-semibold text-white">Certificate type</h3>
                <div className="space-y-3">
                  <button
                    type="button"
                    aria-pressed={typeFilter === 'all'}
                    onClick={() => {
                      navigator.vibrate?.(10);
                      setTypeFilter('all');
                    }}
                    className={cn(
                      'w-full h-11 rounded-xl border text-[13px] font-semibold transition-colors touch-manipulation active:scale-[0.99]',
                      typeFilter === 'all'
                        ? 'bg-elec-yellow border-elec-yellow text-black'
                        : 'bg-white/[0.03] border-white/[0.08] text-white'
                    )}
                  >
                    All types
                  </button>
                  {TYPE_GROUPS.map((group) => {
                    const visible = group.types.filter(
                      (t) =>
                        CORE_TYPES.includes(t.value) ||
                        (countsData?.byType[t.value] ?? 0) > 0 ||
                        typeFilter === t.value
                    );
                    if (visible.length === 0) return null;
                    return (
                      <div key={group.label}>
                        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                          {group.label}
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {visible.map((t) => {
                            const count = countsData?.byType[t.value] ?? 0;
                            const on = typeFilter === t.value;
                            return (
                              <button
                                key={t.value}
                                type="button"
                                aria-pressed={on}
                                onClick={() => {
                                  navigator.vibrate?.(10);
                                  setTypeFilter(on ? 'all' : t.value);
                                }}
                                className={cn(
                                  'h-11 px-3 rounded-xl border text-[13px] font-medium flex items-center justify-between gap-2 transition-colors touch-manipulation active:scale-[0.99]',
                                  on
                                    ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                                    : 'bg-white/[0.03] border-white/[0.08] text-white'
                                )}
                              >
                                <span className="truncate">{t.label}</span>
                                {count > 0 && (
                                  <span
                                    className={cn(
                                      'shrink-0 text-[11px] tabular-nums',
                                      on ? 'text-black/70' : 'text-white'
                                    )}
                                  >
                                    {count}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Time range — ELE-1236's rolling windows on last-updated. */}
              <section>
                <h3 className="mb-2 text-[13px] font-semibold text-white">Time range</h3>
                <div className="grid grid-cols-2 gap-1.5">
                  {DATE_PRESETS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={datePreset === value}
                      onClick={() => {
                        navigator.vibrate?.(10);
                        setDatePreset(value);
                      }}
                      className={cn(
                        'h-11 px-3 rounded-xl border text-[13px] font-medium transition-colors touch-manipulation active:scale-[0.99]',
                        datePreset === value
                          ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                          : 'bg-white/[0.03] border-white/[0.08] text-white'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {datePreset === 'custom' && (
                  <div className="mt-2.5 flex items-center gap-2">
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      aria-label="From date"
                      className="h-11 flex-1 min-w-0 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3 text-[13px] text-white touch-manipulation focus:outline-none focus:border-elec-yellow [color-scheme:dark]"
                    />
                    <span className="text-[12px] text-white shrink-0">to</span>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      aria-label="To date"
                      className="h-11 flex-1 min-w-0 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3 text-[13px] text-white touch-manipulation focus:outline-none focus:border-elec-yellow [color-scheme:dark]"
                    />
                  </div>
                )}
              </section>
            </div>

            <div className="shrink-0 border-t border-white/[0.08] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  navigator.vibrate?.(10);
                  clearSecondaryFilters();
                }}
                disabled={activeSecondaryFilters.length === 0}
                className="h-11 px-4 rounded-xl border border-white/[0.12] bg-white/[0.03] text-[13px] font-semibold text-white touch-manipulation disabled:opacity-40"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.vibrate?.(10);
                  setShowFiltersSheet(false);
                }}
                className="flex-1 h-11 rounded-xl bg-elec-yellow text-[13px] font-bold text-black touch-manipulation active:scale-[0.99]"
              >
                {/* Names the result rather than saying "Apply" — filters are
                    already live behind the sheet, so this button only closes.
                    totalCount is the server's count for the WHOLE active filter
                    set (scope + type + status + dates); statusCounts.all only
                    knows about scope and would overstate whenever a type or
                    date filter is on. */}
                {isFetchingReports ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Updating
                  </span>
                ) : (
                  <>
                    Show {totalCount} {totalCount === 1 ? 'certificate' : 'certificates'}
                  </>
                )}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* New Certificate Bottom Sheet */}
      <Sheet open={showNewCertSheet} onOpenChange={setShowNewCertSheet}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl bg-background border-white/[0.06]">
          <SheetHeader className="pb-4 text-left">
            <SheetTitle className="text-white text-[18px]">New Certificate</SheetTitle>
            <p className="text-[12px] text-white">Choose a certificate type to begin.</p>
          </SheetHeader>
          <div className="space-y-2 pb-6">
            {[
              { type: 'eicr', label: 'EICR', code: 'EICR', desc: 'Electrical Installation Condition Report', tile: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
              { type: 'eic', label: 'EIC', code: 'EIC', desc: 'Electrical Installation Certificate', tile: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
              { type: 'minor-works', label: 'Minor Works', code: 'MW', desc: 'Minor Electrical Installation Works', tile: 'bg-orange-500/15 text-orange-300 border-orange-500/30' },
            ].map(({ type, label, code, desc, tile }) => (
              <button
                key={type}
                onClick={() => {
                  navigator.vibrate?.(10);
                  setShowNewCertSheet(false);
                  onNavigate(type);
                }}
                className="group w-full rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-elec-yellow/30 active:scale-[0.98] transition-all touch-manipulation text-left"
              >
                <div className="flex items-center gap-3.5 p-3.5">
                  {/* Type icon tile — matches the certificate cards */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border',
                      tile
                    )}
                  >
                    <span className="text-[12px] font-bold tracking-wide">{code}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-[15px] leading-snug group-hover:text-elec-yellow transition-colors">
                      {label}
                    </p>
                    <p className="text-[11.5px] text-white mt-0.5 truncate">{desc}</p>
                  </div>
                  <span className="text-[12px] font-bold text-elec-yellow shrink-0">Open</span>
                </div>
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Certificate Action Sheet */}
      <CertificateActionSheet
        open={actionSheetOpen}
        onOpenChange={setActionSheetOpen}
        certificate={
          selectedCertificate
            ? {
                id: selectedCertificate.report_id,
                reportType: selectedCertificate.report_type,
                clientName: selectedCertificate.client_name || undefined,
                hasCustomer: !!selectedCertificate.customer_id,
                canExportToEICR:
                  (selectedCertificate.report_type === 'eic' ||
                    selectedCertificate.report_type === 'minor-works') &&
                  (selectedCertificate.status === 'completed' ||
                    selectedCertificate.status === 'in-progress'),
                canExportToEIC:
                  selectedCertificate.report_type === 'eicr' &&
                  selectedCertificate.status === 'completed' &&
                  // ELE-1342 — 'yes' or 'yes-with-recommendations' both convert.
                  Boolean(
                    selectedCertificate.data?.satisfactoryForContinuedUse
                      ?.toLowerCase()
                      .startsWith('yes')
                  ),
              }
            : null
        }
        readOnly={!!selectedCertificate?.is_team_cert}
        ownerName={
          selectedCertificate?.is_team_cert
            ? selectedCertificate.owner_name || 'Team member'
            : undefined
        }
        onEdit={() => {
          if (selectedCertificate) {
            navigator.vibrate?.(10);
            onEditReport(selectedCertificate.report_id, selectedCertificate.report_type);
            setActionSheetOpen(false);
          }
        }}
        onPreview={() => {
          if (selectedCertificate) {
            handleDownloadPdf(selectedCertificate.report_id);
          }
        }}
        schemeCertificate={schemeCert}
        onOpenSchemeCertificate={
          schemeCert
            ? () => openOrDownloadPdf(schemeCert.url, schemeCert.name || 'scheme-certificate.pdf')
            : undefined
        }
        onShare={
          selectedCertificate?.status === 'completed'
            ? () => handleSharePdf(selectedCertificate)
            : undefined
        }
        onConvertToEICR={() => {
          if (selectedCertificate) {
            handleExportToEICR(selectedCertificate.report_id);
          }
        }}
        onExportToEIC={() => {
          if (selectedCertificate) {
            handleExportToEIC(selectedCertificate.report_id);
          }
        }}
        onLinkCustomer={() => {
          if (selectedCertificate) {
            handleLinkCustomer(selectedCertificate.report_id);
          }
        }}
        onUnlinkCustomer={() => {
          if (selectedCertificate) {
            handleUnlinkCustomer(selectedCertificate.report_id);
            setActionSheetOpen(false);
          }
        }}
        onDelete={() => {
          if (selectedCertificate) {
            handleDeleteReport(selectedCertificate.report_id);
          }
        }}
        onDuplicate={
          // ELE-1443 — only offer the action on types that support it. It used
          // to be shown unconditionally, so tapping it on an EV cert (or a PAT
          // test, or a notice) surfaced a red "not available yet" error.
          // Passing undefined hides the row entirely.
          selectedCertificate && isDuplicable(selectedCertificate.report_type)
            ? () => {
                handleDuplicate(selectedCertificate.report_id, selectedCertificate.report_type);
              }
            : undefined
        }
      />

      {/* ELE-881 — Confirmation for duplicating large certs */}
      <AlertDialog
        open={!!duplicateConfirm}
        onOpenChange={(open) => {
          if (!open) setDuplicateConfirm(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Duplicate this certificate?</AlertDialogTitle>
            <AlertDialogDescription>
              This {duplicateConfirm?.reportType.toUpperCase()} has{' '}
              <strong>{duplicateConfirm?.circuitCount} circuits</strong>. A copy will be
              created with the same supply, board and circuit setup — client name, address,
              dates and signatures will be cleared.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const c = duplicateConfirm;
                setDuplicateConfirm(null);
                if (c) void performDuplicate(c.reportId, c.reportType);
              }}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Duplicate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Certificate</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this certificate? It will be removed from all your
              devices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                navigator.vibrate?.(100);
                confirmDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Dialog */}
      <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {selectedReports.size} Certificate{selectedReports.size > 1 ? 's' : ''}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedReports.size} certificate
              {selectedReports.size > 1 ? 's' : ''}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                navigator.vibrate?.(100);
                handleBulkDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete All'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Import Dialog */}
      <CertificateImportDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImportComplete={() => {
          refetchReports();
          setShowImportDialog(false);
        }}
      />

      {/* Link Customer Sheet */}
      <Sheet open={linkCustomerDialogOpen} onOpenChange={setLinkCustomerDialogOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-background border-white/[0.06]">
          <div className="flex flex-col h-full">
            <SheetHeader className="px-5 py-4 border-b border-white/[0.06]">
              <SheetTitle className="text-white text-base font-semibold">Link to Customer</SheetTitle>
              {reportToLink && (
                <p className="text-xs text-white mt-0.5">
                  Certificate <span className="font-mono text-elec-yellow">{reportToLink.report_id.split('-').slice(-1)[0]}</span>
                </p>
              )}
            </SheetHeader>

            <div className="flex-1 overflow-hidden">
              <Command className="h-full border-0 bg-transparent">
                <CommandInput
                  placeholder="Search customers..."
                  value={customerSearchQuery}
                  onValueChange={setCustomerSearchQuery}
                  className="h-12 text-base bg-transparent border-white/[0.06] text-white placeholder:text-white/30"
                />
                <CommandList className="flex-1 max-h-none overflow-y-auto">
                  <CommandEmpty>
                    <div className="py-8 text-center">
                      <p className="text-sm text-white">
                        {isLoadingCustomers ? 'Loading customers...' : 'No customers found'}
                      </p>
                    </div>
                  </CommandEmpty>
                  <CommandGroup heading="Your Customers">
                    {filteredCustomers.map((customer) => (
                      <CommandItem
                        key={customer.id}
                        value={customer.name}
                        onSelect={() => confirmLinkCustomer(customer.id)}
                        className="cursor-pointer py-3 px-5 touch-manipulation active:bg-white/[0.06] rounded-xl mx-2"
                        disabled={isLinking}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-white">{customer.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[13px] text-white truncate">{customer.name}</p>
                            {customer.address && (
                              <p className="text-[11px] text-white truncate">{customer.address}</p>
                            )}
                          </div>

                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>

            {isLinking && (
              <div className="flex items-center justify-center gap-2 py-3 border-t border-white/[0.06]">
                <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                <span className="text-sm text-white">Linking...</span>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Export EICR to EIC Dialog */}
      {exportToEICReportId && (
        <ExportToEICDialog
          open={exportToEICDialogOpen}
          onOpenChange={setExportToEICDialogOpen}
          reportId={exportToEICReportId}
          onExportComplete={handleExportToEICComplete}
        />
      )}

      {/* Export EIC to EICR Dialog */}
      {exportToEICRReportId && (
        <ExportToEICRDialog
          open={exportToEICRDialogOpen}
          onOpenChange={setExportToEICRDialogOpen}
          reportId={exportToEICRReportId}
          onExportComplete={handleExportToEICRComplete}
        />
      )}
    </>
  );
};

export default MyReports;
