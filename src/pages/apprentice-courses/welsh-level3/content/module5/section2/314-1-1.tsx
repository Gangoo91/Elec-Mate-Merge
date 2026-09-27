/**
 * Unit 314 · Learning outcome 1 · Criterion 1.1 — How to plan and implement the
 * monitoring and implementation of health and safety on the work site, the work
 * to be undertaken, the allocation of roles and responsibilities, and the
 * resources required
 *
 * Unit 314 (Coordinate a Work Site in the BSE Sector, 28 GLH) is the second
 * Welsh unit with no City & Guilds equivalent, and Peter Ellis named it with 313
 * as where learners struggle — because apprentices rarely get near this part of
 * the job.
 *
 * The distinction this whole unit rests on: 304 was planning your own work. 314
 * is planning work that other people will carry out.
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
    question: 'What separates unit 314 from the planning you did in unit 304?',
    options: [
      '304 planned your own work; 314 plans work other people will carry out',
      '314 is about larger jobs only',
      '314 covers commercial work, 304 domestic',
      'Nothing — they are the same skill',
    ],
    correctAnswer: 0,
    explanation:
      'Everything changes once someone else does the work: instructions have to be understood, competence has to be matched, and you are monitoring rather than doing.',
  },
  {
    id: 2,
    question: 'This criterion names four things to plan and implement. Which is the odd one out?',
    options: [
      'The final account',
      'Health and safety monitoring on site',
      'The allocation of roles and responsibilities',
      'The resources required',
    ],
    correctAnswer: 0,
    explanation:
      'The criterion covers health and safety, the work itself, roles and responsibilities, and resources. Commercial settlement is somebody else’s business.',
  },
  {
    id: 3,
    question: 'What does "implement" add to "plan" in this criterion?',
    options: [
      'Putting the arrangements into effect and keeping them going, not just writing them',
      'Nothing; the words mean the same thing',
      'Getting the client to sign the plan',
      'Filing the plan before work starts',
    ],
    correctAnswer: 0,
    explanation:
      'A plan somebody wrote and nobody enacted is the classic failure on a coordinated site. The criterion deliberately names both halves.',
  },
  {
    id: 4,
    question: 'Allocating roles means what, beyond telling people which job to do?',
    options: [
      'Making clear who decides, who checks, and who is accountable for each area',
      'Writing a list of names',
      'Setting everyone the same task so it is fair',
      'Keeping the allocation flexible so it can change',
    ],
    correctAnswer: 0,
    explanation:
      'Two people who both think the other is checking something is the commonest coordination failure there is, and it comes from allocating tasks without allocating responsibility.',
  },
  {
    id: 5,
    question: 'Who plans and monitors health and safety for the work under your control?',
    options: [
      'The contractor carrying out the work',
      'The client',
      'The principal designer',
      'Whoever holds the site induction',
    ],
    correctAnswer: 0,
    explanation:
      'CDM puts planning, managing and monitoring on the contractor for the work they carry out or that is carried out by workers under their control.',
  },
  {
    id: 6,
    question: 'A site induction covers the site rules. What does that NOT replace?',
    options: [
      'Briefing your own people on the specific risks of the task they are doing',
      'The construction phase plan',
      'The risk assessment',
      'The permit system',
    ],
    correctAnswer: 0,
    explanation:
      'An induction tells people about the site. It does not tell them what is dangerous about the particular job you have just allocated to them.',
  },
  {
    id: 7,
    question: 'How do you know your health and safety arrangements are actually being implemented?',
    options: [
      'By looking, on a rhythm, and correcting what you see',
      'By asking people to confirm they read the plan',
      'By counting the signatures on the induction sheet',
      'Because you briefed everyone at the start',
    ],
    correctAnswer: 0,
    explanation:
      'Monitoring is an activity, not a document. The only evidence that arrangements are working is what the site looks like when you walk it.',
  },
  {
    id: 8,
    question: 'What should you do when you see a control not being followed?',
    options: [
      'Correct it there and then, and ask why it was not working',
      'Note it for the end-of-week review',
      'Report it to the client',
      'Nothing, if nobody was hurt',
    ],
    correctAnswer: 0,
    explanation:
      'Walking past something is a decision, and everyone who saw you do it learns from it. The second half — why the control was not working — is what stops it recurring.',
  },
];

export default function Lesson314_1_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Unit 304 planned your own work. This unit plans work other people carry out — everything changes.',
          'Four areas: health and safety, the work itself, roles and responsibilities, resources.',
          'Allocating a task is not allocating responsibility. Say who decides, who checks, who is accountable.',
          '"Implement" is the other half of the criterion — arrangements have to be enacted and kept going.',
          'Monitoring is walking the site and correcting what you see, not collecting signatures.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain what changes when you are planning work that other people will carry out.',
          'Plan across the four areas this criterion names — health and safety, the work, roles, and resources.',
          'Distinguish allocating a task from allocating responsibility for it.',
          'Describe what implementing and monitoring arrangements looks like in practice.',
          'State where the duty to plan, manage and monitor sits under CDM 2015.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Planning for other people</ContentEyebrow>

      <ConceptBlock
        title="Planning for other people is a different job"
        plainEnglish="You can hold your own plan in your head. You cannot hold anyone else's."
      >
        <p>
          Unit 304 asked you to plan your own work. Almost everything in it still applies, but the
          moment somebody else carries out the work three things change, and this unit exists
          because of them.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Nothing can stay in your head.</strong> An assumption you never voiced is an
            assumption nobody else has. A sequence you know by heart is invisible to the person
            standing in the room.
          </li>
          <li>
            <strong>Competence stops being a constant.</strong> You know what you can do. Allocating
            work to other people means knowing what each of them can do, which is a judgement you
            have to make deliberately rather than assume.
          </li>
          <li>
            <strong>You are monitoring rather than doing.</strong> Your own work gives you continuous
            feedback — you see the problem because your hands are on it. Overseeing does not, unless
            you go and look.
          </li>
        </ul>
        <p>
          Apprentices rarely get near this part of the job, which is exactly why it is one of the
          units learners find hardest on this qualification.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="314-1-1-check-1"
        question="Which of these stops working the moment somebody else is doing the task?"
        options={[
          'Checking the drawing revision',
          'Ordering long-lead items first',
          'Recording test results as you go',
          'Holding the sequence in your head instead of writing it down',
        ]}
        correctIndex={3}
        explanation="The other three work the same either way. An unspoken sequence is fine when you are the one following it and useless the moment you are not."
      />

      <SectionRule />

      <ContentEyebrow>The four elements</ContentEyebrow>

      <ConceptBlock
        title="The four things this criterion covers"
        onSite="Health and safety, the work, who does what, and what they need to do it."
      >
        <p>The criterion lists them explicitly, and each has a different failure mode:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Monitoring and implementing health and safety on the work site.</strong> Not
            writing a risk assessment — enacting the controls and checking they are still in place
            on the Thursday of week three.
          </li>
          <li>
            <strong>The work to be undertaken.</strong> Broken into tasks, sequenced, and described
            clearly enough that somebody who was not in the planning conversation could pick it up.
          </li>
          <li>
            <strong>The allocation of roles and responsibilities.</strong> Who does each task, and
            separately, who is responsible for it being right.
          </li>
          <li>
            <strong>The resources required.</strong> As unit 304 taught it — people, time, materials,
            plant, information, welfare — but now allocated to named people rather than held
            centrally.
          </li>
        </ul>
        <p>
          The four are related but they fail independently. A site can have excellent safety
          arrangements and no idea who is checking the terminations.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulation 15 · guidance in HSE L153"
        meaning="A contractor must plan, manage and monitor construction work carried out either by the contractor or by workers under the contractor's control, to ensure so far as is reasonably practicable that it is carried out without risks to health and safety. Dutyholders must also cooperate with each other, coordinate their work, and communicate so that everyone understands the risks and the measures controlling them."
        cite="HSE L153, Managing health and safety in construction"
      />

      <SectionRule />

      <ConceptBlock title="A task is not a responsibility">
        <p>
          Telling someone to do something and making them responsible for it are different acts,
          and conflating them produces the most common coordination failure on any site: two people
          who each believed the other was checking.
        </p>
        <p>Three questions settle it for any area of work:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Who is doing it?</strong> The task allocation.
          </li>
          <li>
            <strong>Who decides when it changes?</strong> The point people come back to when
            something on site does not match the drawing.
          </li>
          <li>
            <strong>Who confirms it is right?</strong> The check, which is not automatically the same
            person as the one doing the work.
          </li>
        </ul>
        <p>
          On a small job all three can be the same person and it still helps to have said so. On
          anything larger they are not, and the gap between &ldquo;I assumed you were&rdquo; and
          &ldquo;I thought you had&rdquo; is where defects live.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Writing the arrangements and calling that implementation"
        whatHappens={
          <>
            The construction phase plan is produced, the risk assessment is signed, everyone is
            inducted, and the folder is complete on day one. Three weeks later the ladder is being
            used where the tower was specified, the lighting temporary supply has been extended with
            something nobody assessed, and the folder still says everything is controlled.
          </>
        }
        doInstead={
          <>
            Treat the document as the start. Walk the site on a rhythm you have decided in advance,
            look at the three or four things that actually matter on this job, and correct what you
            find. The criterion says &ldquo;plan <em>and implement</em>&rdquo; for a reason.
          </>
        }
      />

      <CommonMistake
        title="Letting the site induction stand in for briefing the task"
        whatHappens={
          <>
            <p>
              Everybody has been inducted, so everybody has been told about the site: the rules,
              the welfare, the fire points, the emergency arrangements. Nobody has been told what
              is difficult about the job they have just been handed, because that was never what
              the induction was for.
            </p>
            <p>
              The result shows up when the building does not match the drawing. Having had no
              conversation about what to do in that situation, people do the reasonable thing and
              carry on, working round it neatly and quietly, and the decision that should have
              come back to you gets made by whoever was holding the drill.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Brief the task as well as the site, to the people doing it, in the five minutes
              before they start. What the task is, the specific risks on it, the controls, and who
              they come back to.
            </p>
            <p>
              Then say the last part out loud, because it is the one nobody assumes: if it does
              not match the drawing or it is not as expected, stop and ask. People will keep
              working through a mismatch unless they have been told explicitly that stopping is
              the response you want.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Monitoring on site</ContentEyebrow>

      <ConceptBlock
        title="What monitoring actually looks like"
        onSite="Pick three things, walk the job, look at those three."
      >
        <p>
          Monitoring sounds like an administrative activity and is not. It is going to look, on a
          rhythm, at a small number of things you decided in advance were the ones that matter here.
        </p>
        <p>
          Three or four is the right number. On a rewire in an occupied building that might be:
          isolation and locking off, protection of the occupants&rsquo; belongings, the state of the
          temporary supply, and whether anyone is working somewhere they should not be. On a plant
          room it would be a different four.
        </p>
        <p>
          Then act on what you see, immediately. Walking past something is itself an instruction —
          everyone who saw you do it now knows the control is optional — and it costs more to
          re-establish than it would have cost to fix at the time.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="314-1-1-check-2"
        question="You see an operative working from a stepladder where the method said a tower. What is the complete response?"
        options={[
          'Stop it, get the tower in use, and find out why the method was not followed',
          'Stop it and say nothing further',
          'Note it for the weekly review',
          'Leave it if the work is nearly finished',
        ]}
        correctIndex={0}
        explanation="Correcting the act deals with today. Asking why deals with the rest of the job — the tower may be in use elsewhere, unavailable, or nobody may have been told about it."
      />

      <SectionRule />

      <ContentEyebrow>Briefing and resourcing</ContentEyebrow>

      <ConceptBlock title="Briefing the task, not just the site">
        <p>
          A site induction tells people about the site: the rules, the hazards, the welfare, the
          emergency arrangements. It is necessary, it is usually somebody else&rsquo;s, and it does
          not tell anyone what is dangerous about the job you have just given them.
        </p>
        <p>
          That briefing is yours. It is short — what the task is, what the specific risks are, what
          the controls are, what to do if something is not as expected, and who to come back to.
          Five minutes before work starts, to the people doing it, not to a room.
        </p>
        <p>
          The last part matters more than it looks. People will keep working on something that does
          not match the drawing unless they have been told explicitly that stopping and asking is
          the expected response.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Allocating resources to people, not to the job">
        <p>
          In unit 304 the resources belonged to the job. On a coordinated site they have to belong
          to someone, or they belong to nobody.
        </p>
        <p>
          Who has the key for the store. Who is responsible for the instrument and its calibration
          date. Who takes the tower off hire when the work is done. Who orders the second delivery.
          Each of those, unallocated, becomes a small daily negotiation and eventually the thing
          that did not happen.
        </p>
        <p>
          It is also how you find out your plan does not work. A resource nobody will accept
          responsibility for is usually one where the arrangement is unclear, and it is better to
          discover that at the allocation stage than in week four.
        </p>
      </ConceptBlock>

      <Scenario
        title="Two people, one check, nobody doing it"
        situation={
          <>
            A four-week refurbishment of a community centre near Mold, with two electricians and an
            apprentice. The supervisor allocates first fix by area: one electrician upstairs, one
            down, the apprentice moving between them. At second fix, three accessories upstairs are
            found wired to the wrong circuit. Each electrician assumed the other had checked the
            apprentice&rsquo;s terminations, because the apprentice had worked with both.
          </>
        }
        whatToDo={
          <>
            Correcting the three accessories is an hour. The real fix is in the allocation: the
            apprentice was allocated to the work but never allocated to a person, so responsibility
            for checking sat with whoever happened to be nearest. Naming one of the electricians as
            responsible for the apprentice&rsquo;s work, whichever floor they were on, would have
            cost one sentence at the start.
          </>
        }
        whyItMatters={
          <>
            Nobody did anything wrong by their own understanding, which is what makes this failure
            mode so common. Tasks were allocated carefully and responsibility was not allocated at
            all.
          </>
        }
      />

      <InlineCheck
        id="314-1-1-check-3"
        question="What is the most reliable sign that roles were allocated properly?"
        options={[
          'Everyone has a task list',
          'Everyone can say who they go to when something does not match the drawing',
          'Nobody has asked any questions',
          'The programme is being met',
        ]}
        correctIndex={1}
        explanation="Task lists are easy and common. Knowing where a decision goes is the part that is usually missing, and it is the part that gets tested the first time reality differs from the drawing."
      />

      <SectionRule />

      <ContentEyebrow>Planning for the team you have</ContentEyebrow>

      <ConceptBlock title="Plan for the people you have, not the people you want">
        <p>
          A sequence that assumes three competent electricians is not a plan if you have one and two
          apprentices. Coordination fails most often not because the programme was wrong in the
          abstract but because it was written for a team that never turned up.
        </p>
        <p>
          Build the allocation around the actual people. That may mean pairing rather than splitting,
          keeping the supervised work in one area so it can be supervised, or holding a task until
          the person who can do it is free. All three are legitimate planning decisions and all three
          look like inefficiency to anyone reading a bar chart.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Write down what you decided">
        <p>
          Allocation made verbally on a Monday has a half-life of about two days. People swap tasks,
          someone is off, a new face arrives, and by Wednesday the arrangement everyone is working
          to is not the one anybody agreed.
        </p>
        <p>
          It does not need a document. A list on the wall of the store, a photograph of a whiteboard,
          a message to the group — any of those survives the week and settles the arguments that
          otherwise get settled by whoever speaks last. The test is whether somebody arriving on
          Thursday could find out what they are meant to be doing without asking three people.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'I am an apprentice. Why am I being taught to coordinate a site?',
            answer:
              'Because the qualification is looking ahead to the job you will be doing in two or three years, and because understanding how coordination works makes you better to coordinate now. Knowing what your supervisor needs from you — telling them when something does not match, not quietly working around it — is half of what this unit is about, seen from the other side.',
          },
          {
            question: 'How formal do these arrangements need to be on a small job?',
            answer:
              'Proportionate, like everything else in CDM. On a two-person job the allocation can be a conversation, as long as it actually happens and covers who checks what. What does not scale down is the principle: the smallest job still benefits from someone having said out loud who is responsible for which part.',
          },
          {
            question: 'What if the people on site are more experienced than me?',
            answer:
              'Coordinating is not the same as knowing more than everyone. Your job is to make sure the work is planned, allocated and monitored, and experienced people generally make that easier rather than harder. Asking someone with thirty years in for their view on a sequence is good coordination, not weakness — what you cannot do is let the absence of a decision pass for agreement.',
          },
          {
            question: 'How does this unit get assessed?',
            answer:
              'The knowledge sits with the externally-set questions. The performance side — producing a risk assessment and method statement, allocating duties, instructing operatives, monitoring the work — is evidenced at work through the employer-set practical project, so the parts of this unit you will be observed doing are the parts you have to actually do on site.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          '304 planned your own work; 314 plans work other people carry out.',
          'Nothing can stay in your head — an unvoiced assumption is nobody else’s assumption.',
          'Four areas: health and safety, the work, roles and responsibilities, resources.',
          'Allocate the task and, separately, who decides and who checks.',
          'CDM puts planning, managing and monitoring on the contractor for work under their control.',
          'A site induction is about the site; briefing the task is yours and takes five minutes.',
          'Monitoring is picking three or four things and going to look, on a rhythm.',
          'Correct what you see immediately — walking past a control teaches everyone it is optional.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Plan and implement the work and its arrangements" />
    </div>
  );
}
