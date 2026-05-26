/**
 * Module 3 · Section 4 · Subsection 5 — Cable Sizing and Voltage Drop in Three-Phase Systems
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   The BS 7671 cable-sizing pipeline — Iz, In, Ib, derating factors, mV/A/m
 *   voltage-drop arithmetic. The bread-and-butter design calculation every BSE
 *   engineer evidences on the design submission.
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

const TITLE = 'Cable Sizing and Voltage Drop in Three-Phase Systems - HNC Module 3 Section 4.5';
const DESCRIPTION =
  'Master three-phase cable sizing using BS 7671 methods, voltage drop calculations with mV/A/m values, derating factors, and practical applications for submains and motor circuits.';

const quickCheckQuestions = [
  {
    id: 'voltage-drop-limit-power',
    question: 'What is the maximum permitted voltage drop for power circuits under BS 7671?',
    options: [
      '4% of supply voltage',
      '6% of supply voltage',
      '3% of supply voltage',
      '5% of supply voltage',
    ],
    correctIndex: 3,
    explanation:
      'BS 7671 permits a maximum voltage drop of 5% for power circuits (20V at 400V three-phase, or 11.5V at 230V single-phase). Lighting circuits are limited to 3%.',
  },
  {
    id: 'three-phase-vd-formula',
    question: 'Which formula calculates voltage drop in a three-phase circuit using mV/A/m values?',
    options: [
      'Vd = mV/A/m × I × L × √3',
      'Vd = mV/A/m × I × L / 1000',
      'Vd = mV/A/m × I × L × 2',
      'Vd = mV/A/m × I × L × 1.732 / 1000',
    ],
    correctIndex: 1,
    explanation:
      'For three-phase circuits, voltage drop = (mV/A/m × Ib × L) / 1000. The mV/A/m values in BS 7671 tables already account for the three-phase configuration - no need for √3 multiplication.',
  },
  {
    id: 'derating-grouping',
    question:
      'When 6 circuits are grouped together in trunking, what is the typical correction factor (Cg)?',
    options: [
      '0.52',
      '0.57',
      '0.80',
      '0.70',
    ],
    correctIndex: 3,
    explanation:
      "For 6 circuits grouped together, Cg ≈ 0.70 (from BS 7671 Table 4C1). This reduces the cable's current-carrying capacity to 70% due to mutual heating between cables.",
  },
  {
    id: 'armoured-cable-use',
    question: 'What is the primary purpose of steel wire armour (SWA) on a cable?',
    options: [
      'Electromagnetic shielding',
      'Improved current capacity',
      'Mechanical protection',
      'Reduced voltage drop',
    ],
    correctIndex: 2,
    explanation:
      'Steel wire armour provides mechanical protection against impact, crushing, and rodent damage. It also provides an earth continuity path and some electromagnetic screening.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A 22kW three-phase motor operates at 400V with 0.85 power factor. What is the design current (Ib)?',
    options: [
      '31.8A',
      '37.4A',
      '55A',
      '64.7A',
    ],
    correctAnswer: 1,
    explanation:
      'Using Ib = P / (√3 × VL × cosφ) = 22000 / (1.732 × 400 × 0.85) = 22000 / 588.9 = 37.4A',
  },
  {
    id: 2,
    question:
      'A 35mm² copper cable has a mV/A/m value of 1.25. What is the voltage drop over 80m carrying 100A (three-phase)?',
    options: [
      '17.32V',
      '5V',
      '10V',
      '8.66V',
    ],
    correctAnswer: 2,
    explanation:
      'Vd = (mV/A/m × I × L) / 1000 = (1.25 × 100 × 80) / 1000 = 10V. This is 2.5% of 400V - acceptable.',
  },
  {
    id: 3,
    question:
      'Which BS 7671 table provides mV/A/m values for armoured cables with copper conductors?',
    options: [
      'Table 4D2A',
      'Table 4D1A',
      'Table 4E4A',
      'Table 4D4A',
    ],
    correctAnswer: 3,
    explanation:
      'Table 4D4A covers armoured 90°C thermosetting cables (XLPE/SWA). Table 4D2A is for thermoplastic (PVC) armoured cables.',
  },
  {
    id: 4,
    question:
      'A cable route passes through 50mm of thermal insulation on one side. What correction factor applies?',
    options: [
      '0.81',
      '0.55',
      '0.70',
      '1.0',
    ],
    correctIndex: 0,
    explanation:
      'For 50mm contact with thermally insulating material on one side, the correction factor (Ci) is approximately 0.81 (BS 7671 Table 4A2). Greater insulation thickness requires lower factors.',
  },
  {
    id: 5,
    question:
      'What ambient temperature correction factor (Ca) applies for 35°C when the cable is rated at 30°C?',
    options: [
      '0.91',
      '0.94',
      '0.79',
      '0.87',
    ],
    correctAnswer: 1,
    explanation:
      'From BS 7671 Table 4B1, for 35°C ambient with 70°C PVC cable rated at 30°C reference, Ca = 0.94. Higher ambients require greater derating.',
  },
  {
    id: 6,
    question:
      'A submain must supply 150A over 45m. What is the maximum acceptable mV/A/m for a 5% voltage drop limit?',
    options: [
      '1.48 mV/A/m',
      '4.44 mV/A/m',
      '2.96 mV/A/m',
      '6.67 mV/A/m',
    ],
    correctAnswer: 2,
    explanation:
      'Maximum Vd = 400V × 5% = 20V. Rearranging: mV/A/m = (Vd × 1000) / (I × L) = (20 × 1000) / (150 × 45) = 2.96 mV/A/m',
  },
  {
    id: 7,
    question: 'When is the √3 factor used in three-phase voltage drop calculations?',
    options: [
      'Always, for all three-phase calculations',
      "Never - it's built into all three-phase tables",
      'Only for line-to-neutral calculations',
      'Only when using ohms/metre resistance values, not mV/A/m',
    ],
    correctAnswer: 3,
    explanation:
      'The √3 factor is only needed when calculating from R (Ω/m) values. BS 7671 mV/A/m values already incorporate the three-phase geometry factor.',
  },
  {
    id: 8,
    question:
      'A motor circuit has 6m from the origin to the distribution board (3% drop) and 25m from the board to the motor. What drop is permitted in the final section?',
    options: [
      '2%',
      '3%',
      '8%',
      '5%',
    ],
    correctAnswer: 0,
    explanation:
      'Total permitted = 5%. Already used = 3%. Remaining = 5% - 3% = 2% for the final circuit. This is a common design constraint in large installations.',
  },
  {
    id: 9,
    question:
      'What is the minimum CSA of aluminium conductor permitted for general use under BS 7671?',
    options: [
      '6mm²',
      '16mm²',
      '10mm²',
      '25mm²',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 Regulation 524.1 requires aluminium conductors to be 16mm² minimum (except for certain specific applications). This accounts for aluminium's lower conductivity and termination requirements.",
  },
  {
    id: 10,
    question:
      'A 4-core SWA cable is installed on a cable tray. Which installation method reference applies?',
    options: [
      'Reference method B',
      'Reference method C',
      'Reference method E',
      'Reference method F',
    ],
    correctAnswer: 2,
    explanation:
      'Reference method E applies to cables in free air on cable tray (perforated or ladder). Method C is for clipped direct to wall, Method F is for cables in enclosed trunking.',
  },
];

const faqs = [
  {
    question:
      'Why do three-phase cables have lower voltage drop than single-phase for the same load?',
    answer:
      'Three-phase power is distributed across three conductors, so each carries less current for the same total power. At 400V three-phase, current is √3 times lower than three separate 230V single-phase circuits would require. Additionally, the magnetic fields partially cancel, reducing inductance and reactive voltage drop.',
  },
  {
    question: 'When should I use aluminium instead of copper cables?',
    answer:
      'Aluminium is typically used for large submains (≥16mm²) where cable cost is significant and space permits the larger conductor size. Copper has 1.68× the conductivity of aluminium, so a 25mm² Al cable is roughly equivalent to a 16mm² Cu cable. Consider termination compatibility - many switchgear requires copper tails.',
  },
  {
    question: 'How do I account for voltage drop when using variable speed drives?',
    answer:
      'VSDs draw non-sinusoidal current containing harmonics. These increase I²R losses and voltage drop. Apply a 1.1 to 1.2 multiplier to calculated voltage drop for standard VSDs. Also consider harmonic currents when sizing the neutral conductor in three-phase systems with VSDs.',
  },
  {
    question: 'What happens if voltage drop exceeds BS 7671 limits?',
    answer:
      'Equipment may malfunction: motors run slower and hotter, electronic equipment may reset or fail, and lighting output reduces. Excessive voltage drop also increases energy losses (I²R) and can cause nuisance tripping of protective devices. The installation would not comply with BS 7671 Regulation 525.1.',
  },
  {
    question: 'How do I size cables for motor starting current?',
    answer:
      "Motor starting current (typically 6-8× full load current) doesn't affect continuous rating but does affect voltage drop during starting. BS 7671 allows temporary voltage drop to exceed 5% during motor starting provided equipment operates satisfactorily. Some specifications limit starting drop to 15%.",
  },
  {
    question: 'Should I upsize cables beyond minimum requirements?',
    answer:
      'Yes, consider future load growth, energy efficiency (lower I²R losses), and reduced operating temperature extending cable life. Voltage drop calculations often drive cable size selection in long runs rather than current capacity. The cost premium for one size larger is often justified.',
  },
];

const HNCModule3Section4_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 5"
            title="Cable Sizing and Voltage Drop in Three-Phase Systems"
            description="Essential design calculations for three-phase distribution, submains and motor circuits"
            tone="purple"
          />

          <TLDR
            points={[
              'You apply BS 7671 Appendix 4 mV/A/m tables to every three-phase voltage-drop calculation — the &radic;3 factor is already baked into the table value.',
              'You stack derating factors multiplicatively (ambient C&#x2090; &times; grouping C&#x2099; &times; thermal insulation C&#x1d62;) to derive the corrected current-carrying capacity Iz.',
              'You verify Ib &le; In &le; Iz on every protected circuit and document the calculation in the schedule of test results.',
              'You combine voltage-drop and Iz constraints on long submains — the longer the run, the more often voltage drop dominates over Iz and forces a cable upsize.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 524.1 (Cross-sectional area of conductors)"
            clause="The cross-sectional area of each conductor in a circuit shall be not less than the values given in Table 52.3, except as provided for extra-low voltage lighting installations according to Regulation 715.524.201."
            meaning={
              <>
                BS 7671 Reg 524.1 + Appendix 4 is the full cable-sizing framework: Table
                4D2A/4D4A etc. give Iz under reference installation methods, then Tables
                4Ab/4Ac etc. apply derating factors. The HNC-grade BSE designer must
                evidence the four-step calc on the design submission: (1) determine Ib;
                (2) select In &ge; Ib (per BS 7671 Reg 433.1.1); (3) compute Iz = It &times;
                C&#x2090; &times; C&#x2099; &times; C&#x1d62;; (4) verify In &le; Iz and
                voltage drop &le; Appendix 4 limit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 524.1 + Reg 525.202 + Appendix 4 Tables 4D&hellip; / 4Aa&hellip;; IET On-Site Guide"
          />

          <LearningOutcomes
            outcomes={[
              'Calculate three-phase voltage drop using mV/A/m values from BS 7671',
              'Apply BS 7671 voltage drop limits (5% power, 3% lighting)',
              'Size cables for current-carrying capacity using derating factors',
              'Select appropriate derating for grouping, ambient and thermal insulation',
              'Differentiate armoured and non-armoured cable applications',
              'Design submain and motor circuits for commercial buildings',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Three-phase cables are sized for both current-carrying capacity (with derating) and voltage drop using mV/A/m values from BS 7671."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage drop formula:</strong> Vd = (mV/A/m × Ib × L) / 1000
              </li>
              <li>
                <strong>Power circuits:</strong> Maximum 5% drop (20V at 400V)
              </li>
              <li>
                <strong>Lighting circuits:</strong> Maximum 3% drop (12V at 400V)
              </li>
              <li>
                <strong>Effective capacity:</strong> It = In / (Ca × Cg × Ci × Cf)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Submains:</strong> Main switchboard to distribution boards
              </li>
              <li>
                <strong>Motor circuits:</strong> HVAC, lifts, pumps
              </li>
              <li>
                <strong>SWA cables:</strong> Underground and external routes
              </li>
              <li>
                <strong>Busbar trunking:</strong> Rising mains in buildings
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Three-Phase Voltage Drop Formula Using mV/A/m">
            <p>
              The mV/A/m (millivolts per ampere per metre) method is the standard approach for
              voltage drop calculations in BS 7671. This value combines both resistive and reactive
              components of the cable impedance into a single figure that can be read directly from
              the tables.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Three-Phase Voltage Drop Formula</p>
            <p>
              Vd = (mV/A/m × I<sub>b</sub> × L) / 1000
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Vd</strong> = Voltage drop (Volts)
              </li>
              <li>
                <strong>mV/A/m</strong> = Table value from BS 7671
              </li>
              <li>
                <strong>I<sub>b</sub></strong> = Design current (Amperes)
              </li>
              <li>
                <strong>L</strong> = Route length (metres)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Important: The √3 Factor</p>
            <p>
              BS 7671 tables provide mV/A/m values that{' '}
              <strong>already include the three-phase geometry factor</strong>. You do NOT multiply
              by √3 when using table values. The √3 factor is only needed when calculating from
              basic resistance values (Ω/m).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Correct (using tables):</strong> Vd = mV/A/m × I × L / 1000
              </li>
              <li>
                <strong>Only if using Ω/m values:</strong> Vd = √3 × I × R × L
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">mV/A/m Values - Typical Examples</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>16mm²:</strong> PVC/Cu 2.4 — XLPE/Cu 2.2 — XLPE/Al 3.6
              </li>
              <li>
                <strong>25mm²:</strong> PVC/Cu 1.5 — XLPE/Cu 1.4 — XLPE/Al 2.3
              </li>
              <li>
                <strong>35mm²:</strong> PVC/Cu 1.1 — XLPE/Cu 1.0 — XLPE/Al 1.65
              </li>
              <li>
                <strong>50mm²:</strong> PVC/Cu 0.78 — XLPE/Cu 0.73 — XLPE/Al 1.2
              </li>
              <li>
                <strong>70mm²:</strong> PVC/Cu 0.55 — XLPE/Cu 0.52 — XLPE/Al 0.86
              </li>
              <li>
                <strong>95mm²:</strong> PVC/Cu 0.41 — XLPE/Cu 0.39 — XLPE/Al 0.64
              </li>
              <li>Values shown are representative - always use BS 7671 tables for actual design</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> XLPE cables have lower mV/A/m values than PVC cables
              because they operate at higher temperatures (90°C vs 70°C) and have lower resistance
              at these temperatures.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="BS 7671 Voltage Drop Limits">
            <p>
              BS 7671 Regulation 525.1 specifies maximum voltage drop limits to ensure equipment
              operates correctly and efficiently. The limits are expressed as percentages of the
              nominal supply voltage.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Maximum Voltage Drop - Standard Requirements
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting circuits:</strong> 3% — 6.9V at 230V (1-ph), 12V at 400V (3-ph)
              </li>
              <li>
                <strong>Power circuits (other uses):</strong> 5% — 11.5V at 230V (1-ph), 20V at
                400V (3-ph)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Important: Total Installation Drop
            </p>
            <p>
              The voltage drop limits apply to the <strong>total</strong> drop from the origin of
              the installation to the point of use. This includes the submain, distribution board
              connections, and final circuit. In large installations, you must apportion the
              available drop between different sections.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Typical Drop Allocation</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Submain:</strong> 2-3% (shared by all circuits)
              </li>
              <li>
                <strong>Final circuit:</strong> 2-3% (remaining allowance)
              </li>
              <li>
                <strong>Total:</strong> 5% maximum for power
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Why Lighting is Stricter</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lumen output drops with voltage</li>
              <li>Visible flicker with voltage variation</li>
              <li>LED drivers may malfunction at low voltage</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Appendix 4 of BS 7671 permits relaxation to 6.5% for submains
              supplying fixed equipment if the equipment manufacturer confirms satisfactory
              operation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Cable Sizing for Current-Carrying Capacity">
            <p>
              Cable selection must satisfy two independent criteria: the cable must safely carry the
              design current without overheating, and the voltage drop must be within limits. Both
              must be checked and the larger cable size used.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">The Cable Sizing Equation</p>
            <p>
              I<sub>t</sub> ≥ I<sub>n</sub> / (C<sub>a</sub> × C<sub>g</sub> × C<sub>i</sub> × C
              <sub>f</sub>)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>I<sub>t</sub></strong> = Tabulated cable capacity (from BS 7671)
              </li>
              <li>
                <strong>I<sub>n</sub></strong> = Protective device rating
              </li>
              <li>
                <strong>C<sub>a</sub></strong> = Ambient temperature factor
              </li>
              <li>
                <strong>C<sub>g</sub></strong> = Grouping factor
              </li>
              <li>
                <strong>C<sub>i</sub></strong> = Thermal insulation factor
              </li>
              <li>
                <strong>C<sub>f</sub></strong> = Semi-enclosed fuse factor (0.725)
              </li>
            </ul>
            <p className="text-sm font-medium text-white">The Design Process</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Calculate design current I<sub>b</sub> from load power
              </li>
              <li>
                Select protective device rating I<sub>n</sub> ≥ I<sub>b</sub>
              </li>
              <li>Determine all applicable correction factors</li>
              <li>
                Calculate minimum I<sub>t</sub> required
              </li>
              <li>
                Select cable with tabulated capacity ≥ calculated I<sub>t</sub>
              </li>
              <li>Verify voltage drop is within limits</li>
              <li>If Vd exceeds limit, upsize cable and recheck</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Current Capacity - Three-Phase Cables (Reference E)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>16mm²:</strong> PVC 70°C 68A — XLPE 90°C 89A — SWA/XLPE 83A
              </li>
              <li>
                <strong>25mm²:</strong> PVC 70°C 89A — XLPE 90°C 119A — SWA/XLPE 110A
              </li>
              <li>
                <strong>35mm²:</strong> PVC 70°C 110A — XLPE 90°C 148A — SWA/XLPE 135A
              </li>
              <li>
                <strong>50mm²:</strong> PVC 70°C 134A — XLPE 90°C 180A — SWA/XLPE 163A
              </li>
              <li>
                <strong>70mm²:</strong> PVC 70°C 171A — XLPE 90°C 232A — SWA/XLPE 207A
              </li>
              <li>
                <strong>95mm²:</strong> PVC 70°C 207A — XLPE 90°C 282A — SWA/XLPE 251A
              </li>
              <li>
                <strong>120mm²:</strong> PVC 70°C 239A — XLPE 90°C 328A — SWA/XLPE 289A
              </li>
              <li>Reference method E: On cable tray (spaced) in free air at 30°C ambient</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Derating Factors (Grouping, Ambient, Thermal Insulation)">
            <p>
              Correction factors account for installation conditions that differ from the reference
              conditions used in the current capacity tables. Each factor reduces the cable's
              effective capacity.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Ambient Temperature Factor (C<sub>a</sub>) - Table 4B1
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>25°C:</strong> PVC 70°C 1.03 — XLPE 90°C 1.02
              </li>
              <li>
                <strong>30°C (reference):</strong> PVC 1.00 — XLPE 1.00
              </li>
              <li>
                <strong>35°C:</strong> PVC 0.94 — XLPE 0.96
              </li>
              <li>
                <strong>40°C:</strong> PVC 0.87 — XLPE 0.91
              </li>
              <li>
                <strong>45°C:</strong> PVC 0.79 — XLPE 0.87
              </li>
              <li>
                <strong>50°C:</strong> PVC 0.71 — XLPE 0.82
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Grouping Factor (C<sub>g</sub>) - Table 4C1
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1 circuit:</strong> Bunched 1.00 — Single-layer tray 1.00 — Ladder
                (spaced) 1.00
              </li>
              <li>
                <strong>2 circuits:</strong> Bunched 0.80 — Tray 0.88 — Ladder 1.00
              </li>
              <li>
                <strong>3 circuits:</strong> Bunched 0.70 — Tray 0.82 — Ladder 0.97
              </li>
              <li>
                <strong>4 circuits:</strong> Bunched 0.65 — Tray 0.77 — Ladder 0.95
              </li>
              <li>
                <strong>6 circuits:</strong> Bunched 0.57 — Tray 0.72 — Ladder 0.93
              </li>
              <li>
                <strong>9 circuits:</strong> Bunched 0.50 — Tray 0.70 — Ladder 0.90
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Thermal Insulation Factor (C<sub>i</sub>) - Table 4A2
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable in free air (no insulation):</strong> 1.00
              </li>
              <li>
                <strong>One side touching thermal insulation:</strong> 0.75 - 0.89
              </li>
              <li>
                <strong>Surrounded by 50mm insulation:</strong> 0.55
              </li>
              <li>
                <strong>Surrounded by 100mm insulation:</strong> 0.50
              </li>
              <li>
                <strong>Surrounded by 200mm+ insulation:</strong> 0.45
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Keep cables away from thermal insulation where possible.
              If unavoidable, use XLPE cables which tolerate higher temperatures better than PVC.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Armoured vs Non-Armoured Cables">
            <p>
              The choice between armoured and non-armoured cables depends on the installation
              environment, mechanical protection requirements, and earth fault loop impedance
              considerations.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Steel Wire Armoured (SWA)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Construction:</strong> Conductors, insulation, bedding, armour, sheath
              </li>
              <li>
                <strong>Protection:</strong> Mechanical damage, impact, crushing
              </li>
              <li>
                <strong>Earth path:</strong> Armour can serve as CPC
              </li>
              <li>
                <strong>Applications:</strong> External, underground, industrial
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Non-Armoured (T+E, NYY, etc.)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Construction:</strong> Conductors, insulation, sheath
              </li>
              <li>
                <strong>Protection:</strong> Minimal - requires conduit/trunking
              </li>
              <li>
                <strong>Earth path:</strong> Separate CPC required
              </li>
              <li>
                <strong>Applications:</strong> Internal, within containment
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Comparison</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mechanical protection:</strong> SWA excellent — non-armoured requires
                containment
              </li>
              <li>
                <strong>Underground burial:</strong> SWA direct burial permitted — non-armoured
                requires duct
              </li>
              <li>
                <strong>Cost (cable only):</strong> SWA higher — non-armoured lower
              </li>
              <li>
                <strong>Installation labour:</strong> SWA more termination time — non-armoured
                faster to terminate
              </li>
              <li>
                <strong>Flexibility:</strong> SWA stiffer, larger bend radius — non-armoured more
                flexible
              </li>
              <li>
                <strong>Electromagnetic screening:</strong> SWA some screening — non-armoured none
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 requirement:</strong> Where mechanical protection is required
              (Regulation 522.6), SWA cable or equivalent protection must be provided. External
              cables should be armoured unless installed in metallic conduit or similar.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="SWA Cable Installation">
            <p>
              Correct installation and termination of SWA cables is essential for mechanical
              protection, electrical safety, and compliance with BS 7671. The armour must be
              properly terminated and earthed at each end.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">SWA Termination Components</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable gland:</strong> CW, BW, or indoor gland types
              </li>
              <li>
                <strong>Gland plate:</strong> Earthed connection to enclosure
              </li>
              <li>
                <strong>Shroud:</strong> Weather protection for outdoor use
              </li>
              <li>
                <strong>Earth tag:</strong> Supplementary earth connection
              </li>
              <li>
                <strong>Locknut:</strong> Secures gland to enclosure
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Gland Type Selection</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CW (compound weatherproof):</strong> External, underground — IP66/IP68
              </li>
              <li>
                <strong>BW (brass weatherproof):</strong> External, above ground — IP66
              </li>
              <li>
                <strong>Indoor gland:</strong> Internal only — IP40
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Underground Installation</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum 600mm depth (750mm under roads)</li>
              <li>Cable warning tape 150mm above</li>
              <li>Fine sand bedding and surround</li>
              <li>Route marker posts at changes</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Surface Installation</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cleats at maximum 450mm centres</li>
              <li>Support within 300mm of terminations</li>
              <li>Minimum bend radius = 6 × cable diameter</li>
              <li>UV-resistant outer sheath for external</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Critical Safety Point</p>
            <p>
              The armour must be earthed at <strong>both ends</strong> of the cable. This provides
              the low-impedance fault path required for protective device operation. Use the armour
              earth tag connection and verify continuity during commissioning testing.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Volt Drop Calculators and Tables">
            <p>
              BS 7671 Appendix 4 provides comprehensive tables for voltage drop calculations.
              Understanding how to navigate these tables and apply the values is essential for
              design work.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Key BS 7671 Tables for Voltage Drop
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>4D1B:</strong> Single-core PVC non-armoured — Copper
              </li>
              <li>
                <strong>4D2B:</strong> Multi-core PVC non-armoured — Copper
              </li>
              <li>
                <strong>4D4B:</strong> Multi-core XLPE armoured (SWA) — Copper
              </li>
              <li>
                <strong>4E2B:</strong> Multi-core PVC non-armoured — Aluminium
              </li>
              <li>
                <strong>4E4B:</strong> Multi-core XLPE armoured (SWA) — Aluminium
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Calculator Method - Step by Step</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Calculate design current: I<sub>b</sub> = P / (√3 × V<sub>L</sub> × cosφ)
              </li>
              <li>
                Calculate maximum mV/A/m: mV/A/m<sub>max</sub> = (V<sub>d max</sub> × 1000) / (I
                <sub>b</sub> × L)
              </li>
              <li>
                Select cable from tables where mV/A/m ≤ mV/A/m<sub>max</sub>
              </li>
              <li>
                Verify current capacity: I<sub>t</sub> × correction factors ≥ I<sub>b</sub>
              </li>
              <li>
                Calculate actual Vd: V<sub>d</sub> = (mV/A/m × I<sub>b</sub> × L) / 1000
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Reverse Calculation - Maximum Cable Length
            </p>
            <p>
              L<sub>max</sub> = (V<sub>d max</sub> × 1000) / (mV/A/m × I<sub>b</sub>)
            </p>
            <p>Useful for determining if a given cable size can serve a distant load.</p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Software tools:</strong> Software packages like Amtech, Trimble, and Conisio
              calculate voltage drop automatically. However, understanding the manual method is
              essential for verifying results and for examination purposes.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Building Services: Submain Sizing and Motor Circuits">
            <p>
              Commercial and industrial buildings require careful coordination of submain and final
              circuit voltage drops. Large motor loads present particular challenges due to starting
              currents and power factor considerations.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Submain Design Considerations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Load diversity:</strong> Apply diversity factors to connected load
              </li>
              <li>
                <strong>Future growth:</strong> Typically 20-30% spare capacity
              </li>
              <li>
                <strong>Voltage drop budget:</strong> Reserve 2-3% for submain, leaving 2-3% for
                finals
              </li>
              <li>
                <strong>Fault level:</strong> Check prospective fault current at distribution boards
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Motor Circuit Sizing</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>7.5kW:</strong> FLC 15A — start 90-120A — typical cable 4mm²
              </li>
              <li>
                <strong>11kW:</strong> FLC 22A — start 130-175A — typical cable 6mm²
              </li>
              <li>
                <strong>15kW:</strong> FLC 29A — start 175-230A — typical cable 10mm²
              </li>
              <li>
                <strong>22kW:</strong> FLC 42A — start 250-340A — typical cable 16mm²
              </li>
              <li>
                <strong>37kW:</strong> FLC 70A — start 420-560A — typical cable 25mm²
              </li>
              <li>
                <strong>55kW:</strong> FLC 100A — start 600-800A — typical cable 35mm²
              </li>
              <li>At 400V, 0.85 power factor. Starting current 6-8× full load for DOL start</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Variable Speed Drives (VSDs)</p>
            <p>
              VSDs eliminate high starting currents and allow soft starting, but introduce harmonic
              currents that can increase voltage drop and heating. When sizing cables for VSD-fed
              motors:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Apply 1.1-1.2 multiplier to calculated voltage drop</li>
              <li>Consider screened cables for EMC compliance</li>
              <li>Size neutral for harmonics in multi-drive installations</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Three-Phase Submain</p>
            <p>
              <strong>Question:</strong> A 200A submain runs 65m from the main switchboard to a
              distribution board. Select a suitable SWA/XLPE copper cable and verify voltage drop.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Design current I<sub>b</sub> = 200A
              </li>
              <li>
                Protective device I<sub>n</sub> = 200A MCCB
              </li>
              <li>
                Assume: 35°C ambient (C<sub>a</sub> = 0.96), no grouping (C<sub>g</sub> = 1.0)
              </li>
              <li>
                Required I<sub>t</sub> = 200 / 0.96 = 208A minimum
              </li>
              <li>From Table 4D4A (col 7): 70mm² = 207A, 95mm² = 251A</li>
              <li>
                Select <strong>95mm² 4-core SWA/XLPE</strong> (I<sub>t</sub> = 251A)
              </li>
              <li>mV/A/m from Table 4D4B = 0.42 mV/A/m</li>
              <li>
                V<sub>d</sub> = (0.42 × 200 × 65) / 1000 = <strong>5.46V</strong>
              </li>
              <li>
                As percentage: (5.46 / 400) × 100 = <strong>1.37%</strong>
              </li>
              <li>Acceptable - leaves 3.63% for final circuits</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 2: Motor Circuit with Derating
            </p>
            <p>
              <strong>Question:</strong> A 30kW chiller motor (pf = 0.85) is located 45m from the
              distribution board. The cable runs with 4 other circuits in trunking at 40°C ambient.
              Size the cable.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                I<sub>b</sub> = 30000 / (1.732 × 400 × 0.85) = 50.9A
              </li>
              <li>
                Select I<sub>n</sub> = 63A MCCB
              </li>
              <li>Correction factors:</li>
              <li>
                C<sub>a</sub> = 0.87 (40°C, PVC 70°C)
              </li>
              <li>
                C<sub>g</sub> = 0.65 (5 circuits grouped)
              </li>
              <li>
                Required I<sub>t</sub> = 63 / (0.87 × 0.65) = 111.4A
              </li>
              <li>From Table 4D2A (Method B): 25mm² = 89A, 35mm² = 110A, 50mm² = 134A</li>
              <li>
                Select <strong>50mm² 4-core PVC</strong>
              </li>
              <li>Check voltage drop (max 2% available = 8V):</li>
              <li>mV/A/m = 0.78</li>
              <li>
                V<sub>d</sub> = (0.78 × 50.9 × 45) / 1000 = <strong>1.79V (0.45%)</strong>
              </li>
              <li>Acceptable for both current and voltage drop</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 3: Maximum Cable Run Length
            </p>
            <p>
              <strong>Question:</strong> What is the maximum run length for a 16mm² copper SWA/XLPE
              cable supplying an 80A three-phase load with 3% voltage drop limit?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Maximum V<sub>d</sub> = 400V × 3% = 12V
              </li>
              <li>mV/A/m for 16mm² SWA/XLPE = 2.2 (from Table 4D4B)</li>
              <li>
                L<sub>max</sub> = (V<sub>d max</sub> × 1000) / (mV/A/m × I<sub>b</sub>)
              </li>
              <li>
                L<sub>max</sub> = (12 × 1000) / (2.2 × 80)
              </li>
              <li>
                L<sub>max</sub> = 12000 / 176 = <strong>68.2m maximum</strong>
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>
                  V<sub>d</sub> = (mV/A/m × I<sub>b</sub> × L) / 1000
                </strong>{' '}
                — Three-phase voltage drop
              </li>
              <li>
                <strong>
                  I<sub>b</sub> = P / (√3 × V<sub>L</sub> × cosφ)
                </strong>{' '}
                — Three-phase design current
              </li>
              <li>
                <strong>
                  I<sub>t</sub> ≥ I<sub>n</sub> / (C<sub>a</sub> × C<sub>g</sub> × C<sub>i</sub>)
                </strong>{' '}
                — Required cable capacity
              </li>
              <li>
                <strong>
                  L<sub>max</sub> = (V<sub>d max</sub> × 1000) / (mV/A/m × I<sub>b</sub>)
                </strong>{' '}
                — Maximum cable length
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Power circuit limit: <strong>5%</strong> (20V at 400V)
              </li>
              <li>
                Lighting circuit limit: <strong>3%</strong> (12V at 400V)
              </li>
              <li>
                Typical motor power factor: <strong>0.85</strong>
              </li>
              <li>
                Motor starting current: <strong>6-8× full load</strong>
              </li>
              <li>
                Minimum aluminium CSA: <strong>16mm²</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common cable sizing and voltage drop mistakes"
            whatHappens={
              <>
                Multiplying mV/A/m values by √3 — they already include this factor. Forgetting
                derating for grouping or ambient. Ignoring the submain drop when calculating final
                circuits. Using the wrong table for the cable type or installation method. Using
                single-phase mV/A/m values for three-phase circuits.
              </>
            }
            doInstead={
              <>
                Use mV/A/m straight from BS 7671 tables — no √3 multiplier. Always apply Ca, Cg
                and Ci. Sum submain and final-circuit drops to check the 5% (or 3%) limit. Match
                the table to your actual cable type (PVC vs XLPE, armoured vs non) and reference
                method. Pick the correct three-phase column.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Sizing a 110 m submain to a roof-top plantroom"
            situation={
              <>
                A roof-top plantroom MCC carries a continuous 165 A three-phase load
                (mostly AHU and pump motors via VSDs). Cable run: 110 m up a ventilated
                riser, ambient 35&deg;C, four similar circuits in the same tray (grouping
                factor C&#x2099; = 0.77). Permitted voltage drop on this distribution leg
                is 2.5 % (leaving 2.5 % for final circuits within the plantroom).
            </>
            }
            whatToDo={
              <>
                Step 1 — Ib = 165 A. Step 2 — In = 200 A MCCB (next standard step). Step 3 —
                target Iz: try 95 mm&sup2; XLPE/SWA Cu, Method E, It = 271 A; with
                C&#x2090;(35&deg;C) = 0.96 and C&#x2099; = 0.77 &rarr; Iz = 271 &times;
                0.96 &times; 0.77 = 200 A &mdash; matches In, satisfies Iz &ge; In. Step 4 —
                voltage drop: 95 mm&sup2; XLPE/SWA mV/A/m (4D4B) = 0.50 &rarr; Vd =
                (0.50 &times; 165 &times; 110) / 1000 = 9.08 V = 2.27 % &mdash; within
                2.5 % budget. Cable verified.
              </>
            }
            whyItMatters={
              <>
                Underspec&rsquo;d submains either trip protection on overload, droop
                voltage on motor starts, or overheat insulation. All three cost six-figure
                remedials on commercial fit-outs because submains are concealed in risers.
                The four-step BS 7671 cable-sizing pipeline is the BSE engineer&rsquo;s
                primary defence against all three failure modes.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 cable-sizing pipeline: Ib &rarr; In &rarr; Iz &rarr; voltage drop &mdash; check all four every time.',
              'Voltage drop limits (Appendix 4 &sect;6.4): 3 % lighting, 5 % other (single-phase); 5 % cumulative on three-phase distribution + final circuits.',
              'Three-phase voltage drop = (mV/A/m &times; I &times; L) / 1000 &mdash; the &radic;3 is already baked into the mV/A/m table value.',
              'Derating factors stack multiplicatively: Iz = It &times; C&#x2090;(ambient) &times; C&#x2099;(grouping) &times; C&#x1d62;(insulation).',
              'In &le; Iz at all times &mdash; protective device must not allow current that exceeds the corrected cable capacity (Reg 433.1.1).',
              'Long submains: voltage drop usually dominates over Iz at runs &gt; 80&ndash;100 m on typical building services loads.',
              'Armoured cable (SWA) preferred for submains (mechanical protection + earth-fault path); thermosetting (XLPE/EPR) for higher operating temperature than PVC.',
              'Always document the calculation on the design submission and on the schedule of test results &mdash; assessors check it.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Three-Phase Power
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Earthing and Protective Devices
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section4_5;
