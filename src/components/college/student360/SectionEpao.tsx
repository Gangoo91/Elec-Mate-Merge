/**
 * SectionEpao — ELE-2041, 10 Oct 2026.
 *
 * The end-point assessment organisation (EPAO) for a learner, asked for when
 * the funding rules ask for it, not at gateway:
 *   - at least 6 months before gateway (2026/27 para 143; 2025/26 para 115),
 *     which is also the latest the training plan may name it (100.2.1);
 *   - at the start, for a revised assessment plan (2026/27 para 382; 2025/26 346).
 * Saving writes the EPAO ID to the ILR fields (EPAOrgID, para 145.1). The
 * tutor's inbox carries a "Needs you" item when it is due or overdue.
 */
import { useEffect, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import {
  chipCn,
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  CollegeHeading,
} from '@/components/college/ui/CollegeUi';
import { epaoDueSentence, setLearnerEpao, useLearnerEpao } from '@/hooks/useLearnerEpao';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const fmtDate = (d: string) =>
  new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const STATUS_CHIP: Record<string, { label: string; cls: string }> = {
  ok: { label: 'Chosen on time', cls: 'border-emerald-400/40 text-emerald-300' },
  ok_late: { label: 'Chosen late', cls: 'border-orange-500/40 text-orange-300' },
  overdue: { label: 'Overdue', cls: 'border-red-400/50 text-red-300' },
  due_soon: { label: 'Due soon', cls: 'border-orange-500/40 text-orange-300' },
  not_yet_due: { label: 'Not due yet', cls: 'border-white/[0.2] text-white' },
  unknown: { label: 'No end date', cls: 'border-orange-500/40 text-orange-300' },
};

export function SectionEpao({
  studentId,
  studentName,
}: {
  studentId: string;
  studentName: string;
}) {
  const first = studentName.split(' ')[0] || 'the learner';
  const { record, due, loading, refresh } = useLearnerEpao(studentId);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const chip = STATUS_CHIP[due?.status ?? 'unknown'];

  return (
    <section id="epao" className="scroll-mt-20 space-y-3" data-testid="epao-card">
      <div>
        <CollegeHeading>End-point assessment organisation</CollegeHeading>
        <p className="mt-1 text-[13px] leading-relaxed text-white">
          {due?.assessment_plan === 'revised'
            ? `${first} is on a revised assessment plan, so the organisation is chosen at the start.`
            : `Chosen, with the price agreed, at least 6 months before ${first} reaches gateway.`}
        </p>
      </div>
      <div className={COLLEGE_CARD}>
        {loading ? (
          <div className="h-16 animate-pulse rounded-xl bg-white/[0.06]" />
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[15px] font-semibold text-white">
                  {record ? record.epao_name : 'Not chosen yet'}
                </span>
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-[12px] font-semibold',
                    chip.cls
                  )}
                  data-testid="epao-status"
                >
                  {chip.label}
                </span>
              </div>
              <p className="text-[13px] text-white" data-testid="epao-sentence">
                {epaoDueSentence(due, fmtDate)}
              </p>
              {record && (
                <p className="text-[12.5px] text-white">
                  {[
                    record.epao_org_id
                      ? `EPAO ID ${record.epao_org_id} (on the ILR)`
                      : 'No EPAO ID yet',
                    record.price != null
                      ? `£${Number(record.price).toLocaleString('en-GB')}`
                      : null,
                    record.agreement_signed_on
                      ? `agreement signed ${fmtDate(record.agreement_signed_on)}`
                      : 'written agreement not signed yet',
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}
              {due?.para && (
                <p className="text-[12px] text-white">
                  Funding rules {due.rules_year}, para {due.para}
                  {due.assessment_plan_source === 'derived' && due.assessment_plan === 'revised'
                    ? ' · revised plan worked out from the start date'
                    : ''}
                </p>
              )}
            </div>
            <button
              type="button"
              className={cn(COLLEGE_BTN, 'shrink-0')}
              onClick={() => setOpen(true)}
              data-testid="epao-edit"
            >
              {record ? 'Change' : 'Record the organisation'}
            </button>
          </div>
        )}
      </div>
      <EpaoSheet
        open={open}
        onOpenChange={setOpen}
        studentId={studentId}
        first={first}
        record={record}
        planDefault={due?.assessment_plan ?? 'current'}
        onSaved={() => {
          setOpen(false);
          void refresh();
          toast({ title: 'Assessment organisation saved' });
        }}
      />
    </section>
  );
}

function EpaoSheet({
  open,
  onOpenChange,
  studentId,
  first,
  record,
  planDefault,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  studentId: string;
  first: string;
  record: ReturnType<typeof useLearnerEpao>['record'];
  planDefault: 'current' | 'revised';
  onSaved: () => void;
}) {
  const [name, setName] = useState('');
  const [orgId, setOrgId] = useState('');
  const [plan, setPlan] = useState<'current' | 'revised'>('current');
  const [chosenOn, setChosenOn] = useState('');
  const [price, setPrice] = useState('');
  const [signedOn, setSignedOn] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setName(record?.epao_name ?? '');
    setOrgId(record?.epao_org_id ?? '');
    setPlan(record?.assessment_plan ?? planDefault);
    setChosenOn(record?.chosen_on ?? new Date().toISOString().slice(0, 10));
    setPrice(record?.price != null ? String(record.price) : '');
    setSignedOn(record?.agreement_signed_on ?? '');
    setNotes(record?.notes ?? '');
    setErr(null);
  }, [open, record, planDefault]);

  const save = async () => {
    setBusy(true);
    setErr(null);
    try {
      await setLearnerEpao({
        studentId,
        name,
        orgId: orgId.trim() || null,
        plan,
        chosenOn,
        price: price.trim() ? Number(price) : null,
        agreementSignedOn: signedOn || null,
        notes: notes.trim() || null,
      });
      onSaved();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="End-point assessment"
      title={`${first}'s assessment organisation`}
      description="Who will deliver the end-point assessment, when they were chosen and the price agreed. The EPAO ID goes on the ILR."
      footer={
        <div className="flex justify-end gap-2">
          <button type="button" className={COLLEGE_BTN} onClick={() => onOpenChange(false)}>
            Cancel
          </button>
          <button
            type="button"
            className={COLLEGE_BTN_PRIMARY}
            disabled={busy || name.trim().length < 2 || !chosenOn}
            onClick={() => void save()}
            data-testid="epao-save"
          >
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <label className="block">
            <span className={labelCn}>Organisation</span>
            <input
              className={inputCn}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. NET (National Electrotechnical Training)"
              data-testid="epao-name"
            />
          </label>
          <label className="block">
            <span className={labelCn}>EPAO ID (from the register)</span>
            <input
              className={inputCn}
              value={orgId}
              onChange={(e) => setOrgId(e.target.value.toUpperCase())}
              placeholder="e.g. EPA0001"
              maxLength={8}
              data-testid="epao-id"
            />
          </label>
          <div>
            <span className={labelCn}>Assessment plan</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={chipCn(plan === 'current')}
                onClick={() => setPlan('current')}
              >
                Current plan
              </button>
              <button
                type="button"
                className={chipCn(plan === 'revised')}
                onClick={() => setPlan('revised')}
              >
                Revised plan
              </button>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white">
              A revised plan means the organisation is engaged at the start (para 382).
            </p>
          </div>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className={labelCn}>Chosen on</span>
              <input
                type="date"
                className={inputCn}
                value={chosenOn}
                onChange={(e) => setChosenOn(e.target.value)}
                data-testid="epao-chosen-on"
              />
            </label>
            <label className="block">
              <span className={labelCn}>Price agreed (£)</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                className={inputCn}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </div>
          <label className="block">
            <span className={labelCn}>Written agreement signed on</span>
            <input
              type="date"
              className={inputCn}
              value={signedOn}
              onChange={(e) => setSignedOn(e.target.value)}
            />
          </label>
          <label className="block">
            <span className={labelCn}>Notes</span>
            <textarea
              className={cn(textareaCn, 'min-h-[80px]')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          {err && <p className="text-[12.5px] font-medium text-orange-300">{err}</p>}
        </div>
      </div>
    </FormSheet>
  );
}
