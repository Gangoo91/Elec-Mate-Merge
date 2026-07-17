import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import {
  Check,
  ChevronRight,
  Clock,
  CornerUpLeft,
  FileText,
  Loader2,
  PenLine,
  Search,
  UserRound,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useHaptic } from '@/hooks/useHaptic';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useApproveQsReview, useReturnQsReview } from '@/hooks/useQsReviewQueue';
import { useQsTeamContext } from '@/hooks/useQsReview';
import { supabase } from '@/integrations/supabase/client';

/**
 * Team Certificates — the QS's working stack (Craig, 2026-07-17).
 *
 * Opens on "Needs attention": certs awaiting sign-off (with ONE-TAP approve
 * using the QS's stored signature, and return-with-comment), work gone stale,
 * and completed-but-unreviewed certs. "All" is the full library. Every row
 * shows originator + version; a QS edit bumps the badge to V2 (amber) and
 * tapping it reveals exactly what changed and when — the audit story a scheme
 * assessor wants and the trust signal the engineer needs.
 */

const ROUTED_REPORT_TYPES = new Set(['eicr', 'eic', 'minor-works', 'testing-only', 'pat-testing']);

const TYPE_LABELS: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
  'testing-only': 'Testing Only',
  'pat-testing': 'PAT Testing',
  'ev-charging': 'EV Charging',
  'fire-alarm': 'Fire Alarm',
  'emergency-lighting': 'Emergency Lighting',
  'solar-pv': 'Solar PV',
};

const FIELD_LABELS: Record<string, string> = {
  data: 'Certificate contents',
  status: 'Status',
  client_name: 'Client',
  installation_address: 'Installation address',
  inspection_date: 'Inspection date',
  inspector_name: 'Inspector',
  certificate_number: 'Certificate number',
  customer_id: 'Linked customer',
  pdf_url: 'PDF',
  pdf_generated_at: 'PDF',
  pdf_payload: 'PDF data',
  locked_at: 'Lock state',
};

const STALE_DAYS = 5;

interface TeamReportRow {
  id: string;
  report_id: string;
  report_type: string;
  certificate_number: string | null;
  client_name: string | null;
  installation_address: string | null;
  status: string;
  updated_at: string;
  user_id: string;
}

interface EditLogRow {
  report_uuid: string;
  editor_id: string;
  changed_columns: string[];
  created_at: string;
}

interface ReviewRow {
  id: string;
  report_uuid: string;
  status: string;
}

const baseVersion = (reportId: string): number => {
  const m = /-v(\d+)$/i.exec(reportId);
  return m ? parseInt(m[1], 10) : 1;
};

const statusDot = (status: string) =>
  status === 'completed'
    ? 'bg-emerald-400'
    : status === 'in-progress'
      ? 'bg-amber-400'
      : 'bg-white/40';

const ago = (iso: string) =>
  formatDistanceToNow(new Date(iso), { addSuffix: true }).replace('about ', '');

const TeamCertificatesSection: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const haptic = useHaptic();
  const { companyProfile } = useCompanyProfile();
  const { getDefaultProfile } = useInspectorProfiles();
  const approveMutation = useApproveQsReview();
  const returnMutation = useReturnQsReview();
  const { data: qsCtx } = useQsTeamContext();

  // A designated principal QS is a team MEMBER — the company (and its roster,
  // reviews) belong to the owner's id, not theirs. The owner's own id applies
  // otherwise. Without this, a principal QS sees an empty workspace.
  const employerId =
    qsCtx?.is_team_member && qsCtx?.am_i_qs && qsCtx?.employer_id ? qsCtx.employer_id : user?.id;

  const [view, setView] = useState<'attention' | 'all'>('attention');
  const [ownerFilter, setOwnerFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [diffReport, setDiffReport] = useState<TeamReportRow | null>(null);
  const [returnTarget, setReturnTarget] = useState<{ reviewId: string; label: string } | null>(
    null
  );
  const [returnComment, setReturnComment] = useState('');
  const [actingReviewId, setActingReviewId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['team-certificates', employerId],
    enabled: !!employerId,
    staleTime: 30_000,
    queryFn: async () => {
      const { data: members, error: memberErr } = await supabase
        .from('employer_employees')
        .select('user_id')
        .eq('employer_id', employerId!)
        .eq('status', 'Active')
        .not('user_id', 'is', null)
        .not('claimed_at', 'is', null);
      if (memberErr) throw memberErr;

      const memberIds = Array.from(
        new Set([employerId!, ...(members ?? []).map((m) => m.user_id as string)])
      );

      const [{ data: profiles }, { data: reports, error: reportErr }, { data: reviews }] =
        await Promise.all([
          supabase.from('profiles').select('id, full_name').in('id', memberIds),
          supabase
            .from('reports')
            .select(
              'id, report_id, report_type, certificate_number, client_name, installation_address, status, updated_at, user_id'
            )
            .in('user_id', memberIds)
            .is('deleted_at', null)
            .neq('status', 'auto-draft')
            .order('updated_at', { ascending: false })
            .limit(200),
          supabase
            .from('report_qs_reviews')
            .select('id, report_uuid, status')
            .eq('employer_id', employerId!)
            .in('status', ['pending', 'approved']),
        ]);
      if (reportErr) throw reportErr;

      const reportUuids = (reports ?? []).map((r) => r.id as string);
      let edits: EditLogRow[] = [];
      if (reportUuids.length > 0) {
        const { data: editRows } = await supabase
          .from('report_edit_log')
          .select('report_uuid, editor_id, changed_columns, created_at')
          .in('report_uuid', reportUuids)
          .order('created_at', { ascending: false });
        edits = (editRows ?? []) as EditLogRow[];
      }

      const editsByReport = new Map<string, EditLogRow[]>();
      for (const e of edits) {
        const list = editsByReport.get(e.report_uuid) ?? [];
        list.push(e);
        editsByReport.set(e.report_uuid, list);
      }

      const pendingReviewByReport = new Map<string, ReviewRow>();
      const approvedReports = new Set<string>();
      for (const rv of (reviews ?? []) as ReviewRow[]) {
        if (rv.status === 'pending') pendingReviewByReport.set(rv.report_uuid, rv);
        if (rv.status === 'approved') approvedReports.add(rv.report_uuid);
      }

      return {
        reports: (reports ?? []) as TeamReportRow[],
        names: new Map<string, string>(
          (profiles ?? []).map((p) => [p.id as string, (p.full_name as string) || 'Team member'])
        ),
        editsByReport,
        pendingReviewByReport,
        approvedReports,
      };
    },
  });

  // Stored signature for one-tap approve (same sources the EIC auto-fill uses).
  const storedSignature =
    getDefaultProfile()?.signatureData || companyProfile?.signature_data || null;
  const reviewerName =
    getDefaultProfile()?.name || companyProfile?.inspector_name || companyProfile?.company_name || '';

  const matchesFilters = React.useCallback(
    (r: TeamReportRow): boolean => {
      if (ownerFilter && r.user_id !== ownerFilter) return false;
      if (!search.trim()) return true;
      const q = search.trim().toLowerCase();
      return Boolean(
        r.client_name?.toLowerCase().includes(q) ||
          r.installation_address?.toLowerCase().includes(q) ||
          r.certificate_number?.toLowerCase().includes(q) ||
          data?.names.get(r.user_id)?.toLowerCase().includes(q)
      );
    },
    [ownerFilter, search, data]
  );

  const buckets = useMemo(() => {
    const rows = (data?.reports ?? []).filter(matchesFilters);
    const staleCutoff = Date.now() - STALE_DAYS * 24 * 60 * 60 * 1000;
    const awaiting = rows.filter((r) => data?.pendingReviewByReport.has(r.id));
    const stale = rows.filter(
      (r) =>
        !data?.pendingReviewByReport.has(r.id) &&
        (r.status === 'in-progress' || r.status === 'draft') &&
        new Date(r.updated_at).getTime() < staleCutoff
    );
    const unreviewed = rows.filter(
      (r) =>
        r.status === 'completed' &&
        !data?.pendingReviewByReport.has(r.id) &&
        !data?.approvedReports.has(r.id) &&
        r.user_id !== user?.id
    );
    return { awaiting, stale, unreviewed, all: rows };
  }, [data, matchesFilters, user?.id]);

  // Per-engineer chips with live counts.
  const engineerChips = useMemo(() => {
    const rows = data?.reports ?? [];
    const byOwner = new Map<string, { pending: number; total: number }>();
    for (const r of rows) {
      const entry = byOwner.get(r.user_id) ?? { pending: 0, total: 0 };
      entry.total += 1;
      if (data?.pendingReviewByReport.has(r.id)) entry.pending += 1;
      byOwner.set(r.user_id, entry);
    }
    return Array.from(byOwner.entries())
      .map(([id, counts]) => ({
        id,
        name: id === user?.id ? 'You' : (data?.names.get(id) ?? 'Team member'),
        ...counts,
      }))
      .sort((a, b) => b.pending - a.pending || b.total - a.total);
  }, [data, user?.id]);

  // Two live conventions (verified against InspectionRoutes/InspectionIndex):
  // eicr/eic/minor-works are query-param sections; pat-testing/testing-only
  // are path routes — BOTH keyed on the report_id STRING, never the row uuid.
  const openReport = (r: TeamReportRow) => {
    if (['eicr', 'eic', 'minor-works'].includes(r.report_type)) {
      navigate(
        `/electrician/inspection-testing?section=${r.report_type}&reportId=${encodeURIComponent(r.report_id)}`
      );
    } else if (['pat-testing', 'testing-only'].includes(r.report_type)) {
      navigate(`/electrician/inspection-testing/${r.report_type}/${encodeURIComponent(r.report_id)}`);
    } else {
      navigate('/electrician/inspection-testing?section=my-reports');
    }
  };

  const handleApprove = async (r: TeamReportRow) => {
    const review = data?.pendingReviewByReport.get(r.id);
    if (!review) return;
    if (!storedSignature) {
      toast({
        title: 'Add your signature first',
        description: 'Save your signature in Business Settings to approve with one tap.',
      });
      openReport(r);
      return;
    }
    setActingReviewId(review.id);
    try {
      await approveMutation.mutateAsync({
        reviewId: review.id,
        signature: storedSignature,
        reviewerName,
      });
      haptic.success();
      toast({ title: 'Approved', description: `${TYPE_LABELS[r.report_type] || 'Certificate'} countersigned.` });
      refetch();
    } catch (error) {
      toast({
        title: 'Approve failed',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setActingReviewId(null);
    }
  };

  const handleReturn = async () => {
    if (!returnTarget || !returnComment.trim()) return;
    setActingReviewId(returnTarget.reviewId);
    try {
      await returnMutation.mutateAsync({
        reviewId: returnTarget.reviewId,
        comments: returnComment.trim(),
      });
      haptic.success();
      toast({ title: 'Returned', description: 'Sent back with your comments.' });
      setReturnTarget(null);
      setReturnComment('');
      refetch();
    } catch (error) {
      toast({
        title: 'Return failed',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setActingReviewId(null);
    }
  };

  const renderRow = (r: TeamReportRow, opts?: { quickActions?: boolean }) => {
    const ownerName = r.user_id === user?.id ? 'You' : (data?.names.get(r.user_id) ?? 'Team member');
    const editList = data?.editsByReport.get(r.id) ?? [];
    const lastEdit = editList[0];
    const version = baseVersion(r.report_id) + (lastEdit ? 1 : 0);
    const review = data?.pendingReviewByReport.get(r.id);
    const acting = review && actingReviewId === review.id;
    return (
      <div
        key={r.id}
        className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 transition-all hover:bg-white/[0.05]"
      >
        {/* Row is a keyboard-accessible div (not a <button>) so the version
            controls below can be real nested buttons — button-in-button is
            invalid HTML and swallows child taps on iOS Safari. */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => openReport(r)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openReport(r);
            }
          }}
          className="flex w-full cursor-pointer items-start gap-3 text-left touch-manipulation"
        >
          <div className={cn('mt-1.5 h-2 w-2 flex-shrink-0 rounded-full', statusDot(r.status))} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-white/[0.07] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/80">
                {TYPE_LABELS[r.report_type] || r.report_type.replace(/-/g, ' ')}
              </span>
              <span
                className={cn(
                  'rounded-md px-1.5 py-0.5 text-[10px] font-semibold',
                  lastEdit
                    ? 'border border-amber-500/25 bg-amber-500/15 text-amber-300'
                    : 'bg-white/[0.05] text-white/60'
                )}
              >
                V{version}
              </span>
              {r.certificate_number && (
                <span className="truncate text-[11px] text-white/45">{r.certificate_number}</span>
              )}
            </div>
            <p className="mt-1 truncate text-[14px] font-medium text-white">
              {r.installation_address?.split('\n')[0] || r.client_name || 'Unnamed job'}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-white/55">
              <span className="inline-flex items-center gap-1">
                <UserRound className="h-3 w-3" /> {ownerName}
              </span>
              <span className="text-white/25">·</span>
              <span>{ago(r.updated_at)}</span>
              {lastEdit && (
                <>
                  <span className="text-white/25">·</span>
                  {/* Thumb-friendly history target (padding gives ~40px hit) */}
                  <button
                    type="button"
                    aria-label="View version history"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDiffReport(r);
                    }}
                    className="-my-1 inline-flex items-center gap-1 py-1 text-amber-300 touch-manipulation active:opacity-70"
                  >
                    <PenLine className="h-3 w-3" /> edited by{' '}
                    {lastEdit.editor_id === user?.id
                      ? 'you'
                      : (data?.names.get(lastEdit.editor_id) ?? 'QS')}
                  </button>
                </>
              )}
            </div>
          </div>
          <ChevronRight className="mt-2 h-4 w-4 flex-shrink-0 text-white/30" />
        </div>

        {opts?.quickActions && review && (
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            <button
              type="button"
              disabled={!!acting}
              onClick={() => handleApprove(r)}
              className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-[12px] font-semibold text-emerald-300 touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              {acting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Approve
            </button>
            <button
              type="button"
              disabled={!!acting}
              onClick={() =>
                setReturnTarget({
                  reviewId: review.id,
                  label: r.certificate_number || r.report_id,
                })
              }
              className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.05] text-[12px] font-semibold text-white touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              <CornerUpLeft className="h-4 w-4" />
              Return
            </button>
          </div>
        )}
      </div>
    );
  };

  const bucketHeader = (label: string, count: number, icon?: React.ReactNode) => (
    <div className="flex items-center gap-2 pt-2">
      {icon}
      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">{label}</p>
      <span className="rounded-md bg-white/[0.07] px-1.5 py-0.5 text-[10px] font-semibold text-white/70">
        {count}
      </span>
    </div>
  );

  const diffEdits = diffReport ? (data?.editsByReport.get(diffReport.id) ?? []) : [];

  return (
    <div className="space-y-3">
      {/* View toggle — count as a pill so the label never wraps on 360px */}
      <div className="grid grid-cols-2 gap-1.5">
        {(
          [
            {
              key: 'attention',
              label: 'Needs attention',
              count: buckets.awaiting.length + buckets.stale.length + buckets.unreviewed.length,
            },
            { key: 'all', label: 'All certificates', count: null },
          ] as const
        ).map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            onClick={() => setView(key)}
            className={cn(
              'flex h-10 items-center justify-center gap-1.5 rounded-xl px-2 text-[12.5px] font-semibold leading-tight touch-manipulation active:scale-[0.98] transition-all',
              view === key
                ? 'bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow'
                : 'bg-white/[0.04] border border-white/[0.08] text-white'
            )}
          >
            <span className="truncate">{label}</span>
            {count != null && count > 0 && (
              <span
                className={cn(
                  'flex-shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold',
                  view === key ? 'bg-elec-yellow/25 text-elec-yellow' : 'bg-white/[0.08] text-white/80'
                )}
              >
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Engineer chips with counts */}
      {engineerChips.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {engineerChips.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setOwnerFilter(ownerFilter === e.id ? null : e.id)}
              className={cn(
                'flex h-8 flex-shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-medium touch-manipulation active:scale-[0.98] transition-all',
                ownerFilter === e.id
                  ? 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25'
                  : 'bg-white/[0.04] text-white border border-white/[0.08]'
              )}
            >
              {e.name}
              {e.pending > 0 && (
                <span className="rounded bg-amber-500/20 px-1 text-[10px] font-semibold text-amber-300">
                  {e.pending} pending
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search client, address, cert no, engineer…"
          className="h-11 pl-9 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"
        />
      </div>

      {isLoading && (
        <p className="py-10 text-center text-[13px] text-white/50">Loading team certificates…</p>
      )}

      {!isLoading && view === 'attention' && (
        <div className="space-y-2.5">
          {buckets.awaiting.length > 0 &&
            bucketHeader('Awaiting your sign-off', buckets.awaiting.length, <Check className="h-3.5 w-3.5 text-elec-yellow" />)}
          {buckets.awaiting.map((r) => renderRow(r, { quickActions: true }))}

          {buckets.stale.length > 0 &&
            bucketHeader(`In progress ${STALE_DAYS}+ days`, buckets.stale.length, <Clock className="h-3.5 w-3.5 text-amber-400" />)}
          {buckets.stale.map((r) => renderRow(r))}

          {buckets.unreviewed.length > 0 &&
            bucketHeader('Completed — not reviewed', buckets.unreviewed.length, <FileText className="h-3.5 w-3.5 text-white/50" />)}
          {buckets.unreviewed.map((r) => renderRow(r))}

          {buckets.awaiting.length + buckets.stale.length + buckets.unreviewed.length === 0 && (
            <div className="py-12 text-center">
              <Check className="mx-auto h-8 w-8 text-emerald-400/60" />
              <p className="mt-3 text-[14px] font-medium text-white">All caught up</p>
              <p className="mt-1 text-[12px] text-white/50">
                Nothing needs your attention right now.
              </p>
            </div>
          )}
        </div>
      )}

      {!isLoading && view === 'all' && (
        <div className="space-y-2">
          {buckets.all.map((r) => renderRow(r, { quickActions: true }))}
          {buckets.all.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-8 w-8 text-white/25" />
              <p className="mt-3 text-[14px] font-medium text-white">No certificates found</p>
            </div>
          )}
        </div>
      )}

      {/* V2 diff sheet — what changed, by whom, when */}
      <Sheet open={!!diffReport} onOpenChange={(o) => !o && setDiffReport(null)}>
        <SheetContent side="bottom" className="p-0 rounded-t-2xl overflow-hidden lg:left-64">
          <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-white/20" aria-hidden />
          <div className="max-h-[70vh] overflow-y-auto p-4 pb-8">
            <p className="text-[15px] font-semibold text-white">Version history</p>
            <p className="mt-0.5 text-[12px] text-white/60">
              {diffReport?.certificate_number || diffReport?.report_id}
            </p>
            <div className="mt-4 space-y-3">
              {diffEdits.map((e, i) => (
                <div key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                  <div className="flex items-center gap-2 text-[12px] text-white">
                    <PenLine className="h-3.5 w-3.5 text-amber-300" />
                    <span className="font-semibold">
                      {e.editor_id === user?.id ? 'You' : (data?.names.get(e.editor_id) ?? 'QS')}
                    </span>
                    <span className="text-white/45">{ago(e.created_at)}</span>
                  </div>
                  <p className="mt-1.5 text-[12px] text-white/70">
                    Changed:{' '}
                    {Array.from(
                      new Set(
                        (e.changed_columns ?? [])
                          .map((c) => FIELD_LABELS[c] ?? c)
                          .filter(Boolean)
                      )
                    ).join(', ') || 'minor details'}
                  </p>
                </div>
              ))}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                <div className="flex items-center gap-2 text-[12px] text-white">
                  <UserRound className="h-3.5 w-3.5 text-white/60" />
                  <span className="font-semibold">
                    {diffReport && diffReport.user_id === user?.id
                      ? 'You'
                      : (diffReport && data?.names.get(diffReport.user_id)) || 'Engineer'}
                  </span>
                  <span className="text-white/45">created V{diffReport ? baseVersion(diffReport.report_id) : 1}</span>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Return-with-comment sheet */}
      <Sheet open={!!returnTarget} onOpenChange={(o) => !o && setReturnTarget(null)}>
        <SheetContent side="bottom" className="p-0 rounded-t-2xl overflow-hidden lg:left-64">
          <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-white/20" aria-hidden />
          <div className="p-4 pb-8 space-y-3">
            <p className="text-[15px] font-semibold text-white">Return {returnTarget?.label}</p>
            <p className="text-[12px] text-white/60">
              Tell the engineer what needs fixing — they'll get a notification and can resubmit.
            </p>
            <Textarea
              value={returnComment}
              onChange={(e) => setReturnComment(e.target.value)}
              placeholder="e.g. Zs readings missing on circuits 4–6, and check the bonding note…"
              className="min-h-[100px] text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"
            />
            <button
              type="button"
              disabled={!returnComment.trim() || !!actingReviewId}
              onClick={handleReturn}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-sm font-semibold text-black touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              {actingReviewId ? <Loader2 className="h-4 w-4 animate-spin" /> : <CornerUpLeft className="h-4 w-4" />}
              Return with comments
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TeamCertificatesSection;
