import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { FormCard, Field, inputClass } from '@/components/employer/editorial';
import { toast } from 'sonner';

/* ELE-2065 retentions: on a commercial invoice, the share the customer holds
   back until a release date (settings.retention = { percent, amount,
   release_date, released_at }). Who owes me leaves it out of what is chased,
   and the office gets a reminder on the release date (run_firm_money_chase). */

interface Retention {
  percent?: number;
  amount?: number;
  release_date?: string | null;
  released_at?: string | null;
}

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0);

export function RetentionControl({ invoiceId, total }: { invoiceId: string; total: number }) {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ['invoice-retention', invoiceId],
    queryFn: async () => {
      const { data: row } = await supabase
        .from('quotes')
        .select('settings')
        .eq('id', invoiceId)
        .maybeSingle();
      return ((row as { settings?: Record<string, unknown> } | null)?.settings ?? {}) as Record<
        string,
        unknown
      >;
    },
  });
  const current = (data?.retention ?? null) as Retention | null;
  const [editing, setEditing] = useState(false);
  const [percent, setPercent] = useState('5');
  const [release, setRelease] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (current) {
      setPercent(String(current.percent ?? ''));
      setRelease(current.release_date ?? '');
    }
  }, [current]);

  const save = async (next: Retention | null) => {
    setSaving(true);
    try {
      const { data: row, error } = await supabase
        .from('quotes')
        .select('settings')
        .eq('id', invoiceId)
        .maybeSingle();
      if (error || !row) throw new Error('Could not load the invoice');
      const settings = { ...((row as { settings?: Record<string, unknown> }).settings ?? {}) };
      if (next) settings.retention = next;
      else delete settings.retention;
      const { error: upErr } = await supabase
        .from('quotes')
        .update({ settings: settings as never })
        .eq('id', invoiceId);
      if (upErr) throw upErr;
      await Promise.all([
        qc.invalidateQueries({ queryKey: ['invoice-retention', invoiceId] }),
        qc.invalidateQueries({ queryKey: ['firm-debtors'] }),
      ]);
      setEditing(false);
      toast.success(
        next
          ? next.released_at
            ? 'Retention marked as released'
            : 'Retention saved'
          : 'Retention removed'
      );
    } catch (e) {
      toast.error((e as Error).message || 'Could not save the retention');
    } finally {
      setSaving(false);
    }
  };

  const pct = Math.min(100, Math.max(0, Number(percent) || 0));
  const amount = Math.round(total * pct) / 100;
  const btn =
    'inline-flex h-11 items-center rounded-full border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06] disabled:opacity-50';

  if (!editing && !current) {
    return (
      <FormCard bleed eyebrow="Retention">
        <p className="text-[13px] text-white">
          Commercial job? Record the retention the customer holds back, with its release date. It is
          not chased until it is due, and you get a reminder that day.
        </p>
        <button type="button" className={btn} onClick={() => setEditing(true)}>
          Add a retention
        </button>
      </FormCard>
    );
  }

  if (!editing && current) {
    const held = current.amount ?? Math.round(total * (current.percent ?? 0)) / 100;
    return (
      <FormCard bleed eyebrow="Retention">
        <p className="text-[14px] text-white">
          {current.percent}% held, {gbp(held)}
          {current.released_at
            ? `, released ${new Date(current.released_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
            : current.release_date
              ? `, due for release ${new Date(`${current.release_date}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
              : ', no release date'}
          .
        </p>
        <div className="flex flex-wrap gap-2">
          {!current.released_at && (
            <button
              type="button"
              className={btn}
              disabled={saving}
              onClick={() => save({ ...current, released_at: new Date().toISOString() })}
            >
              Mark released
            </button>
          )}
          <button type="button" className={btn} onClick={() => setEditing(true)}>
            Change
          </button>
        </div>
      </FormCard>
    );
  }

  return (
    <FormCard bleed eyebrow="Retention">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Retention %">
          <Input
            type="number"
            inputMode="decimal"
            min={0}
            max={100}
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Release date">
          <Input
            type="date"
            value={release}
            onChange={(e) => setRelease(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>
      <p className="text-[13px] text-white">
        {gbp(amount)} of {gbp(total)} held back.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-full bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation disabled:opacity-50"
          disabled={saving || pct <= 0}
          onClick={() =>
            save({ percent: pct, amount, release_date: release || null, released_at: null })
          }
        >
          Save retention
        </button>
        {current && (
          <button type="button" className={btn} disabled={saving} onClick={() => save(null)}>
            Remove
          </button>
        )}
        <button type="button" className={btn} onClick={() => setEditing(false)}>
          Cancel
        </button>
      </div>
    </FormCard>
  );
}
