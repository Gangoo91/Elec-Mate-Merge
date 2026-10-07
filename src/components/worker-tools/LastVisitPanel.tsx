/**
 * Worker Tools › My jobs: "Last visit" on a repeat job (ELE-1821). Who went
 * last time, what they wrote, and the snags they found, so the crew walks in
 * knowing that the RCD on circuit 4 was borderline. Shows nothing on a
 * one-off job.
 */
import { format, parseISO } from 'date-fns';
import { WorkerPanel, SectionTitle } from '@/components/worker-tools/WorkerUi';
import { useJobLastVisit } from '@/hooks/useFirmRecurring';

const day = (iso?: string | null) => (iso ? format(parseISO(iso), 'EEE d MMM yyyy') : null);

export function LastVisitPanel({ jobId }: { jobId: string }) {
  const { data } = useJobLastVisit(jobId);
  if (!data) return null;

  const notes = data.notes ?? [];
  const issues = data.issues ?? [];
  const when = day(data.date);

  return (
    <div data-help="wt-jobs.last-visit">
      <SectionTitle title="Last visit" />
      <WorkerPanel className="divide-y divide-white/[0.07]">
        <div className="px-4 py-3.5 sm:px-5">
          <p className="text-[15px] font-semibold text-white">{when ?? data.title}</p>
          <p className="mt-0.5 text-[13px] text-white">
            {data.crew.length ? `${data.crew.join(', ')} went` : 'No one was booked on it'}
          </p>
        </div>

        {notes.length === 0 && issues.length === 0 ? (
          <p className="px-4 py-3.5 text-[14px] text-white sm:px-5">Nothing was written up last time.</p>
        ) : (
          <>
            {notes.map((n, i) => (
              <div key={`n${i}`} className="px-4 py-3.5 sm:px-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                  {[n.who, n.at ? format(parseISO(n.at), 'd MMM') : null].filter(Boolean).join(' · ')}
                </p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-white whitespace-pre-wrap break-words">{n.text}</p>
              </div>
            ))}
            {issues.map((s, i) => {
              const resolved = /resolved|closed|done/i.test(s.status ?? '');
              return (
                <div key={`i${i}`} className="px-4 py-3.5 sm:px-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-300">
                    {s.type || 'Snag'} · {resolved ? 'Fixed' : 'Still open'}
                  </p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-white break-words">{s.title}</p>
                  {s.resolution && <p className="mt-1 text-[13px] text-white">Fix: {s.resolution}</p>}
                </div>
              );
            })}
          </>
        )}
      </WorkerPanel>
    </div>
  );
}
