/**
 * MOET · Module 3 · Section 3.5 · Subsection 3 — Emergency Generators
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *     requirements: removing and replacing parts, inspecting, testing,
 *     setting up, adjusting, cleaning, and functional testing."
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use of monitoring and protection equipment."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  Scenario,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Emergency Generators - MOET Module 3.5.3';
const DESCRIPTION =
  'Comprehensive guide to emergency generators for maintenance technicians: diesel and gas generators, components, automatic start sequences, load testing, maintenance procedures, fuel storage and environmental considerations under ST1426.';

const quickCheckQuestions = [
  {
    id: 'gen-components',
    question: 'What are the four main components of a standby diesel generator set?',
    options: [
      'Diesel engine, alternator, control panel, fuel system',
      'Battery, inverter, controller, switch',
      'Compressor, condenser, evaporator, fan',
      'Motor, transformer, switchgear, cabling',
    ],
    correctIndex: 0,
    explanation:
      'A standby diesel generator set comprises four main components: the diesel engine (prime mover), the alternator (converts mechanical energy to electrical energy), the control panel (monitors parameters, manages start/stop sequences, provides alarms), and the fuel system (tank, filters, supply and return lines, day tank for larger sets).',
  },
  {
    id: 'avr-function',
    question: 'What is the function of the AVR (Automatic Voltage Regulator) on a generator?',
    options: [
      'To control the engine speed so the output frequency stays at 50 Hz under varying load',
      'To switch the load automatically from the mains supply to the generator on a power failure',
      'To filter water and particulates out of the diesel fuel before it reaches the injectors',
      'To maintain a constant output voltage by controlling the excitation current to the alternator field windings',
    ],
    correctIndex: 3,
    explanation:
      'The AVR (Automatic Voltage Regulator) maintains a constant output voltage from the alternator by automatically adjusting the excitation current to the field (rotor) windings. As the load changes, the AVR increases or decreases the field current to maintain the set-point voltage. Without an AVR, the output voltage would fluctuate with every load change.',
  },
  {
    id: 'load-bank',
    question: 'What is the purpose of load bank testing a generator?',
    options: [
      'To recharge the starting batteries quickly after a failed start attempt',
      'To measure the insulation resistance of the alternator stator windings',
      'To apply a controlled electrical load to verify the generator can deliver its rated output and to exercise the engine under load',
      'To top up the coolant and check the antifreeze concentration before winter',
    ],
    correctIndex: 2,
    explanation:
      "Load bank testing applies a controlled, adjustable electrical load to the generator to verify it can deliver its rated kW output, maintain voltage and frequency stability under load, and operate at full rated temperature. It also exercises the engine under load conditions that may not occur during normal standby operation — preventing 'wet stacking' caused by prolonged light-load or no-load running.",
  },
  {
    id: 'wet-stacking',
    question: "What is 'wet stacking' in a diesel generator?",
    options: [
      'Condensation collecting on the outside of the fuel tank in humid weather',
      'Coolant leaking past the water pump seal and pooling beneath the engine',
      'Accumulation of unburned fuel and carbon deposits in the exhaust system due to prolonged light-load operation',
      'Stacking spare fuel drums too close together against fire safety guidance',
    ],
    correctIndex: 2,
    explanation:
      'Wet stacking occurs when a diesel engine runs at light load (below approximately 30% of rated output) for extended periods. The engine does not reach its optimal operating temperature, resulting in incomplete combustion. Unburned fuel, soot and carbon deposits accumulate in the exhaust system, turbocharger and cylinder liners. This reduces performance, increases emissions and can cause engine damage. Regular load bank testing prevents wet stacking.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The engine governor on a generator controls:',
    options: [
      'The output voltage by adjusting the alternator excitation current',
      'The engine speed (and therefore the output frequency)',
      'The transfer of load between the mains and the generator',
      'The engine temperature by regulating the radiator fan speed',
    ],
    correctAnswer: 1,
    explanation:
      'The governor controls the engine speed, which directly determines the output frequency of the alternator (50 Hz in the UK). At 50 Hz, a 4-pole alternator runs at 1,500 rpm. The governor adjusts fuel delivery to maintain constant speed as the electrical load changes. Electronic governors provide tighter speed regulation than mechanical governors.',
  },
  {
    id: 2,
    question: 'A typical automatic start sequence for a standby generator involves:',
    options: [
      'Immediate load transfer to the generator before the engine has started cranking',
      'A manual start by the duty technician within five minutes of the mains failing',
      'Mains failure detection, time delay (to avoid nuisance starts), engine crank, warm-up, load transfer',
      'Continuous running of the engine so it is always ready to take load instantly',
    ],
    correctAnswer: 2,
    explanation:
      'The automatic start sequence typically involves: (1) mains failure detection by the ATS controller; (2) a time delay (typically 5-10 seconds) to avoid starting on brief transients; (3) engine cranking (typically 3 attempts of 10-15 seconds each); (4) engine warm-up period (30-60 seconds at no load); (5) load transfer via the ATS. The total time from mains failure to load on generator is typically 10-30 seconds.',
  },
  {
    id: 3,
    question: 'Diesel generator engine oil should typically be changed at intervals of:',
    options: [
      'Only when the oil pressure warning lamp illuminates on the control panel',
      'Every 5,000 hours of run time, regardless of how much calendar time has passed',
      'Once every five years, since standby generators accumulate very few running hours',
      'Every 250-500 hours or annually, whichever comes first',
    ],
    correctAnswer: 3,
    explanation:
      "Diesel generator engine oil should typically be changed every 250-500 hours of run time or annually, whichever comes first — even if the generator has run for very few hours. Standby generators often accumulate very few running hours but oil degrades over time due to moisture absorption, acid formation and additive depletion. Always follow the engine manufacturer's specific recommendations.",
  },
  {
    id: 4,
    question: 'The coolant in a diesel generator serves which functions?',
    options: [
      'To cool the engine, provide freeze protection, prevent corrosion and lubricate the water pump seal',
      'To lubricate the engine bearings and reduce friction between moving metal parts',
      'To filter combustion air and trap dust before it enters the cylinders',
      'To store electrical energy for cranking the starter motor on demand',
    ],
    correctAnswer: 0,
    explanation:
      'Engine coolant (a mixture of water and antifreeze/inhibitor) serves multiple functions: removing heat from the engine and transferring it to the radiator; providing freeze protection in cold conditions; inhibiting internal corrosion of the engine block, cylinder liners and radiator; and lubricating the water pump seal. Coolant should be tested annually for concentration and inhibitor levels.',
  },
  {
    id: 5,
    question: 'The generator starting batteries must be maintained because:',
    options: [
      'They supply the building load directly until the generator reaches rated speed',
      'A flat or degraded battery will prevent the engine from cranking and starting during an emergency',
      'They regulate the output voltage of the alternator under changing load',
      'They store diesel fuel for the first few minutes of generator operation',
    ],
    correctAnswer: 1,
    explanation:
      'The starting batteries power the starter motor, engine control system and fuel solenoid. If the batteries are flat, degraded or disconnected, the generator cannot start when called upon. This is one of the most common and easily preventable causes of generator start failure. Batteries should be float-charged continuously and tested regularly — typically monthly visual check and annually impedance/load test.',
  },
  {
    id: 6,
    question: 'Run hours monitoring on a generator is important because:',
    options: [
      'It sets the output frequency of the alternator during a mains failure',
      'It measures the diesel fuel remaining in the bulk storage tank',
      'It determines when maintenance tasks (oil changes, filter replacements, overhauls) are due',
      'It controls the changeover time of the automatic transfer switch',
    ],
    correctAnswer: 2,
    explanation:
      'Run hours monitoring is the primary method for scheduling maintenance. Oil changes, filter replacements, coolant changes, belt replacements and major overhauls are all scheduled based on accumulated run hours. The run hours meter should be checked at every inspection and recorded in the maintenance log. Some maintenance tasks are also time-based (e.g., annual oil change even if run hours are low).',
  },
  {
    id: 7,
    question:
      'Fuel stored in standby generator day tanks and bulk tanks can degrade over time due to:',
    options: [
      'The addition of antifreeze, which thins the fuel and lowers its flash point',
      'Exposure to the engine exhaust gases drawn back into the tank vent',
      'Excessive cranking of the starter motor during failed start attempts',
      'Microbial growth (diesel bug), water contamination, oxidation and sedimentation',
    ],
    correctAnswer: 3,
    explanation:
      "Diesel fuel degrades over time through several mechanisms: microbial growth ('diesel bug' — bacteria and fungi that thrive at the fuel/water interface); water contamination from condensation; oxidation causing gum and varnish formation; and sedimentation of particulates. Degraded fuel can block filters, damage injectors and prevent the generator from running. Fuel should be tested and polished (filtered) annually.",
  },
  {
    id: 8,
    question: 'The exhaust system of a diesel generator must be inspected for:',
    options: [
      'Leaks, corrosion, backpressure and lagging condition',
      'Correct fuel injector timing and glow-plug resistance',
      'Coolant concentration and antifreeze specific gravity',
      'Alternator winding insulation resistance and polarisation index',
    ],
    correctAnswer: 0,
    explanation:
      'The exhaust system must be inspected for: leaks at joints and flexible sections (exhaust gas contains carbon monoxide); corrosion of the exhaust pipework; excessive backpressure (which reduces engine performance); condition of the lagging/insulation (fire risk if missing near combustible materials); operation of the rain cap; and the condition of any silencer/attenuator. Exhaust system failures are a fire and carbon monoxide poisoning risk.',
  },
  {
    id: 9,
    question: 'How often should a standby generator be exercised (test run) under load?',
    options: [
      'Once every five years, at the same time as the major engine overhaul',
      'Monthly for at least 30 minutes at a minimum of 50% rated load',
      'Only when an actual mains failure occurs, to avoid wearing the engine',
      'Daily at no load, since running under load risks damaging the alternator',
    ],
    correctAnswer: 1,
    explanation:
      'Industry best practice (based on NFPA 110 and NHS HTM guidelines) recommends monthly exercising for at least 30 minutes at a minimum of 50% (preferably 75%) of rated load. This ensures the engine reaches operating temperature, prevents wet stacking, verifies all systems function correctly, and identifies any developing faults. No-load running should be avoided as it causes wet stacking.',
  },
  {
    id: 10,
    question: 'Environmental considerations for diesel generators include:',
    options: [
      'The output voltage tolerance and the frequency regulation of the alternator',
      'The cranking current and the rest periods between failed start attempts',
      'Noise, exhaust emissions, fuel storage bunding, oil containment and planning permission',
      'The insulation resistance of the stator windings and the diode pack condition',
    ],
    correctAnswer: 2,
    explanation:
      'Environmental considerations include: noise (attenuation, acoustic enclosures, planning conditions); exhaust emissions (NOx, particulates, CO — subject to Environmental Permit for larger sets); fuel storage bunding (secondary containment to 110% of tank volume); oil containment (drip trays, bunds); planning permission (may be required for permanent installations); and the F-gas regulations if the generator has air conditioning cooling.',
  },
  {
    id: 11,
    question: 'A turbocharger on a diesel generator engine:',
    options: [
      'Stores excess electrical output as compressed air for the next start',
      'Regulates the alternator excitation to keep the output voltage constant',
      'Cools the exhaust gases before they are discharged to atmosphere',
      'Uses exhaust gas energy to compress intake air, increasing engine power output and efficiency',
    ],
    correctAnswer: 3,
    explanation:
      'A turbocharger uses the energy in the exhaust gas stream to spin a turbine, which drives a compressor that forces more air into the engine cylinders. This allows more fuel to be burned per stroke, increasing power output and efficiency without increasing engine size. Turbocharger maintenance includes checking for oil leaks, bearing wear (indicated by shaft play or unusual noise), and exhaust gas restriction.',
  },
  {
    id: 12,
    question: 'Which maintenance record should be kept for a standby generator?',
    options: [
      'A comprehensive log including run hours, fuel levels, test results, maintenance carried out, faults and remedial actions',
      'Only the purchase invoice and the manufacturer’s original sales brochure',
      'Nothing, because the control panel stores all the information needed automatically',
      'Only a note of the date the generator was first commissioned into service',
    ],
    correctAnswer: 0,
    explanation:
      'A comprehensive maintenance log should include: run hours at each inspection; fuel level and consumption; oil level and condition; coolant level and condition; battery voltage and condition; test run results (voltage, frequency, load); all maintenance carried out (oil changes, filter replacements, etc.); any faults found and remedial actions; and service reports from specialist contractors. This log is essential for demonstrating compliance and tracking asset condition.',
  },
];

const faqs = [
  {
    question: 'How often should a standby generator be serviced?',
    answer:
      'A standby generator should receive a routine inspection monthly (visual check, check oil/coolant/fuel levels, check battery, test run under load). A minor service (oil and filter change) should be carried out every 250-500 run hours or annually. A major service (including injector testing, valve clearances, turbocharger inspection) should be carried out every 1,000-2,000 run hours or as recommended by the manufacturer. Critical installations may require more frequent servicing.',
  },
  {
    question: 'What is the difference between a prime-rated and standby-rated generator?',
    answer:
      'A standby-rated generator is designed to provide backup power during mains failures — it runs for limited hours per year (typically less than 200-500 hours) and should not be used as a continuous power source. A prime-rated generator is designed for continuous or extended operation (unlimited hours) at up to 100% of its prime rating. The standby rating is typically 10-15% higher than the prime rating for the same engine/alternator combination. Using a standby-rated generator continuously will void the warranty and shorten engine life.',
  },
  {
    question: 'What causes a generator to fail to start?',
    answer:
      'The most common causes of generator start failure are: flat or degraded starting batteries; fuel problems (empty tank, contaminated fuel, blocked filters, air locks); coolant problems (low level, heater failure in cold weather); control system faults (faulty sensors, control board errors, emergency stop left engaged); and mechanical faults (seized starter motor, alternator diode failure). Regular monthly test runs and preventive maintenance will detect most of these issues before a real emergency occurs.',
  },
  {
    question: 'What is an acoustic enclosure?',
    answer:
      'An acoustic enclosure is a sound-insulated housing that surrounds the generator set to reduce noise emissions to acceptable levels. Enclosures are rated in dB(A) at a specified distance (e.g., 75 dB(A) at 1 metre). They incorporate ventilation for combustion and cooling air, exhaust attenuation, vibration isolation, and access doors for maintenance. Acoustic enclosures are essential for generators installed near residential areas or in noise-sensitive locations.',
  },
  {
    question: 'What is bunding and why is it required for fuel storage?',
    answer:
      'Bunding is secondary containment around a fuel storage tank designed to contain fuel in the event of a tank leak or spillage. Under the Control of Pollution (Oil Storage) (England) Regulations 2001 (and equivalent regulations in Wales, Scotland and Northern Ireland), bunds must have a capacity of at least 110% of the largest tank volume (or 25% of the total aggregate volume, whichever is greater). Bunds must be impermeable and structurally sound. Bund alarms and regular inspections are required.',
  },
];

const MOETModule3Section5_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.5 · Subsection 3"
        title="Emergency Generators"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Diesel generators, components, start sequences, load testing and maintenance.
          </p>

          <TLDR
            points={[
              'Components: Engine, alternator, control panel, fuel system.',
              'Start time: 10-30 seconds from mains failure to load transfer.',
              'Testing: Monthly run under load, annual load bank test.',
              'Maintenance: Oil, coolant, fuel, batteries, exhaust — all critical.',
            ]}
          />

          <ConceptBlock title="Regulatory context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671:</strong> Generator installation requirements (Section 551).
              </li>
              <li>
                <strong>BS 7698:</strong> Reciprocating engine driven generating sets.
              </li>
              <li>
                <strong>Environmental Permit:</strong> Emissions limits for larger generators.
              </li>
              <li>
                <strong>ST1426:</strong> Maintain auxiliary power systems.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Identify the main components of a diesel generator set and explain their functions',
              'Describe the automatic start sequence from mains failure to load transfer',
              'Explain load bank testing and the prevention of wet stacking',
              'Outline a preventive maintenance programme for standby generators',
              'Describe fuel storage requirements including bunding and fuel polishing',
              'Identify environmental considerations including noise and emissions',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Generator components and operation</ContentEyebrow>

          <ConceptBlock title="Standby generators are a life-safety system that must start reliably and transfer load within seconds">
            <p>
              Standby generators provide backup electrical power when the mains supply fails. In
              critical facilities — hospitals, data centres, water treatment works and high-rise
              buildings — the generator is a life safety system that must start reliably and
              transfer load within seconds. Diesel generators are the most common type for standby
              power due to their reliability, fast start capability and fuel availability.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Main components">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Diesel engine:</strong> The prime mover. Converts chemical energy in diesel
                fuel to rotational mechanical energy. Available from 10 kW to 3,000+ kW. Includes
                cooling system, lubrication system, fuel injection system and exhaust.
              </li>
              <li>
                <strong>Alternator:</strong> Converts mechanical rotation to AC electrical energy
                via electromagnetic induction. Typically brushless, self-excited, 4-pole (1,500 rpm
                for 50 Hz). Rated in kVA (apparent power).
              </li>
              <li>
                <strong>AVR (Automatic Voltage Regulator):</strong> Controls the alternator
                excitation to maintain constant output voltage regardless of load changes.
              </li>
              <li>
                <strong>Governor:</strong> Controls engine speed to maintain constant frequency (50
                Hz). Electronic governors provide ±0.5% speed regulation under varying loads.
              </li>
              <li>
                <strong>Control panel:</strong> Monitors engine and alternator parameters, manages
                automatic start/stop sequences, provides alarms and remote monitoring interfaces.
              </li>
              <li>
                <strong>Starting system:</strong> Electric starter motor powered by 12 V or 24 V
                batteries. Includes battery charger, cranking control and start-fail protection.
              </li>
              <li>
                <strong>Fuel system:</strong> Base tank, day tank (larger sets), fuel transfer pump,
                primary and secondary fuel filters, water separator, return line.
              </li>
              <li>
                <strong>Cooling system:</strong> Radiator, thermostat, water pump, coolant hoses,
                fan. Some larger sets use remote radiators or cooling towers.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Automatic start sequence"
            onSite="Key point: the total time from mains failure to load on generator is typically 10-30 seconds. For critical loads that cannot tolerate this interruption (IT equipment, medical devices), a UPS is required to bridge the gap between mains failure and generator taking load."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> ATS detects mains failure (voltage below threshold for a
                defined time delay).
              </li>
              <li>
                <strong>Step 2:</strong> Start signal sent to generator control panel after time
                delay (5-10 seconds typical).
              </li>
              <li>
                <strong>Step 3:</strong> Engine pre-lubrication (if fitted) and glow plug warm-up
                (cold engines).
              </li>
              <li>
                <strong>Step 4:</strong> Engine cranks — typically 3 attempts of 10-15 seconds each
                with rest periods.
              </li>
              <li>
                <strong>Step 5:</strong> Engine starts — warm-up period at no load (30-60 seconds).
              </li>
              <li>
                <strong>Step 6:</strong> Generator ready signal — voltage and frequency within
                tolerance.
              </li>
              <li>
                <strong>Step 7:</strong> ATS transfers load from mains to generator.
              </li>
              <li>
                <strong>Step 8:</strong> On mains return — retransfer delay, load back to mains,
                cool-down period, engine stop.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Load testing and wet stacking prevention</ContentEyebrow>

          <ConceptBlock title="A generator never tested under load may fail when called upon during a real emergency">
            <p>
              Regular load testing is essential to verify that the generator can deliver its rated
              output and to prevent the damaging effects of prolonged light-load operation. A
              generator that has never been tested under load may fail when called upon during a
              real emergency.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Load bank testing"
            onSite="Maintenance tip: if a generator has been running at light load for extended periods (e.g., the building has few occupants), schedule a load bank test to clean out the exhaust system and verify the generator can still deliver rated output."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Purpose:</strong> Apply a controlled, adjustable electrical load to verify
                full-rated output capability.
              </li>
              <li>
                <strong>Load bank types:</strong> Resistive (kW only), reactive (kVAr), combined (kW
                + kVAr).
              </li>
              <li>
                <strong>Procedure:</strong> Start at 25% load, step up to 50%, 75% and 100% in
                stages, recording voltage, current, frequency, oil pressure, coolant temperature and
                exhaust temperature at each step.
              </li>
              <li>
                <strong>Duration:</strong> Minimum 30 minutes at each load step, or as specified by
                the maintenance standard.
              </li>
              <li>
                <strong>Frequency:</strong> Annual load bank test recommended; monthly test runs at
                minimum 50% load.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Wet stacking"
            whatHappens="Wet stacking is a serious condition caused by prolonged light-load or no-load running. The engine does not reach optimal combustion temperature, causing unburned fuel, soot and carbon to accumulate in the exhaust manifold, turbocharger, cylinder liners and valve guides. Symptoms include black oily residue from the exhaust, white or blue exhaust smoke, carbon deposits on spark arrestors, and reduced power output. Severe wet stacking requires engine decarburisation — an expensive and time-consuming repair."
            doInstead="Prevention is through regular running at minimum 50-75% rated load."
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Preventive maintenance programme</ContentEyebrow>

          <ConceptBlock title="A comprehensive maintenance programme is essential for generator reliability">
            <p>
              A comprehensive preventive maintenance programme is essential for generator
              reliability. The programme must cover the engine, alternator, control system, fuel
              system, cooling system, starting batteries and exhaust system.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Maintenance schedule">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Interval</th>
                    <th className="py-2 font-medium text-white">Tasks</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Weekly</td>
                    <td className="py-2">
                      Visual inspection, check oil/coolant/fuel levels, check battery voltage, check
                      for leaks, record run hours
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Monthly</td>
                    <td className="py-2">
                      Test run under load (min 30 mins at 50%+ load), check all alarms, inspect
                      belts and hoses, check battery electrolyte
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">6-monthly</td>
                    <td className="py-2">
                      Oil and filter change (or at 250-500 hrs), fuel filter change, air filter
                      inspection, coolant test, battery load test
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Annually</td>
                    <td className="py-2">
                      Full load bank test, coolant change, fuel polishing, exhaust system
                      inspection, alternator insulation test, control system calibration
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">3-5 yearly</td>
                    <td className="py-2">
                      Major service — injector overhaul, valve clearance check, turbocharger
                      inspection, starting battery replacement
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Fuel management"
            onSite="ST1426 link: the maintenance technician standard requires competence in maintaining standby generators, including routine inspections, testing and recording. You must understand the start sequence and be able to identify common faults."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fuel testing:</strong> Annual laboratory analysis for microbial
                contamination, water content, oxidation stability and particulate level.
              </li>
              <li>
                <strong>Fuel polishing:</strong> Periodic filtration of stored fuel to remove water,
                particulates and microbial growth products.
              </li>
              <li>
                <strong>Water drainage:</strong> Drain water from the bottom of fuel tanks regularly
                — water is the primary cause of microbial growth.
              </li>
              <li>
                <strong>Biocide treatment:</strong> Add approved biocide to fuel if microbial
                contamination is detected.
              </li>
              <li>
                <strong>Fuel rotation:</strong> For infrequently used generators, ensure fuel is
                consumed and replenished within 12-18 months.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Environmental and safety considerations</ContentEyebrow>

          <ConceptBlock title="Environmental impacts must be managed through proper design, installation and maintenance">
            <p>
              Diesel generators have significant environmental impacts that must be managed through
              proper design, installation and maintenance. Regulatory requirements cover noise,
              emissions, fuel storage and waste management.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Environmental requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Noise:</strong> Acoustic enclosures, attenuators, planning conditions. BS
                4142 assessment for noise impact on neighbours.
              </li>
              <li>
                <strong>Emissions:</strong> Medium Combustion Plant Directive (MCPD) for generators
                1-50 MWth. Environmental Permit may be required for regular testing.
              </li>
              <li>
                <strong>Fuel storage:</strong> Bunding to 110% of tank capacity. Compliance with Oil
                Storage Regulations. Spill kits, drip trays, overfill prevention.
              </li>
              <li>
                <strong>Oil and coolant disposal:</strong> Waste oil and coolant are controlled
                waste — disposed of through an approved waste carrier with waste transfer notes.
              </li>
              <li>
                <strong>Exhaust:</strong> Exhaust must discharge to atmosphere in a safe location —
                away from air intakes, openable windows and occupied areas.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Safety hazards"
            onSite="Key point: a generator connected to a building without a properly interlocked ATS can back-feed into the mains supply, energising supposedly dead cables and presenting a fatal electrocution risk to electricity network engineers. This is illegal and extremely dangerous."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Carbon monoxide:</strong> Exhaust gases contain CO — fatal in enclosed
                spaces. Never run a generator indoors without proper exhaust extraction.
              </li>
              <li>
                <strong>Rotating parts:</strong> Belt drives, fans, flywheels — all guards must be
                in place before starting.
              </li>
              <li>
                <strong>Hot surfaces:</strong> Engine, exhaust manifold, turbocharger — severe burn
                risk. Allow cool-down before maintenance.
              </li>
              <li>
                <strong>Electrical:</strong> Generator output is live when running — safe isolation
                procedures must be followed. Back-feed risk if connected without an ATS.
              </li>
              <li>
                <strong>Fuel:</strong> Diesel is combustible — no smoking or naked flames near fuel
                storage or during refuelling.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Alternator maintenance and electrical connections</ContentEyebrow>

          <ConceptBlock title="The alternator converts mechanical energy into AC electrical energy">
            <p>
              The alternator converts the engine's mechanical energy into AC electrical energy. It
              is typically a brushless, self-excited, four-pole synchronous machine running at 1,500
              rpm to produce 50 Hz output. While alternators are generally reliable, they require
              periodic maintenance to ensure continued safe and efficient operation. Neglecting
              alternator maintenance can result in insulation failure, voltage instability or
              complete generation failure during an emergency.
            </p>
            <p>
              The AVR (Automatic Voltage Regulator) is integral to the alternator's performance. It
              continuously adjusts the excitation current to the rotor field windings to maintain
              constant output voltage as load changes. AVR faults are a common cause of voltage
              instability and can damage connected equipment. Understanding AVR function and testing
              is an important maintenance skill.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Alternator maintenance tasks">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Insulation resistance:</strong> Annual megger test of stator and rotor
                windings — minimum 2 megohms for LV alternators; trend declining values.
              </li>
              <li>
                <strong>Winding resistance:</strong> Measure phase-to-phase resistance to detect
                turn-to-turn faults or connection problems.
              </li>
              <li>
                <strong>AVR adjustment:</strong> Verify output voltage at no-load and full-load;
                adjust set-point if drifting from 400 V (three-phase).
              </li>
              <li>
                <strong>Diode pack:</strong> Brushless alternators use rotating diodes — check for
                open or short-circuit failures during annual service.
              </li>
              <li>
                <strong>Bearing condition:</strong> Listen for bearing noise during test runs;
                vibration analysis for larger units.
              </li>
              <li>
                <strong>Ventilation:</strong> Clean air inlet filters and ducts; blocked ventilation
                causes winding overheating.
              </li>
              <li>
                <strong>Connections:</strong> Retorque all power output connections; thermographic
                survey under load.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Electrical connection considerations"
            onSite="Under ST1426, maintenance technicians must demonstrate competence in maintaining standby generators, including the alternator, control system and electrical connections. Practical observation of generator maintenance is part of the EPA assessment."
          >
            <p>
              The generator's electrical connection to the building's distribution system must
              comply with BS 7671 Section 551 and the DNO's connection requirements. Key
              considerations include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Earthing arrangement:</strong> The generator may require its own earth
                electrode; the earthing system must be coordinated with the ATS switching
                arrangement.
              </li>
              <li>
                <strong>Protection coordination:</strong> Fault levels on the generator supply
                differ from the mains supply — protection settings must be verified for both
                conditions.
              </li>
              <li>
                <strong>Neutral switching:</strong> Four-pole ATS required in TN-S systems to
                prevent neutral current circulation.
              </li>
              <li>
                <strong>Cable sizing:</strong> Generator supply cables must be rated for the
                generator's full output current, not just the expected load.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=WhATjUHgzxQ"

            title="AC Electrical Generator Basics"

            channel="The Engineering Mindset"

            duration="5:56"

            topic="How an alternator actually makes the AC a standby set delivers"

            caption="Six minutes on the machine at the heart of the generator set, before the maintenance detail on this page."
          />

          <SectionRule />

          <Scenario
            title="A standby generator that has never actually carried the building"

            situation={
              <>
                <p>
                  A site runs its standby generator monthly. It starts on the first attempt every
                  time and runs for twenty minutes. The log shows two years of successful tests.
                </p>

                <p>
                  During a real outage it starts, runs for ninety seconds, and shuts down on high
                  coolant temperature.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Look at what the monthly test actually proved. Running off-load proves the engine
                  starts and runs. It does not prove the cooling system can hold temperature under
                  load, that the alternator can take the building, or that the transfer switch
                  works.
                </p>

                <p>
                  Introduce an on-load test on a sensible interval, using the building load or a
                  load bank. Off-load running is also bad for a diesel — it glazes bores and causes
                  wet stacking, so the reassuring monthly test may itself be doing harm.
                </p>

                <p>
                  Test the transfer as part of it. A generator that starts perfectly and never picks
                  up the load because the changeover fails is no better than one that does not
                  start.
                </p>

                <p>
                  Check the cooling system specifically: radiator cleanliness, coolant level and
                  condition, louvre operation, and whether anything has been stored against the
                  airflow path since it was installed.
                </p>
              </>
            }

            whyItMatters={
              <p>
                Two years of green ticks in a log created confidence in something that had never
                been demonstrated. This is the clearest example in the course of a test that
                measures what is easy rather than what matters — and standby systems are especially
                prone to it, because the thing they exist for happens rarely and cannot be
                scheduled. A maintenance regime is only as good as the question its tests actually
                answer.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Four main components: the diesel engine (prime mover), the alternator (mechanical to AC via the AVR and governor), the control panel (start/stop sequencing and alarms), and the fuel system.',
              'Automatic start sequence: mains-failure detection, time delay, engine crank and warm-up, then load transfer — typically 10-30 seconds; loads that cannot tolerate any interruption still need a UPS to bridge that gap.',
              'Load bank testing steps from 25% to 100% load in stages, minimum 30 minutes per step, and prevents wet stacking — the carbon build-up caused by prolonged light-load or no-load running.',
              'Maintenance runs from weekly visual checks through monthly load-run tests, 6-monthly oil and filter changes, annual load bank tests and fuel polishing, to 3-5 yearly major overhauls.',
              'Fuel degrades through microbial growth (diesel bug), water contamination, oxidation and sedimentation — test annually and polish (filter) periodically.',
              "Environmental controls include bunding to 110% of tank capacity, acoustic enclosures for noise, and an Environmental Permit for larger generators' emissions.",
              'A generator must never be connected without a properly interlocked ATS — an uninterlocked connection can back-feed into the mains and present a fatal risk to network engineers working on supposedly dead cables.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section5-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Battery Technologies
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section5-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Transfer Switches
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section5_3;
