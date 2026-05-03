/**
 * Module 8 · Section 3 · Subsection 6 — Commissioning and Testing
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Refrigerant charging, leak testing, performance verification, F-Gas compliance, and handover requirements
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

const TITLE = 'Commissioning and Testing - HNC Module 8 Section 3.6';
const DESCRIPTION =
  'Master air conditioning commissioning procedures: refrigerant charging, leak testing, performance verification, superheat and subcooling checks, F-Gas certification requirements, CIBSE Code M compliance, and O&M manual handover for HVAC systems.';

const quickCheckQuestions = [
  {
    id: 'refrigerant-charging-method',
    question: 'What is the primary method for charging refrigerant into a VRF system?',
    options: [
      'Liquid charging through the suction line',
      'Vapour charging through the discharge line',
      'Liquid charging through the liquid line service valve',
      'Vapour charging through the accumulator',
    ],
    correctIndex: 2,
    explanation:
      'VRF systems are charged with liquid refrigerant through the liquid line service valve. The system charge is calculated based on pipe run lengths and factory pre-charge, with additional refrigerant added per metre of liquid pipe according to manufacturer specifications.',
  },
  {
    id: 'leak-test-pressure',
    question:
      'According to BS EN 378, what is the minimum leak test pressure for the high-pressure side of an R410A system?',
    options: ['20 bar', '31 bar (1.1 x design pressure)', '40 bar (operating pressure)', '45 bar'],
    correctIndex: 1,
    explanation:
      'BS EN 378 requires leak testing at 1.1 times the maximum allowable pressure. For R410A systems with a typical high-side design pressure of 28 bar, this equates to approximately 31 bar. The test must be conducted with oxygen-free nitrogen (OFN).',
  },
  {
    id: 'superheat-measurement',
    question: 'Where should temperature be measured to calculate superheat in a DX system?',
    options: [
      'At the condenser outlet',
      'At the compressor discharge',
      'At the evaporator outlet (suction line)',
      'At the expansion valve inlet',
    ],
    correctIndex: 2,
    explanation:
      'Superheat is measured at the evaporator outlet (suction line) near the sensing bulb location. It is calculated as the difference between the actual suction temperature and the saturation temperature corresponding to suction pressure. Normal superheat is typically 5-8K.',
  },
  {
    id: 'fgas-certification',
    question:
      'Under F-Gas Regulations, what certification is required to handle refrigerants with GWP &gt; 2500?',
    options: [
      'No certification required',
      'Category I certification only',
      'Category I, II, III or IV depending on activity',
      'Manufacturer training only',
    ],
    correctIndex: 2,
    explanation:
      'F-Gas Regulations require personnel to hold appropriate Category certification (I-IV) based on the type of work undertaken. Category I covers all activities, Category II covers recovery, Category III covers systems &lt;3kg, and Category IV covers leak checking only.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Before charging refrigerant, the system must first be:',
    options: [
      'Filled with water to check for leaks',
      'Evacuated to remove moisture and non-condensables',
      'Pressurised with refrigerant to 5 bar',
      'Heated to operating temperature',
    ],
    correctAnswer: 1,
    explanation:
      'Systems must be evacuated using a vacuum pump to remove moisture and non-condensable gases before charging. The vacuum should reach at least 500 microns (0.67 mbar) and hold for a minimum period specified by the manufacturer.',
  },
  {
    id: 2,
    question: 'What is the purpose of the standing vacuum test?',
    options: [
      'To check refrigerant purity',
      'To verify the system holds vacuum without pressure rise, indicating no leaks or moisture',
      'To measure compressor capacity',
      'To test electrical insulation',
    ],
    correctAnswer: 1,
    explanation:
      'A standing vacuum test verifies system integrity. After evacuation, the vacuum should be held for 30-60 minutes minimum. Pressure rise indicates either a leak or residual moisture evaporating. No rise confirms the system is leak-free and dry.',
  },
  {
    id: 3,
    question: 'According to CIBSE Code M, commissioning records must include:',
    options: [
      'Only the refrigerant type used',
      'Design parameters, measured values, and any deviations with explanations',
      'Only the final temperature achieved',
      "Just the commissioning engineer's signature",
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE Code M requires comprehensive commissioning records including design criteria, measured performance parameters, comparison with design, any deviations with explanations, instrument calibration details, and witness sign-off where required.',
  },
  {
    id: 4,
    question: 'Subcooling in a refrigeration system is measured at:',
    options: [
      'The evaporator inlet',
      'The compressor suction',
      'The condenser outlet (liquid line)',
      'The expansion device outlet',
    ],
    correctAnswer: 2,
    explanation:
      'Subcooling is measured at the condenser outlet (liquid line) as the difference between the saturation temperature at condensing pressure and the actual liquid temperature. Normal subcooling is typically 5-10K and indicates adequate liquid refrigerant at the expansion device.',
  },
  {
    id: 5,
    question: 'What does an abnormally high superheat reading indicate?',
    options: [
      'System is overcharged with refrigerant',
      'Insufficient refrigerant charge or restricted flow to evaporator',
      'Condenser is oversized',
      'Compressor is too powerful',
    ],
    correctAnswer: 1,
    explanation:
      'High superheat indicates the refrigerant is evaporating too early in the evaporator, suggesting undercharge, restricted refrigerant flow (blocked filter drier), or insufficient load. The suction gas becomes excessively superheated before reaching the compressor.',
  },
  {
    id: 6,
    question:
      'During commissioning, the air-on and air-off temperatures across a cooling coil should be measured to verify:',
    options: [
      'Refrigerant type',
      'Sensible cooling capacity and temperature drop across the coil',
      'Compressor electrical consumption',
      'Ductwork pressure drop',
    ],
    correctAnswer: 1,
    explanation:
      'Air-on and air-off temperature measurements verify the sensible cooling capacity. The temperature drop multiplied by airflow rate and specific heat capacity gives the sensible cooling duty, which should match the design specification.',
  },
  {
    id: 7,
    question: 'F-Gas Regulations require leak checks on systems containing more than:',
    options: [
      'Any amount of F-gas',
      '5 tonnes CO2 equivalent',
      '3 kg of refrigerant',
      '10 tonnes CO2 equivalent',
    ],
    correctAnswer: 1,
    explanation:
      'F-Gas Regulations (EU 517/2014 and UK amendments) require mandatory leak checks on systems containing 5 tonnes CO2 equivalent or more. Check frequency depends on charge size: 5-50 tCO2e annually, 50-500 tCO2e every 6 months, and above 500 tCO2e every 3 months.',
  },
  {
    id: 8,
    question: 'What information must be included on a system data plate under F-Gas requirements?',
    options: [
      'Manufacturer name only',
      'Refrigerant type, charge quantity, and GWP',
      'Serial number only',
      'Installation date only',
    ],
    correctAnswer: 1,
    explanation:
      'F-Gas Regulations require systems to display a label showing: refrigerant designation (e.g., R410A), charge quantity in kg, GWP value, and CO2 equivalent in tonnes. This enables proper leak check scheduling and end-of-life recovery planning.',
  },
  {
    id: 9,
    question: 'The commissioning witness test typically involves:',
    options: [
      'Only the installing contractor',
      'The client or their representative observing key tests and signing off results',
      'The equipment manufacturer only',
      'The building control officer',
    ],
    correctAnswer: 1,
    explanation:
      'Witness testing involves the client, consultant, or their appointed representative observing critical commissioning tests being performed and signing off the recorded results. This provides independent verification that the system meets specification.',
  },
  {
    id: 10,
    question: 'O&M manuals for air conditioning systems should include:',
    options: [
      'Only manufacturer literature',
      'Operating procedures, maintenance schedules, as-built drawings, test certificates, and spare parts information',
      'Only the installation certificate',
      'Just the system schematic',
    ],
    correctAnswer: 1,
    explanation:
      'O&M manuals must be comprehensive, including: system descriptions, operating procedures, maintenance schedules (PPM), manufacturer data sheets, as-built drawings, commissioning records, test certificates, spare parts lists, and emergency procedures.',
  },
  {
    id: 11,
    question:
      'When using an electronic leak detector, the sensitivity should be set to detect leaks of:',
    options: ['100 g/year', '5 g/year for F-gas systems', '50 g/year', '1 kg/year'],
    correctAnswer: 1,
    explanation:
      'F-Gas Regulations require leak detectors capable of detecting leaks of 5 grams per year for stationary equipment. This high sensitivity is necessary to identify minor leaks before they become significant, minimising environmental impact and refrigerant loss.',
  },
  {
    id: 12,
    question: 'Performance verification of a chiller should include measurement of:',
    options: [
      'Only the leaving chilled water temperature',
      'Flow rates, temperatures (entering/leaving), electrical input, and calculated COP',
      'Just the compressor current',
      'Only the condensing temperature',
    ],
    correctAnswer: 1,
    explanation:
      'Comprehensive chiller verification requires measuring: chilled water flow rate and temperatures (entering/leaving), condenser water or air temperatures, electrical power input, and calculating the coefficient of performance (COP) to compare against rated values.',
  },
  {
    id: 13,
    question: 'BSRIA commissioning procedures specify that test instruments should be:',
    options: [
      'New and unused',
      'Calibrated within the previous 12 months with certificates available',
      'Manufacturer calibrated only',
      'Self-calibrating digital instruments only',
    ],
    correctAnswer: 1,
    explanation:
      'BSRIA requires test instruments to have valid calibration certificates, typically within the previous 12 months, traceable to national standards. Calibration certificates must be available for inspection and referenced in commissioning documentation.',
  },
  {
    id: 14,
    question: 'The handover meeting for an air conditioning system should cover:',
    options: [
      'Only the warranty period',
      'System operation, maintenance requirements, emergency procedures, and documentation location',
      'Just the energy consumption',
      'Only the control system password',
    ],
    correctAnswer: 1,
    explanation:
      'Handover meetings should comprehensively cover: system operation demonstration, routine maintenance requirements, emergency shutdown procedures, location of isolation valves and controls, O&M documentation location, training records, and key contact details for support.',
  },
];

const faqs = [
  {
    question: 'What is the correct sequence for commissioning a new split system installation?',
    answer:
      'The correct sequence is: 1) Complete installation and pressure test with OFN at 1.1x design pressure, 2) Perform electronic leak detection on all joints, 3) Evacuate to below 500 microns and hold for 30+ minutes, 4) Release factory charge (outdoor unit) and add additional refrigerant per pipe run length, 5) Power up and check electrical parameters, 6) Run cooling mode and measure superheat/subcooling, 7) Verify airflow rates and temperatures, 8) Test all control functions, 9) Complete documentation and handover.',
  },
  {
    question: 'How do I calculate the additional refrigerant charge for a VRF installation?',
    answer:
      "Additional charge is calculated from the manufacturer's charging tables based on liquid line pipe diameter and length. For example, R410A typically requires 20-30g per metre for 9.52mm liquid pipe. The formula is: Additional charge = Length (m) x Charge factor (g/m). Some manufacturers also specify deductions for factory pre-charge in the outdoor unit. Always refer to the specific manufacturer's installation manual for exact values.",
  },
  {
    question: 'What are the F-Gas record keeping requirements for commissioning?',
    answer:
      'F-Gas Regulations require maintaining records for 5 years including: quantity and type of refrigerant installed, dates of installation and leak checks, identification of technicians (certificate numbers), leak check results and any leaks found, quantities recovered and added, and decommissioning records. Records must be available for inspection by enforcement authorities and should be kept both by the equipment operator and the service company.',
  },
  {
    question:
      'How should I handle a system that fails to achieve design performance during commissioning?',
    answer:
      'First, systematically verify: airflow rates match design (check fan speeds, ductwork restrictions), refrigerant charge is correct (superheat/subcooling), no restrictions in refrigerant circuit (filter driers, TXV), electrical supply is correct (voltage, phase balance), and controls are properly configured. Document all findings. If issues persist, consult with the designer and manufacturer. Do not sign off commissioning until performance is acceptable or deviations are formally agreed and documented.',
  },
  {
    question: 'What training and certification is required for commissioning engineers?',
    answer:
      'Engineers must hold: F-Gas certification appropriate to the work (typically Category I for full servicing activities), competence in the specific system type (manufacturer training recommended), and understanding of commissioning procedures (BSRIA/CIBSE). For witness testing, HVAC commissioning manager certification (such as CIBSE Commissioning Manager registration) may be required on larger projects. CPD should be maintained to keep current with regulation changes.',
  },
  {
    question: 'What documentation should be handed over to the client?',
    answer:
      'The handover package should include: O&M manuals (operating and maintenance volumes), as-built drawings and schematics, commissioning records with all test results, Electrical Installation Certificate, F-Gas installation record and equipment labels, manufacturer warranties and registration, spare parts lists with supplier contacts, training attendance records, emergency contact information, and maintenance contract recommendations. Digital copies should also be provided where specified.',
  },
];

const HNCModule8Section3_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 3 · Subsection 6"
            title="Commissioning and Testing"
            description="Refrigerant charging, leak testing, performance verification, F-Gas compliance, and handover requirements"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Execute refrigerant charging procedures safely and accurately",
              "Perform pressure testing and leak detection per BS EN 378",
              "Measure and interpret superheat and subcooling values",
              "Verify system performance against design specifications",
              "Understand F-Gas certification and record keeping requirements",
              "Compile comprehensive commissioning documentation for handover",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Refrigerant Charging Procedures">
            <p>Correct refrigerant charging is critical to system performance, efficiency, and longevity. The charging process must follow a methodical sequence to ensure safety and achieve optimal system operation from the outset.</p>
            <p><strong>Pre-Charging Requirements:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pressure test:</strong> System tested with OFN at 1.1x maximum allowable pressure</li>
              <li><strong>Leak detection:</strong> Electronic detector check on all joints and connections</li>
              <li><strong>Evacuation:</strong> Triple evacuation recommended, final vacuum below 500 microns</li>
              <li><strong>Standing vacuum:</strong> Hold for minimum 30 minutes with no pressure rise</li>
              <li><strong>Charge calculation:</strong> Factory pre-charge plus additional charge per pipe length</li>
            </ul>
            <p><strong>Refrigerant Charging Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Liquid charging:</strong> Standard for R410A, R32, blends — Charge through liquid line valve, system off initially</li>
              <li><strong>Vapour charging:</strong> Single-component refrigerants only — Charge through suction side, compressor running</li>
              <li><strong>Weigh-in method:</strong> All systems - most accurate — Pre-calculated charge weighed using electronic scales</li>
              <li><strong>Superheat method:</strong> Fixed orifice systems, top-up — Charge until target superheat achieved</li>
              <li><strong>Subcooling method:</strong> TXV systems, verification — Charge until target subcooling achieved</li>
            </ul>
            <p><strong>Critical Safety Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Never charge liquid refrigerant directly into the suction (low-pressure) side</li>
              <li>Always invert cylinder when liquid charging through manifold</li>
              <li>Wear appropriate PPE: safety glasses, gloves, and ensure ventilation</li>
              <li>Only F-Gas certified personnel may handle fluorinated refrigerants</li>
              <li>Never mix different refrigerant types - complete system recovery required first</li>
            </ul>
            <p><strong>VRF Additional Charge Calculation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>System:</strong> R410A VRF with 85m liquid line (9.52mm dia)</li>
              <li><strong>Factory charge:</strong> 8.5 kg (outdoor unit)</li>
              <li><strong>Additional charge factor:</strong> 25 g/m for 9.52mm liquid line</li>
              <li><strong>Calculation:</strong> 85m x 25g/m = 2,125g = 2.125 kg</li>
            </ul>
            <p>Total system charge: 8.5 + 2.125 = 10.625 kg</p>
            <p><strong>Best practice:</strong> Always record the exact refrigerant quantity charged on the system label and in the commissioning documentation. This is a legal requirement under F-Gas Regulations.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="System Testing and Leak Detection">
            <p>Comprehensive testing ensures system integrity and compliance with safety standards. BS EN 378 specifies requirements for pressure testing, leak detection, and evacuation that must be followed before introducing refrigerant.</p>
            <p><strong>Pressure Testing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use OFN only (never air)</li>
              <li>High side: 1.1x design pressure</li>
              <li>Low side: 1.1x design pressure</li>
              <li>Hold for 30 minutes minimum</li>
              <li>Check for pressure drop</li>
            </ul>
            <p><strong>Leak Detection</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Electronic detector (5 g/yr sensitivity)</li>
              <li>Check all brazed/flared joints</li>
              <li>Valve stems and cores</li>
              <li>Service connections</li>
              <li>Factory connections</li>
            </ul>
            <p><strong>Evacuation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use vacuum pump rated for system</li>
              <li>Target: below 500 microns</li>
              <li>Use micron gauge at system</li>
              <li>Triple evacuation if wet</li>
              <li>Standing test: 30-60 mins</li>
            </ul>
            <p><strong>BS EN 378 Test Pressures for Common Refrigerants</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>R410A:</strong> 28-30 — 31-33 — ~25</li>
              <li><strong>R32:</strong> 28-30 — 31-33 — ~25</li>
              <li><strong>R134a:</strong> 15-18 — 17-20 — ~12</li>
              <li><strong>R407C:</strong> 24-26 — 26-29 — ~20</li>
            </ul>
            <p><strong>Evacuation Procedure Sequence</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Connect vacuum pump and micron gauge to service ports</li>
              <li>Open all service valves and ensure refrigerant circuit is complete</li>
              <li>Start vacuum pump and evacuate to below 1000 microns</li>
              <li>Break vacuum with OFN to 0.5 bar (moisture sweep)</li>
              <li>Repeat evacuation to below 500 microns</li>
              <li>For wet systems, perform third evacuation cycle</li>
              <li>Isolate pump and monitor vacuum for 30-60 minutes</li>
              <li>Vacuum should hold - any rise indicates leak or moisture</li>
            </ul>
            <p><strong>F-Gas requirement:</strong> Electronic leak detectors must be capable of detecting leaks of 5 grams per year minimum for compliance with current regulations.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Performance Verification">
            <p>Performance verification confirms that the installed system meets design specifications. Key parameters including superheat, subcooling, airflow rates, and temperatures must be measured and compared against design criteria per CIBSE Code M requirements.</p>
            <p><strong>Superheat and Subcooling Measurement</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Superheat:</strong> Evaporator outlet (suction line) — Actual temp - Saturation temp (at suction pressure) — 5-8 K (TXV systems)</li>
              <li><strong>Subcooling:</strong> Condenser outlet (liquid line) — Saturation temp (at discharge pressure) - Actual temp — 5-10 K</li>
              <li><strong>Discharge superheat:</strong> Compressor discharge line — Discharge temp - Saturation temp (at discharge pressure) — 20-40 K</li>
            </ul>
            <p><strong>Superheat Calculation Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>System:</strong> R410A DX split system</li>
              <li><strong>Suction pressure:</strong> 8.5 bar (gauge) = 9.5 bar (abs)</li>
              <li><strong>Saturation temp at 9.5 bar abs:</strong> 6°C (from P-T chart)</li>
              <li><strong>Measured suction temp:</strong> 12°C</li>
            </ul>
            <p>Superheat = 12°C - 6°C = 6K (within normal range)</p>
            <p><strong>Interpreting Superheat/Subcooling Readings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Undercharge:</strong> High (&gt;10K) — Low (&lt;3K) — Add refrigerant</li>
              <li><strong>Overcharge:</strong> Low (&lt;3K) — High (&gt;15K) — Remove refrigerant</li>
              <li><strong>Restriction:</strong> High — Normal/High — Check filter drier/TXV</li>
              <li><strong>Low airflow:</strong> Low — Normal — Check fan/filters/ductwork</li>
            </ul>
            <p><strong>CIBSE Code M Performance Verification Checklist</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Airflow measurement:</strong> Verify supply and return airflow rates against design</li>
              <li><strong>Temperature differential:</strong> Air-on/air-off across cooling coil (typically 8-12K)</li>
              <li><strong>Refrigerant temperatures:</strong> Suction, liquid, discharge as per design</li>
              <li><strong>Electrical parameters:</strong> Voltage, current, power factor within rated values</li>
              <li><strong>Condensing pressure:</strong> Within manufacturer limits for ambient conditions</li>
              <li><strong>Control operation:</strong> Setpoint response, staging, defrost cycles</li>
            </ul>
            <p><strong>Cooling Capacity Verification</strong></p>
            <p><strong>Air Side Method</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q = m x Cp x ΔT</li>
              <li>Where: m = mass flow rate (kg/s)</li>
              <li>Cp = specific heat (1.0 kJ/kgK for air)</li>
              <li>ΔT = temperature drop (K)</li>
            </ul>
            <p><strong>Water Side Method (Chillers)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q = m x Cp x ΔT</li>
              <li>Where: m = flow rate (l/s)</li>
              <li>Cp = 4.18 kJ/kgK for water</li>
              <li>ΔT = chilled water differential (K)</li>
            </ul>
            <p><strong>Documentation requirement:</strong> Record all measured values alongside design parameters. Document any deviations with explanations and corrective actions taken.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Commissioning Documentation and Handover">
            <p>Comprehensive documentation is essential for system handover, ongoing maintenance, and regulatory compliance. F-Gas Regulations impose specific record-keeping requirements, whilst CIBSE Code M and BSRIA provide standards for commissioning documentation.</p>
            <p><strong>F-Gas Record Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Installation record:</strong> Refrigerant type, quantity, date, technician details — 5 years minimum</li>
              <li><strong>Equipment label:</strong> Refrigerant type, charge (kg), GWP, CO2e (tonnes) — Permanent on equipment</li>
              <li><strong>Leak check records:</strong> Date, method, results, leaks found/repaired — 5 years minimum</li>
              <li><strong>Service records:</strong> Refrigerant added/recovered, technician F-Gas cert no. — 5 years minimum</li>
            </ul>
            <p><strong>F-Gas Certification Categories</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Category I:</strong> All activities - leak checking, recovery, installation, maintenance</li>
              <li><strong>Category II:</strong> Recovery, installation, and maintenance (no leak checking)</li>
              <li><strong>Category III:</strong> Recovery for systems &lt;3kg hermetically sealed</li>
              <li><strong>Category IV:</strong> Leak checking only (no breach of refrigerant circuit)</li>
            </ul>
            <p><strong>O&M Manual Contents for HVAC Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>System description:</strong> Overview, schematics, component locations</li>
              <li><strong>Operating procedures:</strong> Start-up, normal operation, shutdown, seasonal changeover</li>
              <li><strong>Emergency procedures:</strong> Refrigerant leak response, electrical isolation</li>
              <li><strong>Maintenance schedules:</strong> PPM tasks, frequencies, competence requirements</li>
              <li><strong>Equipment data sheets:</strong> All manufacturer literature and specifications</li>
              <li><strong>Commissioning records:</strong> All test results and certificates</li>
              <li><strong>As-built drawings:</strong> Updated schematic, layout, wiring diagrams</li>
              <li><strong>Spare parts:</strong> Recommended spares list with part numbers and suppliers</li>
            </ul>
            <p><strong>Commissioning Record Sheet Contents</strong></p>
            <p><strong>System Identification</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Equipment tag/reference</li>
              <li>Manufacturer and model</li>
              <li>Serial number</li>
              <li>Location</li>
              <li>Refrigerant type and charge</li>
            </ul>
            <p><strong>Measured Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Suction/discharge pressures</li>
              <li>Superheat/subcooling</li>
              <li>Airflow rates</li>
              <li>Supply/return temperatures</li>
              <li>Electrical readings (V, A, kW)</li>
            </ul>
            <p><strong>Handover Meeting Agenda</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Documentation review:</strong> O&M manuals, as-builts, certificates location</li>
              <li><strong>System demonstration:</strong> Control panel operation, setpoint adjustment</li>
              <li><strong>Emergency procedures:</strong> Isolation points, leak response, shutdown</li>
              <li><strong>Maintenance requirements:</strong> Filter changes, leak checks, service intervals</li>
              <li><strong>Warranties:</strong> Equipment warranties, registration requirements</li>
              <li><strong>Training sign-off:</strong> Attendee list, competence confirmation</li>
              <li><strong>Contacts:</strong> Installer, manufacturer, emergency callout</li>
            </ul>
            <p><strong>Mandatory Leak Check Frequencies (F-Gas)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>&lt;5 tonnes CO2e:</strong> No mandatory check — N/A</li>
              <li><strong>5-50 tonnes CO2e:</strong> Annually — Every 2 years</li>
              <li><strong>50-500 tonnes CO2e:</strong> Every 6 months — Annually</li>
              <li><strong>&gt;500 tonnes CO2e:</strong> Every 3 months — Every 6 months</li>
            </ul>
            <p><strong>CO2e calculation:</strong> Multiply refrigerant charge (kg) by the GWP value. For example, 10kg of R410A (GWP 2088) = 10 x 2088 / 1000 = 20.88 tonnes CO2e.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Commissioning a Split System</strong>
            </p>
            <p><strong>Scenario:</strong> Commission a new 7kW R32 split system with 15m pipe run.</p>
            <p>Step 1: Pressure test</p>
            <p>Charge system with OFN to 33 bar (1.1 x 30 bar design)</p>
            <p>Hold for 30 minutes - no pressure drop confirmed</p>
            <p>Step 2: Leak test</p>
            <p>Electronic detector at 5g/yr sensitivity</p>
            <p>Check all flare connections, service valves - no leaks found</p>
            <p>Step 3: Evacuation</p>
            <p>Triple evacuation to 450 microns</p>
            <p>Standing test 45 mins - vacuum held stable</p>
            <p>Step 4: Charging</p>
            <p>Factory charge: 1.2 kg</p>
            <p>Additional: 15m x 20g/m = 300g = 0.3 kg</p>
            <p>Total charge: 1.5 kg R32</p>
            <p>Step 5: Performance verification</p>
            <p>Superheat: 7K (target 5-8K) - correct</p>
            <p>Subcooling: 8K (target 5-10K) - correct</p>
            <p>Supply air temp: 14°C (design 12-15°C) - acceptable</p>
            <p>Result: System commissioned successfully</p>
            <p>
              <strong>Example 2: Diagnosing Performance Issue</strong>
            </p>
            <p><strong>Scenario:</strong> R410A system not achieving design cooling capacity.</p>
            <p>Measured parameters:</p>
            <p>Suction pressure: 7.0 bar (low)</p>
            <p>Discharge pressure: 24 bar (normal)</p>
            <p>Suction temp: 18°C</p>
            <p>Saturation temp at 7.0 bar: 2°C</p>
            <p>Superheat: 18 - 2 = 16K (high!)</p>
            <p>Liquid line temp: 38°C</p>
            <p>Saturation temp at 24 bar: 45°C</p>
            <p>Subcooling: 45 - 38 = 7K (normal)</p>
            <p>Analysis:</p>
            <p>High superheat with normal subcooling suggests:</p>
            <p>- Restriction in liquid line (filter drier/TXV)</p>
            <p>- Or insufficient refrigerant reaching evaporator</p>
            <p>Action:</p>
            <p>Checked filter drier temp drop: 8K across filter</p>
            <p>Replaced blocked filter drier</p>
            <p>Result: Superheat returned to 6K, capacity restored</p>
            <p>
              <strong>Example 3: F-Gas Documentation</strong>
            </p>
            <p><strong>Scenario:</strong> Complete F-Gas records for a VRF installation.</p>
            <p>Equipment details:</p>
            <p>System: VRF heat pump system</p>
            <p>Refrigerant: R410A (GWP: 2088)</p>
            <p>Factory charge: 12.5 kg</p>
            <p>Additional charge: 3.2 kg</p>
            <p>Total charge: 15.7 kg</p>
            <p>CO2 equivalent calculation:</p>
            <p>15.7 kg x 2088 = 32,782 kg CO2e</p>
            <p>= 32.78 tonnes CO2e</p>
            <p>Leak check requirement:</p>
            <p>5-50 tCO2e band = Annual leak check required</p>
            <p>Equipment label must show:</p>
            <p>Refrigerant: R410A</p>
            <p>Charge: 15.7 kg</p>
            <p>GWP: 2088</p>
            <p>CO2e: 32.78 tonnes</p>
            <p>Records retained for minimum 5 years</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Commissioning Checklist Summary:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pressure test with OFN at 1.1x design pressure - no leaks</li>
              <li>Electronic leak detection on all joints and connections</li>
              <li>Evacuate to &lt;500 microns, hold for 30+ minutes</li>
              <li>Charge refrigerant by weight per manufacturer specification</li>
              <li>Verify superheat (5-8K) and subcooling (5-10K)</li>
              <li>Measure airflow rates and temperature differentials</li>
              <li>Check electrical parameters against nameplate</li>
              <li>Test all control functions and safety devices</li>
              <li>Complete F-Gas records and equipment labels</li>
              <li>Compile O&M documentation and handover</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Test pressure: <strong>1.1 x maximum allowable pressure</strong></li>
              <li>Evacuation target: <strong>&lt;500 microns (0.67 mbar)</strong></li>
              <li>Normal superheat: <strong>5-8 K</strong> (TXV systems)</li>
              <li>Normal subcooling: <strong>5-10 K</strong></li>
              <li>Leak detector sensitivity: <strong>5 g/year minimum</strong></li>
              <li>F-Gas record retention: <strong>5 years minimum</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Insufficient evacuation:</strong> Moisture causes acid formation and compressor failure</li>
                <li><strong>Liquid slugging:</strong> Never charge liquid refrigerant into suction side</li>
                <li><strong>Wrong charge calculation:</strong> Always follow manufacturer pipe length factors</li>
                <li><strong>Missing F-Gas records:</strong> Legal requirement - penalties for non-compliance</li>
                <li><strong>Incomplete handover:</strong> O&M manuals and training essential for warranty</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                System selection
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                BMS and controls
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section3_6;
