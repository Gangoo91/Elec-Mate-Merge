/**
 * One job's checks, office side (ELE-1826): each person's before-start checks
 * and the job's completion checks, with who/when/where, photos and signatures;
 * countersign, add or remove a checklist, and the PDF for the client or the HSE.
 */
import { useMemo, useState } from 'react';
import { CheckCircle2, Circle, AlertTriangle, Download, Loader2, Plus, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { WorkerPhotoStrip } from '@/components/worker-tools/WorkerPhotos';
import { LoadingBlocks } from '@/components/employer/editorial';
import { panel, StatusPill } from '@/components/employer/pageParts/PageParts';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { generateJobChecklistPdf } from '@/utils/generateJobChecklistPdf';
import {
  useJobChecklistDetail,
  useChecklistOfficeActions,
  useChecklistCrewActions,
  findResponse,
  answerSummary,
  stampLine,
  checklistErrorMessage,
  type ChecklistItem,
  type ChecklistResponse,
  type JobChecklistDetail,
} from '@/hooks/usePrestartChecklists';

export function JobChecksSheet({
  jobId,
  open,
  onOpenChange,
  onAttach,
}: {
  jobId: string | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** Open the attach sheet with this job picked. */
  onAttach?: (jobId: string) => void;
}) {
  const { data: detail, isLoading, isError, error } = useJobChecklistDetail(open ? jobId : null);
  const { detach } = useChecklistOfficeActions();
  const { countersign } = useChecklistCrewActions();
  const [pdfBusy, setPdfBusy] = useState(false);

  const openCount = useMemo(
    () =>
      detail
        ? detail.crew.reduce((n, c) => n + c.outstanding.length, 0) +
          detail.completion_outstanding.length
        : 0,
    [detail]
  );

  const downloadPdf = async () => {
    if (!detail) return;
    setPdfBusy(true);
    try {
      const doc = await generateJobChecklistPdf(detail);
      const safe = detail.job.title
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 60);
      await saveOrSharePdf(doc, `Site-checks-${safe || 'job'}.pdf`);
    } catch (e) {
      toast.error(checklistErrorMessage(e, 'Couldn’t make the PDF'));
    } finally {
      setPdfBusy(false);
    }
  };

  const doCountersign = (r: ChecklistResponse) =>
    countersign.mutate(
      { jobId: jobId!, responseId: r.id, signature: null },
      {
        onSuccess: () => toast.success('Countersigned'),
        onError: (e) => toast.error(checklistErrorMessage(e, 'Couldn’t countersign')),
      }
    );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Site checks"
      title={detail?.job.title ?? 'Checks'}
      description={
        detail
          ? [detail.job.client, detail.job.location].filter(Boolean).join(' · ') || undefined
          : undefined
      }
      width="wide"
      bodyClassName="space-y-6"
      footer={
        <div className="flex gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(buttonSecondaryCn, 'px-5 sm:w-32')}
          >
            Close
          </button>
          <button
            type="button"
            onClick={downloadPdf}
            disabled={!detail || pdfBusy}
            className={cn(
              buttonPrimaryCn,
              'flex flex-1 items-center justify-center gap-2 sm:w-56 sm:flex-none'
            )}
          >
            {pdfBusy ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {pdfBusy ? 'Making the PDF…' : 'Download PDF'}
          </button>
        </div>
      }
    >
      {isLoading || (!detail && !isError) ? (
        <LoadingBlocks />
      ) : isError || !detail ? (
        <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-[14px] text-white">
          {checklistErrorMessage(error, 'Couldn’t open this job’s checks.')}
        </p>
      ) : (
        <>
          {/* Verdict + what is attached */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className={cn(panel, 'flex items-start gap-3 px-4 py-3.5 lg:min-w-[22rem]')}>
              {openCount === 0 ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              ) : (
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" />
              )}
              <div>
                <p className="text-[15px] font-semibold text-white">
                  {openCount === 0
                    ? 'Every required check is done'
                    : `${openCount} required check${openCount === 1 ? '' : 's'} still open`}
                </p>
                <p className="mt-0.5 text-[13px] text-white">
                  Before-start checks are per person; on-completion checks are once for the job.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {detail.checklists.map((c) => {
                const answered = detail.responses.some((r) => r.job_checklist_id === c.id);
                return (
                  <span
                    key={c.id}
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] pl-3.5 pr-1.5 text-[13.5px] font-medium text-white"
                  >
                    {c.name}
                    {!answered ? (
                      <button
                        type="button"
                        onClick={() =>
                          detach.mutate(
                            { id: c.id, jobId: detail.job.id },
                            {
                              onSuccess: () => toast.success(`${c.name} taken off this job`),
                              onError: (e) =>
                                toast.error(checklistErrorMessage(e, 'Couldn’t remove it')),
                            }
                          )
                        }
                        className="h-8 rounded-lg px-2.5 text-[12.5px] font-semibold text-white hover:bg-white/[0.08] touch-manipulation"
                        aria-label={`Remove ${c.name} from this job`}
                      >
                        Remove
                      </button>
                    ) : (
                      <span className="pr-2 text-[12px] text-white">· in use</span>
                    )}
                  </span>
                );
              })}
              {onAttach && (
                <button
                  type="button"
                  onClick={() => onAttach(detail.job.id)}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.05] px-3.5 text-[13.5px] font-semibold text-white touch-manipulation hover:bg-white/[0.09]"
                >
                  <Plus className="h-4 w-4 text-elec-yellow" />
                  Add a checklist
                </button>
              )}
            </div>
          </div>

          {/* Before start, per person */}
          <section className="space-y-3">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Before start · each person
            </h3>
            {detail.crew.length === 0 ? (
              <p className={cn(panel, 'px-4 py-4 text-[14px] text-white')}>
                Nobody is on this job yet. Assign the crew and they’ll see these checks on their job
                page.
              </p>
            ) : (
              <div
                className={cn(
                  'grid gap-3',
                  detail.crew.length > 1 && 'lg:grid-cols-2 2xl:grid-cols-3'
                )}
              >
                {detail.crew.map((person) => (
                  <div key={person.employee_id} className={cn(panel, 'overflow-hidden')}>
                    <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-[14.5px] font-semibold text-white">
                          {person.name}
                        </p>
                        {person.team_role && (
                          <p className="text-[12px] text-white">{person.team_role}</p>
                        )}
                      </div>
                      {person.outstanding.length === 0 ? (
                        <StatusPill tone="green">Ready</StatusPill>
                      ) : (
                        <StatusPill tone="volt">{person.outstanding.length} open</StatusPill>
                      )}
                    </div>
                    <div
                      className={cn(
                        'divide-y divide-white/[0.07]',
                        // One person: use the width, two columns of items like On completion.
                        detail.crew.length === 1 &&
                          'lg:grid lg:grid-cols-2 lg:divide-y-0 lg:[&>*]:border-b lg:[&>*]:border-white/[0.07] lg:[&>*:nth-child(odd)]:border-r'
                      )}
                    >
                      {detail.checklists.flatMap((c) =>
                        c.items
                          .filter((i) => i.phase === 'before')
                          .map((item) =>
                            item.type === 'rams' ? (
                              <RamsLine
                                key={`${c.id}-${item.key}`}
                                item={item}
                                unsigned={person.unsigned_packs}
                                signed={person.signed_packs}
                              />
                            ) : (
                              <ItemLine
                                key={`${c.id}-${item.key}`}
                                item={item}
                                response={findResponse(detail, c.id, item, person.employee_id)}
                                canCountersign={detail.can_countersign}
                                onCountersign={doCountersign}
                                busy={countersign.isPending}
                              />
                            )
                          )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <CompletionSection
            detail={detail}
            onCountersign={doCountersign}
            busy={countersign.isPending}
          />
        </>
      )}
    </FormSheet>
  );
}

function CompletionSection({
  detail,
  onCountersign,
  busy,
}: {
  detail: JobChecklistDetail;
  onCountersign: (r: ChecklistResponse) => void;
  busy: boolean;
}) {
  const rows = detail.checklists.flatMap((c) =>
    c.items.filter((i) => i.phase === 'after').map((item) => ({ c, item }))
  );
  if (rows.length === 0) return null;
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">
          On completion · once for the job
        </h3>
        {detail.completion_outstanding.length === 0 ? (
          <StatusPill tone="green">All done</StatusPill>
        ) : (
          <StatusPill tone="volt">{detail.completion_outstanding.length} open</StatusPill>
        )}
      </div>
      <div
        className={cn(
          panel,
          'grid divide-y divide-white/[0.07] overflow-hidden lg:grid-cols-2 lg:divide-y-0 lg:[&>*]:border-b lg:[&>*]:border-white/[0.07] lg:[&>*:nth-child(odd)]:border-r'
        )}
      >
        {rows.map(({ c, item }) => (
          <ItemLine
            key={`${c.id}-${item.key}`}
            item={item}
            response={findResponse(detail, c.id, item, null)}
            canCountersign={detail.can_countersign}
            onCountersign={onCountersign}
            busy={busy}
          />
        ))}
      </div>
    </section>
  );
}

function RamsLine({
  item,
  unsigned,
  signed,
}: {
  item: ChecklistItem;
  unsigned: string[];
  signed: { title: string; at: string }[];
}) {
  const done = unsigned.length === 0;
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      {done ? (
        <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emerald-400" />
      ) : (
        <Circle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-orange-300" />
      )}
      <div className="min-w-0">
        <p className="text-[13.5px] font-medium leading-snug text-white">{item.label}</p>
        <p className="mt-0.5 text-[12.5px] leading-snug text-white">
          {!done
            ? `Not signed: ${unsigned.join(', ')}`
            : signed.length
              ? `Signed ${signed
                  .map((s) =>
                    new Date(s.at).toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  )
                  .join(', ')}`
              : 'No RAMS sent to them for this job'}
        </p>
      </div>
    </div>
  );
}

function ItemLine({
  item,
  response: r,
  canCountersign,
  onCountersign,
  busy,
}: {
  item: ChecklistItem;
  response?: ChecklistResponse;
  canCountersign: boolean;
  onCountersign: (r: ChecklistResponse) => void;
  busy: boolean;
}) {
  const done = !!r?.satisfied;
  const answeredNo = item.type === 'yes_no' && r && !r.satisfied;
  return (
    <div className="px-4 py-3">
      <div className="flex items-start gap-3">
        {done ? (
          <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emerald-400" />
        ) : (
          <Circle
            className={cn(
              'mt-0.5 h-[18px] w-[18px] shrink-0',
              answeredNo ? 'text-orange-300' : item.required ? 'text-orange-300' : 'text-white'
            )}
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] font-medium leading-snug text-white">
            {item.label}
            {!item.required && <span className="ml-1.5 text-[12px] font-normal">(optional)</span>}
          </p>
          {r ? (
            <>
              <p
                className={cn(
                  'mt-0.5 text-[12.5px] leading-snug',
                  answeredNo ? 'text-orange-300' : 'text-white'
                )}
              >
                {answerSummary(item, r)}
                {r.note ? ` · “${r.note}”` : ''}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[12px] text-white">
                <MapPin className="h-3 w-3 shrink-0" />
                {stampLine(r)}
              </p>
            </>
          ) : (
            <p className="mt-0.5 text-[12.5px] text-white">
              {item.required ? 'Not done yet' : 'Not done'}
            </p>
          )}
          {r && r.photos.length > 0 && (
            <WorkerPhotoStrip
              bucket="visual-uploads"
              paths={r.photos}
              columns={4}
              className="mt-2 max-w-xs"
            />
          )}
          {r?.signature_data &&
            (r.signature_data.startsWith('data:image') ? (
              <img
                src={r.signature_data}
                alt={`Signature of ${r.signer_name ?? 'signer'}`}
                className="mt-2 h-16 max-w-[220px] rounded-lg bg-white object-contain p-1"
              />
            ) : (
              <p className="mt-1.5 font-serif text-[18px] italic text-white">{r.signature_data}</p>
            ))}
          {r?.needs_countersign &&
            (r.countersigned_at ? (
              <p className="mt-1 text-[12px] text-emerald-300">
                Countersigned by {r.countersigned_by_name}
              </p>
            ) : canCountersign ? (
              <button
                type="button"
                onClick={() => onCountersign(r)}
                disabled={busy}
                className="mt-2 inline-flex h-11 items-center rounded-xl bg-elec-yellow px-4 text-[13.5px] font-semibold text-black touch-manipulation disabled:opacity-50"
              >
                Countersign
              </button>
            ) : (
              <p className="mt-1 text-[12px] text-orange-300">
                Waiting for a supervisor to countersign
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
