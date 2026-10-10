/**
 * Put a checklist on a job (ELE-1826). Job on the left, checklist on the right
 * on desktop; stacked on a phone. The crew already on the job are told.
 */
import { useEffect, useMemo, useState } from 'react';
import { Check, Loader2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn, inputCn, labelCn } from '@/components/forms/fieldStyles';
import { useJobs } from '@/hooks/useJobs';
import {
  useChecklistOfficeActions,
  checklistErrorMessage,
  type ChecklistTemplate,
} from '@/hooks/usePrestartChecklists';

const LIVE = (status?: string | null) => !['Completed', 'Cancelled'].includes(status ?? '');

export function AttachChecklistSheet({
  open,
  onOpenChange,
  templates,
  initialJobId,
  initialTemplateId,
  onAttached,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  templates: ChecklistTemplate[];
  initialJobId?: string | null;
  initialTemplateId?: string | null;
  onAttached?: (jobId: string) => void;
}) {
  const { data: jobs = [] } = useJobs();
  const { attach } = useChecklistOfficeActions();
  const [jobId, setJobId] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    if (!open) return;
    setJobId(initialJobId ?? null);
    setTemplateId(initialTemplateId ?? (templates.length === 1 ? templates[0].id : null));
    setQ('');
  }, [open, initialJobId, initialTemplateId, templates]);

  const liveJobs = useMemo(() => {
    const term = q.trim().toLowerCase();
    return jobs
      .filter((j) => !j.archived_at && !j.is_template && (LIVE(j.status) || j.id === initialJobId))
      .filter(
        (j) =>
          !term ||
          [j.title, j.client, j.location].some((v) => (v ?? '').toLowerCase().includes(term))
      )
      .slice(0, 60);
  }, [jobs, q, initialJobId]);

  const submit = () => {
    if (!jobId || !templateId) return;
    attach.mutate(
      { jobId, templateId },
      {
        onSuccess: () => {
          const t = templates.find((x) => x.id === templateId);
          toast.success(`${t?.name ?? 'Checklist'} is on the job. The crew have been told.`);
          onAttached?.(jobId);
          onOpenChange(false);
        },
        onError: (e) => toast.error(checklistErrorMessage(e, 'Couldn’t attach it')),
      }
    );
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Checklists"
      title="Attach to a job"
      description="The crew see it first thing on their job page, and can’t clock in until the required before-start checks are done."
      width="wide"
      bodyClassName="space-y-6 lg:grid lg:grid-cols-2 lg:gap-10 lg:space-y-0"
      footer={
        <div className="flex gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(buttonSecondaryCn, 'px-5 sm:w-32')}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={!jobId || !templateId || attach.isPending}
            className={cn(buttonPrimaryCn, 'flex-1 sm:w-56 sm:flex-none')}
          >
            {attach.isPending ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : 'Attach'}
          </button>
        </div>
      }
    >
      <section>
        <span className={labelCn}>Which job</span>
        <div className="relative mb-2">
          <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search jobs, clients, addresses"
            className={cn(inputCn, 'pl-7')}
            aria-label="Search jobs"
          />
        </div>
        <div className="max-h-[46vh] space-y-1.5 overflow-y-auto pr-1">
          {liveJobs.length === 0 ? (
            <p className="py-6 text-center text-[13.5px] text-white">No live jobs match.</p>
          ) : (
            liveJobs.map((j) => (
              <OptionRow
                key={j.id}
                on={jobId === j.id}
                onClick={() => setJobId(j.id)}
                title={j.title}
                sub={[j.client, j.location].filter(Boolean).join(' · ')}
              />
            ))
          )}
        </div>
      </section>

      <section>
        <span className={labelCn}>Which checklist</span>
        {templates.length === 0 ? (
          <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-3 text-[13.5px] text-white">
            You have no checklists yet. Add one from the Library tab first.
          </p>
        ) : (
          <div className="space-y-1.5">
            {templates.map((t) => {
              const b = t.items.filter((i) => i.phase === 'before').length;
              const a = t.items.filter((i) => i.phase === 'after').length;
              return (
                <OptionRow
                  key={t.id}
                  on={templateId === t.id}
                  onClick={() => setTemplateId(t.id)}
                  title={t.name}
                  sub={`${b} before start · ${a} on completion${t.job_type ? ` · ${t.job_type}` : ''}`}
                />
              );
            })}
          </div>
        )}
      </section>
    </FormSheet>
  );
}

function OptionRow({
  on,
  onClick,
  title,
  sub,
}: {
  on: boolean;
  onClick: () => void;
  title: string;
  sub?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        'flex min-h-[52px] w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left touch-manipulation transition-colors',
        on
          ? 'border-elec-yellow bg-white/[0.08]'
          : 'border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.07]'
      )}
    >
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
          on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
        )}
      >
        {on && <Check className="h-3.5 w-3.5" />}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[14px] font-semibold text-white">{title}</span>
        {sub && <span className="block truncate text-[12.5px] text-white">{sub}</span>}
      </span>
    </button>
  );
}
