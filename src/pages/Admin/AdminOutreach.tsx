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
  StatStrip,
  FilterBar,
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
}

const POOL_TAG = 'education_pool';

type SourceKey =
  | 'all'
  | 'apollo_college_heads'
  | 'apollo_electrical_tutors'
  | 'apollo_assessors'
  | 'apollo_apprenticeship_coords'
  | 'apollo_training_provider_directors'
  | 'gov_uk_apprenticeships'
  | 'roatp'
  | 'niceic_training'
  | 'college_staff_page'
  | 'ofsted_register'
  | 'colleges_scotland'
  | 'manual'
  | 'csv_import';

const SOURCES: Exclude<SourceKey, 'all'>[] = [
  'apollo_college_heads',
  'apollo_electrical_tutors',
  'apollo_assessors',
  'apollo_apprenticeship_coords',
  'apollo_training_provider_directors',
  'gov_uk_apprenticeships',
  'roatp',
  'niceic_training',
  'college_staff_page',
  'ofsted_register',
  'colleges_scotland',
  'manual',
  'csv_import',
];

const SOURCE_LABEL: Record<Exclude<SourceKey, 'all'>, string> = {
  apollo_college_heads: 'Colleges',
  apollo_electrical_tutors: 'Tutors',
  apollo_assessors: 'Assessors',
  apollo_apprenticeship_coords: 'Apprenticeship Coords',
  apollo_training_provider_directors: 'Training Providers',
  gov_uk_apprenticeships: 'Apprenticeships.gov',
  roatp: 'ROATP',
  niceic_training: 'NICEIC Training',
  college_staff_page: 'College Staff',
  ofsted_register: 'Ofsted',
  colleges_scotland: 'Scotland',
  manual: 'Manual',
  csv_import: 'CSV',
};

const BATCH_SIZE = 100;
const INTER_BATCH_GAP_MS = 500;
const COLLEGE_TEMPLATE_SLUG = 'college-apprentice-showcase-v1';

function sourceOf(contact: { tags: string[] | null }): string | null {
  if (!contact.tags) return null;
  const t = contact.tags.find((x) => x.startsWith('source:'));
  return t ? t.slice(7) : null;
}

function getInitials(name: string | null, email: string): string {
  const base = (name && name.trim()) || email;
  const parts = base.split(/[\s@.]+/).filter(Boolean);
  if (parts.length === 0) return '—';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
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
  const iRole =
    col('role') >= 0 ? col('role') : col('title') >= 0 ? col('title') : col('position');
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

export default function AdminOutreach() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [search, setSearch] = useState('');
  const [activeSource, setActiveSource] = useState<SourceKey>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [testEmail, setTestEmail] = useState('');
  const [importOpen, setImportOpen] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [activeTab, setActiveTab] = useState<'contacts' | 'campaigns'>('contacts');
  const [confirmSend, setConfirmSend] = useState<{ count: number; ids: string[] } | null>(null);
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

  const { data: contactsData, isLoading: contactsLoading, isFetching, refetch } = useQuery({
    queryKey: ['college-outreach-contacts', search],
    queryFn: async () => {
      const filter: Record<string, unknown> = { limit: 15000, tag: POOL_TAG };
      if (search) filter.search = search;
      return await callOutreach<{ contacts: CollegeContact[]; total: number }>(
        'get_contacts',
        filter
      );
    },
    staleTime: 30 * 1000,
  });

  const contacts = useMemo(() => {
    const all = contactsData?.contacts || [];
    if (activeSource === 'all') return all;
    return all.filter((c) => sourceOf(c) === activeSource);
  }, [contactsData, activeSource]);

  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of contactsData?.contacts || []) {
      const s = sourceOf(c) || 'unknown';
      counts[s] = (counts[s] || 0) + 1;
    }
    return counts;
  }, [contactsData]);

  const { data: stats } = useQuery({
    queryKey: ['college-outreach-stats'],
    queryFn: async () =>
      callOutreach<{
        totalRecipients: number;
        totalSent: number;
        totalOpened: number;
        totalClicked: number;
        totalBounced: number;
        totalCampaigns: number;
        totalContacts: number;
        suppressedContacts: number;
        openRate: string;
        clickRate: string;
      }>('get_stats'),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });

  const { data: contactStats } = useQuery({
    queryKey: ['college-outreach-contact-stats'],
    queryFn: async () =>
      callOutreach<{
        total: number;
        active: number;
        suppressed: number;
        byType: Record<string, number>;
      }>('get_contact_stats'),
    staleTime: 30 * 1000,
  });

  const { data: campaigns } = useQuery({
    queryKey: ['college-outreach-campaigns'],
    queryFn: async () => {
      const res = await callOutreach<{ campaigns: CollegeCampaign[] }>('get_campaigns');
      return res.campaigns.filter((c) => c.name.startsWith('College —'));
    },
    staleTime: 30 * 1000,
  });

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
      queryClient.invalidateQueries({ queryKey: ['college-outreach-contact-stats'] });
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
      queryClient.invalidateQueries({ queryKey: ['college-outreach-contact-stats'] });
    },
    onError: (err) => toast({ title: `Delete failed: ${err.message}`, variant: 'destructive' }),
  });

  async function ensureTemplate(): Promise<{
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
    let tpl = res.templates.find((t) => t.slug === COLLEGE_TEMPLATE_SLUG);
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
      tpl = res2.templates.find((t) => t.slug === COLLEGE_TEMPLATE_SLUG);
    }
    if (!tpl) throw new Error('College template missing after seed');
    return { subject: tpl.subject, html_body: tpl.html_body, preheader: tpl.preheader };
  }

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
      const tpl = await ensureTemplate();

      const name = `College — ${new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })} (${ids.length})`;

      const allSelected = ids.length === sendableIds.length && ids.length > 200;
      const segmentFilter: Record<string, unknown> = allSelected
        ? { tags: [POOL_TAG] }
        : { contact_ids: ids };

      const { campaign } = await callOutreach<{ campaign: { id: string } }>('create_campaign', {
        name,
        subject: tpl.subject,
        html_body: tpl.html_body,
        preheader: tpl.preheader,
        template_slug: COLLEGE_TEMPLATE_SLUG,
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
      queryClient.invalidateQueries({ queryKey: ['college-outreach-contacts'] });
      queryClient.invalidateQueries({ queryKey: ['college-outreach-campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['college-outreach-stats'] });
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
      const tpl = await ensureTemplate();
      const { campaign } = await callOutreach<{ campaign: { id: string } }>('create_campaign', {
        name: `College — TEST ${Date.now()}`,
        subject: tpl.subject,
        html_body: tpl.html_body,
        preheader: tpl.preheader,
        template_slug: COLLEGE_TEMPLATE_SLUG,
        from_name: 'Andrew from Elec-Mate',
        from_email: 'founder@elec-mate.com',
        reply_to: 'founder@elec-mate.com',
        segment_filter: {},
      });
      await callOutreach('send_test', { campaignId: campaign.id, testEmail });
      haptic.success();
      toast({ title: 'Test sent — check your inbox', variant: 'success' });
      setTestEmail('');
    } catch (err) {
      haptic.error();
      const msg = err instanceof Error ? err.message : String(err);
      toast({ title: `Test failed: ${msg}`, variant: 'destructive' });
    }
  }

  const visibleContacts = useMemo(() => {
    if (!search) return contacts;
    const s = search.toLowerCase();
    return contacts.filter(
      (c) =>
        c.email.toLowerCase().includes(s) ||
        c.name?.toLowerCase().includes(s) ||
        c.organisation?.toLowerCase().includes(s)
    );
  }, [contacts, search]);

  const sendableIds = useMemo(
    () => visibleContacts.filter((c) => !c.is_suppressed).map((c) => c.id),
    [visibleContacts]
  );

  const totalSendable = contactsData?.contacts.length || 0;

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

  const filterTabs = [
    { value: 'all', label: 'All', count: totalSendable },
    ...SOURCES.filter((s) => (sourceCounts[s] || 0) > 0 || activeSource === s).map((s) => ({
      value: s,
      label: SOURCE_LABEL[s],
      count: sourceCounts[s] || 0,
    })),
  ];

  const openRate = stats?.openRate ? `${stats.openRate}%` : '—';
  const clickRate = stats?.clickRate ? `${stats.clickRate}%` : '—';

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
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Contacts',
              value: totalSendable.toLocaleString(),
              sub: contactStats ? `${contactStats.suppressed} suppressed` : undefined,
            },
            {
              label: 'Sent',
              value: (stats?.totalSent || 0).toLocaleString(),
              tone: 'blue',
            },
            {
              label: 'Opened',
              value: (stats?.totalOpened || 0).toLocaleString(),
              sub: openRate,
              tone: 'emerald',
            },
            {
              label: 'Clicked',
              value: (stats?.totalClicked || 0).toLocaleString(),
              sub: clickRate,
              accent: true,
            },
          ]}
        />

        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="Send yourself a test"
            meta={<Pill tone="yellow">preview</Pill>}
          />
          <div className="px-5 sm:px-6 py-5 space-y-3">
            <p className="text-[12.5px] text-white leading-relaxed">
              Preview the college pitch. Subject prefixed [TEST]. Nobody marked sent.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-11 px-4 flex-1 bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-full text-[13px] text-white placeholder:text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
              />
              <button
                onClick={sendTest}
                disabled={!testEmail}
                className="h-11 px-5 rounded-full bg-elec-yellow text-black text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 touch-manipulation disabled:opacity-40 disabled:cursor-not-allowed hover:bg-elec-yellow/90 transition-colors"
              >
                <Send className="h-4 w-4" />
                Send test
              </button>
            </div>
          </div>
        </ListCard>

        {batchProgress.running && (
          <ListCard>
            <div className="relative px-5 sm:px-6 py-4">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70" />
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Loader2 className="h-4 w-4 animate-spin text-elec-yellow shrink-0" />
                  <Eyebrow>Sending</Eyebrow>
                  <span className="text-[12.5px] font-medium text-white truncate">
                    {batchProgress.campaignName || '…'}
                  </span>
                </div>
                <span className="text-[13px] font-semibold text-white tabular-nums shrink-0">
                  {batchProgress.sent}/{batchProgress.sent + batchProgress.remaining}
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-elec-yellow rounded-full transition-all duration-500"
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

        <div className="flex items-center gap-1 p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full self-start">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation ${
              activeTab === 'contacts'
                ? 'bg-elec-yellow text-black'
                : 'text-white hover:bg-white/[0.04]'
            }`}
          >
            Contacts{' '}
            <span
              className={`ml-1 tabular-nums text-[11px] ${
                activeTab === 'contacts' ? 'text-black/60' : 'text-white'
              }`}
            >
              {totalSendable}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation ${
              activeTab === 'campaigns'
                ? 'bg-elec-yellow text-black'
                : 'text-white hover:bg-white/[0.04]'
            }`}
          >
            Campaigns{' '}
            <span
              className={`ml-1 tabular-nums text-[11px] ${
                activeTab === 'campaigns' ? 'text-black/60' : 'text-white'
              }`}
            >
              {campaigns?.length || 0}
            </span>
          </button>
        </div>

        {activeTab === 'contacts' && (
          <>
            <FilterBar
              tabs={filterTabs}
              activeTab={activeSource}
              onTabChange={(v) => {
                setActiveSource(v as SourceKey);
                setSelectedIds(new Set());
              }}
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search email or college…"
              actions={
                <button
                  onClick={() => setImportOpen(true)}
                  className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold inline-flex items-center gap-1.5 touch-manipulation hover:bg-elec-yellow/90 transition-colors"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Import
                </button>
              }
            />

            {visibleContacts.length > 0 && !contactsLoading && (
              <ListCard>
                <div className="px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Checkbox
                      checked={
                        sendableIds.length > 0 && selectedIds.size === sendableIds.length
                      }
                      onCheckedChange={toggleAll}
                      disabled={batchProgress.running}
                      className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black shrink-0"
                    />
                    <span className="text-[13px] font-medium text-white whitespace-nowrap">
                      {selectedIds.size > 0
                        ? `${selectedIds.size} selected`
                        : `Select all · ${sendableIds.length}`}
                    </span>
                  </div>
                  {selectedIds.size > 0 && !batchProgress.running && (
                    <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex">
                      <button
                        onClick={() => suppressMutation.mutate(Array.from(selectedIds))}
                        disabled={suppressMutation.isPending}
                        className="h-10 px-4 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12.5px] font-medium text-white hover:bg-white/[0.08] inline-flex items-center justify-center gap-1.5 touch-manipulation disabled:opacity-50"
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
                        className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[12.5px] font-semibold inline-flex items-center justify-center gap-1.5 touch-manipulation hover:bg-elec-yellow/90 transition-colors"
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
                title={search ? 'No matches' : 'No contacts yet'}
                description={
                  search
                    ? 'Nothing matches that search.'
                    : 'Import a CSV or wait for the scraper — college_staff_page, ROATP and Ofsted crawls feed this pool.'
                }
                action={!search ? 'Import contacts' : undefined}
                onAction={!search ? () => setImportOpen(true) : undefined}
              />
            ) : (
              <ListCard>
                <ListCardHeader
                  tone="blue"
                  title="Colleges"
                  meta={<Pill tone="blue">{visibleContacts.length}</Pill>}
                />
                <ListBody>
                  {visibleContacts.map((c) => {
                    const src = sourceOf(c);
                    const srcLabel =
                      src && (SOURCES as readonly string[]).includes(src)
                        ? SOURCE_LABEL[src as Exclude<SourceKey, 'all'>]
                        : null;
                    const subtitleParts: string[] = [];
                    if (c.organisation) subtitleParts.push(c.organisation);
                    if (c.role) subtitleParts.push(c.role);
                    if (subtitleParts.length === 0) subtitleParts.push(c.email);
                    const subtitle = subtitleParts.join(' · ');

                    return (
                      <ListRow
                        key={c.id}
                        lead={
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={selectedIds.has(c.id)}
                              onCheckedChange={() => toggleOne(c.id)}
                              disabled={c.is_suppressed}
                              onClick={(e) => e.stopPropagation()}
                              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                            />
                            <Avatar initials={getInitials(c.name, c.email)} />
                          </div>
                        }
                        title={c.name || c.email}
                        subtitle={subtitle}
                        trailing={
                          <>
                            {c.is_suppressed && <Pill tone="red">Suppressed</Pill>}
                            {srcLabel && !c.is_suppressed && (
                              <Pill tone="yellow">{srcLabel}</Pill>
                            )}
                            {c.total_opens > 0 && (
                              <Pill tone="emerald">{c.total_opens} open</Pill>
                            )}
                            {c.total_clicks > 0 && (
                              <Pill tone="purple">{c.total_clicks} click</Pill>
                            )}
                          </>
                        }
                        className={c.is_suppressed ? 'opacity-60' : undefined}
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
                  className="w-full h-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-[13px] font-medium text-white hover:bg-white/[0.08] inline-flex items-center justify-center gap-1.5 touch-manipulation disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete selected ({selectedIds.size})
                </button>
              </>
            )}
          </>
        )}

        {activeTab === 'campaigns' && (
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
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-2 text-[14px] text-white">
                  <Upload className="h-4 w-4 text-elec-yellow" />
                  Import college contacts
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-4">
                  <Eyebrow>Ingest rules</Eyebrow>
                  <p className="mt-2 text-[12px] text-white leading-relaxed">
                    Imported contacts are auto-tagged with{' '}
                    <code className="bg-black/40 px-1 py-0.5 rounded text-white">education_pool</code>{' '}
                    and{' '}
                    <code className="bg-black/40 px-1 py-0.5 rounded text-white">source:csv_import</code>,
                    so they show up here alongside scraped leads. contact_type defaults to{' '}
                    <code className="bg-black/40 px-1 py-0.5 rounded text-white">college</code> to
                    match the ingest pipeline.
                  </p>
                </div>

                <div className="space-y-2">
                  <Eyebrow>Paste CSV</Eyebrow>
                  <p className="text-[12px] text-white leading-relaxed">
                    Header row optional. Accepts columns: <code>email</code>, <code>name</code>,{' '}
                    <code>organisation</code> (or college), <code>role</code> (or title),{' '}
                    <code>tags</code> (semicolon-separated). If no header, first column assumed to be
                    email.
                  </p>
                  <Textarea
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    placeholder={`email,name,organisation,role
s.tutor@cityoflondon.ac.uk,Sam Tutor,City of London College,Electrical Tutor
apprenticeships@leeds.ac.uk,Jane Smith,Leeds City College,Apprenticeship Coordinator`}
                    className="touch-manipulation text-[13px] font-mono min-h-[240px] bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow/60 focus:ring-0"
                  />
                  <p className="text-[11px] text-white">
                    {csvText.split(/\r?\n/).filter((l) => l.trim()).length} lines pasted
                  </p>
                </div>

                <button
                  onClick={() => importMutation.mutate()}
                  disabled={!csvText.trim() || importMutation.isPending}
                  className="w-full h-12 rounded-full bg-elec-yellow text-black text-[14px] font-semibold inline-flex items-center justify-center gap-2 touch-manipulation disabled:opacity-40 disabled:cursor-not-allowed hover:bg-elec-yellow/90 transition-colors"
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

        <AlertDialog
          open={!!confirmSend}
          onOpenChange={(open) => !open && setConfirmSend(null)}
        >
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6 bg-[hsl(0_0%_10%)] border border-white/[0.06]">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight text-white">
                Send college pitch to {confirmSend?.count} contacts?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="text-sm leading-relaxed space-y-2">
                  <p className="text-white">
                    Uses Resend's batch API — {BATCH_SIZE} emails per call with a{' '}
                    {INTER_BATCH_GAP_MS}ms gap between calls (under Resend's 2 req/sec rate limit).
                    Suppressed contacts are skipped automatically.
                  </p>
                  <p className="text-white text-xs">
                    Recipients get an unsubscribe link. One-click unsubscribes added to your
                    suppression list.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-2">
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0 rounded-full bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const ids = confirmSend?.ids || [];
                  setConfirmSend(null);
                  createAndRunCampaign(ids);
                }}
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold w-full sm:w-auto rounded-full"
              >
                <Send className="h-4 w-4 mr-2" />
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

  return (
    <div className="px-4 sm:px-5 py-4 space-y-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-medium text-white truncate">{campaign.name}</div>
          <div className="mt-0.5 text-[11.5px] text-white">
            {formatDistanceToNow(parseISO(campaign.created_at), { addSuffix: true })}
          </div>
        </div>
        <Pill tone={tone}>{campaign.status}</Pill>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-white tabular-nums">
        <Pill tone="blue">
          {campaign.sent_count}/{campaign.total_recipients} sent
        </Pill>
        {campaign.open_count > 0 && <Pill tone="emerald">{campaign.open_count} open</Pill>}
        {campaign.click_count > 0 && <Pill tone="purple">{campaign.click_count} click</Pill>}
        {campaign.failed_count > 0 && <Pill tone="red">{campaign.failed_count} failed</Pill>}
      </div>
      {campaign.total_recipients > 0 && campaign.status !== 'completed' && (
        <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
