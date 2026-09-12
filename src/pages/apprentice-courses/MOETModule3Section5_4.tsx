/**
 * MOET · Module 3 · Section 3.5 · Subsection 4 — Transfer Switches and
 * Changeover Systems
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
 *   · "Electrical. Electricity at Work regulations. IET wiring regulations."
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Transfer Switches and Changeover Systems - MOET Module 3.5.4';
const DESCRIPTION =
  'Comprehensive guide to automatic transfer switches and changeover systems for electrical maintenance technicians: ATS types, operating principles, open and closed transition, testing, maintenance and BS 7671 compliance under ST1426.';

const quickCheckQuestions = [
  {
    id: 'ats-purpose',
    question: 'What is the primary function of an automatic transfer switch (ATS)?',
    options: [
      'To regulate the output voltage of the standby generator to a constant level',
      'To synchronise the mains and generator continuously so they run in parallel',
      'To detect a mains failure, transfer the load to a standby source, then retransfer on restoration',
      'To protect the standby generator against overload by shedding its entire load',
    ],
    correctIndex: 2,
    explanation:
      'An ATS continuously monitors the normal (mains) supply. When it detects a failure (loss of voltage, under-voltage, over-voltage or frequency deviation), it sends a start signal to the standby generator and, once the generator reaches stable voltage and frequency, automatically transfers the load. When the normal supply is restored and stable, the ATS retransfers the load back and signals the generator to shut down. This entire process occurs without manual intervention.',
  },
  {
    id: 'open-transition',
    question: 'What is the key characteristic of an open-transition (break-before-make) transfer?',
    options: [
      'The two sources are briefly paralleled so the load sees no interruption at all',
      'The load is gradually ramped from one source to the other over several seconds',
      'The transfer can only take place once the two sources have been synchronised',
      'There is a brief interruption (typically 100-500 ms) as the load drops one source before taking the other',
    ],
    correctIndex: 3,
    explanation:
      'In open-transition transfer, the ATS disconnects the load from the failing source before connecting it to the standby source. This creates a brief power interruption (typically 100-500 ms). This is the simplest and most common transfer method, suitable for most general loads. It prevents any possibility of paralleling the two sources, which is important when the sources are not synchronised. Critical loads that cannot tolerate even brief interruptions require UPS support or closed-transition transfer.',
  },
  {
    id: 'ats-testing',
    question: 'How often should an ATS be tested under simulated mains failure conditions?',
    options: [
      'Monthly under simulated mains failure, with a full-load transfer test at least annually',
      'Only once, during commissioning, as the operating sequence cannot change afterwards',
      'Every five years, in line with the periodic inspection interval for the installation',
      'Only after a genuine mains failure has occurred, to confirm it operated correctly',
    ],
    correctIndex: 0,
    explanation:
      'ATS systems should be tested monthly by simulating a mains failure to verify the complete automatic sequence. This includes: mains failure detection, time delay, generator start signal, generator run-up, voltage and frequency verification, load transfer, stable operation on generator, mains restoration detection, retransfer delay, load retransfer and generator cooldown. Annual testing should include a full-load transfer to verify the ATS and generator perform correctly under actual load conditions.',
  },
  {
    id: 'bypass-isolation',
    question: 'What is the purpose of a bypass-isolation facility on an ATS?',
    options: [
      'To synchronise the mains and generator so they can run in parallel permanently',
      'To isolate the ATS from the circuit for maintenance without interrupting the load supply',
      'To shed non-essential loads automatically when the generator is overloaded',
      'To override the source interlock so both contactors can be closed together',
    ],
    correctIndex: 1,
    explanation:
      'A bypass-isolation facility provides a manual means of connecting the load directly to one supply source (usually the normal mains) while completely isolating the ATS from the circuit. This allows the ATS to be maintained, tested, repaired or replaced without interrupting the power supply to the load. It is an essential feature for ATS installations serving critical loads where power continuity is paramount. The bypass switch must be interlocked to prevent paralleling of sources.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The two main types of ATS contactor arrangement are:',
    options: [
      'Air circuit breakers and oil circuit breakers operating in tandem',
      'Mechanically interlocked contactor pairs and motorised changeover switches',
      'A single MCB feeding both sources through a common busbar arrangement',
      'Two fuse-switches wired in parallel with no interlock between them',
    ],
    correctAnswer: 1,
    explanation:
      'Mechanically interlocked contactor pairs use two separate contactors with both mechanical interlock (a physical linkage preventing both closing simultaneously) and electrical interlock (auxiliary contacts in the control circuit). Motorised changeover switches use a single device with a motor-driven mechanism that moves between source 1 and source 2 positions. Motorised switches are generally more reliable for frequent operation and provide inherent source isolation in the mid-position.',
  },
  {
    id: 2,
    question:
      'The time delay between mains failure detection and generator start signal is typically:',
    options: [
      'Zero seconds — the start signal is sent the instant a voltage dip is detected',
      '5-30 minutes, to confirm the normal supply has genuinely stabilised first',
      '3-10 seconds, to avoid starts during brief dips and transient faults that self-clear',
      '1-2 hours, to give the DNO ample time to restore the mains before starting',
    ],
    correctAnswer: 2,
    explanation:
      'A time delay (typically 3-10 seconds, adjustable) is programmed between the ATS detecting a supply abnormality and sending the generator start signal. This prevents unnecessary generator starts during brief supply disturbances such as voltage dips, auto-recloser operations on the DNO network, or transient faults that are cleared within seconds. Without this delay, the generator would start and stop frequently, causing wear and fuel waste.',
  },
  {
    id: 3,
    question: 'Closed-transition (make-before-break) transfer is used when:',
    options: [
      'A brief interruption of 100-500 ms is acceptable and the sources must never be paralleled',
      'The generator is too small to take the full load and must build up to it in stages',
      'The two sources are deliberately left unsynchronised to keep the control system simple',
      'Zero interruption is needed and the synchronised sources can be briefly paralleled (under 100 ms)',
    ],
    correctAnswer: 3,
    explanation:
      'Closed-transition transfer momentarily connects both sources in parallel (typically for less than 100 ms) so the load experiences zero interruption during transfer. This requires the two sources to be synchronised (matched in voltage, frequency and phase angle) at the moment of parallel connection. Synchronising relays and check-sync controls ensure the sources are sufficiently matched before allowing the transfer. This method is essential for sensitive loads but adds complexity and cost.',
  },
  {
    id: 4,
    question: 'BS 7671 Section 551 (low-voltage generating sets) requires that:',
    options: [
      'Source-switching arrangements must prevent parallel operation unless specifically designed for it',
      'Every standby generator must be rated to supply at least twice the total installation load',
      'A standby generator must always be connected through a three-pole rather than four-pole switch',
      'The generator neutral must never be connected to the installation earthing system',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Section 551 covers low-voltage generating sets and standby supplies. Where switching arrangements transfer between sources, they must prevent unintended parallel operation. Paralleling unsynchronised sources can cause massive fault currents, generator damage and supply network disturbance. The ATS interlock system (mechanical and electrical) is the primary means of compliance. Where intentional paralleling is required (closed transition), appropriate synchronising controls must be installed.',
  },
  {
    id: 5,
    question: 'During ATS maintenance, the most critical check is:',
    options: [
      'Confirming the indicator lamps and display backlight on the front panel are all illuminated',
      'Verifying the interlocks prevent both source contactors closing together (which would parallel sources)',
      'Topping up the lubricating oil reservoir that drives the motorised changeover mechanism',
      'Adjusting the retransfer delay to the shortest possible setting to minimise generator run time',
    ],
    correctAnswer: 1,
    explanation:
      'The interlock system is the primary safety feature of the ATS. If both contactors could close simultaneously, the generator and mains supply would be paralleled — potentially causing massive fault currents, generator destruction, and danger to DNO network operatives. During maintenance: manually operate the interlock to verify it physically prevents both contactors from closing; check electrical interlock auxiliary contacts; test the interlock under simulated failure conditions; and verify the mechanical linkage is in good condition.',
  },
  {
    id: 6,
    question: 'The retransfer time delay (after normal supply restoration) is typically set to:',
    options: [
      'Zero, so the load is switched back to the mains the instant any voltage reappears on it',
      '100-500 milliseconds, matching the break time used during an open-transition transfer',
      '5-30 minutes, to confirm the restored mains is genuinely stable before retransferring the load',
      '24 hours, so the load only ever returns to the mains during the next scheduled maintenance visit',
    ],
    correctAnswer: 2,
    explanation:
      'The retransfer delay (typically 5-30 minutes, adjustable) ensures the restored mains supply is genuinely stable before transferring the load back from the generator. Without this delay, intermittent supply faults (common during storm damage restoration) would cause repeated transfers and retransfers, stressing the ATS contacts, causing load disruption, and cycling the generator. The generator continues to run during this delay, providing backup if the mains fails again.',
  },
  {
    id: 7,
    question: 'A four-pole ATS is required instead of a three-pole ATS when:',
    options: [
      'The load current exceeds 400 A, as a three-pole switch is only rated up to that current',
      'The generator is single-phase, so a fourth pole is added to carry the return conductor',
      'The installation requires closed-transition transfer, the extra pole being used for synchronising',
      'The neutral must be switched with the phases to stop neutral current circulating between sources',
    ],
    correctAnswer: 3,
    explanation:
      'A four-pole ATS switches all three phases plus the neutral. This is required when the two supply sources have separate neutral-earth bonds (as in a TN-S system with a generator having its own earth electrode). Without switching the neutral, fault current could circulate between the two earth paths via the neutral connection, causing nuisance RCD tripping and creating shock hazards. BS 7671 Regulation 551.4 and the DNO connection requirements determine whether four-pole switching is needed.',
  },
  {
    id: 8,
    question: 'Load shedding in conjunction with an ATS is used to:',
    options: [
      'Disconnect non-essential loads when the generator cannot carry the full load, protecting critical services',
      'Synchronise the mains and generator by briefly removing all load so the two sources can be paralleled',
      'Reduce the brief interruption during an open-transition transfer to below 100 ms for all loads',
      'Increase the generator output voltage automatically when heavy motor loads are started',
    ],
    correctAnswer: 0,
    explanation:
      'Load shedding allows the ATS system to disconnect non-essential loads (e.g., HVAC non-essential circuits, general lighting in unoccupied areas) when operating on the generator, ensuring the generator can support all critical loads (emergency lighting, fire alarm, lifts, IT systems, medical equipment) without overloading. Load shedding is typically implemented through auxiliary contactors controlled by the ATS, with loads prioritised into tiers.',
  },
  {
    id: 9,
    question: 'The ATS control panel typically monitors which parameters on each supply source?',
    options: [
      'Insulation resistance and earth loop impedance only, sampled once at each transfer event',
      'Voltage on all phases, frequency, phase sequence and phase angle against programmable thresholds',
      'Power factor and harmonic distortion only, ignoring voltage and frequency entirely',
      'Conductor temperature and ambient humidity, transferring the load when either exceeds a limit',
    ],
    correctAnswer: 1,
    explanation:
      'The ATS controller monitors: voltage on all three phases (detecting loss, under-voltage and over-voltage); frequency (detecting under-frequency and over-frequency); phase sequence (detecting phase reversal which could damage motor loads); and in closed-transition systems, the phase angle between sources (for synchronisation). Each parameter has adjustable thresholds — the source must be within all thresholds to be considered acceptable. This comprehensive monitoring ensures the load is only connected to a healthy supply.',
  },
  {
    id: 10,
    question: 'During a monthly ATS test, the technician should record:',
    options: [
      'Only the final position of the changeover switch, as the timing figures are not relevant to a monthly test',
      'Only the generator fuel level and oil pressure, since the ATS itself needs no routine recording',
      'All transfer timings, voltage and frequency from both sources, and any mechanical abnormalities',
      'Only the insulation resistance of the load cables, measured before and after the transfer',
    ],
    correctAnswer: 2,
    explanation:
      'Comprehensive test records enable trend analysis and early detection of degradation. Record: time from mains failure simulation to generator start signal; generator run-up time to stable voltage and frequency; ATS transfer time; voltage and frequency readings from both sources at transfer and retransfer; retransfer delay time; generator cooldown time; any unusual mechanical noise, contact arcing or hesitation; and the condition of indicator lights and alarms. Compare readings with previous tests and commissioning data.',
  },
  {
    id: 11,
    question: 'Soft-load transfer is a feature that:',
    options: [
      'Reduces the generator output voltage during transfer so the load receives a gentler supply',
      'Delays the transfer until the load current has fallen to zero, then switches with no load present',
      'Sheds all non-essential loads before transfer so only the lightest possible load is switched',
      'Gradually shifts load between paralleled sources over seconds to cut transients and generator stress',
    ],
    correctAnswer: 3,
    explanation:
      'Soft-load transfer gradually shifts the load from one source to the other over a controlled period (typically 5-30 seconds) while both sources are paralleled. This avoids the sudden load step that occurs with instantaneous transfer, reducing transient voltage dips, minimising mechanical stress on the generator, and preventing nuisance tripping of sensitive loads. It is a feature of more sophisticated closed-transition ATS systems used in critical power installations.',
  },
  {
    id: 12,
    question:
      'If an ATS fails to transfer during a genuine mains failure, the maintenance technician should first check:',
    options: [
      'Whether the generator has started and reached stable output, then the ATS control circuit and interlock',
      'The downstream load circuits, by disconnecting every final circuit before looking at the ATS itself',
      'The retransfer delay setting, increasing it so the load stays on the mains for longer',
      'The earthing arrangement, by disconnecting the main earth to rule out a neutral fault first',
    ],
    correctAnswer: 0,
    explanation:
      'Systematic fault-finding: (1) Confirm the generator has started and is producing correct voltage and frequency; (2) Check the ATS control unit for fault indications and alarm codes; (3) Verify the control circuit supply (fuses, MCBs); (4) Check the transfer contactor coil voltage; (5) Inspect the mechanical interlock for jamming or damage; (6) Check auxiliary contact operation in the interlock circuit; (7) Verify the mains failure detection is registering correctly. Most ATS failures are caused by control circuit faults rather than mechanical failure of the main contacts.',
  },
];

const faqs = [
  {
    question: 'What is the difference between an ATS and a manual changeover switch?',
    answer:
      'An ATS automatically detects supply failure and transfers the load without human intervention. A manual changeover switch requires a person to physically operate the switch to transfer the load. Manual switches are used where: the generator is manually started; the installation is small; or the consequences of a brief delay in transfer are acceptable. For critical installations (hospitals, data centres, emergency services), an ATS is essential to minimise the duration of power interruption.',
  },
  {
    question: 'Can an ATS be used with a UPS system?',
    answer:
      'Yes — ATS and UPS serve complementary roles. The UPS provides immediate, seamless power continuity (zero transfer time) for sensitive loads during the period between mains failure and generator startup. The ATS transfers the UPS input supply from mains to generator once the generator is stable, allowing the UPS batteries to recharge. This combination provides both zero-interruption power for critical IT loads and long-duration backup via the generator.',
  },
  {
    question: 'How do I determine if I need a three-pole or four-pole ATS?',
    answer:
      'The choice depends on the earthing arrangement and the DNO requirements. In a TN-C-S (PME) system where the generator neutral is connected to the mains neutral, a three-pole ATS may suffice. In a TN-S system where the generator has its own earth electrode and separate neutral-earth bond, a four-pole ATS is required to prevent circulating neutral currents. Always consult the DNO (Distribution Network Operator) connection requirements and BS 7671 Section 551 before specifying.',
  },
  {
    question: 'What maintenance does an ATS require?',
    answer:
      'Monthly: simulate mains failure and verify the complete automatic sequence (detection, start, transfer, retransfer, shutdown); record all timing parameters and voltage/frequency readings. Six-monthly: clean contacts, check mechanical interlock operation, verify control wiring connections, test alarm and indication circuits. Annually: full-load transfer test; thermographic survey of all power connections; exercise the bypass-isolation facility; verify protection settings and time delays against commissioning data; update maintenance records.',
  },
  {
    question: 'What happens if both the mains and generator fail simultaneously?',
    answer:
      'If both sources fail, the ATS has no acceptable supply to connect. The load remains disconnected (both contactors open). The ATS controller will typically indicate a double-source failure alarm. For installations with UPS systems, the UPS batteries provide power for their rated autonomy period (typically 10-30 minutes). For critical installations, the design should include redundancy — multiple generators, dual UPS systems, or connection to two independent mains supplies — to minimise the risk of total power loss.',
  },
];

const MOETModule3Section5_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.5 · Subsection 4"
        title="Transfer Switches and Changeover Systems"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Automatic transfer switches and changeover procedures for standby power systems.
          </p>

          <TLDR
            points={[
              'ATS: Automatic mains failure detection and load transfer.',
              'Types: Open transition (break-before-make), closed transition (make-before-break).',
              'Interlock: Prevents paralleling of unsynchronised sources.',
              'Standards: BS 7671 Section 551, IEC 60947-6-1.',
            ]}
          />

          <ConceptBlock title="Maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Testing:</strong> Monthly simulated failure, annual full-load transfer.
              </li>
              <li>
                <strong>Interlocks:</strong> Verify mechanical and electrical interlock every visit.
              </li>
              <li>
                <strong>Bypass:</strong> Allows ATS isolation without load interruption.
              </li>
              <li>
                <strong>ST1426:</strong> Maps to auxiliary systems maintenance KSBs.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the operating principles of automatic transfer switches',
              'Distinguish between open-transition and closed-transition transfer methods',
              'Describe the interlock requirements preventing source paralleling',
              'Carry out monthly and annual ATS testing procedures',
              'Identify common ATS faults and systematic fault-finding techniques',
              'Apply BS 7671 Section 551 requirements for generator changeover systems',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>ATS operating principles</ContentEyebrow>

          <ConceptBlock title="The critical link between the normal mains supply and a standby generator">
            <p>
              An automatic transfer switch is the critical link between the normal mains supply and
              a standby generator. It monitors the mains supply continuously, detects failure
              conditions, initiates generator start-up, and transfers the electrical load
              automatically. Understanding the complete transfer sequence — and the safety
              interlocks that prevent dangerous parallel operation — is essential for every
              maintenance technician working on standby power systems.
            </p>
            <p>
              The ATS must discriminate between genuine supply failures (requiring transfer to
              generator) and transient disturbances (brief voltage dips, supply interruptions
              lasting a few seconds) that do not warrant a full transfer. This discrimination is
              achieved through adjustable time delays and voltage/frequency thresholds programmed
              into the ATS controller.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="ATS transfer sequence"
            onSite="Key point: the interlock is the single most important safety feature of the ATS. Every maintenance visit must include verification that both mechanical and electrical interlocks operate correctly."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Mains failure detected (voltage below threshold on any
                phase).
              </li>
              <li>
                <strong>Step 2:</strong> Time delay (3-10 s adjustable) to filter transient
                disturbances.
              </li>
              <li>
                <strong>Step 3:</strong> Generator start signal sent if mains not restored.
              </li>
              <li>
                <strong>Step 4:</strong> Generator runs up to stable voltage and frequency
                (typically 10-15 s).
              </li>
              <li>
                <strong>Step 5:</strong> ATS verifies generator output is within acceptable
                parameters.
              </li>
              <li>
                <strong>Step 6:</strong> Mains contactor opens, generator contactor closes (open
                transition).
              </li>
              <li>
                <strong>Step 7:</strong> Load supplied from generator; ATS monitors mains for
                restoration.
              </li>
              <li>
                <strong>Step 8:</strong> Mains restored — retransfer delay (5-30 min) to confirm
                stability.
              </li>
              <li>
                <strong>Step 9:</strong> Retransfer: generator contactor opens, mains contactor
                closes.
              </li>
              <li>
                <strong>Step 10:</strong> Generator cooldown period (typically 5 min), then
                shutdown.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Source interlock"
            whatHappens="The ATS must never allow both the mains and generator contactors to be closed simultaneously (unless the system is specifically designed for closed-transition transfer with synchronising controls). Simultaneous closure would parallel two unsynchronised AC sources, causing massive circulating fault currents that could destroy the generator, trip upstream protection, and endanger lives."
            doInstead="The interlock system uses both mechanical linkage (physical prevention) and electrical interlocking (auxiliary contacts in the control circuit) to achieve this."
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Transfer methods: open and closed transition</ContentEyebrow>

          <ConceptBlock
            title="Open transition creates a brief interruption; closed transition provides seamless changeover"
            onSite="Key point: most commercial and industrial installations use open-transition transfer with UPS support for critical loads. Closed-transition transfer is specified for installations where even the brief interruption of open transition is unacceptable and where the additional complexity and cost of synchronisation is justified."
          >
            <p>
              The method of transferring load between sources directly affects the power quality
              experienced by the connected equipment. Open-transition transfer creates a brief
              interruption; closed-transition transfer provides seamless changeover. The choice
              depends on the criticality of the loads and the acceptable level of supply
              interruption.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Transfer method comparison">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Feature</th>
                    <th className="py-2 pr-4 font-medium text-white">Open transition</th>
                    <th className="py-2 font-medium text-white">Closed transition</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Interruption</td>
                    <td className="py-2 pr-4">100-500 ms break</td>
                    <td className="py-2">Zero (make-before-break)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Paralleling</td>
                    <td className="py-2 pr-4">Never — sources separated</td>
                    <td className="py-2">Brief parallel (under 100 ms)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Synchronisation</td>
                    <td className="py-2 pr-4">Not required</td>
                    <td className="py-2">Required — voltage, frequency, phase</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Complexity</td>
                    <td className="py-2 pr-4">Simple</td>
                    <td className="py-2">Complex (synch relay, check-sync)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Cost</td>
                    <td className="py-2 pr-4">Lower</td>
                    <td className="py-2">Higher</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Application</td>
                    <td className="py-2 pr-4">General loads, motor loads</td>
                    <td className="py-2">Data centres, hospitals, critical IT</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>ATS maintenance and testing</ContentEyebrow>

          <ConceptBlock
            title="An ATS that is not regularly tested may fail at the critical moment when it is needed"
            onSite="Key point: never skip the interlock verification during testing. A failed interlock is an invisible hazard — the ATS will appear to work normally until the one occasion when a fault condition causes both contactors to attempt to close simultaneously."
          >
            <p>
              An ATS that is not regularly tested may fail at the critical moment when it is needed.
              Unlike most electrical equipment that operates continuously, an ATS may sit dormant
              for months or years between genuine mains failures. Regular testing is essential to
              verify that every component of the transfer sequence — from mains failure detection
              through to generator shutdown — operates correctly.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Monthly test procedure">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Simulate mains failure using the test switch on the ATS (do not isolate the actual
                mains).
              </li>
              <li>Verify the generator receives start signal and runs up to stable output.</li>
              <li>Confirm the ATS transfers the load to the generator.</li>
              <li>Record voltage and frequency from both sources.</li>
              <li>Record all timing parameters and compare with commissioning data.</li>
              <li>
                Restore the test switch — verify retransfer occurs after the programmed delay.
              </li>
              <li>Confirm the generator enters cooldown and shuts down automatically.</li>
              <li>Check all alarm and indication lamps operate correctly.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Annual maintenance checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Full-load transfer test (coordinate with building management for planned outage).
              </li>
              <li>Thermographic survey of all power connections and contacts.</li>
              <li>
                Inspect and clean main contacts (silvered contacts — use approved cleaner only).
              </li>
              <li>Verify mechanical interlock operation by manual test.</li>
              <li>Check electrical interlock auxiliary contacts.</li>
              <li>Retorque all power and control terminations.</li>
              <li>Exercise the bypass-isolation switch (if fitted).</li>
              <li>Verify all protection settings match commissioning data.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Bypass-isolation and system configuration</ContentEyebrow>

          <ConceptBlock
            title="A bypass-isolation facility keeps the load powered while the ATS itself is maintained"
            onSite="Under ST1426, maintenance technicians must understand standby power systems including ATS operation, testing and maintenance. This is part of the electrical plant, equipment and systems knowledge area. Practical competence in ATS testing is assessed through workplace observation."
          >
            <p>
              In critical power installations, the ATS itself must be maintainable without shutting
              down the load. A bypass-isolation facility provides this capability by allowing the
              load to be connected directly to one source (normally the mains) while the ATS is
              completely isolated from the circuit. Understanding the bypass procedure is essential
              for maintenance technicians working on critical power systems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Bypass procedure">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Confirm load is on normal mains supply.</li>
              <li>Close the bypass switch (load now on mains via bypass).</li>
              <li>Open the ATS mains contactor.</li>
              <li>Open the ATS isolation switches.</li>
              <li>ATS is now fully isolated — safe to maintain.</li>
              <li>Reverse procedure to restore ATS to service.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Configuration considerations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Three-pole vs four-pole switching (earthing arrangement).</li>
              <li>Load shedding tiers for generator capacity management.</li>
              <li>Multiple ATS for different load priority groups.</li>
              <li>Integration with building management systems (BMS).</li>
              <li>Remote monitoring and alarm reporting.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>ATS fault-finding and commissioning verification</ContentEyebrow>

          <ConceptBlock
            title="Systematic fault-finding is essential when an ATS fails to operate correctly"
            onSite="Under ST1426, maintenance technicians must demonstrate competence in maintaining auxiliary power systems including transfer switches. This includes understanding the complete transfer sequence, carrying out monthly and annual testing, and systematic fault-finding when problems are identified. Practical workplace observation of ATS testing forms part of the end-point assessment evidence."
          >
            <p>
              Systematic fault-finding is essential when an ATS fails to operate correctly. Because
              the ATS is a safety-critical system that must work during genuine emergencies, faults
              must be identified and resolved promptly. The maintenance technician must approach ATS
              fault-finding methodically, starting with the control system and working through the
              mechanical and electrical components in a logical sequence.
            </p>
            <p>
              Commissioning verification is equally important. When an ATS is first installed or
              after any modification, the complete transfer sequence must be verified against the
              design specification. This includes all timing parameters, voltage and frequency
              thresholds, interlock operation, and load shedding sequences. Commissioning data forms
              the baseline against which all future test results are compared.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Systematic fault-finding procedure">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Check the ATS controller display for fault codes and alarm
                indications — most modern ATS units provide diagnostic information.
              </li>
              <li>
                <strong>Step 2:</strong> Verify the generator has started and reached stable voltage
                and frequency — an ATS cannot transfer to a source that is not ready.
              </li>
              <li>
                <strong>Step 3:</strong> Check the control circuit supply — fuses, MCBs and control
                transformer feeding the ATS logic.
              </li>
              <li>
                <strong>Step 4:</strong> Verify contactor coil voltage — measure at the coil
                terminals to confirm the control circuit is commanding the transfer.
              </li>
              <li>
                <strong>Step 5:</strong> Inspect the mechanical interlock — look for physical
                jamming, broken linkages or misalignment preventing contactor operation.
              </li>
              <li>
                <strong>Step 6:</strong> Check electrical interlock auxiliary contacts — verify they
                are making and breaking correctly in the control circuit.
              </li>
              <li>
                <strong>Step 7:</strong> Review the mains failure detection settings — voltage
                thresholds and time delays may have drifted from commissioning values.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Commissioning verification checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Record all voltage and frequency thresholds for mains failure detection.</li>
              <li>
                Verify time delays: mains failure to start signal, transfer delay, retransfer delay,
                cooldown period.
              </li>
              <li>
                Confirm mechanical and electrical interlock operation under simulated fault
                conditions.
              </li>
              <li>Perform full-load transfer and retransfer, recording voltage transients.</li>
              <li>Verify load shedding sequence operates correctly on generator transfer.</li>
              <li>Test the bypass-isolation procedure if fitted.</li>
              <li>
                Record all commissioning data as the baseline for future maintenance comparisons.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'An ATS monitors the mains, detects failure, starts the generator and transfers the load automatically — the interlock preventing simultaneous closure of both contactors is its single most important safety feature.',
              'Open-transition (break-before-make) transfer gives a 100-500 ms interruption and needs no synchronisation; closed-transition (make-before-break) gives zero interruption but briefly parallels synchronised sources.',
              'The full automatic sequence runs from mains-failure detection through a 3-10 s time delay, generator start and run-up, transfer, to a 5-30 min retransfer delay and cooldown on mains return.',
              'Test monthly by simulating a mains failure and recording all timings and voltage/frequency readings; test a full-load transfer and the bypass-isolation facility at least annually.',
              'A bypass-isolation facility lets the ATS be isolated and maintained without interrupting the load — essential for critical installations.',
              'Three-pole vs four-pole switching depends on the earthing arrangement — a four-pole ATS switches the neutral to stop circulating currents where the generator has its own earth electrode.',
              'Systematic fault-finding starts with the generator output and control circuit before moving to the mechanical and electrical interlock — most ATS failures are control-circuit faults, not mechanical ones.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section5-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Emergency Generators
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section5-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Critical Load Management
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section5_4;
