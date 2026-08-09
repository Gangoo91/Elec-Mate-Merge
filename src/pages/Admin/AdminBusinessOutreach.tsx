import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  Eyebrow,
} from '@/components/admin/editorial';
import { RefreshCw, Send, Upload, Loader2, TestTube, Ban, Trash2 } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import {
  BUSINESS_POOL_TAG,
  STAGE_META,
  STAGE_ORDER,
  MASTER_TEMPLATE_SLUG,
  agoLabel,
  sourceLabel,
  templateForSource,
  useBusinessOutreachPipeline,
  type OutreachContact,
  type PipelineRow,
  type PipelineStage,
} from '@/hooks/useBusinessOutreachPipeline';

interface BusinessCampaign {
  id: string;
  name: string;
  subject: string;
  status: string;
  total_recipients: number;
  sent_count: number;
  failed_count: number;
  open_count: number;
  click_count: number;
  bounce_count: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

const BATCH_SIZE = 100;
const INTER_BATCH_GAP_MS = 500;

/* Validated dark-surface series. Never an orange or a brown. */
const SERIES_BLUE = '#3987E5';
const STATUS_WARNING = '#FAB219';
const STATUS_BAD = '#E66767';

/** A bounce rate above this is the point at which mailbox providers start throttling. */
const BOUNCE_RATE_ALARM = 5;

/** Contacted-and-forgotten past this many days is the backlog this page exists to clear. */
const STALE_DAYS = 30;

type SortKey = 'stale' | 'newest' | 'company';

function getInitials(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '??';
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

async function callOutreach<T = unknown>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  const { data, error } = await supabase.functions.invoke('send-outreach-campaign', {
    body: { action, ...payload },
  });
  if (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = (error as any)?.context;
    let detail = error.message || 'Edge function failed';
    if (ctx && typeof ctx.text === 'function') {
      try {
        const raw = await ctx.text();
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (parsed?.error) detail = parsed.error;
            else if (parsed?.message) detail = parsed.message;
            else detail = raw.slice(0, 400);
          } catch {
            detail = raw.slice(0, 400);
          }
        }
      } catch {
        /* ignore body read failure */
      }
    }
    throw new Error(detail);
  }
  if (data?.error) throw new Error(data.error);
  return data as T;
}

function parseCsvRows(raw: string): Array<{
  email: string;
  name: string | null;
  organisation: string | null;
  role: string | null;
  contact_type: string;
  tags: string[];
  source: string;
}> {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return [];

  const firstHasEmail = lines[0].toLowerCase().includes('email');
  const header = firstHasEmail ? lines[0].split(',').map((c) => c.trim().toLowerCase()) : null;
  const dataLines = firstHasEmail ? lines.slice(1) : lines;

  const col = (name: string) => (header ? header.indexOf(name) : -1);
  const iEmail = col('email') >= 0 ? col('email') : 0;
  const iName = col('name');
  const iOrg =
    col('organisation') >= 0
      ? col('organisation')
      : col('organization') >= 0
        ? col('organization')
        : col('company');
  const iRole = col('role') >= 0 ? col('role') : col('title') >= 0 ? col('title') : col('position');
  const iTags = col('tags');

  return dataLines
    .map((line) => {
      const cells = line.split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
      const email = (cells[iEmail] || '').toLowerCase();
      if (!email || !email.includes('@')) return null;
      const extraTags =
        iTags >= 0 && cells[iTags] ? cells[iTags].split(/[;|]/).map((t) => t.trim()) : [];
      return {
        email,
        name: iName >= 0 ? cells[iName] || null : null,
        organisation: iOrg >= 0 ? cells[iOrg] || null : null,
        role: iRole >= 0 ? cells[iRole] || null : null,
        contact_type: 'employer',
        tags: Array.from(new Set([BUSINESS_POOL_TAG, 'source:csv_import', ...extraTags])),
        source: 'admin_csv_paste',
      };
    })
    .filter(<T,>(x: T | null): x is T => x !== null);
}

/**
 * A stage badge in the stage's own validated colour.
 *
 * The shared `Pill` only accepts the Tone union, whose purples and blues are
 * Tailwind's, not the validated series. Colour is load-bearing here — the same
 * four hues carry the stacked bar, the 2×2 grid and every row — so the badge
 * takes the hex straight from STAGE_META and the three surfaces cannot drift.
 */
function StageBadge({ stage, className }: { stage: PipelineStage; className?: string }) {
  const meta = STAGE_META[stage];
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white',
        className
      )}
      style={{ borderColor: `${meta.fill}59`, background: `${meta.fill}1F` }}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: meta.fill }} />
      {meta.short}
    </span>
  );
}

export default function AdminBusinessOutreach() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<PipelineStage | 'all'>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('stale');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [testEmail, setTestEmail] = useState('');
  const [testOpen, setTestOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [confirmSend, setConfirmSend] = useState<{ count: number; ids: string[] } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string[] | null>(null);
  const [batchProgress, setBatchProgress] = useState<{
    running: boolean;
    sent: number;
    remaining: number;
    failed: number;
    campaignName: string;
  }>({ running: false, sent: 0, remaining: 0, failed: 0, campaignName: '' });

  useEffect(() => {
    callOutreach('seed_templates').catch((err) => {
      console.warn('Template seed failed (non-fatal):', err);
    });
  }, []);

  /*
    One fetch of the pool, then everything is derived from it in the browser.

    `search` used to be part of this query key AND passed to the edge function
    as a server-side filter, so every keystroke in the search box fired a fresh
    `get_contacts` call asking for up to 15,000 rows — six round trips and six
    full pool downloads to type "london". Worse, it made the headline numbers
    move as you typed: the "All" count and the per-source counts were computed
    from whatever the search had left behind, so the page silently re-scoped
    itself mid-glance. The pool is already in memory; searching it is a filter,
    not a query.
  */
  const {
    data: contactsData,
    isLoading: contactsLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['business-outreach-contacts'],
    queryFn: async () =>
      await callOutreach<{ contacts: OutreachContact[]; total: number }>('get_contacts', {
        limit: 15000,
        tag: BUSINESS_POOL_TAG,
      }),
    staleTime: 30 * 1000,
  });

  /*
    Campaign history, business only.

    `get_stats` — which used to feed all four headline cards — sums every
    campaign row in the table with no name filter at all, so the College sends
    (1,059 + 1,066 + 517 + 1,893 + 135 recipients) were being counted as
    business outreach. It reported 18 campaigns and 17,089 emails on a page
    whose own campaign list, correctly filtered to `Business —`, showed five.
    Deriving the totals from this already-filtered array instead removes the
    query and makes the two agree by construction.

    The `— TEST —` drafts are dropped as well: `sendTest` creates a throwaway
    campaign row purely as a vehicle for the Resend call, so four of the five
    "campaigns" were 0-recipient drafts that were never sent to anybody.
  */
  const { data: campaigns } = useQuery({
    queryKey: ['business-outreach-campaigns'],
    queryFn: async () => {
      const res = await callOutreach<{ campaigns: BusinessCampaign[] }>('get_campaigns');
      return res.campaigns.filter(
        (c) => c.name.startsWith('Business —') && !c.name.includes('— TEST —')
      );
    },
    staleTime: 30 * 1000,
  });

  const pipeline = useBusinessOutreachPipeline(contactsData?.contacts);

  /* Business-only send totals, computed from the same array the list renders. */
  const sendTotals = useMemo(() => {
    const list = campaigns ?? [];
    const sent = list.reduce((n, c) => n + (c.sent_count || 0), 0);
    const bounced = list.reduce((n, c) => n + (c.bounce_count || 0), 0);
    const opened = list.reduce((n, c) => n + (c.open_count || 0), 0);
    const clicked = list.reduce((n, c) => n + (c.click_count || 0), 0);
    const lastSentAt = list
      .map((c) => c.completed_at || c.started_at || null)
      .filter((d): d is string => !!d)
      .sort()
      .pop();
    return {
      sent,
      bounced,
      opened,
      clicked,
      bounceRate: sent > 0 ? (bounced / sent) * 100 : 0,
      lastSentAt: lastSentAt ?? null,
      campaigns: list.length,
    };
  }, [campaigns]);

  /*
    Open and click tracking has never once fired.

    Across 11,826 delivered emails, `outreach_campaign_sends.opened_at` and
    `.clicked_at` are null on every single row and every campaign's
    `open_count`/`click_count` is 0 — the Resend `email.opened` / `email.clicked`
    webhooks have never been received, so `resend-webhook` has never had
    anything to increment. That made two of the four old headline cards
    ("Contacted" = totalOpened, "Signed up" = totalClicked) permanently read
    nought, along with the openRate/clickRate sub-lines and the per-row
    "n open" / "n click" pills, which could never render. Rather than keep
    showing zeros as if they were measurements, the page says the meter is off
    and leads with numbers that are real.
  */
  const trackingDark = sendTotals.sent > 0 && sendTotals.opened === 0 && sendTotals.clicked === 0;

  /* Base set for the chips: source + search applied, stage NOT applied. Chip
     counts are computed over exactly this, which is why they always sum to the
     "All" chip beside them. */
  const searchedRows = useMemo(() => {
    const s = search.trim().toLowerCase();
    return pipeline.rows.filter((r) => {
      if (sourceFilter !== 'all' && r.sourceTag !== sourceFilter) return false;
      if (!s) return true;
      return (
        r.email.toLowerCase().includes(s) ||
        r.name?.toLowerCase().includes(s) ||
        r.organisation?.toLowerCase().includes(s) ||
        r.role?.toLowerCase().includes(s)
      );
    });
  }, [pipeline.rows, sourceFilter, search]);

  const chipCounts = useMemo(() => {
    const counts: Record<PipelineStage, number> = {
      signed_up: 0,
      contacted: 0,
      not_contacted: 0,
      suppressed: 0,
    };
    for (const r of searchedRows) counts[r.stage] += 1;
    return counts;
  }, [searchedRows]);

  /*
    Staleness first, alphabet never.

    The list arrived in `get_contacts` order — `created_at` descending, i.e.
    whatever was scraped most recently — so the contacts most likely to be
    forgotten sat furthest from the top. Rows now sort on how long they have
    gone without a follow-up, with the two stages nothing can be done about
    (won, suppressed) pushed below the ones that still need work.
  */
  const visibleContacts = useMemo(() => {
    const rows =
      stageFilter === 'all' ? searchedRows : searchedRows.filter((r) => r.stage === stageFilter);
    const sorted = [...rows];
    if (sortKey === 'company') {
      sorted.sort((a, b) =>
        (a.organisation || a.name || a.email).localeCompare(b.organisation || b.name || b.email)
      );
    } else if (sortKey === 'newest') {
      sorted.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    } else {
      sorted.sort((a, b) => a.actionRank - b.actionRank || b.sinceMs - a.sinceMs);
    }
    return sorted;
  }, [searchedRows, stageFilter, sortKey]);

  const sendableIds = useMemo(
    () => visibleContacts.filter((c) => !c.is_suppressed).map((c) => c.id),
    [visibleContacts]
  );

  /*
    The pool total the server counted, not the length of what came back.

    `get_contacts` returns an exact `count`, which the page ignored in favour of
    `contacts.length` — a number capped by the `limit: 15000` we ask for. The
    pool is 14,737 today; the day it passes 15,000 every total on this page
    would quietly freeze at 15,000 and nothing would say so.
  */
  const poolTotal = contactsData?.total ?? pipeline.total;
  const truncated = poolTotal > pipeline.total;

  const importMutation = useMutation({
    mutationFn: async () => {
      const parsed = parseCsvRows(csvText);
      if (parsed.length === 0) throw new Error('No valid rows parsed from CSV');
      return await callOutreach<{ imported: number; skipped: number }>('import_contacts', {
        contacts: parsed,
      });
    },
    onSuccess: (data) => {
      haptic.success();
      toast({
        title: `Imported ${data.imported} contacts`,
        description: data.skipped > 0 ? `${data.skipped} skipped` : undefined,
        variant: 'success',
      });
      setCsvText('');
      setImportOpen(false);
      queryClient.invalidateQueries({ queryKey: ['business-outreach-contacts'] });
    },
    onError: (err) => {
      haptic.error();
      toast({ title: `Import failed: ${err.message}`, variant: 'destructive' });
    },
  });

  const suppressMutation = useMutation({
    mutationFn: async (ids: string[]) =>
      await callOutreach('bulk_suppress', { contactIds: ids, reason: 'admin_ui' }),
    onSuccess: () => {
      haptic.success();
      toast({ title: "Suppressed — they won't be emailed", variant: 'success' });
      setSelectedIds(new Set());
      queryClient.invalidateQueries({ queryKey: ['business-outreach-contacts'] });
    },
    onError: (err) => toast({ title: `Suppress failed: ${err.message}`, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) => await callOutreach('delete_contacts', { contactIds: ids }),
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Contacts deleted', variant: 'success' });
      setSelectedIds(new Set());
      queryClient.invalidateQueries({ queryKey: ['business-outreach-contacts'] });
    },
    onError: (err) => toast({ title: `Delete failed: ${err.message}`, variant: 'destructive' }),
  });

  async function ensureTemplate(slug: string): Promise<{
    subject: string;
    html_body: string;
    preheader: string | null;
  }> {
    const res = await callOutreach<{
      templates: Array<{
        slug: string;
        subject: string;
        html_body: string;
        preheader: string | null;
      }>;
    }>('list_templates');
    let tpl = res.templates.find((t) => t.slug === slug);
    if (!tpl) {
      await callOutreach('seed_templates');
      const res2 = await callOutreach<{
        templates: Array<{
          slug: string;
          subject: string;
          html_body: string;
          preheader: string | null;
        }>;
      }>('list_templates');
      tpl = res2.templates.find((t) => t.slug === slug);
    }
    if (!tpl) throw new Error(`Template missing after seed: ${slug}`);
    return { subject: tpl.subject, html_body: tpl.html_body, preheader: tpl.preheader };
  }

  const activeTemplateSlug =
    sourceFilter === 'all' ? MASTER_TEMPLATE_SLUG : templateForSource(sourceFilter);
  const segmentLabel = sourceFilter === 'all' ? 'All' : sourceLabel(sourceFilter);

  async function createAndRunCampaign(ids: string[]) {
    if (ids.length === 0) return;
    try {
      setBatchProgress({
        running: true,
        sent: 0,
        remaining: ids.length,
        failed: 0,
        campaignName: '',
      });
      const tpl = await ensureTemplate(activeTemplateSlug);

      const name = `Business — ${segmentLabel} — ${new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })} (${ids.length})`;

      /*
        A search must never widen the send.

        The old rule was `ids.length === sendableIds.length && ids.length > 200`,
        and when it matched it replaced the explicit id list with a *tag*
        segment filter. But `sendableIds` was derived from the search-filtered
        list, so searching "london", getting 300 hits and pressing Select all
        satisfied it — and `prepare_send` then resolved the tag to every
        non-suppressed contact carrying it, mailing the entire 12,000-strong
        segment instead of the 300 on screen. The tag shortcut now additionally
        requires that nothing is narrowing the view, so "everything visible" and
        "the whole segment" are provably the same set. Anything else goes as an
        explicit id list, which `prepare_send` already chunks at 500 per query.
      */
      const wholeSegment =
        search.trim() === '' &&
        stageFilter === 'all' &&
        ids.length === sendableIds.length &&
        ids.length > 200;

      const segmentFilter: Record<string, unknown> = wholeSegment
        ? {
            tags:
              sourceFilter === 'all'
                ? [BUSINESS_POOL_TAG]
                : [BUSINESS_POOL_TAG, `source:${sourceFilter}`],
          }
        : { contact_ids: ids };

      const { campaign } = await callOutreach<{ campaign: { id: string } }>('create_campaign', {
        name,
        subject: tpl.subject,
        html_body: tpl.html_body,
        preheader: tpl.preheader,
        template_slug: activeTemplateSlug,
        from_name: 'Andrew from Elec-Mate',
        from_email: 'founder@elec-mate.com',
        reply_to: 'founder@elec-mate.com',
        segment_filter: segmentFilter,
      });

      setBatchProgress((p) => ({ ...p, campaignName: name }));

      const prep = await callOutreach<{ recipients: number; message?: string }>('prepare_send', {
        campaignId: campaign.id,
      });

      if (!prep.recipients || prep.recipients === 0) {
        throw new Error(prep.message || 'No recipients to send');
      }

      setBatchProgress((p) => ({ ...p, remaining: prep.recipients }));

      let totalSent = 0;
      let totalFailed = 0;
      let remaining = prep.recipients;
      let isFirst = true;
      while (remaining > 0) {
        if (!isFirst) {
          await new Promise((r) => setTimeout(r, INTER_BATCH_GAP_MS));
        }
        isFirst = false;
        const batch = await callOutreach<{
          sent: number;
          remaining: number;
          failed: number;
          completed: boolean;
        }>('send_batch', { campaignId: campaign.id, batchSize: BATCH_SIZE });
        totalSent += batch.sent;
        totalFailed += batch.failed;
        remaining = batch.remaining;
        setBatchProgress({
          running: true,
          sent: totalSent,
          remaining,
          failed: totalFailed,
          campaignName: name,
        });
        if (batch.completed) break;
      }

      haptic.success();
      toast({
        title:
          totalFailed === 0
            ? `Sent ${totalSent} emails`
            : `Sent ${totalSent} (${totalFailed} failed)`,
        variant: totalFailed === 0 ? 'success' : 'warning',
      });
      setSelectedIds(new Set());
      queryClient.invalidateQueries({ queryKey: ['business-outreach-contacts'] });
      queryClient.invalidateQueries({ queryKey: ['business-outreach-campaigns'] });
    } catch (err) {
      haptic.error();
      const msg = err instanceof Error ? err.message : String(err);
      toast({ title: `Send failed: ${msg}`, variant: 'destructive' });
    } finally {
      setBatchProgress({ running: false, sent: 0, remaining: 0, failed: 0, campaignName: '' });
    }
  }

  async function sendTest() {
    if (!testEmail) return;
    try {
      const tpl = await ensureTemplate(activeTemplateSlug);
      const { campaign } = await callOutreach<{ campaign: { id: string } }>('create_campaign', {
        name: `Business — TEST — ${segmentLabel} ${Date.now()}`,
        subject: tpl.subject,
        html_body: tpl.html_body,
        preheader: tpl.preheader,
        template_slug: activeTemplateSlug,
        from_name: 'Andrew from Elec-Mate',
        from_email: 'founder@elec-mate.com',
        reply_to: 'founder@elec-mate.com',
        segment_filter: {},
      });
      await callOutreach('send_test', { campaignId: campaign.id, testEmail });
      haptic.success();
      toast({
        title: `Test sent (${segmentLabel} template) — check your inbox`,
        variant: 'success',
      });
      setTestEmail('');
      setTestOpen(false);
    } catch (err) {
      haptic.error();
      const msg = err instanceof Error ? err.message : String(err);
      toast({ title: `Test failed: ${msg}`, variant: 'destructive' });
    }
  }

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleAll = () => {
    if (selectedIds.size === sendableIds.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(sendableIds));
  };

  /* Bar segments in a fixed order so the colours never swap places between
     renders when a count changes. Zero-count stages drop out entirely. */
  const barSegments = STAGE_ORDER.map((s) => ({
    stage: s,
    count: pipeline.stageCounts[s],
    ...STAGE_META[s],
  })).filter((s) => s.count > 0);

  const filtersActive = !!search || stageFilter !== 'all' || sourceFilter !== 'all';
  const readyCount = pipeline.stageCounts.not_contacted;
  const lastSendLabel = sendTotals.lastSentAt
    ? agoLabel(Date.now() - new Date(sendTotals.lastSentAt).getTime())
    : null;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Campaigns"
          title="Business Outreach"
          description="B2B outreach to UK electrical contractors and employers. One template, your targets — import CSVs, segment by source, send in batches."
          tone="purple"
          actions={
            <>
              <IconButton onClick={() => setTestOpen(true)} aria-label="Send a test email">
                <TestTube className="h-4 w-4" />
              </IconButton>
              <IconButton onClick={() => setImportOpen(true)} aria-label="Import contacts">
                <Upload className="h-4 w-4" />
              </IconButton>
              <IconButton onClick={() => refetch()} disabled={isFetching} aria-label="Refresh">
                <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
              </IconButton>
            </>
          }
        />

        {/*
          What is left to do, and where the pool actually stands.

          The old strip led with four cells labelled Companies / Enriched /
          Contacted / Signed up, and only the first was even approximately what
          it claimed. "Companies" counted contact rows (14,737) when the pool
          holds 7,967 organisations. "Enriched" was `get_stats.totalSent` —
          emails despatched, College campaigns included, nothing to do with
          enrichment. "Contacted" was total opens and "Signed up" was total
          clicks, both structurally nought because open tracking has never
          fired. Four figures, four wrong meanings, none of which told you that
          2,057 contacts have never been emailed at all.
        */}
        <section className="relative -mx-4 overflow-hidden rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(to right, rgba(144,133,233,0.7), rgba(144,133,233,0.2), transparent)',
            }}
          />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <Eyebrow>Never contacted</Eyebrow>
              <div className="mt-4 text-[38px] font-semibold leading-none tracking-tight text-white sm:text-[52px]">
                {readyCount.toLocaleString('en-GB')}
              </div>
              {/*
                One plain sentence. "Companies" is stated as the distinct
                organisation count it actually is — the pool's 14,737 rows
                belong to 7,967 firms, several named contacts apiece — and the
                second clause is the follow-up debt: how long the oldest
                actionable contact has been sitting without one.
              */}
              <div className="mt-2 text-[13px] text-white">
                {contactsLoading
                  ? 'Loading the pool…'
                  : readyCount === 0
                    ? 'Everyone in the pool has been emailed at least once.'
                    : `Ready to email, across ${pipeline.companies.toLocaleString('en-GB')} companies. ${
                        lastSendLabel
                          ? `Nothing has gone out for ${lastSendLabel}.`
                          : 'No campaign has gone out yet.'
                      }`}
                {!contactsLoading && pipeline.longestUntouchedMs > 0 && (
                  <>
                    {' '}
                    Oldest untouched contact has sat for{' '}
                    <span className="font-semibold">{agoLabel(pipeline.longestUntouchedMs)}</span>.
                  </>
                )}
              </div>

              {barSegments.length > 0 && (
                <div className="mt-5">
                  {/* The whole pool by stage. Every contact is in exactly one
                      segment, so the bar is the "All" chip drawn to scale. */}
                  <div className="flex w-full rounded-full" style={{ height: 10, gap: 2 }}>
                    {barSegments.map((b, i, seg) => (
                      <div
                        key={b.stage}
                        title={`${b.label}: ${b.count.toLocaleString('en-GB')}`}
                        style={{
                          width: `calc(${(b.count / Math.max(pipeline.total, 1)) * 100}% - ${
                            (2 * (seg.length - 1)) / seg.length
                          }px)`,
                          background: b.fill,
                          borderTopLeftRadius: i === 0 ? 999 : 2,
                          borderBottomLeftRadius: i === 0 ? 999 : 2,
                          borderTopRightRadius: i === seg.length - 1 ? 999 : 2,
                          borderBottomRightRadius: i === seg.length - 1 ? 999 : 2,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-white">
                    {barSegments.map((b) => (
                      <button
                        key={b.stage}
                        type="button"
                        onClick={() => setStageFilter(b.stage)}
                        className="flex touch-manipulation items-center gap-2 text-left"
                      >
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ background: b.fill }}
                        />
                        <span className="font-medium tabular-nums text-white">
                          {b.count.toLocaleString('en-GB')}
                        </span>
                        <span className="text-white">{b.label.toLowerCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliverability is the one campaign metric that still works, and
                  6.8% of the last business send bounced. Above 5% providers
                  begin throttling, so it belongs on the front page, not buried. */}
              {sendTotals.sent > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white">
                  <span>
                    <span className="font-semibold tabular-nums">
                      {sendTotals.sent.toLocaleString('en-GB')}
                    </span>{' '}
                    emails sent across {sendTotals.campaigns} business campaign
                    {sendTotals.campaigns === 1 ? '' : 's'}
                  </span>
                  <span
                    className="font-semibold tabular-nums"
                    style={{
                      color:
                        sendTotals.bounceRate >= BOUNCE_RATE_ALARM ? STATUS_WARNING : undefined,
                    }}
                  >
                    {sendTotals.bounceRate.toFixed(1)}% bounced
                  </span>
                </div>
              )}

              {trackingDark && (
                <div className="mt-3 text-[12px] text-white">
                  <span
                    className="mr-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]"
                    style={{
                      borderColor: `${STATUS_WARNING}59`,
                      background: `${STATUS_WARNING}1F`,
                    }}
                  >
                    No tracking
                  </span>
                  Resend has never sent an open or click event, so engagement cannot be measured —
                  signups are the only conversion signal here.
                </div>
              )}
            </div>

            {/*
              Four cells that are all the same kind of thing: counts of pool
              contacts, in stages that add up to the pool. Each one filters the
              list to itself, so the number you tapped is the list you get.
            */}
            <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
              {[
                {
                  label: 'Ready to email',
                  value: pipeline.stageCounts.not_contacted,
                  sub: 'never contacted',
                  stage: 'not_contacted' as const,
                  accent: true,
                },
                {
                  label: 'Awaiting follow-up',
                  value: pipeline.stageCounts.contacted,
                  sub: lastSendLabel ? `last emailed ${lastSendLabel} ago` : 'emailed, no account',
                  stage: 'contacted' as const,
                },
                {
                  /*
                    Replaces the old "Signed up" cell, which read
                    `get_stats.totalClicked` — a figure that has been 0 for all
                    17,089 emails ever sent and structurally always will be
                    until Resend click tracking is switched on. This counts pool
                    addresses that now belong to a real Elec-Mate account,
                    matched through `useAdminUsersBase()`. It has to come from
                    there: `profiles` has no `email` column (it is on
                    `auth.users`), so the obvious `profiles.select('email')`
                    would return 42703, be swallowed, and read as zero — exactly
                    the failure it is replacing.
                  */
                  label: 'Signed up',
                  value: pipeline.matchingAccounts ? '…' : pipeline.stageCounts.signed_up,
                  sub: 'now have an account',
                  stage: 'signed_up' as const,
                },
                {
                  label: 'Suppressed',
                  value: pipeline.stageCounts.suppressed,
                  sub:
                    pipeline.total > 0
                      ? `${Math.round((pipeline.stageCounts.suppressed / pipeline.total) * 100)}% of the pool`
                      : 'bounced or unsubscribed',
                  stage: 'suppressed' as const,
                },
              ].map((c) => (
                <button
                  key={c.label}
                  onClick={() => setStageFilter(c.stage)}
                  className="touch-manipulation bg-[hsl(0_0%_9%)] px-4 py-5 text-left transition-colors hover:bg-[hsl(0_0%_12%)]"
                >
                  <div
                    className="text-[22px] font-semibold leading-none sm:text-[26px]"
                    style={{
                      color: c.accent && readyCount > 0 ? STAGE_META[c.stage].fill : '#fff',
                    }}
                  >
                    {typeof c.value === 'number' ? c.value.toLocaleString('en-GB') : c.value}
                  </div>
                  <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                    {c.label}
                  </div>
                  <div className="mt-1 text-[11px] text-white/60">{c.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {batchProgress.running && (
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(to right, ${SERIES_BLUE}B3, ${SERIES_BLUE}33, transparent)`,
              }}
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-elec-yellow" />
                <div className="min-w-0">
                  <Eyebrow>Sending</Eyebrow>
                  <div className="mt-1 truncate text-[13px] text-white">
                    {batchProgress.campaignName}
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-[13px] tabular-nums text-white">
                {batchProgress.sent}/{batchProgress.sent + batchProgress.remaining}
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-elec-yellow transition-all duration-500"
                style={{
                  width: `${
                    batchProgress.sent + batchProgress.remaining > 0
                      ? (batchProgress.sent / (batchProgress.sent + batchProgress.remaining)) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
            {batchProgress.failed > 0 && (
              <div className="mt-2">
                <Pill tone="red">{batchProgress.failed} failed</Pill>
              </div>
            )}
          </div>
        )}

        {/*
          One filter row, not three.

          This page carried a two-tab FilterBar, a full SectionHeader announcing
          "Filter by source", and then a second FilterBar holding up to fifteen
          source chips plus the search box — roughly 200px of chrome, three
          bands deep, before the first contact. Pipeline stage is what you
          actually switch between so it stays as chips; source becomes one
          compact select that lists every tag present in the data (the chip rail
          only rendered tags it recognised, hiding 1,604 contacts); sort is the
          second select; search keeps the end of the line.
        */}
        <div className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-3 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {[
                { value: 'all' as const, label: 'All', count: searchedRows.length },
                ...STAGE_ORDER.map((s) => ({
                  value: s,
                  label: STAGE_META[s].short,
                  count: chipCounts[s],
                })),
              ].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => {
                    setStageFilter(t.value);
                    setSelectedIds(new Set());
                  }}
                  className={cn(
                    'h-9 touch-manipulation rounded-full px-3 text-[12px] font-medium transition-colors',
                    stageFilter === t.value
                      ? 'bg-elec-yellow text-black'
                      : 'text-white hover:bg-white/[0.08]'
                  )}
                >
                  {t.label}
                  <span className="ml-1.5 text-[11px] tabular-nums opacity-70">
                    {t.count.toLocaleString('en-GB')}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {/*
                Built from the data, so a tag can never go missing again.

                The old rail mapped fourteen hard-coded keys to tags and dropped
                anything else on the floor: thomson_local (812), trustpilot
                (715), contracts_finder (43), apollo_accredited (34),
                linkedin_person (5), linkedin_company (3) and
                apollo_college_heads (1) had no chip, so 1,604 pool contacts
                were unselectable and the per-source counts summed to 13,133
                against an "All" chip reading 14,737.
              */}
              <select
                value={sourceFilter}
                onChange={(e) => {
                  setSourceFilter(e.target.value);
                  setSelectedIds(new Set());
                }}
                aria-label="Filter by source"
                className="h-9 max-w-[190px] touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
              >
                <option value="all">All sources ({pipeline.total.toLocaleString('en-GB')})</option>
                {pipeline.sources.map((s) => (
                  <option key={s.tag} value={s.tag}>
                    {s.label} ({s.count.toLocaleString('en-GB')})
                  </option>
                ))}
              </select>

              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                aria-label="Sort contacts"
                className="h-9 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
              >
                <option value="stale">Longest untouched</option>
                <option value="newest">Newest first</option>
                <option value="company">Company A–Z</option>
              </select>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search company, name or email…"
                  className="h-9 w-full touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] text-white placeholder:text-white/25 focus:border-elec-yellow focus:outline-none"
                />
              </div>
            </div>
          </div>

          {truncated && (
            <div className="mt-2 text-[11px] text-white">
              Showing {pipeline.total.toLocaleString('en-GB')} of{' '}
              {poolTotal.toLocaleString('en-GB')} pool contacts — the fetch limit was reached, so
              the counts above are partial.
            </div>
          )}
        </div>

        {contactsLoading ? (
          <LoadingBlocks />
        ) : visibleContacts.length === 0 ? (
          <EmptyState
            title={filtersActive ? 'No matches' : 'No contacts yet'}
            description={
              filtersActive
                ? 'Nothing matches those filters.'
                : 'Import a CSV to get started — paste rows of email, name, organisation, role.'
            }
            /* One predicate for the label and the handler. They were computed
               separately and the label's version left out the source filter, so
               narrowing to a source with no matches offered "Import contacts"
               and then cleared the filters when tapped. */
            action={filtersActive ? 'Clear filters' : 'Import contacts'}
            onAction={
              filtersActive
                ? () => {
                    setSearch('');
                    setStageFilter('all');
                    setSourceFilter('all');
                  }
                : () => setImportOpen(true)
            }
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="purple"
              title={sourceFilter === 'all' ? 'Pipeline' : sourceLabel(sourceFilter)}
              meta={
                <>
                  {/* Contacts and companies are different counts and are now
                      labelled as such — the old header said "Companies" over a
                      row count that was 85% higher than the company total. */}
                  <Pill tone="purple">
                    {visibleContacts.length.toLocaleString('en-GB')} contacts
                  </Pill>
                  {selectedIds.size > 0 && <Pill tone="yellow">{selectedIds.size} selected</Pill>}
                </>
              }
            />
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-3 sm:px-6">
              <label className="flex touch-manipulation items-center gap-3">
                <Checkbox
                  checked={sendableIds.length > 0 && selectedIds.size === sendableIds.length}
                  onCheckedChange={toggleAll}
                  disabled={batchProgress.running}
                  className="border-white/40 data-[state=checked]:border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                />
                <span className="text-[12px] text-white">
                  {selectedIds.size > 0
                    ? `${selectedIds.size.toLocaleString('en-GB')} selected`
                    : `Select all · ${sendableIds.length.toLocaleString('en-GB')} sendable`}
                </span>
              </label>
              {selectedIds.size > 0 && !batchProgress.running && (
                <div className="flex items-center gap-2">
                  {/* Full 44px targets: these three send, silence or destroy
                      whatever is ticked, and the delete used to be a 36px
                      button sitting on its own below the list. */}
                  <button
                    onClick={() => setConfirmDelete(Array.from(selectedIds))}
                    disabled={deleteMutation.isPending}
                    aria-label={`Delete ${selectedIds.size} contacts`}
                    className="inline-flex h-11 touch-manipulation items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white hover:bg-white/[0.08] disabled:opacity-40"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                  <button
                    onClick={() => suppressMutation.mutate(Array.from(selectedIds))}
                    disabled={suppressMutation.isPending}
                    className="inline-flex h-11 touch-manipulation items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white hover:bg-white/[0.08] disabled:opacity-40"
                  >
                    <Ban className="h-3.5 w-3.5" />
                    Suppress
                  </button>
                  <button
                    onClick={() =>
                      setConfirmSend({ count: selectedIds.size, ids: Array.from(selectedIds) })
                    }
                    className="inline-flex h-11 touch-manipulation items-center gap-1.5 rounded-full bg-elec-yellow px-4 text-[12px] font-semibold text-black"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Send {selectedIds.size}
                  </button>
                </div>
              )}
            </div>
            <ListBody>
              {/* 14,737 rows will not render. The list is capped and the header
                  says how many matched, so the cap never hides a count. */}
              {visibleContacts.slice(0, 200).map((c) => (
                <ContactRow
                  key={c.id}
                  contact={c}
                  selected={selectedIds.has(c.id)}
                  onToggle={() => toggleOne(c.id)}
                />
              ))}
            </ListBody>
            {visibleContacts.length > 200 && (
              <div className="border-t border-white/[0.06] px-5 py-3 text-[12px] text-white">
                Showing the 200 most overdue of {visibleContacts.length.toLocaleString('en-GB')}{' '}
                matching contacts. Narrow the filters, or press Select all — selection covers every
                match, not just what is drawn.
              </div>
            )}
          </ListCard>
        )}

        {/*
          Send history, always visible.

          Campaigns used to be a second tab that hid the contact list, for a
          history that is one real campaign long once the throwaway TEST drafts
          are excluded. A short section under the list costs nothing and removes
          a whole navigation state.
        */}
        {campaigns && campaigns.length > 0 && (
          <ListCard>
            <ListCardHeader
              tone="blue"
              title="Send history"
              meta={<Pill tone="blue">{campaigns.length}</Pill>}
            />
            <ListBody>
              {campaigns.map((c) => {
                const bounceRate =
                  c.sent_count > 0 ? ((c.bounce_count || 0) / c.sent_count) * 100 : 0;
                const statusTone =
                  c.status === 'completed'
                    ? 'emerald'
                    : c.status === 'sending'
                      ? 'blue'
                      : c.status === 'paused'
                        ? // 'amber' before — the one amber surface left on the
                          // page. Warning state is elec-yellow everywhere else.
                          'yellow'
                        : 'indigo';
                return (
                  <ListRow
                    key={c.id}
                    title={c.name}
                    subtitle={
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11.5px] tabular-nums text-white">
                        <span>
                          {c.sent_count.toLocaleString('en-GB')}/
                          {c.total_recipients.toLocaleString('en-GB')} sent
                        </span>
                        {/* Opens and clicks are omitted deliberately: they have
                            been 0 on every campaign ever run because the Resend
                            open/click webhooks have never fired, and printing
                            "0 open" beside 12,554 sends reads as a result. */}
                        <span
                          style={{
                            color: bounceRate >= BOUNCE_RATE_ALARM ? STATUS_WARNING : undefined,
                          }}
                        >
                          {c.bounce_count.toLocaleString('en-GB')} bounced ({bounceRate.toFixed(1)}
                          %)
                        </span>
                        {c.failed_count > 0 && (
                          <span style={{ color: STATUS_BAD }}>{c.failed_count} failed</span>
                        )}
                        <span>
                          {formatDistanceToNow(parseISO(c.created_at), { addSuffix: true })}
                        </span>
                      </span>
                    }
                    trailing={<Pill tone={statusTone}>{c.status}</Pill>}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}

        <Sheet open={testOpen} onOpenChange={setTestOpen}>
          <SheetContent
            side="bottom"
            className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_10%)] p-0"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-center pb-2 pt-3">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="border-b border-white/[0.06] px-5 pb-4">
                <SheetTitle className="flex items-center gap-2 text-[15px] text-white">
                  <TestTube className="h-4 w-4 text-elec-yellow" />
                  Send yourself a test
                </SheetTitle>
              </SheetHeader>
              {/*
                The test send used to occupy a permanent card above the list —
                a five-line panel with its own heading, for a control used once
                per template change. It is a sheet now, the same as every other
                one-off tool on this page.
              */}
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                <p className="text-[12.5px] leading-relaxed text-white">
                  Renders the template for the segment currently selected in the source filter. The
                  subject is prefixed [TEST] and nobody in the pool is marked as contacted.
                </p>
                <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4">
                  <Eyebrow>Template in use</Eyebrow>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Pill tone={sourceFilter === 'all' ? 'yellow' : 'purple'}>
                      {sourceFilter === 'all' ? 'Master' : segmentLabel}
                    </Pill>
                    <span className="truncate text-[12px] text-white">{activeTemplateSlug}</span>
                  </div>
                </div>
                <Input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-11 touch-manipulation border-white/[0.08] bg-[hsl(0_0%_12%)] text-base text-white placeholder:text-white/25 focus:border-elec-yellow/60 focus:ring-0"
                />
                <button
                  onClick={sendTest}
                  disabled={!testEmail}
                  className="inline-flex h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-elec-yellow text-[14px] font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                  Send test
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={importOpen} onOpenChange={setImportOpen}>
          <SheetContent
            side="bottom"
            className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_10%)] p-0"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-center pb-2 pt-3">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="border-b border-white/[0.06] px-5 pb-4">
                <SheetTitle className="flex items-center gap-2 text-[15px] text-white">
                  <Upload className="h-4 w-4 text-elec-yellow" />
                  Import business contacts
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4">
                  <Eyebrow>How it works</Eyebrow>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-white">
                    Imported contacts are auto-tagged with{' '}
                    <code className="rounded bg-black/30 px-1 py-0.5 text-white">
                      {BUSINESS_POOL_TAG}
                    </code>{' '}
                    and{' '}
                    <code className="rounded bg-black/30 px-1 py-0.5 text-white">
                      source:csv_import
                    </code>
                    , so they show up here alongside scraped leads. contact_type defaults to{' '}
                    <code className="rounded bg-black/30 px-1 py-0.5 text-white">employer</code>.
                  </p>
                </div>

                <div className="space-y-2">
                  <Eyebrow>Paste CSV</Eyebrow>
                  <p className="text-[12px] leading-relaxed text-white">
                    Header row optional. Columns: <code>email</code>, <code>name</code>,{' '}
                    <code>organisation</code>, <code>role</code>, <code>tags</code>{' '}
                    (semicolon-separated). If no header, first column is email.
                  </p>
                  <Textarea
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    placeholder={`email,name,organisation,role\nmike@balfourbeatty.com,Mike Smith,Balfour Beatty,M&E Director\njane@sellafield.com,Jane Doe,Sellafield Ltd,Head of Electrical`}
                    className="min-h-[240px] touch-manipulation border-white/[0.08] bg-[hsl(0_0%_12%)] font-mono text-[13px] text-white placeholder:text-white/25 focus:border-elec-yellow/60 focus:ring-0"
                  />
                  <p className="text-[11px] text-white">
                    {csvText.split(/\r?\n/).filter((l) => l.trim()).length} lines pasted
                  </p>
                </div>

                <button
                  onClick={() => importMutation.mutate()}
                  disabled={!csvText.trim() || importMutation.isPending}
                  className="inline-flex h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-elec-yellow text-[14px] font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {importMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Import contacts
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={!!confirmSend} onOpenChange={(open) => !open && setConfirmSend(null)}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] rounded-2xl border-white/[0.06] bg-[hsl(0_0%_10%)] p-5 sm:max-w-lg sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base leading-tight text-white sm:text-lg">
                Send the {segmentLabel} intro to {confirmSend?.count.toLocaleString('en-GB')}{' '}
                contacts?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-2 text-sm leading-relaxed">
                  <p className="text-white">
                    Uses Resend&apos;s batch API — {BATCH_SIZE} emails per call with a{' '}
                    {INTER_BATCH_GAP_MS}ms gap between calls (under Resend&apos;s 2 req/sec rate
                    limit). Suppressed contacts are skipped automatically.
                  </p>
                  <p className="text-xs text-white">
                    Recipients get an unsubscribe link. One-click unsubscribes are added to your
                    suppression list.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse gap-2 pt-2 sm:flex-row">
              <AlertDialogCancel className="mt-0 h-12 w-full touch-manipulation rounded-full border border-white/[0.08] bg-[hsl(0_0%_12%)] text-base text-white hover:bg-[hsl(0_0%_15%)] sm:h-11 sm:w-auto sm:text-sm">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const ids = confirmSend?.ids || [];
                  setConfirmSend(null);
                  createAndRunCampaign(ids);
                }}
                className="h-12 w-full touch-manipulation rounded-full bg-elec-yellow text-base font-semibold text-black hover:bg-elec-yellow/90 sm:h-11 sm:w-auto sm:text-sm"
              >
                <Send className="mr-2 h-4 w-4" />
                Send
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/*
          Deleting went through the browser's native `confirm()`.

          That is a blocking modal the app cannot style, it sits behind the
          status bar in the Capacitor webview, and its "OK" is the same weight
          as its "Cancel" for an irreversible bulk delete. Same AlertDialog as
          every other destructive action in the admin.
        */}
        <AlertDialog
          open={!!confirmDelete}
          onOpenChange={(open) => !open && setConfirmDelete(null)}
        >
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] rounded-2xl border-white/[0.06] bg-[hsl(0_0%_10%)] p-5 sm:max-w-lg sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base leading-tight text-white sm:text-lg">
                Delete {confirmDelete?.length.toLocaleString('en-GB')} contacts permanently?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm leading-relaxed text-white">
                This removes the rows outright. To stop emailing somebody without losing the record
                — and without re-importing them on the next scrape — use Suppress instead.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse gap-2 pt-2 sm:flex-row">
              <AlertDialogCancel className="mt-0 h-12 w-full touch-manipulation rounded-full border border-white/[0.08] bg-[hsl(0_0%_12%)] text-base text-white hover:bg-[hsl(0_0%_15%)] sm:h-11 sm:w-auto sm:text-sm">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const ids = confirmDelete || [];
                  setConfirmDelete(null);
                  deleteMutation.mutate(ids);
                }}
                className="h-12 w-full touch-manipulation rounded-full text-base font-semibold text-white sm:h-11 sm:w-auto sm:text-sm"
                style={{ background: STATUS_BAD }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PageFrame>
    </PullToRefresh>
  );
}

/**
 * One contact, carrying the signal this page is for.
 *
 * The old row printed name, organisation, email and role joined by middots,
 * plus a source pill and two engagement pills that could never render. Nothing
 * on it said whether the contact had been emailed, when, or how long they had
 * been sitting there — which is the entire question an outreach list has to
 * answer. Everything now lives in title/subtitle rather than ListRow's
 * `trailing` slot, because that slot is `shrink-0` against a `flex-1 min-w-0`
 * text block: pills placed there swallow a phone-width row and truncate the
 * company name to nothing.
 */
function ContactRow({
  contact,
  selected,
  onToggle,
}: {
  contact: PipelineRow;
  selected: boolean;
  onToggle: () => void;
}) {
  const displayName = contact.organisation || contact.name || contact.email;
  const days = Math.floor(contact.sinceMs / 86_400_000);

  /*
    Age is the point of the row, so it is banded by how bad it is.

    The old row had no age on it at all; the closest thing was a "3 open" pill
    that could never render. A contact emailed last week and one emailed in
    April looked identical, on the list whose only job is to tell you which is
    which. Non-actionable rows (won, suppressed) stay muted — their age is
    information, not a task.
  */
  const overdue = contact.actionRank === 0 && days > STALE_DAYS;
  const ageColour = !overdue ? undefined : days > STALE_DAYS * 3 ? STATUS_BAD : STATUS_WARNING;
  const ageTone = ageColour ? undefined : contact.actionRank > 0 ? 'text-white/60' : 'text-white';

  const ageText = contact.lastContactedAt
    ? `${agoLabel(contact.sinceMs)} since contact`
    : `in pool ${agoLabel(contact.sinceMs)}`;

  const detail = [contact.name, contact.role, contact.email].filter(Boolean).join(' · ');

  return (
    <ListRow
      subtitleWrap
      /* The accent marks "badly overdue", not merely "unread" — this page has
         no unread state, only a follow-up debt. */
      accent={overdue && days > STALE_DAYS * 3 ? 'red' : undefined}
      lead={
        <div className="flex items-center gap-3">
          <Checkbox
            checked={selected}
            onCheckedChange={onToggle}
            disabled={contact.is_suppressed}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Select ${displayName}`}
            className="border-white/40 data-[state=checked]:border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
          />
          <Avatar initials={getInitials(displayName)} />
        </div>
      }
      title={
        <span className="flex items-baseline gap-2">
          <span className="truncate font-medium">{displayName}</span>
          <span
            className={cn('ml-auto shrink-0 text-[12px] font-semibold tabular-nums', ageTone)}
            style={ageColour ? { color: ageColour } : undefined}
            title={
              contact.lastContactedAt
                ? `Last emailed ${new Date(contact.lastContactedAt).toLocaleDateString('en-GB')}`
                : `Imported ${new Date(contact.created_at).toLocaleDateString('en-GB')}, never emailed`
            }
          >
            {ageText}
          </span>
        </span>
      }
      subtitle={
        <span className="block min-w-0">
          <span className="block truncate text-white">{detail}</span>
          <span className="mt-1 flex flex-wrap items-center gap-2">
            <StageBadge stage={contact.stage} />
            {contact.sourceTag && (
              <span className="text-[10px] uppercase tracking-[0.12em] text-white/60">
                {sourceLabel(contact.sourceTag)}
              </span>
            )}
            {contact.total_sends > 1 && (
              <span className="text-[10px] uppercase tracking-[0.12em] text-white/60">
                {contact.total_sends} sends
              </span>
            )}
          </span>
        </span>
      }
      onClick={contact.is_suppressed ? undefined : onToggle}
      className={contact.is_suppressed ? 'opacity-60' : ''}
    />
  );
}
