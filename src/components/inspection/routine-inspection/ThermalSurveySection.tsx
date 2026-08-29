import { AlertTriangle, Info, Plus, Thermometer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FormCard, FieldLabel, SectionHeading, ToggleRow } from '@/components/forms';
import { inputCn, textareaCn, grid2Cn, fieldWideCn } from '@/components/forms/fieldStyles';
import {
  anomalyDeltaT,
  anomalyLoadPercent,
  getDefaultThermalAnomaly,
  prioritiesFor,
  THERMAL_BANDS,
  thermalBandFor,
  THERMAL_PRIORITY_ACTION,
  thermalSurveyWarnings,
  type RoutineInspectionFormData,
  type SurveyMode,
  type ThermalAnomaly,
  type ThermalPriority,
  type ThermalReference,
} from '@/types/routine-inspection';
import PhotoStrip from './PhotoStrip';

/**
 * The thermographic survey — an OPTIONAL bolt-on, gated behind a single toggle.
 *
 * 🔴 Gated on purpose. Most electricians do not own a thermal camera, and a
 * report that demanded emissivity and reflected temperature before it would
 * save would be unusable for the majority of the people this is built for. The
 * routine inspection is the spine; this is an addition to it.
 *
 * ── SOURCE ────────────────────────────────────────────────────────────────
 * Infraspection Institute, *Standard for Infrared Inspection of Electrical
 * Systems & Rotating Equipment*, 2016 Edition — §8 (procedure), §9 (report
 * content), §10.1 (the NETA temperature-rise criteria). Read from the document.
 *
 * Nothing in BS 7671 governs thermography, so no regulation numbers appear here.
 */

interface Props {
  formData: RoutineInspectionFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: keyof RoutineInspectionFormData, value: any) => void;
}

const MODES: { value: SurveyMode; label: string; blurb: string }[] = [
  {
    value: 'qualitative',
    label: 'Qualitative',
    blurb: 'Imager only. Anomalies found by thermal pattern — no calibrated temperatures.',
  },
  {
    value: 'quantitative',
    label: 'Quantitative',
    blurb: 'Radiometer. Measured temperatures, so ΔT criteria and severity ratings apply.',
  },
];

const REFERENCES: { value: ThermalReference; label: string; blurb: string }[] = [
  {
    value: 'similar-component',
    label: 'Similar component',
    blurb: 'Compared against the same part on another phase or way, under similar load. The standard prefers this.',
  },
  {
    value: 'ambient',
    label: 'Ambient air',
    blurb: 'Compared against the air temperature at the equipment.',
  },
];

const PRIORITY_CLS: Record<string, string> = {
  '1': 'bg-red-500 border-red-500 text-white',
  '2': 'bg-orange-500 border-orange-500 text-black',
  '3': 'bg-amber-300 border-amber-300 text-black',
  '4': 'bg-sky-400 border-sky-400 text-black',
};

export default function ThermalSurveySection({ formData, onUpdate }: Props) {
  const warnings = thermalSurveyWarnings(formData);
  const quantitative = formData.surveyMode === 'quantitative';

  const setAnomaly = (id: string, patch: Partial<ThermalAnomaly>) =>
    onUpdate(
      'anomalies',
      formData.anomalies.map((a) => {
        if (a.id !== id) return a;
        const next = { ...a, ...patch };

        /*
         * 🔴 A priority is only meaningful against the reference it was rated
         * from. Priority 2 exists ONLY over ambient — the standard prints a
         * dash in the similar-component column. Switching the reference to
         * similar-component while a 2 is selected would leave a rating the
         * standard does not define sitting on the report, so it is cleared.
         */
        if (patch.reference !== undefined && next.priority) {
          if (!prioritiesFor(next.reference).includes(next.priority as '1')) {
            next.priority = '';
            next.priorityOverridden = false;
          }
        }

        /*
         * Re-suggest from the measurements unless the inspector has overridden
         * it. §10.1.1 is explicit that the priority values "are provided for
         * reference purposes" — so this is a suggestion the inspector owns, not
         * a verdict the app issues.
         */
        const touchedMeasurement =
          patch.measuredTemp !== undefined ||
          patch.referenceTemp !== undefined ||
          patch.reference !== undefined;
        if (touchedMeasurement && !next.priorityOverridden) {
          const band = thermalBandFor(anomalyDeltaT(next), next.reference);
          next.priority = band ? band.priority : '';
        }
        return next;
      })
    );

  /*
   * The ambient temperature was already recorded for the survey, so a finding
   * measured against ambient starts with it filled in. Retyping the same value
   * on every finding is both tedious and a chance to mistype one — and a wrong
   * reference temperature silently shifts the ΔT, and with it the severity.
   *
   * Only pre-set the reference to ambient when there IS an ambient to use;
   * otherwise the reference is left unchosen so the inspector picks it, which
   * is what selects the correct band set.
   */
  const addAnomaly = () => {
    const fresh = getDefaultThermalAnomaly();
    const ambient = String(formData.ambientTemp ?? '').trim();
    if (ambient) {
      fresh.reference = 'ambient';
      fresh.referenceTemp = ambient;
    }
    onUpdate('anomalies', [...(formData.anomalies ?? []), fresh]);
  };

  return (
    <div className="space-y-5">
      <FormCard>
        <SectionHeading title="Thermal imaging survey" />
        <div>
          <FieldLabel>Was a thermal survey carried out on this visit?</FieldLabel>
          <ToggleRow
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
            value={formData.thermalSurveyCarriedOut ? 'yes' : 'no'}
            onChange={(v) => onUpdate('thermalSurveyCarriedOut', v === 'yes')}
          />
        </div>
        {!formData.thermalSurveyCarriedOut && (
          <div className="flex gap-3 rounded-xl border border-white/[0.12] bg-white/[0.04] p-3">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
            <p className="text-[13px] leading-snug text-white">
              Leave this off if you did not survey. The report is complete
              without it — the maintenance inspection stands on its own.
              <br />
              <span className="mt-1 block">
                Thermal images come from a camera attachment such as a FLIR ONE,
                InfiRay or Topdon. Take them in the manufacturer&apos;s app, then
                import them here.
              </span>
            </p>
          </div>
        )}
      </FormCard>

      {formData.thermalSurveyCarriedOut && (
        <>
          {/* ── Survey conditions ─────────────────────────────────────── */}
          <FormCard>
            <SectionHeading title="Survey conditions" />

            <div>
              <FieldLabel>Type of survey</FieldLabel>
              <div className="grid grid-cols-2 gap-2">
                {MODES.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => onUpdate('surveyMode', m.value)}
                    className={cn(
                      'rounded-xl border p-3 text-left transition-colors touch-manipulation active:scale-[0.98]',
                      formData.surveyMode === m.value
                        ? 'border-elec-yellow bg-elec-yellow/[0.12]'
                        : 'border-white/[0.14] bg-white/[0.05]'
                    )}
                  >
                    <span className="block text-[14px] font-semibold text-white">{m.label}</span>
                    <span className="mt-1 block text-[11px] leading-snug text-white">
                      {m.blurb}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/*
              §8.1 — "Equipment to be inspected shall be energized and under
              adequate load; ideally this is normal operating load."

              This is the single most important field in the section and the
              easiest to leave blank. A clean thermal image of an unloaded board
              proves nothing at all, and a client reading "no anomalies found"
              has no way to know that unless the load is stated.
            */}
            <div className={grid2Cn}>
              <div className={fieldWideCn}>
                <FieldLabel>Load at the time of survey</FieldLabel>
                <Input
                  value={formData.loadAtSurvey}
                  onChange={(e) => onUpdate('loadAtSurvey', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Normal operating load, 62 A per phase"
                />
              </div>
              <div>
                <FieldLabel>Ambient air temperature (°C)</FieldLabel>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={formData.ambientTemp}
                  onChange={(e) => onUpdate('ambientTemp', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. 21"
                />
              </div>
              <div>
                <FieldLabel>Camera or imager used</FieldLabel>
                <Input
                  value={formData.thermalCamera}
                  onChange={(e) => onUpdate('thermalCamera', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. FLIR ONE Edge Pro"
                />
              </div>
              <div className={fieldWideCn}>
                <FieldLabel>Thermographer qualification</FieldLabel>
                <Input
                  value={formData.thermographerQualification}
                  onChange={(e) => onUpdate('thermographerQualification', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. BINDT Category 1 Thermography"
                />
              </div>
            </div>

            <div>
              <FieldLabel>Environmental conditions</FieldLabel>
              <Textarea
                value={formData.environmentalConditions}
                onChange={(e) => onUpdate('environmentalConditions', e.target.value)}
                className={cn(textareaCn, 'min-h-[64px]')}
                placeholder="Where significant — wind, direct sun, recent switching, plant room ventilation."
              />
            </div>
          </FormCard>

          {/* ── Warnings ──────────────────────────────────────────────── */}
          {warnings.length > 0 && (
            <div className="-mx-4 border-y border-orange-500/30 bg-orange-500/10 p-4 sm:mx-0 sm:rounded-2xl sm:border-x">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-300" />
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-orange-300">
                    The survey record is incomplete
                  </p>
                  <ul className="mt-2 space-y-2">
                    {warnings.map((w) => (
                      <li key={w} className="text-[13px] leading-snug text-white">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ── Findings ──────────────────────────────────────────────── */}
          <FormCard className="space-y-4">
            <div className="flex items-baseline justify-between gap-3">
              <SectionHeading title="Findings" className="mb-0" />
              <button
                type="button"
                onClick={addAnomaly}
                className="flex h-11 items-center gap-1 rounded-xl border border-elec-yellow/50 bg-elec-yellow/10 px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>

            {formData.anomalies.length === 0 && (
              <p className="text-[13px] leading-snug text-white">
                No findings recorded. If the survey found nothing, leave this
                empty — the report will say the survey was carried out and
                nothing was found, together with the load it was carried out under.
              </p>
            )}

            {formData.anomalies.map((a, idx) => {
              const deltaT = anomalyDeltaT(a);
              const band = thermalBandFor(deltaT, a.reference);
              const loadPct = anomalyLoadPercent(a);
              const available = prioritiesFor(a.reference);

              return (
                <div
                  key={a.id}
                  className="space-y-3 rounded-xl border border-white/[0.14] bg-white/[0.04] p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[12px] font-semibold text-white">
                      <Thermometer className="h-3.5 w-3.5" />
                      Finding {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdate(
                          'anomalies',
                          formData.anomalies.filter((x) => x.id !== a.id)
                        )
                      }
                      className="h-11 px-2 text-[13px] font-semibold text-red-400 touch-manipulation"
                    >
                      Remove
                    </button>
                  </div>

                  <div className={grid2Cn}>
                    <div>
                      <FieldLabel>Location</FieldLabel>
                      <Input
                        value={a.location}
                        onChange={(e) => setAnomaly(a.id, { location: e.target.value })}
                        className={inputCn}
                        placeholder="e.g. Plant room, DB3"
                      />
                    </div>
                    <div className={fieldWideCn}>
                      <FieldLabel>Equipment, phase or way</FieldLabel>
                      <Input
                        value={a.equipment}
                        onChange={(e) => setAnomaly(a.id, { equipment: e.target.value })}
                        className={inputCn}
                        placeholder="e.g. L2 outgoing terminal, way 8, 32 A"
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel>What was found</FieldLabel>
                    <Textarea
                      value={a.description}
                      onChange={(e) => setAnomaly(a.id, { description: e.target.value })}
                      className={cn(textareaCn, 'min-h-[64px]')}
                      placeholder="e.g. Hot spot at the outgoing terminal, other two phases cool"
                    />
                  </div>

                  {/* ── Measurement, quantitative only ─────────────── */}
                  {quantitative && (
                    <div className="space-y-3 rounded-xl border border-white/[0.1] bg-black/20 p-3">
                      <div>
                        <FieldLabel>Temperature rise measured against</FieldLabel>
                        <div className="grid grid-cols-2 gap-2">
                          {REFERENCES.map((r) => (
                            <button
                              key={r.value}
                              type="button"
                              onClick={() => {
                                /* Ambient is already recorded for the site. */
                                const patch: Partial<ThermalAnomaly> = { reference: r.value };
                                if (r.value === 'ambient' && !a.referenceTemp && formData.ambientTemp) {
                                  patch.referenceTemp = formData.ambientTemp;
                                }
                                setAnomaly(a.id, patch);
                              }}
                              className={cn(
                                'rounded-xl border p-2.5 text-left transition-colors touch-manipulation active:scale-[0.98]',
                                a.reference === r.value
                                  ? 'border-elec-yellow bg-elec-yellow/[0.12]'
                                  : 'border-white/[0.14] bg-white/[0.05]'
                              )}
                            >
                              <span className="block text-[13px] font-semibold text-white">
                                {r.label}
                              </span>
                              <span className="mt-0.5 block text-[10px] leading-snug text-white">
                                {r.blurb}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className={grid2Cn}>
                        <div>
                          <FieldLabel>Measured temperature (°C)</FieldLabel>
                          <Input
                            type="number"
                            inputMode="decimal"
                            value={a.measuredTemp}
                            onChange={(e) => setAnomaly(a.id, { measuredTemp: e.target.value })}
                            className={inputCn}
                          />
                        </div>
                        <div>
                          <FieldLabel>
                            {a.reference === 'ambient'
                              ? 'Ambient temperature (°C)'
                              : 'Reference temperature (°C)'}
                          </FieldLabel>
                          <Input
                            type="number"
                            inputMode="decimal"
                            value={a.referenceTemp}
                            onChange={(e) => setAnomaly(a.id, { referenceTemp: e.target.value })}
                            className={inputCn}
                          />
                        </div>
                      </div>

                      {/* The computed rise, and what the standard makes of it. */}
                      {deltaT !== null && (
                        <div className="rounded-xl border border-white/[0.12] bg-white/[0.05] p-3">
                          <p className="text-[13px] font-semibold text-white">
                            Temperature rise {deltaT > 0 ? '+' : ''}
                            {deltaT} °C
                            {a.reference === 'ambient'
                              ? ' over ambient'
                              : a.reference === 'similar-component'
                                ? ' over a similar component'
                                : ''}
                          </p>
                          {!a.reference ? (
                            <p className="mt-1 text-[12px] leading-snug text-white">
                              Choose what it was measured against — the severity
                              bands are different for each, and a rise on its own
                              cannot be rated.
                            </p>
                          ) : band ? (
                            <p className="mt-1 text-[12px] leading-snug text-white">
                              Suggests <span className="font-semibold">Priority {band.priority}</span>{' '}
                              ({band.range}) — {band.action.toLowerCase()}.
                            </p>
                          ) : (
                            <p className="mt-1 text-[12px] leading-snug text-white">
                              Below the lowest band. The criteria start at a 1 °C
                              rise; anything less is within instrument noise.
                            </p>
                          )}
                        </div>
                      )}

                      {/* §9.3.3 and §9.3.2 — the values that make it checkable. */}
                      <div className={grid2Cn}>
                        <div>
                          <FieldLabel>Emissivity used</FieldLabel>
                          <Input
                            type="number"
                            inputMode="decimal"
                            step="0.01"
                            value={a.emissivity}
                            onChange={(e) => setAnomaly(a.id, { emissivity: e.target.value })}
                            className={inputCn}
                            placeholder="e.g. 0.95"
                          />
                        </div>
                        <div>
                          <FieldLabel>Reflected temperature (°C)</FieldLabel>
                          <Input
                            type="number"
                            inputMode="decimal"
                            value={a.reflectedTemp}
                            onChange={(e) => setAnomaly(a.id, { reflectedTemp: e.target.value })}
                            className={inputCn}
                          />
                        </div>
                        <div>
                          <FieldLabel>Measured load (A)</FieldLabel>
                          <Input
                            type="number"
                            inputMode="decimal"
                            value={a.measuredLoad}
                            onChange={(e) => setAnomaly(a.id, { measuredLoad: e.target.value })}
                            className={inputCn}
                          />
                        </div>
                        <div>
                          <FieldLabel>Rated load (A)</FieldLabel>
                          <Input
                            type="number"
                            inputMode="decimal"
                            value={a.ratedLoad}
                            onChange={(e) => setAnomaly(a.id, { ratedLoad: e.target.value })}
                            className={inputCn}
                          />
                        </div>
                      </div>
                      {loadPct !== null && (
                        <p className="text-[12px] leading-snug text-white">
                          {loadPct}% of rated load at the time of the reading.
                          {loadPct < 40 && (
                            <span className="font-semibold text-orange-300">
                              {' '}
                              A rise measured well below full load understates the
                              fault — say so in the action.
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  )}

                  {/* ── Severity ────────────────────────────────────── */}
                  <div>
                    <FieldLabel>
                      Severity
                      {a.priorityOverridden && (
                        <span className="ml-1 font-normal text-elec-yellow">
                          — set by you
                        </span>
                      )}
                    </FieldLabel>
                    <div className="flex flex-wrap gap-1.5">
                      {available.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => {
                            const suggested = band?.priority ?? '';
                            setAnomaly(a.id, {
                              priority: p as ThermalPriority,
                              priorityOverridden: p !== suggested,
                            });
                          }}
                          aria-label={`Priority ${p} — ${THERMAL_PRIORITY_ACTION[p]}`}
                          className={cn(
                            'h-14 min-w-[64px] flex-1 rounded-xl border px-2 text-[12px] font-semibold transition-colors touch-manipulation active:scale-[0.97]',
                            a.priority === p
                              ? PRIORITY_CLS[p]
                              : 'border-white/[0.14] bg-white/[0.05] text-white'
                          )}
                        >
                          <span className="block text-[13px] font-bold leading-none">P{p}</span>
                          <span className="mt-0.5 block text-[9px] font-medium leading-tight opacity-90">
                            {p === '1'
                              ? 'Immediate'
                              : p === '2'
                                ? 'Monitor'
                                : p === '3'
                                  ? 'Repair'
                                  : 'Investigate'}
                          </span>
                        </button>
                      ))}
                    </div>
                    {a.reference === 'similar-component' && (
                      <p className="mt-1.5 text-[11px] leading-snug text-white">
                        There is no Priority 2 against a similar component — the
                        criteria define that band only against ambient air.
                      </p>
                    )}
                    {a.priority && (
                      <p className="mt-1.5 text-[12px] leading-snug text-white">
                        {THERMAL_PRIORITY_ACTION[a.priority as '1']}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel>Action taken or recommended</FieldLabel>
                    <Textarea
                      value={a.action}
                      onChange={(e) => setAnomaly(a.id, { action: e.target.value })}
                      className={cn(textareaCn, 'min-h-[64px]')}
                      placeholder="e.g. Terminal re-made and re-torqued to 2.5 Nm, re-imaged, rise gone"
                    />
                  </div>

                  {/*
                    §8.7 / §9.2.4 — the thermogram AND the visible-light image.
                    A thermal image alone tells a client something was hot; the
                    pair tells them what it was.
                  */}
                  {/*
                    Stacked on a phone, paired from sm:. Two of these side by
                    side at half a phone width wraps "Import thermal image" onto
                    three lines inside a 44px button.
                  */}
                  <div className={grid2Cn}>
                    <PhotoStrip
                      photos={a.thermalPhotos ?? []}
                      onChange={(thermalPhotos) => setAnomaly(a.id, { thermalPhotos })}
                      /* 🔴 library, not camera — see PhotoStrip's header. */
                      source="library"
                      label="Import thermal image"
                      altPrefix={`Finding ${idx + 1} thermal image`}
                      className={fieldWideCn}
                    />
                    <PhotoStrip
                      photos={a.visiblePhotos ?? []}
                      onChange={(visiblePhotos) => setAnomaly(a.id, { visiblePhotos })}
                      source="camera"
                      label="Add photo of the equipment"
                      altPrefix={`Finding ${idx + 1} photo`}
                      className={fieldWideCn}
                    />
                  </div>
                </div>
              );
            })}
          </FormCard>

          {/* ── The criteria, on screen ───────────────────────────────── */}
          <FormCard>
            <SectionHeading title="Severity criteria" />
            <p className="text-[12px] leading-snug text-white">
              Temperature-rise criteria from the NETA Maintenance Testing
              Specifications. They are guidance for prioritising remedial work,
              not a statement of compliance with any standard.
            </p>
            <div className="space-y-3">
              {(['similar-component', 'ambient'] as const).map((ref) => (
                <div key={ref}>
                  <p className="mb-1.5 text-[12px] font-semibold text-white">
                    {ref === 'ambient'
                      ? 'Rise over ambient air temperature'
                      : 'Rise over a similar component under similar load'}
                  </p>
                  <div className="space-y-1">
                    {THERMAL_BANDS[ref].map((b) => (
                      <div
                        key={b.priority}
                        className="flex items-start gap-2 rounded-lg border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5"
                      >
                        <span
                          className={cn(
                            'mt-0.5 flex h-5 w-7 flex-shrink-0 items-center justify-center rounded text-[10px] font-bold',
                            PRIORITY_CLS[b.priority]
                          )}
                        >
                          P{b.priority}
                        </span>
                        <span className="min-w-0 text-[12px] leading-snug text-white">
                          <span className="font-semibold">{b.range}</span> — {b.action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FormCard>
        </>
      )}
    </div>
  );
}
