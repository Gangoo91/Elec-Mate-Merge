import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

/**
 * AddToEicrSheet — turn an Elec-AI answer into an EICR observation.
 *
 * Lists the user's open EICR reports; picking one appends a defect
 * observation (the app's live key is `data.defectObservations` — the bare
 * `observations` array is legacy) with the classification code, description
 * and cited regulations pre-filled from the answer. The electrician confirms
 * the code via chips before saving — the AI's suggestion is a default, never
 * a decision.
 *
 * Concurrency: the EICR autosave stack guards report writes with
 * `edit_version`. This append does the same — fetch data + version, write
 * back guarded by `.eq('edit_version', …)`, one retry on conflict — so a
 * chat-side append can neither clobber nor be clobbered by an open editor.
 */

interface EicrRow {
  id: string;
  report_id: string;
  client_name: string | null;
  installation_address: string | null;
  status: string | null;
  updated_at: string | null;
}

interface AddToEicrSheetProps {
  isOpen: boolean;
  onClose: () => void;
  /** The AI answer to convert. */
  answer: string;
  /** The question that produced it — becomes the observation item context. */
  question?: string;
  citedRegulations?: string[];
}

const CODES = ['C1', 'C2', 'C3', 'FI'] as const;
type Code = (typeof CODES)[number];

/** First classification code the answer commits to, as the default chip. */
export function detectCode(text: string): Code | null {
  const m = text.match(/\b(C1|C2|C3|FI)\b/);
  return (m?.[1] as Code) ?? null;
}

/** One-line observation text: the verdict line if present, else the question. */
function buildDescription(answer: string, question?: string): string {
  const verdict = answer.match(/\*\*(?:Verdict|Answer|Bottom line)\s*:?\*\*\s*(.+?)(\r?\n|$)/i);
  const line = verdict?.[1]?.replace(/\*\*/g, '').trim();
  if (line) return line.slice(0, 500);
  return (question || answer).replace(/\*\*/g, '').trim().slice(0, 500);
}

export const AddToEicrSheet = memo(function AddToEicrSheet({
  isOpen,
  onClose,
  answer,
  question,
  citedRegulations,
}: AddToEicrSheetProps) {
  const [reports, setReports] = useState<EicrRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const detected = useMemo(() => detectCode(answer), [answer]);
  const [code, setCode] = useState<Code>(detected ?? 'C3');

  useEffect(() => {
    if (isOpen) setCode(detectCode(answer) ?? 'C3');
  }, [isOpen, answer]);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setIsLoading(true);

    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          if (!cancelled) {
            setReports([]);
            setIsLoading(false);
          }
          return;
        }
        const { data, error } = await supabase
          .from('reports')
          .select('id, report_id, client_name, installation_address, status, updated_at')
          .eq('user_id', user.id)
          .eq('report_type', 'eicr')
          .neq('status', 'completed')
          .is('deleted_at', null)
          .order('updated_at', { ascending: false })
          .limit(10);
        if (error) throw error;
        if (!cancelled) setReports((data ?? []) as EicrRow[]);
      } catch (err) {
        console.error('[AddToEicrSheet] load failed', err);
        if (!cancelled) toast.error('Could not load your EICRs');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const handleAdd = useCallback(
    async (report: EicrRow) => {
      if (savingId) return;
      setSavingId(report.id);

      const observation = {
        id:
          typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        item: (question || 'Elec-AI finding').replace(/\*\*/g, '').slice(0, 200),
        defectCode: code,
        description: buildDescription(answer, question),
        recommendation: '',
        regulation: (citedRegulations ?? []).slice(0, 5).join(', '),
        rectified: false,
        source: 'elec-ai',
      };

      // Version-guarded append with one retry on conflict.
      const attempt = async (): Promise<'ok' | 'conflict' | 'error'> => {
        const { data: row, error: readErr } = await supabase
          .from('reports')
          .select('data, edit_version')
          .eq('id', report.id)
          .single();
        if (readErr || !row) return 'error';

        const current = (row.data ?? {}) as Record<string, unknown>;
        const existing = Array.isArray(current.defectObservations)
          ? (current.defectObservations as unknown[])
          : [];
        const nextData = { ...current, defectObservations: [...existing, observation] };
        const version = (row as { edit_version: number | null }).edit_version ?? 0;

        const { data: updated, error: writeErr } = await supabase
          .from('reports')
          .update({
            data: JSON.parse(JSON.stringify(nextData)),
            edit_version: version + 1,
            updated_at: new Date().toISOString(),
          })
          .eq('id', report.id)
          .eq('edit_version', version)
          .select('id');
        if (writeErr) return 'error';
        return updated && updated.length > 0 ? 'ok' : 'conflict';
      };

      try {
        let result = await attempt();
        if (result === 'conflict') result = await attempt();

        if (result === 'ok') {
          toast.success(`Added as a ${code} observation`, {
            description: report.client_name || report.report_id,
          });
          onClose();
        } else if (result === 'conflict') {
          toast.error('That EICR is being edited right now', {
            description: 'Finish the edit and try again.',
          });
        } else {
          toast.error('Could not add the observation — try again in a moment');
        }
      } finally {
        setSavingId(null);
      }
    },
    [answer, citedRegulations, code, onClose, question, savingId]
  );

  return (
    <Sheet open={isOpen} onOpenChange={(next) => !next && onClose()}>
      <SheetContent
        side="bottom"
        hideCloseButton
        className={cn(
          'bg-elec-dark border-white/[0.08] text-white p-0 flex flex-col',
          'h-[85vh] rounded-t-2xl'
        )}
      >
        {/* Header */}
        <div className="relative shrink-0 px-5 pt-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-[17px] font-semibold text-white tracking-tight">
                Add as EICR observation
              </h2>
              <p className="mt-1 text-[12.5px] text-white leading-relaxed">
                Goes onto the report's observations with the code and cited regs pre-filled.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 h-9 px-3.5 rounded-full text-[12px] font-medium text-white bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.10] hover:border-white/[0.22] active:scale-[0.97] transition-all touch-manipulation [-webkit-tap-highlight-color:transparent]"
              aria-label="Close"
            >
              Close
            </button>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/40 to-elec-yellow/0"
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Classification — the electrician's call, AI suggestion pre-selected */}
          <div>
            <h3 className="text-[13px] font-semibold tracking-tight text-elec-yellow">
              Classification code
            </h3>
            <div className="mt-2 flex gap-2">
              {CODES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCode(c)}
                  aria-pressed={code === c}
                  className={cn(
                    'h-11 flex-1 rounded-xl border text-[14px] font-semibold transition-all touch-manipulation [-webkit-tap-highlight-color:transparent] active:scale-[0.97]',
                    code === c
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-white/[0.12] bg-white/[0.06] text-white hover:border-white/[0.22]'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            {detected && (
              <p className="mt-1.5 text-[11.5px] text-white">
                {detected} suggested from the answer — change it if you disagree.
              </p>
            )}
          </div>

          <div>
            <h3 className="text-[13px] font-semibold tracking-tight text-elec-yellow">
              Add to which EICR?
            </h3>
            <div className="mt-2 space-y-2">
              {isLoading && (
                <div className="space-y-2">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="h-16 rounded-2xl border border-white/[0.12] bg-white/[0.05] animate-pulse"
                    />
                  ))}
                </div>
              )}

              {!isLoading && reports.length === 0 && (
                <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.03] px-4 py-6 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                  <div className="text-[14px] font-semibold text-white">No open EICRs</div>
                  <p className="mt-2 text-[13px] text-white leading-relaxed">
                    Start an EICR in Inspection &amp; Testing, then add this observation to it.
                  </p>
                </div>
              )}

              {!isLoading &&
                reports.map((report) => {
                  const saving = savingId === report.id;
                  const subtitle = [report.client_name, report.installation_address]
                    .map((x) => x?.trim())
                    .filter(Boolean)
                    .join(' · ');
                  return (
                    <button
                      key={report.id}
                      type="button"
                      disabled={!!savingId}
                      onClick={() => handleAdd(report)}
                      className={cn(
                        'w-full text-left rounded-2xl px-4 py-3 min-h-11',
                        'border border-elec-yellow/35 bg-gradient-to-br from-white/[0.10] via-white/[0.06] to-white/[0.04]',
                        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]',
                        'transition-[background-image,border-color,transform] duration-150 ease-out',
                        'hover:border-elec-yellow/60 hover:from-white/[0.14] active:scale-[0.98]',
                        'touch-manipulation [-webkit-tap-highlight-color:transparent]',
                        'disabled:opacity-60 disabled:cursor-not-allowed'
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                            {report.report_id}
                          </div>
                          <div className="mt-0.5 text-[14px] font-semibold text-white truncate">
                            {subtitle || 'Untitled EICR'}
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          {report.updated_at && (
                            <div className="text-[11px] text-white">
                              {formatDistanceToNow(new Date(report.updated_at), {
                                addSuffix: true,
                              })}
                            </div>
                          )}
                          <div className="mt-1 text-[12px] font-semibold text-elec-yellow">
                            {saving ? 'Adding…' : 'Add →'}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

export default AddToEicrSheet;
