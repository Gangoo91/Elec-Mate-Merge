/**
 * JobLinkField — reusable "link this safety document to a job" picker.
 * Anchors on the live employer_jobs table (via useJobs). Drop into any module's
 * create/edit flow; persist the returned jobId into the record's job_id column.
 */

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Field,
  SheetShell,
  ListCard,
  ListRow,
  EmptyState,
  LoadingState,
  inputClass,
} from '@/components/college/primitives';
import { useSparkProjects } from '@/hooks/useSparkProjects';

interface JobLinkFieldProps {
  jobId: string | null;
  jobTitle: string | null;
  onSelect: (jobId: string | null, jobTitle: string | null) => void;
  label?: string;
  hint?: string;
}

export function JobLinkField({ jobId, jobTitle, onSelect, label = 'Link to project', hint = 'Adds this document to the project safety pack.' }: JobLinkFieldProps) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const { data: jobs = [], isLoading } = useSparkProjects('active');

  const filtered = jobs.filter(
    (j) =>
      !q ||
      (j.title || '').toLowerCase().includes(q.toLowerCase()) ||
      (j.customerName || '').toLowerCase().includes(q.toLowerCase()) ||
      (j.location || '').toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <Field label={label} hint={hint}>
        {jobId ? (
          <div className="flex items-center justify-between gap-2 px-3 h-11 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08]">
            <span className="text-[13px] text-white truncate">{jobTitle || 'Linked project'}</span>
            <button
              type="button"
              onClick={() => onSelect(null, null)}
              className="text-[11.5px] text-white/50 hover:text-white shrink-0 touch-manipulation"
            >
              Remove
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setOpen(true)} className={cn(inputClass, 'flex items-center text-white/45')}>
            Link to a project…
          </button>
        )}
      </Field>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[70vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
          <SheetShell eyebrow="Project" title="Link to a project">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search jobs…"
              className={cn(inputClass, 'rounded-full')}
            />
            {isLoading ? (
              <LoadingState />
            ) : jobs.length === 0 ? (
              <EmptyState title="No projects yet" description="Create a project in Spark first, then link safety documents to it." />
            ) : filtered.length === 0 ? (
              <EmptyState title="No matching projects" description="Try a different search." />
            ) : (
              <ListCard>
                {filtered.map((j) => (
                  <ListRow
                    key={j.id}
                    onClick={() => {
                      onSelect(j.id, j.title || 'Job');
                      setOpen(false);
                    }}
                    title={j.title || 'Untitled job'}
                    subtitle={[j.customerName, j.location].filter(Boolean).join(' · ') || undefined}
                    trailing={
                      jobId === j.id ? (
                        <span className="text-[11px] text-elec-yellow">Linked</span>
                      ) : (
                        <span aria-hidden className="text-elec-yellow/70">→</span>
                      )
                    }
                  />
                ))}
              </ListCard>
            )}
          </SheetShell>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default JobLinkField;
