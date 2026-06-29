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
    id: 'patm5-s4-not-annual',
    question:
      'A new client demands "annual PAT" for everything in their office. Is this the right answer under HSG107?',
    options: [
      'No — the interval is risk-based per equipment category and environment, not fixed annually.',
      'Yes — annual PAT is a legal requirement under EAWR for all equipment.',
      'Yes for offices, but six-monthly is the fixed legal interval for sites.',
      'Annual is the IET-mandated legal standard for office equipment.',
    ],
    correctIndex: 0,
    explanation:
      'There is no "annual PAT" rule in EAWR or HSG107. The duty is risk-based maintenance "so far as is reasonably practicable". IET CoP Table 7.1 provides starting frequencies that vary by equipment type and environment; intervals are then adjusted using failure-rate data per Section 7. Many low-risk office items can run on extended intervals (24 months or more) with user checks, while higher-risk environments need shorter intervals.',
  },
  {
    id: 'patm5-s4-failure-rate',
    question:
      'A class of cordless drills on a construction site is recording a 6 % failure rate at annual test. Should the test interval be tightened or extended?',
    options: [
      'Extended — a 6 % failure rate is normal for site drills.',
      'Left at 12 months pending the next review cycle.',
      'Tightened — 6 % is above the band, so shorten the interval.',
      'Extended to 24 months — cordless drills are robust kit.',
    ],
    correctIndex: 2,
    explanation:
      'A high failure rate is the signal that the current interval is too long for the conditions. IET CoP 5th Ed. Section 7 requires intervals to be reviewed in light of failure data. The adjustment is downward (shorter interval) until the failure rate stabilises within the expected band for the category.',
  },
  {
    id: 'patm5-s4-high-risk',
    question:
      'On a high-risk environment (e.g. wet construction site), what is the "test before next use" rule?',
    options: [
      'A formal full PAT carried out before every single use.',
      'Continuous instrumented monitoring of every appliance.',
      'A documented monthly inspection by a competent person.',
      'A user visual check of plug, flex and casing before connection.',
    ],
    correctIndex: 3,
    explanation:
      'IET CoP 5th Ed. Chapter 7 introduces user checks as the most frequent layer of inspection in high-risk environments. The user inspects the equipment for visible damage before each use. Formal combined inspection and test happens at the IET CoP Table 7.1 interval, tightened from category baseline where the environment is harsh.',
  },
  {
    id: 'patm5-s4-batched',
    question:
      'A duty holder has 600 items spread across 8 sites. Should test rounds be scheduled item-by-item to their individual due dates, or batched?',
    options: [
      'Item-by-item to each item&rsquo;s exact individual due date, with no tolerance.',
      'Batched by site / location, with bounded drift documented in the policy.',
      'In a randomised order each cycle to spread the workload evenly.',
      'Only reactively, as individual items fail in service.',
    ],
    correctIndex: 1,
    explanation:
      'Batched scheduling is the practical norm for any estate of size. Items are grouped by site / location and tested in rounds; due dates may shift a few weeks within the batch. The IET CoP does not require exact-date testing; what is required is that the policy is documented, the maximum permissible drift is bounded, and the next-test-due date is recalculated from the actual test date so drift does not compound.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the legal basis for choosing PAT test intervals?',
    options: [
      'Risk-based intervals under EAWR Reg 4(2), set via IET CoP Table 7.1 and Section 7',
      'A fixed 12-month interval mandated by the Electricity at Work Regulations',
      'Whatever the customer specifies in the contract',
      'A single interval published by the HSE each year',
    ],
    correctAnswer: 0,
    explanation:
      'There is no fixed interval in regulation. EAWR demands proportionate maintenance; the IET CoP Table 7.1 and Section 7 framework provides the practical methodology. The interval depends on equipment category, environment and historical failure data, and starting points are adjusted by data.',
  },
  {
    id: 2,
    question:
      'IET CoP 5th Ed. Table 7.1 gives starting test frequencies. The intervals for the same equipment in different environments differ because:',
    options: [
      'Arbitrary tradition carried over from earlier editions of the code',
      'Equipment manufacturers contractually require shorter intervals for harsh sites',
      'Harsher environments wear equipment faster, so faults develop sooner between tests',
      'Shorter intervals in harsh environments simply reduce administrative effort',
    ],
    correctAnswer: 2,
    explanation:
      'Equipment in wet, dusty, mobile or high-handling environments wears faster and develops faults sooner, so the interval has to reflect the rate at which faults are likely to develop. A drill in an office is in a different state of wear at 12 months than the same drill on a wet site. Table 7.1 captures this; the intervals are starting points that site-specific data adjusts.',
  },
  {
    id: 3,
    question:
      'IET CoP 5th Ed. Section 7 introduces a hierarchy of inspection types. What is the most frequent layer?',
    options: [
      'Combined inspection and test with a calibrated PAT instrument',
      'Formal visual inspection by a competent person at a documented interval',
      'A monthly insulation-resistance test recorded against each asset ID',
      'User check — a quick visual inspection by the user before each use',
    ],
    correctAnswer: 3,
    explanation:
      'The IET CoP hierarchy: user checks (most frequent, by user) → formal visual inspections (regular, by competent person) → combined inspection and test (less frequent, full electrical test). User checks catch the gross damage that develops between formal tests.',
  },
  {
    id: 4,
    question:
      'A class of equipment in the asset register shows a 5+ % failure rate at the current annual interval. The correct response is:',
    options: [
      'Tighten the interval until the failure rate returns to the expected band',
      'Leave the interval unchanged until the next scheduled review cycle',
      'Extend the interval to 24 months to reduce the testing burden',
      'Stop testing the class altogether and rely on user checks',
    ],
    correctAnswer: 0,
    explanation:
      'A high failure rate signals the current interval is too long for the conditions. Move to 6-monthly or to a user-check plus combined-test regime until the failure rate returns to the expected band, and document the adjustment and the data behind it. IET CoP 5th Ed. Section 7 requires intervals to be reviewed in light of failure-rate data so the data-driven decision is auditable.',
  },
  {
    id: 5,
    question: 'Why does the IET CoP not give a single fixed interval for all equipment?',
    options: [
      'It is an oversight in the drafting of the code',
      'The committee members could not agree on a figure',
      'Equipment risk varies by type, class, environment, usage and history',
      'Equipment manufacturers objected to a single fixed figure',
    ],
    correctAnswer: 2,
    explanation:
      'Equipment risk varies by type, class, environment, usage and history. A single fixed interval would be either too short for low-risk items (wasteful) or too long for high-risk items (dangerous). A blanket interval cannot satisfy the EAWR "reasonably practicable" duty efficiently; the risk-based table-plus-review methodology lets the duty holder concentrate testing effort where the risk justifies it.',
  },
  {
    id: 6,
    question:
      'For a hire fleet that goes to many different sites, what is the appropriate test point?',
    options: [
      "Annually at the hire firm's depot, regardless of hire activity",
      'On hire-out only, just before the equipment leaves the depot',
      'Never at the depot — the hire customer tests it on receipt',
      'On return before the next hire, plus user checks during the hire',
    ],
    correctAnswer: 3,
    explanation:
      'The hire-fleet model concentrates testing at the inter-hire interval — the equipment is tested on return, before the next hire. Combined with user checks during hire, this gives the next customer recently verified equipment, reducing the chance of a failure mid-hire.',
  },
  {
    id: 7,
    question:
      'A site requires "test before next use" for all 110 V site equipment. What does this mean in practice?',
    options: [
      'A user visual check before each use, plus combined I&T at the Table 7.1 interval',
      'A full electrical test before every single plug-in on site',
      'Continuous instrumented monitoring of every item in use',
      'It is not practical to apply on a working construction site',
    ],
    correctAnswer: 0,
    explanation:
      'A user visual check before every use (looking for visible plug, flex and casing damage) is combined with formal combined inspection and test at the IET CoP Table 7.1 interval for the environment — typically 3-monthly for the harshest construction sites. User checks are the front-line layer per Section 7: they take seconds and catch visible damage, while formal tests sit on top at a documented short interval.',
  },
  {
    id: 8,
    question:
      'A small business has 40 portable items and is contemplating extending the test interval from 12 to 24 months. What evidence do they need to do this defensibly?',
    options: [
      'A management decision recorded in the minutes',
      'No evidence at all — the extension is automatic',
      'Documented clean failure-rate data over multiple cycles plus a category assessment',
      'A vote of the staff who use the equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Interval extension is defensible only when the data supports it. Document the failure-rate history showing the items running clean at 12 months over multiple cycles, an environment / equipment-class assessment confirming the extended interval is consistent with IET CoP Table 7.1 for the category, and the conclusion. The "reasonably practicable" defence under HSAW Sec 2 needs the methodology to be visible to an HSE inspector.',
  },
  {
    id: 9,
    question:
      'Test rounds across a multi-site estate are usually batched by site. The maximum acceptable drift from individual due dates is:',
    options: [
      'Zero — every test must fall exactly on the individual due date',
      'A flat three months either side of every individual due date',
      'Whatever is convenient for the tester on the day of the visit',
      'Bounded and documented — a few weeks, with next-due set from the actual test date',
    ],
    correctAnswer: 3,
    explanation:
      'Item-by-item exact-date testing is impractical at scale. Batched scheduling is the norm; the IET CoP framework allows it provided the maximum drift is documented and bounded, and provided the schedule does not compound drift cycle to cycle.',
  },
  {
    id: 10,
    question: 'What is the role of the user check in the test-interval framework?',
    options: [
      'The most frequent layer — a user visual check before each use, supporting formal tests',
      'It fully replaces formal inspections and combined tests in the regime',
      'It is an optional extra with no defined role in the framework',
      'It is the same procedure as a full combined inspection and test',
    ],
    correctAnswer: 0,
    explanation:
      'The user check is the most frequent layer in the IET CoP 5th Ed. Section 7 hierarchy — a user-conducted visual inspection before each use that catches gross damage between formal tests, particularly in higher-risk environments. It is quick and conducted by the user themselves, and supports but does not replace formal inspections and combined inspection-and-test, which sit above it at progressively less frequent intervals.',
  },
];

const PATTestingModule5Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Retest period planning | PAT Module 5.4 | Elec-Mate',
    description:
      'IET CoP 5th Ed. Table 7.1 + Section 7: risk-based intervals, user checks vs formal inspections vs combined inspection and test, failure-rate-driven adjustment, batched scheduling, and the test-before-next-use rule for high-risk environments.',
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
            eyebrow="Module 5 · Section 4"
            title="Retest period planning"
            description="There is no &lsquo;annual PAT&rsquo; in law. Risk-based intervals from IET CoP Table 7.1, user checks vs formal tests, failure-rate-driven adjustment, and batched scheduling that survives real-world logistics."
            tone="yellow"
          />

          <TLDR
            points={[
              'There is no fixed "annual PAT" rule in EAWR or HSG107. The duty is risk-based maintenance "so far as is reasonably practicable". IET CoP Table 7.1 provides starting intervals; Section 7 frames how they are adjusted.',
              'Three layers of inspection (IET CoP 5th Ed. Section 7): user checks (most frequent, by user, before use), formal visual inspections (regular, by competent person), combined inspection and test (less frequent, full electrical test).',
              'Intervals depend on equipment type AND environment. Same drill is on a different interval in an office vs a wet construction site.',
              'Failure rate is the signal. A class running clean justifies extending the interval; a class above 5 % failure justifies tightening. Document the data and the decision.',
              '"Test before next use" in high-risk environments = user check before each use, combined inspection and test at a tightened interval. Both layers, not just one.',
              'Batched scheduling is the practical norm — items grouped by site/location, with bounded drift documented. Recalculate next-due from actual test date so drift does not compound.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Reject the &ldquo;annual PAT&rdquo; myth and explain the EAWR-based, risk-driven interval framework',
              'Apply IET CoP 5th Ed. Table 7.1 starting intervals based on equipment category and environment',
              'Use the IET CoP Section 7 hierarchy (user check / formal visual / combined inspection and test) appropriately for different risk profiles',
              'Adjust test intervals based on failure-rate data — both tightening and extending — and document the decision so it is defensible',
              'Apply the &ldquo;test before next use&rdquo; principle in high-risk environments (construction sites, wet/dirty conditions)',
              'Schedule large estates in batches without compounding drift, including coordination with contractors and multi-site logistics',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The myth of &ldquo;annual PAT&rdquo;</ContentEyebrow>

          <ConceptBlock
            title="There is no fixed interval in regulation — there is a risk-based duty"
            plainEnglish="EAWR Reg 4(2) does not say &lsquo;test annually&rsquo;. It says &lsquo;maintain so far as is reasonably practicable to prevent danger&rsquo;. What that means in practice depends on what the equipment is, how it is used, and what the failure data shows."
            onSite="When a customer demands &lsquo;annual PAT&rsquo; for an office, you are entitled — and arguably obliged — to explain the risk-based framework and recommend a sensible category-by-category interval. Annual for everything is sometimes wasteful and sometimes inadequate."
          >
            <p>
              The phrase &ldquo;annual PAT&rdquo; has no basis in EAWR, HSAW, HSG107, or IET CoP 5th
              Edition. It is a marketing simplification that has become a folk requirement. The
              actual framework:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>EAWR Reg 4(2):</strong> systems shall be maintained so as to prevent, so far
                as is reasonably practicable, danger. The duty is on the duty holder to determine
                what &ldquo;reasonably practicable&rdquo; looks like for their estate.
              </li>
              <li>
                <strong>HSG107:</strong> HSE&rsquo;s practical guidance — frame the regime around
                category, environment, and failure data. No fixed interval is mandated.
              </li>
              <li>
                <strong>IET CoP 5th Ed. Table 7.1:</strong> starting test frequencies that vary by
                category (Class I / II / III equipment, leads, IT equipment, hand-held vs
                stationary) and environment (offices / shops, schools, public, industrial,
                construction).
              </li>
              <li>
                <strong>IET CoP 5th Ed. Section 7:</strong> the methodology for reviewing and
                adjusting intervals based on failure rates and environmental change.
              </li>
            </ul>
            <p>
              The implication is that &ldquo;annual PAT for the whole office&rdquo; is potentially
              wasteful (low-risk Class II IT equipment in a dry office can often run on extended
              intervals) and potentially inadequate (high-handling Class I equipment in a kitchen
              may need shorter intervals than annual).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE INDG236 (Maintaining portable electric equipment in low-risk environments)"
            clause={
              <>
                There is no requirement in law to inspect electrical equipment annually. How often
                you should inspect or test depends on the type of equipment and the environment in
                which it is used. The dutyholder should make sure that the frequency of inspection
                and testing is appropriate.
              </>
            }
            meaning="HSE&rsquo;s own published guidance is unambiguous: the &lsquo;annual&rsquo; folk requirement is not a legal requirement. The dutyholder determines an appropriate frequency, drawing on category and environment, and reviews it. INDG236 is the most accessible HSE source for explaining this to clients."
          />

          <SectionRule />

          <ContentEyebrow>The IET CoP three-layer hierarchy</ContentEyebrow>

          <ConceptBlock
            title="User checks, formal inspections, combined inspection and test"
            plainEnglish="IET CoP 5th Ed. Section 7 frames inspection as three layers, each with its own frequency. User checks are most frequent, combined inspection and test least frequent. Together they form the maintenance regime."
          >
            <p>The three layers:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-elec-yellow">User check</strong> — performed by the user of
                the equipment, before each use (or daily, depending on the regime). Visual
                inspection: plug condition, flex condition, casing damage, signs of overheating,
                obvious defects. Takes seconds. Catches gross damage between formal layers. Most
                frequent for higher-risk environments.
              </li>
              <li>
                <strong className="text-elec-yellow">Formal visual inspection</strong> — performed
                by a competent person at a documented interval. More thorough than a user check:
                opening accessible covers (where appropriate), checking strain relief, checking
                polarity at plug, checking continuity informally if a fault is suspected. No formal
                electrical test.
              </li>
              <li>
                <strong className="text-elec-yellow">Combined inspection and test</strong> —
                performed by a competent person, with a calibrated PAT instrument. Full electrical
                test sequence: earth continuity (Class I), insulation resistance, leakage, polarity,
                plus visual inspection. The numerical results sit in the test record. Least frequent
                of the three.
              </li>
            </ol>
            <p>
              The frequencies are not the same for every layer. A high-risk environment might run
              user checks daily, formal visual inspections every 3 months, and combined inspection
              and test every 6 months. A low-risk office might rely mainly on user awareness, with
              formal visual inspections annually and combined inspection and test every 24 months.
              The regime is a structure, not a single interval.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Table 7.1 starting frequencies — read by category and environment
          </ContentEyebrow>

          <ConceptBlock
            title="The starting-interval grid: equipment category × environment"
            plainEnglish="IET CoP Table 7.1 is a grid. Find your equipment category on one axis and your environment on the other. The cell gives you the starting interval — typically as separate values for formal visual and combined inspection and test."
            onSite="The Table 7.1 values are STARTING points. Failure-rate data adjusts them up or down. Document the starting cell you chose and the adjustments you made."
          >
            <p>IET CoP 5th Ed. Table 7.1 gives starting intervals broken down by:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Equipment category:</strong> stationary, IT, movable, hand-held, leads; with
                sub-classifications by Class I / II / III where relevant.
              </li>
              <li>
                <strong>Environment:</strong> offices and shops; schools; hotels; public access
                premises; industrial; construction. Each environment is associated with a different
                rate of fault development.
              </li>
            </ul>
            <p>
              For each cell, Table 7.1 gives a starting interval for formal visual inspection and a
              separate (typically longer) starting interval for combined inspection and test. User
              checks are recommended additionally for higher-risk environments.
            </p>
            <p>Examples (illustrative, of the pattern — always read the current Table 7.1):</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Category × Environment</th>
                    <th className="text-center text-white/80 py-2">User check</th>
                    <th className="text-center text-white/80 py-2">Formal visual</th>
                    <th className="text-center text-elec-yellow py-2">Combined I&amp;T</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">IT equipment, office (Class I)</td>
                    <td className="text-center">—</td>
                    <td className="text-center">12 mo</td>
                    <td className="text-center text-elec-yellow">24 mo</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">IT equipment, office (Class II)</td>
                    <td className="text-center">—</td>
                    <td className="text-center">24 mo</td>
                    <td className="text-center text-elec-yellow">48 mo</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Hand-held, schools (Class I)</td>
                    <td className="text-center">Daily</td>
                    <td className="text-center">12 mo</td>
                    <td className="text-center text-elec-yellow">12 mo</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Movable, kitchens / hotels</td>
                    <td className="text-center">Weekly</td>
                    <td className="text-center">6 mo</td>
                    <td className="text-center text-elec-yellow">12 mo</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Hand-held, industrial</td>
                    <td className="text-center">Before use</td>
                    <td className="text-center">6 mo</td>
                    <td className="text-center text-elec-yellow">6 mo</td>
                  </tr>
                  <tr>
                    <td className="py-2">Hand-held, construction site</td>
                    <td className="text-center">Before use</td>
                    <td className="text-center">3 mo</td>
                    <td className="text-center text-elec-yellow">3 mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Two things to take from the pattern: (a) IT in an office can defensibly run on
              extended intervals (24 months and longer) provided the failure-rate data supports it;
              (b) hand-held equipment on a construction site requires both a user check before each
              use AND combined inspection and test at 3-monthly intervals — far shorter than
              &ldquo;annual&rdquo;. A blanket annual policy gets both ends of the spectrum wrong.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020) · Section 7"
            clause={
              <>
                Initial frequencies of inspection and testing should be determined by reference to
                Table 7.1, taking into account the type of equipment, the type of environment in
                which it is used, and the conditions of use. Frequencies should be reviewed in the
                light of experience, including the failure rate of equipment subject to test, and
                adjusted accordingly.
              </>
            }
            meaning="The Table 7.1 grid is the starting point, not the answer. The duty is to start there, then iterate based on failure-rate data. The IET CoP frames this as an active, evidence-based interval policy — not a set-it-and-forget-it choice."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Adjusting intervals — failure rate as the data signal</ContentEyebrow>

          <ConceptBlock
            title="Tighten when failure rate climbs, extend when it stays clean"
            plainEnglish="Each test cycle generates failure-rate data. The IET CoP framework requires that data to feed back into the next interval. A class of equipment that fails frequently has the interval tightened; a class running clean over multiple cycles can defensibly have the interval extended."
            onSite="Track failure rate by category, by environment, by location. The asset register and a CMMS make this trivial. A spreadsheet works at smaller scale."
          >
            <p>The interval-review cycle:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Run the regime at the current interval.</strong> Test rounds happen as
                scheduled.
              </li>
              <li>
                <strong>Capture failure rate by category.</strong> Failure rate is fails / total
                tests, calculated per equipment class, per environment, per location. The
                granularity matters — a 5 % overall failure rate may be 1 % in offices and 12 % on
                site.
              </li>
              <li>
                <strong>Compare against benchmarks.</strong> IET CoP and industry data suggest that
                a category running &lt; 1&ndash;2 % failure rate is in the &ldquo;clean&rdquo; band,
                2&ndash;5 % is normal, and &gt; 5 % indicates the interval is too long for the
                conditions or the equipment type is wrong for the environment.
              </li>
              <li>
                <strong>Adjust.</strong> Tighten the interval (move from 12 to 6 months) for classes
                above the band. Extend the interval (move from 12 to 24 months) for classes
                consistently below the band over multiple cycles. Document the decision and the
                data.
              </li>
              <li>
                <strong>Review on schedule.</strong> Annual review of intervals against the
                cumulative failure data. Capture any environmental or operational change that might
                shift risk.
              </li>
            </ol>
            <p>
              Adjustments need to be evidence-backed and documented. An HSE inspector reviewing the
              regime should be able to see: this is the starting interval (Table 7.1 reference),
              this is the failure-rate data we collected, this is the adjusted interval, this is the
              date of the next review. Without the documentation, an extended interval looks like
              &ldquo;we test less because it&rsquo;s cheaper&rdquo; rather than &ldquo;we test less
              because the data supports it&rdquo;.
            </p>
          </ConceptBlock>

          <Scenario
            title="A class of office IT extending from 24 to 48 months"
            situation="A duty holder has 250 Class II laptops and chargers in offices. Three test cycles at 24-monthly combined inspection and test have produced failure rates of 0.4 %, 0.8 % and 0.6 %. All failures were chargers with damaged flexes (which user checks would also catch). The duty holder is considering extending to 48-monthly combined inspection and test."
            whatToDo="The data supports the extension. Document: (a) Table 7.1 starting interval was 24 months for Class II IT in office; (b) cumulative failure rate over three cycles is 0.6 % (well below the 1–2 % &lsquo;clean&rsquo; threshold); (c) failure mode is exclusively flex damage caught by user checks; (d) policy update introduces a formal annual visual inspection (between combined inspection and test cycles) plus a user-check culture and a damaged-flex reporting line. New interval: 48-monthly combined inspection and test, with annual formal visual inspection in between. Document review date in 24 months."
            whyItMatters="Extending the interval halves the testing cost without increasing risk — provided the data supports it and the documentation is in place. The risk arises if the data is not documented: a future reviewer cannot tell whether the extension is evidence-based or arbitrary, and a future incident is harder to defend."
          />

          {/* Retest interval decision flow diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Retest interval decision flow — Table 7.1 to adjusted interval
            </h4>
            <svg
              viewBox="0 0 800 480"
              className="w-full h-auto"
              role="img"
              aria-label="Retest interval decision flow diagram. Start with Table 7.1 starting interval, capture failure rate per cycle, compare to benchmark, then either tighten if above 5 percent, hold if 1 to 5 percent, or extend if below 1 percent over multiple cycles. Document the decision."
            >
              {/* Step 1 */}
              <rect
                x="290"
                y="20"
                width="220"
                height="60"
                rx="10"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="400"
                y="44"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                START — Table 7.1
              </text>
              <text x="400" y="62" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Category × environment cell
              </text>
              <text x="400" y="74" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Starting interval recorded
              </text>

              {/* Down arrow */}
              <line
                x1="400"
                y1="80"
                x2="400"
                y2="105"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="400,108 395,100 405,100" fill="rgba(255,255,255,0.4)" />

              {/* Step 2 */}
              <rect
                x="260"
                y="115"
                width="280"
                height="60"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.4"
              />
              <text
                x="400"
                y="139"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="bold"
              >
                Run regime, capture failure rate
              </text>
              <text x="400" y="157" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Per category, per environment, per location
              </text>
              <text x="400" y="169" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Need at least 2&ndash;3 cycles for confidence
              </text>

              <line
                x1="400"
                y1="175"
                x2="400"
                y2="200"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="400,203 395,195 405,195" fill="rgba(255,255,255,0.4)" />

              {/* Decision diamond — failure rate */}
              <polygon
                points="400,210 540,275 400,340 260,275"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="400"
                y="265"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Failure rate?
              </text>
              <text x="400" y="282" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                vs benchmark band
              </text>
              <text x="400" y="295" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                (1&ndash;5 % typical)
              </text>

              {/* Three branches */}
              {/* Tighten — left */}
              <line x1="260" y1="275" x2="160" y2="370" stroke="#EF4444" strokeWidth="1.5" />
              <polygon points="160,370 158,360 168,365" fill="#EF4444" />
              <rect
                x="40"
                y="370"
                width="240"
                height="70"
                rx="8"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="160"
                y="392"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                &gt; 5 % → TIGHTEN
              </text>
              <text x="160" y="410" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                Halve the interval, add user checks,
              </text>
              <text x="160" y="423" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                investigate why failure rate is high.
              </text>

              {/* Hold — middle */}
              <line
                x1="400"
                y1="340"
                x2="400"
                y2="370"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="400,373 395,365 405,365" fill="rgba(255,255,255,0.4)" />
              <rect
                x="290"
                y="375"
                width="220"
                height="65"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.4"
              />
              <text
                x="400"
                y="396"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10"
                fontWeight="bold"
              >
                1&ndash;5 % → HOLD
              </text>
              <text x="400" y="413" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Maintain interval, review next
              </text>
              <text x="400" y="426" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                cycle.
              </text>

              {/* Extend — right */}
              <line x1="540" y1="275" x2="640" y2="370" stroke="#22C55E" strokeWidth="1.5" />
              <polygon points="640,370 638,360 648,365" fill="#22C55E" />
              <rect
                x="520"
                y="370"
                width="240"
                height="70"
                rx="8"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="640"
                y="392"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                &lt; 1 % over 2&ndash;3 cycles → EXTEND
              </text>
              <text x="640" y="410" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                Extend interval (e.g. 24 → 48 mo),
              </text>
              <text x="640" y="423" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                document data + decision.
              </text>

              {/* Bottom note */}
              <rect
                x="40"
                y="450"
                width="720"
                height="22"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="466" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                IET CoP 5th Ed. Section 7: starting interval + iterative review = compliance with
                EAWR Reg 4(2).
              </text>
            </svg>
          </div>

          <CommonMistake
            title="Setting intervals once and never reviewing"
            whatHappens="A duty holder set 12-monthly PAT for everything in 2018 and has never adjusted. By 2026 the cumulative failure-rate data shows two distinct populations: site equipment running at 9 % failure (interval too long) and office IT running at 0.4 % failure (interval wasteful). The regime is simultaneously inadequate and overspending — and the documentation does not show any review."
            doInstead="Annual interval review at minimum. Use the failure-rate data per category to adjust. Document the review even if no changes are made. The IET CoP framing makes this an active duty, not a one-off policy decision."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Batched scheduling and contractor coordination</ContentEyebrow>

          <ConceptBlock
            title="Practical scheduling for estates of size — batched, with bounded drift"
            plainEnglish="An estate of any size cannot be tested item-by-item on individual due dates. Items are grouped by site / location / category and tested in rounds. The IET CoP framework allows this provided the maximum drift from individual due dates is bounded and documented."
          >
            <p>The batched-scheduling pattern:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Group by site / location / category.</strong> A single visit covers a
                site\'s portable equipment in a defined window. The contractor / in-house tester
                works through the asset register filtered to that group.
              </li>
              <li>
                <strong>Bound the drift.</strong> Document the maximum permissible drift either side
                of individual due dates (commonly 4&ndash;8 weeks). Items significantly out of range
                get individually scheduled or pulled into an earlier batch.
              </li>
              <li>
                <strong>Recalculate next-due from actual test date.</strong> Critically — do not add
                12 months to the original due date. Add the interval to the actual test date. This
                stops drift compounding cycle on cycle.
              </li>
              <li>
                <strong>Coordinate with contractors.</strong> Test rounds are scheduled into the
                operational calendar with the responsible department. Last-minute changes / clashes
                with operational use are managed.
              </li>
              <li>
                <strong>Catch new arrivals.</strong> Items added since the last batch are tested on
                entry to the register, not deferred to the next batch.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Compounding drift — adding the interval to the original due date instead of the actual test date"
            whatHappens="An item due 1 February is tested on 14 February (within bounded drift). Next-due is set to 1 February the following year — adding 12 months to the original due date. The next test slips to 14 February the year after. Over five cycles, the drift has compounded by two months. By cycle 10, the test is occurring four months after intended — and the interval the duty holder thinks they are running is no longer the interval being run."
            doInstead="Add the interval to the actual test date, not the original due date. Test on 14 February → next-due 14 February the following year. Drift is bounded each cycle and does not compound. Most modern PAT management systems do this correctly by default."
          />

          <SectionRule />

          <ContentEyebrow>Test before next use — high-risk environments</ContentEyebrow>

          <ConceptBlock
            title="The user check + tightened interval combination for the harshest sites"
            plainEnglish="On construction sites and similar environments, the IET CoP combines two layers: a user check before each use (visual, takes seconds) and combined inspection and test at a tightened interval (typically 3-monthly). Either alone is insufficient."
          >
            <p>
              The reasoning behind the &ldquo;test before next use&rdquo; framing is that
              construction sites generate damage faster than formal test intervals can catch.
              Damaged flexes, cracked plugs, casing breaches all develop in days. Annual or
              6-monthly testing leaves a gap during which damaged equipment can be in use.
            </p>
            <p>The two-layer mitigation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>User check before each use.</strong> Plug intact, no scorch / overheating
                marks. Flex unbroken, no crushed sections, no exposed conductors. Casing intact, no
                breaches, no missing screws on protective housings. Strain reliefs in place. Done in
                seconds. Front-line filter for gross damage.
              </li>
              <li>
                <strong>
                  Combined inspection and test at 3-monthly intervals (or as Table 7.1 directs).
                </strong>{' '}
                Full test sequence by a competent person. Catches insulation breakdown, earth
                continuity degradation, and other faults invisible to a visual inspection.
              </li>
            </ul>
            <p>
              The user-check layer is what makes the framework practicable. It does not replace the
              formal test — it provides the high-frequency screen that picks up rapidly developing
              damage between formal tests. Site induction for any user of 110 V equipment should
              include the user-check criteria and an explicit duty: defective equipment, take it out
              of service and report.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020) · Chapter 7"
            clause={
              <>
                A user check by the user of the equipment is the most frequent form of inspection
                and is a means of identifying damage which has occurred during use. The user should
                be encouraged to look for damage to the cable, plug, body of the equipment and any
                signs of overheating, before connecting the equipment to the supply.
              </>
            }
            meaning="The IET CoP frames the user check as a structured layer of the regime, not as informal awareness. Site induction, training, and a means of reporting damaged equipment all flow from this — the user check is part of the duty holder\'s system, not just a personal habit."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'There is no &lsquo;annual PAT&rsquo; rule in law. EAWR Reg 4(2) requires risk-based maintenance &ldquo;so far as is reasonably practicable&rdquo;. IET CoP Table 7.1 + Section 7 is the practical framework.',
              'Three-layer hierarchy: user checks (most frequent, by user) → formal visual inspection → combined inspection and test (least frequent, full electrical).',
              'Starting intervals come from IET CoP Table 7.1 — equipment category × environment grid. Same drill is on a different interval in an office vs a wet site.',
              'Failure-rate data drives interval adjustment. &gt; 5 % → tighten, 1&ndash;5 % → hold, &lt; 1 % over multiple cycles → defensibly extend. Document the data and the decision.',
              'High-risk environments (construction, wet/dirty conditions): user check before each use + combined inspection and test at tightened interval. Both layers, not one.',
              'Batch scheduling is the practical norm for estates. Bound the drift, document the policy, and recalculate next-due from actual test date so drift does not compound.',
              'Annual review of the regime, even if no changes are made. The review itself is the audit-able evidence that the duty is being actively discharged.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is annual PAT testing legally required?',
                answer:
                  'No. There is no fixed interval in EAWR or HSAW. HSE INDG236 explicitly says there is no requirement to test annually. The duty is risk-based — IET CoP Table 7.1 + Section 7 provides the practical framework. Some categories in some environments will end up at annual; many will not.',
              },
              {
                question: "What about insurance — don't insurers require annual PAT?",
                answer:
                  'Some insurance policies specify intervals, often by reference to specific equipment categories or environments. Read the policy: a blanket "annual" insurance requirement may itself be relaxed in practice if the duty holder can demonstrate a documented risk-based regime aligned with IET CoP / HSG107. Talk to the broker / underwriter; the conversation usually moves the requirement once the regime is explained.',
              },
              {
                question: 'Can I extend the test interval to save costs?',
                answer:
                  "Yes — provided the data supports it and the decision is documented. Extending without data is the risk; extending with data is the IET CoP's explicit framework. Capture failure rate per category over multiple cycles, compare against benchmarks, document the methodology and the conclusion. The interval extension is then defensible to HSE, an insurer, or a court.",
              },
              {
                question: "What's the relationship between user checks and PAT testing?",
                answer:
                  "They're different layers of the same regime. User checks are visual, by the user, before use — catching gross damage. PAT (combined inspection and test) is electrical, by a competent person, at a documented interval — catching faults invisible to visual inspection. Both are needed in higher-risk environments; user checks alone are insufficient and PAT alone is insufficient when failure rates are high.",
              },
              {
                question: 'A piece of equipment is overdue for retest. What do I do?',
                answer:
                  'Take it out of service until it has been retested. Reflecting that the test interval is the period within which the equipment is presumed safe; outside that interval, the presumption is gone. For high-risk environments / equipment, this is non-negotiable. For low-risk office equipment that has slipped a few weeks, the practical response is the same: prioritise the retest, document the slip, and review why it was missed (calendar drift, contractor lateness, register error).',
              },
              {
                question: 'How does the test-interval policy interact with the asset register?',
                answer:
                  'The register is where the policy is operationalised. Each row carries a test interval (linked to the IET CoP Table 7.1 category for that item) and a next-due date. The register feeds scheduling. Policy changes (e.g. extending IT from 24 to 48 months) are applied across all relevant register rows, with the change documented in the policy file referenced from the register.',
              },
              {
                question: 'Hire-fleet PAT — should the test happen on hire-out or on hire-in?',
                answer:
                  'On hire-in (return to depot before the next hire-out). The hire firm tests the equipment after each hire so the next customer receives recently verified kit. Some firms test on hire-out instead; both produce a test certificate, but the hire-in pattern minimises the time between test and use for any given customer. Either way, the duty holder receiving hired equipment should verify the test certificate on receipt and accept-or-re-test.',
              },
              {
                question: 'How do I justify a longer test interval to a sceptical client?',
                answer:
                  'Show them the data. Failure-rate history per category, IET CoP Table 7.1 reference, HSE INDG236 confirming there is no fixed interval. The conversation is generally won by evidence. The duty holder still has to be comfortable with the decision — but a 24-month interval on Class II IT in a dry office, with a clean failure history, is a defensible position with the data.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Retest period planning — Module 5.4" questions={quizQuestions} />

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
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-5-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.5 Certification and reporting requirements
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

export default PATTestingModule5Section4;
