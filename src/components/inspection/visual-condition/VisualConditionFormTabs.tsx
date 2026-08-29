import { AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FormCard, FieldLabel, SectionHeading, ToggleRow } from '@/components/forms';
import { inputCn, textareaCn, checkLineCn, grid2Cn } from '@/components/forms/fieldStyles';
import SignaturePad from '@/components/forms/SignaturePad';
import VisualInspectionSchedule from './VisualInspectionSchedule';
import {
  deriveVisualAssessment,
  isOutsideVisualScope,
  VISUAL_CONDITION_LIMITATIONS,
  type VisualConditionFormData,
} from '@/types/visual-condition';
import type { VisualConditionTabValue } from '@/hooks/useVisualConditionTabs';

interface Props {
  currentTab: VisualConditionTabValue;
  formData: VisualConditionFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: keyof VisualConditionFormData, value: any) => void;
}

/**
 * ⚠️ Rendered on BOTH the Supply step and the Declaration step.
 *
 * It first appeared only on Supply, which a user can skip entirely: Client →
 * Inspect → Sign off → Generate never passes through it. That meant a visual
 * condition report could be issued for a three-phase 400 A industrial
 * installation without the warning ever being shown — exactly the case the
 * guard exists for. It now also sits on the last step, which everybody visits
 * before signing, at no extra taps.
 *
 * Still a warning, never a block: the electrician standing at the board is
 * better placed to judge than a rule in a form.
 */
const ScopeWarning = ({ message }: { message: string }) => (
  <div className="-mx-4 border-y border-orange-500/30 bg-orange-500/10 p-4 sm:mx-0 sm:rounded-2xl sm:border-x">
    <div className="flex gap-3">
      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-300" />
      <div>
        <p className="text-[14px] font-semibold text-orange-300">
          Check this is the right document
        </p>
        <p className="mt-1 text-[13px] leading-snug text-white">{message}</p>
      </div>
    </div>
  </div>
);

export default function VisualConditionFormTabs({ currentTab, formData, onUpdate }: Props) {
  /* ── Client and site ────────────────────────────────────────────────── */
  if (currentTab === 'client') {
    return (
      <div className="space-y-5">
        <FormCard>
          <SectionHeading title="Client" />
          <div className={grid2Cn}>
            <div>
              <FieldLabel>Client name</FieldLabel>
              <Input
                value={formData.clientName}
                onChange={(e) => onUpdate('clientName', e.target.value)}
                className={inputCn}
                placeholder="e.g. Mrs J Hartley"
              />
            </div>
            <div>
              <FieldLabel>Phone</FieldLabel>
              <Input
                type="tel"
                inputMode="tel"
                value={formData.clientPhone}
                onChange={(e) => onUpdate('clientPhone', e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
          <div>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect="off"
              value={formData.clientEmail}
              onChange={(e) => onUpdate('clientEmail', e.target.value)}
              className={inputCn}
              placeholder="Used to send the report"
            />
          </div>
          <div>
            <FieldLabel>Client address</FieldLabel>
            <Textarea
              value={formData.clientAddress}
              onChange={(e) => {
                onUpdate('clientAddress', e.target.value);
                /*
                 * Keep the two in step as you TYPE, not only on toggle.
                 * Copying once meant a corrected typo never reached the
                 * document — the same defect that was fixed on the EICR
                 * and EIC in 2.2.
                 */
                if (formData.sameAsClientAddress) onUpdate('installationAddress', e.target.value);
              }}
              className={cn(textareaCn, 'min-h-[72px]')}
            />
          </div>
        </FormCard>

        <FormCard>
          <SectionHeading title="Installation" />
          <button
            type="button"
            onClick={() => {
              const next = !formData.sameAsClientAddress;
              onUpdate('sameAsClientAddress', next);
              if (next) onUpdate('installationAddress', formData.clientAddress);
            }}
            className={cn(checkLineCn, 'w-full justify-start')}
          >
            <span
              className={cn(
                'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border',
                formData.sameAsClientAddress
                  ? 'border-elec-yellow bg-elec-yellow text-black'
                  : 'border-white/[0.3]'
              )}
            >
              {formData.sameAsClientAddress ? '✓' : ''}
            </span>
            <span className="text-[14px] text-white">Same as client address</span>
          </button>

          {!formData.sameAsClientAddress && (
            <div>
              <FieldLabel>Installation address</FieldLabel>
              <Textarea
                value={formData.installationAddress}
                onChange={(e) => onUpdate('installationAddress', e.target.value)}
                className={cn(textareaCn, 'min-h-[72px]')}
              />
            </div>
          )}

          <div className={grid2Cn}>
            <div>
              <FieldLabel>Occupier, if different</FieldLabel>
              <Input
                value={formData.occupier}
                onChange={(e) => onUpdate('occupier', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <FieldLabel>Date of inspection</FieldLabel>
              <Input
                type="date"
                value={formData.inspectionDate}
                onChange={(e) => onUpdate('inspectionDate', e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
        </FormCard>
      </div>
    );
  }

  /* ── Purpose and extent ─────────────────────────────────────────────── */
  if (currentTab === 'scope') {
    return (
      <div className="space-y-5">
        <FormCard>
          <SectionHeading title="Purpose of the report" />
          <Textarea
            value={formData.purpose}
            onChange={(e) => onUpdate('purpose', e.target.value)}
            className={cn(textareaCn, 'min-h-[72px]')}
            placeholder="Why was the report requested? e.g. Landlord's periodic visual check between full inspections"
          />
        </FormCard>

        <FormCard>
          <SectionHeading title="Extent covered" />
          <Textarea
            value={formData.extent}
            onChange={(e) => onUpdate('extent', e.target.value)}
            className={cn(textareaCn, 'min-h-[72px]')}
            placeholder="What was inspected? e.g. All accessible accessories and the consumer unit throughout the ground floor"
          />
        </FormCard>

        <FormCard>
          <SectionHeading title="Limitations" />
          <p className="text-[13px] leading-snug text-white">
            Anything agreed as excluded, or that you could not reach. Items you
            mark as <span className="font-semibold">Not seen</span> during the
            inspection are added to the report alongside this.
          </p>
          <Textarea
            value={formData.limitations}
            onChange={(e) => onUpdate('limitations', e.target.value)}
            className={cn(textareaCn, 'min-h-[72px]')}
            placeholder="e.g. Loft not accessible on the day. Rear bedroom occupied and not entered."
          />
        </FormCard>

        {/*
          🔴 Printed on the report and not editable. Without it, a landlord or a
          buyer could read this as an EICR — neither is obliged to know the
          difference between the two documents.
        */}
        <FormCard>
          <SectionHeading title="Printed on the report" />
          <p className="text-[13px] leading-relaxed text-white">
            {VISUAL_CONDITION_LIMITATIONS}
          </p>
        </FormCard>
      </div>
    );
  }

  /* ── Supply and board ───────────────────────────────────────────────── */
  if (currentTab === 'installation') {
    const scopeWarning = isOutsideVisualScope(formData);
    return (
      <div className="space-y-5">
        {/*
          A warning, never a block. The electrician standing in front of the
          board is better placed to judge than a rule in a form — but they
          should not find out afterwards that the wrong document was issued.
        */}
        {scopeWarning && <ScopeWarning message={scopeWarning} />}

        <FormCard>
          <SectionHeading title="Supply" />
          <div>
            <FieldLabel>Supply</FieldLabel>
            <ToggleRow
              options={[
                { label: 'Single phase', value: 'single-phase' },
                { label: 'Three phase', value: 'three-phase' },
              ]}
              value={formData.supplyType}
              onChange={(v) => onUpdate('supplyType', v)}
            />
          </div>
          <div>
            <FieldLabel>Premises</FieldLabel>
            <ToggleRow
              options={[
                { label: 'Domestic', value: 'domestic' },
                { label: 'Commercial', value: 'commercial' },
                { label: 'Industrial', value: 'industrial' },
              ]}
              value={formData.premisesType}
              onChange={(v) => onUpdate('premisesType', v)}
            />
          </div>
          <div className={grid2Cn}>
            <div>
              <FieldLabel>Main switch rating</FieldLabel>
              <Input
                value={formData.mainSwitchRating}
                onChange={(e) => onUpdate('mainSwitchRating', e.target.value)}
                className={inputCn}
                placeholder="e.g. 100 A"
                inputMode="numeric"
              />
            </div>
            <div>
              <FieldLabel>Earthing arrangement, as seen</FieldLabel>
              <Input
                value={formData.earthingArrangement}
                onChange={(e) => onUpdate('earthingArrangement', e.target.value)}
                className={inputCn}
                placeholder="e.g. TN-C-S (PME)"
              />
            </div>
          </div>
          {/*
            No Ze, Ipf or Zs anywhere on this form. Those are measurements, and
            this report does not involve testing. Adding them "for completeness"
            would be the single fastest way to turn it into a fake EICR.
          */}
          <p className="text-[12px] leading-snug text-white">
            Recorded as observed. No measurements are taken for this report.
          </p>
        </FormCard>

        <FormCard>
          <SectionHeading title="Consumer unit or board" />
          <div className={grid2Cn}>
            <div>
              <FieldLabel>Location</FieldLabel>
              <Input
                value={formData.boardLocation}
                onChange={(e) => onUpdate('boardLocation', e.target.value)}
                className={inputCn}
                placeholder="e.g. Hallway cupboard"
              />
            </div>
            <div>
              <FieldLabel>Make and type</FieldLabel>
              <Input
                value={formData.boardMake}
                onChange={(e) => onUpdate('boardMake', e.target.value)}
                className={inputCn}
                placeholder="e.g. Hager, metal-clad"
              />
            </div>
            <div>
              <FieldLabel>Number of ways</FieldLabel>
              <Input
                value={formData.numberOfWays}
                onChange={(e) => onUpdate('numberOfWays', e.target.value)}
                className={inputCn}
                inputMode="numeric"
              />
            </div>
            <div>
              <FieldLabel>RCD protection, as seen</FieldLabel>
              <Input
                value={formData.rcdProtection}
                onChange={(e) => onUpdate('rcdProtection', e.target.value)}
                className={inputCn}
                placeholder="e.g. RCBO on every circuit"
              />
            </div>
          </div>
        </FormCard>
      </div>
    );
  }

  /* ── Visual inspection ──────────────────────────────────────────────── */
  if (currentTab === 'inspection') {
    return (
      <VisualInspectionSchedule
        items={formData.inspectionItems}
        observations={formData.observations}
        onItemsChange={(items) => onUpdate('inspectionItems', items)}
        onObservationsChange={(obs) => {
          onUpdate('observations', obs);
          // Derived, never typed — and it must see the SCHEDULE as well as the
          // observations, or an all-FI report reads Satisfactory.
          onUpdate('overallAssessment', deriveVisualAssessment(obs, formData.inspectionItems));
        }}
      />
    );
  }

  /* ── Declaration ────────────────────────────────────────────────────── */
  const assessment = deriveVisualAssessment(formData.observations, formData.inspectionItems);
  /*
   * FI counts items as well as observations. It read 0 on a report whose
   * schedule showed three "Further investigation" rows — the badge and the
   * table on the same document disagreed.
   */
  const counts = (['C1', 'C2', 'C3', 'FI'] as const).map((c) => ({
    code: c,
    n:
      formData.observations.filter((o) => o.code === c).length +
      (c === 'FI'
        ? formData.inspectionItems.filter((i) => i.outcome === 'further-investigation').length
        : 0),
  }));

  const declarationScopeWarning = isOutsideVisualScope(formData);

  return (
    <div className="space-y-5">
      {declarationScopeWarning && <ScopeWarning message={declarationScopeWarning} />}

      <FormCard>
        <SectionHeading title="Outcome" />
        <div
          className={cn(
            'rounded-xl border p-4',
            assessment === 'satisfactory'
              ? 'border-emerald-500/40 bg-emerald-500/10'
              : 'border-red-500/40 bg-red-500/10'
          )}
        >
          <p
            className={cn(
              'text-[17px] font-bold',
              assessment === 'satisfactory' ? 'text-emerald-300' : 'text-red-300'
            )}
          >
            {assessment === 'satisfactory' ? 'Satisfactory' : 'Unsatisfactory'}
          </p>
          <p className="mt-1 text-[13px] leading-snug text-white">
            {assessment === 'satisfactory'
              ? 'No defect was visible. This is not a confirmation that the installation is safe — no testing was carried out.'
              : 'Any C1, C2 or FI makes the report unsatisfactory. FI counts because it means the point could not be determined.'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {counts.map((c) => (
              <span
                key={c.code}
                className="rounded-lg border border-white/[0.16] bg-white/[0.06] px-2.5 py-1 text-[12px] font-semibold text-white"
              >
                {c.code} {c.n}
              </span>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel>General condition of the installation</FieldLabel>
          <Textarea
            value={formData.generalCondition}
            onChange={(e) => onUpdate('generalCondition', e.target.value)}
            className={cn(textareaCn, 'min-h-[72px]')}
            placeholder="A short summary for the client, in plain English"
          />
        </div>
        <div>
          <FieldLabel>Recommended date for inspection and testing</FieldLabel>
          <Input
            type="date"
            value={formData.nextInspectionDate}
            onChange={(e) => onUpdate('nextInspectionDate', e.target.value)}
            className={inputCn}
          />
          <p className="mt-1 text-[12px] leading-snug text-white">
            A visual report does not reset an inspection interval. This is when a
            full inspection and test is recommended.
          </p>
        </div>
      </FormCard>

      <FormCard>
        <SectionHeading title="Inspected by" />
        <div className={grid2Cn}>
          <div>
            <FieldLabel>Name</FieldLabel>
            <Input
              value={formData.inspectorName}
              onChange={(e) => onUpdate('inspectorName', e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <FieldLabel>Position</FieldLabel>
            <Input
              value={formData.inspectorPosition}
              onChange={(e) => onUpdate('inspectorPosition', e.target.value)}
              className={inputCn}
              placeholder="e.g. Qualified Supervisor"
            />
          </div>
          <div>
            <FieldLabel>For and on behalf of</FieldLabel>
            <Input
              value={formData.companyName}
              onChange={(e) => onUpdate('companyName', e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <FieldLabel>Date</FieldLabel>
            <Input
              type="date"
              value={formData.inspectorDate}
              onChange={(e) => onUpdate('inspectorDate', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
        <div>
          <FieldLabel>Signature</FieldLabel>
          <SignaturePad
            onSignatureChange={(v) => onUpdate('inspectorSignature', v)}
          />
          {formData.inspectorSignature && (
            <p className="mt-1 text-[12px] text-white">Signature captured</p>
          )}
        </div>
      </FormCard>
    </div>
  );
}
