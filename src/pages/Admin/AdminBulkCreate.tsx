import { useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, Copy, Check, Download } from 'lucide-react';
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

interface BulkResult {
  summary: { created: number; skipped: number; failed: number };
  created: string[];
  skipped: { email: string; reason: string }[];
  failed: { email: string; reason: string }[];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function genPassword(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `ElecMate${n}!`;
}

export default function AdminBulkCreate() {
  const [raw, setRaw] = useState('');
  const [password, setPassword] = useState(genPassword());
  const [grantAccess, setGrantAccess] = useState(true);
  const [reason, setReason] = useState('College cohort');
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<BulkResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Live parse — split on comma / newline / semicolon / whitespace
  const parsed = useMemo(() => {
    const tokens = raw
      .split(/[\s,;]+/)
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    const valid: string[] = [];
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
      valid.push(t);
    }
    return { valid, invalid, dupes };
  }, [raw]);

  const handleCreate = async () => {
    if (parsed.valid.length === 0) {
      toast({ title: 'No valid emails', variant: 'destructive' });
      return;
    }
    if (password.length < 8) {
      toast({ title: 'Password must be 8+ characters', variant: 'destructive' });
      return;
    }
    setIsCreating(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('admin-bulk-create-users', {
        body: { emails: parsed.valid, password, grantAccess, freeAccessReason: reason },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.message || data.error);
      setResult(data as BulkResult);
      toast({
        title: 'Done',
        description: `${data.summary.created} created · ${data.summary.skipped} skipped · ${data.summary.failed} failed`,
        variant: 'success',
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
    toast({ title: 'Credentials copied', variant: 'success' });
  };

  // File copy of the logins — clipboard contents are easy to lose before
  // they're handed to the cohort.
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

  const inputCn =
    'w-full h-11 rounded-xl border border-white/[0.14] bg-white/[0.06] px-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 hover:bg-white/[0.08] focus:border-elec-yellow focus:ring-0';

  return (
    // AdminPanel's <Outlet> wrapper already provides bg + horizontal padding.
    <div className="mx-auto max-w-[1400px] space-y-6 pb-4 text-white">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
          Admin · Onboarding
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Bulk create accounts</h1>
        <p className="mt-1.5 text-[13px] text-white">
          Paste or type email addresses to create accounts in one go — for a college cohort, a team,
          or anyone. Everyone gets the same temporary password and changes it at{' '}
          <span className="text-white">Settings → Security</span> on first login.
        </p>
      </header>

      {/*
        Two columns from lg.

        The page was a 768px ribbon: a textarea narrower than a phone's on a
        2,700px screen, with the password, the access toggle and the button
        stacked 700px below the list they apply to. Paste on the left, the
        settings that govern the batch on the right, so you can see both at
        once and check the password before you commit.
      */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start lg:gap-6">
      {/* Emails */}
      <section className="space-y-2">
        <label className="text-[13px] font-medium text-white">Email addresses</label>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={
            'jordan@example.com\nsam@example.com, alex@example.com\n…paste a whole list, any separators'
          }
          className="w-full min-h-[260px] rounded-xl border border-white/[0.14] bg-white/[0.06] p-3.5 font-mono text-sm text-white outline-none transition-colors placeholder:text-white/30 hover:bg-white/[0.08] focus:border-elec-yellow focus:ring-0 lg:min-h-[340px]"
        />
        {/*
          The counts as a strip, not a line of small text.

          "0 valid" in 12px grey was the only feedback on a page whose whole
          job is parsing a pasted list, and below it sat 500px of nothing.
          Three cells you can read at a glance, and the addresses themselves
          listed underneath, so you can see what is actually about to be
          created before you commit to it.
        */}
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.14] bg-white/[0.10]">
          {[
            { label: 'Ready', value: parsed.valid.length, tone: 'text-emerald-400' },
            { label: 'Duplicates', value: parsed.dupes, tone: 'text-white' },
            { label: 'Not an email', value: parsed.invalid.length, tone: 'text-amber-400' },
          ].map((c) => (
            <div key={c.label} className="bg-[hsl(0_0%_11%)] px-4 py-3">
              <span className={`block text-[22px] font-semibold leading-none tabular-nums ${c.tone}`}>
                {c.value}
              </span>
              <span className="mt-1 block text-[11px] text-white">{c.label}</span>
            </div>
          ))}
        </div>

        {parsed.valid.length > 0 && (
          <div className="rounded-xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-3.5">
            <p className="text-[12px] font-semibold text-white">
              These {parsed.valid.length === 1 ? 'account' : `${parsed.valid.length} accounts`} will
              be created
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {parsed.valid.slice(0, 40).map((email) => (
                <span
                  key={email}
                  className="rounded-full border border-white/[0.12] bg-white/[0.06] px-2.5 py-1 font-mono text-[11.5px] text-white"
                >
                  {email}
                </span>
              ))}
              {parsed.valid.length > 40 && (
                <span className="px-1 py-1 text-[11.5px] text-white">
                  and {parsed.valid.length - 40} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="hidden flex-wrap gap-3 text-[12px]">
          <span className="text-emerald-400">{parsed.valid.length} valid</span>
          {parsed.dupes > 0 && (
            <span className="text-white">
              {parsed.dupes} duplicate{parsed.dupes > 1 ? 's' : ''}
            </span>
          )}
          {parsed.invalid.length > 0 && (
            <span className="text-amber-400">{parsed.invalid.length} not an email</span>
          )}
        </div>
        {parsed.invalid.length > 0 && (
          <p className="text-[11px] text-amber-400/80 break-words">
            Ignored: {parsed.invalid.slice(0, 8).join(', ')}
            {parsed.invalid.length > 8 ? '…' : ''}
          </p>
        )}
      </section>

      {/* Password */}
            <div className="mt-6 space-y-5 lg:mt-0">
      <section className="space-y-2">
        <label className="text-[13px] font-medium text-white">Shared temporary password</label>
        <div className="flex gap-2">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputCn} font-mono`}
          />
          <button
            type="button"
            onClick={() => setPassword(genPassword())}
            className="flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.06] px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.10] touch-manipulation"
          >
            <RefreshCw className="h-4 w-4" /> New
          </button>
        </div>
        <p className="text-[11px] text-white">
          Min 8 characters. Everyone in this batch gets this password.
        </p>
      </section>

      {/* Grant access */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-3.5">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white">Grant free access</p>
            <p className="text-[11.5px] text-white mt-0.5">
              So they can use the app straight away (no paywall). Recommended for cohorts.
            </p>
          </div>
          <Switch checked={grantAccess} onCheckedChange={setGrantAccess} />
        </div>
        {grantAccess && (
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Cwmbran College — Level 2 cohort"
            className={inputCn}
            aria-label="Reason for free access"
          />
        )}
      </section>

      {/* Action */}
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        disabled={isCreating || parsed.valid.length === 0 || password.length < 8}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[14px] font-semibold transition-colors touch-manipulation enabled:bg-elec-yellow enabled:text-black enabled:hover:bg-elec-yellow/90 disabled:cursor-not-allowed disabled:border disabled:border-white/[0.12] disabled:bg-white/[0.04] disabled:text-white"
      >
        {isCreating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Creating {parsed.valid.length} accounts…
          </>
        ) : (
          `Create ${parsed.valid.length} account${parsed.valid.length === 1 ? '' : 's'}`
        )}
      </button>
      </div>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.1] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Create {parsed.valid.length} account{parsed.valid.length === 1 ? '' : 's'}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white space-y-1">
              <span className="block">
                This creates {parsed.valid.length} live account
                {parsed.valid.length === 1 ? '' : 's'}, all with the password{' '}
                <span className="font-mono text-white">{password}</span>.
              </span>
              <span className="block">
                {grantAccess
                  ? 'They will be granted free access immediately.'
                  : 'They will NOT be granted free access (they may hit the paywall).'}
              </span>
              <span className="block text-white">
                Anyone who already has an account is skipped. This can’t be undone in bulk.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/[0.06] border-white/[0.1] text-white hover:bg-white/[0.1] hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCreate}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Create {parsed.valid.length}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Results */}
      {result && (
        <section className="space-y-3 rounded-xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-[13px]">
              <span className="text-emerald-400 font-semibold">
                {result.summary.created} created
              </span>
              <span className="text-white">{result.summary.skipped} skipped</span>
              {result.summary.failed > 0 && (
                <span className="text-red-400">{result.summary.failed} failed</span>
              )}
            </div>
            {result.created.length > 0 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={copyCredentials}
                  className="h-11 sm:h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.1] text-white flex items-center gap-1.5 text-[12.5px] touch-manipulation"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}{' '}
                  Copy logins
                </button>
                <button
                  type="button"
                  onClick={downloadCredentials}
                  className="h-11 sm:h-9 px-3 rounded-lg bg-elec-yellow text-black flex items-center gap-1.5 text-[12.5px] font-semibold touch-manipulation"
                >
                  <Download className="h-4 w-4" /> CSV
                </button>
              </div>
            )}
          </div>
          {result.skipped.length > 0 && (
            <div className="text-[12px] text-white">
              <p className="font-medium text-white mb-1">Skipped</p>
              {result.skipped.map((s) => (
                <p key={s.email}>
                  {s.email} — {s.reason}
                </p>
              ))}
            </div>
          )}
          {result.failed.length > 0 && (
            <div className="text-[12px] text-red-400/80">
              <p className="font-medium text-red-400 mb-1">Failed</p>
              {result.failed.map((s) => (
                <p key={s.email}>
                  {s.email} — {s.reason}
                </p>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
