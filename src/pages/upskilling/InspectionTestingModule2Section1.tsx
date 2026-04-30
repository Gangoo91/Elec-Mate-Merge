import { ArrowLeft, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  VideoCard,
  SectionRule,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 14 of the Electricity at Work Regulations 1989 sets the legal default for working on or near live conductors. What does it actually say?',
    options: [
      'Live work is prohibited in all circumstances',
      'Live work is only permitted if (a) it is unreasonable for the conductor to be dead, (b) it is reasonable for the work to be carried out, and (c) suitable precautions are taken',
      'Live work is allowed on any installation under 230 V',
      'Live work is allowed if the operative holds a current 18th Edition certificate',
    ],
    correctAnswer: 1,
    explanation:
      'EaWR 1989 reg 14 is a three-limbed test, all three limbs must be satisfied. GN3 Reg 10.1 quotes it verbatim: live work is permissible only where it is unreasonable for the conductor to be dead, reasonable for the work to be done, and suitable precautions are taken. "I needed to test it" is not a defence on its own — proving dead is dead working, fault-finding may be live, but the subsequent repair is dead.',
  },
  {
    id: 2,
    question:
      'Reg 462.1 in BS 7671:2018+A4:2026 sets the design-side duty for isolation. What does it require?',
    options: [
      'Every socket-outlet shall be RCD protected',
      'Each electrical installation shall have provisions for isolation from each supply',
      'Every circuit shall have an emergency stop',
      'Every isolator shall be lockable in the open position by tool only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 462.1 reads literally: "Each electrical installation shall have provisions for isolation from each supply." It is the gateway design duty. Reg 462.2 then requires isolation means for every circuit, and Reg 462.3 requires those devices to be designed or installed so as to prevent unintentional or inadvertent closure.',
  },
  {
    id: 3,
    question:
      'A skilled person walks up to a board, opens an MCB, and says "right, I have isolated it". Why is this not safe isolation?',
    options: [
      'It is — opening the MCB removes the supply',
      'Because you have not yet proven dead at the point of work, and an MCB handle position does not, on its own, prove the contacts opened. The duty under EaWR sits on the operative, not the device',
      'Because RCDs latch closed under fault',
      'Because the MCB might be a Type B',
    ],
    correctAnswer: 1,
    explanation:
      'Operating the device gets you to "isolated, possibly". The duty is "isolated, locked off, and proven dead at the point of work". The device handle does not prove pole separation, and an MCB can weld closed under fault and yet read open at the handle. GN3 Reg 1.1 and Reg 10.1 are clear: the safety of the test operative is the operative\'s duty.',
  },
  {
    id: 4,
    question:
      'Reg 537.2.2 places a hard restriction on what can be used as an isolating device. What is it?',
    options: [
      'Plugs and sockets cannot be used as isolation',
      'Semiconductor devices shall not be used as isolating devices',
      'Single-pole switches cannot be used in TN-S systems',
      'RCDs cannot be used as isolation',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 537.2.2 is one sentence: "Semiconductor devices shall not be used as isolating devices." The reason is that a semiconductor switch may interrupt the current without opening the corresponding poles (Reg 537.3.1.3) — pole separation is what gives you the visible electrical break that isolation requires.',
  },
  {
    id: 5,
    question:
      'You are about to isolate a final circuit fed from a TN-C-S consumer unit. Why does Reg 411.4.3 mean you must not put any switch or isolation device in the PEN conductor itself?',
    options: [
      'PEN conductors are too small to break load',
      'Switching the PEN at the consumer unit can leave exposed metalwork connected to load current via the neutral path — a shock risk. Isolation must be effected on the separated N and protective conductors downstream of the PEN, or by approved means upstream',
      'Because PEN conductors are colour-coded yellow',
      'Because the distributor owns the PEN',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 prohibits switching or isolating devices in a PEN conductor. The combined neutral-and-protective function means breaking it can leave equipment cases connected to a floating neutral that is also acting as the protective return — touch voltage on metalwork during a fault. Isolation must be effected on the separated neutral and protective conductors downstream of the PEN/PNB break, or by approved isolation points elsewhere.',
  },
  {
    id: 6,
    question:
      'In the JIB nine-step safe isolation procedure, what is the very first step before any device is operated?',
    options: [
      'Open the main switch',
      'Identify the correct point of isolation and confirm the circuit, then check your voltage indicator and proving unit are functional and undamaged',
      'Lock off the board',
      'Notify the duty holder',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 Reg 10.1 (d) requires "checking before each use that all leads, probes, accessories ... and instruments including the proving unit are clean, undamaged and functioning". You verify the right point of isolation and confirm the kit works on a known live source before you trust it to tell you the conductor is dead. Skipping this is how operatives die — a faulty voltage indicator that reads low on a live conductor.',
  },
  {
    id: 7,
    question:
      'You have isolated, locked off, and now need to prove dead at a three-phase distribution board. How many measurements does GS38 / good practice require?',
    options: [
      'One — line to earth on the nearest phase',
      'Three — L1-L2, L2-L3, L1-L3',
      'Ten — every line to every other line, every line to neutral, every line to earth, neutral to earth (a full L-L, L-N, L-E, N-E set)',
      'Two — one phase to neutral and one phase to earth',
    ],
    correctAnswer: 2,
    explanation:
      'A three-phase prove-dead is the full set: L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E and N-E. Anything less can leave a live conductor undetected — for example, a borrowed neutral would not show on an L-N test alone. The proving unit (or known live source) is then re-applied to confirm the indicator still works. Prove–test–prove.',
  },
  {
    id: 8,
    question:
      'Why is "prove the indicator on a known live source, test the conductor dead, then prove the indicator again on the known live source" the rule, not just "test the conductor"?',
    options: [
      'It satisfies a recordkeeping requirement only',
      'A faulty voltage indicator can read zero on a genuinely live conductor (battery flat, internal break, blown protection). The two proving steps either side bracket your dead reading and confirm the instrument was working immediately before and immediately after the test. Without them, "0 V" means nothing',
      "It's required by the EICR schedule",
      'Because GS38 mandates two-stage testing for record purposes',
    ],
    correctAnswer: 1,
    explanation:
      'A "0 V" reading from a faulty instrument and a "0 V" reading from a dead conductor are visually identical. The before-and-after proving on a known live source — typically a dedicated proving unit, never a nearby socket — turns the dead reading into evidence. This is the single rule that prevents most safe-isolation fatalities.',
  },
  {
    id: 9,
    question:
      'A maintenance electrician opens an MCB, padlocks it, hangs a tag, and walks off to fetch tools. Another operative arrives, removes the tag because it is "in the way", and begins work. Where does the duty under EaWR sit?',
    options: [
      'Only on the original electrician — they should have stayed at the board',
      'Only on the duty holder — they should have written a permit',
      'On the person doing the work at that moment. EaWR places the duty for "suitable precautions" on the operative carrying out the work. The locked-off device is a control measure; it is the operative who must verify isolation is intact and prove dead at the point of work before touching anything',
      'On the manufacturer of the lock',
    ],
    correctAnswer: 2,
    explanation:
      "GN3 Reg 1.1 and Reg 10.1 are unambiguous: it is the test operative's duty to ensure their own safety and that of others. Lock-off is a control, not a transfer of duty. The new arrival inherits the same legal obligation: verify isolation, prove dead at the point of work, then proceed. Removing someone else's tag without process is a procedural failure and a criminal offence under EaWR reg 14.",
  },
  {
    id: 10,
    question:
      'On a TT installation, Reg 462.2 read with the system requirements for TT means the means of isolation must do what?',
    options: [
      'Disconnect line conductor only',
      'Disconnect line and earth',
      'Disconnect all live conductors — line(s) and neutral — because in TT (and IT) the neutral may be at a hazardous voltage relative to the local earth electrode',
      'Disconnect the earth electrode',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Reg 537.3.3 and the system-specific guidance flag this directly: in a TT or IT system, isolation requires disconnection of all the live conductors. The neutral is a live conductor. A single-pole isolator that breaks line only is not an isolation means on a TT supply — the neutral can sit at line-to-earth voltage during a fault. Multipole switching is the rule.',
  },
];

const inlineChecks = [
  {
    id: 'mod2-s1-eawr-three-limb',
    question:
      'A site agent insists you fault-find live on a 230 V control circuit and then "just splice the broken wire while you are in there". You hold a current 18th Edition. Where does EaWR reg 14 land?',
    options: [
      'The whole job is fine — live testing is permissible and the splice is trivial.',
      'Live fault-finding can be justified under reg 14 because it is unreasonable for the conductor to be dead during diagnosis. The splice that follows is repair work and must be done dead — GN3 Reg 10.1 is explicit that there is no justification for subsequent live repair.',
      'Refuse the entire activity — fault-finding under reg 14 is never permissible on 230 V circuits.',
      'Proceed with both, provided you wear arc-rated gloves.',
    ],
    correctIndex: 1,
    explanation:
      'EaWR reg 14 is the three-limbed test. Live diagnosis is one of the recognised exceptions because it is unreasonable for the conductor to be dead while you are searching for the fault. The repair is not — there is no reason it cannot be done dead, so live repair fails limb (a) and you are exposed under reg 14 + reg 4.',
  },
  {
    id: 'mod2-s1-semiconductor-isolation',
    question:
      'A panel uses a solid-state contactor to switch a 16 A heating circuit. The OEM label says "may be used as functional switching and emergency switching". Can you treat it as the means of isolation while you replace the heating element?',
    options: [
      'Yes — the OEM label allows it.',
      'Yes, provided you also pull the upstream MCB.',
      'No. Reg 537.2.2 prohibits semiconductor devices as isolating devices, full stop. The OEM label says functional / emergency switching, not isolation. Isolate at an upstream switch-disconnector or an MCB lock-off, then prove dead.',
      'Only if the contactor has a hand-operated override.',
    ],
    correctIndex: 2,
    explanation:
      'Reg 537.2.2 is one sentence and admits no exceptions. The reasoning sits in Reg 537.3.1.3 — a semiconductor may interrupt the current without separating the poles, which destroys the visible electrical break that isolation depends on. The OEM tagging functional / emergency switching is consistent with the reg; it does not extend to isolation.',
  },
  {
    id: 'mod2-s1-three-phase-prove',
    question:
      'You have isolated a three-phase distribution board and tested L1-N, L2-N, L3-N — all read 0 V. You declare the board dead. What have you missed and why does it matter?',
    options: [
      'Nothing — three line-to-neutral tests are the recognised three-phase prove-dead.',
      'You are missing L-L (×3), L-E (×3) and N-E. A borrowed neutral can mask a live line on an L-N test, and a floating neutral can sit at hazardous voltage to earth without showing on any L-N reading.',
      'You should have tested L-N four times for redundancy.',
      'You should have tested at the origin of supply, not the board.',
    ],
    correctIndex: 1,
    explanation:
      'The full three-phase prove-dead is ten combinations: L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E. Each combination excludes a specific failure mode. Three L-N tests alone leaves borrowed-neutral and floating-neutral cases undetected — and those are the cases that kill people on three-phase boards.',
  },
  {
    id: 'mod2-s1-loto-multi-hasp',
    question:
      'Your colleague has padlocked the main switch on a job you are about to add work to. They are on a fifteen-minute break. The single hasp is occupied by their lock. What do you do?',
    options: [
      'Cut their lock off — they will understand.',
      'Wait for them to come back, then ask them to unlock and re-lock with both your locks together.',
      'Apply a multi-hasp (lockable bar with multiple holes) so both locks sit on the same hasp independently. You add yours, prove dead at your point of work, begin. They remove theirs when their work is done; the circuit stays isolated until the last lock is off.',
      'Use their lock as the lock-off — one lock per circuit is the rule.',
    ],
    correctIndex: 2,
    explanation:
      'Lock-off-tag-out (LOTO) discipline keeps personal accountability per operative. The multi-hasp lets each operative apply and remove their own lock independently. Removing someone else’s lock breaks the chain of accountability and is a procedural failure — and a criminal offence under EaWR reg 14 if it leads to an incident.',
  },
];

const InspectionTestingModule2Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Principles of safe isolation | I&T Module 2.1 | Elec-Mate',
    description:
      'EaWR 1989 reg 13 / 14 / 16, BS 7671 Reg 462 and Reg 537.2, HSE GS38 and the JIB nine-step procedure. The legal and technical basis for isolating a circuit and proving it dead.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1"
            title="Principles of safe isolation"
            description="The legal duty under EaWR 1989, the BS 7671 design duty under Reg 462 / Reg 537, and the JIB nine-step procedure that turns those duties into a defensible system of work."
            tone="yellow"
          />

          <TLDR
            points={[
              'EaWR 1989 reg 14 is the legal default: live work is only permitted where (a) it is unreasonable for the conductor to be dead, (b) it is reasonable for the work to be done, and (c) suitable precautions are taken. Repair work is never one of the exceptions.',
              'BS 7671 Reg 462.1 puts the design duty in plain words: "Each electrical installation shall have provisions for isolation from each supply." Reg 462.2 extends this to every circuit, and Reg 462.3 requires devices to be designed or installed against unintentional closure.',
              'Reg 537.2.2 hard-prohibits semiconductor devices as isolating devices — pole separation is the point. Reg 537.2.1 ties acceptable devices to Table 537.4 or to a product standard that explicitly recognises the isolation function.',
              'The duty to prove dead at the point of work sits on the person doing the work, not the duty holder and not the lock. GN3 Reg 1.1 and Reg 10.1 are unambiguous on this. A locked-off device is a control measure — it is not, and cannot be, a substitute for proving dead at the point of work.',
              'Prove–test–prove. On a known live source first, on the conductor under test second, and on the same known live source third. A faulty indicator reads zero on a live conductor; the bracketing proves the indicator was functional either side of the dead reading.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the EaWR 1989 reg 14 three-limbed test and explain why fault-finding may be live but repair is not',
              'Quote Reg 462.1, 462.2 and 462.3 and explain the design-side obligations they impose',
              'Identify devices that are and are not acceptable for isolation under Reg 537.2 and Table 537.4, and explain why semiconductor devices fail the test',
              'Walk through the JIB nine-step safe isolation procedure and explain the legal and procedural rationale for each step',
              'Carry out a full prove-test-prove sequence on single-phase and three-phase systems, including the full set of measurements at a three-phase board',
              'Explain where the legal duty for safe isolation actually sits, and why a locked-off device is a control measure not a transfer of duty',
            ]}
          />

          <ContentEyebrow>What the law actually says</ContentEyebrow>

          <ConceptBlock
            title="EaWR 1989 — reg 4, 13, 14 and 16, in plain English"
            plainEnglish="The Electricity at Work Regulations 1989 are the criminal-law backbone for everything that follows. Reg 4 sets the general duty to prevent danger; reg 13 requires precautions for work on equipment made dead; reg 14 governs work on live conductors; reg 16 requires the work to be done by, or supervised by, a competent person."
            onSite="The expectation in a court or tribunal is that you can recite the four regulations from memory and explain how your method statement satisfies each one. The HSE will not accept &lsquo;I assumed it was dead&rsquo;."
          >
            <p>
              Reg 4 is the umbrella: all systems shall be of such construction, maintained and used
              so as to prevent danger so far as is reasonably practicable. Reg 13 is the duty when
              working on equipment that has been made dead — adequate precautions must be taken to
              prevent that equipment from becoming electrically charged during the work. Reg 14 is
              the live-work test, and is the one prosecutors lean on after a serious incident: live
              work is only permissible where it is unreasonable for the conductor to be dead,
              reasonable for the work to be done, and suitable precautions are taken. All three
              limbs must be satisfied — &ldquo;it&apos;s only a quick test&rdquo; is not a defence.
            </p>
            <p>
              Reg 16 sets the competence floor: no person shall be engaged in any work activity
              where technical knowledge or experience is necessary to prevent danger or injury,
              unless they possess such knowledge or experience, or they are under such degree of
              supervision as may be appropriate having regard to the nature of the work. In
              practice, that is the inspector / electrician with a current 2391 (or equivalent)
              qualification, an 18th Edition certificate to BS 7671, and either direct experience or
              proper supervision for the specific installation type in front of them.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 Reg 10.1 · Safety and equipment (quoting EaWR 1989)"
            clause={
              <>
                Electrical testing involves danger. The Electricity at Work Regulations 1989 state
                that working on a live conductors is permissible provided that: (a) it is
                unreasonable in all the circumstances for it to be dead; (b) it is reasonable in all
                the circumstances for the work to be carried out; and (c) suitable precautions are
                taken to prevent injury. Live testing of electrical installations is, therefore,
                reasonable as it is a recognized method of assessing the suitability and safety of
                an electrical installation. However, suitable precautions must be taken including
                employing the correct test equipment and suitable personal protective equipment.
                Although live testing and diagnosis for fault finding may be justifiable, there
                could be no justification for any subsequent repair work to be carried out live.
              </>
            }
            meaning="Three points worth highlighting: (1) live testing is allowed because the precautions are spelt out in GS38 and BS EN 61010 / 61557; (2) live fault-finding can be justified, but the repair that follows it cannot; (3) the duty to take &lsquo;suitable precautions&rsquo; sits on the operative — that is the legal anchor for the prove-dead procedure."
          />

          <ConceptBlock
            title="BS 7671 Reg 462 — provisions for isolation"
            plainEnglish="Reg 462 is the design-side duty. The installation must be capable of being isolated from each supply (Reg 462.1), every circuit must have isolation means for all live conductors (Reg 462.2), and those devices must be designed or installed so they cannot be closed unintentionally (Reg 462.3)."
            onSite="Read 462 alongside 537. 462 says &lsquo;there must be a means of isolation&rsquo;. 537 says &lsquo;here are the requirements that means must satisfy&rsquo;. Both bite. A board that meets 462 in principle but uses an unsuitable device fails 537 — and therefore fails 462."
          >
            <p>
              The wording matters. Reg 462.1 reads simply: &ldquo;Each electrical installation shall
              have provisions for isolation from each supply.&rdquo; The phrase &ldquo;each
              supply&rdquo; pulls in PV / battery / generator inputs as well as the DNO supply —
              every separately energisable source needs its own isolation provision. Reg 462.2 then
              steps down to circuit level: every circuit shall be provided with isolation means for
              all live conductors. The exception in Reg 461.2 is narrow (essentially: where a group
              of circuits sharing a common supply can be treated together because the service
              conditions allow it). Treat the default as &ldquo;every circuit, all live
              conductors&rdquo; and document any exception.
            </p>
            <p>
              Reg 462.3 closes the loop by requiring that isolation devices be designed or installed
              so as to prevent unintentional or inadvertent closure. The reg gives three examples:
              within a lockable space or lockable enclosure; padlocking; located adjacent to the
              associated equipment. In practice, on a domestic CU you are looking at MCB lock-offs
              plus a padlockable hasp on the main switch, plus a clearly labelled position. In
              commercial work you are also looking at lockable isolators at the equipment.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 462.2"
            clause={
              <>
                Every circuit shall be provided with isolation means for all live conductors, except
                as detailed in Regulation 461.2. Provision may be made for isolating a group of
                circuits by a common means, if the service conditions allow this.
              </>
            }
            meaning="Default position: every circuit, every live conductor. Group isolation is permitted but is the exception, not the rule, and only when the service conditions justify it. On TT and IT systems the &lsquo;all live conductors&rsquo; phrase pulls in the neutral as a live conductor."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 462.3"
            clause={
              <>
                Devices for isolation shall be designed and/or installed so as to prevent
                unintentional or inadvertent closure. Examples of precautions are as follows: (a)
                located within a lockable space or lockable enclosure; (b) padlocking; (c) located
                adjacent to the associated equipment.
              </>
            }
            meaning="The &lsquo;and/or&rsquo; matters: the design or the installation, or both, must achieve the result. A device that is mechanically lockable but installed where the lock is removed for routine access does not satisfy the regulation."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What can — and cannot — act as a means of isolation</ContentEyebrow>

          <ConceptBlock
            title="Reg 537.2 — devices for isolation"
            plainEnglish="Reg 537.2.1 says the device must be of a type for which the isolation function is explicitly recognised by its product standard, or be in Table 537.4. Reg 537.2.2 prohibits semiconductor devices. Reg 537.2.6 prefers multipole devices. Reg 537.2.7 requires durable identification. Reg 537.2.8 controls neutral links."
            onSite="Table 537.4 is the look-up. If the device is not in Table 537.4 with the &lsquo;isolation&rsquo; tick, and not approved as suitable for isolation by its own product standard, it does not satisfy Reg 537.2.1 — full stop."
          >
            <p>The headline requirements from Reg 537.2 group:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reg 537.2.1:</strong> the device must be of a type for which isolation is
                explicitly recognised by its product standard, or as identified in Table 537.4.
                Plug-and-socket combinations are sometimes acceptable per Table 537.4 — but only
                when the table flags them as suitable for isolation, and only with overvoltage
                category considered (Reg 537.2.3).
              </li>
              <li>
                <strong>Reg 537.2.2:</strong> &ldquo;Semiconductor devices shall not be used as
                isolating devices.&rdquo; A solid-state relay, a thyristor, an electronic dimmer
                module — none are isolation. The reasoning is in Reg 537.3.1.3: a semiconductor may
                interrupt the current without opening the corresponding poles, so it cannot provide
                the visible electrical break that isolation requires.
              </li>
              <li>
                <strong>Reg 537.2.4 / 537.2.5:</strong> devices shall be selected and installed so
                as to prevent unwanted or unintentional closure. Lockable enclosure, padlocking, or
                interlocking are all acceptable; what is not acceptable is a device that can be
                closed by accidental contact during the work.
              </li>
              <li>
                <strong>Reg 537.2.6:</strong> multipole switching is preferred. Single-pole devices
                located adjacent to each other are not excluded, but the all-pole break is the
                default that Reg 462.2 (and the system requirements for TT / IT) effectively
                requires.
              </li>
              <li>
                <strong>Reg 537.2.7:</strong> each isolation device shall be clearly identified by
                position or durable marking to indicate the installation or circuit it isolates. A
                consumer unit with poorly labelled MCBs is a Reg 537.2.7 non-compliance even before
                any other issue arises.
              </li>
              <li>
                <strong>Reg 537.2.8:</strong> where a link is inserted in the neutral conductor for
                isolation purposes, the link shall (a) require a tool to remove and (b) be
                accessible only to skilled persons.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 537.2.2"
            clause={<>Semiconductor devices shall not be used as isolating devices.</>}
            meaning="One sentence, no exceptions. A device that interrupts the current but does not open the poles is functional switching, not isolation. The pole separation is the safety case."
          />

          <ConceptBlock
            title="Where the legal duty actually sits"
            plainEnglish="The duty to make the conductor dead and prove it dead at the point of work is on the person doing the work. The duty holder writes the system, the designer specifies the isolators, the contractor procures the locks. None of that transfers the duty under EaWR reg 14 / 16 from the operative whose hands are about to touch the conductor."
            onSite="A locked-off MCB is a control measure. Without prove-dead at the point of work, it is half a control measure. The discipline is: even if you locked the device yourself five minutes ago, prove dead before touching the conductor."
          >
            <p>
              GN3 Reg 1.1 puts this in writing: &ldquo;Electrical inspection and testing inherently
              involves some degree of hazard. It is therefore the inspector&apos;s duty to provide
              for their own safety, and that of others, in the performance of the test
              procedures.&rdquo; GN3 Reg 10.1 reinforces it: &ldquo;It is the test operative&apos;s
              duty to ensure their own safety, and the safety of others, while working through test
              procedures.&rdquo; The legal force of those statements is reg 14 / 16 of the EaWR
              backed by reg 4. They are not advice — they are how you are judged after a fault.
            </p>
            <p>
              That is why the JIB nine-step procedure (below) is structured the way it is. Every
              step exists because something has gone wrong without that step somewhere on a job in
              the past, and an operative ended up in court, in hospital, or dead. The procedure is a
              defensible system of work; following it is the difference between &ldquo;the
              precautions taken were suitable&rdquo; (a complete defence under reg 14(c)) and
              &ldquo;the operative did not test the indicator before use&rdquo; (the headline of the
              prosecution).
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The JIB nine-step safe isolation procedure</ContentEyebrow>

          <ConceptBlock
            title="The procedure, end to end"
            plainEnglish="The Joint Industry Board procedure expresses the legal duty as a sequence of nine steps. Steps 1–3 confirm you are about to isolate the right thing with working kit; steps 4–5 effect and secure the isolation; steps 6–8 are the prove-test-prove on the conductor; step 9 is the deliberate hand-off to the work activity."
            onSite="The procedure is in the JIB Handbook and in the IET / Electrical Safety First Best Practice Guide No. 2. It is the recognised industry method statement for the EaWR reg 14 &lsquo;suitable precautions&rsquo; limb."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Identify and locate the correct point of isolation.</strong> Confirm by
                circuit chart, schedule of circuit details, or live tracing that the device you are
                about to operate is the one that controls the conductor you intend to work on.
              </li>
              <li>
                <strong>Check the voltage indicator and proving unit.</strong> Visual inspection of
                leads, probes and shrouding (GS38). Confirm the proving unit is functional.
              </li>
              <li>
                <strong>Prove the indicator on a known live source.</strong> Apply the indicator to
                a dedicated proving unit (or other known live source) at the rated voltage of the
                system. Confirm the indicator reads correctly. This is the &ldquo;prove&rdquo; of
                prove-test-prove.
              </li>
              <li>
                <strong>Operate the means of isolation.</strong> Open the relevant isolator, breaker
                or fuse-switch. On TT and IT systems, ensure all live conductors including neutral
                are disconnected.
              </li>
              <li>
                <strong>Lock off and tag.</strong> Apply a personal padlock and tag bearing the
                operative&apos;s name and date. Where the device cannot be locked directly, fit an
                MCB lock-off device or remove and retain the fuse. Multi-hasp where multiple
                operatives need to apply locks.
              </li>
              <li>
                <strong>Test for absence of voltage at the point of work.</strong> Apply the
                indicator to all relevant conductor combinations (single phase: L-N, L-E, N-E; three
                phase: L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E). Confirm each
                reads zero. This is the &ldquo;test&rdquo; of prove-test-prove.
              </li>
              <li>
                <strong>Re-prove the indicator on the known live source.</strong> Apply to the
                proving unit again. Confirm it still reads correctly. This is the second
                &ldquo;prove&rdquo; — the bracketing step that turns a zero reading into evidence.
              </li>
              <li>
                <strong>Display warning notice.</strong> &ldquo;Caution — Men at Work&rdquo; or
                equivalent, at the point of isolation, naming the operative and the work activity.
              </li>
              <li>
                <strong>Begin work.</strong> Only now is the conductor under your control. Treat any
                subsequent break in the work (lunch, tools change, end of day) as a reset: re-test
                before resuming if the lock-off has been out of your line of sight.
              </li>
            </ol>
          </ConceptBlock>

          {/* JIB nine-step diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              JIB nine-step safe isolation — the prove-test-prove flow
            </h4>
            <svg
              viewBox="0 0 800 540"
              className="w-full h-auto"
              role="img"
              aria-label="JIB nine-step safe isolation flow. Steps 1 to 3 confirm correct isolation point and prove the indicator on a known live source. Steps 4 and 5 operate the isolation device, lock off and tag. Step 6 tests for absence of voltage at the point of work. Step 7 re-proves the indicator. Steps 8 and 9 display the warning notice and begin work."
            >
              {/* Top row — preparation */}
              <g>
                <rect
                  x="20"
                  y="20"
                  width="240"
                  height="100"
                  rx="10"
                  fill="rgba(168,85,247,0.08)"
                  stroke="rgba(168,85,247,0.4)"
                  strokeWidth="1.5"
                />
                <text
                  x="140"
                  y="46"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="10"
                  fontWeight="bold"
                >
                  PREPARATION
                </text>
                <text
                  x="140"
                  y="68"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11"
                >
                  1. Identify isolation point
                </text>
                <text
                  x="140"
                  y="86"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11"
                >
                  2. Check indicator + proving unit
                </text>
                <text
                  x="140"
                  y="104"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11"
                >
                  3. Prove on known live source
                </text>
              </g>

              {/* Middle-top row — isolate */}
              <g>
                <rect
                  x="290"
                  y="20"
                  width="220"
                  height="100"
                  rx="10"
                  fill="rgba(245,158,11,0.08)"
                  stroke="rgba(245,158,11,0.4)"
                  strokeWidth="1.5"
                />
                <text
                  x="400"
                  y="46"
                  textAnchor="middle"
                  fill="#F59E0B"
                  fontSize="10"
                  fontWeight="bold"
                >
                  ISOLATE + SECURE
                </text>
                <text
                  x="400"
                  y="74"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11"
                >
                  4. Operate means of isolation
                </text>
                <text
                  x="400"
                  y="96"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11"
                >
                  5. Lock off + tag
                </text>
              </g>

              {/* Top right — test */}
              <g>
                <rect
                  x="540"
                  y="20"
                  width="240"
                  height="100"
                  rx="10"
                  fill="rgba(34,197,94,0.08)"
                  stroke="rgba(34,197,94,0.5)"
                  strokeWidth="1.5"
                />
                <text
                  x="660"
                  y="46"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  TEST AT POINT OF WORK
                </text>
                <text
                  x="660"
                  y="74"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11"
                >
                  6. Test for absence of voltage
                </text>
                <text x="660" y="96" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                  (full L-L / L-N / L-E / N-E set)
                </text>
              </g>

              {/* Arrow row 1 */}
              <line x1="260" y1="70" x2="290" y2="70" stroke="#FBBF24" strokeWidth="2" />
              <polygon points="290,70 282,66 282,74" fill="#FBBF24" />
              <line x1="510" y1="70" x2="540" y2="70" stroke="#FBBF24" strokeWidth="2" />
              <polygon points="540,70 532,66 532,74" fill="#FBBF24" />

              {/* Down arrow from test */}
              <line x1="660" y1="120" x2="660" y2="180" stroke="#FBBF24" strokeWidth="2" />
              <polygon points="660,180 656,172 664,172" fill="#FBBF24" />

              {/* Middle band — re-prove */}
              <g>
                <rect
                  x="540"
                  y="190"
                  width="240"
                  height="80"
                  rx="10"
                  fill="rgba(34,197,94,0.08)"
                  stroke="rgba(34,197,94,0.5)"
                  strokeWidth="1.5"
                />
                <text
                  x="660"
                  y="216"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  RE-PROVE INDICATOR
                </text>
                <text
                  x="660"
                  y="240"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11"
                >
                  7. Apply to known live source
                </text>
                <text
                  x="660"
                  y="258"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                >
                  (confirms indicator still works)
                </text>
              </g>

              {/* Down arrow */}
              <line x1="660" y1="270" x2="660" y2="320" stroke="#FBBF24" strokeWidth="2" />
              <polygon points="660,320 656,312 664,312" fill="#FBBF24" />

              {/* Bottom right — work */}
              <g>
                <rect
                  x="540"
                  y="330"
                  width="240"
                  height="100"
                  rx="10"
                  fill="rgba(59,130,246,0.08)"
                  stroke="rgba(59,130,246,0.5)"
                  strokeWidth="1.5"
                />
                <text
                  x="660"
                  y="356"
                  textAnchor="middle"
                  fill="#3B82F6"
                  fontSize="10"
                  fontWeight="bold"
                >
                  HAND-OFF TO WORK
                </text>
                <text
                  x="660"
                  y="380"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11"
                >
                  8. Display warning notice
                </text>
                <text
                  x="660"
                  y="402"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11"
                >
                  9. Begin work
                </text>
              </g>

              {/* Caption — prove-test-prove */}
              <rect
                x="20"
                y="180"
                width="490"
                height="120"
                rx="10"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1.5"
              />
              <text x="40" y="208" fill="#FBBF24" fontSize="11" fontWeight="bold">
                Prove · Test · Prove
              </text>
              <text x="40" y="230" fill="rgba(255,255,255,0.85)" fontSize="10.5">
                Step 3 — indicator reads correctly on a known live source.
              </text>
              <text x="40" y="248" fill="rgba(255,255,255,0.85)" fontSize="10.5">
                Step 6 — indicator reads zero on every live combination at the point of work.
              </text>
              <text x="40" y="266" fill="rgba(255,255,255,0.85)" fontSize="10.5">
                Step 7 — indicator still reads correctly on the same known live source.
              </text>
              <text x="40" y="288" fill="rgba(255,255,255,0.6)" fontSize="10">
                A faulty indicator reads &ldquo;0 V&rdquo; on a live conductor. The bracketing
                proves it was working.
              </text>

              {/* Bottom legal anchor strip */}
              <rect
                x="20"
                y="450"
                width="760"
                height="70"
                rx="10"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="476"
                textAnchor="middle"
                fill="#F87171"
                fontSize="11"
                fontWeight="bold"
              >
                Legal anchor
              </text>
              <text
                x="400"
                y="496"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10.5"
              >
                EaWR 1989 reg 14 — &ldquo;suitable precautions&rdquo;. EaWR 1989 reg 16 —
                competence. BS 7671 Reg 462 / 537.2.
              </text>
              <text x="400" y="512" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                The duty to prove dead at the point of work sits on the operative, not the lock, not
                the duty holder.
              </text>
            </svg>
          </div>

          <Scenario
            title="Single-phase domestic — kitchen ring final"
            situation="A kitchen ring final on a 32 A B-curve MCB feeds eight sockets. The customer wants a new spur for an extractor. You are alone on the job, board is in the under-stairs cupboard, point of work is in the kitchen 6 m away."
            whatToDo="Step 1: identify the kitchen ring on the circuit chart and confirm by switching it off and asking the householder to flag any sockets that died. Step 2-3: at the board, prove your indicator on a dedicated proving unit. Step 4-5: open the MCB, fit an MCB lock-off, padlock and tag with your name and date, hang the warning notice on the CU door. Step 6: walk to the point of work, prove L-N, L-E and N-E at the spur position, confirm zero. Step 7: walk back, re-prove on the proving unit. Step 8-9: only then begin work. If you leave the kitchen for any reason and the lock leaves your line of sight, prove dead again before re-touching."
            whyItMatters="The 6 m walk is the gap where assumption replaces evidence. The discipline of re-proving on the proving unit after the dead-test catches the case where the indicator failed silently between the prove and the test. A flat battery, a fractured probe lead, a blown internal fuse — all read zero on a live conductor. Without the bracketing prove, a fatality reads as &lsquo;the operative tested it and got zero&rsquo;."
          />

          <SectionRule />

          <ContentEyebrow>Three-phase: the prove-test-prove gets longer</ContentEyebrow>

          <ConceptBlock
            title="What &lsquo;test for absence of voltage&rsquo; means on a 400 V board"
            plainEnglish="On a single-phase final circuit you have three combinations: L-N, L-E, N-E. On a three-phase board you have ten: L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E. Every one is mandatory."
            onSite="The reason is borrowed neutrals and parallel paths. A live L1 with an open L1-N relationship can show 0 V on a single L-N test if the neutral is itself floating somewhere in the system. Only the full set excludes every dangerous case."
          >
            <p>The full prove-dead set on a three-phase isolation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Phase to phase:</strong> L1-L2, L1-L3, L2-L3 — should each read 0 V if all
                three lines are dead. A non-zero reading flags one phase still energised.
              </li>
              <li>
                <strong>Phase to neutral:</strong> L1-N, L2-N, L3-N — confirms each line is dead
                with respect to the neutral.
              </li>
              <li>
                <strong>Phase to earth:</strong> L1-E, L2-E, L3-E — confirms each line is dead with
                respect to the protective conductor.
              </li>
              <li>
                <strong>Neutral to earth:</strong> N-E — the often-skipped one. A floating neutral
                can sit at hazardous potential to earth on TT/IT and on TN with a damaged
                PEN/return.
              </li>
            </ul>
            <p>
              Ten combinations. Then re-prove the indicator. The discipline is non-negotiable on a
              three-phase board because the failure modes (lost neutral, parallel-fed phase from a
              backfeed, on-load semiconductor switch upstream) all hide in subsets of the test set.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <CommonMistake
            title="Treating an MCB's open handle position as proof of isolation"
            whatHappens="The handle of an MCB can move to the off position while one or more poles remain welded closed under fault. You read &lsquo;OFF&rsquo; on the device, walk to the point of work, and discover the conductor live the hard way. On older boards the failure mode is more often weld-on after a high-current fault; on newer boards it is more often a contact bounce that does not separate cleanly."
            doInstead="The device is operated, locked, and tagged at step 4-5. The conductor is then proven dead at the point of work at step 6. The operative status of the device handle is not the test. GN3 Reg 1.1 puts the duty on you, not the handle. Reg 537.2.2's ban on semiconductor devices for isolation exists for the same reason: a handle that moves does not, on its own, prove pole separation."
          />

          <CommonMistake
            title="Proving the indicator on &lsquo;the nearest live socket&rsquo; instead of a proving unit"
            whatHappens="The nearest socket is on a circuit you cannot positively identify, in a domestic property where every socket is on a 30 mA RCD. The first &lsquo;prove&rsquo; is a 230 V touch-test on an unknown circuit. If the RCD nuisance-trips, you have inadvertently isolated something else and the &lsquo;prove&rsquo; reading was misleading. Worse: if the socket itself is on a borrowed neutral, the prove reading is not what you think it is."
            doInstead="Use a dedicated proving unit (a small battery-powered DC source that drives the indicator's detection circuit on a known voltage). It is safer, repeatable, and immune to the wiring mistakes you are about to investigate. GN3 Reg 10.1 (c) names the proving unit alongside leads and probes as something to check before each use — that is because it is the trusted live source for the bracketing proves."
          />

          <CommonMistake
            title="Skipping the second prove after the dead-test"
            whatHappens="You proved the indicator on the proving unit, walked to the point of work, got zero on every combination, and started cutting. The indicator's probe tip fractured during the dead-test sequence (a thump against a metal back-box) and it now reads zero on everything. You are working on a circuit you believe is dead. The next operative who picks up the same indicator inherits the fault."
            doInstead="The second prove on the known live source is the catch. After the conductor reads zero, go back to the proving unit and confirm the indicator still reads correctly. If it does, the dead reading is evidence. If it does not, the dead reading was meaningless and you have nearly killed yourself. Two seconds at the proving unit; one career, ended, without it."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The Craig Wiltshire JIB walkthrough</ContentEyebrow>

          <VideoCard
            url={videos.safeIsolation.url}
            title={videos.safeIsolation.title}
            channel={videos.safeIsolation.channel}
            duration={videos.safeIsolation.duration}
            topic="JIB safe isolation: where to test, prove-test-prove on single phase and three phase"
          />

          <SectionRule />

          <ContentEyebrow>The competent person duty (EaWR reg 16)</ContentEyebrow>

          <ConceptBlock
            title="Reg 16 — what &lsquo;competent person&rsquo; actually means"
            plainEnglish="Reg 16 says no person shall do work where technical knowledge or experience is necessary to prevent danger, unless they have that knowledge or experience, or are properly supervised. For BS 7671 inspection and testing, GN3 sets the floor: a recognised inspection-and-testing qualification, current 18th Edition, plus relevant experience for the installation type."
            onSite="Reg 16 reads alongside reg 14. Live work is permissible if precautions are suitable; suitable precautions can only be applied by a competent person. So &lsquo;not competent&rsquo; is itself a reg 14 failure on any live activity. The commercial implication: an apprentice can prove dead under direct supervision; an apprentice cannot perform safe isolation as the named operative."
          >
            <p>
              GN3 Reg 1.2 spells out the competence floor: &ldquo;Skilled persons carrying out the
              inspection and testing of any electrical installation must, as appropriate to their
              function, have a sound knowledge and experience relevant to the nature of the
              installation being inspected and tested, and of BS 7671 and other relevant technical
              standards.&rdquo; The implied marker for a 2391 / 2394-95 / equivalent qualification
              comes from the same paragraph: competence &ldquo;can best be shown by the inspector
              holding a recognized inspection and testing qualification, along with a current level
              3 certificate in the requirements for electrical installations BS 7671.&rdquo;
            </p>
            <p>
              The competence requirement extends to the test instruments. GN3 Reg 4.1 ties this
              together: instruments to BS EN 61010 (general electrical safety) and BS EN 61557
              (verification of measures for protection against electric shock); leads, probes and
              accessories to HSE GS38; and the operator with the training to use them.
              &ldquo;Suitable precautions&rdquo; under EaWR reg 14(c) requires all three.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'EaWR reg 14 is the legal default — three limbs, all three required. Live testing can be justified, the repair that follows it cannot.',
              'BS 7671 Reg 462.1 / 462.2 / 462.3 are the design duties. Every supply, every circuit, every live conductor — and devices that cannot be closed unintentionally.',
              'Reg 537.2.2: semiconductor devices shall not be used for isolation. Pole separation is the safety case. Reg 537.2.6 prefers multipole.',
              'On TT and IT systems, the neutral is a live conductor — isolation must disconnect all live conductors including N.',
              'The duty to prove dead at the point of work sits on the operative. A locked-off device is a control, not a transfer of duty.',
              'Prove-test-prove. On a known live source, on the conductor under test, on the same known live source. The second prove is the catch.',
              'Three-phase test set is ten combinations: L-L (×3), L-N (×3), L-E (×3), N-E. Anything less can hide a borrowed neutral or a stuck pole.',
              'JIB nine-step is the recognised system of work. Following it is the &ldquo;suitable precautions&rdquo; defence under EaWR reg 14(c).',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Can I rely on the householder turning off the main switch as &lsquo;safe isolation&rsquo;?',
                answer:
                  'No. The main switch position is operated by an ordinary person, not a skilled person, and there is no record, no proving sequence and no lock. EaWR reg 14 puts the &lsquo;suitable precautions&rsquo; duty on the operative doing the work — that means the operative carries out the JIB nine-step procedure themselves, including prove-test-prove at the point of work, regardless of what the householder did before they arrived.',
              },
              {
                question:
                  'Reg 537.2.2 prohibits semiconductor devices for isolation. What about a contactor with a hand-operated override — is that isolation?',
                answer:
                  'A contactor by itself is not isolation — it is functional switching (Reg 537.3). A contactor with a manual override that physically separates the poles and is locked in the open position with a tool can satisfy isolation if the device&apos;s product standard recognises the isolation function (Reg 537.2.1) and Table 537.4 supports its use. Treat the contactor as switching and the upstream isolator as isolation; do not conflate the two.',
              },
              {
                question: 'Is a plug-and-socket combination a valid means of isolation?',
                answer:
                  'Sometimes. Reg 537.2.1 reads with Table 537.4: a plug-and-socket combination identified in Table 537.4 as suitable for isolation is acceptable, with overvoltage category considerations from Reg 537.2.3. The plug must be in the operative&apos;s sight or under personal control for the duration of the work, otherwise it does not satisfy the &lsquo;prevent unintentional closure&rsquo; requirement of Reg 462.3 / 537.2.4. In practice, treat unplugging as a useful additional control, not a substitute for an upstream lock-off.',
              },
              {
                question:
                  'On a TN-C-S supply, why am I told never to switch the PEN at the consumer unit?',
                answer:
                  'Reg 411.4.3 prohibits switching or isolating devices in a PEN conductor. The PEN combines the neutral and protective functions; switching it can leave exposed metalwork connected to load current via the neutral path during the open period. Isolation is effected on the separated N and protective conductors downstream of the PEN/PNB break, or by approved means upstream where the distributor permits. Practical implication: the main switch on a TN-C-S domestic CU is a double-pole switch acting on L and N (the separated neutral), not on the PEN.',
              },
              {
                question:
                  'A colleague has locked off the board with their personal padlock. They are on a break. I need to add my own work to the same circuit — what is the correct process?',
                answer:
                  'Apply your own padlock to the same hasp via a multi-hasp (a lockable bar with multiple holes). Do not remove their lock — that breaks the chain of personal accountability. Each operative working on the circuit applies their own lock and tag, and only removes their own when their part of the work is complete. The circuit remains isolated until the last lock is removed. This is the lock-off-tag-out (LOTO) discipline and is covered in detail in Section 2.3.',
              },
              {
                question:
                  'Do I have to perform the full prove-test-prove every time I touch a conductor on the same job, or only at the start?',
                answer:
                  'Every time the lock-off has been out of your line of sight or your control. If you leave the room, take a tool break, swap operatives, or come back the next day, treat it as a new isolation event: confirm the lock is still in place, prove dead at the point of work, re-prove the indicator. The legal duty under EaWR is &ldquo;at the time the work is done&rdquo;, not &ldquo;once at the start of the day&rdquo;.',
              },
              {
                question: 'What is the legal status of HSE GS38 — is it law?',
                answer:
                  'GS38 (Electrical test equipment for use on low voltage electrical systems) is HSE guidance, not statute. But the courts treat it as the recognised standard of care: failing to follow GS38 makes it very hard to argue that &ldquo;suitable precautions&rdquo; under EaWR reg 14(c) were taken. In practice, GS38-compliant leads, probes and procedure are the floor, and BS EN 61010 / 61557 add the instrument-side requirements. GN3 Reg 4.1 and Reg 10.1 cite all three together as the package.',
              },
              {
                question:
                  'I am working on a three-phase board and the neutral-to-earth combination reads 4 V. Is that &lsquo;dead&rsquo;?',
                answer:
                  'No — investigate before proceeding. A non-zero N-E on a TN system can mean a floating neutral, a damaged PEN, a backfeed via a connected load with internal capacitance, or a measurement artefact from a high-impedance indicator. Disconnect the neutral at the isolation point if accessible, re-test, and verify the source. Do not start work until the reading is genuinely zero or you have a documented explanation. The duty under EaWR is to prevent danger; an unexplained 4 V is an unexplained risk.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Principles of safe isolation — Module 2.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-2/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 Isolation equipment and PPE
              </div>
            </button>
          </div>

          <div className="hidden">
            <Shield />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule2Section1;
