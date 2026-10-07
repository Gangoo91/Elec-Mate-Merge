/**
 * Desktop Diary (ELE-1820): days across, people down, with an Unassigned row
 * on top. Drag a block onto another day or person; click any block or empty
 * cell for the same sheet the phone uses.
 */
import { useState, type DragEvent } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/employer/editorial';
import type { DispatchBoard, DispatchJob } from '@/hooks/useDispatchBoard';
import {
  WORKING_DAY_HOURS,
  clashLabel,
  fmtDay,
  initialsOf,
  isWeekend,
  leaveLabel,
  personDay,
  todayYmd,
  unassignedOnDay,
} from './dispatchModel';
import { BookingBlock, CapacityBar, JobBlock } from './DiaryBlocks';
import { readDrag, type DragPayload } from './dragPayload';

interface DiaryWeekGridProps {
  board: DispatchBoard;
  days: string[];
  jobsById: Map<string, DispatchJob>;
  assignedJobIds: Set<string>;
  onDrop: (payload: DragPayload, employeeId: string | null, day: string) => void;
  onOpenBooking: (assignmentId: string) => void;
  onOpenJob: (jobId: string, day: string) => void;
  onEmptyCell: (employeeId: string, day: string) => void;
}

export function DiaryWeekGrid({
  board,
  days,
  jobsById,
  assignedJobIds,
  onDrop,
  onOpenBooking,
  onOpenJob,
  onEmptyCell,
}: DiaryWeekGridProps) {
  const [over, setOver] = useState<string | null>(null);
  const today = todayYmd();
  const cols = { gridTemplateColumns: `200px repeat(${days.length}, minmax(0, 1fr))` };

  const dropProps = (employeeId: string | null, day: string) => {
    const key = `${employeeId ?? 'u'}|${day}`;
    return {
      onDragOver: (e: DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (over !== key) setOver(key);
      },
      onDragLeave: () => setOver((k) => (k === key ? null : k)),
      onDrop: (e: DragEvent) => {
        e.preventDefault();
        setOver(null);
        const p = readDrag(e);
        if (p) onDrop(p, employeeId, day);
      },
      'data-over': over === key || undefined,
    };
  };

  const cellCn = (day: string, key: string) =>
    cn(
      'relative min-h-[96px] border-l border-white/[0.06] p-1.5 space-y-1.5 transition-colors',
      isWeekend(day) && 'bg-white/[0.015]',
      day === today && 'bg-white/[0.035]',
      over === key && 'bg-white/[0.08] ring-1 ring-inset ring-white/30'
    );

  return (
    <div
      className="rounded-2xl border border-white/[0.06] bg-white/[0.04] overflow-x-auto"
      data-help="diary.grid"
    >
      <div className="min-w-[980px]">
        {/* Day headings */}
        <div className="grid border-b border-white/[0.06] bg-[hsl(0_0%_10%)]" style={cols}>
          <div className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Team
          </div>
          {days.map((d) => (
            <div key={d} className="border-l border-white/[0.06] px-2 py-2.5 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                {fmtDay(d, { weekday: 'short' })}
              </div>
              <div
                className={cn(
                  'mx-auto mt-1 h-7 w-7 rounded-full flex items-center justify-center text-[13px] font-semibold tabular-nums',
                  d === today ? 'bg-elec-yellow text-black' : 'text-white'
                )}
              >
                {fmtDay(d, { day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>

        {/* Unassigned */}
        <div
          className="grid border-b border-white/[0.10] bg-[hsl(0_0%_11%)]"
          style={cols}
          data-help="diary.nobody"
        >
          <div className="px-4 py-3">
            <div className="text-[13px] font-semibold text-white">Nobody booked</div>
            <div className="text-[11.5px] text-white mt-0.5">Drag onto a person</div>
          </div>
          {days.map((d) => {
            const jobs = unassignedOnDay(board.jobs, assignedJobIds, d);
            return (
              <div key={d} className={cellCn(d, `u|${d}`)} {...dropProps(null, d)}>
                {jobs.map((j) => (
                  <JobBlock
                    key={j.id}
                    job={j}
                    day={d}
                    compact
                    draggable
                    onClick={() => onOpenJob(j.id, d)}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* People */}
        {board.people.map((p) => {
          const week = days.map((d) => personDay(board, p.id, d));
          const weekHours = week.reduce((s, pd) => s + pd.hours, 0);
          return (
            <div key={p.id} className="grid border-b border-white/[0.06] last:border-b-0" style={cols}>
              <div className="px-4 py-3 flex items-start gap-3 min-w-0">
                <Avatar initials={initialsOf(p.name, p.initials)} photo={p.photo_url} size="sm" />
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-white truncate">{p.name}</div>
                  {p.role && <div className="text-[11.5px] text-white truncate">{p.role}</div>}
                  <div className="text-[11.5px] text-white tabular-nums">
                    {String(weekHours).replace(/\.0+$/, '')}h booked this week
                  </div>
                  {!p.linked && (
                    <div className="text-[11px] text-white mt-0.5">Not on the app yet</div>
                  )}
                </div>
              </div>
              {week.map((pd) => {
                const key = `${p.id}|${pd.day}`;
                return (
                  <div
                    key={pd.day}
                    className={cn(cellCn(pd.day, key), 'group/cell flex flex-col')}
                    {...dropProps(p.id, pd.day)}
                  >
                    {pd.leave && (
                      <div
                        className="rounded-lg border border-white/[0.10] px-2 py-1.5 text-[11px] font-medium text-white"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 6px, transparent 6px 12px)',
                        }}
                      >
                        {leaveLabel(pd.leave)}
                      </div>
                    )}
                    {pd.bookings.length > 0 && (
                      <div className="space-y-1.5" data-help="diary.booking">
                        {pd.bookings.map((a) => (
                          <BookingBlock
                            key={a.id}
                            booking={a}
                            job={jobsById.get(a.job_id)}
                            day={pd.day}
                            compact
                            draggable
                            danger={!!pd.clash}
                            onClick={() => onOpenBooking(a.id)}
                          />
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      data-help="diary.cell-book"
                      onClick={() => onEmptyCell(p.id, pd.day)}
                      aria-label={`Book ${p.name} on ${fmtDay(pd.day, { weekday: 'long', day: 'numeric', month: 'long' })}`}
                      className="flex-1 min-h-[28px] w-full rounded-md flex items-center justify-center text-white opacity-0 group-hover/cell:opacity-100 focus:opacity-100 hover:bg-white/[0.05] transition-opacity touch-manipulation"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                    {(pd.hours > 0 || pd.leave) && (
                      <div className="pt-0.5" title={pd.clash ? clashLabel(pd.clash, pd) : undefined}>
                        <CapacityBar
                          hours={pd.hours}
                          max={WORKING_DAY_HOURS}
                          danger={!!pd.clash}
                        />
                        {pd.clash && (
                          <div className="mt-0.5 text-[10.5px] font-medium text-red-300 truncate">
                            {clashLabel(pd.clash, pd)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
