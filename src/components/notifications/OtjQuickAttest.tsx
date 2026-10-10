/**
 * OtjQuickAttest (ELE-1713): one-tap attest from the notification itself.
 *
 * Employer sign-off of apprentice hours was built and never used, partly
 * because the bell only opened a page. When a notification names one entry
 * (metadata.entry_id) and that entry is still waiting for this user, the row
 * carries an Attest button. The server decides who may attest
 * (can_confirm_otj_for); the button only shows for entries the inbox RPC
 * returns, so a decided entry or someone without the right never sees it.
 * Sending back still needs a reason, so it stays on the review screen.
 */
import { useState, type MouseEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  useEmployerOtjAttestations,
  useDecideOtjAttestation,
} from '@/hooks/useEmployerOtjAttestations';

const OTJ_TYPES = new Set(['apprentice_hours_submitted', 'apprentice_hours_to_confirm']);

interface NotificationLike {
  type: string;
  metadata?: Record<string, unknown> | null;
}

/** The pending entry a notification is about, or null. */
export function otjEntryIdOf(n: NotificationLike): string | null {
  const meta = n.metadata ?? {};
  const type = OTJ_TYPES.has(n.type) ? n.type : String(meta.source_type ?? '');
  if (!OTJ_TYPES.has(type)) return null;
  const id = meta.entry_id;
  return typeof id === 'string' && /^[0-9a-f-]{36}$/i.test(id) ? id : null;
}

export function OtjQuickAttest({
  entryId,
  onDone,
}: {
  entryId: string;
  /** Called after a successful attest, e.g. to mark the notification read. */
  onDone?: () => void;
}) {
  const { data: pending = [] } = useEmployerOtjAttestations(true);
  const decide = useDecideOtjAttestation();
  const [done, setDone] = useState(false);
  const entry = pending.find((e) => e.entryId === entryId);

  if (done) {
    return <p className="mt-2 text-[12.5px] font-semibold text-emerald-400">Attested</p>;
  }
  if (!entry) return null;

  const first = entry.apprenticeName.split(' ')[0] || entry.apprenticeName;
  const attest = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      await decide.mutateAsync({ entryId, decision: 'attest' });
      setDone(true);
      onDone?.();
      toast({
        title: `Attested for ${first}`,
        description: 'It now counts as workplace-attested. Their college still verifies it.',
      });
    } catch (err) {
      toast({
        title: 'Not attested',
        description: (err as Error).message || 'Try again from the review screen.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mt-2.5 flex items-center gap-2">
      <button
        type="button"
        onClick={attest}
        disabled={decide.isPending}
        className="inline-flex h-11 min-w-[96px] items-center justify-center rounded-xl bg-elec-yellow px-4 text-[13.5px] font-semibold text-black touch-manipulation transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        {decide.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Attest'}
      </button>
      <span className="text-[12px] leading-snug text-white">
        or open it to read it first or send it back
      </span>
    </div>
  );
}
