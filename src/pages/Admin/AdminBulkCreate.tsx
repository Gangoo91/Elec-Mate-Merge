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
import { Loader2, RefreshCw, Copy, Check, Download, ChevronRight, Eye, Send } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
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
  summary: {
    created: number;
    updated?: number;
    skipped: number;
    failed: number;
    emailed?: number;
    emailFailed?: number;
  };
  created: string[];
  /** Already existed: switched to free access and emailed, password untouched. */
  updated?: string[];
  skipped: { email: string; reason: string }[];
  failed: { email: string; reason: string }[];
  /** Created AND sent the branded login email. */
  emailed?: string[];
  /** Created, but the login email did not go — send it by hand. */
  emailFailed?: { email: string; reason: string }[];
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
    emailed?: number | null;
    orgName?: string | null;
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
const daysBetween = (iso: string) =>
  Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);

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
  const [appRole, setAppRole] = useState<'electrician' | 'apprentice' | ''>('electrician');
  const [reason, setReason] = useState('College cohort');
  const [collegeId, setCollegeId] = useState('');
  // Branded "your access is live" email, one per person, tailored to the batch.
  const [sendAccessEmail, setSendAccessEmail] = useState(true);
  const [orgName, setOrgName] = useState('');
  const [requester, setRequester] = useState('');
  const [offered, setOffered] = useState(false);
  const [employer, setEmployer] = useState(false);
  const [learnerCode, setLearnerCode] = useState('');
  const [electricianCode, setElectricianCode] = useState('');
  const [includeExisting, setIncludeExisting] = useState(false);
  const [intro, setIntro] = useState('');
  const [busy, setBusy] = useState<'preview' | 'test' | null>(null);
  const [preview, setPreview] = useState<{ to: string; subject: string; html: string } | null>(
    null
  );
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
      if (error)
        return [] as Array<{ id: string; name: string; code: string | null; students: number }>;
      const counts = new Map<string, number>();
      for (const m of (members ?? []) as Array<{ college_id: string | null }>) {
        if (m.college_id) counts.set(m.college_id, (counts.get(m.college_id) ?? 0) + 1);
      }
      return ((rows ?? []) as Array<{ id: string; name: string; code: string | null }>).map(
        (c) => ({
          ...c,
          students: counts.get(c.id) ?? 0,
        })
      );
    },
  });

  // Live discount codes, so the email never carries a code that does not exist.
  const { data: promoCodes } = useQuery<
    Array<{ code: string; plan_id: string | null; name: string | null }>
  >({
    queryKey: ['admin-promo-codes-active'],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data } = await supabase
        .from('promo_offers')
        .select('code, plan_id, name')
        .eq('is_active', true)
        .order('code');
      return (data ?? []) as Array<{ code: string; plan_id: string | null; name: string | null }>;
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
  const idByEmail = useMemo(() => {
    const m = new Map<string, string>();
    for (const u of baseUsers ?? []) if (u.email) m.set(u.email.toLowerCase(), u.id);
    return m;
  }, [baseUsers]);

  /*
    Codes: what the org name matches in promo_offers, and whether what has
    been typed is real. A wrong code in a tutor's email is worse than none.
  */
  const codeStatus = (c: string, want: 'apprentice' | 'electrician') => {
    const v = c.trim().toUpperCase();
    if (!v) return null;
    const hit = promoCodes?.find((p) => p.code.toUpperCase() === v);
    if (!promoCodes) return null;
    if (!hit) return 'Not an active code';
    if (hit.plan_id && hit.plan_id !== want)
      return want === 'apprentice'
        ? 'That is the electrician code, put it in the other box'
        : 'That is the learner code, put it in the other box';
    return null;
  };
  const learnerCodeIssue = codeStatus(learnerCode, 'apprentice');
  const electricianCodeIssue = codeStatus(electricianCode, 'electrician');
  const codeSuggestions = useMemo(() => {
    const org = orgName.trim().toLowerCase();
    if (org.length < 3 || !promoCodes) return [];
    const strip = (x: string) =>
      x
        .toLowerCase()
        .replace(
          /college scheme 50%:|\(apprentice\)|\(electrician\)|\bcollege\b|\bthe\b|\bgroup\b|\bof\b|\band\b|&/g,
          ' '
        )
        .replace(/[^a-z0-9 ]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 2);
    const words = strip(org);
    if (words.length === 0) return [];
    // Exact name first (every word both ways), then names that merely contain the org's words.
    const scored = promoCodes
      .map((p) => {
        const nw = strip(p.name || '');
        const contains = words.every((w) => nw.some((x) => x.startsWith(w)));
        if (!contains) return null;
        const exact = nw.every((x) => words.some((w) => x.startsWith(w)));
        return { p, exact };
      })
      .filter((x): x is { p: (typeof promoCodes)[number]; exact: boolean } => x !== null)
      .sort((a, b) => Number(b.exact) - Number(a.exact));
    const hits = scored.map((x) => x.p);
    const learners = hits.filter((p) => p.plan_id === 'apprentice').map((p) => p.code);
    const electricians = hits.filter((p) => p.plan_id === 'electrician').map((p) => p.code);
    return learners.slice(0, 3).map((code) => ({
      code,
      ecode:
        electricians.find((e) => e === `${code.replace(/50$/, '')}ELEC50`) ?? electricians[0] ?? '',
    }));
  }, [orgName, promoCodes]);

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
    // A line may carry a name for an address that has none of its own:
    // "Russell <info@centre.co.uk>". Everything else splits into bare tokens.
    const tokens: string[] = [];
    const names: Record<string, string> = {};
    for (const line of raw.split(/\n/)) {
      const named = line.match(/^\s*([^<>]+?)\s*<\s*([^<>\s]+)\s*>\s*$/);
      if (named) {
        const email = named[2].trim().toLowerCase();
        names[email] = named[1].trim();
        tokens.push(email);
        continue;
      }
      for (const t of line.split(/[\s,;]+/)) {
        const v = t.trim().toLowerCase();
        if (v) tokens.push(v);
      }
    }
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
    return { valid, existing, invalid, dupes, total: tokens.length, names };
  }, [raw, existingEmails]);

  const selectedCollege = colleges?.find((c) => c.id === collegeId) ?? null;

  // Picking a college fills the organisation name the email is tailored to;
  // the admin can still overtype it (or type one with no college attached).
  const pickCollege = (id: string) => {
    setCollegeId(id);
    // Attached to a college hub = students, so give them the Apprentice view.
    if (id) setAppRole('apprentice');
    const c = colleges?.find((x) => x.id === id);
    if (c && (!orgName.trim() || orgName === selectedCollege?.name)) setOrgName(c.name);
  };

  const emailReady =
    !sendAccessEmail || (orgName.trim().length > 0 && !learnerCodeIssue && !electricianCodeIssue);
  const nExisting = includeExisting ? parsed.existing.length : 0;

  const handleCreate = async () => {
    if (parsed.valid.length === 0 && nExisting === 0) {
      toast({ title: 'Nothing to create', variant: 'destructive' });
      return;
    }
    if (password.length < 8) {
      toast({ title: 'Password must be 8 or more characters', variant: 'destructive' });
      return;
    }
    if (sendAccessEmail && !orgName.trim()) {
      toast({
        title: 'Give the college or organisation name for the email',
        variant: 'destructive',
      });
      return;
    }
    setIsCreating(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('admin-bulk-create-users', {
        body: {
          emails: parsed.valid,
          names: parsed.names,
          includeExisting,
          existing: includeExisting
            ? parsed.existing
                .filter((e) => idByEmail.has(e))
                .map((e) => ({ id: idByEmail.get(e)!, email: e }))
            : [],
          password,
          grantAccess,
          role: appRole || null,
          freeAccessReason: reason,
          collegeId: collegeId || undefined,
          accessEmail: sendAccessEmail
            ? {
                orgName: orgName.trim(),
                requester: offered ? null : requester.trim() || null,
                learnerCode: learnerCode.trim() || null,
                electricianCode: electricianCode.trim() || null,
                offered,
                employer,
                intro: intro.trim() || null,
              }
            : null,
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
            emailed: sendAccessEmail ? (res.summary.emailed ?? 0) : null,
            orgName: sendAccessEmail ? orgName.trim() : null,
          },
        } as never);
        queryClient.invalidateQueries({ queryKey: ['admin-bulk-create-batches'] });
      }
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      const emailBit = sendAccessEmail
        ? ` · ${res.summary.emailed ?? 0} emailed${(res.summary.emailFailed ?? 0) > 0 ? ` · ${res.summary.emailFailed} email failed` : ''}`
        : '';
      toast({
        title: `${res.summary.created} created${res.summary.updated ? ` · ${res.summary.updated} updated` : ''}`,
        description: `${res.summary.skipped} skipped · ${res.summary.failed} failed${emailBit}`,
        variant:
          res.summary.failed > 0 || (res.summary.emailFailed ?? 0) > 0 ? 'destructive' : 'success',
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

  const emailPayload = () => ({
    emails: parsed.valid.slice(0, 1),
    names: parsed.names,
    includeExisting,
    existing:
      parsed.valid.length === 0 && includeExisting
        ? parsed.existing
            .filter((e) => idByEmail.has(e))
            .slice(0, 1)
            .map((e) => ({ id: idByEmail.get(e)!, email: e }))
        : [],
    password,
    grantAccess,
    role: appRole || null,
    freeAccessReason: reason,
    accessEmail: {
      orgName: orgName.trim(),
      requester: offered ? null : requester.trim() || null,
      learnerCode: learnerCode.trim() || null,
      electricianCode: electricianCode.trim() || null,
      offered,
      employer,
      intro: intro.trim() || null,
    },
  });

  /* Render the first person's email exactly as it would go out, create nothing. */
  const previewEmail = async () => {
    setBusy('preview');
    try {
      const { data, error } = await supabase.functions.invoke('admin-bulk-create-users', {
        body: { ...emailPayload(), preview: true },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.message || data.error);
      setPreview(data.preview);
    } catch (e) {
      toast({
        title: 'Preview failed',
        description: e instanceof Error ? e.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  /* Send the first person's email to founder@ instead, so you see it in a real inbox. */
  const sendTest = async () => {
    setBusy('test');
    try {
      const { data, error } = await supabase.functions.invoke('admin-bulk-create-users', {
        body: { ...emailPayload(), test: true },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.message || data.error);
      toast({
        title: 'Test sent to founder@elec-mate.com',
        description: `As it would go to ${data.sample}. Nothing was created.`,
        variant: 'success',
      });
    } catch (e) {
      toast({
        title: 'Test failed',
        description: e instanceof Error ? e.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
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
  const ready = (n > 0 || nExisting > 0) && password.length >= 8 && emailReady && !isCreating;
  const canPreview =
    sendAccessEmail && orgName.trim().length > 0 && (n > 0 || nExisting > 0) && !busy;

  const summaryLine =
    n === 0 && nExisting === 0 ? (
      <span>Paste addresses above to begin.</span>
    ) : n === 0 ? (
      <span>
        <span className="font-semibold">
          {nExisting} existing {nExisting === 1 ? 'account' : 'accounts'}
        </span>
        <span> · {grantAccess ? 'free access switched on' : 'no access change'}</span>
        <span>
          {' '}
          ·{' '}
          {sendAccessEmail
            ? orgName.trim()
              ? `emailed for ${orgName.trim()}, password untouched`
              : 'email needs the college or organisation name'
            : 'no email'}
        </span>
      </span>
    ) : (
      <>
        <span className="font-semibold">
          {n} {n === 1 ? 'account' : 'accounts'}
          {nExisting > 0 ? ` + ${nExisting} existing updated` : ''}
        </span>
        <span> · {grantAccess ? 'free access' : 'no free access'}</span>
        {selectedCollege && <span> · in {selectedCollege.name}</span>}
        <span>
          {' '}
          ·{' '}
          {sendAccessEmail
            ? orgName.trim()
              ? `emailed their login for ${orgName.trim()}`
              : 'email needs the college or organisation name'
            : 'no email, copy the logins after'}
        </span>
      </>
    );

  const createButton = (full: boolean) => (
    <button
      type="button"
      onClick={() => setConfirmOpen(true)}
      disabled={!ready}
      className={cn(
        'flex h-12 shrink-0 touch-manipulation items-center justify-center gap-2 rounded-xl px-8 text-[15px] font-semibold transition-colors enabled:bg-elec-yellow enabled:text-black enabled:hover:bg-elec-yellow/90 enabled:active:opacity-80 disabled:cursor-not-allowed disabled:bg-white/[0.06] disabled:text-white disabled:opacity-60',
        full ? 'w-full' : 'w-full sm:w-auto'
      )}
    >
      {isCreating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Creating {n}…
        </>
      ) : n === 0 && nExisting === 0 ? (
        'Paste addresses to begin'
      ) : n === 0 ? (
        `Update ${nExisting} existing ${nExisting === 1 ? 'account' : 'accounts'}`
      ) : (
        `Create ${n} ${n === 1 ? 'account' : 'accounts'}${nExisting > 0 ? ` + update ${nExisting}` : ''}`
      )}
    </button>
  );

  const kpiCn =
    'border-t border-white/[0.1] lg:border-t-0 lg:border-l lg:pl-5 first:border-0 first:pl-0';

  return (
    <PageFrame className="space-y-5 pb-28 sm:space-y-6 lg:pb-6">
      {/* Title row */}
      <div className="min-w-0">
        <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-white lg:text-[26px] lg:leading-[30px]">
          Bulk create accounts
        </h1>
        <div className="mt-0.5 text-[12px] text-white">
          A college cohort, a team, anyone. One temporary password for the batch; they change it at
          Settings → Security on first login.
        </div>
      </div>

      {/* ── The batch: who, how they get in, college and email — three equal cards ── */}
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:items-stretch xl:grid-cols-3">
        {/* 1 · Who — on a laptop it takes the full left column, the other two stack beside it */}
        <Panel tone="accent" className="flex flex-col lg:row-span-2 xl:row-span-1">
          <SectionHead
            title="Who"
            meta={
              parsed.total > 0
                ? `${parsed.total} ${parsed.total === 1 ? 'address' : 'addresses'} pasted`
                : 'paste a list, any separators'
            }
            className="min-h-0"
          />
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={
              'jordan@example.com\nsam@example.com, alex@example.com\nRussell <info@centre.co.uk>   ← a name for a shared inbox\n…paste a whole list, any separators'
            }
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
            className="input-underline mt-3 min-h-[160px] w-full flex-1 touch-manipulation resize-y rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 font-mono text-[14px] leading-6 text-white caret-elec-yellow placeholder:text-white/25 transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 lg:min-h-[220px]"
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
                {n > 40 && (
                  <span className="px-1 py-1 text-[11.5px] text-white">and {n - 40} more</span>
                )}
              </div>
            </div>
          )}
          {parsed.existing.length > 0 && (
            <div className="mt-3 border-t border-white/[0.1] pt-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-white">
                    {parsed.existing.length === 1
                      ? '1 already has an account'
                      : `${parsed.existing.length} already have accounts`}
                  </div>
                  <div className="mt-0.5 text-[12px] leading-4 text-white">
                    {includeExisting
                      ? 'They get free access and the email too. Their password is untouched.'
                      : 'Left alone: no access change, no email.'}
                  </div>
                </div>
                <Switch checked={includeExisting} onCheckedChange={setIncludeExisting} />
              </div>
              <div className="mt-2 text-[12px] leading-[18px] text-white">
                {parsed.existing.slice(0, 8).join(', ')}
                {parsed.existing.length > 8 ? ` and ${parsed.existing.length - 8} more` : ''}
              </div>
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

        {/* 2 · How they get in */}
        <Panel className="flex flex-col">
          <SectionHead title="How they get in" className="min-h-0" />
          <div className="mt-3 flex flex-1 flex-col gap-5">
            <div>
              <label className="mb-1 block text-[12px] font-medium text-white">
                Shared temporary password
              </label>
              <div className="flex items-center gap-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(inputCn, 'font-mono')}
                  aria-label="Temporary password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
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
                {password.length < 8
                  ? 'At least 8 characters.'
                  : 'Everyone in this batch gets this password.'}
              </div>
            </div>

            <div className="border-t border-white/[0.1] pt-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-white">Grant free access</div>
                  <div className="mt-0.5 text-[12px] leading-4 text-white">
                    No paywall from the first login. Right for cohorts and college staff.
                  </div>
                </div>
                <Switch checked={grantAccess} onCheckedChange={setGrantAccess} />
              </div>
              {grantAccess && (
                <div className="mt-3">
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
            </div>

            <div className="border-t border-white/[0.1] pt-4">
              <div className="text-[13px] font-medium text-white">What they see on first login</div>
              <div className="mt-0.5 text-[12px] leading-4 text-white">
                Skips the "choose your role" screen so the first login goes straight in.
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(
                  [
                    ['electrician', 'Electrician view', 'tutors and staff'],
                    ['apprentice', 'Apprentice view', 'a cohort of learners'],
                    ['', 'Let them choose', 'shows the role screen'],
                  ] as const
                ).map(([v, label, hint]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setAppRole(v)}
                    className={cn(
                      'h-9 touch-manipulation rounded-full border px-3 text-[12px] font-medium transition-colors',
                      appRole === v
                        ? 'border-elec-yellow bg-elec-yellow text-black'
                        : 'border-white/[0.12] bg-white/[0.04] text-white hover:bg-white/[0.08]'
                    )}
                    title={hint}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto border-t border-white/[0.1] pt-4 text-[12px] leading-[18px] text-white">
              They sign in at app.elec-mate.com with their email and this password, then change it
              under Settings → Security. The mobile app works with the same details.
            </div>
          </div>
        </Panel>

        {/* 3 · College and email */}
        <Panel className="flex flex-col">
          <SectionHead title="College and email" meta="one email per person" className="min-h-0" />
          <div className="mt-3 flex flex-1 flex-col gap-5">
            {colleges && colleges.length > 0 && (
              <div>
                <label className="mb-1 block text-[12px] font-medium text-white">
                  Attach to a College Hub
                </label>
                <select
                  value={collegeId}
                  onChange={(e) => pickCollege(e.target.value)}
                  className="h-11 w-full touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[13px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
                  aria-label="College"
                >
                  <option value="">No college — just the accounts</option>
                  {colleges.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} · {c.students} {c.students === 1 ? 'account' : 'accounts'}
                    </option>
                  ))}
                </select>
                <div className="mt-1.5 text-[12px] text-white">
                  Puts them in that college's hub as students. Leave it off for staff.
                </div>
              </div>
            )}

            <div
              className={cn(colleges && colleges.length > 0 && 'border-t border-white/[0.1] pt-4')}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-white">
                    Email each person their login
                  </div>
                  <div className="mt-0.5 text-[12px] leading-4 text-white">
                    Branded, from founder@. Their login, why it's free, how to send feedback. You're
                    bcc'd.
                  </div>
                </div>
                <Switch checked={sendAccessEmail} onCheckedChange={setSendAccessEmail} />
              </div>
              {sendAccessEmail && (
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.1] px-3 py-2">
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium text-white">
                        {employer ? 'Employer, not a college' : 'College or training provider'}
                      </div>
                      <div className="mt-0.5 text-[12px] leading-4 text-white">
                        {employer
                          ? 'Owner or manager looking at it for their own electricians. Employer wording, 30% / 40% codes, shows on Admin → Employers.'
                          : 'Tutor wording, 50% codes, shows on Admin → Colleges. Switch for a contractor.'}
                      </div>
                    </div>
                    <Switch checked={employer} onCheckedChange={setEmployer} />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-medium text-white">
                      {employer ? 'Company' : 'College or organisation'}
                    </label>
                    <input
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder={
                        employer
                          ? 'e.g. DW Hargreaves Electrical Contractors'
                          : 'e.g. Newcastle and Stafford Colleges Group'
                      }
                      className={inputCn}
                      aria-label="College or organisation name for the email"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-[12px] font-medium text-white">
                        Who asked
                      </label>
                      <input
                        value={offered ? '' : requester}
                        onChange={(e) => setRequester(e.target.value)}
                        placeholder={offered ? 'nobody, offered' : 'e.g. Sam'}
                        disabled={offered}
                        className={cn(inputCn, offered && 'opacity-40')}
                        aria-label="Who asked for the accounts"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[12px] font-medium text-white">
                        Learner code
                      </label>
                      <input
                        value={learnerCode}
                        onChange={(e) => setLearnerCode(e.target.value.toUpperCase())}
                        placeholder="e.g. NSCG50"
                        className={cn(inputCn, 'font-mono uppercase')}
                        aria-label="Learner discount code"
                      />
                      {learnerCodeIssue && (
                        <div className="mt-1 text-[12px]" style={{ color: SERIOUS }}>
                          {learnerCodeIssue}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-medium text-white">
                      Electrician code
                    </label>
                    <input
                      value={electricianCode}
                      onChange={(e) => setElectricianCode(e.target.value.toUpperCase())}
                      placeholder="e.g. NSCGELEC50 — for qualified electricians on their courses"
                      className={cn(inputCn, 'font-mono uppercase')}
                      aria-label="Electrician discount code"
                    />
                    {electricianCodeIssue && (
                      <div className="mt-1 text-[12px]" style={{ color: SERIOUS }}>
                        {electricianCodeIssue}
                      </div>
                    )}
                  </div>
                  {codeSuggestions.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[12px] text-white">Live codes for this name:</span>
                      {codeSuggestions.map((sug) => {
                        const on =
                          learnerCode.trim().toUpperCase() === sug.code &&
                          electricianCode.trim().toUpperCase() === sug.ecode;
                        return (
                          <button
                            key={sug.code}
                            type="button"
                            onClick={() => {
                              setLearnerCode(sug.code);
                              setElectricianCode(sug.ecode);
                            }}
                            className={cn(
                              'h-9 touch-manipulation rounded-full border px-3 font-mono text-[12px] font-medium transition-colors',
                              on
                                ? 'border-elec-yellow bg-elec-yellow text-black'
                                : 'border-white/[0.12] bg-white/[0.04] text-white hover:bg-white/[0.08]'
                            )}
                          >
                            {sug.code}
                            {sug.ecode ? ` + ${sug.ecode}` : ''}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 border-t border-white/[0.1] pt-3">
                    <button
                      type="button"
                      onClick={previewEmail}
                      disabled={!canPreview}
                      className="flex h-10 touch-manipulation items-center gap-1.5 rounded-full bg-white/[0.06] px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] active:bg-white/[0.14] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {busy === 'preview' ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      Preview the email
                    </button>
                    <button
                      type="button"
                      onClick={sendTest}
                      disabled={!canPreview}
                      className="flex h-10 touch-manipulation items-center gap-1.5 rounded-full bg-white/[0.06] px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] active:bg-white/[0.14] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {busy === 'test' ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      Send me a test
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-white/[0.1] pt-3">
                    <div>
                      <div className="text-[13px] font-medium text-white">
                        Nobody asked, I'm offering it
                      </div>
                      <div className="mt-0.5 text-[12px] leading-4 text-white">
                        Opens with "I'd sooner you saw it for yourself" instead of naming a
                        requester.
                      </div>
                    </div>
                    <Switch checked={offered} onCheckedChange={setOffered} />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-medium text-white">
                      Opening line (optional)
                    </label>
                    <input
                      value={intro}
                      onChange={(e) => setIntro(e.target.value)}
                      placeholder="e.g. Good to talk on Friday with Tom and Warren"
                      className={inputCn}
                      aria-label="Custom opening line"
                    />
                    <div className="mt-1 text-[12px] text-white">
                      Replaces the generated opening. The email continues ", so I've set you up with
                      full access…"
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto border-t border-white/[0.1] pt-4 text-[12px] leading-[18px] text-white">
              {sendAccessEmail
                ? offered
                  ? `"I said I'd sooner you saw it for yourself than took my word for it, so I've set you up…" — no request is claimed. ${learnerCode.trim() ? `Codes in the email: ${learnerCode.trim()}${electricianCode.trim() ? ` + ${electricianCode.trim()}` : ' only — add the electrician code too'}.` : 'Add the learner and electrician codes to include the 50% lines.'}`
                  : `"${requester.trim() || 'Sam'} asked for accounts for the electrical team at ${orgName.trim() || '…'}", and "You asked" on ${requester.trim() || 'Sam'}'s own copy. ${learnerCode.trim() ? `Codes in the email: ${learnerCode.trim()}${electricianCode.trim() ? ` + ${electricianCode.trim()}` : ' only — add the electrician code too'}.` : 'Add the learner and electrician codes to include the 50% lines.'}`
                : 'No email goes out. Copy or download the logins once the batch is created.'}
            </div>
          </div>
        </Panel>
      </div>

      {/* Action bar — desktop: inline under the three cards */}
      <Panel tone="accent" className="hidden lg:block">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 text-[13px] leading-5 text-white">{summaryLine}</div>
          {createButton(false)}
        </div>
      </Panel>

      {/* Action bar — phone and tablet: pinned to the bottom, always reachable */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.12] bg-[hsl(0_0%_7%)]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur lg:hidden">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 truncate text-[12px] leading-4 text-white">{summaryLine}</div>
          {createButton(true)}
        </div>
      </div>

      {/* What happened */}
      {result && (
        <Panel>
          <SectionHead
            title="Done"
            meta={`${result.summary.created} created${result.summary.updated ? ` · ${result.summary.updated} updated` : ''} · ${result.summary.skipped} skipped · ${result.summary.failed} failed${
              typeof result.summary.emailed === 'number'
                ? ` · ${result.summary.emailed} emailed`
                : ''
            }`}
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
                {copied ? (
                  <Check className="h-4 w-4" style={{ color: GOOD }} />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
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
            {result.created.map((email) => {
              const emailed = result.emailed?.includes(email);
              const mailFail = result.emailFailed?.find((f) => f.email === email);
              return (
                <div
                  key={email}
                  className="flex min-h-11 items-center justify-between gap-3 py-2 text-[13px] text-white"
                >
                  <span className="min-w-0 truncate">
                    <span className="font-mono">{email}</span>
                    {mailFail && (
                      <span className="ml-2 text-[12px]">email failed: {mailFail.reason}</span>
                    )}
                  </span>
                  <StateDot
                    label={
                      emailed ? 'Created · emailed' : mailFail ? 'Created · not emailed' : 'Created'
                    }
                    color={mailFail ? SERIOUS : GOOD}
                  />
                </div>
              );
            })}
            {(result.updated ?? []).map((email) => {
              const emailed = result.emailed?.includes(email);
              const mailFail = result.emailFailed?.find((f) => f.email === email);
              return (
                <div
                  key={`u-${email}`}
                  className="flex min-h-11 items-center justify-between gap-3 py-2 text-[13px] text-white"
                >
                  <span className="min-w-0 truncate">
                    <span className="font-mono">{email}</span>
                    {mailFail && (
                      <span className="ml-2 text-[12px]">email failed: {mailFail.reason}</span>
                    )}
                  </span>
                  <StateDot
                    label={
                      emailed
                        ? 'Existing · access on · emailed'
                        : mailFail
                          ? 'Existing · access on · not emailed'
                          : 'Existing · access on'
                    }
                    color={mailFail ? SERIOUS : BLUE}
                  />
                </div>
              );
            })}
            {result.skipped.map((s) => (
              <div
                key={s.email}
                className="flex min-h-11 items-center justify-between gap-3 py-2 text-[13px] text-white"
              >
                <span className="min-w-0 truncate">
                  <span className="font-mono">{s.email}</span>
                  <span className="ml-2 text-[12px]">{s.reason}</span>
                </span>
                <StateDot label="Skipped" color={DE_EMPHASIS} />
              </div>
            ))}
            {result.failed.map((s) => (
              <div
                key={s.email}
                className="flex min-h-11 items-center justify-between gap-3 py-2 text-[13px] text-white"
              >
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

      {/* ── Free access across the whole user base: the numbers, then who to talk to ── */}
      <Panel>
        <SectionHead
          title="Free access today"
          meta={baseUsers ? `${freeAccess.all.length} accounts` : 'loading…'}
          className="min-h-0"
        />
        <div className="mt-2 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8">
          <div className="min-w-0">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              <KpiTile
                label="No end date"
                value={baseUsers ? freeAccess.noExpiry.length : '—'}
                definition="Until revoked"
                className={kpiCn}
              />
              <KpiTile
                label="Running"
                value={baseUsers ? freeAccess.running : '—'}
                definition="30+ days left"
                className={cn(kpiCn, 'border-t-0')}
              />
              <KpiTile
                label="Ending in 30 days"
                value={baseUsers ? freeAccess.expiring.length : '—'}
                definition="Message them first"
                className={kpiCn}
              />
              <KpiTile
                label="Past end date"
                value={baseUsers ? freeAccess.expired.length : '—'}
                definition="Clear on Users"
                className={kpiCn}
              />
            </div>
            <div className="mt-2">
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
                {freeAccess.expired.length}{' '}
                {freeAccess.expired.length === 1 ? 'account is' : 'accounts are'} still flagged as
                free access after their end date.{' '}
                <Link to="/admin/users" className="font-semibold text-elec-yellow">
                  Clear them on Users
                </Link>
                .
              </div>
            )}
          </div>

          <div className="min-w-0 border-t border-white/[0.1] pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white">
              Worth a message
            </div>
            {freeAccess.watch.length === 0 ? (
              <div className="mt-2 text-[13px] leading-5 text-white">
                Nobody is close to losing access.
              </div>
            ) : (
              <div className="mt-1 divide-y divide-white/[0.08]">
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
                        <div className="truncate text-[13px] font-medium">
                          {u.full_name || u.email}
                        </div>
                        <div className="truncate text-[12px]">
                          {u.free_access_reason || 'No reason recorded'}
                        </div>
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
          </div>
        </div>
      </Panel>

      {/* ── Why they have it · Colleges ── */}
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:items-stretch">
        <Panel className="flex flex-col">
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
              {freeAccess.reasons.map(([label, count]) => {
                const max = freeAccess.reasons[0][1];
                const flagged = label === 'No reason recorded';
                return (
                  <div key={label}>
                    <div className="flex items-baseline justify-between gap-3 text-[13px] text-white">
                      <span className="truncate">{label}</span>
                      <span className="shrink-0 font-medium tabular-nums">{count}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/[0.08]">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${Math.max(3, (count / max) * 100)}%`,
                          background: flagged ? SERIOUS : BLUE,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-auto border-t border-white/[0.08] pt-3 text-[12px] leading-[18px] text-white">
            The reason you type above is what lands here. Keep it short and consistent so cohorts
            stay countable.
          </div>
        </Panel>

        <Panel className="flex flex-col">
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
                    onClick={() => pickCollege(on ? '' : c.id)}
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
          <div className="mt-auto border-t border-white/[0.08] pt-3 text-[12px] leading-[18px] text-white">
            Attached accounts appear in that college's hub as students the moment they are created.
          </div>
        </Panel>
      </div>

      {/* ── Recent batches — a table on desktop, rows on a phone ── */}
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
          <>
            {/* Desktop table */}
            <div className="mt-2 hidden overflow-x-auto lg:block">
              <table className="w-full border-collapse text-[13px] text-white">
                <thead>
                  <tr className="text-left text-[11px] font-medium uppercase tracking-[0.12em] text-white">
                    <th className="border-b border-white/[0.12] py-2 pr-4 font-medium">When</th>
                    <th className="border-b border-white/[0.12] py-2 pr-4 font-medium">Created</th>
                    <th className="border-b border-white/[0.12] py-2 pr-4 font-medium">For</th>
                    <th className="border-b border-white/[0.12] py-2 pr-4 font-medium">Reason</th>
                    <th className="border-b border-white/[0.12] py-2 pr-4 font-medium">Emailed</th>
                    <th className="border-b border-white/[0.12] py-2 text-right font-medium">
                      Outcome
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((b) => {
                    const v = b.new_values ?? {};
                    const clean = !v.failed;
                    return (
                      <tr key={b.id} className="border-b border-white/[0.08] last:border-0">
                        <td className="whitespace-nowrap py-3 pr-4 tabular-nums">
                          {when(b.created_at)}
                        </td>
                        <td className="py-3 pr-4 font-medium tabular-nums">
                          {v.created ?? 0}
                          {v.skipped ? (
                            <span className="ml-1.5 text-[12px] font-normal">
                              · {v.skipped} skipped
                            </span>
                          ) : null}
                        </td>
                        <td className="max-w-[260px] truncate py-3 pr-4">
                          {v.college || v.orgName || '—'}
                        </td>
                        <td className="max-w-[240px] truncate py-3 pr-4">
                          {v.grantAccess === false ? 'No free access' : v.reason || '—'}
                        </td>
                        <td className="py-3 pr-4 tabular-nums">
                          {typeof v.emailed === 'number' ? v.emailed : '—'}
                        </td>
                        <td className="py-3 text-right">
                          <StateDot
                            label={clean ? 'Clean' : `${v.failed} failed`}
                            color={clean ? GOOD : SERIOUS}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Phone rows */}
            <div className="mt-2 divide-y divide-white/[0.08] lg:hidden">
              {batches.map((b) => {
                const v = b.new_values ?? {};
                const clean = !v.failed;
                return (
                  <div
                    key={b.id}
                    className="flex min-h-[52px] items-center justify-between gap-3 py-2 text-white"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-medium">
                        {v.created ?? 0} created
                        {v.college || v.orgName ? ` · ${v.college || v.orgName}` : ''}
                      </div>
                      <div className="truncate text-[12px]">
                        {when(b.created_at)}
                        {v.reason ? ` · ${v.reason}` : ''}
                        {v.skipped ? ` · ${v.skipped} skipped` : ''}
                        {v.grantAccess === false ? ' · no free access' : ''}
                        {typeof v.emailed === 'number' ? ` · ${v.emailed} emailed` : ''}
                      </div>
                    </div>
                    <StateDot
                      label={clean ? 'Clean' : `${v.failed} failed`}
                      color={clean ? GOOD : SERIOUS}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Panel>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="rounded-2xl border-white/[0.1] bg-[hsl(0_0%_10%)] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              {n > 0
                ? `Create ${n} ${n === 1 ? 'account' : 'accounts'}${nExisting > 0 ? ` and update ${nExisting}` : ''}?`
                : `Update ${nExisting} existing ${nExisting === 1 ? 'account' : 'accounts'}?`}
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
                {appRole === 'electrician'
                  ? ' Straight into the Electrician view, no role screen.'
                  : appRole === 'apprentice'
                    ? ' Straight into the Apprentice view, no role screen.'
                    : ' They pick their role on first login.'}
              </span>
              <span className="block">
                {sendAccessEmail
                  ? `Each person gets the branded login email for ${orgName.trim()}${
                      offered
                        ? ', offered'
                        : requester.trim()
                          ? `, "${requester.trim()} asked"`
                          : ''
                    }${learnerCode.trim() ? `, code${electricianCode.trim() ? 's' : ''} ${[learnerCode.trim(), electricianCode.trim()].filter(Boolean).join(' + ')}` : ''}. You're bcc'd.`
                  : 'No email is sent. Copy the logins afterwards.'}
              </span>
              {parsed.existing.length > 0 && (
                <span className="block">
                  {parsed.existing.length} {parsed.existing.length === 1 ? 'address' : 'addresses'}{' '}
                  already {parsed.existing.length === 1 ? 'has' : 'have'} an account
                  {includeExisting
                    ? ': switched to free access and emailed, password untouched.'
                    : ' and will be left alone.'}
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
      <Sheet open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <SheetContent
          side="bottom"
          className="max-h-[92vh] overflow-hidden border-white/[0.1] bg-[hsl(0_0%_7%)] p-0 text-white"
        >
          <SheetHeader className="border-b border-white/[0.1] px-5 pb-3 pt-4 text-left">
            <SheetTitle className="text-[15px] font-semibold text-white">
              {preview?.subject}
            </SheetTitle>
            <div className="text-[12px] text-white">
              To {preview?.to} · from Andrew at Elec-Mate · exactly as it will send
            </div>
          </SheetHeader>
          {preview && (
            <iframe
              title="Email preview"
              srcDoc={preview.html}
              sandbox=""
              className="h-[calc(92vh-72px)] w-full bg-[#F4F6F9]"
            />
          )}
        </SheetContent>
      </Sheet>
    </PageFrame>
  );
}
