/**
 * The board, as the drawing wires it (28 Sep 2026).
 *
 * Built from the canvas every time it opens (`scheduleFromObjects`), so moving
 * a socket to another circuit on the drawing moves it here too. Two views of
 * the same circuits: the schedule an electrician fills a board from, and the
 * single-line diagram that goes on the wall of the plant room.
 *
 * Fire detection zones are panel zones, not board ways; they are listed under
 * the panel, which takes one dedicated way of its own (FA1).
 */
import { useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
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
  MIN_SPLIT_POINTS,
  withRuns,
  withoutRuns,
  type Earthing,
} from './wiring';
import { singleLineSvg } from './singleLine';

interface BoardScheduleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  objects: CanvasObject[];
  /** Point at a circuit on the drawing. */
  onShowCircuit?: (ref: string) => void;
  /** Change the drawing: building type, board, cable runs, a split circuit. */
  onChange?: (next: CanvasObject[]) => void;
}

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04]';

const isZone = (c: DesignedCircuit) => c.kind === 'fire-zone';

export const BoardScheduleSheet = ({
  open,
  onOpenChange,
  objects,
  onShowCircuit,
  onChange,
}: BoardScheduleSheetProps) => {
  const [view, setView] = useState<'schedule' | 'diagram'>('schedule');
  const [fixNote, setFixNote] = useState<string | null>(null);
  const { circuits, premises } = useMemo(
    () => (open ? scheduleFromObjects(objects) : { circuits: [], premises: 'dwelling' as const }),
    [open, objects]
  );
  const ways = circuits.filter((c) => !isZone(c));
  const zones = circuits.filter(isZone);
  const afddCount = ways.filter((c) => c.afdd).length;
  const warnings = circuits.flatMap((c) => [
    ...c.notes.filter((n) => /over|split/i.test(n)).map((n) => `${c.ref}: ${n}`),
    ...(c.length?.ok === false ? [`${c.ref}: run ≈ ${c.length.lengthM} m — ${c.length.note}`] : []),
  ]);
  const settings = useMemo(() => planSettings(objects), [objects]);
  const board = findBoard(objects);
  const runsDrawn = hasRuns(objects);
  const takeOff = useMemo(
    () => (runsDrawn ? cableTakeOff(circuits, runLengths(objects)) : []),
    [runsDrawn, circuits, objects]
  );
  const designed = objects.some((o) => o.type === 'symbol' && o.roomKey);
  // One list of ways per board once the plan has sub-boards.
  const subs = subBoards(objects);
  const groups = !subs.length
    ? [{ name: 'CU', title: '', ways }]
    : [
        { name: 'CU', title: 'Main board' },
        ...subs.map((b) => ({
          name: b.circuitRef!,
          title: `${b.circuitRef} — sub-board${b.roomName ? ` in ${b.roomName}` : ''}`,
        })),
      ].map((g) => ({ ...g, ways: ways.filter((c) => (c.board ?? 'CU') === g.name) }));
  const overRefs = ways
    .filter((c) => c.length?.ok === false && c.kind !== 'submain')
    .map((c) => c.ref);
  const setType = (t: BuildingType) =>
    onChange?.(redesignCircuits(objects, { buildingType: t, earthing: settings.earthing }));
  const setEarthing = (e: Earthing) =>
    onChange?.(objects.map((o) => (o.type === 'symbol' && o.roomKey ? { ...o, earthing: e } : o)));

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
                {ways.length} way{ways.length === 1 ? '' : 's'} ·{' '}
                {BUILDING_TYPES.find((b) => b.id === settings.buildingType)?.label ??
                  (premises === 'multi-occupancy'
                    ? 'Multi-occupancy building'
                    : zones.length
                      ? 'Non-domestic building'
                      : 'Dwelling')}
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
                  {designed && onChange && (
                    <section className={`${cardCn} space-y-4 p-4 sm:p-5`}>
                      <div>
                        <h3 className="text-[15px] font-semibold tracking-tight text-white">
                          Building
                        </h3>
                        <p className="mb-2 text-[12px] text-white">
                          Sets AFDDs (Reg 421.1.7) and the fire alarm system. Changing it re-designs
                          the circuits — any you split or moved by hand are redone.
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
                        <p className="mb-2 text-[12px] text-white">For the cable-length check.</p>
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
                      <div className="border-t border-white/[0.1] pt-4">
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
                                    setFixNote(
                                      [
                                        r.added.length
                                          ? `Added ${r.added.join(', ')} near the far rooms.`
                                          : '',
                                        r.split.length ? `Split ${r.split.join(', ')}.` : '',
                                        r.stillOver.length
                                          ? `Still over: ${r.stillOver.join(', ')} — too few points to split; check them or up the cable.`
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
                  {groups.map((g) => (
                    <section key={g.name}>
                      {g.title && (
                        <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                          {g.title}
                          <span className="ml-2 text-[13px] font-medium">
                            {g.ways.length} way{g.ways.length === 1 ? '' : 's'}
                          </span>
                        </h3>
                      )}
                      <div className={cardCn}>
                        {g.ways.map((c, i) => (
                          <WayRow
                            key={c.ref}
                            way={i + 1}
                            c={c}
                            first={i === 0}
                            onShow={onShowCircuit}
                            onSplit={
                              onChange ? (ref) => onChange(splitCircuit(objects, ref)) : undefined
                            }
                          />
                        ))}
                      </div>
                    </section>
                  ))}
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
                                className="w-10 shrink-0 border-l-[3px] pl-1.5 text-sm font-bold text-white"
                                style={{ borderColor: circuitColour(z.ref) }}
                              >
                                {z.ref}
                              </span>
                              <span className="flex-1 text-sm font-medium text-white">
                                {z.description}
                              </span>
                              <span className="text-[13px] tabular-nums text-white">
                                {z.points} devices{z.areaM2 ? ` · ${z.areaM2} m²` : ''}
                              </span>
                            </div>
                            <p className="sm:ml-[52px] mt-1 text-[12px] text-white">{z.source}</p>
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
                        fedFrom={i ? 'CU' : undefined}
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

const WayRow = ({
  way,
  c,
  first,
  onShow,
  onSplit,
}: {
  way: number;
  c: DesignedCircuit;
  first: boolean;
  onShow?: (ref: string) => void;
  onSplit?: (ref: string) => void;
}) => (
  <div className={`px-4 py-3 sm:px-5 ${first ? '' : 'border-t border-white/[0.1]'}`}>
    <div className="flex items-baseline gap-3">
      <span className="w-6 shrink-0 text-[12px] tabular-nums text-white">{way}</span>
      <span
        className="w-10 shrink-0 border-l-[3px] pl-1.5 text-sm font-bold text-white"
        style={{ borderColor: circuitColour(c.ref) }}
      >
        {c.ref}
      </span>
      <span className="min-w-0 flex-1 text-sm font-semibold text-white">{c.description}</span>
      {c.points > 0 && (
        <span className="shrink-0 text-[13px] tabular-nums text-white">
          {c.points} pt{c.points === 1 ? '' : 's'}
        </span>
      )}
    </div>
    <div className="sm:ml-[76px] mt-1.5 space-y-0.5 text-[13px] text-white">
      <p>{c.device}</p>
      <p>
        {c.cable}
        {c.areaM2 ? ` · serves ${c.areaM2} m²` : ''}
      </p>
      {c.rooms.length > 0 && <p className="truncate">{c.rooms.join(', ')}</p>}
      {c.length && (
        <p className={c.length.ok === false ? 'text-orange-300' : 'text-white'}>
          Run ≈ {c.length.lengthM} m — {c.length.note}
        </p>
      )}
      <p className="text-[12px] text-elec-yellow">{c.source}</p>
    </div>
    {onSplit && c.length?.ok === false && c.points >= MIN_SPLIT_POINTS && (
      <button
        type="button"
        onClick={() => onSplit(c.ref)}
        className="mt-2 h-11 rounded-full bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation active:scale-[0.98] sm:ml-[76px]"
      >
        Split into two circuits
      </button>
    )}
    {onShow && c.points > 0 && (
      <button
        type="button"
        onClick={() => onShow(c.ref)}
        className="sm:ml-[76px] mt-2 h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation active:scale-[0.98]"
      >
        Show on plan
      </button>
    )}
  </div>
);

/** The single-line diagram — the same builder the PDF page uses. */
const SingleLine = ({
  ways,
  zones,
  fedFrom,
}: {
  ways: DesignedCircuit[];
  zones: DesignedCircuit[];
  fedFrom?: string;
}) => {
  const { svg } = useMemo(() => singleLineSvg(ways, zones, { fedFrom }), [ways, zones, fedFrom]);
  return (
    <div
      role="img"
      aria-label="Single-line diagram of the distribution board"
      className="-mx-4 rounded-none bg-white p-3 sm:mx-0 sm:rounded-2xl sm:p-4 [&>svg]:mx-auto [&>svg]:h-auto [&>svg]:w-full [&>svg]:max-w-[640px]"
      // Markup built from our own circuit data, every string escaped.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
