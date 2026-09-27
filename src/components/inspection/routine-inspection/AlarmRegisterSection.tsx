import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FormCard, FieldLabel, SectionHeading, SelectField } from '@/components/forms';
import { inputCn, textareaCn, grid2Cn } from '@/components/forms/fieldStyles';
import {
  ROUTINE_ALARM_TYPES,
  ROUTINE_ALARM_POWER_SOURCES,
  getDefaultAlarm,
  alarmReplacementDue,
  type RoutineAlarm,
  type RoutineAlarmType,
  type RoutineInspectionFormData,
} from '@/types/routine-inspection';

/**
 * The alarms in the dwelling — which, where, and when they expire.
 *
 * Landlord visits only. The schedule already asks whether alarms are present,
 * sited, sounded and in date; item 3.6 goes as far as "replacement date on each
 * alarm head checked and not passed" with nowhere to write the dates down. This
 * is where they go, so that tick has something behind it.
 *
 * 🔴 IT IS AN INVENTORY, NOT A CERTIFICATE. No grade (A–F), no category
 * (LD1–LD3), no declaration of compliance with BS 5839-6. Those are design
 * statements and they belong on the Smoke & CO Alarm certificate, which owns
 * that vocabulary. See `RoutineAlarm` for the full reasoning — the short
 * version is that two documents able to declare a grade are two documents able
 * to disagree about it.
 *
 * Nothing here is marked pass or fail either, for the same reason the spot
 * checks are not: a finding becomes an OBSERVATION with a code, which is what
 * keeps it in front of the landlord and out of a silent verdict change.
 */

interface Props {
  formData: RoutineInspectionFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: keyof RoutineInspectionFormData, value: any) => void;
}

/**
 * 🔴 Every `value=` on this screen goes through here.
 *
 * These rows come back out of a JSON column, so a stored key holding `null`
 * overwrites the default instead of falling back to it. React then warns that
 * `value` must not be null and switches the input from controlled to
 * uncontrolled, so what the inspector types stops reaching the report — a field
 * that looks entered and is not. Same trap, same fix, as SpotChecksSection.
 */
const text = (v: unknown): string => (typeof v === 'string' ? v : '');

/** Is this replacement date in the past, on the day the form is open? */
const expired = (due: string): boolean => {
  const raw = text(due).trim();
  if (!raw) return false;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
};

export default function AlarmRegisterSection({ formData, onUpdate }: Props) {
  const alarms = formData.alarms ?? [];

  const update = (id: string, patch: Partial<RoutineAlarm>) =>
    onUpdate(
      'alarms',
      alarms.map((a) => (a.id === id ? { ...a, ...patch } : a))
    );

  /*
   * Changing the type or the manufacture date re-suggests the replacement date,
   * but only while the inspector has not written one themselves — the marking
   * on the head beats our arithmetic, and silently overwriting a date someone
   * typed is how a wrong expiry ends up on a signed document.
   */
  const recalc = (a: RoutineAlarm, patch: Partial<RoutineAlarm>) => {
    const next = { ...a, ...patch };
    const suggestion = alarmReplacementDue(next.dateOfManufacture, next.alarmType);
    const untouched =
      !text(a.replacementDue) ||
      text(a.replacementDue) === alarmReplacementDue(a.dateOfManufacture, a.alarmType);
    return untouched && suggestion ? { ...patch, replacementDue: suggestion } : patch;
  };

  const expiredCount = alarms.filter((a) => expired(text(a.replacementDue))).length;
  const untested = alarms.filter((a) => text(a.testedOk) === 'no').length;

  /*
   * 🔴 A ROW WITH NEITHER A TYPE NOR A LOCATION IS NOT AN ALARM, AND THE REPORT
   * KNOWS IT.
   *
   * `effectiveAlarms` keeps only rows carrying one or the other, so an
   * inspector who adds a row, types a manufacture date and moves on gets a
   * report with that alarm missing from the register. Same failure as the spot
   * checks: it looks entered and is not. Say so here, while it can still be
   * fixed, rather than on a PDF already with the landlord.
   */
  const incomplete = alarms.filter((a) => !text(a.alarmType) && !text(a.location).trim());

  return (
    <FormCard>
      <SectionHeading title="Alarm register" />
      <p className="text-[13px] leading-relaxed text-white">
        Every smoke, heat and CO alarm in the property, with where it is and when
        it has to be replaced. This is a record of what was found — it does not
        declare a grade or a category, and it is not a Smoke &amp; CO Alarm
        certificate.
      </p>

      <div className="flex items-baseline justify-between gap-3 border-t border-white/[0.1] pt-4">
        <span className="text-[13px] font-semibold text-white">
          {alarms.length} alarm{alarms.length === 1 ? '' : 's'}
        </span>
        <button
          type="button"
          onClick={() => onUpdate('alarms', [...alarms, getDefaultAlarm()])}
          className="flex h-11 items-center gap-1 rounded-xl border border-elec-yellow/50 bg-elec-yellow/10 px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Add alarm
        </button>
      </div>

      {alarms.length === 0 && (
        <p className="text-[12px] leading-snug text-elec-yellow">
          No alarms recorded. The schedule can still say they were checked, but the
          report will carry no register to show which ones or when they expire.
        </p>
      )}

      {incomplete.length > 0 && (
        <p className="text-[12px] leading-snug text-elec-yellow">
          {incomplete.length} of these {alarms.length} rows {incomplete.length === 1 ? 'has' : 'have'}{' '}
          neither a type nor a location, so {incomplete.length === 1 ? 'it' : 'they'} will not appear
          on the report.
        </p>
      )}

      {expiredCount > 0 && (
        <p className="text-[12px] leading-snug text-elec-yellow">
          {expiredCount} alarm{expiredCount === 1 ? ' is' : 's are'} past the
          replacement date. Raise it as an observation as well — a date in a table
          is a fact, an observation is the thing the landlord has to act on.
        </p>
      )}

      {untested > 0 && (
        <p className="text-[12px] leading-snug text-elec-yellow">
          {untested} alarm{untested === 1 ? ' did' : 's did'} not sound on test.
          That is a defect, not a note: record it as an observation too.
        </p>
      )}

      {alarms.map((a, idx) => {
        const isExpired = expired(text(a.replacementDue));
        const failed = text(a.testedOk) === 'no';
        const willDrop = !text(a.alarmType) && !text(a.location).trim();
        return (
          <div
            key={a.id}
            className={cn(
              'space-y-3 rounded-xl border p-3',
              isExpired || failed || willDrop
                ? 'border-elec-yellow/40 bg-elec-yellow/[0.06]'
                : 'border-white/[0.14] bg-white/[0.04]'
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-white">
                Alarm {idx + 1}
                {willDrop && (
                  <span className="ml-2 font-medium text-elec-yellow">won’t be included</span>
                )}
                {isExpired && <span className="ml-2 font-medium text-elec-yellow">past its date</span>}
                {failed && <span className="ml-2 font-medium text-elec-yellow">did not sound</span>}
              </span>
              <button
                type="button"
                onClick={() =>
                  onUpdate(
                    'alarms',
                    alarms.filter((x) => x.id !== a.id)
                  )
                }
                className="h-11 px-2 text-[13px] font-semibold text-red-400 touch-manipulation"
              >
                Remove
              </button>
            </div>

            <div>
              <FieldLabel>Type of alarm</FieldLabel>
              <SelectField
                value={text(a.alarmType) as RoutineAlarmType}
                onValueChange={(v) =>
                  update(a.id, recalc(a, { alarmType: v as RoutineAlarmType }))
                }
                placeholder="Select"
                options={ROUTINE_ALARM_TYPES.map((t) => ({ value: t.value, label: t.label }))}
              />
            </div>

            <div>
              <FieldLabel>Location</FieldLabel>
              <Input
                value={text(a.location)}
                onChange={(e) => update(a.id, { location: e.target.value })}
                className={inputCn}
                placeholder="e.g. Ground floor hallway, ceiling"
              />
            </div>

            <div>
              <FieldLabel>Power source</FieldLabel>
              <SelectField
                value={text(a.powerSource)}
                onValueChange={(v) => update(a.id, { powerSource: v as RoutineAlarm['powerSource'] })}
                placeholder="Select"
                options={ROUTINE_ALARM_POWER_SOURCES}
              />
            </div>

            {/*
              ⚠️ Manufacture date is TEXT, not a date input. Heads are marked
              half a dozen ways — "03/19", "2019-03", "MAR 2019" — and a date
              picker that refuses the marking is a marking that does not get
              written down. The replacement date is a real date because that is
              the one we compare against today.
            */}
            <div className={grid2Cn}>
              <div>
                <FieldLabel>Date of manufacture</FieldLabel>
                <Input
                  value={text(a.dateOfManufacture)}
                  onChange={(e) =>
                    update(a.id, recalc(a, { dateOfManufacture: e.target.value }))
                  }
                  className={inputCn}
                  placeholder="As marked, e.g. 03/2019"
                />
              </div>
              <div>
                <FieldLabel>Replacement due</FieldLabel>
                <Input
                  type="date"
                  value={text(a.replacementDue)}
                  onChange={(e) => update(a.id, { replacementDue: e.target.value })}
                  className={inputCn}
                />
                <p className="mt-1.5 text-[12px] leading-snug text-white">
                  Suggested from the manufacture date — 10 years, or 7 where it
                  detects CO. Overwrite it if the head says otherwise.
                </p>
              </div>
            </div>

            <div>
              <FieldLabel>Sounded on its test button?</FieldLabel>
              <SelectField
                value={text(a.testedOk)}
                onValueChange={(v) => update(a.id, { testedOk: v as RoutineAlarm['testedOk'] })}
                placeholder="Select"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No — did not sound' },
                  { value: 'not-tested', label: 'Not tested' },
                ]}
              />
            </div>

            <div>
              <FieldLabel>Notes, if any</FieldLabel>
              <Textarea
                value={text(a.notes)}
                onChange={(e) => update(a.id, { notes: e.target.value })}
                className={cn(textareaCn, 'min-h-[44px]')}
                placeholder="e.g. Interlinked with the landing head, RF module"
              />
            </div>
          </div>
        );
      })}
    </FormCard>
  );
}
