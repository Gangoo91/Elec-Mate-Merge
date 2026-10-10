/**
 * FirmRecordBar — what a firm manager can do with a shared safety record.
 *
 * Site Safety in both hubs (ELE-2031): a worker's record reaches the firm only
 * when it is filed against a firm job. The firm reads it and countersigns it;
 * it never edits it. This bar says so on the record, and holds the
 * countersignature.
 *
 * Personal scope (the Electrical Hub) shows only a countersignature the firm
 * has added, so the worker can see their record was signed off. With no
 * countersignature it renders nothing, so existing screens are unchanged.
 */
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import {
  countersignSafetyRecord,
  useFirmRecordAccess,
  type CountersignTable,
  type FirmRecordFields,
} from './SafetyScope';

interface FirmRecordBarProps {
  table: CountersignTable;
  row: (FirmRecordFields & { id: string }) | null | undefined;
  /** Query keys to refresh after a countersignature changes. */
  invalidate?: readonly unknown[][];
  className?: string;
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function FirmRecordBar({ table, row, invalidate = [], className }: FirmRecordBarProps) {
  const access = useFirmRecordAccess(row);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const [local, setLocal] = useState<{ name: string | null; at: string | null } | null>(null);

  if (!row) return null;
  const signedAt = local ? local.at : (row.firm_countersigned_at ?? null);
  const signedName = local ? local.name : (row.firm_countersigned_name ?? null);

  const act = async (withdraw: boolean) => {
    setBusy(true);
    try {
      const res = await countersignSafetyRecord(table, row.id, withdraw);
      setLocal({ name: res.countersigned_name, at: res.countersigned_at });
      for (const key of invalidate) await queryClient.invalidateQueries({ queryKey: key });
      toast({
        title: withdraw ? 'Countersignature withdrawn' : 'Countersigned',
        description: withdraw ? undefined : 'Signed off for the firm.',
      });
    } catch (err) {
      toast({
        title: 'Not countersigned',
        description: err instanceof Error ? err.message : 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  // Personal scope: only the firm's countersignature, when there is one.
  if (!access.firm) {
    if (!signedAt) return null;
    return (
      <p className={`text-[13px] leading-snug text-white ${className ?? ''}`}>
        Countersigned for your firm by {signedName || 'a manager'} on {fmt(signedAt)}.
      </p>
    );
  }

  // A record the firm made: nothing to say unless it has been countersigned.
  if (!access.sharedByWorker && !signedAt) return null;

  return (
    <div
      className={`rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 space-y-3 ${className ?? ''}`}
    >
      {access.sharedByWorker && (
        <p className="text-[13px] leading-snug text-white">
          Filed by a member of your team against one of your jobs. You can read it and countersign
          it. Only the person who made it can change it.
        </p>
      )}
      {signedAt ? (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[13px] font-medium text-white">
            Countersigned by {signedName || 'a manager'} on {fmt(signedAt)}
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => void act(true)}
            className="h-11 rounded-xl border border-white/[0.14] px-4 text-[13px] font-medium text-white touch-manipulation disabled:opacity-50"
          >
            {busy ? 'Saving…' : 'Withdraw'}
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => void act(false)}
          className="h-11 w-full rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation disabled:opacity-50 sm:w-auto"
        >
          {busy ? 'Countersigning…' : 'Countersign for the firm'}
        </button>
      )}
    </div>
  );
}

export default FirmRecordBar;
