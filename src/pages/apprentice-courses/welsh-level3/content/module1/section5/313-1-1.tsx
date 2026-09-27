/**
 * Unit 313 · Learning outcome 1 · Criterion 1.1 — The sources of technical and
 * functional information
 *
 * Unit 313 (Establish and Maintain Relationships in the BSE Sector, 26 GLH) is
 * the third Welsh unit with no C&G equivalent. Peter Ellis named it with 314 as
 * where learners struggle.
 *
 * ⚠️ GROUNDING NOTE: the RAG is thin on relationship management. The
 * `construction-commercial` handover material is web-scraped with navigation
 * boilerplate and does not frame relationships; the only on-point employer
 * source is JTL duty statements. This unit is therefore written from the
 * qualification's own criteria plus BS 7671 where it genuinely applies, and
 * makes no regulatory claim it cannot support.
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
    question: 'What is the difference between technical and functional information?',
    options: [
      'Technical describes how the installation is built; functional describes what it does and how it is used',
      'Technical is written, functional is verbal',
      'Technical is for electricians, functional is for clients',
      'There is no difference',
    ],
    correctAnswer: 0,
    explanation:
      'A schedule of test results is technical. "The immersion runs on the timer in the airing cupboard" is functional. Most jobs need both and people supply only the first.',
  },
  {
    id: 2,
    question: 'Which source tells you what the installation was intended to do?',
    options: [
      'The specification and the design',
      'The delivery notes',
      'The site diary',
      'The previous certificate',
    ],
    correctAnswer: 0,
    explanation:
      'Intent lives in the specification. Drawings tell you where things go; the specification tells you what the design was trying to achieve.',
  },
  {
    id: 3,
    question:
      'What does a previous Electrical Installation Certificate or condition report give you?',
    options: [
      'A record of what was there, how it was verified, and what was found at the time',
      'Permission to work on the installation',
      'A guarantee the installation is still compliant',
      'The current circuit arrangement',
    ],
    correctAnswer: 0,
    explanation:
      'It is a snapshot with a date on it. Enormously useful as a starting point and never a substitute for establishing what is actually there now.',
  },
  {
    id: 4,
    question: 'Which of these is a functional information source most people overlook?',
    options: [
      'The people who use the building every day',
      'The manufacturer’s website',
      'The original drawings',
      'The wholesaler',
    ],
    correctAnswer: 0,
    explanation:
      'The caretaker, the ward sister, the shop manager — they know which sockets fail, which circuit trips, and what nobody is allowed to switch off. None of it is written anywhere.',
  },
  {
    id: 5,
    question: 'Manufacturer information matters because?',
    options: [
      'Equipment has to be installed and operated as its maker requires, and the client needs that information too',
      'It is the only reliable source',
      'It overrides BS 7671',
      'It is needed for the warranty only',
    ],
    correctAnswer: 0,
    explanation:
      'It governs your installation and it is part of what the user needs afterwards. Both halves matter and the second is the one that gets left in the box.',
  },
  {
    id: 6,
    question: 'A drawing and the building disagree. What is the drawing worth?',
    options: [
      'It is still evidence of intent, and the discrepancy is information in itself',
      'Nothing — discard it',
      'It overrides the building',
      'It should be corrected on site without telling anyone',
    ],
    correctAnswer: 0,
    explanation:
      'A discrepancy usually means either the design changed or the building did. Either way somebody needs to know, and quietly resolving it loses the information.',
  },
  {
    id: 7,
    question: 'What makes a source reliable?',
    options: [
      'Knowing what it is, when it was made, and what it was for',
      'Whether it is printed',
      'Whether it came from the client',
      'How detailed it is',
    ],
    correctAnswer: 0,
    explanation:
      'An undated sketch from an unknown author is not evidence. Provenance and date are what let you judge how much weight to put on something.',
  },
  {
    id: 8,
    question: 'Why does this criterion sit in a relationships unit?',
    options: [
      'Because most of the information you need is held by other people',
      'Because information is always written down',
      'Because clients own the drawings',
      'It does not — it belongs in a design unit',
    ],
    correctAnswer: 0,
    explanation:
      'Sources are rarely a filing cabinet. They are a designer, a caretaker, a previous contractor, a manufacturer — and getting information out of people is a relationship skill.',
  },
];

export default function Lesson313_1_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Technical information says how it is built. Functional says what it does and how it is used.',
          'Most sources are people, not documents — the designer, the caretaker, the previous contractor.',
          'Judge a source by what it is, when it was made and what it was for.',
          'A drawing that disagrees with the building is still evidence, and the discrepancy is itself information.',
          'This is in a relationships unit because the information you need is mostly held by somebody else.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Distinguish technical information from functional information, and say why both are needed.',
          'List the sources available on a typical job, including the ones that are not documents.',
          'Judge a source by its provenance and date rather than by how detailed it looks.',
          'Treat a discrepancy between a drawing and the building as information rather than an obstacle.',
          'Explain why gathering information is a relationship skill as much as a research one.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Technical and functional information</ContentEyebrow>

      <ConceptBlock
        title="Two kinds of information, and most people supply one"
        plainEnglish="How it is built, and how it is used. Both matter and the second gets forgotten."
      >
        <p>The unit deliberately pairs the words, and the pairing is the lesson.</p>
        <p>
          <strong>Technical information</strong> describes the installation as an engineered thing:
          circuit arrangements, conductor sizes, protective device ratings, test results, earthing
          and bonding arrangements, drawings and schedules. It is what another electrician needs.
        </p>
        <p>
          <strong>Functional information</strong> describes what it does and how it is operated:
          which switch controls what, how the timer is set, what happens when the RCD trips, which
          isolator must never be opened during business hours. It is what the person living or
          working with the installation needs.
        </p>
        <p>
          Nearly every job produces good technical information and patchy functional information.
          That imbalance is where most post-handover calls come from — not faults, but people who
          have not been told how to use what they have been given.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="313-1-1-check-1"
        question="Which of these is functional information?"
        options={[
          'The immersion is on a timer in the airing cupboard and overrides at the wall switch',
          'The immersion circuit is 2.5 mm² on a 16 A Type B',
          'Zs on the immersion circuit measured 0.68 Ω',
          'The immersion is on way 7 of the board',
        ]}
        correctIndex={0}
        explanation="The other three are technical — they describe how it is built and what it measured. Only the first tells somebody how to use it."
      />

      <SectionRule />

      <ContentEyebrow>Where the sources live</ContentEyebrow>

      <ConceptBlock
        title="Where the information actually lives"
        onSite="Most of what you need is in somebody's head, not in a folder."
      >
        <p>
          The criterion asks for sources, and the honest list is longer than a document register:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The specification.</strong> What the design was trying to achieve — intent
            rather than position.
          </li>
          <li>
            <strong>Drawings and schedules.</strong> Where things go and what they are, at the
            revision they were issued.
          </li>
          <li>
            <strong>Previous certification.</strong> An EIC, a condition report, a minor works
            certificate. A dated snapshot of what was there and how it verified.
          </li>
          <li>
            <strong>Manufacturer information.</strong> Installation instructions, operating
            instructions, ratings and limitations for what is being installed.
          </li>
          <li>
            <strong>BS 7671 and its guidance.</strong> The requirements, and the On-Site Guide and
            Guidance Notes that illustrate them.
          </li>
          <li>
            <strong>Pre-construction information.</strong> What the client holds about the site and
            the risks that were not designed out.
          </li>
          <li>
            <strong>The installation itself.</strong> Labels, notices, what is actually in the
            board, what the cables are doing.
          </li>
          <li>
            <strong>People.</strong> The designer, the previous contractor, the maintenance team,
            and the people who use the building daily.
          </li>
        </ul>
        <p>
          That last one is the source with the highest value per minute and the least documentation.
          A caretaker can tell you in ninety seconds which circuit trips in heavy rain, which room
          floods, and what nobody is permitted to switch off — none of which is written anywhere.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Judging what a source is worth">
        <p>
          Not all information deserves equal weight, and the way to tell is not how detailed it
          looks. Three questions settle it:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>What is it?</strong> A design drawing, an as-installed drawing and a sketch
            somebody made during a survey are three different things that can look identical.
          </li>
          <li>
            <strong>When was it made?</strong> An undated document is nearly worthless for anything
            that changes, and installations change constantly.
          </li>
          <li>
            <strong>What was it for?</strong> A drawing produced for tender purposes is not a
            statement of what was built. A condition report was written to answer a different
            question from the one you are asking.
          </li>
        </ul>
        <p>
          A confident-looking document with no provenance is the one to be most careful of — the
          same trap as the superseded standard. It answers, and nobody checks.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating the drawing as the building"
        whatHappens={
          <>
            Work is planned and priced off a drawing that turns out to describe either what was
            intended years ago or what somebody proposed and never built. The first fix goes in
            around a route that does not exist, and the discrepancy is discovered with the floor up
            and the programme committed.
          </>
        }
        doInstead={
          <>
            Treat a drawing as evidence of intent and verify what matters on site before you commit
            to it. And when the two disagree, say so — the difference is information somebody needs,
            and quietly working around it means the next person meets the same surprise.
          </>
        }
      />

      <CommonMistake
        title="Keeping what you were told in your head"
        whatHappens={
          <>
            <p>
              The caretaker tells you on the first morning which circuit trips in heavy rain, and
              the ward sister tells you a particular supply was decommissioned two years ago. Both
              are gold, both take ten seconds to hear, and neither gets written down because you
              are carrying a drum at the time.
            </p>
            <p>
              Three weeks later somebody asks why that supply was isolated. You remember being told
              and you cannot say by whom or when, and the person who told you has no memory of the
              conversation. A good source has turned into your word against nobody&rsquo;s.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Write down what you are told, with who told you and when. Verbal information is
              genuinely valuable and it evaporates, and the note naming the person and the date is
              the whole of your position on the day it is questioned.
            </p>
            <p>
              Ask in a way that produces something worth writing down. Ask early, while the answer
              can still change the plan, ask the person who knows the building rather than the
              person who knows the contracts, and ask specifically &mdash; &ldquo;is there anything
              that trips, or anything I must not switch off?&rdquo; gets an answer where a general
              question gets a shrug.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Notices the Regs require</ContentEyebrow>

      <ConceptBlock
        title="Notices are information the Regs require"
        plainEnglish="Some functional information has to be left on the installation, not just handed over."
      >
        <p>
          A part of this is not discretionary. BS 7671 includes requirements for notices — including
          notices concerning periodic inspection and testing under Regulation 514.12 — which put
          specific information onto the installation itself so that it is there for whoever comes
          next, long after any conversation has been forgotten.
        </p>
        <p>
          A4:2026 introduced an exception within 514.12 for domestic (household) premises in certain
          situations. It is conditional rather than general: the qualifying conditions are set out
          in the regulation, so the wording has to be read rather than assumed. That is the same
          discipline as anywhere else — an exception you half-remember is not an exception you can
          rely on.
        </p>
        <p>
          The principle is worth holding on to for the rest of this unit: some information has a
          home on the installation, some has a home with the person who ordered the work, and some
          only ever lives in a conversation. The third kind is the one that disappears.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 514.12 — Notices: periodic inspection and testing"
        meaning="BS 7671 sets requirements for notices concerning the periodic inspection and testing of electrical installations. A4:2026 introduced an exception within Regulation 514.12 for domestic (household) premises in certain situations — the exception is conditional and the qualifying situations are defined in the regulation itself, so read the full wording rather than assuming it applies."
        cite="BS 7671 Part 5, Chapter 51"
      />

      <InlineCheck
        id="313-1-1-check-2"
        question="A client hands you an undated single-line diagram with no title block. How should you treat it?"
        options={[
          'As a useful starting point whose provenance you cannot establish — verify anything you rely on',
          'As the authoritative record of the installation',
          'As worthless, and discard it',
          'As an as-installed drawing',
        ]}
        correctIndex={0}
        explanation="It may be accurate and you have no way of knowing. Without a date or an author you cannot tell whether it is a design, a proposal or a survey sketch."
      />

      <SectionRule />

      <ContentEyebrow>Getting it out of people</ContentEyebrow>

      <ConceptBlock title="Getting information out of people">
        <p>
          The sources that are people need a different approach from the sources that are documents,
          and this is why the criterion sits in a relationships unit rather than a design one.
        </p>
        <p>
          Three things make it work. Ask early, while there is time for the answer to change
          anything. Ask specifically — &ldquo;is there anything I should know about the
          installation?&rdquo; gets a shrug, and &ldquo;is there anything that trips, or anything I
          must not switch off?&rdquo; gets an answer. And ask the right person: the facilities
          manager knows the contracts, the caretaker knows the building.
        </p>
        <p>
          Then write down what you are told, with who told you and when. Verbal information is
          genuinely valuable and it evaporates — and on the day somebody questions why you isolated
          something, the note that the ward sister told you it was decommissioned is the whole of
          your position.
        </p>
      </ConceptBlock>

      <ConceptBlock title="When the information does not exist">
        <p>
          Frequently there is nothing: an older domestic property with no certification, a small
          commercial unit that has been altered by four contractors, a building whose drawings were
          lost in a change of ownership.
        </p>
        <p>
          That is a finding rather than a dead end, and it should be said out loud. What it means
          practically is that more has to be established by inspection and testing, that the
          unknowns are risks to be managed rather than gaps to be assumed away, and that the
          information you produce matters more than usual — because you are writing the first record
          this installation has had in years.
        </p>
      </ConceptBlock>

      <Scenario
        title="Ninety seconds with the caretaker"
        situation={
          <>
            A rewire of a village hall kitchen near Llanidloes. The drawings are twenty years old,
            the certification is missing, and the job is priced on a survey. On the first morning
            the caretaker mentions, in passing, that the socket circuit in the kitchen has tripped
            every time the hall floods — which it does most winters — and that the previous
            electrician put something in the cupboard about it.
          </>
        }
        whatToDo={
          <>
            That one remark redirects the job. It points at water ingress affecting a circuit,
            something in a cupboard that is worth finding, and a history nobody wrote down. It
            changes what is tested, what is asked of the client, and possibly the route and the
            wiring system chosen.
          </>
        }
        whyItMatters={
          <>
            None of it was in any document, and none of it would have been volunteered to a question
            like &ldquo;is there anything I should know?&rdquo; It came out because somebody spent
            ninety seconds talking to the person who is in the building every day. That is a source,
            and it is the one this unit is really about.
          </>
        }
      />

      <InlineCheck
        id="313-1-1-check-3"
        question="There is no certification, no drawings and no history for an installation. What does that mean for the job?"
        options={[
          'The work cannot proceed',
          'You can assume it was compliant when installed',
          'More has to be established by inspection and testing, and the unknowns are managed as risks',
          'The client is at fault',
        ]}
        correctIndex={2}
        explanation="Absent information is a finding to state and plan around. Assuming anything about an installation nobody has documented is how a job meets a surprise with the floor already up."
      />

      <SectionRule />

      <ContentEyebrow>The information you leave behind</ContentEyebrow>

      <ConceptBlock title="Information you create is a source too">
        <p>
          Everything in this criterion looks backwards — what exists, who holds it, how far it can
          be trusted. The same job produces information that becomes somebody else&rsquo;s source,
          usually somebody you will never meet.
        </p>
        <p>
          Your schedule is the next electrician&rsquo;s starting point. Your marked-up drawing is
          what tells them the installation differs from the design. Your labelling is what they read
          before they open anything. Every frustration in this criterion about undated, unsourced,
          ambiguous information is a description of what you are about to leave behind if nobody
          thinks about it.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Ask before the job, not during it">
        <p>
          Almost all of this is cheap at the survey and expensive later. Drawings requested in week
          one arrive; requested on the morning you need them, they do not. A caretaker asked before
          the job starts has time to think and to find the folder in the cupboard.
        </p>
        <p>
          It is worth having a short standing list of what you ask for on every job of a given type
          — previous certification, drawings with revisions, manufacturer information for anything
          retained, pre-construction information, and the name of whoever knows the building. A list
          survives a busy week in a way that intention does not.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'How much survey should I do before relying on a drawing?',
            answer:
              'Enough to verify whatever you are about to commit money or programme to. Routes, board positions and anything structural are worth checking; accessory positions in a room you will be working in anyway are usually not. The rule of thumb is to verify what would be expensive to be wrong about.',
          },
          {
            question: 'The client will not give me the information they hold. What now?',
            answer:
              'Ask in writing and say what you need it for — that often unlocks it, because people withhold out of uncertainty more than obstruction. Where it genuinely does not arrive, record that you asked, treat the unknowns as risks in your planning, and price or programme accordingly rather than assuming the best case.',
          },
          {
            question: 'Is information from a previous contractor reliable?',
            answer:
              'It is a source like any other, and the three questions apply — what is it, when was it made, what was it for. A certificate they issued is good evidence of what they found at that date. A verbal account of what they did is worth having and worth verifying, particularly where it concerns anything that is now hidden.',
          },
          {
            question: 'Why does this unit exist separately from the technical ones?',
            answer:
              'Because the information a job needs is mostly held by other people, and getting it out of them is a distinct skill from knowing what to do with it once you have it. Peter Ellis at Grŵp Llandrillo Menai named this unit and 314 as where learners struggle, precisely because apprentices rarely get to practise this side of the job.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Technical information is how it is built; functional is what it does and how it is used.',
          'Functional information is the half that gets left out, and it causes most post-handover calls.',
          'Sources include the specification, drawings, previous certification, manufacturer data, BS 7671, the installation itself — and people.',
          'The people sources have the highest value per minute and no documentation at all.',
          'Judge a source by what it is, when it was made, and what it was for.',
          'A drawing that disagrees with the building is evidence, and the discrepancy is information to pass on.',
          'BS 7671 requires certain notices on the installation — 514.12 has a conditional domestic exception in A4:2026.',
          'Where no information exists, say so and plan for it rather than assuming.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="The sources of technical and functional information" />
    </div>
  );
}
