/**
 * Unit 314 · Learning outcome 2 · Criterion 2.1 — The methods that will verify
 * that the equipment, accessories and components are compatible to the working
 * environment, in accordance with the specification, of the required and
 * correct type, and delivered on time and undamaged
 *
 * Four tests in one criterion. Grounded on BS 7671 512.2.1/512.2.2 (design
 * appropriate to the situation, external influences), 134.1.1 (insulation and
 * enclosures not damaged during erection), 134.1.4 (joints and connections of
 * proper construction) and 522.8.12 (cable not damaged by means of fixing).
 *
 * ⚠️ The good-workmanship rows in the RAG are stored under a collapsed number
 * ("Reg 134.11"). That number is NOT cited anywhere on this page — only
 * 134.1.1 and 134.1.4, which the source numbers correctly.
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
    question: 'This criterion sets four tests for incoming equipment. Which is NOT one of them?',
    options: [
      'That it was bought at the best available price',
      'That it suits the working environment',
      'That it matches the specification',
      'That it arrived on time and undamaged',
    ],
    correctAnswer: 0,
    explanation:
      'Price is settled before anything is ordered. The four verification tests are environment, specification, correct type, and condition on arrival.',
  },
  {
    id: 2,
    question: 'What does BS 7671 require of equipment in relation to where it is installed?',
    options: [
      'It shall be of a design appropriate to the situation, taking account of external influences',
      'It shall carry a UKCA mark and nothing further',
      'It shall be the type named in the specification',
      'It shall be new',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 512.2.1 — design appropriate to the situation, and selection and erection taking account of the conditions likely to be encountered.',
  },
  {
    id: 3,
    question: 'Equipment does not by its construction suit the external influences where it is going. What does BS 7671 permit?',
    options: [
      'Using it if appropriate additional protection is provided during erection, without impairing its operation',
      'Nothing — it cannot be used',
      'Using it if the client accepts the risk in writing',
      'Using it if it is inspected more often',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 512.2.2 is a conditional permission. The protection must not adversely affect the operation of the equipment it protects.',
  },
  {
    id: 4,
    question: 'A supplier sends an alternative to the specified item. What is the right response?',
    options: [
      'Treat it as a proposed substitution to be approved before it is installed',
      'Install it if it looks equivalent',
      'Reject it automatically',
      'Install it and note the change on the certificate',
    ],
    correctAnswer: 0,
    explanation:
      'A substitution is a change to the design. Approving it is somebody’s decision to make, and it is usually not yours alone.',
  },
  {
    id: 5,
    question: 'What does "of the required and correct type" catch that "matches the specification" does not?',
    options: [
      'The right family of item with the wrong rating, curve or variant',
      'Items that arrive late',
      'Items with damaged packaging',
      'Items from the wrong supplier',
    ],
    correctAnswer: 0,
    explanation:
      'A breaker of the right make and the wrong curve, or the right rating and the wrong breaking capacity, passes a casual look and fails the job.',
  },
  {
    id: 6,
    question: 'When should a delivery be checked?',
    options: [
      'On arrival, before it is signed for and put away',
      'When it is opened for installation',
      'At the end of the week',
      'Only if the packaging is visibly damaged',
    ],
    correctAnswer: 0,
    explanation:
      'Damage found after a delivery note is signed is your damage as far as most suppliers are concerned. Damage found at second fix is also your programme.',
  },
  {
    id: 7,
    question: 'Which BS 7671 requirement covers damage caused by how a cable is fixed?',
    options: [
      'Regulation 522.8.12 — a cable or conductors shall not be damaged by the means of fixing',
      'Regulation 512.2.1',
      'Regulation 134.1.4',
      'Regulation 644.4',
    ],
    correctAnswer: 0,
    explanation:
      'Clips, ties and saddles chosen or fitted badly can compress, cut or abrade a sheath. Verification does not stop when the material is accepted.',
  },
  {
    id: 8,
    question: 'An item fails one of the four checks. What does the procedure need?',
    options: [
      'Somewhere to put it so it cannot be fitted by mistake, and a record of why',
      'Returning it immediately',
      'Telling the supplier verbally',
      'Marking it with tape',
    ],
    correctAnswer: 0,
    explanation:
      'Rejected material left among good material gets installed. Separation plus a written reason is what makes the rejection stick.',
  },
];

export default function Lesson314_2_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Four tests: does it suit the environment, does it match the specification, is it the right type, did it arrive undamaged.',
          'BS 7671 512.2.1 — equipment shall be of a design appropriate to the situation and to the external influences.',
          '512.2.2 permits unsuitable equipment only with appropriate additional protection that does not impair its operation.',
          'A substitution is a design change. Approving it is rarely yours alone.',
          'Check on arrival, before signing. Damage found at second fix is your damage and your programme.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Apply the four verification tests — environment, specification, correct type, condition.',
          'State what BS 7671 requires of equipment in relation to external influences, and what it permits where equipment does not suit.',
          'Handle a proposed substitution as a design change rather than a site decision.',
          'Check a delivery at the right moment and record what was found.',
          'Recognise that verification continues after acceptance — damage during erection is your damage.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Four checks on a delivery</ContentEyebrow>

      <ConceptBlock
        title="Four tests, and they catch different things"
        plainEnglish="Right for here, right per the spec, right item, right condition."
      >
        <p>
          The criterion sets out four checks and it is worth treating them as four, because each
          catches a failure the others let through:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Compatible to the working environment.</strong> Will it survive where it is
            going — the damp, the dust, the heat, the vibration, the chemicals?
          </li>
          <li>
            <strong>In accordance with the specification.</strong> Is it what was actually
            specified, or something the supplier decided was equivalent?
          </li>
          <li>
            <strong>Of the required and correct type.</strong> Right family, right variant, right
            rating, right curve, right breaking capacity.
          </li>
          <li>
            <strong>Delivered on time and undamaged.</strong> Is it here when the programme needs
            it, and is it in a condition to install?
          </li>
        </ul>
        <p>
          An item can pass three and fail the fourth without anybody noticing until it is on the
          wall. The commonest survivor is the third: the right make, the right size, the wrong
          variant.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="314-2-1-check-1"
        question="A consumer unit arrives, correct make and way count, from the specified range — but it is the metal-clad variant where the specification called for a different enclosure. Which test caught it?"
        options={[
          'Of the required and correct type',
          'Compatible to the working environment',
          'In accordance with the specification',
          'Delivered undamaged',
        ]}
        correctIndex={0}
        explanation="It is the right item from the right range, which is why a casual look passes it. Variant is where this check earns its place."
      />

      <SectionRule />

      <ContentEyebrow>Suitability for the environment</ContentEyebrow>

      <ConceptBlock
        title="Will it survive where it is going"
        onSite="Look at the location before you look at the box."
      >
        <p>
          The environment test is the one with a regulation behind it. BS 7671 requires equipment to
          be of a design appropriate to the situation in which it is used, and requires selection
          and erection to take account of the conditions likely to be encountered — temperature,
          humidity, mechanical stress, corrosive atmosphere, ingress of solids and liquids,
          vibration.
        </p>
        <p>
          On a coordinated job this is a verification step rather than a design one: the design has
          chosen something, and your job is to confirm that what has turned up is that thing, and
          that the location it is going into is what the designer assumed. Those two diverge more
          often than people expect — a plant room that turns out to be wetter than the drawing
          suggested, an external position that was internal when the specification was written.
        </p>
        <p>
          There is a second half worth knowing. Where equipment does not by its construction have
          the characteristics for the external influences of its location, it may still be used if
          appropriate additional protection is provided during erection — and that protection must
          not adversely affect how the equipment works. That is a real option, not a loophole, and
          it is a decision to record rather than to make quietly.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulations 512.2.1 and 512.2.2"
        meaning="Equipment shall be of a design appropriate to the situation in which it is to be used, and its installation shall take account of the conditions likely to be encountered — temperature, humidity, mechanical stresses, corrosive atmosphere and other external influences. Where equipment does not, by its construction, have the characteristics relevant to the external influences of its location, it may nevertheless be used on condition that appropriate additional protection is provided in the erection of the installation, and that protection shall not adversely affect the operation of the equipment thus protected."
        cite="BS 7671 Part 5 — Selection and Erection of Equipment"
      />

      <SectionRule />

      <ContentEyebrow>Substitutions and variants</ContentEyebrow>

      <ConceptBlock title="Substitutions are design changes">
        <p>
          Suppliers substitute. Sometimes it is helpful — the specified item is discontinued and the
          replacement is the same thing under a new code. Sometimes it is a stock decision dressed
          up as an equivalence.
        </p>
        <p>
          Either way, the item that arrives is not the item that was specified, and that makes it a
          proposed change to the design rather than a delivery question. The test is not
          &ldquo;does this look equivalent to me?&rdquo; but &ldquo;who is entitled to decide it is
          equivalent, and have they?&rdquo;
        </p>
        <p>
          On a specified job that is usually the designer or the contract administrator. On a job
          you designed, it is you — and it is still worth recording the reasoning, because a
          substitution is exactly the sort of decision somebody asks about two years later.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Right family, wrong variant"
        onSite="Read the full part number, not the first half of it."
      >
        <p>
          The &ldquo;required and correct type&rdquo; test exists because most wrong items are
          nearly right. The failures that recur:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Rating.</strong> The right device at the wrong current rating — easy to spot and
            still frequently installed.
          </li>
          <li>
            <strong>Curve.</strong> A type B where a type C was specified, or the reverse. Identical
            at a glance, entirely different in behaviour.
          </li>
          <li>
            <strong>Breaking capacity.</strong> A figure nobody reads on the shop floor and one that
            matters where the prospective fault current demands it.
          </li>
          <li>
            <strong>RCD type.</strong> AC, A, F or B — the distinction that has caught out a great
            many installations serving electronic loads.
          </li>
          <li>
            <strong>Variant.</strong> Enclosure material, IP rating, terminal arrangement, mounting
            — the part of the code after the bit everyone reads.
          </li>
        </ul>
        <p>
          The practical method is dull and works: check the full part number against the
          specification, item by item, before anything is fitted. Ten minutes at delivery against
          half a day of changing things on the wall.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Signing for a delivery you have not looked at"
        whatHappens={
          <>
            The van arrives, it is raining, somebody signs so the driver can go, and the pallet goes
            in the container. Three weeks later a board is opened and one side is dented, or two
            boxes are the wrong variant, or a drum has been dropped. As far as the supplier is
            concerned the goods were accepted in good condition, and as far as your programme is
            concerned you now need something that is not on site.
          </>
        }
        doInstead={
          <>
            Check before signing: quantities against the order, part numbers against the
            specification on anything critical, and visible condition. Where a proper check is not
            possible at the kerbside, sign as unexamined and say so on the note — then check
            properly the same day.
          </>
        }
      />

      <CommonMistake
        title="Accepting the supplier&rsquo;s word that the substitute is equivalent"
        whatHappens={
          <>
            <p>
              The specified item is not available and what turns up is marked as an approved
              equal. It is from a reputable maker, it looks like the same thing, and the job needs
              it this week &mdash; so it goes on the wall and nobody outside the site ever hears
              about it.
            </p>
            <p>
              What has actually happened is that a design decision was made by a supplier and
              confirmed by whoever was on site. If the equivalence turns out to be approximate, or
              somebody asks in two years why the installation does not match the specification,
              there is nothing to point at except a delivery note.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Treat a substitution as a proposed change to the design rather than a delivery
              question. The test is not whether it looks equivalent to you but who is entitled to
              decide that it is, and whether they have &mdash; on a specified job that is normally
              the designer or the contract administrator.
            </p>
            <p>
              Where the design is yours, you can approve it, and it is still worth writing down
              what was substituted and why. A substitution is exactly the sort of decision
              somebody comes back to long after everybody has forgotten the week it was made in.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Checking after acceptance</ContentEyebrow>

      <ConceptBlock title="Verification does not stop at acceptance">
        <p>
          Material arrives in good condition and then spends three weeks on your site. BS 7671 is
          clear that condition at installation matters: insulation of live parts shall not be
          damaged during erection, and enclosures shall not be damaged or deteriorated in any way
          that impairs safety.
        </p>
        <p>
          There is a specific one worth knowing because it is caused by the installer rather than
          by an accident: a cable or conductors shall not be damaged by the means of fixing. Clips,
          ties and saddles selected or overtightened badly can compress, cut or abrade a sheath, and
          the damage is inside the thing you have just installed.
        </p>
        <p>
          And the one people forget at the end of the run: every electrical joint and connection
          shall be of proper construction. A perfect component badly terminated is a defect you
          created after every one of the four checks passed.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulations 134.1.1, 134.1.4 and 522.8.12"
        meaning="Insulation of live parts shall not be damaged during erection, and enclosures shall not be damaged or deteriorated during installation in any way that impairs safety. Every electrical joint and connection shall be of proper construction as regards conductance, insulation, mechanical strength and protection. A cable or conductors shall not be damaged by the means of fixing — fixings shall be selected and installed so as not to compress, cut or abrade the sheath or insulation."
        cite="BS 7671 Part 1 Chapter 13 and Part 5 Chapter 52"
      />

      <InlineCheck
        id="314-2-1-check-2"
        question="A cable passes every incoming check, then is over-tightened under a saddle during first fix. What kind of failure is that?"
        options={[
          'A supplier failure',
          'A specification failure',
          'Damage during erection — verification continues after the material is accepted',
          'Not a failure, as the damage is not visible',
        ]}
        correctIndex={2}
        explanation="BS 7671 addresses it directly: a cable shall not be damaged by the means of fixing. The four incoming tests do not protect against what happens next."
      />

      <SectionRule />

      <ConceptBlock
        title="Who checks, and when"
        plainEnglish="Not whoever is nearest to the van in the rain."
      >
        <p>
          Verification only happens if somebody owns it. On a coordinated job that means naming who
          receives deliveries and who checks critical items — and those need not be the same person.
        </p>
        <p>
          A practical split: whoever is on site takes the delivery and checks quantities and visible
          condition against the note. Anything critical — switchgear, boards, protective devices,
          specified luminaires — gets a second check against the specification by somebody who can
          read a part number and knows what was ordered.
        </p>
        <p>
          The timing matters as much as the person. A check at delivery is cheap and gives you
          options. The same check at the point of installation finds the same fault when the
          programme has no room left.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Rejecting and reordering</ContentEyebrow>

      <ConceptBlock title="What happens to something that fails">
        <p>
          A rejection that stays on the same pallet gets installed. The procedure needs three
          things, and none of them is complicated:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Separate it.</strong> Physically, somewhere it cannot be picked up by somebody
            who was not part of the conversation.
          </li>
          <li>
            <strong>Mark it.</strong> Clearly enough that it is obvious without asking anyone.
          </li>
          <li>
            <strong>Record why.</strong> One line — what was wrong, when, what was asked for
            instead. That line is what makes a supplier conversation factual and what evidences the
            delay if the replacement is late.
          </li>
        </ul>
        <p>
          The same applies to something damaged on site. An item you have damaged is not a cheaper
          problem than one that arrived damaged, and quietly installing it is how a defect becomes
          invisible.
        </p>
      </ConceptBlock>

      <Scenario
        title="The right board, the wrong environment"
        situation={
          <>
            A workshop extension near Bridgend. The distribution board arrives exactly as specified
            — correct range, correct way count, correct devices — and passes every incoming check.
            It is installed on the wall the drawing shows. That wall is an external-facing blockwork
            wall in an unheated workshop with a wood dust extraction system three metres away.
            Within a year the enclosure is showing corrosion and dust ingress around the door seal.
          </>
        }
        whatToDo={
          <>
            Nothing on the delivery was wrong, and the four checks as usually applied would all pass.
            The one that should have caught it is the first — compatible to the working environment —
            applied to the <em>location</em> rather than to the paperwork. The moment to raise it was
            at first fix: the position is dustier and colder than the specification assumed, is this
            still the right enclosure, or does it need additional protection or a different position?
          </>
        }
        whyItMatters={
          <>
            Verification against a specification is the easy half. Verification against the actual
            conditions on the day is what BS 7671 asks for, and it is the half that needs somebody
            standing in the room rather than reading a delivery note.
          </>
        }
      />

      <InlineCheck
        id="314-2-1-check-3"
        question="The specification assumed an internal position; on site it is going outside. What is the correct response?"
        options={[
          'Install as specified; the designer chose it',
          'Install it and add a canopy',
          'Raise it before installing — the external influences have changed, so the selection may no longer suit',
          'Substitute something with a higher IP rating',
        ]}
        correctIndex={2}
        explanation="Both installing regardless and quietly substituting are site decisions on a design matter. Additional protection is a legitimate option under 512.2.2 — but it is an option somebody records, not one you take silently."
      />

      <SectionRule />

      <ConceptBlock title="Check against the order as well as the specification">
        <p>
          Two documents govern an incoming delivery and they can disagree. The specification says
          what the job needs; the order says what your firm actually asked for. A mistake made at
          ordering produces material that matches the order perfectly and fails the job.
        </p>
        <p>
          It is worth checking both on anything critical, because the two failures need different
          responses. Wrong against the order is a supplier conversation. Right against the order and
          wrong against the specification is your own error, and finding it at delivery rather than
          at installation is the difference between a phone call and a fortnight.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'How much of a delivery should I actually check?',
            answer:
              'Quantities and visible condition on everything, and part numbers against the specification on anything critical — switchgear, boards, protective devices, specified luminaires, anything with a long lead time. Checking every box of accessories to the same depth is not proportionate; checking none of the critical items is where jobs lose days.',
          },
          {
            question: 'The supplier says the substitute is "equal approved". Is that enough?',
            answer:
              'It tells you what the supplier thinks. Whether it is approved depends on who holds the design, and on most specified jobs a proposed equivalent goes to them before it goes on the wall. If you are the designer, you can approve it — and record the reasoning, because a substitution is a decision somebody queries later.',
          },
          {
            question: 'What if the delivery is right but early, and there is nowhere to put it?',
            answer:
              'Then it has failed the "delivered on time" half of the test, and accepting it moves the risk onto your site — storage, damage, security and cash. It is usually better to hold a delivery than to take one you cannot protect. That is criterion 2.2, and the two criteria are deliberately next to each other.',
          },
          {
            question: 'Do I have to record checks that passed?',
            answer:
              'A light record is worth it on critical items — a dated note that the board and devices were checked against the specification takes seconds. It is what lets you say, if something is queried later, that verification happened rather than that you are sure it did. For routine consumables, checking without recording is proportionate.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Four tests: environment, specification, correct type, condition on arrival.',
          'BS 7671 512.2.1 — design appropriate to the situation, taking account of external influences.',
          '512.2.2 — unsuitable equipment may be used only with additional protection that does not impair its operation.',
          'A substitution is a design change; the question is who is entitled to approve it.',
          '"Correct type" catches right-family-wrong-variant — rating, curve, breaking capacity, RCD type.',
          'Check before signing; sign as unexamined if you genuinely cannot check at the kerbside.',
          'Verification continues after acceptance — 134.1.1, 134.1.4 and 522.8.12 all bite during erection.',
          'A rejected item needs separating, marking and a written reason, or it gets installed anyway.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Verifying equipment, accessories and components" />
    </div>
  );
}
