/**
 * The board, as the drawing wires it (28 Sep 2026).
 *
 * Built from the canvas every time it opens (`scheduleFromObjects`), so moving
 * a socket to another circuit on the drawing moves it here too. Two views of
 * the same circuits: the schedule an electrician fills a board from, and the
 * single-line diagram that goes on the wall of the plant room.
 *
 * Fire detection zones are panel zones, not board ways; they are listed under
 * the panel, which takes one dedicated way of its own.
 *
 * Circuits are shown by their WAY on the board (1, 2, 3… or 1L1, 1L2… on a
 * three-phase board) with the device in board shorthand (RCBO · B32 · 30 mA),
 * as a real board schedule reads — not by the design's family refs (S1, L2),
 * which stay internal (30 Sep 2026).
 */
import { useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { STATUS_DOT, STATUS_TEXT, type CircuitResult } from './planResults';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import {
  BUILDING_TYPES,
  circuitColour,
  scheduleFromObjects,
  type BuildingType,
  type DesignedCircuit,
} from './circuitDesign';
import {
  EARTHING,
  cableTakeOff,
  findBoard,
  hasRuns,
  placeBoard,
  fixLongRuns,
  planSettings,
  redesignCircuits,
  runLengths,
  splitCircuit,
  subBoards,
  editCircuit,
  moveWay,
  MIN_SPLIT_POINTS,
  withRuns,
  withoutRuns,
  type Earthing,
} from './wiring';
import { singleLineSvg } from './singleLine';
import {
  isSpare,
  notation,
  phaseLoads,
  wayMap,
  wayOrder,
  withSpares,
  type Supply,
  type Way,
} from './boardWays';

interface BoardScheduleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  objects: CanvasObject[];
  /** Point at a circuit on the drawing. */
  onShowCircuit?: (ref: string) => void;
  /** Change the drawing: building type, board, cable runs, a split circuit. */
  onChange?: (next: CanvasObject[]) => void;
  /**
   * The job's numbering for this sheet's circuits (jobNumbering), so the
   * sheet agrees with the plan tags and the PDF on a multi-sheet job.
   */
  wayOf?: Map<string, Way>;
  /** Ways can be reordered here — false when other sheets share the numbering. */
  canReorder?: boolean;
  /** Start an EIC with these boards and circuits already in. */
  onStartEic?: () => void;
  /** The EIC started from this plan, and its readings per circuit (this sheet's refs). */
  certificate?: { number: string; updatedAt: string; onOpen: () => void; onRefresh: () => void };
  results?: Map<string, CircuitResult>;
  /** Open a board's circuit chart for its door ("CU", "DB2"). */
  onDoorChart?: (board: string) => void;
}

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04]';

const isZone = (c: DesignedCircuit) => c.kind === 'fire-zone';

// Status words in a tint that reads on the dark sheet (the ring colours are
// for the white drawing).
const STATUS_TEXT_CN: Record<CircuitResult['status'], string> = {
  pass: 'text-green-300',
  check: 'text-amber-300',
  fail: 'text-red-300',
  partial: 'text-blue-300',
  untested: 'text-white',
};

/** A reading as entered, less any unit typed with it ("0.78Ω" → "0.78"). */
const bare = (v: string) => v.replace(/\s*(?:MΩ|Ω|m?ohms?)\s*$/i, '').trim();
/** A reading with its unit — none on "N/A", "LIM" and the like. */
const unit = (v: string, u: string) => {
  const b = bare(v);
  return /^[<>]?\s*\d/.test(b) ? `${b} ${u}` : b;
};

const ago = (iso: string) => {
  const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (!Number.isFinite(min)) return 'recently';
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} h ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

export const BoardScheduleSheet = ({
  open,
  onOpenChange,
  objects,
  onShowCircuit,
  onChange,
  wayOf: jobWays,
  canReorder = true,
  onStartEic,
  certificate,
  results,
  onDoorChart,
}: BoardScheduleSheetProps) => {
  const [view, setView] = useState<'schedule' | 'diagram'>('schedule');
  const [fixNote, setFixNote] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { circuits, premises } = useMemo(
    () => (open ? scheduleFromObjects(objects) : { circuits: [], premises: 'dwelling' as const }),
    [open, objects]
  );
  const settings = useMemo(() => planSettings(objects), [objects]);
  const wayOf = useMemo(
    () => (jobWays?.size ? jobWays : wayMap(circuits, settings.supply)),
    [jobWays, circuits, settings.supply]
  );
  const byWay = (a: DesignedCircuit, b: DesignedCircuit) =>
    wayOrder(wayOf.get(a.ref)) - wayOrder(wayOf.get(b.ref));
  const ways = circuits.filter((c) => !isZone(c)).sort(byWay);
  const zones = circuits.filter(isZone).sort(byWay);
  const label = (c: DesignedCircuit) => wayOf.get(c.ref)?.full ?? c.ref;
  // A way no fitting carries (the fire alarm panel's supply) has nothing to
  // hold an amendment or a position, so it offers neither.
  const carried = useMemo(
    () => new Set(objects.map((o) => o.circuitRef).filter(Boolean)),
    [objects]
  );
  const afddCount = ways.filter((c) => c.afdd).length;
  const warnings = circuits.flatMap((c) => [
    ...c.notes.filter((n) => /over|split/i.test(n)).map((n) => `Way ${label(c)}: ${n}`),
    // Long runs are flagged on their own row.
  ]);
  const balance = settings.supply === 'three' ? phaseLoads(circuits, wayOf) : null;
  const board = findBoard(objects);
  const runsDrawn = hasRuns(objects);
  const takeOff = useMemo(
    () => (runsDrawn ? cableTakeOff(circuits, runLengths(objects)) : []),
    [runsDrawn, circuits, objects]
  );
  const designed = objects.some((o) => o.type === 'symbol' && o.roomKey);
  // One list of ways per board once the plan has sub-boards.
  const subs = subBoards(objects);
  // Three-phase boards list their empty positions as spares, as a schedule does.
  const groups = (
    !subs.length
      ? [{ name: 'CU', title: '' }]
      : [
          { name: 'CU', title: 'Main board' },
          ...subs.map((b) => ({
            name: b.circuitRef!,
            title: `${b.circuitRef} — sub-board${b.roomName ? ` in ${b.roomName}` : ''}`,
          })),
        ]
  ).map((g) => {
    const own = ways.filter((c) => (c.board ?? 'CU') === g.name);
    const spared = withSpares(own, wayOf);
    return { ...g, ways: spared.list, wayOf: spared.wayOf, count: own.length };
  });
  const guessed = !settings.buildingType;
  const buildingLabel =
    BUILDING_TYPES.find((b) => b.id === settings.buildingType)?.label ??
    (premises === 'multi-occupancy'
      ? 'Multi-occupancy'
      : zones.length
        ? 'Non-domestic'
        : 'Dwelling');
  const overRefs = ways
    .filter((c) => c.length?.ok === false && c.kind !== 'submain')
    .map((c) => c.ref);
  const runsActionable = !board || !runsDrawn || overRefs.length > 0 || !!fixNote;
  const setType = (t: BuildingType) =>
    onChange?.(redesignCircuits(objects, { buildingType: t, earthing: settings.earthing }));
  const setEarthing = (e: Earthing) =>
    onChange?.(objects.map((o) => (o.type === 'symbol' && o.roomKey ? { ...o, earthing: e } : o)));
  // Stamped on every item, so hand-drawn plans keep it too.
  const setSupply = (v: Supply) =>
    onChange?.(objects.map((o) => (o.type === 'symbol' ? { ...o, supply: v } : o)));
  const kw = (w: number) => `${(w / 1000).toFixed(1)} kW`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex h-full flex-col bg-background">
          <header className="border-b border-white/[0.1] px-4 pb-3 pt-5 sm:px-6">
            <div className="mx-auto w-full max-w-3xl">
              <h2 className="text-[17px] font-semibold tracking-tight text-white">
                Board schedule
              </h2>
              <p className="mt-1 text-[13px] text-white">
                {ways.length} circuit{ways.length === 1 ? '' : 's'} ·{' '}
                {settings.supply === 'three' ? 'Three-phase' : 'Single-phase'} ·{' '}
                {EARTHING.find((e) => e.id === settings.earthing)?.label} · {buildingLabel}
                {guessed && designed ? ' (guessed)' : ''}
                {afddCount > 0 &&
                  ` · AFDD ${premises === 'multi-occupancy' ? 'required' : 'recommended'} on ${afddCount}`}
              </p>
              <div className="mt-3 flex gap-2">
                {(
                  [
                    ['schedule', 'Schedule'],
                    ['diagram', 'Single line'],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setView(id)}
                    className={`h-11 rounded-full border px-5 text-sm touch-manipulation ${view === id ? chipOn : chipOff}`}
                  >
                    {label}
                  </button>
                ))}
                {onChange && (
                  <button
                    type="button"
                    aria-expanded={settingsOpen}
                    onClick={() => {
                      setView('schedule');
                      setSettingsOpen((v) => !v);
                    }}
                    className={`relative h-11 rounded-full border px-5 text-sm touch-manipulation ${settingsOpen ? chipOn : chipOff}`}
                  >
                    Settings
                    {guessed && designed && !settingsOpen && (
                      <span
                        aria-label="building type not set"
                        className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-400"
                      />
                    )}
                  </button>
                )}
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 pb-24 pt-4 sm:px-6">
            <div className="mx-auto w-full max-w-3xl">
              {ways.length === 0 ? (
                <p className="py-10 text-center text-sm text-white">
                  Nothing on a circuit yet. Add sockets, lights or a plan and the board fills itself
                  in.
                </p>
              ) : view === 'schedule' ? (
                <div className="space-y-4">
                  {onChange && (settingsOpen || runsActionable) && (
                    <section className={`${cardCn} space-y-4 p-4 sm:p-5`}>
                      {/* Settings open from the header; the runs panel shows
                          only when there is something to do. The schedule is
                          what this sheet is for — on a phone it now starts on
                          the first screen. */}
                      {settingsOpen && (
                        <>
                          {designed && (
                            <>
                              <div>
                                <h3 className="text-[15px] font-semibold tracking-tight text-white">
                                  Building
                                </h3>
                                <p className="mb-2 text-[12px] text-white">
                                  Sets AFDDs (Reg 421.1.7) and the fire alarm system. Changing it
                                  re-designs the circuits — any you split or moved by hand are
                                  redone.
                                </p>
                                {!settings.buildingType && (
                                  <p className="mb-2 text-[12px] text-orange-300">
                                    Not set — guessed as{' '}
                                    {premises === 'multi-occupancy'
                                      ? 'multi-occupancy'
                                      : zones.length
                                        ? 'non-domestic'
                                        : 'a dwelling'}{' '}
                                    from the rooms. Pick what it is.
                                  </p>
                                )}
                                <div className="flex flex-wrap gap-2">
                                  {BUILDING_TYPES.map((b) => (
                                    <button
                                      key={b.id}
                                      type="button"
                                      onClick={() => setType(b.id)}
                                      className={`h-11 rounded-full border px-4 text-sm touch-manipulation ${settings.buildingType === b.id ? chipOn : chipOff}`}
                                    >
                                      {b.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="border-t border-white/[0.1] pt-4">
                                <h3 className="text-[15px] font-semibold tracking-tight text-white">
                                  Earthing
                                </h3>
                                <p className="mb-2 text-[12px] text-white">
                                  For the cable-length check.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {EARTHING.map((e) => (
                                    <button
                                      key={e.id}
                                      type="button"
                                      onClick={() => setEarthing(e.id)}
                                      className={`h-11 rounded-full border px-4 text-sm touch-manipulation ${settings.earthing === e.id ? chipOn : chipOff}`}
                                    >
                                      {e.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                          <div className={designed ? 'border-t border-white/[0.1] pt-4' : ''}>
                            <h3 className="text-[15px] font-semibold tracking-tight text-white">
                              Supply
                            </h3>
                            <p className="mb-2 text-[12px] text-white">
                              Numbers the board: ways 1, 2, 3… on single-phase; way and phase (1L1,
                              1L2, 1L3…) on three-phase, with circuits balanced across the phases.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {(
                                [
                                  ['single', 'Single-phase'],
                                  ['three', 'Three-phase'],
                                ] as const
                              ).map(([id, text]) => (
                                <button
                                  key={id}
                                  type="button"
                                  onClick={() => setSupply(id)}
                                  className={`h-11 rounded-full border px-4 text-sm touch-manipulation ${settings.supply === id ? chipOn : chipOff}`}
                                >
                                  {text}
                                </button>
                              ))}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSettingsOpen(false)}
                            className="h-11 rounded-full bg-elec-yellow px-5 text-sm font-semibold text-black touch-manipulation"
                          >
                            Done
                          </button>
                        </>
                      )}
                      <div className={settingsOpen ? 'border-t border-white/[0.1] pt-4' : ''}>
                        <h3 className="text-[15px] font-semibold tracking-tight text-white">
                          Board and cable runs
                        </h3>
                        <p className="mb-2 text-[12px] text-white">
                          {!board
                            ? 'Put the consumer unit on the plan to draw every circuit’s run from it and check its length.'
                            : runsDrawn
                              ? 'Runs are drawn from the nearest board and follow the plan: move an item or a board and they redraw.'
                              : 'Draw each circuit from the board — rings out and back, radials chained — with its length.'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {!board ? (
                            <button
                              type="button"
                              onClick={() => onChange(placeBoard(objects))}
                              className="h-11 rounded-full bg-elec-yellow px-5 text-sm font-semibold text-black touch-manipulation"
                            >
                              Place the consumer unit
                            </button>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setFixNote(null);
                                  onChange(withRuns(objects));
                                }}
                                className={
                                  runsDrawn
                                    ? `h-11 rounded-full border px-5 text-sm touch-manipulation ${chipOff}`
                                    : 'h-11 rounded-full bg-elec-yellow px-5 text-sm font-semibold text-black touch-manipulation'
                                }
                              >
                                {runsDrawn ? 'Redraw' : 'Draw cable runs'}
                              </button>
                              {runsDrawn && overRefs.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const r = fixLongRuns(objects);
                                    // Ways renumber after a split, so name them
                                    // from the new board.
                                    const after = wayMap(
                                      scheduleFromObjects(r.objects).circuits,
                                      settings.supply
                                    );
                                    setFixNote(
                                      [
                                        r.added.length
                                          ? `Added sub-board${r.added.length > 1 ? 's' : ''} ${r.added.join(', ')} near the far rooms.`
                                          : '',
                                        r.split.length
                                          ? `Split ${r.split.length} circuit${r.split.length > 1 ? 's' : ''} in two.`
                                          : '',
                                        r.stillOver.length
                                          ? `Still over: way${r.stillOver.length > 1 ? 's' : ''} ${r.stillOver.map((x) => after.get(x)?.full ?? x).join(', ')} — too few points to split; check them or up the cable.`
                                          : 'Every run is now within its OSG length.',
                                      ]
                                        .filter(Boolean)
                                        .join(' ')
                                    );
                                    onChange(r.objects);
                                  }}
                                  className="h-11 rounded-full bg-elec-yellow px-5 text-sm font-semibold text-black touch-manipulation"
                                >
                                  Fix the long runs
                                </button>
                              )}
                              {runsDrawn && (
                                <button
                                  type="button"
                                  onClick={() => onChange(withoutRuns(objects))}
                                  className={`h-11 rounded-full border px-5 text-sm touch-manipulation ${chipOff}`}
                                >
                                  Hide runs
                                </button>
                              )}
                            </>
                          )}
                        </div>
                        {fixNote && (
                          <p className="mt-3 text-[13px] text-white" role="status">
                            {fixNote}
                          </p>
                        )}
                      </div>
                    </section>
                  )}
                  {warnings.length > 0 && (
                    <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-[13px] text-orange-300">
                      {warnings.map((w) => (
                        <p key={w}>{w}</p>
                      ))}
                    </div>
                  )}
                  {groups.map((g) => {
                    const phases = balance?.get(g.name);
                    return (
                      <section key={g.name}>
                        {g.title && (
                          <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                            {g.title}
                            <span className="ml-2 text-[13px] font-medium">
                              {g.count} circuit{g.count === 1 ? '' : 's'}
                            </span>
                          </h3>
                        )}
                        {phases && (
                          <p className="mb-2 text-[13px] tabular-nums text-white">
                            Connected load by phase —{' '}
                            <span className="whitespace-nowrap">L1 {kw(phases.L1)}</span> ·{' '}
                            <span className="whitespace-nowrap">L2 {kw(phases.L2)}</span> ·{' '}
                            <span className="whitespace-nowrap">L3 {kw(phases.L3)}</span>
                            <span className="mt-1 block text-[12px]">
                              Ways are placed by phase balancing on a three-phase board.
                            </span>
                          </p>
                        )}
                        <div className={cardCn}>
                          <div className="hidden border-b border-white/[0.14] px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-white sm:grid sm:grid-cols-[56px_1fr_96px_52px_56px_64px_44px] sm:gap-3">
                            <span>Way</span>
                            <span>Circuit</span>
                            <span>Device</span>
                            <span>Rating</span>
                            <span>RCD</span>
                            <span className="normal-case">Cable mm²</span>
                            <span className="text-right">Pts</span>
                          </div>
                          {g.ways.map((c, i) => (
                            <WayRow
                              key={c.ref}
                              way={g.wayOf.get(c.ref)}
                              c={c}
                              result={results?.get(c.ref)}
                              first={i === 0}
                              edit={
                                objects.find((o) => o.circuitRef === c.ref && o.circuitEdit)
                                  ?.circuitEdit
                              }
                              onEdit={
                                onChange && carried.has(c.ref)
                                  ? (e) => onChange(editCircuit(objects, c.ref, e))
                                  : undefined
                              }
                              onMove={
                                onChange &&
                                canReorder &&
                                carried.has(c.ref) &&
                                settings.supply !== 'three'
                                  ? (by) => {
                                      const order = g.ways
                                        .filter((w) => !isSpare(w) && carried.has(w.ref))
                                        .map((w) => w.ref);
                                      onChange(moveWay(objects, order, c.ref, by));
                                    }
                                  : undefined
                              }
                              isFirst={i === 0}
                              isLast={i === g.ways.length - 1}
                              onShow={onShowCircuit}
                              onSplit={
                                onChange ? (ref) => onChange(splitCircuit(objects, ref)) : undefined
                              }
                            />
                          ))}
                        </div>
                      </section>
                    );
                  })}
                  {zones.length > 0 && (
                    <section>
                      <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                        Fire alarm panel zones
                      </h3>
                      <div className={cardCn}>
                        {zones.map((z, i) => (
                          <div
                            key={z.ref}
                            className={`px-4 py-3 sm:px-5 ${i ? 'border-t border-white/[0.1]' : ''}`}
                          >
                            <div className="flex items-baseline gap-3">
                              <span
                                className="w-16 shrink-0 border-l-[3px] pl-1.5 text-sm font-bold text-white"
                                style={{ borderColor: circuitColour(z.ref) }}
                              >
                                {label(z)}
                              </span>
                              <span className="flex-1 text-sm font-medium text-white">
                                {/* "Zone 1 · Ground floor", not "zone" twice */}
                                {z.description.replace(/^Fire detection zone( — )?/, '') ||
                                  'Whole building'}
                              </span>
                              <span className="text-[13px] tabular-nums text-white">
                                {z.points} devices{z.areaM2 ? ` · ${z.areaM2} m²` : ''}
                              </span>
                            </div>
                            <p className="mt-1 pl-[76px] text-[12px] text-white">
                              {z.source.replace(/\bcl (\d)/, 'clause $1')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                  {takeOff.length > 0 && (
                    <section>
                      <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                        Cable to order
                      </h3>
                      <div className={cardCn}>
                        {takeOff.map((t, i) => (
                          <div
                            key={t.cable}
                            className={`flex items-baseline justify-between gap-3 px-4 py-3 sm:px-5 ${i ? 'border-t border-white/[0.1]' : ''}`}
                          >
                            <span className="text-sm text-white">{t.cable}</span>
                            <span className="text-sm font-semibold tabular-nums text-white">
                              {t.metres} m
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-[12px] text-white">
                        From the drawn runs, with a metre per point for drops, 2 m into the board
                        and 10% for waste — rounded up to 5 m. An estimate for pricing, not a
                        take-off.
                      </p>
                    </section>
                  )}
                  {(onStartEic || onDoorChart) && (
                    <section className={`${cardCn} space-y-3 p-4 sm:p-5`}>
                      <div>
                        <h3 className="text-[15px] font-semibold tracking-tight text-white">
                          {certificate ? 'On the certificate' : 'Take it to the certificate'}
                        </h3>
                        <p className="mt-1 text-[12px] text-white">
                          {certificate
                            ? `${certificate.number} was started from this plan. Its readings show against each way here and on the drawing as they go in — updated ${ago(certificate.updatedAt)}.`
                            : "Start the EIC with every board and circuit already in — numbered as on this plan, devices, cables, points and maximum Zs filled — so only the readings are left. Or print a board's circuit chart for its door."}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {certificate && (
                          <>
                            <button
                              type="button"
                              onClick={certificate.onOpen}
                              className="h-11 rounded-full bg-elec-yellow px-5 text-sm font-semibold text-black touch-manipulation active:scale-[0.98]"
                            >
                              Open {certificate.number}
                            </button>
                            <button
                              type="button"
                              onClick={certificate.onRefresh}
                              className={`h-11 rounded-full border px-5 text-sm touch-manipulation ${chipOff}`}
                            >
                              Refresh results
                            </button>
                          </>
                        )}
                        {onStartEic && (
                          <button
                            type="button"
                            onClick={onStartEic}
                            className={
                              certificate
                                ? `h-11 rounded-full border px-5 text-sm touch-manipulation ${chipOff}`
                                : 'h-11 rounded-full bg-elec-yellow px-5 text-sm font-semibold text-black touch-manipulation active:scale-[0.98]'
                            }
                          >
                            {certificate ? 'Start a new EIC' : 'Start an EIC with these circuits'}
                          </button>
                        )}
                        {onDoorChart &&
                          groups.map((g) => (
                            <button
                              key={g.name}
                              type="button"
                              onClick={() => onDoorChart(g.name)}
                              className={`h-11 rounded-full border px-5 text-sm touch-manipulation ${chipOff}`}
                            >
                              Door chart
                              {groups.length > 1
                                ? ` — ${g.name === 'CU' ? 'main board' : g.name}`
                                : ''}
                            </button>
                          ))}
                      </div>
                    </section>
                  )}
                  <p className="text-[12px] leading-relaxed text-white">
                    A design starting point from the drawing, sized from the On-Site Guide and BS
                    7671. Cable sizes still need checking against installation method, length (volt
                    drop) and Zs before this is issued.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {groups.map((g, i) => (
                    <section key={g.name}>
                      {g.title && (
                        <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                          {g.title}
                        </h3>
                      )}
                      <SingleLine
                        ways={g.ways}
                        zones={i === 0 ? zones : []}
                        board={g.name}
                        fedFrom={i ? 'CU' : undefined}
                        wayOf={g.wayOf}
                        supply={settings.supply}
                        earthing={settings.earthing}
                      />
                    </section>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const DEVICES = [
  ['MCB', 'MCB'],
  ['RCBO', 'RCBO'],
  ['AFDD/RCBO', 'RCBO + AFDD'],
] as const;
const RATINGS = [
  'B6',
  'B10',
  'B16',
  'B20',
  'B25',
  'B32',
  'B40',
  'B45',
  'B50',
  'C6',
  'C10',
  'C16',
  'C20',
  'C32',
  'C40',
];
const CABLES = ['1.0/1.0', '1.5/1.0', '2.5/1.5', '4/1.5', '6/2.5', '10/4', '16/6'];
// A submain: an MCB sized for the sub-board, in SWA (live conductor size).
const SUB_RATINGS = ['C32', 'C40', 'C50', 'C63', 'D32', 'D40', 'D50', 'D63'];
const SUB_CABLES = ['6', '10', '16', '25', '35'];
const fieldCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation';

const WayRow = ({
  way,
  c,
  first,
  onShow,
  onSplit,
  edit,
  onEdit,
  onMove,
  isFirst,
  isLast,
  result,
}: {
  way?: Way;
  c: DesignedCircuit;
  result?: CircuitResult;
  first: boolean;
  onShow?: (ref: string) => void;
  onSplit?: (ref: string) => void;
  edit?: CanvasObject['circuitEdit'];
  onEdit?: (edit: CanvasObject['circuitEdit'] | null) => void;
  onMove?: (by: -1 | 1) => void;
  isFirst?: boolean;
  isLast?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<NonNullable<CanvasObject['circuitEdit']>>({});
  const n = notation(c);
  const sub = c.kind === 'submain';
  const devices = sub ? DEVICES.filter(([id]) => id === 'MCB') : DEVICES;
  const ratings = sub ? SUB_RATINGS : RATINGS;
  const cables = sub ? SUB_CABLES : CABLES;
  if (isSpare(c)) {
    return (
      <div
        className={`flex items-center gap-3 px-4 py-2.5 sm:px-5 ${first ? '' : 'border-t border-white/[0.1]'}`}
      >
        <span className="flex h-9 min-w-[44px] items-center justify-center rounded-md border border-dashed border-white/[0.25] px-1.5 text-[15px] font-bold tabular-nums text-white sm:h-auto sm:min-w-[56px] sm:justify-start sm:border-0 sm:pl-2">
          {way?.label}
        </span>
        <span className="text-sm italic text-white">Spare</span>
      </div>
    );
  }
  const tbc = (v: string) => (v === 'TBC' ? <span className="text-orange-300">TBC</span> : v);
  const over = c.length?.ok === false;
  return (
    <div className={`px-4 sm:px-5 ${first ? '' : 'border-t border-white/[0.1]'}`}>
      {/* One line per way, as a board schedule reads; tap for the detail. */}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 w-full items-start gap-3 py-3 text-left touch-manipulation sm:grid sm:grid-cols-[56px_1fr_96px_52px_56px_64px_44px] sm:items-baseline"
      >
        <span
          className="flex h-9 min-w-[44px] shrink-0 items-center justify-center rounded-md border border-white/[0.2] border-l-[3px] px-1.5 text-[15px] font-bold tabular-nums text-white sm:h-auto sm:min-w-0 sm:justify-start sm:rounded-none sm:border-0 sm:border-l-[3px] sm:pl-2"
          style={{ borderLeftColor: circuitColour(c.ref) }}
        >
          {way?.label ?? '—'}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{c.description}</p>
          {c.rooms.length > 0 && !c.rooms.some((r) => c.description.includes(r)) && (
            <p className="truncate text-[12px] text-white">{[...new Set(c.rooms)].join(', ')}</p>
          )}
          {/* Phone: the device, rating, RCD and cable on one line. */}
          <p className="mt-0.5 text-[13px] tabular-nums text-white sm:hidden">
            {n.device} · {tbc(n.rating)} · {n.rcd} · {tbc(n.cable)}
            {/^\d/.test(n.cable) ? ' mm²' : ''}
            {c.points > 0 ? ` · ${c.points} pt${c.points === 1 ? '' : 's'}` : ''}
          </p>
        </div>
        <span className="hidden text-[13px] text-white sm:block">{tbc(n.device)}</span>
        <span className="hidden text-[13px] font-semibold tabular-nums text-white sm:block">
          {tbc(n.rating)}
        </span>
        <span className="hidden text-[13px] tabular-nums text-white sm:block">{n.rcd}</span>
        <span className="hidden text-[13px] tabular-nums text-white sm:block">{tbc(n.cable)}</span>
        <span className="hidden text-right text-[13px] tabular-nums text-white sm:block">
          {c.points || '—'}
        </span>
      </button>
      {result && (
        <p className="-mt-1.5 flex flex-wrap items-center gap-x-1.5 pb-3 pl-[56px] text-[12px] text-white sm:pl-[68px]">
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: STATUS_DOT[result.status] }}
          />
          <span className={`font-semibold ${STATUS_TEXT_CN[result.status]}`}>
            {STATUS_TEXT[result.status]}
          </span>
          {result.zs && (
            <span className="tabular-nums">
              · Zs {unit(result.zs, 'Ω')}
              {result.maxZs
                ? result.decidedBy === 'zs' && result.status === 'fail'
                  ? ` — over the ${bare(result.maxZs)} limit`
                  : ` of ${bare(result.maxZs)}`
                : ''}
            </span>
          )}
          {result.missing?.length ? <span>· {result.missing.join(', ')} to do</span> : null}
          {/* A Zs finding is already said by the line above. */}
          {result.reason &&
            (result.status === 'fail' || result.status === 'check') &&
            !(result.decidedBy === 'zs' && result.status === 'fail') && (
              <span className="basis-full">{result.reason}</span>
            )}
        </p>
      )}
      {over && !open && (
        <p className="-mt-1.5 pb-3 pl-[56px] text-[12px] text-orange-300 sm:pl-[68px]">
          Run ≈ {c.length!.lengthM} m — over {c.length!.maxM} m
        </p>
      )}
      {open && (
        <div className="pb-3">
          <div className="space-y-0.5 pl-[56px] text-[12px] text-white sm:pl-[68px]">
            {n.typical && (
              <p>
                {c.device} · {c.cable}
              </p>
            )}
            {c.areaM2 ? <p>Serves {c.areaM2} m²</p> : null}
            {c.length && (
              <p className={c.length.ok === false ? 'text-orange-300' : 'text-white'}>
                Run ≈ {c.length.lengthM} m — {c.length.note}
              </p>
            )}
            <p className="text-elec-yellow">{c.source}</p>
            {result && result.status !== 'untested' && (
              <p className="tabular-nums">
                On the certificate:{' '}
                {[
                  result.zs && `Zs ${unit(result.zs, 'Ω')}`,
                  result.maxZs && `max ${unit(result.maxZs, 'Ω')}`,
                  result.r1r2 && `R1+R2 ${unit(result.r1r2, 'Ω')}`,
                  result.ir && `IR ${unit(result.ir, 'MΩ')}`,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}
          </div>
          {editing && onEdit && (
            <div className="mt-3 space-y-4 rounded-xl border border-white/[0.14] p-3 sm:ml-[68px] sm:p-4">
              <div>
                <label
                  htmlFor={`desc-${c.ref}`}
                  className="mb-1 block text-[12px] font-medium text-white"
                >
                  Circuit description
                </label>
                <input
                  id={`desc-${c.ref}`}
                  value={draft.description ?? c.description}
                  onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                  className={fieldCn}
                />
              </div>
              <div>
                <p className="mb-1 text-[12px] font-medium text-white">Device</p>
                <div className="flex flex-wrap gap-2">
                  {devices.map(([id, text]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, device: id }))}
                      className={`h-11 rounded-full border px-4 text-sm touch-manipulation ${(draft.device ?? (sub ? 'MCB' : n.device)) === id ? chipOn : chipOff}`}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1 text-[12px] font-medium text-white">Rating</p>
                  <MobileSelectPicker
                    value={draft.rating ?? (/^[BCD]\d+$/.test(n.rating) ? n.rating : '')}
                    onValueChange={(v) => setDraft((d) => ({ ...d, rating: v }))}
                    options={ratings.map((r) => ({ value: r, label: r }))}
                    placeholder="Rating"
                    title="Curve and rating"
                  />
                </div>
                <div>
                  <p className="mb-1 text-[12px] font-medium text-white">
                    {sub ? 'Cable (SWA, mm²)' : 'Cable (mm², live/cpc)'}
                  </p>
                  <MobileSelectPicker
                    value={draft.cable ?? (cables.includes(n.cable) ? n.cable : '')}
                    onValueChange={(v) => setDraft((d) => ({ ...d, cable: v }))}
                    options={cables.map((r) => ({
                      value: r,
                      label: sub ? `${r} mm² SWA` : `${r} mm²`,
                    }))}
                    placeholder="Cable"
                    title="Cable, live/cpc"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const clean = Object.fromEntries(
                      Object.entries({ ...edit, ...draft }).filter(
                        ([, v]) => v !== undefined && v !== ''
                      )
                    );
                    onEdit(Object.keys(clean).length ? clean : null);
                    setDraft({});
                    setEditing(false);
                  }}
                  className="h-11 rounded-full bg-elec-yellow px-5 text-sm font-semibold text-black touch-manipulation"
                >
                  Save changes
                </button>
                {edit && (
                  <button
                    type="button"
                    onClick={() => {
                      onEdit(null);
                      setDraft({});
                      setEditing(false);
                    }}
                    className={`h-11 rounded-full border px-5 text-sm touch-manipulation ${chipOff}`}
                  >
                    Back to the design
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setDraft({});
                    setEditing(false);
                  }}
                  className={`h-11 rounded-full border px-5 text-sm touch-manipulation ${chipOff}`}
                >
                  Cancel
                </button>
              </div>
              <p className="text-[12px] text-white">
                Carried to the plan, the single-line, the PDF and the certificate.{' '}
                {sub
                  ? 'A submain is sized by calculation — its voltage drop adds to every circuit it feeds (Reg 525.202).'
                  : "A changed device or cable is yours to check against OSG Table 7.1(i) — the design's length check no longer covers it."}
              </p>
            </div>
          )}
          {(onShow || onSplit || onEdit || onMove) && !editing && (
            <div className="mt-2 flex flex-wrap gap-2 pl-[56px] sm:pl-[68px]">
              {onEdit && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation active:scale-[0.98]"
                >
                  {edit ? 'Amend again' : 'Amend this way'}
                </button>
              )}
              {onMove && (
                <>
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => onMove(-1)}
                    aria-label={`Move way ${way?.label ?? ''} up`}
                    className="h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation disabled:opacity-40"
                  >
                    Move up
                  </button>
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => onMove(1)}
                    aria-label={`Move way ${way?.label ?? ''} down`}
                    className="h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation disabled:opacity-40"
                  >
                    Move down
                  </button>
                </>
              )}
              {onSplit && c.length?.ok === false && c.points >= MIN_SPLIT_POINTS && (
                <button
                  type="button"
                  onClick={() => onSplit(c.ref)}
                  className="h-11 rounded-full bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation active:scale-[0.98]"
                >
                  Split into two circuits
                </button>
              )}
              {onShow && c.points > 0 && (
                <button
                  type="button"
                  onClick={() => onShow(c.ref)}
                  className="h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation active:scale-[0.98]"
                >
                  Show on plan
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/** The single-line diagram — the same builder the PDF page uses. */
const SingleLine = ({
  ways,
  zones,
  board,
  fedFrom,
  wayOf,
  supply,
  earthing,
}: {
  ways: DesignedCircuit[];
  zones: DesignedCircuit[];
  board: string;
  fedFrom?: string;
  wayOf: Map<string, Way>;
  supply: Supply;
  earthing: Earthing;
}) => {
  const { svg } = useMemo(
    () => singleLineSvg(ways, zones, { board, fedFrom, wayOf, supply, earthing }),
    [ways, zones, board, fedFrom, wayOf, supply, earthing]
  );
  return (
    <div
      role="img"
      aria-label="Single-line diagram of the distribution board"
      // Natural size on a phone, scrolling across inside its own panel:
      // shrunk to fit a 390 px screen its labels were 8 px.
      className="-mx-4 overflow-x-auto rounded-none bg-white p-3 sm:mx-0 sm:rounded-2xl sm:p-4 [&>svg]:mx-auto [&>svg]:h-auto [&>svg]:w-[520px] [&>svg]:max-w-none sm:[&>svg]:w-full sm:[&>svg]:max-w-[640px]"
      // Markup built from our own circuit data, every string escaped.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
