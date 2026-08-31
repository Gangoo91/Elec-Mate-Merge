import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { PlugInSolarData } from '@/types/plug-in-solar';
import { usePlugInSolarSmartForm } from '@/hooks/inspection/usePlugInSolarSmartForm';
import {
  cardCn,
  cardFlowCn,
  ReadingCheck,
  Field,
  inputCn,
  SectionHeader,
  SourceNote,
  SubHeading,
  TriStateChips,
} from './PlugInSolarPrimitives';

/**
 * Tab 4 — Verification and commissioning.
 *
 * ⚠️ Scope discipline. Everything here is something an electrician can actually
 * establish on site with test instruments. The figures that circulate about
 * plug-in solar — 34 V at the plug pins within 100 ms, disconnection within
 * 100 ms on loss of mains — are *product type tests* carried out by the
 * manufacturer under the interim product specification. They are not site
 * measurements and must never be presented as boxes for a tester to fill in;
 * doing so would invite someone to attempt them with a multimeter. What can be
 * proven on site is that the device ceases to export when the circuit is
 * switched off, which is what the loss-of-mains check below records.
 */

interface Props {
  data: PlugInSolarData;
  onUpdate: <K extends keyof PlugInSolarData>(field: K, value: PlugInSolarData[K]) => void;
}

const PlugInSolarVerification: React.FC<Props> = ({ data, onUpdate }) => {
  const { zsCheck, rcdTripCheck } = usePlugInSolarSmartForm(data, data.mcbCurve);
  return (
  <div className={cardFlowCn}>
    <section className={cardCn}>
      <SectionHeader title="Circuit verification" />
      <p className="text-[13px] leading-relaxed text-white">
        Tests on the final circuit the device connects to. Record what was measured, not what the
        device is certified to do.
      </p>

      <Field label="Polarity confirmed at the socket-outlet?">
        <TriStateChips
          value={data.polarityConfirmed}
          onChange={(v) => onUpdate('polarityConfirmed', v)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Zs at the socket-outlet (Ω)" htmlFor="pis-zs">
          <Input
            id="pis-zs"
            inputMode="decimal"
            value={data.zsAtSocket}
            onChange={(e) => onUpdate('zsAtSocket', e.target.value)}
            className={inputCn}
          />
          <ReadingCheck {...zsCheck} />
        </Field>
        <Field label="Continuity of protective conductor (Ω)" htmlFor="pis-cpc">
          <Input
            id="pis-cpc"
            inputMode="decimal"
            value={data.cpcContinuity}
            onChange={(e) => onUpdate('cpcContinuity', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>

      <SubHeading>Residual current device</SubHeading>

      <Field label="Measured trip time at IΔn (ms)" htmlFor="pis-trip">
        <Input
          id="pis-trip"
          inputMode="numeric"
          value={data.rcdTripTimeMs}
          onChange={(e) => onUpdate('rcdTripTimeMs', e.target.value)}
          className={inputCn}
        />
        <ReadingCheck {...rcdTripCheck} />
      </Field>

      <Field label="Integral test button operated satisfactorily?">
        <TriStateChips
          value={data.rcdTestButtonOperated}
          onChange={(v) => onUpdate('rcdTestButtonOperated', v)}
        />
        <SourceNote>
          Consumers are advised to test their protective devices periodically and to seek help if a
          device fails. Showing the customer how is worth a minute of the visit.
        </SourceNote>
      </Field>
    </section>

    <section className={cardCn}>
      <SectionHeader title="Device commissioning" />

      <Field label="Commissioning date" htmlFor="pis-comdate">
        <Input
          id="pis-comdate"
          type="date"
          value={data.commissioningDate}
          onChange={(e) => onUpdate('commissioningDate', e.target.value)}
          className={inputCn}
        />
        <SourceNote>
          This date starts the 28-day clock for notifying the distribution network operator.
        </SourceNote>
      </Field>

      <Field label="Device energises and generates as expected?">
        <TriStateChips
          value={data.functionalCheckPassed}
          onChange={(v) => onUpdate('functionalCheckPassed', v)}
        />
      </Field>

      <Field label="Loss of mains proven — device ceases to export when the circuit is switched off?">
        <TriStateChips
          value={data.lossOfMainsProven}
          onChange={(v) => onUpdate('lossOfMainsProven', v)}
        />
        <SourceNote>
          A functional check that the anti-islanding provision behaves as it should. The timed
          disconnection and residual-voltage figures in the product specification are manufacturer
          type tests, not site measurements — do not attempt to measure them.
        </SourceNote>
      </Field>

      <Field label="Notes" htmlFor="pis-vnotes">
        <Textarea
          id="pis-vnotes"
          value={data.verificationNotes}
          onChange={(e) => onUpdate('verificationNotes', e.target.value)}
          className={`${inputCn} h-auto min-h-[64px] resize-none py-2`}
          rows={3}
          placeholder="Instruments used, anything unusual, anything the customer should know"
        />
      </Field>
    </section>
  </div>
  );
};

export default PlugInSolarVerification;
