import { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chipBase, chipOff, chipOn, eyebrowCn } from '@/components/shared/surfaceStyles';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import { useLinkableProjects } from '@/hooks/useLinkableProjects';
import {
  outstandingObservations,
  useAlreadyRaised,
  useRemedialItems,
  codePriority,
  type DefectObservation,
  type RemedialTarget,
} from '@/hooks/useRemedialItems';

interface RaiseRemedialItemsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportId: string;
  observations: DefectObservation[];
  /** Job the certificate already belongs to, if any. */
  projectId?: string | null;
  customerId?: string | null;
  customerName?: string | null;
  /** Site address, used to name and locate a new remedial job. */
  location?: string | null;
  onRaised?: (projectId: string | null) => void;
}

const PRIORITY_LABEL: Record<string, string> = {
  urgent: 'Urgent',
  high: 'High',
  normal: 'Normal',
  low: 'Low',
};

/**
 * Turn a certificate's coded observations into remedial work.
 *
 * A C1 or C2 is a snagging item by definition — found, coded, and someone has
 * to go back and put it right. Raising them here writes `spark_tasks` tagged
 * `snagging`, so each one lands on the Snagging page AND, when a job is chosen,
 * on that job's task list and progress count. They are the same table.
 *
 * The target matters commercially: most certificates know the customer but not
 * the job, so a remedial list with nowhere to live is the common case. Creating
 * a job from it turns a compliance obligation into something that can be
 * quoted and invoiced.
 */
const RaiseRemedialItemsSheet = ({
  open,
  onOpenChange,
  reportId,
  observations,
  projectId,
  customerId,
  customerName,
  location,
  onRaised,
}: RaiseRemedialItemsSheetProps) => {
  const outstanding = useMemo(() => outstandingObservations(observations), [observations]);
  const { raisedIds, reloadRaised } = useAlreadyRaised(open ? reportId : null);
  const { raise, saving } = useRemedialItems();
  const { data: projects = [] } = useLinkableProjects(open);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [targetKind, setTargetKind] = useState<'existing' | 'new' | 'none'>('none');
  const [chosenProjectId, setChosenProjectId] = useState<string | null>(null);
  const [newJobTitle, setNewJobTitle] = useState('');

  useEffect(() => {
    if (!open) return;
    reloadRaised();
    // Everything comes pre-selected; the list is already ordered C1 → C2 → FI
    // → C3, so the work that must happen reads first either way.
    setSelected(new Set(outstanding.map((o) => o.id)));
    if (projectId) {
      setTargetKind('existing');
      setChosenProjectId(projectId);
    } else if (customerId) {
      setTargetKind('new');
    } else {
      setTargetKind('none');
    }
    setNewJobTitle(
      location ? `Remedial works — ${location}` : `Remedial works${customerName ? ` — ${customerName}` : ''}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reportId]);

  const pending = outstanding.filter((o) => !raisedIds.has(o.id));
  const selectable = pending.map((o) => o.id);
  const chosen = pending.filter((o) => selected.has(o.id));

  const counts = useMemo(() => {
    const by: Record<string, number> = {};
    for (const o of chosen) {
      const c = (o.defectCode ?? '?').toUpperCase();
      by[c] = (by[c] ?? 0) + 1;
    }
    return by;
  }, [chosen]);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const canSave =
    chosen.length > 0 && (targetKind !== 'new' || newJobTitle.trim().length > 0) && !saving;

  const handleSave = async () => {
    let target: RemedialTarget;
    if (targetKind === 'existing' && chosenProjectId) {
      target = { kind: 'existing-project', projectId: chosenProjectId };
    } else if (targetKind === 'new') {
      target = { kind: 'new-project', title: newJobTitle.trim(), customerId };
    } else {
      target = { kind: 'unassigned' };
    }

    const result = await raise({
      reportId,
      observations: chosen,
      target,
      customerId,
      location,
    });
    if (result) {
      onRaised?.(result.projectId);
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-background">
          <SheetHeader className="shrink-0 border-b border-white/[0.10] px-4 py-3">
            <SheetTitle className="text-left text-[17px] font-semibold tracking-tight text-white">
              Raise remedial work
            </SheetTitle>
            <p className="text-left text-[12.5px] text-white">
              {pending.length === 0
                ? 'Everything on this certificate has already been raised.'
                : `${pending.length} coded observation${pending.length === 1 ? '' : 's'} on this certificate`}
            </p>
          </SheetHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
            {pending.length > 0 && (
              <>
                {/* Where it lands */}
                <div>
                  <span className={cn(eyebrowCn, 'mb-2 block')}>Put them on</span>
                  <div className="flex flex-wrap gap-2">
                    {projects.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setTargetKind('existing')}
                        className={cn(chipBase, targetKind === 'existing' ? chipOn : chipOff)}
                      >
                        An existing job
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setTargetKind('new')}
                      className={cn(chipBase, targetKind === 'new' ? chipOn : chipOff)}
                    >
                      A new job
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetKind('none')}
                      className={cn(chipBase, targetKind === 'none' ? chipOn : chipOff)}
                    >
                      Snagging only
                    </button>
                  </div>

                  {targetKind === 'existing' && (
                    <div className="mt-3 max-h-44 divide-y divide-white/[0.10] overflow-y-auto rounded-2xl border border-white/[0.12]">
                      {projects.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setChosenProjectId(p.id)}
                          className={cn(
                            'flex h-12 w-full items-center gap-3 px-4 text-left transition-colors touch-manipulation',
                            chosenProjectId === p.id
                              ? 'bg-elec-yellow/[0.12]'
                              : 'bg-white/[0.03] hover:bg-white/[0.06]'
                          )}
                        >
                          <span className="flex-1 truncate text-[14px] font-medium text-white">
                            {p.title}
                          </span>
                          {chosenProjectId === p.id && (
                            <span className="text-[12px] font-semibold text-elec-yellow">
                              Selected
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {targetKind === 'new' && (
                    <div className="mt-3">
                      <label className={labelCn} htmlFor="remedial-job-title">
                        Job name
                      </label>
                      <input
                        id="remedial-job-title"
                        value={newJobTitle}
                        onChange={(e) => setNewJobTitle(e.target.value)}
                        className={inputCn}
                      />
                      <p className="mt-1.5 text-[12px] leading-snug text-white">
                        Creates a job {customerName ? `for ${customerName} ` : ''}with these items
                        as its task list — ready to quote as remedial works.
                      </p>
                    </div>
                  )}
                </div>

                {/* The items */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className={eyebrowCn}>Items</span>
                    <button
                      type="button"
                      onClick={() =>
                        setSelected(
                          selected.size === selectable.length ? new Set() : new Set(selectable)
                        )
                      }
                      className="text-[12px] font-semibold text-elec-yellow touch-manipulation"
                    >
                      {selected.size === selectable.length ? 'Clear all' : 'Select all'}
                    </button>
                  </div>

                  <div className="divide-y divide-white/[0.10] overflow-hidden rounded-2xl border border-white/[0.12]">
                    {pending.map((o) => {
                      const code = (o.defectCode ?? '').toUpperCase();
                      const priority = codePriority(code);
                      const isOn = selected.has(o.id);
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => toggle(o.id)}
                          className={cn(
                            'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors touch-manipulation',
                            isOn ? 'bg-elec-yellow/[0.08]' : 'bg-white/[0.03] hover:bg-white/[0.06]'
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn(
                              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[11px] font-bold',
                              isOn
                                ? 'bg-elec-yellow text-black'
                                : 'border-2 border-white/30 text-transparent'
                            )}
                          >
                            ✓
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="shrink-0 rounded-full border border-white/[0.14] bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-bold tracking-[0.08em] text-white">
                                {code || '—'}
                              </span>
                              <span className="text-[11px] font-medium text-white">
                                {PRIORITY_LABEL[priority]}
                              </span>
                            </span>
                            <span className="mt-1 block text-[14px] font-medium leading-snug text-white">
                              {o.description}
                            </span>
                            {(o.item || o.regulation) && (
                              <span className="mt-0.5 block truncate text-[12px] text-white">
                                {[o.item, o.regulation ? `BS 7671 ${o.regulation}` : null]
                                  .filter(Boolean)
                                  .join(' · ')}
                              </span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {raisedIds.size > 0 && (
              <p className="text-[12px] text-white">
                {raisedIds.size} item{raisedIds.size === 1 ? '' : 's'} from this certificate{' '}
                {raisedIds.size === 1 ? 'has' : 'have'} already been raised and won&apos;t be
                duplicated.
              </p>
            )}
          </div>

          <div
            className="shrink-0 border-t border-white/[0.10] px-4 pt-3"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              {saving && <Loader2 className="h-5 w-5 animate-spin" />}
              {chosen.length === 0
                ? 'Nothing selected'
                : `Raise ${chosen.length} item${chosen.length === 1 ? '' : 's'}`}
            </button>
            {chosen.length > 0 && (
              <p className="mt-2 text-center text-[11px] text-white tabular-nums">
                {['C1', 'C2', 'FI', 'C3']
                  .filter((c) => counts[c])
                  .map((c) => `${counts[c]} × ${c}`)
                  .join('  ·  ')}
              </p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RaiseRemedialItemsSheet;
