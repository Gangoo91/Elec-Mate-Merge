import { useState, useMemo, useEffect, useRef } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Loader2, Check, ChevronUp, ChevronDown } from 'lucide-react';
import { SavedRoom } from '@/hooks/useFloorPlanRooms';
import { symbolRegistry } from '@/components/electrician-tools/diagram-builder/symbols/symbolRegistry';
import { assignCircuits, type CircuitScheduleEntry } from '@/utils/circuit-assignment';

/**
 * Underline field, per the house form language (see CLAUDE.md → Design System).
 * The sheet previously used boxed inputs with focus rings and NO labels at all
 * — placeholder-only, so once a field was filled a screen reader had nothing
 * to announce and a sighted user had lost the field's name.
 */
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

const Field = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  invalid,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
}) => (
  <div>
    <Label htmlFor={id} className="text-[12px] font-medium text-white mb-1 block">
      {label}
      {required && <span className="text-elec-yellow"> *</span>}
    </Label>
    <input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-required={required}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : undefined}
      className={`${inputCn} ${invalid ? 'border-red-400' : ''}`}
    />
    {invalid && (
      <p id={`${id}-error`} className="mt-1 text-[11px] text-red-300">
        {label} is needed for the title block
      </p>
    )}
  </div>
);

export interface ExportData {
  property: string;
  client: string;
  electrician: string;
  date: string;
  /** Drawing number — was hardcoded 'EL-001' on every drawing ever exported. */
  drawingNumber: string;
  /** Revision letter, e.g. 'A'. Hardcoded 'A' / 'Initial Issue' previously. */
  revision: string;
  revisionNote: string;
  notes: string;
  /**
   * The circuit schedule as the electrician left it. Auto-assignment provides
   * the starting values; whatever is issued is their edit of it, because the
   * drawing goes out under their name.
   */
  circuitSchedule: CircuitScheduleEntry[];
  rooms: SavedRoom[];
  materialsSchedule: { category: string; name: string; count: number }[];
  totalItems: number;
}

interface ExportReviewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rooms: SavedRoom[];
  /** Called when the user taps Generate PDF. May return a Promise so the
   *  sheet can show a loading state until the parent's async work resolves. */
  onGeneratePdf: (data: ExportData) => void | Promise<void>;
  /** Optional defaults — prefilled when opened from a project so the
   *  electrician doesn't retype the property/client/their own name. */
  defaultProperty?: string;
  defaultClient?: string;
  defaultElectrician?: string;
}

export const ExportReviewSheet = ({
  open,
  onOpenChange,
  rooms,
  onGeneratePdf,
  defaultProperty,
  defaultClient,
  defaultElectrician,
}: ExportReviewSheetProps) => {
  const [property, setProperty] = useState(defaultProperty ?? '');
  const [client, setClient] = useState(defaultClient ?? '');
  const [electrician, setElectrician] = useState(defaultElectrician ?? '');
  // Local date, not UTC. `toISOString()` shifts to UTC, so an export made
  // during British Summer Time before 01:00 was dated the previous day.
  const [date, setDate] = useState(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
    return local.toISOString().split('T')[0];
  });
  const [drawingNumber, setDrawingNumber] = useState('EL-001');
  const [revision, setRevision] = useState('A');
  const [revisionNote, setRevisionNote] = useState('Initial Issue');
  const [showErrors, setShowErrors] = useState(false);
  const [circuits, setCircuits] = useState<CircuitScheduleEntry[]>([]);
  // Which rooms go in the PDF, and in what order. The sheet used to list rooms
  // read-only, so a plan with a half-finished room had no way to leave it out
  // and the drawing order was whatever order they happened to be saved in.
  const [roomOrder, setRoomOrder] = useState<string[]>([]);
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const [circuitsOpen, setCircuitsOpen] = useState(false);
  // Tracks whether the user has edited the schedule, so re-opening the sheet
  // after adding symbols refreshes the defaults without discarding their work.
  const circuitsTouchedRef = useRef(false);
  const [notes, setNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Re-sync from defaults when they arrive (project + profile fetches are
  // async — they may resolve after the sheet has already mounted with
  // empty strings).
  useEffect(() => {
    if (defaultProperty && !property) setProperty(defaultProperty);
    if (defaultClient && !client) setClient(defaultClient);
    if (defaultElectrician && !electrician) setElectrician(defaultElectrician);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultProperty, defaultClient, defaultElectrician]);

  // Reconcile the schedule with the drawing every time the sheet opens.
  //
  // Simply skipping the rebuild once the user had edited anything froze the
  // schedule: draw another room with an EV charger, reopen Export, and EV1
  // would be silently missing from the PDF because the edited snapshot never
  // grew. So instead we regenerate from the drawing and layer the user's edits
  // back on top — their values win for circuits that still exist, new circuits
  // arrive with defaults, and circuits whose last symbol was deleted drop out.
  useEffect(() => {
    if (!open) return;
    const allSymbolIds = includedRooms.flatMap((r) => r.symbolIds);
    const fresh = assignCircuits(allSymbolIds).circuitSchedule;
    setCircuits((prev) => {
      if (!circuitsTouchedRef.current) return fresh;
      const edited = new Map(prev.map((c) => [c.circuitRef, c]));
      return fresh.map((f) => {
        const was = edited.get(f.circuitRef);
        return was
          // Point count and review flags come from the drawing; the three
          // fields the user can type keep their edits.
          ? { ...f, cableSize: was.cableSize, protection: was.protection, rcd: was.rcd }
          : f;
      });
    });
  }, [open, rooms]);

  // Preserve the user's ordering, drop rooms that no longer exist, append new ones.
  useEffect(() => {
    if (!open) return;
    setRoomOrder((prev) => {
      const live = rooms.map((r) => r.id);
      const kept = prev.filter((id) => live.includes(id));
      const added = live.filter((id) => !kept.includes(id));
      return [...kept, ...added];
    });
  }, [open, rooms]);

  const orderedRooms = roomOrder
    .map((id) => rooms.find((r) => r.id === id))
    .filter((r): r is SavedRoom => !!r);
  const includedRooms = orderedRooms.filter((r) => !excluded.has(r.id));

  const toggleRoom = (id: string) =>
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const moveRoom = (id: string, dir: -1 | 1) =>
    setRoomOrder((prev) => {
      const i = prev.indexOf(id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const updateCircuit = (ref: string, patch: Partial<CircuitScheduleEntry>) => {
    circuitsTouchedRef.current = true;
    setCircuits((prev) => prev.map((c) => (c.circuitRef === ref ? { ...c, ...patch } : c)));
  };

  // Aggregate materials from all rooms
  const schedule = useMemo(() => {
    const allSymbolIds = includedRooms.flatMap((r) => r.symbolIds);
    const countMap = new Map<string, number>();
    allSymbolIds.forEach((id) => countMap.set(id, (countMap.get(id) || 0) + 1));

    return Array.from(countMap.entries())
      .map(([id, count]) => {
        const sym = symbolRegistry.find((s) => s.id === id);
        return {
          id,
          name: sym?.name || id,
          category: sym?.category || 'other',
          count,
        };
      })
      .sort((a, b) => a.category.localeCompare(b.category) || b.count - a.count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includedRooms.map((r) => r.id).join(','), rooms]);

  const totalItems = schedule.reduce((sum, s) => sum + s.count, 0);

  // Group schedule by category
  const grouped = schedule.reduce<Record<string, { name: string; count: number }[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push({ name: item.name, count: item.count });
    return acc;
  }, {});

  const categoryOrder = Object.keys(grouped).sort();

  // The title block, the drawing register and the signature page all depend on
  // these. Exporting with them blank produced an official-looking document with
  // an empty title block and nobody's name against the sign-off.
  const missing = {
    property: !property.trim(),
    electrician: !electrician.trim(),
    drawingNumber: !drawingNumber.trim(),
  };
  const hasErrors = Object.values(missing).some(Boolean);

  const handleGenerate = async () => {
    if (isGenerating) return;
    if (hasErrors) {
      setShowErrors(true);
      return;
    }
    setIsGenerating(true);
    try {
      await onGeneratePdf({
        property: property.trim(),
        client: client.trim(),
        electrician: electrician.trim(),
        date,
        drawingNumber: drawingNumber.trim(),
        revision: revision.trim() || 'A',
        revisionNote: revisionNote.trim() || 'Initial Issue',
        notes,
        circuitSchedule: circuits,
        // Ordered and filtered as the user left them, not the raw saved list.
        rooms: includedRooms,
        materialsSchedule: schedule.map(({ category, name, count }) => ({ category, name, count })),
        totalItems,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="w-full max-w-3xl mx-auto px-4 pt-4 pb-3 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">Export Floor Plans</h2>
            <p className="text-xs text-white mt-0.5">
              {includedRooms.length} room{includedRooms.length !== 1 ? 's' : ''} &middot; {totalItems} item{totalItems !== 1 ? 's' : ''}
              {excluded.size > 0 && <span className="text-white/60"> &middot; {excluded.size} excluded</span>}
            </p>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto w-full max-w-3xl mx-auto px-4 py-4 space-y-5">
            {/* Project Details */}
            <section className="space-y-3">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">Project details</h3>
              <div className="space-y-4">
                <Field
                  id="export-property"
                  label="Property address"
                  required
                  invalid={showErrors && missing.property}
                  value={property}
                  onChange={setProperty}
                  placeholder="12 High Street, Cwmbran"
                />
                <Field
                  id="export-client"
                  label="Client name"
                  value={client}
                  onChange={setClient}
                  placeholder="Mrs J Davies"
                />
                <Field
                  id="export-drawn-by"
                  label="Drawn by"
                  required
                  invalid={showErrors && missing.electrician}
                  value={electrician}
                  onChange={setElectrician}
                  placeholder="Your name"
                />
                <div>
                  <Label htmlFor="export-date" className="text-[12px] font-medium text-white mb-1 block">
                    Date
                  </Label>
                  <input
                    id="export-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputCn}
                  />
                </div>
              </div>
            </section>

            {/* Drawing control — these print in the title block and the
                revision box. Both were hardcoded, so every drawing this app
                has ever produced was "EL-001 Rev A / Initial Issue". */}
            <section className="space-y-3">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">Drawing control</h3>
              <div className="grid grid-cols-2 gap-3">
                <Field
                  id="export-dwg-no"
                  label="Drawing number"
                  required
                  invalid={showErrors && missing.drawingNumber}
                  value={drawingNumber}
                  onChange={setDrawingNumber}
                  placeholder="EL-001"
                />
                <Field
                  id="export-rev"
                  label="Revision"
                  value={revision}
                  onChange={setRevision}
                  placeholder="A"
                />
              </div>
              <Field
                id="export-rev-note"
                label="Revision description"
                value={revisionNote}
                onChange={setRevisionNote}
                placeholder="Initial Issue"
              />
            </section>

            {/* Rooms */}
            <section className="space-y-3">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[15px] font-semibold tracking-tight text-white">Rooms</h3>
                <span className="text-[11px] text-white/70">Tap to include or leave out</span>
              </div>

              {/* Each room is a row so it can be excluded and reordered. Sheet
                  order here is the page order in the PDF. */}
              <div className="space-y-2">
                {orderedRooms.map((room, idx) => {
                  const isIn = !excluded.has(room.id);
                  return (
                    <div
                      key={room.id}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border p-2 transition-colors',
                        isIn ? 'border-white/[0.14] bg-white/[0.05]' : 'border-white/[0.08] bg-transparent opacity-55'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => toggleRoom(room.id)}
                        aria-pressed={isIn}
                        aria-label={`${isIn ? 'Exclude' : 'Include'} ${room.name}`}
                        className="flex min-w-0 flex-1 items-center gap-3 text-left touch-manipulation"
                      >
                        <span
                          className={cn(
                            'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border',
                            isIn ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/30'
                          )}
                        >
                          {isIn && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                        </span>
                        <span className="h-[42px] w-[56px] shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white">
                          {room.thumbnail ? (
                            <img src={room.thumbnail} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <span className="block h-full w-full bg-white/5" />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-white">{room.name}</span>
                          <span className="block text-[11px] text-white/70">
                            {room.symbolIds.length} item{room.symbolIds.length !== 1 ? 's' : ''}
                            {isIn && ` · page ${includedRooms.findIndex((r) => r.id === room.id) + 2}`}
                          </span>
                        </span>
                      </button>

                      <div className="flex shrink-0 flex-col">
                        <button
                          type="button"
                          onClick={() => moveRoom(room.id, -1)}
                          disabled={idx === 0}
                          aria-label={`Move ${room.name} earlier`}
                          className="flex h-6 w-9 items-center justify-center rounded text-white/80 touch-manipulation hover:bg-white/10 disabled:opacity-25"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveRoom(room.id, 1)}
                          disabled={idx === orderedRooms.length - 1}
                          aria-label={`Move ${room.name} later`}
                          className="flex h-6 w-9 items-center justify-center rounded text-white/80 touch-manipulation hover:bg-white/10 disabled:opacity-25"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {includedRooms.length === 0 && (
                <p className="text-[11px] text-orange-300">
                  Every room is excluded — include at least one to generate a PDF.
                </p>
              )}
            </section>

            {/* Materials Schedule */}
            {schedule.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-[15px] font-semibold tracking-tight text-white">Materials schedule</h3>
                <div className="space-y-2">
                  {categoryOrder.map((cat, idx) => (
                    <div
                      key={cat}
                      className={idx > 0 ? 'border-t border-white/10 pt-2' : ''}
                    >
                      <p className="text-elec-yellow text-[10px] uppercase font-semibold tracking-wide mb-1">
                        {cat}
                      </p>
                      {grouped[cat].map((item) => (
                        <div key={item.name} className="flex items-center justify-between py-0.5">
                          <span className="text-white text-xs">{item.name}</span>
                          <span className="text-white text-xs font-medium tabular-nums">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Total */}
                  <div className="border-t border-white/10 pt-2 flex items-center justify-between">
                    <span className="text-white text-xs font-bold">Total</span>
                    <span className="text-white text-xs font-bold tabular-nums">{totalItems}</span>
                  </div>
                </div>
              </section>
            )}

            {/* Circuit schedule — editable. The auto-assignment is a starting
                point derived from the symbols on the drawing; the electrician
                signs the document, so they get the final say on every value. */}
            {circuits.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[15px] font-semibold tracking-tight text-white">Circuit schedule</h3>
                  <button
                    type="button"
                    onClick={() => setCircuitsOpen((v) => !v)}
                    aria-expanded={circuitsOpen}
                    className="h-11 sm:h-9 px-3 rounded-lg border border-white/15 text-white text-xs font-medium touch-manipulation active:scale-95"
                  >
                    {circuitsOpen ? 'Done' : `Review ${circuits.length}`}
                  </button>
                </div>

                <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-3">
                  <p className="text-[11px] text-orange-300 font-medium">Indicative — check before issuing</p>
                  <p className="text-[11px] text-white mt-1">
                    Suggested defaults for a typical domestic installation. Cable sizing, volt drop and Zs
                    must be verified for the actual installation.
                  </p>
                </div>

                {circuitsOpen && (
                  <div className="space-y-3">
                    {circuits.map((c) => (
                      <div
                        key={c.circuitRef}
                        className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-3 space-y-3"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-bold text-elec-yellow">{c.circuitRef}</span>
                          <span className="text-xs text-white">
                            {c.circuitName} · {c.points} point{c.points !== 1 ? 's' : ''}
                          </span>
                        </div>

                        {c.needsReview && (
                          <p className="text-[11px] text-orange-300">⚠ {c.needsReview}</p>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                          <Field
                            id={`c-${c.circuitRef}-cable`}
                            label="Cable"
                            value={c.cableSize}
                            onChange={(v) => updateCircuit(c.circuitRef, { cableSize: v })}
                          />
                          <Field
                            id={`c-${c.circuitRef}-prot`}
                            label="Protection"
                            value={c.protection}
                            onChange={(v) => updateCircuit(c.circuitRef, { protection: v })}
                          />
                        </div>
                        <Field
                          id={`c-${c.circuitRef}-rcd`}
                          label={c.rcdBasis ? `RCD (${c.rcdBasis})` : 'RCD'}
                          value={c.rcd}
                          onChange={(v) => updateCircuit(c.circuitRef, { rcd: v })}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Notes */}
            <section className="space-y-3">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">Notes</h3>
              <Textarea
                placeholder="Additional notes for the export..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 text-white"
              />
            </section>
          </div>

          {/* Footer */}
          <div className="w-full max-w-3xl mx-auto px-4 py-3 border-t border-white/10 shrink-0 pb-safe">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || includedRooms.length === 0}
              className="w-full h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating PDF…
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
