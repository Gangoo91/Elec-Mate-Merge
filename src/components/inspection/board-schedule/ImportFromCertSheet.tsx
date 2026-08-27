import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  listBoardsOnCert,
  buildScheduleFromCert,
  type CertBoardOption,
} from '@/utils/board-schedule-import';
import type { BoardScheduleData } from '@/utils/generate-board-schedule-pdf';

interface CertRow {
  report_id: string;
  report_type: string | null;
  certificate_number: string | null;
  client_name: string | null;
  updated_at: string | null;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (board: BoardScheduleData, threePhase: boolean) => void;
}

const TYPE_LABEL: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
};

/**
 * Pick a previous certificate, then a board on it, and pull the schedule
 * across. Everything the board schedule needs is already recorded per circuit
 * on a cert, so this removes the retyping entirely.
 *
 * ⚠️ Deliberately TWO steps against the database. The cert list selects only
 * its identifying columns; `data` (which holds every circuit and can be very
 * large) is fetched for the ONE cert the user picks. Selecting `data` for the
 * whole list would pull megabytes to render a few lines of text.
 */
export default function ImportFromCertSheet({ open, onOpenChange, onImport }: Props) {
  const [loading, setLoading] = useState(false);
  const [certs, setCerts] = useState<CertRow[]>([]);
  const [chosen, setChosen] = useState<CertRow | null>(null);
  const [boards, setBoards] = useState<CertBoardOption[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [certData, setCertData] = useState<any>(null);

  useEffect(() => {
    if (!open) return;
    // Reset each time it opens — a stale half-finished selection is confusing.
    setChosen(null);
    setBoards([]);
    setCertData(null);

    (async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('reports')
          .select('report_id, report_type, certificate_number, client_name, updated_at')
          .in('report_type', ['eicr', 'eic', 'minor-works'])
          .is('deleted_at', null)
          .order('updated_at', { ascending: false })
          .limit(50);
        if (error) throw error;
        setCerts((data as CertRow[]) ?? []);
      } catch (err) {
        console.error('[ImportFromCert] list failed:', err);
        toast.error('Could not load your certificates');
      } finally {
        setLoading(false);
      }
    })();
  }, [open]);

  const pickCert = async (cert: CertRow) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('data')
        .eq('report_id', cert.report_id)
        .single();
      if (error) throw error;

      const payload = data?.data;
      const found = listBoardsOnCert(payload);

      if (found.length === 0) {
        toast.error('That certificate has no circuits recorded');
        return;
      }

      setCertData(payload);
      setChosen(cert);
      setBoards(found);

      // Only one board and nothing to choose — go straight through.
      if (found.length === 1) applyBoard(payload, found[0]);
    } catch (err) {
      console.error('[ImportFromCert] load failed:', err);
      toast.error('Could not open that certificate');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const applyBoard = (payload: any, option: CertBoardOption) => {
    const { board, threePhase } = buildScheduleFromCert(payload, option.id);
    onImport(board, threePhase);
    onOpenChange(false);
    toast.success(
      `Imported ${board.circuits.length} ${board.circuits.length === 1 ? 'circuit' : 'circuits'}`
    );
  };

  const rowCn =
    'w-full text-left rounded-xl border border-white/[0.14] bg-white/[0.05] p-3 ' +
    'hover:bg-white/[0.1] active:scale-[0.99] transition-colors touch-manipulation';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="px-4 pt-5 pb-3 border-b border-white/[0.12]">
            <h2 className="text-[17px] font-semibold text-white">
              {chosen ? 'Choose a board' : 'Import from a certificate'}
            </h2>
            <p className="text-[13px] text-white mt-0.5">
              {chosen
                ? `${chosen.certificate_number || 'Certificate'} — pick which board to build the schedule from.`
                : 'Pulls the circuits, devices, cable sizes and Zs already recorded, so you do not type them again.'}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
            {loading && <p className="text-[13px] text-white">Loading…</p>}

            {!loading && !chosen && certs.length === 0 && (
              <p className="text-[13px] text-white">
                No EICR, EIC or Minor Works certificates found on your account yet.
              </p>
            )}

            {!loading && !chosen &&
              certs.map((c) => (
                <button key={c.report_id} onClick={() => pickCert(c)} className={rowCn}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[14px] font-semibold text-white truncate">
                      {c.client_name || 'No client name'}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.12] text-white flex-shrink-0">
                      {TYPE_LABEL[c.report_type ?? ''] ?? c.report_type}
                    </span>
                  </div>
                  <div className="text-[12px] text-white mt-1">
                    {c.certificate_number || '—'}
                    {c.updated_at
                      ? ` · ${new Date(c.updated_at).toLocaleDateString('en-GB')}`
                      : ''}
                  </div>
                </button>
              ))}

            {!loading && chosen &&
              boards.map((b) => (
                <button
                  key={b.id || b.label}
                  onClick={() => applyBoard(certData, b)}
                  className={cn(rowCn, b.circuitCount === 0 && 'opacity-60')}
                  disabled={b.circuitCount === 0}
                >
                  <div className="text-[14px] font-semibold text-white">{b.label}</div>
                  <div className="text-[12px] text-white mt-1">
                    {b.circuitCount} {b.circuitCount === 1 ? 'circuit' : 'circuits'}
                  </div>
                </button>
              ))}
          </div>

          <div className="px-4 py-3 border-t border-white/[0.12] pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <button
              onClick={() => (chosen ? setChosen(null) : onOpenChange(false))}
              className="h-11 w-full rounded-xl border border-white/[0.16] bg-white/[0.06] text-[14px] font-semibold text-white touch-manipulation active:scale-[0.99]"
            >
              {chosen ? 'Back to certificates' : 'Cancel'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
