/**
 * Module 1 · Section 5 · Subsection 2 — The safe isolation procedure
 *
 * Unit 201, LO3, AC 3.8 — apprentice has to be able to describe the procedure
 * for safely isolating a circuit/installation.
 *
 * Walks through the practical 7-step procedure as taught by NICEIC, JIB, NET
 * and the IET. Some firms break it into 9 steps (proving the unit before/after
 * called out separately, and ‘confirm reinstated’ as the last step). We teach
 * 7 here and call out the variants.
 *
 * Cross-references: §5.1 (legal basis), §5.3 (kit + lock-off detail),
 * §5.4 (different scenarios), §1 (EAWR), §3 (RAMS spec the isolation point).
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'The safe isolation procedure | Level 2 Module 1.5.2 | Elec-Mate';
const DESCRIPTION =
  'The 7-step safe isolation procedure step-by-step — from identifying the right device to proving dead and posting warning signs. The exact sequence the JIB and HSE expect.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 's5-2-step-1-check',
    question: 'What is the very first step of the safe isolation procedure?',
    options: [
      'Switch off the breaker',
      'Identify the correct point of isolation and the conductors involved',
      'Lock off the breaker',
      'Test for dead',
    ],
    correctIndex: 1,
    explanation:
      "Identification first. You need to know which device isolates the circuit, what voltage and number of phases it’s on, and that there are no other supplies (UPS, PV, generators, borrowed neutrals) that could backfeed it. Skip this and the rest of the procedure is wasted.",
  },
  {
    id: 's5-2-prove-test-prove-check',
    question: 'In ‘prove – test – prove’, what does the FINAL ‘prove’ confirm?',
    options: [
      'That the circuit is dead',
      'That your voltage indicator was still working when you tested the circuit',
      'That the breaker can be re-energised',
      'That the proving unit is still working',
    ],
    correctIndex: 1,
    explanation:
      "The first ‘prove’ shows your voltage indicator works. You test the circuit. The second ‘prove’ — back on the proving unit — confirms the indicator is STILL working. If it’s not, your ‘dead’ reading on the circuit could have been a false negative — and you find that out before you’re halfway up to your elbows in conductors.",
  },
  {
    id: 's5-2-conductor-combinations-check',
    question: 'On a 230 V single-phase circuit, which conductor combinations should you test?',
    options: [
      'Line to neutral only',
      'Line to neutral and line to earth',
      'Line to neutral, line to earth, AND neutral to earth',
      'Just line to earth — neutral is bonded so it doesn’t matter',
    ],
    correctIndex: 2,
    explanation:
      "All three. Line-neutral catches the obvious live conductor. Line-earth catches a broken neutral or borrowed-earth situation. Neutral-earth catches a floating/borrowed neutral that’s been raised by another circuit. Miss any one and you can be working on a conductor that’s sitting at mains potential.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'How many steps does the standard JIB / NET safe isolation procedure have?',
    options: ['3 steps', '5 steps', '7 steps (some firms expand to 9)', '12 steps'],
    correctAnswer: 2,
    explanation:
      "The widely-taught procedure is 7 steps, although some training providers expand it to 9 by separating out the ‘prove the proving unit’ before-and-after, and adding ‘confirm safe re-instatement’ as a final step. Same procedure, finer slicing.",
  },
  {
    id: 2,
    question: 'You isolate a circuit and lock it off. What MUST you do before any tool touches a conductor?',
    options: [
      'Wait 60 seconds for capacitors to discharge',
      'Prove dead with a GS38-compliant voltage indicator that has itself been proved on a known source',
      'Touch the conductor with the back of your hand to feel for a tingle',
      'Sign the certificate',
    ],
    correctAnswer: 1,
    explanation:
      "Always prove dead. The voltage indicator must be GS38-compliant AND must itself have been proved on a known source (proving unit) immediately before — and immediately after — testing the circuit. ‘Back-of-hand’ checks are a folklore route to A&E, not a procedure.",
  },
  {
    id: 3,
    question: 'Why is a multi-meter set to AC volts NOT acceptable for proving dead?',
    options: [
      'It’s not accurate enough',
      'It doesn’t meet GS38 (probe finger guards, ≤4 mm tip, fused leads) and there’s no ‘unknown’ failure mode confirmation',
      'It can damage the circuit',
      'It’s too expensive to use on site',
    ],
    correctAnswer: 1,
    explanation:
      "A multi-meter set to volts can show 0 V because (a) the circuit is dead, OR (b) the meter is broken, switched to current, on the wrong range, or on the wrong leads. A two-pole voltage indicator is purpose-built — it CAN’T be on the wrong range, has fixed probes, integral lead test and a positive ‘live’ indication. GS38 specifies it for exactly this reason.",
  },
  {
    id: 4,
    question: 'Where should the lock-off key live during the work?',
    options: [
      'In the consumer unit so anyone can re-energise if needed',
      'On the foreman’s key ring',
      'In the pocket of the person doing the work',
      'Hung on the wall next to the CU',
    ],
    correctAnswer: 2,
    explanation:
      "Personal control. The key stays with you, on you, until you’ve finished the work. If anyone else needs to re-energise mid-job they have to find you — which is exactly the conversation you want to be having.",
  },
  {
    id: 5,
    question: 'You’re isolating at the main switch of a TT installation for a CU change. What extra check matters because it’s TT?',
    options: [
      'Nothing extra — same procedure as TN',
      "You must verify there’s no incoming voltage on the supply side of the main switch (DNO fault)",
      'You can skip proving dead because TT is inherently safer',
      'The earth conductor must be cut',
    ],
    correctAnswer: 1,
    explanation:
      "Procedure is the same. But TT installs rely on an earth electrode rather than the DNO’s earth, which means N-E voltage can sit a few volts off zero even when ‘off’. Always prove with the indicator on a real-source proving unit and check L-N, L-E, N-E. If anything looks weird, suspect a DNO neutral problem and stop.",
  },
  {
    id: 6,
    question: 'The customer asks if they can leave a temporary fan plugged into the next ring socket while you work. What do you do?',
    options: [
      'Sure, that ring is on a different MCB',
      'No — confirm they understand nothing is to be plugged in or switched within the area until the work is signed off',
      'Tell them it’s their house, they can do what they like',
      'Just unplug it without saying anything',
    ],
    correctAnswer: 1,
    explanation:
      "Other circuits being live isn’t the problem; the problem is anyone TOUCHING anything in the area while the install is opened up. Brief the customer, post a Do Not Operate sign on the CU, and ask them to keep clear until you’ve reinstated and tested.",
  },
  {
    id: 7,
    question: 'You finish the job and remove your lock-off. What is the LAST thing you should do before you leave?',
    options: [
      'Pack the tools and go',
      'Turn the breaker back on without testing',
      'Re-energise, confirm the circuit functions correctly, and confirm no other circuits have been disturbed',
      'Send the certificate by email and pack up',
    ],
    correctAnswer: 2,
    explanation:
      "Re-instate, function-test (does the socket work? does the light come on the right switch?), and visually check the rest of the board for anything you might have nudged. Some firms call this Step 8 or Step 9 — ‘safe re-instatement’. Doesn’t matter what you call it; missing it is how customers ring you back at 7pm.",
  },
  {
    id: 8,
    question: 'Mid-job, you need a five-minute toilet break. What happens to the isolation?',
    options: [
      'Leave it, you’ll be back in five',
      'It’s your padlock and your key — they go with you, the lock stays on',
      'Hand the key to the customer to look after',
      'Pop the breaker back on so other equipment isn’t disturbed',
    ],
    correctAnswer: 1,
    explanation:
      "The lock stays on the device. The KEY stays in your pocket. If you leave site (van, lunch, end of day), the lock-off stays in place until you’re physically back at the device with the key, ready to re-instate. No exceptions.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Why is the procedure ‘7 steps’ in some books and ‘9 steps’ in others?",
    answer:
      "Both are the same procedure — different chunking. The 7-step version groups ‘prove the proving unit, test the circuit, prove again’ as one ‘prove dead’ step. The 9-step version splits them out and adds ‘safe re-instatement’ at the end. Either way you do exactly the same things. Use whatever the centre/employer asks for in your portfolio.",
  },
  {
    question: "Do I have to use the ‘prove – test – prove’ sequence on every circuit, every time?",
    answer:
      "Yes. It takes about 10 seconds extra and it’s the only way you know your voltage indicator was working when you tested. There’s no scenario where it’s ‘probably fine’ to skip it. The HSE’s analysis of fatal incidents (HSG85) calls out skipped proving as one of the most common contributing factors.",
  },
  {
    question: "What does ‘point of isolation’ actually mean?",
    answer:
      "The single device that, when operated, removes ALL sources of supply from the circuit you’re working on. For a final circuit it’s usually the MCB. For sub-mains it’s a switch-disconnector or main switch. For an item of fixed equipment (boiler, hob, EV charger) it might be a dedicated rotary isolator within sight. The point of isolation has to be capable of being secured — i.e. lockable in the off position. A flick switch on the wall is NOT a point of isolation.",
  },
  {
    question: "What if the only isolator is a pull-out fuse carrier I can’t lock?",
    answer:
      "Take the carrier with you. Physically remove it from the board, post a sign on the empty fuseway, and keep the carrier in your toolbox/van. That’s a recognised method where a lockable device isn’t fitted — it’s in HSG85 — and it gives the same outcome: the circuit cannot be re-energised without you being present.",
  },
  {
    question: "If I’m only swapping a faceplate, do I still need to prove dead?",
    answer:
      "Yes. Faceplate swaps are exactly where complacency kills people. Backed-out tails, broken neutral, mis-labelled breaker — all the failure modes apply at a faceplate as much as at a CU. Prove dead at the actual point of work.",
  },
  {
    question: "How does the procedure change for three-phase work?",
    answer:
      "Same 7 steps, more conductor combinations to prove dead. On 400 V three-phase you check L1-L2, L2-L3, L1-L3, each line-N and each line-E (and N-E). The procedure is identical; the test set is bigger. We cover the full three-phase variant in §5.4.",
  },
];

export default function Sub2() {
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
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 1 · Section 5 · Subsection 2"
            title="The safe isolation procedure"
            description="The seven steps the JIB, NET and IET expect from a competent person — from identifying the correct point of isolation to confirming the circuit is reinstated. Learn it in this order, in your sleep."
            tone="emerald"
          />

          <TLDR
            points={[
              "Seven steps: identify → switch off → secure (lock off + tag) → prove the indicator on a known source → test for dead at the point of work → re-prove the indicator → post warning signs.",
              "‘Prove – test – prove’ is non-negotiable. The first prove shows your indicator works. The second prove shows it was still working when you tested.",
              "Personal control. Your padlock, your key, your pocket. Lock-off stays in place until you’re physically back with the key.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Walk through the 7-step safe isolation procedure in the correct sequence, from identification to warning notice.",
              "Explain why proving the voltage indicator before AND after testing is the central ‘prove – test – prove’ rule.",
              "List the conductor combinations to test on a single-phase 230 V circuit (L-N, L-E, N-E).",
              "Identify a valid ‘point of isolation’ — what makes a device suitable for isolation under BS 7671 Section 537.",
              "Apply ‘personal control’ — your lock, your key, no shared keys, no leaving the key behind.",
              "Describe what ‘safe re-instatement’ is and why it matters as a closing step.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The procedure at a glance</ContentEyebrow>

          <ConceptBlock title="Seven steps, in this exact order">
            <p>
              Read these once, then we’ll walk through each with the on-site detail. The order is
              not negotiable — every step is there to catch a failure of the previous one:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify</strong> the circuit, the point of isolation, and any other
                possible sources of supply.
              </li>
              <li>
                <strong>Switch off</strong> at the point of isolation.
              </li>
              <li>
                <strong>Secure</strong> the device with a personal lock-off and tag.
              </li>
              <li>
                <strong>Prove</strong> your voltage indicator on a known source (proving unit).
              </li>
              <li>
                <strong>Test</strong> the circuit at the point of work — every conductor
                combination — to confirm dead.
              </li>
              <li>
                <strong>Re-prove</strong> the voltage indicator on the known source.
              </li>
              <li>
                <strong>Post</strong> warning notices at the isolator (and on the certificate /
                permit).
              </li>
            </ol>
            <p>
              Some training centres and employers expand this to 9 — typically by splitting steps
              4-6 into ‘prove indicator, test circuit, prove indicator’ as three named steps, and
              adding ‘safely re-instate and verify function’ as the closing step. Same procedure
              either way. We cover the closing step explicitly later.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Step 1 — Identify</ContentEyebrow>

          <ConceptBlock
            title="Get the right device — and be sure nothing else can backfeed it"
            plainEnglish="Before you touch a switch, know exactly which device removes ALL supply from the circuit you’re working on, and convince yourself nothing else can put voltage on it."
            onSite="Open the board and look. Don’t trust the label. Trace the cable, ring the breaker out with a circuit identifier, or take the load off and watch what dies. ‘Probably the right one’ is not identification."
          >
            <p>What you’re trying to confirm at this step:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The right device.</strong> Which MCB / RCBO / switch-disconnector controls
                the circuit you want dead. Cross-reference the schedule, the label, AND a circuit
                identifier or load test.
              </li>
              <li>
                <strong>The whole supply.</strong> Is this circuit fed from one source or two?
                UPS-fed sub-mains, PV inverters, EV chargers with V2G, generators, two-way switching
                from another consumer unit, and the classic ‘borrowed neutral’ from the next
                circuit are all real backfeed paths.
              </li>
              <li>
                <strong>The voltage and number of phases.</strong> Single-phase 230 V? Three-phase
                400 V? DC? Get the wrong indicator out and the procedure falls apart.
              </li>
              <li>
                <strong>That the device is suitable for isolation.</strong> Under BS 7671 Section
                537 the device must be capable of fully isolating ALL live conductors and must be
                securable in the off position. A functional switch (light switch, plug, contactor
                control) is NOT a point of isolation.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 461.2"
            clause="Subject to the exception of Regulation 461.2, every circuit shall be provided with a means of isolation from all live supply conductors by a linked switch or a linked circuit-breaker. Provision may be made for isolation of a group of circuits by a common means, if the service conditions allow this."
            meaning={
              <>
                Isolation of the neutral conductor moved out of Section 537 in A4:2026 — it’s now
                in Chapter 46 (Reg 461.2). On TN-S and most TN-C-S (PNB) installs, you typically
                isolate line conductors only — the neutral is bonded back to the supply
                transformer earth and sits close to 0 V. On TT (your own earth electrode) and IT
                (no system earth at all), the neutral has to be isolated too because it isn’t
                tied to a known earth reference. That’s why three-pole switches with N-link are
                common on TT mains.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4 Chapter 46 Regulation 461.2."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Step 2 — Switch off</ContentEyebrow>

          <ConceptBlock
            title="Operate the device firmly to the off position"
            onSite="No half-throws. Snap it positively to off. Watch the position indicator. On RCBOs, expect to see the toggle drop a few millimetres further than a normal trip — that’s deliberate so you can tell the difference."
          >
            <p>
              Two practical points that matter on the day:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Operate to off, not to ‘probably off’.</strong> A breaker can sit in a
                middle ‘tripped’ position that LOOKS off but isn’t fully open mechanically. Push
                it firmly to the off detent. RCDs/RCBOs you typically push down past the trip
                position to a clean ‘O’.
              </li>
              <li>
                <strong>Watch what dies.</strong> If the customer is in, ask them what they expect
                to lose (lighting, fridge, computer). Confirm those go off when you operate the
                device. If they don’t, you’re probably on the wrong device — back to Step 1.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Step 3 — Secure</ContentEyebrow>

          <ConceptBlock
            title="Lock-off + tag = personal control"
            plainEnglish="A lock-off device physically stops the breaker being switched on. A tag tells anyone who sees it who locked it, when, and what they’re doing. Together they take the breaker out of anyone else’s hands."
            onSite="Personal padlock. Personal key. Key in your pocket — not on a shared ring, not in the CU, not on a hook. If two of you are working on the same circuit, both lock the same lock-off (multi-hasp), with each person’s own padlock and key."
          >
            <p>
              The detail of lock-off devices, multi-hasps, group lock boxes and tag systems is
              covered in §5.3. For the procedure, you need to know:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lock-off goes ON THE DEVICE</strong> you’ve just operated to off. Not the
                CU door. Not a nearby switch.
              </li>
              <li>
                <strong>Tag</strong> includes your name, the date, the circuit, and a contact
                number. Pre-printed laminated tags are clearer than scribbled biro.
              </li>
              <li>
                <strong>Your key, your pocket.</strong> If you walk away from site, the key walks
                away with you, and the lock-off stays. The HSE has investigated multiple deaths
                where the key was ‘left on the meter cupboard ledge’ and someone re-energised.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSE HSG85 — Electricity at work: Safe working practices"
            clause="The means used to isolate equipment and circuits should be capable of being secured (e.g. by use of a lock and key) in the off position. The key should be retained by the person carrying out the work or, if more than one person is involved, they should each apply their own lock to a multi-padlock fitting."
            meaning={
              <>
                One device, one lock per person involved. The HSE explicitly calls out the
                multi-padlock arrangement (often called a ‘hasp’) for jobs where more than one
                competent person is working on the same circuit. Anyone leaves before the work is
                done? Their lock stays on. The circuit doesn’t go live until the LAST padlock has
                come off.
              </>
            }
            cite="Reference: HSE HSG85 (Edition 4) Chapter 4 — Safe working procedures"
          />

          <SectionRule />

          <ContentEyebrow>Steps 4-6 — Prove, test, prove</ContentEyebrow>

          <ConceptBlock
            title="The middle three steps: the heart of the procedure"
            plainEnglish="Confirm your voltage indicator works, use it to test the circuit is dead, then confirm the indicator STILL works. If the second confirmation fails, your dead reading meant nothing."
            onSite="Proving unit lives on the same belt as the indicator. Two-second job each end. Skipping it has killed electricians who would otherwise still be on site."
          >
            <p>
              <strong>Step 4 — Prove.</strong> Put the voltage indicator across the proving
              unit’s output (or across a known live source — a socket on a confirmed-live circuit
              works in a pinch, but a proving unit is the safer default). Confirm both the AC and
              DC indicators (or the relevant voltage band on the indicator) light up.
            </p>
            <p>
              <strong>Step 5 — Test.</strong> At the actual point of work — not at the breaker —
              put the indicator across every relevant conductor combination. On a single-phase
              230 V circuit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Line to neutral</li>
              <li>Line to earth</li>
              <li>Neutral to earth</li>
            </ul>
            <p>
              All three should read 0 V (or whatever the indicator shows for ‘dead’). If any one
              reads anything significant, STOP. You’ve got a backfeed, a borrowed neutral, a wrong
              breaker, or a cable still in service somewhere upstream. Don’t carry on, don’t
              ‘assume it’s residual capacitance’ — investigate.
            </p>
            <p>
              <strong>Step 6 — Re-prove.</strong> Back to the proving unit. Confirm the indicator
              still lights. If it does, your dead reading at Step 5 is trustworthy. If it doesn’t,
              your indicator failed somewhere between Step 4 and Step 6 — which means your dead
              reading meant nothing, and you treat the circuit as live until you’ve replaced the
              indicator and re-done Steps 4-6.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE GS38 — Electrical test equipment for use on low-voltage electrical systems"
            clause="Voltage detectors should be proved on a proving unit before and after taking measurements. Test instruments and leads should be GS38 compliant — finger barriers/shrouds, exposed metal tip not exceeding 4 mm (preferably 2 mm), fused leads where appropriate."
            meaning={
              <>
                GS38 is the document that defines what counts as ‘safe’ test kit. For safe
                isolation that means: a two-pole voltage indicator (not a multimeter), fixed
                fused leads, finger guards and ≤4 mm exposed tip, and proving on a known source
                before AND after. We dig into the kit in §5.3 and §1.4.
              </>
            }
            cite="Reference: HSE GS38 (Edition 5) — Electrical test equipment for use on low-voltage systems"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Step 7 — Post warning notices</ContentEyebrow>

          <ConceptBlock
            title="Tell every other person on site what’s going on"
            onSite="Big yellow ‘Do Not Operate — Electrician Working’ sign on the CU door, with your name and a phone number. Brief the customer in person. If it’s a commercial site, tell the building manager or the responsible person."
          >
            <p>
              The padlock and tag on the device are for the device. The warning notice is for
              everyone else who might wander past — customers, cleaners, other trades, the
              supervisor, the apprentice that turns up to ‘help’.
            </p>
            <p>
              On a permit-to-work site (most large commercial / industrial work), this step also
              involves writing the isolation onto the permit and getting it counter-signed.
              Permit-to-work systems are covered separately in §5.4.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Proving on the meter then not re-proving on the proving unit afterwards"
            whatHappens={
              <>
                You prove the indicator on a known live source. You test the circuit, get a
                ‘dead’ reading on all three combinations, get on with the job. The indicator’s
                internal fuse blew silently somewhere between proving and testing — common
                failure on cheaper indicators. Your ‘dead’ reading was actually a ‘can’t read
                anything’ reading. The conductor was still live.
              </>
            }
            doInstead={
              <>
                Prove – test – prove. Every time. Every circuit. The whole procedure takes 30
                seconds and it’s the entire reason GS38 exists. If you only ever remember one
                thing from this section, make it ‘re-prove on the proving unit at the end’.
              </>
            }
          />

          <Scenario
            title="The borrowed neutral that wasn’t obvious"
            situation={
              <>
                A first-fix is being added to a 1960s house. You’ve identified the lighting
                circuit on the schedule, switched off the relevant MCB at the CU, locked it off
                with your padlock, posted a notice on the door. You prove your indicator on the
                proving unit, test the lighting circuit at the rose: L-E reads 0 V, L-N reads
                0 V, but N-E reads about 230 V.
              </>
            }
            whatToDo={
              <>
                Stop. That N-E reading means the neutral you’re looking at is sitting at line
                potential — almost certainly a borrowed neutral from the kitchen ring downstairs
                where someone in 1985 ran a downlight off the nearest convenient pair. Switch
                off the next likely circuit (kitchen ring), lock that off too with a separate
                padlock, re-test. When all three combinations finally read 0 V, you’re truly
                isolated. Update the schedule afterwards so the next electrician doesn’t have to
                rediscover it.
              </>
            }
            whyItMatters={
              <>
                A borrowed neutral is a textbook reason for testing N-E in addition to L-N and
                L-E. If you’d skipped that combination — common on rushed jobs — you would have
                worked on a ‘dead’ neutral that was actually carrying line voltage from another
                circuit. Same fatal outcome as touching a live line conductor.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Step 8/9 — Safe re-instatement</ContentEyebrow>

          <ConceptBlock
            title="Coming back live is part of the procedure too"
            plainEnglish="When the work’s done you reverse the steps. Remove your tools, button up the install, brief the customer, then remove the lock-off and re-energise. Confirm everything works as expected and nothing else got disturbed."
          >
            <p>The closing sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Confirm work is finished and tools are clear of the install.</li>
              <li>Replace covers and screws — leave nothing exposed.</li>
              <li>Brief the customer / responsible person that you’re about to re-energise.</li>
              <li>Remove your lock-off and tag (only the person who applied them removes them).</li>
              <li>Operate the device to ON — firmly.</li>
              <li>
                Function-test: confirm the circuit you worked on does what it’s supposed to
                (socket reads 230 V, light comes on the right switch, etc.).
              </li>
              <li>
                Glance at the rest of the board. Anything you nudged that needs resetting
                (clocks, alarms, immersion timers)?
              </li>
              <li>Remove the warning notice. Pack the lock-off kit back on the belt.</li>
            </ol>
            <p>
              Some employers and training providers count this as ‘Step 8’ or ‘Step 9’ of the
              procedure. NICEIC technical bulletins and JIB guidance both call it out as a
              required closing step — a ‘safe isolation’ that doesn’t end with safe re-instatement
              isn’t really finished.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Seven steps, in order: identify → switch off → secure → prove → test → re-prove → post notice. Every step exists to catch a failure of the previous one.",
              "‘Prove – test – prove’ is the heart of the procedure. The second prove confirms your indicator was still working when you tested.",
              "All three conductor combinations on single-phase 230 V: L-N, L-E, N-E. Skipping any one can hide a borrowed neutral or a backfeed.",
              "Personal control: your padlock, your key, your pocket. Multi-hasps for shared work — never share keys.",
              "The point of isolation must be a device suitable for isolation under BS 7671 Section 537 — securable in the off position. A flick switch isn’t.",
              "Safe re-instatement is part of the procedure: cover up, brief, re-energise, function-test, remove notice. ‘Done’ means the customer can use the install safely again.",
            ]}
          />

          <Quiz title="Safe isolation procedure knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section5/5-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Why safe isolation matters
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section5/5-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Lock-off, tag-out and prove–test–prove
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
