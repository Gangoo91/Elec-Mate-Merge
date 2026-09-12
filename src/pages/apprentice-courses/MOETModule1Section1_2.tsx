/**
 * MOET · Module 1 · Section 1.1 · Subsection 2 — Isolation Procedures
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Electrical. Electrical isolation and deisolation
 *                 requirements: lockout tagout and testing for dead."
 *              · "Safe systems of work."
 *              · "Work environment hazards and risks. Risk assessments."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices."
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
  Prerequisites,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Isolation Procedures - MOET Module 1.1.2';
const DESCRIPTION =
  'Master safe isolation procedures for electrical engineering maintenance: the six-step process, GS38 proving units, BS 7671 requirements, and Electricity at Work Regulations 1989.';

const quickCheckQuestions = [
  {
    id: 'isolation-first-step',
    question: 'What is the FIRST step in the safe isolation procedure?',
    options: [
      'Apply your personal padlock to the isolator',
      'Identify the source of supply and switch off',
      'Prove the voltage indicator on a known live source',
      'Attach a danger notice to the distribution board',
    ],
    correctIndex: 1,
    explanation:
      'The first step is always to identify the correct source of supply and switch off the equipment or circuit. Attempting to isolate or lock off without first confirming you have the correct supply can lead to working on a live circuit.',
  },
  {
    id: 'gs38-requirement',
    question:
      'According to HSE Guidance Note GS38, what must you do with a voltage indicator BEFORE and AFTER testing for dead?',
    options: [
      'Check its calibration certificate is in date',
      'Prove it on a known live source or proving unit',
      'Confirm the leads are the correct GS38 colour',
      'Record its serial number on the permit',
    ],
    correctIndex: 1,
    explanation:
      'GS38 requires that you prove your voltage indicator works on a known live source (a proving unit) both before and after testing for dead. This confirms the instrument was working correctly at the time of the test — it could have failed between the two proving checks.',
  },
  {
    id: 'regulation-12-eawr',
    question:
      'Which regulation of the Electricity at Work Regulations 1989 makes dead working the default, allowing live work only in defined circumstances?',
    options: [
      'Regulation 12 — means for cutting off the supply and for isolation',
      'Regulation 14 — work on or near live conductors',
      'Regulation 13 — precautions for work on equipment made dead',
      'Regulation 16 — persons to be competent to prevent danger and injury',
    ],
    correctIndex: 1,
    explanation:
      'Regulation 14 is the one that bites: you may only work on or near a live conductor if it is unreasonable for it to be dead, reasonable for you to work on it live, AND suitable precautions are taken. All three. Regulation 12 is often misquoted here — it requires that suitable means of cutting off the supply and isolating equipment are available, not that equipment is made dead. Regulation 13 then covers keeping it dead once it is.',
  },
  {
    id: 'lock-off-purpose',
    question: 'What is the PRIMARY purpose of applying a personal safety lock to an isolator?',
    options: [
      'To identify which circuit has been isolated',
      'To prevent unauthorised re-energisation while work is being carried out',
      'To satisfy the requirements of a permit to work',
      'To indicate that the equipment has been proved dead',
    ],
    correctIndex: 1,
    explanation:
      'The personal safety lock prevents anyone from re-energising the supply while you are working on the circuit. Each person working on the isolated circuit should apply their own lock — the supply cannot be restored until every lock has been removed by its owner.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'How many people are fatally electrocuted in UK workplaces on average each year?',
    options: ['1-2 per year', 'Around 5 per year', 'Around 10-12 per year', 'Over 50 per year'],
    correctAnswer: 1,
    explanation:
      'HSE statistics show that approximately 5 workers are fatally electrocuted in UK workplaces each year, with many more suffering serious burns and injuries. Many of these deaths are entirely preventable through correct isolation procedures.',
  },
  {
    id: 2,
    question: 'Which of the following is an APPROVED voltage indicator according to GS38?',
    options: [
      'A digital multimeter set to the AC voltage range',
      'A mains-testing neon screwdriver',
      'A two-pole voltage indicator with GS38-compliant probes',
      'A non-contact voltage detector (volt stick)',
    ],
    correctAnswer: 2,
    explanation:
      'GS38 recommends two-pole voltage indicators (such as Fluke T-series or Martindale) with compliant probes. Multimeters, neon screwdrivers, and non-contact detectors are not suitable as the primary test instrument for proving dead — though non-contact detectors may be used as a supplementary check.',
  },
  {
    id: 3,
    question:
      'When isolating a three-phase supply, between which conductors must you test for dead?',
    options: [
      'Only between each line and neutral',
      'Only between each line and earth',
      'Only between the three lines (L1-L2, L2-L3, L1-L3)',
      'All phase-to-phase, all phase-to-neutral, and all phase-to-earth combinations',
    ],
    correctAnswer: 3,
    explanation:
      'For a three-phase supply you must test between ALL combinations: L1-L2, L2-L3, L1-L3 (phase-to-phase), L1-N, L2-N, L3-N (phase-to-neutral), and L1-E, L2-E, L3-E, N-E (phase/neutral-to-earth). This gives a total of 10 tests to confirm the circuit is fully dead.',
  },
  {
    id: 4,
    question: 'What does Regulation 14 of BS 7671:2018+A4:2026 specifically require?',
    options: [
      'Every installation shall be provided with means of switching off and isolation',
      'Every circuit shall be provided with overcurrent protection',
      'Every accessible conductive part shall be connected to earth',
      'Every final circuit shall be provided with additional RCD protection',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 14 (Chapter 13, Fundamental Principles) requires that every installation shall be provided with suitable means of switching off and isolation to prevent or remove dangers. This underpins the legal and technical requirement for effective isolation facilities.',
  },
  {
    id: 5,
    question: 'Why must GS38-compliant test probes have a maximum of 4 mm exposed metal tip?',
    options: [
      'To make the probe easier to insert into terminals',
      'To reduce the risk of arc flash and accidental short circuits',
      'To improve the accuracy of the voltage reading',
      'To comply with the IP rating of the enclosure',
    ],
    correctAnswer: 1,
    explanation:
      'The 4 mm maximum exposed tip reduces the risk of accidental contact with adjacent live conductors, which could cause short circuits and arc flash. GS38 also requires finger guards and fused leads for the same safety reasons.',
  },
  {
    id: 6,
    question:
      'A UPS (Uninterruptible Power Supply) system feeds a server room. What additional consideration applies when isolating this circuit?',
    options: [
      'Only the mains input needs isolating once the UPS is switched off',
      'The output will be dead the moment the mains supply is isolated',
      'The UPS batteries must also be isolated, as they provide an independent source of supply',
      'A single line-to-neutral test is sufficient to prove the circuit dead',
    ],
    correctAnswer: 2,
    explanation:
      "UPS systems contain batteries that provide power independently of the mains supply. Even if the mains input is isolated, the UPS output may remain live from battery power. Both the mains input AND the battery/DC bus must be isolated and proved dead, following the manufacturer's isolation procedure.",
  },
  {
    id: 7,
    question:
      'Under Regulation 13 of the Electricity at Work Regulations 1989, what precautions are required for work on dead equipment?',
    options: [
      'A danger notice must be displayed at the means of isolation',
      'A 30 mA RCD must be fitted to the circuit before work begins',
      'The circuit must be re-tested for insulation resistance every hour',
      'Adequate precautions must be taken to prevent it becoming live during the work',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 13 states that adequate precautions shall be taken to prevent conductors from becoming electrically charged during work. This means isolation, locking off, proving dead, and posting warning notices — the full safe isolation procedure.',
  },
  {
    id: 8,
    question: 'Who is legally permitted to carry out safe isolation of electrical circuits?',
    options: [
      'A competent person with appropriate training and experience',
      'Any employee who has been issued with a personal lock',
      'Only a person holding a current 18th Edition certificate',
      'Only the site electrical duty holder in person',
    ],
    correctAnswer: 0,
    explanation:
      'The Electricity at Work Regulations require that persons carrying out electrical work must be competent — possessing adequate training, knowledge, and experience for the task. This could be a qualified electrician or a trained maintenance technician; the key requirement is demonstrated competence for the specific task.',
  },
  {
    id: 9,
    question: 'After completing maintenance work, what is the correct re-energisation procedure?',
    options: [
      'Switch the supply back on first, then replace the covers afterwards',
      'Confirm all personnel are clear, remove personal locks, remove danger notices, replace covers, then re-energise',
      'Remove all locks together, then restore the supply immediately',
      'Leave the danger notices in place until the next working day',
    ],
    correctAnswer: 1,
    explanation:
      "Re-energisation must follow a controlled procedure: account for all personnel, ensure all are clear of the equipment, remove each person's individual lock, remove danger notices and caution tags, replace all covers and barriers, then re-energise in a controlled manner. Never re-energise with covers removed.",
  },
  {
    id: 10,
    question:
      'A maintenance technician tests for dead and gets a zero reading, but did NOT prove the voltage indicator beforehand. What should they do?',
    options: [
      'Accept the zero reading, as the circuit was switched off correctly',
      'Prove the indicator only after testing, which is sufficient on its own',
      'Prove the voltage indicator on a known live source, then re-test for dead, then prove the indicator again',
      'Switch to a non-contact detector to confirm the zero reading',
    ],
    correctAnswer: 2,
    explanation:
      'Without proving the indicator before testing, you cannot be certain the zero reading was genuine — the instrument may have been faulty. The full sequence must be followed: prove live, test for dead, prove live again. A zero reading from an unproven instrument provides no assurance of safety.',
  },
  {
    id: 11,
    question:
      'What is the minimum safe isolation requirement when working on a circuit fed from a standby generator as well as a mains supply?',
    options: [
      'Isolate the mains supply only, since the generator is on standby',
      'Isolate the generator only, as it is the secondary supply',
      'Rely on the automatic changeover switch to keep the circuit dead',
      'Isolate BOTH the mains supply and the generator supply, and prove dead at the point of work',
    ],
    correctAnswer: 3,
    explanation:
      'Where multiple sources of supply exist (mains and standby generator), ALL sources must be isolated. Leaving either source connected means the circuit could become live — particularly dangerous with automatic changeover switches that can energise without warning.',
  },
  {
    id: 12,
    question:
      'What information should be written on a danger notice attached to an isolated supply?',
    options: [
      'The name of the person who isolated it, the date, and what work is being carried out',
      'The maximum prospective fault current at that point',
      'The earth fault loop impedance measured at the isolator',
      'The rating and type of the upstream protective device',
    ],
    correctAnswer: 0,
    explanation:
      'Danger notices must include the name of the person who applied the isolation, the date and time, and a description of the work being carried out. This allows anyone finding the notice to identify who is responsible and contact them before any attempt to re-energise.',
  },
];

const faqs = [
  {
    question: 'Can I use a non-contact voltage detector (volt stick) to prove dead?',
    answer:
      'No. Non-contact voltage detectors are useful as a supplementary check but must never be relied upon as the sole means of proving dead. They can give false negatives (failing to detect voltage) due to shielded cables, low voltages, or battery failure. Always use a two-pole voltage indicator compliant with GS38, proven on a known live source before and after testing.',
  },
  {
    question: 'What if I cannot find a known live source to prove my voltage indicator?',
    answer:
      "Use a proprietary proving unit (such as a Martindale PD440 or Fluke PRV240). These battery-powered devices generate a known test voltage specifically for proving voltage indicators. They are compact, inexpensive, and should be part of every electrician's and maintenance technician's toolkit. Never skip the proving step.",
  },
  {
    question:
      'Do I need to carry out safe isolation for low voltage DC systems (e.g., 24V control circuits)?',
    answer:
      'Yes. The Electricity at Work Regulations apply to ALL electrical systems regardless of voltage. While the shock risk from 24V DC is low, there are still risks of burns from short circuits and arc flash, particularly where battery-backed systems can deliver high fault currents. Additionally, unexpected operation of control circuits can cause mechanical hazards. Always isolate and prove dead.',
  },
  {
    question: 'What happens if someone else removes my personal lock?',
    answer:
      "Only the person who fitted a personal lock should remove it. Cutting off or removing another person's lock without their explicit authority is a serious safety violation that could result in a fatality. If a lock cannot be removed (e.g., the person is absent), a formal senior management procedure must be followed, including confirming the system is safe, a documented risk assessment, and authorisation from a responsible person.",
  },
  {
    question: 'How does safe isolation differ between single-phase and three-phase supplies?',
    answer:
      'The procedure is the same, but the number of tests increases. For single-phase, you test between Line-Neutral, Line-Earth, and Neutral-Earth (3 tests). For three-phase, you test all phase-to-phase, phase-to-neutral, and phase/neutral-to-earth combinations — a total of 10 tests. The additional tests ensure no phase remains live due to a partial isolation or fault.',
  },
];

const MOETModule1Section1_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.1 · Subsection 2"
        title="Isolation Procedures"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            The critical six-step process for safe electrical isolation — preventing fatal contact
            with live conductors during maintenance work
          </p>

          <TLDR
            points={[
              '6 steps: Switch off, isolate, secure, lock off, test, prove dead',
              'GS38: Prove indicator live — test dead — prove indicator live again',
              'Personal lock: Only YOU remove YOUR lock',
              'Legal duty: Electricity at Work Regulations 1989, Regs 12 & 13',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Lock-out / tag-out (LOTO)',
                gist: 'Personal locks, multi-lock hasps and danger tags that physically stop an isolation being reversed while people are still working. Step 3 of the procedure below applies it; the next page covers how the system is managed.',
                where: '1.1.3',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain why safe isolation is critical and identify common causes of electrical fatalities',
              'Carry out the six-step safe isolation procedure from memory',
              'Select and use GS38-compliant voltage indicators and proving units correctly',
              'Apply safe isolation to single-phase, three-phase, and complex multi-source supplies',
              'State the legal requirements of EAWR 1989 Regulations 12 and 13, and BS 7671 Regulation 14',
              'Describe the correct re-energisation procedure and explain personal lock/tag responsibilities',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why safe isolation is critical</ContentEyebrow>

          <ConceptBlock title="Context — why this matters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>~5 deaths/year</strong> from workplace electrocution in the UK
              </li>
              <li>
                <strong>Most are preventable</strong> — failure to isolate is the leading cause
              </li>
              <li>
                <strong>ST1426 requirement:</strong> Core competency for electrical maintenance
                technicians
              </li>
              <li>
                <strong>Criminal liability:</strong> Employers and individuals can be prosecuted
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electricity kills quickly and without warning">
            <p>
              Electricity kills quickly and without warning. A current of just 50 milliamps (0.05A)
              flowing across the heart for one second is sufficient to cause ventricular
              fibrillation — cardiac arrest that is fatal without immediate defibrillation. At 230V,
              a contact resistance of just 4,600 ohms would allow this lethal current to flow. Damp
              skin, cuts, or abrasions can reduce body resistance to well below this threshold.
            </p>
            <p>
              HSE statistics consistently show that approximately 5 workers are fatally electrocuted
              in UK workplaces each year, with a further 20-30 suffering major injuries including
              severe burns. Analysis of these incidents reveals a recurring pattern: in the majority
              of fatal cases, the victim believed the circuit was dead — but had not followed the
              correct isolation procedure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common Causes of Electrical Fatalities">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
              <li>
                <strong>Wrong circuit isolated</strong> — Assumed the correct breaker without
                verifying at the point of work
              </li>
              <li>
                <strong>No test for dead</strong> — Relied on switching off alone without proving
                the circuit dead
              </li>
              <li>
                <strong>Faulty test instrument</strong> — Did not prove the voltage indicator before
                and after testing
              </li>
              <li>
                <strong>Unexpected back-feed</strong> — Failed to identify multiple sources of
                supply (generators, UPS, PV)
              </li>
              <li>
                <strong>Unauthorised re-energisation</strong> — No personal lock applied; another
                person switched the supply back on
              </li>
              <li>
                <strong>Stored energy</strong> — Capacitors or inductors retaining charge after
                isolation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Effects of Electric Current on the Human Body">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Current (mA)</th>
                    <th className="py-2 font-medium text-white">Effect</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">1 mA</td>
                    <td className="py-2">Threshold of perception — tingling sensation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">5 mA</td>
                    <td className="py-2">Pain — muscular contraction begins</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">10-15 mA</td>
                    <td className="py-2">
                      &quot;Let-go&quot; threshold — inability to release grip
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">30-50 mA</td>
                    <td className="py-2">Respiratory paralysis — breathing stops</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium text-red-400">50-100 mA</td>
                    <td className="py-2 font-medium text-red-400">
                      Ventricular fibrillation — usually fatal
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">&gt;1 A</td>
                    <td className="py-2">Severe burns, cardiac arrest</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Note: These values are approximate and vary with pathway through the body, duration,
              and individual physiology. A 30mA RCD operates at the threshold of fibrillation — this
              is why RCDs save lives but are not a substitute for safe isolation.
            </p>
            <p>
              The message is clear: safe isolation is not optional, not a shortcut to be skipped
              when under time pressure, and not something that can be assumed. It is a defined,
              systematic procedure that must be followed every single time, without exception. Your
              life depends on it.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The six-step procedure</ContentEyebrow>

          <ConceptBlock title="The Six-Step Safe Isolation Procedure">
            <p>
              The safe isolation procedure is a defined sequence of actions that, when followed
              correctly, ensures a circuit is dead and cannot be re-energised while work is in
              progress. The procedure is mandated by the Electricity at Work Regulations 1989 and
              described in detail in HSE Guidance Note GS38 and the IET Code of Practice for
              In-Service Inspection and Testing.
            </p>
            <ul className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify the Circuit and Switch Off.</strong> Identify the correct source of
                supply using circuit charts, distribution board schedules, and cable identification.
                Switch off the equipment or circuit using the functional switch (e.g., the local
                isolator, MCB, or switch-disconnector). Never rely on circuit charts alone — always
                verify at the point of work.
              </li>
              <li>
                <strong>Isolate.</strong> Operate the means of isolation — this must be a device
                that provides a physical break in the circuit, such as a switch-disconnector,
                isolator, or MCB. The isolating device must comply with BS 7671 Section 537. Note:
                an MCB is acceptable as an isolator for maintenance purposes; a contactor is NOT —
                it can be re-energised by its control circuit.
              </li>
              <li>
                <strong>Secure the Isolation.</strong> Apply a personal safety lock to the isolating
                device. Use a lock with a unique key that only you hold. Where multiple people are
                working on the same circuit, each person must apply their own lock using a
                multi-lock hasp. Attach a danger notice stating your name, the date, and the work
                being carried out.
              </li>
              <li>
                <strong>Prove the Voltage Indicator.</strong> Before testing for dead, prove that
                your voltage indicator is working correctly. Test it on a known live source or a
                proprietary proving unit (e.g., Martindale PD440, Fluke PRV240). The indicator must
                show the correct voltage. If it does not, the instrument is faulty — do not use it.
              </li>
              <li>
                <strong>Test for Dead at the Point of Work.</strong> Using the proven voltage
                indicator, test between all conductors at the point of work. For single-phase: L-N,
                L-E, N-E (3 tests). For three-phase: all L-L, all L-N, all L-E, and N-E combinations
                (10 tests). The indicator must show zero on all tests. Any voltage reading means the
                circuit is NOT dead — stop and re-investigate.
              </li>
              <li>
                <strong>Prove the Voltage Indicator Again.</strong> Immediately after confirming
                zero readings, re-prove your voltage indicator on the same known live source or
                proving unit. If it now fails to show voltage, the zero readings at the point of
                work cannot be trusted — the instrument may have failed during the test. You must
                obtain a working instrument and repeat the entire process.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Critical Principle">
            <p>
              The sequence <strong>&quot;Prove — Test — Prove&quot;</strong> is the cornerstone of
              safe isolation. Without both proving checks, a dead reading is meaningless — your
              instrument may be faulty. This three-step verification is what separates a safe
              isolation from a dangerous assumption.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Test instruments and GS38</ContentEyebrow>

          <ConceptBlock title="GS38 Voltage Indicators and Proving Units">
            <p>
              HSE Guidance Note GS38 (Electrical Test Equipment for Use on Low Voltage Electrical
              Systems) sets out the requirements for test instruments used to verify that circuits
              are dead. It was originally published in response to fatalities caused by inadequate
              or faulty test equipment and remains a cornerstone of electrical safety guidance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Approved vs Non-Approved Devices">
            <p>
              <strong>Approved for Proving Dead</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-green-400/70">
              <li>
                <strong>Two-pole voltage indicators</strong> — e.g., Fluke T150, Martindale VT28
              </li>
              <li>
                <strong>GS38-compliant probes</strong> — max 4 mm exposed tip, finger guards, fused
                leads
              </li>
              <li>
                <strong>Proprietary proving units</strong> — PD440, PRV240
              </li>
            </ul>
            <p>
              <strong>NOT Approved for Proving Dead</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-red-400/70">
              <li>
                <strong>Multimeters</strong> — Can give false readings; wrong range selected
              </li>
              <li>
                <strong>Neon screwdrivers</strong> — Unreliable; can miss voltages
              </li>
              <li>
                <strong>Non-contact detectors</strong> — Supplementary use only
              </li>
              <li>
                <strong>DIY test lamps</strong> — No finger guards; can shatter
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="GS38 Probe Requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Exposed tip:</strong> Maximum 4 mm of exposed metal — prevents accidental
                bridging of live parts
              </li>
              <li>
                <strong>Finger guards:</strong> Built-in barriers to prevent fingers slipping onto
                the probe tip
              </li>
              <li>
                <strong>Fused leads:</strong> Each lead fused (typically 500mA HRC fuse) to limit
                current in case of a fault
              </li>
              <li>
                <strong>Insulation:</strong> Leads must be insulated, flexible, and in good
                condition — no cracked or taped insulation
              </li>
              <li>
                <strong>Colour coding:</strong> Distinctly coloured leads for easy identification
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Proving Units — How They Work"
            onSite={
              <>
                <strong>Maintenance technician tip:</strong> Always carry a proving unit in your
                tool bag. It is small, inexpensive, and could save your life. Never rely on finding
                a convenient known live source — a dedicated proving unit is always available and
                always at the correct voltage.
              </>
            }
          >
            <p>
              A proving unit generates a known voltage (typically 50V, 100V, 230V, or 400V AC/DC
              selections) from internal batteries. You connect your voltage indicator to the proving
              unit and confirm it reads the expected voltage. This proves the indicator is
              functioning correctly.
            </p>
            <p>
              <strong>Proving Sequence:</strong>
            </p>
            <ul className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Connect voltage indicator to proving unit</li>
              <li>Select appropriate voltage on proving unit (match expected supply voltage)</li>
              <li>Confirm indicator shows correct reading → Instrument proven</li>
              <li>Test for dead at the point of work</li>
              <li>Re-connect indicator to proving unit</li>
              <li>Confirm indicator still shows correct reading → Test result confirmed</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Isolating different supply types</ContentEyebrow>

          <ConceptBlock title="Single-Phase Isolation (230V AC)">
            <p>
              The most common isolation scenario for maintenance technicians. Applies to lighting
              circuits, socket outlets, single-phase motors, and fixed equipment.
            </p>
            <p>
              <strong>Tests Required (3 minimum):</strong>
            </p>
            <ul className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Line to Neutral (L-N)</li>
              <li>Line to Earth (L-E)</li>
              <li>Neutral to Earth (N-E)</li>
            </ul>
            <p>
              The N-E test is essential — a fault condition could make the neutral live even when
              the line conductor has been correctly isolated.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Three-Phase Isolation (400V AC)">
            <p>
              Used for three-phase motors, distribution boards, commercial equipment, and industrial
              plant. The increased number of conductors means more test combinations are required.
            </p>
            <p>
              <strong>Tests Required (10 minimum):</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Phase-to-Phase (3 tests): L1-L2, L2-L3, L1-L3</li>
              <li>Phase-to-Neutral (3 tests): L1-N, L2-N, L3-N</li>
              <li>Phase-to-Earth (3 tests): L1-E, L2-E, L3-E</li>
              <li>Neutral-to-Earth (1 test): N-E</li>
            </ul>
            <p>
              Missing even one test could leave a live conductor undetected. A partial isolation
              (one phase still live) will deliver 230V — enough to kill.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Complex Systems: Multiple Sources of Supply">
            <p>
              Modern installations increasingly feature multiple sources of supply. Each must be
              independently identified, isolated, and proved dead. Failure to account for any single
              source can be fatal.
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-orange-300/70">
              <li>
                <strong>UPS Systems.</strong> UPS batteries provide power independently of the
                mains. Isolate the mains input AND the UPS output/battery disconnect. Follow the
                manufacturer&apos;s specific isolation procedure. Allow time for capacitive
                discharge — large UPS systems can hold lethal charge for several minutes.
              </li>
              <li>
                <strong>Standby Generators.</strong> Automatic transfer switches (ATS) can energise
                circuits without warning when mains power is lost. Isolate BOTH the mains supply and
                the generator output. Disable the ATS auto-start function and lock off. Be aware of
                manual bypass switches.
              </li>
              <li>
                <strong>Photovoltaic (Solar PV) Systems.</strong> PV panels generate DC voltage
                whenever exposed to light — they cannot be switched off. Isolate the DC isolator and
                the AC isolator at the inverter. DC side conductors remain live in daylight. Work
                must account for this permanent energy source.
              </li>
              <li>
                <strong>Capacitive Discharge.</strong> Large capacitor banks (e.g., power factor
                correction units, variable speed drives, UPS DC buses) retain charge after
                isolation. Wait the specified discharge time before testing for dead. Some systems
                require manual discharge through rated resistors. Never assume capacitors are
                discharged — always test.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Legal framework</ContentEyebrow>

          <ConceptBlock title="Legal Framework and Regulations">
            <p>
              Safe isolation is not merely good practice — it is a legal requirement. Failure to
              comply carries criminal penalties for both employers and individuals, including
              unlimited fines and imprisonment. The key legislation and standards are outlined
              below.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Electricity at Work Regulations 1989 (EAWR)">
            <p>
              <strong>Regulation 14 — Work on or near live conductors.</strong>{' '}
              <em>
                &quot;No person shall be engaged in any work activity on or so near any live
                conductor (other than one suitably covered with insulating material so as to prevent
                danger) that danger may arise unless (a) it is unreasonable in all the circumstances
                for it to be dead; and (b) it is reasonable in all the circumstances for him to be
                at work on or near it while it is live; and (c) suitable precautions (including
                where necessary the provision of suitable protective equipment) are taken to prevent
                injury.&quot;
              </em>{' '}
              This is the regulation that makes dead working the default. Live work is only
              permitted when all three conditions are met — it being genuinely unreasonable for the
              conductor to be dead, not merely inconvenient. Regulation 12 is a different duty: it
              requires that suitable <em>means</em> of cutting off the supply and isolating
              equipment are available in the first place.
            </p>
            <p>
              <strong>Regulation 13 — Precautions for Working on Dead Equipment.</strong>{' '}
              <em>
                &quot;Adequate precautions shall be taken to prevent conductors from becoming
                electrically charged during work where danger would thereby arise.&quot;
              </em>{' '}
              Even after a circuit is made dead, precautions (locking off, danger notices, proving
              dead) must be maintained throughout the work. This regulation makes the full safe
              isolation procedure a legal requirement, not a recommendation.
            </p>
            <p>
              <strong>Regulation 16 — Competence.</strong>{' '}
              <em>
                &quot;No person shall be engaged in any work activity where technical knowledge or
                experience is necessary to prevent danger or injury, unless they possess such
                knowledge or experience, or are under appropriate supervision.&quot;
              </em>{' '}
              Only competent persons may carry out safe isolation. Competence means having the
              combination of training, knowledge, and experience appropriate for the specific task.
            </p>
          </ConceptBlock>

          <ConceptBlock title="BS 7671:2018+A4:2026 — IET Wiring Regulations">
            <p>
              <strong>Regulation 14 (Chapter 13 — Fundamental Principles).</strong> Requires that
              every installation shall be provided with suitable means of switching off for
              mechanical maintenance and for emergency switching, as well as means of isolation to
              prevent or remove dangers.
            </p>
            <p>
              Section 537 of BS 7671 details the technical requirements for isolating and switching
              devices, including that isolators must be capable of being secured in the open
              position to prevent inadvertent re-closure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="HSE Guidance Note GS38">
            <p>
              Sets out requirements for electrical test equipment used by electricians and
              maintenance technicians on low voltage systems. Covers voltage indicators, test lamps,
              and test probes. While guidance (not law), failure to follow GS38 would be used as
              evidence of negligence in any prosecution following an incident.
            </p>
          </ConceptBlock>

          <ConceptBlock title="ST1426 Occupational Standard">
            <p>
              The Level 3 Electrical Engineering Maintenance Technician apprenticeship standard
              (ST1426) lists safe isolation as a core competency. You must be able to demonstrate
              that you can carry out the full safe isolation procedure independently, safely, and
              consistently. This is assessed during your End-Point Assessment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Locks, tags and re-energisation</ContentEyebrow>

          <ConceptBlock title="Locks, Tags, and Re-Energisation">
            <p>
              Locking off and tagging are the physical measures that prevent unauthorised
              re-energisation. They are the visible, tangible confirmation that someone&apos;s life
              depends on the supply remaining isolated. These measures must remain in place for the
              entire duration of the work.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Personal Safety Locks">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unique key:</strong> Each lock must have a unique key held only by the
                person who applied it
              </li>
              <li>
                <strong>Personal identification:</strong> The lock should be identifiable to its
                owner (name, number, colour coding)
              </li>
              <li>
                <strong>Multi-lock hasps:</strong> Where multiple people work on the same circuit,
                each applies their own lock to a hasp — the isolator cannot be operated until ALL
                locks are removed
              </li>
              <li>
                <strong>Never share keys:</strong> If you hand your key to someone else, you have
                lost control of your isolation
              </li>
              <li>
                <strong>Never leave site without removing:</strong> If you leave, remove your lock
                and re-isolate when you return
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Danger Notices and Caution Tags">
            <p>
              <strong>Danger Notices.</strong> Applied at the point of isolation. Must state:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-red-400/70">
              <li>Name of the person who isolated</li>
              <li>Date and time of isolation</li>
              <li>Description of work being carried out</li>
              <li>&quot;DANGER — DO NOT SWITCH ON&quot;</li>
            </ul>
            <p>
              <strong>Caution Notices.</strong> Applied at the point of work. Must state:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
              <li>&quot;CAUTION — WORK IN PROGRESS&quot;</li>
              <li>Description of the work</li>
              <li>Contact details of responsible person</li>
              <li>Used alongside, not instead of, danger notices</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Re-Energisation Procedure">
            <p>
              Re-energisation is just as important as isolation. A controlled, systematic process
              prevents accidents during the return to service.
            </p>
            <p>
              <strong>Step-by-Step Re-Energisation:</strong>
            </p>
            <ul className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Confirm work complete</strong> — All maintenance tasks finished and signed
                off
              </li>
              <li>
                <strong>Replace covers and barriers</strong> — All enclosures, guards, and safety
                barriers reinstated
              </li>
              <li>
                <strong>Account for all personnel</strong> — Confirm everyone is clear of the
                equipment
              </li>
              <li>
                <strong>Remove tools and materials</strong> — No foreign objects left inside
                equipment
              </li>
              <li>
                <strong>Remove caution notices</strong> — From the point of work
              </li>
              <li>
                <strong>Remove personal locks</strong> — Each person removes only their own lock
              </li>
              <li>
                <strong>Remove danger notices</strong> — From the point of isolation
              </li>
              <li>
                <strong>Re-energise in a controlled manner</strong> — Stand to one side; do not
                stand directly in front of the panel
              </li>
              <li>
                <strong>Verify correct operation</strong> — Confirm the equipment is operating
                normally
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Common mistakes and near-miss scenarios</ContentEyebrow>

          <CommonMistake
            title="Isolating the wrong circuit"
            whatHappens={
              <>
                A technician opens an MCB labelled &quot;Socket Ring — First Floor&quot; but the
                circuit chart is outdated. The actual circuit feeding the socket is on a different
                breaker. The technician tests for dead at the point of work — finds it live — and
                avoids electrocution only because they followed the correct procedure.
              </>
            }
            doInstead={<>Lesson: Always test for dead at the point of work.</>}
          />

          <CommonMistake
            title="Skipping the second prove"
            whatHappens={
              <>
                An engineer tests for dead with a voltage indicator that shows zero. Satisfied, they
                begin work. Unknown to them, the indicator&apos;s battery failed during the test —
                the circuit was actually live.
              </>
            }
            doInstead={<>Lesson: Always prove the indicator after testing.</>}
          />

          <CommonMistake
            title="No lock applied"
            whatHappens={
              <>
                A fitter isolates a motor but does not apply a lock because they will &quot;only be
                five minutes.&quot; A process operator, unaware of the work, re-energises the motor.
                The fitter&apos;s hand is drawn into the rotating machinery.
              </>
            }
            doInstead={<>Lesson: Always lock off, regardless of the expected duration.</>}
          />

          <CommonMistake
            title="Forgetting the UPS"
            whatHappens={
              <>
                An IT technician isolates the mains supply to a server room distribution board. The
                UPS continues to supply the board from its batteries. The technician contacts a live
                busbar.
              </>
            }
            doInstead={<>Lesson: Always identify ALL sources of supply, including stored energy.</>}
          />

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=ZXGqgsbv6oQ"

            title="Safe Isolation — Why?"

            channel="A121 Training"

            duration="19:29"

            topic="Why the procedure is the length it is, step by step"

            caption="Goes past the sequence into the reasoning behind each step — which is what stops it becoming a ritual you rush."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Safe isolation — 6 steps: identify supply and switch off; isolate (physical break in circuit); secure with personal lock + danger notice; prove voltage indicator on known live; test for dead at point of work; re-prove voltage indicator on known live.',
              'Key legislation: EAWR 1989, Reg 12 — work dead where practicable; EAWR 1989, Reg 13 — prevent becoming live; EAWR 1989, Reg 16 — competent persons.',
              'BS 7671:2018+A4:2026, Reg 14 — isolation means. HSE GS38 — test equipment requirements.',
              'Tests for dead: single-phase 3 tests (L-N, L-E, N-E); three-phase 10 tests (all combinations). Always at the POINT OF WORK.',
              'GS38 probe requirements: max 4 mm exposed metal tip; finger guards on probes; fused leads (500mA HRC); insulated, in good condition.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Safe isolation knowledge check" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section1-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Permit to Work Systems
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section1-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Lock-Out / Tag-Out
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section1_2;
