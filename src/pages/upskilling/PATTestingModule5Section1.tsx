import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'patm5-s1-min-fields',
    question:
      'A green PASS label on a kettle shows only "PASS" and the tester\'s initials. Is this label compliant with IET CoP 5th Edition Chapter 16?',
    options: [
      'Yes — pass + tester ID is the legal minimum.',
      "No — without a test date and a retest date the label is unable to demonstrate when the test occurred or when the next is due, and the asset cannot be matched to a record. IET CoP 5th Ed. Chapter 16 names test date, retest date, asset ID and tester ID as the label's minimum useful field set.",
      'Yes, provided the company name appears on the bottom of the label.',
      'Only if the kettle is in a low-risk office environment.',
    ],
    correctIndex: 1,
    explanation:
      'A "PASS" without a date is meaningless to the next user, the next inspector, or an HSE inspector. The label must let any third party answer three questions: when was this tested, when is it due again, and who tested it — that is the IET CoP 5th Ed. Chapter 16 expectation.',
  },
  {
    id: 'patm5-s1-fail-handling',
    question:
      'A handheld drill fails earth continuity. What is the correct labelling action under HSG107 / IET CoP?',
    options: [
      'Leave the previous PASS label in place and tell the user verbally not to use it.',
      'Apply a clearly worded FAIL / DO NOT USE label, remove the item from service, and record the failure against the asset ID. The previous PASS label must be removed or covered so it cannot be acted on.',
      'Mark the case with a marker pen and put it back on the rack.',
      'Cut the plug off — that is the only acceptable response.',
    ],
    correctIndex: 1,
    explanation:
      'HSG107 paragraph 67 and IET CoP 5th Ed. Chapter 16 are explicit: a failed item must be quarantined and labelled in a way that overrides any previous PASS marking. Cutting the plug off is one valid disposal action but is not a substitute for the label and the record. Verbal instruction alone is not labelling.',
  },
  {
    id: 'patm5-s1-placement',
    question:
      'You are labelling a fan heater. The rating plate is on the underside of the chassis. Where should the PAT label go?',
    options: [
      'Directly over the rating plate so it is in the same place as the original markings.',
      'On a clean, flat, visible surface that does not obscure the rating plate, ventilation grilles, type-test marks, or the cord-grip. Typical placement is the side of the casing or on a moulded flat near the inlet.',
      'On the flex itself, near the plug.',
      'Inside the battery compartment.',
    ],
    correctIndex: 1,
    explanation:
      "IET CoP 5th Ed. Chapter 16 is firm on this: the label must be visible to the user and durable in service, but must never cover the manufacturer's rating plate, type-test marks, or safety markings. Labelling the flex is poor practice — flex is replaceable and labels migrate with the wrong asset.",
  },
  {
    id: 'patm5-s1-durability',
    question:
      'You are sourcing labels for a commercial kitchen catering hire fleet. What label specification is appropriate?',
    options: [
      'Standard paper labels — they are cheaper.',
      'Self-adhesive vinyl or polyester with a strong industrial adhesive, water and grease resistant, with permanent black-on-coloured-background printing. Tamper-evident "destructible" stock is preferable so a removed label does not transfer cleanly.',
      'Hand-written sticky notes refreshed at each test.',
      'Cable ties with the date written in marker.',
    ],
    correctIndex: 1,
    explanation:
      'Catering kit lives in a hot, wet, greasy environment. A label that fades, peels or smudges in three months is not a record. IET CoP 5th Ed. Chapter 16 expects labels to remain legible until the next scheduled test — choose materials matched to the environment.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'IET CoP 5th Ed. Chapter 16 lists the minimum information a PAT label should carry. Which of the following sets is correct?',
    options: [
      'Pass/fail and tester signature only',
      'Asset ID, test date, retest date (or "next test due") and tester identification — with pass/fail status implied by the label colour or wording',
      'Manufacturer, model, serial number and date of manufacture',
      'Just the next test date — everything else is in the records',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP 5th Ed. Chapter 16 names the four data fields that make a label useful: asset ID (so the label maps to a record), test date, retest/due date, and tester ID. Pass/fail is conveyed through the label itself (a green PASS or a red FAIL).',
  },
  {
    id: 2,
    question: 'Why is a "PASS" label without a date practically meaningless?',
    options: [
      'Because users prefer dates',
      'Because no third party — next user, manager, HSE inspector, insurer — can tell whether the test occurred this week or three years ago, and whether the next test is overdue',
      'Because the colour fades',
      'It is not meaningless — pass is pass',
    ],
    correctAnswer: 1,
    explanation:
      'The label is the visible portion of the record. Without a test date and a retest date, the label cannot answer the only question anyone needs to ask: is this item still inside its test interval. HSG107 and IET CoP 5th Ed. Chapter 16 both treat the date as load-bearing.',
  },
  {
    id: 3,
    question:
      'A retest date on the label is best expressed as a calendar date rather than an interval. Why?',
    options: [
      'Calendars are nicer to look at',
      'A calendar date removes ambiguity about when the interval started — the next user does not need to know the test date and add 12 months in their head, and there is no dispute about whether "annual" means 365 days or "by the end of next calendar year"',
      'Intervals are forbidden',
      'It is a Companies Act requirement',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP 5th Ed. Chapter 16 recommends a clear "next test due" date over an interval. A specific date is a single source of truth; an interval requires arithmetic and produces disputes when the test date is itself smudged or missing.',
  },
  {
    id: 4,
    question: 'What is the HSG107 / IET CoP expectation for a label on a failed item?',
    options: [
      'Leave the existing PASS in place and add a verbal warning',
      'A clearly worded FAIL or DO NOT USE label that overrides any previous PASS marking, plus removal of the item from service and a record of the failure against the asset ID',
      'A small red dot in the corner of the existing label',
      'No label change — failure is recorded only in the database',
    ],
    correctAnswer: 1,
    explanation:
      'HSG107 paragraph 67 and IET CoP 5th Ed. Chapter 16 require the failure to be visible at the equipment AND recorded centrally. A previous PASS must be removed or covered so it cannot be acted on by someone unaware of the failure.',
  },
  {
    id: 5,
    question:
      'Which of the following is the most appropriate label material for site equipment used in dusty, damp construction environments?',
    options: [
      'Standard paper with clear tape over the top',
      'Self-adhesive vinyl or polyester with industrial adhesive, water/oil resistant, with thermally printed text',
      'Hand-written cable-tag plastic',
      'Anything — paper is fine for indoor temperatures',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP 5th Ed. Chapter 16 expects labels to remain legible until the next test. On sites the failure mode for paper labels is moisture and dust within weeks. Vinyl/polyester with a thermal print stays legible across the full retest interval.',
  },
  {
    id: 6,
    question: 'Where on a fan heater should the PAT label be placed?',
    options: [
      'Over the rating plate so all data is together',
      'On a visible, clean, flat surface that does not obscure the rating plate, ventilation grilles, type-test marks or the cord-grip',
      'On the flex near the plug',
      'Inside the casing',
    ],
    correctAnswer: 1,
    explanation:
      'The label must not cover safety information. IET CoP 5th Ed. Chapter 16: durable, visible, but never blocking ratings or type-test marks. Labelling the flex moves with cable changes and detaches the label from the asset.',
  },
  {
    id: 7,
    question: 'What is the purpose of the asset ID field on a PAT label?',
    options: [
      'It is decorative',
      'It uniquely links the physical item to a row in the asset register / test records, so the label is auditable in both directions: from item to record and from record to item',
      'It identifies the manufacturer',
      "It is the engineer's personal reference",
    ],
    correctAnswer: 1,
    explanation:
      'Without an asset ID, a label is anonymous: you can read it but cannot find the corresponding record, and a record search cannot tell you which physical item is meant. The ID is what makes the label part of a system, not just a sticker.',
  },
  {
    id: 8,
    question:
      'A laptop charger is too small to take a standard label without obscuring its rating plate. What is the correct response?',
    options: [
      'Put the label over the rating plate anyway',
      'Use a smaller "mini" label that carries the asset ID and date but cross-refer to the full record for the rest, OR attach the label to a tag that travels with the item — the rating plate must remain visible',
      'Skip the label entirely — small items are exempt',
      'Write the asset ID on the casing in marker pen',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP 5th Ed. Chapter 16 acknowledges small items: the label must not cover safety markings. The accepted compromise is a shrunk-down label with at minimum asset ID + retest date, with the full record held centrally and retrievable via the ID.',
  },
  {
    id: 9,
    question:
      'Why is tester ID — initials, signature or a unique tester number — required on the label?',
    options: [
      'To name and shame in the event of a fault',
      'To create traceability: any third party can identify who carried out the test and follow up if the result is queried, the item fails in service, or the records are audited',
      'It is optional',
      "For the company's payroll",
    ],
    correctAnswer: 1,
    explanation:
      'Tester ID is the audit-trail field. HSG107 and IET CoP 5th Ed. Chapter 16 expect a competent person to have carried out the test; the label evidences that a specific competent person did, and links to whoever signed off on the record.',
  },
  {
    id: 10,
    question:
      'A label is "tamper evident" or "destructible". Why is this an advantage on hired or shared equipment?',
    options: [
      'It looks more professional',
      'A destructible label cannot be peeled off intact and re-applied, so a removed or interfered-with label is visibly broken — preventing a label being moved between items or re-stuck after a failure to mask the FAIL',
      'It is cheaper to print',
      'It complies with GDPR',
    ],
    correctAnswer: 1,
    explanation:
      'Hire fleets and shared equipment are the highest-risk environments for label fraud — moving a PASS label from a tested item to an untested one. Destructible vinyl tears on removal, making the interference visible at the next inspection.',
  },
];

const PATTestingModule5Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'PAT labels: pass/fail, retest dates, asset ID | PAT Module 5.1 | Elec-Mate',
    description:
      'IET CoP 5th Ed. Chapter 16 + HSG107: minimum label fields, durable label material, placement that does not obscure ratings, handling a fail, and why a "pass" without a date is meaningless.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1"
            title="PAT labels: pass/fail, retest dates, asset ID"
            description="The label is the visible portion of the record. Minimum fields under IET CoP 5th Ed. Chapter 16, durable label materials, placement that does not obscure ratings, and how to handle a fail."
            tone="yellow"
          />

          <TLDR
            points={[
              'A PAT label carries four load-bearing fields: asset ID, test date, retest date (calendar, not interval), and tester ID. Pass/fail is conveyed by the label itself (green PASS / red FAIL).',
              'A "PASS" without a date is not a label — it is a colour. Any third party (next user, manager, HSE inspector, insurer) needs to read the dates to know whether the item is inside its test interval.',
              'Label material must remain legible across the whole retest interval. Paper labels in commercial kitchens, sites and outdoor use will not. Use vinyl/polyester with industrial adhesive and thermal print.',
              'Placement: visible, on a clean flat surface, never covering the rating plate, type-test marks, ventilation grilles, or the cord-grip. Never on the flex.',
              'Failed equipment: a clear FAIL / DO NOT USE label that overrides any previous PASS, plus removal from service and a record of the failure against the asset ID. HSG107 paragraph 67.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the four minimum fields IET CoP 5th Ed. Chapter 16 expects on a PAT label and explain why each field is load-bearing',
              'Justify why a calendar retest date is preferred over an interval, and why "pass" alone is not a record',
              'Choose label material and adhesive appropriate to the environment (office, kitchen, site, outdoor, hire fleet)',
              "Place a label so it is visible and durable without obscuring the manufacturer's rating plate or any safety markings",
              'Apply the correct labelling and quarantine response when an item fails — including overriding any previous PASS',
              'Handle the small-item / no-space case (chargers, miniature accessories) without breaching the cover-no-ratings rule',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What goes on a PAT label</ContentEyebrow>

          <ConceptBlock
            title="The four load-bearing fields — and why each one is on the label"
            plainEnglish="A PAT label has to answer four questions for any third party who picks the item up: which item is this, when was it tested, when is the next test due, and who tested it. Anything less and the label is not part of a system."
            onSite="If your label generator only prints two of these four, fix the generator before the next test session — do not work around it with a marker pen."
          >
            <p>
              IET CoP 5th Ed. Chapter 16 (Records and labelling) expects a PAT label to carry four
              specific data fields. Each is on the label for a separate reason and removing any one
              of them strips the label of a function it is doing.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-elec-yellow">Asset ID</strong> — the unique reference that
                links the physical item to a row in the asset register / test records. Without an
                asset ID the label is anonymous: you can read it but cannot find the matching
                record, and a record search cannot tell you which physical item is meant.
              </li>
              <li>
                <strong className="text-elec-yellow">Test date</strong> — the date on which the test
                was carried out. Used to calculate intervals retrospectively if the retest date is
                queried, and to identify the testing session when there is a fleet failure pattern.
              </li>
              <li>
                <strong className="text-elec-yellow">Retest date</strong> — when the next test is
                due. Expressed as a calendar date rather than an interval, so the next user does not
                have to add 12 months in their head and there is no dispute about whether
                &ldquo;annual&rdquo; means 365 days or &ldquo;by the end of the next calendar
                year&rdquo;.
              </li>
              <li>
                <strong className="text-elec-yellow">Tester ID</strong> — initials, signature, a
                unique tester number, or a QR code resolving to a competent-person record. This is
                the audit-trail field: any third party can identify who carried out the test and
                follow up if the result is queried.
              </li>
            </ul>
            <p>
              Pass/fail itself does not need a separate field — it is conveyed by the label format:
              a green PASS label, a red FAIL label, or in some systems a hazard-yellow CAUTION / FOR
              REPAIR label. The colour and wording are the pass/fail; the four data fields are the
              audit trail.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020) · Chapter 16"
            clause={
              <>
                Where a label is fixed to the equipment to indicate the result of an inspection
                and/or test, it is recommended that as a minimum the label includes the date of the
                test, the date when the next test is due, and an identification of the person who
                carried out the test. Where an asset register is in use, the label should also
                include the asset identification number to enable the equipment to be linked to its
                test records.
              </>
            }
            meaning="The IET 5th Edition lists exactly the four fields covered above. The label is the equipment-side end of a two-ended audit trail; the asset register is the other end. A label without an asset ID is a sticker, not a record."
          />

          <ConceptBlock
            title="Why &ldquo;PASS&rdquo; without a date is meaningless"
            plainEnglish="A label that says only PASS gives no information that anyone can act on. The next user does not know whether the test was last week or three years ago. The label fails its job: communicating test status to anyone who picks the item up."
          >
            <p>
              Imagine an HSE inspector picks up a kettle in a staff room. The label says
              &ldquo;PASS&rdquo; and shows tester initials. The inspector asks: when was this
              tested? The site manager cannot answer without going to the records. The records say
              the kettle was tested 26 months ago, in a year when annual testing was set as policy.
              The label has been telling everyone &ldquo;OK to use&rdquo; for fourteen months past
              the retest interval, with no visible warning at the equipment.
            </p>
            <p>
              That is the failure mode IET CoP 5th Ed. Chapter 16 designed the four-field label to
              prevent. The retest date on the label is the visible flag that lets any user, not just
              the records keeper, see when the item is overdue. Pass without dates is not a cheaper
              label — it is a worse one.
            </p>
          </ConceptBlock>

          {/* PAT label anatomy diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              PAT label anatomy — what each field does
            </h4>
            <svg
              viewBox="0 0 800 380"
              className="w-full h-auto"
              role="img"
              aria-label="PAT pass label anatomy diagram. The label is divided into four labelled fields: asset ID at top, test date and retest date in the middle, tester ID at the bottom. Each field is annotated with its purpose."
            >
              {/* Label body — green PASS */}
              <rect
                x="220"
                y="40"
                width="360"
                height="240"
                rx="14"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="2"
              />
              <rect
                x="220"
                y="40"
                width="360"
                height="48"
                rx="14"
                fill="rgba(34,197,94,0.20)"
                stroke="#22C55E"
                strokeWidth="2"
              />
              <text
                x="400"
                y="72"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="22"
                fontWeight="bold"
              >
                PASS
              </text>

              {/* Asset ID row */}
              <text x="240" y="115" fill="rgba(255,255,255,0.55)" fontSize="10">
                ASSET ID
              </text>
              <text x="240" y="135" fill="#FFFFFF" fontSize="16" fontWeight="bold">
                EM-0427
              </text>

              {/* Test date + retest date row */}
              <text x="240" y="170" fill="rgba(255,255,255,0.55)" fontSize="10">
                TEST DATE
              </text>
              <text x="240" y="190" fill="#FFFFFF" fontSize="14" fontWeight="bold">
                28 Apr 2026
              </text>
              <text x="420" y="170" fill="rgba(255,255,255,0.55)" fontSize="10">
                RETEST DUE
              </text>
              <text x="420" y="190" fill="#FBBF24" fontSize="14" fontWeight="bold">
                28 Apr 2027
              </text>

              {/* Tester */}
              <text x="240" y="225" fill="rgba(255,255,255,0.55)" fontSize="10">
                TESTED BY
              </text>
              <text x="240" y="245" fill="#FFFFFF" fontSize="13">
                A. Moore · #T-019
              </text>

              {/* QR placeholder */}
              <rect
                x="500"
                y="210"
                width="60"
                height="60"
                rx="4"
                fill="rgba(255,255,255,0.12)"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1"
              />
              <text x="530" y="245" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                QR
              </text>

              {/* Annotations — left side */}
              <line
                x1="180"
                y1="125"
                x2="240"
                y2="125"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text x="40" y="118" fill="#FBBF24" fontSize="10" fontWeight="bold">
                ASSET ID
              </text>
              <text x="40" y="132" fill="rgba(255,255,255,0.7)" fontSize="9">
                Links label → register row.
              </text>
              <text x="40" y="146" fill="rgba(255,255,255,0.7)" fontSize="9">
                Without it, label is anonymous.
              </text>

              <line
                x1="180"
                y1="180"
                x2="240"
                y2="180"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text x="40" y="173" fill="#FBBF24" fontSize="10" fontWeight="bold">
                TEST + RETEST DATES
              </text>
              <text x="40" y="187" fill="rgba(255,255,255,0.7)" fontSize="9">
                Calendar dates, not intervals.
              </text>
              <text x="40" y="201" fill="rgba(255,255,255,0.7)" fontSize="9">
                Removes ambiguity for next user.
              </text>

              <line
                x1="180"
                y1="235"
                x2="240"
                y2="235"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text x="40" y="228" fill="#FBBF24" fontSize="10" fontWeight="bold">
                TESTER ID
              </text>
              <text x="40" y="242" fill="rgba(255,255,255,0.7)" fontSize="9">
                Audit trail. Identifies the
              </text>
              <text x="40" y="256" fill="rgba(255,255,255,0.7)" fontSize="9">
                competent person.
              </text>

              {/* Right-side annotation */}
              <line
                x1="580"
                y1="240"
                x2="620"
                y2="240"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text x="630" y="233" fill="#FBBF24" fontSize="10" fontWeight="bold">
                OPTIONAL QR
              </text>
              <text x="630" y="247" fill="rgba(255,255,255,0.7)" fontSize="9">
                Resolves to register
              </text>
              <text x="630" y="261" fill="rgba(255,255,255,0.7)" fontSize="9">
                row + tester record.
              </text>

              {/* Bottom caption */}
              <rect
                x="40"
                y="310"
                width="720"
                height="50"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="332" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                IET CoP 5th Ed. Chapter 16 minimum: asset ID, test date, retest date, tester ID.
              </text>
              <text
                x="400"
                y="350"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Pass/fail conveyed by colour + wording. Drop any field and the label stops working.
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Choosing a label material that survives the retest interval
          </ContentEyebrow>

          <ConceptBlock
            title="The label has to remain legible until the next test — pick the stock for the environment"
            plainEnglish="A label that fades, peels, or becomes unreadable in three months is not a label — it is a soon-to-be missing record. Match the label material to where the equipment lives."
            onSite="Buy three or four label specifications and use the right one per environment. The unit cost difference between paper and durable vinyl is trivial against the cost of an unreadable label at the next test."
          >
            <p>
              IET CoP 5th Ed. Chapter 16 expects labels to remain in place and legible across the
              full retest interval. That has to drive material choice:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Standard office / dry indoor:</strong> self-adhesive vinyl or polyester with
                thermal-transfer print. Standard PAT label rolls are fine. Avoid plain paper —
                handling and dust degrade legibility before the next test.
              </li>
              <li>
                <strong>Catering / commercial kitchens:</strong> heat, water, grease and frequent
                cleaning. Use a polyester label with industrial adhesive rated for &ge; 80 &deg;C
                surfaces and resistance to detergents and oils. Thermally printed black on a
                coloured background — never inkjet.
              </li>
              <li>
                <strong>Construction / outdoor / site equipment:</strong> UV, dust, abrasion,
                moisture. Use vinyl labels rated for outdoor use, with strong adhesive. Some sites
                require labels with a clear over-laminate so the print is protected from abrasion.
              </li>
              <li>
                <strong>Hire fleets / shared equipment:</strong> tamper-evident or destructible
                labels are appropriate. Destructible vinyl tears on attempted removal, so a missing
                or interfered-with label is visible at the next inspection — preventing label
                migration between items.
              </li>
              <li>
                <strong>Tools that get washed down or used in damp environments:</strong> labels
                with sealed-edge laminates or labels designed for IP-rated equipment. Standard
                paper-faced PAT labels are unsuitable.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSG107 (Maintaining portable electric equipment, 4th Edition) · paragraph 67"
            clause={
              <>
                A label fixed to portable equipment can be used to indicate that it has been
                inspected or tested, and to provide some basic information about the inspection,
                such as the date and the next due date. The label should remain in place and legible
                until the next inspection or test is carried out.
              </>
            }
            meaning="HSG107 paragraph 67 expressly ties the label durability requirement to the retest interval. If your labels are unreadable at the next visit you have failed the requirement, regardless of how compliant the original test was."
          />

          <CommonMistake
            title="Using paper PAT labels on construction-site tools"
            whatHappens="A roll of standard paper-faced PAT labels is used to label a 110 V transformer kit. After three weeks on a wet site the labels are smudged, partially peeled, and the dates are illegible. A subcontractor picks up the transformer and there is no readable test status on it. They use it; an HSE inspector sees the unreadable label and treats the kit as untested, escalating into the company\'s wider PAT regime."
            doInstead="Maintain at least two label stocks: standard for office / dry indoor, and durable vinyl/polyester with strong adhesive and outdoor-rated print for site, kitchen, and any wet/dusty environment. The cost difference is pennies per label. Hand the appropriate roll to the tester before each session."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Where the label goes — visible, durable, never covering ratings
          </ContentEyebrow>

          <ConceptBlock
            title="Placement that does not obscure rating plates, type-test marks or safety markings"
            plainEnglish="The PAT label must be visible to the user, durable in service, and must never sit on top of any of the markings the manufacturer placed on the equipment for safety or compliance. Placement is a discipline, not a habit."
            onSite="Look at the equipment before you reach for the label roll. Identify the rating plate, the type-test marks (CE/UKCA, BS EN numbers, IP rating), the ventilation grilles, the cord-grip, and any user warnings. Plan placement around them; do not just slap on a flat space."
          >
            <p>
              IET CoP 5th Ed. Chapter 16 is firm: the label must be visible and durable, but must
              not cover the rating plate, the manufacturer&rsquo;s type-test marks, ventilation
              openings, or any safety warning. The reasoning is functional, not cosmetic — the
              rating plate is what tells the next maintainer which fuse rating, voltage and class
              the equipment requires. Cover it and you have created a future fault.
            </p>
            <p>Practical placement rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Clean, flat surface near the cord entry or plug.</strong> The most common
                place a user looks before plugging in.
              </li>
              <li>
                <strong>On the casing, not on the flex.</strong> Flexes are replaceable; a label on
                a flex migrates with the wrong asset and disappears the moment the lead is changed.
              </li>
              <li>
                <strong>Do not cover the rating plate.</strong> Place adjacent to it where possible
                — the rating plate and the test label live next to each other and are read together.
              </li>
              <li>
                <strong>Avoid ventilation grilles.</strong> Heat causes adhesive failure, and
                blocking grilles is a hazard in itself.
              </li>
              <li>
                <strong>Avoid the cord-grip.</strong> Frequent flex movement near the cord-grip
                rolls the label edges and detaches it within months.
              </li>
              <li>
                <strong>Hand-held tools / portable battery items:</strong> a flat surface on the
                body, away from grip surfaces. A label on the trigger area does not survive a week
                of use.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="A laptop charger with no clear flat surface for a label"
            situation="You are testing a laptop charger. The brick body has the rating plate occupying almost the whole flat side. The opposite side is concave. The flex enters at one end and the IEC inlet at the other. There is nowhere to place a standard PAT label without covering the rating plate."
            whatToDo="Use a smaller mini-label (typically 25 × 12 mm) carrying at minimum the asset ID and the retest date — placed on a clean strip of casing where it does not touch the rating plate. Cross-refer to the central record for the rest of the audit trail. The label remains traceable via the asset ID; the full record is in the register. Alternatively, attach the label to a tag that travels with the item — though this is poorer practice because tags can be removed."
            whyItMatters="The IET CoP rule against covering the rating plate is non-negotiable. The rating plate is what tells the next maintainer the input voltage, output voltage, current limit, and conformity marks. Once that is hidden, the next person who needs that information cannot find it without dismantling, and you have replaced one document (the label) with a new defect (a hidden rating plate)."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>When the test fails — labelling and quarantine</ContentEyebrow>

          <ConceptBlock
            title="Failed equipment — the FAIL label, the previous PASS, and removal from service"
            plainEnglish="A failure produces three actions, not one. Apply a FAIL / DO NOT USE label that overrides any previous marking. Remove the item from service so it cannot be picked up and used. Record the failure against the asset ID. Skip any one of these and the failure can become invisible to a future user."
            onSite="The single most important moment in PAT testing is the failure. Get the response wrong and a user picks up a known-defective item with a green PASS still on it."
          >
            <p>
              When an item fails any of the inspection or test stages, the response is three-part.
              All three steps are required by HSG107 paragraph 67 and IET CoP 5th Ed. Chapter 16:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Apply a FAIL label.</strong> Red background, &ldquo;FAIL&rdquo; or &ldquo;DO
                NOT USE&rdquo; in large clear text, with the date of failure and the tester ID. The
                label must override any previous PASS — practically that means the old PASS label is
                removed or covered.
              </li>
              <li>
                <strong>Remove the item from service.</strong> Physically quarantine — a labelled
                bin, a marked area, an unplugging from any outlet. The item cannot be left where a
                user could pick it up.
              </li>
              <li>
                <strong>Record the failure against the asset ID.</strong> The asset register row
                gets the failure result, the failure mode, the date, and the tester. The label is
                the visible flag; the record is the audit trail.
              </li>
            </ol>
            <p>
              If the item is to be repaired, it stays quarantined until the repair is complete and a
              fresh test is carried out. The new PASS label, if applied, includes a new test date
              and a new retest date — the failure history sits in the asset register, not on the new
              label.
            </p>
            <p>
              If the item is to be disposed of, the asset register row is updated to
              &ldquo;disposed&rdquo; with the disposal date. Cutting the plug off is a sensible
              disposal practice but does not replace any of the three steps above — it is an
              additional safeguard, not a substitute.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSG107 (Maintaining portable electric equipment, 4th Edition) · paragraph 67"
            clause={
              <>
                Equipment which fails any inspection or test should be taken out of service and
                clearly labelled to prevent further use until it has been repaired and retested. A
                previous label indicating a passed inspection or test should be removed or obscured.
              </>
            }
            meaning="HSG107 explicitly requires both the FAIL label AND the removal of the previous PASS. Two separate actions on the same item. Skipping the second is the most common labelling failure: a red sticker added next to the green one, with no clear precedence."
          />

          <CommonMistake
            title="Adding a FAIL label without removing the previous PASS"
            whatHappens="A drill fails earth continuity. The tester sticks a red FAIL label on the side, opposite the existing green PASS. The drill is returned to the rack. The next user reads the green PASS first, sees a date inside the retest interval, and uses the drill — never seeing the red FAIL added to the other side. They receive a shock from a faulty CPC bond."
            doInstead="Remove or completely cover the previous PASS label before applying the FAIL. The FAIL must be the only visible test status on the item. Better: physically quarantine the item the moment the test fails, before any user can see it again. Do not rely on the label alone to keep a defective item out of service."
          />

          <CommonMistake
            title="A red dot on the existing label"
            whatHappens="To save time, the tester scribbles a red dot on the green PASS label of a failed item. The dot rubs off in service or is mistaken for damage. The label still reads PASS to anyone who is not familiar with the company\'s coding scheme. The failure becomes invisible the first time the label is wiped clean."
            doInstead="A FAIL label is a separate, full-size, red label with FAIL or DO NOT USE in large bold text. It is not a mark on the previous label. IET CoP 5th Ed. Chapter 16 expects unambiguous labelling — any third party seeing the item should know its test status without needing local knowledge of a coding system."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Edge cases — small items, hire fleets, multi-test items</ContentEyebrow>

          <ConceptBlock
            title="Items too small for a full label, or shared between users"
            plainEnglish="A label has to fit the item, the use case, and the audit trail. Three common edge cases need a defined response."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Items too small for a full label:</strong> chargers, miniature accessories,
                cable adapters. Use a mini-label with at minimum the asset ID and retest date; the
                rest of the audit trail lives in the central record. Never cover the rating plate to
                fit a full label — a smaller label with full traceability via the asset ID is the
                correct compromise.
              </li>
              <li>
                <strong>Hire fleets and shared equipment:</strong> tamper-evident or destructible
                labels prevent migration of PASS labels between items. A removed label tears
                visibly. The hire-fleet asset register also records who has the item out and when it
                is due back, allowing the retest to be coordinated with returns.
              </li>
              <li>
                <strong>Multi-component items (e.g. trailing socket assemblies):</strong> the label
                goes on the body of the assembly, not on any one of its components. The asset
                register row covers the whole assembly. If a component is replaced (e.g. the flex),
                the asset register notes the replacement and the assembly retains its asset ID.
              </li>
              <li>
                <strong>Items with multiple plugs or inlets (e.g. dual-flex devices):</strong> one
                asset ID per item, one label visible at the most likely point of inspection. If both
                ends carry plugs that get used independently, a duplicate label at the second end is
                acceptable provided both labels carry identical data.
              </li>
              <li>
                <strong>Visual-only inspections (no electrical test):</strong> some items only
                receive a user check or formal visual inspection on a given visit — for instance
                between full electrical retests. A different label colour (typically blue or with
                clear &ldquo;visual only&rdquo; wording) prevents this being mistaken for a full
                electrical test pass.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Four fields: asset ID, test date, retest date (calendar, not interval), tester ID. Pass/fail is the colour and wording of the label itself.',
              '"PASS" with no date is not a label. The next user, manager, HSE inspector and insurer all need to see the dates to know whether the item is inside its test interval.',
              'Match the label to the environment. Paper labels do not survive kitchens, sites or outdoor use. Vinyl/polyester with industrial adhesive and thermal print is the default outside dry offices.',
              'Placement: visible, durable, on a clean flat surface, never covering the rating plate, type-test marks or ventilation. Never on the flex.',
              'Failure response is three actions: FAIL label that overrides any previous PASS, removal from service, record against the asset ID. Skipping any one breaks the system.',
              'Tamper-evident / destructible labels are appropriate for hire fleets and shared equipment — they make label migration visible at the next inspection.',
              'Small items: shrunk-down label with at minimum asset ID + retest date, full record retrievable via the asset ID. Do not cover the rating plate to fit a full label.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is the PAT label legally required?',
                answer:
                  'There is no specific regulation in EAWR 1989 or HSAW 1974 that prescribes a label. What is required is that the duty holder can demonstrate that equipment has been maintained in a safe condition (EAWR Reg 4(2)) and that records exist. The label is the IET CoP 5th Ed. Chapter 16 recommended way to make the test status visible at the equipment, supporting the records-keeping duty. In practice, every competent in-service inspection regime uses labels.',
              },
              {
                question: 'Should the retest date on the label be a calendar date or an interval?',
                answer:
                  'A calendar date. IET CoP 5th Ed. Chapter 16 recommends an explicit "next test due" date over an interval. A specific date is unambiguous; an interval requires the next user to read the test date, work out what the interval was, and add it. Disputes about whether "annual" means 365 days or "by the same date next year" disappear when the date is on the label.',
              },
              {
                question: 'Can I write the label by hand or does it need to be printed?',
                answer:
                  'Either is acceptable provided the writing is legible and durable until the next test. In practice hand-written labels fail durability — biros and felt-tip fade or run when wet. Thermally printed labels from a PAT instrument or a dedicated label printer are the practical standard. If you are hand-writing, use a permanent marker on a vinyl label and accept that the legibility window is shorter than a printed label.',
              },
              {
                question: 'What if a user defaces or removes the PAT label between tests?',
                answer:
                  'The asset register is the second leg of the audit trail. The item is still tested and recorded; the label is missing or damaged. At the next inspection (or sooner if discovered) the item is re-labelled and the loss noted. For hire fleets, destructible labels make the interference visible — the label cannot be removed cleanly. For owned equipment, communication with users matters: explain that defacing a PAT label removes their evidence that the item is safe to use.',
              },
              {
                question:
                  'Do I need a separate label for visual-only inspections between full tests?',
                answer:
                  'Yes, where visual inspections are part of the regime. A different colour (often blue) or clearly worded "VISUAL CHECK" label prevents this being mistaken for a full electrical test. The label still carries date, next-check date and tester ID. Visual-only inspections are an HSE / IET CoP recommended layer between full electrical retests, especially for higher-risk items between annual tests.',
              },
              {
                question:
                  'A piece of equipment has come back from repair. Does it get a new asset ID?',
                answer:
                  'No — the asset ID stays with the item across its lifetime. The asset register row records the failure, the repair, and the post-repair test result against the existing asset ID. The new PASS label uses the same asset ID and the new test/retest dates. The continuity of the asset ID is what makes the failure history traceable.',
              },
              {
                question: 'What about QR codes on PAT labels — useful or gimmick?',
                answer:
                  'Useful, when the QR resolves to the asset register row and the tester record. The QR turns a label into a one-tap audit-trail lookup — particularly valuable for fleets where users need to query test status remotely (e.g. a subcontractor on site). The four data fields still need to be human-readable on the label; the QR is in addition to, not instead of, them.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="PAT labels — Module 5.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-5-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 Test record keeping and legal requirements
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default PATTestingModule5Section1;
