/**
 * Unit 306E · Understand the Principles of Inspection, Testing and Commissioning
 * Learning outcome: Understand the correct procedure for safe isolation
 * Criterion 3.1 — The safe isolation procedure
 *
 * Written to the Welsh criterion at Level 3, so the page teaches judgement as
 * well as sequence: isolation as a secured state rather than a switch position,
 * identifying the correct point of isolation, and what a third-year does when
 * the board schedule turns out to be wrong. The factual spine is the procedure
 * already taught in the Level 2 course — EAWR 1989 Regs 12/13/14, HSE GS38 and
 * HSG85, and BS 7671 Regulation 461.2.
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

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
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question: 'What is the very first step of the safe isolation procedure?',
    options: [
      'Identify the circuit and the point of isolation, and confirm nothing else can feed it',
      'Lock off the consumer unit before anything else is done',
      'Prove the voltage indicator on the proving unit',
      'Post the warning notice on the board',
    ],
    correctAnswer: 0,
    explanation:
      'Identification comes first — which device removes all supply, what voltage and how many phases, and whether any second source such as a UPS, PV, a generator or a borrowed neutral can put voltage back on it. Get this wrong and every later step is wasted.',
  },
  {
    id: 2,
    question: 'In prove – test – prove, what does the final prove actually confirm?',
    options: [
      'That the voltage indicator was still working when you tested the circuit',
      'That the circuit has been correctly re-energised',
      'That the lock-off padlock is still in place',
      'That every conductor combination has been tested',
    ],
    correctAnswer: 0,
    explanation:
      'The first prove shows the indicator works. You test the circuit. The second prove shows the indicator was still working at the moment you took that reading. If it has failed in between, your dead reading meant nothing — and you find that out before your hands are in the enclosure.',
  },
  {
    id: 3,
    question: 'On a 230 V single-phase circuit, which conductor combinations must you test?',
    options: [
      'Line to neutral, line to earth, and neutral to earth',
      'Line to neutral only',
      'Line to neutral and line to earth only',
      'Line to earth only, because the neutral is bonded',
    ],
    correctAnswer: 0,
    explanation:
      'All three. Line-neutral catches the obvious live conductor. Line-earth catches a broken neutral. Neutral-earth catches a borrowed neutral raised to line potential by another circuit. Miss one and you can be working on a conductor sitting at mains potential.',
  },
  {
    id: 4,
    question: 'Why is a multimeter set to AC volts not acceptable for proving dead?',
    options: [
      'It does not meet GS38 — no fixed function, exposed tips, fused leads that can fail silently',
      'It reads in millivolts, which is too imprecise for proving dead',
      'It can only test one conductor combination at a time',
      'It needs a calibration certificate before every single use',
    ],
    correctAnswer: 0,
    explanation:
      'A multimeter can read zero because the circuit is dead, or because it is on the wrong range or the wrong leads, or has a blown lead fuse. A two-pole voltage indicator has fixed function, shrouded probes with no more than 4 mm of exposed tip and current limiting. GS38 specifies it for that reason.',
  },
  {
    id: 5,
    question: 'Where does the lock-off key live while the work is in progress?',
    options: [
      'In the pocket of the person doing the work',
      'On the supervisor’s key ring',
      'In the consumer unit, so anyone can re-energise if needed',
      'On a hook next to the board',
    ],
    correctAnswer: 0,
    explanation:
      'Personal control. The lock stays on the device and the key stays on you until you are physically back at the device ready to re-instate. If someone else needs the circuit live, they have to find you — which is exactly the conversation that should be happening.',
  },
  {
    id: 6,
    question: 'What is the difference between switching off and isolation?',
    options: [
      'Isolation is secure separation from every source of supply, with provision to maintain that separation',
      'They are the same thing described in two different ways',
      'Isolation only applies to three-phase equipment; switching off covers single-phase',
      'Isolation means the device is off; switching off means the fuse has been removed',
    ],
    correctAnswer: 0,
    explanation:
      'Switching off makes equipment non-functional. It does not guarantee separation from the supply and it does not stop anyone putting it back on. That same MCB with a lockout device, a padlock, the key in your pocket and a warning notice is isolated.',
  },
  {
    id: 7,
    question:
      'You are proving dead on a lighting circuit. L-N and L-E both read zero, but N-E reads about 230 V. What do you do?',
    options: [
      'Stop and investigate — the neutral is almost certainly borrowed from another circuit',
      'Carry on — two out of three readings are zero, so the circuit is dead',
      'Record it as residual capacitance and continue with the work',
      'Disconnect the neutral at the accessory and then start work',
    ],
    correctAnswer: 0,
    explanation:
      'A neutral at line potential means it is shared with a circuit you have not isolated. Find that circuit, lock it off separately, re-test until all three combinations read zero, and update the schedule so the next person does not have to rediscover it.',
  },
  {
    id: 8,
    question: 'Mid-job you leave the property for twenty minutes. What happens to the isolation?',
    options: [
      'The lock stays on the device and the key goes with you',
      'Leave the key in the lock so a colleague can re-energise if needed',
      'Remove the lock-off so the customer is not inconvenienced',
      'Hand the key to the site supervisor while you are away',
    ],
    correctAnswer: 0,
    explanation:
      'The lock does not come off until you are back at the device with the key, ready to re-instate. HSE investigations into fatal incidents repeatedly find a key that was left behind and a circuit that someone else put back on.',
  },
];

export default function Lesson306e_3_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Isolation is a secured state, not a switch position. Off plus a lockout device plus your padlock plus your key plus a warning notice is isolation. Off on its own is not.',
          'The order is fixed: identify, notify, prove the indicator, isolate, lock and label, test for dead at the point of work, re-prove the indicator, then record. Every step closes a failure mode that has killed someone.',
          'Test every conductor combination at the point of work — three on single-phase, ten on three-phase. Prove – test – prove around every one of them.',
          'At Level 3 the judgement is in step one: proving that the device you are about to lock off is genuinely the only thing feeding the circuit you are about to open up.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the safe isolation procedure in the correct order, from identifying the point of isolation through to posting the warning notice and re-instating.',
          'Explain why isolation is a secured state rather than a switch position, and how EAWR 1989 Regulations 12, 13 and 14 frame that duty.',
          'Identify the correct point of isolation for a given circuit and confirm that no second source of supply can back-feed it.',
          'Apply prove – test – prove with a GS38-compliant two-pole voltage indicator and a proving unit, and explain what each prove confirms.',
          'Decide what to do when the board schedule does not match the circuit in front of you, and what has to change before any work starts.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What isolation actually means</ContentEyebrow>

      <ConceptBlock
        title="Isolation is a state, not a switch position"
        plainEnglish="Switching off makes equipment stop working. Isolation is the secure separation of that equipment from every source of supply, with something in place to keep it separated while you work."
      >
        <p>
          The Electricity at Work Regulations 1989 draw the line for you. Regulation 12 requires
          suitable means to cut off the supply and to isolate equipment, suitably located,
          identified and — where appropriate — capable of being secured. Regulation 13 requires
          adequate precautions to stop equipment that has been made dead from becoming charged again
          while work is going on. Regulation 14 all but prohibits live work.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Regulation 12.</strong> The means of isolation has to exist, be identified, be
            reachable, and be securable. An older board with unlabelled ways and no lockable devices
            does not satisfy it, and that is a finding in its own right.
          </li>
          <li>
            <strong>Regulation 13.</strong> This is the lockout regulation. A switched-off MCB is
            not an adequate precaution by itself, because you, the customer, another trade or a
            child can switch it back on.
          </li>
          <li>
            <strong>Regulation 14.</strong> Live work is permitted only where all three conditions
            are met: it is unreasonable for the equipment to be dead, it is reasonable to work on it
            live, and suitable precautions are taken. For installation work all three almost never
            hold, so the equipment is made dead.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The sequence</ContentEyebrow>

      <ConceptBlock
        title="The steps, in this order"
        onSite="Different centres and employers chunk the same procedure as seven steps or nine. Nothing changes on the ground — the nine-step version simply names the prove and the re-prove separately and adds a closing step for safe re-instatement."
      >
        <p>
          Learn it as a sequence, not a list. Each step exists to catch a failure of the one before
          it, which is why re-ordering them quietly removes a safety net:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Identify.</strong> The circuit or installation to be isolated, the point of
            isolation, the voltage and number of phases, and every possible source of supply.
          </li>
          <li>
            <strong>Notify.</strong> The customer, the responsible person, other trades, anyone
            downstream of the supply you are about to interrupt.
          </li>
          <li>
            <strong>Prove the indicator,</strong> on a proving unit or a known live source, then
            <strong> isolate</strong> — device firmly to off, switch opened, or fuse removed.
          </li>
          <li>
            <strong>Lock and label.</strong> Lockout device, your padlock, your key, warning notice.
          </li>
          <li>
            <strong>Test for dead at the point of work.</strong> Every conductor combination, at the
            place you are going to open up — not at the board.
          </li>
          <li>
            <strong>Re-prove the indicator.</strong> Back on the proving unit.
          </li>
          <li>
            <strong>Polarity and record.</strong> Confirm line, neutral and earth are where they
            should be, then log the isolation on the permit, work log or test record.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Getting the right device</ContentEyebrow>

      <ConceptBlock
        title="Step one is the one that goes wrong"
        plainEnglish="Before you touch a switch, know exactly which device removes all supply from the circuit you are working on, and satisfy yourself that nothing else can put voltage back on it."
        onSite="Open the board and look. Do not trust the label. Trace the cable, ring the circuit out with a circuit identifier, or put a load on it and watch what dies. Probably the right one is not identification."
      >
        <p>Four things have to be true before you operate anything:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The right device.</strong> Cross-reference the schedule, the label and a load
            test or circuit tracer. Switch the device and watch the thing you intend to work on go
            dead — at the load, not at a label on a door.
          </li>
          <li>
            <strong>The whole supply.</strong> UPS-fed sub-mains, PV inverters, standby generators,
            two-way switching fed from a second board and the classic borrowed neutral are all real
            back-feed paths.
          </li>
          <li>
            <strong>The voltage and the phases.</strong> Single-phase at 230 V, three-phase at 400
            V, or DC. Bring the wrong indicator and the procedure falls apart at step three.
          </li>
          <li>
            <strong>That the device is suitable for isolation.</strong> It has to disconnect all
            live supply conductors and be securable in the off position. A functional switch — a
            light switch, a plug, a contactor control — is not a point of isolation.
          </li>
        </ul>
        <p>
          A point of isolation is the single device that, operated, removes every source of supply.
          On a final circuit that is usually the MCB or RCBO; on a sub-main a switch-disconnector or
          main switch; on fixed equipment a dedicated rotary isolator within sight of the work.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Electricity at Work Regulations 1989 — Regulation 13 (Precautions for work on equipment made dead)"
        clause="Adequate precautions shall be taken to prevent electrical equipment, which has been made dead in order to prevent danger while work is carried out on or near that equipment, from becoming electrically charged during that work if danger may thereby arise."
        meaning="This is the regulation that requires lockout. Once equipment has been made dead you must take adequate precautions to stop it becoming live again while you work on it. In practice that means a lockout device plus a padlock plus a warning notice, or removal of the fuse and retention of it in your own custody. A switched-off MCB on its own does not meet the test, because anybody walking past the board can undo it."
        cite="Source: Electricity at Work Regulations 1989, Regulation 13 (verbatim)."
      />

      <InlineCheck
        id="306e-3-1-check-1"
        question="A circuit is fed from a board in the plant room and is also picked up by a two-way arrangement from a second board on the floor above. What does that change?"
        options={[
          'Nothing — the device at the plant room board is still the point of isolation',
          'You can isolate at either board, whichever is closer to the point of work',
          'There is no single point of isolation, so every source has to be isolated and locked off before the circuit is dead',
          'You isolate the plant room board and rely on proving dead to catch the second supply',
        ]}
        correctIndex={2}
        explanation="A point of isolation is the device that removes ALL sources of supply. Where two supplies exist, no single device does that, so each source is isolated and locked off separately — a padlock on each. Proving dead is a check on the isolation, not a substitute for identifying it; relying on it to catch a second supply means you only find the problem when your indicator lights up."
      />

      <SectionRule />

      <ContentEyebrow>When the schedule is wrong</ContentEyebrow>

      <ConceptBlock
        title="The board schedule is evidence, not proof"
        plainEnglish="A circuit chart tells you what somebody believed when they wrote it. On an installation that has been altered, extended or repaired, that belief may be years out of date."
        onSite="Older properties are the common case. A lighting point fed from the nearest convenient pair, a spur added off a ring and never recorded, a way relabelled after a board change but not retraced. None of it shows on the chart."
      >
        <p>What to do when the chart and the installation disagree:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Stop before switching.</strong> Resolve the identification first. Plug a lamp
            into the suspect circuit and switch devices one at a time. Follow the cable. Use a
            circuit tracer where the cable is in conduit or trunking.
          </li>
          <li>
            <strong>Widen the isolation.</strong> Where a circuit is genuinely shared — a borrowed
            neutral is the classic — you isolate and lock off every device involved, not just the
            one the chart names.
          </li>
          <li>
            <strong>Correct the record.</strong> Update the circuit chart as part of the work and
            document the error you found. Leaving it wrong means the next person repeats your
            afternoon.
          </li>
        </ul>
        <p>
          This is what the criterion is really asking for. Carrying out the procedure is the easy
          half. You are expected to notice that the installation is not what the paperwork says and
          to change what you do about it.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 537.2.7"
        clause="537.2.7 Each device used for isolation shall be clearly identified by position or durable marking to indicate the installation or circuit it isolates."
        meaning="The identification is a requirement on the installation, not a courtesy from whoever wired it &mdash; which is why an unlabelled or wrongly labelled way is a defect you record, not just an inconvenience you work around. It also tells you the standard of the record you leave behind: durable marking, meaning something that will still be legible and still be attached years from now, not pencil on the inside of the lid."
        cite="BS 7671 Part 5, Chapter 53, Section 537 — Regulation 537.2.7"
      />

      <SectionRule />

      <ContentEyebrow>Securing the isolation</ContentEyebrow>

      <ConceptBlock
        title="Lock, key, label, notice"
        plainEnglish="A lockout device physically stops the breaker being operated. A label says who locked it, when, and how to reach them. A notice tells everyone else in the building to leave it alone."
        onSite="Lockout clips come in different profiles for different breaker ranges — carry a small selection. Ideally every technician carries their own colour of padlock, so it is obvious whose lock is on a board."
      >
        <p>The rules that do not bend:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The lockout goes on the device you operated.</strong> Not the enclosure door,
            not a nearby switch.
          </li>
          <li>
            <strong>Your padlock, your key, your pocket.</strong> No shared rings. No key left on
            the meter cupboard ledge.
          </li>
          <li>
            <strong>More than one person on the circuit means more than one lock.</strong> A
            multi-padlock fitting takes one padlock per person, and the circuit does not go live
            until the last one comes off.
          </li>
          <li>
            <strong>Where the device cannot be locked</strong> — an older pull-out fuse carrier, for
            instance — remove the carrier, keep it on you, and post a notice on the empty fuseway.
            The outcome is the same: the circuit cannot be re-energised without you present.
          </li>
          <li>
            <strong>The notice carries information.</strong> Caution, do not switch, work in
            progress, plus date, time, your name and a contact number, positioned where anyone
            approaching the device will see it.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 537.2.4"
        clause="537.2.4 Devices for isolation shall be selected and/or installed so as to prevent unwanted or unintentional closure (see Regulation 462.3). This may be achieved by locating the device in a lockable space or lockable enclosure or by padlocking or by other suitable means."
        meaning="The requirement is the outcome &mdash; the device cannot be closed by accident or by someone who does not know you are on the circuit &mdash; and the padlock is only one of the ways named to get there. That is what covers you when the device will not take a lockout clip: a lockable enclosure, or removing the fuse carrier and keeping it on you, are recognised routes to the same result. What is not a route is relying on a notice by itself."
        cite="BS 7671 Part 5, Chapter 53, Section 537 — Regulation 537.2.4"
      />

      <SectionRule />

      <ContentEyebrow>Prove, test, prove</ContentEyebrow>

      <ConceptBlock
        title="The three steps that carry the whole procedure"
        plainEnglish="Confirm the indicator works. Use it to test the circuit. Confirm the indicator still works. If the last confirmation fails, the dead reading in the middle meant nothing."
        onSite="The proving unit lives on the same belt as the indicator. It generates a known reference voltage, so you are not hunting for a live socket on a board you have just switched off."
      >
        <p>
          <strong>Prove.</strong> Put the indicator across the proving unit output. Confirm the
          indication — the LED bar and the audible buzzer both. If either fails, the indicator is
          out of service and you do not proceed.
        </p>
        <p>
          <strong>Test.</strong> At the actual point of work, not at the board. Every relevant
          conductor combination. Testing at the point of work is what catches a wrong-circuit
          isolation, a back-feed, and a conductor landed on the wrong terminal.
        </p>
        <p>
          <strong>Re-prove.</strong> Back on the proving unit. A silent failure between the first
          prove and the test — a lead broken internally, a cell that has gone flat — turns a dead
          reading into a cannot-read-anything reading, and the two look identical. If the re-prove
          fails, treat the circuit as live, replace the indicator, and start the three steps again.
        </p>
        <p>
          <strong>The instrument.</strong> GS38 is the HSE guidance that defines what counts as safe
          test equipment for this job. A two-pole voltage indicator meets it. A multimeter and a
          socket tester do not. The characteristics that matter:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Shrouded probes.</strong> No more than 4 mm of metal exposed at the tip, and
            preferably 2 mm, with the rest insulated.
          </li>
          <li>
            <strong>Current limiting.</strong> The indicator draws minimal current, so contact with
            a live source does not draw a fault current that endangers you.
          </li>
          <li>
            <strong>Fixed function.</strong> No range dial to be left on the wrong setting. There is
            no way to use it incorrectly.
          </li>
          <li>
            <strong>Visible and audible indication, and no user-replaceable fuses.</strong> Both
            indications have to work, and there is no lead fuse that can blow and make a live
            conductor read as dead.
          </li>
        </ul>
        <p>
          A socket tester confirms a socket is wired correctly and live; it cannot prove dead. A
          multimeter can read zero for half a dozen reasons unrelated to the circuit. Neither
          belongs in a safe isolation.
        </p>
      </ConceptBlock>

      <VideoCard {...videos.safeIsolation} />

      <InlineCheck
        id="306e-3-1-check-2"
        question="You prove the indicator, test the circuit dead at the point of work, then find the indicator will not respond on the proving unit. What is the correct response?"
        options={[
          'Treat the circuit as live, replace the indicator, and repeat the prove, test and re-prove',
          'Accept the dead reading — the indicator was working when the reading was taken',
          'Record the fault and carry on, since the circuit is locked off anyway',
          'Prove the indicator on a live socket instead and accept whichever result agrees',
        ]}
        correctIndex={0}
        explanation="A failed re-prove tells you the indicator may have been dead at the moment you tested, in which case the zero reading was the instrument, not the circuit. The lockout does not help — the circuit could be fed from somewhere you have not isolated. Replace the indicator and run the three steps again from the start."
      />

      <SectionRule />

      <ContentEyebrow>Reading the result</ContentEyebrow>

      <ConceptBlock
        title="Every combination, and what a non-zero reading is telling you"
        plainEnglish="Three tests on single-phase, ten on three-phase, all taken at the point of work. Any reading that is not zero stops the job."
      >
        <p>
          On a 230 V single-phase circuit you test line to neutral, line to earth, and neutral to
          earth. On 400 V three-phase you test L1-L2, L1-L3, L2-L3, each line to neutral, each line
          to earth, and neutral to earth — ten combinations. The procedure does not change; the
          number of tests does.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>L-N reads voltage.</strong> The circuit is still fed. Wrong device, or a second
            supply.
          </li>
          <li>
            <strong>L-E reads voltage with L-N at zero.</strong> Suspect an open neutral somewhere
            upstream of the point of work.
          </li>
          <li>
            <strong>N-E reads voltage.</strong> The neutral is shared with a circuit that is still
            live. This is the borrowed neutral, and it is the reason N-E is tested at all.
          </li>
          <li>
            <strong>A small N-E reading on a TT installation.</strong> TT relies on its own earth
            electrode rather than the supply earth, so N-E can sit a few volts off zero even when
            the circuit is dead. Anything that looks odd still stops the job.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Locking off the device the chart names rather than the device that feeds the circuit"
        whatHappens={
          <>
            You are working in a sub-board with vague labelling. You snap what you believe is the
            correct MCB to off, hang your padlock on it, and start. It was not the device feeding
            your circuit — the customer loses their kettle instead, and your lighting circuit read
            dead only because someone had switched it off at the wall. The moment that switch is
            flicked, the conductors in your hand are live and your padlock is on the wrong breaker.
          </>
        }
        doInstead={
          <>
            Identify by proving, not by reading. Put a load on the circuit, switch the candidate
            device, and watch that load die — at the load, not at a label. Then lock off, then prove
            dead at the point of work. A padlock on an unidentified breaker is a padlock, not an
            isolation.
          </>
        }
      />

      <CommonMistake
        title="Taking somebody else&rsquo;s lock off to get the job finished"
        whatHappens={
          <>
            Two of you have been working on the same dead board all afternoon, each with a padlock on
            the multi-padlock fitting. You finish, your mate has gone to the van or gone home, and
            the customer wants their supply back. The lock that is left looks like a formality, so it
            comes off — cut, or opened with the spare key that lives in the office — and the device
            goes back on. What nobody in the building knows is whether the other person is genuinely
            clear of the work. The second lock was never a formality; it was the one thing keeping
            the circuit dead for someone who is not stood in front of you, and the same thing happens
            in a smaller way every time a key gets left on the meter cupboard ledge or a padlock is
            shared off one ring.
          </>
        }
        doInstead={
          <>
            One lock per person, each with their own key in their own pocket, and only the person who
            applied a lock removes it. If somebody has left site with a lock on, the circuit stays
            dead until they come back or attend to it themselves — that is the whole point of the
            arrangement, and it is a conversation with the customer rather than a problem to solve
            with bolt croppers. Work the re-instatement in order when the time comes: confirm the
            work is finished and the covers are back on, brief the customer or responsible person
            that you are about to re-energise, remove your own lock and tag, switch on firmly, then
            function-test what you worked on before you take the notice down and record the
            isolation.
          </>
        }
      />

      <Scenario
        title="Caernarfon — the flat above the shop with two boards"
        situation={
          <>
            A first-floor flat over a retail unit in Caernarfon, replacing a damaged double socket
            in the back bedroom. The flat has its own board in the hall cupboard; the shop has a
            separate board downstairs. The hall chart lists bedroom sockets on way 4. You switch way
            4 off, lock it, and prove dead at the socket: L-N zero, L-E zero, N-E about 230 V.
          </>
        }
        whatToDo={
          <>
            Stop and treat the neutral as live, because it is. That reading says the neutral is
            shared with a circuit you have not isolated. Switch off the other likely ways in the
            hall board one at a time, re-testing at the socket after each. If nothing there clears
            it, the shared conductor comes from the shop board downstairs — a real possibility in a
            converted building — and that circuit has to be identified, isolated, locked off with a
            second padlock, and the occupier told before the supply goes off. Only when all three
            combinations read zero, indicator re-proved, does the socket come off the wall. Correct
            the chart before you leave.
          </>
        }
        whyItMatters={
          <>
            Skipping neutral to earth is the shortcut that hides this. Two zero readings feel like a
            dead circuit and the third test takes five seconds. A borrowed neutral carries line
            potential on a conductor everyone assumes is safe. It also matters for what comes next:
            a shared neutral between two installations is a defect in its own right, and the
            customer needs that in writing rather than hearing that the socket is done.
          </>
        }
      />

      <InlineCheck
        id="306e-3-1-check-3"
        question="Which of these is a valid point of isolation for a fixed hob supplied from a dedicated radial?"
        options={[
          'The cooker control switch on the wall beside the hob',
          'The plug top, unplugged and left on the worktop',
          'The kitchen light switch, because it is on the same floor',
          'A dedicated isolator or the circuit protective device, provided it disconnects all live supply conductors and can be secured in the off position',
        ]}
        correctIndex={3}
        explanation="The test is whether the device removes every source of supply and can be locked in the off position. A cooker control switch is a functional switch, so it fails the securing test even though it interrupts the supply. An unplugged plug top is not relevant to a fixed radial. The protective device at the board, or a dedicated lockable isolator within sight of the work, is what qualifies."
      />

      <SectionRule />

      <ContentEyebrow>Putting it back</ContentEyebrow>

      <ConceptBlock
        title="Re-instatement and the record"
        plainEnglish="Coming back live is part of the procedure. You reverse the steps in order, confirm the installation works, and write down what you did."
      >
        <p>The closing sequence:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Confirm the work is finished,</strong> tools clear, covers and fixings back on
            with nothing left exposed.
          </li>
          <li>
            <strong>Brief the customer or responsible person</strong> that you are about to
            re-energise.
          </li>
          <li>
            <strong>Remove your own lock and tag.</strong> Only the person who applied them removes
            them.
          </li>
          <li>
            <strong>Operate the device to on, firmly,</strong> then function-test what you worked on
            and glance over the rest of the board for anything you disturbed.
          </li>
          <li>
            <strong>Remove the notice and record the isolation</strong> — circuit, method, times
            isolated and restored, instruments used, readings taken, your name. On a permit site
            that record is what closes the permit.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Why do some books say seven steps and others say nine?',
            answer:
              'Same procedure, different chunking. The seven-step version treats prove, test and re-prove as a single prove dead step; the nine-step version names them separately and adds safe re-instatement at the end. Use whichever numbering your centre or employer asks for, and make sure nothing drops out of the middle.',
          },
          {
            question: 'Do I really need the full procedure to change a faceplate?',
            answer:
              'Yes, every time. Faceplate swaps are where complacency does its damage — backed-out tails, a broken neutral, a mislabelled breaker all apply at an accessory as much as at a board. The procedure is proportionate to the consequence of getting it wrong, not to how long the job takes.',
          },
          {
            question: 'How does the procedure change for three-phase work?',
            answer:
              'The steps are identical; the test set is larger. On 400 V three-phase you prove dead across L1-L2, L1-L3, L2-L3, each line to neutral, each line to earth, and neutral to earth — ten combinations rather than three. The reason the extra tests matter is that a wrong-circuit isolation on a three-phase board can leave 400 V between two conductors at the point of work.',
          },
          {
            question: 'What if the only device I can isolate at is not lockable?',
            answer:
              'Remove the means of supply and keep it with you. On an older installation with a pull-out fuse carrier, take the carrier out, put it in your toolbox, and post a notice on the empty fuseway. That is a recognised method where no lockable device is fitted and it achieves the same outcome — nobody can re-energise the circuit without you being there. If the installation has no adequate means of isolation at all, that is a defect to report, not a problem to work around.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Isolation is secure separation from every source of supply, held in place while you work. Off is not isolated.',
          'EAWR Regulation 12 requires the means of isolation, Regulation 13 requires the precautions that keep it isolated, and Regulation 14 makes live work an exception that has to be justified.',
          'Identification is the step that decides whether the rest of the procedure is worth anything. Prove the device by watching the load die, not by reading a label.',
          'The board schedule is evidence, not proof. On an altered installation, expect it to be wrong and plan the isolation around what you can demonstrate.',
          'Prove – test – prove every time. The second prove is what makes the dead reading trustworthy.',
          'Test at the point of work, not at the board — three combinations single-phase, ten three-phase. Any non-zero reading stops the job.',
          'Your padlock, your key, your pocket. One lock per person on a multi-padlock fitting, and the circuit stays dead until the last lock comes off.',
          'Finish the job properly: re-instate, function-test, remove the notice, and record the isolation with the instruments used and the readings taken.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="The safe isolation procedure" />
    </div>
  );
}
