import React, { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ClientSelector from '@/components/ClientSelector';
import type { Customer } from '@/hooks/inspection/useCustomers';
import { assessPlugInSolar } from '@/lib/plugInSolarAssessment';
import {
  DEVICE_RATING_OPTIONS,
  MCB_CURVE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  RCD_RATING_OPTIONS,
} from '@/hooks/inspection/usePlugInSolarSmartForm';
import { toAssessmentInput, type PlugInSolarData } from '@/types/plug-in-solar';
import {
  cardCn,
  ChipGroup,
  Field,
  inputCn,
  cardFlowCn,
  Picker,
  SectionHeader,
  SourceNote,
  TriStateChips,
} from './PlugInSolarPrimitives';
import PlugInSolarVerdict from './PlugInSolarVerdict';
import PlugInSolarPhotos from './PlugInSolarPhotos';

/**
 * Tab 1 — Property & installation.
 *
 * This is the pre-requisite step: everything the assessment needs about the
 * house before anyone plugs anything in. The verdict at the foot recomputes on
 * every keystroke, so the electrician can see a "refer" appear the moment they
 * pick, say, a timber balcony — rather than after filling in four more tabs.
 */

interface Props {
  data: PlugInSolarData;
  onUpdate: <K extends keyof PlugInSolarData>(field: K, value: PlugInSolarData[K]) => void;
  /** Photographs attach to the saved report; null until the first autosave. */
  reportId: string | null;
  /** Fills the client block from a CRM record so the job links to a customer. */
  onSelectCustomer: (customer: Customer | null) => void;
}

const REGION_OPTIONS = [
  { value: 'england' as const, label: 'England' },
  { value: 'wales' as const, label: 'Wales' },
  { value: 'scotland' as const, label: 'Scotland' },
  { value: 'northern-ireland' as const, label: 'N. Ireland' },
];

const TENURE_OPTIONS = [
  { value: 'owner-occupied', label: 'Owner-occupied' },
  { value: 'rented', label: 'Privately rented' },
  { value: 'leasehold-flat', label: 'Leasehold flat' },
  { value: 'social-housing', label: 'Social housing' },
  { value: 'unknown', label: 'Not established' },
];

const EARTHING_OPTIONS = [
  { value: 'TN-S', label: 'TN-S' },
  { value: 'TN-C-S', label: 'TN-C-S (PME)' },
  { value: 'TT', label: 'TT' },
  { value: 'unknown', label: 'Not established' },
];

const CIRCUIT_KIND_OPTIONS = [
  {
    value: 'socket-final-circuit',
    label: 'Socket final circuit',
    description: 'Ring or radial. The only permitted kind.',
  },
  { value: 'lighting', label: 'Lighting circuit', description: 'Not permitted.' },
  {
    value: 'fixed-equipment-spur',
    label: 'Spur to fixed equipment',
    description: 'Cooker, boiler and similar. Not permitted.',
  },
  { value: 'unknown', label: 'Not yet identified', description: '' },
];

const PROTECTION_OPTIONS = [
  {
    value: 'rcbo',
    label: 'RCBO on this circuit',
    description: 'Per-circuit residual current protection.',
  },
  {
    value: 'mcb-with-upstream-rcd',
    label: 'MCB with upstream RCD',
    description: 'Split-load board. Acceptability still under review by DESNZ.',
  },
  { value: 'mcb-no-rcd', label: 'MCB only, no RCD', description: 'No residual current protection.' },
  {
    value: 'rewireable-fuse',
    label: 'Rewireable fuse',
    description: 'Older installation. Upgrade expected.',
  },
  { value: 'unknown', label: 'Not yet identified', description: '' },
];

const RCD_TYPE_OPTIONS = [
  { value: 'ac', label: 'Type AC', description: 'Not appropriate where DC components may exist.' },
  { value: 'a', label: 'Type A', description: '' },
  { value: 'f', label: 'Type F', description: '' },
  { value: 'b', label: 'Type B', description: '' },
  { value: 'none', label: 'None fitted', description: '' },
  { value: 'unknown', label: 'Marking not identified', description: '' },
];

const CONNECTION_OPTIONS = [
  {
    value: 'direct-to-fixed-socket',
    label: 'Direct to a fixed socket-outlet',
    description: 'The only permitted method.',
  },
  { value: 'extension-lead', label: 'Extension cable', description: 'Not permitted.' },
  { value: 'multi-way-adaptor', label: 'Multi-way adaptor', description: 'Not permitted.' },
  { value: 'rcd-adaptor', label: 'RCD adaptor', description: 'Not permitted.' },
  { value: 'travel-adaptor', label: 'Travel adaptor', description: 'Not permitted.' },
];

const PlugInSolarSuitability: React.FC<Props> = ({
  data,
  onUpdate,
  reportId,
  onSelectCustomer,
}) => {
  const result = useMemo(() => assessPlugInSolar(toAssessmentInput(data)), [data]);

  return (
    <div>
      {/*
       * The two opening cards sit in a real grid, not the column flow, so they
       * are the same height — they are the pair you read first and a ragged
       * edge between them looks like a mistake. Everything after flows and
       * packs, which is what uneven sections need.
       */}
      <div className="lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-4">
      <section className={`${cardCn} lg:mb-0 lg:h-full`}>
        <SectionHeader title="Client" />
        <ClientSelector
          onSelectCustomer={onSelectCustomer}
          selectedCustomerId={data.customerId}
          triggerClassName={`${inputCn} flex items-center justify-between text-left`}
        />
        <Field label="Client name" htmlFor="pis-client">
          <Input
            id="pis-client"
            value={data.clientName}
            onChange={(e) => onUpdate('clientName', e.target.value)}
            className={inputCn}
            placeholder="Name or organisation"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" htmlFor="pis-email">
            <Input
              id="pis-email"
              type="email"
              value={data.clientEmail}
              onChange={(e) => onUpdate('clientEmail', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Telephone" htmlFor="pis-tel">
            <Input
              id="pis-tel"
              type="tel"
              value={data.clientTelephone}
              onChange={(e) => onUpdate('clientTelephone', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </section>

      <section className={`${cardCn} lg:mb-0 lg:h-full`}>
        <SectionHeader title="The circuit it would plug into" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Circuit reference" htmlFor="pis-circ">
            <Input
              id="pis-circ"
              value={data.targetCircuitRef}
              onChange={(e) => onUpdate('targetCircuitRef', e.target.value)}
              className={inputCn}
              placeholder="e.g. Way 4, ground floor sockets"
            />
          </Field>
          <Field label="Protective device rating">
            <Picker
              value={data.protectiveDeviceRating}
              onChange={(v) => onUpdate('protectiveDeviceRating', v)}
              options={DEVICE_RATING_OPTIONS}
              title="Protective device rating"
              placeholder="Select rating"
            />
          </Field>
        </div>

        <Field label="Circuit type">
          <Picker
            value={data.targetCircuitKind}
            onChange={(v) => onUpdate('targetCircuitKind', v as PlugInSolarData['targetCircuitKind'])}
            options={CIRCUIT_KIND_OPTIONS}
            title="Circuit type"
            placeholder="Select circuit type"
          />
          <SourceNote>
            Ring final circuits are fine — the government&rsquo;s safety study found no concern on
            appropriately protected rings.
          </SourceNote>
        </Field>

      </section>
      </div>

      <div className={cardFlowCn}>


      <section className={cardCn}>
        <SectionHeader title="Property" />
        <Field label="Installation address" htmlFor="pis-addr">
          <Textarea
            id="pis-addr"
            value={data.installationAddress}
            onChange={(e) => onUpdate('installationAddress', e.target.value)}
            className={`${inputCn} h-auto min-h-[44px] resize-none py-2`}
            rows={2}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Postcode" htmlFor="pis-pc">
            <Input
              id="pis-pc"
              value={data.installationPostcode}
              onChange={(e) => onUpdate('installationPostcode', e.target.value.toUpperCase())}
              className={inputCn}
            />
          </Field>
          <Field label="Property type">
            <Picker
              value={data.propertyType}
              onChange={(v) => onUpdate('propertyType', v)}
              options={PROPERTY_TYPE_OPTIONS}
              title="Property type"
              placeholder="Select type"
            />
          </Field>
        </div>

        <Field label="Nation">
          <ChipGroup
            value={data.region}
            onChange={(v) => onUpdate('region', v)}
            options={REGION_OPTIONS}
          />
          <SourceNote>
            Great Britain only. Northern Ireland connects under G98/NI, and the product
            specification records that its application there is still being considered.
          </SourceNote>
        </Field>

        <Field
          label="Tenure"
          hint="Rented, leasehold and social housing bring in the freeholder or managing agent, and change who has to consent."
        >
          <Picker
            value={data.tenure}
            onChange={(v) => onUpdate('tenure', v as PlugInSolarData['tenure'])}
            options={TENURE_OPTIONS}
            title="Tenure"
            placeholder="Select tenure"
          />
        </Field>

        <Field label="Installation approximate year" htmlFor="pis-year">
          <Input
            id="pis-year"
            inputMode="numeric"
            value={data.installationApproxYear}
            onChange={(e) => onUpdate('installationApproxYear', e.target.value)}
            className={inputCn}
            placeholder="e.g. 2004"
          />
        </Field>
      </section>

      <section className={cardCn}>
        <SectionHeader title="Supply and consumer unit" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Earthing arrangement">
            <Picker
              value={data.earthingArrangement}
              onChange={(v) =>
                onUpdate('earthingArrangement', v as PlugInSolarData['earthingArrangement'])
              }
              options={EARTHING_OPTIONS}
              title="Earthing arrangement"
              placeholder="Select"
            />
          </Field>
          <Field label="Ze (Ω)" htmlFor="pis-ze">
            <Input
              id="pis-ze"
              inputMode="decimal"
              value={data.ze}
              onChange={(e) => onUpdate('ze', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>

        <Field label="Consumer unit make and type" htmlFor="pis-cu">
          <Input
            id="pis-cu"
            value={data.consumerUnitMake}
            onChange={(e) => onUpdate('consumerUnitMake', e.target.value)}
            className={inputCn}
          />
        </Field>

        <Field label="Is the consumer unit clearly labelled?">
          <TriStateChips
            value={data.consumerUnitLabelled}
            onChange={(v) => onUpdate('consumerUnitLabelled', v)}
          />
          <SourceNote>
            Circuits have to be identifiable before connection, because only one device is
            permitted per circuit. An unlabelled or unknown board is itself a referral.
          </SourceNote>
        </Field>

        <Field label="Condition observed" htmlFor="pis-cucond">
          <Textarea
            id="pis-cucond"
            value={data.consumerUnitCondition}
            onChange={(e) => onUpdate('consumerUnitCondition', e.target.value)}
            className={`${inputCn} h-auto min-h-[44px] resize-none py-2`}
            rows={2}
            placeholder="Anything worth recording about the board"
          />
        </Field>
      </section>

      <section className={cardCn}>
        <SectionHeader title="Protection" />

        <Field label="Protective device arrangement">
          <Picker
            value={data.circuitProtection}
            onChange={(v) => onUpdate('circuitProtection', v as PlugInSolarData['circuitProtection'])}
            options={PROTECTION_OPTIONS}
            title="Protective device"
            placeholder="Select arrangement"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="RCD type marking">
            <Picker
              value={data.rcdType}
              onChange={(v) => onUpdate('rcdType', v as PlugInSolarData['rcdType'])}
              options={RCD_TYPE_OPTIONS}
              title="RCD type"
              placeholder="Select type"
            />
          </Field>
          <Field label="Rated residual current">
            <Picker
              value={data.rcdRatingMa}
              onChange={(v) => onUpdate('rcdRatingMa', v)}
              options={RCD_RATING_OPTIONS}
              title="Rated residual current"
              placeholder="Select"
            />
          </Field>
        </div>

        <Field label="Confirmed suitable for bidirectional energy flow?">
          <TriStateChips
            value={data.rcdBidirectionalConfirmed}
            onChange={(v) => onUpdate('rcdBidirectionalConfirmed', v)}
          />
          <SourceNote>
            A separate question from the type marking, and the one most often skipped. Most devices
            are built for energy flowing one way. Some carry a{' '}
            <span className="font-semibold">BD</span> or{' '}
            <span className="font-semibold">Bi-dir</span> suffix; where there is no marking, ask the
            manufacturer with the model number. BS 7671 551.7.1(c).
          </SourceNote>
        </Field>

        <Field
          label="Device characteristic"
          hint="Sets which BS 7671 column the Zs reading on the Testing step is judged against."
        >
          <ChipGroup
            value={data.mcbCurve}
            onChange={(v) => onUpdate('mcbCurve', v)}
            options={MCB_CURVE_OPTIONS.map((o) => ({ value: o.value as PlugInSolarData['mcbCurve'], label: o.label }))}
          />
        </Field>
        <SourceNote>
          No particular RCD type is mandated for plug-in solar — bi-directional protection was
          proposed to DESNZ and declined. Type AC is ruled out on its own footing by BS 7671
          531.3.3, because an inverter&rsquo;s residual current may contain DC components.
        </SourceNote>

      </section>

      <section className={cardCn}>
        <SectionHeader title="Socket and connection" />

        <Field label="Is the socket-outlet sound and BS 1363-2 compliant?">
          <TriStateChips
            value={data.socketConditionSatisfactory}
            onChange={(v) => onUpdate('socketConditionSatisfactory', v)}
          />
        </Field>

        <Field label="How would it be connected?">
          <Picker
            value={data.connectionMethod}
            onChange={(v) => onUpdate('connectionMethod', v as PlugInSolarData['connectionMethod'])}
            options={CONNECTION_OPTIONS}
            title="Connection method"
            placeholder="Select method"
          />
          <SourceNote>
            Extension cables, multi-way adaptors, RCD adaptors and travel adaptors are all
            prohibited — the warning is required on the plug itself.
          </SourceNote>
        </Field>

        <Field label="Is there already a plug-in solar device in this dwelling?">
          <ChipGroup
            value={data.existingPlugInSolarInDwelling ? 'yes' : 'no'}
            onChange={(v) => onUpdate('existingPlugInSolarInDwelling', v === 'yes')}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
          />
          <SourceNote>
            G98 currently allows one per household. The stated intention is to move to one per
            power circuit — check the current issue before telling a customer they cannot add a
            second.
          </SourceNote>
        </Field>
      </section>

      <PlugInSolarPhotos
        reportId={reportId}
        itemId="consumer-unit"
        title="Evidence — board and circuit"
        blurb="Photograph the consumer unit, the protective device for this circuit and its RCD type marking. This is what supports the findings if anyone questions them later."
      />

      </div>

      {/* The verdict is the conclusion, not another field group — it needs
          separating from the form above it, not just stacking under it. */}
      <section className={`${cardCn} mt-6 sm:mt-8`}>
        <SectionHeader title="Result" />
        <PlugInSolarVerdict result={result} />
      </section>
    </div>
  );
};

export default PlugInSolarSuitability;
