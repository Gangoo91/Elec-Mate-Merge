/**
 * Unit 314 · Learning outcome 1 · Criterion 1.6 — The organisational procedures
 * for completing the necessary documentation, agreeing a programme of work with
 * relevant people, and confirming that the installation and/or maintenance work
 * is completed
 *
 * Three procedures in one criterion. The thread tying them together: each is a
 * point where something has to become official rather than understood.
 *
 * BS 7671 grounding: Regulation 644.4 — certification is the one document on
 * the job whose form and recipient are not the firm's to decide.
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
    question: 'What do the three procedures in this criterion have in common?',
    options: [
      'Each is a point where something stops being understood and becomes official',
      'Each is done at the end of the job',
      'Each requires the client’s signature',
      'Each is optional on small work',
    ],
    correctAnswer: 0,
    explanation:
      'Documentation, an agreed programme and confirmed completion are all moments where a shared assumption is converted into a record somebody can rely on.',
  },
  {
    id: 2,
    question: 'Which document on an electrical job is NOT your firm’s to design?',
    options: [
      'The Electrical Installation Certificate',
      'The site diary',
      'The internal job sheet',
      'The delivery record',
    ],
    correctAnswer: 0,
    explanation:
      'Its form is based on the model in Appendix 6 and BS 7671 says who it goes to. Everything else is a matter of organisational procedure.',
  },
  {
    id: 3,
    question: 'What is the difference between agreeing a programme and issuing one?',
    options: [
      'Agreement means the people whose work it depends on have accepted it',
      'Nothing — issuing it is agreement',
      'Agreement requires a signature',
      'Issuing is more formal',
    ],
    correctAnswer: 0,
    explanation:
      'A programme sent to people who never confirmed it is a statement of your intentions. It becomes a plan when the dependencies have been accepted by the people who own them.',
  },
  {
    id: 4,
    question: 'Who should confirm that work is complete?',
    options: [
      'Somebody other than the person who did it, against a stated definition',
      'The operative who carried it out',
      'The client, in every case',
      'Whoever is on site at the end',
    ],
    correctAnswer: 0,
    explanation:
      'Self-declared completion is not a check. The definition matters as much as the person — "complete" has to mean the same thing to both of you.',
  },
  {
    id: 5,
    question: 'Why does a firm need a procedure rather than just competent people?',
    options: [
      'So the job survives people changing, being off, or forgetting under pressure',
      'Because regulations require written procedures',
      'To allocate blame when something is missed',
      'To satisfy the client',
    ],
    correctAnswer: 0,
    explanation:
      'A procedure is what makes the outcome independent of who happened to be there. Competence without one produces good work that is inconsistent.',
  },
  {
    id: 6,
    question: 'When should documentation be completed?',
    options: [
      'As the work proceeds, with the final pieces assembled at the end',
      'All at the end, when everything is known',
      'Before the work starts',
      'Whenever the client asks for it',
    ],
    correctAnswer: 0,
    explanation:
      'Results recorded as taken and decisions noted as made are accurate. The same information assembled on the last afternoon is a reconstruction, and it shows.',
  },
  {
    id: 7,
    question: 'A drawing is revised mid-job. What does an organisational procedure need to cover?',
    options: [
      'How the new revision reaches everyone and how the old one is withdrawn',
      'Who is responsible for the change',
      'Whether the change is chargeable',
      'How long the revision took',
    ],
    correctAnswer: 0,
    explanation:
      'Issuing the new one is the easy half. Superseded drawings left in circulation are how correct work gets installed to the wrong information.',
  },
  {
    id: 8,
    question: 'What belongs in the record that outlives the job?',
    options: [
      'What a future person needs to work on the installation safely',
      'Everything that was produced during the job',
      'Only the certificate',
      'Whatever the client asks to keep',
    ],
    correctAnswer: 0,
    explanation:
      'The test is usefulness to somebody who was not there. Volume is not the measure — a complete schedule and a marked-up drawing beat a folder of everything.',
  },
];

export default function Lesson314_1_6() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Three procedures, one idea: each is where something stops being understood and becomes official.',
          'Certification is the one document whose form and recipient BS 7671 decides, not your firm.',
          'A programme issued is a statement of intent; a programme agreed has had its dependencies accepted.',
          'Completion is confirmed by somebody other than the person who did it, against a stated definition.',
          'Document as you go — the last afternoon produces a reconstruction, and it shows.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain what the three procedures in this criterion have in common.',
          'List the documentation a coordinated electrical job produces, and say which parts are not yours to design.',
          'Distinguish agreeing a programme from issuing one.',
          'Describe how completion is confirmed, and by whom, against a stated definition.',
          'Set up document control so a superseded revision cannot stay in circulation.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why a procedure</ContentEyebrow>

      <ConceptBlock
        title="Three procedures, one idea"
        plainEnglish="Each of these is a moment when something has to stop being an understanding."
      >
        <p>
          This criterion looks like a list of unrelated admin: documentation, agreeing a programme,
          confirming completion. They belong together because each is the same kind of event — the
          point where a shared assumption becomes something a person who was not there can rely on.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Documentation</strong> turns what happened into what can be shown.
          </li>
          <li>
            <strong>Agreeing a programme</strong> turns your intentions into other people&rsquo;s
            commitments.
          </li>
          <li>
            <strong>Confirming completion</strong> turns &ldquo;I think we are done&rdquo; into a
            fact somebody else has tested.
          </li>
        </ul>
        <p>
          Each is also a point where jobs quietly fail. Work is done and never recorded; a programme
          is circulated and never accepted; a job is finished by one person&rsquo;s definition and
          not by anybody else&rsquo;s. None of those is a technical failure, and all of them cost.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Why a procedure and not just good people"
        onSite="A procedure is what makes the result independent of who happened to be on site."
      >
        <p>
          It is tempting to think a competent team does not need procedures. The opposite is nearer
          the truth: competent people produce good outcomes inconsistently, because each of them has
          their own way and none of it survives them being off.
        </p>
        <p>
          A procedure is simply the firm&rsquo;s agreed answer to a recurring question — how test
          results get recorded, who signs off an area, where the drawings live, what happens when a
          revision arrives. What it buys is consistency: the same thing happens whether the job is
          run by the person who always does it or by somebody covering.
        </p>
        <p>
          Which is why having <em>a</em> procedure matters more than which one. Two reasonable ways
          of recording a variation are both fine; a firm where half the people do it one way and
          half do not do it at all is not.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="314-1-6-check-1"
        question="Your firm has no written way of recording variations, but the supervisor always does it properly. What is the weakness?"
        options={[
          'It stops the day they are off, and nobody else knows the expectation exists',
          'Nothing — the outcome is good',
          'It is not auditable',
          'It slows the job down',
        ]}
        correctIndex={0}
        explanation="Good practice held by one person is a dependency, not a procedure. The test is what happens on the week they are not there."
      />

      <SectionRule />

      <ContentEyebrow>The documents a job produces</ContentEyebrow>

      <ConceptBlock title="What a coordinated job produces">
        <p>
          The documentation on an electrical job of any size falls into four groups, and it is worth
          knowing which is which because they have different owners and different lifespans:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Safety documentation.</strong> The construction phase plan, risk assessments and
            method statements, permits, induction and briefing records.
          </li>
          <li>
            <strong>Work records.</strong> Site diary, allocation and progress notes, instructions
            received, variations agreed, delays with dates, deliveries.
          </li>
          <li>
            <strong>Technical records.</strong> Drawings with revisions, the specification, test
            results as they are taken, manufacturer information for what is installed.
          </li>
          <li>
            <strong>Certification and handover.</strong> The Electrical Installation Certificate
            with its Schedule of Inspections and Schedule of Test Results, operating and maintenance
            information, anything going into the project health and safety file.
          </li>
        </ul>
        <p>
          Almost all of it is your firm&rsquo;s to shape. One part is not.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The document that is not yours to design"
        plainEnglish="You choose how you keep a site diary. You do not choose the certificate."
      >
        <p>
          Certification sits outside organisational procedure. BS 7671 sets what it is based on, who
          issues it, and who receives it — on completion of verification of a new installation, or
          an addition or alteration including the replacement of a distribution board or consumer
          unit, an Electrical Installation Certificate based on the model in Appendix 6 is issued to
          the person ordering the work, by those responsible for the design, construction and
          verification.
        </p>
        <p>
          Two consequences for a coordinator. First, the internal procedure has to end at the right
          place: a certificate filed with the job papers has not been issued. Second, the people
          responsible for design, construction and verification have to be identifiable — which is
          an allocation decision made at the start of the job, not a question answered on the last
          afternoon by whoever is holding the pen.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 644.4 and 644.4.201"
        meaning="Upon completion of the verification of a new installation, or an addition or alteration to an existing installation — including the replacement of a distribution board or consumer unit — an Electrical Installation Certificate based on the model given in Appendix 6 shall be issued to the person ordering the work. It is issued by the person or persons responsible for the design, construction and verification of the installation, taking account of their respective responsibilities."
        cite="BS 7671 Part 6 — Inspection and Testing"
      />

      <SectionRule />

      <ContentEyebrow>Agreeing the programme</ContentEyebrow>

      <ConceptBlock
        title="Agreeing a programme is not issuing one"
        onSite="If nobody confirmed the dates your work depends on, you have a wish list."
      >
        <p>
          The criterion says <em>agreeing</em> a programme with relevant people, and the word is
          doing work. A programme you produced and circulated is a statement of your intentions. It
          becomes a plan when the people whose work it depends on have accepted their part of it.
        </p>
        <p>
          The difference shows up the first time something slips. An agreed date is something you
          can ask about — &ldquo;you confirmed the grid for Tuesday, is that still holding?&rdquo;
          An issued date is something the other trade may never have read, in which case the
          conversation starts from nothing and nobody is wrong.
        </p>
        <p>
          Agreement does not need ceremony. A reply confirming the date, a note of a conversation
          sent afterwards, a programme marked up in a meeting — any of them is enough. What matters
          is that somewhere there is evidence the other party knew and accepted, because that is
          what makes the date usable.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Leaving the paperwork to the last afternoon"
        whatHappens={
          <>
            Test results on scraps, variations remembered rather than recorded, a site diary written
            up from memory on the Friday, the schedule filled in at speed to get away. The documents
            exist and none of them is reliable — values transposed, a circuit missed, a variation
            nobody can now evidence — and the certificate, which is the one document with a life
            beyond the job, is the weakest thing produced.
          </>
        }
        doInstead={
          <>
            Record at the point of the event: results onto the schedule that will be issued,
            variations when agreed, delays when they happen. The end of the job becomes assembly
            rather than reconstruction, and it takes less total time than the rushed version.
          </>
        }
      />

      <CommonMistake
        title="Filing the certificate instead of issuing it"
        whatHappens={
          <>
            <p>
              The certificate is completed properly, the schedules are attached, and it goes into
              the job file with everything else. The internal procedure has been followed to the
              letter and the job is closed off. Months later somebody asks the client for it and
              the client has never seen one.
            </p>
            <p>
              The same thing happens in a quicker form on site, when it is handed to whoever
              happens to be standing there at the end. Both leave the same gap: the document
              exists, and it has not reached the person it is required to reach.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              End the procedure in the right place. The Electrical Installation Certificate is
              issued to the person ordering the work, so establish at the start who that actually
              is &mdash; on a subcontract it is usually whoever engaged you rather than the
              building owner &mdash; and record when it was sent and to whom.
            </p>
            <p>
              Settle the other half at the start too: who is responsible for the design, the
              construction and the verification, since those are the people who issue it. Decided
              in week one that is an allocation; left to the last afternoon it is answered by
              whoever is holding the pen.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Signing the job off</ContentEyebrow>

      <ConceptBlock title="Confirming completion">
        <p>
          The third procedure is the one most often left informal, and it has two parts that get
          collapsed into one.
        </p>
        <p>
          <strong>What does complete mean?</strong> Against the scope and the success criteria, not
          against a feeling. This is unit 304&rsquo;s criterion 1.2 arriving with consequences:
          without a stated definition, &ldquo;finished&rdquo; is whatever the person holding the
          question believes.
        </p>
        <p>
          <strong>Who says so?</strong> Somebody other than the person who did the work. Not because
          people are untrustworthy, but because self-declared completion is not a check, and the
          person who has been looking at something for three days is the least likely to see what is
          missing from it.
        </p>
        <p>
          On a job with several people this is straightforward to arrange: areas are signed off by
          somebody who did not install them. On a one-person job it means a deliberate second pass,
          preferably not on the same day.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="314-1-6-check-2"
        question="An electrician tells you their area is finished. What makes that a confirmation rather than an opinion?"
        options={[
          'Somebody else checking it against a stated definition of complete',
          'Their experience',
          'The fact that they are ready to move on',
          'Writing it in the diary',
        ]}
        correctIndex={0}
        explanation="Both halves are needed — a second pair of eyes, and a shared definition. Either on its own still leaves 'complete' meaning two different things."
      />

      <SectionRule />

      <ContentEyebrow>Revisions and retention</ContentEyebrow>

      <ConceptBlock
        title="Document control: the revision problem"
        plainEnglish="Issuing the new drawing is half of it. Removing the old one is the half people skip."
      >
        <p>
          Revisions are where technical documentation goes wrong on a coordinated site. A new
          drawing is issued to the supervisor, who has it on their phone, while the copy taped
          inside the store cupboard is three weeks old and is the one people actually work from.
        </p>
        <p>
          A superseded drawing is more dangerous than a missing one, for the same reason a
          superseded standard is: it answers the question confidently. Work gets installed correctly
          to the wrong information, which looks like good work right up until it has to come out.
        </p>
        <p>
          The procedure needs three things: revisions reach everyone who works from them,
          superseded copies are physically removed, and the current revision number is checkable
          without asking anyone. It does not need software — a revision written on the wall next to
          the drawing does it.
        </p>
      </ConceptBlock>

      <ConceptBlock title="The records that outlive the job">
        <p>
          Some of what you produce disappears when the job ends and some of it lasts for decades.
          Knowing which is which tells you where the care belongs.
        </p>
        <p>
          The long-lived set is small: the certificate and its schedules, the as-installed
          information — drawings marked up where the installation differs from the design, a board
          schedule that matches the board — and anything going into the project health and safety
          file for whoever works on the building next.
        </p>
        <p>
          The test for that set is usefulness to somebody who was not there. Volume is not the
          measure: a complete, accurate schedule and one marked-up drawing are worth more than a
          folder of everything produced during the job, and are considerably more likely to be read.
        </p>
      </ConceptBlock>

      <Scenario
        title="Signed off by the person who built it"
        situation={
          <>
            A phased office refurbishment in Newport, three floors handed over a floor at a time.
            The firm&rsquo;s procedure is that the electrician completing an area marks it complete
            on the job sheet. On the second floor, an electrician marks their area complete with two
            luminaires still on temporary connections, intending to return to them, and is moved to
            another job the following week. The floor is handed to the client on the strength of the
            job sheet.
          </>
        }
        whatToDo={
          <>
            Practically: return, complete the connections, re-verify and re-issue. What it should
            change is the procedure — completion confirmed by somebody other than the person who did
            the work, against the scope for that area. The electrician did nothing dishonest; they
            marked it complete meaning &ldquo;complete apart from the bit I am coming back to&rdquo;,
            which is a perfectly normal thing to mean and is not what the job sheet recorded.
          </>
        }
        whyItMatters={
          <>
            Three procedures failed together here, which is usual. The definition of complete was
            never stated, the confirmation was self-declared, and the handover documentation was
            produced from a record nobody had tested. Any one of the three would have caught it.
          </>
        }
      />

      <InlineCheck
        id="314-1-6-check-3"
        question="Which is the most reliable sign that document control is working on a site?"
        options={[
          'The drawings are kept in a folder',
          'The supervisor has the latest revisions',
          'Revisions are emailed out promptly',
          'Anyone can tell you the current revision of the drawing they are working from',
        ]}
        correctIndex={3}
        explanation="It tests the end of the chain rather than the start. Issuing revisions promptly means nothing if the copy people actually use is the one taped inside the cupboard."
      />

      <FAQ
        items={[
          {
            question: 'What if my firm has no written procedures?',
            answer:
              'Most small firms do not, and the practical move is not to write a manual. Pick the two or three recurring questions that actually cause trouble — usually how variations are recorded, who signs an area off, and where the current drawings live — and agree an answer to each. Three agreed answers that everybody follows beat a document nobody opens.',
          },
          {
            question: 'Who is "the person ordering the work" on a subcontract?',
            answer:
              'Usually whoever engaged you, which on a subcontract is the main contractor rather than the building owner. It is worth establishing at the start rather than assuming, because it determines where the certificate goes. Where the end user also needs a copy, that is a sensible thing to arrange — but it does not replace issuing it to the person who ordered the work.',
          },
          {
            question: 'How do I agree a programme with a trade that will not commit to a date?',
            answer:
              'Record what you asked and what you got. "I have asked three times for a date for the ceiling grid and have not had one; our window closes Friday" sent to whoever holds the programme is both an escalation and a record. You cannot force agreement, and you can make the absence of it visible to somebody who can act on it.',
          },
          {
            question: 'Is a photograph good enough as a record?',
            answer:
              'For some things it is the best record there is — cable routes before they are covered, the state of something on arrival, a board before it is closed up. What a photograph cannot do is record a decision, an agreement or a test result, because none of those are visible. Use it for condition and position; use writing for anything anybody might later dispute.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'All three procedures are moments where an understanding becomes something others can rely on.',
          'A procedure makes the outcome independent of who is on site — having one matters more than which one.',
          'Four documentation groups: safety, work records, technical records, certification and handover.',
          'Certification is not yours to design — Reg 644.4 sets the model, the issuer and the recipient.',
          'Decide who is responsible for design, construction and verification at the start, not at the end.',
          'A programme issued is intent; a programme agreed has had its dependencies accepted.',
          'Completion is confirmed by somebody else, against a stated definition of complete.',
          'Document control means withdrawing the old revision, not just issuing the new one.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Documentation, agreeing a programme and confirming completion" />
    </div>
  );
}
