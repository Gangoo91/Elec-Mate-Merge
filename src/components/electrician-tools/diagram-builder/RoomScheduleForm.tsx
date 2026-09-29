/**
 * Room by room (29 Sep 2026): list the rooms, their sizes and what goes in
 * each, and the plan is drawn exactly from that — no reading, no guessing.
 * The same list always draws the same plan (see roomSchedule.ts).
 */
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { PrimaryAction, ToolIntro } from './aiToolUi';
import {
  EXTRAS,
  ROOM_PRESETS,
  planFromSchedule,
  type ExtraItem,
  type ScheduleRoom,
} from './roomSchedule';
import type { AIPlanData } from './aiPlanToObjects';

const FLOOR_NAMES = ['Ground floor', 'First floor', 'Second floor'];
const STORE_KEY = 'floor-planner-room-list';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors ' +
  'hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none ' +
  '[color-scheme:dark] touch-manipulation';
const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04]';

type Row = ScheduleRoom & { key: number };

function Stepper({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  const step = (d: number) => onChange(Math.min(Math.max(value + d, 0), 30));
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[14px] font-medium text-white">{label}</span>
      <div className="flex items-center overflow-hidden rounded-xl border border-white/[0.12]">
        <button
          type="button"
          aria-label={`Fewer ${label.toLowerCase()}`}
          onClick={() => step(-1)}
          disabled={value === 0}
          className="h-11 w-11 text-lg font-semibold text-white touch-manipulation disabled:opacity-30 active:bg-white/10"
        >
          −
        </button>
        <span className="w-9 text-center text-[15px] font-bold tabular-nums text-white">
          {value}
        </span>
        <button
          type="button"
          aria-label={`More ${label.toLowerCase()}`}
          onClick={() => step(1)}
          className="h-11 w-11 text-lg font-semibold text-white touch-manipulation active:bg-white/10"
        >
          +
        </button>
      </div>
    </div>
  );
}

/**
 * A size field that keeps what is typed. Bound straight to a number it could
 * not be cleared to retype ("" became 0, then "04"); this holds the text and
 * only commits a real size.
 */
function SizeField({
  id,
  label,
  value,
  onCommit,
}: {
  id: string;
  label: string;
  value: number;
  onCommit: (n: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  const focused = useRef(false);
  useEffect(() => {
    if (!focused.current) setDraft(String(value));
  }, [value]);
  const n = Number.parseFloat(draft);
  const invalid = !Number.isFinite(n) || n < 0.9 || n > 40;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[12px] font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={draft}
        onFocus={() => (focused.current = true)}
        onBlur={() => {
          focused.current = false;
          if (invalid) setDraft(String(value));
        }}
        onChange={(e) => {
          const text = e.target.value.replace(',', '.');
          setDraft(text);
          const v = Number.parseFloat(text);
          if (Number.isFinite(v) && v >= 0.9 && v <= 40) onCommit(Math.round(v * 100) / 100);
        }}
        aria-invalid={invalid}
        className={inputCn}
      />
      {invalid && draft !== '' && (
        <p className="mt-1 text-[12px] text-orange-300">Between 0.9 and 40 m</p>
      )}
    </div>
  );
}

const summaryOf = (r: ScheduleRoom) => {
  const bits = [`${r.width} × ${r.length} m`];
  if (r.sockets) bits.push(`${r.sockets} double${r.sockets === 1 ? '' : 's'}`);
  if (r.lights) bits.push(`${r.lights} light${r.lights === 1 ? '' : 's'}`);
  EXTRAS.forEach((e) => {
    const n = r.extras[e.id] ?? 0;
    if (n) bits.push(n > 1 ? `${n} × ${e.label.toLowerCase()}` : e.label.toLowerCase());
  });
  return bits.join(' · ');
};

export function RoomScheduleForm({
  onDraw,
}: {
  onDraw: (plan: AIPlanData, count: number) => void;
}) {
  const haptic = useHaptic();
  // Kept for the session: Back, a swipe-down or a dropped file used to throw a
  // twenty-room list away.
  const saved = (() => {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      return raw ? (JSON.parse(raw) as { floorCount: number; rows: Row[] }) : null;
    } catch {
      return null;
    }
  })();
  const [floorCount, setFloorCount] = useState(saved?.floorCount ?? 1);
  const [rows, setRows] = useState<Row[]>(saved?.rows ?? []);
  const [open, setOpen] = useState<number | null>(null);
  const [nextKey, setNextKey] = useState(1 + Math.max(0, ...(saved?.rows ?? []).map((r) => r.key)));
  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ floorCount, rows }));
    } catch {
      /* private mode: the list simply isn't kept */
    }
  }, [floorCount, rows]);
  const floors = FLOOR_NAMES.slice(0, floorCount);

  // A room just added opens below the fold — bring it into view.
  useEffect(() => {
    if (open == null) return;
    document
      .getElementById(`room-${open}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [open]);

  const add = (presetName?: string) => {
    haptic.selection();
    const p = ROOM_PRESETS.find((x) => x.name === presetName);
    const base = p?.name ?? 'Room';
    // The lowest free number: counting matches gave "Kitchen 3" twice once
    // "Kitchen 2" had been removed — and same-named rooms merge on a schedule.
    const taken = new Set(rows.map((r) => r.name.trim().toLowerCase()));
    let suffix = 1;
    while (
      taken.has(`${base} ${suffix}`.toLowerCase()) ||
      (suffix === 1 && taken.has(base.toLowerCase()))
    )
      suffix++;
    const sameName = suffix - 1;
    const lastFloor = rows[rows.length - 1]?.floor ?? floors[0];
    const row: Row = {
      key: nextKey,
      name: sameName || ['Bedroom', 'Room'].includes(base) ? `${base} ${sameName + 1}` : base,
      floor: floors.includes(lastFloor) ? lastFloor : floors[0],
      width: p?.width ?? 3,
      length: p?.length ?? 3,
      sockets: p?.sockets ?? 2,
      lights: p?.lights ?? 1,
      extras: { ...(p?.extras ?? {}) },
    };
    setRows((prev) => [...prev, row]);
    setOpen(nextKey);
    setNextKey((k) => k + 1);
  };
  const update = (key: number, patch: Partial<ScheduleRoom>) =>
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  const setExtra = (key: number, id: ExtraItem, n: number) =>
    setRows((prev) =>
      prev.map((r) => (r.key === key ? { ...r, extras: { ...r.extras, [id]: n } } : r))
    );
  const remove = (key: number) => {
    haptic.light();
    setRows((prev) => prev.filter((r) => r.key !== key));
    if (open === key) setOpen(null);
  };

  // Each room keeps the floor it was given. With fewer floors showing, a room
  // on a hidden floor is drawn on the top one — and goes back if the floor
  // comes back, rather than being quietly rewritten.
  const changeFloors = (n: number) => setFloorCount(n);
  const floorOf = (r: ScheduleRoom) =>
    floors.includes(r.floor) ? r.floor : floors[floors.length - 1];
  const moved = floorCount > 1 ? rows.filter((r) => !floors.includes(r.floor)).length : 0;

  const draw = () => {
    haptic.success();
    const list = rows.map(({ key: _key, ...r }) => ({
      ...r,
      floor: floorCount > 1 ? floorOf(r) : '',
    }));
    // On a phone the floors stack, so a two-storey plan fills the width.
    const stackFloors = typeof window !== 'undefined' && window.innerWidth < 640;
    onDraw(planFromSchedule(list, { stackFloors }), list.length);
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5 px-4 pb-28 pt-5 sm:px-5">
      <ToolIntro>
        List the rooms, their sizes and what goes in each. It is drawn exactly as you list it —
        rooms either side of the hall, doors off it — ready to move and edit.
      </ToolIntro>

      <div>
        <p className="mb-2 text-[12px] font-medium text-white">Floors</p>
        <div className="flex gap-2">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => changeFloors(n)}
              className={cn(
                'h-11 flex-1 rounded-full border text-sm touch-manipulation',
                floorCount === n ? chipOn : chipOff
              )}
            >
              {n === 1 ? 'One' : n === 2 ? 'Two' : 'Three'}
            </button>
          ))}
        </div>
        {moved > 0 && (
          <p className="mt-2 text-[12px] text-orange-300">
            {moved} room{moved === 1 ? ' is' : 's are'} on a floor not shown — drawn on the{' '}
            {floors[floors.length - 1].toLowerCase()} until you add the floor back.
          </p>
        )}
      </div>

      <div>
        <p className="mb-2 text-[12px] font-medium text-white">Add a room</p>
        <div className="flex flex-wrap gap-2">
          {ROOM_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => add(p.name)}
              className={cn(
                'h-11 rounded-full border px-4 text-sm touch-manipulation active:scale-[0.97]',
                chipOff
              )}
            >
              {p.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => add()}
            className={cn(
              'h-11 rounded-full border px-4 text-sm touch-manipulation active:scale-[0.97]',
              chipOff
            )}
          >
            Other room
          </button>
        </div>
      </div>

      {rows.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-medium text-white">
            {rows.length} room{rows.length === 1 ? '' : 's'} — kept until you clear the list
          </p>
          <button
            type="button"
            onClick={() => {
              haptic.light();
              // One tap, but not a trap: the list comes back with Undo.
              const previous = rows;
              setRows([]);
              setOpen(null);
              toast(`${previous.length} room${previous.length === 1 ? '' : 's'} cleared`, {
                action: { label: 'Undo', onClick: () => setRows(previous) },
                duration: 6000,
              });
            }}
            className="h-11 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Clear list
          </button>
        </div>
      )}

      {rows.length > 0 && (
        <div className={cardCn}>
          {rows.map((r, i) => {
            const isOpen = open === r.key;
            return (
              <div
                key={r.key}
                id={`room-${r.key}`}
                className={cn('scroll-mb-24', i > 0 && 'border-t border-white/[0.1]')}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : r.key)}
                  aria-expanded={isOpen}
                  className="flex min-h-[56px] w-full items-center gap-3 px-4 py-2.5 text-left touch-manipulation sm:px-5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-white">
                      {r.name || 'Unnamed room'}
                      {floorCount > 1 && (
                        <span className="font-medium"> · {floorOf(r).replace(' floor', '')}</span>
                      )}
                    </span>
                    {!isOpen && (
                      <span className="block truncate text-[12px] text-white">{summaryOf(r)}</span>
                    )}
                  </span>
                  <span className="text-[13px] font-semibold text-elec-yellow">
                    {isOpen ? 'Done' : 'Edit'}
                  </span>
                </button>

                {isOpen && (
                  <div className="space-y-4 px-4 pb-4 sm:px-5">
                    <div>
                      <label
                        htmlFor={`name-${r.key}`}
                        className="mb-1 block text-[12px] font-medium text-white"
                      >
                        Name
                      </label>
                      <input
                        id={`name-${r.key}`}
                        value={r.name}
                        onChange={(e) => update(r.key, { name: e.target.value })}
                        className={inputCn}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <SizeField
                        id={`width-${r.key}`}
                        label="Width (m)"
                        value={r.width}
                        onCommit={(n) => update(r.key, { width: n })}
                      />
                      <SizeField
                        id={`length-${r.key}`}
                        label="Length (m)"
                        value={r.length}
                        onCommit={(n) => update(r.key, { length: n })}
                      />
                    </div>
                    {floorCount > 1 && (
                      <div className="flex gap-2">
                        {floors.map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => update(r.key, { floor: f })}
                            className={cn(
                              'h-11 flex-1 rounded-full border text-sm touch-manipulation',
                              floorOf(r) === f ? chipOn : chipOff
                            )}
                          >
                            {f.replace(' floor', '')}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="space-y-2 border-t border-white/[0.1] pt-4">
                      <Stepper
                        label="Double sockets"
                        value={r.sockets}
                        onChange={(n) => update(r.key, { sockets: n })}
                      />
                      <Stepper
                        label="Lights"
                        value={r.lights}
                        onChange={(n) => update(r.key, { lights: n })}
                      />
                    </div>
                    <div className="border-t border-white/[0.1] pt-4">
                      <p className="mb-2 text-[12px] font-medium text-white">Also in this room</p>
                      <div className="flex flex-wrap gap-2">
                        {EXTRAS.map((e) => {
                          const n = r.extras[e.id] ?? 0;
                          return (
                            <button
                              key={e.id}
                              type="button"
                              onClick={() => setExtra(r.key, e.id, n ? 0 : 1)}
                              className={cn(
                                'h-11 rounded-full border px-4 text-sm touch-manipulation',
                                n ? chipOn : chipOff
                              )}
                            >
                              {e.label}
                            </button>
                          );
                        })}
                      </div>
                      {EXTRAS.filter((e) => (r.extras[e.id] ?? 0) > 0).length > 0 && (
                        <div className="mt-3 space-y-2">
                          {EXTRAS.filter((e) => (r.extras[e.id] ?? 0) > 0).map((e) => (
                            <Stepper
                              key={e.id}
                              label={e.label}
                              value={r.extras[e.id] ?? 0}
                              onChange={(n) => setExtra(r.key, e.id, n)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(r.key)}
                      className="h-11 w-full rounded-xl border border-white/[0.12] text-sm font-medium text-red-300 touch-manipulation active:bg-red-500/10"
                    >
                      Remove {r.name || 'room'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 border-t border-white/[0.1] bg-background/95 px-4 pb-[calc(12px+env(safe-area-inset-bottom,0px))] pt-3 backdrop-blur sm:-mx-5 sm:px-5">
        <PrimaryAction onClick={draw} disabled={rows.length === 0}>
          {rows.length
            ? `Draw ${rows.length} room${rows.length === 1 ? '' : 's'}`
            : 'Add a room to start'}
        </PrimaryAction>
      </div>
    </div>
  );
}
