/**
 * Module 4 · Section 3 · Sub 7 — Use JIB safe isolation procedures
 * City & Guilds 2365-02 → Unit 204 → LO3 → AC 3.7
 *   AC 3.7 — "Use JIB safe isolation procedures"
 *
 * The JIB-mandated 9-step safe isolation procedure end-to-end. Every step
 * named, every action explained, every gotcha called out. Includes EAWR Reg
 * 12/13/14 verbatim, GS38 voltage indicator requirements, lockout-tagout kit,
 * and a worked example: isolating a 32 A radial circuit at a 3-phase board to
 * replace a faulty RCBO.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'JIB safe isolation procedures (3.7) | Level 2 Module 4.3.7 | Elec-Mate';
const DESCRIPTION =
  'The JIB-mandated 9-step safe isolation procedure end-to-end. EAWR Reg 12/13/14, HSE GS38 voltage indicators, lockout-tagout kit, and a full worked example on a 3-phase board.';

const checks = [
  {
    id: 'gs38-vs-socket-tester',
    question:
      'You need to verify isolation at the point of work on a single-phase final circuit. The right test instrument is:',
    options: [
      'A socket tester — the cheap one that plugs in.',
      'A multimeter set to AC Volts.',
      'A two-pole GS38-compliant voltage indicator (e.g. Martindale VI-13800, Kewtech KEWPROVE) — purpose-designed for safe isolation.',
      'Your finger — if it tingles, it is live.',
    ],
    correctIndex: 2,
    explanation:
      'A two-pole GS38 voltage indicator is the only correct instrument for verifying safe isolation. A socket tester is a verification tool only — it confirms a socket is wired correctly and live, but it cannot prove dead. A multimeter has user-adjustable settings that can be wrong, fused leads that can blow without obvious indication, and is not designed for the safety case. GS38 voltage indicators have shrouded probes, current-limiting, fixed function, and are tested before AND after each use against a known supply or proving unit.',
  },
  {
    id: 'prove-the-tester',
    question:
      'Step 7 of the published JIB 9-step safe isolation procedure (re-prove the voltage indicator on a known supply, AFTER the test for dead) exists because:',
    options: [
      'It is administrative.',
      'It catches a voltage indicator that failed silently between step 3 (prove before) and step 6 (test for dead). If the indicator broke after step 3, the "dead" reading at step 6 was unreliable; the step 7 re-prove confirms the indicator was still working when step 6 happened.',
      'It is only for three-phase.',
      'It replaces step 3.',
    ],
    correctIndex: 1,
    explanation:
      'Step 7 — re-prove the voltage indicator on a known supply AFTER the test for dead at step 6. This is the critical step that catches a silently-failed indicator. You proved it works at step 3 (before), tested for dead at step 6 (the actual measurement), and prove it works AGAIN at step 7 (after). If the indicator failed silently between steps 3 and 6 (battery died, lead broke), the step 7 check catches it and you know step 6 was unreliable. Step 7 is what makes the procedure safe.',
  },
  {
    id: 'lockout-physical',
    question:
      'Step 5 of the published JIB procedure (lock and label) requires you to:',
    options: [
      'Trust the customer not to switch it on.',
      'Apply a physical lockout device (padlock + clip + warning notice) so the device cannot be re-energised, OR remove the fuse and retain it in your possession.',
      'Tell the householder verbally.',
      'Mark the breaker with a Sharpie.',
    ],
    correctIndex: 1,
    explanation:
      'Step 5 (lock and label) is a distinct step in the published 9-step JIB sequence — it follows the physical isolation in step 4 (turn off / open / remove fuse) and PRECEDES the test for dead in step 6. Lockout = padlock + lockout clip on an MCB, OR removal of a fuse and retention in your pocket / toolbox. Verbal instructions to the householder are not sufficient (they can forget, change shift, lose attention). A Sharpie mark is not a physical barrier. The lockout has to be physical, the warning notice has to be in place, and the key (or the fuse) has to be in YOUR possession. EAWR Reg 13 requires "adequate precautions to prevent equipment becoming electrically charged" — the lockout is the practical mechanism.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'EAWR Reg 14 (1989) places restrictions on:',
    options: [
      'All work on electrical equipment.',
      'Working on or near LIVE conductors — prohibited unless impractical to make dead AND it is reasonable to work live AND suitable precautions are taken.',
      'Working on dead conductors.',
      'Voltage testing only.',
    ],
    correctAnswer: 1,
    explanation:
      'Verbatim Reg 14 — three conditions must ALL be satisfied for live work: it is unreasonable to make dead (e.g. a process you cannot interrupt), it is reasonable in all the circumstances to work live, AND suitable precautions are taken (PPE, insulated tools, second person, permit to work, etc.). For the great majority of installation work, ALL THREE conditions cannot be met, so the equipment must be made dead. Live work is the exception, never the default.',
  },
  {
    id: 2,
    question:
      'The first step of the JIB 9-step safe isolation procedure is:',
    options: [
      'Switch the breaker off.',
      'Identify the circuit / installation to be isolated — using the circuit chart, the schematic and confirmation with the customer / occupier.',
      'Test the voltage indicator.',
      'Apply lockout.',
    ],
    correctAnswer: 1,
    explanation:
      'Step 1 is identification. Before any switching, confirm exactly which circuit (or installation) you are isolating. Cross-check the circuit chart against the actual layout, talk to the customer about which devices the circuit feeds, trace it visually if possible. Get this wrong and you isolate the wrong circuit — meaning you work on something still live.',
  },
  {
    id: 3,
    question:
      'Step 6 of the JIB procedure (test for dead at the point of work) requires you to test:',
    options: [
      'L-N only.',
      'L-N, L-E and N-E for single-phase; L1-L2 / L1-L3 / L2-L3 / L-N each phase / L-E each phase / N-E for three-phase, all at the POINT OF WORK.',
      'L-E only.',
      'At the consumer unit only.',
    ],
    correctAnswer: 1,
    explanation:
      'Test for dead by checking every possible voltage combination AT THE POINT OF WORK. Single-phase: L-N, L-E, N-E (three tests). Three-phase: L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E (ten tests). Testing at the point of work, not at the upstream device, catches situations where the wrong circuit was isolated or where there is back-feed from another source.',
  },
  {
    id: 4,
    question:
      'A "proving unit" (e.g. Martindale GVD2, Kewtech KEWPROVE) is used to:',
    options: [
      'Replace the voltage indicator.',
      'Generate a known reference voltage so you can verify the voltage indicator is working — when no known live supply is conveniently available.',
      'Test the load.',
      'Calibrate the multimeter.',
    ],
    correctAnswer: 1,
    explanation:
      'A proving unit generates a known voltage (typically 230 V or 690 V dummy) so you can prove the voltage indicator is working without needing access to a live supply. It is the safer alternative to "prove the indicator on the upstream supply terminal" — particularly important when the install you are isolating is the only nearby supply. Step 3 (prove before isolation) and step 6 (prove after isolation) both use the proving unit.',
  },
  {
    id: 5,
    question:
      'A socket tester (Martindale ST120 / Kewtech) is acceptable for safe isolation verification:',
    options: [
      'Yes — it tests for voltage and shows wiring fault status.',
      'No — socket testers are a wiring verification tool only. They do not provide the GS38-required indicator features (shrouded probes, current limiting, prove function) and cannot be considered a safe-isolation tool.',
      'Yes if backed up by a multimeter.',
      'Yes for domestic only.',
    ],
    correctAnswer: 1,
    explanation:
      'Socket testers verify socket wiring (live, neutral, earth correctly connected) and detect voltage presence — they are useful as a quick check. They are NOT GS38-compliant voltage indicators and cannot be used to prove safe isolation. The GS38 indicator (Martindale VI-13800, Kewtech KEWPROVE, Fluke T6-1000) is purpose-designed: shrouded probes, current limited, fixed AC/DC settings, no user error. Always use the right tool for the safety-critical task.',
  },
  {
    id: 6,
    question:
      'After completing the test for dead and the re-prove of the indicator, you also need to:',
    options: [
      'Nothing — work can begin.',
      'Test polarity at the point of work (step 8) and record the isolation in your work log / permit (step 9).',
      'Switch the breaker back on briefly to test.',
      'Just write a note.',
    ],
    correctAnswer: 1,
    explanation:
      'Step 8 — test polarity at the point of work (confirm L is on the L terminal, N is on the N, E is on the E). Step 9 — record the isolation in your permit, work log or test record. Polarity verification catches reverse-polarity wiring that would be live during work even after correct isolation of the upstream device. Recording the isolation creates an audit trail for safety and for any future incident investigation.',
  },
  {
    id: 7,
    question:
      'A "permit to work" interacts with the JIB procedure how?',
    options: [
      'It replaces it.',
      'On commercial sites, the permit names the circuit / equipment to be worked on, the precautions required (which include safe isolation per the JIB procedure), the time window, the worker and the responsible person — the JIB procedure is the practical execution of the permit&rsquo;s isolation requirement.',
      'It is for hot works only.',
      'It is informal.',
    ],
    correctAnswer: 1,
    explanation:
      'On commercial / industrial sites, the permit to work is the formal authorisation to do the task — it names the work, the worker, the time window, the precautions. The JIB safe isolation procedure is the practical method by which the "isolation" precaution gets achieved on the ground. Permit and JIB procedure work together: the permit authorises, the JIB sequence executes. On a domestic install, no permit is required but the JIB sequence is still mandatory.',
  },
  {
    id: 8,
    question:
      'You complete the JIB procedure and start work. Twenty minutes in, the lockout padlock falls off the MCB clip. The right action is:',
    options: [
      'Carry on — you are nearly finished.',
      'Stop work IMMEDIATELY. Treat the circuit as potentially live until you re-prove it dead with the voltage indicator (and verify the indicator is working). Re-secure the lockout properly before continuing.',
      'Tape the padlock back on.',
      'Hold the padlock in place with one hand while working with the other.',
    ],
    correctAnswer: 1,
    explanation:
      'Any breach of the isolation security means stopping work and re-verifying the dead state. The MCB might have been switched on briefly while the lockout was off; the circuit may now be live. The correct response is: stop, re-test isolation at the point of work, re-prove the voltage indicator after the test, re-secure the lockout properly, then resume work. Continuing on the assumption "it&rsquo;s still off because nobody touched it" is the kind of assumption that leads to fatalities.',
  },
];

const faqs = [
  {
    question: 'Why nine steps and not five?',
    answer:
      'Each step in the JIB procedure exists because someone died, was injured, or was almost injured by skipping it. Step 1 (identify) — people have isolated the wrong circuit. Step 3 (prove the indicator before) — people have used a broken indicator. Step 4 (isolate) plus step 5 (lock and label) — circuits have been switched back on by other parties. Step 6 (test for dead at point of work) — backfeeds and wrong-circuit isolations have been missed. Step 7 (prove the indicator after) — indicators have failed silently mid-test. Each step closes a known historical failure mode. Skipping any one of them re-opens that failure mode.',
  },
  {
    question: 'What kit do I need for safe isolation?',
    answer:
      'Bare minimum: a GS38-compliant two-pole voltage indicator (Martindale VI-13800, Kewtech KEWPROVE, Fluke T6-1000), a proving unit (Martindale GVD2 or equivalent — generates known reference voltage), a set of MCB lockout devices (snap-on for various device profiles), padlocks (small, ideally each technician with their own colour), warning notices ("Caution — do not switch — work in progress" with a tear-off date / signature). For commercial work add: insulated screwdrivers, insulated gloves, safety glasses. Total kit cost ~£200-300 — pays for itself the first time it prevents an accident.',
  },
  {
    question: 'When can I work live, if ever?',
    answer:
      'EAWR Reg 14 sets three conditions that must ALL be satisfied for live work: (1) it is unreasonable to make dead (a process that genuinely cannot be interrupted), (2) it is reasonable in all the circumstances to work live (PPE, second person, permit, training all in place), AND (3) suitable precautions are taken. For installation work in domestic and most commercial contexts, ALL THREE cannot be met — so the equipment must be made dead. Live work is permitted in narrow scenarios — fault-finding on running plant where shutdown is genuinely unreasonable, certain switchgear maintenance where safe access requires the equipment energised. It is never the default and always requires explicit justification, RAMS and competent-person sign-off.',
  },
  {
    question: 'What is the difference between isolation and switching off?',
    answer:
      '"Switching off" makes a device non-functional but does not necessarily disconnect it from the supply. "Isolation" is the secure separation of the equipment from every source of supply, with provision to maintain that separation. EAWR Reg 12 specifies isolation requirements — the means of isolation must be clearly identified, secured (locked off), and reasonably accessible for verification. A standard MCB switched off is "switched off"; an MCB switched off + lockout device + padlock + warning notice is "isolated". The JIB procedure achieves isolation, not just switching off.',
  },
  {
    question: 'Do I have to do the full procedure for a quick socket replacement?',
    answer:
      'Yes. Every time. The 9-step procedure takes 5-10 minutes for a circuit you know well; the consequences of skipping any step can be fatal. "Just" a socket replacement involves working on conductors that, if not properly isolated, can deliver a fatal shock or arc flash. The procedure is not proportionate to the work duration — it is proportionate to the consequence of getting it wrong. Five minutes of procedure beats a lifetime of regret.',
  },
  {
    question: 'What if I cannot identify the right circuit to isolate?',
    answer:
      'You stop and resolve the identification before any switching. Trace the circuit visually (follow the cable from the device back to the CU). Plug a load (a lamp) into the suspect circuit and switch off MCBs one at a time until the lamp goes off. Confirm with the customer / householder which devices are on which circuit. If the circuit chart is wrong / missing / illegible, replace it as part of the work and document the error. Never isolate the wrong circuit and assume — that is precisely how step 6 (test for dead at point of work) catches the mistake, but only if you do step 6.',
  },
];

export default function Sub7() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 7"
            title="Use JIB safe isolation procedures"
            description="The JIB-mandated 9-step safe isolation procedure, end to end. Every step named, every action explained, every gotcha called out. EAWR Reg 12 / 13 / 14, HSE GS38 voltage indicators, lockout-tagout kit, and a full worked example on a 3-phase board. The procedure that keeps you and the people around you alive."
            tone="emerald"
          />

          <TLDR
            points={[
              'Nine steps, in order, every time (published JIB sequence): identify → notify → prove indicator → isolate (turn off / open / remove fuse) → lock and label → test for dead at point of work → re-prove indicator → polarity → record and proceed. Skip any step and you re-open a known failure mode.',
              'The voltage indicator MUST be GS38-compliant (shrouded probes, current limited, fixed function). Socket testers are NOT acceptable for safe isolation — they are a wiring verification tool only.',
              'Lockout is physical (padlock + clip + warning notice) or fuse-removed-and-retained. Verbal instructions to the householder are not sufficient — EAWR Reg 13 requires "adequate precautions".',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Use JIB safe isolation procedures — verbatim AC 3.7 from City & Guilds 2365-02 Unit 204.',
              'Execute the JIB 9-step safe isolation procedure correctly, in order, on any single-phase or three-phase final circuit.',
              'Select and use a GS38-compliant voltage indicator and proving unit to prove dead at the point of work.',
              'Apply physical lockout-tagout (padlock, clip, warning notice) and retain custody of the key / fuse for the duration of the work.',
              'Identify when live work is permitted under EAWR Reg 14 (rare exception) and when isolation is mandatory (the default).',
              'Record the isolation in a permit, work log or test certificate as part of the audit trail and verification process.',
            ]}
            initialVisibleCount={3}
          />

          <VideoCard
            url={videos.safeIsolation.url}
            title={videos.safeIsolation.title}
            channel={videos.safeIsolation.channel}
            duration={videos.safeIsolation.duration}
            topic="JIB safe isolation — where to test · Unit 204 AC 3.7"
            caption="Craig Wiltshire walks the JIB 9-step procedure with the voltage indicator in hand — exactly where each test point sits, why you re-prove the indicator after the dead test, and the lockout discipline that makes the whole sequence legally defensible."
          />

          <ContentEyebrow>The legal framework — EAWR 1989 + HSE GS38</ContentEyebrow>

          <ConceptBlock
            title="Why the procedure exists — the legal duty"
            plainEnglish="The JIB safe isolation procedure is the practical method by which an electrician complies with the Electricity at Work Regulations 1989 (EAWR), specifically Regulations 12, 13 and 14. EAWR creates a legal duty to make equipment dead before working on it, take precautions against re-energisation, and prohibit live work except in narrow circumstances. The JIB procedure is what 'making safe' looks like in practice."
          >
            <p>
              The three core EAWR regulations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 12</strong> — Means of cutting off supply / isolation. Every
                circuit must have an effective means of isolation that is clearly
                identified, securable, and accessible for use.
              </li>
              <li>
                <strong>Reg 13</strong> — Precautions for work on equipment made dead.
                Adequate precautions to prevent inadvertent re-energisation while work
                is in progress.
              </li>
              <li>
                <strong>Reg 14</strong> — Working on or near live conductors. Prohibited
                unless three conditions are ALL met: unreasonable to make dead AND
                reasonable to work live AND suitable precautions taken.
              </li>
            </ul>
            <p>
              The JIB&rsquo;s 9-step procedure operationalises Reg 13. The HSE&rsquo;s GS38
              guidance specifies the voltage indicator characteristics. Together these
              form the recognised safe-isolation standard for UK electrical work.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 12 (Means for cutting off the supply and for isolation)"
            clause="(Paraphrased.) Where necessary to prevent danger, suitable means (including, where appropriate, methods of identifying circuits) shall be available for: (a) cutting off the supply of electrical energy to any electrical equipment; and (b) the isolation of any electrical equipment. The means shall be suitably located, identified and where appropriate, capable of being secured."
            meaning={
              <>
                EAWR Reg 12 is the regulation that requires isolation to be available in
                the first place. The means must be suitable (the right device for the
                voltage and current involved), identified (so the user knows which device
                isolates which circuit), located so it can be reached, and securable
                (lockable). Modern consumer units satisfy this with labelled MCBs and
                lockable enclosures; older installations sometimes do not, and a periodic
                inspection should flag inadequate isolation provision as a finding.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989, Regulation 12 (paraphrased — see legislation.gov.uk for full text)."
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 13 (Precautions for work on equipment made dead)"
            clause="Adequate precautions shall be taken to prevent electrical equipment, which has been made dead in order to prevent danger while work is carried out on or near that equipment, from becoming electrically charged during that work if danger may thereby arise."
            meaning={
              <>
                Reg 13 is the regulation that requires lockout. Once you have made
                equipment dead, you must take "adequate precautions" to prevent it being
                made live again during the work. A switched-off MCB is not adequate
                precaution by itself — it can be switched back on by you, by another
                worker, by the customer, by a child. Adequate precaution = physical
                lockout (lockout device + padlock + warning notice) OR removal of the
                fuse and retention in your custody. The JIB procedure step 4 implements
                this directly.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989, Regulation 13 (verbatim)."
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 14 (Work on or near live conductors)"
            clause="No person shall be engaged in any work activity on or so near any live conductor (other than one suitably covered with insulating material so as to prevent danger) that danger may arise unless — (a) it is unreasonable in all the circumstances for it to be dead; and (b) it is reasonable in all the circumstances for him to be at work on or near it while it is live; and (c) suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury."
            meaning={
              <>
                Reg 14 is the regulation that almost prohibits live work. Three conditions
                must ALL be met before live work is permitted: (a) unreasonable to be
                dead, (b) reasonable to work live, AND (c) suitable precautions. For the
                vast majority of installation work, conditions (a) and (b) cannot be met
                — there is no good reason to leave the equipment live, and isolation is
                always reasonable. Live work is the exception, not the default. When in
                doubt, isolate. When supervisor pressure or programme pressure pushes
                toward live work, you push back and reference Reg 14 — the burden of
                proof is on the person proposing live work, not on the person refusing.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989, Regulation 14 (verbatim)."
          />

          <SectionRule />

          <ContentEyebrow>HSE GS38 — voltage indicators</ContentEyebrow>

          <ConceptBlock
            title="GS38 — what makes a voltage indicator safe"
            plainEnglish="HSE Guidance Note GS38 specifies the characteristics of a safe voltage indicator for proving dead. Shrouded probes, current limited, fixed function (no user-selectable AC/DC range that could be wrong), no user-replaceable fuses that could blow undetected. The Martindale VI-13800, Kewtech KEWPROVE, and Fluke T6-1000 are the most common GS38-compliant indicators in UK use."
            onSite="A multimeter is NOT GS38-compliant. The user-selectable function dial can be wrong (set to ohms while testing for voltage = false dead reading), the test leads can have a blown fuse with no obvious indication, and the probe tips are exposed (shock risk to the user). Use the right tool — a dedicated voltage indicator costs ~£100 and lasts a decade."
          >
            <p>
              GS38 voltage indicator characteristics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Shrouded probes</strong> — only ~4 mm of bare metal exposed at the
                tip; the rest of the probe is insulated. Reduces shock risk to the user
                if the test point is live.
              </li>
              <li>
                <strong>Current limiting</strong> — the indicator draws minimal current
                (typically &lt;3 mA) so that contact with a live source does not draw a
                fault current that could endanger the user.
              </li>
              <li>
                <strong>Fixed function</strong> — no user-selectable range or function
                dial. The indicator is for voltage detection only, AC and DC,
                pre-programmed. No way to use it incorrectly.
              </li>
              <li>
                <strong>Visible AND audible indication</strong> — LED bar showing voltage
                level, audible buzzer rising in pitch with voltage. Both indicators must
                work; either one alone is insufficient.
              </li>
              <li>
                <strong>No user-replaceable fuses</strong> — internal protection only,
                replaced by the manufacturer or by service. No risk of a blown fuse
                making the indicator falsely read dead.
              </li>
              <li>
                <strong>Self-test function</strong> — proves the indicator&rsquo;s circuit is
                working before you trust its reading. Some indicators self-test
                automatically; others require a button-press test.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSE Guidance Note GS38 — Electrical test equipment for use on low voltage electrical systems (paraphrased)"
            clause="(Paraphrased.) Test instruments and leads used by electricians shall be of a design and construction appropriate for the work being undertaken. Specifically: probes shall be shrouded with not more than 4 mm of metal exposed at the tip; leads shall be high-voltage rated; current draw shall be limited; the indicator shall be of fixed function (not user-selectable). Voltage indicators shall be proved against a known supply (or proving unit) before AND after each isolation test."
            meaning={
              <>
                GS38 is the HSE guidance that defines a safe voltage indicator. Every
                piece of test equipment used to prove dead must meet these characteristics
                — shrouded probes, current limited, fixed function, proven before and
                after use. A multimeter or socket tester does not meet these requirements
                and cannot be used for safe isolation verification. Reg 12 of EAWR
                cross-references "suitable means" which the HSE interprets via GS38;
                using non-compliant test equipment is therefore both an EAWR breach and
                an HSE guidance breach.
              </>
            }
            cite="Source: HSE Guidance Note GS38, Electrical test equipment for use on low voltage electrical systems (paraphrased)."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>The 9-step JIB safe isolation procedure</ContentEyebrow>

          <ConceptBlock
            title="Step 1 — Identify the circuit / installation to be isolated"
            plainEnglish="Before any switching, confirm exactly which circuit you are isolating. Check the circuit chart on the consumer unit. Cross-check against the schematic and the layout drawing. Talk to the customer about which devices the circuit feeds. If the circuit chart is missing, wrong, or unclear, trace the circuit visually before doing anything else."
            onSite="The most common failure mode in safe isolation is identifying the wrong circuit and isolating it, then working on what you THINK is dead but is actually still live. Step 5 (test at point of work) catches this — but only if you do step 5 properly. The cheapest way to avoid the failure is to get step 1 right."
          >
            <p>
              Identification techniques:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Read the circuit chart on the inside of the CU door / cover.</li>
              <li>Cross-check against the schematic / installation drawing.</li>
              <li>Plug a lamp into the suspect circuit; switch MCBs one at a time until the lamp goes off.</li>
              <li>Use a circuit tracer (sender + receiver) for cables in conduit / trunking.</li>
              <li>Talk to the householder about which lights / sockets they think are on which breaker.</li>
              <li>Document any errors found in the circuit chart and update before completing the work.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Step 2 — Notify persons who may be affected"
            plainEnglish="Before isolating, tell everyone who could be affected. The customer / householder. Other trades on site. Building occupants whose lights / heating / IT will go off. Anyone using equipment downstream of the isolation. Verbal notification AND a posted warning notice."
            onSite="On a domestic install — tell the householder, post a notice on the CU door, and ideally one on the front door so visitors know the supply is interrupted. On commercial — formal notification to the responsible person, posted notices on every affected circuit, possibly an email to building management."
          >
            <p>
              Notification scope:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The customer / building owner / responsible person.</li>
              <li>Anyone working on equipment that depends on the supply.</li>
              <li>Anyone in the building whose comfort or activity will be affected (heating, lighting, IT, lifts).</li>
              <li>Adjacent buildings if the supply is shared.</li>
              <li>The next shift / next-day team if the work is multi-day.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Step 3 — Prove the voltage indicator on a known supply (or proving unit)"
            plainEnglish="Before testing the isolation, confirm that the voltage indicator is working. Test it against a known live supply (a socket on a different circuit, or a proving unit that generates a known voltage). Both the LED bar and the audible buzzer should show the expected voltage. If either fails, replace the indicator before continuing."
            onSite="A proving unit (Martindale GVD2, Kewtech KEWPROVE Plus 2, Megger PSI 230) is the safer alternative to using a live supply for the prove — it generates ~230 V at low current, no risk to the user, and works even when the only nearby supply is the one you are about to isolate."
          >
            <p>
              The prove-test sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Switch the voltage indicator on (if not always-on).</li>
              <li>Self-test if the indicator has a button — confirms internal circuit.</li>
              <li>Touch both probes to the proving unit (or a known live supply L-N).</li>
              <li>Confirm the LED bar shows ~230 V (or the proving unit&rsquo;s reference).</li>
              <li>Confirm the buzzer sounds at the expected pitch.</li>
              <li>If both indications work — proceed to step 4.</li>
              <li>If either fails — replace the indicator. Do not proceed.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Step 4 — Isolate the circuit (turn off / open / remove fuse)"
            plainEnglish="Physically isolate the circuit at the upstream device. For an MCB or RCBO — switch the toggle to OFF. For a switch fuse / isolator — open the switch to the OFF position. For a fuse — remove the fuse element from its carrier. This step is the physical act of disconnecting the circuit from the supply; locking and labelling it is the SEPARATE next step."
            onSite="Isolation alone is not sufficient — a switched-off MCB can be flipped back on by anyone passing the panel. Step 4 is just the disconnection; step 5 (lock and label) is what makes the disconnection secure. The two steps are deliberately separate in the published JIB sequence because each does a different job."
          >
            <p>
              Isolation method by device type:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MCB / RCBO</strong> — switch toggle to OFF position.
              </li>
              <li>
                <strong>Main switch / isolator</strong> — operate to OFF / OPEN.
              </li>
              <li>
                <strong>Switch fuse</strong> — operate the switch to OFF, then verify the
                fuse position.
              </li>
              <li>
                <strong>BS 88 / BS 1361 cartridge fuse</strong> — remove the fuse element
                from the carrier.
              </li>
              <li>
                <strong>BS 3036 rewireable fuse (legacy)</strong> — remove the
                fuse-carrier from the holder.
              </li>
              <li>
                <strong>Plug-and-socket isolation</strong> — for portable / appliance
                work, unplug the appliance.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Step 5 — Lock and label (apply padlock + warning notice)"
            plainEnglish="Apply a physical lockout to the device you isolated at step 4 — clip + padlock + warning notice — so the device cannot be re-energised by anyone but you. For removed fuses, retain the fuse element in your possession (pocket, toolbox) for the duration of the work. The lockout key (or the fuse) belongs to ONE person — the person doing the work."
            onSite="MCB lockout devices come in various profiles to suit different breaker types — Hager, Schneider, Wylex, Crabtree, Eaton MEM. Carry a small selection in the van. The lockout clip snaps over the toggle to prevent operation; the padlock secures the clip. Each technician should ideally have their own coloured padlock so it is obvious whose lockout is on a board at any time."
          >
            <p>
              Lockout options by device type:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-pole MCB</strong> — snap-on plastic lockout clip + small
                padlock through the clip&rsquo;s padlock hole.
              </li>
              <li>
                <strong>RCBO</strong> — same as MCB; same clip type usually fits.
              </li>
              <li>
                <strong>3-pole / 4-pole MCB</strong> — wider lockout clip that covers all
                poles together; or individual clips per pole.
              </li>
              <li>
                <strong>Main switch / isolator</strong> — most have a built-in padlock hole;
                add the padlock + warning notice.
              </li>
              <li>
                <strong>Fused isolator (legacy or industrial)</strong> — fuse element
                already removed at step 4; retain it in your pocket. Fuse-pulling tools
                available for large fuses.
              </li>
              <li>
                <strong>Plug-and-socket isolation</strong> — for portable / appliance work,
                lockout the plug end if it could be reinserted (lockable plug enclosures
                available).
              </li>
            </ul>
            <p>
              Warning notice — "CAUTION: Do not switch / Work in progress" with date, time,
              technician name, and contact number. Notice goes on the device / panel face,
              positioned so anyone approaching the device sees it. EAWR Reg 13 requires
              "adequate precautions" — the physical lockout PLUS the visible warning are
              what "adequate" looks like in practice.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <ConceptBlock
            title="Step 6 — Test for dead AT THE POINT OF WORK"
            plainEnglish="Test for voltage at the actual point where you will be working — not at the upstream device. Use the GS38 voltage indicator. For single-phase, test L-N, L-E and N-E (three tests). For three-phase, test every combination — L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E (ten tests). Every test must read ZERO volts."
            onSite="Testing at the point of work, not at the CU, catches the cases where you isolated the wrong circuit, where there is back-feed from another source (UPS, solar, generator, neighbouring property), or where the cable has been miswired and the live conductor is on the wrong terminal."
          >
            <p>
              Single-phase test pattern (three tests, all at point of work):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>L to N → expect 0 V (no voltage between line and neutral).</li>
              <li>L to E → expect 0 V (no voltage between line and earth).</li>
              <li>N to E → expect 0 V (no voltage between neutral and earth).</li>
            </ul>
            <p>
              Three-phase test pattern (ten tests, all at point of work):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>L1-L2, L1-L3, L2-L3 → all 0 V (line-to-line).</li>
              <li>L1-N, L2-N, L3-N → all 0 V (each line to neutral).</li>
              <li>L1-E, L2-E, L3-E → all 0 V (each line to earth).</li>
              <li>N-E → 0 V (neutral to earth).</li>
            </ul>
            <p>
              If ANY test shows voltage, STOP. The isolation is incomplete or wrong.
              Investigate before continuing — most likely you isolated the wrong device,
              or there is back-feed, or the cable identification is wrong. Never start
              work on a circuit where any test reads non-zero.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Step 7 — Re-prove the voltage indicator on a known supply (or proving unit)"
            plainEnglish="After testing for dead at step 6, prove the indicator works AGAIN — same as step 3. This is the critical step that catches a failed indicator mid-test. If the indicator broke between step 3 and step 6 (battery died, lead came loose, internal failure), step 7 catches it and you know step 6 was unreliable."
            onSite="Step 7 is the step that separates a competent procedure from a tragic one. A working indicator at step 3, a &lsquo;dead&rsquo; reading at step 6, a failed indicator at step 7 — that is when you know the circuit might still be live and step 6 lied to you. Repeat the test for dead if step 7 fails."
          >
            <p>
              Step 7 mechanics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Touch the same indicator probes back to the proving unit (or known live).</li>
              <li>Confirm the indicator reads the expected voltage.</li>
              <li>Confirm both LED and buzzer respond.</li>
              <li>If the indicator works — step 6 was reliable; the circuit is genuinely dead. Proceed.</li>
              <li>If the indicator fails — step 6 was unreliable; the circuit may be live. Replace the indicator and repeat steps 3, 6 and 7.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <ConceptBlock
            title="Step 8 — Test polarity at the point of work"
            plainEnglish="Confirm that line is on the L terminal, neutral is on the N, earth is on the E. Polarity confirmation catches reverse-polarity wiring (live and neutral swapped on a previous installation) that would otherwise be live during work even after correct isolation of the upstream device."
          >
            <p>
              Polarity check options:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Continuity test (no power required)</strong> — using an MFT or
                continuity tester, verify continuity from the L terminal at the point of
                work back to the L bus-bar in the CU; same for N and E.
              </li>
              <li>
                <strong>Visual inspection</strong> — confirm conductor colours and terminal
                markings match. Brown / red on L; blue / black on N; green-and-yellow on E.
              </li>
              <li>
                <strong>For socket replacements</strong> — many socket testers (e.g.
                Martindale ST120) can confirm polarity once the supply is restored, but
                this is verification AFTER work, not pre-work polarity check.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Step 9 — Record the isolation"
            plainEnglish="Document the isolation in your work log, on the permit (if applicable), or on the test certificate. Record what was isolated, by whom, when, with what device, with what proving / verification, and the time of restoration. This creates an audit trail for safety and for any future incident investigation."
          >
            <p>
              The minimum record:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Circuit identifier — e.g. "Way 6, kitchen ring, 32 A RCBO".</li>
              <li>Isolation method — "MCB locked off + warning notice" or "fuse removed and retained".</li>
              <li>Time isolated, time restored.</li>
              <li>Voltage indicator used — make / model / serial / next cal date.</li>
              <li>Proving unit used (if applicable) — same details.</li>
              <li>Technician name and signature.</li>
              <li>Permit number (if commercial).</li>
              <li>Test results from step 5 — voltages measured (all 0 V).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Worked example — isolating a 32 A radial at a 3-phase board</ContentEyebrow>

          <Scenario
            title="Replacing a faulty 32 A RCBO on Phase L2 of a 3-phase commercial DB"
            situation={
              <>
                A 3-phase commercial distribution board in a small office. Way 4 on
                Phase L2 has a faulty RCBO that keeps tripping under no apparent fault.
                The decision is to replace it with an identical Hager NDN132A. The DB
                is a Hager Vega/HE-class 3-phase 18-way, supply via a 100 A Type B MCCB
                from the riser. The faulty RCBO supplies a 32 A radial to a small kitchen
                pantry on the second floor. The job is during business hours on a
                Wednesday morning.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 — Identify.</strong> Open the DB door. Read the circuit
                chart. Way 4, Phase L2, "Pantry kitchen socket". Confirm with the office
                manager which kitchen this serves. Plug a lamp into a pantry socket;
                confirm it is on the suspect way by switching the way on/off and watching
                the lamp.
                <br /><br />
                <strong>Step 2 — Notify.</strong> Tell the office manager the pantry
                circuit will be off for ~30 minutes. Email the building manager (the
                building has shared facilities). Post a "DO NOT SWITCH — work in progress"
                notice on the DB door and on the pantry door.
                <br /><br />
                <strong>Step 3 — Prove the indicator.</strong> Use a Martindale GVD2
                proving unit. Apply the Kewtech KEWPROVE+2 voltage indicator probes to
                the proving unit. LED reads ~230 V; buzzer sounds at expected pitch.
                Indicator is working.
                <br /><br />
                <strong>Step 4 — Isolate (turn off the device).</strong> Switch off the
                Hager NDN132A on Way 4, L2. The device toggle moves to OFF. Physical
                disconnection of the circuit from the supply is now done; the next
                step makes that disconnection secure.
                <br /><br />
                <strong>Step 5 — Lock and label.</strong> Apply a Hager-compatible MCB
                lockout clip over the toggle. Padlock the clip closed; pocket the key.
                Apply a fresh warning notice with date, time, name, contact number on
                the DB face next to the locked-off way.
                <br /><br />
                <strong>Step 6 — Test for dead at the point of work.</strong> Travel
                to the pantry. Open the back of a pantry socket. Apply the indicator
                probes to the line and neutral terminals; reads 0 V. Apply L-E; reads
                0 V. Apply N-E; reads 0 V. All three tests show no voltage.
                <br /><br />
                <strong>Step 7 — Re-prove the indicator.</strong> Travel back to the
                DB area (or use a portable proving unit at the pantry). Touch the
                same indicator probes to the GVD2 proving unit. Reads ~230 V; buzzer
                sounds. Indicator is still working — step 6 was reliable.
                <br /><br />
                <strong>Step 8 — Polarity at the point of work.</strong> Continuity
                check from L terminal at the pantry socket back to the L2 bus-bar at
                the DB. Confirm continuity (low resistance reading on MFT). Same for
                N and E. Polarity confirmed correct.
                <br /><br />
                <strong>Step 9 — Record and proceed.</strong> Log the isolation in
                your day log:
                "10:35 isolated DB Way 4 L2 (Pantry kitchen socket), Hager NDN132A
                32 A. Lockout clip + padlock + notice. Tested L-N L-E N-E at pantry
                socket — all 0 V. Indicator: KEWPROVE+2 SN12345, cal Aug 2026.
                Proving unit GVD2 SN67890. Polarity verified. Work commences 10:40,
                expected restoration ~11:10."
                <br /><br />
                <strong>Now do the work.</strong> Replace the RCBO. Re-test the
                terminations. Restore supply (remove lockout, switch back on). Re-test
                downstream functionality. Update the log with restoration time and
                any observations. Tell the office manager the pantry is back on.
              </>
            }
            whyItMatters={
              <>
                A 3-phase board has nine possible voltage combinations at any single point
                in the system. A wrong-circuit isolation on a 3-phase board can leave
                400 V phase-to-phase live at the point of work — instant fatality on
                contact. The 9-step procedure, executed properly, makes this impossible.
                Skipping or short-cutting any step re-opens the failure mode that the
                step closes. Five minutes of procedure beats a coroner&rsquo;s inquiry.
              </>
            }
          />

          <CommonMistake
            title="Using a socket tester (or multimeter) instead of a GS38 voltage indicator"
            whatHappens={
              <>
                You finish first-fix on a kitchen ring and need to verify isolation
                before terminating. You use the Martindale ST120 socket tester you
                have in your bag — it shows "no voltage detected" on the suspect
                socket. You start work. Three minutes in, you contact a live conductor
                — the socket tester missed the voltage because it tests for socket
                wiring patterns, not for safe isolation. The socket tester was the
                wrong tool. Best case: an unforgettable shock. Worst case: arc flash,
                burns, fall from a step ladder, fatality.
              </>
            }
            doInstead={
              <>
                Use a GS38-compliant voltage indicator (Martindale VI-13800, Kewtech
                KEWPROVE, Fluke T6-1000) for ALL safe-isolation verification. A socket
                tester is a wiring verification tool — useful for checking that a
                completed circuit is correctly wired and live, NOT for proving dead.
                A multimeter is a measurement tool — too many user-selectable settings,
                no fixed function, fused leads that can blow undetected. The voltage
                indicator costs ~£100, lasts a decade, and is the only correct
                instrument for safe isolation verification. Buy one. Use it every time.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'EAWR Reg 12 (means of isolation) + Reg 13 (precautions on equipment made dead) + Reg 14 (live work prohibited unless three conditions met) form the legal basis for safe isolation.',
              'Live work is the exception, not the default. Reg 14 conditions almost never all apply to installation work — the equipment must be made dead.',
              'GS38-compliant voltage indicator is the only correct tool — shrouded probes, current limited, fixed function. Socket tester and multimeter are NOT acceptable.',
              'JIB 9-step procedure (published sequence): identify → notify → prove indicator → isolate (turn off / open / remove fuse) → lock and label → test for dead at point of work → re-prove indicator → polarity → record and proceed.',
              'Step 7 (re-prove indicator after step 6) is the critical step that catches a silently-failed indicator. Skip it and step 6 is unreliable.',
              'Lockout is physical — clip + padlock + warning notice. Verbal instructions and Sharpie marks do not satisfy EAWR Reg 13 "adequate precautions".',
              'Test for voltage at the POINT OF WORK, not at the upstream device. Catches wrong-circuit isolation, back-feed, and miswired conductors.',
              'Three-phase = 10 voltage tests at the point of work (L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E). Single-phase = 3 tests (L-N, L-E, N-E).',
              'Record the isolation — circuit, time, method, indicator details, test results, restoration time. Audit trail for safety and incident investigation.',
            ]}
          />

          <Quiz title="JIB safe isolation procedures — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.6 Maintain safe working practices
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-8')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.8 Wiring system selection deep dive
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
