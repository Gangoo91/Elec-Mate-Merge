import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
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
  Eyebrow,
  LoadingBlocks,
  EmptyState,
  IconButton,
  Divider,
} from '@/components/admin/editorial';
import { RefreshCw, Send, Upload, Loader2, Ban, Trash2 } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useOutreachSignups } from '@/hooks/useOutreachSignups';
import { cn } from '@/lib/utils';

interface CollegeContact {
  id: string;
  email: string;
  name: string | null;
  organisation: string | null;
  role: string | null;
  contact_type: string | null;
  tags: string[];
  is_suppressed: boolean;
  total_sends: number;
  total_opens: number;
  total_clicks: number;
  engagement_score: number;
  created_at: string;
  /*
   * `get_contacts` does `select('*')`, so these already came down the wire on
   * every load — they simply were not declared, and TypeScript therefore hid
   * the only per-contact recency signal the table has. `updated_at` is bumped
   * by the send pipeline: measured against `outreach_campaign_sends.sent_at`
   * across the education pool it tracks the last send to within seconds for
   * the bulk of rows, so it is the usable proxy for "last contacted". The one
   * thing that also bumps it is a suppression, which is itself an event worth
   * dating, so the row copy says "last activity" for suppressed contacts.
   */
  updated_at: string;
  suppressed_at?: string | null;
  suppression_reason?: string | null;
}

interface CollegeCampaign {
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
  // Extra fields used by the picker — `select *` returns these from get_campaigns.
  html_body?: string;
  preheader?: string | null;
  from_name?: string;
  from_email?: string;
  reply_to?: string | null;
}

const POOL_TAG = 'education_pool';

const BATCH_SIZE = 100;
const INTER_BATCH_GAP_MS = 500;
const DAY_MS = 86_400_000;

/*
  Pipeline stages — the spine of this page.

  Before, a contact row told you a name, an organisation and a source tag, and
  the source tag is the one thing about a lead that never changes. Nothing on
  the row said whether that person had been pitched, when, or how long they had
  been sitting unanswered — so a contact scraped and emailed in April looked
  identical to one added yesterday, and there was no way to find the stale ones
  short of exporting the table.

  The four stages below are evaluated in this order and are mutually exclusive,
  so they always sum to the pool total and the tab counts reconcile with All.
  `converted` deliberately outranks `optedout`: a college whose tutor is now
  using Elec-Mate is a win even if that mailbox later unsubscribed from cold
  email, and burying it under "opted out" would hide the only success the
  campaign has produced.
*/
type Stage = 'converted' | 'awaiting' | 'notpitched' | 'optedout';

interface StageDef {
  key: Stage;
  label: string;
  /** UPPERCASE label for the 2x2 grid. */
  cell: string;
  sub: string;
  /* Validated dark-surface series only. No orange, no brown. */
  fill: string;
}

const STAGES: StageDef[] = [
  {
    key: 'notpitched',
    label: 'Not pitched',
    cell: 'Not pitched',
    sub: 'never emailed',
    fill: '#9085E9',
  },
  {
    key: 'awaiting',
    label: 'Awaiting reply',
    cell: 'Awaiting reply',
    sub: 'pitched, no answer',
    fill: '#3987E5',
  },
  {
    key: 'converted',
    label: 'Reached',
    cell: 'Reached',
    sub: 'account at that org',
    fill: '#199E70',
  },
  {
    key: 'optedout',
    label: 'Opted out',
    cell: 'Opted out',
    sub: 'suppressed or bounced',
    fill: '#E66767',
  },
];

const STAGE_BY_KEY: Record<Stage, StageDef> = STAGES.reduce(
  (acc, s) => ({ ...acc, [s.key]: s }),
  {} as Record<Stage, StageDef>
);

/* Status colours, kept separate from the categorical series. */
const GOOD = '#0CA30C';
const WARN = '#FAB219';
const BAD = '#E66767';

/*
  Pretty names for the `source:` tag.

  This used to be a closed 13-entry union plus a hardcoded `SOURCES` array that
  drove one filter chip each, and both were wrong in opposite directions. Eight
  of the thirteen — gov_uk_apprenticeships, roatp, niceic_training,
  college_staff_page, ofsted_register, colleges_scotland, manual, csv_import —
  have never had a single row in this pool, so the rail rendered a permanently
  empty tab for a scraper that has never delivered here. Meanwhile 23 contacts
  tagged `source:apollo` were not in the union at all, so they were bucketed
  under an "unknown" key that had no chip: the rail read "All 1990" while its
  sub-tabs summed to 1,967 and 23 contacts could not be reached by any filter.
  The options are now built from the data, so every source present is
  selectable and the parts always add up to the whole.
*/
const SOURCE_LABEL: Record<string, string> = {
  apollo: 'Apollo (untyped)',
  apollo_college_heads: 'Colleges',
  apollo_electrical_tutors: 'Tutors',
  apollo_assessors: 'Assessors',
  apollo_apprenticeship_coords: 'Apprenticeship coords',
  apollo_training_provider_directors: 'Training providers',
  gov_uk_apprenticeships: 'Apprenticeships.gov',
  roatp: 'ROATP',
  niceic_training: 'NICEIC Training',
  college_staff_page: 'College staff',
  ofsted_register: 'Ofsted',
  colleges_scotland: 'Scotland',
  manual: 'Manual',
  csv_import: 'CSV import',
};

function sourceOf(contact: { tags: string[] | null }): string | null {
  if (!contact.tags) return null;
  const t = contact.tags.find((x) => x.startsWith('source:'));
  return t ? t.slice(7) : null;
}

function sourceLabel(src: string): string {
  return SOURCE_LABEL[src] ?? src.replace(/_/g, ' ');
}

function getInitials(name: string | null, email: string): string {
  const base = (name && name.trim()) || email;
  const parts = base.split(/[\s@.]+/).filter(Boolean);
  if (parts.length === 0) return '—';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/** Elapsed time in words: "6 days", "14 weeks", "4 months". */
function ageLabel(ms: number): string {
  const days = Math.floor(ms / DAY_MS);
  if (days < 1) return 'today';
  if (days === 1) return '1 day';
  if (days < 14) return `${days} days`;
  if (days < 60) return `${Math.floor(days / 7)} weeks`;
  if (days < 730) return `${Math.round(days / 30)} months`;
  return `${Math.floor(days / 365)} years`;
}

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
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
        /* ignore */
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
        : col('college');
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
        contact_type: 'college',
        tags: Array.from(new Set([POOL_TAG, 'source:csv_import', ...extraTags])),
        source: 'admin_csv_paste',
      };
    })
    .filter(<T,>(x: T | null): x is T => x !== null);
}

/** A contact with its derived pipeline position attached once, not per render. */
interface RankedContact extends CollegeContact {
  stage: Stage;
  source: string | null;
  /** Timestamp the pipeline age is measured from. */
  activityAt: number;
  /** Milliseconds since that timestamp. */
  ageMs: number;
  /** True only for an exact address match against a live account. */
  isAccount: boolean;
}

type StageFilter = Stage | 'all';
type SortKey = 'stale' | 'recent' | 'org';

export default function AdminOutreach() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<StageFilter>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortKey>('stale');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [testEmail, setTestEmail] = useState('');
  const [importOpen, setImportOpen] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [activeView, setActiveView] = useState<'contacts' | 'campaigns'>('contacts');
  const [confirmSend, setConfirmSend] = useState<{ count: number; ids: string[] } | null>(null);
  const [batchProgress, setBatchProgress] = useState<{
    running: boolean;
    sent: number;
    remaining: number;
    failed: number;
    campaignName: string;
  }>({ running: false, sent: 0, remaining: 0, failed: 0, campaignName: '' });

  // Picked campaign — what gets sent on Send Test + Bulk Send. Persists across
  // reloads so a half-built selection is never quietly forgotten right before
  // a 1k send. Default chosen below from the most recent draft.
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    () => localStorage.getItem('admin-outreach-selected-campaign') || null
  );

  /*
    The pool is fetched once, and search is applied in the browser.

    `search` used to be part of the query key AND forwarded to the edge
    function as `filter.search`, which fired a fresh 15,000-row edge-function
    call on every keystroke — and then `visibleContacts` re-applied exactly the
    same email/name/organisation match a second time on the result, so the
    server round-trip bought nothing. Worse, it moved the headline: "Contacts"
    and the All tab both read `contactsData.contacts.length`, so typing three
    letters silently rewrote the page's totals and no count on screen described
    the pool any more. The pool is ~2,000 rows; hold it and filter locally.
  */
  const {
    data: contactsData,
    isLoading: contactsLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['college-outreach-contacts'],
    queryFn: async () =>
      await callOutreach<{ contacts: CollegeContact[]; total: number }>('get_contacts', {
        limit: 15000,
        tag: POOL_TAG,
      }),
    staleTime: 30 * 1000,
  });

  const { data: campaigns } = useQuery({
    queryKey: ['college-outreach-campaigns'],
    queryFn: async () => {
      const res = await callOutreach<{ campaigns: CollegeCampaign[] }>('get_campaigns');
      /*
        Matching was `c.name.startsWith('College —')` on a literal em-dash.
        "College Summer Trial — June 2026" — a completed campaign with 135
        recipients and 5 bounces — does not start with that exact string, so it
        was invisible on the only page that owns it. Anchored, case-insensitive
        word match on "college" keeps the Business blasts out (their names all
        begin "Business —") without depending on one punctuation character.
      */
      return res.campaigns.filter((c) => /^college\b/i.test(c.name.trim()));
    },
    staleTime: 30 * 1000,
  });

  /*
    Live accounts, indexed by address and institutional domain.

    Nothing on this page has ever said whether the outreach produced a single
    signup. It cannot come from `profiles` — that table has no email column at
    all, so a `profiles.select('email')` filter returns 42703 and null — so it
    comes from `admin-get-users`, which joins auth.users, via the shared hook.
  */
  const signups = useOutreachSignups();

  /*
    Every contact, with its pipeline stage and age resolved exactly once.

    Doing this in one pass rather than inside the row renderer matters: the
    stage counts, the stacked bar, the 2x2 cells, the chips and the sort all
    have to agree, and the only way to guarantee that is for every one of them
    to read the same derived array.
  */
  const ranked = useMemo<RankedContact[]>(() => {
    const now = Date.now();
    return (contactsData?.contacts ?? []).map((c) => {
      const isAccount = signups.hasAccount(c.email);
      const converted = isAccount || signups.hasColleague(c.email);
      const stage: Stage = converted
        ? 'converted'
        : c.is_suppressed
          ? 'optedout'
          : (c.total_sends ?? 0) > 0
            ? 'awaiting'
            : 'notpitched';
      /*
        A contact that has been pitched is aged from its last activity; one
        that never has is aged from the day it landed in the list, because the
        question there is "how long has this lead sat here unused", and that is
        the number that should push it up the queue.
      */
      const basis = (c.total_sends ?? 0) > 0 || c.is_suppressed ? c.updated_at : c.created_at;
      const activityAt = basis ? new Date(basis).getTime() : now;
      return {
        ...c,
        stage,
        source: sourceOf(c),
        activityAt,
        ageMs: Math.max(0, now - activityAt),
        isAccount,
      };
    });
  }, [contactsData, signups]);

  /* Stage totals over the whole pool — the denominators for the bar. */
  const stageCounts = useMemo(() => {
    const counts: Record<Stage, number> = {
      converted: 0,
      awaiting: 0,
      notpitched: 0,
      optedout: 0,
    };
    for (const c of ranked) counts[c.stage] += 1;
    return counts;
  }, [ranked]);

  const poolTotal = ranked.length;
  const contactable = poolTotal - stageCounts.optedout;

  /*
    Source options built from the pool itself, with counts.

    Both the label and the count come from the same array the list renders, so
    picking a source can never show a different number of rows than the option
    promised, and the options always sum to the All total.
  */
  const sourceOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of ranked) {
      const key = c.source ?? '(untagged)';
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({
        value,
        label: value === '(untagged)' ? 'No source tag' : sourceLabel(value),
        count,
      }));
  }, [ranked]);

  /*
    Campaign totals, computed from the college campaigns this page actually
    owns rather than from the `get_stats` action.

    `get_stats` sums EVERY row in `outreach_campaigns` with no filter, and that
    table also holds "Business — All — 17 Apr 2026", a 12,654-recipient blast to
    the business pool. So College Outreach reported 17,089 emails sent when its
    own campaigns account for 4,535 — it was claiming credit for 12,554 emails
    sent to somebody else's list, a 3.8x overstatement. Reducing over the
    already-filtered `campaigns` array cannot drift from the list below it, and
    it drops a network call.
  */
  const campaignTotals = useMemo(() => {
    let recipients = 0;
    let sent = 0;
    let bounced = 0;
    let failed = 0;
    let lastSentAt: number | null = null;
    for (const c of campaigns ?? []) {
      recipients += c.total_recipients || 0;
      sent += c.sent_count || 0;
      bounced += c.bounce_count || 0;
      failed += c.failed_count || 0;
      const finished = c.completed_at || c.started_at;
      if ((c.sent_count || 0) > 0 && finished) {
        const t = new Date(finished).getTime();
        if (lastSentAt === null || t > lastSentAt) lastSentAt = t;
      }
    }
    return { recipients, sent, bounced, failed, lastSentAt };
  }, [campaigns]);

  // Drafts only — finished campaigns aren't reusable as a source.
  const draftCampaigns = useMemo(
    () => (campaigns || []).filter((c) => c.status === 'draft' && !!c.html_body),
    [campaigns]
  );

  const selectedCampaign = useMemo(
    () => draftCampaigns.find((c) => c.id === selectedCampaignId) || null,
    [draftCampaigns, selectedCampaignId]
  );

  // Auto-pick the most recent draft when nothing is selected, or when the
  // saved selection no longer exists (e.g. campaign deleted/sent).
  useEffect(() => {
    if (!draftCampaigns.length) return;
    if (selectedCampaignId && draftCampaigns.some((c) => c.id === selectedCampaignId)) return;
    setSelectedCampaignId(draftCampaigns[0].id);
  }, [draftCampaigns, selectedCampaignId]);

  useEffect(() => {
    if (selectedCampaignId) {
      localStorage.setItem('admin-outreach-selected-campaign', selectedCampaignId);
    }
  }, [selectedCampaignId]);

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
      queryClient.invalidateQueries({ queryKey: ['college-outreach-contacts'] });
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
      queryClient.invalidateQueries({ queryKey: ['college-outreach-contacts'] });
    },
    onError: (err) => toast({ title: `Suppress failed: ${err.message}`, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) => await callOutreach('delete_contacts', { contactIds: ids }),
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Contacts deleted', variant: 'success' });
      setSelectedIds(new Set());
      queryClient.invalidateQueries({ queryKey: ['college-outreach-contacts'] });
    },
    onError: (err) => toast({ title: `Delete failed: ${err.message}`, variant: 'destructive' }),
  });

  async function createAndRunCampaign(ids: string[]) {
    if (ids.length === 0) return;
    if (!selectedCampaign || !selectedCampaign.html_body) {
      toast({
        title: 'Pick a campaign first',
        description: 'Use the Campaign picker above to choose what gets sent.',
        variant: 'warning',
      });
      return;
    }
    try {
      setBatchProgress({
        running: true,
        sent: 0,
        remaining: ids.length,
        failed: 0,
        campaignName: '',
      });

      const name = `College — ${new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })} (${ids.length})`;

      const allSelected = ids.length === sendableIds.length && ids.length > 200;
      const segmentFilter: Record<string, unknown> = allSelected
        ? { tags: [POOL_TAG] }
        : { contact_ids: ids };

      // Clone the picked draft into a new campaign for THIS send so the
      // source draft stays reusable for future sends.
      const { campaign } = await callOutreach<{ campaign: { id: string } }>('create_campaign', {
        name,
        subject: selectedCampaign.subject,
        html_body: selectedCampaign.html_body,
        preheader: selectedCampaign.preheader || null,
        from_name: selectedCampaign.from_name || 'Andrew from Elec-Mate',
        from_email: selectedCampaign.from_email || 'founder@elec-mate.com',
        reply_to: selectedCampaign.reply_to || 'founder@elec-mate.com',
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
      queryClient.invalidateQueries({ queryKey: ['college-outreach-contacts'] });
      queryClient.invalidateQueries({ queryKey: ['college-outreach-campaigns'] });
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
    if (!selectedCampaign) {
      toast({
        title: 'Pick a campaign first',
        description: 'Use the Campaign picker above to choose what gets sent.',
        variant: 'warning',
      });
      return;
    }
    try {
      // Send the test against the selected draft campaign directly — no
      // cloning, no template lookup. Whatever is in the picker is what
      // hits your inbox, period.
      await callOutreach('send_test', {
        campaignId: selectedCampaign.id,
        testEmail,
      });
      haptic.success();
      toast({
        title: 'Test sent — check your inbox',
        description: `"${selectedCampaign.subject}"`,
        variant: 'success',
      });
      setTestEmail('');
    } catch (err) {
      haptic.error();
      const msg = err instanceof Error ? err.message : String(err);
      toast({ title: `Test failed: ${msg}`, variant: 'destructive' });
    }
  }

  /*
    Filter, then rank stale first.

    The list had no sort at all — rows arrived in `created_at DESC` order from
    the edge function, which on a scraped list is effectively the order the
    crawler happened to find them. Follow-up work is driven by age, so the
    default ordering is: never-pitched leads first (they are pure waste sitting
    in the list), then the longest-unanswered pitches, then everything already
    resolved. "Recently contacted" and "Organisation" remain available for the
    times you are looking something up rather than working the queue.
  */
  const visibleContacts = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = ranked.filter((c) => {
      if (stageFilter !== 'all' && c.stage !== stageFilter) return false;
      if (sourceFilter !== 'all' && (c.source ?? '(untagged)') !== sourceFilter) return false;
      if (!q) return true;
      return (
        c.email.toLowerCase().includes(q) ||
        !!c.name?.toLowerCase().includes(q) ||
        !!c.organisation?.toLowerCase().includes(q) ||
        !!c.role?.toLowerCase().includes(q)
      );
    });

    const urgency: Record<Stage, number> = {
      notpitched: 0,
      awaiting: 1,
      converted: 2,
      optedout: 3,
    };

    const sorted = [...filtered];
    if (sortBy === 'org') {
      sorted.sort((a, b) =>
        (a.organisation || a.email).localeCompare(b.organisation || b.email, 'en-GB')
      );
    } else if (sortBy === 'recent') {
      sorted.sort((a, b) => b.activityAt - a.activityAt);
    } else {
      sorted.sort((a, b) => urgency[a.stage] - urgency[b.stage] || a.activityAt - b.activityAt);
    }
    return sorted;
  }, [ranked, stageFilter, sourceFilter, search, sortBy]);

  const sendableIds = useMemo(
    () => visibleContacts.filter((c) => !c.is_suppressed).map((c) => c.id),
    [visibleContacts]
  );

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

  /*
    Chips, and they reconcile with All by construction.

    Every chip counts contacts in the pool and the four stages are mutually
    exclusive, so `All` is exactly their sum. The previous rail mixed units in
    the same strip — "Contacts 1990" was the pool while the neighbouring source
    tabs each counted a subset that excluded a whole tag — and there is no
    reading of that rail where the numbers make sense together.
  */
  const stageChips: { value: StageFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: poolTotal },
    ...STAGES.map((s) => ({
      value: s.key as StageFilter,
      label: s.label,
      count: stageCounts[s.key],
    })),
  ];

  /*
    How long since the last email went out, in words.

    Nowhere on the old page did this appear, and it is the single most useful
    fact about a cold-outreach list: the education pool's most recent send was
    2 May and the page cheerfully showed "Sent 17,089" as though something were
    happening.
  */
  const sinceLastSend =
    campaignTotals.lastSentAt !== null ? Date.now() - campaignTotals.lastSentAt : null;

  const headlineSentence = (() => {
    if (poolTotal === 0) return 'No college contacts in the pool yet.';
    const first = `${contactable.toLocaleString()} still contactable`;
    if (sinceLastSend === null) return `${first}, and nothing has been sent to any of them yet.`;
    return `${first}. The last email went out ${ageLabel(sinceLastSend)} ago.`;
  })();

  const bounceRate =
    campaignTotals.sent > 0
      ? ((campaignTotals.bounced / campaignTotals.sent) * 100).toFixed(1)
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
          title="College Outreach"
          description="Cold outreach to UK FE colleges, training providers and electrical tutors. One pitch, your list."
          tone="yellow"
          actions={
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
            </IconButton>
          }
        />

        {/*
          The pipeline, and how much of it is dead.

          The four cells this replaces read Contacts / Sent / Opened / Clicked,
          and three of those four could not have been right. "Opened" and
          "Clicked" are structurally zero — `total_opens` is 0 on all 16,890
          contacts, `opened_at` is NULL on all 17,324 send rows and every
          campaign's `open_count` is 0, because nothing writes them — so the
          open rate and click rate under them read "0%" for ever and two of the
          four most prominent numbers on the page were guaranteed noughts.
          "Contacts" came from a search-dependent array so it moved as you
          typed, and its "6239 suppressed" sub-line came from `get_contact_stats`
          which counts the ENTIRE 16,890-row contacts table — it was printing a
          suppression count three times larger than the 1,990-contact pool it
          sat beneath. What replaces them is the one thing the page never told
          you: where each contact actually is in the pipeline.
        */}
        <section className="relative -mx-4 overflow-hidden rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-elec-yellow/20 to-transparent" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <Eyebrow>College pipeline</Eyebrow>
              <div className="mt-4 text-[38px] font-semibold leading-none tracking-tight text-white sm:text-[52px]">
                {poolTotal.toLocaleString()}
              </div>
              <div className="mt-2 text-[13px] text-white">{headlineSentence}</div>

              {poolTotal > 0 && (
                <div className="mt-5">
                  {/* Proportional, so a pool that is half opted-out looks half
                      opted-out. The old strip put four unrelated absolute
                      numbers side by side and showed no proportion at all. */}
                  <div className="flex w-full rounded-full" style={{ height: 10, gap: 2 }}>
                    {STAGES.filter((s) => stageCounts[s.key] > 0).map((s, i, seg) => (
                      <div
                        key={s.key}
                        title={`${s.label}: ${stageCounts[s.key]}`}
                        style={{
                          width: `calc(${(stageCounts[s.key] / poolTotal) * 100}% - ${
                            (2 * (seg.length - 1)) / seg.length
                          }px)`,
                          background: s.fill,
                          borderTopLeftRadius: i === 0 ? 999 : 2,
                          borderBottomLeftRadius: i === 0 ? 999 : 2,
                          borderTopRightRadius: i === seg.length - 1 ? 999 : 2,
                          borderBottomRightRadius: i === seg.length - 1 ? 999 : 2,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-white">
                    {STAGES.filter((s) => stageCounts[s.key] > 0).map((s) => (
                      <span key={s.key} className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ background: s.fill }}
                        />
                        <span className="font-medium tabular-nums text-white">
                          {stageCounts[s.key].toLocaleString()}
                        </span>{' '}
                        {s.label.toLowerCase()}
                      </span>
                    ))}
                  </div>
                  {/* Deliverability, which had no home on the page at all even
                      though 168 of the 4,535 college emails hard-bounced. A
                      bad list burns the sending domain long before it burns
                      the campaign. */}
                  {bounceRate !== null && (
                    <div className="mt-4 text-[12px] text-white">
                      <span
                        className="font-semibold tabular-nums"
                        style={{
                          color:
                            Number(bounceRate) >= 5 ? BAD : Number(bounceRate) >= 2 ? WARN : GOOD,
                        }}
                      >
                        {bounceRate}%
                      </span>{' '}
                      bounce rate across {campaignTotals.sent.toLocaleString()} college emails sent
                      {campaignTotals.failed > 0 && ` · ${campaignTotals.failed} failed outright`}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Each cell is the filter it describes, so the number and the list
                below can never disagree about what it meant. */}
            <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
              {STAGES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => {
                    setActiveView('contacts');
                    setStageFilter(stageFilter === s.key ? 'all' : s.key);
                    setSelectedIds(new Set());
                  }}
                  aria-pressed={stageFilter === s.key}
                  className={cn(
                    'touch-manipulation bg-[hsl(0_0%_9%)] px-4 py-5 text-left transition-colors hover:bg-[hsl(0_0%_12%)]',
                    stageFilter === s.key && 'bg-[hsl(0_0%_14%)]'
                  )}
                >
                  <div
                    className="text-[22px] font-semibold leading-none sm:text-[26px]"
                    style={{ color: stageCounts[s.key] > 0 ? s.fill : undefined }}
                  >
                    {stageCounts[s.key].toLocaleString()}
                  </div>
                  <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                    {s.cell}
                  </div>
                  {/* "Reached" depends on the account list, which loads on its
                      own clock. Say so rather than showing a confident zero
                      that silently corrects itself a second later — a wrong
                      number you can trust is worse than a number that waits. */}
                  <div className="mt-1 text-[11px] text-white/60">
                    {s.key === 'converted' && !signups.isReady ? 'checking accounts…' : s.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/*
          Campaign picker and test send, on one card.

          These were two separate full-width cards stacked on top of each other,
          each with its own header, its own paragraph of explanation and its own
          hairline — roughly 320px of chrome to choose a draft and type an email
          address. They are one action: decide what goes out, then post yourself
          a copy of it.
        */}
        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="What gets sent"
            meta={
              selectedCampaign ? (
                <Pill tone="emerald">{selectedCampaign.status}</Pill>
              ) : (
                <Pill tone="red">none picked</Pill>
              )
            }
          />
          <div className="space-y-3 px-4 py-4 sm:px-5">
            <div className="flex flex-col gap-2 sm:flex-row">
              <select
                value={selectedCampaignId || ''}
                onChange={(e) => setSelectedCampaignId(e.target.value || null)}
                aria-label="Campaign to send"
                className="h-11 min-w-0 flex-1 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
              >
                {draftCampaigns.length === 0 && (
                  <option value="">No draft campaigns — create one first</option>
                )}
                {draftCampaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Send a test to"
                  className="h-11 min-w-0 flex-1 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] text-white caret-elec-yellow placeholder:text-white/40 focus:border-elec-yellow focus:outline-none sm:w-52 sm:flex-none"
                />
                <button
                  onClick={sendTest}
                  disabled={!testEmail || !selectedCampaign}
                  className="inline-flex h-11 shrink-0 touch-manipulation items-center justify-center gap-1.5 rounded-full bg-elec-yellow px-4 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                  Test
                </button>
              </div>
            </div>
            {selectedCampaign ? (
              <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                <p className="text-[14px] font-semibold leading-snug text-white">
                  {selectedCampaign.subject}
                </p>
                {selectedCampaign.preheader && (
                  <p className="mt-1 text-[12px] leading-snug text-white">
                    {selectedCampaign.preheader}
                  </p>
                )}
                <p className="mt-2 text-[11px] text-white/60">
                  From {selectedCampaign.from_name || 'Andrew from Elec-Mate'} &middot;{' '}
                  {selectedCampaign.from_email || 'founder@elec-mate.com'} &middot; test subject is
                  prefixed [TEST] and nobody is marked sent
                </p>
              </div>
            ) : (
              <p className="text-[12.5px] leading-relaxed text-white">
                Pick a draft above. It is what the test send and the bulk send will both use.
              </p>
            )}
          </div>
        </ListCard>

        {batchProgress.running && (
          <ListCard>
            <div className="relative px-4 py-4 sm:px-5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 to-transparent" />
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-elec-yellow" />
                  <Eyebrow>Sending</Eyebrow>
                  <span className="truncate text-[12.5px] font-medium text-white">
                    {batchProgress.campaignName || '…'}
                  </span>
                </div>
                <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                  {batchProgress.sent}/{batchProgress.sent + batchProgress.remaining}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    background: '#3987E5',
                    width: `${
                      batchProgress.sent + batchProgress.remaining > 0
                        ? (batchProgress.sent / (batchProgress.sent + batchProgress.remaining)) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
              {batchProgress.failed > 0 && (
                <p className="mt-2 text-[11px] text-white">
                  <Pill tone="red" className="mr-1.5">
                    {batchProgress.failed}
                  </Pill>
                  failed
                </p>
              )}
            </div>
          </ListCard>
        )}

        {/*
          One filter row.

          There were three stacked rails before this: a Contacts/Campaigns pill
          group on its own line, then a FilterBar whose tab strip carried
          fourteen source chips and scrolled sideways off the screen, then the
          select-all bar. The view switch, the stage chips, source, sort, search
          and Import now share a single track — stage stays as chips because it
          is what you switch between, and the two long lists collapse to selects
          that show their own counts.
        */}
        <div className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-3 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/[0.12] bg-white/[0.04] p-1">
              {[
                { value: 'contacts' as const, label: 'Contacts', count: poolTotal },
                { value: 'campaigns' as const, label: 'Campaigns', count: campaigns?.length ?? 0 },
              ].map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => setActiveView(v.value)}
                  className={cn(
                    'h-9 touch-manipulation rounded-full px-3 text-[12px] font-medium transition-colors',
                    activeView === v.value
                      ? 'bg-elec-yellow text-black'
                      : 'text-white hover:bg-white/[0.08]'
                  )}
                >
                  {v.label}
                  <span
                    className={cn(
                      'ml-1.5 text-[11px] tabular-nums',
                      activeView === v.value ? 'text-black/60' : 'text-white/60'
                    )}
                  >
                    {v.count}
                  </span>
                </button>
              ))}
            </div>

            {activeView === 'contacts' && (
              <>
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                  {stageChips.map((chip) => (
                    <button
                      key={chip.value}
                      type="button"
                      onClick={() => {
                        setStageFilter(chip.value);
                        setSelectedIds(new Set());
                      }}
                      className={cn(
                        'h-9 touch-manipulation rounded-full px-3 text-[12px] font-medium transition-colors',
                        stageFilter === chip.value
                          ? 'bg-elec-yellow text-black'
                          : 'text-white hover:bg-white/[0.08]'
                      )}
                    >
                      {chip.label}
                      <span
                        className={cn(
                          'ml-1.5 text-[11px] tabular-nums',
                          stageFilter === chip.value ? 'text-black/60' : 'text-white/60'
                        )}
                      >
                        {chip.count}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <select
                    value={sourceFilter}
                    onChange={(e) => {
                      setSourceFilter(e.target.value);
                      setSelectedIds(new Set());
                    }}
                    aria-label="Filter by source"
                    className="h-9 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
                  >
                    <option value="all">All sources ({poolTotal})</option>
                    {sourceOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label} ({o.count})
                      </option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortKey)}
                    aria-label="Sort contacts"
                    className="h-9 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
                  >
                    <option value="stale">Stalest first</option>
                    <option value="recent">Recently contacted</option>
                    <option value="org">Organisation</option>
                  </select>

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name, email or college…"
                    aria-label="Search contacts"
                    className="h-9 w-[10rem] touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 text-[12px] text-white caret-elec-yellow placeholder:text-white/40 focus:border-elec-yellow focus:outline-none sm:w-56"
                  />

                  <button
                    onClick={() => setImportOpen(true)}
                    className="inline-flex h-9 touch-manipulation items-center gap-1.5 rounded-full bg-elec-yellow px-3.5 text-[12px] font-semibold text-black transition-colors hover:bg-elec-yellow/90"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Import
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {activeView === 'contacts' && (
          <>
            {visibleContacts.length > 0 && !contactsLoading && (
              <ListCard>
                <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <Checkbox
                      checked={sendableIds.length > 0 && selectedIds.size === sendableIds.length}
                      onCheckedChange={toggleAll}
                      disabled={batchProgress.running || sendableIds.length === 0}
                      className="shrink-0 border-white/40 data-[state=checked]:border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                    />
                    <span className="whitespace-nowrap text-[13px] font-medium text-white">
                      {selectedIds.size > 0
                        ? `${selectedIds.size} selected`
                        : /* Say how many of what is on screen can actually be
                             emailed. "Select all · 1990" was a lie whenever the
                             view contained suppressed rows, which cannot be
                             ticked at all. */
                          `Select all · ${sendableIds.length} of ${visibleContacts.length} emailable`}
                    </span>
                  </div>
                  {selectedIds.size > 0 && !batchProgress.running && (
                    <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
                      <button
                        onClick={() => suppressMutation.mutate(Array.from(selectedIds))}
                        disabled={suppressMutation.isPending}
                        className="inline-flex h-11 touch-manipulation items-center justify-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 text-[12.5px] font-medium text-white hover:bg-white/[0.08] disabled:opacity-50"
                      >
                        <Ban className="h-3.5 w-3.5" />
                        Suppress
                      </button>
                      <button
                        onClick={() =>
                          setConfirmSend({
                            count: selectedIds.size,
                            ids: Array.from(selectedIds),
                          })
                        }
                        className="inline-flex h-11 touch-manipulation items-center justify-center gap-1.5 rounded-full bg-elec-yellow px-4 text-[12.5px] font-semibold text-black transition-colors hover:bg-elec-yellow/90"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Send {selectedIds.size}
                      </button>
                    </div>
                  )}
                </div>
              </ListCard>
            )}

            {contactsLoading ? (
              <LoadingBlocks />
            ) : visibleContacts.length === 0 ? (
              <EmptyState
                title={search || stageFilter !== 'all' ? 'No matches' : 'No contacts yet'}
                description={
                  search || stageFilter !== 'all'
                    ? 'Nothing in the pool matches those filters.'
                    : 'Import a CSV or wait for the scraper — college_staff_page, ROATP and Ofsted crawls feed this pool.'
                }
                action={!search ? 'Import contacts' : undefined}
                onAction={!search ? () => setImportOpen(true) : undefined}
              />
            ) : (
              <ListCard>
                <ListCardHeader
                  tone="blue"
                  title={stageFilter === 'all' ? 'Contacts' : STAGE_BY_KEY[stageFilter].label}
                  meta={<Pill tone="blue">{visibleContacts.length}</Pill>}
                />
                <ListBody>
                  {visibleContacts.map((c) => {
                    const stage = STAGE_BY_KEY[c.stage];

                    /*
                      Age, sized and coloured by how bad it is.

                      A contact last emailed in February and one emailed
                      yesterday rendered identically — neither showed a date at
                      all — so there was no way to see that the entire pool had
                      gone quiet three months ago. Amber past a month, red past
                      three, and only for contacts still in play: an opted-out
                      address being old is not a problem to solve.
                    */
                    const chase = c.stage === 'awaiting' || c.stage === 'notpitched';
                    const ageColour = !chase
                      ? undefined
                      : c.ageMs > 90 * DAY_MS
                        ? BAD
                        : c.ageMs > 30 * DAY_MS
                          ? WARN
                          : undefined;

                    const contactedLine =
                      c.total_sends > 0
                        ? `Emailed ${c.total_sends}× · last activity ${shortDate(
                            new Date(c.activityAt).toISOString()
                          )}`
                        : `Never emailed · in the list since ${shortDate(c.created_at)}`;

                    const who = [c.organisation, c.role].filter(Boolean).join(' · ') || c.email;

                    return (
                      <ListRow
                        key={c.id}
                        subtitleWrap
                        lead={
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={selectedIds.has(c.id)}
                              onCheckedChange={() => toggleOne(c.id)}
                              disabled={c.is_suppressed}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={
                                c.is_suppressed
                                  ? 'Suppressed — cannot be emailed'
                                  : `Select ${c.name || c.email}`
                              }
                              className="border-white/40 data-[state=checked]:border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                            />
                            <Avatar initials={getInitials(c.name, c.email)} />
                          </div>
                        }
                        /*
                          Everything lives in title/subtitle, nothing in
                          `trailing`. ListRow's trailing slot is shrink-0 while
                          the text block is flex-1 min-w-0, so the four pills
                          this row used to pass into it claimed most of a 375px
                          screen and the college name truncated to nothing —
                          on a list whose entire purpose is telling colleges
                          apart.
                        */
                        title={
                          <span className="flex items-baseline gap-2">
                            <span className="truncate">{c.name || c.email}</span>
                            <span
                              className="ml-auto shrink-0 text-[13px] font-semibold tabular-nums"
                              style={{ color: ageColour }}
                              title={
                                chase
                                  ? `No follow-up for ${ageLabel(c.ageMs)}`
                                  : `Last activity ${ageLabel(c.ageMs)} ago`
                              }
                            >
                              {ageLabel(c.ageMs)}
                            </span>
                          </span>
                        }
                        subtitle={
                          <span className="flex min-w-0 flex-col gap-1">
                            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                              <span
                                className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
                                style={{ color: stage.fill }}
                              >
                                <span
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{ background: stage.fill }}
                                />
                                {/* Distinguish the person who signed up from a
                                    colleague at the same college — one is a
                                    reply waiting to happen, the other is a
                                    warm introduction. */}
                                {c.stage === 'converted'
                                  ? c.isAccount
                                    ? 'Has an account'
                                    : 'Colleague signed up'
                                  : stage.label}
                              </span>
                              <span className="min-w-0 truncate text-white">{who}</span>
                            </span>
                            <span className="flex flex-wrap items-center gap-x-2 text-[11px] text-white/60">
                              <span>{contactedLine}</span>
                              {c.source && <span>· {sourceLabel(c.source)}</span>}
                              {c.is_suppressed && c.suppression_reason && (
                                <span>· {c.suppression_reason}</span>
                              )}
                            </span>
                          </span>
                        }
                        className={c.is_suppressed ? 'opacity-70' : undefined}
                      />
                    );
                  })}
                </ListBody>
              </ListCard>
            )}

            {selectedIds.size > 0 && !batchProgress.running && (
              <>
                <Divider label="Danger" />
                <button
                  onClick={() => {
                    if (confirm(`Delete ${selectedIds.size} contacts permanently?`)) {
                      deleteMutation.mutate(Array.from(selectedIds));
                    }
                  }}
                  disabled={deleteMutation.isPending}
                  className="inline-flex h-11 w-full touch-manipulation items-center justify-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-[13px] font-medium text-white hover:bg-white/[0.08] disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete selected ({selectedIds.size})
                </button>
              </>
            )}
          </>
        )}

        {activeView === 'campaigns' && (
          <>
            {!campaigns || campaigns.length === 0 ? (
              <EmptyState
                title="No campaigns yet"
                description="Send to some contacts to create your first college outreach campaign."
              />
            ) : (
              <ListCard>
                <ListCardHeader
                  tone="blue"
                  title="Campaigns"
                  meta={<Pill tone="blue">{campaigns.length}</Pill>}
                />
                <ListBody>
                  {campaigns.map((c) => (
                    <CampaignRow key={c.id} campaign={c} />
                  ))}
                </ListBody>
              </ListCard>
            )}
          </>
        )}

        <Sheet open={importOpen} onOpenChange={setImportOpen}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_10%)] p-0"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-center pb-2 pt-3">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="border-b border-white/[0.06] px-5 pb-4">
                <SheetTitle className="flex items-center gap-2 text-[14px] text-white">
                  <Upload className="h-4 w-4 text-elec-yellow" />
                  Import college contacts
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 space-y-5 overflow-y-auto p-5">
                <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4">
                  <Eyebrow>Ingest rules</Eyebrow>
                  <p className="mt-2 text-[12px] leading-relaxed text-white">
                    Imported contacts are auto-tagged with{' '}
                    <code className="rounded bg-black/40 px-1 py-0.5 text-white">
                      education_pool
                    </code>{' '}
                    and{' '}
                    <code className="rounded bg-black/40 px-1 py-0.5 text-white">
                      source:csv_import
                    </code>
                    , so they show up here alongside scraped leads. contact_type defaults to{' '}
                    <code className="rounded bg-black/40 px-1 py-0.5 text-white">college</code> to
                    match the ingest pipeline.
                  </p>
                </div>

                <div className="space-y-2">
                  <Eyebrow>Paste CSV</Eyebrow>
                  <p className="text-[12px] leading-relaxed text-white">
                    Header row optional. Accepts columns: <code>email</code>, <code>name</code>,{' '}
                    <code>organisation</code> (or college), <code>role</code> (or title),{' '}
                    <code>tags</code> (semicolon-separated). If no header, first column assumed to
                    be email.
                  </p>
                  <Textarea
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    placeholder={`email,name,organisation,role
s.tutor@cityoflondon.ac.uk,Sam Tutor,City of London College,Electrical Tutor
apprenticeships@leeds.ac.uk,Jane Smith,Leeds City College,Apprenticeship Coordinator`}
                    className="min-h-[240px] touch-manipulation border-white/[0.08] bg-[hsl(0_0%_12%)] font-mono text-[13px] text-white placeholder:text-white focus:border-elec-yellow/60 focus:ring-0"
                  />
                  <p className="text-[11px] text-white">
                    {csvText.split(/\r?\n/).filter((l) => l.trim()).length} lines pasted
                  </p>
                </div>

                <button
                  onClick={() => importMutation.mutate()}
                  disabled={!csvText.trim() || importMutation.isPending}
                  className="inline-flex h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-elec-yellow text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:cursor-not-allowed disabled:opacity-40"
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
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-5 sm:max-w-lg sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base leading-tight text-white sm:text-lg">
                Send college pitch to {confirmSend?.count} contacts?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-2 text-sm leading-relaxed">
                  <p className="text-white">
                    Uses Resend's batch API — {BATCH_SIZE} emails per call with a{' '}
                    {INTER_BATCH_GAP_MS}ms gap between calls (under Resend's 2 req/sec rate limit).
                    Suppressed contacts are skipped automatically.
                  </p>
                  <p className="text-xs text-white">
                    Recipients get an unsubscribe link. One-click unsubscribes added to your
                    suppression list.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse gap-2 pt-2 sm:flex-row">
              <AlertDialogCancel className="mt-0 h-12 w-full touch-manipulation rounded-full border-white/[0.08] bg-white/[0.04] text-base text-white hover:bg-white/[0.08] sm:h-11 sm:w-auto sm:text-sm">
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
      </PageFrame>
    </PullToRefresh>
  );
}

function CampaignRow({ campaign }: { campaign: CollegeCampaign }) {
  const progress =
    campaign.total_recipients > 0
      ? Math.round((campaign.sent_count / campaign.total_recipients) * 100)
      : 0;
  const tone =
    campaign.status === 'completed'
      ? 'emerald'
      : campaign.status === 'sending'
        ? 'blue'
        : campaign.status === 'paused'
          ? 'amber'
          : 'yellow';

  /*
    Bounce rate replaces the open and click pills.

    Those pills were `campaign.open_count > 0 && …` and `click_count > 0 && …`,
    and both counters are zero on every campaign that has ever run — nothing
    writes them — so the two conditions were unreachable and the row rendered
    only a sent count. Bounces are the number that is real and that matters:
    the 17 Apr college send bounced 163 of 1,893, which is 8.6% and high enough
    to put the sending domain's reputation at risk.
  */
  const bounceRate =
    campaign.sent_count > 0 ? (campaign.bounce_count / campaign.sent_count) * 100 : null;
  const bounceColour =
    bounceRate === null ? undefined : bounceRate >= 5 ? BAD : bounceRate >= 2 ? WARN : GOOD;

  return (
    <div className="space-y-2.5 px-4 py-4 sm:px-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] font-medium text-white">{campaign.name}</div>
          <div className="mt-0.5 text-[11.5px] text-white/60">
            {formatDistanceToNow(parseISO(campaign.created_at), { addSuffix: true })}
          </div>
        </div>
        <Pill tone={tone}>{campaign.status}</Pill>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-white">
        <span className="tabular-nums">
          <span className="font-semibold">{campaign.sent_count.toLocaleString()}</span> of{' '}
          {campaign.total_recipients.toLocaleString()} sent
        </span>
        {bounceRate !== null && (
          <span className="tabular-nums" style={{ color: bounceColour }}>
            <span className="font-semibold">{bounceRate.toFixed(1)}%</span> bounced (
            {campaign.bounce_count.toLocaleString()})
          </span>
        )}
        {campaign.failed_count > 0 && (
          <span className="tabular-nums" style={{ color: BAD }}>
            <span className="font-semibold">{campaign.failed_count.toLocaleString()}</span> failed
          </span>
        )}
      </div>
      {campaign.total_recipients > 0 && campaign.status !== 'completed' && (
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, background: '#3987E5' }}
          />
        </div>
      )}
    </div>
  );
}
