/**
 * InsulationResistanceInterpreter — turn an IR reading into a verdict.
 *
 * WHY THIS EXISTS
 * /guides/low-insulation-resistance earns 7,369 impressions a month at position
 * 5.4 and a 0.7% click-through. The SERP can state "1 MΩ minimum" perfectly well,
 * which is exactly why the page loses the click. What it cannot tell you is what
 * YOUR 1.4 MΩ on 1970s rubber means — a pass on the Regulations, and a problem on
 * the job. That judgement is the thing worth clicking for.
 *
 * SOURCES — split deliberately, because they carry different weight:
 *  • BS 7671:2018+A4:2026 Table 64, read from the printed standard 2026-08-07:
 *      SELV and PELV .................. 250 V DC test .... 0.5 MΩ minimum
 *      Up to and including 500 V ...... 500 V DC test .... 1.0 MΩ minimum
 *      Above 500 V .................... 1000 V DC test ... 1.0 MΩ minimum
 *  • Reg 643.3.3 (new at A4), printed: where connected equipment would influence
 *    the result or be damaged, test per Table 64 BEFORE connection, then apply a
 *    250 V DC test after connection — "The insulation resistance shall have a
 *    value of at least 1 MΩ."
 *  • The interpretation bands (1-2 MΩ deteriorating, >2 MΩ acceptable for aged
 *    wiring, >200 MΩ typical of new work, GN3's <20 MΩ investigate trigger on a
 *    NEW installation) come from this page's own verified content. They are
 *    GUIDANCE, not requirements, and the UI says so.
 *
 * 🔴 IT DOES NOT ASSIGN AN EICR CODE. The page itself says a sub-1 MΩ result is
 * "C1 or C2 depending on the severity and context". Printing a definitive code
 * off three inputs would be over-claiming on something that carries liability.
 */
import { useMemo, useState } from 'react';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorDivider,
} from '@/components/calculators/shared';
import {
  TABLE_64,
  AGE_LABEL,
  interpretIr,
  type CircuitKind,
  type AgeBand,
  type IrVerdict,
} from './insulation-resistance/irLogic';

const STATUS_STYLE: Record<IrVerdict['status'], string> = {
  fail: 'border-red-500/40 bg-red-500/10',
  investigate: 'border-orange-500/40 bg-orange-500/10',
  acceptable: 'border-green-500/30 bg-green-500/10',
  excellent: 'border-green-500/30 bg-green-500/10',
};

const InsulationResistanceInterpreter = () => {
  const [reading, setReading] = useState('');
  const [unit, setUnit] = useState<'M' | 'G'>('M');
  const [kind, setKind] = useState<CircuitKind>('lv');
  const [age, setAge] = useState<AgeBand>('under15');
  const [previous, setPrevious] = useState('');

  const verdict = useMemo(() => {
    const raw = parseFloat(reading);
    if (!raw || raw <= 0) return null;
    const mohm = unit === 'G' ? raw * 1000 : raw;
    const prev = parseFloat(previous);
    return interpretIr(mohm, kind, age, prev > 0 ? prev : undefined);
  }, [reading, unit, kind, age, previous]);

  return (
    <CalculatorCard
      category="testing"
      title="Insulation Resistance Interpreter"
      description="What your reading means — BS 7671 Table 64 plus what it says about the installation"
    >
      <CalculatorInputGrid columns={2}>
        <CalculatorInput
          label="Your reading"
          unit={unit === 'G' ? 'GΩ' : 'MΩ'}
          type="text"
          inputMode="decimal"
          value={reading}
          onChange={setReading}
          placeholder="e.g. 1.4"
          hint="The value shown on the tester"
        />
        <CalculatorSelect
          label="Unit"
          value={unit}
          onChange={(v) => setUnit(v as 'M' | 'G')}
          options={[
            { value: 'M', label: 'MΩ (megohms)' },
            { value: 'G', label: 'GΩ — testers often show >1 GΩ' },
          ]}
        />
        <CalculatorSelect
          label="Circuit nominal voltage"
          value={kind}
          onChange={(v) => setKind(v as CircuitKind)}
          options={Object.entries(TABLE_64).map(([k, v]) => ({
            value: k,
            label: `${v.label} — test at ${v.testVolts} V DC`,
          }))}
        />
        <CalculatorSelect
          label="Age of the installation"
          value={age}
          onChange={(v) => setAge(v as AgeBand)}
          options={(Object.keys(AGE_LABEL) as AgeBand[]).map((k) => ({
            value: k,
            label: AGE_LABEL[k],
          }))}
        />
      </CalculatorInputGrid>

      <CalculatorInput
        label="Previous reading, if you have one (MΩ)"
        unit="MΩ"
        type="text"
        inputMode="decimal"
        value={previous}
        onChange={setPrevious}
        placeholder="e.g. 150"
        hint="Optional — a sharp fall matters even when the current reading passes"
      />

      {verdict && (
        <>
          <CalculatorDivider category="testing" />
          <div className={`rounded-xl border p-4 ${STATUS_STYLE[verdict.status]}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
              {verdict.status === 'fail'
                ? 'Fail'
                : verdict.status === 'investigate'
                  ? 'Investigate'
                  : verdict.status === 'excellent'
                    ? 'Excellent'
                    : 'Acceptable'}
            </p>
            <p className="mt-1 text-lg font-bold leading-tight text-white">{verdict.headline}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-white">{verdict.detail}</p>
            {verdict.trend && (
              <p className="mt-3 border-t border-white/[0.12] pt-3 text-[13px] leading-relaxed text-white">
                <span className="font-semibold">Trend: </span>
                {verdict.trend}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-3">
            <p className="text-[12.5px] leading-relaxed text-white">
              <span className="font-semibold">Test voltage: </span>
              {verdict.requiredTestVolts} V DC, minimum {verdict.minMohm} MΩ — BS 7671 Table 64 (Reg
              643.3.2). If the reading was taken at a different voltage it does not verify this
              circuit.
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white">
              Where connected equipment would influence the result or be damaged, Reg 643.3.3
              requires the Table 64 test <em>before</em> connection, then a 250 V DC test after
              connection which must still reach 1 MΩ.
            </p>
            {verdict.guidanceOnly && (
              <p className="mt-2 text-[12.5px] leading-relaxed text-white">
                <span className="font-semibold">Note: </span>
                the pass/fail line above comes from Table 64. Everything said about what the reading
                means for the installation is guidance — GN3 and good practice — not a requirement
                of the Regulations.
              </p>
            )}
          </div>
        </>
      )}
    </CalculatorCard>
  );
};

export default InsulationResistanceInterpreter;
