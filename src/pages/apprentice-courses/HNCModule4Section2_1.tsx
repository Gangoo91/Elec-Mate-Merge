/**
 * Module 4 · Section 2 · Subsection 1 — Current-Carrying Capacity
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   BS 7671 Appendix 4 tables, the seven installation reference methods (A-G), the
 *   Ib ≤ In ≤ Iz hierarchy, and how to convert tabulated It into safe Iz once the
 *   correction factors (Ca, Cg, Ci) are applied.
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

const TITLE = 'Current-Carrying Capacity - HNC Module 4 Section 2.1';
const DESCRIPTION =
  'Master cable current-carrying capacity calculations using BS 7671 Appendix 4 tables, installation reference methods and the It calculation process for building services.';

const quickCheckQuestions = [
  {
    id: 'reference-method-c',
    question:
      'Which installation reference method applies to cables clipped directly to a wall surface?',
    options: [
      'Reference Method A',
      'Reference Method B',
      'Reference Method C',
      'Reference Method D',
    ],
    correctIndex: 2,
    explanation:
      'Reference Method C applies to cables clipped directly to a non-metallic surface such as a wall or ceiling. This is one of the most common installation methods in building services.',
  },
  {
    id: 'appendix-4-purpose',
    question: 'What is the primary purpose of BS 7671 Appendix 4 tables?',
    options: [
      'To specify cable colours',
      'To provide current-carrying capacities for different installation conditions',
      'To list cable manufacturers',
      'To specify conduit sizes',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Appendix 4 provides tabulated current-carrying capacities (It) for different cable types, sizes and installation methods, which are fundamental to cable selection.',
  },
  {
    id: 'it-meaning',
    question: "What does 'It' represent in cable sizing calculations?",
    options: [
      'Installation temperature',
      'Tabulated current-carrying capacity',
      'Total current',
      'Test current',
    ],
    correctIndex: 1,
    explanation:
      'It is the tabulated current-carrying capacity from BS 7671 Appendix 4. This value must be adjusted using correction factors to determine the actual current the cable can safely carry.',
  },
  {
    id: 'cable-selection-first',
    question: 'What is the first step in the cable selection process?',
    options: [
      'Select the protective device',
      'Determine the design current (Ib)',
      'Calculate voltage drop',
      'Choose the installation method',
    ],
    correctIndex: 1,
    explanation:
      'The first step is always to determine the design current (Ib) - the current the circuit will actually carry in normal operation. All subsequent sizing decisions depend on this value.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which BS 7671 Appendix 4 table would you use for single-core PVC cables in conduit?',
    options: ['Table 4D1A', 'Table 4D2A', 'Table 4D5', 'Table 4E1A'],
    correctAnswer: 0,
    explanation:
      'Table 4D1A covers single-core PVC cables installed in conduit in an insulated wall (Reference Method A) or enclosed in trunking (Reference Method B).',
  },
  {
    id: 2,
    question: 'A 10kW single-phase load at 230V has what design current (Ib)?',
    options: ['10A', '23A', '43.5A', '100A'],
    correctAnswer: 2,
    explanation:
      'Ib = P/V = 10,000W / 230V = 43.5A. This is the starting point for cable selection.',
  },
  {
    id: 3,
    question: 'What is Reference Method E in BS 7671?',
    options: [
      'Cables in conduit in an insulated wall',
      'Cables clipped directly to a surface',
      'Cables on perforated cable tray',
      'Cables buried in the ground',
    ],
    correctAnswer: 2,
    explanation:
      'Reference Method E applies to multicore cables on perforated cable tray, which allows air circulation and provides good cooling.',
  },
  {
    id: 4,
    question: 'Why do cables in thermal insulation have reduced current-carrying capacity?',
    options: [
      'The insulation is conductive',
      'Heat cannot dissipate effectively',
      'The cable becomes shorter',
      'Voltage drop increases',
    ],
    correctAnswer: 1,
    explanation:
      'Thermal insulation prevents heat from dissipating from the cable. Since the cable cannot cool effectively, its current-carrying capacity must be reduced to prevent overheating.',
  },
  {
    id: 5,
    question: 'For a circuit with Ib = 25A, the protective device In must be:',
    options: [
      'Exactly 25A',
      'Less than 25A',
      'Greater than or equal to 25A',
      'Twice the design current',
    ],
    correctAnswer: 2,
    explanation:
      'The fundamental relationship is Ib ≤ In ≤ Iz. The protective device rating (In) must be at least equal to the design current (Ib) to avoid nuisance tripping.',
  },
  {
    id: 6,
    question: 'Which installation method typically provides the highest current-carrying capacity?',
    options: [
      'Reference Method A - enclosed in insulated wall',
      'Reference Method B - enclosed in trunking',
      'Reference Method C - clipped direct',
      'Reference Method E - on perforated cable tray',
    ],
    correctAnswer: 3,
    explanation:
      'Reference Method E (perforated cable tray) provides the best cooling due to free air circulation around the cable, giving the highest current-carrying capacity.',
  },
  {
    id: 7,
    question:
      'A 6mm² twin and earth cable clipped direct (Method C) has It = 47A. What does this mean?',
    options: [
      'The cable will melt at 47A',
      'The cable can continuously carry 47A under standard conditions',
      'The protective device must be 47A',
      '47A is the maximum fault current',
    ],
    correctAnswer: 1,
    explanation:
      'It = 47A means the cable can continuously carry 47A under the standard reference conditions specified in BS 7671 (30°C ambient, no grouping, not in thermal insulation).',
  },
  {
    id: 8,
    question: 'What is the relationship between Iz and It when correction factors are applied?',
    options: [
      'Iz = It × correction factors',
      'Iz = It / correction factors',
      'Iz = It + correction factors',
      'Iz = It - correction factors',
    ],
    correctAnswer: 1,
    explanation:
      'Iz = It / (Ca × Cg × Ci × Cc). Because correction factors account for adverse conditions, they reduce the effective current-carrying capacity, hence division.',
  },
  {
    id: 9,
    question: 'For three-phase balanced loads, what formula calculates design current?',
    options: ['Ib = P / V', 'Ib = P / (√3 × VL)', 'Ib = P / (√3 × VL × pf)', 'Ib = 3 × P / V'],
    correctAnswer: 2,
    explanation:
      'For three-phase: Ib = P / (√3 × VL × pf), where VL is the line voltage (400V) and pf is the power factor. This accounts for the three-phase power relationship.',
  },
  {
    id: 10,
    question:
      'Why is it important to select the correct reference method before consulting Appendix 4?',
    options: [
      'It determines the cable colour',
      'It determines which table to use and the tabulated capacity',
      'It affects the cable length calculation',
      'It specifies the conduit size required',
    ],
    correctAnswer: 1,
    explanation:
      'The installation reference method determines which table in Appendix 4 applies and significantly affects the tabulated current values. The same cable has different capacities depending on installation method.',
  },
];

const faqs = [
  {
    question: 'What is the difference between Ib, In, Iz and It?',
    answer:
      'Ib is the design current - the actual current the circuit will carry. In is the protective device rating. Iz is the effective current-carrying capacity after applying correction factors. It is the tabulated current from BS 7671 tables under reference conditions. The fundamental relationship is Ib ≤ In ≤ Iz.',
  },
  {
    question: 'How do I choose between different installation methods?',
    answer:
      'The reference method is determined by how the cable is actually installed. Method A is for cables in conduit in insulated walls, Method B for cables in trunking on walls, Method C for cables clipped direct, Method D for cables in ducts in the ground, and Method E for cables on cable tray. Choose the method that matches your actual installation.',
  },
  {
    question: 'What if my cable passes through different installation conditions?',
    answer:
      'Apply the most onerous (worst) conditions along the cable route. For example, if a cable run passes through thermal insulation for part of its length, apply the thermal insulation correction factor to the entire cable. The cable size must be adequate for the worst-case conditions.',
  },
  {
    question: 'Can I use a higher rated cable than calculated?',
    answer:
      'Yes, you can always use a larger cable than minimum calculated size. This may be beneficial for reducing voltage drop, allowing for future load growth, or improving energy efficiency through reduced I²R losses. However, ensure the protective device can still provide adequate fault protection.',
  },
];

const HNCModule4Section2_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 1"
            title="Current-Carrying Capacity"
            description="Using BS 7671 Appendix 4 tables and installation reference methods for safe cable selection."
            tone="purple"
          />

          <TLDR
            points={[
              'Cable selection hierarchy: I_b (design current) ≤ I_n (device rating) ≤ I_z (cable capacity after derating).',
              'BS 7671 Appendix 4 gives I_t (tabulated current) under reference conditions; you derate for grouping (Cg), ambient (Ca), thermal insulation (Ci) and harmonics (Cf).',
              'Reference method (A–G) is set by how the cable is installed — clipped direct, in conduit, in trunking, on a tray, in a duct, in thermal insulation. Get the method wrong and your I_z is wrong.',
              'For three-phase circuits with high triplen-harmonic content (>33% 3rd), Appendix 11 sets a fourth derating factor for neutral loading.',
              'BS 7671 Reg 311.1 obliges design within thermal limits and admissible voltage drop — current-carrying capacity is the &lsquo;thermal limits&rsquo; half of that duty.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 311.1 (Maximum demand and diversity, design within thermal limits)"
            clause="For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined as required by Regulation 311.1. This determination is mandatory to ensure conductor and protective device sizing are appropriate."
            meaning={
              <>
                Reg 311.1 explicitly ties cable sizing to &lsquo;thermal limits and admissible
                voltage drop&rsquo;. The thermal-limits half is delivered by Appendix 4: pick
                the right reference method for the actual installation, apply every derating
                factor that applies (Cg, Ca, Ci, Cf), and verify that the resulting I_z is at
                least equal to I_n. Skip a derating factor and the cable runs above its design
                temperature, accelerates insulation ageing and ultimately fails — often as a
                fire.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 311.1; BS 7671 Appendix 4 (Current-carrying capacity); BS 7671 Appendix 11 (Effect of harmonic content)."
          />

          <LearningOutcomes
            outcomes={[
              'Navigate BS 7671 Appendix 4 current-carrying capacity tables',
              'Identify and apply correct installation reference methods',
              'Calculate design current for single and three-phase loads',
              'Apply the cable selection hierarchy: Ib ≤ In ≤ Iz',
              'Select appropriate tables for different cable types',
              'Understand the relationship between It and actual capacity',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="BS 7671 Appendix 4 Tables">
            <p>
              Appendix 4 of BS 7671 contains the authoritative tables for cable current-carrying
              capacity. These tables provide the tabulated current (It) under reference conditions
              which must then be adjusted for actual installation conditions.
            </p>
            <p>
              <strong>Key Appendix 4 tables:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>4D1A:</strong> single-core PVC (copper) — conduit, trunking installations
              </li>
              <li>
                <strong>4D2A:</strong> multicore PVC (copper) — twin &amp; earth, flat cables
              </li>
              <li>
                <strong>4D5:</strong> multicore 70°C thermoplastic — flexible cords
              </li>
              <li>
                <strong>4E1A:</strong> single-core XLPE (copper) — high temperature applications
              </li>
              <li>
                <strong>4E2A:</strong> multicore XLPE (copper) — SWA cables, higher ratings
              </li>
              <li>
                <strong>4E4A:</strong> multicore XLPE armoured — SWA power distribution
              </li>
            </ul>
            <p>
              <strong>Reference conditions (assumed by all tabulated values):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Ambient temperature: <strong>30°C</strong> (or 25°C for buried cables)
              </li>
              <li>
                Single circuit: <strong>no grouping</strong> with other cables
              </li>
              <li>
                Installation: <strong>not in thermal insulation</strong>
              </li>
              <li>
                Conductor: operating at <strong>maximum temperature</strong>
              </li>
            </ul>
            <p>
              <strong>Remember:</strong> Tables ending in 'A' are for copper conductors; those
              ending in 'B' are for aluminium.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Installation Reference Methods">
            <p>
              The installation reference method defines how a cable is installed and directly
              affects its current-carrying capacity. Better cooling means higher capacity;
              restricted heat dissipation means lower capacity.
            </p>
            <p>
              <strong>BS 7671 reference methods (description / cooling):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>A:</strong> enclosed in conduit in thermally insulated wall — poorest
              </li>
              <li>
                <strong>B:</strong> enclosed in conduit/trunking on wall or ceiling — poor
              </li>
              <li>
                <strong>C:</strong> clipped direct to surface — moderate
              </li>
              <li>
                <strong>D:</strong> in ducts in the ground — ground temperature dependent
              </li>
              <li>
                <strong>E:</strong> free air or perforated cable tray — good
              </li>
              <li>
                <strong>F:</strong> single-core touching on tray — good
              </li>
              <li>
                <strong>G:</strong> single-core spaced on tray — best
              </li>
            </ul>
            <p>
              <strong>Building services usage:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Method B:</strong> office trunking systems
              </li>
              <li>
                <strong>Method C:</strong> SWA to plant rooms
              </li>
              <li>
                <strong>Method E:</strong> risers, plant rooms
              </li>
              <li>
                <strong>Method D:</strong> external supplies
              </li>
            </ul>
            <p>
              <strong>Capacity comparison (6mm² Cu):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Method A: 32A</li>
              <li>Method B: 36A</li>
              <li>Method C: 47A</li>
              <li>Method E: 51A</li>
            </ul>
            <p>
              <strong>Selection tip:</strong> Using Method E (cable tray) instead of Method B
              (trunking) can allow a smaller cable size, reducing material costs.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Design Current Calculation (Ib)">
            <p>
              The design current (Ib) is the current the circuit is expected to carry in normal
              service. This is the starting point for all cable selection calculations and must be
              accurately determined.
            </p>
            <p>
              <strong>Design current formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-phase:</strong> Ib = P / (V × pf) — resistive loads: pf = 1
              </li>
              <li>
                <strong>Three-phase:</strong> Ib = P / (√3 × VL × pf) — VL = 400V line voltage
              </li>
            </ul>
            <p>
              <strong>Typical design currents (load / power / supply / Ib):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Water heater / 3kW / 230V 1φ / 13.0A</li>
              <li>Electric shower / 9.5kW / 230V 1φ / 41.3A</li>
              <li>AHU motor (pf 0.85) / 11kW / 400V 3φ / 18.7A</li>
              <li>Chiller (pf 0.85) / 45kW / 400V 3φ / 76.4A</li>
              <li>Lift motor / 22kW / 400V 3φ / 37.4A</li>
            </ul>
            <p>
              <strong>Motor circuits:</strong> Allow for starting current (typically 6-8× full load)
              when selecting protective devices, though cable sizing is based on running current.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Cable Selection Process">
            <p>
              Cable selection follows a systematic process ensuring the cable is adequately rated
              for both normal load current and protection against overload and fault conditions.
            </p>
            <p>
              <strong>The selection hierarchy:</strong> Ib ≤ In ≤ Iz
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ib</strong> = design current (load requirement)
              </li>
              <li>
                <strong>In</strong> = protective device nominal rating
              </li>
              <li>
                <strong>Iz</strong> = cable effective current-carrying capacity
              </li>
            </ul>
            <p>
              <strong>Step-by-step selection:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — Calculate Ib:</strong> determine design current from load data
              </li>
              <li>
                <strong>Step 2 — Select In:</strong> choose protective device rating ≥ Ib
              </li>
              <li>
                <strong>Step 3 — Determine method:</strong> identify installation reference method
              </li>
              <li>
                <strong>Step 4 — Apply factors:</strong> calculate minimum It required: It = In /
                (Ca × Cg × Ci)
              </li>
              <li>
                <strong>Step 5 — Select cable:</strong> choose cable with tabulated It ≥ calculated
                minimum
              </li>
              <li>
                <strong>Step 6 — Verify Vd:</strong> check voltage drop is within limits
              </li>
              <li>
                <strong>Step 7 — Check fault:</strong> verify fault withstand capability
              </li>
            </ul>
            <p>
              <strong>Example — office fan coil unit (2.5kW single-phase, 230V):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Step 1: Ib = 2500 / 230 = <strong>10.9A</strong>
              </li>
              <li>
                Step 2: select In = <strong>16A</strong> MCB (next standard size up)
              </li>
              <li>
                Step 3: installation: trunking on wall = <strong>Method B</strong>
              </li>
              <li>
                Step 4: ambient 35°C, 4 circuits grouped — Ca = 0.94, Cg = 0.65; min It = 16 / (0.94
                × 0.65) = <strong>26.2A</strong>
              </li>
              <li>
                Step 5: Table 4D2A Method B: 2.5mm² = 20A (too small), 4mm² = 27A (adequate)
              </li>
              <li>Select 4mm² twin and earth</li>
            </ul>
            <p>
              <strong>Important:</strong> The calculated minimum It includes the effect of
              correction factors. Always verify the final selection meets voltage drop requirements.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — lighting circuit:</strong> Select cable for 20 × 45W LED
              luminaires on a 230V circuit, cables in trunking (Method B), 30°C ambient, no
              grouping.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total load = 20 × 45W = 900W</li>
              <li>
                Ib = 900 / 230 = <strong>3.9A</strong>
              </li>
              <li>
                Select In = <strong>6A</strong> MCB (Type B)
              </li>
              <li>No correction factors apply (reference conditions); min It = 6A</li>
              <li>Table 4D2A Method B: 1.5mm² = 14.5A</li>
              <li>1.5mm² adequate (but verify voltage drop for circuit length)</li>
            </ul>
            <p>
              <strong>Example 2 — three-phase motor:</strong> Size cable for 15kW AHU motor (pf
              0.85), 400V 3φ, XLPE/SWA on cable tray (Method E), 40°C plant room.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Ib = 15000 / (√3 × 400 × 0.85) = <strong>25.5A</strong>
              </li>
              <li>
                Select In = <strong>32A</strong> MCCB
              </li>
              <li>Correction for 40°C (XLPE): Ca = 0.91</li>
              <li>
                Min It = 32 / 0.91 = <strong>35.2A</strong>
              </li>
              <li>Table 4E2A Method E: 4mm² = 42A</li>
              <li>4mm² 4-core XLPE/SWA suitable</li>
            </ul>
            <p>
              <strong>Example 3 — grouped circuits:</strong> 6 × 20A circuits in conduit on wall
              (Method B), 30°C ambient. What cable size?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>In = 20A per circuit</li>
              <li>Grouping factor for 6 circuits: Cg = 0.57</li>
              <li>
                Min It = 20 / 0.57 = <strong>35.1A</strong>
              </li>
              <li>Table 4D1A Method B: 4mm² = 30A (too small), 6mm² = 38A (adequate)</li>
              <li>6mm² singles in conduit required</li>
              <li>Heavy grouping penalty — consider separate routes</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential relationships:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ib ≤ In ≤ Iz</strong> — fundamental cable selection rule
              </li>
              <li>
                <strong>Iz = It × Ca × Cg × Ci</strong> — effective capacity calculation
              </li>
              <li>
                <strong>In ≤ It × Ca × Cg × Ci</strong> — rearranged for selection
              </li>
              <li>
                <strong>Min It = In / (Ca × Cg × Ci)</strong> — minimum tabulated current
              </li>
            </ul>
            <p>
              <strong>Building services best practice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use cable tray (Method E) where possible for best capacity</li>
              <li>Group similar circuits together to optimise derating</li>
              <li>Allow 20-25% spare capacity for future load growth</li>
              <li>Consider XLPE for high ambient temperature locations</li>
              <li>Document all correction factors applied in design calculations</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Wrong reference method</strong> — significantly affects tabulated values
                </li>
                <li>
                  <strong>Forgetting grouping</strong> — multiple circuits need Cg factor
                </li>
                <li>
                  <strong>Using wrong table</strong> — PVC vs XLPE, single vs multicore
                </li>
                <li>
                  <strong>Ignoring power factor</strong> — motor loads need pf in Ib calculation
                </li>
              </ul>
            }
            doInstead="Identify the actual installation method and use the correct Appendix 4 table for the cable type, apply Cg whenever circuits share containment or trays, and always include power factor for motor / inductive loads in the Ib calculation."
          />

          <SectionRule />

          <Scenario
            title="Office ring-final vs radial — picking the cable for an open-plan floorplate"
            situation={
              <>
                A 600&nbsp;m² open-plan office floor needs small-power circuits. You are choosing
                between traditional 32&nbsp;A ring-finals and 20&nbsp;A radial circuits. The
                cables run in 2-tier galvanised perimeter trunking with up to 6 circuits grouped,
                ambient ceiling-void temperature 35&nbsp;°C in summer.
              </>
            }
            whatToDo={
              <>
                Reference method B (in trunking). Six circuits grouped: C_g ≈ 0.57 (Appendix 4
                Table 4C1). Ambient 35&nbsp;°C: C_a ≈ 0.94 for 70&nbsp;°C thermoplastic. For a
                ring-final on 32&nbsp;A: I_t needed = 32 / (0.57 × 0.94) = ≈ 60&nbsp;A → 4&nbsp;mm²
                conductors at minimum. For a 20&nbsp;A radial: I_t = 20 / 0.535 = ≈ 38&nbsp;A →
                2.5&nbsp;mm² fine. Combined with voltage-drop check (Reg 525.202) and cost,
                radials are usually the cleaner choice on commercial floorplates with grouped
                circuits.
              </>
            }
            whyItMatters={
              <>
                Forget the grouping factor and you have a 32&nbsp;A protective device on a cable
                with a real I_z below 32&nbsp;A — Reg 311.1 thermal-limits breach, slow
                insulation ageing, and a fire risk that the periodic inspection should catch but
                often does not. Reference method matters: trunking (B) is more onerous than
                clipped direct (C).
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Selection hierarchy: I_b ≤ I_n ≤ I_z. All three must be satisfied — and I_z is the derated capacity, not the table value.',
              'BS 7671 Appendix 4 tabulates I_t under reference conditions (30&nbsp;°C ambient, no grouping, single circuit, no thermal insulation).',
              'Apply every derating factor that applies: C_g (grouping), C_a (ambient), C_i (thermal insulation), C_f (harmonics) — multiply, do not pick the lowest.',
              'Reference method (A–G) follows the actual installation. Clipped direct (C) is more generous than in-trunking (B) is more generous than fully embedded (A).',
              'For three-phase circuits with >33% 3rd harmonic, apply BS 7671 Appendix 11 derating to account for neutral loading.',
              'Cu vs Al: Al cables need ≈ 30% larger CSA for the same I_t. Match terminations and bi-metal joints to avoid corrosion failures.',
              'Reg 311.1 mandates design within thermal limits and admissible voltage drop — current-carrying capacity is the thermal-limits half.',
              'Always document the reference method, derating factors and resulting I_z on the cable schedule for verification under Part 6.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Cable selection and sizing
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Voltage drop calculations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section2_1;
