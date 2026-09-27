/**
 * Unit 317E — Inspection, Testing and Commissioning of Electrical Installations
 * Learning Outcome 2 — Initial verification
 * Criterion 2.2 — The application of the human senses for initial verification
 *
 * Approach: teach the part of verification that happens before any instrument comes out of
 * the case. Sight does most of the work, smell and hearing catch what sight misses, touch is
 * used sparingly and only where it is safe, and taste has no part in it at all. The lesson
 * closes on the limits of the senses and on recording what was found.
 *
 * This criterion was a gap: no existing lesson in our courses covers the use of the human
 * senses in initial verification, so this page is the only place a learner meets it.
 *
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
} from '@/components/study-centre/learning';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question: 'In initial verification, what is the normal relationship between inspection and testing?',
    options: [
      'Inspection normally precedes testing, and much of it is done with the installation disconnected',
      'Testing is carried out first so inspection can concentrate on the failures',
      'Inspection and testing are alternatives and only one of them is required',
      'Inspection is carried out only if the tests produce an unexpected result',
    ],
    correctAnswer: 0,
    explanation:
      'Inspection comes first, and much of it is done with the installation disconnected from the supply. It tells you what has been installed and where the problems are likely to be, which is what makes the testing that follows meaningful.',
  },
  {
    id: 2,
    question: 'Which of the five senses has no part to play in electrical inspection?',
    options: ['Taste', 'Smell', 'Hearing', 'Touch'],
    correctAnswer: 0,
    explanation:
      'Taste is not a sense used in electrical inspection. Nothing in an installation should ever be tasted. Sight, smell, hearing and a disciplined use of touch are the four that apply.',
  },
  {
    id: 3,
    question: 'You smell hot plastic near a distribution board during an inspection. What is the correct response?',
    options: [
      'Stop, investigate the source and establish the cause before going any further',
      'Note it on the schedule and continue with the remaining inspection items',
      'Ignore it because new equipment often smells when first energised',
      'Open the board and touch the terminals to find the warm one',
    ],
    correctAnswer: 0,
    explanation:
      'A burnt or hot-plastic smell near a board is a symptom of something overheating. It is a reason to stop and investigate, not a reason to carry on. You do not find the source by touching terminals.',
  },
  {
    id: 4,
    question: 'Which BS 7671 regulation establishes the minimum scope of the inspection?',
    options: [
      'Regulation 642.3 — the inspection shall include at least the checking of the listed items',
      'Regulation 512.2.1 — equipment shall be of a design appropriate to the situation',
      'Regulation 708.55.1.1(a) — pitch socket-outlets shall be interlocked',
      'There is no regulation setting a minimum scope for inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 642.3 states that the inspection shall include at least the checking of the listed items where relevant. It establishes the minimum scope of visual and documented inspection tasks to be performed prior to and during testing.',
  },
  {
    id: 5,
    question: 'Which of these is a listed inspection item under Regulation 642.3?',
    options: [
      'Routing of cables in prescribed zones, or protection against mechanical damage, per Section 522',
      'The insulation resistance value measured between live conductors and earth',
      'The measured earth fault loop impedance at the furthest point of each circuit',
      'The prospective fault current at the origin of the installation',
    ],
    correctAnswer: 0,
    explanation:
      'Routing of cables in prescribed zones, or protection against mechanical damage in compliance with Section 522, is one of the listed items. The other three are measured values obtained by testing, not by inspection.',
  },
  {
    id: 6,
    question: 'What is the correct discipline for using touch during an inspection?',
    options: [
      'Use it only where it is safe, never to test for the presence of voltage, and prove dead first',
      'Use it freely, because the back of the hand is safe on any enclosure',
      'Use it to confirm whether a circuit is live before starting work',
      'Avoid it completely, because touch has no diagnostic value at all',
    ],
    correctAnswer: 0,
    explanation:
      'Touch can tell you about warmth on an enclosure, unexpected vibration or an accessory that moves when handled. It is never used to establish whether something is live. Prove dead with an approved voltage indicator, and never touch anything that may be live.',
  },
  {
    id: 7,
    question: 'What is the fundamental limitation of inspection by the senses?',
    options: [
      'The senses detect symptoms, not values, so they cannot replace a single measurement',
      'The senses are only reliable in daylight',
      'The senses can measure insulation resistance but not loop impedance',
      'The senses are only used on domestic installations',
    ],
    correctAnswer: 0,
    explanation:
      'Your eyes, ears, nose and hands find symptoms. They cannot give you an insulation resistance value or an earth fault loop impedance. A perfect visual inspection does not replace a single test, and a perfect set of results does not replace the inspection.',
  },
  {
    id: 8,
    question: 'What changed for Appendix 6 under Amendment 4?',
    options: [
      'The schedule of inspections was simplified, and a new example checklist was added as guidance only',
      'The schedule of inspections was removed entirely from BS 7671',
      'The example checklist became a mandatory certificate attachment',
      'Appendix 6 was reissued as a separate British Standard',
    ],
    correctAnswer: 0,
    explanation:
      'The Appendix 6 schedule of inspections has been simplified for initial verification. A new example checklist of items requiring inspection during initial verification has been added to Appendix 6 but is not required to be provided with the certificate. The checklist is guidance only.',
  },
];

export default function Lesson317e_2_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Inspection comes first and it is done with your eyes, ears, nose and hands. An instrument gives you a number; your senses tell you where to point it.',
          'Sight does most of the work: damage, connections, identification of conductors, routing, missing barriers and covers, signs of overheating, labels and workmanship.',
          'Smell catches what you cannot see. Hot insulation and overheated plastics have a characteristic smell, and a burnt smell near a board is a reason to stop.',
          'Hearing picks up arcing, buzzing, a contactor chattering or a transformer note that has changed — and the silence of something that should be running.',
          'Touch is used with great care, only where it is safe, and never to test for the presence of voltage. Taste is not a sense used in electrical inspection at all.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain why inspection precedes testing in initial verification, and why much of it is carried out with the installation disconnected.',
          'Describe how sight, smell, hearing and touch are each applied during inspection, and give concrete examples of what each one detects.',
          'State clearly that taste has no application in electrical inspection, and explain the discipline that governs the use of touch.',
          'Identify the items that Regulation 642.3 requires to be checked, and relate them to what your eyes are actually looking at on site.',
          'Explain the limits of sensory inspection, and why findings must be recorded before anyone can act on them.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Inspection before testing</ContentEyebrow>

      <ConceptBlock
        title="Inspection first, instruments later"
        plainEnglish="Before a lead comes out of the test kit, you walk the job and look at it. That is not a warm-up; it is the first half of verification."
      >
        <p>
          Initial verification is inspection and testing, and the order matters. Inspection normally
          precedes testing, and much of it is carried out with the installation disconnected from the
          supply so covers can come off safely. An instrument gives you a number. It does not tell
          you that the number is being measured on the wrong circuit, that there is a scorch mark
          above the terminal, or that the cable disappears into a wall outside any permitted zone. A
          tester in the hands of somebody who has not looked at the installation produces numbers,
          not verification.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Inspection sets the agenda.</strong> What you find by looking decides what you
            test hardest and where you go first.
          </li>
          <li>
            <strong>Much of it is done dead.</strong> Covers off, enclosures open, terminations
            visible — safely, because the installation is isolated.
          </li>
          <li>
            <strong>Some of it needs the supply on.</strong> Sounds, smells under load and the
            behaviour of switchgear come later, with the appropriate precautions.
          </li>
          <li>
            <strong>Neither half stands alone.</strong> Inspection without testing misses values.
            Testing without inspection misses everything a number cannot show.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 642.1"
        clause="642.1 Inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply."
        meaning="Two instructions in one line. Looking comes first, so the defects your eyes can find are dealt with before an instrument is asked to find them. And it is done dead as the normal case &mdash; which is what makes a proper look possible at all, because covers come off and you get your eyes on terminations rather than peering at a closed board. The checks that genuinely need the supply on come afterwards, deliberately, with the precautions that go with live working."
        cite="BS 7671 Part 6, Chapter 64, Section 642 — Regulation 642.1"
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 642.3"
        meaning="The inspection shall include at least the checking of the listed items where relevant. This establishes the minimum scope of visual and documented inspection tasks to be performed on electrical installations prior to and during testing — it is the floor of what your eyes must cover, not the ceiling."
        cite="BS 7671 Part 6, Chapter 64"
      />

      <SectionRule />

      <ContentEyebrow>Using your eyes</ContentEyebrow>

      <ConceptBlock
        title="Sight — the workhorse"
        plainEnglish="Most of what is wrong with an installation can be seen by somebody who slows down and actually looks."
      >
        <p>
          Sight finds more defects than every other sense put together. The skill is not eyesight, it
          is discipline: taking the cover off rather than assuming, following the cable rather than
          glancing at both ends, and looking at the thing in front of you rather than the thing you
          expected to see. A scorch mark above a terminal is the classic example — the circuit may
          test perfectly, and no instrument in your case will find that mark if you never take the
          cover off.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Damage.</strong> Cracked enclosures, split sheath, crushed conduit, nicked
            conductors at a termination, a knockout with no grommet.
          </li>
          <li>
            <strong>Connections.</strong> Conductors in the right terminals, no insulation trapped
            under a screw, no copper showing beyond the terminal, no strands left out.
          </li>
          <li>
            <strong>Identification.</strong> Conductors identified correctly and consistently, at
            every point including where identification has been changed.
          </li>
          <li>
            <strong>Routing.</strong> Cables in permitted zones, or otherwise protected against
            mechanical damage. Follow the run, do not assume it.
          </li>
          <li>
            <strong>Barriers and covers.</strong> Blanks in unused ways, gland plates fitted, shrouds
            in place, nothing open where fingers can reach.
          </li>
          <li>
            <strong>Signs of overheating.</strong> Discolouration, browning, distorted plastics,
            scorching above a terminal, a bulged or blistered enclosure face.
          </li>
          <li>
            <strong>Labels and notices.</strong> Circuit identification, warning notices and the
            information a future electrician needs to work on it safely.
          </li>
          <li>
            <strong>Workmanship.</strong> Support and fixing, cable dressing, glands tightened,
            enclosures square. Untidy work is often a signal about what you cannot see.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="What your eyes are actually checking"
        onSite="Regulation 642.3 lists the minimum. Read it as your route around the job, not as paperwork."
      >
        <p>
          Each listed item is something you walk up to and look at. Learn them as a route and the
          inspection stops being a memory test.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>(a) Connection of conductors.</strong> Every termination you can reach: tight,
            correct, no stray strands, no insulation in the clamp.
          </li>
          <li>
            <strong>(b) Identification of conductors.</strong> Consistent and correct throughout, at
            every accessory, board and joint.
          </li>
          <li>
            <strong>(c) Routing of cables in prescribed zones, or protection against mechanical
            damage, in compliance with Section 522.</strong> Where does it run, and if not in a
            permitted zone, what is protecting it.
          </li>
          <li>
            <strong>(d) Selection of conductors for current-carrying capacity and voltage drop, in
            accordance with the design.</strong> What has been installed against what the design
            said — an inspection against paperwork as much as against cable.
          </li>
          <li>
            <strong>(e) Connection of single-pole devices for protection or switching in line
            conductors only.</strong> Nothing single-pole sitting in a neutral.
          </li>
          <li>
            <strong>(f) Correct connection of accessories and equipment.</strong> Socket-outlets,
            switches, luminaires and fixed appliances wired as intended and as marked.
          </li>
          <li>
            <strong>(g) Presence of fire barriers, suitable seals and protection against thermal
            effects.</strong> Holes through fire-rated construction made good, seals present.
          </li>
          <li>
            <strong>(h) Methods of protection against electric shock.</strong> Including SELV, PELV,
            double or reinforced insulation, barriers, enclosures, obstacles and placing out of
            reach.
          </li>
          <li>
            <strong>(k) Presence of undervoltage protective devices.</strong> Where the design calls
            for them, are they there and connected.
          </li>
        </ul>
        <p>
          Amendment 4 also changed the supporting material. The Appendix 6 schedule of inspections
          has been simplified for initial verification, and a new example checklist of items
          requiring inspection during initial verification has been added to Appendix 6 but is not
          required to be provided with the certificate. That checklist is guidance only — useful to
          work to, but Regulation 642.3 sets the minimum scope.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="317e-2-2-check-1"
        question="Which of these findings would be identified by inspection rather than by testing?"
        options={[
          'Brown discolouration and distorted plastic immediately above a terminal in a distribution board',
          'An insulation resistance value lower than the design expected on a lighting circuit',
          'An earth fault loop impedance higher than the maximum permitted for the protective device',
          'A prospective fault current at the origin greater than the rating of the switchgear',
        ]}
        correctIndex={0}
        explanation="Discolouration and distortion are visible symptoms of heat. You find them by taking the cover off and looking. The other three are values, and values only come from instruments."
      />

      <SectionRule />

      <ContentEyebrow>Smell and hearing</ContentEyebrow>

      <ConceptBlock
        title="Smell — the sense that saves jobs"
        plainEnglish="Overheated insulation and burnt plastics have a smell you only need to learn once. When you get it, you stop."
      >
        <p>
          Smell catches the fault you cannot see yet. Insulation that has been hot and plastics that
          have been cooking give off a sharp, acrid smell that is nothing like dust on a warm
          luminaire. The discipline is absolute: a burnt smell near a board is a reason to stop and
          investigate, not a reason to carry on. Do not note it and move to the next item, and do not
          decide it is probably the neighbour. The smell is evidence that something has been hotter
          than it should have been, and heat in an installation has a cause that is still there.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Hot insulation.</strong> Acrid and chemical, strongest close to the source and
            often strongest with the cover just removed.
          </li>
          <li>
            <strong>Overheated plastics.</strong> Enclosures, accessory bodies and cable management
            all smell burnt once they have been cooked.
          </li>
          <li>
            <strong>Damp and water ingress.</strong> A musty smell inside an enclosure tells you
            water has been getting in.
          </li>
          <li>
            <strong>Where to sniff.</strong> At the board, at the accessory on the end of the
            circuit, and anywhere the visual inspection has already made you suspicious.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Hearing — noise that should not be there, and silence that should not be either"
        plainEnglish="An installation makes a certain amount of noise. Learn what normal sounds like and the abnormal jumps out."
      >
        <p>
          Hearing works best when you stop talking. Stand still for a few seconds by an energised
          board or panel and listen. Most of the time you hear very little, and when you do hear
          something it usually matters. Hearing also covers the operational check: when you operate a
          device, a clean positive action sounds different from a mechanism that is sticking.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Arcing.</strong> A crackle, a fizz or an intermittent sharp snap. Treat it as
            serious immediately.
          </li>
          <li>
            <strong>Buzzing.</strong> A loose lamination, fixing or termination vibrating. Buzzing is
            movement, and movement at a connection means a poor connection.
          </li>
          <li>
            <strong>A hum that has changed.</strong> A transformer or ballast that sounds different
            from last time, or from its identical neighbour.
          </li>
          <li>
            <strong>Contactor chatter.</strong> Rapid clattering points to a control or supply
            problem, and every chatter damages the contacts a little more.
          </li>
          <li>
            <strong>Mechanical noise.</strong> Bearings, fans and moving parts complaining before
            they fail.
          </li>
          <li>
            <strong>Silence where there should not be.</strong> Something that should be running and
            is not is a finding too.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="317e-2-2-check-2"
        question="During an energised inspection you hear rapid clattering from a contactor in a control panel. What does that indicate, and what is the concern?"
        options={[
          'Normal operation of any contactor under load, so no action is needed',
          'A fault in the test instrument being used at the time',
          'That the panel is correctly labelled and functioning as designed',
          'A control or supply problem, and every chatter is damaging the contacts',
        ]}
        correctIndex={3}
        explanation="Chatter means the contactor is repeatedly making and breaking. It points at a control or supply issue, and each operation pits and wears the contacts. It is a finding to investigate and record, not background noise."
      />

      <SectionRule />

      <ContentEyebrow>Touch and taste</ContentEyebrow>

      <ConceptBlock
        title="Touch — used sparingly, and with hard rules"
        onSite="Prove dead first. Never touch to find out whether something is live. Never touch anything that may be live."
      >
        <p>
          Touch has a place, but it is the sense on the shortest leash. Used properly and only where
          it is safe, it tells you an enclosure is warmer than its neighbours, that a panel is
          vibrating when it should be still, that an accessory moves in its box, that a gland is
          finger-loose. The discipline around it is not negotiable. You never use your hand to
          establish whether a conductor is live — that is what an approved voltage indicator and the
          safe isolation procedure are for. You prove dead first, and you only put a hand on what you
          have established is safe to handle.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Warmth on an enclosure.</strong> Compare like with like. One section warmer than
            the rest is a lead worth following.
          </li>
          <li>
            <strong>Unexpected vibration.</strong> Movement where there should be none points at
            something loose.
          </li>
          <li>
            <strong>Loose accessories.</strong> A socket-outlet that rocks in its box, a plate that
            lifts, a luminaire that moves on its fixing.
          </li>
          <li>
            <strong>Secure terminations.</strong> Checked properly on a dead installation, never by
            poking at something energised.
          </li>
          <li>
            <strong>Never for voltage.</strong> Touch is not a voltage indicator and never has been.
          </li>
          <li>
            <strong>Never on anything that may be live.</strong> If you have not proved it dead, keep
            your hands off it.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Taste has no place in electrical inspection"
        plainEnglish="Four senses, not five. Nothing in an electrical installation is ever tasted."
      >
        <p>
          It needs saying plainly, because the question is often set as a list of five senses and it
          is an obvious trap. Taste is not a sense used in electrical inspection. There is no
          circumstance in which an electrician tastes a conductor, a component, a residue, a fluid or
          anything else found in an installation.
        </p>
        <p>
          Materials in and around an installation can be toxic, corrosive or contaminated, and
          putting any of them near your mouth is a health risk with no diagnostic benefit whatever.
          If there is a residue, a leak or a deposit you cannot identify, that is a finding to record
          and investigate — by looking at it, by establishing what the equipment contains and by
          asking, never by tasting. The senses that apply are sight, smell, hearing and a careful,
          disciplined use of touch.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating inspection as the box-ticking you do while the tester warms up"
        whatHappens={
          <>
            <p>
              The pressure is always on the numbers, so the schedule of inspections gets filled in
              from the van at the end of the day. Covers were never removed. Cable routes were
              assumed from where the accessories ended up. The hot smell at the board was put down to
              new equipment and never mentioned again. Every test result is inside limits, so the
              certificate goes out.
            </p>
            <p>
              What has been missed is everything a measurement cannot show. A conductor with
              insulation trapped under the terminal screw reads fine until the day it does not. A
              cable outside a permitted zone with nothing protecting it tests perfectly. A missing
              fire seal has no electrical value at all. And the smell that got waved away was the one
              finding trying to tell you where to look.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Treat inspection as a separate, timed activity carried out before the testing, with the
              installation disconnected for the parts that need it. Walk the job with the listed
              items in Regulation 642.3 as your route, and take the covers off.
            </p>
            <p>
              Stop when a sense tells you to stop. A burnt smell, a crackle, a warm enclosure or a
              scorch mark is the start of an investigation, not a line on a form. Write down what you
              find as you find it, including what you judged acceptable, so the schedule reflects an
              inspection that actually happened.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Using the back of a hand to find out whether something is live"
        whatHappens={
          <>
            <p>
              The inspection is going well and touch has already been earning its keep — one section
              of an enclosure warmer than the rest, an accessory rocking in its box, a gland that
              turned finger-tight. Then a conductor comes up that nobody is sure about, the indicator
              is in the van, and a hand goes out to it, because touch has been telling the truth all
              morning.
            </p>
            <p>
              Touch is not a voltage indicator and never has been. It gives no reading, it gives no
              warning, and the one occasion it is wrong is the occasion that matters. The same
              failure turns up in a quieter form when somebody checks a termination for tightness by
              poking at it on an energised board, or handles an enclosure they have not established
              is safe to handle, because the rest of the installation has been dead all day.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Keep the rule absolute and keep it simple: prove dead first, and put a hand only on
              what you have established is safe to handle. Whether a conductor is live is a question
              for an approved voltage indicator and the safe isolation procedure, and there is no
              version of the job where a hand is the quicker way to answer it.
            </p>
            <p>
              Use touch for what it is actually good at, and use it on a dead installation — warmth
              compared like for like across an enclosure, vibration where there should be none,
              accessories that move in their boxes, terminations checked for security. If the
              indicator is in the van, the job is to fetch it, not to work round it.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Limits, and recording findings</ContentEyebrow>

      <ConceptBlock
        title="The limits of the senses, and recording what you found"
        plainEnglish="They find symptoms, not values. And an observation seen but not written down did not happen."
      >
        <p>
          Be clear about the boundary. Your eyes, ears, nose and hands detect symptoms: that
          something has been hot, that something is loose, that something is arcing, that something
          is not where the design said. They do not produce a value, and many defects have no symptom
          at all until they fail. The relationship runs both ways — inspection tells testing where to
          look, and testing produces the values inspection never can. Then comes the step most often
          skipped: writing it down. You noticed the scorch mark and mentioned the smell to the site
          manager; neither exists six months later when somebody asks what was known at the time.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>No insulation resistance.</strong> Degraded insulation inside a cable looks and
            smells sound until it breaks down.
          </li>
          <li>
            <strong>No earth fault loop impedance.</strong> A high impedance path looks identical to
            a good one.
          </li>
          <li>
            <strong>No continuity or polarity proof.</strong> Neat, correct-looking work is not
            evidence of a continuous protective conductor or a correct connection.
          </li>
          <li>
            <strong>Record as you go.</strong> Not at the end of the day from memory, and not from
            the van.
          </li>
          <li>
            <strong>Describe the observation, not your conclusion.</strong> What you saw, smelled or
            heard, and exactly where. Which board, which way, which room.
          </li>
          <li>
            <strong>Photograph what you can.</strong> A picture of a scorch mark settles arguments
            that words will not.
          </li>
          <li>
            <strong>Hand it on.</strong> Findings that stay in your notebook protect nobody.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="317e-2-2-check-3"
        question="Which statement about the relationship between inspection and testing is correct?"
        options={[
          'Inspection detects symptoms and directs the testing; testing produces values inspection cannot',
          'A thorough visual inspection can replace insulation resistance testing on a small installation',
          'Testing is sufficient on its own provided all results are within limits',
          'Inspection is only required where the design documentation is unavailable',
        ]}
        correctIndex={0}
        explanation="The two halves do different jobs and neither substitutes for the other. Inspection finds what no instrument can see, and testing produces values no sense can detect. Verification needs both."
      />

      <SectionRule />

      <Scenario
        title="Bangor — the board that smelled wrong on a Friday afternoon"
        situation={
          <>
            <p>
              You are carrying out initial verification on a refurbished first floor of a commercial
              unit in Bangor. The installation is new, the contractor finishes on Friday and the
              tenant moves in on Monday. You have worked through the inspection and the testing, and
              every result on the schedule is comfortably within limits.
            </p>
            <p>
              On the final walk round, with the board energised, you get a sharp burnt smell as you
              pass it. You stand still and hear a faint buzz that was not there earlier. The cover is
              on and nothing is visible from outside. The site agent is holding the keys and wants
              the certificate before he locks up, and the electrical contractor has already loaded
              his van and left for the weekend.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Do not issue the certificate. A burnt smell and a buzz at an energised board are two
              independent senses telling you the same thing, and good test results do not cancel them
              out.
            </p>
            <p>
              Safely isolate the board, prove dead, then remove the cover and inspect. Look for
              discolouration above and around terminals, distortion or blistering of plastics,
              scorching on busbar shrouds, insulation trapped under a clamp and any conductor that
              has moved. Check the terminations on that section against the design. Do not put a hand
              inside a board you have not proved dead looking for a warm spot.
            </p>
            <p>
              Tell the site agent plainly that the installation is not being certified this afternoon
              and why, and put it in writing. Record the observation exactly as you found it, with
              the location and a photograph, and leave the affected section isolated and labelled
              until the cause has been found and put right. Then re-inspect and re-test that part
              before anything is signed.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              A hot smell is a symptom of energy going somewhere it should not, usually a loose or
              poorly made termination. Loose terminations do not show up in test results while they
              are still making contact, and they get worse under load, not better.
            </p>
            <p>
              The cost of stopping is a weekend of inconvenience and a difficult conversation. The
              cost of signing is a fire in an occupied commercial unit, with a certificate carrying
              your name on it, issued by somebody who smelled it, heard it and carried on
              anyway&nbsp;— and that is the conversation you would then be having with an
              investigator, not a site agent.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Why is inspection done before testing rather than alongside it?',
            answer:
              'Because inspection tells you what has been installed and where the weaknesses are, and a large part of it needs the installation disconnected so covers can come off safely. Doing it first means the testing that follows is targeted and the results can be interpreted properly. Some sensory checks, such as sounds and smells under load, necessarily come later with the appropriate precautions.',
          },
          {
            question: 'Can I use the back of my hand to check whether an enclosure is live?',
            answer:
              'No. Touch is never used to establish the presence of voltage, in any form. You prove dead using the safe isolation procedure with an approved voltage indicator. Touch is used only on something you have already established is safe to handle, and then only for things like comparing warmth between enclosures or finding an accessory that moves in its box.',
          },
          {
            question: 'Does a thorough inspection reduce the amount of testing needed?',
            answer:
              'No. It changes where you concentrate, but it removes no required test. The senses detect symptoms, not values, and no amount of looking will give you an insulation resistance or an earth fault loop impedance. Inspection and testing do different jobs and verification needs both.',
          },
          {
            question: 'What changed in Appendix 6 under Amendment 4?',
            answer:
              'The Appendix 6 schedule of inspections has been simplified for initial verification. A new example checklist of items requiring inspection during initial verification has been added to Appendix 6, but it is not required to be provided with the certificate and the checklist is guidance only. The minimum scope of the inspection itself still comes from Regulation 642.3.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Inspection normally precedes testing in initial verification, and much of it is carried out with the installation disconnected from the supply.',
          'Sight does most of the work: damage, connection of conductors, identification, routing, missing barriers and covers, signs of overheating, labels and workmanship.',
          'Smell catches overheating before it becomes visible — a burnt or hot-plastic smell near a board is a reason to stop and investigate, never a reason to carry on.',
          'Hearing detects arcing, buzzing, a changed transformer note and a chattering contactor, and it also detects something that should be running and is not.',
          'Touch is used sparingly and only where it is safe: warmth, vibration and loose accessories. Never touch to test for voltage, never touch anything that may be live, and prove dead first.',
          'Taste is not a sense used in electrical inspection. Nothing in an installation is ever tasted, under any circumstances.',
          'Regulation 642.3 requires the inspection to include at least the checking of the listed items where relevant, setting the minimum scope before and during testing.',
          'The senses detect symptoms, not values — they cannot measure insulation resistance or earth fault loop impedance, and an observation that is not recorded did not happen.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="The human senses in initial verification" />
    </div>
  );
}
