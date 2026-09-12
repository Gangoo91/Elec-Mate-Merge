/**
 * MOET · Module 4 · Section 4.3 · Subsection 1 — Symptom Recognition and Initial Assessment
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
 *   · "Electrical. Electrical fault-finding and rectification techniques;
 *     diagnostic equipment."
 *   · "Electrical. Problem solving and critical reasoning techniques."
 *   · "Record information."
 *
 * ✎ RESOLVED (12 Sep): the "Key References" box cited "BS 7671:2018+A2:2022"
 * as the edition for Reg 134.1.1. Corrected to 2018+A4:2026, the current
 * edition. Only the edition label changed; the regulation number and the
 * surrounding text are untouched.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. The prev
 * link now follows the module chain back into Section 4.2 (Trend Analysis
 * and Predictive Maintenance) rather than looping to the section overview.
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Symptom Recognition and Initial Assessment - MOET Module 4 Section 3.1';
const DESCRIPTION =
  'Identifying fault symptoms, conducting preliminary assessments, interpreting operator reports, visual indicators and safe initial checks for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'symptom-first-step',
    question: 'What should be the first action when an operator reports an electrical fault?',
    options: [
      'Gather information from the operator about what happened and any changes observed',
      'Immediately replace the most commonly failing component to restore service quickly',
      'Open the distribution board and begin insulation resistance testing straight away',
      'Reset the tripped protective device to see whether the fault clears on its own',
    ],
    correctIndex: 0,
    explanation:
      'The first step is always to gather information. Asking the operator about the symptoms, when they started, what was happening at the time, and whether anything changed provides critical context that guides your diagnostic approach and prevents wasted effort.',
  },
  {
    id: 'visual-indicator',
    question:
      'Which visual indicator most reliably suggests overheating at an electrical termination?',
    options: [
      'A thin film of dust settled on top of the connection block',
      'Discolouration, browning or charring of insulation near the connection',
      'Bright, shiny copper visible where a conductor enters the terminal',
      'Manufacturer’s coloured sleeving used to identify the line conductor',
    ],
    correctIndex: 1,
    explanation:
      'Discolouration, browning or charring of insulation near a termination is a clear visual indicator of overheating. This may be caused by a loose connection, undersized conductor or excessive current. It warrants immediate investigation before the fault progresses to failure or fire.',
  },
  {
    id: 'sensory-assessment',
    question:
      'During an initial assessment, an unusual smell near a motor starter is detected. What does a pungent, acrid smell typically indicate?',
    options: [
      'Fresh lubricating grease applied to the contactor mechanism during the last service',
      'Normal warming of the enclosure as the equipment reaches operating temperature',
      'A minor build-up of dust being burnt off harmlessly by the running motor',
      'Overheated or burnt insulation, possibly from an overloaded coil or cable',
    ],
    correctIndex: 3,
    explanation:
      'A pungent, acrid smell near electrical equipment almost always indicates overheated or burnt insulation. This could be from an overloaded contactor coil, overheated cable insulation, or a failed component. The source must be identified and the circuit isolated before further investigation.',
  },
  {
    id: 'safe-initial-check',
    question:
      'Before opening an electrical enclosure to investigate a reported fault, which check is essential?',
    options: [
      'Verifying the circuit is isolated, locked off, and proved dead using a GS38-compliant voltage indicator',
      'Confirming the protective device has tripped, which proves the circuit is safely disconnected',
      'Checking that the enclosure has cooled down enough to be comfortable to touch by hand',
      'Recording the manufacturer and model number of the equipment for the maintenance report',
    ],
    correctIndex: 0,
    explanation:
      'Before opening any electrical enclosure, safe isolation must be carried out. This means isolating the circuit, locking off the isolator, and proving dead with an approved voltage indicator that has been tested before and after use, in accordance with GS38. This is a non-negotiable safety requirement under the Electricity at Work Regulations 1989.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The purpose of an initial fault assessment is to:',
    options: [
      'Immediately repair the fault without delay',
      'Gather information and narrow down the possible causes before testing',
      'Order replacement parts based on the equipment age',
      'Complete the job sheet as quickly as possible',
    ],
    correctAnswer: 1,
    explanation:
      'An initial assessment gathers information about the fault symptoms, history and context. This structured approach narrows down possible causes before any physical testing begins, saving time and preventing incorrect diagnoses.',
  },
  {
    id: 2,
    question: 'Which of the following is NOT typically classified as a fault symptom?',
    options: [
      'Motor running hot with reduced output',
      'Equipment running but producing abnormal noise',
      'The scheduled maintenance date being overdue',
      'Circuit breaker tripping repeatedly on overload',
    ],
    correctAnswer: 2,
    explanation:
      'A scheduled maintenance date being overdue is an administrative matter, not a fault symptom. Fault symptoms are observable abnormalities such as unusual noise, tripping, overheating, or reduced performance that indicate something is wrong with the equipment.',
  },
  {
    id: 3,
    question:
      "An operator reports that a motor 'just stopped'. Which question would be MOST useful to ask first?",
    options: [
      'How old is the motor and when was it last serviced by the maintenance team?',
      'What is the make and model of the variable speed drive controlling the motor?',
      'Has the production target for the shift been affected by the stoppage?',
      'Did anything unusual happen immediately before it stopped — any noise, smell, flickering or alarm?',
    ],
    correctAnswer: 3,
    explanation:
      'Asking about events immediately before the failure provides the most diagnostic value. Unusual noises, smells, flickering or alarms can indicate the type of fault — for example, a burning smell suggests overheating, a bang suggests a short circuit, and flickering suggests a loose connection.',
  },
  {
    id: 4,
    question: 'Discolouration around a cable termination in a distribution board indicates:',
    options: [
      'Possible overheating due to a loose connection or excessive current',
      'The cable was manufactured with coloured insulation',
      'Normal ageing with no cause for concern',
      'The termination was recently replaced',
    ],
    correctAnswer: 0,
    explanation:
      'Discolouration, especially browning or blackening, around a cable termination is a strong indicator of overheating. Common causes include loose connections creating high-resistance joints, undersized conductors, or sustained overcurrent. This requires immediate investigation.',
  },
  {
    id: 5,
    question: 'Which sensory indicator suggests a possible earth fault in a damp environment?',
    options: [
      'A high-pitched whine from a transformer',
      'Tingling sensation when touching earthed metalwork near the equipment',
      'The equipment running quieter than normal',
      'Vibration felt through the floor near a motor',
    ],
    correctAnswer: 1,
    explanation:
      'A tingling sensation when touching earthed metalwork is a serious indicator of an earth fault. In a damp environment, the fault current path may include the person, creating a shock risk. This requires immediate isolation and investigation. Under no circumstances should the equipment remain in service.',
  },
  {
    id: 6,
    question: "The 'half-split' technique in fault finding involves:",
    options: [
      'Splitting the maintenance team into two groups',
      'Cutting the faulty cable in half to inspect it',
      'Testing at the midpoint of a circuit to determine which half contains the fault',
      'Working on half the system while the other half remains live',
    ],
    correctAnswer: 2,
    explanation:
      'The half-split technique is a systematic diagnostic method where you test at the midpoint of a circuit or system. The result tells you which half the fault lies in, and you then repeat the process on that half. This binary approach rapidly narrows down the fault location.',
  },
  {
    id: 7,
    question:
      "During initial assessment, checking the trip indicators on an MCCB reveals it has tripped on 'short circuit'. This tells you:",
    options: [
      'A sustained, modest overcurrent has built up gradually over a long period of running',
      'The earth leakage current has exceeded the residual current setting of the device',
      'The supply voltage has risen above the rated value for the connected equipment',
      'A high-magnitude fault current has flowed, indicating a direct short circuit downstream',
    ],
    correctAnswer: 3,
    explanation:
      "An MCCB trip indicator showing 'short circuit' confirms that a high-magnitude fault current flowed through the device. This indicates a direct short circuit — conductor to conductor or conductor to earth — somewhere downstream. The fault must be located before re-energising.",
  },
  {
    id: 8,
    question:
      "What does a 'burning' or 'fishy' smell near electrical equipment typically indicate?",
    options: [
      'Overheated thermoplastic insulation or a failing electronic component',
      'Normal operation of equipment that is correctly loaded and running within its ratings',
      'Damp or condensation forming on the surface of cold metalwork in the enclosure',
      'A recently applied protective coating curing on newly installed busbars',
    ],
    correctAnswer: 0,
    explanation:
      "A burning or 'fishy' smell is characteristic of overheated thermoplastic (PVC) insulation or failing electronic components such as capacitors or resistors. The 'fishy' smell specifically comes from thermal decomposition of certain plastics and is a warning sign that should not be ignored.",
  },
  {
    id: 9,
    question: 'When recording fault symptoms during initial assessment, which approach is correct?',
    options: [
      'Record only the final diagnosis, since the intermediate symptoms are no longer relevant once solved',
      'Record the specific symptoms, time, date, conditions and any operator observations in detail',
      'Wait until the repair is complete and then write the report from memory at the end of the job',
      'Note only the symptoms you personally witnessed, leaving out anything the operator described',
    ],
    correctAnswer: 1,
    explanation:
      'Detailed, contemporaneous recording of fault symptoms is essential. This should include the exact symptoms observed, the date and time, operating conditions, any operator observations, and environmental factors. This information supports accurate diagnosis, trend analysis, and future maintenance planning.',
  },
  {
    id: 10,
    question:
      'An RCD protecting a socket circuit trips immediately when reset. The initial assessment should consider:',
    options: [
      'Only the RCD itself, replacing it before investigating anything connected to the circuit',
      'Only the most recently installed appliance, ignoring the fixed wiring of the circuit',
      'All possible causes including connected loads, wiring faults, moisture ingress and the RCD itself',
      'Only a loose neutral connection, as this is the sole cause of immediate RCD tripping',
    ],
    correctAnswer: 2,
    explanation:
      'When an RCD trips immediately on reset, all possible causes should be considered systematically. These include faulty connected loads, wiring faults (especially in damp conditions), moisture ingress into accessories, and the RCD itself. Disconnecting loads methodically helps identify the source.',
  },
  {
    id: 11,
    question:
      'Under BS 7671, which regulation requires that electrical installation work is carried out with good workmanship by skilled or instructed persons?',
    options: [
      'Regulation 643 — Inspection and testing on completion',
      'Regulation 651 — Periodic inspection and testing requirements',
      'Regulation 411 — Automatic disconnection of supply',
      'Regulation 134.11 — Good workmanship by skilled or instructed persons',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 134.11 of BS 7671 requires good workmanship by one or more skilled or instructed persons in the erection of an electrical installation. Diagnostic testing and fault finding likewise demand a person with the training, knowledge and experience to work to that standard.',
  },
  {
    id: 12,
    question:
      'Which of the following environmental factors should be noted during an initial fault assessment?',
    options: [
      'Temperature, humidity, dust levels, vibration and any recent environmental changes',
      'The name of the operator on shift and how long they have worked for the company',
      'The original purchase cost of the equipment and its current book value',
      'The colour of the enclosure and whether it matches the rest of the plant room',
    ],
    correctAnswer: 0,
    explanation:
      'Environmental factors such as temperature, humidity, dust accumulation, vibration levels and any recent changes (e.g., new equipment installed nearby, building works creating dust) can directly cause or contribute to electrical faults. Recording these during the initial assessment helps identify environmental root causes.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a fault symptom and a fault cause?',
    answer:
      'A fault symptom is the observable effect — what you can see, hear, smell or measure (e.g., a motor running hot, a circuit breaker tripping, discoloured insulation). The fault cause is the underlying reason for the symptom (e.g., a loose connection creating high resistance, an insulation breakdown causing earth leakage). Effective fault finding works backwards from symptoms to identify the root cause.',
  },
  {
    question: 'How much time should I spend on initial assessment before starting tests?',
    answer:
      'There is no fixed time, but the initial assessment phase — gathering information, visual inspection, reviewing history — typically takes 10 to 20 minutes and is time very well spent. Rushing into testing without understanding the context often leads to wasted time chasing the wrong fault. A thorough initial assessment can eliminate many possible causes before you even pick up a test instrument.',
  },
  {
    question: 'Should I always isolate before doing an initial assessment?',
    answer:
      'If the initial assessment involves opening enclosures or touching any part of the installation, safe isolation is mandatory. However, some initial assessment activities can be carried out with the equipment energised — such as observing from a safe distance, listening for unusual sounds, checking indicator lights, reading panel instruments, and talking to operators. Use professional judgement but always err on the side of safety.',
  },
  {
    question: "What if the operator's description of the fault does not match what I observe?",
    answer:
      "This is common and valuable information. The discrepancy may indicate an intermittent fault that is not present when you arrive, or it may mean the operator has misinterpreted the symptoms. Record both the operator's account and your own observations. An intermittent fault that was present earlier may recur, and the operator's description may be the only evidence of it.",
  },
  {
    question: 'How does symptom recognition relate to the ST1426 apprenticeship standard?',
    answer:
      'ST1426 requires maintenance technicians to demonstrate knowledge of fault-finding techniques and the ability to diagnose faults using a systematic approach. Symptom recognition is the first step in this systematic approach. The standard expects you to gather information, interpret symptoms, and apply logical reasoning before commencing physical diagnosis — exactly the skills covered in this section.',
  },
];

const MOETModule4Section3_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.3 · Subsection 1"
        title="Symptom Recognition and Initial Assessment"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Identifying fault symptoms and conducting preliminary assessments for effective
            diagnosis.
          </p>

          <TLDR
            points={[
              'Observe first: Gather information before touching anything.',
              'Symptoms: Visual, audible, olfactory, thermal and tactile indicators.',
              'Operator input: Interview the person who reported the fault.',
              'History: Check maintenance records and previous fault reports.',
            ]}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safe approach:</strong> Assess hazards before investigation begins.
              </li>
              <li>
                <strong>GS38 compliance:</strong> Prove dead before opening enclosures.
              </li>
              <li>
                <strong>Record keeping:</strong> Document all observations contemporaneously.
              </li>
              <li>
                <strong>ST1426:</strong> Maps to fault diagnosis and systematic approach KSBs.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the importance of structured initial assessment before testing',
              'Identify visual, audible, olfactory and thermal fault indicators',
              'Conduct effective operator interviews to gather fault information',
              'Interpret trip indicators, alarm logs and panel instrument readings',
              'Apply safe working practices during preliminary fault investigation',
              'Document initial findings accurately for diagnostic records',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The importance of initial assessment</ContentEyebrow>

          <ConceptBlock title="Rushing to diagnosis is one of the most costly mistakes in electrical maintenance">
            <p>
              Fault finding is arguably the most valuable skill a maintenance technician possesses.
              When equipment fails on a production line, the cost of downtime can run to thousands
              of pounds per hour. The pressure to restore service quickly is intense — but rushing
              to a diagnosis without first conducting a thorough initial assessment is one of the
              most common and costly mistakes in electrical maintenance. A structured initial
              assessment takes minutes; an incorrect diagnosis can waste hours and potentially cause
              further damage.
            </p>
            <p>
              The initial assessment phase sits before any physical testing. It involves gathering
              information about the fault from every available source: the operator who reported it,
              the physical environment, visual and sensory observation, equipment history, and any
              monitoring or alarm data. The goal is to form a hypothesis — a working theory of what
              has gone wrong — that you can then test systematically.
            </p>
            <p>
              In the context of the ST1426 Maintenance and Operations Engineering Technician
              standard, this maps directly to the knowledge requirement for systematic fault
              diagnosis. The standard expects you to demonstrate a logical, structured approach to
              identifying faults, starting with information gathering and progressing through
              hypothesis, testing and confirmation. The initial assessment is where that structured
              approach begins.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Why initial assessment matters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Efficiency:</strong> Gathering information first prevents wasted time
                testing components that are not related to the fault.
              </li>
              <li>
                <strong>Safety:</strong> Understanding the fault context helps identify hazards
                before you begin physical investigation.
              </li>
              <li>
                <strong>Accuracy:</strong> Context from operators and history often points directly
                to the fault cause, reducing diagnostic uncertainty.
              </li>
              <li>
                <strong>Cost:</strong> Correct first-time diagnosis minimises downtime and avoids
                unnecessary component replacement.
              </li>
              <li>
                <strong>Learning:</strong> Detailed initial assessment builds your experience
                database for future fault-finding scenarios.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Jumping straight to component replacement"
            whatHappens={
              <>
                The most frequent error in fault diagnosis is jumping straight to component
                replacement without assessment. A technician who replaces a contactor because "it's
                usually the contactor" may find the replacement fails immediately because the
                underlying cause — such as a supply voltage issue or a downstream short circuit —
                was never identified.
              </>
            }
            doInstead={<>Always diagnose before you replace.</>}
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Visual and sensory fault indicators</ContentEyebrow>

          <ConceptBlock title="Senses gather diagnostic information before you pick up a test instrument">
            <p>
              Before picking up a single test instrument, an experienced maintenance technician uses
              their senses to gather a remarkable amount of diagnostic information. Visual, audible,
              olfactory (smell) and tactile (touch) indicators can often tell you more in 60 seconds
              than 30 minutes of random testing. Training yourself to observe systematically is one
              of the most important skills you will develop.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Visual indicators">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Observation</th>
                    <th className="py-2 pr-4 font-medium text-white">Possible fault</th>
                    <th className="py-2 font-medium text-white">Severity</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Discoloured or charred insulation</td>
                    <td className="py-2 pr-4">Overheating from loose connection or overcurrent</td>
                    <td className="py-2">High — fire risk</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Burn marks on enclosure or busbar</td>
                    <td className="py-2 pr-4">Arcing from short circuit or flashover</td>
                    <td className="py-2">Critical — arc flash risk</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Moisture or condensation inside enclosure</td>
                    <td className="py-2 pr-4">Ingress causing earth leakage or tracking</td>
                    <td className="py-2">Medium to high</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Swollen or leaking capacitor</td>
                    <td className="py-2 pr-4">Capacitor failure, possibly due to voltage stress</td>
                    <td className="py-2">High — explosion risk</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Tripped MCB/MCCB with flag indicator</td>
                    <td className="py-2 pr-4">Overcurrent or short circuit downstream</td>
                    <td className="py-2">Depends on trip type</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Audible indicators">
            <p>
              Audible indicators are equally valuable. A healthy electrical installation is largely
              silent, so any unusual sound warrants investigation. A buzzing or humming noise from a
              contactor may indicate a damaged shading ring on the coil, causing the armature to
              vibrate at mains frequency. A crackling sound suggests arcing — a serious and
              potentially dangerous condition. A high-pitched whine from a variable speed drive may
              indicate DC bus capacitor problems or switching frequency issues.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Smell as a diagnostic tool">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Acrid/burning smell:</strong> Overheated insulation (PVC gives a
                characteristic sharp, chemical odour when heated beyond its rating).
              </li>
              <li>
                <strong>Fishy smell:</strong> Thermal decomposition of certain thermoplastic
                materials or electronic components — often from overheated circuit boards or failing
                capacitors.
              </li>
              <li>
                <strong>Ozone smell:</strong> Electric arcing produces ozone (O3), which has a
                sharp, clean smell — detectable near switchgear that has experienced flashover.
              </li>
              <li>
                <strong>Hot metal smell:</strong> Overheating of conductors, busbars or motor
                windings carrying excessive current.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Tactile indicators"
            onSite="Never rely on touch to assess whether a conductor is energised. Only use touch for temperature assessment on confirmed dead circuits or the external surfaces of earthed metalwork. Always use an approved voltage indicator to determine whether a circuit is live."
          >
            <p>
              Tactile indicators should be used with extreme caution and only on equipment that is
              confirmed safe to touch. The exterior of enclosures, motor housings and cable runs can
              be assessed for abnormal temperature. A motor housing that is too hot to hold your
              hand against for more than a few seconds is likely overheating — normal operating
              temperature for most industrial motors is 40 to 80 degrees Celsius above ambient,
              depending on insulation class.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Operator interviews and information gathering</ContentEyebrow>

          <ConceptBlock title="The person present when the fault occurred is your most valuable source">
            <p>
              The person who was present when the fault occurred is your most valuable source of
              information. Operators, production staff and building users often observe critical
              details that are no longer visible by the time you arrive. An effective operator
              interview is a structured conversation — not a casual chat — that extracts the maximum
              diagnostic value from the operator's experience.
            </p>
            <p>
              Many technicians undervalue this step, viewing operator accounts as unreliable or
              vague. In reality, operators work with their equipment every day and are often acutely
              aware of subtle changes in behaviour — a slightly different sound, a brief flicker, a
              momentary hesitation — that are enormously significant diagnostically. Your job is to
              ask the right questions to unlock this information.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key questions for operator interviews">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>"What exactly happened?"</strong> — Let the operator describe the event in
                their own words first.
              </li>
              <li>
                <strong>"When did it start?"</strong> — Establish the timeline: sudden failure or
                gradual deterioration?
              </li>
              <li>
                <strong>"What was happening at the time?"</strong> — Was the equipment starting up,
                at full load, during a changeover?
              </li>
              <li>
                <strong>"Did you notice anything unusual beforehand?"</strong> — Sounds, smells,
                vibrations, flickering, performance changes.
              </li>
              <li>
                <strong>"Has this happened before?"</strong> — Recurring faults suggest a root cause
                that previous repairs did not address.
              </li>
              <li>
                <strong>"Has anything changed recently?"</strong> — New equipment, building works,
                weather changes, different product or process.
              </li>
              <li>
                <strong>"Did you do anything after the fault occurred?"</strong> — Reset attempts,
                switching operations, moving equipment.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Beyond the interview: documentation">
            <p>
              Beyond the operator interview, you should review all available documentation.
              Maintenance logs and previous fault reports may reveal a pattern. If the same motor
              has tripped on overload three times in the past month, the root cause may be
              mechanical (bearing wear increasing current draw) rather than electrical. Equipment
              manuals may list known fault conditions and their symptoms. Alarm logs from Building
              Management Systems (BMS) or Supervisory Control and Data Acquisition (SCADA) systems
              can provide timestamped data showing the exact sequence of events leading to the
              fault.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Information sources for initial assessment"
            onSite={
              <>
                Never dismiss an operator's account because it uses non-technical language. "It made
                a funny noise and then went bang" is a technically meaningful description — it
                suggests a progressive fault condition (unusual noise) followed by a catastrophic
                failure (short circuit or mechanical seizure).
              </>
            }
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Operator account:</strong> First-hand description of the fault event and
                preceding conditions.
              </li>
              <li>
                <strong>Maintenance history:</strong> Previous faults, repairs and component
                replacements on the same equipment.
              </li>
              <li>
                <strong>Equipment manuals:</strong> Manufacturer fault codes, diagnostic procedures
                and known issues.
              </li>
              <li>
                <strong>Alarm and event logs:</strong> BMS, SCADA, PLC fault registers and drive
                fault codes.
              </li>
              <li>
                <strong>Circuit drawings:</strong> Schematic and wiring diagrams showing the circuit
                topology.
              </li>
              <li>
                <strong>Previous test results:</strong> Baseline insulation resistance, earth loop
                impedance and RCD test data.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Interpreting trip indicators and alarm data</ContentEyebrow>

          <ConceptBlock title="Protective devices provide a wealth of diagnostic information">
            <p>
              Modern protective devices and control systems provide a wealth of diagnostic
              information if you know how to read them. Before any physical testing, checking trip
              indicators, fault codes and alarm logs can immediately narrow your diagnosis. This is
              one of the most efficient steps in the initial assessment — yet it is frequently
              overlooked by less experienced technicians.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Protective device trip indicators">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Device</th>
                    <th className="py-2 pr-4 font-medium text-white">Indicator</th>
                    <th className="py-2 font-medium text-white">What it tells you</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">MCCB with trip flag</td>
                    <td className="py-2 pr-4">Overload / Short circuit indicator</td>
                    <td className="py-2">
                      Whether the fault is high current (short) or sustained overcurrent (overload)
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">RCD</td>
                    <td className="py-2 pr-4">Test button / trip indicator</td>
                    <td className="py-2">
                      Earth leakage exceeding rated residual current (typically 30 mA for personal
                      protection)
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Motor overload relay</td>
                    <td className="py-2 pr-4">Trip flag / reset button position</td>
                    <td className="py-2">
                      Motor current exceeded the overload setting for the thermal trip time
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Variable speed drive</td>
                    <td className="py-2 pr-4">Fault code on display</td>
                    <td className="py-2">
                      Specific fault type — overcurrent, overvoltage, earth fault, overtemperature,
                      etc.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">PLC / Controller</td>
                    <td className="py-2 pr-4">Fault LED / diagnostic register</td>
                    <td className="py-2">
                      Input/output failure, communication loss, programme error, watchdog timeout
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Variable speed drive fault logs">
            <p>
              Variable speed drives are particularly helpful during initial assessment because they
              store fault histories. Most modern drives record the last several fault events with
              timestamps and operating conditions at the time of the fault — such as motor current,
              DC bus voltage, output frequency and motor temperature. Accessing this fault log is
              often the single most informative step in diagnosing a drive-related issue. Refer to
              the manufacturer's manual for the specific fault code meanings, as these vary between
              manufacturers.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reading the evidence"
            onSite="Trip indicators tell you what the protective device detected, not necessarily the root cause. An overload trip on a motor may be caused by a mechanical problem (seized bearing), an electrical problem (single-phasing), or even an incorrect overload setting. The trip indicator narrows the search — it does not complete it."
          >
            <p>
              When you arrive at a fault, think of it as a detective arriving at a scene. The
              evidence is all around you — you just need to know where to look and what it means. A
              systematic scan of all available indicators takes only a few minutes but can save
              hours of unnecessary testing.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Check all protective device positions and trip indicators in the relevant
                distribution board.
              </li>
              <li>Read any fault codes displayed on drives, PLCs or other intelligent devices.</li>
              <li>Review BMS or SCADA alarm logs for the time period around the fault.</li>
              <li>
                Check if other equipment on the same supply has been affected (indicating a supply
                problem).
              </li>
              <li>
                Note the position of any manual switches, selector switches or control buttons.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Safe approach and preliminary checks</ContentEyebrow>

          <ConceptBlock title="Safety remains the overriding priority">
            <p>
              Throughout the initial assessment, safety must remain the overriding priority. The
              urgency to restore service must never compromise safe working practices. The
              Electricity at Work Regulations 1989 place an absolute duty on all persons to take
              precautions against electrical danger — and this duty applies equally during fault
              diagnosis as it does during planned maintenance.
            </p>
            <p>
              Before beginning any physical investigation, carry out a dynamic risk assessment.
              Consider what hazards are present, what condition the equipment is in, and whether it
              is safe to approach. Equipment that has suffered a short circuit or arc flash may have
              damaged enclosures, exposed conductors, or compromised protective devices. Never
              assume that a tripped circuit breaker has successfully disconnected the supply —
              always prove dead.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Safe initial assessment checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dynamic risk assessment:</strong> Identify hazards in the immediate area —
                electrical, mechanical, chemical, environmental.
              </li>
              <li>
                <strong>Safe isolation:</strong> Isolate the circuit, lock off, and prove dead
                before opening any enclosure (GS38 compliance).
              </li>
              <li>
                <strong>PPE assessment:</strong> Determine appropriate PPE for the task — arc flash
                rated if working near energised equipment.
              </li>
              <li>
                <strong>Accompaniment:</strong> For high-risk investigations (HV, confined spaces),
                ensure a second competent person is present.
              </li>
              <li>
                <strong>Communication:</strong> Inform the relevant persons that you are
                investigating a fault and the equipment is isolated.
              </li>
              <li>
                <strong>Escape route:</strong> Ensure you have a clear exit path from the work area.
              </li>
            </ul>
          </ConceptBlock>

          <div className="grid gap-4 sm:grid-cols-2">
            <ConceptBlock title="What you CAN do energised">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                <li>Visual observation from a safe distance.</li>
                <li>Listening for unusual sounds.</li>
                <li>Reading panel instruments and displays.</li>
                <li>Checking indicator lights and alarm panels.</li>
                <li>Interviewing operators.</li>
                <li>Reviewing logs and documentation.</li>
              </ul>
            </ConceptBlock>
            <ConceptBlock title="What requires isolation first">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
                <li>Opening any electrical enclosure.</li>
                <li>Touching any conductor or termination.</li>
                <li>Disconnecting cables or components.</li>
                <li>Carrying out insulation resistance tests.</li>
                <li>Replacing any component.</li>
                <li>Working inside a panel or distribution board.</li>
              </ul>
            </ConceptBlock>
          </div>

          <ConceptBlock title="Regulation 14 — live working">
            <p>
              Some diagnostic procedures may require the circuit to be energised — for example,
              measuring supply voltage, checking phase rotation, or monitoring current draw under
              load. Regulation 14 of the Electricity at Work Regulations 1989 permits live working
              only when it is unreasonable to work dead, it is reasonable to work live, and suitable
              precautions are in place. For fault diagnosis, live measurements may be justified, but
              the decision must be documented and appropriate controls must be in place, including
              insulated tools, barriers, and competent supervision.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Write down your working hypothesis">
            <p>
              The initial assessment phase should result in a documented preliminary diagnosis —
              your best hypothesis based on the available evidence. This hypothesis then guides your
              systematic testing in the next phase. Write it down: "Based on the operator report,
              the overload trip on the motor starter, and the discolouration observed at the T2
              terminal, the preliminary diagnosis is a high-resistance connection at the motor
              terminal box causing single-phase running under load."
            </p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="The operator who tells you what is wrong"

            situation={
              <>
                <p>
                  You are called to a machine that "keeps stopping". The operator adds, unprompted,
                  that it only does it after they have cleared a jam, and that it was worse before
                  the guard was adjusted last month.
                </p>

                <p>The work order says only: "Machine faulty, intermittent stopping."</p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Take the operator’s account seriously and write it down. They have watched this
                  machine for hundreds of hours; you have been there four minutes. The detail about
                  clearing a jam is a testable hypothesis handed to you for free.
                </p>

                <p>
                  Turn it into a specific check: after a jam is cleared, is the guard being closed
                  fully, and does the interlock make properly every time? A guard adjusted last
                  month that now sits slightly proud will latch under normal closing but not after a
                  hurried one.
                </p>

                <p>
                  Reproduce it if you safely can. Ask them to show you how they clear a jam and
                  close up, rather than describing it. What people do and what they report doing
                  often differ, and the difference is frequently the fault.
                </p>

                <p>
                  Feed the detail back into the work order, whatever you find. "Only after clearing
                  a jam" belongs in the record even if this visit does not resolve it.
                </p>
              </>
            }

            whyItMatters={
              <p>
                Symptom recognition is not only about what the machine tells you, and the fastest
                diagnostic route is often a question rather than an instrument. The operator in this
                scenario has effectively described the fault; all that was needed was someone to
                listen and turn it into a check. Arriving with a fixed idea of what is wrong is the
                quickest way to walk past the answer, and it is also the behaviour most likely to
                make the next operator stop volunteering anything.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Initial assessment steps: dynamic risk assessment and safe approach; interview the operator; visual and sensory observation from a safe distance; check trip indicators, fault codes, alarm logs; review maintenance history; form a preliminary hypothesis and document findings.',
              'Key references: EAWR 1989 Reg 4(3) safe systems and Reg 14 live working; GS38 voltage indicator requirements for proving dead; BS 7671:2018+A4:2026 Reg 134.1.1 competent persons; HSG85 safe working practices; ST1426 fault diagnosis KSBs.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section2-6')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Trend Analysis and Predictive Maintenance
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section3-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Systematic Diagnostic Approach
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section3_1;
