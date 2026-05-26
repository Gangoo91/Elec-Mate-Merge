/**
 * Module 4 · Section 3 · Subsection 3 — Fault Current Calculations
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Prospective fault current Ipf = V/Z, transformer fault levels via percentage
 *   impedance (FLC / (%Z/100)), cable resistance / R1+R2, earth fault loop impedance
 *   Zs = Ze + (R1+R2), DNO declared Ze values for TN-C-S / TN-S / TT.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Fault Current Calculations - HNC Module 4 Section 3.3';
const DESCRIPTION =
  'Master fault current calculations for building services: prospective fault current (Ipf), transformer impedance, cable impedance, loop impedance calculations, and verification methods.';

const quickCheckQuestions = [
  {
    id: 'ipf-definition',
    question: 'What is prospective fault current (Ipf)?',
    options: [
      'Maximum current that would flow in a fault',
      'Maximum current a cable can carry',
      'Current at which RCDs operate',
      'Normal operating current',
    ],
    correctIndex: 0,
    explanation:
      "Prospective fault current (Ipf) is the maximum current that would flow if a fault of negligible impedance occurred at a given point. It's essential for selecting protective device breaking capacity.",
  },
  {
    id: 'transformer-impedance',
    question:
      'A 500kVA transformer has 5% impedance. What is its approximate fault current at the secondary terminals?',
    options: [
      '500A',
      '14.4kA',
      '5kA',
      '72kA',
    ],
    correctIndex: 1,
    explanation:
      'For a 500kVA transformer at 400V: FLC = 500000/(√3×400) = 722A. With 5% impedance, fault current ≈ FLC/0.05 = 722/0.05 = 14,440A ≈ 14.4kA.',
  },
  {
    id: 'cable-impedance',
    question: 'How does cable length affect prospective fault current?',
    options: [
      'Only affects voltage drop',
      'No effect',
      'Increases Ipf',
      'Decreases Ipf',
    ],
    correctIndex: 3,
    explanation:
      'Longer cables have higher impedance (both resistance and reactance), which increases total circuit impedance and therefore reduces prospective fault current. This is why Ipf is highest at the transformer.',
  },
  {
    id: 'zs-calculation',
    question:
      'If Ze = 0.35Ω and the circuit (R1+R2) = 0.25Ω, what is the earth fault loop impedance Zs?',
    options: [
      '0.88Ω',
      '1.46Ω',
      '0.60Ω',
      '0.10Ω',
    ],
    correctIndex: 2,
    explanation:
      'Zs = Ze + (R1+R2) = 0.35 + 0.25 = 0.60Ω. This simple addition applies when calculating total earth fault loop impedance for disconnection time verification.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the formula for calculating prospective fault current at a point in the system?',
    options: [
      'Ipf = V × Z',
      'Ipf = V / Z',
      'Ipf = Z / V',
      'Ipf = V² / Z',
    ],
    correctAnswer: 1,
    explanation:
      'Ipf = V/Z where V is the system voltage and Z is the total impedance of the fault path from the source to the fault point. Lower impedance means higher fault current.',
  },
  {
    id: 2,
    question:
      'A 1000kVA transformer with 6% impedance supplies a 400V system. What is the prospective fault current at the transformer secondary?',
    options: [
      '28.9kA',
      '10.2kA',
      '24.1kA',
      '16.7kA',
    ],
    correctAnswer: 2,
    explanation:
      'FLC = 1000000/(√3×400) = 1443A. Fault current = FLC/impedance = 1443/0.06 = 24,050A ≈ 24.1kA. This is the maximum fault level at the transformer terminals.',
  },
  {
    id: 3,
    question:
      'Which factor reduces the prospective fault current most significantly as distance from the transformer increases?',
    options: [
      'Cable insulation type',
      'Ambient temperature',
      'Installation method',
      'Cable impedance (R + jX)',
    ],
    correctAnswer: 3,
    explanation:
      'Cable impedance, comprising both resistance (R) and reactance (X), is the dominant factor reducing fault current as distance increases. The longer the cable run, the higher the total impedance.',
  },
  {
    id: 4,
    question:
      'When measuring prospective fault current at an installation, which test instruments are used?',
    options: [
      'Loop impedance tester or prospective fault current meter',
      'Unlimited fine and/or imprisonment for up to 2 years',
      'End of RIBA Stage 3/4 (Technical Design)',
      'Space, weight, ventilation, and connection capacity requirements',
    ],
    correctAnswer: 0,
    explanation:
      'Loop impedance testers and dedicated prospective fault current meters measure Ipf directly at the test point. The Ipf reading is essential for verifying protective device breaking capacity.',
  },
  {
    id: 5,
    question: 'What is the typical Ze value provided by UK DNOs for TN-C-S supplies?',
    options: [
      '0.08Ω maximum',
      '0.35Ω maximum',
      '21Ω maximum',
      '0.80Ω maximum',
    ],
    correctAnswer: 1,
    explanation:
      'For TN-C-S (PME) supplies, DNOs typically declare a maximum Ze of 0.35Ω. This value should be used in design calculations unless actual measurements indicate a lower value.',
  },
  {
    id: 6,
    question: 'How is cable impedance per metre typically expressed in BS 7671 tables?',
    options: [
      'Ω/km',
      'µΩ/m',
      'mΩ/m',
      'kΩ/m',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Table 9A and appendices express cable resistance in milliohms per metre (mΩ/m). Values must be converted to ohms for circuit calculations (divide by 1000).',
  },
  {
    id: 7,
    question:
      'What correction factor should be applied to tabulated cable resistance values for fault calculations?',
    options: [
      'Correct colour coding or marking as per BS 7671',
      'To ensure all items are systematically checked',
      'Reduce smoke and toxic fumes in fire',
      'Multiply by 1.2 (temperature correction)',
    ],
    correctAnswer: 3,
    explanation:
      'Tabulated values are at 20°C. For fault calculations under operating conditions, multiply by 1.2 to account for conductor temperature rise. This factor is conservative for verification purposes.',
  },
  {
    id: 8,
    question:
      'Calculate the earth fault loop impedance for 30m of 2.5mm² T&E cable with Ze = 0.35Ω. (R1+R2 = 14.82mΩ/m)',
    options: [
      '0.79Ω',
      '0.95Ω',
      '0.44Ω',
      '1.14Ω',
    ],
    correctAnswer: 0,
    explanation:
      'Cable (R1+R2) = 30m × 14.82mΩ/m = 444.6mΩ = 0.445Ω. Zs = Ze + (R1+R2) = 0.35 + 0.445 = 0.795Ω ≈ 0.79Ω at 20°C.',
  },
  {
    id: 9,
    question: 'Why must the Cmin factor (0.95) be applied in fault current calculations?',
    options: [
      'To account for cable heating',
      'To account for supply voltage tolerance',
      'To account for temperature variations',
      'To provide a safety margin',
    ],
    correctAnswer: 1,
    explanation:
      'The Cmin factor (typically 0.95) accounts for the -6% tolerance on nominal supply voltage. This ensures disconnection time calculations remain valid even at minimum supply voltage.',
  },
  {
    id: 10,
    question:
      'At what point in a radial distribution system is the prospective fault current typically highest?',
    options: [
      'At the furthest outlet',
      'At the middle of the circuit',
      'At the origin (distribution board)',
      "At any point - it's constant throughout",
    ],
    correctAnswer: 2,
    explanation:
      'Ipf is highest at the origin where total impedance is lowest. As you move along the circuit, cable impedance adds, increasing total impedance and reducing Ipf. The origin value determines device breaking capacity.',
  },
];

const faqs = [
  {
    question: 'Why do I need to calculate fault current at different points?',
    answer:
      'Fault current varies throughout an installation. At the origin (close to supply), fault current is highest - this determines protective device breaking capacity. At the end of circuits, fault current is lowest - this determines whether the protective device can operate fast enough for automatic disconnection. You must verify both: breaking capacity at the origin and disconnection time at the extremity.',
  },
  {
    question: 'How do I obtain the external earth fault loop impedance (Ze)?',
    answer:
      'Ze can be: 1) Measured at the installation origin with the main earthing conductor disconnected (requires DNO involvement); 2) Calculated from DNO-provided values (typically 0.35Ω max for TN-C-S, 0.8Ω max for TN-S); 3) Measured at the origin with main switch off and supply on, though this includes some installation impedance. For design purposes, use the DNO maximum declared value.',
  },
  {
    question: "What's the difference between phase-phase and phase-earth fault calculations?",
    answer:
      'Phase-phase (line-line) fault current is typically higher as it involves two phase conductors with lower total impedance. Phase-earth fault current is lower due to the protective conductor impedance. For breaking capacity, use the highest fault current (usually phase-phase at the origin). For disconnection time, use earth fault current at the circuit extremity.',
  },
  {
    question: 'Why is transformer impedance given as a percentage?',
    answer:
      'Percentage impedance (%Z) is a convenient way to express transformer impedance relative to its rating. A 5% impedance transformer will produce 1/0.05 = 20 times its full-load current if a bolted fault occurs at its terminals. This standardised method allows quick fault level estimation: Fault current = Full load current / (%Z/100).',
  },
  {
    question: 'How do I account for parallel transformer operation?',
    answer:
      'When transformers operate in parallel, total fault current is the sum of individual contributions (if equal rating and impedance) or calculated from combined impedance. For n identical transformers: combined impedance = individual impedance/n, so fault current is approximately n times the single transformer fault current. This significantly increases fault levels and may require uprated protective devices.',
  },
  {
    question: 'What software tools are available for fault calculations?',
    answer:
      'Common tools include: Amtech ProDesign, Trimble (Cymap), ETAP, PowerCalc, and manufacturer-specific software (Schneider Ecodial, ABB DOC). These handle complex networks with multiple sources, parallel cables, motor contributions, and varying fault positions. For simple radial systems, manual calculation or spreadsheets are adequate.',
  },
];

const HNCModule4Section3_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 3"
            title="Fault Current Calculations"
            description="Calculating prospective fault current, impedances, and verifying protection adequacy."
            tone="purple"
          />

          <TLDR
            points={[
              'Prospective fault current (PFC) sets the breaking capacity needed for every protective device — Ipf at the origin from the DNO is the worst case.',
              'Calculate PFC from transformer rating: Ipf ≈ kVA × 1000 / (√3 × V × Z%) for three-phase. Add network impedance from the DNO.',
              'PFC reduces along the cable run as cable impedance adds — fault current at the DB is lower than at the supply origin, sometimes much lower.',
              'Earth fault loop impedance Z_s = Z_e + (R₁ + R₂) — verify against Table 41.3 Z_s_max for the protective device used (current A4:2026 values, e.g. B32 = 1.37&nbsp;Ω).',
              'BS 7671 Reg 643.7.3.201 makes determination of prospective fault current at origin and other relevant points a mandatory verification activity.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.7.3.201 (Prospective fault current verification)"
            clause="Regulation 643.7.3.201 (Prospective fault current) sets out the requirement that prospective short-circuit current and prospective earth fault current shall be measured, calculated or determined at the origin and other relevant points. This scope facet clarifies the application of the clause within Part 6 inspection and testing."
            meaning={
              <>
                Reg 643.7.3.201 makes the PFC determination a mandatory verification step, not
                an optional design comfort. It must be done at the origin AND at other relevant
                points (DBs, sub-panels, points with reduced fault levels). The figures from
                this verification confirm the breaking capacity of every protective device, the
                adiabatic check on every cable, and the disconnection time at every endpoint.
                Either measure (loop tester at origin and at relevant points) or calculate from
                DNO data plus cable impedance — and document.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 643.7.3.201; DNO connection statement; BS 7671 Appendix 14 (loop impedance)."
          />

          <LearningOutcomes
            outcomes={[
              'Calculate prospective fault current from transformer data',
              'Determine fault current reduction along cable runs',
              'Apply the earth fault loop impedance formula',
              'Use BS 7671 tables for cable impedance values',
              'Apply correction factors for temperature and voltage',
              'Verify protective device adequacy using calculated values',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Prospective Fault Current (Ipf)">
            <p>
              Prospective fault current is the maximum current that would flow if a short-circuit
              of negligible impedance occurred at a given point. It determines the required
              breaking capacity of protective devices.
            </p>
            <p>
              <strong>Fundamental formula:</strong> Ipf = V / Z<sub>total</sub> — where V is system
              voltage and Z is total impedance to fault point.
            </p>
            <p>
              <strong>Components of total impedance (component / symbol / typical values):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Supply network — Zs(supply) — very low (infinite busbar assumption)</li>
              <li>Transformer — ZT — 4-6% of transformer rating</li>
              <li>Cables — Zc — depends on length, size, type</li>
              <li>Switchgear — Zsw — usually negligible</li>
            </ul>
            <p>
              <strong>Three-phase fault:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Highest fault current magnitude</li>
              <li>Symmetrical fault — balanced currents</li>
              <li>Ipf = VL / (√3 × Zph)</li>
              <li>Determines device breaking capacity</li>
            </ul>
            <p>
              <strong>Single-phase fault:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Phase-to-earth or phase-to-neutral</li>
              <li>Lower current than three-phase</li>
              <li>If = Uo / Zs</li>
              <li>Determines disconnection time</li>
            </ul>
            <p>
              <strong>Design rule:</strong> Protective device breaking capacity must exceed Ipf at
              the point of installation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Transformer Impedance and Fault Level">
            <p>
              The transformer is typically the dominant impedance limiting fault current.
              Percentage impedance (%Z) provides a convenient method for fault level estimation.
            </p>
            <p>
              <strong>Transformer fault current formula:</strong> I<sub>fault</sub> = I
              <sub>FL</sub> / (%Z / 100) — where I<sub>FL</sub> = kVA / (√3 × V<sub>L</sub>) for
              three-phase transformers.
            </p>
            <p>
              <strong>Typical transformer fault levels at 400V secondary (rating / %Z / FLC / fault current):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>100kVA — 4% — 144A — 3.6kA</li>
              <li>250kVA — 4% — 361A — 9kA</li>
              <li>500kVA — 5% — 722A — 14.4kA</li>
              <li>1000kVA — 6% — 1443A — 24kA</li>
              <li>2000kVA — 6% — 2887A — 48kA</li>
            </ul>
            <p>
              <strong>Converting %Z to ohms:</strong> Z<sub>T</sub> (Ω) = (%Z / 100) × (V²
              <sub>L</sub> / S) — where S is transformer rating in VA and V<sub>L</sub> is line
              voltage.
            </p>
            <p>
              <strong>Note:</strong> These are approximate values. Actual fault levels depend on
              supply network impedance and transformer exact characteristics.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Cable Impedance and Fault Level Reduction">
            <p>
              Cable impedance comprises resistance (R) and reactance (X). As fault current flows
              through cables, voltage drop reduces available voltage and impedance limits current.
            </p>
            <p>
              <strong>Cable resistance values — copper at 20°C (size mm² / R mΩ/m / R1+R2 for T&amp;E):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1.5 — 12.1 — 24.2</li>
              <li>2.5 — 7.41 — 14.82</li>
              <li>4.0 — 4.61 — 9.22</li>
              <li>6.0 — 3.08 — 6.16</li>
              <li>10.0 — 1.83 — 3.66</li>
              <li>16.0 — 1.15 — 2.30</li>
            </ul>
            <p>R1+R2 values assume CPC is same size as line conductor.</p>
            <p>
              <strong>Calculating cable impedance:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Resistance:</strong> R = r × L (mΩ/m × metres)
              </li>
              <li>
                <strong>Reactance:</strong> X ≈ 0.08 mΩ/m for small cables (often ignored)
              </li>
              <li>
                <strong>Impedance:</strong> Z = √(R² + X²) ≈ R for small cables
              </li>
              <li>
                <strong>Temperature:</strong> multiply by 1.2 for operating temperature
              </li>
            </ul>
            <p>
              <strong>Fault current along a cable:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At origin: Ipf = 15kA (from transformer)</li>
              <li>After 50m of 25mm² cable: cable Z = 50m × 0.727mΩ/m × 2 = 72.7mΩ = 0.073Ω</li>
              <li>
                New fault level (approx): Ipf(reduced) ≈ 230 / (230/15000 + 0.073) ={' '}
                <strong>~12kA</strong>
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> Fault current reduces rapidly along cable runs. This is
              beneficial for downstream device selection but must be verified for disconnection
              times.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Earth Fault Loop Impedance (Zs)">
            <p>
              Earth fault loop impedance determines the fault current that flows during an earth
              fault. This current must be sufficient to operate the protective device within the
              required time.
            </p>
            <p>
              <strong>Loop impedance formula:</strong> Zs = Ze + (R1 + R2).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ze:</strong> external earth fault loop impedance
              </li>
              <li>
                <strong>R1:</strong> resistance of phase conductor
              </li>
              <li>
                <strong>R2:</strong> resistance of protective conductor (CPC)
              </li>
            </ul>
            <p>
              <strong>DNO declared Ze values (system type / maximum Ze / notes):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>TN-C-S (PME) — 0.35Ω — most common UK supply</li>
              <li>TN-S — 0.80Ω — separate earth conductor</li>
              <li>TT — 21Ω (typical RA) — depends on electrode</li>
            </ul>
            <p>
              <strong>Verification process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Calculate Zs:</strong> Zs = Ze + (R1+R2) from design data
              </li>
              <li>
                <strong>2. Apply factor:</strong> Zs(operating) = Zs × 1.2 (temperature)
              </li>
              <li>
                <strong>3. Check against limit:</strong> compare with BS 7671 Table 41.2-41.4
              </li>
              <li>
                <strong>4. Verify disconnection:</strong> ensure Zs ≤ maximum for device
              </li>
              <li>
                <strong>5. Test on site:</strong> measured Zs must be ≤ calculated value
              </li>
            </ul>
            {/* Zs values from canonical source: src/lib/calculators/bs7671-data/protectiveDevices.ts (BS 7671:2018+A4:2026 Table 41.3) */}
            <p>
              <strong>Maximum Zs for 0.4s disconnection — 230V, TN (BS 7671:2018+A4:2026 — device / rating A / max Zs Ω):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Type B MCB — 6 — 7.28</li>
              <li>Type B MCB — 16 — 2.73</li>
              <li>Type B MCB — 32 — 1.37</li>
              <li>Type C MCB — 16 — 1.37</li>
              <li>Type C MCB — 32 — 0.68</li>
            </ul>
            <p>
              <strong>Important:</strong> If calculated Zs exceeds the maximum value, use RCD
              protection (≤30mA for additional protection) or increase conductor sizes.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — transformer fault level:</strong> Calculate the prospective fault
              current at the secondary terminals of a 800kVA, 11kV/400V transformer with 5.5%
              impedance.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1 — calculate full load current: I<sub>FL</sub> = S / (√3 × V<sub>L</sub>)</li>
              <li>
                I<sub>FL</sub> = 800,000 / (1.732 × 400) = <strong>1155A</strong>
              </li>
              <li>
                Step 2 — calculate fault current: I<sub>fault</sub> = I<sub>FL</sub> / (%Z / 100)
              </li>
              <li>
                I<sub>fault</sub> = 1155 / 0.055 = <strong>21kA</strong>
              </li>
              <li>Switchgear must have minimum 25kA rating</li>
            </ul>
            <p>
              <strong>Example 2 — Zs calculation and verification:</strong> A 20A Type B MCB
              protects 25m of 2.5mm² T&amp;E cable. Ze = 0.35Ω. Verify protection is adequate.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1 — calculate circuit impedance</li>
              <li>
                R1+R2 = 25m × 14.82 mΩ/m = 370.5 mΩ = <strong>0.371Ω</strong>
              </li>
              <li>Step 2 — calculate total Zs</li>
              <li>
                Zs = Ze + (R1+R2) = 0.35 + 0.371 = <strong>0.721Ω</strong>
              </li>
              <li>Step 3 — apply temperature factor</li>
              <li>
                Zs(operating) = 0.721 × 1.2 = <strong>0.865Ω</strong>
              </li>
              <li>Step 4 — check against maximum: from BS 7671:2018+A4:2026 Table 41.3 max Zs for 20A Type B = 2.19Ω</li>
              <li>0.865Ω &lt; 2.19Ω — protection adequate</li>
            </ul>
            <p>
              <strong>Example 3 — sub-distribution fault level:</strong> A sub-board is fed by 30m
              of 35mm² SWA from a main board where Ipf = 18kA. Calculate Ipf at the sub-board.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1 — source impedance at main board</li>
              <li>
                Z<sub>source</sub> = V / Ipf = 230 / 18000 = <strong>0.0128Ω</strong>
              </li>
              <li>Step 2 — cable impedance (35mm² copper ≈ 0.524 mΩ/m)</li>
              <li>
                Z<sub>cable</sub> = 30m × 0.524 × 2 = 31.44 mΩ = <strong>0.0314Ω</strong>
              </li>
              <li>Step 3 — total impedance</li>
              <li>
                Z<sub>total</sub> = 0.0128 + 0.0314 = <strong>0.0442Ω</strong>
              </li>
              <li>Step 4 — fault current at sub-board</li>
              <li>
                Ipf = 230 / 0.0442 = <strong>5.2kA</strong>
              </li>
              <li>6kA MCBs adequate at sub-board</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ipf = V/Z</strong> — prospective fault current
              </li>
              <li>
                <strong>I<sub>fault</sub> = FLC / (%Z/100)</strong> — transformer fault
              </li>
              <li>
                <strong>Zs = Ze + (R1+R2)</strong> — loop impedance
              </li>
              <li>
                <strong>If = Uo/Zs</strong> — earth fault current
              </li>
              <li>
                <strong>Zs × 1.2</strong> — temperature correction
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                TN-C-S Ze maximum: <strong>0.35Ω</strong>
              </li>
              <li>
                TN-S Ze maximum: <strong>0.80Ω</strong>
              </li>
              <li>
                Temperature factor: <strong>×1.2</strong>
              </li>
              <li>
                Cmin voltage factor: <strong>0.95</strong>
              </li>
              <li>
                2.5mm² R1+R2: <strong>14.82 mΩ/m</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Forgetting factor of 2</strong> — R1+R2 includes both conductors
                </li>
                <li>
                  <strong>Wrong units</strong> — convert mΩ/m to Ω for calculations
                </li>
                <li>
                  <strong>Ignoring temperature</strong> — use 1.2 factor for verification
                </li>
                <li>
                  <strong>Using measured Ze for design</strong> — use DNO declared values
                </li>
              </ul>
            }
            doInstead="Always include both phase and CPC lengths in R1+R2 (factor of 2 for the round-trip), convert mΩ/m to ohms before adding to Ze, multiply final Zs by 1.2 for temperature, and design against the DNO declared maximum Ze rather than a one-off measurement."
          />

          <SectionRule />

          <Scenario
            title="Z_s verification on a 32 A circuit — checking Table 41.3 with A4:2026 values"
            situation={
              <>
                A 32&nbsp;A B-curve MCB protects a final-circuit ring. Loop impedance measured
                at the furthest socket Z_s = 1.20&nbsp;Ω. The installer thinks this is fine
                because earlier guidance gave Z_s_max ≈ 1.44&nbsp;Ω for B32 (A2 / older edition
                figures). You need to confirm against current A4:2026 values.
              </>
            }
            whatToDo={
              <>
                Open BS 7671:2018+A4:2026 Table 41.3 — current Z_s_max for B32 is 1.37&nbsp;Ω
                (NOT 1.44&nbsp;Ω, which was the older edition). Measured 1.20&nbsp;Ω is below
                1.37&nbsp;Ω so the disconnection time is satisfied. Apply the rule-of-thumb
                0.8 × multiplier for design margin: design Z_s_max = 1.37 × 0.8 = 1.10&nbsp;Ω.
                Measured 1.20 exceeds the 0.8 design margin — investigate. Likely causes:
                higher-than-assumed Z_e, longer cable run, smaller CPC, or warm cables on the
                day of test. Document the measured Z_s, the Table 41.3 limit (A4:2026), and
                whether design margin is met against Reg 643.7.
              </>
            }
            whyItMatters={
              <>
                Using the wrong Z_s_max value (older 1.44 instead of A4:2026 1.37) is a
                regulatory regression. Reg 643.7.3.201 requires the verification to use current
                edition values. Quote the wrong figure on an EIC and the certificate is
                technically non-compliant. A4:2026 also moved B32 from 1.44 to 1.37&nbsp;Ω —
                tighter, but defensible.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Prospective fault current Ipf at origin: Ipf ≈ kVA × 1000 / (√3 × V × Z%) — drives breaking-capacity selection for the entire downstream installation.',
              'PFC reduces along the cable run as cable impedance adds — fault current at the DB is lower than at the supply origin.',
              'Earth fault loop impedance: Z_s = Z_e + (R₁ + R₂). R values come from BS 7671 Table B1 (Cu) corrected for temperature.',
              'Verify Z_s ≤ Z_s_max (Table 41.3, current A4:2026 values: B32 = 1.37&nbsp;Ω, C32 = 0.69&nbsp;Ω, B16 = 2.74&nbsp;Ω). Apply 0.8 design margin for warm cables.',
              'Reg 643.7.3.201 makes PFC determination at origin AND relevant points a mandatory verification step.',
              'Always use the current A4:2026 Z_s_max values — older editions gave different (more lenient) figures.',
              'For 1×IΔn RCD test (NOT 5×IΔn — that was older guidance) — current rule under A4:2026 is single-shot 1×IΔn.',
              'Document PFC, Z_e, R₁ + R₂ and Z_s for every circuit on the schedule of test results — Part 6 audits all of it.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Protective device selection
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Discrimination and coordination
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section3_3;
