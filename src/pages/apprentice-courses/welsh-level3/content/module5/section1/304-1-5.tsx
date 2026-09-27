/**
 * Unit 304 · Learning outcome 1 · Criterion 1.5 — Recognise cost and waste
 * implications of the work
 *
 * Cost is taught as the four things a job actually consumes, plus the cost of
 * rework. Waste is taught as money before it is taught as rubbish, which is the
 * framing that makes an apprentice care about it.
 *
 * ⚠️ Deliberately no statutory citation on waste disposal. The employer RAG
 * carries site waste management plans and prelims but not the waste duty of
 * care, and this unit is not the place to state a legal duty we have not
 * grounded. Disposal is described as site and contract practice.
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
    question: 'A job consumes four kinds of cost. Which list is right?',
    options: [
      'Labour, materials, plant, and the overheads of running the site',
      'Materials, VAT, fuel, and profit',
      'Labour, profit, insurance, and tools',
      'Materials, labour, and nothing else',
    ],
    correctAnswer: 0,
    explanation:
      'The fourth is the one people forget. Site overheads — the preliminaries — are real money spent on administering and servicing the job rather than on the work itself.',
  },
  {
    id: 2,
    question: 'Why is rework the most expensive kind of waste?',
    options: [
      'You pay for the labour twice and the material at least once, and you lose the programme',
      'Because materials are the biggest cost on any job',
      'Because clients always refuse to pay for it',
      'It is not — over-ordering costs more',
    ],
    correctAnswer: 0,
    explanation:
      'Every other kind of waste costs you one thing. Rework costs labour twice, material again, and time you cannot buy back.',
  },
  {
    id: 3,
    question: 'You over-order by 15% on every job "to be safe". What is the real effect?',
    options: [
      'You have converted a small risk of delay into a certain cost, every time',
      'Nothing — surplus can always be used on the next job',
      'It improves margin because bulk is cheaper',
      'It reduces waste because there are fewer deliveries',
    ],
    correctAnswer: 0,
    explanation:
      'An allowance is insurance, and insurance has a premium. Paying 15% on everything to avoid an occasional half-day is usually a bad trade, and nobody notices because it never shows up as a loss.',
  },
  {
    id: 4,
    question: 'Which of these is a variation rather than a cost you should absorb?',
    options: [
      'The client asks for two extra sockets once work has started',
      'You mis-measured the cable run',
      'Your van broke down',
      'You forgot to allow for the board being in an awkward position',
    ],
    correctAnswer: 0,
    explanation:
      'A variation is a change to what was asked for. The other three are your own costs, and dressing one up as a variation is how contractors lose clients.',
  },
  {
    id: 5,
    question: 'When should a variation be raised?',
    options: [
      'When it arises, before the extra work is done',
      'On the final invoice',
      'At the end of the week, in a summary',
      'Only if it comes to more than a day’s work',
    ],
    correctAnswer: 0,
    explanation:
      'A variation raised at the invoice is a surprise, and a client who is surprised by money tends to dispute all of it. Raised before the work, it is a decision they get to make.',
  },
  {
    id: 6,
    question: 'What is "double handling", and why does it cost?',
    options: [
      'Moving the same material more than once because it was delivered where it could not stay',
      'Ordering the same item twice by mistake',
      'Two people carrying one item',
      'Testing a circuit twice',
    ],
    correctAnswer: 0,
    explanation:
      'It is pure lost labour with nothing to show for it, and it is usually a planning fault — material called forward to a place with no room for it.',
  },
  {
    id: 7,
    question: 'Which waste is easiest to design out at the planning stage?',
    options: [
      'Offcut waste, by setting out runs against the drum and coil lengths you are buying',
      'Damage in transit',
      'Waste caused by a change of specification',
      'Packaging waste',
    ],
    correctAnswer: 0,
    explanation:
      'Cutting to suit the lengths you actually hold is a planning decision, made before anything is cut. The others are largely outside your control once the order is placed.',
  },
  {
    id: 8,
    question: 'How should waste leaving site be handled?',
    options: [
      'Segregated where the site requires it, removed by a registered carrier, with the transfer paperwork kept',
      'Taken home in the van and dealt with later',
      'Left for the main contractor to absorb',
      'Mixed into one skip, which is always cheapest',
    ],
    correctAnswer: 0,
    explanation:
      'Segregation and documented removal are normal site and contract requirements, and mixed skips are frequently charged at the highest rate anyway — so the cheap-looking option often is not.',
  },
];

export default function Lesson304_1_5() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Four costs: labour, materials, plant, and the overheads of running the site. The fourth is the forgotten one.',
          'Rework is the worst waste — labour twice, material again, and programme you cannot buy back.',
          'A variation is a change to what was asked for. Raise it before the work, not on the invoice.',
          'Over-ordering "to be safe" converts an occasional delay into a certain cost on every job.',
          'Waste is money before it is rubbish — and criterion 2.2 will ask you what you ordered against what you used.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the four things a job spends money on, including the site overheads most people forget.',
          'Explain why rework is the most expensive form of waste on any job.',
          'Distinguish a variation from a cost you should absorb, and say when each should be raised.',
          'Recognise the common forms of material and time waste, and which can be designed out at planning.',
          'Describe how waste leaves site, and why the cheapest-looking disposal often is not.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What a job spends</ContentEyebrow>

      <ConceptBlock
        title="What a job actually spends"
        plainEnglish="Four buckets. Most people can name three."
      >
        <p>Every piece of work consumes money in four ways:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Labour.</strong> Hours on site, at the rate the people on site cost — which is
            not their wage. Travel and non-productive time are part of it.
          </li>
          <li>
            <strong>Materials.</strong> What goes into the building, plus the consumables that get
            used up getting it there.
          </li>
          <li>
            <strong>Plant.</strong> Hire on towers, MEWPs, transformers and test instruments,
            charged by the period whether or not you used them that day.
          </li>
          <li>
            <strong>Site overheads.</strong> The preliminaries — administering the job, welfare,
            access, storage, supervision, and the general services that keep work happening but are
            not in anyone&rsquo;s rate. On a larger job these are a significant figure in their own
            right; on a small one they hide inside your day and get ignored.
          </li>
        </ul>
        <p>
          You are not being asked to price a job. You are being asked to <em>recognise</em> that
          your planning decisions move these figures — a sequence that adds a week of tower hire, a
          method that adds two days of labour, a delivery pattern that adds storage.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-1-5-check-1"
        question="Your revised sequence saves one day of labour but extends scaffold hire by a week. What have you done?"
        options={[
          'Possibly increased the cost — labour saved has to be weighed against plant added',
          'Definitely saved money, because labour is the biggest cost',
          'Nothing that affects cost, since both were already budgeted',
          'Improved the programme, so cost is irrelevant',
        ]}
        correctIndex={0}
        explanation="Moving cost between buckets is not the same as removing it. A day of labour against a week of hire is an arithmetic question, and it has to be asked rather than assumed."
      />

      <SectionRule />

      <ConceptBlock
        title="Waste is money first"
        onSite="Every offcut in the bin was bought. Every hour hunting for something was paid for."
      >
        <p>
          It is easier to care about waste once you stop picturing a skip and start picturing the
          invoice. The common forms are:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Over-ordering.</strong> Material bought and never installed. The allowance you
            add is insurance, and the premium is paid on every job whether or not you needed it.
          </li>
          <li>
            <strong>Offcuts.</strong> Partly unavoidable, partly a set-out decision — cutting runs
            to suit the lengths you actually hold rather than cutting to suit convenience.
          </li>
          <li>
            <strong>Damage.</strong> Material stored badly, walked on, or left out. Almost always a
            consequence of calling it forward too early, which is criterion 1.1 coming back round.
          </li>
          <li>
            <strong>Double handling.</strong> Moving the same material twice because it landed
            where it could not stay. Pure lost labour with nothing installed at the end of it.
          </li>
          <li>
            <strong>Searching.</strong> Time spent looking for the right drawing, the right fitting,
            or the right person. Invisible on any invoice and one of the largest real losses on a
            badly organised job.
          </li>
          <li>
            <strong>Rework.</strong> The expensive one, below.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating rework as part of the job"
        whatHappens={
          <>
            Something is installed wrong, noticed, and quietly put right. It feels like diligence.
            What it actually costs is the labour to do it the first time, the labour to undo it, the
            labour to redo it, the material again where it cannot be reused, and a day off the
            programme — all of which came out of the same price the client agreed once.
          </>
        }
        doInstead={
          <>
            Treat every instance of rework as a planning finding, not a personal failing. Was the
            drawing revision wrong? Was the information missing? Was somebody set to work they were
            not briefed for? Criterion 2.2 will ask, and the honest answer is nearly always
            upstream of the person holding the screwdriver.
          </>
        }
      />

      <CommonMistake
        title="Working out what the job cost you after it has finished"
        whatHappens={
          <>
            <p>
              Nothing is written down while the job runs, because everybody knows roughly how it
              is going. At the end somebody asks how it went and the answer is reconstructed from
              memory: the material was about right, there was a bit of standing about, the tower
              was on hire longer than we needed.
            </p>
            <p>
              Memory flatters whoever is doing the remembering. The half-day spent waiting for a
              delivery has shrunk to an hour, the returned material has been forgotten entirely,
              and because nothing was measured, the same allowance and the same hire pattern go
              onto the next job unchanged.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Keep the small record as you go, because the one you need is smaller than people
              assume. Three columns cover it: what was ordered against what was installed, what
              was allowed against what it took, and any half-day that went on something other
              than the work.
            </p>
            <p>
              Kept that way it takes moments, it is the only honest basis for evaluating resource
              selection and usage afterwards, and it turns your own history into the reasoning
              behind the next job&rsquo;s allowance rather than a number you always use.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Variations and waste removal</ContentEyebrow>

      <ConceptBlock title="Variations, and the difference that matters">
        <p>
          A <strong>variation</strong> is a change to what was asked for: the client wants two extra
          sockets, the specification changes, an instruction is issued. It is a legitimate addition
          to the price.
        </p>
        <p>
          Your own errors are not variations. A mis-measured run, a forgotten allowance, a van that
          would not start — those are costs you carry. The line is clear enough in principle and
          gets blurred in practice, usually on the final invoice, which is exactly where blurring it
          does the most damage to a relationship.
        </p>
        <p>
          The discipline is timing. Raise a variation when it arises and before the extra work is
          done, so the client gets to decide whether they want it at that price. Raised at the
          invoice it is not a decision, it is a surprise — and a client surprised by one figure
          starts questioning all of them.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-1-5-check-2"
        question="Halfway through, the client asks for a spur adding in the utility room. What is the correct sequence?"
        options={[
          'Install it and add it to the invoice',
          'Price it, tell them, get agreement, then install it',
          'Install it and absorb the cost to keep them happy',
          'Refuse, because it is outside the scope',
        ]}
        correctIndex={1}
        explanation="All four get the socket fitted. Only the first leaves both sides knowing what was agreed — and it takes about ninety seconds."
      />

      <InlineCheck
        id="304-1-5-check-3"
        question="The price was tight and the programme has slipped two days. Which of these is NOT a legitimate way to recover?"
        options={[
          'Ask the client whether the end date can move',
          'Shorten the testing to fit the remaining time',
          'Add a second operative for the final two days',
          'Re-sequence so second fix and making good overlap',
        ]}
        correctIndex={1}
        explanation="Three of these are commercial decisions with trade-offs. The fourth crosses out of cost management entirely — an installation is inspected and tested before being put into service, and that is not a lever."
      />

      <ConceptBlock title="Getting waste off site">
        <p>
          The physical end of it matters too. Waste is normally segregated according to what the
          site requires, removed by a registered carrier, and the transfer paperwork kept — on most
          sites this is a contract requirement, checked by whoever is running it, and on a larger
          project it will sit inside a site waste management plan.
        </p>
        <p>
          Worth knowing commercially: a single mixed skip looks like the cheap option and often is
          not, because mixed loads are charged at the highest applicable rate. Segregating cardboard,
          clean metal and cable offcuts can pay for itself, and copper in particular has a value
          that people throwing it in a skip are giving away.
        </p>
      </ConceptBlock>

      <Scenario
        title="The job that came in on price and lost money"
        situation={
          <>
            A five-day rewire in Caernarfon, priced on 40 hours of labour and a £1,900 material
            take-off. It finished on the Friday as planned, and the client paid in full. Reviewing
            it: £280 of unused material went back to the van and will probably not be used, two
            half-days went on a second trip and a wait for a part, one circuit was re-run after a
            drawing turned out to be superseded, and the tower was on hire for the full week and
            used on two days.
          </>
        }
        whatToDo={
          <>
            Each of those is addressable and none of them is about working harder. Order to the
            take-off with a reasoned allowance rather than a habitual one. Check the drawing
            revision before first fix. Book the tower for the days it is needed. Two of the four are
            pure planning; one is information management; one is a phone call.
          </>
        }
        whyItMatters={
          <>
            Nothing here looks like a failure. The programme was hit, the client was satisfied and
            the work was compliant — and the job still returned less than it should have. This is
            what criterion 2.2 is for, and it is only answerable if somebody wrote these things down
            while they were happening.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>The floor under cost pressure</ContentEyebrow>

      <ConceptBlock
        title="Cost pressure has a floor"
        plainEnglish="Everything on this page stops at the point it would make the work non-compliant."
      >
        <p>
          A page about saving money needs one line drawn through it. Cost is a constraint you
          optimise against; compliance is not. Substituting cheaper equipment that is not suited to
          the conditions, skipping testing to save a day, or leaving out something the
          specification required are not savings — they are defects that have not been found yet.
        </p>
        <p>
          The pressure is real and it is usually indirect: a price that was tight, a programme that
          slipped, a client leaning on the end date. Recognising cost implications includes
          recognising when a cost decision has crossed out of commercial judgement and into
          something you should not be doing.
        </p>
        <p>
          CDM puts part of that back on the client, who has to allow adequate time and resources for
          the work to be done safely. A programme that only works if corners are cut is worth saying
          so about, in writing, early.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulation 4 · guidance in HSE L153"
        meaning="A client must make suitable arrangements for managing a project, including allocating sufficient time and other resources for the work. Where a single contractor is carrying out the work, the client must also provide the pre-construction information they hold and allow adequate time for the construction phase to be planned before the site is set up."
        cite="HSE L153, Managing health and safety in construction"
      />

      <SectionRule />

      <ContentEyebrow>Where money leaks</ContentEyebrow>

      <ConceptBlock
        title="Where the money actually leaks"
        onSite="Nobody loses a job on the price of cable. They lose it on days."
      >
        <p>
          Material is the cost everyone watches and rarely the one that decides whether a job
          returned anything. Labour is the large number, and labour is lost in ways that never
          appear as a line on an invoice:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Waiting.</strong> For access, for another trade, for a delivery, for a decision.
            Paid time with nothing installed.
          </li>
          <li>
            <strong>Travelling twice.</strong> The second trip to the wholesaler. On a rural job
            this is not twenty minutes.
          </li>
          <li>
            <strong>Setting up twice.</strong> Every additional visit carries its own setting out,
            unloading and packing away.
          </li>
          <li>
            <strong>Working around something.</strong> Doing a job the awkward way because the
            straightforward way was not available when you were there.
          </li>
        </ul>
        <p>
          All four are planning outcomes rather than effort outcomes, which is why this criterion
          sits in a planning unit rather than a commercial one.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Keeping a record you can actually use">
        <p>
          Criterion 2.2 will ask you to evaluate resource selection and usage. That is answerable
          only if somebody wrote things down while they were happening — and the record needed is
          smaller than people assume.
        </p>
        <p>
          Three columns cover most of it: what was ordered against what was installed; what was
          allowed against what it took; and any half-day that went on something other than the work.
          Kept as you go it takes moments; reconstructed at the end it is guesswork that flatters
          whoever is doing the reconstructing.
        </p>
        <p>
          The compounding benefit is that your own history becomes the basis for the next job&rsquo;s
          allowance — which is the difference between an allowance you can justify and a number you
          always use.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Time you cannot recover</ContentEyebrow>

      <ConceptBlock title="Time is the cost you cannot recover">
        <p>
          Material that is over-ordered can be returned or used elsewhere. Plant booked for too long
          can sometimes be given back. An hour of labour that went on waiting is gone, and no amount
          of good work afterwards buys it back.
        </p>
        <p>
          That asymmetry is worth carrying into every planning decision. When you are weighing a
          small certain cost against a possible delay — a second delivery charge, an extra pair of
          hands for a day, a night shutdown instead of a daytime one — the delay is usually the
          more expensive side of the trade, and it is the side that does not show up on any invoice.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'I am employed, not self-employed. Why does cost concern me?',
            answer:
              'Because almost every planning decision you make is also a spending decision, and at Level 3 you are starting to make them. You are not being asked to price work or see the accounts — you are being asked to notice that a sequence, a method or an order pattern moves money, and to be able to say which way. That is what the criterion means by "recognise".',
          },
          {
            question: 'What allowance should I add for waste?',
            answer:
              'There is no universal figure, and this unit is careful not to invent one. What it asks is that the allowance is reasoned rather than habitual: based on the job in front of you, how firm the design is, and what your own records say you actually used last time. An allowance you can explain is the point; a number you always use is what the criterion is pushing against.',
          },
          {
            question: 'The client is refusing a variation they verbally agreed to. What now?',
            answer:
              'Practically you are negotiating, because a verbal agreement is only as good as two matching memories. The lesson is in the timing rather than the outcome: a one-line message confirming "that extra spur is £X, confirm and I will fit it" takes moments and removes this situation entirely. Do that and the question stops arising.',
          },
          {
            question: 'Is copper really worth separating?',
            answer:
              'On a rewire, yes — stripped copper has a scrap value that is not trivial, and cable offcuts accumulate faster than people expect. Whether it is yours to take depends on the contract and on who bought the material, which is worth establishing before you start filling a drum rather than after.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Four costs: labour, materials, plant, site overheads. The overheads are the forgotten bucket.',
          'Moving cost between buckets is not saving it — weigh labour saved against plant added.',
          'Rework costs labour twice, material again, and programme. Treat it as a planning finding.',
          'Over-ordering is insurance with a premium paid on every job.',
          'Double handling and searching are invisible losses on a badly organised job.',
          'A variation is a change to what was asked for; your own error is not one.',
          'Raise variations before the work, never on the invoice.',
          'Segregate waste and keep the transfer paperwork — the mixed skip is rarely the cheap option.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Recognise cost and waste implications of the work" />
    </div>
  );
}
