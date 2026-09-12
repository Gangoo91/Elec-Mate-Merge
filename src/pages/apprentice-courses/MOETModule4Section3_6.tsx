/**
 * MOET · Module 4 · Section 3 · Subsection 6 — Intermittent Faults and
 * Environmental Factors
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Electrical. Common electrical plant, equipment, and systems
 *                 failure modes."
 *              · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
 *              · "Electrical. Problem solving and critical reasoning
 *                 techniques."
 *   Skills     · "Electrical. Use electrical diagnostic equipment and apply
 *                 fault finding and rectification techniques."
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Intermittent Faults and Environmental Factors - MOET Module 4 Section 3.6';
const DESCRIPTION =
  'Identifying intermittent faults and environmental influences on electrical equipment including temperature effects, moisture ingress, vibration, EMC interference and systematic approaches to elusive faults.';

const quickCheckQuestions = [
  {
    id: 'intermittent-connection',
    question:
      'An intermittent fault that appears when ambient temperature rises but clears when the temperature drops is most likely caused by:',
    options: [
      'Thermal expansion causing a marginal connection to open, or insulation resistance dropping as temperature rises',
      'A protective device that has been incorrectly rated for the connected load current',
      'A loose neutral conductor that only affects the circuit during periods of low demand',
      'Capacitive coupling between adjacent cables that increases when the cables are cold',
    ],
    correctIndex: 0,
    explanation:
      'Temperature-dependent intermittent faults typically involve marginal connections where thermal expansion opens a barely-adequate joint, or insulation that is degraded to the point where its resistance drops below a critical threshold when warm. As the temperature drops, the connection remakes or the insulation resistance rises, and the fault disappears. These are classic symptoms of a dry joint or degraded insulation.',
  },
  {
    id: 'moisture-ingress',
    question:
      'An RCD trips repeatedly during damp weather but operates normally in dry conditions. The most likely cause is:',
    options: [
      'The RCD has reached the end of its service life and needs replacement regardless of weather',
      'Moisture ingress into the wiring, accessories or equipment causing earth leakage current to exceed the RCD threshold',
      'Humidity reduces the supply voltage, causing the RCD to trip on undervoltage',
      'Damp air increases the load current, overloading the protective device downstream',
    ],
    correctIndex: 1,
    explanation:
      'Moisture is a conductor. When it enters wiring accessories, junction boxes, cable joints or equipment enclosures, it creates a leakage path between live conductors and earth. This leakage current, even if small, may exceed the 30 mA threshold of a Type A RCD. The fault clears as conditions dry out because the leakage path evaporates. Locating the point of ingress requires systematic testing during the damp period.',
  },
  {
    id: 'vibration-fault',
    question:
      'A machine fault that appears only when a nearby compressor is running suggests the cause may be:',
    options: [
      'A voltage dip on the supply each time the compressor motor draws its starting current',
      'Vibration from the compressor causing a marginal connection or component to make intermittent contact',
      'Electromagnetic interference radiated by the compressor control panel into the supply',
      'Harmonic distortion introduced by the compressor that overheats the neutral conductor',
    ],
    correctIndex: 1,
    explanation:
      'Vibration-induced intermittent faults are common in industrial environments. Machinery vibration can cause loose terminations to intermittently open and close, relay contacts to bounce, connectors to make poor contact, and cracked solder joints to break and remake. The correlation with the compressor operation is the diagnostic clue — the fault timing matches the vibration source.',
  },
  {
    id: 'emc-interference',
    question:
      'A PLC input shows intermittent false signals that coincide with a nearby VSD starting a motor. The most likely cause is:',
    options: [
      'The VSD draws so much current at start that the PLC power supply browns out',
      'Vibration from the motor loosening the PLC input terminals as it runs up to speed',
      'A shared neutral conductor between the VSD and the PLC carrying excessive current',
      'Electromagnetic interference (EMI) from the VSD coupling into the PLC input wiring',
    ],
    correctIndex: 3,
    explanation:
      'VSDs are significant sources of electromagnetic interference due to their high-frequency PWM switching. If the PLC input cables are not adequately screened, separated from power cables, or properly earthed, the electromagnetic noise can couple into the signal wiring and create false input signals. EMC mitigation includes screened cables, proper earthing of screens at one end, physical separation from power cables, and input filters.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The most challenging aspect of diagnosing intermittent faults is:',
    options: [
      'The fault always damages the protective device, so the cause is hidden once it operates',
      'The fault may not be present when you arrive, making it hard to observe and measure',
      'Intermittent faults give a clear, repeatable reading on every test instrument',
      'Test instruments are not accurate enough to measure the small currents involved',
    ],
    correctAnswer: 1,
    explanation:
      'Intermittent faults are notorious because they often disappear by the time the technician arrives. The fault conditions (temperature, vibration, humidity, load level) that trigger the fault may not be present during the investigation. This is why detailed operator information, data logging, and understanding of environmental triggers are essential for diagnosing intermittent faults.',
  },
  {
    id: 2,
    question: 'A data logger is a useful tool for intermittent fault diagnosis because it can:',
    options: [
      'Apply a higher test voltage so any weak insulation fails immediately during the visit',
      'Force the fault on demand by deliberately overloading the suspect circuit',
      'Continuously record parameters over time, capturing events when no one is present',
      'Identify the faulty component automatically and display its part number',
    ],
    correctAnswer: 2,
    explanation:
      'Data loggers record voltage, current, power, temperature and other parameters over hours, days or weeks. They capture the exact conditions at the moment a fault occurs — even if it happens at 3 AM on a Sunday. This timestamped data can then be correlated with environmental conditions, operational patterns and other events to identify the fault trigger.',
  },
  {
    id: 3,
    question: 'Condensation inside an electrical enclosure is most likely to occur when:',
    options: [
      'The equipment inside is generating its maximum heat output at full load',
      'The internal temperature rises rapidly above the surrounding ambient air',
      'The supply voltage rises above nominal during periods of low demand',
      'A surface inside cools below the dew point, typically overnight after a warm day',
    ],
    correctAnswer: 3,
    explanation:
      'Condensation forms when the temperature of a surface drops below the dew point of the surrounding air. This commonly occurs when enclosures cool down overnight after being warmed during the day by the equipment inside them or by ambient conditions. Anti-condensation heaters are fitted to enclosures in vulnerable locations to maintain the internal temperature above the dew point.',
  },
  {
    id: 4,
    question: 'An IP65-rated enclosure should be protected against:',
    options: [
      'Dust ingress (total protection) and low-pressure water jets from any direction',
      'Limited dust ingress and temporary immersion in water up to 1 metre deep',
      'Solid objects over 1 mm and vertically dripping water only',
      'Total protection against dust and continuous immersion in water under pressure',
    ],
    correctAnswer: 0,
    explanation:
      'IP (Ingress Protection) ratings have two digits: the first for solids, the second for liquids. IP65 means: 6 = total protection against dust ingress; 5 = protection against water jets from any direction. If moisture is found inside an IP65 enclosure, check for damaged seals, incorrectly fitted cable glands, missing blanking plugs, or cracks in the enclosure — the IP rating has been compromised.',
  },
  {
    id: 5,
    question: 'Harmonic distortion from non-linear loads such as VSDs and LED lighting can cause:',
    options: [
      'A steady increase in supply voltage that damages connected equipment over time',
      'Overheating of neutral conductors, transformer overheating, capacitor failure and nuisance tripping of protective devices',
      'A reduction in the earth fault loop impedance throughout the installation',
      'Improved power factor and reduced cable losses across the distribution system',
    ],
    correctAnswer: 1,
    explanation:
      'Triplen harmonics (3rd, 9th, 15th) add in the neutral conductor of a three-phase system rather than cancelling, potentially causing neutral current to exceed phase current. Harmonics cause additional heating in transformers, can resonate with power factor correction capacitors causing premature failure, and may cause nuisance tripping of some types of circuit breakers and RCDs.',
  },
  {
    id: 6,
    question:
      "When investigating an intermittent fault, the operator report states it happens 'about twice a week, usually on Monday mornings'. This timing pattern suggests:",
    options: [
      'A fault with no identifiable trigger, requiring full replacement of the equipment',
      'A wiring error made during installation that only shows up under heavy load',
      'A thermal or environmental trigger from the weekend shutdown and Monday cold start',
      'A supply authority issue that occurs at the same time every week by coincidence',
    ],
    correctAnswer: 2,
    explanation:
      'A Monday morning pattern strongly suggests a thermal or environmental trigger. Equipment that is warm during the working week cools over the weekend. Monday morning start-up subjects cold equipment to thermal shock, and condensation may have formed during the temperature cycling. Reduced load over the weekend may also allow insulation resistance to recover, only to fail again under full load on Monday.',
  },
  {
    id: 7,
    question: 'Cable route separation requirements in BS 7671 exist primarily to prevent:',
    options: [
      'Excessive voltage drop along long parallel cable runs',
      'Mutual heating that reduces the current-carrying capacity of grouped cables',
      'Mechanical chafing where cables of different types cross one another',
      'Electromagnetic interference between power cables and data/signal cables',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Chapter 52 requires separation between power circuits and communication/data circuits to prevent electromagnetic interference. Power cables, especially those carrying distorted waveforms from VSDs, generate electromagnetic fields that can couple into nearby signal cables, causing data errors, false sensor readings and erratic control system behaviour. Physical separation, screening and crossed (not parallel) routing are the primary mitigation measures.',
  },
  {
    id: 8,
    question: "A 'dry joint' in an electrical connection is characterised by:",
    options: [
      'A joint that appears mechanically intact but has high resistance due to poor metal-to-metal contact, oxidation or contamination',
      'A connection where the conductor insulation has been stripped back too far, exposing bare copper',
      'A terminal that has been over-torqued, crushing and weakening the conductor strands',
      'A joint made in a damp location where moisture has caused green copper corrosion',
    ],
    correctAnswer: 0,
    explanation:
      'A dry joint (or high-resistance joint) looks connected but has inadequate metal-to-metal contact. The high resistance causes localised heating under load (I²R losses), which can cause intermittent behaviour — the joint may work when cool but fail when hot as thermal expansion opens the marginal contact further. Dry joints are a leading cause of electrical fires and intermittent faults.',
  },
  {
    id: 9,
    question: 'An anti-condensation heater in a motor control centre (MCC) should be:',
    options: [
      'Switched on only during the annual maintenance shutdown to dry the enclosure out',
      'Energised continuously (or thermostatically controlled) to maintain the enclosure temperature above the dew point',
      'Wired to operate only while the main equipment in the enclosure is running under load',
      'Left permanently de-energised unless visible condensation has already formed inside',
    ],
    correctAnswer: 1,
    explanation:
      'Anti-condensation heaters should remain energised whenever there is a risk of condensation, which is typically when the equipment inside the enclosure is not generating enough heat to maintain the temperature above the dew point. Many are thermostatically controlled to energise when the temperature drops below a set point. They are particularly important during shutdowns, weekends and holiday periods when equipment is not running.',
  },
  {
    id: 10,
    question: 'Dust accumulation on electrical equipment can cause faults by:',
    options: [
      'Increasing the supply voltage at the equipment terminals during dry periods',
      'Improving heat dissipation by forming an insulating barrier over hot components',
      'Acting as thermal insulation (causing overheating), absorbing moisture (creating conductive paths), and bridging clearances between conductors',
      'Reducing the earth fault loop impedance by providing extra conductive paths',
    ],
    correctAnswer: 2,
    explanation:
      'Dust is a significant environmental hazard for electrical equipment. It acts as thermal insulation, trapping heat and causing components to overheat. When damp, dust becomes conductive and can create leakage paths between live parts and earth, or between phases. Conductive dust (carbon, metal filings) can bridge clearances between conductors, causing tracking or flashover. Regular cleaning is an essential preventive maintenance task.',
  },
  {
    id: 11,
    question: 'To diagnose a fault that only occurs under heavy load, you would:',
    options: [
      'Test the circuit only when it is fully de-energised and at rest, then return it to service',
      'Replace the protective device with a higher-rated one so the fault no longer interrupts supply',
      'Wait for the fault to clear on its own and record only the time it disappears',
      'Use data logging equipment to record electrical parameters during high-load periods, or arrange controlled load testing while monitoring the suspect circuit',
    ],
    correctAnswer: 3,
    explanation:
      'Load-dependent faults require investigation under the load conditions that trigger them. Data loggers can record continuously and capture the fault event automatically. Alternatively, if the process allows, arrange a controlled load test while monitoring voltage, current, temperature and other parameters at the suspect location. This focused approach is far more productive than waiting for a random occurrence.',
  },
  {
    id: 12,
    question: 'Voltage sags (dips) on an industrial supply are commonly caused by:',
    options: [
      'Large motor starting currents, heavy inductive loads switching, and supply network events affecting the local transformer',
      'Loose neutral connections at lightly loaded socket outlets across the installation',
      'Power factor correction capacitors switching out during periods of high demand',
      'Gradual ageing of cable insulation that increases its resistance over many years',
    ],
    correctAnswer: 0,
    explanation:
      'Voltage sags are short-duration reductions in supply voltage, typically caused by large current demands on the same supply network. DOL motor starts, electric arc furnaces, large welding equipment and heavy inductive load switching all cause voltage dips. These sags can cause VSD undervoltage trips, contactor dropout, and PLC resets if the equipment does not have adequate ride-through capability.',
  },
];

const faqs = [
  {
    question: 'How do I approach an intermittent fault that I cannot reproduce?',
    answer:
      'Start with a thorough investigation of the operator reports — look for patterns in timing, environmental conditions, load levels and correlations with other events. Inspect all connections in the affected circuit for signs of overheating, corrosion or looseness. Install data logging equipment to capture the next occurrence. Check environmental factors (temperature, humidity, vibration) and look for correlations. Sometimes a thorough visual inspection and re-making of all connections resolves the fault without identifying the specific cause.',
  },
  {
    question: 'What environmental factors should I check when investigating a fault?',
    answer:
      'Temperature (ambient, equipment, seasonal variation), humidity and moisture (condensation, water ingress, proximity to wet processes), dust and contamination (industrial processes, construction work, agricultural dust), vibration (nearby machinery, building works, traffic), electromagnetic interference (VSDs, welding, radio transmitters, power lines), and chemical exposure (corrosive atmospheres, cleaning chemicals, process chemicals). Any of these can cause or contribute to electrical faults.',
  },
  {
    question: 'How does IP rating relate to fault diagnosis?',
    answer:
      'The IP (Ingress Protection) rating tells you what level of protection an enclosure should provide against solid particles and water. If you find moisture or contamination inside an enclosure, compare what you find against the stated IP rating. If moisture is present inside an IP65 enclosure, something has compromised the sealing — look for damaged glands, missing blanking plugs, cracked housings or deteriorated gaskets. The IP rating gives you a benchmark for what should not be getting in.',
  },
  {
    question: 'What is EMC and why does it matter for fault finding?',
    answer:
      'EMC (Electromagnetic Compatibility) is the ability of equipment to function correctly in its electromagnetic environment without causing unacceptable interference to other equipment. In fault finding, EMC is relevant because electromagnetic interference can cause false signals, data corruption, erratic sensor readings and equipment malfunction. Common sources include VSDs, radio transmitters, welding equipment, and switched-mode power supplies. EMC-related faults are often intermittent and difficult to reproduce outside the affected environment.',
  },
  {
    question: 'Should I always re-make connections when investigating an intermittent fault?',
    answer:
      "Re-making connections is a practical and effective approach when a high-resistance or intermittent connection is suspected. It is good practice to clean the contact surfaces, apply appropriate contact treatment, and re-torque to the manufacturer's specification. However, be aware that this may 'fix' the fault without confirming the root cause. If the fault recurs, the underlying cause (vibration, thermal cycling, corrosion, undersized conductor) has not been addressed.",
  },
];

const MOETModule4Section3_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.3 · Subsection 6"
        title="Intermittent Faults and Environmental Factors"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Identifying intermittent faults and environmental influences on electrical equipment
          </p>

          <TLDR
            points={[
              'Intermittent: faults that appear and disappear — temperature, vibration, load dependent.',
              'Moisture: condensation and ingress cause earth leakage, tracking, corrosion.',
              'EMC: VSD noise and radio interference cause false signals in control circuits.',
              'Data logging: essential tool for capturing events when you are not present.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the characteristics and common causes of intermittent electrical faults',
              'Recognise the effects of temperature, humidity and moisture on electrical equipment',
              'Diagnose vibration-induced faults in industrial environments',
              'Understand electromagnetic compatibility issues and their effect on control systems',
              'Apply data logging techniques to capture intermittent fault events',
              'Assess environmental conditions during fault investigation and recommend preventive measures',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pattern recognition:</strong> timing, weather and load patterns provide
                diagnostic clues.
              </li>
              <li>
                <strong>IP ratings:</strong> a benchmark for acceptable environmental protection.
              </li>
              <li>
                <strong>Dry joints:</strong> a leading cause of intermittent faults and electrical
                fires.
              </li>
              <li>
                <strong>ST1426:</strong> environmental awareness is part of maintenance competence.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Understanding intermittent faults</ContentEyebrow>

          <ConceptBlock title="Understanding intermittent faults">
            <p>
              Intermittent faults are the most challenging category of faults that a maintenance
              technician will encounter. Unlike permanent faults — which are present whenever you
              test for them — intermittent faults appear and disappear, often seemingly at random.
              They are frustrating, time-consuming and can persist for weeks or months before being
              resolved. However, they are rarely truly random; almost all intermittent faults have a
              trigger, and identifying that trigger is the key to diagnosis.
            </p>
            <p>
              The most common triggers for intermittent faults are environmental: temperature
              changes, humidity and moisture levels, vibration, electromagnetic interference and
              load variation. By understanding these triggers and looking for patterns in when the
              fault occurs, you can narrow the search dramatically. The operator's description of
              the fault timing and conditions is your most valuable diagnostic tool for intermittent
              faults.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Categories of intermittent fault">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Temperature-dependent:</strong> fault appears when equipment is hot (or
                cold) and clears when temperature changes — typically marginal connections or
                degraded insulation.
              </li>
              <li>
                <strong>Moisture-dependent:</strong> fault appears in damp or humid conditions and
                clears when dry — typically insulation leakage or tracking.
              </li>
              <li>
                <strong>Vibration-dependent:</strong> fault appears when nearby machinery is running
                — typically loose connections, cracked solder joints or relay contact bounce.
              </li>
              <li>
                <strong>Load-dependent:</strong> fault appears only under heavy load — typically
                marginal connections that develop high resistance under high current.
              </li>
              <li>
                <strong>EMC-dependent:</strong> fault appears when specific equipment operates —
                typically electromagnetic interference coupling into sensitive circuits.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The danger of intermittent faults">
            <p>
              Intermittent faults are not just an inconvenience — they can be dangerous. A
              high-resistance connection that intermittently arcs is a fire risk. An intermittent
              earth fault that occasionally trips an RCD may progress to a permanent fault that
              exposes someone to electric shock. An intermittent control circuit fault may cause
              unexpected machine behaviour. Never dismiss an intermittent fault as &quot;not
              important&quot; — it is a fault that has not yet become permanent.
            </p>
            <p>
              <strong>Key point:</strong> when investigating an intermittent fault, your first
              priority is to understand the pattern. Ask: when does it happen? How often? What are
              the conditions? What else is happening at the time? Is there a correlation with time
              of day, weather, production schedule, or other equipment?
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Temperature, moisture and condensation effects</ContentEyebrow>

          <ConceptBlock title="Temperature, moisture and condensation effects">
            <p>
              Temperature and moisture are the two most significant environmental factors affecting
              electrical equipment reliability. They influence insulation performance, connection
              integrity, component lifespan and the behaviour of protective devices. Understanding
              these effects is essential for diagnosing environmentally triggered faults and
              recommending preventive measures.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Temperature effects">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Insulation resistance:</strong> decreases as temperature increases — a
                circuit that passes IR testing when cold may fail when hot.
              </li>
              <li>
                <strong>Conductor resistance:</strong> increases with temperature — affects voltage
                drop and protective device operation.
              </li>
              <li>
                <strong>Thermal expansion:</strong> causes connections to work loose over time due
                to repeated heating and cooling cycles.
              </li>
              <li>
                <strong>Component ratings:</strong> most components are rated for a maximum ambient
                of 40 degrees C — exceeding this reduces capacity and lifespan.
              </li>
              <li>
                <strong>Capacitor life:</strong> electrolytic capacitor life halves for every 10
                degrees C above rated temperature — VSDs in hot environments fail earlier.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Moisture and condensation">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Earth leakage:</strong> moisture creates conductive paths between live parts
                and earth, causing RCD tripping.
              </li>
              <li>
                <strong>Tracking:</strong> moisture on contaminated surfaces allows current to track
                along the surface, creating carbon paths that become permanently conductive.
              </li>
              <li>
                <strong>Corrosion:</strong> moisture accelerates corrosion of copper conductors,
                terminals and contacts, increasing resistance.
              </li>
              <li>
                <strong>Condensation:</strong> forms when equipment temperature drops below the dew
                point — particularly during cooling after shutdown.
              </li>
              <li>
                <strong>IP protection:</strong> enclosure IP ratings define the level of protection
                against water ingress — compromised seals allow moisture entry.
              </li>
            </ul>
            <p>
              Some intermittent faults follow seasonal patterns. High humidity in summer causes
              insulation leakage. Cold winter mornings cause condensation in enclosures. Autumn rain
              increases moisture ingress. Spring pollen and agricultural dust contaminate
              ventilation systems. If a fault has a seasonal pattern, this is a powerful diagnostic
              clue pointing to an environmental root cause.
            </p>
            <p>
              <strong>Preventive measures:</strong> anti-condensation heaters, properly rated IP
              enclosures, correct cable gland selection, silica gel desiccant packs, ventilation
              management and regular enclosure seal inspection all reduce the risk of
              moisture-related faults.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Vibration, dust and physical environment</ContentEyebrow>

          <ConceptBlock title="Vibration, dust and physical environment">
            <p>
              The physical environment in which electrical equipment operates has a direct impact on
              its reliability. Industrial environments subject equipment to vibration, dust,
              chemical exposure and physical damage that can cause or accelerate faults.
              Understanding these environmental stressors helps you identify root causes and
              recommend preventive measures that address the underlying environmental issue rather
              than just repairing the symptom.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Vibration effects on electrical equipment">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Loose connections:</strong> vibration works screw terminals loose over time,
                creating high-resistance joints.
              </li>
              <li>
                <strong>Contact bounce:</strong> relay and contactor contacts can momentarily open
                under vibration, causing erratic switching.
              </li>
              <li>
                <strong>Solder joint failure:</strong> cracked or fractured solder joints on PCBs
                are a classic vibration-induced fault.
              </li>
              <li>
                <strong>Cable fatigue:</strong> cables in vibrating environments develop conductor
                fractures, especially at termination points.
              </li>
              <li>
                <strong>Component fatigue:</strong> repeated vibration causes mechanical fatigue in
                mounting brackets, DIN rail clips and busbar connections.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Dust and contamination">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Thermal insulation:</strong> dust accumulation on heatsinks, ventilation
                grilles and component surfaces reduces cooling effectiveness.
              </li>
              <li>
                <strong>Conductive contamination:</strong> metal dust, carbon dust and certain
                chemical deposits are electrically conductive and can bridge clearances.
              </li>
              <li>
                <strong>Moisture absorption:</strong> hygroscopic dust absorbs atmospheric moisture,
                creating conductive surface films.
              </li>
              <li>
                <strong>Mechanical interference:</strong> dust can jam moving parts such as relay
                armatures, switch mechanisms and fan bearings.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> when a fault recurs after repair, always consider whether
              an environmental factor is causing the recurrence. Replacing a component that failed
              due to vibration-induced fatigue without addressing the vibration will result in the
              replacement failing in the same way. Root cause analysis must include the operating
              environment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Electromagnetic compatibility and power quality</ContentEyebrow>

          <ConceptBlock title="Electromagnetic compatibility and power quality">
            <p>
              Electromagnetic compatibility (EMC) is an increasingly important consideration in
              modern electrical installations. The proliferation of electronic switching equipment —
              particularly variable speed drives, switched-mode power supplies and LED lighting —
              has created a more hostile electromagnetic environment. EMC-related faults are often
              intermittent, difficult to diagnose, and may require specialist instrumentation such
              as power quality analysers and oscilloscopes to identify.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common EMC issues in electrical maintenance">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Issue</th>
                    <th className="py-2 pr-4 font-medium text-white">Source</th>
                    <th className="py-2 font-medium text-white">Effect</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Conducted noise</td>
                    <td className="py-2 pr-4">VSDs, SMPS, LED drivers</td>
                    <td className="py-2">RCD nuisance tripping, meter errors, capacitor failure</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Radiated noise</td>
                    <td className="py-2 pr-4">VSD output cables, welding, radio transmitters</td>
                    <td className="py-2">False PLC inputs, sensor errors, communication faults</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Voltage transients</td>
                    <td className="py-2 pr-4">
                      Inductive load switching, lightning, supply events
                    </td>
                    <td className="py-2">Equipment damage, data loss, PLC resets</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Harmonic distortion</td>
                    <td className="py-2 pr-4">VSDs, UPS, LED lighting, IT loads</td>
                    <td className="py-2">
                      Neutral overheating, transformer overheating, capacitor failure
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="EMC mitigation measures">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable segregation:</strong> maintain physical separation between power and
                signal cables as specified in BS 7671 Chapter 52.
              </li>
              <li>
                <strong>Screened cables:</strong> use screened (shielded) cables for signal and
                communication wiring, with screens correctly earthed.
              </li>
              <li>
                <strong>EMC filters:</strong> fit input and output filters to VSDs as recommended by
                the manufacturer.
              </li>
              <li>
                <strong>Ferrite cores:</strong> fit ferrite suppressors on signal cables near
                sensitive equipment to attenuate high-frequency noise.
              </li>
              <li>
                <strong>Earthing:</strong> ensure a clean, low-impedance earth system — essential
                for EMC and for safety.
              </li>
            </ul>
            <p>
              <strong>Diagnostic clue:</strong> if a fault coincides with the operation of specific
              equipment (VSD starting, welder operating, process changing), EMC interference should
              be considered. Try to correlate the fault timing with the operating state of nearby
              equipment. A power quality analyser or oscilloscope can confirm the presence of
              interference.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Data logging and systematic diagnosis</ContentEyebrow>

          <ConceptBlock title="Data logging and systematic intermittent fault diagnosis">
            <p>
              When an intermittent fault cannot be observed directly, data logging becomes an
              essential diagnostic tool. Modern data loggers can record electrical parameters
              (voltage, current, power, frequency, harmonics) and environmental conditions
              (temperature, humidity) continuously for days or weeks, capturing the exact conditions
              at the moment the fault occurs. This data transforms an elusive, frustrating problem
              into a tangible, analysable event.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Data logging strategy">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Define what to measure:</strong> based on the suspected fault type — voltage
                for supply issues, current for overload/imbalance, temperature for thermal faults,
                humidity for moisture faults.
              </li>
              <li>
                <strong>Set trigger thresholds:</strong> configure the logger to flag events when
                parameters exceed normal limits — this highlights the significant events in weeks of
                data.
              </li>
              <li>
                <strong>Record the context:</strong> log environmental data alongside electrical
                data so you can correlate fault events with conditions.
              </li>
              <li>
                <strong>Maintain an event diary:</strong> ask operators to note when the fault
                occurs (date, time, conditions) alongside the data logger record.
              </li>
              <li>
                <strong>Analyse for patterns:</strong> look for correlations between fault events
                and time of day, day of week, weather, load patterns or other equipment operation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="When data logging is essential">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Faults occurring outside working hours.</li>
              <li>Faults with no clear pattern.</li>
              <li>Supply quality suspected.</li>
              <li>Suspected harmonic issues.</li>
              <li>Multiple possible causes.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Practical diagnostic steps">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Gather all operator reports and identify any pattern.</li>
              <li>Inspect all connections for signs of overheating.</li>
              <li>Check environmental conditions at the equipment.</li>
              <li>Install data loggers on suspect circuits.</li>
              <li>Correlate logged data with fault events.</li>
            </ul>
            <p className="italic">
              <strong>Note:</strong> intermittent faults test your patience and professionalism.
              Resist the temptation to make speculative replacements hoping the fault will go away.
              A systematic, evidence-based approach — even if it takes longer initially — is the
              only reliable path to a permanent solution. Document every observation and test
              result; this record often reveals the pattern that leads to the diagnosis.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=0dDlPS3YI2s"

            title="High Resistance Joint Fault Explained"

            channel="Craig Wiltshire"

            duration="2:34"

            topic="The classic intermittent fault, explained in under three minutes"

            caption="A high-resistance joint is the intermittent fault you will meet most often — it behaves differently under load, which is what makes it hard to catch."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Temperature — thermal expansion, insulation degradation.',
              'Moisture — earth leakage, tracking, corrosion.',
              'Vibration — loose connections, contact bounce.',
              'Load — high-resistance joints under current.',
              'EMC — interference from switching equipment.',
              'BS 7671 Chapter 52 — cable routing and separation.',
              'BS EN 60529 — IP rating classification.',
              'BS EN 61000 — EMC standards series.',
              'HSG85 — safe working practices.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section3-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Control Circuit Faults
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section3-7')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Documentation of Faults
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section3_6;
