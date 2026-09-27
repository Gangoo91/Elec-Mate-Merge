/**
 * Unit 313 · Learning outcome 2 · Criterion 2.3 — The methods of providing
 * technical and functional information
 *
 * Teaches method rather than content, on a spine of permanence: information
 * lives ON the installation, WITH a person, or only in a conversation, and the
 * third kind disappears. Judgement made: 514.12 is described in prose only
 * (its A4:2026 domestic exception is conditional), and the RegsCallout quotes
 * 644.4 verbatim.
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
    question:
      'Which method keeps information with the installation itself rather than with a person?',
    options: [
      'Labelling and notices fixed at the board and at the point of use',
      'The Electrical Installation Certificate handed to the client',
      'A verbal briefing given to the site agent on the day of handover',
      'The operation and maintenance manual filed in the client’s office',
    ],
    correctAnswer: 0,
    explanation:
      'Labels and notices are the only method that stays physically attached to the installation. Certificates, manuals and briefings all travel with people, and people leave.',
  },
  {
    id: 2,
    question:
      'Under BS 7671 Regulation 644.4, who is the Electrical Installation Certificate issued to?',
    options: [
      'The person ordering the work',
      'The occupier of the premises, whoever that is on the day',
      'The local authority building control department',
      'The contractor who will carry out the next periodic inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 644.4 states the certificate shall be issued to the person ordering the work, by those responsible for design, construction and verification, taking account of their respective responsibilities.',
  },
  {
    id: 3,
    question:
      'A caretaker needs to be able to reset a tripped RCBO in a locked riser cupboard. What is the right method?',
    options: [
      'Demonstrate it, then watch the caretaker do it unaided before you leave',
      'Email a written step-by-step procedure the same evening',
      'Describe the sequence verbally while you pack the van',
      'Add a line about it to the operation and maintenance manual',
    ],
    correctAnswer: 0,
    explanation:
      'Anything with a physical sequence is taught by demonstration and confirmed by teach-back. Writing it down afterwards is useful backup, but it is not how somebody learns a manual task.',
  },
  {
    id: 4,
    question: 'Why is verbal information the highest-risk method of the six?',
    options: [
      'It leaves no record and it leaves the site when the person you told leaves',
      'It is always less accurate than writing, because people mishear technical terms',
      'BS 7671 does not permit verbal information to be given to a client',
      'It takes longer than writing the same information down',
    ],
    correctAnswer: 0,
    explanation:
      'Verbal is fast, flexible and often the right first move. The risk is permanence: six months later there is nothing to point at and nobody who remembers.',
  },
  {
    id: 5,
    question:
      'What does BS 7671 require to be issued with certification so that the recipient can understand it?',
    options: [
      'The guidance for recipients set out in Appendix 6',
      'A copy of the designer’s calculations for every final circuit',
      'A written quotation showing the cost of the remedial work',
      'The manufacturer’s data sheet for the consumer unit',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 requires certification to be issued complete with the guidance for recipients set out in Appendix 6. Stripping it out to save paper leaves the document incomplete.',
  },
  {
    id: 6,
    question:
      'A colleague tells you that A4:2026 removed the need for periodic inspection notices in houses. What is the correct response?',
    options: [
      'The exception is conditional, so read Regulation 514.12 and check the qualifying situations',
      'He is right, domestic premises no longer need any notices at all',
      'He is wrong, nothing changed in A4:2026 regarding notices',
      'It only applies to rented property, so fit the notice in owner-occupied homes',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 514.12 covers notices for periodic inspection and testing. A4:2026 introduced an exception for domestic (household) premises in certain situations, and those situations are defined in the regulation, so the wording has to be read rather than assumed.',
  },
  {
    id: 7,
    question: 'Which of these is functional information rather than technical information?',
    options: [
      'Which switch controls the external lighting and how the time clock is overridden',
      'The measured Zs at the furthest point of the kitchen ring final circuit',
      'The cross-sectional area and type of the submain to the outbuilding',
      'The IP rating of the enclosure fitted in the plant room',
    ],
    correctAnswer: 0,
    explanation:
      'Functional information is what the installation does and how it is used. The other three describe how it is built, which is technical information.',
  },
  {
    id: 8,
    question:
      'A SWA submain is about to be backfilled across a car park. What is the most useful record to create at that moment?',
    options: [
      'Dated photographs with a tape or fixed feature in shot, captioned and filed with the project record',
      'A verbal note to the groundworker so he knows where not to dig',
      'A line in your day book saying the submain was laid that morning',
      'A reminder to yourself to update the as-installed drawing at the end of the job',
    ],
    correctAnswer: 0,
    explanation:
      'Once it is buried, nobody can see it again. A dated, captioned photograph with a measurement reference in shot is evidence; an uncaptioned image in your camera roll is not a record.',
  },
];

export default function Lesson313_2_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Information lives in one of three places: on the installation, with a person, or only in a conversation. The third kind disappears.',
          'Technical information is how it is built. Functional information is what it does and how to use it. Functional is the half that gets skipped.',
          'Match the method to the job: demonstration for sequences, drawings for anything spatial, labels for anything somebody will stand in front of at 2am.',
          'Verbal is the fastest method and the weakest record. Use it, then confirm it in writing the same day.',
          'A certificate is a method of providing information, not a receipt. It goes to the person ordering the work, complete with its Appendix 6 guidance.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Name the six methods of providing information and say what each one is good at.',
          'Match a method to the audience and to the purpose, rather than to your own habit.',
          'Explain why some information must sit on the installation and some must sit with a person.',
          'Use certification and Appendix 6 guidance correctly as a method of supplying information.',
          'Turn a verbal handover into something that survives the person who received it.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Two halves, two destinations</ContentEyebrow>

      <ConceptBlock
        title="The two halves, and where each one goes"
        plainEnglish="Technical is how it is built. Functional is how it is used. They need different methods."
      >
        <p>
          You already know the split. Technical information is circuits, ratings, cable sizes, test
          results, schedules. Functional information is which switch does what, how the timer works,
          what to do when it trips at half six on a Sunday.
        </p>
        <p>
          The split decides your method. Technical information is dense and exact, read sitting
          down: certificates, schedules, drawings. Functional information is short, used standing
          up, and needed at the worst possible moment: demonstration and labelling.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Technical, written.</strong> The schedule of test results for a rewired flat.
            Nobody memorises it. It has to be findable in three years&rsquo; time.
          </li>
          <li>
            <strong>Functional, demonstrated.</strong> Showing the caretaker how to key-test the
            emergency lighting. Nobody reads a manual for this. They copy you once.
          </li>
          <li>
            <strong>Functional, labelled.</strong> A legend at the board saying which way the
            three-position switch runs. Whoever needs it will be alone, holding a phone torch.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="313-2-3-check-1"
        question="A ward sister asks you what happens to the bed-head sockets if the incoming supply is lost. Is that a technical or a functional question, and what is she really asking?"
        options={[
          'Technical — she needs the rating and disconnection time of the affected circuits',
          'Functional — she needs to know what still works and what she must do about it',
          'Technical — she needs the schedule of test results for the ward distribution board',
          'Neither — supply arrangements are outside the scope of information you supply',
        ]}
        correctIndex={1}
        explanation="She is asking a functional question in technical clothing. She does not want the Zs. She wants to know which sockets stay live, which do not, and what her staff should do in the first minute. Answer that, then offer the technical detail to the estates engineer."
      />

      <SectionRule />

      <ContentEyebrow>Written and verbal</ContentEyebrow>

      <ConceptBlock
        title="Written information: the only kind that outlives you"
        onSite="If it will matter in a year, it must exist on paper or as a file, not in somebody's memory."
      >
        <p>
          Written covers certificates, schedules, operation and maintenance information, letters and
          emails. Its strength is permanence. Its weakness is that nobody reads it under pressure,
          and a document that cannot be found does not exist.
        </p>
        <p>
          Two habits separate a good written handover from a bad one. Say who it is for on the front
          of it &mdash; duty holder, incoming contractor, tenant. And keep a copy with the date it
          went out: in a dispute, the copy and the date are the whole argument.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 644.4"
        meaning="&ldquo;The Electrical Installation Certificate shall be issued to the person ordering the work ... by the person or persons responsible for the design, construction and verification of the installation, taking account of their respective responsibilities.&rdquo; The certificate is a method of providing information, and the regulation names both the recipient and the issuer. It goes to the person who ordered the work &mdash; which on a tenanted job is the landlord or agent, not the tenant who let you in. BS 7671 also requires certification to be issued complete with the guidance for recipients set out in Appendix 6, so do not strip it off to save paper."
        cite="BS 7671 Part 6 — Inspection and Testing"
      />

      <SectionRule />

      <ConceptBlock
        title="Verbal information: fast, flexible, and gone by Friday"
        plainEnglish="Talking is the best way to explain something and the worst way to record it."
      >
        <p>
          Verbal is the method you use most and think about least. It is genuinely the right choice
          when the information is urgent, when you need to check the other person has understood, or
          when you are negotiating something &mdash; a site manager asking whether the board change
          can slip to Tuesday.
        </p>
        <p>
          The failure is always the same. Six months on, the person you told has moved site and
          there is nothing to point at. Treat verbal as the opening move: say it, then send four
          lines by email the same day, while you still remember the detail.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Confirm the decision, not the chat.</strong> &ldquo;As agreed today: circuit 7
            stays isolated until the freezer is moved.&rdquo;
          </li>
          <li>
            <strong>Name who was there.</strong> Five words, and it settles any later argument.
          </li>
          <li>
            <strong>Say what happens next and who does it.</strong> An instruction with no owner is
            a wish.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Demonstration and drawings</ContentEyebrow>

      <ConceptBlock
        title="Demonstration: the method for anything with a sequence"
        onSite="Show it once, then make them do it while you stand there saying nothing."
      >
        <p>
          If the information is physical actions in order &mdash; reset this, then this, then check
          that lamp &mdash; writing it down is the wrong first method. People learn a manual
          sequence by watching once and doing once, not by reading.
        </p>
        <p>
          The half that gets skipped is the second half. Hand over and watch them complete the
          sequence unaided. Where they hesitate is exactly what your written note must spell out.
          Demonstration also tells you what no other method does: whether the person is able and
          willing to do it at all. A scheme manager who will not open a board needs another plan.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Drawings and schedules: the method for anything spatial"
        plainEnglish="If the question starts with ‘where’, the answer is a drawing."
      >
        <p>
          As-installed drawings, containment layouts, single-line diagrams, the distribution board
          schedule and the schedule of circuit details all do a job that prose cannot. A paragraph
          describing a cable route is unreadable. A marked-up plan takes two seconds.
        </p>
        <p>
          Three rules keep drawings honest. Mark them as-installed, not as-designed. Date and
          revision them, so the next person knows which sheet is current. And issue the marked-up
          copy, not the clean one &mdash; the pencil lines are the information.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Board schedule.</strong> The most-used document in the building after handover:
            functional information in a technical format.
          </li>
          <li>
            <strong>Single-line diagram.</strong> Tells an incoming engineer what feeds what before
            he touches anything. Worth more than an hour of tracing.
          </li>
          <li>
            <strong>Marked-up route drawing.</strong> Keeps the next trade&rsquo;s drill out of your
            submain.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="313-2-3-check-2"
        question="You have rewired a village hall. The committee chair will hold the paperwork, and a rotating team of volunteers will actually use the building. Where does the day-to-day functional information belong?"
        options={[
          'On the installation as labels and notices, because the users change constantly',
          'In the operation and maintenance manual given to the committee chair',
          'In a verbal briefing to the chair, who can pass it on to the volunteers',
          'In the schedule of test results, which stays in the hall with the certificate',
        ]}
        correctIndex={0}
        explanation="When the audience rotates, information held by a person is lost at the first changeover. Anything a volunteer needs at the board has to be attached to the board. The manual and the certificate still go to the chair, but they are not how a volunteer finds the hall lighting circuit on a wet Tuesday."
      />

      <SectionRule />

      <ContentEyebrow>Labels, notices and photos</ContentEyebrow>

      <ConceptBlock
        title="Labelling and notices: information that stays with the installation"
        onSite="Write the label for somebody who has never met you and is standing there alone."
      >
        <p>
          This is the method with no equal. A label does not resign, lose the folder or go on
          holiday. Regulation 514.12 deals with notices concerning periodic inspection and testing.
          A4:2026 introduced an exception for domestic (household) premises in certain situations,
          but that exception is conditional and the qualifying situations are set out in the
          regulation itself. Read the wording. Do not take it from a colleague or a forum.
        </p>
        <p>
          Beyond what the standard requires, good labelling is a habit. Name circuits in the words
          the user uses, not the words on the drawing: &ldquo;shop front shutter&rdquo; beats
          &ldquo;SFC-03&rdquo; every time. Label both ends of anything running between rooms. And
          where something is unusual &mdash; a supply from a neighbouring building, an interlock, a
          generator changeover &mdash; say so at the board. That label is the only warning the next
          electrician gets.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>At the board.</strong> Circuit identification, warnings, anything about
            isolation that is not obvious.
          </li>
          <li>
            <strong>At the point of use.</strong> The switch nobody can work out. The socket on a
            separate supply. The isolator that looks like a light switch.
          </li>
          <li>
            <strong>Durable, not temporary.</strong> Marker pen on masking tape is a note to
            yourself.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Digital and photographic: strong evidence, weak filing"
        plainEnglish="Photos prove what you cannot see any more. They only count if they are captioned and filed."
      >
        <p>
          Photographs of first-fix before the plasterboard, of a trench before backfill, of damage
          you found on arrival: the strongest evidence you will ever produce, because it cannot be
          argued with. Digital delivery also makes certificates searchable years later. Paper is
          not.
        </p>
        <p>
          The weakness is discipline. Two thousand photos in a camera roll is not a record. Each
          image needs a date, a location and a caption, filed with the job and not left on your
          phone. Get a measurement reference in shot &mdash; a tape, a doorway, a manhole cover
          &mdash; or you prove the cable exists but not where. Check the site rules on photography
          before you start, and never put a person in shot without asking.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Choosing the method</ContentEyebrow>

      <ConceptBlock
        title="Choosing the method: three questions"
        onSite="Ask who, how long, and what it costs them to get it wrong."
      >
        <p>
          Most people pick a method out of habit. The method is a decision, and three questions
          settle it.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Who is the audience?</strong> A duty holder wants the technical pack. A tenant
            wants two sentences and a label. An incoming contractor wants the drawings.
          </li>
          <li>
            <strong>How long must it last?</strong> Needed today &mdash; verbal is fine. Needed in
            five years &mdash; written, or fixed to the installation.
          </li>
          <li>
            <strong>What does a mistake cost?</strong> A nuisance callout &mdash; a label will do.
            Somebody working on a circuit they believe is dead &mdash; the information has to be
            permanent, at the point of danger, and impossible to miss.
          </li>
        </ul>
        <p>
          Most real handovers use three or four methods at once, and that is correct. Demonstrate
          the sequence, label the board, issue the certificate with its Appendix 6 guidance, email a
          summary that evening. That is not belt and braces. It is one method per audience.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="313-2-3-check-3"
        question="You verbally warn a site manager that a temporary supply must not be extended without checking the submain rating. What is the minimum you should do to make that information last?"
        options={[
          'Rely on the verbal warning, since you gave it to the person in charge',
          'Note it in your own day book in case it is queried later',
          'Send a short dated email confirming it and fix a notice at the temporary board',
          'Mention it again at the next site meeting so more people hear it',
        ]}
        correctIndex={2}
        explanation="The warning matters to whoever stands at that board, not only to the manager you told. The email gives you a dated record of what you said; the notice puts the information where the risk is. Your day book protects you but warns nobody."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating the certificate as the handover"
        whatHappens={
          <>
            The paperwork is signed, the folder goes to the site agent, everybody shakes hands.
            Every piece of technical information has been delivered and not one piece of functional
            information has. Three weeks later the external lighting time clock loses its settings
            after a power cut, nobody knows it exists, and you are called out as if it were a fault
            of yours. The client now thinks the installation is unreliable.
          </>
        }
        doInstead={
          <>
            Split the handover in two before you go. The technical list is written: certificate to
            the person ordering the work with its Appendix 6 guidance, schedules, as-installed
            drawings. The functional list is face to face &mdash; sequences demonstrated and handed
            back, anything met alone labelled &mdash; then confirmed by email the same day, so it
            survives the person you showed.
          </>
        }
      />

      <CommonMistake
        title="Leaving a label that is now wrong"
        whatHappens={
          <>
            <p>
              You have re-fed a board and moved two circuits, and the old identification is still
              on the front of it. It was wrong before you arrived, so it does not feel like yours,
              and it stays. The new ways get marker pen on masking tape, because the proper labels
              are in the van and the van is at the other end of the site.
            </p>
            <p>
              Both leave the same thing behind: a board that tells confident lies. The tape has
              curled off by the winter, and somebody eventually stands in front of that board
              believing what the old label says about a circuit you moved.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Correct any label your work has made misleading, or flag it in writing to whoever
              holds the whole installation. You are responsible for identifying what you installed
              and for not leaving a misleading label behind you, whoever originally wrote it.
            </p>
            <p>
              Then make it last and make it readable. Durable labels rather than marker pen on
              tape, named in the words the user actually uses, both ends of anything running
              between rooms, and a plain note at the board for anything unusual &mdash; that label
              is the only warning the next electrician gets.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Llanelli — a sheltered housing scheme and a handover that walked out the door"
        situation={
          <>
            You have finished the communal areas of a sheltered housing scheme in Llanelli: new
            emergency lighting with a key-switch test facility in the lobby, a time clock for the
            car park lighting, a new board in the plant room. The housing association&rsquo;s
            contract manager wants the certificate emailed and everything else &ldquo;run past
            Delyth&rdquo;, the scheme manager, over the phone, because you start in Burry Port on
            Monday. Delyth has run the scheme nine years and a call really would be enough for her.
          </>
        }
        whatToDo={
          <>
            Do not accept a phone handover for the functional half. Go back for two hours. Issue the
            certificate to the association as the person ordering the work, with its Appendix 6
            guidance, schedules and as-installed drawing. On site, demonstrate the key test to
            Delyth, then stand back and let her do it unaided; same with the time clock override.
            Then fix the information to the building: a durable notice at the key switch saying what
            the test is and how often, circuit identification at the new board, and a label on the
            time clock. Finish with a five-line email to Delyth and the contract manager recording
            what was demonstrated, to whom, and on what date.
          </>
        }
        whyItMatters={
          <>
            Delyth moved to another scheme four months later. Her replacement inherited a building,
            not a briefing. Where the information was fixed to the installation the monthly test
            carried on; where it lived only in a phone call it stopped, and that surfaces as a
            failed duration test at the annual service, a remedial visit, and an argument about
            whether the contractor ever explained it. Two hours, against a callout and a retest.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question:
              'The client says they do not want a paper certificate, just the PDF. Is that acceptable?',
            answer:
              'Electronic issue is normal and BS 7671 does not require paper. What matters is that the certificate reaches the person ordering the work, that it is complete including the guidance for recipients in Appendix 6, and that you keep your own copy with the date it was sent. Send the PDF, keep the sent email, and do not strip pages out of it.',
          },
          {
            question: 'How much detail should I give a tenant compared with the landlord?',
            answer:
              'The landlord ordered the work and gets the full technical pack. The tenant gets the functional half: what has changed, which switch does what, what to do if something trips, and who to ring. Two minutes and a clear label beats a document they will never open. Keep to what you were asked to do and hand anything beyond your remit back to the landlord or agent.',
          },
          {
            question: 'Is a WhatsApp message a written record?',
            answer:
              'It is better than nothing and it is time-stamped, but it is a personal channel that you may not still have access to in two years and the client may never search. Use it to be quick, then put anything that matters into an email or onto the job record where it can be found by somebody other than you.',
          },
          {
            question: 'Who is responsible for labelling if I only installed part of the system?',
            answer:
              'You are responsible for identifying and labelling what you installed and for not leaving misleading labels behind you. Where your work changes what an existing label means — you have re-fed a board, or moved circuits — correct it or flag it in writing to whoever holds the whole installation. Do not quietly leave a wrong label in place because it was wrong before you got there.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'There are six methods: written, verbal, demonstration, drawings and schedules, labelling and notices, and digital or photographic. Most handovers need several.',
          'Information sits on the installation, with a person, or only in a conversation. Decide deliberately which, because the third kind disappears.',
          'Technical information is written and read sitting down. Functional information is demonstrated and labelled and used standing up.',
          'Regulation 644.4 sends the Electrical Installation Certificate to the person ordering the work, issued by those responsible for design, construction and verification.',
          'BS 7671 requires certification to be issued complete with the guidance for recipients in Appendix 6 — issuing it without that guidance is issuing it incomplete.',
          'Regulation 514.12 covers notices for periodic inspection and testing; the A4:2026 domestic exception is conditional, so read the regulation rather than assume it applies.',
          'Demonstration is only finished when the other person has done the task unaided while you watched.',
          'Confirm every significant verbal exchange in writing the same day, naming the decision, the people present and who does what next.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Methods of providing information" />
    </div>
  );
}
