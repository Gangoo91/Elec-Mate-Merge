/**
 * Module 7 · Section 2 — Terminations and glanding
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar.
 *
 * 🔴 REPOSITIONED, with Andrew's agreement 2026-08-30. The original title was
 * "Loop-powered vs externally powered devices" — which Module 3 Section 2 owns
 * outright (loop-powered 26 mentions, 4-wire 23, 2-wire 19, all three
 * topologies with the active/passive rule). An audit found terminations almost
 * entirely uncovered: "terminal strip" 0 mentions across Modules 1-6, "ferrule"
 * 0, "gland" 3.
 *
 * 🔴 THE SPINE, and it is a genuine symmetry worth teaching as one idea:
 *
 *   SOLID wire under a screw head        — acceptable
 *   STRANDED wire under a screw head     — WRONG (shear frays the strands)
 *   STRANDED wire in a crimp terminal    — correct
 *   SOLID wire in a crimp terminal       — WRONG (loses tension, especially
 *                                          under vibration)
 *
 * Both errors are the same mistake in opposite directions, and both produce a
 * connection that feels secure on the day and fails later. That pairing is far
 * more memorable than two separate rules.
 *
 * 🔴 SECOND IDEA: the ferrule is not a convenience. It gives the screw a rugged
 * tip to bear on and stops the strands being sheared, which is why industrial
 * field wiring combines crimped ferrules WITH screw clamps rather than choosing
 * between them.
 *
 * 🔴 THIRD: multi-level terminal blocks with internal jumpers are PREFERABLE to
 * stuffing two wires into one terminal. That is a specific, actionable
 * recommendation people routinely get wrong.
 *
 * ⚠️ ACCURACY: glanding and cable-entry practice is genuinely important and
 * heavily governed by product standards and hazardous-area requirements we do
 * not hold. Teach the PRINCIPLES that are derivable (mechanical retention,
 * environmental sealing, screen continuity, not using the gland as strain
 * relief for conductors) and do NOT state specific IP codes, Ex marking
 * requirements or torque figures. Section 5 handles the hazardous-area layer.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §8.3.1 (connections and wire terminations — ferrules with screw clamps,
 * terminal blocks, screwless spring clamps, multi-level blocks and internal
 * jumpers, the shear/compression argument, fork vs ring, and the two pairing
 * rules). Extracted to scratchpad/src/m7_terminations.txt.
 * Held in ~/Desktop/hav/instrumentation.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
  AppendixTable,
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Terminations and glanding | Instrumentation Module 7.2 | Elec-Mate';
const DESCRIPTION =
  'Why stranded wire must never go under a screw head and solid wire must never go in a crimp terminal, what a ferrule actually does, and why two wires in one terminal is the wrong answer to a common problem.';

const outcomes = [
  '🔴 State which wire type belongs under a screw head and which belongs in a crimp',
  'Explain the shear-force argument that makes stranded-under-screw wrong',
  'Explain why a compression terminal on solid wire loses its grip',
  'Say what a ferrule does and why it is used alongside a screw clamp rather than instead of one',
  'Distinguish fork and ring terminals and say when each is preferred',
  'Explain how a terminal block makes two wires common',
  '🔴 Say why a multi-level block with a jumper beats two wires in one terminal',
  'State what a gland must achieve, and what it must not be relied on for',
];

const quizQuestions = [
  {
    id: 1,
    question: '🔴 Why must stranded wire never be clamped directly under a screw head?',
    options: [
      'The screw head’s rotation exerts shear forces that fray the individual strands',
      'Stranded wire cannot carry enough current',
      'It is prohibited by wiring regulations',
      'Stranded wire has higher resistance',
    ],
    correctIndex: 0,
    explanation:
      'A tightening screw both compresses and turns. Solid wire tolerates that; a bundle of fine strands does not, because the shearing action splays and breaks them. The connection can feel tight on the day and deteriorate from there.',
  },
  {
    id: 2,
    question: '🔴 Why must a compression terminal never be crimped onto solid wire?',
    options: [
      'The crimp tool cannot grip solid wire',
      'It loses tension rapidly, especially where there is motion or vibration',
      'Solid wire is too stiff to insert',
      'The terminal will overheat',
    ],
    correctIndex: 1,
    explanation:
      'The initial crimp can feel perfectly secure, which is what makes it dangerous. A crimp relies on the conductor deforming and holding pressure, and solid wire relaxes instead — so the joint works when made and fails months later under vibration.',
  },
  {
    id: 3,
    question: 'What does a ferrule on the end of a stranded conductor achieve?',
    options: [
      'It identifies the circuit',
      'It reduces the resistance of the joint',
      'It gives the terminal screw a rugged tip to bear on, instead of loose strands',
      'It insulates the conductor end',
    ],
    correctIndex: 2,
    explanation:
      'It converts a bundle of fine strands into a single solid tip that a screw clamp can grip without shearing anything. That is why industrial field wiring uses crimped ferrules together with screw clamps rather than choosing between the two methods.',
  },
  {
    id: 4,
    question: 'What is the practical difference between a fork terminal and a ring terminal?',
    options: [
      'A ring is for stranded wire and a fork for solid',
      'A fork is for signal circuits and a ring for power',
      'A fork carries more current',
      'A fork can be fitted or removed by loosening the screw; a ring needs the screw removed but cannot fall off',
    ],
    correctIndex: 3,
    explanation:
      'It is a trade between convenience and security. A fork saves time on every connection and disconnection. A ring cannot escape if the screw works loose, which is why it is preferred where vibration or consequence justifies the extra effort.',
  },
  {
    id: 5,
    question: 'How does a two-sided terminal block make wires common?',
    options: [
      'A metal bar inside the block joins the left-hand and right-hand clamps',
      'By the screws touching each other',
      'They are not common — each side is separate',
      'Through the mounting rail',
    ],
    correctIndex: 0,
    explanation:
      'Each block section contains a metal bar linking its two sides, so a conductor clamped on the left is electrically common with one clamped on the right. That is what lets a terminal strip join field cable to panel wiring while remaining a clean break point for testing.',
  },
  {
    id: 6,
    question: '🔴 Three conductors need to be made common. What is the preferred method?',
    options: [
      'Insert all three into one terminal',
      'Use a multi-level terminal block with internal jumpers linking the levels',
      'Twist them together before terminating',
      'Use three separate blocks and link them with flying leads',
    ],
    correctIndex: 1,
    explanation:
      'Multiple wires in one terminal is the common improvisation and the worst option — the clamp is designed for one conductor, and adding more means none is held properly. A multi-level block with a jumper achieves the same commoning by design.',
  },
  {
    id: 7,
    question: 'What is the advantage of a screwless spring-clamp terminal block?',
    options: [
      'It provides better electrical contact in every case',
      'It carries more current',
      'It is faster to terminate and gentler on the wrist than repeated screw work',
      'It does not require a ferrule',
    ],
    correctIndex: 2,
    explanation:
      'A spring clamp is released with a lever action rather than a twisting one. Beyond speed, the repetitive wrist rotation of screw terminals is a genuine occupational hazard for anyone terminating panels day after day.',
  },
  {
    id: 8,
    question: '🔴 What should a cable gland never be relied upon to do?',
    options: [
      'Seal against the environment',
      'Maintain screen continuity where designed to',
      'Retain the cable mechanically',
      'Take strain off the individual conductors inside the enclosure',
    ],
    correctIndex: 3,
    explanation:
      'A gland grips the outer sheath, so it protects the cable entry. It does nothing for the conductors beyond it — those still need enough slack and their own support, or the strain arrives at the terminals instead.',
  },
];

const InstrumentationModule7Section2 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 2"
        title="Terminations and glanding"
        backTo="/electrician/upskilling/instrumentation-module-7"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The loop diagram said conductor lands on terminal 8. This is how it is actually made off —
          and two ways of getting it wrong that both feel right on the day.
        </p>

        <TLDR
          points={[
            '🔴 Solid wire may go under a screw head. Stranded wire must not — the screw’s rotation shears the strands.',
            '🔴 Stranded wire belongs in a crimp terminal. Solid wire must not — the crimp loses tension, especially under vibration.',
            'Both errors are the same mistake in opposite directions, and both feel secure when made.',
            'A ferrule turns loose strands into a rugged tip the screw can grip. That is why field wiring crimps AND clamps.',
            'Fork terminals are quicker to fit and remove; ring terminals cannot fall off if a screw loosens.',
            'A terminal block joins its two sides with an internal metal bar, which is what makes them common.',
            '🔴 Two wires in one terminal is the wrong answer. A multi-level block with an internal jumper is the right one.',
            'Screwless spring clamps are faster, and the wrist motion of repeated screw work is a real occupational hazard.',
            'A gland retains the cable, seals the entry, and where designed to, carries the screen through.',
            '🔴 A gland does nothing for the conductors beyond it — they still need slack and their own support.',
            'Terminal strips are also where a loop can be divided for testing, which Module 6 Section 2 depends on.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>🔴 Two rules that are one rule</ContentEyebrow>

        <ConceptBlock
          title="Solid under a screw, stranded in a crimp"
          plainEnglish="Each wire type has one termination method that suits it and one that destroys it. Getting them the wrong way round is the commonest termination fault there is."
          onSite="Both wrong versions feel perfectly solid when you make them. That is exactly why they persist."
        >
          <p>
            Industrial field wiring uses a small number of connection methods &mdash; crimping,
            screw clamping, spring clamping &mdash; and the choice is not a matter of preference. It
            is decided by what the conductor is.
          </p>
          <AppendixTable
            caption="Which method suits which conductor"
            headers={['', 'Under a screw head', 'In a compression terminal']}
            rows={[
              [
                'Solid wire',
                'Acceptable — the conductor tolerates the forces',
                '🔴 Wrong — loses tension',
              ],
              [
                'Stranded wire',
                '🔴 Wrong — the strands are sheared',
                'Correct — this is what crimps are for',
              ],
            ]}
            notes="Read it as one symmetry rather than two rules. Each conductor type has exactly one right answer and one wrong one."
          />
          <p>
            <strong>Why stranded under a screw fails.</strong> A screw tightening does two things at
            once: it presses down, and it turns. The wire tip is therefore subjected to both{' '}
            <strong>compressive and shear forces</strong>. Solid wire copes. A bundle of fine
            strands does not &mdash; the shearing action frays and splays them, and each
            disconnection and reconnection mangles the tip further.
          </p>
          <p>
            There is a secondary effect worth knowing even on solid wire:{' '}
            <strong>tension on the conductor tends to turn the screw</strong>, which can loosen the
            connection over time. That is one reason cables are supported rather than left to hang
            on their terminations.
          </p>
          <p>
            <strong>Why solid in a crimp fails.</strong> A compression terminal works by deforming
            the conductor and holding it under sustained pressure. Stranded wire compacts and stays
            compacted. Solid wire relaxes, so{' '}
            <strong>
              the crimp loses tension rapidly &mdash; particularly wherever motion or vibration
              stresses the joint
            </strong>
            .
          </p>
          <p>
            🔴 And here is what makes both errors dangerous rather than merely wrong:{' '}
            <strong>the initial connection feels entirely secure in both cases.</strong> Neither
            fault announces itself at the time. Both surface months later as an intermittent, which
            Module 4 Section 5 identified as the hardest kind of fault to catch.
          </p>
        </ConceptBlock>

        <Pullquote>
          Both wrong terminations feel right when you make them. That is not a coincidence — it is
          why they are still being made.
        </Pullquote>

        <InlineCheck
          id="ins-7-2-pairing"
          question="A stranded conductor needs to land on an instrument's screw terminal. What do you do?"
          options={[
            'Crimp a ferrule or a compression terminal on first, then clamp that under the screw',
            'Tin the end with solder, then clamp it',
            'Use the screw clamp — stranded wire is fine under a screw',
            'Twist the strands tightly and clamp them under the screw',
          ]}
          correctIndex={0}
          explanation="The crimped tip converts the strands into something a screw can bear on without shearing. Twisting is not enough — the screw still turns against loose strands. Soldering is worse still on a clamped joint, because solder creeps under sustained pressure and the connection slackens."
        />

        <ConceptBlock
          title="What a ferrule is actually for"
          plainEnglish="It is not tidiness. It gives the screw something solid to press on, so the strands never meet the screw at all."
          onSite="This is why the standard industrial practice combines crimping with screw clamping rather than treating them as alternatives."
        >
          <p>
            The obvious question after the rules above is what to do when the terminal has a screw
            and the cable is stranded &mdash; which is most instrument wiring, most of the time.
          </p>
          <p>
            The answer is a <strong>ferrule</strong>: a compression sleeve crimped onto the
            conductor end so the strands are contained inside a single rugged tip. The screw then
            bears on the ferrule rather than on the wire.
          </p>
          <p>
            That is why the usual industrial arrangement is{' '}
            <strong>compression crimps and screw clamps used together</strong>. Neither is a
            substitute for the other. The crimp solves the conductor problem; the clamp provides the
            connection.
          </p>
          <p>Two practical points follow:</p>
          <ul>
            <li>
              <strong>Crimping requires the proper tool.</strong> A crimp made with pliers has not
              applied the controlled deformation the terminal was designed around, and it is another
              joint that feels acceptable and is not.
            </li>
            <li>
              <strong>The ferrule must suit the conductor size.</strong> Undersized will not accept
              the strands; oversized will not grip them, whatever the tool does.
            </li>
          </ul>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Fork and ring</ContentEyebrow>

        <ConceptBlock
          title="A trade between speed and security"
          plainEnglish="One slips off the screw when you loosen it. The other cannot, which is the point."
          onSite="Where vibration or consequence is significant, the extra minute for a ring terminal is usually worth it."
        >
          <p>
            Where a conductor terminates on a screw post rather than into a clamp, compression
            terminals come in two shapes:
          </p>
          <ul>
            <li>
              <strong>Fork terminals</strong> are open-ended, so they can be fitted or removed by
              merely <em>loosening</em> the screw. Faster on installation and much faster on any
              later disconnection.
            </li>
            <li>
              <strong>Ring terminals</strong> are closed, so the screw must be fully removed to fit
              or remove one &mdash; and equally,{' '}
              <strong>the terminal cannot fall off if the screw ever works loose</strong>.
            </li>
          </ul>
          <p>
            The choice is a genuine engineering trade rather than a habit. A fork saves time at
            every connection, and a ring removes a failure mode. Where a loose connection would be
            consequential, or where vibration makes loosening plausible, the ring is the better
            answer &mdash; and it is worth being deliberate about which one a job calls for rather
            than using whatever is in the box.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Terminal blocks</ContentEyebrow>

        <ConceptBlock
          title="How a terminal strip joins two cables"
          plainEnglish="Each block has a metal bar inside joining its two sides. Land a conductor on each side and they are common."
          onSite="A terminal strip is also the place a loop can be broken cleanly for testing, which matters more than it sounds."
        >
          <p>
            A terminal strip is an array of modular blocks, and each block section contains{' '}
            <strong>a metal bar joining its left-hand and right-hand clamps</strong>. A conductor
            fastened on one side is electrically common with a conductor fastened on the other.
          </p>
          <p>
            That simple arrangement is what lets field cable arrive on one side and panel wiring
            leave on the other, which is the marshalling function Module 7 Section 1 showed on the
            loop diagram.
          </p>
          <p>Blocks vary in ways worth recognising:</p>
          <ul>
            <li>
              <strong>Screw clamps</strong> &mdash; the traditional arrangement, holding the
              conductor against the internal bar under screw pressure.
            </li>
            <li>
              <strong>Screwless spring clamps</strong> &mdash; a spring clip provides the pressure,
              released by inserting a narrow screwdriver into a hole beside the conductor and
              levering. Faster both to terminate and to remove.
            </li>
            <li>
              <strong>Multi-level blocks</strong> &mdash; two or three levels in the footprint of
              one, with the levels normally isolated from each other.
            </li>
            <li>
              <strong>Blocks with added features</strong> &mdash; indicator lamps, switches, fuses
              and disconnect links built into the block body.
            </li>
          </ul>
          <p>
            The last of those is worth noticing for a reason beyond convenience.{' '}
            <strong>
              A disconnect or knife-edge link built into a terminal block is a designed-in break
              point
            </strong>
            , and Module 6 Section 2 showed why that is valuable: every substitution test divides a
            loop, and the accessible break points decide how quickly you can bisect it.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Two wires in one terminal, and the better answer"
          plainEnglish="Doubling up in a single clamp is the usual improvisation. The multi-level block with a jumper is what the job actually wanted."
          onSite="If you find doubled terminals on an existing installation, that is a finding worth recording."
        >
          <p>
            A recurring need is to make several conductors common &mdash; a shared supply, a common
            return, several devices on one signal. The improvisation is to push two or three
            conductors into a single terminal.
          </p>
          <p>
            That is the wrong answer, and the reason is mechanical.{' '}
            <strong>A clamp is designed to grip one conductor of a stated size.</strong> Introduce a
            second and the pressure is shared unevenly, so neither is held as intended &mdash; and
            if the two differ in size or type, the smaller may be barely held at all. Remove one
            later and the other is left loose.
          </p>
          <p>
            The designed solution is a{' '}
            <strong>multi-level terminal block with internal jumpers</strong> linking two or more
            levels so they become electrically common. Each conductor gets its own properly sized
            clamp, and the commoning happens inside the block where it belongs.
          </p>
          <p>
            🔴{' '}
            <strong>
              This use of a multi-level block is preferable to inserting multiple wires into the
              same terminal.
            </strong>{' '}
            It is one of the few places in this course where the recommendation is that specific,
            and it is worth following, because doubled terminals produce exactly the intermittent,
            vibration-sensitive fault that is hardest to find later.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Why bad terminations survive</ContentEyebrow>

        <CommonMistake
          title="Making a connection that feels tight"
          whatHappens={
            <>
              <p>
                Every wrong termination in this section passes the only test most people apply: it
                feels solid when made, and a tug does not shift it.
              </p>
              <p>
                Stranded strands sheared under a screw still conduct on the day. A crimp on solid
                wire grips perfectly at the moment of crimping. Two conductors in one clamp are held
                well enough to test correctly. Every one of them works during commissioning.
              </p>
              <p>
                🔴 What they share is that they degrade with{' '}
                <strong>time, temperature cycling and vibration</strong> rather than failing
                immediately. Months later the loop develops an intermittent that comes and goes with
                plant running, weather or nothing identifiable &mdash; and by then nobody connects
                it to a termination made during installation.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Judge a termination by whether it is the <em>right method</em> for the conductor,
                not by whether it feels tight. Those are different tests and only one of them
                predicts the future.
              </p>
              <p>
                Use the proper crimp tool, a ferrule sized to the conductor, and one conductor per
                clamp. Where several must be common, use a block designed for it.
              </p>
              <p>
                And when investigating an intermittent, treat terminations as a genuine candidate
                rather than an afterthought. Module 4 Section 5&rsquo;s min/max recording is one way
                to catch an intermittent that will not appear while you are watching &mdash; and a
                fault that correlates with vibration or temperature has a mechanical cause
                somewhere.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Getting the cable into the box</ContentEyebrow>

        <ConceptBlock
          title="What a gland has to achieve"
          plainEnglish="Hold the cable, keep the weather out, and where required, carry the screen through. Three jobs, and it does none of them for the conductors inside."
          onSite="Specific gland types and their selection are governed by product standards and, in hazardous areas, by requirements Section 5 covers. The principles here apply everywhere."
        >
          <p>
            A cable entering an enclosure has to be made off in a way that satisfies several
            requirements at once:
          </p>
          <ul>
            <li>
              <strong>Mechanical retention.</strong> The cable must be held so that pulling on it
              outside does not transmit force to what is inside.
            </li>
            <li>
              <strong>Environmental sealing.</strong> The entry must not become the way water, dust
              or process fluid gets into an enclosure that was otherwise protected.
            </li>
            <li>
              <strong>Screen continuity, where designed for it.</strong> On screened instrument
              cable the gland may be the means of connecting the screen, and Module 3 Section 5
              established that <em>where</em> that happens matters enormously &mdash; the screen
              must be earthed at one end only.
            </li>
            <li>
              <strong>Armour termination</strong> on armoured cable, which is a mechanical and an
              electrical function at once.
            </li>
          </ul>
          <p>
            🔴 The limitation is the part most often assumed away.{' '}
            <strong>
              A gland grips the outer sheath. It does nothing whatever for the individual conductors
              beyond it.
            </strong>{' '}
            Inside the enclosure those conductors still need enough slack to be re-terminated, and
            they must not be relied on to support themselves &mdash; because any strain that reaches
            them arrives at the terminals, and the previous section explained what tension does to a
            screw connection.
          </p>
          <p>
            Selecting the right gland for a given cable, enclosure and environment is governed by
            product standards, and in hazardous areas by requirements that are not a matter of
            judgement at all. Section 5 takes that up. What travels everywhere is the principle:{' '}
            <strong>
              the gland protects the entry, and everything past it is still your responsibility.
            </strong>
          </p>
        </ConceptBlock>

        <VideoCard
          url={videos.swaGlandTechnique.url}
          title={videos.swaGlandTechnique.title}
          channel={videos.swaGlandTechnique.channel}
          duration={videos.swaGlandTechnique.duration}
          topic="Watch · Making off an armoured gland"
          caption="Glanding is one of those jobs that reads simply and is easy to do badly, so it is worth seeing done. This covers armoured cable rather than instrument cable specifically, but the technique is the same and so is the thing to watch for: the armour termination is doing an electrical job as well as a mechanical one, and the sealing is what keeps water out of the enclosure. Section 7 explains why that second point decides most insulation problems years later."
        />

        <InlineCheck
          id="ins-7-2-gland"
          question="A screened instrument cable is glanded into a field junction box. The screen is already earthed at the panel end. What should happen to the screen here?"
          options={[
            'Earth it at the gland as well, for a better connection',
            'Carry it through unbroken, cut back and insulated — it must be earthed at one end only',
            'Connect it to the enclosure body',
            'Leave it loose inside the box',
          ]}
          correctIndex={1}
          explanation="Module 3 Section 5 established that earthing a screen at both ends creates a ground loop — current flows through the screen and can inject noise into the conductors it was fitted to protect, and in severe cases overheat the cable. Leaving it loose is equally wrong, because it may find an earth by accident, which is the same fault nobody made deliberately."
        />

        <ConceptBlock
          title="Identifying conductors so the next person can find them"
          plainEnglish="A terminal number on a drawing is only useful if the conductor at the other end carries the same number."
          onSite="Ferrule markers and core numbering cost minutes at installation and save hours at every later visit."
        >
          <p>
            Section 1 argued that every detail on a loop diagram is a question the next person does
            not have to answer with a meter. Identification is where that principle meets the
            terminal box.
          </p>
          <p>
            A loop diagram showing a conductor landing on terminal 8 is only half the information.
            The other half is being able to identify that conductor{' '}
            <em>at the other end of a fifty-metre run</em>, and that requires it to be marked.
            Practical means include:
          </p>
          <ul>
            <li>
              <strong>Numbered ferrule markers</strong> carrying the core or terminal number, fitted
              as the conductor is made off.
            </li>
            <li>
              <strong>Printed core identification</strong> where the cable provides it, which
              removes the question entirely provided the drawing records which core does what.
            </li>
            <li>
              <strong>Cable numbering</strong> at every entry, so the right cable is identified
              before any conductor is disturbed.
            </li>
          </ul>
          <p>
            The reason this matters more on instrument work than it might elsewhere is the polarity
            problem Module 2 Section 2 raised.{' '}
            <strong>
              A reversed pair does not usually announce itself &mdash; it produces a plausible wrong
              reading, or nothing at all
            </strong>
            , and neither is obviously a wiring error. Identification is what prevents the mistake
            rather than what diagnoses it afterwards.
          </p>
          <p>
            And where identification is missing on an existing installation, adding it while you are
            in the box is worth the few minutes. Somebody will be back.
          </p>
        </ConceptBlock>

        <Scenario
          title="An intermittent that only appears when the extract fan runs"
          situation={
            <>
              <p>
                A temperature loop reads correctly most of the time. Two or three times a shift it
                drops out briefly and recovers. Operators have noticed it correlates with the
                extract fan on the roof above the junction box starting up.
              </p>
              <p>
                The transmitter has been swapped and calibrated. The cable tests correctly. The loop
                behaves perfectly whenever anybody is stood at it with a meter.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Read the correlation. A fault that appears with a fan running and disappears when it
                stops is almost certainly <strong>vibration</strong>, and vibration acts on
                mechanical connections rather than on cable or electronics.
              </p>
              <p>
                That points straight at the terminations in the junction box beneath it. The
                candidates are the ones this section covered: stranded conductors clamped directly
                under screws, a crimp made on solid conductor, two wires sharing one terminal, or a
                screw that has loosened because the cable is taking tension.
              </p>
              <p>
                Note why testing has not found it. A meter at the terminals with the plant quiet is
                testing the connection in its good state &mdash;{' '}
                <strong>the fault only exists while the vibration is present</strong>. Module 4
                Section 5&rsquo;s min/max recording is the tool for this: leave an instrument on the
                loop across a period when the fan cycles, and the excursion is captured whether or
                not anybody is watching.
              </p>
              <p>
                Then inspect rather than test. Open the box, look at how each conductor is made off,
                and judge each termination by whether it is the right method for the conductor
                &mdash; not by whether it currently reads correctly.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                A transmitter was replaced and calibrated for a fault that was never in it. The
                symptom pointed at the measurement and the cause was mechanical, in a box nobody had
                opened since installation.
              </p>
              <p>
                It also shows why terminations deserve to be on the fault-finding list at all.
                Module 5 Section 4 catalogued the control faults and Module 3 Section 5 the signal
                ones; a bad crimp made years ago belongs on the same list and rarely gets there.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Working in a live panel</ContentEyebrow>

        <ConceptBlock
          title="What else is in the box"
          plainEnglish="An instrument terminal strip is often a few centimetres from something at mains voltage. The signal work is low energy; the enclosure is not."
          onSite="Establish what is live in the panel before opening it, not after."
        >
          <p>
            It is easy to treat instrument terminations as inherently low-risk work &mdash; a
            4&ndash;20 mA loop at 24 V is not going to hurt anybody. The loop is not the hazard; the
            enclosure it lives in frequently is.
          </p>
          <p>Two things are worth establishing before any panel is opened:</p>
          <ul>
            <li>
              <strong>What else is in there.</strong> Marshalling panels commonly carry
              mains-voltage supplies to instruments, relay circuits, and power for the very devices
              the signal loops serve. Module 4 Section 1&rsquo;s current-transformer warning applies
              here too if any metering circuits are present.
            </li>
            <li>
              <strong>What the loop is doing.</strong> Breaking a terminal to reterminate it opens a
              live control loop, and Module 5 Section 1 established that what happens next depends
              entirely on the process &mdash; a self-regulating process settles, an integrating one
              ramps away.
            </li>
          </ul>
          <p>
            🔴 The second is the one people underestimate, because it does not feel like a safety
            question.{' '}
            <strong>
              Disconnecting a conductor is an operational act as well as an electrical one
            </strong>
            , and on a loop feeding a controller it should be agreed with whoever is running the
            plant before it happens rather than explained afterwards.
          </p>
          <p>
            Module 1 Section 5 covers isolation and hazardous areas properly, and Section 5 of this
            module covers what a hazardous area demands of the wiring itself. What belongs here is
            the habit: the signal is low energy and the environment it sits in decides the risk.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Should conductor ends be tinned with solder before clamping?',
              answer:
                'No — it is a common instinct and it makes the joint worse. Solder creeps under sustained pressure, so a clamped joint that was tight when made slackens as the solder deforms, and you end up with exactly the loosening this section warns about. A crimped ferrule achieves what tinning was trying to achieve, without the creep.',
            },
            {
              question: 'How much slack should be left inside an enclosure?',
              answer:
                'Enough that a conductor can be re-terminated at least once or twice without the cable needing to be pulled through, and enough that nothing is under tension when the door is closed. Too little is the common fault, because it looks tidy — and it means the next person who needs to remake a termination has to disturb the gland or the cable run to get the length back.',
            },
            {
              question: 'Does the screen get terminated at the gland or at a terminal?',
              answer:
                'Both arrangements exist, and which one applies is a design decision recorded on the drawing rather than a site choice. Some glands are specifically designed to make a 360-degree connection to the screen; elsewhere the screen is carried through as a conductor and landed on a terminal. What matters, per Module 3 Section 5, is that it happens at one end only and that the other end is cut back and insulated so it cannot find an earth accidentally.',
            },
            {
              question: 'Are spring-clamp terminals as reliable as screw terminals?',
              answer:
                'They are widely used in industrial panels and are generally regarded as at least as reliable, partly because a spring maintains its pressure where a screw can loosen. They also remove the human variable of how tight is tight. The practical advantages are speed and the reduced wrist strain of a lever action over repeated screw work, which matters for anybody terminating panels all day.',
            },
            {
              question: 'What if the terminal is designed to take a bare stranded conductor?',
              answer:
                'Some instrument terminals are built for exactly that — typically with a square washer or a clamping plate under the screw head that compresses the conductor without applying shear to it. Where a terminal is designed that way, a bare stranded conductor is acceptable and the manufacturer will say so. The general rule stands everywhere else, and the safe assumption on an unfamiliar terminal is that it is not one of these.',
            },
            {
              question: 'Does any of this matter on a 4–20 mA signal circuit specifically?',
              answer:
                'It matters more, not less. Module 3 Section 1 showed that a current loop is remarkably tolerant of cable resistance — but a loop is a series circuit, so a single failing connection anywhere interrupts it entirely. A deteriorating termination on a power circuit may show as heating or a voltage drop; on a series signal loop it takes the measurement to zero, which the live zero then correctly reports as a fault.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            '🔴 Solid wire may go under a screw head. Stranded must not — the screw turns as well as presses, and shear frays the strands.',
            '🔴 Stranded wire belongs in a crimp. Solid must not — a crimp on solid wire loses tension, especially under vibration.',
            'They are the same mistake in opposite directions, and both connections feel secure when made.',
            'Tension on a conductor tends to turn the screw, which loosens a connection over time.',
            'A ferrule contains the strands in a rugged tip so the screw never bears on the wire itself.',
            'Field wiring therefore crimps AND clamps — the two methods are complementary, not alternatives.',
            'Crimping needs the proper tool and a ferrule sized to the conductor. Pliers produce a joint that feels acceptable and is not.',
            'Fork terminals fit and release by loosening the screw; ring terminals need it removed but cannot fall off.',
            'A terminal block joins its two sides with an internal metal bar — that is how a strip makes field and panel wiring common.',
            'Blocks with disconnect links are designed-in break points, which is what Module 6 Section 2’s substitution testing needs.',
            '🔴 Two wires in one terminal is the wrong answer: a clamp grips one conductor properly and several badly.',
            '🔴 A multi-level block with internal jumpers is the designed solution, and it is explicitly preferable.',
            'Screwless spring clamps are quicker, and the repetitive wrist motion of screw work is a genuine occupational hazard.',
            'A gland must retain the cable, seal the entry and — where designed to — carry the screen through.',
            '🔴 A gland does nothing for the conductors past it. They need slack and support of their own.',
            'A fault correlating with vibration or temperature cycling is mechanical, and terminations belong on that list.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 7.2" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7-section-1')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Reading a loop diagram
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Loop design and load
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule7Section2;
