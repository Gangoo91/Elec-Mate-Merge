/**
 * Module 7 · Section 1 · Subsection 3 — Cable Sizing Calculations
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Current-carrying capacity, voltage drop, correction factors, thermal constraints and BS 7671 methodology
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Cable Sizing Calculations - HNC Module 7 Section 1.3';
const DESCRIPTION =
  'Master BS 7671 cable sizing methodology: current-carrying capacity, voltage drop calculations, correction factors, grouping factors, thermal constraints and adiabatic equation for fault protection.';

const quickCheckQuestions = [
  {
    id: 'design-current',
    question: 'What is the design current (Ib) in cable sizing?',
    options: [
      'The earth fault loop impedance current',
      'The rated current of the protective device',
      'The maximum fault current the cable can withstand',
      'The current the cable is expected to carry in normal service',
    ],
    correctIndex: 3,
    explanation:
      'The design current (Ib) is the current intended to be carried by the circuit in normal service. It is determined from the connected load and forms the starting point for cable sizing calculations.',
  },
  {
    id: 'correction-factors',
    question: 'What effect do correction factors have on tabulated current ratings?',
    options: [
      'They reduce the effective current-carrying capacity',
      'They have no effect on single cables',
      'They only apply to armoured cables',
      'They always increase the current rating',
    ],
    correctIndex: 0,
    explanation:
      'Correction factors (Ca, Cg, Ci, Cc) account for conditions that reduce heat dissipation. Multiplying the tabulated rating by these factors (all less than or equal to 1) reduces the effective current-carrying capacity.',
  },
  {
    id: 'voltage-drop',
    question:
      'What is the maximum permitted voltage drop for a final circuit according to BS 7671?',
    options: [
      '2.5% of nominal voltage',
      '5% of nominal voltage',
      '3% of nominal voltage',
      '4% of nominal voltage',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 limits voltage drop to 5% of nominal voltage (11.5V for 230V circuits) for final circuits from the origin of the installation. This comprises 3% for distribution circuits and 5% for final circuits when combined.',
  },
  {
    id: 'adiabatic-equation',
    question: 'The adiabatic equation S = sqrt(I squared t) / k is used to determine:',
    options: [
      'The voltage drop in a cable',
      'The grouping factor for multiple cables',
      'The minimum cable size for fault protection',
      'The correction factor for ambient temperature',
    ],
    correctIndex: 2,
    explanation:
      'The adiabatic equation calculates the minimum conductor cross-sectional area required to withstand the thermal effects of fault current for the disconnection time. This ensures the cable can safely carry fault current until the protective device operates.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In the cable sizing equation It ≥ Ib / (Ca × Cg × Ci × Cc), what does It represent?',
    options: [
      'The design current the circuit carries in normal service',
      'The tabulated current-carrying capacity from BS 7671',
      'The rated current of the protective device',
      'The prospective fault current at the origin of the circuit',
    ],
    correctAnswer: 1,
    explanation:
      'It represents the tabulated current-carrying capacity from the appropriate table in BS 7671 Appendix 4. This value must be greater than or equal to the design current divided by all applicable correction factors.',
  },
  {
    id: 2,
    question:
      'A circuit has Ib = 28A. The protective device In = 32A. Ca = 0.87, Cg = 0.65, Ci = 1.0. What is the minimum It required?',
    options: [
      '49.5A',
      '28A',
      '56.6A',
      '32A',
    ],
    correctAnswer: 2,
    explanation:
      'It ≥ In / (Ca × Cg × Ci) = 32 / (0.87 × 0.65 × 1.0) = 32 / 0.566 = 56.6A. Note: We use In (not Ib) because the protective device may allow continuous current up to its rating.',
  },
  {
    id: 3,
    question:
      'What is the ambient temperature correction factor (Ca) for a cable installed where ambient temperature is 40°C when the reference temperature is 30°C?',
    options: [
      '0.82',
      '0.71',
      '0.94',
      '0.87',
    ],
    correctAnswer: 3,
    explanation:
      'From BS 7671 Table 4B1, for thermoplastic (PVC) cables at 40°C ambient, Ca = 0.87. Higher ambient temperatures reduce the temperature differential available for heat dissipation, requiring cable derating.',
  },
  {
    id: 4,
    question:
      'Eight single-core cables are installed in a single conduit. What is the grouping factor (Cg)?',
    options: [
      '0.43',
      '0.38',
      '0.52',
      '0.57',
    ],
    correctAnswer: 0,
    explanation:
      'From BS 7671 Table 4C1, for 8 cables (4 circuits) in a conduit or enclosed space, Cg = 0.43. Grouping multiple cables together reduces their ability to dissipate heat, requiring significant derating.',
  },
  {
    id: 5,
    question:
      'The voltage drop in a circuit is calculated as 8.2V. The nominal voltage is 230V. Does this comply with BS 7671?',
    options: [
      'No, it exceeds the 3% limit for all circuits',
      'Yes, it is within the 5% limit for final circuits',
      'No, voltage drop is never permitted',
      'Yes, it is within the 4% limit',
    ],
    correctAnswer: 1,
    explanation:
      '5% of 230V = 11.5V. The calculated voltage drop of 8.2V is less than 11.5V, therefore it complies with the BS 7671 requirement for voltage drop in final circuits from the origin of the installation.',
  },
  {
    id: 6,
    question:
      'A 2.5mm² thermoplastic cable has a tabulated voltage drop of 18 mV/A/m. For a 25A load over 30m, what is the voltage drop?',
    options: [
      '7.5V',
      '10.5V',
      '13.5V',
      '18V',
    ],
    correctAnswer: 2,
    explanation:
      'Voltage drop = (mV/A/m × Ib × L) / 1000 = (18 × 25 × 30) / 1000 = 13.5V. This exceeds the 11.5V limit for a 230V final circuit, so a larger cable size would be required.',
  },
  {
    id: 7,
    question: "In the adiabatic equation S = √(I²t) / k, what does 'k' represent?",
    options: [
      'The disconnection time of the protective device in seconds',
      'The prospective fault current at the point of the fault',
      'The ambient temperature correction factor for the cable',
      'A factor dependent on conductor and insulation materials',
    ],
    correctAnswer: 3,
    explanation:
      "The 'k' factor is a constant that depends on the conductor material (copper or aluminium) and insulation type (thermoplastic or thermosetting). Values are given in BS 7671 Table 43.1, e.g., k = 115 for PVC-insulated copper conductors.",
  },
  {
    id: 8,
    question:
      'A fault current of 1200A must be disconnected in 0.4s. Using k = 115, what is the minimum conductor size?',
    options: [
      '6.6mm²',
      '4mm²',
      '1.5mm²',
      '2.5mm²',
    ],
    correctAnswer: 0,
    explanation:
      'S = √(I²t) / k = √(1200² × 0.4) / 115 = √(576000) / 115 = 758.9 / 115 = 6.6mm². A 10mm² cable would be the minimum standard size to satisfy this requirement.',
  },
  {
    id: 9,
    question:
      'Which installation method typically provides the highest current-carrying capacity for a given cable size?',
    options: [
      'Cables enclosed in conduit in thermally insulated walls',
      'Cables in free air with spacing',
      'Cables clipped direct to a non-metallic surface',
      'Cables in trunking',
    ],
    correctAnswer: 1,
    explanation:
      'Cables in free air with adequate spacing (Reference Method E/F) have the highest current ratings because air circulation provides excellent heat dissipation. Enclosed installation methods restrict airflow and reduce ratings.',
  },
  {
    id: 10,
    question: 'Thermal insulation contact factor (Ci) of 0.5 applies when:',
    options: [
      'Cable is in contact with thermal insulation on one side',
      'Cable is in ambient temperature above 50°C',
      'Cable is totally surrounded by thermal insulation over 0.5m',
      'Cable passes through thermal insulation',
    ],
    correctAnswer: 2,
    explanation:
      'Ci = 0.5 applies when a cable is totally surrounded by thermal insulation for a distance greater than 0.5m. This severe derating reflects the significant reduction in heat dissipation when insulation prevents cooling.',
  },
  {
    id: 11,
    question:
      'For a motor circuit with starting current of 6× full load current, what consideration affects cable sizing?',
    options: [
      'The cable must be sized on the full starting current for thermal capacity',
      'Starting current has no effect on either voltage drop or cable sizing',
      'The protective device must be rated at 6× the full load current',
      'Starting current affects voltage drop but not continuous rating',
    ],
    correctAnswer: 3,
    explanation:
      'For motor circuits, Ib is based on full load current (not starting current) for thermal sizing. However, starting current causes increased voltage drop which may affect motor starting. BS 7671 Appendix 4 provides guidance on motor circuit voltage drop.',
  },
  {
    id: 12,
    question: 'When selecting cable size, the final choice must satisfy:',
    options: [
      'Current-carrying capacity, voltage drop and fault-current withstand together',
      'Current-carrying capacity only, as voltage drop is checked separately later',
      'Voltage drop only, since the protective device handles fault protection',
      'Fault-current withstand only, as the other checks are advisory',
    ],
    correctAnswer: 0,
    explanation:
      'Cable sizing requires checking three criteria: (1) current-carrying capacity with all correction factors, (2) voltage drop limits, and (3) fault current withstand (adiabatic equation). The cable must satisfy ALL requirements; the largest size from these checks is selected.',
  },
];

const faqs = [
  {
    question: 'Why do we use In rather than Ib when calculating minimum It?',
    answer:
      'The protective device will allow current up to its rated value (In) to flow continuously without tripping. Therefore, the cable must be sized to carry In safely, not just the expected design current Ib. Using In ensures the cable can handle the maximum continuous current the protective device permits. The relationship In ≥ Ib ≥ Iz must be maintained where Iz is the effective current-carrying capacity.',
  },
  {
    question: 'How do I handle multiple correction factors applying simultaneously?',
    answer:
      'When multiple derating conditions exist (e.g., high ambient temperature AND grouped cables AND thermal insulation), multiply all applicable correction factors together: Ct = Ca × Cg × Ci × Cc. This combined factor can become quite small (e.g., 0.87 × 0.65 × 0.75 = 0.42), significantly reducing effective capacity. In practice, this often results in selecting a cable 2-3 sizes larger than would otherwise be needed.',
  },
  {
    question: 'What if voltage drop is the limiting factor rather than current capacity?',
    answer:
      'This commonly occurs on long cable runs. If voltage drop calculations show the current-capacity-sized cable has excessive voltage drop, you must increase the cable size until voltage drop is acceptable. For very long runs, this can result in cables far larger than thermal requirements dictate. Consider running parallel cables or relocating distribution boards to reduce cable lengths.',
  },
  {
    question: 'How does the installation method affect cable sizing?',
    answer:
      'Installation method (Reference Method) dramatically affects current ratings. The same 2.5mm² cable might be rated at 24A when clipped direct (Method C), but only 18.5A when in conduit in an insulated wall (Method A). Always identify the correct reference method from BS 7671 before using the current rating tables. Where installation methods vary along a route, use the most onerous method for the entire cable.',
  },
  {
    question: 'When is the adiabatic equation critical in cable sizing?',
    answer:
      'The adiabatic equation becomes critical where: (1) Prospective fault current is high (typically near the supply origin), (2) Disconnection times are long (e.g., 5s rather than 0.4s), or (3) The cable selected for current capacity is relatively small. For circuits protected by MCBs/RCBOs with fast magnetic trip, the adiabatic check rarely increases cable size. For fuse-protected circuits or those far from supply, always verify.',
  },
  {
    question: 'How do I account for future load growth in cable sizing?',
    answer:
      'BS 7671 requires cables to be sized for the intended load, but good practice includes considering future expansion. Options include: (1) Size for anticipated maximum load from the outset, (2) Apply a diversity factor reduction and size accordingly, (3) Install spare ways in distribution boards with appropriately sized submains. Document any allowances made so future modifications consider the cable limitations.',
  },
];

const HNCModule7Section1_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1 · Subsection 3"
            title="Cable Sizing Calculations"
            description="Current-carrying capacity, voltage drop, correction factors, thermal constraints and BS 7671 methodology"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Apply BS 7671 cable sizing methodology systematically",
              "Calculate effective current-carrying capacity with correction factors",
              "Determine voltage drop and assess compliance",
              "Use the adiabatic equation for fault current protection",
              "Select appropriate reference methods for installation conditions",
              "Verify cable selection satisfies all three sizing criteria",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Fundamental Principles of Cable Sizing">
            <p>Cable sizing is a critical design task that ensures cables can safely carry the intended current without overheating, maintain acceptable voltage at the load, and withstand fault currents until the protective device operates. BS 7671 provides a systematic methodology based on three fundamental checks.</p>
            <p><strong>The three cable sizing criteria:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Current-carrying capacity:</strong> Cable must carry load current without exceeding temperature limits</li>
              <li><strong>Voltage drop:</strong> Voltage at load must remain within acceptable limits</li>
              <li><strong>Fault current protection:</strong> Cable must withstand fault current for disconnection time</li>
            </ul>
            <p><strong>Key Current Values in Cable Sizing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ib:</strong> Design current — Current the circuit is intended to carry in normal service</li>
              <li><strong>In:</strong> Rated current — Nominal current rating of the protective device</li>
              <li><strong>Iz:</strong> Effective capacity — Actual current-carrying capacity after applying correction factors</li>
              <li><strong>It:</strong> Tabulated current — Current rating from BS 7671 tables for given installation method</li>
              <li><strong>I2:</strong> Operating current — Current causing effective operation of protective device</li>
            </ul>
            <p><strong>Fundamental Coordination Requirement</strong></p>
            <p>For safe operation, the following relationship must be satisfied:</p>
            <p>Ib ≤ In ≤ Iz</p>
            <p>The design current must not exceed the protective device rating, which must not exceed the cable's effective current-carrying capacity.</p>
            <p><strong>Design approach:</strong> Start with the load current, select an appropriate protective device, then determine the minimum cable size to satisfy all three criteria.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Correction Factors and Current Capacity">
            <p>The tabulated current ratings in BS 7671 Appendix 4 are based on specific reference conditions. When actual installation conditions differ, correction factors must be applied to determine the effective current-carrying capacity. These factors account for reduced heat dissipation.</p>
            <p><strong>Ca - Ambient Temperature</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reference: 30°C for most installations</li>
              <li>Higher ambient = lower Ca value</li>
              <li>Table 4B1 (thermoplastic insulation)</li>
              <li>Table 4B2 (thermosetting insulation)</li>
              <li>Example: 40°C = Ca 0.87 (PVC)</li>
            </ul>
            <p><strong>Cg - Grouping Factor</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Multiple circuits reduce cooling</li>
              <li>Tables 4C1 to 4C5</li>
              <li>More circuits = lower Cg value</li>
              <li>Example: 6 cables = Cg 0.57</li>
              <li>Spacing can improve rating</li>
            </ul>
            <p><strong>Ci - Thermal Insulation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cables in contact with insulation</li>
              <li>One side: Ci = 0.75 (50mm depth)</li>
              <li>Surrounded &gt;0.5m: Ci = 0.5</li>
              <li>Table 52.2 in BS 7671</li>
              <li>Severe derating applies</li>
            </ul>
            <p><strong>Cc - BS 3036 Fuse Factor</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Semi-enclosed (rewirable) fuses only</li>
              <li>Cc = 0.725</li>
              <li>Fusing factor is 2 (not 1.45)</li>
              <li>MCBs/RCBOs: Cc = 1.0</li>
              <li>Cartridge fuses: Cc = 1.0</li>
            </ul>
            <p><strong>Cable Sizing Formula</strong></p>
            <p>It ≥ In / (Ca × Cg × Ci × Cc)</p>
            <p>The minimum tabulated current rating (It) must be greater than or equal to the protective device rating divided by the product of all applicable correction factors.</p>
            <p><strong>Common Correction Factor Values</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ca:</strong> 35°C ambient (PVC) — 0.94</li>
              <li><strong>Ca:</strong> 40°C ambient (PVC) — 0.87</li>
              <li><strong>Cg:</strong> 2 circuits touching — 0.80</li>
              <li><strong>Cg:</strong> 4 circuits in conduit — 0.65</li>
              <li><strong>Ci:</strong> One side thermal insulation — 0.75</li>
              <li><strong>Cc:</strong> BS 3036 fuse protection — 0.725</li>
            </ul>
            <p><strong>Important:</strong> When no special conditions exist, correction factors equal 1.0 and the tabulated rating applies directly.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Voltage Drop Calculations">
            <p>Voltage drop occurs as current flows through the impedance of cable conductors. Excessive voltage drop reduces equipment efficiency, causes lamps to dim, motors to run hot, and may prevent proper operation. BS 7671 Regulation 525 limits voltage drop to maintain adequate voltage at the point of utilisation.</p>
            <p><strong>BS 7671 Voltage Drop Limits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting circuits:</strong> 3% — 6.9V</li>
              <li><strong>Other circuits:</strong> 5% — 11.5V</li>
              <li><strong>Where supply is within +10%/-6%:</strong> 3% + 5% combined — 18.4V total</li>
            </ul>
            <p><strong>Voltage Drop Formula</strong></p>
            <p>VD = (mV/A/m × Ib × L) / 1000</p>
            <p>Where mV/A/m is the tabulated voltage drop per ampere per metre from BS 7671 Appendix 4, Ib is the design current, and L is the cable length in metres.</p>
            <p><strong>Example Voltage Drop Values (mV/A/m)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1.5mm²:</strong> 29 mV/A/m — 25 mV/A/m</li>
              <li><strong>2.5mm²:</strong> 18 mV/A/m — 15 mV/A/m</li>
              <li><strong>4mm²:</strong> 11 mV/A/m — 9.5 mV/A/m</li>
              <li><strong>6mm²:</strong> 7.3 mV/A/m — 6.4 mV/A/m</li>
              <li><strong>10mm²:</strong> 4.4 mV/A/m — 3.8 mV/A/m</li>
              <li><strong>16mm²:</strong> 2.8 mV/A/m — 2.4 mV/A/m</li>
            </ul>
            <p><strong>Voltage Drop Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Starting conditions:</strong> Motor starting currents cause higher transient voltage drop</li>
              <li><strong>Diversity:</strong> May use actual load rather than circuit rating if justified</li>
              <li><strong>Route length:</strong> Use actual cable length, not straight-line distance</li>
              <li><strong>Temperature:</strong> Higher conductor temperature increases resistance slightly</li>
              <li><strong>Power factor:</strong> For AC circuits, voltage drop has both resistive and reactive components</li>
            </ul>
            <p><strong>Practical note:</strong> On long cable runs, voltage drop often determines the cable size rather than current-carrying capacity.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Thermal Constraints and the Adiabatic Equation">
            <p>During a fault, very high currents flow through the cable conductors. This current generates heat so rapidly that there is no time for it to dissipate to surroundings - the process is essentially adiabatic. The cable must be sized to absorb this energy without the conductor temperature exceeding safe limits for the insulation.</p>
            <p><strong>The Adiabatic Equation</strong></p>
            <p>S = √(I²t) / k</p>
            <p><strong>S</strong> = Minimum conductor cross-sectional area (mm²)</p>
            <p><strong>I</strong> = Fault current in amperes (RMS for AC)</p>
            <p><strong>t</strong> = Operating time of protective device (seconds)</p>
            <p><strong>k</strong> = Factor dependent on conductor and insulation materials</p>
            <p><strong>k Values from BS 7671 Table 43.1</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Copper:</strong> 115 — 143 — 115</li>
              <li><strong>Aluminium:</strong> 76 — 94 — -</li>
            </ul>
            <p><strong>Disconnection Times (BS 7671 Regulation 411)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Final circuits ≤32A:</strong> 0.4s — 0.2s</li>
              <li><strong>Final circuits &gt;32A:</strong> 5s — 1s</li>
              <li><strong>Distribution circuits:</strong> 5s — 1s</li>
            </ul>
            <p><strong>Worked Example: Adiabatic Check</strong></p>
            <p><strong>Given:</strong> Prospective fault current = 2000A, disconnection time = 0.4s, PVC-insulated copper cable, selected cable = 4mm²</p>
            <p>k = 115 (copper/PVC from Table 43.1)</p>
            <p>S = √(I²t) / k</p>
            <p>S = √(2000² × 0.4) / 115</p>
            <p>S = √(1,600,000) / 115</p>
            <p>S = 1264.9 / 115</p>
            <p>S = 11.0mm²</p>
            <p>Result: 4mm² FAILS - minimum 16mm² required</p>
            <p><strong>When Adiabatic Check is Critical</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Near supply origin:</strong> High fault currents near transformer/intake</li>
              <li><strong>Long disconnection times:</strong> 5s for distribution circuits</li>
              <li><strong>Fuse protection:</strong> Slower than MCB magnetic trip</li>
              <li><strong>Small cables:</strong> Limited thermal mass</li>
              <li><strong>CPC sizing:</strong> Often the critical conductor for fault withstand</li>
            </ul>
            <p><strong>Verification requirement:</strong> For every circuit, the selected cable must satisfy: Actual S ≥ Calculated minimum S from the adiabatic equation.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Complete Cable Sizing Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Size a cable for a 9kW single-phase load, 40m from distribution board. Installation: Clipped direct, 35°C ambient, grouped with 3 other circuits.</p>
            <p>Step 1: Calculate design current (Ib)</p>
            <p>Ib = P / V = 9000 / 230 = 39.1A</p>
            <p>Step 2: Select protective device</p>
            <p>In = 40A (MCB Type B)</p>
            <p>Step 3: Determine correction factors</p>
            <p>Ca = 0.94 (35°C ambient, Table 4B1)</p>
            <p>Cg = 0.65 (4 circuits grouped, Table 4C1)</p>
            <p>Ci = 1.0 (no thermal insulation)</p>
            <p>Cc = 1.0 (MCB protection)</p>
            <p>Step 4: Calculate minimum It</p>
            <p>It ≥ In / (Ca × Cg × Ci × Cc)</p>
            <p>It ≥ 40 / (0.94 × 0.65 × 1.0 × 1.0)</p>
            <p>It ≥ 40 / 0.611 = 65.5A</p>
            <p>Step 5: Select cable from Table 4D2A (Method C)</p>
            <p>10mm² = 63A (insufficient)</p>
            <p>16mm² = 85A (satisfactory)</p>
            <p>Step 6: Check voltage drop</p>
            <p>16mm² mV/A/m = 2.8</p>
            <p>VD = (2.8 × 39.1 × 40) / 1000 = 4.4V</p>
            <p>4.4V &lt; 11.5V limit - PASS</p>
            <p>FINAL SELECTION: 16mm² cable</p>
            <p>
              <strong>Example 2: Voltage Drop Limiting Factor</strong>
            </p>
            <p><strong>Scenario:</strong> 20A circuit, 80m cable run, no derating factors apply.</p>
            <p>Current capacity check:</p>
            <p>It ≥ 20A → 2.5mm² (27A rating) sufficient</p>
            <p>Voltage drop check for 2.5mm²:</p>
            <p>VD = (18 × 20 × 80) / 1000 = 28.8V</p>
            <p>28.8V &gt; 11.5V - FAILS</p>
            <p>Try 4mm²:</p>
            <p>VD = (11 × 20 × 80) / 1000 = 17.6V</p>
            <p>17.6V &gt; 11.5V - FAILS</p>
            <p>Try 6mm²:</p>
            <p>VD = (7.3 × 20 × 80) / 1000 = 11.7V</p>
            <p>11.7V &gt; 11.5V - FAILS (marginally)</p>
            <p>Try 10mm²:</p>
            <p>VD = (4.4 × 20 × 80) / 1000 = 7.0V</p>
            <p>7.0V &lt; 11.5V - PASS</p>
            <p>SELECTION: 10mm² (4× larger than thermal requirement)</p>
            <p>
              <strong>Example 3: Three-Phase Motor Circuit</strong>
            </p>
            <p><strong>Scenario:</strong> 15kW three-phase motor, FLC = 28A, 25m run, 45°C ambient.</p>
            <p>Design current:</p>
            <p>Ib = 28A (motor FLC from nameplate)</p>
            <p>In = 32A (MCB selected)</p>
            <p>Correction factors:</p>
            <p>Ca = 0.79 (45°C, Table 4B1)</p>
            <p>Cg = 1.0 (single circuit)</p>
            <p>Minimum tabulated current:</p>
            <p>It ≥ 32 / 0.79 = 40.5A</p>
            <p>From Table 4D2A (4-core SWA):</p>
            <p>6mm² = 41A - satisfactory</p>
            <p>Voltage drop (using 3-phase mV/A/m):</p>
            <p>VD = (6.4 × 28 × 25) / 1000 = 4.5V</p>
            <p>4.5V &lt; 11.5V - PASS</p>
            <p>Starting voltage drop (6× FLC):</p>
            <p>VD start = (6.4 × 168 × 25) / 1000 = 26.9V</p>
            <p>11.7% drop at starting - acceptable for DOL start</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Cable Sizing Procedure Summary:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Determine design current Ib from connected load</li>
              <li>Select protective device with In ≥ Ib</li>
              <li>Identify installation method (Reference Method)</li>
              <li>Determine all applicable correction factors</li>
              <li>Calculate minimum It = In / (Ca × Cg × Ci × Cc)</li>
              <li>Select cable from appropriate table where It(table) ≥ It(calculated)</li>
              <li>Verify voltage drop is within limits</li>
              <li>Check fault current withstand using adiabatic equation</li>
              <li>Select largest size from all three checks</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage drop limit (final circuits): <strong>5% (11.5V at 230V)</strong></li>
              <li>Voltage drop limit (lighting): <strong>3% (6.9V at 230V)</strong></li>
              <li>k factor (copper/PVC): <strong>115</strong></li>
              <li>k factor (copper/XLPE): <strong>143</strong></li>
              <li>BS 3036 correction (Cc): <strong>0.725</strong></li>
              <li>Reference ambient temperature: <strong>30°C</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using Ib instead of In</strong> for calculating minimum It</li>
                <li><strong>Forgetting grouping factors</strong> when cables share containment</li>
                <li><strong>Using wrong reference method</strong> for installation conditions</li>
                <li><strong>Ignoring thermal insulation</strong> in modern buildings</li>
                <li><strong>Not checking all three criteria</strong> before final selection</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Busbar systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Discrimination studies
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section1_3;
