/**
 * Pre-start checks on the worker's job page (ELE-1826).
 *
 * The first thing on the job: the firm's "before start" items for THIS person
 * (tick / photo / signature / number / yes-no, plus "RAMS signed", which reads
 * the job's pack sign-offs). Clock-in is refused by the database until every
 * required one is done. Once they are, the "on completion" group appears,
 * done once for the whole job and usually ending with the customer's signature.
 * Every answer is stamped with who, when and the phone's one location fix.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import {
  CheckCircle2,
  Circle,
  Camera,
  PenLine,
  Hash,
  HelpCircle as YesNoIcon,
  FileCheck2,
  Loader2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  inputCn,
  labelCn,
  textareaCn,
  chipBase,
  chipOn,
  chipOff,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  WorkerPanel,
  SectionTitle,
  SolidBadge,
  RowAction,
} from '@/components/worker-tools/WorkerUi';
import { WorkerPhotoPicker, WorkerPhotoStrip } from '@/components/worker-tools/WorkerPhotos';
import SignatureInput from '@/components/signature/SignatureInput';
import SignaturePad from '@/components/signature/SignaturePad';
import { captureClockFix } from '@/hooks/useClockState';
import { storageGetJSONSync } from '@/utils/storage';
import { queuedToast } from '@/components/worker-tools/outboxToast';
import {
  useMyJobChecks,
  useChecklistCrewActions,
  findResponse,
  answerSummary,
  stampLine,
  checklistErrorMessage,
  type ChecklistItem,
  type ChecklistResponse,
  type JobChecklist,
  type JobChecklistDetail,
  type PendingCheck,
} from '@/hooks/usePrestartChecklists';

const BASE = '/electrician/worker-tools';

export const WT_CHECKS_HELP: PageHelpContent = {
  id: 'wt-prestart-checks',
  title: 'Pre-start checks',
  what: 'The checks your firm wants done on this job. The “before you start” ones are yours to do, and the clock opens once every required one is done.',
  steps: [
    {
      title: 'Do the before-start checks',
      body: 'Tap each one. Ticks save straight away; photos, numbers, yes/no and signatures open a short sheet.',
    },
    {
      title: 'Sign the RAMS',
      body: 'If the firm sent RAMS for this job, the RAMS check sends you to Sign-offs. It turns green when you have signed.',
    },
    {
      title: 'Clock in, then finish off',
      body: 'Once everything required is done, Clock in opens. The on-completion checks appear here, ending with the customer’s signature.',
    },
  ],
  notes: [
    {
      title: 'What gets recorded',
      body: 'Your name, the time and where your phone was (once, when you save). If location is off it says so; you can still save.',
    },
    {
      title: 'Yes or no questions',
      body: 'A required yes/no only counts as done when the answer is Yes. Answer No and say why, and the office sees it.',
    },
    {
      title: 'Apprentices',
      body: 'Some checks need your supervisor to countersign. They do it on their phone from this job, or the office does.',
    },
  ],
};

const TYPE_ICON = {
  tick: CheckCircle2,
  photo: Camera,
  signature: PenLine,
  number: Hash,
  yes_no: YesNoIcon,
  rams: FileCheck2,
} as const;

interface Row {
  checklist: JobChecklist;
  item: ChecklistItem;
  response?: ChecklistResponse;
  /** ELE-1828: an answer saved on this phone, waiting for signal. */
  pending?: PendingCheck;
  done: boolean;
}

export function JobChecklistsPanel({
  jobId,
  finished,
  phase,
}: {
  jobId: string;
  finished?: boolean;
  /** 'after': only the on-completion checks, for the Job done flow (ELE-2068). */
  phase?: 'after';
}) {
  const navigate = useNavigate();
  const { data: detail, isLoading, pendingChecks, unsignedPacks } = useMyJobChecks(jobId);
  const { record, clear, countersign } = useChecklistCrewActions();
  const [open, setOpen] = useState<Row | null>(null);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const me = detail?.me ?? null;
  const rows = useMemo(
    () => buildRows(detail, pendingChecks, unsignedPacks),
    [detail, pendingChecks, unsignedPacks]
  );
  const waiting = rows.filter((r) => r.pending).length;
  const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
  // Already on the clock (the clock keeps a pointer on the phone, ELE-1828): no prompt.
  const onTheClock = !!storageGetJSONSync<{ timesheetId?: string } | null>(
    'employer_clock_pointer',
    null
  )?.timesheetId;
  const before = rows.filter((r) => r.item.phase === 'before');
  const after = rows.filter((r) => r.item.phase === 'after');
  const beforeOpen = before.filter((r) => r.item.required && !r.done).length;
  const afterOpen = after.filter((r) => r.item.required && !r.done).length;
  const ready = beforeOpen === 0;
  const multi = (detail?.checklists.length ?? 0) > 1;

  const toCountersign = useMemo(
    () =>
      (detail?.responses ?? []).filter(
        (r) => r.needs_countersign && !r.countersigned_at && !r.mine && detail?.can_countersign
      ),
    [detail]
  );

  if (isLoading || !detail || detail.checklists.length === 0) return null;

  const quickTick = async (row: Row) => {
    setBusyKey(row.item.key + row.checklist.id);
    const fix = await captureClockFix(4000);
    record.mutate(
      {
        jobId,
        jobTitle: detail?.job.title,
        jobChecklistId: row.checklist.id,
        itemKey: row.item.key,
        itemLabel: row.item.label,
        itemType: row.item.type,
        fix,
      },
      {
        onSuccess: (res) => (res === 'queued' ? queuedToast('Check saved') : toast.success('Done')),
        onError: (e) => toast.error(checklistErrorMessage(e, 'Couldn’t save that')),
        onSettled: () => setBusyKey(null),
      }
    );
  };

  const undo = (row: Row) => {
    if (!row.response) return;
    clear.mutate(
      { jobId, responseId: row.response.id },
      {
        onSuccess: () => toast.info('Answer removed'),
        onError: (e) => toast.error(checklistErrorMessage(e, 'Couldn’t undo that')),
      }
    );
  };

  const act = (row: Row) => {
    if (row.item.type === 'rams') {
      navigate(`${BASE}/signoffs?job=${jobId}`);
      return;
    }
    if (row.item.type === 'tick' && !row.done) {
      void quickTick(row);
      return;
    }
    setOpen(row);
  };

  const label = (r: Row) =>
    multi ? (
      <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
        {r.checklist.name}
      </span>
    ) : null;

  const renderRow = (r: Row, key: string) => {
    const Icon = r.done ? CheckCircle2 : (TYPE_ICON[r.item.type] ?? Circle);
    const busy = busyKey === r.item.key + r.checklist.id;
    const summary =
      r.item.type === 'rams'
        ? r.done
          ? 'Nothing waiting for your signature'
          : `To sign: ${unsignedPacks.join(', ') || 'RAMS'}`
        : r.pending
          ? r.item.type === 'tick'
            ? null
            : r.pending.summary
          : r.response
            ? r.item.type === 'tick'
              ? null
              : answerSummary(r.item, r.response)
            : r.item.hint || null;
    const notYes =
      r.item.type === 'yes_no' &&
      (r.pending ? !r.pending.satisfied : !!r.response && !r.response.satisfied);
    return (
      <div key={key} className="px-4 py-3.5 sm:px-5">
        <div className="flex items-start gap-3">
          <Icon
            className={cn(
              'mt-0.5 h-5 w-5 shrink-0',
              r.done ? 'text-emerald-400' : notYes ? 'text-orange-300' : 'text-elec-yellow'
            )}
          />
          <div className="min-w-0 flex-1">
            {label(r)}
            <p className="text-[14.5px] font-semibold leading-snug text-white">{r.item.label}</p>
            {summary && (
              <p
                className={cn(
                  'mt-0.5 text-[12.5px] leading-snug',
                  notYes ? 'text-orange-300' : 'text-white'
                )}
              >
                {notYes
                  ? r.pending
                    ? 'Answered No'
                    : `Answered No: ${r.response?.note ?? ''}`
                  : summary}
              </p>
            )}
            {!r.pending && r.response && r.item.type !== 'rams' && (
              <p className="mt-0.5 text-[12px] text-white">{stampLine(r.response)}</p>
            )}
            <div className="mt-1.5 flex flex-wrap gap-1.5 empty:hidden">
              {r.pending && <SolidBadge tone="neutral">Waiting to send</SolidBadge>}
              {!r.item.required && <SolidBadge tone="neutral">Optional</SolidBadge>}
              {r.item.countersign &&
                me?.is_apprentice &&
                r.response &&
                (r.response.countersigned_at ? (
                  <SolidBadge tone="green">
                    Countersigned by {r.response.countersigned_by_name}
                  </SolidBadge>
                ) : (
                  <SolidBadge tone="neutral">Waiting for your supervisor to countersign</SolidBadge>
                ))}
            </div>
            {!r.pending && r.response && r.response.photos.length > 0 && (
              <WorkerPhotoStrip
                bucket="visual-uploads"
                paths={r.response.photos}
                columns={4}
                className="mt-2.5 max-w-sm"
              />
            )}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            {r.item.type === 'rams' ? (
              !r.done && <RowAction onClick={() => act(r)}>Sign</RowAction>
            ) : r.done || notYes ? (
              <>
                {r.item.type !== 'tick' && (
                  <RowAction quiet onClick={() => setOpen(r)}>
                    Change
                  </RowAction>
                )}
                {!r.pending &&
                  r.response?.mine &&
                  !r.response.countersigned_at &&
                  r.item.type === 'tick' && (
                    <RowAction quiet onClick={() => undo(r)} disabled={clear.isPending || offline}>
                      Undo
                    </RowAction>
                  )}
              </>
            ) : (
              <RowAction onClick={() => act(r)} disabled={busy}>
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : r.item.type === 'tick' ? (
                  'Done'
                ) : (
                  'Do it'
                )}
              </RowAction>
            )}
          </div>
        </div>
      </div>
    );
  };

  const itemSheet = (
    <ItemSheet
      row={open}
      jobId={jobId}
      onClose={() => setOpen(null)}
      saving={record.isPending}
      onSave={(payload) =>
        open &&
        record.mutate(
          {
            jobId,
            jobChecklistId: open.checklist.id,
            itemKey: open.item.key,
            itemLabel: open.item.label,
            itemType: open.item.type,
            jobTitle: detail?.job.title,
            ...payload,
          },
          {
            onSuccess: (res) => {
              if (res === 'queued') queuedToast('Check saved');
              else toast.success('Saved');
              setOpen(null);
            },
            onError: (e) => toast.error(checklistErrorMessage(e, 'Couldn’t save that')),
          }
        )
      }
    />
  );

  if (phase === 'after') {
    return (
      <section data-help="wt-jobdone.checks" className="space-y-3">
        {after.length > 0 && (
          <WorkerPanel className="divide-y divide-white/[0.07]">
            {after.map((r) => renderRow(r, `a-${r.checklist.id}-${r.item.key}`))}
          </WorkerPanel>
        )}
        {waiting > 0 && (
          <p className="px-1 text-[13px] leading-snug text-white">
            {waiting === 1 ? '1 answer is' : `${waiting} answers are`} saved on this phone and
            will send when you have signal, before the job is closed.
          </p>
        )}
        {itemSheet}
      </section>
    );
  }

  return (
    <section data-help="wt-jobs.checks" className="space-y-3">
      <SectionTitle
        title={ready ? 'Pre-start checks' : 'Before you start'}
        right={
          <span className="flex items-center gap-2">
            {ready ? (
              <SolidBadge tone="green">Ready to start</SolidBadge>
            ) : (
              <SolidBadge tone="red">{beforeOpen} to do</SolidBadge>
            )}
            <PageHelpButton help={WT_CHECKS_HELP} className="-my-2" />
          </span>
        }
      />

      {!ready ? (
        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-3.5 sm:px-5">
          <p className="text-[14px] font-semibold text-white">Clock-in opens when these are done</p>
          <p className="mt-0.5 text-[13px] leading-snug text-white">
            Your firm asks for {beforeOpen === 1 ? 'one check' : `${beforeOpen} checks`} before
            anyone starts on this job. Each one records your name, the time and where your phone is.
          </p>
        </div>
      ) : (
        !finished &&
        !onTheClock && (
          <WorkerPanel className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <p className="text-[14px] leading-snug text-white">
                Pre-start done. You can clock in.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(`${BASE}/timesheets?job=${jobId}`)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation active:scale-[0.98]"
            >
              <Clock className="h-4 w-4" />
              Clock in
            </button>
          </WorkerPanel>
        )
      )}

      {waiting > 0 && (
        <p className="px-1 text-[13px] leading-snug text-white">
          {waiting === 1 ? '1 answer is' : `${waiting} answers are`} saved on this phone and will
          send when you have signal, before your clock-in.
        </p>
      )}

      {before.length > 0 && (
        <WorkerPanel className="divide-y divide-white/[0.07]">
          <p className="px-4 pb-2 pt-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow sm:px-5">
            Before you start · you
          </p>
          {before.map((r) => renderRow(r, `b-${r.checklist.id}-${r.item.key}`))}
        </WorkerPanel>
      )}

      {after.length > 0 &&
        (ready ? (
          <WorkerPanel className="divide-y divide-white/[0.07]">
            <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-3.5 sm:px-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                On completion · once for the job
              </p>
              {afterOpen === 0 ? (
                <SolidBadge tone="green">All done</SolidBadge>
              ) : (
                <SolidBadge tone="neutral">{afterOpen} to do</SolidBadge>
              )}
            </div>
            {after.map((r) => renderRow(r, `a-${r.checklist.id}-${r.item.key}`))}
          </WorkerPanel>
        ) : (
          <p className="px-1 text-[13px] leading-snug text-white">
            {after.length === 1 ? 'One check' : `${after.length} checks`} for when the job is
            finished appear here once you’ve started.
          </p>
        ))}

      {toCountersign.length > 0 && (
        <WorkerPanel className="divide-y divide-white/[0.07]">
          <p className="px-4 pb-2 pt-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow sm:px-5">
            Waiting for your countersign
          </p>
          {toCountersign.map((r) => {
            const cl = detail.checklists.find((c) => c.id === r.job_checklist_id);
            const item = cl?.items.find((i) => i.key === r.item_key);
            return (
              <div
                key={r.id}
                className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5"
              >
                <div className="min-w-0">
                  <p className="text-[14.5px] font-semibold text-white">{item?.label ?? 'Check'}</p>
                  <p className="mt-0.5 text-[12.5px] text-white">{stampLine(r)}</p>
                </div>
                <RowAction
                  disabled={countersign.isPending || offline}
                  onClick={() =>
                    countersign.mutate(
                      { jobId, responseId: r.id, signature: me?.name ?? null },
                      {
                        onSuccess: () => toast.success('Countersigned'),
                        onError: (e) =>
                          toast.error(checklistErrorMessage(e, 'Couldn’t countersign')),
                      }
                    )
                  }
                >
                  Countersign
                </RowAction>
              </div>
            );
          })}
        </WorkerPanel>
      )}

      {itemSheet}
    </section>
  );
}

function buildRows(
  detail: JobChecklistDetail | undefined,
  pendingChecks: Map<string, PendingCheck>,
  unsignedPacks: string[]
): Row[] {
  if (!detail) return [];
  const meId = detail.me?.employee_id ?? null;
  const out: Row[] = [];
  for (const c of detail.checklists) {
    for (const item of c.items) {
      if (item.type === 'rams') {
        out.push({ checklist: c, item, done: unsignedPacks.length === 0 });
        continue;
      }
      const response = findResponse(detail, c.id, item, meId);
      const pending = pendingChecks.get(`${c.id}:${item.key}`);
      out.push({
        checklist: c,
        item,
        response,
        pending,
        done: pending ? pending.satisfied : !!response?.satisfied,
      });
    }
  }
  return out;
}

/* ── One item: photo / signature / number / yes-no ─────────────────────── */

type SavePayload = {
  answer?: 'yes' | 'no';
  number?: number;
  photos?: string[];
  signature?: string | null;
  signerName?: string | null;
  note?: string | null;
  heldFiles?: File[];
  fix?: Awaited<ReturnType<typeof captureClockFix>>;
};

function ItemSheet({
  row,
  jobId,
  onClose,
  onSave,
  saving,
}: {
  row: Row | null;
  jobId: string;
  onClose: () => void;
  onSave: (p: SavePayload) => void;
  saving: boolean;
}) {
  const item = row?.item;
  const prev = row?.response;
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const [num, setNum] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [held, setHeld] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [signer, setSigner] = useState('');
  const [note, setNote] = useState('');
  const [locating, setLocating] = useState(false);
  const [pickerKey, setPickerKey] = useState(0);

  useEffect(() => {
    if (!row) return;
    setAnswer(prev?.value_text === 'yes' ? 'yes' : prev?.value_text === 'no' ? 'no' : null);
    setNum(prev?.value_number != null ? String(prev.value_number) : '');
    setPhotos(prev?.photos ?? []);
    setHeld([]);
    setSignature(null);
    setSigner(row.item.signer === 'customer' ? (prev?.signer_name ?? '') : '');
    setNote(prev?.note ?? '');
    setPickerKey((k) => k + 1);
  }, [row, prev]);

  if (!item) return null;
  const isCustomer = item.type === 'signature' && item.signer === 'customer';
  const parsed = num.trim() === '' ? NaN : Number(num.replace(',', '.'));
  const canSave =
    !uploading &&
    !locating &&
    !saving &&
    (item.type === 'photo'
      ? photos.length + held.length > 0
      : item.type === 'number'
        ? Number.isFinite(parsed)
        : item.type === 'yes_no'
          ? answer === 'yes' || (answer === 'no' && note.trim().length > 0)
          : item.type === 'signature'
            ? !!signature && (!isCustomer || signer.trim().length > 0)
            : true);

  const save = async () => {
    setLocating(true);
    const fix = await captureClockFix(5000);
    setLocating(false);
    onSave({
      answer: item.type === 'yes_no' ? (answer ?? undefined) : undefined,
      number: item.type === 'number' ? parsed : undefined,
      photos,
      signature: item.type === 'signature' ? signature : null,
      signerName: isCustomer ? signer.trim() : null,
      note: note.trim() || null,
      heldFiles: held,
      fix,
    });
  };

  return (
    <FormSheet
      open={!!row}
      onOpenChange={(o) => !o && onClose()}
      eyebrow={item.phase === 'before' ? 'Before you start' : 'On completion'}
      title={item.label}
      description={
        item.hint ??
        (isCustomer
          ? 'Hand the phone to the customer. They sign with a finger; their name goes beside it.'
          : 'Saved with your name, the time and where your phone is.')
      }
      width="lg"
      footer={
        <div className="flex gap-2 sm:justify-end">
          <button type="button" onClick={onClose} className={cn(buttonSecondaryCn, 'px-5 sm:w-32')}>
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!canSave}
            className={cn(buttonPrimaryCn, 'flex-1 sm:w-56 sm:flex-none')}
          >
            {locating ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Getting location…
              </span>
            ) : saving ? (
              <Loader2 className="mx-auto h-5 w-5 animate-spin" />
            ) : uploading ? (
              'Photos uploading…'
            ) : (
              'Save'
            )}
          </button>
        </div>
      }
    >
      {item.type === 'yes_no' && (
        <div>
          <span className={labelCn}>Your answer</span>
          <div className="grid grid-cols-2 gap-2">
            {(['yes', 'no'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setAnswer(v)}
                className={cn(chipBase, answer === v ? chipOn : chipOff)}
              >
                {v === 'yes' ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
          {answer === 'no' && item.required && (
            <p className="mt-3 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-3 text-[13px] leading-snug text-white">
              A No is recorded and the office sees why, but this check stays open until it’s a Yes.
            </p>
          )}
        </div>
      )}

      {item.type === 'number' && (
        <div className="max-w-xs">
          <label className={labelCn} htmlFor="chk-number">
            {item.unit ? `How many (${item.unit})` : 'The number'}
          </label>
          <input
            id="chk-number"
            inputMode="decimal"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            placeholder="0"
            className={inputCn}
          />
        </div>
      )}

      {item.type === 'signature' && (
        <div className="space-y-4">
          {isCustomer && (
            <div className="max-w-md">
              <label className={labelCn} htmlFor="chk-signer">
                Name of the person signing
              </label>
              <input
                id="chk-signer"
                value={signer}
                onChange={(e) => setSigner(e.target.value)}
                placeholder="e.g. Mrs Patel"
                autoCapitalize="words"
                autoCorrect="off"
                spellCheck={false}
                className={inputCn}
              />
            </div>
          )}
          <div>
            <span className={labelCn}>{isCustomer ? 'Signature' : 'Your signature'}</span>
            {isCustomer ? (
              <div className="flex justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] p-2">
                <SignaturePad width={320} height={150} onSignatureChange={setSignature} />
              </div>
            ) : (
              <SignatureInput value={signature ?? undefined} onChange={setSignature} />
            )}
          </div>
          {prev?.signature_data && !signature && (
            <p className="text-[12.5px] text-white">
              Already signed {prev.signer_name ? `by ${prev.signer_name} ` : ''}
              {format(parseISO(prev.completed_at), 'd MMM, HH:mm')}. Sign again to replace it.
            </p>
          )}
        </div>
      )}

      {(item.type === 'photo' || item.type === 'yes_no' || item.type === 'number') && (
        <div>
          <span className={labelCn}>{item.type === 'photo' ? 'Photo' : 'Photo (optional)'}</span>
          <WorkerPhotoPicker
            key={pickerKey}
            jobId={jobId}
            initialPaths={prev?.photos ?? []}
            onChange={setPhotos}
            onBusyChange={setUploading}
            onHeldChange={setHeld}
            max={item.type === 'photo' ? 6 : 3}
            label={item.type === 'photo' ? 'Take the photo' : 'Add a photo'}
          />
        </div>
      )}

      <div>
        <label className={labelCn} htmlFor="chk-note">
          {item.type === 'yes_no' && answer === 'no'
            ? 'Why not? (needed for a No)'
            : 'Note (optional)'}
        </label>
        <textarea
          id="chk-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={1000}
          placeholder={
            item.type === 'yes_no' && answer === 'no'
              ? 'e.g. Customer out, left a card. Will call before switching off.'
              : 'Anything the office should know'
          }
          className={cn(textareaCn, 'min-h-[88px]')}
        />
      </div>
    </FormSheet>
  );
}

/* ── The clock-in gate, as the Timesheets page shows it ────────────────── */

/**
 * Required before-start checks this person still has to do on this job,
 * worked out on the phone from the cached checklist plus anything waiting in
 * the outbox, so the gate shows the same thing with no signal.
 */
export function usePrestartOutstanding(jobId: string | null | undefined): string[] {
  return useMyJobChecks(jobId || null).outstanding;
}

export function PrestartGateNotice({
  jobId,
  outstanding,
}: {
  jobId: string;
  outstanding: string[];
}) {
  const navigate = useNavigate();
  if (outstanding.length === 0) return null;
  const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
  return (
    <div
      data-help="wt-timesheets.prestart"
      className="rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-4 sm:px-5"
    >
      <p className="text-[15px] font-semibold text-white">Do the pre-start checks first</p>
      <p className="mt-1 text-[13.5px] leading-snug text-white">
        {offline
          ? 'No signal, so this is from the copy on your phone. Do them on the job page; they save on the phone and send before your clock-in.'
          : 'Your firm asks for these before anyone starts on this job. The clock opens once they’re done.'}
      </p>
      <ul className="mt-2.5 space-y-1.5">
        {outstanding.map((o) => (
          <li key={o} className="flex items-start gap-2 text-[13.5px] leading-snug text-white">
            <Circle className="mt-[3px] h-3.5 w-3.5 shrink-0 text-orange-300" />
            {o}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => navigate(`${BASE}/jobs?job=${jobId}`)}
        className="mt-3.5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation active:scale-[0.98] sm:w-auto"
      >
        Do the checks
      </button>
    </div>
  );
}
