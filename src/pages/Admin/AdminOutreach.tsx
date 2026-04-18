import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
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
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  GraduationCap,
  Send,
  Users,
  Mail,
  Loader2,
  TestTube,
  MailOpen,
  MousePointerClick,
  MailCheck,
  Upload,
  BookOpen,
  Zap,
  ShieldCheck,
  Factory,
  Wrench,
  FileText,
  Ban,
  Trash2,
} from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

// ─── Types ──────────────────────────────────────────────────
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

// The education scraper (outreach-ingest-leads) promotes education_leads rows
// into outreach_contacts with tags ['education_pool', 'source:<x>', country,
// region, organisation_type]. contact_type is 'college' / 'training_provider' /
// 'trade_body'. We segment by SOURCE tag instead of contact_type.
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

// Ordered so the AUDIENCE pools (Apollo sources) appear first — these are the
// semantic sub-pools: Colleges / Tutors / Assessors / Training / Coords
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

const SOURCE_ICON: Record<Exclude<SourceKey, 'all'>, typeof GraduationCap> = {
  apollo_college_heads: GraduationCap,
  apollo_electrical_tutors: BookOpen,
  apollo_assessors: ShieldCheck,
  apollo_apprenticeship_coords: Users,
  apollo_training_provider_directors: Factory,
  gov_uk_apprenticeships: GraduationCap,
  roatp: BookOpen,
  niceic_training: Zap,
  college_staff_page: Users,
  ofsted_register: ShieldCheck,
  colleges_scotland: Factory,
  manual: Wrench,
  csv_import: FileText,
};

// Resend batch.send() accepts up to 100 emails per API call. Client loop adds
// a 500ms gap between calls to stay comfortably under the 2 req/sec rate limit.
const BATCH_SIZE = 100;
const INTER_BATCH_GAP_MS = 500;
// Master first-touch: College Hub + Electrical Hub + Apprentice Hub deep dive
// (inc. Mental Health, AI portfolio mapping, LTI 1.3 VLE). App Store as CTA.
const COLLEGE_TEMPLATE_SLUG = 'college-apprentice-showcase-v1';

// Extract the source key from a contact's tags (e.g. "source:roatp" → "roatp")
function sourceOf(contact: { tags: string[] | null }): string | null {
  if (!contact.tags) return null;
  const t = contact.tags.find((x) => x.startsWith('source:'));
  return t ? t.slice(7) : null;
}

// ─── Edge function caller ───────────────────────────────────
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

// ─── CSV parser ─────────────────────────────────────────────
// Imported rows get the education_pool tag + source:csv_import so they show up
// on this page alongside the scraped data.
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

// ─── Component ──────────────────────────────────────────────
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

  // Seed templates on first load (idempotent — upserts by slug)
  useEffect(() => {
    callOutreach('seed_templates').catch((err) => {
      console.warn('Template seed failed (non-fatal):', err);
    });
  }, []);

  // ─── Queries ────────────────────────────────────────────
  // Always restrict to the education_pool tag — what the education scraper sets
  // on every promoted lead, plus what CSV imports get tagged with.
  const { data: contactsData, isLoading: contactsLoading, isFetching, refetch } = useQuery({
    queryKey: ['college-outreach-contacts', search],
    queryFn: async () => {
      // limit=15000 covers the entire pool with headroom. Edge function
      // paginates through Supabase's 1000-row PostgREST cap internally.
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

  // ─── Mutations ──────────────────────────────────────────
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

  // ─── Helpers ────────────────────────────────────────────
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

      // Same pattern as business admin: when the user selected the whole
      // visible segment, send the TAG filter instead of 1.9k contact_ids.
      // Server resolves with one indexed query, skips chunked .in() calls.
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

  // ─── Derived ────────────────────────────────────────────
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

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-4 pb-24">
        <AdminPageHeader
          title="College Outreach"
          subtitle="UK colleges, tutors, training providers — one pitch, your list"
          icon={GraduationCap}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10 border-amber-500/20"
          accentColor="from-amber-500 via-yellow-400 to-amber-500"
          onRefresh={() => refetch()}
          isRefreshing={isFetching}
        />

        {/* Hero */}
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5 overflow-hidden">
          <CardContent className="pt-4 pb-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Badge className="bg-amber-500 text-black text-[10px] px-2 border-0 shrink-0 font-bold">
                  V1
                </Badge>
                <p className="text-sm font-semibold text-white truncate">
                  UK Colleges &mdash; Cold Pitch
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setImportOpen(true)}
                className="h-9 gap-1.5 text-amber-400 hover:text-amber-300 shrink-0 touch-manipulation"
              >
                <Upload className="h-3.5 w-3.5" />
                Import
              </Button>
            </div>
            <p className="text-[11px] text-white/70 leading-relaxed">
              Targets UK FE colleges, sixth forms, training providers, apprenticeship coordinators
              and electrical tutors. Pulls from Apprenticeships.gov, ROATP, Ofsted, NICEIC and
              college staff pages.
            </p>
          </CardContent>
        </Card>

        {/* Test send */}
        <Card className="border-yellow-500/20 bg-yellow-500/[0.03]">
          <CardContent className="pt-4 pb-4 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-yellow-500/15 flex items-center justify-center">
                <TestTube className="h-3.5 w-3.5 text-yellow-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">
                  Send yourself a test
                </p>
                <p className="text-[11px] text-white/60 leading-tight mt-0.5">
                  Preview the college pitch. Subject prefixed [TEST]. Nobody marked sent.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-11 text-base touch-manipulation flex-1 border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
              <Button
                onClick={sendTest}
                disabled={!testEmail}
                className="h-11 px-4 touch-manipulation bg-yellow-500 hover:bg-yellow-600 text-black font-semibold gap-1.5"
              >
                <Send className="h-4 w-4" />
                Test
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance */}
        <div className="grid grid-cols-4 gap-2">
          <StatTile
            label="Contacts"
            value={totalSendable}
            sub={contactStats ? `${contactStats.suppressed} suppressed` : null}
            colorClass="text-amber-400 bg-amber-500/10 border-amber-500/20"
          />
          <StatTile
            label="Sent"
            value={stats?.totalSent || 0}
            sub={null}
            colorClass="text-blue-400 bg-blue-500/10 border-blue-500/20"
          />
          <StatTile
            label="Opened"
            value={stats?.totalOpened || 0}
            sub={stats?.openRate ? `${stats.openRate}%` : null}
            colorClass="text-green-400 bg-green-500/10 border-green-500/20"
          />
          <StatTile
            label="Clicked"
            value={stats?.totalClicked || 0}
            sub={stats?.clickRate ? `${stats.clickRate}%` : null}
            colorClass="text-violet-400 bg-violet-500/10 border-violet-500/20"
          />
        </div>

        {/* Batch progress */}
        {batchProgress.running && (
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="pt-4 pb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-amber-400 font-semibold">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending {batchProgress.campaignName}
                </span>
                <span className="text-white">
                  {batchProgress.sent}/{batchProgress.sent + batchProgress.remaining}
                </span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{
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
                <p className="text-xs text-red-400">{batchProgress.failed} failed</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-xl border border-border">
          <Button
            variant={activeTab === 'contacts' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 h-10 touch-manipulation text-sm gap-1.5 ${activeTab === 'contacts' ? 'bg-amber-500 text-black hover:bg-amber-600' : ''}`}
          >
            <Users className="h-3.5 w-3.5" />
            Contacts ({totalSendable})
          </Button>
          <Button
            variant={activeTab === 'campaigns' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('campaigns')}
            className={`flex-1 h-10 touch-manipulation text-sm gap-1.5 ${activeTab === 'campaigns' ? 'bg-blue-500 text-black hover:bg-blue-600' : ''}`}
          >
            <Mail className="h-3.5 w-3.5" />
            Campaigns ({campaigns?.length || 0})
          </Button>
        </div>

        {/* Contacts tab */}
        {activeTab === 'contacts' && (
          <Card>
            <CardContent className="pt-4 pb-4 px-3 sm:px-4 space-y-3">
              {/* Source pills — filter the education_pool by scraper source */}
              <div
                className="flex gap-1.5 overflow-x-auto -mx-1 px-1"
                style={{ scrollbarWidth: 'none' }}
              >
                <TypePill
                  active={activeSource === 'all'}
                  onClick={() => {
                    setActiveSource('all');
                    setSelectedIds(new Set());
                  }}
                  label="All"
                  count={totalSendable}
                  colorClass="bg-amber-500 text-black"
                />
                {SOURCES.filter((s) => (sourceCounts[s] || 0) > 0 || activeSource === s).map(
                  (s) => (
                    <TypePill
                      key={s}
                      active={activeSource === s}
                      onClick={() => {
                        setActiveSource(s);
                        setSelectedIds(new Set());
                      }}
                      label={SOURCE_LABEL[s]}
                      count={sourceCounts[s] || 0}
                      colorClass="bg-amber-500/90 text-white"
                    />
                  )
                )}
              </div>

              <AdminSearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search email or college..."
              />

              {visibleContacts.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <Checkbox
                      checked={
                        sendableIds.length > 0 && selectedIds.size === sendableIds.length
                      }
                      onCheckedChange={toggleAll}
                      disabled={batchProgress.running}
                      className="border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 shrink-0"
                    />
                    <span className="text-sm text-white whitespace-nowrap">
                      {selectedIds.size > 0
                        ? `${selectedIds.size} selected`
                        : `Select all · ${sendableIds.length}`}
                    </span>
                  </div>
                  {selectedIds.size > 0 && !batchProgress.running && (
                    <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => suppressMutation.mutate(Array.from(selectedIds))}
                        disabled={suppressMutation.isPending}
                        className="gap-1.5 h-11 sm:h-10 touch-manipulation border-white/20"
                      >
                        <Ban className="h-3.5 w-3.5" />
                        Suppress
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          setConfirmSend({
                            count: selectedIds.size,
                            ids: Array.from(selectedIds),
                          })
                        }
                        className="gap-2 h-11 sm:h-10 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black"
                      >
                        <Send className="h-4 w-4" />
                        Send {selectedIds.size}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* List */}
              {contactsLoading ? (
                <div className="space-y-2 animate-pulse">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 flex items-center gap-3"
                    >
                      <Skeleton className="w-9 h-9 rounded-lg" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-56" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : visibleContacts.length === 0 ? (
                <AdminEmptyState
                  icon={GraduationCap}
                  title={search ? 'No matches' : 'No contacts yet'}
                  description={
                    search
                      ? 'Nothing matches that search.'
                      : 'Import a CSV or wait for the scraper — college_staff_page / ROATP / Ofsted crawls feed this pool.'
                  }
                  action={
                    !search
                      ? { label: 'Import contacts', onClick: () => setImportOpen(true) }
                      : undefined
                  }
                />
              ) : (
                <div className="space-y-1.5">
                  {visibleContacts.map((c) => (
                    <ContactRow
                      key={c.id}
                      contact={c}
                      selected={selectedIds.has(c.id)}
                      onToggle={() => toggleOne(c.id)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Campaigns tab */}
        {activeTab === 'campaigns' && (
          <Card>
            <CardContent className="pt-4 pb-4 px-3 sm:px-4">
              {!campaigns || campaigns.length === 0 ? (
                <AdminEmptyState
                  icon={Mail}
                  title="No campaigns yet"
                  description="Send to some contacts to create your first college outreach campaign."
                />
              ) : (
                <div className="space-y-2">
                  {campaigns.map((c) => (
                    <CampaignRow key={c.id} campaign={c} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Bulk delete */}
        {selectedIds.size > 0 && activeTab === 'contacts' && !batchProgress.running && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm(`Delete ${selectedIds.size} contacts permanently?`)) {
                deleteMutation.mutate(Array.from(selectedIds));
              }
            }}
            disabled={deleteMutation.isPending}
            className="w-full h-10 text-xs touch-manipulation gap-1.5 text-red-400 border-red-500/20 hover:bg-red-500/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete selected ({selectedIds.size})
          </Button>
        )}

        {/* Import sheet */}
        <Sheet open={importOpen} onOpenChange={setImportOpen}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
              <SheetHeader className="px-4 pb-3 border-b border-border">
                <SheetTitle className="flex items-center gap-2 text-sm">
                  <Upload className="h-4 w-4 text-amber-400" />
                  Import College Contacts
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
                  <p className="text-[11px] text-amber-300 leading-relaxed">
                    Imported contacts are auto-tagged with{' '}
                    <code className="bg-black/30 px-1 py-0.5 rounded">education_pool</code> and{' '}
                    <code className="bg-black/30 px-1 py-0.5 rounded">source:csv_import</code>, so
                    they show up here alongside scraped leads. contact_type defaults to{' '}
                    <code className="bg-black/30 px-1 py-0.5 rounded">college</code> to match the
                    ingest pipeline.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/80">
                    Paste CSV (email, name, organisation, role, tags)
                  </label>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    Header row optional. Accepts columns: <code>email</code>, <code>name</code>,{' '}
                    <code>organisation</code> (or college), <code>role</code> (or title),{' '}
                    <code>tags</code> (semicolon-separated — added on top of education_pool). If
                    no header, first column assumed to be email.
                  </p>
                  <Textarea
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    placeholder={`email,name,organisation,role
s.tutor@cityoflondon.ac.uk,Sam Tutor,City of London College,Electrical Tutor
apprenticeships@leeds.ac.uk,Jane Smith,Leeds City College,Apprenticeship Coordinator`}
                    className="touch-manipulation text-[13px] font-mono min-h-[240px] focus:ring-2 focus:ring-amber-500/20 border-white/30 focus:border-amber-500"
                  />
                  <p className="text-[11px] text-white/50">
                    {csvText.split(/\r?\n/).filter((l) => l.trim()).length} lines pasted
                  </p>
                </div>

                <Button
                  onClick={() => importMutation.mutate()}
                  disabled={!csvText.trim() || importMutation.isPending}
                  className="w-full h-12 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold gap-2"
                >
                  {importMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Import contacts
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Confirm send */}
        <AlertDialog
          open={!!confirmSend}
          onOpenChange={(open) => !open && setConfirmSend(null)}
        >
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Send college pitch to {confirmSend?.count} contacts?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="text-sm leading-relaxed space-y-2">
                  <p className="text-white">
                    Uses Resend's batch API — {BATCH_SIZE} emails per call with a{' '}
                    {INTER_BATCH_GAP_MS}ms gap between calls (under Resend's 2 req/sec rate limit).
                    Suppressed contacts are skipped automatically.
                  </p>
                  <p className="text-white/70 text-xs">
                    Recipients get an unsubscribe link. One-click unsubscribes added to your
                    suppression list.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-2">
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const ids = confirmSend?.ids || [];
                  setConfirmSend(null);
                  createAndRunCampaign(ids);
                }}
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-amber-500 hover:bg-amber-600 text-black font-semibold w-full sm:w-auto"
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PullToRefresh>
  );
}

// ─── Sub-components ─────────────────────────────────────────
function StatTile({
  label,
  value,
  sub,
  colorClass,
}: {
  label: string;
  value: number;
  sub: string | null;
  colorClass: string;
}) {
  return (
    <div className={`p-2.5 rounded-xl border text-center ${colorClass}`}>
      <p className="text-lg font-bold leading-tight">{value}</p>
      <p className="text-[10px] text-white mt-0.5">{label}</p>
      {sub && <p className="text-[9px] opacity-70 mt-0.5">{sub}</p>}
    </div>
  );
}

function TypePill({
  active,
  onClick,
  label,
  count,
  colorClass,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  colorClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 h-9 px-3 rounded-full text-xs font-semibold touch-manipulation transition-all ${active ? colorClass : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
    >
      {label} &middot; {count}
    </button>
  );
}

function ContactRow({
  contact,
  selected,
  onToggle,
}: {
  contact: CollegeContact;
  selected: boolean;
  onToggle: () => void;
}) {
  const src = sourceOf(contact);
  const TypeIcon =
    src && (SOURCES as readonly string[]).includes(src)
      ? SOURCE_ICON[src as Exclude<SourceKey, 'all'>]
      : GraduationCap;
  const srcLabel =
    src && (SOURCES as readonly string[]).includes(src)
      ? SOURCE_LABEL[src as Exclude<SourceKey, 'all'>]
      : null;

  return (
    <div
      className={`flex items-center gap-3 p-2.5 rounded-xl bg-muted/50 touch-manipulation active:scale-[0.99] transition-transform ${contact.is_suppressed ? 'opacity-60' : ''}`}
    >
      <Checkbox
        checked={selected}
        onCheckedChange={onToggle}
        disabled={contact.is_suppressed}
        className="border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
      />
      <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
        <TypeIcon className="h-4 w-4 text-amber-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="font-medium text-sm text-white truncate">
            {contact.name || contact.email}
          </p>
          {contact.is_suppressed && (
            <Badge className="bg-red-500/20 text-red-400 text-[9px] px-1.5 border-0 shrink-0">
              Suppressed
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/70 min-w-0">
          <span className="truncate flex-1 min-w-0">
            {contact.organisation || contact.email}
          </span>
          {srcLabel && (
            <Badge className="bg-amber-500/10 text-amber-400 text-[9px] px-1.5 border-0 shrink-0">
              {srcLabel}
            </Badge>
          )}
        </div>
        {contact.role && (
          <p className="text-[11px] text-white/50 truncate mt-0.5">{contact.role}</p>
        )}
      </div>
      {(contact.total_opens > 0 || contact.total_clicks > 0) && (
        <div className="flex items-center gap-1 shrink-0">
          {contact.total_opens > 0 && (
            <Badge className="bg-green-500/20 text-green-400 text-[9px] px-1 border-0 gap-1">
              <MailOpen className="h-2.5 w-2.5" />
              {contact.total_opens}
            </Badge>
          )}
          {contact.total_clicks > 0 && (
            <Badge className="bg-violet-500/20 text-violet-400 text-[9px] px-1 border-0 gap-1">
              <MousePointerClick className="h-2.5 w-2.5" />
              {contact.total_clicks}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

function CampaignRow({ campaign }: { campaign: CollegeCampaign }) {
  const progress =
    campaign.total_recipients > 0
      ? Math.round((campaign.sent_count / campaign.total_recipients) * 100)
      : 0;
  const statusColor =
    campaign.status === 'completed'
      ? 'bg-green-500/20 text-green-400'
      : campaign.status === 'sending'
        ? 'bg-blue-500/20 text-blue-400'
        : campaign.status === 'paused'
          ? 'bg-amber-500/20 text-amber-400'
          : 'bg-slate-500/20 text-slate-400';

  return (
    <div className="rounded-xl bg-muted/50 p-3 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm text-white truncate">{campaign.name}</p>
          <p className="text-[11px] text-white/60">
            {formatDistanceToNow(parseISO(campaign.created_at), { addSuffix: true })}
          </p>
        </div>
        <Badge className={`text-[10px] border-0 shrink-0 ${statusColor}`}>
          {campaign.status}
        </Badge>
      </div>
      <div className="flex items-center gap-3 text-[11px] text-white/70">
        <span className="flex items-center gap-1">
          <MailCheck className="h-3 w-3 text-blue-400" />
          {campaign.sent_count}/{campaign.total_recipients}
        </span>
        <span className="flex items-center gap-1">
          <MailOpen className="h-3 w-3 text-green-400" />
          {campaign.open_count}
        </span>
        <span className="flex items-center gap-1">
          <MousePointerClick className="h-3 w-3 text-violet-400" />
          {campaign.click_count}
        </span>
        {campaign.failed_count > 0 && (
          <span className="text-red-400">{campaign.failed_count} failed</span>
        )}
      </div>
      {campaign.total_recipients > 0 && campaign.status !== 'completed' && (
        <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
