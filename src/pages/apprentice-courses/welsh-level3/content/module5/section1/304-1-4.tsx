/**
 * Unit 304 · Learning outcome 1 · Criterion 1.4 — Rationalise why the proposed
 * approach is the most appropriate
 *
 * The criterion learners find hardest to evidence, because it asks for the
 * reasoning behind a decision rather than the decision. Taught as options
 * appraisal: name the alternatives, judge them against the constraints that
 * actually apply, and record why the winner won.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  VideoCard,
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
import { videos } from '@/data/study-centre/video-library';

const quizQuestions = [
  {
    id: 1,
    question: 'What does "rationalise the approach" actually ask you to produce?',
    options: [
      'The alternatives you considered and why this one beat them',
      'A justification written after the decision to make it look considered',
      'The cheapest option, with the price as the reason',
      'A description of what you did',
    ],
    correctAnswer: 0,
    explanation:
      'A decision with no alternatives beside it is not a decision, it is a default. The reasoning is the thing being assessed, not the outcome.',
  },
  {
    id: 2,
    question: 'How many realistic options should you weigh before committing to an approach?',
    options: [
      'At least two genuine alternatives, plus doing nothing where that is real',
      'Exactly five, to show breadth',
      'One — the right answer is usually obvious',
      'As many as you can think of, however unlikely',
    ],
    correctAnswer: 0,
    explanation:
      'Two real options is enough to force a comparison. Padding the list with options nobody would take is as empty as considering none.',
  },
  {
    id: 3,
    question: 'A surface containment route is chosen over chasing walls in a listed building. What is the strongest form of that rationale?',
    options: [
      'Chasing risks irreversible damage to protected fabric; surface containment is reversible and was accepted by the client',
      'Surface containment is quicker',
      'Chasing is hard work',
      'The client did not ask for concealed cables',
    ],
    correctAnswer: 0,
    explanation:
      'The strongest rationale names the constraint that decided it. Speed and effort might be true, but they are not what makes this the appropriate approach here.',
  },
  {
    id: 4,
    question: 'Which is NOT a legitimate constraint to weigh an option against?',
    options: [
      'That it is the method you are most used to',
      'Cost, including the whole-life cost',
      'Disruption to the building’s occupants',
      'Compliance with BS 7671 and the specification',
    ],
    correctAnswer: 0,
    explanation:
      'Familiarity is a real influence on what people choose, which is exactly why it has to be named and set aside rather than mistaken for a reason.',
  },
  {
    id: 5,
    question: 'When should the rationale be recorded?',
    options: [
      'At the time the decision is made',
      'At handover, in the O&M information',
      'Only if the client queries it',
      'At the end of the job, from memory',
    ],
    correctAnswer: 0,
    explanation:
      'A rationale reconstructed later is a justification. Recorded at the time it is evidence — and on the day you are asked why, six months on, it is the only thing that still knows.',
  },
  {
    id: 6,
    question: 'Two options both comply with BS 7671. What decides between them?',
    options: [
      'The other constraints — cost, disruption, programme, maintainability, the client’s priorities',
      'Nothing; either is equally correct so pick one',
      'Whichever the wholesaler has in stock',
      'Whichever is in the manufacturer’s catalogue',
    ],
    correctAnswer: 0,
    explanation:
      'Compliance is the entry requirement, not the tie-breaker. Level 3 work is mostly choosing between options that are all compliant.',
  },
  {
    id: 7,
    question: 'What is "whole-life cost"?',
    options: [
      'What the option costs to install, run, maintain and eventually replace',
      'The installation price including VAT',
      'The cost of the materials only',
      'The client’s total budget for the project',
    ],
    correctAnswer: 0,
    explanation:
      'The cheapest thing to install is regularly the most expensive thing to own. A rationale that only counts the install price has not really compared the options.',
  },
  {
    id: 8,
    question: 'Why does this criterion matter to the professional discussion at the end of the qualification?',
    options: [
      'Because being asked "why did you do it that way?" is exactly what that assessment is',
      'It does not — the discussion is about health and safety',
      'Because the discussion is marked on speed of answering',
      'Because rationales are read out verbatim',
    ],
    correctAnswer: 0,
    explanation:
      'An externally-marked professional discussion is a sustained version of this criterion. Someone who has recorded their reasoning as they went has something to talk about; someone who has not is inventing it on the spot.',
  },
];

export default function Lesson304_1_4() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'A rationale names the alternatives and says why this one won. A decision with nothing beside it is a default.',
          'Compliance with BS 7671 and the specification is the entry requirement, not the tie-breaker.',
          'Weigh options against real constraints: cost over the whole life, disruption, programme, maintainability, the building.',
          '"It is how we always do it" is habit, not reasoning — and it fails first on the job that is not like the last one.',
          'Record it at the time. A rationale reconstructed later is a justification, and the professional discussion can tell.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain what a rationale is, and how it differs from a description or a justification written afterwards.',
          'Set out at least two genuine options for an approach and compare them against named constraints.',
          'Use compliance as the entry requirement and the remaining constraints as the tie-breaker.',
          'Account for whole-life cost rather than installation price alone.',
          'Record reasoning at the time, and recognise why that matters for the professional discussion.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Comparing the options</ContentEyebrow>

      <ConceptBlock
        title="A rationale is a comparison"
        plainEnglish="Not 'here is what I did' — 'here is what else I could have done, and why I did not'."
      >
        <p>
          This is the criterion learners find hardest, and it is usually for the same reason: they
          describe the approach rather than defend it. &ldquo;We ran the sub-main in SWA on
          tray&rdquo; is a description. It tells an assessor what happened and nothing about
          whether it was the right call.
        </p>
        <p>
          A rationale has three parts. What else was possible. What you judged each option against.
          Why the one you chose came out ahead. Take away the first part and there is nothing to
          compare; take away the second and the comparison has no basis; take away the third and you
          have a list rather than a decision.
        </p>
        <p>
          Two genuine alternatives is enough. Padding a list with options nobody would seriously
          take — running a sub-main in singles through a public corridor — is as hollow as
          considering none, and an assessor will read it as exactly that.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-1-4-check-1"
        question="Which of these is a rationale rather than a description?"
        options={[
          'Surface trunking was installed along the corridor at high level',
          'The client agreed to surface trunking',
          'Surface trunking was the method used throughout',
          'Surface trunking was chosen over chasing because the walls are protected fabric and the route had to be reversible',
        ]}
        correctIndex={3}
        explanation="Only the first names an alternative (chasing) and the constraint that ruled it out. The others say what happened."
      />

      <SectionRule />

      <ConceptBlock
        title="Compliance gets you to the start line"
        onSite="If two options both comply, the Regs have stopped helping. Something else has to decide."
      >
        <p>
          It is tempting to treat BS 7671 as the answer to &ldquo;why this way?&rdquo;. It rarely
          is. The standard, the specification and the manufacturer&rsquo;s instructions between them
          rule out the approaches that are not permissible — and then usually leave you with several
          that are.
        </p>
        <p>
          That is the whole of Level 3 decision-making: choosing between options that all comply.
          The constraints that actually decide it are things like:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Cost over the whole life</strong>, not just the install price — what it costs to
            run, maintain, and replace when it fails.
          </li>
          <li>
            <strong>Disruption</strong> — what has to go off, for how long, and to whom. On an
            occupied building this frequently outranks everything else.
          </li>
          <li>
            <strong>Programme</strong> — whether the approach fits the window you have, and what it
            does to the trades either side of you.
          </li>
          <li>
            <strong>Maintainability</strong> — whether the next person can get at it, test it and
            replace part of it without taking the rest apart.
          </li>
          <li>
            <strong>The building itself</strong> — fabric, listed status, structure, asbestos
            identified in the survey, and what you are permitted to cut into.
          </li>
          <li>
            <strong>The client&rsquo;s stated priorities</strong> — which, when they have told you
            what matters most, is a constraint and not a preference.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="The rationale written afterwards"
        whatHappens={
          <>
            The job is done and a paragraph gets written to explain it. Because the answer is
            already known, the reasoning is built to reach it: every constraint mentioned happens to
            favour the thing that was installed, and no option is described that might have won. It
            reads as thin, because it is.
          </>
        }
        doInstead={
          <>
            Capture the reasoning at the point of the decision, even as two lines in a site diary.
            Three months later it is the only record that still knows what the alternatives were,
            and it is the difference between a professional discussion you can hold and one you are
            improvising.
          </>
        }
      />

      <CommonMistake
        title="&ldquo;It is how we always do it&rdquo; standing in for the reasoning"
        whatHappens={
          <>
            <p>
              The method is chosen before the building has been looked at, because it is the
              method the firm uses. It has worked on the last thirty jobs, so nobody compares it
              against anything, and the rationale when it is asked for amounts to custom.
            </p>
            <p>
              Then comes the job that is not like the last thirty: the occupied ward, the
              protected fabric, the plant room where the ideal product will not fit. Habit has no
              way of noticing that, because it never had a constraint attached to it in the first
              place.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Keep the usual method as the strong candidate and make it earn the job. Name one
              genuine alternative and the constraints that matter here &mdash; whole-life cost,
              disruption, programme, maintainability, the building, and what the client has said
              matters most &mdash; and see whether the usual answer still wins.
            </p>
            <p>
              Most of the time it will, and now you have a rationale rather than a habit. When it
              does not, you have found it at the planning stage instead of halfway through the
              first fix.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Whole life cost</ContentEyebrow>

      <ConceptBlock title="Whole-life cost, briefly">
        <p>
          Price is the constraint everyone reaches for first and the one most often applied badly.
          The cheapest option to install is regularly the most expensive to own: a fitting that is
          twenty pounds less and fails in three years, a layout that saves a day now and makes every
          future fault take twice as long to find.
        </p>
        <p>
          You do not need a spreadsheet to take this seriously. Asking three questions is usually
          enough: what does it cost to run, what does it cost to maintain, and what happens when
          part of it fails. An option that wins on install price and loses all three of those is not
          the cheapest option, and saying so is the kind of reasoning this criterion is looking for.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-1-4-check-2"
        question="Two luminaire options both comply. A is £18 cheaper each; B has a replaceable driver and a ten-year warranty. What does a whole-life comparison need?"
        options={[
          'Nothing further — A is cheaper, so A wins',
          'The opinion of the wholesaler',
          'Whichever has the higher lumen output',
          'The cost of replacing A when it fails against the cost of a driver for B, over the period the client will own it',
        ]}
        correctIndex={3}
        explanation="The comparison only becomes real once you count what happens after installation. It may still come out in A's favour — the point is that you looked."
      />

      <InlineCheck
        id="304-1-4-check-3"
        question="Your rationale says the chosen option was cheaper, quicker, tidier and easier to maintain than both alternatives. What should that prompt?"
        options={[
          'Nothing; it was simply the best option',
          'Adding a fourth option to the comparison',
          'A second look — real decisions usually involve a trade-off somewhere',
          'Removing the alternatives, since they were never competitive',
        ]}
        correctIndex={2}
        explanation="An option that wins on everything is either a genuinely easy decision — which is worth saying — or a rationale assembled after the fact to fit the answer. Naming which constraint you let win is the stronger move."
      />

      <Scenario
        title="Two compliant answers, one appropriate one"
        situation={
          <>
            A care home in Colwyn Bay needs its corridor lighting replaced. Option A is a
            like-for-like swap, rewiring to the existing positions over four days with the corridor
            circuit off during working hours. Option B uses the existing positions but adds
            emergency conversion and self-test, taking six days and requiring two short shutdowns
            at night. Both comply. B costs more.
          </>
        }
        whatToDo={
          <>
            The constraint that decides it is the building: a care home is occupied around the
            clock by people who cannot easily be moved, and a corridor without light during a
            working day is a different proposition here than it would be in an office. The night
            shutdowns are longer overall but leave the corridor lit whenever residents are moving.
            Record that as the reason — not &ldquo;B is better&rdquo;, but that the occupancy
            pattern made A&rsquo;s daytime outages the unacceptable part.
          </>
        }
        whyItMatters={
          <>
            A rationale that said &ldquo;chose B, it is a better installation&rdquo; would be true
            and useless. The one that names the occupancy constraint tells the next person why, and
            would still make sense if the same building were an empty office — where A might well be
            the right answer.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Inherited decisions and the Regs</ContentEyebrow>

      <ConceptBlock title="When the decision was not yours">
        <p>
          Plenty of approaches are set by the specification, the designer or the client before you
          arrive. That does not remove this criterion; it changes what you record. Note that the
          specification determined it, and note anything you raised.
        </p>
        <p>
          That second half matters. If you believe a specified approach is wrong — unmaintainable,
          poorly suited to the building, or storing up a problem — the moment to say so is at the
          planning stage, in writing, to whoever can change it. Installing it silently and
          mentioning your reservations afterwards is the worst of both: the problem still exists and
          nobody can show you flagged it.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="The Regs themselves ask you to justify the choice"
        plainEnglish="Equipment has to suit where it is going. That is a rationale requirement in the standard."
      >
        <p>
          It is worth noticing that this criterion is not purely a paperwork habit. BS 7671 requires
          equipment to be of a design appropriate to the situation it is used in, and requires
          selection and erection to take account of the external influences likely to be encountered
          — mechanical impact, ingress of solids and liquids, chemical attack, thermal extremes,
          vibration.
        </p>
        <p>
          That is a rationale in regulatory form. Choosing a wiring system for a dairy, a car park
          or a plant room is not a matter of preference; it is a judgement about conditions, and it
          is one you should be able to explain.
        </p>
        <p>
          There is a second half worth knowing: where equipment does not have the right
          characteristics by construction, it may still be used if appropriate additional protection
          is provided — and that protection must not interfere with how the equipment works. That is
          itself an option with a rationale attached, and a common one on a refurbishment where the
          ideal product will not fit.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 512.2.1 and 512.2.2"
        meaning="Equipment shall be of a design appropriate to the situation in which it is to be used, and selection and erection shall take account of the external influences likely to be encountered. Where equipment does not by its construction have the characteristics relevant to the external influences of its location, it may still be used provided appropriate additional protection is given during erection — and that protection must not adversely affect the operation of the equipment it protects."
        cite="BS 7671 Part 5 — Selection and Erection of Equipment"
      />

      <VideoCard
        {...videos.containmentVsClipping}
        topic="A method choice argued out loud — the kind of reasoning this criterion wants"
      />

      <SectionRule />

      <ContentEyebrow>Constraints and agreement</ContentEyebrow>

      <ConceptBlock
        title="Constraints pull against each other"
        onSite="If every constraint favours your choice, you have not found the real trade-off."
      >
        <p>
          A rationale that reads as though one option won on every count is usually a rationale
          written backwards. Real decisions involve a trade: the approach that causes least
          disruption costs more, the one that fits the programme is harder to maintain, the cheapest
          to install needs the most attention later.
        </p>
        <p>
          Saying which constraint you let win is the strongest thing you can put in a rationale. It
          shows you understood the decision rather than found a comfortable answer —{' '}
          &ldquo;this costs more and takes longer, and we chose it because the ward could not lose
          its supply during the day&rdquo; tells a reader everything.
        </p>
        <p>
          It is also what protects you later. A cost that was knowingly accepted for a stated reason
          is a decision; the same cost with no reasoning attached looks like an overrun.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Who has to agree, and when">
        <p>
          Some approach decisions are yours. Some are the designer&rsquo;s, some the client&rsquo;s,
          and some are only yours until they affect cost, appearance or the specification — at which
          point they stop being yours quietly.
        </p>
        <p>
          The test is simple enough: does this change what the client is paying for, what they will
          see, or what the specification said? If yes, it needs agreement before it is installed, and
          the agreement wants to be in writing. If no, record the reasoning and get on with it.
        </p>
        <p>
          Getting this wrong in the generous direction — making a sensible improvement nobody asked
          for — is still getting it wrong, and it is the version people feel hardest done by when
          it is queried.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Doing nothing as an option</ContentEyebrow>

      <ConceptBlock title="Doing nothing is an option too">
        <p>
          On repair, replacement and upgrade work there is usually a third option beside the two
          you are weighing: leave it. Not as neglect, but as a considered position — monitor it,
          schedule it for the next shutdown, or do the safety-critical part now and the rest later.
        </p>
        <p>
          It belongs in the comparison because it is frequently what the client would choose if
          anyone offered it. A rationale that names it and rules it out is stronger than one that
          quietly assumed the work had to happen this week, and it is honest about the fact that
          budget and disruption are real constraints rather than obstacles.
        </p>
        <p>
          Where doing nothing is not a legitimate option — because the installation is unsafe —
          saying so explicitly is the most useful sentence in the whole rationale.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'How long should a recorded rationale be?',
            answer:
              'Two or three sentences covers most decisions: what else was possible, what decided it, and the choice. Length is not the measure — a paragraph naming a real constraint beats a page of generalities. The decisions worth more space are the ones that were close, or that someone is likely to question later.',
          },
          {
            question: 'What if I genuinely only had one option?',
            answer:
              'Then say so and say why the others were ruled out, because that is still a comparison. "Only surface containment was possible, as the survey identified asbestos in the wall construction" is a complete rationale with one surviving option. What it should not be is "there was only one way of doing it" with nothing behind it — that is almost never true.',
          },
          {
            question: 'Where should rationales be recorded in practice?',
            answer:
              'Wherever you will find them again: a site diary, the job notes, an email to the client confirming an agreed approach. The email is often the best of the three, because it records the reasoning and the agreement in the same place and neither side can later remember it differently.',
          },
          {
            question: 'Does this get assessed separately from the rest of the unit?',
            answer:
              'The knowledge is tested with the rest of the externally-set questions. Where it really shows up is the externally-marked professional discussion, which is in large part a sustained version of this criterion — being asked why you did it that way, and then asked again about the part of the answer that was thinnest.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'A rationale names alternatives, names the constraints, and says why the winner won.',
          'Two genuine options are enough; padding with unrealistic ones reads as padding.',
          'Compliance is the entry requirement — at Level 3 you are choosing between compliant options.',
          'Real constraints: whole-life cost, disruption, programme, maintainability, the building, the client’s stated priorities.',
          'The cheapest to install is often the most expensive to own.',
          '"How we always do it" is habit, and it breaks on the first job that is different.',
          'Record the reasoning at the time — later it becomes a justification, and it shows.',
          'Where the approach was specified for you, record that, and record anything you raised about it.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Rationalise why the proposed approach is the most appropriate" />
    </div>
  );
}
