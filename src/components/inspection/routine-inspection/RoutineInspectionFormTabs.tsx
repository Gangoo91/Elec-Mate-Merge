import { Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FormCard, FieldLabel, SectionHeading, ToggleRow, SelectField } from '@/components/forms';
import { inputCn, textareaCn, grid2Cn, fieldWideCn } from '@/components/forms/fieldStyles';
import SignaturePad from '@/components/forms/SignaturePad';
import RoutineInspectionSchedule from './RoutineInspectionSchedule';
import ThermalSurveySection from './ThermalSurveySection';
import {
  deriveRoutineAssessment,
  effectiveAnomalies,
  ROUTINE_ASSESSMENT_LABEL,
  ROUTINE_INSPECTION_LIMITATIONS,
  THERMAL_SURVEY_LIMITATIONS,
  type RoutineInspectionFormData,
} from '@/types/routine-inspection';
import type { RoutineInspectionTabValue } from '@/hooks/useRoutineInspectionTabs';

interface Props {
  currentTab: RoutineInspectionTabValue;
  formData: RoutineInspectionFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: keyof RoutineInspectionFormData, value: any) => void;
}

const ASSESSMENT_CLS: Record<string, string> = {
  satisfactory: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  'requires-attention': 'border-amber-400/40 bg-amber-400/10 text-amber-300',
  unsatisfactory: 'border-red-500/40 bg-red-500/10 text-red-300',
};

export default function RoutineInspectionFormTabs({ currentTab, formData, onUpdate }: Props) {
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
                placeholder="e.g. Northgate Property Services"
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
            <div>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                inputMode="email"
                value={formData.clientEmail}
                onChange={(e) => onUpdate('clientEmail', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <FieldLabel>Occupier, if different</FieldLabel>
              <Input
                value={formData.occupier}
                onChange={(e) => onUpdate('occupier', e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
          <div>
            <FieldLabel>Client address</FieldLabel>
            <Textarea
              value={formData.clientAddress}
              onChange={(e) => onUpdate('clientAddress', e.target.value)}
              className={cn(textareaCn, 'min-h-[64px]')}
            />
          </div>
        </FormCard>

        <FormCard>
          <SectionHeading title="Installation" />
          <div>
            <FieldLabel>Installation address</FieldLabel>
            <Textarea
              value={formData.installationAddress}
              onChange={(e) => onUpdate('installationAddress', e.target.value)}
              className={cn(textareaCn, 'min-h-[64px]')}
            />
          </div>
          <div className={grid2Cn}>
            <div>
              <FieldLabel>Type of premises</FieldLabel>
              <SelectField
                value={formData.premisesType}
                onValueChange={(v) => onUpdate('premisesType', v)}
                placeholder="Select"
                options={[
                  { value: 'domestic', label: 'Domestic' },
                  { value: 'commercial', label: 'Commercial' },
                  { value: 'industrial', label: 'Industrial' },
                  { value: 'other', label: 'Other' },
                ]}
              />
            </div>
            <div className={fieldWideCn}>
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
          </div>
          <div>
            <FieldLabel>Boards and switchgear covered</FieldLabel>
            <Textarea
              value={formData.boardsCovered}
              onChange={(e) => onUpdate('boardsCovered', e.target.value)}
              className={cn(textareaCn, 'min-h-[64px]')}
              placeholder="e.g. Main LV panel, DB1 (ground), DB2 (first floor), plant room DB3"
            />
          </div>
          <div className="sm:max-w-[220px]">
            <FieldLabel>Date of visit</FieldLabel>
            <Input
              type="date"
              value={formData.inspectionDate}
              onChange={(e) => onUpdate('inspectionDate', e.target.value)}
              className={inputCn}
            />
          </div>
        </FormCard>
      </div>
    );
  }

  /* ── The visit ──────────────────────────────────────────────────────── */
  if (currentTab === 'visit') {
    return (
      <div className="space-y-5">
        {/*
          The legal frame, stated once where the electrician is deciding what
          the visit covered. It is the reason the document is worth issuing.
        */}
        <div className="-mx-4 border-y border-white/[0.12] bg-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x">
          <div className="flex gap-3">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
            <p className="text-[13px] leading-snug text-white">
              A maintenance visit record supports the duty under Regulation 4(2)
              of the Electricity at Work Regulations 1989 to maintain systems so
              as to prevent danger. It is not an EICR and does not replace one.
            </p>
          </div>
        </div>

        <FormCard>
          <SectionHeading title="Purpose and extent" />
          <div>
            <FieldLabel>Purpose of the visit</FieldLabel>
            <Textarea
              value={formData.purpose}
              onChange={(e) => onUpdate('purpose', e.target.value)}
              className={cn(textareaCn, 'min-h-[64px]')}
              placeholder="e.g. Annual planned maintenance under service contract"
            />
          </div>
          <div>
            <FieldLabel>Extent — what was covered</FieldLabel>
            <Textarea
              value={formData.extent}
              onChange={(e) => onUpdate('extent', e.target.value)}
              className={cn(textareaCn, 'min-h-[80px]')}
              placeholder="e.g. Main panel and DB1–DB3: enclosures opened, connections checked, thermal sweep under load"
            />
          </div>
          <div>
            <FieldLabel>Limitations — what was not covered, and why</FieldLabel>
            <Textarea
              value={formData.limitations}
              onChange={(e) => onUpdate('limitations', e.target.value)}
              className={cn(textareaCn, 'min-h-[80px]')}
              placeholder="e.g. DB4 serves a live production line and could not be shut down or opened"
            />
            <p className="mt-1.5 text-[12px] leading-snug text-white">
              The standard limitations for a maintenance visit are printed on
              every report automatically. This is for anything specific to the day.
            </p>
          </div>
        </FormCard>

        {/*
          Torque lives with the visit rather than the schedule: it describes HOW
          the connections were checked, and a torque figure with no instrument
          named cannot be relied on by anyone reading the report later.
        */}
        <FormCard>
          <SectionHeading title="Connection tightness" />
          <div>
            <FieldLabel>Were terminations checked with a torque instrument?</FieldLabel>
            <ToggleRow
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
              value={formData.torqueChecked ? 'yes' : 'no'}
              onChange={(v) => onUpdate('torqueChecked', v === 'yes')}
            />
          </div>
          {formData.torqueChecked && (
            <div className={grid2Cn}>
              <div className={fieldWideCn}>
                <FieldLabel>Instrument used</FieldLabel>
                <Input
                  value={formData.torqueInstrument}
                  onChange={(e) => onUpdate('torqueInstrument', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Wera Kraftform 1.2–3.0 Nm"
                />
              </div>
              <div className={fieldWideCn}>
                <FieldLabel>Settings applied</FieldLabel>
                <Input
                  value={formData.torqueSettings}
                  onChange={(e) => onUpdate('torqueSettings', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. 2.5 Nm to manufacturer's data"
                />
              </div>
            </div>
          )}
        </FormCard>
      </div>
    );
  }

  /* ── Maintenance inspection ─────────────────────────────────────────── */
  if (currentTab === 'inspection') {
    return (
      <RoutineInspectionSchedule
        items={formData.inspectionItems}
        observations={formData.observations}
        onItemsChange={(items) => onUpdate('inspectionItems', items)}
        onObservationsChange={(obs) => onUpdate('observations', obs)}
      />
    );
  }

  /* ── Thermal survey ─────────────────────────────────────────────────── */
  if (currentTab === 'thermal') {
    return <ThermalSurveySection formData={formData} onUpdate={onUpdate} />;
  }

  /* ── Summary and declaration ────────────────────────────────────────── */
  const assessment = deriveRoutineAssessment(
    formData.inspectionItems,
    formData.observations,
    effectiveAnomalies(formData)
  );

  return (
    <div className="space-y-5">
      <FormCard>
        <SectionHeading title="Outcome" />
        <div
          className={cn(
            'rounded-xl border p-4 text-center',
            ASSESSMENT_CLS[assessment]
          )}
        >
          <p className="text-[18px] font-bold tracking-tight">
            {ROUTINE_ASSESSMENT_LABEL[assessment]}
          </p>
          <p className="mt-1 text-[12px] leading-snug text-white">
            {assessment === 'unsatisfactory'
              ? 'A C1, a C2 or a Priority 1 thermal finding was recorded — action is needed now.'
              : assessment === 'requires-attention'
                ? 'Defects or thermal findings were recorded that need attention, but nothing requiring immediate action.'
                : 'No defects or thermal findings were recorded on this visit.'}
          </p>
        </div>
        <p className="text-[12px] leading-snug text-white">
          Derived from the schedule, the observations and the thermal findings
          together. It cannot be typed over — change the findings and this follows.
        </p>

        <div>
          <FieldLabel>General condition of the installation</FieldLabel>
          <Textarea
            value={formData.generalCondition}
            onChange={(e) => onUpdate('generalCondition', e.target.value)}
            className={cn(textareaCn, 'min-h-[80px]')}
          />
        </div>
        <div>
          <FieldLabel>Recommendations and remedial work</FieldLabel>
          <Textarea
            value={formData.recommendations}
            onChange={(e) => onUpdate('recommendations', e.target.value)}
            className={cn(textareaCn, 'min-h-[80px]')}
          />
        </div>
      </FormCard>

      {/*
        🔴 NOT auto-filled from a table.

        The originating ticket asked for the next date to be suggested from a
        "GN3 frequency table". There is no such table — BS 7671 Reg 652.1 makes
        the interval a judgement weighing the installation, its use, its
        maintenance and the previous reports, and HSR25 §68 puts that judgement
        on the dutyholder. Printing a number the app invented, over the
        inspector's signature, would be the worst possible way to answer this.
      */}
      <FormCard>
        <SectionHeading title="Next inspection" />
        <div className={grid2Cn}>
          <div>
            <FieldLabel>Recommended date of next inspection</FieldLabel>
            <Input
              type="date"
              value={formData.nextInspectionDate}
              onChange={(e) => onUpdate('nextInspectionDate', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
        <div>
          <FieldLabel>Reasoning for the interval</FieldLabel>
          <Textarea
            value={formData.nextInspectionReasoning}
            onChange={(e) => onUpdate('nextInspectionReasoning', e.target.value)}
            className={cn(textareaCn, 'min-h-[64px]')}
            placeholder="e.g. 12 months — heavy industrial use, dusty environment, two Priority 3 findings this visit"
          />
          <p className="mt-1.5 text-[12px] leading-snug text-white">
            There is no published table of maintenance intervals by premises
            type. The interval is your judgement, weighing the type of
            installation, how it is used, the quality of maintenance, external
            influences and what previous reports found. Say why you chose it —
            that reasoning is what makes the recommendation defensible.
          </p>
        </div>
      </FormCard>

      <FormCard>
        <SectionHeading title="Limitations" />
        <p className="whitespace-pre-line text-[12px] leading-relaxed text-white">
          {ROUTINE_INSPECTION_LIMITATIONS}
        </p>
        {formData.thermalSurveyCarriedOut && (
          <p className="whitespace-pre-line border-t border-white/[0.1] pt-3 text-[12px] leading-relaxed text-white">
            {THERMAL_SURVEY_LIMITATIONS}
          </p>
        )}
        <p className="text-[12px] leading-snug text-elec-yellow">
          Printed on every report. It cannot be edited or removed.
        </p>
      </FormCard>

      <FormCard>
        <SectionHeading title="Declaration" />
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
              placeholder="e.g. Approved Electrician"
            />
          </div>
          <div>
            <FieldLabel>Company</FieldLabel>
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
          <SignaturePad onSignatureChange={(v) => onUpdate('inspectorSignature', v)} />
          {formData.inspectorSignature && (
            <p className="mt-1 text-[12px] text-white">Signature captured</p>
          )}
        </div>
      </FormCard>
    </div>
  );
}
