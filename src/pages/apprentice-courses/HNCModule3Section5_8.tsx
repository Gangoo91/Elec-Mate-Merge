/**
 * Module 3 · Section 5 · Subsection 8 — Maintenance, Testing and Fault Diagnosis
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Insulation resistance, vibration analysis, thermography, motor current
 *   signature analysis, condition monitoring &mdash; the predictive-maintenance
 *   toolkit that keeps motors and transformers alive across their 25-year service
 *   life.
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

const TITLE = 'Maintenance, Testing and Fault Diagnosis - HNC Module 3 Section 5.8';
const DESCRIPTION =
  'Comprehensive coverage of electrical machine maintenance, testing procedures and fault diagnosis techniques for building services including insulation resistance testing, vibration analysis and thermographic inspection.';

const quickCheckQuestions = [
  {
    id: 'insulation-minimum',
    question:
      'What is the minimum acceptable insulation resistance for a motor winding tested at 500V DC?',
    options: ['0.5 MΩ', '1 MΩ', '5 MΩ', '10 MΩ'],
    correctIndex: 1,
    explanation:
      'The minimum acceptable insulation resistance is 1 MΩ when tested at 500V DC. Values below this indicate degraded insulation requiring investigation. BS 7671 specifies this as the minimum for circuits up to 500V.',
  },
  {
    id: 'vibration-bearing',
    question: 'Which vibration frequency pattern typically indicates bearing wear in a motor?',
    options: [
      '1× running speed',
      '2× running speed',
      'High-frequency random pattern',
      '50Hz electrical frequency',
    ],
    correctIndex: 2,
    explanation:
      'Bearing defects produce characteristic high-frequency vibration patterns often with random components. Inner and outer race defects have specific frequency signatures based on bearing geometry and shaft speed.',
  },
  {
    id: 'thermography-hotspot',
    question:
      'During thermographic inspection, what temperature rise above ambient typically indicates a serious connection problem?',
    options: ['5°C', '10°C', '20°C', '40°C or more'],
    correctIndex: 3,
    explanation:
      'A temperature rise of 40°C or more above ambient typically indicates a serious problem requiring immediate attention. Rises of 10-25°C warrant monitoring and planned maintenance.',
  },
  {
    id: 'mcsa-purpose',
    question: 'What does Motor Current Signature Analysis (MCSA) primarily detect?',
    options: [
      'Insulation breakdown',
      'Mechanical faults through current spectrum analysis',
      'Earth fault current',
      'Power factor',
    ],
    correctIndex: 1,
    explanation:
      'MCSA detects mechanical faults (broken rotor bars, eccentricity, bearing defects) by analysing the frequency spectrum of the motor supply current. Mechanical issues create characteristic sidebands around the supply frequency.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'At what test voltage should insulation resistance testing be performed for a 400V three-phase motor?',
    options: ['250V DC', '500V DC', '1000V DC', '2500V DC'],
    correctAnswer: 1,
    explanation:
      "For circuits rated up to 500V, insulation resistance testing should be performed at 500V DC. Higher test voltages (1000V or above) are used for HV equipment. The test voltage should not exceed the circuit's rated voltage by more than a factor of two.",
  },
  {
    id: 2,
    question: 'What does a Polarisation Index (PI) value of less than 1.5 indicate?',
    options: [
      'Excellent insulation condition',
      'Acceptable insulation condition',
      'Contaminated or moisture-affected insulation',
      'Normal operating temperature',
    ],
    correctAnswer: 2,
    explanation:
      'A PI value below 1.5 indicates contaminated or moisture-affected insulation. Good insulation typically has a PI of 2-4, while excellent insulation exceeds 4. PI is the ratio of the 10-minute to 1-minute insulation resistance readings.',
  },
  {
    id: 3,
    question: 'What is the primary purpose of winding resistance measurement?',
    options: [
      'To determine insulation quality',
      'To detect turn-to-turn faults and connection problems',
      'To measure motor efficiency',
      'To calculate power factor',
    ],
    correctAnswer: 1,
    explanation:
      'Winding resistance measurement detects turn-to-turn faults, open windings, and poor connections. An imbalance greater than 2% between phases in a three-phase motor indicates a potential problem requiring investigation.',
  },
  {
    id: 4,
    question:
      'In vibration analysis, what does a dominant vibration at 2× line frequency (100Hz in the UK) typically indicate?',
    options: [
      'Mechanical imbalance',
      'Bearing wear',
      'Electrical problems such as broken rotor bars or air gap eccentricity',
      'Misalignment',
    ],
    correctAnswer: 2,
    explanation:
      'Vibration at 2× line frequency (100Hz) indicates electrical problems such as broken rotor bars, air gap eccentricity, or unbalanced magnetic pull. Mechanical imbalance typically shows at 1× running speed.',
  },
  {
    id: 5,
    question:
      'What temperature classification would indicate immediate action is required during thermographic inspection?',
    options: [
      'Delta-T 1-10°C above ambient',
      'Delta-T 10-25°C above ambient',
      'Delta-T 25-40°C above ambient',
      'Delta-T greater than 40°C above ambient',
    ],
    correctAnswer: 3,
    explanation:
      'A temperature rise greater than 40°C above ambient is critical and requires immediate action. This indicates a serious fault such as a high-resistance connection, overloaded conductor, or failing component that could lead to fire or equipment failure.',
  },
  {
    id: 6,
    question:
      "What bearing fault produces a characteristic 'BPFO' frequency in vibration analysis?",
    options: ['Inner race defect', 'Outer race defect', 'Rolling element defect', 'Cage defect'],
    correctAnswer: 1,
    explanation:
      'BPFO (Ball Pass Frequency Outer) is produced by outer race defects. BPFI indicates inner race defects. These frequencies are calculated from bearing geometry and shaft speed, enabling specific fault identification.',
  },
  {
    id: 7,
    question:
      'According to BS EN 60034-1, what is the maximum allowable winding temperature rise for Class F insulation?',
    options: ['80°C', '105°C', '125°C', '155°C'],
    correctAnswer: 2,
    explanation:
      'Class F insulation permits a maximum winding temperature rise of 105°C above a 40°C ambient, giving a maximum winding temperature of 145°C. However, many motors use Class F insulation with Class B temperature rise (80°C) for extended life.',
  },
  {
    id: 8,
    question:
      'What is the recommended inspection interval for critical motor bearings in continuous operation?',
    options: ['Weekly', 'Monthly', 'Quarterly', 'Annually'],
    correctAnswer: 2,
    explanation:
      'Critical motor bearings in continuous operation should be inspected quarterly using vibration analysis or other predictive techniques. More frequent monitoring may be required based on operating conditions or if trending indicates deterioration.',
  },
  {
    id: 9,
    question: 'In MCSA, what do sidebands around the fundamental frequency at (1 ± 2s)f indicate?',
    options: [
      'Bearing defects',
      'Broken rotor bars',
      'Stator winding faults',
      'Supply voltage imbalance',
    ],
    correctAnswer: 1,
    explanation:
      'Sidebands at frequencies (1 ± 2s)f, where s is slip and f is supply frequency, indicate broken rotor bars. The number and severity of broken bars can be estimated from the amplitude of these sidebands relative to the fundamental.',
  },
  {
    id: 10,
    question:
      'What is the primary purpose of a planned preventive maintenance (PPM) schedule for electrical machines?',
    options: [
      'To comply with warranty requirements only',
      'To prevent unexpected failures and extend equipment life',
      'To reduce energy consumption',
      'To satisfy insurance requirements only',
    ],
    correctAnswer: 1,
    explanation:
      'PPM schedules are designed to prevent unexpected failures, extend equipment life, and optimise maintenance costs. While they may help with warranty and insurance compliance, the primary purpose is reliability and lifecycle cost optimisation.',
  },
];

const faqs = [
  {
    question: 'How often should motor insulation resistance testing be performed?',
    answer:
      'Critical motors should have insulation resistance tested annually as a minimum, with quarterly testing recommended for high-value or critical applications. Trend analysis is essential - a steady decline in IR values over time is more concerning than a single low reading. Environmental factors such as humidity and contamination can cause temporary reductions.',
  },
  {
    question: 'What are the signs of impending bearing failure?',
    answer:
      'Early signs include increased vibration (particularly at bearing-specific frequencies), elevated temperature, changes in noise characteristics, and grease condition. Advanced bearing failure shows as excessive play, visible damage on inspection, metallic particles in lubricant, and potentially smoke or burning smell. Vibration monitoring can detect bearing defects months before failure.',
  },
  {
    question: 'When should thermographic inspection be performed?',
    answer:
      'Thermographic inspection should be performed during normal operating conditions with equipment under typical load. Annual inspections are common for distribution equipment, with more frequent surveys for critical systems. Inspections should also be performed following major maintenance or after any unusual operating events.',
  },
  {
    question: 'What is the difference between time-based and condition-based maintenance?',
    answer:
      'Time-based maintenance performs tasks at fixed intervals regardless of equipment condition (e.g., annual bearing replacement). Condition-based maintenance monitors equipment parameters and performs maintenance when indicators suggest it is needed. Condition-based approaches are generally more cost-effective and can prevent both unnecessary maintenance and unexpected failures.',
  },
  {
    question: 'How does voltage imbalance affect motor performance and diagnostics?',
    answer:
      'A 1% voltage imbalance can cause a 6-10% current imbalance, leading to increased heating and reduced motor life. When performing diagnostics, it is essential to measure supply voltage balance first - many apparent motor faults are actually supply problems. NEMA MG1 recommends derating motors operating with voltage imbalance exceeding 1%.',
  },
  {
    question: 'What maintenance records should be kept for electrical machines?',
    answer:
      'Essential records include: commissioning data and baseline measurements, all test results with dates and conditions, maintenance performed and parts replaced, operating hours and number of starts, fault history and repairs, and environmental conditions. These records enable trend analysis and inform maintenance decisions.',
  },
];

const HNCModule3Section5_8 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · Subsection 8"
            title="Maintenance, testing and fault diagnosis"
            description="Preventive maintenance practices, diagnostic techniques and condition monitoring for electrical machines in building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You apply IR (insulation resistance) testing to BS 7671 643.3 / IEEE 43 &mdash; minimum 1 M&Omega; on motor windings at 500 V DC; falling trend over annual tests is the early warning of insulation breakdown.',
              'You schedule vibration analysis (BS ISO 10816) and thermography (BS EN 13187) on every critical motor &mdash; both detect bearing wear and electrical imbalance before functional failure.',
              'You apply MCSA (Motor Current Signature Analysis) on critical induction motors &mdash; sideband frequencies around the fundamental reveal broken rotor bars and air-gap eccentricity.',
              'You document maintenance regimes in the building&rsquo;s log book under Approved Document L 2021 &mdash; a defendable maintenance record is now a regulatory expectation, not just good practice.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.2.1 (Periodic inspection and testing)"
            clause="Where required, the periodic inspection and testing of an installation, including any equipment forming part of the installation, shall be carried out in accordance with the relevant requirements of Chapter 65, by a skilled person competent in such work."
            meaning={
              <>
                BS 7671 134.2.1 + Chapter 65 sets the framework for periodic inspection
                and testing (EICR). Motor and transformer condition forms part of any
                comprehensive EICR on a commercial building &mdash; recording IR, polarisation
                index, winding temperature trend and vibration baseline lets the next
                EICR engineer compare like-for-like and trigger remedials before failure.
                BS 7671 doesn&rsquo;t prescribe motor maintenance interval but it does
                require competent recording of the test results that drive the regime.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 134.2.1 + Chapter 65; IEEE 43 (insulation resistance); BS ISO 10816 (mechanical vibration); BS EN 13187 (thermography)"
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Insulation testing:</strong> Minimum 1 MΩ at 500V DC</li>
              <li><strong>Vibration analysis:</strong> Detects mechanical faults early</li>
              <li><strong>Thermography:</strong> Identifies hot spots and connections</li>
              <li><strong>MCSA:</strong> Detects rotor faults from current spectrum</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HVAC motors:</strong> AHUs, chillers, pumps, fans</li>
              <li><strong>Critical systems:</strong> Life safety, data centres</li>
              <li><strong>PPM schedules:</strong> SFG20 and manufacturer guidance</li>
              <li><strong>Condition monitoring:</strong> Predictive maintenance approach</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Insulation Resistance Testing">
            <p>
              Insulation resistance (IR) testing is the primary method for assessing winding
              insulation condition. It measures the resistance between conductors and earth, and
              between windings, to detect degradation before catastrophic failure occurs.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Test Voltages and Minimum Values (BS 7671)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>SELV and PELV</strong> — 250V — 0.5 MΩ</li>
              <li><strong>Up to 500V (including 400V motors)</strong> — 500V — 1 MΩ</li>
              <li><strong>Above 500V</strong> — 1000V — 1 MΩ</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Polarisation Index (PI) Test
              </p>
              <p>
                The PI test extends IR testing by comparing readings at 1 minute and 10 minutes.
                This ratio indicates the condition of insulation independent of temperature effects.
              </p>
              <p><strong>
                PI = IR<sub>10min</sub> / IR<sub>1min</sub>
              </strong></p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>&lt; 1.0</strong> — Dangerous — Do not energise - investigate immediately</li>
              <li><strong>1.0 - 1.5</strong> — Poor (contaminated/wet) — Clean and dry, retest</li>
              <li><strong>1.5 - 2.0</strong> — Questionable — Monitor trend, investigate if declining</li>
              <li><strong>2.0 - 4.0</strong> — Good — Normal maintenance schedule</li>
              <li><strong>&gt; 4.0</strong> — Excellent — Continue monitoring</li>
            </ul>

              <p className="text-sm font-medium text-white">IR Testing Best Practice:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Disconnect motor from supply and discharge capacitance before testing
                </li>
                <li>
                  Record ambient temperature - IR decreases by approximately 50% for each 10°C rise
                </li>
                <li>
                  Test phase-to-earth and phase-to-phase on three-phase machines
                </li>
                <li>Discharge windings safely after test (high voltage stored)</li>
                <li>
                  Compare results with previous readings - trend is more important than absolute
                  value
                </li>
              </ul>

            <p>
              <strong>Rule of thumb:</strong> Minimum acceptable IR in MΩ = Rated voltage in kV + 1.
              For a 400V motor: 0.4 + 1 = 1.4 MΩ minimum recommended.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Winding Resistance Measurement">
            <p>
              Winding resistance measurement detects faults within the copper conductors themselves,
              including turn-to-turn shorts, open windings, and poor connections that IR testing
              cannot identify.
            </p>

              
                <p className="text-sm font-medium text-elec-yellow/80">What It Detects</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Shorted turns (reduced resistance)</li>
                  <li>Open circuits (infinite resistance)</li>
                  <li>Poor connections (elevated resistance)</li>
                  <li>Phase imbalance in three-phase motors</li>
                  <li>Winding damage from overheating</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Test Equipment</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Low-resistance ohmmeter (micro-ohmmeter)</li>
                  <li>Kelvin (four-wire) measurement method</li>
                  <li>Stable DC current source</li>
                  <li>Temperature compensation capability</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">Acceptance Criteria</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Three-phase balance:</strong> Maximum 2% variation between phases
                </li>
                <li>
                  <strong>Comparison with baseline:</strong> Maximum 5% deviation from commissioning
                  values
                </li>
                <li>
                  <strong>Temperature correction:</strong> Standardise to 20°C or 25°C reference
                </li>
              </ul>
              <p className="text-sm text-white mt-3">
                Temperature correction formula: R<sub>2</sub> = R<sub>1</sub> × (234.5 + T
                <sub>2</sub>) / (234.5 + T<sub>1</sub>) for copper
              </p>

              <p className="text-sm font-medium text-orange-300 mb-2">Important Consideration</p>
              <p>
                Winding resistance values are typically very low (milliohms to a few ohms). Standard
                digital multimeters lack the precision required - always use a dedicated
                low-resistance ohmmeter with four-wire (Kelvin) connections to eliminate lead
                resistance errors.
              </p>
          </ConceptBlock>

          <ConceptBlock title="Vibration Analysis">
            <p>
              Vibration analysis is the most powerful predictive maintenance technique for rotating
              machinery. By analysing the frequency spectrum of machine vibration, specific
              mechanical and electrical faults can be identified long before failure occurs.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Common Fault Frequencies
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Mechanical imbalance</strong> — 1× shaft speed — Dominant radial vibration</li>
              <li><strong>Misalignment (angular)</strong> — 1× and 2× shaft speed — High axial vibration</li>
              <li><strong>Misalignment (parallel)</strong> — 2× shaft speed — Radial at 2× running speed</li>
              <li><strong>Looseness</strong> — Harmonics: 1×, 2×, 3×... — Multiple harmonics present</li>
              <li><strong>Bearing defects</strong> — BPFO, BPFI, BSF, FTF — Bearing-specific frequencies</li>
              <li><strong>Electrical (2× line freq)</strong> — 100Hz (UK) — Rotor bars, eccentricity</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Bearing Defect Frequencies
              </p>

                
                  <p className="font-bold text-elec-yellow mb-1">BPFO</p>
                  <p className="text-white text-xs">Ball Pass Frequency Outer Race</p>

                
                  <p className="font-bold text-elec-yellow mb-1">BPFI</p>
                  <p className="text-white text-xs">Ball Pass Frequency Inner Race</p>

                
                  <p className="font-bold text-elec-yellow mb-1">BSF</p>
                  <p className="text-white text-xs">Ball Spin Frequency</p>

                
                  <p className="font-bold text-elec-yellow mb-1">FTF</p>
                  <p className="text-white text-xs">Fundamental Train Frequency (Cage)</p>

              
              <p className="text-xs text-white mt-2">
                These frequencies are calculated from bearing geometry - number of rolling elements,
                contact angle, and bearing dimensions.
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                ISO 10816 Vibration Severity (mm/s RMS)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Small machines (&lt;15kW)</strong> — &lt;0.71 — 0.71-1.8 — 1.8-4.5 — &gt;4.5</li>
              <li><strong>Medium (15-75kW)</strong> — &lt;1.12 — 1.12-2.8 — 2.8-7.1 — &gt;7.1</li>
              <li><strong>Large rigid (&gt;75kW)</strong> — &lt;1.8 — 1.8-4.5 — 4.5-11.2 — &gt;11.2</li>
            </ul>

            <p>
              <strong>Trending is key:</strong> A doubling of vibration amplitude indicates a
              significant change requiring investigation, even if absolute levels remain within
              acceptable limits.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Thermographic Inspection">
            <p>
              Infrared thermography detects abnormal heating patterns in electrical equipment before
              visible damage occurs. It is particularly effective for identifying high-resistance
              connections, overloaded conductors, and failing components.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Temperature Rise Classification (Delta-T)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1-10°C above ambient</strong> — Low — Monitor and repair at next maintenance</li>
              <li><strong>10-25°C above ambient</strong> — Medium — Schedule repair as soon as practical</li>
              <li><strong>25-40°C above ambient</strong> — High — Repair within days, increase monitoring</li>
              <li><strong>&gt;40°C above ambient</strong> — Critical — Immediate action required</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Common Findings - Motors
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Hot bearings indicating lubrication or wear issues</li>
                  <li>Uneven winding temperatures suggesting phase imbalance</li>
                  <li>Hot terminal connections</li>
                  <li>Cooling system blockages (hot spots on frame)</li>
                  <li>VSD heat sink issues</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Common Findings - Distribution
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Loose busbar connections</li>
                  <li>Overloaded cables and circuit breakers</li>
                  <li>Failing fuses (one phase hot)</li>
                  <li>Unbalanced three-phase loads</li>
                  <li>Harmonic heating in neutrals</li>
                </ul>

            

              <p className="text-sm font-medium text-white">
                Thermographic Inspection Best Practice:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Inspect under normal operating load (minimum 40% of rated load)
                </li>
                <li>
                  Allow equipment to reach thermal equilibrium before inspection
                </li>
                <li>Use consistent emissivity settings for comparable surfaces</li>
                <li>Compare similar equipment phases to identify anomalies</li>
                <li>Document with both thermal and visual images</li>
                <li>Account for ambient conditions and reflected temperatures</li>
              </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Motor Current Signature Analysis (MCSA)">
            <p>
              MCSA is a non-invasive technique that analyses the frequency spectrum of motor supply
              current to detect mechanical and electrical faults. It can identify problems while the
              motor is running under normal operating conditions.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Principle of Operation</p>
              <p>
                Mechanical faults in a motor create characteristic load variations that modulate the
                supply current. By performing FFT (Fast Fourier Transform) analysis on the current
                waveform, specific fault frequencies can be identified as sidebands around the
                fundamental supply frequency.
              </p>
              <p>
                For example, broken rotor bars create sidebands at frequencies: f<sub>brb</sub> = f
                × (1 ± 2s) where f is supply frequency and s is slip.
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">Detectable Faults</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Broken rotor bars</strong> — f × (1 ± 2s) — &gt;-50dB indicates fault</li>
              <li><strong>Air gap eccentricity</strong> — f × (1 ± (1-s)/p) — Varies with severity</li>
              <li><strong>Bearing defects</strong> — Bearing frequencies modulated on f — Early detection possible</li>
              <li><strong>Load oscillations</strong> — f ± mechanical frequency — Coupling/alignment issues</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Advantages of MCSA</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Non-invasive - no physical access to motor required</li>
                  <li>Testing during normal operation</li>
                  <li>Detects both electrical and mechanical faults</li>
                  <li>Can be performed remotely via MCC</li>
                  <li>Relatively low equipment cost</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Limitations</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Requires motor to be running under load</li>
                  <li>VSD operation complicates analysis</li>
                  <li>Specialist interpretation required</li>
                  <li>Some fault types not easily detected</li>
                  <li>Baseline comparison essential</li>
                </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Bearing Failure Diagnosis">
            <p>
              Bearings are the most common failure point in rotating machinery. Understanding
              failure modes and their diagnostic signatures enables proactive maintenance before
              catastrophic failure.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Bearing Failure Stages</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1 - Sub-surface</strong> — Ultrasonic, HF vibration — Microscopic fatigue — Months</li>
              <li><strong>2 - Surface damage</strong> — Vibration (bearing frequencies) — Spalling, pitting — Weeks to months</li>
              <li><strong>3 - Advanced damage</strong> — Vibration, temperature, noise — Large spalls, wear — Days to weeks</li>
              <li><strong>4 - Failure imminent</strong> — All methods, audible noise — Excessive clearance, heat — Hours to days</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Common Bearing Failure Causes
              </p>

                
                  <p className="text-sm font-medium text-white">Lubrication Issues (36%)</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Insufficient or excessive grease</li>
                    <li>Wrong lubricant type</li>
                    <li>Contamination</li>
                    <li>Lubricant degradation</li>
                  </ul>

                
                  <p className="text-sm font-medium text-white">Contamination (14%)</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Moisture ingress</li>
                    <li>Dirt and debris</li>
                    <li>Seal failure</li>
                    <li>Process contamination</li>
                  </ul>

                
                  <p className="text-sm font-medium text-white">Misalignment (16%)</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Shaft misalignment</li>
                    <li>Bearing housing issues</li>
                    <li>Thermal growth</li>
                    <li>Foundation settlement</li>
                  </ul>

                
                  <p className="text-sm font-medium text-white">Electrical Damage (10%)</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>VSD-induced shaft currents</li>
                    <li>Fluting (EDM damage)</li>
                    <li>Frosting patterns</li>
                    <li>Requires shaft grounding or insulated bearings</li>
                  </ul>

              

            <p>
              <strong>VSD bearing damage:</strong> High dV/dt switching creates common-mode voltage
              that can discharge through bearings. Mitigation includes shaft grounding brushes,
              insulated bearings, or common-mode filters.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Preventive Maintenance Schedules">
            <p>
              Effective maintenance combines time-based preventive maintenance with condition-based
              monitoring. Industry standards such as SFG20 provide guidance for building services
              maintenance scheduling.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical Motor Maintenance Schedule
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Daily/Weekly</strong> — Visual inspection, listen for abnormal noise — Operator rounds</li>
              <li><strong>Monthly</strong> — Check operating temperature, current draw — Instrumentation/BMS</li>
              <li><strong>Quarterly</strong> — Vibration analysis, thermography — Condition monitoring</li>
              <li><strong>6-Monthly</strong> — Bearing lubrication (if grease points) — Preventive maintenance</li>
              <li><strong>Annually</strong> — Insulation resistance test, alignment check — Planned shutdown</li>
              <li><strong>3-5 Years</strong> — Bearing replacement (based on running hours) — Major overhaul</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Transformer Maintenance Schedule
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Monthly</strong> — Visual, temperature check — Oil level, temperature, leaks</li>
              <li><strong>Annually</strong> — IR test, thermography, clean — Oil sample, IR test, thermography</li>
              <li><strong>3 Years</strong> — Detailed inspection, torque connections — DGA, winding resistance</li>
              <li><strong>5+ Years</strong> — Turns ratio test, PD test — Full oil processing, comprehensive tests</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                SFG20 - Standard Maintenance Specification
              </p>
              <p>
                SFG20 provides comprehensive maintenance schedules for building services equipment.
                It covers mechanical, electrical, and specialist systems with task frequencies based
                on:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Equipment type and criticality</li>
                <li>Statutory and regulatory requirements</li>
                <li>Manufacturer recommendations</li>
                <li>Industry best practice</li>
              </ul>
          </ConceptBlock>

          <ConceptBlock title="Building Services: Planned Maintenance and Condition Monitoring">
            <p>
              Modern building services maintenance integrates planned preventive maintenance (PPM)
              with condition-based monitoring (CBM) to optimise reliability while minimising costs.
              Building Management Systems (BMS) increasingly support predictive maintenance
              strategies.
            </p>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Planned Preventive Maintenance (PPM)
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Fixed-interval tasks regardless of condition</li>
                  <li>Based on time, running hours, or cycles</li>
                  <li>Predictable resource requirements</li>
                  <li>May result in unnecessary maintenance</li>
                  <li>Cannot prevent random failures</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Condition-Based Maintenance (CBM)
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Maintenance triggered by equipment condition</li>
                  <li>Uses monitoring data and trend analysis</li>
                  <li>Reduces unnecessary interventions</li>
                  <li>Requires investment in monitoring systems</li>
                  <li>Can extend component life significantly</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Critical Building Services Equipment
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HVAC</strong> — AHU fans, pumps, chillers — Vibration, temperature, current, pressure</li>
              <li><strong>Life Safety</strong> — Smoke extract fans, fire pumps — Weekly run tests, vibration, IR</li>
              <li><strong>Lifts</strong> — Motors, drives, door operators — Current, travel time, door cycles</li>
              <li><strong>Standby Power</strong> — Generators, UPS systems — Battery condition, fuel, load tests</li>
              <li><strong>Distribution</strong> — Transformers, switchgear — Temperature, partial discharge, IR</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                BMS Integration for Predictive Maintenance
              </p>
              <p>
                Modern BMS platforms can support predictive maintenance through continuous
                monitoring:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Motor current trending:</strong> Detects degradation over time
                </li>
                <li>
                  <strong>VSD fault logging:</strong> Early warning of drive issues
                </li>
                <li>
                  <strong>Run time metering:</strong> Triggers time-based maintenance
                </li>
                <li>
                  <strong>Temperature monitoring:</strong> Identifies overheating equipment
                </li>
                <li>
                  <strong>Pressure differentials:</strong> Filter condition monitoring
                </li>
                <li>
                  <strong>Power quality:</strong> Voltage imbalance, harmonics
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Maintenance Documentation Requirements
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Asset register:</strong> Equipment identification, specifications,
                  location
                </li>
                <li>
                  <strong>Maintenance history:</strong> All work performed with dates and findings
                </li>
                <li>
                  <strong>Test records:</strong> IR tests, thermography, vibration baselines
                </li>
                <li>
                  <strong>Statutory compliance:</strong> Fixed wiring tests, emergency lighting,
                  fire systems
                </li>
                <li>
                  <strong>Warranty information:</strong> Terms, expiry dates, authorised service
                  providers
                </li>
                <li>
                  <strong>O&M manuals:</strong> Manufacturer maintenance requirements
                </li>
              </ul>

            <p>
              <strong>Key principle:</strong> The optimum maintenance strategy combines PPM for
              statutory compliance and basic care with CBM for high-value or critical equipment
              where monitoring investment is justified.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: Insulation Resistance Assessment
              </p>
              <p>
                <strong>Scenario:</strong> A 22kW AHU supply fan motor shows the following IR
                readings: Phase A-E: 45 MΩ, Phase B-E: 42 MΩ, Phase C-E: 8 MΩ. All tested at 500V
                DC.
              </p>

                <p>
                  <strong>Analysis:</strong>
                </p>
                <p>All readings exceed 1 MΩ minimum - technically acceptable</p>
                <p>However, Phase C is significantly lower than A and B</p>
                <p>Ratio: Phase A/C = 45/8 = 5.6:1 (significant imbalance)</p>
                <p>
                  <strong>Interpretation:</strong>
                </p>
                <p>Phase C winding shows degraded insulation</p>
                <p>Possible moisture, contamination, or thermal damage</p>
                <p>
                  <strong>Recommendation:</strong>
                </p>
                <p className="text-yellow-400">1. Perform PI test on Phase C</p>
                <p className="text-yellow-400">2. Check historical trend data</p>
                <p className="text-yellow-400">
                  3. Schedule detailed inspection at next opportunity
                </p>
                <p className="text-yellow-400">4. Increase monitoring frequency</p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: Vibration Analysis Interpretation
              </p>
              <p>
                <strong>Scenario:</strong> A chilled water pump (1450 rpm, 4-pole) shows dominant
                vibration at 24.2 Hz with amplitude of 3.2 mm/s RMS.
              </p>

                <p>
                  <strong>Analysis:</strong>
                </p>
                <p>Running speed: 1450 rpm = 24.2 Hz ✓ (matches dominant frequency)</p>
                <p>
                  1× running speed vibration indicates: <strong>Mechanical imbalance</strong>
                </p>
                <p>Amplitude assessment (ISO 10816 Class II - medium machines):</p>
                <p>
                  3.2 mm/s is in the "Satisfactory" range (1.12-2.8 is good, 2.8-7.1 satisfactory)
                </p>
                <p>
                  <strong>Interpretation:</strong>
                </p>
                <p>Rotor imbalance developing but not yet critical</p>
                <p>
                  <strong>Recommendation:</strong>
                </p>
                <p className="text-yellow-400">1. Check impeller for debris or erosion</p>
                <p className="text-yellow-400">
                  2. Schedule dynamic balancing at next planned shutdown
                </p>
                <p className="text-yellow-400">3. Increase monitoring to monthly until corrected</p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: Thermographic Finding
              </p>
              <p>
                <strong>Scenario:</strong> Annual thermographic survey shows a motor terminal box
                with Phase A at 85°C, Phase B at 52°C, and Phase C at 48°C. Ambient temperature is
                25°C.
              </p>

                <p>
                  <strong>Analysis:</strong>
                </p>
                <p>
                  Phase A: ΔT = 85 - 25 = <strong>60°C above ambient</strong>
                </p>
                <p>Phase B: ΔT = 52 - 25 = 27°C above ambient</p>
                <p>Phase C: ΔT = 48 - 25 = 23°C above ambient</p>
                <p>
                  <strong>Classification (Phase A):</strong>
                </p>
                <p className="text-red-400">ΔT &gt; 40°C = CRITICAL - Immediate action required</p>
                <p>
                  <strong>Likely cause:</strong>
                </p>
                <p>High-resistance connection at Phase A terminal</p>
                <p>Possibly loose termination or corroded lug</p>
                <p>
                  <strong>Action required:</strong>
                </p>
                <p className="text-red-400">1. Isolate motor as soon as operationally possible</p>
                <p className="text-red-400">
                  2. Clean, inspect and re-terminate Phase A connection
                </p>
                <p className="text-red-400">3. Check torque on all terminals</p>
                <p className="text-red-400">4. Re-survey after repair to confirm resolution</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">Test Minimum Values</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>IR at 500V DC: minimum 1 MΩ</li>
                  <li>PI ratio: minimum 1.5 (good &gt;2.0)</li>
                  <li>Winding R balance: within 2%</li>
                  <li>Vibration (medium): &lt;2.8 mm/s good</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Thermographic Action Levels</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>1-10°C: Monitor</li>
                  <li>10-25°C: Schedule repair</li>
                  <li>25-40°C: Repair within days</li>
                  <li>&gt;40°C: Immediate action</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Vibration Fault Frequencies</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Imbalance: 1× running speed</li>
                  <li>Misalignment: 1× and 2× speed</li>
                  <li>Electrical: 100Hz (2× line)</li>
                  <li>Bearings: BPFO, BPFI, BSF, FTF</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Maintenance Standards</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>SFG20: Building services PPM</li>
                  <li>ISO 10816: Vibration severity</li>
                  <li>BS 7671: Electrical testing</li>
                  <li>BS EN 60034: Rotating machines</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Critical chiller compressor &mdash; declining IR trend investigation"
            situation={
              <>
                A 132 kW chiller compressor motor on a hospital cooling plant shows IR
                test history: Year 1 = 1500 M&Omega;, Year 2 = 850 M&Omega;, Year 3 =
                420 M&Omega;, Year 4 = 80 M&Omega; (still well above the 1 M&Omega;
                BS 7671 minimum but the trend is clearly downward). PI ratio 1.4
                (declining from 2.8 at install). Compressor still running but the
                trend is alarming.
              </>
            }
            whatToDo={
              <>
                Treat as imminent failure even though absolute IR is still &gt; minimum.
                Run a tan-&delta; (loss-tangent) test at next outage to quantify
                insulation deterioration; arrange for a swap-out replacement compressor
                within the next 6 months while the existing one still works (controlled
                changeover beats failure during patient cooling load). Document the
                trend and decision in the building log book; raise the predictive
                maintenance budget to capture similar early-warning trends across the
                rest of the chiller fleet.
              </>
            }
            whyItMatters={
              <>
                Critical-load motor failures cost not just the motor but the consequential
                downtime &mdash; on hospital cooling, that may be patient transfers and
                CQC reportable incidents. Trend-based predictive maintenance (IR + PI +
                vibration + thermography over years) catches degradation while it&rsquo;s
                still benign. The HNC engineer designs the maintenance regime that
                makes this possible.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Insulation resistance: minimum 1 M&Omega; on motors per BS 7671 643.3.3 at 500 V DC; trend matters more than absolute value.',
              'Polarisation Index (PI): 10-min IR / 1-min IR &mdash; healthy &gt; 2.0; degraded &lt; 1.5.',
              'Vibration analysis (BS ISO 10816): velocity RMS bands A/B/C/D from acceptable to unacceptable on a given machine class.',
              'Thermography (BS EN 13187): hot-spot detection on terminals, bearings, windings &mdash; non-contact, fast, no shutdown required.',
              'Motor Current Signature Analysis (MCSA): sideband frequencies around fundamental indicate broken rotor bars (2 &times; slip frequency sidebands), eccentricity, bearing faults.',
              'BS 7671 Chapter 65 governs periodic inspection &amp; testing &mdash; motor condition forms part of EICR scope.',
              'Approved Document L 2021 expects defendable maintenance records in the building log book.',
              'Trend-based predictive maintenance always outperforms time-based PPM on critical assets &mdash; and is cheaper over a 25-year service life.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-7")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Starting and speed control methods for motors
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 6 — Energy efficiency
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section5_8;
