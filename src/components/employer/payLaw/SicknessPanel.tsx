/**
 * Sickness on the Leave page (ELE-2062): recent sick leave with the SSP a
 * week, whether a fit note is needed (more than 7 days in a row, counting
 * non-working days), and the return-to-work record.
 *
 * Owner and admins see all of it. Office managers (gap 3C #33) record the
 * absence side: the fit note, the date it runs to and the date the person came
 * back. They never see SSP or earnings (pay is owner/admin) and do not open
 * the fit note or the return-to-work notes (health information, ICO
 * need-to-know).
 *
 * SSP since 6 Apr 2026: from the first day off, no earnings limit, the lower
 * of £123.25 or 80% of average weekly earnings (SSCBA 1992 s.155, s.157).
 */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addDays, format, parseISO } from 'date-fns';
import { ExternalLink, Loader2, Upload } from 'lucide-react';
import FormSheet from '@/components/forms/FormSheet';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import {
  Initials,
  KeyValue,
  PlainEmpty,
  Row,
  StatusPill,
  rowBtnSecondary,
  rowsClass,
} from '@/components/employer/pageParts/PageParts';
import { Field, inputClass, textareaClass } from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useEmployees } from '@/hooks/useEmployees';
import { useTeamAllowances, type TeamLeaveRequest } from '@/hooks/useTeamLeave';
import { useStorageUrl } from '@/utils/storageUrls';
import {
  calendarDaysOff,
  fitNoteState,
  sspForPeriod,
  sspWeekly,
  weeklyPayFromEntries,
  type FitNoteState,
} from '@/lib/payLaw';
import {
  uploadFitNote,
  useApprovedHours,
  useOfficeSaveSickness,
  useOfficeSickness,
  useSaveSickness,
  useSicknessRecords,
  useStatutoryRates,
  type OfficeSicknessRow,
  type SicknessRecord,
} from '@/hooks/usePayLaw';

const iso = (d: Date) => format(d, 'yyyy-MM-dd');
const nice = (d: string | null | undefined) => (d ? format(parseISO(d), 'd MMM') : '');
const money = (n: number) => `£${n.toFixed(2)}`;

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chip = 'h-11 rounded-full border px-4 text-[13px] touch-manipulation';

const FIT_PILL: Record<FitNoteState, { text: string; tone: 'volt' | 'green' | 'neutral' }> = {
  needed: { text: 'Fit note needed', tone: 'volt' },
  on_file: { text: 'Fit note in', tone: 'green' },
  not_needed: { text: 'Self-certified', tone: 'neutral' },
};

/** Estimated average weekly earnings: approved hours in the 8 weeks before, at their rate. */
function estimateAwe(
  entries: Array<{ date: string; hours: number }>,
  start: string,
  rate: number | null,
  overtime: { multiplier: number; threshold: number }
): number | null {
  if (!rate) return null;
  const from = iso(addDays(parseISO(start), -56));
  const pay = weeklyPayFromEntries(
    entries.filter((e) => e.date >= from && e.date < start),
    rate,
    overtime
  ).reduce((s, w) => s + w.pay, 0);
  return Math.round((pay / 8) * 100) / 100;
}

export function SicknessPanel({
  leave,
  canSeeMoney = true,
}: {
  leave: TeamLeaveRequest[];
  /** False for office managers: absence and fit note only, no pay. */
  canSeeMoney?: boolean;
}) {
  const { data: full, isLoading: fullLoading } = useSicknessRecords(canSeeMoney);
  const { data: office, isLoading: officeLoading } = useOfficeSickness(!canSeeMoney);
  const isLoading = canSeeMoney ? fullLoading : officeLoading;
  const hasFitNote = (id: string) =>
    canSeeMoney ? !!full?.get(id)?.fitNotePath : !!office?.get(id)?.fitNoteOnFile;
  const backOn = (id: string) => (canSeeMoney ? full?.get(id)?.rtwDate : office?.get(id)?.rtwDate);
  const [params, setParams] = useSearchParams();
  const [openId, setOpenId] = useState<string | null>(null);
  const today = iso(new Date());

  const sick = useMemo(
    () =>
      leave
        .filter(
          (l) =>
            l.type === 'sick' &&
            (l.status === 'approved' || l.status === 'pending') &&
            l.endDate >= iso(addDays(new Date(), -120))
        )
        .sort((a, b) => b.startDate.localeCompare(a.startDate)),
    [leave]
  );

  // /employer?section=leave&sick=<leave id> (the fit note bell) opens it.
  const sickParam = params.get('sick');
  useEffect(() => {
    if (!sickParam) return;
    if (leave.some((l) => l.id === sickParam)) {
      setOpenId(sickParam);
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete('sick');
          return next;
        },
        { replace: true }
      );
    }
  }, [sickParam, leave, setParams]);

  const needed = sick.filter(
    (l) =>
      fitNoteState(l.startDate, l.endDate, hasFitNote(l.id), today) === 'needed'
  ).length;
  const opened = openId ? (leave.find((l) => l.id === openId) ?? null) : null;

  return (
    <section data-help="leave.sickness">
      <PanelTitle
        title="Sickness"
        meta={
          needed > 0 ? (
            <span className="text-[12px] font-semibold text-elec-yellow">
              {needed} fit note{needed === 1 ? '' : 's'} needed
            </span>
          ) : undefined
        }
      />
      <div className={cn(panel, sick.length > 0 && rowsClass)}>
        {isLoading ? (
          <div className="flex h-[72px] items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          </div>
        ) : sick.length === 0 ? (
          <PlainEmpty
            bare
            text={
              canSeeMoney
                ? 'Sick leave in the last four months shows here, with SSP, fit notes and return to work.'
                : 'Sick leave in the last four months shows here, with fit notes and the date they came back.'
            }
          />
        ) : (
          sick.map((l) => {
            const fit = fitNoteState(l.startDate, l.endDate, hasFitNote(l.id), today);
            const days = calendarDaysOff(l.startDate, l.endDate);
            return (
              <Row
                key={l.id}
                lead={<Initials name={l.employeeName} />}
                title={l.employeeName}
                detail={`${days} day${days === 1 ? '' : 's'} from ${nice(l.startDate)}${backOn(l.id) ? ' · back at work' : ''}`}
                trailing={<StatusPill tone={FIT_PILL[fit].tone}>{FIT_PILL[fit].text}</StatusPill>}
                onClick={() => setOpenId(l.id)}
              />
            );
          })
        )}
      </div>
      <p className="mt-2 text-[13px] text-white">
        {canSeeMoney
          ? 'SSP is paid from the first day off, up to 28 weeks. A fit note can be asked for after 7 days in a row.'
          : 'A fit note can be asked for after 7 days in a row. The owner or an admin works out sick pay.'}
      </p>
      {opened &&
        (canSeeMoney ? (
          <SicknessSheet
            leave={opened}
            record={full?.get(opened.id) ?? null}
            onClose={() => setOpenId(null)}
          />
        ) : (
          <OfficeSicknessSheet
            leave={opened}
            record={office?.get(opened.id) ?? null}
            onClose={() => setOpenId(null)}
          />
        ))}
    </section>
  );
}

function SicknessSheet({
  leave,
  record,
  onClose,
}: {
  leave: TeamLeaveRequest;
  record: SicknessRecord | null;
  onClose: () => void;
}) {
  const rates = useStatutoryRates();
  const save = useSaveSickness();
  const { data: employees = [] } = useEmployees();
  const { data: allowances = [] } = useTeamAllowances();
  const { data: hoursMap } = useApprovedHours({
    employeeId: leave.employeeId,
    since: iso(addDays(parseISO(leave.startDate), -70)),
  });
  const emp = employees.find((e) => e.id === leave.employeeId);
  const rate = emp && Number(emp.hourly_rate) > 0 ? Number(emp.hourly_rate) : null;
  const overtime = {
    multiplier: Number(emp?.overtime_multiplier ?? 1.5),
    threshold: Number(emp?.overtime_threshold_hours ?? 8),
  };
  const dpw = allowances.find((a) => a.employeeId === leave.employeeId)?.daysPerWeek ?? null;
  const first = leave.employeeName.split(' ')[0] || 'They';
  const today = iso(new Date());

  const [awe, setAwe] = useState('');
  const [qd, setQd] = useState('');
  const [until, setUntil] = useState('');
  const [rtwDate, setRtwDate] = useState('');
  const [fit, setFit] = useState<boolean | null>(null);
  const [adjust, setAdjust] = useState('');
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    setAwe(record?.averageWeeklyEarnings != null ? String(record.averageWeeklyEarnings) : '');
    setQd(record?.qualifyingDaysPerWeek != null ? String(record.qualifyingDaysPerWeek) : '');
    setUntil(record?.fitNoteUntil ?? '');
    setRtwDate(record?.rtwDate ?? '');
    setFit(record?.rtwFitForFullDuties ?? null);
    setAdjust(record?.rtwAdjustments ?? '');
    setNotes(record?.rtwNotes ?? '');
  }, [record]);

  const estimate = estimateAwe(
    hoursMap?.get(leave.employeeId) ?? [],
    leave.startDate,
    rate,
    overtime
  );
  const aweNum = awe.trim() !== '' && Number.isFinite(Number(awe)) ? Number(awe) : null;
  const usedAwe = aweNum ?? estimate;
  const qdNum = qd.trim() !== '' ? Number(qd) : (dpw ?? 5);
  const weekly = usedAwe !== null ? sspWeekly(rates, usedAwe, leave.startDate) : null;
  const total =
    usedAwe !== null
      ? sspForPeriod({
          rates,
          sickStart: leave.startDate,
          sickEnd: leave.endDate,
          periodStart: leave.startDate,
          periodEnd: leave.endDate,
          awe: usedAwe,
          daysPerWeek: qdNum,
        })
      : null;
  const days = calendarDaysOff(leave.startDate, leave.endDate);
  const fitState = fitNoteState(leave.startDate, leave.endDate, !!record?.fitNotePath, today);
  const { url: fitUrl } = useStorageUrl('fit-notes', record?.fitNotePath ?? undefined);

  const base = {
    leaveRequestId: leave.id,
    employeeId: leave.employeeId,
    startDate: leave.startDate,
    endDate: leave.endDate,
  };

  const onUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const path = await uploadFitNote(file, leave.id);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      await save.mutateAsync({
        ...base,
        patch: {
          fit_note_path: path,
          fit_note_name: file.name.slice(0, 200),
          fit_note_until: until || null,
          fit_note_uploaded_at: new Date().toISOString(),
          fit_note_uploaded_by: user?.id ?? null,
        },
      });
      toast({ title: 'Fit note added' });
    } catch (e) {
      toast({
        title: 'Fit note not added',
        description: e instanceof Error ? e.message : 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const onSave = async () => {
    if (aweNum !== null && (aweNum < 0 || aweNum > 100000)) {
      toast({ title: 'Check the average weekly earnings', variant: 'destructive' });
      return;
    }
    if (qd.trim() !== '' && (!(qdNum >= 1) || qdNum > 7)) {
      toast({ title: 'Days a week must be 1 to 7', variant: 'destructive' });
      return;
    }
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const rtwChanged =
        (rtwDate || null) !== (record?.rtwDate ?? null) ||
        fit !== (record?.rtwFitForFullDuties ?? null) ||
        (adjust.trim() || null) !== (record?.rtwAdjustments ?? null) ||
        (notes.trim() || null) !== (record?.rtwNotes ?? null);
      await save.mutateAsync({
        ...base,
        patch: {
          average_weekly_earnings: aweNum,
          qualifying_days_per_week: qd.trim() !== '' ? Math.round(qdNum * 2) / 2 : null,
          fit_note_until: until || null,
          rtw_date: rtwDate || null,
          rtw_fit_for_full_duties: fit,
          rtw_adjustments: adjust.trim() || null,
          rtw_notes: notes.trim() || null,
          ...(rtwChanged
            ? { rtw_recorded_by: user?.id ?? null, rtw_recorded_at: new Date().toISOString() }
            : {}),
        },
      });
      toast({ title: 'Sickness record saved' });
      onClose();
    } catch (e) {
      toast({
        title: 'Not saved',
        description: e instanceof Error ? e.message : 'Try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <FormSheet
      open
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      title={`${leave.employeeName}, off sick`}
      description={`${format(parseISO(leave.startDate), 'EEE d MMM')}${
        leave.endDate !== leave.startDate
          ? ` to ${format(parseISO(leave.endDate), 'EEE d MMM yyyy')}`
          : ''
      } · ${days} day${days === 1 ? '' : 's'} in a row${leave.status === 'pending' ? ' · not approved yet' : ''}`}
      footer={
        <div className="flex w-full justify-end gap-2">
          <button type="button" className={rowBtnSecondary} onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={save.isPending}
            className="inline-flex h-11 items-center justify-center rounded-full bg-elec-yellow px-8 text-[14px] font-semibold text-black touch-manipulation disabled:opacity-60"
          >
            {save.isPending ? 'Saving…' : 'Save'}
          </button>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <section className="space-y-4">
            <h3 className="text-[15px] font-semibold text-white">Statutory Sick Pay</h3>
            <div className={cn(panel, 'overflow-hidden')}>
              <div className={rowsClass}>
                <KeyValue
                  label="SSP a week"
                  value={weekly ? money(weekly.weekly) : 'Needs earnings'}
                />
                {total && (
                  <KeyValue
                    label={`This absence, ${total.days} qualifying day${total.days === 1 ? '' : 's'}`}
                    value={money(total.pay)}
                  />
                )}
              </div>
            </div>
            <p className="text-[13px] leading-snug text-white">
              {weekly
                ? weekly.limitedBy === 'flat_rate'
                  ? `The lower of ${money(weekly.capRate)} or 80% of their average weekly earnings (${money((usedAwe ?? 0) * 0.8)}), paid for each qualifying day from the first day off.`
                  : `80% of their average weekly earnings of ${money(usedAwe ?? 0)}, as that is below ${money(weekly.capRate)}. Paid for each qualifying day from the first day off.`
                : 'Add their average weekly earnings to work out SSP.'}
            </p>
            <Field
              label="Average weekly earnings (£)"
              hint={
                estimate !== null
                  ? `Leave blank to use ${money(estimate)}, from their approved hours in the 8 weeks before. Your payroll's figure is the one to use.`
                  : 'From payroll: their average gross pay a week over the 8 weeks before they went off.'
              }
            >
              <input
                inputMode="decimal"
                value={awe}
                onChange={(e) => setAwe(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder={estimate !== null ? estimate.toFixed(2) : '0.00'}
                className={inputClass}
              />
            </Field>
            <Field
              label="Days they normally work a week"
              hint={`SSP is paid for these days. ${dpw ? `${dpw} from their holiday allowance.` : 'Monday to Friday if blank.'}`}
            >
              <input
                inputMode="decimal"
                value={qd}
                onChange={(e) => setQd(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder={String(dpw ?? 5)}
                className={inputClass}
              />
            </Field>
            {estimate !== null && aweNum === null && (
              <p className="text-[13px] text-elec-yellow">
                Estimate: the payroll file marks this until you add the real figure.
              </p>
            )}
          </section>

          <section className="space-y-4">
            <h3 className="text-[15px] font-semibold text-white">Fit note</h3>
            <p className="text-[13px] leading-snug text-white">
              {fitState === 'on_file'
                ? `Added ${record?.fitNoteUploadedAt ? format(parseISO(record.fitNoteUploadedAt), 'd MMM') : ''}${
                    record?.fitNoteName ? `: ${record.fitNoteName}` : ''
                  }.`
                : fitState === 'needed'
                  ? `${first} has been off more than 7 days in a row, so you can ask for a fit note. ${first} can add it from Worker Tools, or you can add it here.`
                  : 'Up to 7 days they self-certify. You can still add one if they have it.'}
            </p>
            <Field label="Fit note says off until">
              <input
                type="date"
                value={until}
                onChange={(e) => setUntil(e.target.value)}
                className={inputClass}
              />
            </Field>
            <div className="flex flex-wrap gap-2">
              <label
                className={cn(
                  rowBtnSecondary,
                  'cursor-pointer gap-1.5',
                  uploading && 'pointer-events-none opacity-60'
                )}
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {record?.fitNotePath ? 'Replace fit note' : 'Add fit note'}
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  className="hidden"
                  onChange={(e) => {
                    void onUpload(e.target.files?.[0]);
                    e.target.value = '';
                  }}
                />
              </label>
              {fitUrl && (
                <a
                  href={fitUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(rowBtnSecondary, 'gap-1.5')}
                >
                  <ExternalLink className="h-4 w-4" />
                  Open it
                </a>
              )}
            </div>
          </section>
        </div>

        <section className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">Return to work</h3>
          <p className="text-[13px] leading-snug text-white">
            A short chat when they come back: how they are, whether they need anything changed, and
            anything to watch. It stays on their record.
          </p>
          <Field label="Back at work on">
            <input
              type="date"
              value={rtwDate}
              min={leave.startDate}
              onChange={(e) => setRtwDate(e.target.value)}
              className={inputClass}
            />
          </Field>
          <div className="space-y-2">
            <p className="text-[12px] font-medium text-white">Fit for their full duties?</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                aria-pressed={fit === true}
                onClick={() => setFit(true)}
                className={cn(chip, fit === true ? chipOn : chipOff)}
              >
                Yes
              </button>
              <button
                type="button"
                aria-pressed={fit === false}
                onClick={() => setFit(false)}
                className={cn(chip, fit === false ? chipOn : chipOff)}
              >
                Not yet
              </button>
            </div>
          </div>
          <Field
            label="Changes agreed"
            hint="Lighter work, shorter days, no ladders. Leave blank if none."
          >
            <textarea
              rows={3}
              value={adjust}
              maxLength={2000}
              onChange={(e) => setAdjust(e.target.value)}
              className={textareaClass}
            />
          </Field>
          <Field label="Notes from the chat">
            <textarea
              rows={4}
              value={notes}
              maxLength={4000}
              onChange={(e) => setNotes(e.target.value)}
              className={textareaClass}
            />
          </Field>
          {record?.rtwRecordedAt && (
            <p className="text-[13px] text-white">
              Last recorded {format(parseISO(record.rtwRecordedAt), 'd MMM yyyy, HH:mm')}.
            </p>
          )}
        </section>
      </div>
    </FormSheet>
  );
}

/**
 * The office's view of one absence: the fit note and the dates. No SSP, no
 * earnings, no return-to-work notes, and the fit note is not opened here.
 */
function OfficeSicknessSheet({
  leave,
  record,
  onClose,
}: {
  leave: TeamLeaveRequest;
  record: OfficeSicknessRow | null;
  onClose: () => void;
}) {
  const save = useOfficeSaveSickness();
  const first = leave.employeeName.split(' ')[0] || 'They';
  const today = iso(new Date());
  const [until, setUntil] = useState('');
  const [back, setBack] = useState('');
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    setUntil(record?.fitNoteUntil ?? '');
    setBack(record?.rtwDate ?? '');
    setFile(null);
  }, [record]);
  const days = calendarDaysOff(leave.startDate, leave.endDate);
  const onFile = !!record?.fitNoteOnFile;
  const fitState = fitNoteState(leave.startDate, leave.endDate, onFile || !!file, today);

  const onSave = async () => {
    try {
      await save.mutateAsync({
        leaveRequestId: leave.id,
        fitNoteUntil: until || null,
        rtwDate: back || null,
        file,
      });
      toast({ title: file ? 'Fit note added' : 'Sickness record saved' });
      onClose();
    } catch (e) {
      toast({
        title: 'Not saved',
        description: e instanceof Error ? e.message : 'Try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <FormSheet
      open
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      title={`${leave.employeeName}, off sick`}
      description={`${format(parseISO(leave.startDate), 'EEE d MMM')}${
        leave.endDate !== leave.startDate
          ? ` to ${format(parseISO(leave.endDate), 'EEE d MMM yyyy')}`
          : ''
      } · ${days} day${days === 1 ? '' : 's'} in a row${leave.status === 'pending' ? ' · not approved yet' : ''}`}
      footer={
        <div className="flex w-full justify-end gap-2">
          <button type="button" className={rowBtnSecondary} onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={save.isPending}
            className="inline-flex h-11 items-center justify-center rounded-full bg-elec-yellow px-8 text-[14px] font-semibold text-black touch-manipulation disabled:opacity-60"
          >
            {save.isPending ? 'Saving…' : 'Save'}
          </button>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">Fit note</h3>
          <div className={cn(panel, 'overflow-hidden')}>
            <div className={rowsClass}>
              <KeyValue
                label="Fit note"
                value={
                  file
                    ? `Ready to add: ${file.name}`
                    : onFile
                      ? `In${record?.fitNoteUploadedAt ? `, added ${format(parseISO(record.fitNoteUploadedAt), 'd MMM')}` : ''}`
                      : fitState === 'needed'
                        ? 'Needed'
                        : 'Not needed yet'
                }
                tone={!file && !onFile && fitState === 'needed' ? 'yellow' : undefined}
              />
            </div>
          </div>
          <p className="text-[13px] leading-snug text-white">
            {fitState === 'needed' && !onFile && !file
              ? `${first} has been off more than 7 days in a row, so ask for a fit note. ${first} can add it from Worker Tools, or you can add a photo of it here.`
              : 'Up to 7 days they self-certify. Add a fit note if they have one.'}
          </p>
          <Field label="Fit note says off until">
            <input
              type="date"
              value={until}
              min={leave.startDate}
              onChange={(e) => setUntil(e.target.value)}
              className={inputClass}
            />
          </Field>
          <label className={cn(rowBtnSecondary, 'cursor-pointer gap-1.5')}>
            <Upload className="h-4 w-4" />
            {onFile || file ? 'Replace fit note' : 'Add fit note'}
            <input
              type="file"
              accept="application/pdf,image/*"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null);
                e.target.value = '';
              }}
            />
          </label>
        </section>

        <section className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">Back at work</h3>
          <Field label="Back at work on">
            <input
              type="date"
              value={back}
              min={leave.startDate}
              onChange={(e) => setBack(e.target.value)}
              className={inputClass}
            />
          </Field>
          <p className="text-[13px] leading-snug text-white">
            Sick pay, the fit note itself and the return-to-work notes are seen by the owner and
            admins only.
          </p>
        </section>
      </div>
    </FormSheet>
  );
}
