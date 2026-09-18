import { Info, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FormCard, FieldLabel, SectionHeading, ToggleRow, SelectField } from '@/components/forms';
import { inputCn, textareaCn, grid2Cn, fieldWideCn } from '@/components/forms/fieldStyles';
import {
  SPOT_CHECK_KINDS,
  getDefaultSpotCheck,
  spotCheckUnit,
  type RoutineInspectionFormData,
  type RoutineSpotCheck,
  type SpotCheckType,
} from '@/types/routine-inspection';

/**
 * Readings taken with an instrument during a maintenance visit.
 *
 * 🔴 THIS IS THE ONE SECTION THAT COULD TURN THIS DOCUMENT INTO A BADLY-MADE
 * EICR, so read `SpotCheckType` in `types/routine-inspection.ts` before
 * changing anything here. In short:
 *
 *   • It is OFF by default, and off means the readings leave the report and the
 *     printed limitations go back to saying no testing was carried out.
 *   • The word "sampling" is not used. In BS 7671 and GN3 sampling is periodic
 *     inspection machinery whose results belong on a Schedule of Test Results.
 *   • NOTHING here is marked pass or fail. Judging a Zs needs the protective
 *     device, its rating and curve, the circuit, Cmin and the ambient
 *     temperature — none of which this report holds. A reading the inspector
 *     thinks is wrong becomes an OBSERVATION with a code, which is also what
 *     stops a number silently moving the overall verdict.
 */

interface Props {
  formData: RoutineInspectionFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: keyof RoutineInspectionFormData, value: any) => void;
}

/* Past this it is not a spot check any more — it is a schedule, and a schedule
   belongs on a document built to carry one. */
const MANY_READINGS = 8;

/**
 * 🔴 Every `value=` on this screen goes through here.
 *
 * These fields come back out of a JSON column, so a stored key holding `null`
 * overwrites the default rather than falling back to it — the trap already
 * documented against `stored()` in `types/routine-inspection.ts`. In the UI it
 * bites differently and worse: React warns that `value` must not be null, and
 * the input silently switches from controlled to uncontrolled, so what the
 * inspector types stops reaching the report. A reading that looks entered and
 * is not is the worst outcome this screen has.
 */
const text = (v: unknown): string => (typeof v === 'string' ? v : '');

export default function SpotChecksSection({ formData, onUpdate }: Props) {
  const checks = formData.spotChecks ?? [];

  /*
   * 🔴 A READING WITHOUT A VALUE IS NOT A READING, AND THE REPORT KNOWS IT.
   *
   * `effectiveSpotChecks` keeps only rows that have both a type and a value,
   * and the printed limitations follow that — so an inspector who switches this
   * on, types a location and forgets the figure gets a report stating "no
   * verification testing was carried out". The document is right; the person is
   * surprised. That gap closes here, at the moment it can still be fixed,
   * rather than on a PDF already sent to a landlord.
   */
  const incomplete = checks.filter((c) => !text(c.type) || !text(c.value).trim());
  const counted = checks.length - incomplete.length;

  const update = (id: string, patch: Partial<RoutineSpotCheck>) =>
    onUpdate(
      'spotChecks',
      checks.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );

  const kindOf = (t: SpotCheckType) => SPOT_CHECK_KINDS.find((k) => k.value === t);

  return (
    <FormCard>
      <SectionHeading title="Spot checks" />
      <div>
        <FieldLabel>Did you take any readings with an instrument?</FieldLabel>
        <ToggleRow
          options={[
            { label: 'No', value: 'no' },
            { label: 'Yes', value: 'yes' },
          ]}
          value={formData.spotChecksCarriedOut ? 'yes' : 'no'}
          onChange={(v) => onUpdate('spotChecksCarriedOut', v === 'yes')}
        />
      </div>

      {!formData.spotChecksCarriedOut ? (
        <p className="text-[12px] leading-snug text-white">
          Most maintenance visits are visual and functional only. Leave this as No
          unless you actually put an instrument on something.
        </p>
      ) : (
        <>
          {/*
            Stated where the readings are entered, not buried in the limitations
            at the end. The inspector is the person who has to be comfortable
            with what this document claims, and this is the moment they decide.
          */}
          <div className="-mx-4 border-y border-white/[0.12] bg-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x">
            <div className="flex gap-3">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
              <p className="text-[13px] leading-snug text-white">
                These print as individual readings at the points you state — not a
                schedule of test results, and not a sampling exercise. Nothing here
                is marked pass or fail: if a reading is wrong, raise it as an
                observation so it carries a code and reaches the summary.
              </p>
            </div>
          </div>

          <div className={grid2Cn}>
            <div className={fieldWideCn}>
              <FieldLabel>Instrument used</FieldLabel>
              <Input
                value={text(formData.testInstrument)}
                onChange={(e) => onUpdate('testInstrument', e.target.value)}
                className={inputCn}
                placeholder="e.g. Megger MFT1741"
              />
            </div>
            <div>
              <FieldLabel>Serial number</FieldLabel>
              <Input
                value={text(formData.testInstrumentSerial)}
                onChange={(e) => onUpdate('testInstrumentSerial', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <FieldLabel>Calibration date</FieldLabel>
              <Input
                type="date"
                value={text(formData.testInstrumentCalDate)}
                onChange={(e) => onUpdate('testInstrumentCalDate', e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
          <p className="text-[12px] leading-snug text-white">
            A reading with no instrument named against it cannot be relied on by
            anyone reading the report later.
          </p>

          <div className="flex items-baseline justify-between gap-3 border-t border-white/[0.1] pt-4">
            <span className="text-[13px] font-semibold text-white">
              {checks.length} reading{checks.length === 1 ? '' : 's'}
            </span>
            <button
              type="button"
              onClick={() => onUpdate('spotChecks', [...checks, getDefaultSpotCheck()])}
              className="flex h-11 items-center gap-1 rounded-xl border border-elec-yellow/50 bg-elec-yellow/10 px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              Add reading
            </button>
          </div>

          {/* Nothing usable recorded — the report will say no testing was done. */}
          {counted === 0 && (
            <p className="text-[12px] leading-snug text-elec-yellow">
              {checks.length === 0
                ? 'No readings recorded yet. Until one is added, this report will state that no verification testing was carried out.'
                : 'None of these readings has both a measurement type and a value, so none will appear on the report — it will state that no verification testing was carried out.'}
            </p>
          )}

          {/* Some usable, some not — name how many are being dropped. */}
          {counted > 0 && incomplete.length > 0 && (
            <p className="text-[12px] leading-snug text-elec-yellow">
              {incomplete.length} of these {checks.length} readings {incomplete.length === 1 ? 'is' : 'are'} missing
              a measurement type or a value, and will not appear on the report.
            </p>
          )}

          {checks.length >= MANY_READINGS && (
            <p className="text-[12px] leading-snug text-elec-yellow">
              That is a lot of readings for a maintenance visit. If you are testing
              circuits properly, a Testing Only certificate or an EICR is the right
              document — both carry a real schedule of test results, and this one
              deliberately does not.
            </p>
          )}

          {checks.map((c, idx) => {
            const kind = kindOf(c.type);
            const unit = spotCheckUnit(c);
            return (
              <div
                key={c.id}
                className={cn(
                  'space-y-3 rounded-xl border p-3',
                  !text(c.type) || !text(c.value).trim()
                    ? 'border-elec-yellow/40 bg-elec-yellow/[0.06]'
                    : 'border-white/[0.14] bg-white/[0.04]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-white">
                    Reading {idx + 1}
                    {(!text(c.type) || !text(c.value).trim()) && (
                      <span className="ml-2 font-medium text-elec-yellow">won’t be included</span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdate(
                        'spotChecks',
                        checks.filter((x) => x.id !== c.id)
                      )
                    }
                    className="h-11 px-2 text-[13px] font-semibold text-red-400 touch-manipulation"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <FieldLabel>What did you measure?</FieldLabel>
                  <SelectField
                    value={text(c.type) as SpotCheckType}
                    onValueChange={(v) => update(c.id, { type: v as SpotCheckType })}
                    placeholder="Select"
                    options={SPOT_CHECK_KINDS.map((k) => ({ value: k.value, label: k.label }))}
                  />
                  {kind?.hint && (
                    <p className="mt-1.5 text-[12px] leading-snug text-white">{kind.hint}</p>
                  )}
                </div>

                {c.type === 'other' && (
                  <div className={grid2Cn}>
                    <div className={fieldWideCn}>
                      <FieldLabel>Name of the reading</FieldLabel>
                      <Input
                        value={text(c.customType)}
                        onChange={(e) => update(c.id, { customType: e.target.value })}
                        className={inputCn}
                        placeholder="e.g. Prospective fault current"
                      />
                    </div>
                    <div>
                      <FieldLabel>Unit</FieldLabel>
                      <Input
                        value={text(c.customUnit)}
                        onChange={(e) => update(c.id, { customUnit: e.target.value })}
                        className={inputCn}
                        placeholder="e.g. kA"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <FieldLabel>Where, or which circuit?</FieldLabel>
                  <Input
                    value={text(c.location)}
                    onChange={(e) => update(c.id, { location: e.target.value })}
                    className={inputCn}
                    placeholder="e.g. Kitchen ring, furthest socket"
                  />
                </div>

                {/*
                  ⚠️ `inputMode="decimal"` brings up the numeric keypad, but the
                  field stays TEXT. A reading is often not a bare number —
                  ">299", "<0.01", "0.42 (L-E)" — and a number input silently
                  discards anything it cannot parse, which on a measurement is
                  data loss the inspector never sees.
                */}
                <div className={grid2Cn}>
                  <div>
                    <FieldLabel>
                      {kind?.hasX5 ? `At ×1${unit ? ` (${unit})` : ''}` : `Reading${unit ? ` (${unit})` : ''}`}
                    </FieldLabel>
                    <Input
                      inputMode="decimal"
                      value={text(c.value)}
                      onChange={(e) => update(c.id, { value: e.target.value })}
                      className={inputCn}
                    />
                  </div>
                  {kind?.hasX5 && (
                    <div>
                      <FieldLabel>At ×5{unit ? ` (${unit})` : ''}</FieldLabel>
                      <Input
                        inputMode="decimal"
                        value={text(c.valueX5)}
                        onChange={(e) => update(c.id, { valueX5: e.target.value })}
                        className={inputCn}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <FieldLabel>Notes, if any</FieldLabel>
                  <Textarea
                    value={text(c.notes)}
                    onChange={(e) => update(c.id, { notes: e.target.value })}
                    className={cn(textareaCn, 'min-h-[44px]')}
                    placeholder="e.g. Measured with the board isolated and the circuit disconnected"
                  />
                </div>
              </div>
            );
          })}
        </>
      )}
    </FormCard>
  );
}
