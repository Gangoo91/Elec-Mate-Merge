/**
 * Bulk create accounts.
 *
 * Paste a list, see exactly what will happen before it happens — who is new,
 * who already has an account, what is a duplicate, what is not an email —
 * then create them in one go with a shared temporary password. The result
 * is a list you can copy or download, and the batch is written to the audit
 * log so the last few runs show here.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminUsersBase } from '@/hooks/useAdminUsersBase';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Loader2, RefreshCw, Copy, Check, Download, ChevronRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
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
import { PageFrame } from '@/components/admin/editorial';
import {
  AQUA,
  BLUE,
  YELLOW,
  GOOD,
  SERIOUS,
  DE_EMPHASIS,
  Legend,
  Panel,
  SectionHead,
  StackBar,
  StateDot,
  KpiTile,
} from '@/components/admin/overview/primitives';

interface BulkResult {
  summary: { created: number; skipped: number; failed: number };
  created: string[];
  skipped: { email: string; reason: string }[];
  failed: { email: string; reason: string }[];
}

interface Batch {
  id: string;
  created_at: string;
  new_values: {
    created?: number;
    skipped?: number;
    failed?: number;
    reason?: string;
    college?: string | null;
    grantAccess?: boolean;
  } | null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function genPassword(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `ElecMate${n}!`;
}

const inputCn =
  'input-underline h-11 w-full touch-manipulation rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white caret-elec-yellow placeholder:text-white/25 transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 [color-scheme:dark]';

const when = (iso: string) => {
  const d = new Date(iso);
  return `${d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}, ${d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const shortDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
};
const daysBetween = (iso: string) => Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);

const QUICK_REASONS = ['College cohort', 'Beta tester', 'Demo account', 'Trial — 1 week'];

/*
  Free-access reasons are free text and have drifted over a year of admin
  use ("Lifetime purchase (£300 one-off, 2026-06 campaign) — reason
  backfilled…"). Bucket them so the page can say who has it and why.
*/
function reasonBucket(reason: string | null | undefined): string {
  if (!reason) return 'No reason recorded';
  const r = reason.toLowerCase();
  if (r.includes('lifetime')) return 'Lifetime purchase';
  if (r.startsWith('employer_seat') || r.includes('employer seat')) return 'Employer seat';
  if (r.includes('college') || r.includes('cohort')) return 'College cohort';
  if (r.includes('beta')) return 'Beta tester';
  if (r.includes('trial')) return 'Trial';
  if (r.includes('demo')) return 'Demo account';
  return 'Other';
}

export default function AdminBulkCreate() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const { data: baseUsers } = useAdminUsersBase();
  const [raw, setRaw] = useState('');
  const [password, setPassword] = useState(genPassword());
  const [grantAccess, setGrantAccess] = useState(true);
  const [reason, setReason] = useState('College cohort');
  const [collegeId, setCollegeId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<BulkResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Colleges the batch can be attached to, with how many accounts each already holds.
  // Any authenticated user may read profiles, so the count is a plain select.
  const { data: colleges } = useQuery({
    queryKey: ['admin-colleges-with-counts'],
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      const [{ data: rows, error }, { data: members }] = await Promise.all([
        supabase.from('colleges').select('id, name, code').eq('is_active', true).order('name'),
        supabase.from('profiles').select('college_id').not('college_id', 'is', null),
      ]);
      if (error) return [] as Array<{ id: string; name: string; code: string | null; students: number }>;
      const counts = new Map<string, number>();
      for (const m of (members ?? []) as Array<{ college_id: string | null }>) {
        if (m.college_id) counts.set(m.college_id, (counts.get(m.college_id) ?? 0) + 1);
      }
      return ((rows ?? []) as Array<{ id: string; name: string; code: string | null }>).map((c) => ({
        ...c,
        students: counts.get(c.id) ?? 0,
      }));
    },
  });

  const { data: batches } = useQuery<Batch[]>({
    queryKey: ['admin-bulk-create-batches'],
    staleTime: 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_audit_logs')
        .select('id, created_at, new_values')
        .eq('action', 'bulk_create_users')
        .order('created_at', { ascending: false })
        .limit(6);
      if (error) return [];
      return (data ?? []) as unknown as Batch[];
    },
  });

  const existingEmails = useMemo(() => {
    const set = new Set<string>();
    for (const u of baseUsers ?? []) if (u.email) set.add(u.email.toLowerCase());
    return set;
  }, [baseUsers]);

  /*
    The state of free access across every account. This is what a bulk grant
    adds to, so it belongs on the page: how many hold it, how many are about
    to lose it, and how many are still flagged after their end date.
  */
  const freeAccess = useMemo(() => {
    const all = (baseUsers ?? []).filter((u) => u.free_access_granted);
    const noExpiry = all.filter((u) => !u.free_access_expires_at);
    const dated = all.filter((u) => u.free_access_expires_at);
    const expired = dated.filter((u) => daysBetween(u.free_access_expires_at!) < 0);
    const expiring = dated.filter((u) => {
      const d = daysBetween(u.free_access_expires_at!);
      return d >= 0 && d <= 30;
    });
    const running = dated.length - expired.length - expiring.length;
    const watch = [
      ...expiring.sort(
        (a, b) => daysBetween(a.free_access_expires_at!) - daysBetween(b.free_access_expires_at!)
      ),
      ...expired.sort(
        (a, b) => daysBetween(b.free_access_expires_at!) - daysBetween(a.free_access_expires_at!)
      ),
    ].slice(0, 6);
    const buckets = new Map<string, number>();
    for (const u of all) {
      const k = reasonBucket(u.free_access_reason);
      buckets.set(k, (buckets.get(k) ?? 0) + 1);
    }
    const reasons = [...buckets.entries()].sort((a, b) => b[1] - a[1]);
    const onboarded = all.filter((u) => u.onboarding_completed).length;
    return { all, noExpiry, running, expiring, expired, watch, reasons, onboarded };
  }, [baseUsers]);

  /*
    Live parse. Split on comma, newline, semicolon or whitespace; sort every
    token into new / already has an account / duplicate / not an email, so the
    admin sees the outcome before pressing the button, not after.
  */
  const parsed = useMemo(() => {
    const tokens = raw
      .split(/[\s,;]+/)
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    const valid: string[] = [];
    const existing: string[] = [];
    const invalid: string[] = [];
    const seen = new Set<string>();
    let dupes = 0;
    for (const t of tokens) {
      if (!EMAIL_RE.test(t)) {
        invalid.push(t);
        continue;
      }
      if (seen.has(t)) {
        dupes += 1;
        continue;
      }
      seen.add(t);
      if (existingEmails.has(t)) existing.push(t);
      else valid.push(t);
    }
    return { valid, existing, invalid, dupes, total: tokens.length };
  }, [raw, existingEmails]);

  const selectedCollege = colleges?.find((c) => c.id === collegeId) ?? null;

  const handleCreate = async () => {
    if (parsed.valid.length === 0) {
      toast({ title: 'Nothing to create', variant: 'destructive' });
      return;
    }
    if (password.length < 8) {
      toast({ title: 'Password must be 8 or more characters', variant: 'destructive' });
      return;
    }
    setIsCreating(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('admin-bulk-create-users', {
        body: {
          emails: parsed.valid,
          password,
          grantAccess,
          freeAccessReason: reason,
          collegeId: collegeId || undefined,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.message || data.error);
      const res = data as BulkResult;
      setResult(res);
      // The batch is a fact worth keeping: what ran, when, with what outcome.
      if (profile?.id) {
        await supabase.from('admin_audit_logs').insert({
          user_id: profile.id,
          action: 'bulk_create_users',
          entity_type: 'profile',
          entity_id: profile.id,
          new_values: {
            ...res.summary,
            reason: grantAccess ? reason : null,
            grantAccess,
            college: selectedCollege?.name ?? null,
          },
        } as never);
        queryClient.invalidateQueries({ queryKey: ['admin-bulk-create-batches'] });
      }
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      toast({
        title: `${res.summary.created} created`,
        description: `${res.summary.skipped} skipped · ${res.summary.failed} failed`,
        variant: res.summary.failed > 0 ? 'destructive' : 'success',
      });
    } catch (e) {
      toast({
        title: 'Create failed',
        description: e instanceof Error ? e.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const copyCredentials = async () => {
    if (!result) return;
    const lines = result.created.map((email) => `${email}  —  ${password}`).join('\n');
    await navigator.clipboard.writeText(
      `Login: app.elec-mate.com\n\n${lines}\n\n(Change your password in Settings → Security after first login.)`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
    toast({ title: 'Logins copied', variant: 'success' });
  };

  const downloadCredentials = () => {
    if (!result) return;
    const rows = [
      'email,password,login_url',
      ...result.created.map((email) => `${email},${password},app.elec-mate.com`),
    ].join('\n');
    const blob = new Blob([rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elec-mate-logins-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Logins downloaded', variant: 'success' });
  };

  const n = parsed.valid.length;
  const ready = n > 0 && password.length >= 8 && !isCreating;

  return (
    <PageFrame className="space-y-5 sm:space-y-6">
      {/* Title row */}
      <div className="min-w-0">
        <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-white lg:text-[26px] lg:leading-[30px]">
          Bulk create accounts
        </h1>
        <div className="mt-0.5 text-[12px] text-white">
          A college cohort, a team, anyone. One temporary password for the batch; they change it
          at Settings → Security on first login.
        </div>
      </div>

      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        {/* Who */}
        <Panel tone="accent">
          <SectionHead
            title="Who"
            meta={parsed.total > 0 ? `${parsed.total} ${parsed.total === 1 ? 'address' : 'addresses'} pasted` : 'paste a list, any separators'}
            className="min-h-0"
          />
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={
              'jordan@example.com\nsam@example.com, alex@example.com\n…paste a whole list, any separators'
            }
            spellCheck={false}
            className="input-underline mt-3 min-h-[200px] w-full touch-manipulation resize-y rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 font-mono text-[14px] leading-6 text-white caret-elec-yellow placeholder:text-white/25 transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 lg:min-h-[280px]"
          />

          <div className="mt-4">
            <StackBar
              segments={[
                { value: n, color: GOOD, label: 'Will be created' },
                { value: parsed.existing.length, color: BLUE, label: 'Already have an account' },
                { value: parsed.dupes, color: DE_EMPHASIS, label: 'Duplicates' },
                { value: parsed.invalid.length, color: SERIOUS, label: 'Not an email' },
              ]}
            />
            <Legend
              items={[
                { label: 'Will be created', value: n, color: GOOD },
                { label: 'Already have an account', value: parsed.existing.length, color: BLUE },
                { label: 'Duplicates', value: parsed.dupes, color: DE_EMPHASIS },
                { label: 'Not an email', value: parsed.invalid.length, color: SERIOUS },
              ]}
            />
          </div>

          {n > 0 && (
            <div className="mt-4 border-t border-white/[0.1] pt-4">
              <div className="text-[13px] font-semibold text-white">
                {n === 1 ? 'This account' : `These ${n} accounts`} will be created
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {parsed.valid.slice(0, 40).map((email) => (
                  <span
                    key={email}
                    className="rounded-full bg-white/[0.06] px-2.5 py-1 font-mono text-[11.5px] text-white"
                  >
                    {email}
                  </span>
                ))}
                {n > 40 && <span className="px-1 py-1 text-[11.5px] text-white">and {n - 40} more</span>}
              </div>
            </div>
          )}
          {parsed.existing.length > 0 && (
            <div className="mt-3 text-[12px] leading-[18px] text-white">
              <span className="font-semibold">Already have an account, will be left alone:</span>{' '}
              {parsed.existing.slice(0, 8).join(', ')}
              {parsed.existing.length > 8 ? ` and ${parsed.existing.length - 8} more` : ''}
            </div>
          )}
          {parsed.invalid.length > 0 && (
            <div className="mt-2 break-words text-[12px] leading-[18px] text-white">
              <span className="font-semibold" style={{ color: SERIOUS }}>
                Not an email, ignored:
              </span>{' '}
              {parsed.invalid.slice(0, 8).join(', ')}
              {parsed.invalid.length > 8 ? '…' : ''}
            </div>
          )}
        </Panel>

        {/* How they get in */}
        <Panel>
          <SectionHead title="How they get in" className="min-h-0" />
          <div className="mt-3 space-y-5">
            <div>
              <label className="mb-1 block text-[12px] font-medium text-white">
                Shared temporary password
              </label>
              <div className="flex items-end gap-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(inputCn, 'font-mono')}
                  aria-label="Temporary password"
                />
                <button
                  type="button"
                  onClick={() => setPassword(genPassword())}
                  className="flex h-11 shrink-0 touch-manipulation items-center gap-1.5 rounded-full bg-white/[0.06] px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] active:bg-white/[0.14]"
                >
                  <RefreshCw className="h-4 w-4" /> New
                </button>
              </div>
              <div className="mt-1.5 text-[12px] text-white">
                {password.length < 8 ? 'At least 8 characters.' : 'Everyone in this batch gets this password.'}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/[0.1] pt-4">
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-white">Grant free access</div>
                <div className="mt-0.5 text-[12px] leading-4 text-white">
                  No paywall from the first login. Right for cohorts.
                </div>
              </div>
              <Switch checked={grantAccess} onCheckedChange={setGrantAccess} />
            </div>
            {grantAccess && (
              <div>
                <label className="mb-1 block text-[12px] font-medium text-white">
                  Reason, kept on each account
                </label>
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Cwmbran College, Level 2 cohort"
                  className={inputCn}
                  aria-label="Reason for free access"
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {QUICK_REASONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setReason(r)}
                      className={cn(
                        'h-9 touch-manipulation rounded-full border px-3 text-[12px] font-medium transition-colors',
                        reason === r
                          ? 'border-elec-yellow bg-elec-yellow text-black'
                          : 'border-white/[0.12] bg-white/[0.04] text-white hover:bg-white/[0.08]'
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {colleges && colleges.length > 0 && (
              <div className="border-t border-white/[0.1] pt-4">
                <label className="mb-1 block text-[12px] font-medium text-white">
                  Attach to a college
                </label>
                <select
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                  className="h-11 w-full touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[13px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
                  aria-label="College"
                >
                  <option value="">No college</option>
                  {colleges.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} · {c.students} {c.students === 1 ? 'account' : 'accounts'}
                    </option>
                  ))}
                </select>
                <div className="mt-1.5 text-[12px] text-white">
                  Puts them in that college's hub as students.
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              disabled={!ready}
              className="flex h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl text-[15px] font-semibold transition-colors enabled:bg-elec-yellow enabled:text-black enabled:hover:bg-elec-yellow/90 enabled:active:opacity-80 disabled:cursor-not-allowed disabled:bg-white/[0.06] disabled:text-white disabled:opacity-60"
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Creating {n}…
                </>
              ) : n === 0 ? (
                'Paste addresses to begin'
              ) : (
                `Create ${n} ${n === 1 ? 'account' : 'accounts'}`
              )}
            </button>
          </div>
        </Panel>
      </div>

      {/* What happened */}
      {result && (
        <Panel>
          <SectionHead
            title="Done"
            meta={`${result.summary.created} created · ${result.summary.skipped} skipped · ${result.summary.failed} failed`}
            className="min-h-0"
          />
          <div className="mt-3">
            <StackBar
              segments={[
                { value: result.summary.created, color: GOOD, label: 'Created' },
                { value: result.summary.skipped, color: DE_EMPHASIS, label: 'Skipped' },
                { value: result.summary.failed, color: SERIOUS, label: 'Failed' },
              ]}
            />
          </div>
          {result.created.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyCredentials}
                className="flex h-11 touch-manipulation items-center gap-1.5 rounded-full bg-white/[0.06] px-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] active:bg-white/[0.14]"
              >
                {copied ? <Check className="h-4 w-4" style={{ color: GOOD }} /> : <Copy className="h-4 w-4" />}
                Copy logins
              </button>
              <button
                type="button"
                onClick={downloadCredentials}
                className="flex h-11 touch-manipulation items-center gap-1.5 rounded-full bg-elec-yellow px-4 text-[13px] font-semibold text-black transition-opacity hover:opacity-90 active:opacity-80"
              >
                <Download className="h-4 w-4" /> Download CSV
              </button>
            </div>
          )}
          <div className="mt-4 divide-y divide-white/[0.08] border-t border-white/[0.08]">
            {result.created.map((email) => (
              <div key={email} className="flex min-h-11 items-center justify-between gap-3 py-2 text-[13px] text-white">
                <span className="truncate font-mono">{email}</span>
                <StateDot label="Created" color={GOOD} />
              </div>
            ))}
            {result.skipped.map((s) => (
              <div key={s.email} className="flex min-h-11 items-center justify-between gap-3 py-2 text-[13px] text-white">
                <span className="min-w-0 truncate">
                  <span className="font-mono">{s.email}</span>
                  <span className="ml-2 text-[12px]">{s.reason}</span>
                </span>
                <StateDot label="Skipped" color={DE_EMPHASIS} />
              </div>
            ))}
            {result.failed.map((s) => (
              <div key={s.email} className="flex min-h-11 items-center justify-between gap-3 py-2 text-[13px] text-white">
                <span className="min-w-0 truncate">
                  <span className="font-mono">{s.email}</span>
                  <span className="ml-2 text-[12px]">{s.reason}</span>
                </span>
                <StateDot label="Failed" color={SERIOUS} />
              </div>
            ))}
          </div>
        </Panel>
      )}

      {/* The state of free access across the whole user base */}
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-3 lg:items-start">
        <Panel>
          <SectionHead
            title="Free access today"
            meta={baseUsers ? `${freeAccess.all.length} accounts` : 'loading…'}
            className="min-h-0"
          />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <KpiTile
              label="No end date"
              value={baseUsers ? freeAccess.noExpiry.length : '—'}
              definition="Access until you revoke it"
            />
            <KpiTile
              label="Ending in 30 days"
              value={baseUsers ? freeAccess.expiring.length : '—'}
              definition="Worth a message before it ends"
            />
          </div>
          <div className="mt-4">
            <StackBar
              segments={[
                { value: freeAccess.noExpiry.length, color: AQUA, label: 'No end date' },
                { value: freeAccess.running, color: BLUE, label: 'Running' },
                { value: freeAccess.expiring.length, color: YELLOW, label: 'Ending in 30 days' },
                { value: freeAccess.expired.length, color: SERIOUS, label: 'Past end date' },
              ]}
            />
            <Legend
              items={[
                { label: 'No end date', value: freeAccess.noExpiry.length, color: AQUA },
                { label: 'Running', value: freeAccess.running, color: BLUE },
                { label: 'Ending in 30 days', value: freeAccess.expiring.length, color: YELLOW },
                { label: 'Past end date', value: freeAccess.expired.length, color: SERIOUS },
              ]}
            />
          </div>
          {freeAccess.expired.length > 0 && (
            <div className="mt-3 text-[12px] leading-[18px] text-white">
              {freeAccess.expired.length} {freeAccess.expired.length === 1 ? 'account is' : 'accounts are'}{' '}
              still flagged as free access after their end date. Clear them from the Users page.
            </div>
          )}
          {freeAccess.watch.length > 0 && (
            <div className="mt-4 divide-y divide-white/[0.08] border-t border-white/[0.08]">
              {freeAccess.watch.map((u) => {
                const d = daysBetween(u.free_access_expires_at!);
                const past = d < 0;
                return (
                  <Link
                    key={u.id}
                    to={`/admin/users?q=${encodeURIComponent(u.email ?? u.full_name ?? '')}`}
                    className="flex min-h-[52px] touch-manipulation items-center gap-3 py-2 text-white transition-colors active:bg-white/[0.04]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium">{u.full_name || u.email}</div>
                      <div className="truncate text-[12px]">{u.free_access_reason || 'No reason recorded'}</div>
                    </div>
                    <span
                      className="shrink-0 text-[12px] font-medium tabular-nums"
                      style={{ color: past ? SERIOUS : YELLOW }}
                    >
                      {past
                        ? `ended ${shortDate(u.free_access_expires_at!)}`
                        : d === 0
                          ? 'ends today'
                          : `${d}d left`}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white/40" />
                  </Link>
                );
              })}
            </div>
          )}
        </Panel>

        <Panel>
          <SectionHead
            title="Why they have it"
            meta={
              baseUsers && freeAccess.all.length > 0
                ? `${Math.round((freeAccess.onboarded / freeAccess.all.length) * 100)}% finished setup`
                : undefined
            }
            className="min-h-0"
          />
          {freeAccess.reasons.length === 0 ? (
            <div className="mt-3 text-[13px] text-white">Nobody is on free access yet.</div>
          ) : (
            <div className="mt-3 space-y-2.5">
              {freeAccess.reasons.map(([label, n]) => {
                const max = freeAccess.reasons[0][1];
                const flagged = label === 'No reason recorded';
                return (
                  <div key={label}>
                    <div className="flex items-baseline justify-between gap-3 text-[13px] text-white">
                      <span className="truncate">{label}</span>
                      <span className="shrink-0 font-medium tabular-nums">{n}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/[0.08]">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${Math.max(3, (n / max) * 100)}%`,
                          background: flagged ? SERIOUS : BLUE,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-4 border-t border-white/[0.08] pt-3 text-[12px] leading-[18px] text-white">
            The reason you type above is what lands here. Keep it short and consistent so cohorts
            stay countable.
          </div>
        </Panel>

        <Panel>
          <SectionHead
            title="Colleges"
            meta={
              colleges
                ? `${colleges.reduce((a, c) => a + c.students, 0)} accounts across ${colleges.length}`
                : undefined
            }
            className="min-h-0"
          />
          {!colleges || colleges.length === 0 ? (
            <div className="mt-3 text-[13px] text-white">No active colleges yet.</div>
          ) : (
            <div className="mt-2 divide-y divide-white/[0.08]">
              {colleges.map((c) => {
                const on = c.id === collegeId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCollegeId(on ? '' : c.id)}
                    className="flex min-h-[52px] w-full touch-manipulation items-center gap-3 py-2 text-left text-white transition-colors active:bg-white/[0.04]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium">{c.name}</div>
                      <div className="text-[12px]">
                        {c.code ? `${c.code} · ` : ''}
                        {c.students} {c.students === 1 ? 'account' : 'accounts'}
                      </div>
                    </div>
                    {on ? (
                      <StateDot label="Attaching this batch" color={GOOD} />
                    ) : (
                      <span className="text-[12px] text-white">Tap to attach</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
          <div className="mt-4 border-t border-white/[0.08] pt-3 text-[12px] leading-[18px] text-white">
            Attached accounts appear in that college's hub as students the moment they are created.
          </div>
        </Panel>
      </div>

      {/* Recent batches — always shown, so the page says what has and has not happened */}
      <Panel>
        <SectionHead
          title="Recent batches"
          meta={batches && batches.length > 0 ? 'from the audit log' : undefined}
          className="min-h-0"
        />
        {!batches || batches.length === 0 ? (
          <div className="mt-3 text-[13px] leading-5 text-white">
            No batches yet. Every run is recorded here with the count, the college and the reason,
            so you can see what was created and when.
          </div>
        ) : (
          <div className="mt-2 divide-y divide-white/[0.08]">
            {batches.map((b) => {
              const v = b.new_values ?? {};
              return (
                <div key={b.id} className="flex min-h-[52px] items-center justify-between gap-3 py-2 text-white">
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium">
                      {v.created ?? 0} created
                      {v.college ? ` · ${v.college}` : ''}
                      {v.reason ? ` · ${v.reason}` : ''}
                    </div>
                    <div className="text-[12px]">
                      {when(b.created_at)}
                      {v.skipped ? ` · ${v.skipped} skipped` : ''}
                      {v.failed ? ` · ${v.failed} failed` : ''}
                      {v.grantAccess === false ? ' · no free access' : ''}
                    </div>
                  </div>
                  <StateDot
                    label={v.failed ? 'Had failures' : 'Clean'}
                    color={v.failed ? SERIOUS : AQUA}
                  />
                </div>
              );
            })}
          </div>
        )}
      </Panel>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="rounded-2xl border-white/[0.1] bg-[hsl(0_0%_10%)] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Create {n} {n === 1 ? 'account' : 'accounts'}?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-1 text-white">
              <span className="block">
                {n} live {n === 1 ? 'account' : 'accounts'}, all with the password{' '}
                <span className="font-mono text-white">{password}</span>.
              </span>
              <span className="block">
                {grantAccess
                  ? 'Free access from the first login.'
                  : 'No free access. They may hit the paywall.'}
                {selectedCollege ? ` Attached to ${selectedCollege.name}.` : ''}
              </span>
              {parsed.existing.length > 0 && (
                <span className="block">
                  {parsed.existing.length} {parsed.existing.length === 1 ? 'address' : 'addresses'}{' '}
                  already {parsed.existing.length === 1 ? 'has' : 'have'} an account and will be left
                  alone.
                </span>
              )}
              <span className="block">This cannot be undone in bulk.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full border-white/[0.1] bg-white/[0.06] text-white hover:bg-white/[0.1] hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCreate}
              className="rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Create {n}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageFrame>
  );
}
