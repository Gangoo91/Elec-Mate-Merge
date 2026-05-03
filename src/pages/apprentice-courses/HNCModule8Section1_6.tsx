/**
 * Module 8 · Section 1 · Subsection 6 — System Commissioning
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Professional commissioning procedures for heating systems in compliance with BSRIA and Building Regulations
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

const TITLE = 'System Commissioning - HNC Module 8 Section 1.6';
const DESCRIPTION =
  'Master heating system commissioning procedures: flushing, filling, pressurising, balancing, performance testing and handover documentation in accordance with BSRIA and Building Regulations.';

const quickCheckQuestions = [
  {
    id: 'flushing-velocity',
    question:
      'What minimum flushing velocity is recommended by BSRIA for effective debris removal?',
    options: ['0.5 m/s', '1.0 m/s', '1.5 m/s', '2.0 m/s'],
    correctIndex: 1,
    explanation:
      'BSRIA recommends a minimum flushing velocity of 1.0 m/s to ensure effective removal of debris, flux residues and installation contaminants from heating systems.',
  },
  {
    id: 'pressure-test-duration',
    question:
      'For a standard hydraulic pressure test on a sealed heating system, what is the minimum test duration?',
    options: ['10 minutes', '30 minutes', '1 hour', '2 hours'],
    correctIndex: 2,
    explanation:
      'A hydraulic pressure test should be maintained for a minimum of 1 hour (some standards specify 2 hours) to allow detection of slow leaks and joint failures under sustained pressure.',
  },
  {
    id: 'balancing-tolerance',
    question:
      'What is the typical acceptable tolerance when balancing flow rates to design values?',
    options: ['+/- 5%', '+/- 10%', '+/- 15%', '+/- 20%'],
    correctIndex: 1,
    explanation:
      'Flow rates should be balanced to within +/- 10% of design values. This tolerance ensures adequate heat output while accounting for practical measurement limitations on site.',
  },
  {
    id: 'handover-requirement',
    question:
      'Under Building Regulations Part L, which document must be provided at handover for new heating installations?',
    options: [
      'Manufacturer warranty only',
      'Building log book with commissioning records',
      'Visual inspection certificate',
      'Energy bill estimate',
    ],
    correctIndex: 1,
    explanation:
      'Building Regulations Part L requires a building log book containing commissioning records, operating instructions and maintenance schedules to be provided at handover for compliance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to BSRIA guidance, what is the primary purpose of system flushing before commissioning?',
    options: [
      'To check for leaks in the pipework',
      'To remove debris, flux residues and installation contaminants',
      'To test the pump performance',
      'To fill the system with inhibitor',
    ],
    correctAnswer: 1,
    explanation:
      'System flushing removes debris, flux residues, jointing compounds and other installation contaminants that could damage pumps, valves and heat exchangers or cause circulation problems.',
  },
  {
    id: 2,
    question:
      'What is the recommended test pressure for a sealed heating system hydraulic pressure test?',
    options: [
      'System working pressure',
      '1.1 times working pressure',
      '1.5 times working pressure or 3 bar (whichever is greater)',
      'Double the working pressure',
    ],
    correctAnswer: 2,
    explanation:
      'The test pressure should be 1.5 times the maximum working pressure or 3 bar, whichever is greater. This ensures adequate safety margin while not exceeding component ratings.',
  },
  {
    id: 3,
    question:
      'When filling a heating system, why should the fill point be at the lowest point of the system?',
    options: [
      'To reduce filling time',
      'To allow air to rise and escape through vents as water enters',
      'To minimise water pressure',
      'To protect the pump from dry running',
    ],
    correctAnswer: 1,
    explanation:
      'Filling from the lowest point allows air to rise naturally and escape through automatic air vents or manual bleed points as water progressively fills the system from bottom to top.',
  },
  {
    id: 4,
    question: 'What is the purpose of proportional balancing when commissioning a heating system?',
    options: [
      'To set all valves to the same position',
      'To achieve design flow rates through each circuit relative to the index circuit',
      'To maximise system pressure',
      'To test the boiler efficiency',
    ],
    correctAnswer: 1,
    explanation:
      'Proportional balancing adjusts regulating valves so each circuit receives its design flow rate proportional to the index circuit (longest/highest resistance path), ensuring even heat distribution.',
  },
  {
    id: 5,
    question: 'During commissioning, what indicates that a system has been adequately flushed?',
    options: [
      'Water temperature reaches 60 degrees C',
      'Pump pressure gauge reads correctly',
      'Discharge water runs clear with no visible debris',
      'All radiators feel warm',
    ],
    correctAnswer: 2,
    explanation:
      'Flushing is complete when discharge water runs clear with no visible debris, sediment or discolouration. Some specifications also require turbidity testing for critical applications.',
  },
  {
    id: 6,
    question: 'What water treatment is typically required after flushing and before final filling?',
    options: [
      'Chlorination only',
      'Corrosion inhibitor and biocide treatment',
      'Softened water only',
      'No treatment required',
    ],
    correctAnswer: 1,
    explanation:
      'Corrosion inhibitor protects system metals from corrosion while biocide prevents bacterial growth. These treatments are essential for long-term system health and should be added at correct concentrations.',
  },
  {
    id: 7,
    question:
      'What document provides the benchmark commissioning procedures for HVAC systems in the UK?',
    options: [
      'BS 7593 only',
      'Manufacturer instructions only',
      'BSRIA commissioning guides (BG series)',
      'Building Regulations Part F',
    ],
    correctAnswer: 2,
    explanation:
      'BSRIA commissioning guides (particularly BG 29 for water systems) provide comprehensive, industry-standard commissioning procedures. BS 7593 covers water treatment specifically.',
  },
  {
    id: 8,
    question: 'When balancing radiator circuits, which radiator should be balanced first?',
    options: [
      'The largest radiator',
      'The radiator nearest the boiler',
      'The index radiator (furthest from pump/highest resistance)',
      "Any radiator - order doesn't matter",
    ],
    correctAnswer: 2,
    explanation:
      'The index radiator (highest resistance circuit) is set first with its lockshield fully open. All other radiators are then throttled back proportionally to achieve their design flow rates.',
  },
  {
    id: 9,
    question:
      'What is the minimum information required on a commissioning certificate for Building Regulations compliance?',
    options: [
      'Installer name and date only',
      'Design flow rates, achieved flow rates, test pressures and commissioning engineer details',
      'Boiler serial number only',
      'Customer signature only',
    ],
    correctAnswer: 1,
    explanation:
      'Commissioning certificates must record design parameters, achieved values, test results, any deviations, and be signed by a competent commissioning engineer to demonstrate compliance.',
  },
  {
    id: 10,
    question: 'What is the purpose of the witnessed performance test during commissioning?',
    options: [
      'To train the building owner',
      'To verify system achieves design performance under realistic operating conditions',
      'To check the warranty is valid',
      'To test the BMS graphics',
    ],
    correctAnswer: 1,
    explanation:
      'Witnessed performance testing verifies the complete system achieves its design intent under realistic conditions, with the client or their representative observing and signing off the results.',
  },
  {
    id: 11,
    question:
      'Under BS 7593, what concentration of corrosion inhibitor is typically required for sealed heating systems?',
    options: [
      'No specific concentration required',
      "Manufacturer's recommended concentration verified by test",
      'Maximum possible concentration',
      'Same as domestic hot water systems',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7593 requires inhibitor at the manufacturer's recommended concentration, verified by on-site testing (litmus test, conductivity or specific test kit). Records must be kept.",
  },
  {
    id: 12,
    question:
      'What handover documentation must be provided to comply with Building Regulations Part L for a new commercial heating installation?',
    options: [
      'Invoice and warranty card',
      'Building log book with O&M manuals, commissioning records and energy metering data',
      'Boiler manual only',
      'Planning permission documents',
    ],
    correctAnswer: 1,
    explanation:
      'Part L requires a building log book containing: O&M manuals, as-built drawings, commissioning records, control system operating instructions, maintenance schedules and sub-metering details.',
  },
];

const faqs = [
  {
    question: 'What is the difference between flushing and power flushing?',
    answer:
      'Standard flushing uses mains pressure or a dedicated flushing pump to circulate water through the system at high velocity (minimum 1.0 m/s) to remove loose debris. Power flushing uses a specialised pump that creates higher flow rates and can reverse flow direction, combined with chemicals and agitation, to remove more stubborn deposits including magnetite sludge. Power flushing is typically used for remedial cleaning of existing systems rather than new installations.',
  },
  {
    question: 'Why is water treatment so important in heating systems?',
    answer:
      'Untreated water causes corrosion of ferrous metals (producing black magnetite sludge), scale formation from hard water minerals, and bacterial growth including legionella risk in certain conditions. These problems reduce system efficiency, cause blockages, damage components and can lead to premature failure. BS 7593 and manufacturer warranties require appropriate water treatment for sealed systems.',
  },
  {
    question: 'How do I determine the design flow rate for balancing?',
    answer:
      'Design flow rates are calculated from the heat output and design temperature differential. Flow rate (l/s) = Heat output (kW) / (4.19 x temperature differential). For a typical radiator system with 20 degrees C differential (80/60 degrees C flow/return), this simplifies to approximately 0.012 l/s per kW. These values should be specified in the design documentation.',
  },
  {
    question: 'What happens if a system fails the pressure test?',
    answer:
      'If pressure drops during the test, there is a leak. Isolate sections systematically to locate the leak, repair it, and retest. Common leak locations include compression fittings, soldered joints (especially where flux was insufficient), valve glands, air vents and radiator connections. The test must be passed before proceeding to filling and commissioning.',
  },
  {
    question: 'Who can sign off commissioning for Building Regulations compliance?',
    answer:
      'Commissioning must be carried out and certified by a competent person with appropriate training and experience. For domestic work, this is typically the installing contractor self-certifying under a Competent Person Scheme. For commercial work, an independent commissioning engineer or specialist commissioning contractor may be required, particularly for complex systems.',
  },
  {
    question: 'What records should be retained after commissioning?',
    answer:
      'Retain: commissioning certificates with all measured values, pressure test certificates, water treatment records and test results, as-built drawings, equipment schedules with serial numbers, warranty documents, O&M manuals, control system settings and BMS programming records, and any deviation reports. These form part of the building log book and are essential for future maintenance and compliance verification.',
  },
];

const HNCModule8Section1_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 1 · Subsection 6"
            title="System Commissioning"
            description="Professional commissioning procedures for heating systems in compliance with BSRIA and Building Regulations"
            tone="purple"
          />

          <ConceptBlock title="System Flushing and Pre-Commissioning Cleaning">
            <p>System flushing is a critical pre-commissioning procedure that removes debris, flux residues, jointing compounds and other installation contaminants from pipework before the system is put into service. BSRIA BG 29 provides comprehensive guidance for pre-commissioning cleaning.</p>
            <p><strong>Why Flushing is Essential</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Debris removal:</strong> Swarf, solder, flux residue and pipe scale can block valves, pumps and heat exchangers</li>
              <li><strong>Pump protection:</strong> Abrasive particles damage pump impellers and seals</li>
              <li><strong>Heat transfer:</strong> Deposits reduce heat exchanger efficiency</li>
              <li><strong>Corrosion prevention:</strong> Flux residues are corrosive and must be removed</li>
              <li><strong>Warranty compliance:</strong> Many manufacturers require evidence of proper flushing</li>
            </ul>
            <p><strong>BSRIA Flushing Procedure</strong></p>
            <p><strong>Flushing Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum velocity: <strong>1.0 m/s</strong> (preferably 1.5 m/s)</li>
              <li>Flow must reach all parts of the system</li>
              <li>Continue until discharge runs clear</li>
              <li>Isolate sensitive equipment (heat meters, etc.)</li>
            </ul>
            <p><strong>Flushing Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Mains pressure:</strong> For smaller systems if velocity achieved</li>
              <li><strong>Dedicated flushing pump:</strong> Higher velocities possible</li>
              <li><strong>Sequential isolation:</strong> Ensures all branches flushed</li>
              <li><strong>Reverse flow:</strong> Helps dislodge stubborn debris</li>
            </ul>
            <p><strong>Flushing Sequence</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Step 1:</strong> Install temporary strainers at pump suctions and before sensitive equipment</li>
              <li><strong>Step 2:</strong> Connect flushing supply to lowest fill point</li>
              <li><strong>Step 3:</strong> Open all valves (lockshields, zone valves, TRVs fully open)</li>
              <li><strong>Step 4:</strong> Flush mains and risers first, then individual branches</li>
              <li><strong>Step 5:</strong> Continue until discharge water is clear (visually inspect and/or turbidity test)</li>
              <li><strong>Step 6:</strong> Remove temporary strainers and inspect permanent strainers</li>
            </ul>
            <p><strong>Chemical Cleaning</strong></p>
            <p>For heavily contaminated systems or where water-only flushing is insufficient, chemical cleaning may be required:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cleaning agent:</strong> Proprietary system cleaner circulated at elevated temperature</li>
              <li><strong>Contact time:</strong> Follow manufacturer's instructions (typically 1-2 hours)</li>
              <li><strong>Neutralisation:</strong> Drain, flush thoroughly, test pH before refilling</li>
              <li><strong>Disposal:</strong> Discharge in accordance with environmental regulations</li>
            </ul>
            <p><strong>Documentation:</strong> Record flushing dates, methods used, duration and visual inspection results. Photograph the discharge water at start and end of flushing for evidence of cleanliness achieved.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Filling, Pressurising and Water Treatment">
            <p>After successful flushing, the system must be correctly filled, vented, pressure tested and treated with appropriate chemicals. This stage establishes the baseline system integrity and water quality essential for long-term reliable operation.</p>
            <p><strong>System Filling Procedure</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fill point:</strong> Connect to lowest point to allow air to rise and escape</li>
              <li><strong>Fill rate:</strong> Slow enough to allow air venting (avoid air entrainment)</li>
              <li><strong>Air venting:</strong> Open all manual air vents, check AAVs are functioning</li>
              <li><strong>Fill pressure:</strong> Target cold fill pressure (typically 1-1.5 bar for domestic, as designed for commercial)</li>
              <li><strong>Circulation:</strong> Run pump to circulate and release dissolved air</li>
            </ul>
            <p><strong>Hydraulic Pressure Testing</strong></p>
            <p><strong>Test Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Test pressure: <strong>1.5x working pressure</strong> or 3 bar minimum</li>
              <li>Duration: Minimum <strong>1 hour</strong> (some specs require 2 hours)</li>
              <li>Acceptable drop: None (allow for temperature effects)</li>
              <li>Gauge accuracy: Calibrated test gauge required</li>
            </ul>
            <p><strong>Test Procedure</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Isolate expansion vessel and PRV</li>
              <li>Fill system completely (no air)</li>
              <li>Pressurise using hydraulic test pump</li>
              <li>Record pressure at start and end</li>
              <li>Inspect all joints and connections</li>
            </ul>
            <p><strong>Water Treatment Requirements (BS 7593)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Corrosion inhibitor:</strong> Essential for all sealed systems to protect ferrous metals</li>
              <li><strong>Concentration:</strong> Manufacturer's recommended level, verified by on-site test</li>
              <li><strong>Biocide:</strong> May be required to prevent bacterial growth</li>
              <li><strong>Scale inhibitor:</strong> In hard water areas to prevent limescale buildup</li>
              <li><strong>Antifreeze:</strong> Where freeze protection required (e.g., solar thermal, exposed locations)</li>
            </ul>
            <p><strong>Water Quality Testing</strong></p>
            <p>Water quality should be tested and recorded at commissioning and during routine maintenance:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Inhibitor concentration:</strong> Proprietary test kit — Manufacturer's specification</li>
              <li><strong>pH:</strong> pH strips or meter — 7.5 - 9.0 (typically)</li>
              <li><strong>Total dissolved solids:</strong> TDS meter — &lt;500 ppm (varies)</li>
              <li><strong>Appearance:</strong> Visual inspection — Clear, no sediment</li>
            </ul>
            <p><strong>Record keeping:</strong> Document all water treatment products used, concentrations achieved and test results. Affix a permanent label to the system stating treatment type and date for future maintenance reference.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="System Balancing to Design Flow Rates">
            <p>System balancing ensures that each circuit and terminal unit receives its design flow rate, enabling the heating system to deliver the intended heat output to each space. BSRIA BG 2 provides the industry-standard procedures for commissioning water systems.</p>
            <p><strong>Why Balancing Matters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heat distribution:</strong> Without balancing, circuits nearest the pump receive excessive flow while remote circuits are starved</li>
              <li><strong>Comfort:</strong> Imbalanced systems cause hot and cold spots, leading to occupant complaints</li>
              <li><strong>Efficiency:</strong> Overflowing circuits waste pump energy; underflowing circuits require higher temperatures</li>
              <li><strong>Control:</strong> Balanced systems respond predictably to control signals</li>
            </ul>
            <p><strong>Balancing Methods</strong></p>
            <p><strong>Proportional Balancing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Set index circuit valve fully open</li>
              <li>Measure flow rate (or calculate from delta-T)</li>
              <li>Adjust other valves proportionally</li>
              <li>Work from index towards pump</li>
              <li>Recheck after all adjustments</li>
            </ul>
            <p><strong>PICV (Pressure Independent) Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>PICVs automatically limit flow to set point</li>
              <li>Set dial to design flow rate</li>
              <li>No proportional adjustment required</li>
              <li>Verify flow with measurement device</li>
              <li>Check differential pressure across PICV</li>
            </ul>
            <p><strong>Flow Measurement Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fixed orifice valves:</strong> Measure differential pressure across orifice, use valve chart to determine flow</li>
              <li><strong>Ultrasonic flow meter:</strong> Clamp-on device measures flow non-invasively</li>
              <li><strong>Temperature differential:</strong> Calculate flow from Q = m x Cp x delta-T (requires accurate thermometers)</li>
              <li><strong>Commissioning sets:</strong> Dedicated valves with integrated measurement ports</li>
            </ul>
            <p><strong>Balancing Procedure (Proportional Method)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Step 1:</strong> Identify index circuit (longest run, highest resistance path)</li>
              <li><strong>Step 2:</strong> Set index circuit regulating valve fully open</li>
              <li><strong>Step 3:</strong> Set pump to design duty (speed or head)</li>
              <li><strong>Step 4:</strong> Measure flow rate on index circuit</li>
              <li><strong>Step 5:</strong> Adjust total system flow to achieve index design flow</li>
              <li><strong>Step 6:</strong> Working from index towards pump, adjust each valve to achieve proportional flow</li>
              <li><strong>Step 7:</strong> Recheck all readings after complete balance</li>
            </ul>
            <p><strong>Design Flow Rate Calculation</strong></p>
            <p>Flow rate (l/s) = Heat output (kW) / (Cp x delta-T)</p>
            <p>Where: Cp = 4.19 kJ/kg.K for water</p>
            <p>delta-T = Design temperature differential (typically 10-20 degrees C)</p>
            <p>Example: 10 kW radiator, 20 degrees C differential</p>
            <p>Flow = 10 / (4.19 x 20) = 0.119 l/s = <strong>7.2 l/min</strong></p>
            <p><strong>Acceptable Tolerances</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Flow rate:</strong> +/- 10% of design value</li>
              <li><strong>Temperature differential:</strong> Within design range under load</li>
              <li><strong>Pump pressure:</strong> Able to achieve design flow at design head</li>
            </ul>
            <p><strong>Record all values:</strong> Document design flow rate, measured flow rate, valve position (turns open) and differential pressure for each circuit. These records are essential for future troubleshooting and re-commissioning.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Performance Testing and Handover Documentation">
            <p>Performance testing verifies that the complete heating system achieves its design intent under realistic operating conditions. Comprehensive handover documentation ensures compliance with Building Regulations and provides the building operator with the information needed for effective ongoing management.</p>
            <p><strong>Witnessed Performance Testing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Purpose:</strong> Demonstrate system meets design performance with client/engineer witness</li>
              <li><strong>Conditions:</strong> Test under realistic load conditions (heating season or artificial load)</li>
              <li><strong>Parameters:</strong> Temperatures, flow rates, pressures, control response, noise levels</li>
              <li><strong>Witness:</strong> Client, consulting engineer or clerk of works to sign off results</li>
            </ul>
            <p><strong>Performance Test Checklist</strong></p>
            <p><strong>Heat Generation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Boiler/heat pump firing and modulating correctly</li>
              <li>Flow and return temperatures as designed</li>
              <li>Flue gas analysis (combustion appliances)</li>
              <li>Safety controls functioning (high limit, frost, etc.)</li>
            </ul>
            <p><strong>Distribution and Controls</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pump operating at design duty</li>
              <li>Zone valves responding to thermostats</li>
              <li>TRVs modulating correctly</li>
              <li>BMS/controls operating as programmed</li>
              <li>Optimiser and compensator functioning</li>
            </ul>
            <p><strong>Building Regulations Part L Requirements</strong></p>
            <p>Part L of the Building Regulations requires heating systems to be commissioned and documented:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Commissioning:</strong> Systems must be commissioned by a competent person</li>
              <li><strong>Notice:</strong> Building Control must be notified of commissioning completion</li>
              <li><strong>Certificate:</strong> Commissioning certificate required (domestic: Benchmark, commercial: BSRIA format)</li>
              <li><strong>Building log book:</strong> Required for commercial buildings with O&M information</li>
            </ul>
            <p><strong>Commissioning Records Required</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pressure test certificate:</strong> Test pressure, duration, result, gauge calibration — Essential</li>
              <li><strong>Flushing record:</strong> Method, duration, cleanliness achieved — Essential</li>
              <li><strong>Water treatment record:</strong> Products used, concentrations, test results — Essential (BS 7593)</li>
              <li><strong>Balancing report:</strong> Design vs achieved flow rates, valve positions — Essential</li>
              <li><strong>Performance test results:</strong> Witnessed test data, signatures — Commercial projects</li>
              <li><strong>Control settings:</strong> Set points, schedules, parameters — Essential</li>
            </ul>
            <p><strong>Building Log Book Contents</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>As-built drawings:</strong> Showing actual installed equipment and routing</li>
              <li><strong>Equipment schedules:</strong> Makes, models, serial numbers, ratings</li>
              <li><strong>O&M manuals:</strong> For all significant plant items</li>
              <li><strong>Commissioning records:</strong> All test results and certificates</li>
              <li><strong>Control system documentation:</strong> Descriptions, schematics, programming</li>
              <li><strong>Maintenance schedules:</strong> Recommended maintenance frequencies and procedures</li>
              <li><strong>Energy metering:</strong> Meter schedules and reading instructions</li>
            </ul>
            <p><strong>Client Training Requirements</strong></p>
            <p>Handover should include training for building operators:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>System operation:</strong> Normal start-up, shutdown and seasonal changeover</li>
              <li><strong>Controls:</strong> Setting time schedules, temperatures, operating modes</li>
              <li><strong>Routine maintenance:</strong> Filter cleaning, pressure checks, visual inspections</li>
              <li><strong>Fault finding:</strong> Common problems and initial troubleshooting steps</li>
              <li><strong>Emergency procedures:</strong> Isolation, safety controls, who to contact</li>
            </ul>
            <p><strong>Compliance evidence:</strong> Retain copies of all commissioning documentation for a minimum of 6 years (longer for commercial buildings). These records may be required for compliance audits, warranty claims or future system modifications.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Calculating Design Flow Rate</strong>
            </p>
            <p><strong>Question:</strong> A radiator has a heat output of 2.5 kW. The system is designed for 80 degrees C flow and 60 degrees C return temperatures. Calculate the design flow rate.</p>
            <p>Design delta-T = 80 - 60 = 20 degrees C</p>
            <p>Flow rate = Heat output / (Cp x delta-T)</p>
            <p>Flow rate = 2.5 kW / (4.19 kJ/kg.K x 20 K)</p>
            <p>Flow rate = 2.5 / 83.8 = 0.0298 kg/s</p>
            <p>Converting to practical units (assuming water density 1 kg/L):</p>
            <p>Flow rate = 0.0298 L/s x 60 = <strong>1.79 L/min</strong></p>
            <p>
              <strong>Example 2: Pressure Test Requirements</strong>
            </p>
            <p><strong>Question:</strong> A sealed heating system has a maximum working pressure of 2.5 bar and is protected by a 3 bar pressure relief valve. What test pressure should be used and why?</p>
            <p>Standard requirement: 1.5 x working pressure OR 3 bar minimum</p>
            <p>Calculation: 1.5 x 2.5 bar = 3.75 bar</p>
            <p>However, the PRV is set at 3 bar, so testing at 3.75 bar would:</p>
            <p>- Either lift the PRV, or</p>
            <p>- Require removing/isolating the PRV during test</p>
            <p>Practical approach:</p>
            <p>1. Isolate or remove the PRV</p>
            <p>2. Test at <strong>3.75 bar for 1 hour minimum</strong></p>
            <p>3. Reinstall/reconnect PRV before system operation</p>
            <p>4. Record that PRV was isolated during test</p>
            <p>
              <strong>Example 3: Proportional Balancing</strong>
            </p>
            <p><strong>Question:</strong> A system has three radiator circuits with design flow rates of 2.0, 1.5 and 1.0 L/min respectively. The index circuit (2.0 L/min) valve is fully open. When measured, it achieves 2.2 L/min. The second circuit reads 1.8 L/min with its valve fully open. Calculate the required adjustment.</p>
            <p>Index circuit: Design 2.0 L/min, Measured 2.2 L/min</p>
            <p>Ratio = 2.2 / 2.0 = 1.10 (10% over design - acceptable)</p>
            <p>Circuit 2: Design 1.5 L/min, Measured 1.8 L/min</p>
            <p>Proportional target = 1.5 x 1.10 = 1.65 L/min</p>
            <p>Current reading = 1.8 L/min</p>
            <p>Action: Throttle Circuit 2 valve until flow reads <strong>1.65 L/min</strong></p>
            <p>Note: After adjusting, recheck index circuit as system</p>
            <p>resistance will have changed slightly.</p>
            <p>
              <strong>Example 4: Flushing Velocity Check</strong>
            </p>
            <p><strong>Question:</strong> A 22mm copper pipe circuit requires flushing. The available flushing pump delivers 15 L/min. Is this adequate for BSRIA-compliant flushing?</p>
            <p>22mm copper pipe internal diameter approx 20mm = 0.02m</p>
            <p>Cross-sectional area = pi x r squared</p>
            <p>Area = 3.14159 x (0.01)squared = 0.000314 m squared</p>
            <p>Flow rate = 15 L/min = 0.25 L/s = 0.00025 m cubed/s</p>
            <p>Velocity = Flow rate / Area</p>
            <p>Velocity = 0.00025 / 0.000314 = <strong>0.80 m/s</strong></p>
            <p>This is below the 1.0 m/s BSRIA minimum.</p>
            <p>Either use a higher capacity pump or flush smaller</p>
            <p>sections individually to achieve adequate velocity.</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Commissioning Sequence:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Pre-commissioning:</strong> Install strainers, clean pipework, flush system thoroughly</li>
              <li><strong>2. Pressure test:</strong> Hydraulic test at 1.5x working pressure for minimum 1 hour</li>
              <li><strong>3. Fill and treat:</strong> Fill from lowest point, vent air, add water treatment</li>
              <li><strong>4. Static commissioning:</strong> Check all components installed correctly, valves operational</li>
              <li><strong>5. Dynamic commissioning:</strong> Run system, set controls, balance flow rates</li>
              <li><strong>6. Performance testing:</strong> Verify design performance under load</li>
              <li><strong>7. Documentation:</strong> Complete all records, prepare handover pack</li>
            </ul>
            <p>
              <strong>Essential Equipment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Flow measurement:</strong> Ultrasonic meter, differential pressure gauge, commissioning valve charts</li>
              <li><strong>Temperature:</strong> Digital thermometers, infrared thermometer, surface probes</li>
              <li><strong>Pressure:</strong> Calibrated test gauge, hydraulic test pump</li>
              <li><strong>Water quality:</strong> Inhibitor test kit, pH strips, TDS meter</li>
              <li><strong>Electrical:</strong> Multimeter for control circuit verification</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Inadequate flushing:</strong> Leads to pump damage, blocked heat exchangers, valve failures</li>
                <li><strong>No water treatment:</strong> Causes corrosion, sludge buildup, system failure</li>
                <li><strong>Skipping pressure test:</strong> Leaks may only appear under operating pressure/temperature</li>
                <li><strong>Poor balancing:</strong> Results in comfort complaints, inefficient operation</li>
                <li><strong>Incomplete records:</strong> Creates compliance issues, maintenance problems</li>
                <li><strong>No client training:</strong> System operated incorrectly, premature failures</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Heating controls
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Ventilation systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section1_6;
