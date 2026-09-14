/**
 * Functional Skills · Module 2 · Section 1 — Reading technical documents
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 * DENSITY PASS (13 Sep): the converted page explained more than it taught.
 * Thirteen ConceptBlocks told the learner about documents; three worked
 * examples and two try-its let them actually do anything. This pass:
 *
 *  - Merged the 13 ConceptBlocks down to 8 (one per section) and made each
 *    one denser rather than thinner — the subject explanation is longer in
 *    several places than it was before, not shorter.
 *  - Added eight new WorkedExample blocks and five new TryIt blocks so every
 *    section runs explain → show → do, not explain alone.
 *  - Cut the passages that were about professionalism and habit rather than
 *    the subject itself (a paragraph on "nobody thinks less of you for
 *    asking", a stray paragraph on what a risk assessment "asks of you
 *    personally") — that room went into practice, not padding.
 *  - Two new regulation numbers were checked against bs7671_regulations
 *    before use: 701 (locations containing a bath or shower) and 722
 *    (electric vehicle charging installations) — both confirmed live in the
 *    RAG table, used only to teach how Part 7's numbering differs from
 *    Parts 1–6, never quoted as clause text. No other regulation numbers
 *    were added; 411.3.2 and 522.8.1 are unchanged from the prior pass.
 *  - Quiz bank, all three InlineChecks (ids unchanged), the Part P
 *    England/Wales divergence, the "no RegsCallout" rule and the absence of
 *    any BS 7671 edition date are all untouched.
 *
 * Accuracy corrections carried in from the original audit (13 Sep):
 *  - Part P was stated as applying to "England and Wales" with a single
 *    notifiable list. Part P does apply in both, but building regulations were
 *    devolved to Wales on 31 December 2011 and the two have since diverged:
 *    England's list was cut in 2013 (outdoors and kitchens came off it), Wales
 *    still works the wider 2006 scope. That divergence is taught rather than
 *    flattened, because an electrician near the border needs it.
 *  - "PVC (70 °C) or thermoplastic (90 °C)" contrasted a material with itself.
 *    PVC *is* thermoplastic; the 90 °C material is thermosetting (XLPE).
 *  - The competent person schemes were named (and one of them, ELECSA, no
 *    longer exists as a brand). Named schemes are out — see the standing rule
 *    on competitor claims. "A government-authorised competent person scheme"
 *    says the same thing and stays true as the market changes.
 *
 * Deliberately NOT using <RegsCallout> anywhere on this page. That component
 * renders its `clause` as quoted regulation text, and this page paraphrases
 * throughout — promoting a paraphrase into a clause field is exactly how a
 * fabricated BS 7671 quote got shipped once before.
 *
 * No awarding body is named. None has been confirmed for this cohort, and the
 * subject content below is the Ofqual Functional Skills English content, which
 * is common to all of them.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  Scenario,
  ContentEyebrow,
  SectionRule,
  WorkedExample,
  TryIt,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Reading Technical Documents - Functional Skills Module 2.1';
const DESCRIPTION =
  'Functional Skills English for electricians: decoding BS 7671 regulation numbers, reading datasheets and IP ratings, telling law from guidance, and working through method statements, O&M manuals and RAMS.';

const quizQuestions = [
  {
    id: 1,
    question: 'Which part of BS 7671 covers inspection and testing requirements?',
    options: ['Part 4', 'Part 5', 'Part 6', 'Part 7'],
    correctAnswer: 2,
    explanation:
      'Part 6 is Inspection and Testing. The parts run in the order you would actually meet them on a job: Part 3 sizes up the installation, Part 4 protects it, Part 5 selects and erects the equipment, Part 6 proves it works, Part 7 adds the extra rules for special locations.',
  },
  {
    id: 2,
    question: 'On a product datasheet, what does the rated voltage (Ue) indicate?',
    options: [
      'The maximum voltage the device can survive without being damaged',
      'The voltage the device is designed to operate at in normal service',
      'The voltage at which the device will disconnect',
      'The test voltage used during manufacture',
    ],
    correctAnswer: 1,
    explanation:
      'Ue is the rated operational voltage — the voltage the device is built to work at day in, day out. It is not a survival limit and it is not a trip threshold. Datasheets carry several voltage figures and they mean different things, so read the subscript rather than the number.',
  },
  {
    id: 3,
    question: "What does 'Part P' of the Building Regulations specifically cover?",
    options: [
      'Electrical safety in dwellings',
      'Fire safety in commercial buildings',
      'Ventilation requirements',
      'Structural steelwork',
    ],
    correctAnswer: 0,
    explanation:
      'Part P covers electrical safety in dwellings. Note that building regulations are devolved: Part P exists in both England and Wales, but the list of notifiable work is not the same in each any more.',
  },
  {
    id: 4,
    question: 'What does an IP rating of IP65 tell you about a product?',
    options: [
      'It is splash-proof but not protected against fine dust',
      'It is dust-tight and protected against water jets from any direction',
      'It can be submerged to 6 metres for 5 minutes',
      'It has a 6-year warranty and a 5-year service interval',
    ],
    correctAnswer: 1,
    explanation:
      'The first digit is solids, the second is water. 6 for solids is dust-tight; 5 for water is protection against jets from any direction. The two digits are independent, so a high first digit tells you nothing about the second.',
  },
  {
    id: 5,
    question: "In a method statement, what does the 'sequence of operations' section describe?",
    options: [
      'The order in which the work will be carried out, step by step',
      'The order in which invoices will be raised',
      'A list of everyone on site that day',
      'The manufacturer’s recommended maintenance schedule',
    ],
    correctAnswer: 0,
    explanation:
      'The sequence of operations is the step-by-step order of the work. It matters because the order is often the control measure — isolating before removing a cover is not the same job as removing a cover before isolating.',
  },
  {
    id: 6,
    question: 'Where would you typically find recommended maintenance intervals for an RCD?',
    options: [
      'In the O&M manual and the manufacturer’s literature',
      'On the certificate of conformity',
      'In Part 2 of BS 7671',
      'On the consumer unit’s rating label',
    ],
    correctAnswer: 0,
    explanation:
      'Maintenance intervals come from the O&M manual and the manufacturer. Part 2 of BS 7671 is definitions, and a rating label carries ratings, not a service schedule.',
  },
  {
    id: 7,
    question: 'What does the breaking capacity (Icn) of an MCB tell you?',
    options: [
      'The current at which it will trip',
      'The largest fault current it can interrupt safely',
      'The current it can carry continuously',
      'The current it draws when closed',
    ],
    correctAnswer: 1,
    explanation:
      'Icn is the largest prospective fault current the device can interrupt without destroying itself. It is a different question from "what makes it trip" (that is the rating and the curve) and from "what can it carry" (that is In). Compare Icn against the prospective fault current you measured at the origin.',
  },
  {
    id: 8,
    question:
      'When reading a cable schedule on a commercial project, which information would you NOT typically find?',
    options: [
      'Circuit reference and description',
      'Cable size and type',
      'The installing electrician’s hourly rate',
      'Protective device rating',
    ],
    correctAnswer: 2,
    explanation:
      'A cable schedule is a technical document: circuit references, cable sizes and types, device ratings, lengths. Commercial terms live in a different document entirely, and knowing which document holds which kind of information is most of the skill on this page.',
  },
];

const FunctionalSkillsModule2Section1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 1"
        title="Reading technical documents"
        backTo="/study-centre/apprentice/functional-skills/module2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default, to match the rest of the course — these
            pages carry regulation numbers and datasheet extracts that read badly
            when they wrap. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Nobody hands you a job and reads it to you. You get a drawing, a datasheet, a method
            statement and a set of regulations, and you are expected to find the one line in them
            that applies to what you are about to do. That is what this section trains — not reading
            for pleasure, but reading to find, check and act.
          </p>

          <LearningOutcomes
            outcomes={[
              'Navigate BS 7671 by its structure, and decode a regulation number to find the right page — including the one part of the book where the usual rule changes.',
              'Tell the difference between what the law requires, what the standard specifies and what guidance recommends — and sort a mixed set of statements into the right tier.',
              'Read a product datasheet and pull the correct figure from several that look similar, and choose between two products on more than one datasheet figure at once.',
              'Read an IP rating as two independent tests, and explain why the "higher" number is sometimes the wrong choice.',
              'Follow a method statement, spot a sequence that has been written in the wrong order, and say why the order matters.',
              'Find a specific figure in a large O&M manual without reading the whole thing.',
              'Place a control measure in the hierarchy of controls, and recognise a risk assessment that never rose above PPE.',
              'Turn a disagreement between two documents into a precise written question, rather than a guess.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'You have seen a consumer unit',
                gist: 'Nothing here needs deep technical knowledge, but the examples assume you know roughly what an MCB, an RCD and a circuit are.',
              },
              {
                term: 'Module 1',
                gist: 'Percentages and ratios turn up in datasheets and schedules. You do not need them to be fluent, but they should not be a surprise.',
              },
            ]}
          />

          <TLDR
            points={[
              'BS 7671 is organised so you can find things: Part, Chapter, Section, Regulation. Once you can read 411.3.2 as an address rather than a code, the book stops being intimidating — and Part 7 breaks that pattern on purpose, once you know to look for it.',
              'BS 7671 is a British Standard, not an Act of Parliament. It is not law in itself — but complying with it is how you demonstrate you have met duties that ARE law.',
              'A guidance note, an On-Site Guide and a regulation are three different weights of document. Sorting a statement into the right one is a skill you can practise, not a feeling.',
              'Datasheets label their figures: Ue, Ui, In, Icn, IΔn. The subscript is the meaning, and two devices sharing one figure are not automatically interchangeable.',
              'IP has two digits and they are independent — the first is solids, the second is water. A "higher" second digit for the wrong hazard is worse than a correctly matched lower one.',
              'In a method statement the ORDER is often the control. Swap two steps and you have a different job with different risks, not a shortcut.',
              'You are not expected to read an O&M manual cover to cover. You are expected to find the page you need — start with the schedule and the index, not page one.',
              'Every control measure sits somewhere in a five-level hierarchy. An assessment that never leaves the bottom level has not tried very hard.',
              'If a document is ambiguous, the professional move is a specific written question naming both documents — not a confident guess.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Why this is a real skill</ContentEyebrow>

          <ConceptBlock
            title="The documents are not optional extras"
            onSite="The first time a job goes wrong and someone asks to see the paperwork, you find out very quickly whether you read it or skimmed it."
          >
            <p>
              There is a habit in the trade of treating documents as the part of the job that
              happens after the real work. It is a comfortable way to think and it is wrong. The
              drawing decides where the cable goes. The datasheet decides whether the device you
              have in the van is the right one. The method statement decides the order you work in,
              and quite often the order <em>is</em> the thing keeping you alive. None of that is
              administration.
            </p>
            <p>
              What makes this a skill rather than just a chore is that technical documents are not
              written to be read straight through. They are written to be searched. A regulation
              book, a datasheet and an O&amp;M manual are all reference documents — they assume you
              arrive with a question and leave as soon as you have the answer. You open BS 7671
              wanting one number. You open a datasheet wanting one figure. You open a method
              statement or a RAMS wanting to know whether today's job actually matches the one that
              was assessed. None of that needs page one, and reading them like a novel is why people
              find them exhausting and give up.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You are about to bury a cable in a wall in a domestic property and you want to know whether it needs additional protection. Turn that into a search you can actually run, and find the answer rather than reading around it."
            steps={[
              {
                calc: 'State the question as one sentence with the conditions in it',
                note: '"Does a cable buried in a wall at less than 50mm depth, in a domestic property, need additional protection?" Every condition in that sentence narrows where you look.',
              },
              {
                calc: 'Decide which document answers it',
                note: 'This is a requirement about erecting a wiring system, so it is BS 7671, not the On-Site Guide. The guide would tell you what people usually do; the standard tells you what is required.',
              },
              {
                calc: 'Use the structure to get to the right part',
                note: 'Selection and erection of wiring systems is Part 5, Chapter 52. That is two decisions and you are already in the right chapter rather than paging through the book.',
              },
              {
                calc: 'Read until the document answers YOUR sentence',
                note: 'Not until you find something on the topic. A general principle about avoiding damage is on the topic and does not answer the question you asked.',
              },
              {
                calc: 'Check for the qualifying clause',
                note: 'Depth, cable type, the route it runs in, and whether the circuit has RCD protection all change the answer. A rule you stop reading halfway through is a rule you have got wrong.',
              },
            ]}
            answer="A question specific enough to search, aimed at the right document, located by structure in two steps, and read to the end of its conditions."
            watchOut="The step people skip is the first one. 'I should look up buried cables' sends you reading; 'does a cable at less than 50mm in a domestic wall need additional protection' sends you to an answer. The difference is about fifteen seconds of thinking and roughly half an hour of reading."
          />

          <SectionRule />

          <TryIt
            question="A client asks whether the socket you are fitting in their garage needs RCD protection. Write the question you would actually look up, and say which document you would open."
            steps={[
              {
                calc: 'Pin the conditions',
                note: 'A garage is not a special location in itself, but what matters is what the socket is likely to supply and whether equipment could be used outdoors from it.',
              },
              {
                calc: 'Turn it into one sentence',
                note: '"Does a socket outlet in a domestic garage require additional protection by a 30mA RCD?"',
              },
              {
                calc: 'Pick the document',
                note: 'Protection against electric shock is Part 4. BS 7671, not the On-Site Guide.',
              },
            ]}
            answer='Something like: "Does a socket outlet in a domestic garage require additional protection by a 30mA RCD?" — looked up in BS 7671 Part 4. Notice you have not answered it yet, and that is the point: the skill being practised here is turning a vague ask into something findable, which is the step that decides whether the next ten minutes are productive.'
          />

          <CommonMistake
            title="Reading until you find something that sounds right"
            whatHappens="You scan a page, spot a sentence that broadly matches what you were hoping for, and stop. The sentence was a general principle, or it belonged to a different installation type, or there was a qualifying clause two lines further down that changed it entirely."
            doInstead="Decide what question you are asking before you open the document, and keep reading until the document has answered that exact question. If what you find is close but not quite, it is not an answer — it is a lead."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · How BS 7671 is put together</ContentEyebrow>

          <ConceptBlock title="The structure is the search tool — and it changes shape once, in Part 7">
            <p>
              BS 7671 looks forbidding until you notice that its structure follows the shape of a
              real installation. The parts run:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">
                  Part 1 — Scope, object and fundamental principles.
                </strong>{' '}
                What the book covers, and the safety principles everything else serves.
              </li>
              <li>
                <strong className="text-white">Part 2 — Definitions.</strong> Duller than it sounds
                and more important than it looks. Words like &ldquo;accessible&rdquo; and
                &ldquo;readily accessible&rdquo; mean specific things here, and arguments on site
                usually turn out to be about a definition.
              </li>
              <li>
                <strong className="text-white">
                  Part 3 — Assessment of general characteristics.
                </strong>{' '}
                Sizing the job up: what supply, what earthing arrangement, what the installation is
                for.
              </li>
              <li>
                <strong className="text-white">Part 4 — Protection for safety.</strong> Shock,
                thermal effects, overcurrent, fault current, voltage disturbances.
              </li>
              <li>
                <strong className="text-white">
                  Part 5 — Selection and erection of equipment.
                </strong>{' '}
                Choosing the kit and putting it in.
              </li>
              <li>
                <strong className="text-white">Part 6 — Inspection and testing.</strong> Proving it.
              </li>
              <li>
                <strong className="text-white">Part 7 — Special installations or locations.</strong>{' '}
                The places with extra rules — bathrooms, swimming pools, agricultural premises,
                caravan parks, EV charging, solar.
              </li>
            </ul>
            <p className="mt-3">
              Behind those sit the appendices, which is where most of the numbers live — the
              time/current curves for protective devices, and the current-carrying capacity and
              voltage drop tables you will use constantly. Appendices get revised between editions
              and amendments, so check you are looking at the right one for the version you hold
              rather than the one you remember.
            </p>
            <p className="mt-3">
              A regulation number is an address, not a serial number — each digit narrows the
              location, the way a postcode does. In Parts 1–6 the pattern nests three levels deep:
              the first digit is the Part, the first two digits are the Chapter, the first three are
              the Section, and whatever follows identifies the individual regulation within it. Once
              you can see that shape you can jump straight to any regulation instead of hunting for
              it — the number tells you where to look, not what it says, so getting to the right
              page is the skill and the page still has to be read.
            </p>
            <p className="mt-3">
              Part 7 does not follow that pattern. There is effectively one chapter for the whole of
              Part 7, so the second digit stops narrowing anything down. Instead, the full
              three-digit number is assigned as a single code per location — 701 is locations
              containing a bath or shower, 722 is electric vehicle charging installations, and so
              on. You cannot decode which location a Part 7 number belongs to the way you decode a
              Part 4 one; you have to know the code, in the same way you have to know a postcode
              rather than derive it.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Where in BS 7671 would you find Regulation 411.3.2, and roughly what is it about?"
            steps={[
              { calc: '4 — — —', note: 'First digit is the Part. Part 4: Protection for safety.' },
              {
                calc: '41 — —',
                note: 'First two digits are the Chapter. Chapter 41: Protection against electric shock.',
              },
              {
                calc: '411 —',
                note: 'First three are the Section. Section 411: the protective measure "automatic disconnection of supply".',
              },
              {
                calc: '411.3.2',
                note: 'The rest identifies the individual regulation within that section.',
              },
            ]}
            answer="Part 4 → Chapter 41 → Section 411 — so it concerns automatic disconnection of supply as a means of protection against electric shock."
            watchOut="Do not try to guess the content of a regulation from its number alone. The number tells you where to look, not what it says. Getting to the right page is the skill; the page still has to be read."
          />

          <WorkedExample
            question="A colleague mentions Regulation 701.32.1. The digit-by-digit method you just used does not quite work here — why not, and what does the number actually tell you?"
            steps={[
              {
                calc: '7 — — —',
                note: 'First digit is still the Part, same rule as before: Part 7 — Special installations or locations.',
              },
              {
                calc: '70 —',
                note: 'In Parts 1–6 the next digit gives a distinct Chapter. Part 7 does not really have separate chapters in that sense — every special location sits under the one heading, so the second digit alone tells you nothing further.',
              },
              {
                calc: '701 — the whole three digits, together',
                note: 'This is where Part 7 breaks the pattern: the full three-digit number is the Section, and each one names a specific location rather than a general topic. 701 is locations containing a bath or shower; 722 is electric vehicle charging installations. You need to know the code, not decode it.',
              },
              {
                calc: '701.32.1',
                note: 'Within Section 701, the .32 group is the zone-classification part of the section — the numbered zones around a bath or shower — and .1 is the specific regulation within it.',
              },
            ]}
            answer="Part 7, Section 701 — locations containing a bath or shower — specifically the part of the section that sets out how the zones around the bath or shower are applied. The first-digit rule still holds; the nesting inside it does not, because Part 7 assigns a whole three-digit code per location instead of stacking a chapter and section inside it."
            watchOut="Do not assume every regulation number decodes the same way. Parts 1–6 nest three levels deep; Part 7 is a flat list of location codes with zone and sub-regulation numbers hanging off each one. Knowing which pattern you are in is itself part of reading the book."
          />

          <SectionRule />

          <TryIt
            question="A colleague quotes 'Regulation 522.8.1' at you. Without looking it up, what part and chapter is it in, and what broad subject area does that put it in?"
            steps={[
              { calc: '5 → Part 5', note: 'Selection and erection of equipment.' },
              { calc: '52 → Chapter 52', note: 'Selection and erection of wiring systems.' },
              { calc: '522 → Section 522', note: 'External influences on wiring systems.' },
            ]}
            answer="Part 5, Chapter 52, Section 522 — selection and erection of wiring systems, specifically how external influences affect them. (Worth knowing: 522.8.1 is about erecting a wiring system so the cable sheath and insulation are not damaged. It is sometimes wrongly cited as the source of the 45% trunking fill figure — it says nothing about capacity.)"
          />

          <InlineCheck
            id="m2s1-bs7671-parts"
            question="You need to check the maximum Zs for a particular protective device. Which part of BS 7671 sends you in the right direction first?"
            options={[
              'Part 2 — Definitions',
              'Part 4 — Protection for safety',
              'Part 6 — Inspection and testing',
              'Part 7 — Special installations or locations',
            ]}
            correctIndex={1}
            explanation="Maximum earth fault loop impedance is about achieving disconnection in time, which is protection against electric shock — Part 4, Chapter 41. Part 6 is where you would find how to TEST it, which is a different question. Noticing that 'where do I find the requirement' and 'where do I find the test method' have different answers is the point of knowing the structure."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Law, standard, guidance</ContentEyebrow>

          <ConceptBlock
            title="Statute, standard and guidance — three weights, and where Part P sits"
            onSite="The phrase to be wary of, in yourself as much as in others, is 'the regs say'. Quite often the regs do not say it — a guidance note does, or it is simply custom."
          >
            <p>
              This is the distinction that separates someone who can defend their work from someone
              repeating what they were told. Three tiers, and each one carries a different weight:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Statute.</strong> Acts and regulations made under
                them — the Health and Safety at Work etc. Act, the Electricity at Work Regulations,
                the Building Regulations. These state duties in legal language — &ldquo;so far as is
                reasonably practicable&rdquo;, &ldquo;shall&rdquo;, &ldquo;is required to&rdquo; —
                and breaching them is a criminal matter, enforced by the regulator, not a client.
              </li>
              <li>
                <strong className="text-white">The standard.</strong> BS 7671 itself. It is a
                British Standard, not an Act. It is not law in its own right — but it is the
                recognised way of demonstrating that you have met duties that <em>are</em> law, and
                departing from it leaves you having to show you achieved the same safety by another
                route. Its language is technical and specific — currents, distances, voltages — not
                the legal phrasing of a statute.
              </li>
              <li>
                <strong className="text-white">Guidance.</strong> The On-Site Guide and the Guidance
                Notes series sit below the standard. They interpret it, add worked examples and
                supply practical figures the standard itself does not fix — typical cable
                capacities, common test sequences, rules of thumb. They are extremely useful and
                they are not requirements; nothing in them can be enforced the way a statute can.
              </li>
            </ul>
            <p className="mt-3">
              Part P of the Building Regulations is a good test of all three at once. It is statute
              — a legal requirement that electrical work in a dwelling is designed and installed to
              protect people from fire and shock, and that it complies with BS 7671 (the standard,
              referenced by the statute rather than replacing it). Where people go wrong is the
              scope of <strong className="text-white">notifiable</strong> work, because building
              regulations are devolved and England and Wales have drifted apart. In{' '}
              <strong className="text-white">England</strong>, since 2013, you must notify Building
              Control for a new circuit, a consumer unit replacement, or any addition or alteration
              to an existing circuit in a special location (a room containing a bath or shower, or a
              swimming pool or sauna) — outdoor work and kitchens came <em>off</em> that list that
              year. In <strong className="text-white">Wales</strong>, the wider 2006 scope still
              applies, and it does include kitchens and outdoors. An electrician registered with a
              government-authorised competent person scheme can self-certify notifiable work rather
              than submitting a building notice — but work that is not notifiable still has to
              comply with BS 7671. &ldquo;Not notifiable&rdquo; means nobody needs telling, not that
              the rules stop applying.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Sort these four statements into statute, standard, or guidance: (1) 'A consumer unit in a domestic property must have a non-combustible enclosure, or be enclosed in non-combustible material.' (2) 'It is your duty to ensure, so far as is reasonably practicable, that electrical systems are maintained to prevent danger.' (3) 'A socket outlet in a dwelling is commonly installed around 450 mm above finished floor level.' (4) 'A new circuit in a room containing a bath or shower is notifiable to Building Control in England.'"
            steps={[
              {
                calc: 'Statement 1',
                note: 'Standard. A specific technical requirement about the equipment itself — the kind of figure BS 7671 deals in, not a legal duty and not a rule of thumb.',
              },
              {
                calc: 'Statement 2',
                note: '"So far as is reasonably practicable" is the language of statute — here, the Electricity at Work Regulations. No standard or guidance note is phrased that way.',
              },
              {
                calc: 'Statement 3',
                note: 'Guidance. BS 7671 does not fix a mounting height for a general socket outlet; a typical height is an accessibility-driven convention found in guidance material, not an enforceable requirement.',
              },
              {
                calc: 'Statement 4',
                note: 'Statute. Notifiability is set by the Building Regulations for the relevant nation — a legal notification duty, not a technical spec.',
              },
            ]}
            answer="Statement 1 — standard. Statement 2 — statute. Statement 3 — guidance. Statement 4 — statute. Two statutes, one standard, one guidance, and none of them announce which tier they belong to; you have to read the kind of claim being made."
            watchOut="A precise-sounding number (450 mm, a specific enclosure spec) is not proof something is law. Guidance can be very specific and statute can be very general — sort by the kind of statement, not by how confident it sounds."
          />

          <SectionRule />

          <TryIt
            question="Sort these into statute, standard, or guidance: (1) 'An RCD protecting a circuit must disconnect within the time set out in BS 7671.' (2) 'Every employer must make a suitable and sufficient assessment of risks to employees.' (3) 'A guidance note recommends a particular sequence and typical instrument settings for inspection and testing.' (4) 'Notifiable electrical work in a dwelling in Wales still includes kitchens and outdoor circuits.'"
            steps={[
              {
                calc: 'Statement 1',
                note: 'Names BS 7671 directly and states a technical time requirement — standard.',
              },
              {
                calc: 'Statement 2',
                note: '"Every employer must" is a statutory duty on a person, not a technical figure — statute.',
              },
              {
                calc: 'Statement 3',
                note: 'Names a guidance note and describes a recommendation, not a requirement — guidance.',
              },
              {
                calc: 'Statement 4',
                note: 'Devolved Building Regulations scope — the same Part P divergence covered above — statute.',
              },
            ]}
            answer="Statement 1 — standard. Statement 2 — statute. Statement 3 — guidance. Statement 4 — statute."
          />

          <CommonMistake
            title="Quoting guidance as though it were law"
            whatHappens="You tell a client or a colleague that something 'isn't allowed under the regs'. They check, find it is a recommendation in a guidance note, and now everything else you said is in question too. In front of an inspector or in a dispute it is worse than an embarrassment."
            doInstead="Say where it comes from. 'BS 7671 requires…' and 'the On-Site Guide recommends…' are different sentences and you should know which one you are saying. When you genuinely are not sure, 'I'd want to check whether that's a requirement or good practice' is a perfectly usable line."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Reading a datasheet</ContentEyebrow>

          <ConceptBlock
            title="The subscript is the meaning — and the two IP digits are independent tests"
            plainEnglish="A datasheet will give you four or five currents, three voltages, and an IP code. None of them are alternatives to each other — each one answers a different question."
          >
            <p>
              Manufacturers label figures with subscripts, and the subscript is doing the work. The
              ones you will meet most:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">
                  U<sub>e</sub>
                </strong>{' '}
                — rated operational voltage. What the device is designed to run at in normal
                service. Often given as a pair, such as 230/400 V, covering single-phase and
                three-phase use on the same device.
              </li>
              <li>
                <strong className="text-white">
                  U<sub>i</sub>
                </strong>{' '}
                — rated insulation voltage. What the insulation is designed to withstand. Always the
                higher figure, and not a second, higher supply option — it answers "what can the
                insulation take", not "what does this run at".
              </li>
              <li>
                <strong className="text-white">
                  I<sub>n</sub>
                </strong>{' '}
                — rated current. What it will carry continuously. A voltage figure and a current
                figure can sit on the same line of a datasheet and answer completely different
                questions.
              </li>
              <li>
                <strong className="text-white">
                  I<sub>cn</sub>
                </strong>{' '}
                — rated short-circuit capacity, also called breaking capacity. The largest
                prospective fault current the device can interrupt safely. Compare it against the
                prospective fault current you measured at the origin — a device can be the right
                current rating and the wrong breaking capacity at the same time.
              </li>
              <li>
                <strong className="text-white">
                  I<sub>Δn</sub>
                </strong>{' '}
                — rated residual operating current, on an RCD. The leakage current at which it is
                designed to operate — 30 mA on the devices you will meet most.
              </li>
            </ul>
            <p className="mt-3">
              Cable datasheets add their own vocabulary. The one that causes the most confusion is
              insulation type: <strong className="text-white">thermoplastic</strong> (of which PVC
              is the common example) is rated to 70 °C, while{' '}
              <strong className="text-white">thermosetting</strong> (typically XLPE) is rated to 90
              °C. They are two different materials with two different temperature ratings, and it
              affects derating — so do not treat "PVC" and "thermoplastic" as if they were
              opposites. They are the same thing.
            </p>
            <p className="mt-3">
              An IP rating works on the same principle as the subscripts above: two figures, and
              each one is a separate test. The first digit, 0–6, is solids — 4 keeps out objects
              over 1 mm, 5 is dust-protected, 6 is dust-tight. The second digit, 0–8, is water — 4
              is splashing, 5 is jets, 6 is powerful jets, 7 is temporary immersion, 8 is continuous
              immersion. They do not trade off against one another. IP67 is dust-tight and survives
              being briefly submerged, but that is <em>not</em> the same test as the sustained jets
              a 5 covers — which is why you occasionally see enclosures rated IP65/IP67 with both
              tested separately. Reading the two digits as two separate answers, not one combined
              score, is the whole trick.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A datasheet for a 32 A Type B MCB gives: Ue 230/400 V, In 32 A, Icn 6,000 A, Ir 30 A–40 A. You have measured a prospective fault current of 2.3 kA at the origin. Is this device suitable on that count?"
            steps={[
              {
                calc: 'Icn = 6,000 A = 6 kA',
                note: 'The largest fault current the device can interrupt safely.',
              },
              {
                calc: 'Measured PFC = 2.3 kA',
                note: 'What the supply can actually deliver into a fault at that point.',
              },
              {
                calc: '2.3 kA < 6 kA',
                note: 'The device can clear the worst fault this position can produce.',
              },
            ]}
            answer="Yes — on breaking capacity it is suitable, with a good margin."
            watchOut="This checks one thing only. In (32 A) is a separate question about the load, and whether the device disconnects fast enough is a third question answered by Zs and the time/current curve. A datasheet check is never a single number; people go wrong by finding one figure that passes and stopping."
          />

          <WorkedExample
            question="You are wiring a socket circuit for a workshop compressor — a motor load with a high starting surge. The measured prospective fault current at the board is 8 kA. Two 32 A MCBs are in stock: Device A, Type B, Icn 6 kA; Device B, Type C, Icn 10 kA. Which do you fit, and why does the shared 32 A rating not make them interchangeable?"
            steps={[
              {
                calc: 'PFC at the board = 8 kA',
                note: 'The worst-case fault current this position could produce.',
              },
              {
                calc: 'Device A: Icn 6 kA',
                note: '6 kA is less than 8 kA. This device cannot be relied on to clear the worst fault at this position — it is ruled out on breaking capacity before its curve is even considered.',
              },
              {
                calc: 'Device B: Icn 10 kA',
                note: '10 kA exceeds 8 kA with a reasonable margin — adequate on breaking capacity.',
              },
              {
                calc: 'Curve: Type B vs Type C',
                note: "A Type B trips at a lower multiple of In and can nuisance-trip on a motor's starting surge. Type C is built with a higher instantaneous trip threshold, for exactly this kind of load.",
              },
            ]}
            answer="Device B, the Type C 10 kA. It clears on both counts that matter: sufficient breaking capacity for the measured fault current, and a curve suited to the compressor's starting surge. Device A fails on breaking capacity alone, so its curve is close to irrelevant."
            watchOut="Two devices sharing a current rating are not interchangeable. Read every figure that applies — rated current, breaking capacity against the measured fault current, and curve against the load type — before picking one off the shelf."
          />

          <WorkedExample
            question="A three-phase distribution board datasheet quotes: Ue 230/400 V, Ui 400 V, In 125 A. You are connecting a single-phase 230 V sub-circuit. Which figure tells you the board suits your supply, and why not the other two?"
            steps={[
              {
                calc: 'Ue 230/400 V',
                note: 'Rated operational voltage. The dual figure covers single-phase (230 V) and three-phase (400 V) use on the same board — your circuit is single-phase, so it is the 230 V half of this figure you need.',
              },
              {
                calc: 'Ui 400 V',
                note: 'Rated insulation voltage — always the higher figure, and a withstand rating rather than a second, higher operating option.',
              },
              {
                calc: 'In 125 A',
                note: 'Rated current — a different question entirely (what it carries), not a voltage at all.',
              },
            ]}
            answer="Ue, and specifically the 230 V half of the 230/400 V figure. Ui is a withstand rating, not a supply option, and In answers a current question. Three figures on the same datasheet line can answer three unrelated questions."
            watchOut="Do not read '400 V' off a datasheet and assume it rules out a 230 V single-phase job. Check which subscript the 400 V is attached to before you rule anything in or out."
          />

          <WorkedExample
            question="An outdoor enclosure for a car-wash bay needs to survive being hit by pressurised jets several times a day. You can fit Enclosure A (IP67) or Enclosure B (IP65). Which do you choose, and why would picking the 'higher' number be a mistake here?"
            steps={[
              {
                calc: 'Enclosure A: IP67',
                note: 'Second digit 7 — protected against temporary immersion. That is a different test to a jet; a 7 does not imply a 5 or a 6.',
              },
              {
                calc: 'Enclosure B: IP65',
                note: 'Second digit 5 — protected against water jets from any direction. This is the test that matches the hazard.',
              },
              {
                calc: '"Higher" is not "better"',
                note: '7 looks like more protection than 5 because it is a bigger number, but the two digits test different hazards, not increasing levels of the same one.',
              },
            ]}
            answer="Enclosure B, the IP65. It is proven against jets; the IP67 enclosure is proven against submersion, which is not the hazard in a car wash, and its rating says nothing about how it copes with a jet lance at close range."
            watchOut="This is the single most common IP-rating mistake in the trade: treating the second digit as a ladder where a higher number automatically includes the lower ones. Match the digit to the actual hazard, not to the size of the number."
          />

          <SectionRule />

          <TryIt
            question="A luminaire for a car park is marked IP54. A colleague says it will be fine because 'it's rated for outdoors'. What does IP54 actually promise, and what does it not?"
            steps={[
              {
                calc: 'First digit 5 → dust-protected',
                note: 'Dust may enter, but not enough to interfere with operation. Not dust-tight.',
              },
              {
                calc: 'Second digit 4 → splashing water',
                note: 'Protected against water splashing from any direction.',
              },
              { calc: 'Jets are a 5; immersion is a 7', note: 'Neither is covered by a 4.' },
            ]}
            answer="IP54 promises dust-protection and resistance to splashing — enough for rain, not enough for a pressure washer or standing water. In a car park that gets jet-washed, or where the fitting could sit in a puddle, it is the wrong choice and 'rated for outdoors' is not a specification."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Method statements</ContentEyebrow>

          <ConceptBlock
            title="The order is the control"
            onSite="If you find yourself doing the right steps in a different order to the one written down, stop. That is not a shortcut, it is a different job with different risks."
          >
            <p>
              A method statement sets out how a specific task will be carried out safely. The
              section that matters most is the{' '}
              <strong className="text-white">sequence of operations</strong> — the step-by-step
              order of the work. It reads like a formality until you notice that the sequence is
              frequently the safety measure itself. Isolate, prove the tester on a known source,
              prove the circuit dead with it, then remove the cover is a safe job. The same actions
              in a different order — proving dead before proving the tester works, or removing the
              cover before proving dead at all — is not a shortcut through the same job; it is a
              different job with a different risk, wearing the same paperwork.
            </p>
            <p>
              Alongside the sequence you will usually find the scope, the people involved and their
              responsibilities, the plant and equipment, the control measures, the PPE, and the
              emergency arrangements. Read the responsibilities section properly — it is where you
              find out whether the thing you assumed someone else was doing is actually assigned to
              you.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A method statement for isolating a circuit lists these steps: (1) Isolate the supply and lock off. (2) Prove the circuit dead using an approved voltage indicator. (3) Prove the voltage indicator itself on a known live source or proving unit. (4) Remove the enclosure and carry out the work. Two steps are in the wrong order. Which, and why?"
            steps={[
              {
                calc: 'Step 1 — isolate and lock off',
                note: 'Correct, and correctly first: nothing else in the sequence is safe until the supply is isolated and cannot be re-energised.',
              },
              {
                calc: 'Step 2 — prove dead',
                note: 'Wrong place. This uses the voltage indicator before anyone has checked that it actually works.',
              },
              {
                calc: 'Step 3 — prove the indicator on a known source',
                note: 'This has to come before step 2, not after it. An unproved indicator giving a false "dead" reading looks identical to a genuinely dead circuit — there is no way to tell the difference until it is too late.',
              },
              {
                calc: 'Correct order',
                note: 'Isolate and lock off → prove the indicator on a known source → prove the circuit dead with it → remove the enclosure and start work.',
              },
            ]}
            answer="Steps 2 and 3 are swapped. The voltage indicator must be proved on a known live source before it is used to test the circuit, never after — proving it afterwards only tells you the tester still worked, not that the earlier reading was ever trustworthy."
            watchOut="A method statement that lists the right four actions is not automatically safe. Check the order every time, especially around proving instruments — it is the step people compress under time pressure."
          />

          <Scenario
            title="The step that was not in the sequence"
            situation="You are working to a method statement for replacing a distribution board in an occupied office. The sequence covers isolation, proving dead, removal, installation, testing and re-energisation. On the day, the client asks you to also move a socket circuit two metres along the wall while you are there — 'it's only a small one'."
            whatToDo="Stop and treat it as what it is: work outside the scope of the method statement you are working to. The method statement covers a board replacement, not an alteration to a final circuit in an occupied area. Either it gets added properly — scope, risks, controls reviewed and agreed — or it happens as a separate job on its own paperwork."
            whyItMatters="This is the most common way method statements fail. Nobody ignores them outright; they get quietly extended by small, reasonable-sounding additions until the work being done is not the work that was assessed. If something goes wrong during that extra two metres, the document in the file describes a different job."
          />

          <SectionRule />

          <TryIt
            question="A method statement for testing a new circuit lists: (1) Complete a visual inspection. (2) Energise the circuit. (3) Carry out dead tests — continuity, insulation resistance, polarity. (4) Carry out live tests — earth fault loop impedance, RCD operation. Two steps are in the wrong order. Which, and why?"
            steps={[
              {
                calc: 'Step 1 — visual inspection',
                note: 'Correctly first: nothing gets tested until it has been looked at.',
              },
              {
                calc: 'Step 2 — energise',
                note: 'Wrong place. Energising before the dead tests risks putting a supply onto a fault that dead testing would have caught.',
              },
              {
                calc: 'Step 3 — dead tests',
                note: 'This has to come before energising, not after. Live tests can only be carried out once the circuit is safely energised — dead tests are how you get to that point.',
              },
              {
                calc: 'Correct order',
                note: 'Visual inspection → dead tests → energise → live tests.',
              },
            ]}
            answer="Steps 2 and 3 are swapped. Dead tests must be completed and the circuit proved sound before it is energised; energising first removes the safety net the dead tests exist to provide."
          />

          <CommonMistake
            title="Signing the method statement before reading it"
            whatHappens="A folder gets passed round at the start of a job and everyone signs. Later something goes wrong and the signature is evidence that you read, understood and accepted a set of control measures you did not actually read."
            doInstead="Read the sequence of operations and the responsibilities section at minimum, before signing. If there is genuinely no time to read it, that is the thing to say out loud — and it is a much easier conversation before the job than after an incident."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · O&amp;M manuals</ContentEyebrow>

          <ConceptBlock
            title="Nobody reads these cover to cover, and nobody is meant to"
            plainEnglish="An O&M manual is a reference book, often split into volumes. Treat it like one: go in with a question, use the schedule and the index, leave."
          >
            <p>
              The Operation and Maintenance manual is what the client is left with when you walk
              away. On a commercial job it can run to several volumes: system descriptions,
              as-installed drawings, equipment schedules, manufacturer literature, test
              certificates, commissioning records, maintenance schedules and spares lists — often
              grouped so that the system-level information (what it is, how it is laid out) sits in
              one part, the manufacturer's own literature for each device sits in another, and the
              records generated during commissioning (what was actually set, tested and handed over)
              sit in a third.
            </p>
            <p>
              The skill is navigation, not endurance. Start with the equipment schedule, find the
              item you care about by make and model, then go to the manufacturer section for that
              item. Most of the time you are looking for one of three things: how it is supposed to
              work, what its settings should be, or how often it needs servicing. Maintenance
              intervals in particular come from here and from the manufacturer's literature — not
              from BS 7671, which sets requirements for the installation rather than a service
              schedule for somebody's equipment.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A client rings: an RCD in a board you installed two years ago is tripping intermittently, and they want to know when it was last tested and how often it should be. Where in the O&M manual do you look, and in what order?"
            steps={[
              {
                calc: '1. Equipment schedule',
                note: 'Identify the exact device — make, model, rating. Everything else depends on knowing which device you are talking about.',
              },
              {
                calc: '2. Commissioning / test records',
                note: 'When it was tested at handover, and what the results were. That gives you a baseline to compare against.',
              },
              {
                calc: '3. Manufacturer section for that device',
                note: 'The recommended test and maintenance interval.',
              },
              {
                calc: '4. Maintenance schedule',
                note: 'What the O&M actually committed the client to, which may differ from the manufacturer minimum.',
              },
            ]}
            answer="Equipment schedule → commissioning records → manufacturer literature → maintenance schedule. Four targeted lookups, not a read-through."
            watchOut="Do not answer from memory of 'what these usually are'. Devices differ, and the figure the client is entitled to is the one in their manual, not the typical one."
          />

          <InlineCheck
            id="m2s1-om-manuals"
            question="You need to know the correct setting for an adjustable overcurrent device on a site you have taken over. Which section of the O&M manual is most likely to hold the AS-INSTALLED setting, rather than the range it could be set to?"
            options={[
              'The manufacturer’s literature for the device',
              'The commissioning records',
              'The spares list',
              'The system description',
            ]}
            correctIndex={1}
            explanation="The manufacturer's literature tells you the range the device can be set to. The commissioning records tell you what it was actually set to on the day, by the person who set it. Those are different questions and this is exactly the distinction that catches people out — 'what is it capable of' is not 'what is it'."
          />

          <SectionRule />

          <TryIt
            question="A facilities manager wants to know the manufacturer's recommended replacement interval for the smoke detector heads in a fire alarm system you commissioned, and whether the ones fitted are approaching it. Where do you look, and in what order?"
            steps={[
              {
                calc: '1. Equipment schedule',
                note: 'Identify the exact head model fitted, and the installation date for that panel or zone.',
              },
              {
                calc: '2. Manufacturer section for that head',
                note: 'The recommended replacement interval — typically a number of years from installation.',
              },
              {
                calc: '3. Maintenance schedule',
                note: 'What the O&M actually commits the client to, which may be shorter than the manufacturer minimum.',
              },
              {
                calc: '4. Commissioning records',
                note: 'The installation date, so you can calculate how much of the interval is left.',
              },
            ]}
            answer="Equipment schedule → manufacturer literature → maintenance schedule → commissioning records for the install date. Same shape as the RCD lookup: identify the device, find the figure, find the commitment, find the date it started counting from."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Risk assessments and RAMS</ContentEyebrow>

          <ConceptBlock title="Hazard, risk, control — and the hierarchy that puts control in order">
            <p>
              A <strong className="text-white">hazard</strong> is something with the potential to
              cause harm. A <strong className="text-white">risk</strong> is the likelihood of that
              harm happening, combined with how bad it would be. They are not synonyms, and risk
              assessments that muddle them tend to be the useless kind. Most risk assessments score
              risk as likelihood &times; severity, giving a number that sorts the list into what
              needs dealing with first. The number is a triage tool, not a measurement — two people
              scoring the same job will not always agree — and what matters is that the high-scoring
              items get real controls that are then actually in place. &ldquo;RAMS&rdquo; is simply
              the risk assessment and the method statement issued together, which is how they
              usually arrive.
            </p>
            <p className="mt-3">
              Every control measure you read sits somewhere in a five-level hierarchy, and it is
              meant to be worked through in order at the point the assessment is written, not
              patched on afterwards:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">1. Eliminate.</strong> Remove the hazard. Working on
                a dead installation rather than a live one is elimination, and it is why live
                working needs justification rather than just precautions.
              </li>
              <li>
                <strong className="text-white">2. Substitute.</strong> Replace it with something
                less dangerous — a battery tool instead of a 230 V one, a lower-risk process.
              </li>
              <li>
                <strong className="text-white">3. Engineering controls.</strong> Physical measures
                that work whether or not anyone remembers them: barriers, interlocks, local exhaust
                ventilation, a properly guarded edge.
              </li>
              <li>
                <strong className="text-white">4. Administrative controls.</strong> Permits,
                training, safe systems of work, signage, sequencing. These depend on people
                following them, which is why they sit below engineering controls.
              </li>
              <li>
                <strong className="text-white">5. PPE.</strong> The last line, protecting only the
                individual wearing it, only while they wear it correctly.
              </li>
            </ul>
            <p className="mt-3">
              When you read a risk assessment, place each control in that hierarchy as you go. A
              document whose controls are all administrative and PPE has usually not tried very hard
              at the top of the list — and if conditions on site change enough that the assessment
              no longer describes the job in front of you, stopping and saying so is part of what
              reading it properly means.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A risk assessment for a switchroom job lists four control measures. Place each one in the hierarchy of controls: (1) 'Isolate the circuit and work dead.' (2) 'Use a battery-powered drill instead of a 110 V corded one.' (3) 'Fit a temporary guard rail around the open floor hatch.' (4) 'Operatives to wear safety boots.'"
            steps={[
              {
                calc: 'Control 1',
                note: 'Elimination — the hazard (live conductors) is removed from the task entirely.',
              },
              {
                calc: 'Control 2',
                note: 'Substitution — a less dangerous tool replaces a more dangerous one, doing the same job.',
              },
              {
                calc: 'Control 3',
                note: 'Engineering control — a physical barrier that protects anyone nearby, whether or not they remember it is there.',
              },
              { calc: 'Control 4', note: 'PPE — the last level, protecting only the wearer.' },
            ]}
            answer="1 — elimination, 2 — substitution, 3 — engineering, 4 — PPE. Four controls, four different levels, and the assessment is doing its job properly if the higher levels were considered and used wherever the hazard allowed it."
            watchOut="A control being low in the hierarchy does not make it wrong to include — PPE is still needed even when higher controls are in place. The hierarchy tells you what to try FIRST, not what to leave out."
          />

          <InlineCheck
            id="m2s1-guidance-notes"
            question="A risk assessment for work in a ceiling void lists the control for dust as 'operatives to wear FFP3 masks'. Where does that control sit in the hierarchy, and what does its position tell you?"
            options={[
              'Engineering control — the hazard has been dealt with at source',
              'PPE — the lowest level, so it is worth asking whether anything higher was considered',
              'Elimination — the dust is no longer present',
              'Substitution — a safer material has been used',
            ]}
            correctIndex={1}
            explanation="A mask is PPE, the bottom of the hierarchy. That does not make it wrong — sometimes it is genuinely all that is left. But it protects only the person wearing it, only while they wear it correctly, and it does nothing for anyone else in the void. Its position is a prompt to ask what was considered above it: could the dust be suppressed or extracted, could the work be done another way, could the area be isolated while it happens?"
          />

          <SectionRule />

          <TryIt
            question="A risk assessment for cutting a chase into a screed floor with an angle grinder, in an occupied office, lists exactly one control: 'operatives to wear P3 masks, gloves and safety glasses.' Nothing else. What is wrong with this assessment, and what should have been considered before reaching for PPE?"
            steps={[
              {
                calc: 'Check against the hierarchy',
                note: 'All three listed items are PPE — level 5. Nothing is recorded at levels 1 to 4.',
              },
              {
                calc: 'Elimination / substitution',
                note: 'Could the chase be avoided (surface-mounted trunking instead), or a lower-dust method used (a vacuum-shrouded cutter rather than an open grinder)?',
              },
              {
                calc: 'Engineering',
                note: 'On-tool dust extraction, or sealing off and ventilating the work area, would cut the hazard at source for everyone nearby, not just the operative.',
              },
              {
                calc: 'Administrative',
                note: "Doing the cutting outside occupied hours, or excluding people from the area while it happens, reduces exposure without relying on one person's mask fit.",
              },
            ]}
            answer="The assessment jumps straight to PPE and records nothing above it. Before relying on masks alone, it should show that elimination, substitution, engineering and administrative controls were considered — dust suppression or extraction, timing the work when the office is empty, or excluding others from the area — because PPE protects only the wearer, only while worn correctly, and does nothing for the rest of an occupied office."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Building the habit</ContentEyebrow>

          <ConceptBlock title="Read with a question, keep a vocabulary, ask precisely">
            <p>
              Two habits do most of the work. The first is to{' '}
              <strong className="text-white">arrive with a question</strong>. &ldquo;I need to know
              whether this cable can be buried in that wall without extra protection&rdquo; sends
              you somewhere specific; &ldquo;I should probably read up on cables&rdquo; does not.
            </p>
            <p>
              The second is to <strong className="text-white">collect the vocabulary</strong>. Every
              trade has words that look ordinary and are not — accessible, readily accessible,
              competent, suitable, adequate, appropriate. When you hit one, look it up in Part 2
              rather than assuming the everyday meaning. A surprising number of site disagreements
              dissolve the moment somebody reads the definition aloud.
            </p>
            <p>
              Both of those set you up for the third skill: when a document is ambiguous, or two
              documents disagree, the professional move is a precise written question, not a guess.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Drawing E-04 shows the sub-main cable as 25 mm². The cable schedule for the same run says 16 mm². You are about to order the cable. What do you do, and what exactly do you write?"
            steps={[
              {
                calc: 'Identify the two documents and the exact disagreement',
                note: 'Drawing E-04 (25 mm²) versus the cable schedule (16 mm²) for the same sub-main run — name both, and the two numbers, precisely.',
              },
              {
                calc: 'Note what depends on the answer',
                note: 'Current-carrying capacity, voltage drop, terminations and gland sizes, and the cost of the run all change depending on which figure is right — this is not a trivial discrepancy to guess past.',
              },
              {
                calc: 'Draft the question',
                note: '"Drawing E-04 shows the sub-main as 25 mm² but the cable schedule shows 16 mm² for the same run — which is correct?" Nothing vaguer than that.',
              },
              {
                calc: 'Send it in writing',
                note: 'Email or a site query, not a verbal aside. It creates a record that you asked, and a record of what you were told.',
              },
            ]}
            answer="Ask the precise question in writing, naming both documents and both figures, before ordering anything. Guessing which one is right, then finding out you guessed wrong after the cable is on site, makes the mistake yours regardless of whose drawing was out of date."
            watchOut="'I don't understand the drawing' invites a shrug and no useful answer. Naming the two documents and the exact figures gets you a decision and a paper trail — that difference is most of the skill."
          />

          <CommonMistake
            title="Guessing rather than asking, because asking feels like admitting ignorance"
            whatHappens="Two documents disagree, or a spec is ambiguous, and you pick the one that seems more likely and carry on. If you guessed wrong, the work is wrong, and the person who signs it off is you."
            doInstead="Ask, in writing, naming the two documents and the discrepancy. It takes two minutes, and the record it creates is what protects you if the answer turns out to be the one you did not pick."
          />

          <SectionRule />

          <TryIt
            question="The O&M manual's maintenance schedule says an RCD should be tested every six months. The manufacturer's own literature for the same device says annually. Which do you follow, and what question do you ask, in writing, before deciding?"
            steps={[
              {
                calc: 'Identify the two documents and the disagreement',
                note: 'O&M maintenance schedule (six months) versus manufacturer literature (annually), for the same device.',
              },
              {
                calc: 'Note what depends on the answer',
                note: 'A maintenance contract, a service visit schedule, and possibly a warranty condition may all be tied to whichever interval is correct.',
              },
              {
                calc: 'Draft the question',
                note: '"The maintenance schedule specifies a six-month RCD test but the manufacturer\'s literature says annually — which interval is the client contracted to, and which takes precedence?"',
              },
            ]}
            answer="Ask the precise question in writing before committing to either interval. The O&M schedule may reflect a client commitment stricter than the manufacturer minimum — which is allowed — but you should not assume that is why they differ without asking."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Technical documents are reference material. Go in with a question; do not read them front to back.',
              'A regulation number is an address: Part, Chapter, Section, Regulation. 411.3.2 is Part 4, Chapter 41, Section 411 — but Part 7 assigns one three-digit code per location instead, so the same decoding trick does not apply there.',
              'BS 7671 is a standard, not an Act. Statute, standard and guidance are three different weights — sort a statement by the kind of claim it makes, not by how confident it sounds.',
              'Part P applies in England and Wales, but the notifiable list diverged in 2013. England dropped outdoors and kitchens; Wales did not.',
              'On a datasheet the subscript carries the meaning: Ue, Ui, In, Icn and IΔn answer five different questions, and two devices can share one figure while differing on the one that matters.',
              'IP has two independent digits — solids then water. A higher number for the wrong hazard is worse than a correctly matched lower one.',
              'In a method statement the sequence is frequently the control, especially around proving a tester before using it. Same steps, wrong order, different job.',
              'Maintenance intervals come from the O&M manual and the manufacturer, not from BS 7671.',
              'Place every control you read in the hierarchy. An assessment that is all PPE has not tried hard at the top, and it protects only the wearer.',
              'When documents disagree, name both documents and both figures in a written question. It creates a record and gets you an answer.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Do I need to memorise regulation numbers?',
                answer:
                  'No, and trying to is a waste of effort. You need to be able to find things, which is a different skill and a far more durable one. Numbers change between editions and amendments; the structure does not.',
              },
              {
                question: 'Is BS 7671 the law?',
                answer:
                  'Not in itself — it is a British Standard. But it is the recognised means of demonstrating compliance with duties that are law, notably the Electricity at Work Regulations and, for dwellings, the Building Regulations. Departing from it is possible, but then you have to be able to show you achieved an equivalent level of safety, and in practice almost nobody wants to have that conversation.',
              },
              {
                question: 'If the On-Site Guide and BS 7671 seem to disagree, which wins?',
                answer:
                  'BS 7671. The guidance interprets the standard; it does not override it. Where they genuinely appear to conflict it is usually because the guidance is describing a common case and the standard is stating the general rule — read both carefully before concluding there is a contradiction.',
              },
              {
                question: 'How much of a method statement am I expected to read?',
                answer:
                  'All of it, ideally. At an absolute minimum, the sequence of operations and the section setting out who is responsible for what — those are the two that determine what you do and what you are assumed to be covering.',
              },
              {
                question: 'What if I am given a document I genuinely cannot follow?',
                answer:
                  'Say so before the work starts, and be specific about which part. Naming the exact section you cannot follow gets it fixed before the job starts, rather than discovered mid-job.',
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Section 1: Reading Technical Documents Quiz" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate('/study-centre/apprentice/functional-skills/module2')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Module 2
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module2/section2')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Section 2
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule2Section1;
