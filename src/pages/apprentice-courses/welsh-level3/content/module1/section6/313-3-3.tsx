/**
 * Unit 313 — Electrotechnical Installation (Welsh Level 3 BSE)
 * Learning outcome 3 — Understand the importance of customer service in relation to
 * installation and/or maintenance activity.
 * Criterion 3.3 — The opportunities and regulations that affect the way that technical
 * and functional information is delivered to clients and customers.
 *
 * Approach: treat delivery of information as two halves. First the opportunities — handover,
 * photographs, digital copies, labelling and plain-English explanation of results. Then the
 * things that shape or limit delivery — certification having a defined recipient and form,
 * information that must sit on the installation as a notice, confidentiality, and contract terms.
 * No statutory claim is made anywhere on this page beyond the BS 7671 grounding quoted in the
 * RegsCallout; everything else legal or contractual is framed as something to check in the
 * specification or with the client.
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { TLDR } from '@/components/study-centre/learning';
import { ConceptBlock } from '@/components/study-centre/learning';
import { RegsCallout } from '@/components/study-centre/learning';
import { CommonMistake } from '@/components/study-centre/learning';
import { Scenario } from '@/components/study-centre/learning';
import { KeyTakeaways } from '@/components/study-centre/learning';
import { FAQ } from '@/components/study-centre/learning';
import { LearningOutcomes } from '@/components/study-centre/learning';
import { ContentEyebrow } from '@/components/study-centre/learning';
import { SectionRule } from '@/components/study-centre/learning';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question:
      'When is a client most likely to actually take in what you tell them about the installation?',
    options: [
      'At handover, standing at the board with the work finished in front of them',
      'On day one, before anything has been installed',
      'Six weeks later, in an email',
      'Halfway through second fix while you are still working',
    ],
    correctAnswer: 0,
    explanation:
      'Handover is the one moment the client is paying attention and the work is in front of them. Anything explained then is anchored to something they can see. The same words in an email six weeks later land on someone thinking about something else.',
  },
  {
    id: 2,
    question:
      'Under BS 7671 Regulation 644.4, who is the Electrical Installation Certificate issued to?',
    options: [
      'The person ordering the work',
      'Whoever happens to be on site on the last day',
      'The building control body only',
      'The main contractor in every case',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 644.4 states the certificate shall be issued to the person ordering the work, by the person or persons responsible for the design, construction and verification of the installation, taking account of their respective responsibilities. The recipient is defined for you.',
  },
  {
    id: 3,
    question: 'What is the value of photographing concealed work before it is covered?',
    options: [
      'It gives the client a permanent record of what is behind the finish, and it costs nothing to take',
      'It replaces the need to test the circuits',
      'It removes the need to issue certification',
      'It is only useful if the client complains',
    ],
    correctAnswer: 0,
    explanation:
      'Once a wall is skimmed nobody can see the cable route again. A set of photographs taken on your phone at first fix is free to produce and is one of the most useful things a client can be given.',
  },
  {
    id: 4,
    question:
      'A neighbour rings you asking for a copy of the certificate for the house you have just rewired. What do you do?',
    options: [
      'Do not send anything; refer the request back to the client and let them decide',
      'Send it, since the certificate is a technical document',
      'Send a redacted version without asking anyone',
      'Post it to the neighbour with the test results removed',
    ],
    correctAnswer: 0,
    explanation:
      'A request from outside the job goes back through the client. It is their premises, their details and their document. You are not the right person to decide who else gets it.',
  },
  {
    id: 5,
    question:
      'Why does some information have to be fixed to the installation rather than just handed over?',
    options: [
      'Paperwork gets lost or moves house with the owner; a notice at the board stays with the installation',
      'Because notices are cheaper than paperwork',
      'Because the client is not allowed to keep the certificate',
      'Because handover documents are not permitted on site',
    ],
    correctAnswer: 0,
    explanation:
      'The next person at that board may be a different owner, a different firm, years later. A durable notice is information delivered to whoever turns up, not just to whoever paid the bill.',
  },
  {
    id: 6,
    question:
      'On a public-sector job in Wales, how should you treat bilingual labelling and documentation?',
    options: [
      'As a contract question — read the specification and confirm the requirement before you order labels',
      'As something you can safely skip on electrical work',
      'As a decision for the client to make after handover',
      'As something you should assume applies identically to every job in Wales',
    ],
    correctAnswer: 0,
    explanation:
      'Bilingual signage and documentation can be written into a public-sector contract in Wales. It is a specification question, not an assumption. Check it before labels are engraved, because after is expensive.',
  },
  {
    id: 7,
    question:
      'What is the most useful thing to do with a test result the client does not understand?',
    options: [
      'Explain in plain terms what the number means and what would have made it a problem',
      'Tell them the figure and move on',
      'Leave it out of the conversation entirely',
      'Tell them it is too technical to explain',
    ],
    correctAnswer: 0,
    explanation:
      'A figure on a form is a figure. The same figure explained as what was measured, what the limit is and how far inside the limit you came turns the form into reassurance, and the client stops being suspicious of the paperwork.',
  },
  {
    id: 8,
    question:
      'When is the natural moment to raise ongoing maintenance and periodic inspection with a client?',
    options: [
      'At handover, while you are already talking them through the installation',
      'Only when the next inspection is already overdue',
      'In a cold call twelve months later',
      'Never — it looks like selling',
    ],
    correctAnswer: 0,
    explanation:
      'At handover they are engaged, the work is fresh and you are the person who knows the installation. Raising what happens next is information delivery, and it is also the moment you are most likely to be asked back.',
  },
];

export default function Lesson313_3_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Handover is the best opportunity you get to be understood. Use it deliberately rather than letting it happen at the van door.',
          'Photographs of concealed work, a short video of a control, and a certificate both emailed and left on site cost almost nothing and outlast you.',
          'Certification is not yours to redesign: BS 7671 defines who the Electrical Installation Certificate goes to, requires the Appendix 6 guidance for recipients with it, and Regulation 514.12 covers notices for periodic inspection and testing.',
          'Confidentiality and contract terms shape delivery. Check before sharing anything, and read the specification for format, timing, recipients and bilingual requirements.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Treat handover as the one moment the client is paying attention, rather than a paperwork drop.',
          'Use photographs of concealed work, labelling and digital copies as delivery methods in their own right.',
          'State what BS 7671 fixes about certification — the recipient, the form, and the guidance that goes with it.',
          'Recognise notices as information that lives on the installation rather than with a person.',
          'Treat confidentiality, contract format and bilingual requirements as things to check rather than assume.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Handover as an opportunity</ContentEyebrow>

      <ConceptBlock
        title="Handover is the opportunity, not the paperwork drop"
        plainEnglish="The client is paying attention exactly once. Use it."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>One window of attention.</strong> For most of the job the client is avoiding
            you. At handover the work is finished, the money is due and they are standing next to
            you looking at it. Nothing you send later gets that level of attention.
          </li>
          <li>
            <strong>Show, then say.</strong> Open the board. Point at the RCD. Press the test button
            while they watch. Information attached to a thing they can see is remembered; the same
            information in a paragraph is not.
          </li>
          <li>
            <strong>Plan it like a task.</strong> Ten minutes, board first, then anything unusual,
            then the paperwork, then what happens next. If handover is whatever is left at five
            o&rsquo;clock on a Friday, it will be a folder pushed across a worktop.
          </li>
          <li>
            <strong>Say what happens next.</strong> What will need inspecting, roughly when, and
            what would bring it forward &mdash; a change of use, a tenant, an extension. That is
            information the client needs, and it is the natural moment to be asked back.
          </li>
          <li>
            <strong>Leave your details on the installation.</strong> A small durable label at the
            board with the firm&rsquo;s name and number is practical information and the cheapest
            marketing you will ever do.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Photographs of concealed work"
        onSite="Take them at first fix. You will never get another chance."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>What to shoot.</strong> Cable routes in walls and floors before boarding or
            plastering, joints and junction boxes before they are closed in, earthing and bonding
            connections, anything buried in insulation, and anything you had to route unusually.
          </li>
          <li>
            <strong>Give it scale.</strong> A photograph of bare studwork means nothing in two
            years. Get a door, a window or a tape measure in the frame so the position can be worked
            out later.
          </li>
          <li>
            <strong>It costs nothing.</strong> The phone is in your pocket. This is the cheapest
            piece of value you can hand a client and one of the few they will still be grateful for
            years afterwards.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="313-3-3-check-1"
        question="You are about to board out a ceiling you have just wired. What is the cheapest piece of lasting value you can create for the client in the next two minutes?"
        options={[
          'Write the circuit numbers on the plasterboard before it goes up',
          'Email the client to say the ceiling is being closed in',
          'Leave a note in the loft for the next electrician',
          'Photograph the cable runs with something in shot that shows where they are',
        ]}
        correctIndex={3}
        explanation="Photographs with a reference point in frame are free, permanent and usable by anyone who comes later. Writing on the board is covered by the skim; a note in a loft is found by nobody."
      />

      <SectionRule />

      <ContentEyebrow>Delivery and labelling</ContentEyebrow>

      <ConceptBlock
        title="Digital delivery — two copies, two places"
        plainEnglish="Email it and leave it on site. Paper gets lost; inboxes get changed."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Belt and braces.</strong> Send the certificate and schedules by email so there
            is a dated record of sending, and leave a printed copy on site in a folder at the board.
            Losing both is much harder than losing one.
          </li>
          <li>
            <strong>A short video beats a manual.</strong> Thirty seconds on a phone showing how the
            immersion timer is overridden, or how the heating boost works, saves a call-out. Send it
            in the same email.
          </li>
          <li>
            <strong>Name the files properly.</strong> &ldquo;Scan_0042.pdf&rdquo; is lost the day it
            arrives. The address, the document type and the date in the filename means the client
            can find it in three years when they are selling.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Labelling answers the question before it is asked"
        onSite="Every label you fit is one phone call you do not get."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Name the circuit like the client talks.</strong> &ldquo;Kitchen sockets&rdquo;
            and &ldquo;Garage&rdquo; are useful. &ldquo;Final circuit 7&rdquo; is not, to them.
          </li>
          <li>
            <strong>Label what is not obvious.</strong> An isolator in a cupboard, a supply feeding
            an outbuilding, a control that looks like a light switch but is not. Anything where
            someone will guess wrong.
          </li>
          <li>
            <strong>Durable, not marker pen.</strong> A biro label in a damp meter cupboard is
            unreadable in a year, which is worse than no label because it looks like information.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Explaining the results</ContentEyebrow>

      <ConceptBlock
        title="Explaining a test result turns a form into reassurance"
        plainEnglish="Say what you measured, what the limit was, and how far inside it you came."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Three sentences, not a lecture.</strong> What the test checks, what a good
            result looks like, what you got. That is the whole explanation and it works for
            insulation resistance, loop impedance or RCD times.
          </li>
          <li>
            <strong>Use their language for the risk.</strong> &ldquo;This one checks the supply can
            be cut off fast enough if a fault happens&rdquo; is honest and it is understandable.
            Naming the test and stopping is neither.
          </li>
          <li>
            <strong>Be straight about anything not perfect.</strong> If a result is within limits
            but close, say so and say what you would watch. Clients forgive a limitation explained;
            they do not forgive one found later on someone else&rsquo;s report.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="313-3-3-check-2"
        question="A homeowner points at the insulation resistance column and asks what the numbers mean. What is the best response?"
        options={[
          'Tell them it is a standard test and the result is fine',
          'Explain what the test checks, what a good figure looks like and where their result sits',
          'Tell them their electrician on the next job will explain it',
          'Read the figures out to them from the schedule',
        ]}
        correctIndex={1}
        explanation="Reading the figure out delivers nothing. Framing it as what was checked, what is acceptable and where they landed converts a column of numbers into the reassurance they were actually asking for."
      />

      <SectionRule />

      <ContentEyebrow>Certification and confidentiality</ContentEyebrow>

      <ConceptBlock
        title="Certification and notices &mdash; what BS 7671 fixes for you"
        plainEnglish="You do not get to redesign the certificate or choose who it goes to."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>The recipient is set.</strong> BS 7671 Regulation 644.4 requires the Electrical
            Installation Certificate to be issued to the person ordering the work. That is a defined
            party, not whoever is easiest to hand it to.
          </li>
          <li>
            <strong>Who issues it is set too.</strong> The same regulation puts issue in the hands
            of the person or persons responsible for design, construction and verification, taking
            account of their respective responsibilities. Three roles can mean three signatures.
          </li>
          <li>
            <strong>Issue it complete.</strong> BS 7671 requires certification to be issued complete
            with the guidance for recipients set out in Appendix 6. Stripping that guidance out
            because it looks like filler is not a tidy-up; it is an incomplete document.
          </li>
          <li>
            <strong>Some information goes on the installation.</strong> BS 7671 Regulation 514.12
            deals with notices concerning periodic inspection and testing. A notice at the board
            reaches whoever turns up in five years; paperwork only reaches the person who paid.
          </li>
          <li>
            <strong>Read the exception, do not assume it.</strong> A4:2026 introduced a conditional
            exception for domestic (household) premises in defined situations. &ldquo;It is a house
            so we do not need one&rdquo; is not what the regulation says &mdash; open it and check
            the qualifying situation.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 644.4"
        meaning="The Electrical Installation Certificate shall be issued to the person ordering the work, by the person or persons responsible for the design, construction and verification of the installation, taking account of their respective responsibilities. The standard also treats certification as being issued complete with the guidance for recipients set out in Appendix 6 — the notes that tell the person receiving it what the document is and what to do with it."
        cite="BS 7671 Part 6 — Inspection and Testing"
      />

      <ConceptBlock
        title="Confidentiality — check before you share"
        plainEnglish="A request from outside the job goes back through the client."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>The default is no.</strong> Client names, addresses, contact details,
            photographs of the inside of their premises and their certificates are not yours to
            circulate. If someone outside the job asks, you say you will pass the request on.
          </li>
          <li>
            <strong>Photographs are the easy trap.</strong> A concealed-work photograph is also a
            photograph of someone&rsquo;s home. Before it goes on a website, a group chat or a
            portfolio, ask the client. Most say yes; the point is that you asked.
          </li>
          <li>
            <strong>Third parties on the job are different from strangers.</strong> A main
            contractor, a letting agent or an insurer may be a legitimate recipient because the
            client has put them in that position. Confirm that with the client rather than deciding
            for yourself.
          </li>
          <li>
            <strong>Know where the rules live.</strong> Data protection and confidentiality sit
            outside BS 7671. Check the contract and your employer&rsquo;s own procedures, and ask
            the client when you are unsure, rather than guessing at what the law requires.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="313-3-3-check-3"
        question="An insurance company phones your office asking for the certificate and photographs from a job you completed last month. What is the correct first move?"
        options={[
          'Send the certificate because the insurer is a professional body',
          'Send the photographs only, since they are not a formal document',
          'Refuse outright and tell the insurer not to contact you again',
          'Take the request, send nothing, and ask the client whether they want it released',
        ]}
        correctIndex={3}
        explanation="The client owns the relationship and the information. Passing the request back to them is neither obstructive nor risky, and it takes the decision off your desk and puts it where it belongs."
      />

      <SectionRule />

      <ContentEyebrow>What the contract dictates</ContentEyebrow>

      <ConceptBlock
        title="The contract can dictate format, timing and recipients"
        onSite="Read the specification before you decide how you are handing anything over."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Format.</strong> Some specifications require a particular document set,
            particular file types, or an O&amp;M manual with a defined structure. A PDF emailed on
            the last day may not satisfy any of that.
          </li>
          <li>
            <strong>Timing.</strong> Retention, practical completion and final account can all hang
            off documents being received. Late paperwork is not an administrative annoyance; it is
            money sitting in someone else&rsquo;s account.
          </li>
          <li>
            <strong>Bilingual requirements in Wales.</strong> On public-sector work in Wales,
            bilingual signage and documentation can be written into the contract. Treat it as a
            specification question to confirm before you order labels or print manuals, not as a
            general rule you apply everywhere.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating the certificate as the whole of the handover"
        whatHappens={
          <>
            Fill in the certificate, email it, send the invoice, done. The information has been
            delivered because a document has been sent.
          </>
        }
        doInstead={
          <>
            The certificate is one channel with a defined recipient and a defined form. The other
            channels — the ten minutes at the board, the photographs of concealed work, the labels,
            the notices on the installation and the short video of the control — are the ones that
            actually reach the people who need them. A client who received a compliant certificate
            and nothing else will still ring you in three weeks to ask which switch does what.
          </>
        }
      />

      <CommonMistake
        title="Sharing the job with people who were never part of it"
        whatHappens={
          <>
            <p>
              The board came out well, so a photograph goes into the firm&rsquo;s feed and another
              into a portfolio. In the corner of one of them is the client&rsquo;s hallway, their
              front door and the number on it. Nobody asked her.
            </p>
            <p>
              A fortnight later the phone goes and somebody official-sounding wants the certificate
              and the photographs from that job. It is quicker to send them than to have a
              conversation, so they go. Neither the photographs nor the certificate were yours to
              give away: a concealed-work photograph is also a photograph of somebody&rsquo;s home,
              and the certificate belongs to the person who ordered the work.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Default to no and ask. Before a photograph of the inside of a client&rsquo;s premises
              goes on a website, into a group chat or into a portfolio, ask them. Most people say
              yes, and the value of it is that you asked.
            </p>
            <p>
              For a request from outside the job, take the request, send nothing and go back to the
              client for a decision. Someone the client has put in that position &mdash; a main
              contractor, a letting agent, an insurer &mdash; may well be a legitimate recipient,
              but confirm it with the client rather than deciding on their behalf. Confidentiality
              and data protection sit outside BS 7671, so check the contract and your
              employer&rsquo;s own procedures rather than guessing at the rules.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="A community centre in Caernarfon"
        situation={
          <>
            You are second on a small team rewiring the hall and kitchen of a community centre in
            Caernarfon. It is funded through the local authority, so it is public-sector work with a
            written specification. The job runs six weeks. You do the second fix, the testing and,
            because the approved electrician is on another site, you run the handover with the
            centre manager and a facilities officer from the council.
          </>
        }
        whatToDo={
          <>
            Two days before handover you send the engraved label schedule off: distribution board
            circuit charts, isolator labels for the kitchen and the boiler room, and the warning
            labels for the sub-main to the outbuilding. English only, because that is how the last
            four jobs were done. Thirty-one labels, made and delivered next day. At handover the
            facilities officer opens the specification on her laptop and turns it round. There is a
            clause requiring signage and documentation provided to the authority to be bilingual.
            The labels are wrong. So is the cover of the operation and maintenance folder your
            office printed. She is not difficult about it — she simply will not sign off practical
            completion until it is right. The cost: thirty-one labels re-engraved and a second
            half-day on site for two of you to fit them, plus a reprint of the folder. Call it a day
            of labour and the labels twice. Worse, practical completion slips by nine days over a
            weekend and a bank holiday, and retention release moves with it. Nobody did anything
            unsafe. The installation was fine. The delivery of the information was not what the
            contract asked for, and that was knowable on day one for the price of reading the
            specification.
          </>
        }
        whyItMatters={
          <>
            What the same handover got right is worth noting. You had photographed every cable drop
            in the hall walls before the boarding went back, and the sub-main route under the car
            park before it was backfilled. You showed the manager those on your phone, then emailed
            the set with the certificate the same evening and left a printed copy in a folder at the
            board. Eight months later the centre put a serving hatch through one of those walls and
            rang you first. That call came from the photographs, not the certificate.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question:
              'The client has asked me to put everything in one simple one-page summary instead of the full certificate pack. Can I?',
            answer:
              'You can add a plain-English summary — that is good practice and it is the sort of thing clients remember. What you cannot do is let it replace the certification. BS 7671 Regulation 644.4 defines who the Electrical Installation Certificate is issued to, and BS 7671 requires certification to be issued complete with the guidance for recipients in Appendix 6. Issue the full pack, then add your summary on top as a covering page.',
          },
          {
            question:
              'The person who ordered the work is a letting agent, but the landlord wants the certificate too. Who gets it?',
            answer:
              'Regulation 644.4 requires it to be issued to the person ordering the work, so start there and do that properly. Sending a copy on to the landlord as well is usually straightforward, but it is a question of the client relationship and any contract terms rather than something you decide unilaterally — confirm with the party who ordered the work before you forward anything.',
          },
          {
            question: 'Do I need bilingual labels on every job in Wales?',
            answer:
              'Do not assume either way. On public-sector work in Wales, bilingual signage and documentation can be a contract requirement, written into the specification. Read the specification, and if it is unclear ask the client or their representative in writing before labels are engraved or manuals printed. Treat it as a contract question for that job, not a general rule.',
          },
          {
            question:
              'It is a domestic rewire — can I skip the periodic inspection notice now that A4:2026 has an exception?',
            answer:
              'Read Regulation 514.12 before deciding. A4:2026 introduced an exception for domestic (household) premises, but it is conditional and the qualifying situations are set out in the regulation itself. Open the wording and check the job in front of you meets them. Assuming the exception applies because the property is a house is exactly the mistake the conditions exist to prevent.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Handover is the single best opportunity you have to be understood. Plan it as a task, do it at the board, and check the client can repeat back what matters.',
          'Photograph concealed work before it is covered, with something in frame for scale. It is free, permanent and the most useful record a client can be handed.',
          'Deliver digitally and physically — email the certificate and leave a copy on site, and add a thirty-second video of anything with a control the client will get wrong.',
          'Good labelling delivers information to whoever stands at that board in five years, which no conversation or email can do.',
          'Explain test results as what was checked, what is acceptable and where the result sits. That turns a form into reassurance.',
          'BS 7671 Regulation 644.4 fixes who issues the Electrical Installation Certificate and who receives it, and certification must be issued complete with the Appendix 6 guidance for recipients.',
          'Regulation 514.12 requires notices concerning periodic inspection and testing; the A4:2026 domestic exception is conditional, so read the qualifying situations rather than assuming.',
          'Confidentiality and contract terms shape delivery — check before sharing, send outside requests back through the client, and read the specification for format, timing, recipients and any bilingual requirement.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="3.3 — Delivering technical and functional information"
      />
    </div>
  );
}
