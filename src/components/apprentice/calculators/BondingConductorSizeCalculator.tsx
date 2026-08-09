/**
 * BondingConductorSizeCalculator — main and supplementary protective bonding.
 *
 * WHY THIS EXISTS
 * /bonding-conductors-guide earns 9,109 impressions a month at position 7.2 and
 * a 1.2% click-through. The queries are sizing questions ("main bonding size for
 * 25mm tails", "supplementary bonding size bathroom"), and Google answers a bare
 * lookup in the SERP. A tool that takes what is actually on site and returns a
 * verdict is something the SERP cannot do.
 *
 * 🔴 THIS IS NOT AN ADIABATIC CALCULATION. Bonding conductors are sized by
 * Reg 544.1 / 544.2 and Table 54.8 — a lookup and a fraction, not S = √(I²t)/k.
 * The adiabatic equation sizes a CPC for fault withstand, which is a different
 * question. An earlier plan to point this page at the adiabatic calculator was
 * caught and rejected for exactly that reason.
 *
 * EVERY FIGURE BELOW WAS READ FROM THE PRINTED BS 7671:2018+A4:2026, verified
 * 2026-08-07 — not from the RAG, which mis-attributes.
 */
import { useMemo, useState } from 'react';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorDivider,
  CalculatorPanes,
  CalculatorEditorial,
  ResultHeadline,
} from '@/components/calculators/shared';
import { bondingConductorSizeContent } from './content/bonding-conductor-size';

const CAT = 'cable';

/**
 * TABLE 54.8 — minimum copper-equivalent CSA of the main protective bonding
 * conductor in relation to the PEN conductor of the supply. Printed verbatim:
 *   35 mm² or less .................. 10 mm²
 *   over 35 up to 50 ................ 16 mm²
 *   over 50 up to 95 ................ 25 mm²
 *   over 95 up to 150 ............... 35 mm²
 *   over 150 ........................ 50 mm²
 * NOTE (printed): "Local distributor's network conditions may require a larger
 * conductor." — surfaced in the UI, because it is the thing that catches people.
 */
const TABLE_54_8: { maxPen: number; bond: number }[] = [
  { maxPen: 35, bond: 10 },
  { maxPen: 50, bond: 16 },
  { maxPen: 95, bond: 25 },
  { maxPen: 150, bond: 35 },
  { maxPen: Infinity, bond: 50 },
];

/** Conductor sizes an electrician will actually have on the van. */
const CSA_OPTIONS = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];

type Mode = 'main' | 'supplementary';

export interface Verdict {
  required: number;
  rule: string;
  reg: string;
  workings: string;
  notes: string[];
}

/** Reg 544.1.1 — main protective bonding. Exported so it can be tested. */
export function sizeMain(pme: boolean, refCsa: number): Verdict {
  if (pme) {
    const row = TABLE_54_8.find((r) => refCsa <= r.maxPen)!;
    return {
      required: row.bond,
      rule: `PEN ${refCsa} mm² → ${row.bond} mm² minimum`,
      reg: 'Reg 544.1.1 and Table 54.8',
      workings:
        'Where PME conditions apply the main bonding conductor is selected from the PEN conductor of the supply and Table 54.8 — it is not a fraction of the earthing conductor.',
      notes: [
        "Table 54.8 NOTE: the local distributor's network conditions may require a larger conductor — check with the DNO before finalising.",
        'Where an installation has more than one source of supply under PME conditions, size on the LARGEST PEN conductor (Reg 544.1.1).',
      ],
    };
  }
  // Non-PME: half the earthing conductor, floor 6 mm², ceiling 25 mm² (copper).
  const half = refCsa / 2;
  const required = Math.min(25, Math.max(6, half));
  const standard = CSA_OPTIONS.find((c) => c >= required) ?? required;
  return {
    required: standard,
    rule: `half of ${refCsa} mm² = ${half} mm² → ${standard} mm² (min 6, max 25)`,
    reg: 'Reg 544.1.1',
    workings:
      'Except where PME conditions apply, the main bonding conductor shall be not less than half the cross-sectional area required for the earthing conductor, not less than 6 mm², and need not exceed 25 mm² for copper.',
    notes: [
      'The 25 mm² ceiling applies to copper, or an equivalent conductance in another metal.',
      'Where an installation serves more than one building, select according to the distribution circuit protective conductor for that building.',
    ],
  };
}

/** Reg 544.2.1 / .2 / .3 — supplementary bonding. Exported so it can be tested. */
export function sizeSupplementary(kind: string, cpcCsa: number, protectedMech: boolean): Verdict {
  if (kind === 'extr-extr') {
    const required = protectedMech ? 2.5 : 4;
    return {
      required,
      rule: `${required} mm² (${protectedMech ? 'mechanically protected' : 'no mechanical protection'})`,
      reg: 'Reg 544.2.3',
      workings:
        'A supplementary bonding conductor connecting two extraneous-conductive-parts shall be not less than 2.5 mm² if sheathed or otherwise mechanically protected, or 4 mm² if it is not.',
      notes: ['Both figures are copper.'],
    };
  }
  if (kind === 'exp-extr') {
    const half = cpcCsa / 2;
    const required = protectedMech ? Math.max(2.5, half) : Math.max(4, half);
    const standard = CSA_OPTIONS.find((c) => c >= required) ?? required;
    return {
      required: standard,
      rule: `half of the ${cpcCsa} mm² cpc = ${half} mm² → ${standard} mm²`,
      reg: 'Reg 544.2.2',
      workings:
        'Connecting an exposed-conductive-part to an extraneous-conductive-part: conductance not less than HALF that of the protective conductor connected to the exposed-conductive-part. If mechanical protection is not provided, not less than 4 mm².',
      notes: protectedMech
        ? []
        : ['The 4 mm² floor applies because there is no mechanical protection.'],
    };
  }
  // exposed <-> exposed
  const required = protectedMech ? cpcCsa : Math.max(4, cpcCsa);
  const standard = CSA_OPTIONS.find((c) => c >= required) ?? required;
  return {
    required: standard,
    rule: `not less than the smaller cpc (${cpcCsa} mm²) → ${standard} mm²`,
    reg: 'Reg 544.2.1',
    workings:
      'Connecting two exposed-conductive-parts: conductance not less than that of the SMALLER protective conductor connected to them. If mechanical protection is not provided, not less than 4 mm².',
    notes: protectedMech
      ? []
      : ['The 4 mm² floor applies because there is no mechanical protection.'],
  };
}

const BondingConductorSizeCalculator = () => {
  const [mode, setMode] = useState<Mode>('main');
  const [earthing, setEarthing] = useState('pme');
  const [refCsa, setRefCsa] = useState('25');
  const [kind, setKind] = useState('exp-extr');
  const [cpcCsa, setCpcCsa] = useState('2.5');
  const [mech, setMech] = useState('yes');
  const [installed, setInstalled] = useState('');

  const verdict = useMemo<Verdict | null>(() => {
    if (mode === 'main') {
      const r = parseFloat(refCsa);
      if (!r || r <= 0) return null;
      return sizeMain(earthing === 'pme', r);
    }
    const c = parseFloat(cpcCsa);
    if (kind !== 'extr-extr' && (!c || c <= 0)) return null;
    return sizeSupplementary(kind, c, mech === 'yes');
  }, [mode, earthing, refCsa, kind, cpcCsa, mech]);

  // "What is actually installed?" — the part a SERP answer cannot give you.
  const check = useMemo(() => {
    if (!verdict || !installed.trim()) return null;
    const got = parseFloat(installed);
    if (!got || got <= 0) return null;
    return { got, ok: got >= verdict.required };
  }, [verdict, installed]);

  return (
    <CalculatorCard
      category={CAT}
      title="Bonding Conductor Size Calculator"
      description="Main and supplementary protective bonding to BS 7671 Reg 544 and Table 54.8"
    >
      <CalculatorPanes
        copyTitle="Bonding Conductor Size"
        placeholder="Choose what you are sizing — the minimum will appear here."
        form={
          <>
            <CalculatorSelect
              label="What are you sizing?"
              value={mode}
              onChange={(v) => setMode(v as Mode)}
              options={[
                {
                  value: 'main',
                  label: 'Main protective bonding (gas, water, oil, structural steel)',
                },
                {
                  value: 'supplementary',
                  label: 'Supplementary bonding (bathroom, pool, agricultural)',
                },
              ]}
            />

            {mode === 'main' ? (
              <CalculatorInputGrid columns={2}>
                <CalculatorSelect
                  label="Earthing arrangement"
                  value={earthing}
                  onChange={setEarthing}
                  options={[
                    { value: 'pme', label: 'TN-C-S (PME) — sized from the PEN' },
                    { value: 'other', label: 'TN-S or TT — sized from the earthing conductor' },
                  ]}
                />
                <CalculatorSelect
                  label={
                    earthing === 'pme' ? 'Supply PEN conductor (mm²)' : 'Earthing conductor (mm²)'
                  }
                  value={refCsa}
                  onChange={setRefCsa}
                  options={CSA_OPTIONS.map((c) => ({ value: String(c), label: `${c} mm²` }))}
                />
              </CalculatorInputGrid>
            ) : (
              <CalculatorInputGrid columns={2}>
                <CalculatorSelect
                  label="What is being connected?"
                  value={kind}
                  onChange={setKind}
                  options={[
                    {
                      value: 'exp-extr',
                      label: 'Exposed-conductive-part to extraneous (Reg 544.2.2)',
                    },
                    { value: 'exp-exp', label: 'Two exposed-conductive-parts (Reg 544.2.1)' },
                    { value: 'extr-extr', label: 'Two extraneous-conductive-parts (Reg 544.2.3)' },
                  ]}
                />
                <CalculatorSelect
                  label="Mechanically protected?"
                  value={mech}
                  onChange={setMech}
                  options={[
                    { value: 'yes', label: 'Yes — sheathed or in containment' },
                    { value: 'no', label: 'No — minimum rises to 4 mm²' },
                  ]}
                />
                {kind !== 'extr-extr' && (
                  <CalculatorSelect
                    label="Circuit protective conductor (mm²)"
                    value={cpcCsa}
                    onChange={setCpcCsa}
                    options={CSA_OPTIONS.filter((c) => c <= 35).map((c) => ({
                      value: String(c),
                      label: `${c} mm²`,
                    }))}
                  />
                )}
              </CalculatorInputGrid>
            )}

            {/* An input, so it belongs in the form pane — but it only means
                anything once there is a minimum to check it against. */}
            {verdict && (
              <>
                <CalculatorDivider category={CAT} />
                <CalculatorInput
                  label="What is actually installed? (mm²)"
                  unit="mm²"
                  type="text"
                  inputMode="decimal"
                  value={installed}
                  onChange={setInstalled}
                  placeholder="e.g. 10"
                  hint="Measure or read the existing conductor to check it against the minimum"
                />
              </>
            )}
          </>
        }
        result={
          verdict && (
            <div className="space-y-4 animate-fade-in">
              <ResultHeadline
                label="Minimum size"
                value={`${verdict.required} mm²`}
                aside="copper"
                caption={verdict.rule}
              />

              <p className="text-[12.5px] leading-relaxed text-white">{verdict.workings}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
                {verdict.reg}
              </p>
              {verdict.notes.map((n) => (
                <p key={n} className="text-[12px] leading-relaxed text-white">
                  {n}
                </p>
              ))}

              {check && (
                <div
                  className={`rounded-xl border p-3 ${
                    check.ok
                      ? 'border-green-500/30 bg-green-500/10'
                      : 'border-orange-500/30 bg-orange-500/10'
                  }`}
                >
                  <p className="text-sm font-semibold text-white">
                    {check.ok
                      ? `${check.got} mm² meets the ${verdict.required} mm² minimum.`
                      : `${check.got} mm² is BELOW the ${verdict.required} mm² minimum.`}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-white">
                    {check.ok
                      ? 'Record the size and its connection on the certificate. Check the clamp is to BS 951 and the "Safety Electrical Connection — Do Not Remove" label is fitted.'
                      : 'An undersized main bond is commonly recorded as a C2 (potentially dangerous) on an EICR, but the code depends on the specific installation and is the inspector’s judgement — this tool does not assign one.'}
                  </p>
                </div>
              )}
            </div>
          )
        }
        footer={<CalculatorEditorial content={bondingConductorSizeContent} category={CAT} />}
      />
    </CalculatorCard>
  );
};

export default BondingConductorSizeCalculator;
