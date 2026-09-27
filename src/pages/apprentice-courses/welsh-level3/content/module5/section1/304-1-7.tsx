/**
 * Unit 304 · Learning outcome 1 · Criterion 1.7 — Identify the handover
 * requirements of work
 *
 * Planned at the start, delivered at the end. The point of this criterion
 * sitting in outcome 1 is that handover requirements are a planning input —
 * certification, demonstration, documentation and making good all cost time
 * that has to be in the programme before it is needed.
 *
 * Electrical certification grounded on BS 7671:2018+A4:2026 Regulation 644.4
 * and 644.4.201 — the Electrical Installation Certificate is issued to the
 * person ordering the work on completion of verification. Commercial handover
 * (practical completion, snagging, defects liability) from the construction
 * commercial corpus.
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
    question: 'Why does a handover criterion sit in the PLANNING outcome of this unit?',
    options: [
      'Because handover takes time and information that must be in the programme before it is needed',
      'Because handover is the last thing that happens',
      'It is a mistake in the qualification structure',
      'Because certificates are written at the start',
    ],
    correctAnswer: 0,
    explanation:
      'Testing time, certification, demonstration, making good and documentation are all work. Planned in, they are a day; discovered at the end, they are an overrun.',
  },
  {
    id: 2,
    question:
      'On completion of verification of a new installation, who is the Electrical Installation Certificate issued to?',
    options: [
      'The person ordering the work',
      'The local authority',
      'The principal contractor, in all cases',
      'Whoever signs for it on site',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Regulation 644.4 puts it plainly: the certificate is issued to the person ordering the work — the client or whoever commissioned the installation.',
  },
  {
    id: 3,
    question: 'Which of these is NOT part of a full electrical handover?',
    options: [
      'The contractor’s internal costing sheet',
      'The Electrical Installation Certificate',
      'The Schedule of Inspections and Schedule of Test Results',
      'Manufacturer instructions for the equipment installed',
    ],
    correctAnswer: 0,
    explanation:
      'Everything the client needs to operate, maintain and prove the installation goes across. What it cost you to do is your business.',
  },
  {
    id: 4,
    question: 'What is practical completion?',
    options: [
      'The point at which the work is complete enough for the client to take it and use it',
      'The day the invoice is paid',
      'The day the last operative leaves site',
      'The end of the defects liability period',
    ],
    correctAnswer: 0,
    explanation:
      'It is a defined moment in most contracts and it triggers other things — possession, insurance, and the start of the defects liability period.',
  },
  {
    id: 5,
    question: 'What is a snag, as opposed to a defect?',
    options: [
      'A minor item identified at handover inspection, to be put right before or shortly after completion',
      'Anything the client dislikes',
      'A fault found during testing',
      'A design error',
    ],
    correctAnswer: 0,
    explanation:
      'Snags are picked up in the handover inspection. Defects are things that emerge afterwards, during the defects liability period.',
  },
  {
    id: 6,
    question: 'Why should a handover inspection not happen before a builder’s clean?',
    options: [
      'Dust, protection and poor lighting hide exactly the items the inspection is looking for',
      'It is a contractual prohibition',
      'Because the client will not attend',
      'It should — cleaning afterwards is more efficient',
    ],
    correctAnswer: 0,
    explanation:
      'An inspection through protective sheeting and site dust produces a short snag list and a long defects list — which is the same list, found later and at more cost.',
  },
  {
    id: 7,
    question: 'What does "demonstration" mean at handover?',
    options: [
      'Showing the people who will use the installation how it works, before you leave',
      'Proving your test results are correct',
      'Demonstrating the equipment to the wholesaler',
      'A trial run of the system with nobody present',
    ],
    correctAnswer: 0,
    explanation:
      'A system nobody has been shown how to operate generates callbacks that are not faults. Fifteen minutes at handover removes most of them.',
  },
  {
    id: 8,
    question: 'How does planning handover affect your programme?',
    options: [
      'Testing, certification, making good and demonstration all need time allocated before they are needed',
      'It does not — handover happens after the programme ends',
      'It only adds time if something fails',
      'It shortens the programme, since work stops',
    ],
    correctAnswer: 0,
    explanation:
      'This is the whole reason the criterion is in outcome 1. A programme that ends at "second fix complete" has left out several days of real work.',
  },
];

export default function Lesson304_1_7() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Handover is in the planning outcome because it takes time and information you have to arrange in advance.',
          'BS 7671 Regulation 644.4: the Electrical Installation Certificate is issued to the person ordering the work.',
          'Four things go across: certification, documentation, demonstration, and the building put back.',
          'Practical completion is the moment the client can take and use the work — it starts the defects liability period.',
          'A programme that ends at "second fix complete" has forgotten several days of real work.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain why handover requirements are a planning input rather than an end-of-job activity.',
          'List what goes across at an electrical handover, including the certification required by BS 7671.',
          'Describe practical completion, snagging and the defects liability period in plain terms.',
          'Allow time in the programme for testing, certification, making good and demonstration.',
          'Identify who else has to finish before your work can be handed over.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why handover sits in planning</ContentEyebrow>

      <ConceptBlock
        title="Why this sits in the planning outcome"
        plainEnglish="You cannot leave until certain things exist. Make time for them now, not on the last afternoon."
      >
        <p>
          It looks out of place at first. Handover happens at the end — so why is it a criterion
          under <em>plan the work required to complete the task</em>?
        </p>
        <p>
          Because everything handover needs is work, and work needs time in a programme. Testing
          takes a day or two on anything substantial. Certification takes an hour or several,
          depending on how many circuits and how well the results were recorded as you went.
          Demonstration needs the right person on site at the right time. Making good needs to be
          dry before anyone inspects it. Operating and maintenance information has to be gathered
          rather than conjured.
        </p>
        <p>
          A programme that stops at &ldquo;second fix complete&rdquo; has silently omitted all of
          that, and the omission always shows up in the same place: the final week, where it becomes
          either an overrun or a corner cut.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-1-7-check-1"
        question="Your programme allows five days and ends with 'second fix complete, Friday'. What is missing?"
        options={[
          'Time for testing, certification, demonstration and making good',
          'Nothing — those happen automatically',
          'A contingency day for bad weather',
          'The client’s sign-off meeting only',
        ]}
        correctIndex={0}
        explanation="Those four are days of actual work. Left out of the programme they do not disappear; they eat into the following week or get rushed on Friday afternoon."
      />

      <SectionRule />

      <ConceptBlock
        title="Four things go across"
        onSite="Certification, documentation, demonstration, and the building put back as you found it."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Certification.</strong> For a new installation, an addition or alteration — or
            the replacement of a distribution board or consumer unit — an Electrical Installation
            Certificate, with the Schedule of Inspections and the Schedule of Test Results that
            support it. Smaller work may instead be covered by a Minor Works Certificate.
          </li>
          <li>
            <strong>Documentation.</strong> Manufacturer instructions for what you installed,
            operating and maintenance information, as-installed drawings or schedules where the job
            warrants them, and anything that has to go into the project&rsquo;s health and safety
            file.
          </li>
          <li>
            <strong>Demonstration.</strong> Showing the people who will actually use the
            installation how it works — controls, isolation, what to do when something trips. This
            is the cheapest thing on the list and the one most often skipped.
          </li>
          <li>
            <strong>The building put back.</strong> Making good, protection removed, waste gone, and
            the place left in a state the client recognises as finished.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 644.4 and 644.4.201"
        meaning="On completion of the verification of a new installation, or an addition or alteration to an existing one — including the replacement of a distribution board or consumer unit — an Electrical Installation Certificate based on the model in Appendix 6 shall be issued to the person ordering the work. It is issued by those responsible for the design, construction and verification, taking account of their respective responsibilities."
        cite="BS 7671 Part 6 — Inspection and Testing"
      />

      <ContentEyebrow>The commercial side of handover</ContentEyebrow>

      <ConceptBlock title="The commercial side of handing over">
        <p>
          Alongside the electrical documents sits a set of contractual ideas worth knowing at Level
          3, because they decide when you are actually finished:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Practical completion.</strong> The point at which the work is complete enough
            for the client to take possession and use it. It matters because other things hang off
            it — possession, insurance, and the start of the defects liability period.
          </li>
          <li>
            <strong>Snagging.</strong> The handover inspection, and the list of minor items it
            produces. Worth doing properly: an inspection carried out before a builder&rsquo;s
            clean, through protection and site dust, finds far fewer items than are really there.
          </li>
          <li>
            <strong>Defects liability period.</strong> A defined period after completion during
            which things that emerge are put right by the contractor. Knowing when yours ends is
            worth more than most people think.
          </li>
        </ul>
        <p>
          On a domestic job none of this will be called by these names, but the same shape applies:
          a walk round, a list, a final tidy, and a period afterwards where the customer rings you
          if something is not right.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Certifying on Friday afternoon from memory"
        whatHappens={
          <>
            Results were scribbled on the back of a drawing during the week and the certificate gets
            filled in at the end, at speed, to get away. Values get transposed, a circuit gets
            missed, the schedule does not match what was installed — and the document that is
            supposed to be the proof of a safe installation becomes the weakest thing on the job.
          </>
        }
        doInstead={
          <>
            Record results as you test, on the schedule that will be issued rather than on a scrap.
            The certificate is then mostly written by the time you reach it, and it says what
            actually happened rather than what somebody remembers happening.
          </>
        }
      />

      <CommonMistake
        title="Snagging through the dust and the protection"
        whatHappens={
          <>
            <p>
              The handover walk happens when it can be fitted in, which is before the builder&rsquo;s
              clean, with protection still down and site dust over everything. Six items go on the
              list, everybody signs, and the job is treated as finished.
            </p>
            <p>
              A fortnight later the real list arrives from the client: the marked faceplate nobody
              could see under the dust, the accessory that was never fixed back properly, the chase
              that was filled but not finished. Every one of those has stopped being a snag you
              could have sorted while you were standing there and become a defect that costs a
              return visit.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Inspect when the area is genuinely presentable &mdash; after the clean, with
              protection lifted and the lighting on &mdash; and plan that date rather than taking
              whatever slot is left. It is the same walk either way, and only one version of it
              finds what is actually there.
            </p>
            <p>
              Treat a thorough snagging inspection as the cheapest work on the job: every item
              caught now is a few minutes while you still have tools on site, and every item missed
              is a visit during the defects liability period. Agree who accepts the work before you
              book the walk, so the list you produce is the list that counts.
            </p>
          </>
        }
      />

      <SectionRule />

      <ConceptBlock title="Handover depends on other people">
        <p>
          Your work is rarely the last thing to happen. Making good may be someone else&rsquo;s.
          Final decoration usually is. Access equipment has to come out before the floor can be
          cleaned, and the floor has to be clean before anyone will inspect it.
        </p>
        <p>
          That makes handover a coordination problem, and coordination problems are solved at the
          planning stage or not at all. Two questions settle most of it: what has to be finished by
          others before I can hand over, and who decides that the work is accepted? Asking them in
          week one takes a minute. Asking them in the final week is how a job sits ninety per cent
          complete for a fortnight.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-1-7-check-2"
        question="Who is the Electrical Installation Certificate issued to?"
        options={[
          'The person ordering the work',
          'The main contractor’s site manager',
          'Whoever is on site when you finish',
          'The building control body',
        ]}
        correctIndex={0}
        explanation="Regulation 644.4 names the person ordering the work — the client, or whoever commissioned the installation. Handing it to whoever happens to be standing there is not the same thing."
      />

      <InlineCheck
        id="304-1-7-check-3"
        question="The client wants to trade from the front of the shop while you finish the stockroom. What has to be true?"
        options={[
          'Nothing — it is their building and their decision',
          'The part being taken into use has been inspected and tested, and the boundary is written down',
          'The whole installation must be complete first, with no exceptions',
          'The stockroom circuits can stay live as long as nobody uses them',
        ]}
        correctIndex={1}
        explanation="Sectional handover is normal. What is not acceptable is a circuit that is live because it shares a board with the finished area but has never been verified — which is exactly what certification exists to prevent."
      />

      <Scenario
        title="Finished, except for the four days nobody planned"
        situation={
          <>
            A retail unit refit in Newtown. The electrical programme runs three weeks and ends on
            the Friday with second fix complete. The client expects to trade on the Monday. On
            Friday morning: testing has not started, six luminaires are waiting on the ceiling grid
            being finished, the board schedule has not been written up, nobody has shown the manager
            how the emergency lighting test switch works, and there are two chases in the stockroom
            still open.
          </>
        }
        whatToDo={
          <>
            Triage: testing and certification are the things that cannot be deferred, so they take
            Friday and Saturday. The luminaires wait on the grid, which is somebody else&rsquo;s
            critical path and should have been flagged a fortnight ago. Making good and the
            demonstration go into Monday morning before opening, which the client has to be asked
            about today rather than discovered on the day.
          </>
        }
        whyItMatters={
          <>
            Every item here was foreseeable in week one. The programme was written to the end of the
            installation rather than to the end of the <em>job</em>, and handover is where that
            distinction always gets paid for.
          </>
        }
      />

      <VideoCard {...videos.scheduleOfInspections} topic="One of the documents that has to exist before you can hand over" />

      <SectionRule />

      <ContentEyebrow>Recording results as you test</ContentEyebrow>

      <ConceptBlock
        title="Record results as you test, not afterwards"
        plainEnglish="The certificate should be nearly written by the time you reach it."
      >
        <p>
          The single practice that makes handover painless is recording test results onto the
          schedule that will actually be issued, at the point you take them. Not a notebook, not the
          back of a drawing, not memory.
        </p>
        <p>
          Two things follow. The certification stops being an evening&rsquo;s work at the end, which
          is when mistakes get made and values get transposed. And a result that looks wrong gets
          noticed on the day you are standing at the board with the instrument in your hand, rather
          than three days later when going back is a visit.
        </p>
        <p>
          It also means that if the job stops for any reason, what has been verified so far is
          recorded rather than being in somebody&rsquo;s head.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Partial handovers</ContentEyebrow>

      <ConceptBlock
        title="Partial handovers"
        onSite="If the client takes part of it early, say what has been verified and what has not."
      >
        <p>
          Jobs are often handed over in pieces — a floor at a time, a wing at a time, a shop trading
          while the back of house is finished. That is normal, and it needs stating rather than
          drifting into.
        </p>
        <p>
          What matters is that the part being taken into use has been inspected and tested, and that
          everyone understands where the boundary is. A circuit that is energised because it shares
          a board with the finished area, but which has not been verified, is precisely the
          situation certification exists to prevent.
        </p>
        <p>
          Write the boundary down. On a sectional handover the question &ldquo;is this bit live and
          signed off, or just live?&rdquo; has to have an answer that does not depend on who is
          asked.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>What the next person needs</ContentEyebrow>

      <ConceptBlock title="What the next person will need">
        <p>
          Someone will work on this installation again — to add to it, to fault-find on it, or to
          inspect it in ten years. What you leave behind decides how long that takes.
        </p>
        <p>
          The useful minimum is a board that is properly labelled, a schedule that matches what is
          actually installed, and any drawing marked up where the installation differs from the
          design. None of that is glamorous and all of it is the difference between a straightforward
          future job and an afternoon of tracing circuits.
        </p>
        <p>
          It is also a maintainability decision coming home — the same constraint criterion 1.4 asked
          you to weigh when choosing the approach in the first place.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="After you leave">
        <p>
          Handover is not the end of your involvement. There is usually a period during which
          anything that emerges comes back to you, and there are commonly things the client wants
          explaining a week later when they have actually used the installation.
        </p>
        <p>
          Two habits make that cheap. Leave a clear point of contact, so a question reaches you
          rather than becoming a complaint. And keep your own copy of everything issued — on the day
          somebody queries a result or asks what was installed, the file is the whole of your
          answer.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'How much time should I allow for testing and certification?',
            answer:
              'It scales with the number of circuits and with how organised you were during the job. The honest way to arrive at a figure is your own record: how long the last comparable job actually took, rather than how long you felt it should. What you should not do is leave it as the gap between finishing and going home.',
          },
          {
            question: 'The client is not on site at handover. Does that change anything?',
            answer:
              'The certificate still has to reach the person ordering the work — sending it is fine, leaving it on a windowsill is not. Demonstration is the part that genuinely suffers, so arrange a time with whoever will operate the installation, even if that is a separate visit. A system nobody was shown generates callbacks that are not faults, and those come out of your time.',
          },
          {
            question: 'What is the difference between a snag and a defect?',
            answer:
              'Timing, mostly. A snag is picked up at the handover inspection and put right around completion. A defect emerges afterwards, during the defects liability period, and is returned to. The practical consequence is that a thorough snagging inspection converts future defects — which cost a return visit — into present snags, which cost a few minutes while you are still there.',
          },
          {
            question: 'Does this apply to a small domestic job?',
            answer:
              'The certification does, absolutely — the Regulations do not scale with the size of the job. The contractual language does not, but the shape is the same: walk round with the customer, agree anything outstanding, show them the board and the RCD test, leave the place clean, and issue the certificate to whoever asked for the work.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Handover is a planning input — testing, certification, demonstration and making good all need programme time.',
          'BS 7671 Regulation 644.4: the Electrical Installation Certificate goes to the person ordering the work.',
          'A certificate is supported by the Schedule of Inspections and the Schedule of Test Results.',
          'Four things go across: certification, documentation, demonstration, and the building put back.',
          'Practical completion is when the client can take and use the work; it starts the defects liability period.',
          'Snag properly — an inspection before a builder’s clean finds a fraction of what is there.',
          'Record test results as you test, not from memory on the last afternoon.',
          'Ask in week one what others must finish first, and who accepts the work.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Identify the handover requirements of work" />
    </div>
  );
}
