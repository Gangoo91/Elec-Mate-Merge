/**
 * Unit 304 · Learning outcome 2 · Criterion 2.4 — Evaluate own performance
 *
 * The criterion most likely to produce either false modesty or a list of
 * excuses. Taught against a fixed reference — skills, knowledge, training and
 * experience — so the learner is judging themselves against something external
 * rather than against how the job felt.
 *
 * Grounded on CDM 2015 (HSE L153): a contractor must not appoint anyone unless
 * they have the skills, knowledge, training and experience for the work, or are
 * in the process of obtaining them; skills decline without use; softer skills
 * such as foreseeing risk count.
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
    question: 'What should you evaluate your own performance against?',
    options: [
      'A fixed reference — the skills, knowledge, training and experience the work needed',
      'How the job felt',
      'Whether anyone criticised you',
      'How the rest of the team performed',
    ],
    correctAnswer: 0,
    explanation:
      'Without an external reference this criterion collapses into mood. Against SKTE it becomes a set of answerable questions.',
  },
  {
    id: 2,
    question: 'Which of these is a usable self-evaluation?',
    options: [
      'I had not sized a sub-main since college and had to check the method twice',
      'I worked hard throughout',
      'I did my best in difficult circumstances',
      'Everything went fine from my side',
    ],
    correctAnswer: 0,
    explanation:
      'The first names a specific gap and what it cost. The others describe effort or feeling, neither of which can be acted on.',
  },
  {
    id: 3,
    question: 'Why does CDM care about skills that are not used regularly?',
    options: [
      'Because skills decline without use, so occasional tasks carry more risk than familiar ones',
      'Because unused skills expire formally',
      'It does not — competence is permanent once gained',
      'Because refresher training is compulsory annually',
    ],
    correctAnswer: 0,
    explanation:
      'The guidance flags people who deputise or do something occasionally as needing more frequent refreshing than those doing it daily. That is a genuine self-evaluation prompt.',
  },
  {
    id: 4,
    question: 'A "softer skill" in this context means what?',
    options: [
      'Things like foreseeing risk, anticipating others’ mistakes and communicating clearly',
      'Being easy to get along with',
      'Skills outside electrical work',
      'Anything not covered by a qualification',
    ],
    correctAnswer: 0,
    explanation:
      'These are named in the CDM guidance as things a contractor should consider, and they are exactly the areas a Level 3 learner is starting to be judged on.',
  },
  {
    id: 5,
    question: 'You identified a gap during the job and asked for help. How should that be evaluated?',
    options: [
      'As a strength — recognising a limit and acting on it is competence, not weakness',
      'As a failure to be self-sufficient',
      'As neutral, and not worth recording',
      'As a training department problem',
    ],
    correctAnswer: 0,
    explanation:
      'The alternative is somebody working beyond their competence in silence. Knowing the edge of what you can do is one of the things being assessed.',
  },
  {
    id: 6,
    question: 'What makes a self-evaluation credible to an assessor?',
    options: [
      'Specific examples with what you did about them',
      'Balance between positives and negatives',
      'Length and detail',
      'Modesty',
    ],
    correctAnswer: 0,
    explanation:
      'An assessor is looking for evidence that you can see your own work clearly. A specific incident with a specific response demonstrates that; a balanced summary of nothing does not.',
  },
  {
    id: 7,
    question: 'How should you evaluate something that went wrong because of somebody else?',
    options: [
      'Record what happened, then ask what you could have done differently within your control',
      'Leave it out — it was not your performance',
      'Record it as the other party’s failing and stop',
      'Treat it as your fault regardless',
    ],
    correctAnswer: 0,
    explanation:
      'Both extremes are dead ends. There is usually something inside your control — noticing earlier, escalating sooner, writing it down — and that part is your performance.',
  },
  {
    id: 8,
    question: 'What should a self-evaluation end with?',
    options: [
      'One or two specific things you will do differently, and how you will know',
      'A commitment to continue improving',
      'A summary of the job',
      'A request for training',
    ],
    correctAnswer: 0,
    explanation:
      '"Improve communication" is not actionable. "Confirm variations in writing before starting the extra work" is, and you will know within a job whether you did it.',
  },
];

export default function Lesson304_2_4() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Judge yourself against a fixed reference — skills, knowledge, training, experience — not against mood.',
          '"I worked hard" is effort. "I had not done this since college and checked the method twice" is evaluation.',
          'Skills decline without use; the occasional task carries more risk than the daily one.',
          'Recognising a limit and asking is competence, not weakness — the alternative is silent overreach.',
          'Finish with one or two specific changes you could actually be held to.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Evaluate yourself against skills, knowledge, training and experience rather than against how the job felt.',
          'Write a self-evaluation that names a specific gap and what it cost.',
          'Recognise that skills decline without use, and identify which of yours are occasional.',
          'Include the softer skills — foreseeing risk, anticipating mistakes, communicating clearly.',
          'Separate what was in your control from what was not, without using either as a hiding place.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Judge against a standard</ContentEyebrow>

      <ConceptBlock
        title="Judge against something, not nothing"
        plainEnglish="Not 'how did I do?' — 'did I have what this work needed?'"
      >
        <p>
          Asked to evaluate their own performance, most people produce one of two things: a modest
          statement that they did their best, or an account of everything that made the job
          difficult. Both are honest and neither is useful, because neither is measured against
          anything.
        </p>
        <p>
          There is a ready-made reference. CDM uses the phrase{' '}
          <strong>skills, knowledge, training and experience</strong> — what a person needs to carry
          out the work they are employed to do. Four words, and each turns into a question you can
          actually answer:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Skills.</strong> Could I physically do the tasks to the standard required, at a
            reasonable pace?
          </li>
          <li>
            <strong>Knowledge.</strong> Did I understand why, or was I following a method I could
            not have justified?
          </li>
          <li>
            <strong>Training.</strong> Had I been shown this properly, or was I working it out?
          </li>
          <li>
            <strong>Experience.</strong> Had I met this situation before, and did that help or
            mislead me?
          </li>
        </ul>
        <p>
          Four answers about a specific job is a self-evaluation. &ldquo;It went well&rdquo; is not.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulations 8 and 15 · guidance in HSE L153, paragraphs 163–173"
        meaning="A contractor must not appoint anyone to carry out work unless satisfied they have the skills, knowledge, training and experience to do it in a way that secures health and safety — or are in the process of obtaining them. The guidance adds two points worth applying to yourself: skills decline if they are not used regularly, so people who do something only occasionally may need refreshing more often than those who do it daily; and contractors should consider softer skills such as the ability to foresee risk, anticipate the mistakes others might make, and communicate clearly."
        cite="HSE L153, Managing health and safety in construction"
      />

      <InlineCheck
        id="304-2-4-check-1"
        question="Which of these is an evaluation rather than a feeling?"
        options={[
          'I found the job stressful',
          'I think I coped well',
          'I had to look up the disconnection time requirement twice, which slowed the design',
          'The programme was unrealistic',
        ]}
        correctIndex={2}
        explanation="It names a specific knowledge gap and what it cost. The second is a feeling, the third an opinion, and the fourth is about somebody else's planning."
      />

      <SectionRule />

      <ContentEyebrow>Occasional and non technical skills</ContentEyebrow>

      <ConceptBlock
        title="The skills you only use occasionally"
        onSite="What did you do on this job that you had not done for a year?"
      >
        <p>
          The CDM guidance makes a point that is easy to miss and unusually useful for reflection:
          skills decline when they are not used, and people who deputise or do something only
          occasionally may need more frequent refreshing than those doing it every day.
        </p>
        <p>
          Every job has a few of these. The first three-phase board in eighteen months. A
          calculation you last did at college. A test you have watched more often than performed. A
          type of building you rarely work in.
        </p>
        <p>
          Naming them is not an admission — it is the most practical output this criterion produces.
          An occasional task you identify in advance can be prepared for, checked, or done alongside
          someone who does it regularly. The same task unnoticed is where the slow, careful, quietly
          uncertain work happens, and sometimes where the error does.
        </p>
      </ConceptBlock>

      <ConceptBlock title="The half that is not technical">
        <p>
          At Level 3 you are starting to be judged on things no test covers. The guidance names some
          of them directly: foreseeing risk, staying sensitive to it, anticipating the mistakes
          others might make, and communicating clearly.
        </p>
        <p>Those translate into honest questions about a specific job:</p>
        <ul className="space-y-2 text-white">
          <li>Did I see the problem coming, or did I find out when it arrived?</li>
          <li>Did I tell somebody in time for it to matter, or after it stopped mattering?</li>
          <li>Did I check that an instruction had been understood, or assume it had?</li>
          <li>Did I notice when someone else was about to make a mistake?</li>
        </ul>
        <p>
          These are the areas that separate an electrician from someone who can run a job, and this
          unit is where the qualification starts asking about them.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="The balanced summary that says nothing"
        whatHappens={
          <>
            A paragraph noting some strengths, an area for development, and an intention to keep
            improving. It is inoffensive, it is the same on every job, and it demonstrates no
            self-knowledge whatsoever. An assessor has read a great many of these and can recognise
            one at a glance.
          </>
        }
        doInstead={
          <>
            Pick one thing that actually happened and follow it through: what the situation was,
            what you did, what it cost or saved, and what you would do differently. One incident
            examined properly is worth more than a page of balance.
          </>
        }
      />

      <CommonMistake
        title="Offering effort where the question asked about performance"
        whatHappens={
          <>
            <p>
              The evaluation comes down to how hard the week was. Long days, no breaks, staying
              late on the Thursday to get the floor finished. All of it is true, and none of it
              answers the question, because effort is what you put in and performance is what the
              work needed and whether you supplied it.
            </p>
            <p>
              The two come apart in both directions. A job can absorb an enormous amount of effort
              precisely because the approach was wrong, and a well-planned one can look almost
              effortless from outside. An account built on effort cannot tell those apart, which
              is usually why it was reached for.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Ask where the effort was going. Into the work itself, or into compensating for
              something &mdash; a route that had to be reworked, information that never arrived, a
              sequence that was wrong from the start? That question turns a hard week into a
              finding.
            </p>
            <p>
              Then measure the performance against the fixed reference rather than against how it
              felt: did I have the skills, the knowledge, the training and the experience this
              work needed? Four specific answers about one job beat any amount of description of
              how much of yourself you put into it.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Asking for help</ContentEyebrow>

      <ConceptBlock
        title="Asking is a competence, not a gap"
        plainEnglish="Knowing the edge of what you can do is part of being competent at it."
      >
        <p>
          Learners often treat &ldquo;I had to ask&rdquo; as something to be apologised for in an
          evaluation. It is the opposite. The alternative to recognising a limit is working past it
          in silence, and on electrical work that is the failure mode that hurts people.
        </p>
        <p>
          So record it as what it is: you identified that the work was beyond what you had done
          before, you got help or checked the method, and the work was done correctly. That is a
          complete and creditable account. What it is not is a weakness to be balanced out with
          something positive.
        </p>
        <p>
          The evaluation question underneath it is more interesting anyway: could you have seen that
          gap before the day, at the planning stage? That is the version of this finding that
          changes the next job.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-2-4-check-2"
        question="A drawing revision was superseded and nobody told you. How do you evaluate your part?"
        options={[
          'Record it as someone else’s failure and move on',
          'Note what happened, then ask whether checking the revision was within your control',
          'Take full responsibility even though you were not informed',
          'Leave it out of your own evaluation entirely',
        ]}
        correctIndex={1}
        explanation="It was not your error, and checking the revision before first fix was still available to you. That is the part of it that is your performance, and it is the part you can change."
      />

      <SectionRule />

      <ContentEyebrow>Where your responsibility ends</ContentEyebrow>

      <ConceptBlock title="Yours and not yours">
        <p>
          Plenty of what shapes a job is outside your control: the programme, the information, other
          trades, the weather, decisions made before you arrived. A self-evaluation that blames all
          of it is an excuse; one that claims responsibility for all of it is not honest either, and
          neither teaches you anything.
        </p>
        <p>
          The productive move is to record what happened and then ask a narrower question: within
          what I controlled, what could have been different? Usually something could — noticing
          earlier, escalating sooner, writing down an agreement, asking one more question at the
          start.
        </p>
        <p>
          That is a real finding, it is transferable to jobs where the external circumstances are
          completely different, and it does not require you to pretend the programme was reasonable.
        </p>
      </ConceptBlock>

      <Scenario
        title="The design check nobody asked for"
        situation={
          <>
            A first job running a small commercial installation alone in Aberystwyth. The sub-main
            sizing came with the design and looked tight; the electrician had not done that
            calculation since college and was not confident either way. With a day before the cable
            order, they worked it through, got a different answer, and asked the designer.
          </>
        }
        whatToDo={
          <>
            The designer had used a different installation method assumption. The cable was fine as
            specified once that was explained — so the check changed nothing about the job, took two
            hours, and was completely worthwhile. The self-evaluation writes up as: a knowledge area
            gone rusty, identified in time, checked before the money was spent, and a gap now known
            about.
          </>
        }
        whyItMatters={
          <>
            Nothing went wrong, so there is a temptation to record nothing. But this is the strongest
            kind of entry in a self-evaluation: an occasional skill correctly identified as
            occasional, acted on before it mattered, and a specific area named for refreshing. It
            demonstrates exactly the judgement the criterion is looking for.
          </>
        }
      />

      <InlineCheck
        id="304-2-4-check-3"
        question="Which closing line makes a self-evaluation useful?"
        options={[
          'I will improve my communication',
          'I will try to be better organised',
          'I will continue to develop my skills',
          'I will confirm every variation in writing before starting the work',
        ]}
        correctIndex={3}
        explanation="Confirming every variation in writing before starting is something you could be held to, and you would know within a single job whether you did it. The other three are indistinguishable from doing nothing."
      />

      <SectionRule />

      <ContentEyebrow>Effort, strengths and feedback</ContentEyebrow>

      <ConceptBlock title="Performance is not the same as effort">
        <p>
          The two get confused constantly. Effort is how hard you worked; performance is what the
          work needed and whether you supplied it. They come apart in both directions — a job can
          absorb enormous effort because the approach was wrong, and a well-planned job can look
          effortless from outside.
        </p>
        <p>
          When an evaluation reaches for &ldquo;I worked hard&rdquo;, it has usually run out of
          things it is willing to examine. The more useful question is whether the effort was going
          into the work or into compensating for something.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="The things you did well are findings too">
        <p>
          Self-evaluation is not confession. Something on every job goes better than it might have,
          and if you cannot say why, you cannot repeat it deliberately.
        </p>
        <p>
          Treat a success the same way as a shortfall: what was the situation, what did you do, what
          made it work. &ldquo;I walked the route with the builder before first fix, so the two
          clashes were found while they were still drawings&rdquo; is a practice, not a personality
          trait, and naming it is how it becomes habit.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Feedback you did not ask for">
        <p>
          Most of the information about your performance never reaches you directly. A supervisor
          who checks your work more often than someone else&rsquo;s, a client who asks for a
          different electrician next time, a colleague who quietly redoes something — all of it is
          feedback, and none of it arrives labelled.
        </p>
        <p>
          You do not need to become suspicious of everything. But if the same small correction keeps
          appearing, that is a pattern worth writing down and asking about directly, which is nearly
          always a shorter conversation than people fear.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'How honest should I be about something I got wrong?',
            answer:
              'Specific and factual, without dramatising it. "I mis-set the test instrument and repeated the readings once I noticed" is the right register — it says what happened, that you caught it, and what you did. Neither hiding it nor treating it as a character flaw is useful, and assessors are looking for the middle of those two.',
          },
          {
            question: 'What if I genuinely performed well throughout?',
            answer:
              'Then say what made that true, in specifics. "I had done three of these in the last six months, so the sequence was familiar and I could see the access problem before we got to it" is a real evaluation of good performance. What does not work is the assertion on its own, because it reads identically to not having examined it.',
          },
          {
            question: 'Where does this show up in the qualification?',
            answer:
              'Most visibly in the externally-marked professional discussion. Being asked what you would do differently is a standard line of questioning, and the difference between a prepared answer and an improvised one is obvious to the person asking. Someone who has kept honest notes has three examples ready; someone who has not offers "communication".',
          },
          {
            question: 'Should I share this with my employer?',
            answer:
              'The parts that lead somewhere, yes — particularly a named skill you want more exposure to. Most employers would far rather hear "I have only done two of these and I would like another before I run one alone" than discover the gap on a job. It is also how occasional skills stop being occasional.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Evaluate against skills, knowledge, training and experience — a fixed reference beats a feeling.',
          'CDM: nobody should be appointed to work they lack the SKTE for, or are not in the process of gaining.',
          'Skills decline without use — name the things you did that you had not done for a long while.',
          'Softer skills count: foreseeing risk, anticipating others’ mistakes, communicating clearly.',
          'Recognising a limit and asking is competence; working past it silently is the real failure.',
          'Ask whether the gap could have been spotted at the planning stage — that is the transferable version.',
          'Separate what you controlled from what you did not, without hiding in either.',
          'End with one or two changes specific enough that you would know if you had made them.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Evaluate own performance" />
    </div>
  );
}
