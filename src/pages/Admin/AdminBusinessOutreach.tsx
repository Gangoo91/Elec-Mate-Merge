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
  StatStrip,
  FilterBar,
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
  Divider,
  SectionHeader,
} from '@/components/admin/editorial';
import { RefreshCw, Send, Upload, Loader2, TestTube, Ban, Trash2 } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

interface BusinessContact {
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

const POOL_TAG = 'business_pool';

type SourceKey =
  | 'all'
  | 'directors'
  | 'electricians'
  | 'electrical_engineers'
  | 'supervisors'
  | 'field_maintenance'
  | 'estimators'
  | 'building_services'
  | 'accredited'
  | 'geo_drill'
  | 'hunter_ltds'
  | 'google_places'
  | 'companies_house'
  | 'csv_import'
  | 'manual';

const SOURCES: Exclude<SourceKey, 'all'>[] = [
  'directors',
  'electricians',
  'electrical_engineers',
  'supervisors',
  'field_maintenance',
  'estimators',
  'building_services',
  'accredited',
  'geo_drill',
  'hunter_ltds',
  'google_places',
  'companies_house',
  'csv_import',
  'manual',
];

const SOURCE_LABEL: Record<Exclude<SourceKey, 'all'>, string> = {
  directors: 'Directors',
  electricians: 'Electricians',
  electrical_engineers: 'Elec Engineers',
  supervisors: 'Supervisors',
  field_maintenance: 'Field / Maintenance',
  estimators: 'Estimators',
  building_services: 'Building Services',
  accredited: 'NICEIC / NAPIT',
  geo_drill: 'Geo Drill',
  hunter_ltds: 'Hunter Ltds',
  google_places: 'Google Places',
  companies_house: 'Companies House',
  csv_import: 'CSV',
  manual: 'Manual',
};

const SOURCE_TAG_MAP: Record<Exclude<SourceKey, 'all'>, string> = {
  directors: 'apollo',
  electricians: 'apollo_electricians',
  electrical_engineers: 'apollo_electrical_engineers',
  supervisors: 'apollo_supervisors',
  field_maintenance: 'apollo_field_maintenance',
  estimators: 'apollo_estimators_contracts',
  building_services: 'apollo_building_services',
  accredited: 'apollo_electricians_accredited',
  geo_drill: 'apollo_geo',
  hunter_ltds: 'hunter_enrichment',
  google_places: 'google_places',
  companies_house: 'companies_house_web',
  csv_import: 'csv_import',
  manual: 'admin_csv_paste',
};

const TAG_TO_SOURCE_KEY: Record<string, Exclude<SourceKey, 'all'>> = Object.fromEntries(
  (Object.entries(SOURCE_TAG_MAP) as [Exclude<SourceKey, 'all'>, string][]).map(
    ([k, v]) => [v, k]
  )
) as Record<string, Exclude<SourceKey, 'all'>>;

const SEGMENT_TEMPLATE_MAP: Record<SourceKey, string> = {
  all: 'business-master-intro-v1',
  directors: 'business-intro-directors-v1',
  electricians: 'business-intro-electricians-v1',
  electrical_engineers: 'business-intro-electrical-engineers-v1',
  supervisors: 'business-intro-supervisors-v1',
  field_maintenance: 'business-intro-field-maintenance-v1',
  estimators: 'business-intro-estimators-v1',
  building_services: 'business-intro-building-services-v1',
  accredited: 'business-intro-accredited-v1',
  geo_drill: 'business-intro-directors-v1',
  hunter_ltds: 'business-intro-directors-v1',
  google_places: 'business-intro-electricians-v1',
  companies_house: 'business-intro-directors-v1',
  csv_import: 'business-intro-directors-v1',
  manual: 'business-intro-directors-v1',
};

const BATCH_SIZE = 100;
const INTER_BATCH_GAP_MS = 500;

function sourceOf(contact: { tags: string[] | null }): Exclude<SourceKey, 'all'> | null {
  if (!contact.tags) return null;
  for (const t of contact.tags) {
    if (!t.startsWith('source:')) continue;
    const v = t.slice(7);
    if (v in TAG_TO_SOURCE_KEY) return TAG_TO_SOURCE_KEY[v];
  }
  return null;
}

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
        contact_type: 'employer',
        tags: Array.from(new Set([POOL_TAG, 'source:csv_import', ...extraTags])),
        source: 'admin_csv_paste',
      };
    })
    .filter(<T,>(x: T | null): x is T => x !== null);
}

export default function AdminBusinessOutreach() {
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
    queryKey: ['business-outreach-contacts', search],
    queryFn: async () => {
      const filter: Record<string, unknown> = { limit: 15000, tag: POOL_TAG };
      if (search) filter.search = search;
      return await callOutreach<{ contacts: BusinessContact[]; total: number }>(
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
    queryKey: ['business-outreach-stats'],
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
        byType?: Record<string, number>;
      }>('get_stats'),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });

  const { data: contactStats } = useQuery({
    queryKey: ['business-outreach-contact-stats'],
    queryFn: async () =>
      callOutreach<{ total: number; active: number; suppressed: number; byType: Record<string, number> }>(
        'get_contact_stats'
      ),
    staleTime: 30 * 1000,
  });

  const { data: campaigns } = useQuery({
    queryKey: ['business-outreach-campaigns'],
    queryFn: async () => {
      const res = await callOutreach<{ campaigns: BusinessCampaign[] }>('get_campaigns');
      return res.campaigns.filter((c) => c.name.startsWith('Business —'));
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
      queryClient.invalidateQueries({ queryKey: ['business-outreach-contacts'] });
      queryClient.invalidateQueries({ queryKey: ['business-outreach-contact-stats'] });
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
      queryClient.invalidateQueries({ queryKey: ['business-outreach-contact-stats'] });
    },
    onError: (err) => toast({ title: `Delete failed: ${err.message}`, variant: 'destructive' }),
  });

  async function ensureTemplate(slug: string): Promise<{
    subject: string;
    html_body: string;
    preheader: string | null;
  }> {
    const res = await callOutreach<{
      templates: Array<{ slug: string; subject: string; html_body: string; preheader: string | null }>;
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

  async function createAndRunCampaign(ids: string[]) {
    if (ids.length === 0) return;
    try {
      setBatchProgress({ running: true, sent: 0, remaining: ids.length, failed: 0, campaignName: '' });
      const slug = SEGMENT_TEMPLATE_MAP[activeSource];
      const tpl = await ensureTemplate(slug);

      const segmentLabel =
        activeSource === 'all' ? 'All' : SOURCE_LABEL[activeSource];
      const name = `Business — ${segmentLabel} — ${new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })} (${ids.length})`;

      const allSelected = ids.length === sendableIds.length && ids.length > 200;
      const segmentFilter: Record<string, unknown> = allSelected
        ? {
            tags:
              activeSource === 'all'
                ? [POOL_TAG]
                : [POOL_TAG, `source:${SOURCE_TAG_MAP[activeSource]}`],
          }
        : { contact_ids: ids };

      const { campaign } = await callOutreach<{ campaign: { id: string } }>('create_campaign', {
        name,
        subject: tpl.subject,
        html_body: tpl.html_body,
        preheader: tpl.preheader,
        template_slug: slug,
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
      queryClient.invalidateQueries({ queryKey: ['business-outreach-stats'] });
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
      const slug = SEGMENT_TEMPLATE_MAP[activeSource];
      const segmentLabel = activeSource === 'all' ? 'All' : SOURCE_LABEL[activeSource];
      const tpl = await ensureTemplate(slug);
      const { campaign } = await callOutreach<{ campaign: { id: string } }>('create_campaign', {
        name: `Business — TEST — ${segmentLabel} ${Date.now()}`,
        subject: tpl.subject,
        html_body: tpl.html_body,
        preheader: tpl.preheader,
        template_slug: slug,
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

  const filterTabs = useMemo(() => {
    const tabs: { value: string; label: string; count?: number }[] = [
      { value: 'all', label: 'All', count: totalSendable },
    ];
    for (const s of SOURCES) {
      const count = sourceCounts[s] || 0;
      if (count > 0 || activeSource === s) {
        tabs.push({ value: s, label: SOURCE_LABEL[s], count });
      }
    }
    return tabs;
  }, [sourceCounts, totalSendable, activeSource]);

  const activeTemplateSlug = SEGMENT_TEMPLATE_MAP[activeSource];
  const activeTemplateLabel =
    activeSource === 'all'
      ? 'Business Master — 7-day free trial + App Store CTA (all 12k)'
      : `${activeTemplateSlug
          .replace('business-intro-', '')
          .replace('-v1', '')
          .replace(/-/g, ' ')
          .replace(/^./, (c) => c.toUpperCase())} — cold intro`;

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
              <IconButton
                onClick={() => setImportOpen(true)}
                aria-label="Import contacts"
              >
                <Upload className="h-4 w-4" />
              </IconButton>
              <IconButton
                onClick={() => refetch()}
                disabled={isFetching}
                aria-label="Refresh"
              >
                <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              </IconButton>
            </>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Companies',
              value: totalSendable,
              sub: contactStats ? `${contactStats.suppressed} suppressed` : undefined,
            },
            {
              label: 'Enriched',
              value: stats?.totalSent || 0,
              tone: 'emerald',
            },
            {
              label: 'Contacted',
              value: stats?.totalOpened || 0,
              tone: 'purple',
              sub: stats?.openRate ? `${stats.openRate}% open` : undefined,
            },
            {
              label: 'Signed up',
              value: stats?.totalClicked || 0,
              accent: true,
              sub: stats?.clickRate ? `${stats.clickRate}% CTR` : undefined,
            },
          ]}
        />

        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
          <div className="flex items-center gap-3">
            <TestTube className="h-4 w-4 text-elec-yellow shrink-0" />
            <div className="min-w-0 flex-1">
              <Eyebrow>Test send</Eyebrow>
              <div className="mt-1 text-[13px] text-white">
                Preview this segment's template. Subject prefixed [TEST]. Nobody marked sent.
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="your@email.com"
              className="h-11 text-base touch-manipulation flex-1 bg-[hsl(0_0%_10%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow/60 focus:ring-0"
            />
            <button
              onClick={sendTest}
              disabled={!testEmail}
              className="h-11 px-5 rounded-full bg-elec-yellow text-black text-[13px] font-semibold gap-2 inline-flex items-center justify-center touch-manipulation disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              Send test
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-2">
            <Pill tone={activeSource === 'all' ? 'yellow' : 'purple'}>
              {activeSource === 'all' ? 'Master template' : 'Segment template'}
            </Pill>
            <span className="text-[12px] text-white truncate">{activeTemplateLabel}</span>
          </div>
        </div>

        {batchProgress.running && (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-purple-500/70 via-violet-400/70 to-indigo-400/70 opacity-70" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Loader2 className="h-4 w-4 animate-spin text-elec-yellow shrink-0" />
                <div className="min-w-0">
                  <Eyebrow>Sending</Eyebrow>
                  <div className="mt-1 text-[13px] text-white truncate">
                    {batchProgress.campaignName}
                  </div>
                </div>
              </div>
              <div className="text-[13px] text-white tabular-nums shrink-0">
                {batchProgress.sent}/{batchProgress.sent + batchProgress.remaining}
              </div>
            </div>
            <div className="mt-3 w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
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
              <div className="mt-2 text-[11px] text-white">
                <Pill tone="red">{batchProgress.failed} failed</Pill>
              </div>
            )}
          </div>
        )}

        <FilterBar
          tabs={[
            { value: 'contacts', label: 'Contacts', count: totalSendable },
            { value: 'campaigns', label: 'Campaigns', count: campaigns?.length || 0 },
          ]}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as 'contacts' | 'campaigns')}
        />

        {activeTab === 'contacts' && (
          <>
            <SectionHeader
              eyebrow="Segment"
              title="Filter by source"
              meta={
                activeSource !== 'all' ? (
                  <Pill tone="purple">{SOURCE_LABEL[activeSource]}</Pill>
                ) : undefined
              }
            />

            <FilterBar
              tabs={filterTabs}
              activeTab={activeSource}
              onTabChange={(v) => {
                setActiveSource(v as SourceKey);
                setSelectedIds(new Set());
              }}
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search email or company…"
              actions={
                <button
                  onClick={() => setImportOpen(true)}
                  className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold inline-flex items-center gap-2 touch-manipulation"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Enrich Batch
                </button>
              }
            />

            {contactsLoading ? (
              <LoadingBlocks />
            ) : visibleContacts.length === 0 ? (
              <EmptyState
                title={search ? 'No matches' : 'No contacts yet'}
                description={
                  search
                    ? 'Nothing matches that search.'
                    : 'Import a CSV to get started — paste rows of email, name, organisation, role.'
                }
                action={!search ? 'Import contacts' : undefined}
                onAction={!search ? () => setImportOpen(true) : undefined}
              />
            ) : (
              <ListCard>
                <ListCardHeader
                  tone="purple"
                  title="Companies"
                  meta={
                    <>
                      <Pill tone="purple">{visibleContacts.length}</Pill>
                      {selectedIds.size > 0 && <Pill tone="yellow">{selectedIds.size} selected</Pill>}
                    </>
                  }
                />
                <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3 border-b border-white/[0.06]">
                  <label className="flex items-center gap-3 touch-manipulation">
                    <Checkbox
                      checked={sendableIds.length > 0 && selectedIds.size === sendableIds.length}
                      onCheckedChange={toggleAll}
                      disabled={batchProgress.running}
                      className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <span className="text-[12px] text-white">
                      {selectedIds.size > 0
                        ? `${selectedIds.size} selected`
                        : `Select all · ${sendableIds.length}`}
                    </span>
                  </label>
                  {selectedIds.size > 0 && !batchProgress.running && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => suppressMutation.mutate(Array.from(selectedIds))}
                        disabled={suppressMutation.isPending}
                        className="h-9 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[12px] font-medium inline-flex items-center gap-1.5 hover:bg-white/[0.08] touch-manipulation disabled:opacity-40"
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
                        className="h-9 px-4 rounded-full bg-elec-yellow text-black text-[12px] font-semibold inline-flex items-center gap-1.5 touch-manipulation"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Send {selectedIds.size}
                      </button>
                    </div>
                  )}
                </div>
                <ListBody>
                  {visibleContacts.map((c) => {
                    const src = sourceOf(c);
                    const srcLabel =
                      src && (SOURCES as readonly string[]).includes(src)
                        ? SOURCE_LABEL[src as Exclude<SourceKey, 'all'>]
                        : null;
                    const displayName = c.name || c.organisation || c.email;
                    const subtitleParts: string[] = [];
                    if (c.organisation && c.name) subtitleParts.push(c.organisation);
                    subtitleParts.push(c.email);
                    if (c.role) subtitleParts.push(c.role);

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
                            <Avatar initials={getInitials(displayName)} />
                          </div>
                        }
                        title={displayName}
                        subtitle={subtitleParts.join(' · ')}
                        trailing={
                          <>
                            {srcLabel && <Pill tone="purple">{srcLabel}</Pill>}
                            {c.is_suppressed && <Pill tone="red">Suppressed</Pill>}
                            {c.total_opens > 0 && (
                              <Pill tone="emerald">{c.total_opens} open</Pill>
                            )}
                            {c.total_clicks > 0 && (
                              <Pill tone="yellow">{c.total_clicks} click</Pill>
                            )}
                          </>
                        }
                        onClick={() => toggleOne(c.id)}
                        className={c.is_suppressed ? 'opacity-60' : ''}
                      />
                    );
                  })}
                </ListBody>
              </ListCard>
            )}

            {selectedIds.size > 0 && !batchProgress.running && (
              <button
                onClick={() => {
                  if (confirm(`Delete ${selectedIds.size} contacts permanently?`)) {
                    deleteMutation.mutate(Array.from(selectedIds));
                  }
                }}
                disabled={deleteMutation.isPending}
                className="w-full h-11 rounded-full bg-[hsl(0_0%_12%)] border border-white/[0.06] text-white text-[12px] font-medium inline-flex items-center justify-center gap-2 hover:bg-[hsl(0_0%_15%)] touch-manipulation disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete selected ({selectedIds.size})
              </button>
            )}
          </>
        )}

        {activeTab === 'campaigns' && (
          <>
            {!campaigns || campaigns.length === 0 ? (
              <EmptyState
                title="No campaigns yet"
                description="Send to some contacts to create your first business outreach campaign."
              />
            ) : (
              <ListCard>
                <ListCardHeader
                  tone="purple"
                  title="Campaigns"
                  meta={<Pill tone="purple">{campaigns.length}</Pill>}
                />
                <ListBody>
                  {campaigns.map((c) => {
                    const progress =
                      c.total_recipients > 0
                        ? Math.round((c.sent_count / c.total_recipients) * 100)
                        : 0;
                    const statusTone =
                      c.status === 'completed'
                        ? 'emerald'
                        : c.status === 'sending'
                          ? 'blue'
                          : c.status === 'paused'
                            ? 'amber'
                            : 'indigo';
                    return (
                      <ListRow
                        key={c.id}
                        title={c.name}
                        subtitle={
                          <span className="flex items-center gap-3 text-[11.5px] text-white tabular-nums">
                            <span>
                              {c.sent_count}/{c.total_recipients} sent
                            </span>
                            <span>·</span>
                            <span>{c.open_count} open</span>
                            <span>·</span>
                            <span>{c.click_count} click</span>
                            {c.failed_count > 0 && (
                              <>
                                <span>·</span>
                                <span>{c.failed_count} failed</span>
                              </>
                            )}
                            <span>·</span>
                            <span>
                              {formatDistanceToNow(parseISO(c.created_at), { addSuffix: true })}
                            </span>
                          </span>
                        }
                        trailing={
                          <>
                            {c.total_recipients > 0 && c.status !== 'completed' && (
                              <span className="text-[11px] text-white tabular-nums">
                                {progress}%
                              </span>
                            )}
                            <Pill tone={statusTone}>{c.status}</Pill>
                          </>
                        }
                      />
                    );
                  })}
                </ListBody>
              </ListCard>
            )}
          </>
        )}

        <Divider label="Enrichment" />

        <StatStrip
          columns={3}
          stats={[
            {
              label: 'Active pool',
              value: contactStats?.active ?? 0,
              tone: 'emerald',
            },
            {
              label: 'Suppressed',
              value: contactStats?.suppressed ?? 0,
              tone: 'red',
            },
            {
              label: 'Total imported',
              value: contactStats?.total ?? 0,
            },
          ]}
        />

        <Sheet open={importOpen} onOpenChange={setImportOpen}>
          <SheetContent
            side="bottom"
            className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_10%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-2 text-[15px] text-white">
                  <Upload className="h-4 w-4 text-elec-yellow" />
                  Import Business Contacts
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4">
                  <Eyebrow>How it works</Eyebrow>
                  <p className="mt-2 text-[12.5px] text-white leading-relaxed">
                    Imported contacts are auto-tagged with{' '}
                    <code className="bg-black/30 px-1 py-0.5 rounded text-white">
                      business_pool
                    </code>{' '}
                    and{' '}
                    <code className="bg-black/30 px-1 py-0.5 rounded text-white">
                      source:csv_import
                    </code>
                    , so they show up here alongside scraped leads. contact_type defaults to{' '}
                    <code className="bg-black/30 px-1 py-0.5 rounded text-white">employer</code>.
                  </p>
                </div>

                <div className="space-y-2">
                  <Eyebrow>Paste CSV</Eyebrow>
                  <p className="text-[12px] text-white leading-relaxed">
                    Header row optional. Columns: <code>email</code>, <code>name</code>,{' '}
                    <code>organisation</code>, <code>role</code>, <code>tags</code>{' '}
                    (semicolon-separated). If no header, first column is email.
                  </p>
                  <Textarea
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    placeholder={`email,name,organisation,role\nmike@balfourbeatty.com,Mike Smith,Balfour Beatty,M&E Director\njane@sellafield.com,Jane Doe,Sellafield Ltd,Head of Electrical`}
                    className="touch-manipulation text-[13px] font-mono min-h-[240px] bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow/60 focus:ring-0"
                  />
                  <p className="text-[11px] text-white">
                    {csvText.split(/\r?\n/).filter((l) => l.trim()).length} lines pasted
                  </p>
                </div>

                <button
                  onClick={() => importMutation.mutate()}
                  disabled={!csvText.trim() || importMutation.isPending}
                  className="w-full h-12 rounded-full bg-elec-yellow text-black text-[14px] font-semibold inline-flex items-center justify-center gap-2 touch-manipulation disabled:opacity-40 disabled:cursor-not-allowed"
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
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6 bg-[hsl(0_0%_10%)] border-white/[0.06]">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight text-white">
                Send business pitch to {confirmSend?.count} contacts?
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
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0 rounded-full bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white hover:bg-[hsl(0_0%_15%)]">
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
