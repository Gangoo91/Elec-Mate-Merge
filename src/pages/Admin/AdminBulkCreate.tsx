import { useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, Copy, Check, UserPlus } from 'lucide-react';
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

  const inputCn =
    'w-full h-11 px-3 rounded-lg bg-[hsl(0_0%_8%)] border border-white/[0.1] text-white text-sm focus:border-elec-yellow focus:ring-0 outline-none';

  return (
    // AdminPanel's <Outlet> wrapper already provides bg + horizontal padding.
    <div className="max-w-3xl mx-auto space-y-6 text-white pb-4">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Admin · Onboarding
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight flex items-center gap-2">
          <UserPlus className="h-6 w-6 text-elec-yellow" /> Bulk create accounts
        </h1>
        <p className="mt-1.5 text-[13px] text-white/55">
          Paste or type email addresses to create accounts in one go — for a college cohort, a team,
          or anyone. Everyone gets the same temporary password and changes it at{' '}
          <span className="text-white/80">Settings → Security</span> on first login.
        </p>
      </header>

      {/* Emails */}
      <section className="space-y-2">
        <label className="text-[13px] font-medium text-white">Email addresses</label>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={
            'jordan@example.com\nsam@example.com, alex@example.com\n…paste a whole list, any separators'
          }
          className="w-full min-h-[160px] p-3 rounded-lg bg-[hsl(0_0%_8%)] border border-white/[0.1] text-white text-sm focus:border-elec-yellow focus:ring-0 outline-none font-mono"
        />
        <div className="flex flex-wrap gap-3 text-[12px]">
          <span className="text-emerald-400">{parsed.valid.length} valid</span>
          {parsed.dupes > 0 && (
            <span className="text-white/45">
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
            className="h-11 px-3 rounded-lg bg-white/[0.06] border border-white/[0.1] text-white shrink-0 flex items-center gap-1.5 text-[13px]"
          >
            <RefreshCw className="h-4 w-4" /> New
          </button>
        </div>
        <p className="text-[11px] text-white/40">
          Min 8 characters. Everyone in this batch gets this password.
        </p>
      </section>

      {/* Grant access */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white">Grant free access</p>
            <p className="text-[11.5px] text-white/55 mt-0.5">
              So they can use the app straight away (no paywall). Recommended for cohorts.
            </p>
          </div>
          <Switch checked={grantAccess} onCheckedChange={setGrantAccess} />
        </div>
        {grantAccess && (
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason (e.g. Cwmbran College — Level 2 cohort)"
            className={inputCn}
          />
        )}
      </section>

      {/* Action */}
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        disabled={isCreating || parsed.valid.length === 0 || password.length < 8}
        className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isCreating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Creating {parsed.valid.length} accounts…
          </>
        ) : (
          `Create ${parsed.valid.length} account${parsed.valid.length === 1 ? '' : 's'}`
        )}
      </button>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.1] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Create {parsed.valid.length} account{parsed.valid.length === 1 ? '' : 's'}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/60 space-y-1">
              <span className="block">
                This creates {parsed.valid.length} live account
                {parsed.valid.length === 1 ? '' : 's'}, all with the password{' '}
                <span className="font-mono text-white/85">{password}</span>.
              </span>
              <span className="block">
                {grantAccess
                  ? 'They will be granted free access immediately.'
                  : 'They will NOT be granted free access (they may hit the paywall).'}
              </span>
              <span className="block text-white/40">
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
        <section className="space-y-3 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.08] p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-[13px]">
              <span className="text-emerald-400 font-semibold">
                {result.summary.created} created
              </span>
              <span className="text-white/50">{result.summary.skipped} skipped</span>
              {result.summary.failed > 0 && (
                <span className="text-red-400">{result.summary.failed} failed</span>
              )}
            </div>
            {result.created.length > 0 && (
              <button
                type="button"
                onClick={copyCredentials}
                className="h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.1] text-white flex items-center gap-1.5 text-[12.5px]"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}{' '}
                Copy logins
              </button>
            )}
          </div>
          {result.skipped.length > 0 && (
            <div className="text-[12px] text-white/55">
              <p className="font-medium text-white/70 mb-1">Skipped</p>
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
