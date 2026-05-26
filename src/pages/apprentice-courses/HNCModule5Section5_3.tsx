/**
 * Module 5 · Section 5 · Subsection 3 — Mechanical Commissioning
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   CIBSE Codes A, W and R — air systems, water systems and refrigeration commissioning. Pre-commissioning cleaning, balancing, performance testing.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Mechanical Commissioning - HNC Module 5 Section 5.3';
const DESCRIPTION =
  'Master mechanical commissioning for building services: CIBSE codes A, W and R, system balancing, flow measurement, pressure testing and performance verification techniques.';

const quickCheckQuestions = [
  {
    id: 'cibse-code-w',
    question: 'What does CIBSE Code W primarily cover?',
    options: [
      'Refrigeration systems',
      'Water distribution systems',
      'Air distribution systems',
      'Electrical distribution systems',
    ],
    correctIndex: 1,
    explanation:
      'CIBSE Commissioning Code W covers water distribution systems including LTHW (low temperature hot water), MTHW (medium temperature hot water), CHW (chilled water), and condenser water systems.',
  },
  {
    id: 'proportional-balancing',
    question: 'In proportional balancing, what is the first step?',
    options: [
      'Identify the index circuit',
      'Close the index circuit valve',
      'Measure total system flow',
      'Set all valves fully open',
    ],
    correctIndex: 0,
    explanation:
      'The first step in proportional balancing is to identify the index circuit - the circuit with the greatest resistance to flow. All other circuits are then balanced relative to this reference.',
  },
  {
    id: 'air-flow-tolerance',
    question:
      'What is the typical acceptable tolerance for air flow rates at terminals under CIBSE Code A?',
    options: [
      '+/- 10%',
      '+/- 5%',
      '+/- 15%',
      '+/- 20%',
    ],
    correctIndex: 0,
    explanation:
      'CIBSE Code A specifies +/- 10% as the typical acceptable tolerance for air flow rates at terminals. This ensures adequate air distribution whilst acknowledging practical measurement limitations.',
  },
  {
    id: 'pressure-test-duration',
    question:
      'What is the minimum duration for a hydronic system pressure test under BSRIA guidance?',
    options: [
      '2 hours',
      '1 hour',
      '30 minutes',
      '24 hours',
    ],
    correctIndex: 0,
    explanation:
      'BSRIA guidance recommends a minimum 2-hour pressure test at 1.5 times the working pressure for hydronic systems, allowing sufficient time to identify slow leaks and stabilise temperature effects.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which CIBSE Commissioning Code covers refrigeration systems?',
    options: [
      'CIBSE Code A',
      'CIBSE Code R',
      'CIBSE Code W',
      'CIBSE Code M',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE Commissioning Code R covers refrigeration systems including chillers, heat pumps, VRF/VRV systems, and direct expansion equipment.',
  },
  {
    id: 2,
    question: "What does the term 'index circuit' refer to in water system balancing?",
    options: [
      'The first circuit off the main header',
      'The circuit with the smallest flow rate',
      'The circuit with the greatest resistance to flow',
      'The circuit closest to the pump',
    ],
    correctAnswer: 2,
    explanation:
      'The index circuit is the circuit with the greatest resistance to flow (longest run, most fittings, or smallest pipework). It determines the system head requirements and serves as the reference for proportional balancing.',
  },
  {
    id: 3,
    question:
      'When commissioning a variable air volume (VAV) system, terminals should first be tested at:',
    options: [
      'Design air flow',
      'Minimum air flow',
      '50% of design flow',
      'Maximum air flow',
    ],
    correctAnswer: 3,
    explanation:
      'VAV terminals are first commissioned at maximum air flow to verify the system can deliver peak capacity. Minimum flow settings are then checked to ensure adequate ventilation at low load conditions.',
  },
  {
    id: 4,
    question:
      'What is the purpose of a differential pressure regulating valve (DPRV) in a water system?',
    options: [
      'To maintain constant flow through terminal units',
      'Pre-commissioning cleaning of water systems',
      'The circuit with the greatest resistance to flow',
      'Filters, fans, ductwork, coils, controls',
    ],
    correctAnswer: 0,
    explanation:
      'DPRVs maintain constant differential pressure across terminal branches regardless of system loading. This ensures consistent flow through two-port control valves and improves control stability.',
  },
  {
    id: 5,
    question: 'What is the correct sequence for commissioning an air handling unit?',
    options: [
      'Fans, ductwork, coils, filters, controls',
      'Filters, fans, ductwork, coils, controls',
      'Controls, fans, coils, ductwork, filters',
      'Ductwork, coils, fans, filters, controls',
    ],
    correctAnswer: 1,
    explanation:
      'The correct sequence is: install clean filters, check fan rotation and motor currents, verify ductwork integrity, test coil performance, then commission controls. Clean filters protect components during commissioning.',
  },
  {
    id: 6,
    question:
      'A chilled water system shows design flow of 4.5 l/s. Measured flow is 4.2 l/s. What is the percentage deviation?',
    options: [
      '+6.7%',
      '-7.1%',
      '-6.7%',
      '+7.1%',
    ],
    correctAnswer: 2,
    explanation:
      'Percentage deviation = ((Measured - Design) / Design) x 100 = ((4.2 - 4.5) / 4.5) x 100 = -6.7%. This is within the typical +/- 10% tolerance for water systems.',
  },
  {
    id: 7,
    question:
      'What is the minimum superheat reading expected at a properly charged DX evaporator coil?',
    options: [
      '2-4K',
      '15-20K',
      '10-12K',
      '5-8K',
    ],
    correctAnswer: 3,
    explanation:
      'A properly charged DX system should show 5-8K superheat at the evaporator outlet. Lower values indicate overcharge or liquid floodback risk; higher values suggest undercharge or restricted flow.',
  },
  {
    id: 8,
    question: 'When pressure testing a refrigeration system, what gas should be used?',
    options: [
      'Oxygen-free nitrogen (OFN)',
      'RS-485 twisted-pair cable',
      'Hole saw or knockout punch',
      'Gateway or protocol converter',
    ],
    correctAnswer: 0,
    explanation:
      'Oxygen-free nitrogen (OFN) must be used for pressure testing refrigeration systems. Air contains moisture and oxygen which can cause corrosion and contamination. Never use oxygen or the working refrigerant for testing.',
  },
  {
    id: 9,
    question: 'What does BSRIA BG 29 cover?',
    options: [
      'To maintain constant flow through terminal units',
      'Pre-commissioning cleaning of water systems',
      'The circuit with the greatest resistance to flow',
      'Filters, fans, ductwork, coils, controls',
    ],
    correctAnswer: 1,
    explanation:
      "BSRIA BG 29 'Pre-commission Cleaning of Pipework Systems' provides guidance on flushing, cleaning, and water treatment of hydronic systems prior to commissioning to ensure optimal performance and longevity.",
  },
  {
    id: 10,
    question: 'What instrument is used to measure air flow at a grille or diffuser?',
    options: [
      'Manometer',
      'Hygrometer',
      'Balometer (capture hood)',
      'Thermometer',
    ],
    correctAnswer: 2,
    explanation:
      'A balometer (flow capture hood) is placed over the grille or diffuser to directly measure air volume flow rate (l/s or m³/h). It provides accurate readings without complex calculations or traverse measurements.',
  },
  {
    id: 11,
    question:
      'In a constant volume air system, what is the typical design velocity in main ductwork?',
    options: [
      '1-2 m/s',
      '12-15 m/s',
      '8-10 m/s',
      '4-6 m/s',
    ],
    correctAnswer: 3,
    explanation:
      'Main ductwork in constant volume systems is typically designed for 4-6 m/s velocity. This balances pressure drop (energy cost) against duct size (capital cost). Higher velocities increase noise and running costs.',
  },
  {
    id: 12,
    question: 'What documentation must be provided upon completion of mechanical commissioning?',
    options: [
      'Commissioning records, O&M manuals, and as-built drawings',
      'Filters, fans, ductwork, coils, controls',
      'The circuit with the greatest resistance to flow',
      'To maintain constant flow through terminal units',
    ],
    correctAnswer: 0,
    explanation:
      'Complete commissioning handover documentation includes: commissioning records showing all test results, O&M manuals for all equipment, as-built drawings, training records, and equipment warranties.',
  },
];

const faqs = [
  {
    question: 'What is the difference between commissioning and testing?',
    answer:
      'Testing verifies that individual components work to specification (e.g., motor rotates correctly, valve opens). Commissioning is the integrated process of setting the complete system to deliver design performance - adjusting flows, pressures, and temperatures across interconnected systems. Testing is a subset of commissioning.',
  },
  {
    question: 'Why must water systems be flushed before commissioning?',
    answer:
      'Construction debris, flux residue, and mill scale contaminate water systems. BSRIA BG 29 requires pre-commissioning cleaning to remove debris that would block strainers, damage pump seals, foul heat exchanger surfaces, and impair control valve operation. Clean systems achieve design performance and have longer service life.',
  },
  {
    question: 'How do I balance a system with variable speed pumps?',
    answer:
      'Set the pump to fixed speed (design duty) during commissioning to establish baseline flows. Balance all circuits proportionally, then return the pump to variable speed mode. The BMS will modulate pump speed based on differential pressure, maintaining balanced conditions across varying loads.',
  },
  {
    question: 'What causes poor air distribution despite correct total air flow?',
    answer:
      'Common causes include: incorrect balancing damper positions, damaged or kinked flexible connections, blocked or dirty filters/grilles, missing volume control dampers, incorrect diffuser pattern settings, or pressure differences between zones. Systematic checking of each terminal against design values identifies the fault location.',
  },
  {
    question: 'When should refrigerant charge be adjusted during commissioning?',
    answer:
      'Refrigerant charge should only be adjusted after: system evacuation confirms no moisture or air, oil levels are correct, and the system has operated at stable conditions for 15-20 minutes. Check superheat and subcooling against manufacturer specifications before adding or removing charge.',
  },
  {
    question: 'What tolerances apply to building services commissioning?',
    answer:
      'Typical CIBSE tolerances are: air flow rates +/- 10% at terminals, water flow rates +/- 10%, room temperatures +/- 1K, supply air temperatures +/- 2K, and relative humidity +/- 5%. Specific project specifications may require tighter tolerances for critical applications like operating theatres or data centres.',
  },
];

const HNCModule5Section5_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 3"
            title="Mechanical Commissioning"
            description="CIBSE codes A, W and R, system balancing, flow measurement, pressure testing and performance verification."
            tone="purple"
          />

          <TLDR
            points={[
              "Mechanical commissioning sequence: pre-commissioning cleaning → static testing → dynamic testing → balancing → performance testing → witness.",
              "CIBSE Code A: air systems (pressure testing, flow measurement, balancing to ±10%). Code W: water systems (cleaning to BSRIA BG 29). Code R: refrigeration.",
              "Pre-commissioning cleaning is non-negotiable — BSRIA BG 29 for water, ductwork cleaning for air. Skipped cleaning = system fouling within months.",
              "Balancing: proportional balance to within ±10% of design flow; commissioning data recorded for handover.",
              "Performance testing: system meets design intent under operating conditions, not just design conditions.",
            ]}
          />

          <RegsCallout
            source="CIBSE Commissioning Code A: Air Distribution Systems"
            clause="CIBSE Code A provides recommendations for the commissioning of air distribution systems including pressure testing, leakage testing, fan performance, system regulation and balancing of supply, extract and recirculation air systems."
            meaning={
              <>
                Code A is the technical reference for air system commissioning. Specifications increasingly require Code A compliance with documented results — flow rates, balance, leakage, fan curves. A system commissioned outside Code A is a system that will be retro-commissioned within 12 months at owner cost.
              </>
            }
            cite="Source: CIBSE Commissioning Code A (refer to CIBSE published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Understand CIBSE Commissioning Codes A, W and R',
              'Apply proportional balancing techniques to water systems',
              'Commission air distribution systems to design parameters',
              'Perform pressure testing on hydronic and refrigeration systems',
              'Verify system performance against design criteria',
              'Prepare comprehensive commissioning documentation',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="CIBSE Commissioning Codes">
            <p>
              The Chartered Institution of Building Services Engineers (CIBSE) publishes
              commissioning codes that define standard procedures and acceptable performance
              criteria for building services systems. These codes are referenced in specifications
              and form the basis for commissioning contracts.
            </p>
            <p>
              <strong>Key CIBSE commissioning codes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Code A:</strong> Air distribution systems (ductwork, AHUs, terminals)
              </li>
              <li>
                <strong>Code W:</strong> Water distribution systems (LTHW, CHW, condenser water)
              </li>
              <li>
                <strong>Code R:</strong> Refrigeration systems (chillers, VRF, DX equipment)
              </li>
              <li>
                <strong>Code C:</strong> Automatic controls (BMS, DDC systems)
              </li>
              <li>
                <strong>Code B:</strong> Boiler plant (now largely superseded)
              </li>
              <li>
                <strong>Code L:</strong> Lighting systems
              </li>
            </ul>
            <p>
              <strong>CIBSE code overview:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Code A — Air distribution:</strong> Air flow (l/s), pressure (Pa) — +/- 10%
                terminals
              </li>
              <li>
                <strong>Code W — Water distribution:</strong> Flow (l/s), dT (K) — +/- 10% circuits
              </li>
              <li>
                <strong>Code R — Refrigeration:</strong> Superheat (K), subcooling (K) — Per
                manufacturer
              </li>
            </ul>
            <p>
              <strong>Real-world example — office building HVAC:</strong> A new 10-storey office
              block requires commissioning of: 4 AHUs (Code A), LTHW heating circuit with 200 FCUs
              (Code W), CHW cooling circuit (Code W), 2 air-cooled chillers (Code R), and BMS
              integration (Code C). The commissioning engineer must coordinate all trades, ensure
              pre-requisites are met, and demonstrate integrated system performance before handover.
            </p>
            <p>
              <strong>Design principle:</strong> CIBSE codes provide a common language between
              designers, installers, and commissioning engineers - ensuring consistent quality
              standards.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Water System Balancing (CIBSE Code W)">
            <p>
              Water system balancing ensures that each terminal unit receives its design flow rate.
              Without balancing, circuits closest to the pump receive excessive flow whilst remote
              circuits are starved, resulting in poor temperature control and wasted pump energy.
            </p>
            <p>
              <strong>Proportional balancing method:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify index circuit (greatest resistance)</li>
              <li>Set index regulating valve fully open</li>
              <li>Measure flow at all circuits</li>
              <li>Calculate flow ratios vs design</li>
              <li>Adjust valves to achieve proportional balance</li>
              <li>Re-measure and fine-tune</li>
            </ul>
            <p>
              <strong>Pre-commissioning requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>System flushed per BSRIA BG 29</li>
              <li>Strainers cleaned and baskets fitted</li>
              <li>Pumps proven and running correctly</li>
              <li>All air vented from system</li>
              <li>Expansion vessel charged correctly</li>
              <li>All isolation valves fully open</li>
            </ul>
            <p>
              <strong>Flow measurement methods:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Double regulating valve:</strong> Manometer + valve Kv — +/- 5% — Branch
                circuits
              </li>
              <li>
                <strong>Orifice plate:</strong> Differential pressure — +/- 2% — Main pipework
              </li>
              <li>
                <strong>Ultrasonic clamp-on:</strong> Transit time meter — +/- 1-3% — Non-invasive
                checks
              </li>
              <li>
                <strong>Electromagnetic:</strong> Mag flow meter — +/- 0.5% — Permanent metering
              </li>
            </ul>
            <p>
              <strong>Calculating flow from differential pressure:</strong> Q = Kv x sqrt(dP)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Where Q = flow (m³/h), Kv = valve coefficient, dP = differential pressure (bar)</li>
              <li>
                Example: A regulating valve with Kv = 2.5 shows dP = 0.16 bar. Flow = 2.5 x
                sqrt(0.16) = 2.5 x 0.4 = 1.0 m³/h (0.28 l/s)
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Balance in sequence from index circuit outward, not
              randomly. This minimises iterations and ensures stable final settings.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Air System Commissioning (CIBSE Code A)">
            <p>
              Air system commissioning verifies that ductwork, air handling units, and terminal
              devices deliver the specified air quantities to each space. This affects indoor air
              quality, thermal comfort, and energy efficiency.
            </p>
            <p>
              <strong>Pre-commissioning checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ductwork pressure tested and sealed to specified leakage class</li>
              <li>Clean filters installed (commissioning set, not operating filters)</li>
              <li>Fan belts tensioned and guards fitted</li>
              <li>Fire dampers released and access doors closed</li>
              <li>All flexible connections intact and not kinked</li>
              <li>Volume control dampers accessible and labelled</li>
            </ul>
            <p>
              <strong>Air flow measurement at terminals:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Balometer (capture hood) - direct reading</li>
              <li>Rotating vane anemometer with cone</li>
              <li>Hot wire anemometer for low velocities</li>
              <li>Calculate from face velocity x area</li>
            </ul>
            <p>
              <strong>Air flow measurement in ductwork:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pitot-static traverse (log-Tchebycheff)</li>
              <li>Minimum 5D upstream, 2D downstream</li>
              <li>Thermal anemometer traverse</li>
              <li>Orifice plate with manometer</li>
            </ul>
            <p>
              <strong>System type considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Constant Volume (CAV):</strong> Set dampers for design flow at each terminal
                — Total flow, individual terminals
              </li>
              <li>
                <strong>Variable Air Volume (VAV):</strong> Test at max and min positions — Box
                response, leakage at min
              </li>
              <li>
                <strong>Fan Coil Units:</strong> Check each speed setting — Fan currents, filter dP,
                noise
              </li>
              <li>
                <strong>Extract/LEV:</strong> Verify capture velocities — Face velocity, containment
              </li>
            </ul>
            <p>
              <strong>Real-world example — VAV system:</strong> A 50-box VAV system serving
              open-plan offices. Commissioning sequence: (1) Set AHU to 100% supply, (2) Drive all
              boxes to maximum, (3) Measure and record each box flow, (4) Adjust main dampers for
              +/- 10%, (5) Test box minimum positions for ventilation compliance, (6) Verify
              pressure-independent operation by changing system pressure, (7) Commission reheat
              coils if fitted.
            </p>
            <p>
              <strong>Site tip:</strong> Always balance supply and extract systems together.
              Unbalanced pressures cause door opening issues, noise, and uncontrolled infiltration.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Pressure Testing and Performance Verification">
            <p>
              Pressure testing verifies system integrity before commissioning begins. Performance
              verification confirms that the complete, integrated system delivers the specified
              conditions under representative load conditions.
            </p>
            <p>
              <strong>Hydronic system pressure testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Test pressure:</strong> 1.5 x maximum working pressure (typically 4.5 bar
                for 3 bar systems)
              </li>
              <li>
                <strong>Duration:</strong> Minimum 2 hours, preferably overnight
              </li>
              <li>
                <strong>Acceptance:</strong> No visible leaks, pressure drop less than 0.1 bar after
                temperature stabilisation
              </li>
              <li>
                <strong>Documentation:</strong> Record initial pressure, temperature, time, and
                final readings
              </li>
            </ul>
            <p>
              <strong>Refrigeration system testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Strength test:</strong> OFN at 1.1x design pressure — Hold for 10 minutes
              </li>
              <li>
                <strong>Leak test:</strong> OFN at design pressure — 24 hours, no drop
              </li>
              <li>
                <strong>Evacuation:</strong> Vacuum pump to less than 500 microns — Rise test - max
                200 microns/hour
              </li>
              <li>
                <strong>Charge verification:</strong> Superheat/subcooling measurement — Per
                manufacturer specs
              </li>
            </ul>
            <p>
              <strong>Performance verification tests:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Full load capacity test</li>
              <li>Part load efficiency check</li>
              <li>Setpoint response verification</li>
              <li>Safety interlock testing</li>
              <li>BMS point verification</li>
              <li>Alarm and trend logging</li>
            </ul>
            <p>
              <strong>Acceptance tolerances:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Room temperature: +/- 1K</li>
              <li>Supply air temperature: +/- 2K</li>
              <li>Relative humidity: +/- 5%</li>
              <li>Flow rates: +/- 10%</li>
              <li>Noise levels: NC/NR as specified</li>
              <li>Energy consumption: within design</li>
            </ul>
            <p>
              <strong>Documentation requirements — complete commissioning handover includes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Commissioning records:</strong> All test sheets with measured values, design
                values, and deviations
              </li>
              <li>
                <strong>Setting schedules:</strong> Final valve positions, damper settings, BMS
                setpoints
              </li>
              <li>
                <strong>O&M manuals:</strong> Equipment data, maintenance procedures, spare parts
              </li>
              <li>
                <strong>As-built drawings:</strong> Reflecting actual installation
              </li>
              <li>
                <strong>Training records:</strong> Evidence of operator training
              </li>
              <li>
                <strong>Warranties:</strong> Equipment warranties and maintenance contracts
              </li>
            </ul>
            <p>
              <strong>Lead times:</strong> Allow adequate time for performance verification - summer
              testing of heating or winter testing of cooling may require seasonal witnessing.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Water flow calculation:</strong> A double regulating valve has Kv
              = 4.0. The manometer reads 25 kPa differential pressure. What is the flow rate?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Convert pressure: 25 kPa = 0.25 bar</li>
              <li>Q = Kv x sqrt(dP)</li>
              <li>
                Q = 4.0 x sqrt(0.25) = 4.0 x 0.5 = <strong>2.0 m³/h</strong>
              </li>
              <li>
                Convert to l/s: 2.0 / 3.6 = <strong>0.56 l/s</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2 — Air flow deviation:</strong> A supply grille has design flow of
              120 l/s. Measured flow with balometer is 108 l/s. Is this acceptable?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Deviation = ((Measured - Design) / Design) x 100%</li>
              <li>
                Deviation = ((108 - 120) / 120) x 100% = <strong>-10%</strong>
              </li>
              <li>CIBSE Code A tolerance: +/- 10%</li>
              <li>
                <strong>Result:</strong> Acceptable (just within tolerance)
              </li>
            </ul>
            <p>
              <strong>Example 3 — Proportional balancing:</strong> Three circuits have design flows
              of 1.0, 0.8, and 0.6 l/s. Measured flows with index valve (Circuit 1) fully open are:
              1.2, 1.1, and 0.9 l/s. Calculate required flow ratios.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design ratios (relative to index): 1.0/1.0=1.0, 0.8/1.0=0.8, 0.6/1.0=0.6</li>
              <li>Current ratios: 1.2/1.2=1.0, 1.1/1.2=0.92, 0.9/1.2=0.75</li>
              <li>Circuit 2: 0.8/0.92 = 0.87 (close valve to reduce flow)</li>
              <li>Circuit 3: 0.6/0.75 = 0.80 (close valve to reduce flow)</li>
              <li>Adjust valves, re-measure, iterate until all within tolerance</li>
            </ul>
            <p>
              <strong>Example 4 — Refrigerant superheat check:</strong> R410A system shows suction
              pressure of 10 bar (saturation temp 5°C) and suction line temperature of 12°C. What is
              the superheat?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Superheat = Actual temperature - Saturation temperature</li>
              <li>
                Superheat = 12°C - 5°C = <strong>7K</strong>
              </li>
              <li>Normal range: 5-8K</li>
              <li>
                <strong>Result:</strong> Correct charge, system operating normally
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Commissioning sequence checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify all pre-commissioning activities complete (cleaning, testing)</li>
              <li>Obtain design data, drawings, and equipment schedules</li>
              <li>Check instruments calibrated within date</li>
              <li>Commission central plant before distribution</li>
              <li>Balance primary circuits before secondary</li>
              <li>Record all measurements systematically</li>
              <li>Identify and resolve defects before sign-off</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Air/water flow tolerance: <strong>+/- 10%</strong>
              </li>
              <li>
                Room temperature tolerance: <strong>+/- 1K</strong>
              </li>
              <li>
                Hydronic test pressure: <strong>1.5 x working pressure</strong>
              </li>
              <li>
                Superheat target: <strong>5-8K</strong>
              </li>
              <li>
                Duct main velocity: <strong>4-6 m/s</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Commissioning dirty systems</strong> - debris damages pumps and valves
                </li>
                <li>
                  <strong>Balancing without design data</strong> - no target means no compliance
                </li>
                <li>
                  <strong>Ignoring temperature effects</strong> - pressure tests vary with
                  temperature
                </li>
                <li>
                  <strong>Insufficient documentation</strong> - unmeasured terminals cause future
                  disputes
                </li>
                <li>
                  <strong>Using air for refrigeration testing</strong> - moisture causes corrosion
                </li>
              </ul>
            }
            doInstead="Flush systems per BSRIA BG 29 before commissioning, work to documented design flows, allow temperature to stabilise during pressure tests, record every terminal measurement, and only ever use OFN on refrigeration pipework."
          />

          <SectionRule />

          <Scenario
            title="Skipped pre-commissioning cleaning — system failure within six months"
            situation={
              <>
                To save programme time, the mechanical sub skips BSRIA BG 29 chemical cleaning of the chilled water system. The system is filled and commissioned. Within six months the building reports comfort cooling failures; investigation finds the AHU coils fouled with construction debris and biofilm. Cost of remedial cleaning, flushing and coil replacement: £180k. The contractor and design team dispute responsibility; the warranty will not cover it.
              </>
            }
            whatToDo={
              <>
                Pre-commissioning cleaning is non-negotiable on any closed water system. Make it a hold point on the ITP: chemical clean to BG 29, flush, side-stream filtration, water quality test (TVCs, conductivity, pH) signed off before final fill. Witness the process if the contractor proposes shortcuts. The cost of cleaning is a fraction of the cost of contamination.
              </>
            }
            whyItMatters={
              <>
                Skipped pre-commissioning is a hidden defect that surfaces after the contractor leaves site. The owner pays; the warranty is contested; the project's reputation suffers. Discipline on cleaning protects everyone.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Sequence: pre-comm cleaning → static → dynamic → balance → performance → witness.",
              "CIBSE Code A: air. Code W: water. Code R: refrigeration.",
              "Pre-commissioning cleaning to BSRIA BG 29 (water) — non-negotiable.",
              "Balancing to ±10% of design flow; commissioning data recorded.",
              "Performance testing under operating conditions, not just design conditions.",
              "Independent commissioning specialist (CSA, BSRIA) for complex systems.",
              "Skipped pre-comm = system fouling within months at owner cost.",
              "Witness testing with documentation supports warranty and acceptance.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Commissioning and handover
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                BMS commissioning
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section5_3;
