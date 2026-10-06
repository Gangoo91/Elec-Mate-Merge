/**
 * ScheduleReview — the learner's schedule after a run, box by box.
 *
 * AM2 plan, 6 Oct 2026. The debrief listed what cost marks, but a learner
 * couldn't see their schedule against the right one. This lays the schedule
 * out as they filled it in, each box marked right or wrong, and a tap on a box
 * says what belonged there, the limit it's judged against and whether the
 * reading needed a remark. Tablet up: the schedule grid. Phone: a list per
 * circuit (no sideways scrolling).
 */
import { useMemo, useState } from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { AM2_RIG_CIRCUITS } from '@/data/am2RigCircuits';
import { RESULT_COLS, type Marking, type MarkedBox } from '@/data/am2/sectionBRules';

const STATUS_WORD: Record<MarkedBox['status'], string> = {
  right: 'Right',
  wrong: 'Wrong entry',
  empty: 'Left empty',
  untested: 'Not tested',
};

const CELL: Record<MarkedBox['status'], string> = {
  right: 'border-emerald-400/70',
  wrong: 'border-red-500 border-2',
  empty: 'border-red-500 border-2 border-dashed',
  untested: 'border-white/[0.18]',
};

function shown(v: string) {
  return v === '' ? '—' : v;
}

/** What a box needed, said plainly. */
function BoxDetail({ box }: { box: MarkedBox }) {
  const c = AM2_RIG_CIRCUITS.find((x) => x.id === box.circuitId);
  return (
    <div className="space-y-1.5 text-[13.5px] leading-snug text-white">
      <p className="text-[12px] font-semibold">
        Circuit {box.circuitId}
        {c ? ` — ${c.name}` : ''} · column {box.col} · {box.label}
      </p>
      <p className="flex flex-wrap gap-x-5 gap-y-1">
        <span>
          You wrote: <span className="font-mono font-bold">{shown(box.have)}</span>
        </span>
        {box.status !== 'untested' && (
          <span>
            Should be:{' '}
            <span className="font-mono font-bold">{box.want === '' ? 'nothing' : box.want}</span>
          </span>
        )}
        <span
          className={cn(
            'font-semibold',
            box.status === 'right'
              ? 'text-white'
              : box.status === 'untested'
                ? 'text-white'
                : 'text-white'
          )}
        >
          {STATUS_WORD[box.status]}
        </span>
      </p>
      {box.status === 'wrong' && !box.want && (
        <p>
          That test wasn’t done, so nothing should be written here. Only write in a reading you’ve
          taken.
        </p>
      )}
      {box.status === 'untested' && (
        <p>This test wasn’t done, so there was no reading for this box. It counts under testing.</p>
      )}
      {box.want === 'N/A' && (
        <p>
          {box.key.startsWith('ring')
            ? 'Ring columns don’t apply to a radial circuit — write N/A.'
            : 'There is no RCD on this circuit, so the RCD columns are N/A.'}
        </p>
      )}
      {box.status === 'wrong' &&
        box.want &&
        box.want !== 'N/A' &&
        (box.key === 'r1r2' || box.key === 'maxMeasuredZs') && (
          <p>
            Check which test each reading came from. The highest reading goes in where a test is
            taken at more than one point (R₁+R₂ and Zs).
          </p>
        )}
      {box.limit && (
        <p>
          Limit: {box.limit}.{' '}
          {box.outside ? (
            <span className="font-semibold text-white">
              This reading was outside it, so the circuit needed a remark.
            </span>
          ) : (
            'This reading was within it.'
          )}
        </p>
      )}
    </div>
  );
}

export function ScheduleReview({ marking }: { marking: Marking }) {
  const { boxes, remarks } = marking;
  const toFix = boxes.filter((b) => b.status === 'wrong' || b.status === 'empty').length;
  const right = boxes.filter((b) => b.status === 'right').length;
  const marked = boxes.filter((b) => b.status !== 'untested').length;
  const [onlyFix, setOnlyFix] = useState(toFix > 0);
  const [selectedRemark, setSelectedRemark] = useState<number | null>(null);
  const [selected, setSelected] = useState<MarkedBox | null>(
    () => boxes.find((b) => b.status === 'wrong' || b.status === 'empty') ?? null
  );

  const byCircuit = useMemo(
    () =>
      AM2_RIG_CIRCUITS.map((c) => ({
        c,
        boxes: boxes.filter((b) => b.circuitId === c.id),
        remark: remarks.find((r) => r.circuitId === c.id),
      })),
    [boxes, remarks]
  );

  return (
    <section className={cn('rounded-2xl border border-white/[0.14] p-4 sm:p-5', CARD_SURFACE)}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-bold text-white">Your schedule, box by box</h2>
          <p className="mt-0.5 text-[13px] text-white">
            {right} of {marked} boxes right
            {toFix ? ` · ${toFix} to fix` : ' · nothing to fix'}. Tap a box to see what belonged
            there.
          </p>
        </div>
        {toFix > 0 && (
          <div className="flex gap-1.5">
            {[
              { on: true, label: 'Only the ones to fix' },
              { on: false, label: 'Every box' },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => setOnlyFix(o.on)}
                className={cn(
                  'h-11 rounded-xl border px-3.5 text-[13px] touch-manipulation',
                  onlyFix === o.on
                    ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                    : 'border-white/[0.14] bg-white/[0.06] font-medium text-white'
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Laptop up: the schedule as it's laid out on the form (a tablet gets the list) */}
      <div className="mt-4 hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[860px] border-separate border-spacing-1 text-white">
          <thead>
            <tr className="text-[11.5px] font-semibold">
              <th className="px-1 text-left">Circuit</th>
              {RESULT_COLS.map((rc) => (
                <th key={rc.key} className="px-1 text-center leading-tight">
                  <span className="block font-mono">{rc.col}</span>
                  {rc.label}
                </th>
              ))}
              <th className="px-1 text-left leading-tight">
                <span className="block font-mono">31</span>
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {byCircuit.map(({ c, boxes: row, remark }) => (
              <tr key={c.id}>
                <td className="whitespace-nowrap px-1 text-[12.5px] font-semibold">
                  <span className="font-mono">{c.id}</span> {c.name}
                </td>
                {row.map((b) => {
                  const dim = onlyFix && (b.status === 'right' || b.status === 'untested');
                  const isSel = selected?.circuitId === b.circuitId && selected.key === b.key;
                  return (
                    <td key={b.key} className="p-0">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRemark(null);
                          setSelected(b);
                        }}
                        aria-label={`Circuit ${b.circuitId}, ${b.label}: ${STATUS_WORD[b.status]}`}
                        className={cn(
                          'relative flex h-11 w-full items-center justify-center rounded-lg border px-1 font-mono text-[12.5px] font-semibold text-white touch-manipulation',
                          // "Only the ones to fix": right boxes step back by border, not by fading the text.
                          dim ? 'border-white/[0.08]' : CELL[b.status],
                          isSel && 'ring-2 ring-elec-yellow ring-offset-1 ring-offset-black'
                        )}
                      >
                        <span className="truncate">{shown(b.have)}</span>
                        {/* Not colour alone: a tick or a cross as well */}
                        {!dim && b.status === 'right' && (
                          <Check
                            className="absolute left-0.5 top-0.5 h-3 w-3 text-emerald-400"
                            aria-hidden
                          />
                        )}
                        {(b.status === 'wrong' || b.status === 'empty') && (
                          <X
                            className="absolute left-0.5 top-0.5 h-3 w-3 text-red-400"
                            aria-hidden
                          />
                        )}
                        {b.outside && (
                          <AlertTriangle
                            className="absolute right-0.5 top-0.5 h-3 w-3 text-red-400"
                            aria-hidden
                          />
                        )}
                      </button>
                    </td>
                  );
                })}
                <td className="p-0">
                  {remark && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(null);
                        setSelectedRemark(remark.circuitId);
                      }}
                      aria-label={`Circuit ${remark.circuitId} remarks: ${remark.right ? 'right' : 'wrong'}`}
                      className={cn(
                        'relative flex h-11 w-full min-w-[9rem] items-center gap-1.5 rounded-lg border px-2 pl-4 text-left text-[12px] text-white touch-manipulation',
                        onlyFix && remark.right
                          ? 'border-white/[0.08]'
                          : remark.right
                            ? remark.want
                              ? 'border-emerald-400/70'
                              : 'border-white/[0.18]'
                            : 'border-2 border-red-500',
                        selectedRemark === remark.circuitId &&
                          'ring-2 ring-elec-yellow ring-offset-1 ring-offset-black'
                      )}
                    >
                      {!remark.right && (
                        <X className="absolute left-0.5 top-0.5 h-3 w-3 text-red-400" aria-hidden />
                      )}
                      <span className="line-clamp-2">{remark.have || '—'}</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The remark picked, explained */}
      {selectedRemark !== null &&
        (() => {
          const r = remarks.find((x) => x.circuitId === selectedRemark);
          if (!r) return null;
          return (
            <div className="mt-3 hidden rounded-xl border border-white/[0.14] bg-white/[0.04] p-3.5 text-[13.5px] leading-snug text-white lg:block">
              <p className="text-[12px] font-semibold">
                Circuit {r.circuitId} · column 31 · Remarks
              </p>
              <p className="mt-1.5">
                You wrote: <span className="font-semibold">{r.have || '—'}</span>
                {' · '}
                Should be: <span className="font-semibold">{r.want || 'nothing'}</span>{' '}
                <span className={cn('font-semibold', 'text-white')}>
                  {r.right ? 'Right' : 'Wrong'}
                </span>
              </p>
              <p className="mt-1">
                {r.want
                  ? 'A reading on this circuit was outside its limit, so it needed a remark saying which.'
                  : 'Nothing on this circuit was outside a limit, so no remark — a remark here would be wrong.'}
              </p>
            </div>
          );
        })()}

      {/* The box picked, explained */}
      {selected && (
        <div className="mt-3 hidden rounded-xl border border-white/[0.14] bg-white/[0.04] p-3.5 lg:block">
          <BoxDetail box={selected} />
        </div>
      )}

      {/* Remarks that were wrong, said in words (the grid can only colour them) */}
      {remarks.some((r) => !r.right) && (
        <ul className="mt-3 hidden space-y-1 lg:block">
          {remarks
            .filter((r) => !r.right)
            .map((r) => (
              <li key={r.circuitId} className="flex gap-2 text-[13px] text-white">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                Circuit {r.circuitId} remark:{' '}
                {r.want
                  ? `should be “${r.want}”${r.have ? ` — you wrote “${r.have}”` : ' — left blank'}.`
                  : `“${r.have}”, but nothing on this circuit was outside a limit — no remark.`}
              </li>
            ))}
        </ul>
      )}

      {/* Phone: a list per circuit */}
      <div className="mt-4 space-y-3 lg:hidden">
        {byCircuit.map(({ c, boxes: row, remark }) => {
          const list = onlyFix
            ? row.filter((b) => b.status === 'wrong' || b.status === 'empty')
            : row.filter((b) => b.status !== 'untested' || b.have);
          const showRemark = remark && (!onlyFix || !remark.right) && (remark.have || remark.want);
          const rowRight = row.filter((b) => b.status === 'right').length;
          const rowMarked = row.filter((b) => b.status !== 'untested').length;
          if (onlyFix && !list.length && !showRemark) return null;
          return (
            <div key={c.id} className="rounded-xl border border-white/[0.12]">
              <p className="flex items-center justify-between border-b border-white/[0.08] px-3.5 py-2.5 text-[13.5px] font-semibold text-white">
                <span>
                  <span className="font-mono">{c.id}</span> {c.name}
                </span>
                <span className="font-mono text-[12px]">
                  {rowRight}/{rowMarked}
                </span>
              </p>
              <ul className="divide-y divide-white/[0.07]">
                {list.map((b) => {
                  const open = selected?.circuitId === b.circuitId && selected.key === b.key;
                  return (
                    <li key={b.key}>
                      <button
                        type="button"
                        onClick={() => setSelected(open ? null : b)}
                        className="flex min-h-[48px] w-full items-center gap-2.5 px-3.5 py-2 text-left touch-manipulation"
                      >
                        <span
                          className={cn(
                            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                            b.status === 'right'
                              ? 'bg-emerald-400'
                              : b.status === 'untested'
                                ? 'border border-white/[0.3]'
                                : 'bg-red-500'
                          )}
                        >
                          {b.status === 'right' ? (
                            <Check className="h-3 w-3 text-black" />
                          ) : b.status !== 'untested' ? (
                            <X className="h-3 w-3 text-white" />
                          ) : null}
                        </span>
                        <span className="min-w-0 flex-1 text-[13px] text-white">
                          {b.label} <span className="font-mono text-[11.5px]">({b.col})</span>
                        </span>
                        <span className="shrink-0 font-mono text-[13px] font-semibold text-white">
                          {shown(b.have)}
                          {b.status === 'wrong' || b.status === 'empty' ? (
                            <span className="text-white"> → {shown(b.want)}</span>
                          ) : null}
                        </span>
                        {b.outside && (
                          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-red-400" />
                        )}
                      </button>
                      {open && (
                        <div className="px-3.5 pb-3">
                          <BoxDetail box={b} />
                        </div>
                      )}
                    </li>
                  );
                })}
                {showRemark && remark && (
                  <li className="px-3.5 py-2.5 text-[13px] text-white">
                    <span className="font-semibold">Remarks (31): </span>
                    {remark.right
                      ? remark.have
                      : remark.want
                        ? `should be “${remark.want}”${remark.have ? ` — you wrote “${remark.have}”` : ' — left blank'}`
                        : `“${remark.have}”, but nothing here was outside a limit — no remark`}
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-[3px] border border-emerald-400/70" /> Right
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-[3px] border-2 border-red-500" /> Wrong
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-[3px] border-2 border-dashed border-red-500" /> Left
          empty
        </span>
        <span className="inline-flex items-center gap-1.5">
          <AlertTriangle className="h-3 w-3 text-red-400" /> Reading outside its limit
        </span>
      </p>
    </section>
  );
}

export default ScheduleReview;
