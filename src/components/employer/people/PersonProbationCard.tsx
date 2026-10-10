/**
 * Probation and the qualifying period on the person sheet (ELE-2075).
 * Owner and admins only. Employees only: subcontractors have no probation and
 * no unfair dismissal right.
 *
 * Qualifying period checked 10 Oct 2026: England, Scotland and Wales 2 years
 * now, 6 months for dismissals from 1 January 2027; Northern Ireland 1 year
 * (https://www.gov.uk/dismiss-staff/eligibility-to-claim-unfair-dismissal,
 * https://www.legislation.gov.uk/nisi/1996/1919/article/140). The nation comes
 * from hr_employment_law(); when it is unknown no date is shown.
 * Reminders: employer_expiry_items, 30 days, 7 days and on the day, once each.
 */
import { useState } from 'react';
import { addDays, addMonths, differenceInCalendarDays, format, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import FormSheet from '@/components/forms/FormSheet';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import {
  KeyValue,
  PlainEmpty,
  StatusPill,
  rowBtnPrimary,
  rowBtnSecondary,
  rowsClass,
} from '@/components/employer/pageParts/PageParts';
import { Field, inputClass, textareaClass } from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  PROBATION_OUTCOME_LABEL,
  qualifyingDate,
  useHrPeople,
  useSavePersonHr,
  type HrPerson,
} from '@/hooks/useHrRecords';
import { useEmploymentLaw, useHrSettings, type EmploymentLaw } from '@/hooks/useRightToWork';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chip = 'h-11 rounded-full border px-4 text-[13px] touch-manipulation';
const nice = (d: string | null | undefined) => (d ? format(parseISO(d), 'd MMM yyyy') : '');
const qDaysOf = (d: string) => differenceInCalendarDays(parseISO(d), new Date());

export function qualifyingExplainer(law: EmploymentLaw | null | undefined): string {
  if (law === 'ni')
    return 'In Northern Ireland most employees can claim unfair dismissal after 1 year. The 6 month change from January 2027 applies in England, Scotland and Wales only. This is a guide, not legal advice.';
  if (law === 'gb')
    return 'From 1 January 2027 most employees in England, Scotland and Wales can claim unfair dismissal after 6 months, down from 2 years. Notice can move the date later, so plan reviews early. This is a guide, not legal advice.';
  return 'The date depends on where you employ people: 1 year in Northern Ireland, and 6 months in England, Scotland and Wales from 1 January 2027. Set yours in Right to work and HR records. This is a guide, not legal advice.';
}

export function PersonProbationCard({
  person,
}: {
  person: { id: string; name: string; joinDate?: string | null };
}) {
  const { data: people = [], isLoading } = useHrPeople();
  const { data: lawInfo } = useEmploymentLaw();
  const law = lawInfo?.law ?? null;
  const hr = people.find((p) => p.roster_id === person.id);
  const [open, setOpen] = useState(false);
  const first = person.name.split(' ')[0] || 'They';

  const start = hr?.start_date ?? person.joinDate ?? null;
  const qualifying = hr?.qualifying_date ?? qualifyingDate(start, law);
  const qualifyingRow = qualifying ? (
    <KeyValue
      label="Unfair dismissal protection"
      value={qDaysOf(qualifying) <= 0 ? 'Reached' : `From ${nice(qualifying)}`}
      tone={qDaysOf(qualifying) > 0 && qDaysOf(qualifying) <= 30 ? 'yellow' : undefined}
    />
  ) : start && !law ? (
    <KeyValue label="Unfair dismissal protection" value="Set your nation in HR records" />
  ) : null;
  const reviewDue = hr?.probation_review_date ?? hr?.probation_end_date ?? null;
  const reviewDays = reviewDue ? differenceInCalendarDays(parseISO(reviewDue), new Date()) : null;
  const open_ = !hr?.probation_outcome || hr.probation_outcome === 'extended';

  const meta =
    hr?.probation_outcome === 'passed' ? (
      <StatusPill tone="green">Passed</StatusPill>
    ) : hr?.probation_outcome === 'ended' ? (
      <StatusPill>Ended</StatusPill>
    ) : reviewDays !== null && open_ ? (
      <StatusPill tone={reviewDays < 0 ? 'red' : reviewDays <= 30 ? 'volt' : 'neutral'}>
        {reviewDays < 0
          ? 'Review overdue'
          : reviewDays === 0
            ? 'Review today'
            : `Review in ${reviewDays} ${reviewDays === 1 ? 'day' : 'days'}`}
      </StatusPill>
    ) : undefined;

  return (
    <section>
      <PanelTitle
        title="Probation"
        meta={meta}
        action={hr?.probation_end_date ? 'Edit' : undefined}
        onAction={() => setOpen(true)}
      />
      {isLoading ? (
        <div className={cn(panel, 'h-[60px] animate-pulse')} />
      ) : !hr?.probation_end_date ? (
        <div className="space-y-3">
          <PlainEmpty
            text={`No probation set for ${first}. Add the end date and you get a reminder before the review.`}
            action="Set probation"
            onAction={() => setOpen(true)}
          />
          {qualifyingRow && <div className={cn(panel, 'overflow-hidden')}>{qualifyingRow}</div>}
        </div>
      ) : (
        <div className={cn(panel, 'overflow-hidden')}>
          <div className={rowsClass}>
            <KeyValue
              label={hr.start_is_join_date ? 'Started (join date)' : 'Started'}
              value={nice(start) || 'Not set'}
            />
            <KeyValue label="Probation ends" value={nice(hr.probation_end_date)} />
            {hr.probation_review_date && (
              <KeyValue label="Review" value={nice(hr.probation_review_date)} />
            )}
            {hr.probation_outcome && (
              <KeyValue
                label="Outcome"
                value={`${PROBATION_OUTCOME_LABEL[hr.probation_outcome]}${hr.probation_outcome_on ? `, ${nice(hr.probation_outcome_on)}` : ''}`}
              />
            )}
            {qualifyingRow}
          </div>
        </div>
      )}
      <p className="mt-2 text-[12.5px] leading-snug text-white">{qualifyingExplainer(law)}</p>
      <ProbationSheet
        open={open}
        onOpenChange={setOpen}
        person={person}
        hr={hr ?? null}
        start={start}
        law={law}
      />
    </section>
  );
}

function ProbationSheet({
  open,
  onOpenChange,
  person,
  hr,
  start,
  law,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  person: { id: string; name: string };
  hr: HrPerson | null;
  start: string | null;
  law: EmploymentLaw | null;
}) {
  const save = useSavePersonHr();
  const { data: settings } = useHrSettings();
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reviewDate, setReviewDate] = useState('');
  const [outcome, setOutcome] = useState<HrPerson['probation_outcome']>(null);
  const [outcomeOn, setOutcomeOn] = useState('');
  const [notes, setNotes] = useState('');

  const key = `${open}:${person.id}`;
  if (open && key !== lastKey) {
    setLastKey(key);
    const s = start ?? '';
    const months = settings?.default_probation_months ?? 6;
    const end =
      hr?.probation_end_date ?? (s ? format(addMonths(parseISO(s), months), 'yyyy-MM-dd') : '');
    setStartDate(s);
    setEndDate(end);
    setReviewDate(
      hr?.probation_review_date ?? (end ? format(addDays(parseISO(end), -14), 'yyyy-MM-dd') : '')
    );
    setOutcome(hr?.probation_outcome ?? null);
    setOutcomeOn(hr?.probation_outcome_on ?? '');
    setNotes(hr?.probation_notes ?? '');
  }
  if (!open && lastKey !== null) setLastKey(null);

  const setLength = (m: number) => {
    if (!startDate) return;
    const end = format(addMonths(parseISO(startDate), m), 'yyyy-MM-dd');
    setEndDate(end);
    setReviewDate(format(addDays(parseISO(end), -14), 'yyyy-MM-dd'));
  };
  const q = qualifyingDate(startDate || null, law);
  const canSave = !!endDate && !save.isPending && (!startDate || endDate >= startDate);

  const submit = async () => {
    try {
      await save.mutateAsync({
        rosterId: person.id,
        start_date: startDate || null,
        probation_end_date: endDate || null,
        probation_review_date: reviewDate || null,
        probation_outcome: outcome,
        probation_outcome_on: outcome ? outcomeOn || format(new Date(), 'yyyy-MM-dd') : null,
        probation_notes: notes.trim() || null,
      });
      toast({
        title: 'Probation saved',
        description:
          outcome && outcome !== 'extended'
            ? 'No more reminders for this probation.'
            : `You get a reminder before the review on ${nice(reviewDate || endDate)}.`,
      });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Not saved',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Probation"
      title={`Probation for ${person.name}`}
      description="Set the dates once. You get a reminder 30 days and 7 days before the review."
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            className={cn(rowBtnSecondary, 'flex-1')}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={cn(rowBtnPrimary, 'flex-1')}
            disabled={!canSave}
            onClick={submit}
          >
            {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Save
          </button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0 space-y-5">
          <Field label="Start of employment" hint="Defaults to the date they joined the team.">
            <input
              type="date"
              className={inputClass}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Field>
          <Field label="Length">
            <div className="flex flex-wrap gap-2">
              {[3, 6].map((m) => (
                <button
                  key={m}
                  type="button"
                  disabled={!startDate}
                  onClick={() => setLength(m)}
                  className={cn(
                    chip,
                    startDate && endDate === format(addMonths(parseISO(startDate), m), 'yyyy-MM-dd')
                      ? chipOn
                      : chipOff
                  )}
                >
                  {m} months
                </button>
              ))}
            </div>
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Probation ends" required>
              <input
                type="date"
                className={inputClass}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Field>
            <Field label="Review meeting">
              <input
                type="date"
                className={inputClass}
                value={reviewDate}
                onChange={(e) => setReviewDate(e.target.value)}
              />
            </Field>
          </div>
        </div>
        <div className="min-w-0 space-y-5">
          <Field label="Outcome">
            <div className="flex flex-wrap gap-2">
              {([null, 'passed', 'extended', 'ended'] as const).map((o) => (
                <button
                  key={o ?? 'open'}
                  type="button"
                  aria-pressed={outcome === o}
                  onClick={() => setOutcome(o)}
                  className={cn(chip, outcome === o ? chipOn : chipOff)}
                >
                  {o ? PROBATION_OUTCOME_LABEL[o] : 'Not decided'}
                </button>
              ))}
            </div>
          </Field>
          {outcome && (
            <Field label="Decided on">
              <input
                type="date"
                className={inputClass}
                value={outcomeOn}
                onChange={(e) => setOutcomeOn(e.target.value)}
              />
            </Field>
          )}
          <Field label="Notes" hint="Private to the owner and admins.">
            <textarea
              className={textareaClass}
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Field>
          <div className={cn(panel, 'px-4 py-3 text-[13px] leading-snug text-white sm:px-5')}>
            {q && (
              <>
                Unfair dismissal protection from about{' '}
                <span className="font-semibold">{nice(q)}</span>.{' '}
              </>
            )}
            {qualifyingExplainer(law)}
          </div>
        </div>
      </div>
    </FormSheet>
  );
}
