import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SignatureInput from '@/components/signature/SignatureInput';
import { UK_DNOS } from '@/types/g99-commissioning';
import { PLUG_IN_SOLAR_FACTS } from '@/lib/plugInSolarAssessment';
import type { PlugInSolarData } from '@/types/plug-in-solar';
import { usePlugInSolarSmartForm } from '@/hooks/inspection/usePlugInSolarSmartForm';
import {
  cardCn,
  cardFlowCn,
  ChipGroup,
  Field,
  inputCn,
  Picker,
  SectionHeader,
  SourceNote,
  SubHeading,
  TriStateChips,
} from './PlugInSolarPrimitives';

/**
 * Tab 5 — Notification, handover and declaration.
 *
 * Two things here protect the electrician more than anything else on the form.
 *
 * The first is the 28-day notification. G98 is connect-and-notify: the device is
 * commissioned first and the DNO is told afterwards, within 28 days. It is not a
 * prior approval and it does not hold up the job — but it is mandatory, and most
 * consumers have no idea it exists.
 *
 * The second is the scope statement at the foot. This document records an
 * assessment and a verification. It is not a BS 7671 Section 712 installation
 * certificate, and signing it does not make the electrician responsible for a
 * manufactured product placed on the market by someone else. That distinction
 * needs to be on the page, not merely understood.
 */

interface Props {
  data: PlugInSolarData;
  onUpdate: <K extends keyof PlugInSolarData>(field: K, value: PlugInSolarData[K]) => void;
  /** Renders the one-page answer for a landlord or managing agent. */
  onCreateDecisionSheet?: () => void;
}

const dnoOptions = UK_DNOS.map((d) => ({ value: d, label: d }));

const PlugInSolarHandover: React.FC<Props> = ({ data, onUpdate, onCreateDecisionSheet }) => {
  const { suggestedDno, dnoSuggestionAvailable } = usePlugInSolarSmartForm(data);
  const notifyBy = (() => {
    if (!data.commissioningDate) return null;
    const d = new Date(data.commissioningDate);
    if (Number.isNaN(d.getTime())) return null;
    d.setDate(d.getDate() + PLUG_IN_SOLAR_FACTS.dnoNotificationWindowDays);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  })();

  return (
    <div>
      <div className={cardFlowCn}>
      <section className={cardCn}>
        <SectionHeader title="Network notification" />
        <p className="text-[13px] leading-relaxed text-white">
          Notifying the distribution network operator is mandatory. It happens after commissioning,
          within {PLUG_IN_SOLAR_FACTS.dnoNotificationWindowDays} days — it is not a prior approval
          and it does not delay the installation.
        </p>

        {notifyBy && (
          <div className="rounded-xl border border-l-4 border-white/[0.1] border-l-elec-yellow bg-white/[0.05] p-3">
            <p className="text-[13px] font-semibold text-white">Notify by {notifyBy}</p>
            <p className="mt-1 text-[12px] leading-snug text-white">
              {PLUG_IN_SOLAR_FACTS.dnoNotificationWindowDays} days from the commissioning date
              recorded on the previous step.
            </p>
          </div>
        )}

        <Field label="Distribution network operator">
          <Picker
            value={data.dnoName}
            onChange={(v) => onUpdate('dnoName', v)}
            options={dnoOptions}
            title="Distribution network operator"
            placeholder="Select the DNO"
          />
          {/* Offered, never applied automatically: postcode areas do not follow
              DNO boundaries exactly, and overwriting a deliberate choice with a
              guess is worse than leaving the field alone. */}
          {dnoSuggestionAvailable && suggestedDno && (
            <button
              type="button"
              onClick={() => onUpdate('dnoName', suggestedDno.name)}
              className="mt-2 h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.99]"
            >
              Use {suggestedDno.name} — suggested from {data.installationPostcode}
            </button>
          )}
        </Field>

        <Field label="Has the notification been submitted?">
          <TriStateChips value={data.dnoNotified} onChange={(v) => onUpdate('dnoNotified', v)} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Notification reference" htmlFor="pis-dnoref">
            <Input
              id="pis-dnoref"
              value={data.dnoNotificationReference}
              onChange={(e) => onUpdate('dnoNotificationReference', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Date submitted" htmlFor="pis-dnodate">
            <Input
              id="pis-dnodate"
              type="date"
              value={data.dnoNotificationDate}
              onChange={(e) => onUpdate('dnoNotificationDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>

        <Field label="Has deregistration on removal been explained to the customer?">
          <TriStateChips
            value={data.deregistrationExplained}
            onChange={(v) => onUpdate('deregistrationExplained', v)}
          />
          <SourceNote>
            The obligation runs both ways — the DNO must also be told when a device is
            disconnected. Almost nobody mentions this at the point of sale.
          </SourceNote>
        </Field>

        <Field label="Has the test button routine been shown to the customer?">
          <TriStateChips
            value={data.testButtonRoutineExplained}
            onChange={(v) => onUpdate('testButtonRoutineExplained', v)}
          />
          <SourceNote>
            Spec §8.3.4. They should press the test button periodically{' '}
            <span className="font-semibold">while the device is generating</span>, and call an
            electrician if it does not trip immediately — DC leakage from solar, EV chargers and
            IT equipment can desensitise an older device between visits.
          </SourceNote>
        </Field>
      </section>

      {onCreateDecisionSheet && (
        <section className={cardCn}>
          <SectionHeader title="For a landlord or managing agent" />
          <SourceNote>
            A one-page written answer on whether a device may be used at this property — the
            decision, the reasons, and who is responsible for what. Plain English, no regulation
            numbers. It is drawn from this same assessment, so the two cannot disagree.
          </SourceNote>
          <button
            type="button"
            onClick={onCreateDecisionSheet}
            className="h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.06] text-[14px] font-semibold text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.99]"
          >
            Produce the decision sheet
          </button>
        </section>
      )}

      <section className={cardCn}>
        <SectionHeader title="Handover" />

        <Field label="Label affixed at or near the consumer unit?">
          <TriStateChips
            value={data.consumerUnitLabelAffixed}
            onChange={(v) => onUpdate('consumerUnitLabelAffixed', v)}
          />
          <SourceNote>
            The product is supplied with a durable label indicating the presence of a plug-in PV
            device. If the board is later replaced or moved, a new label is needed.
          </SourceNote>
        </Field>

        <Field label="Owner, landlord or freeholder permission">
          <ChipGroup
            value={data.ownerPermissionObtained}
            onChange={(v) => onUpdate('ownerPermissionObtained', v)}
            options={[
              { value: 'yes', label: 'Obtained' },
              { value: 'no', label: 'Not obtained' },
              { value: 'not-required', label: 'Not required' },
              { value: 'unknown', label: 'Not established' },
            ]}
          />
          <SourceNote>
            The customer is responsible for permissions from the owner, landlord, freeholder or
            managing agent, and for any planning permission or Listed Building Consent.
          </SourceNote>
        </Field>

        <Field label="Has the customer been advised to check their insurance?">
          <TriStateChips
            value={data.insuranceAdvised}
            onChange={(v) => onUpdate('insuranceAdvised', v)}
          />
        </Field>

        <Field label="Written handout issued to the customer?">
          <TriStateChips value={data.handoutIssued} onChange={(v) => onUpdate('handoutIssued', v)} />
        </Field>
      </section>

      </div>

      <section className={`${cardCn} mt-6 sm:mt-8`}>
        <SectionHeader title="Declaration" />

        <SubHeading>Assessment</SubHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Assessed by" htmlFor="pis-assessor">
            <Input
              id="pis-assessor"
              value={data.assessorName}
              onChange={(e) => onUpdate('assessorName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Date of assessment" htmlFor="pis-adate">
            <Input
              id="pis-adate"
              type="date"
              value={data.assessmentDate}
              onChange={(e) => onUpdate('assessmentDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <SignatureInput
          label="Assessor signature"
          value={data.assessorSignature}
          onChange={(v) => onUpdate('assessorSignature', v)}
        />

        <SubHeading>Commissioning</SubHeading>
        <p className="text-[12px] leading-snug text-white">
          Complete only where the device was connected and verified during this visit. An
          assessment-only visit leaves this blank.
        </p>
        <Field label="Commissioned by" htmlFor="pis-comeng">
          <Input
            id="pis-comeng"
            value={data.commissioningEngineerName}
            onChange={(e) => onUpdate('commissioningEngineerName', e.target.value)}
            className={inputCn}
          />
        </Field>
        <SignatureInput
          label="Commissioning signature"
          value={data.commissioningSignature}
          onChange={(v) => onUpdate('commissioningSignature', v)}
        />

        <Field label="Additional notes" htmlFor="pis-notes">
          <Textarea
            id="pis-notes"
            value={data.notes}
            onChange={(e) => onUpdate('notes', e.target.value)}
            className={`${inputCn} h-auto min-h-[64px] resize-none py-2`}
            rows={3}
          />
        </Field>
      </section>

      <section className={cardCn}>
        <SectionHeader title="What this document is" />
        <p className="text-[13px] leading-relaxed text-white">
          This certificate records an assessment of an existing electrical installation, any
          remedial work identified, and — where carried out — verification of the circuit the
          device connects to.
        </p>
        <p className="text-[13px] leading-relaxed text-white">
          It is not an electrical installation certificate under BS 7671 Section 712, and it does
          not certify the plug-in solar device itself. The device is a product placed on the market
          by its manufacturer, who is responsible for its compliance. Nothing here transfers that
          responsibility.
        </p>
        <p className="text-[13px] leading-relaxed text-white">
          Findings are marked according to their source, so a requirement of the regulations can be
          told apart from advice or professional judgement.
        </p>
      </section>
    </div>
  );
};

export default PlugInSolarHandover;
