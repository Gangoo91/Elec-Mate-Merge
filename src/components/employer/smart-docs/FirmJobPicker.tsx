/**
 * Pick one of the firm's jobs (Smart Docs generators). Live jobs only, plus the
 * picked one if it has since been archived, so a link never shows a blank.
 */
import { useMemo } from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useJobs } from '@/hooks/useJobs';
import { selectTriggerClass } from '@/components/employer/editorial';

export function FirmJobPicker({
  value,
  onChange,
  placeholder = 'Pick a job',
  allowNone,
}: {
  value: string | null;
  onChange: (jobId: string | null) => void;
  placeholder?: string;
  /** A first option for "no job" (shown with this label). */
  allowNone?: string;
}) {
  const { data: jobs = [], isLoading } = useJobs();
  const options = useMemo(() => {
    const live = jobs.filter((j) => !j.archived_at && !j.is_template);
    const picked = jobs.find((j) => j.id === value);
    const list = picked && !live.includes(picked) ? [picked, ...live] : live;
    return [
      ...(allowNone ? [{ value: '', label: allowNone }] : []),
      ...list.map((j) => ({
        value: j.id,
        label: j.title,
        description: [j.client, j.location].filter(Boolean).join(', ') || undefined,
      })),
    ];
  }, [jobs, value, allowNone]);

  return (
    <MobileSelectPicker
      value={value ?? ''}
      onValueChange={(v) => onChange(v || null)}
      options={options}
      placeholder={isLoading ? 'Loading jobs…' : placeholder}
      title="Pick a job"
      triggerClassName={selectTriggerClass}
    />
  );
}

/** The job's title from the firm's job list (null while loading or unknown). */
export function useFirmJobTitle(jobId: string | null | undefined): string | null {
  const { data: jobs = [] } = useJobs();
  return jobId ? (jobs.find((j) => j.id === jobId)?.title ?? null) : null;
}
