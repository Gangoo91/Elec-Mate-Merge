import { memo, useCallback, useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface ReportRow {
  id: string;
  report_type: string | null;
  report_id: string | null;
  certificate_number: string | null;
  client_name: string | null;
  installation_address: string | null;
  status: string | null;
  updated_at: string | null;
  data: Record<string, unknown> | null;
}

interface SaveToJobSheetProps {
  /** Controls visibility. */
  isOpen: boolean;
  /** Close callback. */
  onClose: () => void;
  /** The AI answer to attach. */
  answer: string;
  /** Optional question that produced the answer — helps contextualise. */
  question?: string;
  /** Optional cited regulation numbers. */
  citedRegulations?: string[];
}

interface SavedNote {
  id: string;
  question: string;
  answer: string;
  cited_regulations?: string[];
  source: 'elec-ai';
  saved_at: string;
}

function titleCaseType(report_type: string | null): string {
  if (!report_type) return 'Report';
  return report_type
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatUpdatedAgo(value: string | null): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return `${formatDistanceToNow(d, { addSuffix: true })}`;
}

/**
 * SaveToJobSheet — Bottom sheet listing the user's active reports so the
 * current AI answer can be attached as an observation.
 *
 * Writes are non-destructive: we append to `reports.data.ai_saved_notes` (a
 * jsonb array). If the backend later adds a dedicated `ai_saved_notes`
 * table, the migration SQL is shipped in the task report.
 */
export const SaveToJobSheet = memo(function SaveToJobSheet({
  isOpen,
  onClose,
  answer,
  question,
  citedRegulations,
}: SaveToJobSheetProps) {
  const [reports, setReports] = useState<ReportRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

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
            toast.error('Sign in required');
          }
          return;
        }

        const { data, error } = await supabase
          .from('reports')
          .select(
            'id, report_type, report_id, certificate_number, client_name, installation_address, status, updated_at, data'
          )
          .eq('user_id', user.id)
          .is('deleted_at', null)
          .neq('status', 'completed')
          .order('updated_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        if (cancelled) return;
        setReports((data ?? []) as unknown as ReportRow[]);
      } catch (err) {
        console.error('[SaveToJobSheet] load reports failed', err);
        if (!cancelled) toast.error('Could not load reports');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const handleSave = useCallback(
    async (report: ReportRow) => {
      if (savingId) return;
      setSavingId(report.id);

      try {
        const note: SavedNote = {
          id:
            typeof crypto !== 'undefined' && 'randomUUID' in crypto
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
          question: question?.trim() || 'Elec-AI answer',
          answer: answer.trim(),
          cited_regulations: citedRegulations,
          source: 'elec-ai',
          saved_at: new Date().toISOString(),
        };

        const existingData = (report.data ?? {}) as Record<string, unknown>;
        const existingNotes = Array.isArray(
          (existingData as { ai_saved_notes?: unknown }).ai_saved_notes
        )
          ? ((existingData as { ai_saved_notes?: SavedNote[] }).ai_saved_notes as SavedNote[])
          : [];

        const nextData = {
          ...existingData,
          ai_saved_notes: [note, ...existingNotes].slice(0, 50),
        };

        const { error } = await supabase
          .from('reports')
          .update({ data: nextData, updated_at: new Date().toISOString() })
          .eq('id', report.id);

        if (error) throw error;

        toast.success('Saved to report', {
          description: `${titleCaseType(report.report_type)} · ${
            report.report_id || report.certificate_number || 'untitled'
          }`,
        });
        onClose();
      } catch (err) {
        console.error('[SaveToJobSheet] save failed', err);
        toast.error('Failed to save to report');
      } finally {
        setSavingId(null);
      }
    },
    [answer, citedRegulations, onClose, question, savingId]
  );

  return (
    <Sheet open={isOpen} onOpenChange={(next) => !next && onClose()}>
      <SheetContent
        side="bottom"
        hideCloseButton
        className={cn(
          'bg-[hsl(0_0%_8%)] border-white/[0.06] text-white p-0 flex flex-col',
          'h-[75vh] rounded-t-2xl'
        )}
      >
        {/* Header */}
        <div className="shrink-0 px-5 pt-5 pb-4 border-b border-white/[0.06]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
                Save to a report
              </div>
              <div className="mt-1.5 text-[15px] font-semibold text-white tracking-tight">
                Attach this Elec-AI answer
              </div>
              <p className="mt-1 text-[12px] text-white/55 leading-relaxed">
                Picks one of your in-progress reports. The answer is attached
                as an observation under <span className="text-white/70">ai_saved_notes</span>.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 h-8 px-3 rounded-full text-[12px] font-medium text-white/70 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors touch-manipulation"
              aria-label="Close"
            >
              Close ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
          {isLoading && (
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] animate-pulse"
                />
              ))}
            </div>
          )}

          {!isLoading && reports.length === 0 && (
            <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-6 text-center">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
                No active reports
              </div>
              <p className="mt-2 text-[13px] text-white/70 leading-relaxed">
                Start a new certificate or minor works report, then come back
                here to attach this answer.
              </p>
            </div>
          )}

          {!isLoading &&
            reports.map((report) => {
              const saving = savingId === report.id;
              return (
                <button
                  key={report.id}
                  type="button"
                  disabled={!!savingId}
                  onClick={() => handleSave(report)}
                  className={cn(
                    'w-full text-left rounded-2xl px-4 py-3',
                    'bg-[hsl(0_0%_12%)] border border-white/[0.06]',
                    'hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation',
                    'disabled:opacity-60 disabled:cursor-not-allowed',
                    'min-h-11'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
                        {titleCaseType(report.report_type)}
                      </div>
                      <div className="mt-0.5 text-[14px] font-semibold text-white truncate">
                        {report.report_id ||
                          report.certificate_number ||
                          'Untitled report'}
                      </div>
                      <div className="mt-0.5 text-[12px] text-white/70 truncate">
                        {report.client_name ||
                          report.installation_address ||
                          'No client on file'}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-[11px] text-white/55">
                        {formatUpdatedAgo(report.updated_at)}
                      </div>
                      <div className="mt-1 text-[11px] font-medium text-elec-yellow/90">
                        {saving ? 'Saving…' : 'Save →'}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      </SheetContent>
    </Sheet>
  );
});

export default SaveToJobSheet;
