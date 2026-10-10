import { useCallback, useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
} from '@/components/forms/fieldStyles';
import { ChoiceGrid } from '@/components/college/quality/QualityChoices';
import { QBTN, QLIST, QPanel } from '@/components/college/quality/QualityHubKit';
import {
  INTERCHANGE_DATASETS,
  INTERCHANGE_SCOPES,
  type InterchangeDataset,
} from '@/lib/college/interchange';

/* ==========================================================================
   ApiKeysPanel (ELE-1884): read-only API keys for the college's MIS.

   A college admin or head of department (settings.manage) mints a key with
   dataset scopes and a per-minute rate limit. The key is shown ONCE; the
   database keeps only its SHA-256 and the first 12 characters to recognise it
   by. Revoking is immediate and permanent. Every call is in the access log.
   ========================================================================== */

interface KeyRow {
  id: string;
  label: string;
  key_prefix: string;
  scopes: string[];
  rate_limit_per_minute: number;
  created_at: string;
  created_by_name: string | null;
  last_used_at: string | null;
  revoked_at: string | null;
  calls_24h: number;
}

interface LogRow {
  id: number;
  channel: string;
  dataset: string | null;
  status_code: number;
  row_count: number | null;
  detail: string | null;
  created_at: string;
  key_id: string | null;
}

const when = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'never';

export function ApiKeysPanel({ collegeId, canManage }: { collegeId: string; canManage: boolean }) {
  const { toast } = useToast();
  const [keys, setKeys] = useState<KeyRow[]>([]);
  const [log, setLog] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [fresh, setFresh] = useState<{ key: string; label: string } | null>(null);

  const load = useCallback(async () => {
    if (!canManage) return setLoading(false);
    setLoading(true);
    const [k, l] = await Promise.all([
      supabase.rpc('college_api_keys_list' as never, { p_college: collegeId } as never),
      supabase
        .from('college_data_access_log' as never)
        .select('id, channel, dataset, status_code, row_count, detail, created_at, key_id')
        .eq('college_id', collegeId)
        .order('created_at', { ascending: false })
        .limit(12),
    ]);
    setKeys(((k.data as unknown as KeyRow[]) ?? []) as KeyRow[]);
    setLog(((l.data as unknown as LogRow[]) ?? []) as LogRow[]);
    setLoading(false);
  }, [collegeId, canManage]);

  useEffect(() => {
    void load();
  }, [load]);

  const revoke = async (k: KeyRow) => {
    if (!window.confirm(`Revoke "${k.label}"? Anything using it stops working straight away.`))
      return;
    const { error } = await supabase.rpc(
      'college_api_key_revoke' as never,
      { p_key: k.id } as never
    );
    if (error)
      return toast({ title: 'Not revoked', description: error.message, variant: 'destructive' });
    toast({ title: 'Key revoked' });
    void load();
  };

  const live = keys.filter((k) => !k.revoked_at);
  const keyLabel = (id: string | null) => keys.find((k) => k.id === id)?.label ?? 'Export';

  return (
    <QPanel
      title="API keys"
      sub={
        canManage
          ? `${live.length} live ${live.length === 1 ? 'key' : 'keys'}. Each reads only the datasets you tick, for this college only.`
          : 'Only a college admin or head of department can create or revoke keys.'
      }
      action={
        canManage ? (
          <button type="button" className={QBTN} onClick={() => setMinting(true)}>
            Create a key
          </button>
        ) : undefined
      }
    >
      {fresh && (
        <div className="mb-4 rounded-xl border border-elec-yellow p-4" data-testid="api-key-once">
          <p className="text-[13.5px] font-semibold text-white">
            Copy &ldquo;{fresh.label}&rdquo; now. It will not be shown again.
          </p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
            <code className="min-w-0 flex-1 break-all rounded-lg bg-black/40 px-3 py-2.5 font-mono text-[13px] text-white">
              {fresh.key}
            </code>
            <button
              type="button"
              className={QBTN}
              onClick={() => {
                void navigator.clipboard?.writeText(fresh.key);
                toast({ title: 'Key copied' });
              }}
            >
              <Copy className="h-4 w-4" aria-hidden /> Copy
            </button>
            <button type="button" className={QBTN} onClick={() => setFresh(null)}>
              Done
            </button>
          </div>
        </div>
      )}

      {!canManage ? null : loading ? (
        <div className="h-20 animate-pulse rounded-xl bg-white/[0.04]" />
      ) : keys.length === 0 ? (
        <p className="text-[13px] leading-relaxed text-white">
          No keys yet. Create one for your MIS team and send it to them by a secure route, never by
          plain email.
        </p>
      ) : (
        <ul className={cn(QLIST, '!mx-0 !rounded-xl !border')}>
          {keys.map((k) => (
            <li
              key={k.id}
              className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[14px] font-semibold text-white">{k.label}</span>
                  <code className="font-mono text-[12px] text-white">{k.key_prefix}…</code>
                  <span
                    className={cn(
                      'inline-flex h-6 items-center rounded-full border px-2.5 text-[12px] font-semibold',
                      k.revoked_at
                        ? 'border-orange-400/60 text-orange-300'
                        : 'border-emerald-400/60 text-emerald-300'
                    )}
                  >
                    {k.revoked_at ? 'Revoked' : 'Live'}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] leading-snug text-white">
                  Reads {k.scopes.join(', ')} · {k.rate_limit_per_minute} calls a minute ·{' '}
                  {k.calls_24h} calls in 24 hours · last used {when(k.last_used_at)} · created by{' '}
                  {k.created_by_name ?? 'unknown'}
                </p>
              </div>
              {!k.revoked_at && (
                <button
                  type="button"
                  className={cn(QBTN, 'shrink-0')}
                  onClick={() => void revoke(k)}
                >
                  Revoke
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {canManage && log.length > 0 && (
        <div className="mt-5 border-t border-white/[0.08] pt-4">
          <h4 className="text-[13.5px] font-semibold text-white">Recent access</h4>
          <ul className="mt-2 space-y-1.5">
            {log.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-baseline gap-x-2 text-[12.5px] text-white"
              >
                <time className="tabular-nums">{when(r.created_at)}</time>
                <span className="font-semibold">
                  {r.channel === 'api' ? keyLabel(r.key_id) : 'Export'}
                </span>
                <span>{r.dataset ?? 'index'}</span>
                <span className={r.status_code >= 400 ? 'text-orange-300' : 'text-emerald-300'}>
                  {r.status_code}
                </span>
                {r.row_count != null && <span>{r.row_count} rows</span>}
                {r.detail && r.detail !== 'index' && <span>{r.detail.replace(/_/g, ' ')}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <MintKeySheet
        open={minting}
        onOpenChange={setMinting}
        collegeId={collegeId}
        onMinted={(key, label) => {
          setFresh({ key, label });
          void load();
        }}
      />
    </QPanel>
  );
}

function MintKeySheet({
  open,
  onOpenChange,
  collegeId,
  onMinted,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  collegeId: string;
  onMinted: (key: string, label: string) => void;
}) {
  const { toast } = useToast();
  const [label, setLabel] = useState('');
  const [scopes, setScopes] = useState<InterchangeDataset[]>(['learners', 'hours']);
  const [rate, setRate] = useState('60');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setLabel('');
      setScopes(['learners', 'hours']);
      setRate('60');
    }
  }, [open]);

  const toggle = (s: InterchangeDataset) =>
    setScopes((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const rateN = Number(rate);
  const ok = label.trim().length >= 2 && scopes.length > 0 && rateN >= 1 && rateN <= 600;

  const mint = async () => {
    setBusy(true);
    const { data, error } = await supabase.rpc(
      'college_api_key_mint' as never,
      { p_college: collegeId, p_label: label.trim(), p_scopes: scopes, p_rate: rateN } as never
    );
    setBusy(false);
    if (error)
      return toast({
        title: 'Key not created',
        description: error.message,
        variant: 'destructive',
      });
    const out = data as unknown as { key: string };
    onMinted(out.key, label.trim());
    onOpenChange(false);
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="API key"
      title="Create a read-only key"
      description="The key is shown once. We keep only a fingerprint of it, so it cannot be recovered, only revoked and replaced."
      footer={
        <div className="flex w-full gap-2">
          <button
            type="button"
            className={`${buttonSecondaryCn} flex-1 px-4`}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${buttonPrimaryCn} flex-1 px-4`}
            disabled={!ok || busy}
            onClick={() => void mint()}
          >
            {busy ? 'Creating…' : 'Create key'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 pb-4 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label className={labelCn} htmlFor="key-label">
              What it is for
            </label>
            <input
              id="key-label"
              className={inputCn}
              value={label}
              maxLength={80}
              placeholder="For example: MIS nightly sync"
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="key-rate">
              Calls a minute
            </label>
            <input
              id="key-rate"
              className={inputCn}
              inputMode="numeric"
              value={rate}
              onChange={(e) => setRate(e.target.value.replace(/[^0-9]/g, ''))}
            />
            <p className="mt-1 text-[12px] text-white">
              1 to 600. Calls over the limit get a 429 and are logged.
            </p>
          </div>
        </div>
        <div>
          <p className={labelCn}>What it can read</p>
          <ChoiceGrid
            multiple
            className="mt-1"
            label="What it can read"
            options={INTERCHANGE_SCOPES.map((s) => ({
              key: s,
              label: INTERCHANGE_DATASETS.find((d) => d.key === s)?.title ?? s,
            }))}
            selected={scopes}
            onToggle={toggle}
          />
          {scopes.includes('ilr') && (
            <p className="mt-3 text-[12.5px] leading-relaxed text-orange-300">
              ILR fields include date of birth, NI number, ethnicity and LLDD. Only give this to
              your MIS.
            </p>
          )}
        </div>
      </div>
    </FormSheet>
  );
}
