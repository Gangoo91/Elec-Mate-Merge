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
    id: 'patm1-s4-no-statutory',
    question:
      'Which statement most accurately reflects the legal position on PAT testing frequency?',
    options: [
      'Annual testing is mandatory under EAWR.',
      'There is no statutory frequency. HSG107 §10 and IET CoP §7 / Table 7.1 require frequency to be set by risk assessment, taking into account equipment type, environment, user, and history.',
      'Quarterly testing is mandatory on construction sites under PUWER.',
      'Frequency is set by the manufacturer of the equipment.',
    ],
    correctIndex: 1,
    explanation:
      'HSG107 §10 is unambiguous: there is no statutory frequency. IET CoP Table 7.1 publishes initial starting frequencies which the duty-holder revises based on inspection/test history. Selling fixed annual cycles as the law is one of the most common compliance misrepresentations.',
  },
  {
    id: 'patm1-s4-tablefactors',
    question:
      'IET CoP §7 lists the four primary inputs to a PAT frequency decision. Which set is correct?',
    options: [
      'Cost, customer preference, manufacturer recommendation, label colour.',
      'Equipment type and class; environment / location; type of user (skill, behaviour); historical record of test failures and defects.',
      'Voltage, current, frequency, IP rating.',
      'Geographic region, building age, building height, fire-rating.',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP §7 names these four factors. They are the inputs that must drive frequency. Cost is a constraint; customer preference is irrelevant to the legal duty; manufacturer recommendation is a starting input but not the determinant.',
  },
  {
    id: 'patm1-s4-revise',
    question:
      'A PAT regime ran for 24 months at quarterly frequency on construction-site hand tools. Defect rate is consistently 1-2 % per cycle, and failed items show wear consistent with the 3-month interval. What does HSG107 / IET CoP say about the frequency?',
    options: [
      'It must remain quarterly indefinitely.',
      'The duty-holder reviews the frequency. A consistently low and stable defect rate is evidence the interval is appropriate or could potentially be extended; a rising defect rate would justify shortening it. The review is the active duty — sticking with the original frequency without review is itself a defect in the programme.',
      'The frequency should automatically halve.',
      'Frequency reviews are advisory only.',
    ],
    correctIndex: 1,
    explanation:
      'HSG107 §11 and IET CoP §7.4 frame frequency-setting as iterative. The first cycle uses Table 7.1 starting points; subsequent cycles revise based on data. A duty-holder who has not reviewed frequencies in 24 months has not run the programme HSG107 describes — they have run a calendar.',
  },
  {
    id: 'patm1-s4-event',
    question:
      'A workplace flood damages stock and equipment on the ground floor. The cleanup takes a week. What does PUWER Reg 6 require for the affected portable equipment?',
    options: [
      'Continue the existing schedule.',
      'PUWER Reg 6 specifies inspection "each time exceptional circumstances which are liable to jeopardise the safety of the work equipment have occurred". The flood is exactly such a circumstance — the affected equipment requires a triggered formal visual + combined inspection-and-test before being returned to service, regardless of the calendar interval.',
      'Wait until the next quarterly inspection.',
      'Test only equipment that visibly got wet.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 6 is event-driven as well as interval-driven. Floods, fires, mechanical incidents (forklift crush), thermal events, near-misses — all trigger out-of-cycle inspection. The fact that an item "looks dry" is not a substitute for the test, because dry-looking insulation can have absorbed moisture that lowers IR.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'IET CoP Table 7.1 publishes starting frequencies for inspection and testing. Which is the most accurate description of how Table 7.1 should be used?',
    options: [
      'It is a mandatory minimum schedule.',
      'It is a starting suggestion for the first cycle of a new programme. The duty-holder reviews and revises based on the inspection/test history (defects found, near-misses, environment changes). Table 7.1 is explicitly framed as initial guidance, not a fixed rule.',
      'It applies only to public-sector duty-holders.',
      'It overrides any risk assessment.',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP §7.1-7.4 frames Table 7.1 as initial starting frequencies. The duty-holder is required to review and revise. Treating Table 7.1 as a fixed rule misses the active-management requirement of HSG107 §11.',
  },
  {
    id: 2,
    question:
      'Which environment does IET CoP Table 7.1 typically suggest the SHORTEST starting frequencies for hand-held equipment?',
    options: [
      'Office (low-risk, indoor, dry).',
      'Construction site, outdoors, wet/dirty environments — typically 1-3 months for hand-held equipment combined inspection-and-test, with formal visual at shorter intervals.',
      'Hospital wards.',
      'Educational settings.',
    ],
    correctAnswer: 1,
    explanation:
      'Construction and similar harsh environments have the highest defect rates and the shortest starting frequencies. The IET CoP recognises this with substantially shorter intervals than the office environment. The frequency reflects the risk-of-deterioration profile.',
  },
  {
    id: 3,
    question:
      'A duty-holder argues for ANNUAL testing of hand-held tools on construction sites. What is the legal exposure?',
    options: [
      'No exposure — annual testing is industry norm.',
      'Significant. IET CoP Table 7.1 starting frequencies for hand-held tools on construction are typically much shorter than annual. A duty-holder applying annual frequencies to a higher-risk environment must be able to evidence the risk-assessment reasoning that justifies the longer interval — and absent that, the position is indefensible against HSG107 §10-11 and the Edwards balancing test.',
      'Annual testing on construction sites is mandatory.',
      'Frequency is irrelevant if visual checks are done.',
    ],
    correctAnswer: 1,
    explanation:
      'The construction environment is one of the highest-defect-rate categories in HSE incident data. Long intervals require substantially stronger justification than the IET CoP starting points. A flat annual regime applied to mixed environments fails the equipment-environment-matching test that HSE inspections look for.',
  },
  {
    id: 4,
    question:
      'PUWER 1998 Reg 6(1)(b) requires inspection of work equipment "exposed to conditions causing deterioration which is liable to result in dangerous situations". Independent of any IET CoP guidance, what does Reg 6(1)(b) impose?',
    options: [
      'Nothing additional — IET CoP frequencies are sufficient.',
      'A statutory duty to inspect at suitable intervals, where "suitable" is judged against the specific deteriorating conditions. Reg 6 frequencies must be defendable on the facts of the work equipment and its environment, separately from any guidance frequency.',
      'Annual inspection only.',
      'Reg 6 does not apply to electrical equipment.',
    ],
    correctAnswer: 1,
    explanation:
      'PUWER Reg 6 is a statutory duty in its own right. The IET CoP starting frequencies are useful but they are not the legal test — the legal test is "suitable intervals" judged on the conditions. A frequency that satisfies IET CoP but fails Reg 6(1)(b) on the facts of the case can still be a contravention.',
  },
  {
    id: 5,
    question:
      'A duty-holder reviews 18 months of PAT data. The defect rate on extension leads is 8 %, while on hand-held tools in the same environment it is 1 %. What does the data suggest about frequency?',
    options: [
      'Both should be tested together.',
      'The extension-lead frequency is too long — they are deteriorating faster than the inspection interval catches. Either shorten the lead test cycle or replace the worst-affected leads with a more robust spec. The hand-tool frequency is appropriate or could potentially be extended.',
      'Defect rate is irrelevant to frequency.',
      'Increase the hand-tool frequency to match.',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP §7.4 and HSG107 §11 use defect rate as one of the primary signals for frequency adjustment. Different categories within the same environment can warrant different frequencies — and the data is the defendable basis for the difference.',
  },
  {
    id: 6,
    question:
      'IET CoP §7 distinguishes between "formal visual inspection" frequency and "combined inspection-and-test" frequency. How are they typically related?',
    options: [
      'They are the same.',
      'Formal visual frequency is typically MORE FREQUENT than combined inspection-and-test frequency. The visual is faster, cheaper, catches the bulk of defects (flex damage, plug damage), and serves as an early warning between full electrical tests.',
      'Formal visual is less frequent.',
      'Combined test is monthly; formal visual is annual.',
    ],
    correctAnswer: 1,
    explanation:
      'The economy of the four-pillar HSG107 model rests on stratification: user checks daily, formal visual at shorter intervals, combined inspection-and-test at the longer (and more expensive) interval. This catches the high-prevalence defects without over-testing.',
  },
  {
    id: 7,
    question:
      'A workplace had a previous PAT history of consistent 100 % pass rates over 3 years on annual cycles for office equipment. Should the frequency be reduced to 18-month or 24-month?',
    options: [
      'Yes, mechanically.',
      'Possibly, but the decision must be deliberate, recorded, and supported. HSG107 §11 and IET CoP §7.4 explicitly contemplate extending intervals where the data supports it — but a 100 % pass rate may also indicate the test methodology is not catching defects (the "false confidence" risk). Consider tightening the formal visual depth before extending the combined-test cycle.',
      'No — all frequencies must be permanent.',
      'Yes, automatically — duty-holders cannot test more often than necessary.',
    ],
    correctAnswer: 1,
    explanation:
      'Extending frequencies is permitted by guidance but must be evidence-based. A 100 % pass rate over three years is one signal. Verifying that the visual inspection is rigorous and the test sequence is being applied correctly is the prerequisite — extending intervals on the back of insufficient testing would fail the Edwards balancing test if a defect later emerged.',
  },
  {
    id: 8,
    question:
      'Equipment is moved from one site to another during a refurbishment. What does PUWER Reg 6(1)(a) say about its inspection?',
    options: [
      'No additional inspection needed.',
      'PUWER Reg 6(1)(a) requires inspection of work equipment after assembly at a new site or in a new location, before being put into service, where its safety depends on installation conditions. Equipment relocated during refurb falls under this trigger and should be formal-visual inspected at minimum before re-energisation.',
      'Only equipment that is bolted down is in scope.',
      'The receiving site is automatically responsible.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 6(1)(a) is event-triggered. Relocation is an opportunity for damage and an installation-condition change. The IET CoP §10 advice on triggered formal visual at relocation aligns with the Reg 6(1)(a) statutory duty.',
  },
  {
    id: 9,
    question: 'How does the IET CoP treat newly-purchased equipment in respect of frequency?',
    options: [
      'New equipment is exempt for the first 12 months.',
      'IET CoP §7.5 advises a formal visual inspection upon entry to service to confirm the item is undamaged and the markings match the procurement spec. The first combined inspection-and-test follows the Table 7.1 starting frequency for the equipment category and environment. New equipment is NOT exempt.',
      'New equipment requires immediate combined inspection-and-test.',
      'Frequency starts only after the warranty expires.',
    ],
    correctAnswer: 1,
    explanation:
      'A formal visual at entry-to-service catches damage in transit, mis-shipped items, or counterfeit goods — and starts the asset register entry. The first combined test follows the standard cycle. The "exempt for 12 months" position is a sales argument, not a CoP position.',
  },
  {
    id: 10,
    question: 'Why does HSG107 §10 explicitly warn against unnecessarily frequent testing?',
    options: [
      'Cost.',
      'Excessive disconnect/reconnect cycles introduce wear at plug terminations and accessories; mechanical handling damages flexes; and routine over-testing produces a volume of data that obscures the defects that matter. The result is that an over-frequent regime can paradoxically reduce safety while increasing cost.',
      'Carbon footprint.',
      'Insurance reasons.',
    ],
    correctAnswer: 1,
    explanation:
      'HSG107 §10 is one of the rare HSE guidance points that argues against doing more. The Edwards balancing test cuts both ways: in this niche, the cost-of-precaution side includes the additional risks the precaution itself introduces. Selling more-frequent-than-necessary testing is not just expensive; it is contrary to HSE guidance.',
  },
];

const PATTestingModule1Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Frequency of inspection and testing | PAT Module 1.4 | Elec-Mate',
    description:
      'IET CoP §7 / Table 7.1 starting frequencies, HSG107 §10-11 risk-based intervals, PUWER Reg 6 suitable intervals, defect-rate review, and event-triggered inspection — how to set, record and revise PAT frequencies that survive HSE scrutiny.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 4"
            title="Frequency of inspection and testing"
            description="The most-misunderstood part of PAT. There is no statutory frequency — only the duty to inspect at suitable intervals, set by risk assessment, reviewed against history, and recorded. IET CoP Table 7.1 is a starting point, not a rule."
            tone="yellow"
          />

          <TLDR
            points={[
              'There is no statutory frequency. HSG107 §10 is explicit. IET CoP Table 7.1 publishes initial starting frequencies as a suggestion for the first cycle only.',
              'Frequency is driven by four factors (IET CoP §7): equipment type and class; environment / location; type of user; history of defects.',
              'Table 7.1 stratifies frequency by equipment category (hand-held, portable, movable, stationary, fixed, IT, leads) AND by environment (office, school, industrial, construction, hire). Hand-held in construction has the shortest cycle; stationary in office the longest.',
              'Formal visual inspections are typically more frequent than combined inspection-and-test, because they are faster, cheaper, and catch the bulk of defects (flex / plug / casing).',
              'Frequencies must be REVIEWED against defect-rate data. A duty-holder who has not adjusted frequencies in 24+ months has run a calendar, not a programme.',
              'PUWER Reg 6 is event-triggered too: floods, fires, mechanical incidents, refurbishments, and exceptional circumstances trigger out-of-cycle inspection regardless of the calendar.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Cite IET CoP §7 and Table 7.1 as the starting reference for PAT frequency, and explain why Table 7.1 is initial guidance, not a fixed rule',
              'List the four factors driving frequency under IET CoP §7 (equipment, environment, user, history) and apply them to any equipment / environment combination',
              'Distinguish formal-visual frequency from combined inspection-and-test frequency, and explain why they are typically different',
              'Set defendable frequencies for office, school, industrial and construction environments, using Table 7.1 starting frequencies as the first cycle benchmark',
              'Use defect-rate data to review and revise frequencies, with a documented reasoning trail that survives HSE scrutiny',
              'Identify PUWER Reg 6 event triggers (installation conditions, exceptional circumstances) that require out-of-cycle inspection regardless of the calendar',
              'Explain HSG107 §10 — why over-frequent testing can paradoxically reduce safety — and apply the Edwards balancing test to a frequency proposal',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The legal position — there is no statutory frequency</ContentEyebrow>

          <ConceptBlock
            title="Why there is no fixed interval in any UK statute"
            plainEnglish="No UK statute mandates a specific PAT testing interval. EAWR Reg 4(2) requires maintenance 'as may be necessary to prevent danger'. PUWER Reg 6 requires inspection 'at suitable intervals'. HSWA s.2 requires safety 'so far as is reasonably practicable'. None of these has a number — and that is by design, because a fixed interval would always be wrong for some equipment and right for none."
            onSite="When a client asks for the legally-required interval, the legally-correct answer is: there is no fixed interval. The intervals you set are the duty-holder choice, justified by risk assessment, with the IET CoP and HSG107 as guidance benchmarks."
          >
            <p>
              The reason for the deliberate absence of fixed frequencies is the diversity of
              equipment and environments. A 13 A IEC lead in a quiet office sees barely any
              mechanical handling and lives in a benign environment; a 13 A IEC lead in a hire shop
              sees thousands of plug cycles per year and rough handling. A fixed annual frequency
              would over-test the office lead (introducing wear at terminations and creating false
              confidence) and under-test the hire lead (missing real defects). HSE and IET have both
              consistently rejected fixed frequencies for that reason.
            </p>
            <p>
              The duty-holder framing is therefore not "what does the law require" but "what does
              risk assessment justify, with what evidence, reviewable when the data tells me to
              revise it". That framing is the defendable answer to any HSE inspector or claim.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE HSG107 (4th Edition) · paragraph 10"
            clause={
              <>
                There is no statutory requirement for the testing of electrical equipment to take
                place at fixed intervals. The frequency of inspection and testing should be
                determined by the duty-holder, taking into account the type of equipment, how often
                and how it is used, and the environment in which it is used.
              </>
            }
            meaning="The single most important paragraph in HSG107 on frequency. It is the rebuttal to fixed-annual sales pitches, the support for risk-based intervals, and the framing that drives every IET CoP §7 decision."
          />

          <ConceptBlock
            title="The four factors of IET CoP §7"
            plainEnglish="IET CoP §7 lists four factors that drive frequency. They are not optional inputs — they are the evidential basis for any defendable frequency. Document each, score it (formally or informally), and the result is the starting frequency. Then revise based on outcome data."
          >
            <p>The four factors:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Equipment type and class.</strong> Hand-held equipment is at higher risk
                than stationary; Class I depends on a working CPC and so the consequence of a fault
                is touch-voltage and disconnection-time risk; Class II depends on insulation
                integrity. Different equipment categories have different risk profiles and deserve
                different intervals.
              </li>
              <li>
                <strong>Environment / location.</strong> The classic Table 7.1 axis. Office / school
                / industrial / construction / hire / wet rooms. Each environment has its own
                deterioration rate.
              </li>
              <li>
                <strong>Type of user.</strong> The IT manager who is the only user of a single
                desktop is a different risk than a multi-user open-plan staff kitchen. Trained site
                operatives following a tool inspection routine are a different risk from temporary
                agency staff with no induction.
              </li>
              <li>
                <strong>History of defects.</strong> Past test results, defects found at user
                checks, near-misses, equipment-specific failure modes. The single most important
                input on the second cycle and beyond.
              </li>
            </ol>
            <p>
              The first cycle of a new programme draws frequency from Table 7.1 because the history
              input is empty. From the second cycle on, history dominates: the data tells you
              whether the original frequency was too short (consistent low defect rate, room to
              extend), too long (rising defect rate, must shorten), or appropriate (steady,
              defendable rate).
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>IET CoP Table 7.1 — starting frequencies</ContentEyebrow>

          <ConceptBlock
            title="What Table 7.1 actually publishes"
            plainEnglish="IET CoP Table 7.1 cross-references equipment categories (hand-held, portable, movable / transportable, stationary, fixed, IT equipment, extension leads / multi-way adaptors) against environments (commercial / public / school / industrial / construction / hire / equipment used outdoors / hotel / office). Each cell gives a starting frequency for formal visual inspection AND combined inspection-and-test."
            onSite="The starting frequencies in Table 7.1 are typical orders of magnitude — months for hand-held in construction, years for stationary in office. The exact numbers vary across editions of the CoP and against environment specifics; consult the live edition."
          >
            <p>Indicative pattern (consult IET CoP 5th Ed, 2020 Table 7.1 for exact figures):</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Equipment</th>
                    <th className="text-left text-white/80 py-2">Office / low-risk indoor</th>
                    <th className="text-left text-white/80 py-2">Industrial</th>
                    <th className="text-left text-white/80 py-2">Construction / hire</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Hand-held</strong>
                    </td>
                    <td>FV ~12 m / I&amp;T ~24 m</td>
                    <td>FV ~6 m / I&amp;T ~12 m</td>
                    <td>FV ~1 m / I&amp;T ~3 m</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Portable / movable</strong>
                    </td>
                    <td>FV ~24 m / I&amp;T ~48 m</td>
                    <td>FV ~6 m / I&amp;T ~12 m</td>
                    <td>FV ~3 m / I&amp;T ~6 m</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Stationary</strong>
                    </td>
                    <td>FV ~24 m / I&amp;T ~48 m</td>
                    <td>FV ~12 m / I&amp;T ~24 m</td>
                    <td>FV ~6 m / I&amp;T ~12 m</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Fixed equipment</strong>
                    </td>
                    <td>FV ~24 m / I&amp;T ~48 m</td>
                    <td>FV ~12 m / I&amp;T ~24 m</td>
                    <td>FV ~6 m / I&amp;T ~12 m</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>IT equipment</strong>
                    </td>
                    <td>FV ~24 m / I&amp;T ~48 m</td>
                    <td>FV ~12 m / I&amp;T ~24 m</td>
                    <td>n/a typically</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <strong>Extension leads / adaptors</strong>
                    </td>
                    <td>FV ~12 m / I&amp;T ~24 m</td>
                    <td>FV ~6 m / I&amp;T ~12 m</td>
                    <td>FV ~1 m / I&amp;T ~3 m</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              FV = formal visual inspection; I&amp;T = combined inspection-and-test. These are
              indicative of the magnitude — refer to IET CoP 5th Ed Table 7.1 for the precise
              numbers, which the duty-holder should be using as the first-cycle starting point and
              then revising against history.
            </p>
            <p>Two pattern observations matter:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Formal visual is always more frequent than combined I&amp;T.</strong> The
                visual catches the high-prevalence defects fast and cheap; the combined test catches
                the rest at a longer cycle.
              </li>
              <li>
                <strong>Hand-held + harsh environment = shortest interval.</strong> Hand-held tools
                on construction sites have the highest defect rate of any combination, and the
                shortest starting frequency reflects that.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice (5th Ed, 2020) · §7.4"
            clause={
              <>
                The frequency of inspection and testing should be determined by the duty-holder and
                reviewed in the light of experience. Initial frequencies given in Table 7.1 may be
                used as a starting point, but should be amended by the duty-holder taking into
                account the actual results of previous inspections and tests.
              </>
            }
            meaning="Two duties: set initial frequencies (Table 7.1 is the reference); review and revise based on actual results. Both duties must be visible in the records — a programme that uses Table 7.1 as the static rule is incomplete."
          />

          <Scenario
            title="The construction-site freelance"
            situation="A small electrical contractor sets PAT frequency on their hand-held tools (drills, breakers, grinders, jigsaws) at annual cycles, using a generic 'PAT' contractor on calendar dates. After 3 years they look at the data: pass rate is 100 %, no defects ever recorded. They consider extending to 24-month cycles."
            whatToDo="Pause before extending. Two questions: (1) Is the formal visual rigorous enough to find the wear that hand-held tools accumulate? Frequent flex damage at strain reliefs is a typical hand-held defect — if the test never finds one, the test methodology may be inadequate, not the tools perfect. (2) Are user-level damages being reported? If users are repairing or replacing damaged equipment off-record, the PAT data does not see the defects. Investigate before extending. The defendable position may be to KEEP the annual cycle (or shorten it to match IET CoP construction starting frequencies) AND to re-train the formal-visual depth — not extend."
            whyItMatters="A 100 % pass rate over 3 years can mean the regime is well-matched OR that the regime is missing defects. The two interpretations have opposite implications for frequency. The duty-holder must investigate which is true before acting on the data."
          />

          <CommonMistake
            title="Setting frequency from Table 7.1 then ignoring it"
            whatHappens="The duty-holder sets initial frequencies from Table 7.1 in year 1, then runs the same calendar for years 2-5 without review. Defect rate climbs from 1 % to 7 % over four years (cable ageing, equipment ageing, environment changes), but no review is documented. After an incident, the records show the duty-holder saw the rising defect rate and did not act on it — the worst possible position under HSG107 §11."
            doInstead="Build frequency review into the programme. Annual review of defect-rate data per equipment category and environment. Document the review, document any frequency changes, document the reasoning. The review is itself the evidence that distinguishes a programme from a calendar."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Defect-rate review and revision</ContentEyebrow>

          <ConceptBlock
            title="What defect-rate data tells you about frequency"
            plainEnglish="The defect rate per inspection cycle is the primary diagnostic for whether the cycle is appropriate. A consistently low rate suggests the cycle is fine or could potentially be extended; a rising rate suggests it should shorten; an extremely low rate over years either confirms the regime or warns the test methodology may not be catching defects."
          >
            <p>
              IET CoP §7.4 and HSG107 §11 align on the principle. The data signals to listen for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Stable low rate (1-3 % per cycle).</strong> Cycle appropriate. Maintain;
                consider extending in low-risk environments after at least 2 cycles of consistent
                data.
              </li>
              <li>
                <strong>Rising rate.</strong> Cycle is too long for the conditions. Shorten,
                investigate cause (equipment ageing, environment change, user behaviour, supply
                changes), and address the cause where possible.
              </li>
              <li>
                <strong>Stable moderate rate (5-10 %).</strong> Consider whether (a) the cycle is
                appropriate and the rate reflects environment, or (b) shortening would reduce
                user-facing defects substantially. Cost-of-precaution analysis per Edwards.
              </li>
              <li>
                <strong>Stable extremely low or zero rate over 3+ cycles.</strong> Two
                interpretations: either the regime is well-matched (defendable, may extend) or the
                methodology is missing defects (not defendable; investigate first). The
                test-methodology audit is the defendable next step.
              </li>
              <li>
                <strong>Spike then return to baseline.</strong> Suggests an event-driven cause
                (refurb, batch of new equipment, user-behaviour change). Investigate the spike,
                document, return cycle to normal.
              </li>
            </ul>
            <p>
              The review process — defect-rate analysis, reasoning, documented frequency decision —
              is itself the artefact that satisfies HSG107 §11. Without it, the duty of "review in
              the light of experience" has not been discharged.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The false-confidence risk and HSG107 §10"
            plainEnglish="HSG107 §10 makes a counter-intuitive argument: testing more often than necessary can REDUCE safety. Excessive disconnect/reconnect cycles wear plug terminations and accessories. Mechanical handling damages flexes. Routine over-testing also produces a flood of pass results that obscures the rare defect — and trains everyone to ignore the data."
          >
            <p>The mechanism:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Each plug-out / plug-in cycle adds wear at the strain relief, the cord grip, and the
                plug pins. A 2-month cycle on an office IEC lead introduces 60 such cycles across 10
                years that would not have happened on a 12-month cycle.
              </li>
              <li>
                Each handling event is an opportunity for damage — drops, kinks, twists at the
                strain relief.
              </li>
              <li>
                Pass-result fatigue: when 99 % of items pass, the inspector\'s attention drops on
                the 1 % that fail. The data drowns the signal.
              </li>
              <li>
                The Edwards balancing test cuts both ways: more testing increases cost AND
                introduces wear. If the marginal benefit (catching defects) is lower than the
                marginal cost (introducing defects), more testing makes things worse.
              </li>
            </ul>
            <p>
              This is the rare HSE position that is not "do more". HSG107 §10 is one of the most
              under-quoted paragraphs in the regime — and one of the most useful when defending a
              risk-based interval against a client who wants quarterly testing for everything.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE HSG107 (4th Edition) · paragraph 10 (continued)"
            clause={
              <>
                Testing too frequently can be wasteful and can lead to the unnecessary handling of
                equipment, including the disconnection of equipment, which can increase the risk of
                damage and danger.
              </>
            }
            meaning="The under-quoted half of HSG107 §10. Over-testing is wasteful AND can be unsafe. The defendable frequency is the one that catches the defects that matter without introducing new ones."
          />

          <SectionRule />

          <ContentEyebrow>Event-triggered inspection — beyond the calendar</ContentEyebrow>

          <ConceptBlock
            title="PUWER Reg 6(1)(a) and 6(2) — when the calendar does not bind"
            plainEnglish="PUWER Reg 6 mandates inspection on certain triggers regardless of the calendar interval. New installations or relocations (Reg 6(1)(a)) and exceptional circumstances liable to compromise safety (Reg 6(2)) both trigger inspection independent of the cycle."
          >
            <p>Common Reg 6 triggers in PAT context:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>New equipment entering service</strong> — formal visual + record entry,
                before first use.
              </li>
              <li>
                <strong>Equipment relocated to a new site</strong> — formal visual at minimum before
                re-energisation; combined inspection-and-test if the relocation involves significant
                handling or change of environment.
              </li>
              <li>
                <strong>Floods, fires, water ingress</strong> — affected equipment requires
                triggered inspection. "It looks dry" is not an acceptable substitute; absorbed
                moisture lowers IR and is invisible.
              </li>
              <li>
                <strong>Mechanical incidents</strong> — forklift crush, dropped from height, impact
                damage. Affected equipment is out of service until inspected.
              </li>
              <li>
                <strong>Thermal events</strong> — overheating reported by user, distinctive smell,
                discolouration. Trigger inspection; do not return to service on user assurance.
              </li>
              <li>
                <strong>Near-misses</strong> — RCD operated on the circuit, MCB tripped without
                obvious cause, tingling reported by user. Investigate and trigger inspection of the
                equipment in the loop.
              </li>
              <li>
                <strong>Refurbishment / construction works in the area</strong> — equipment in
                affected zones may have been moved, damaged, or had ingress without the duty-holder
                seeing it. Risk-assess and trigger as appropriate.
              </li>
            </ul>
            <p>
              The duty-holder programme should explicitly call out event-triggered inspection in the
              procedures, because relying on the calendar alone fails Reg 6 in any incident
              involving an exceptional circumstance.
            </p>
          </ConceptBlock>

          <Scenario
            title="The post-flood return-to-service question"
            situation="A small commercial unit has a flood overnight (mains water leak, not foul). The cleanup takes a weekend. On Monday morning the duty-holder needs to bring the office back online: kettles, microwave, IT, lighting, photocopier. The previous PAT was 4 months ago, all passed."
            whatToDo="Triggered formal visual + combined inspection-and-test of all affected equipment before re-energisation, regardless of the calendar interval. PUWER Reg 6(1)(b) trigger ('exceptional circumstances which are liable to jeopardise the safety of the work equipment'). The IR test in particular is critical: water that appears to have evaporated can leave residual conductive paths through paper insulation, hygroscopic plastics, and dust. A 'dry-looking' microwave can have low IR. Document the triggered inspection and the readings; resume normal cycle after."
            whyItMatters="Skipping the triggered inspection is one of the most common Reg 6 contraventions identified in HSE post-incident inspections. The 'but I had a recent PAT' defence does not survive Reg 6(1)(b) — the calendar interval is the cycle frequency, not a substitute for event-driven inspection."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Setting and defending a frequency</ContentEyebrow>

          <ConceptBlock
            title="The defendable frequency package"
            plainEnglish="A frequency that survives HSE scrutiny is not a number on a calendar — it is the number, plus the reasoning behind it, plus the data backing the reasoning, plus the review schedule that revises it. All four elements are needed for the position to be defendable."
          >
            <p>The four-element package:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The number.</strong> The actual interval per equipment category and
                environment.
              </li>
              <li>
                <strong>The reasoning.</strong> Reference to IET CoP Table 7.1 starting points, plus
                any deviation justified by the four factors (equipment, environment, user, history).
                One paragraph per category-environment pair is sufficient.
              </li>
              <li>
                <strong>The data.</strong> Defect-rate from previous cycles, near-miss reports,
                user-check findings. On a new programme: a placeholder noting that data will drive
                subsequent revision.
              </li>
              <li>
                <strong>The review schedule.</strong> When the frequencies will be reviewed (e.g.
                annually) and what data will trigger ad-hoc review (e.g. defect-rate above 5 %, an
                incident, an environment change).
              </li>
            </ol>
            <p>
              Each of these four is short. The whole package for a typical small employer is a page
              or two. The point is that they exist, are dated, are signed off, and are
              version-controlled — not that they are voluminous.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Selling 'annual everything' as a turn-key compliance package"
            whatHappens="A PAT contractor offers a package: 'Annual PAT testing of every item, fully compliant with EAWR, BS 7671 and HSG107'. The duty-holder buys it. After an incident, the duty-holder discovers (a) HSG107 §10 explicitly argues against fixed annual cycles for low-risk equipment, (b) construction-site hand tools should have been on much shorter cycles, (c) wet-room equipment should have been on much shorter cycles still, and (d) the contractor has no risk assessment, no defect-rate review, no event-trigger procedure. The package is a calendar, not a programme."
            doInstead="Run risk-based, environment-stratified frequencies from the start. Office Class II IT on the longer end of Table 7.1. Construction hand-held on the shorter end. Wet-rooms on shorter still. Document the reasoning. Review against defect data. Build event triggers into the procedure. Sell that as the package — and price it accordingly. The fixed-annual approach is a false economy and a legal exposure."
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
              'There is no statutory frequency. HSG107 §10 is explicit. IET CoP Table 7.1 publishes initial starting frequencies as suggestion for the first cycle.',
              'Four factors drive frequency (IET CoP §7): equipment type and class; environment; user; history of defects.',
              'Hand-held in construction = shortest interval. Stationary in office = longest. Match equipment to environment from Table 7.1, then revise on data.',
              'Formal visual is always more frequent than combined inspection-and-test. The visual catches the bulk of defects fast and cheap.',
              'Frequencies must be REVIEWED, typically annually, against defect-rate data. A duty-holder who has not reviewed in 24+ months has run a calendar, not a programme.',
              'PUWER Reg 6 is event-triggered. Floods, fires, mechanical incidents, refurbishment, near-misses all trigger out-of-cycle inspection regardless of the calendar.',
              'Over-testing can REDUCE safety (HSG107 §10) — wear at terminations, mechanical handling, false confidence. The Edwards balancing test cuts both ways.',
              'A defendable frequency is a number + reasoning + data + review schedule. Each element is short. All four are needed.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'How often should I PAT test office equipment?',
                answer:
                  'There is no fixed answer. IET CoP Table 7.1 starting frequencies for office / low-risk indoor are typically in the 24-48 month range for combined inspection-and-test, with formal visual at shorter intervals. Adjust based on the four factors (equipment class, environment specifics, users, defect history). Review annually against defect data.',
              },
              {
                question: 'Are construction-site PAT intervals shorter than office?',
                answer:
                  'Yes. Construction is one of the harshest environments — frequent mechanical handling, dust and water ingress, temporary distribution arrangements, contractor turnover. IET CoP Table 7.1 shows substantially shorter starting frequencies, typically months rather than years for hand-held equipment combined inspection-and-test. Setting an annual cycle for construction hand-tools without a strong risk-assessment reason is indefensible.',
              },
              {
                question: 'Do I need to test new equipment before first use?',
                answer:
                  'Formal visual inspection on entry to service is the IET CoP §7.5 advice — it catches transit damage, mis-shipped items, or counterfeit goods, and starts the asset register entry. The first combined inspection-and-test follows the standard cycle for the equipment / environment. New equipment is not exempt from the regime; the formal visual is the entry-to-service hygiene step.',
              },
              {
                question: 'Can I extend my PAT intervals if I have a clean defect history?',
                answer:
                  'Possibly, but with caution. IET CoP §7.4 and HSG107 §11 explicitly contemplate extending intervals where the data supports it. Two prerequisites: (a) the data must come from a rigorous methodology — a 100 % pass rate from a superficial test means nothing; and (b) the extension must be reviewed against subsequent data. Extending intervals on the back of a thin testing methodology is not defendable.',
              },
              {
                question: 'What do I do after a flood / fire / mechanical incident?',
                answer:
                  'PUWER Reg 6(1)(b) triggers an out-of-cycle inspection of all affected equipment before return to service, regardless of the calendar interval. Combined inspection-and-test, IR test in particular (residual moisture is invisible and lowers IR). Document the triggered inspection separately from the routine cycle. The "but it was tested 4 months ago" defence does not survive Reg 6(1)(b).',
              },
              {
                question: 'Is HSG107 a legal requirement, or is it just guidance?',
                answer:
                  'It is HSE guidance, not law. Following HSG107 generally demonstrates compliance with EAWR Reg 4(2). Diverging from it is permissible if the alternative produces equivalent or better risk control, but the duty-holder must show the reasoning. Diverging without evidence is the opposite of defensible.',
              },
              {
                question: 'Why does HSG107 warn AGAINST testing too often?',
                answer:
                  'HSG107 §10 (continued) is explicit: testing too frequently can be wasteful and lead to unnecessary handling, including disconnection, which can increase risk of damage and danger. Plug terminations wear with each cycle. Flexes are damaged by handling. Pass-result fatigue obscures the rare defect. The Edwards balancing test cuts both ways — over-testing is not automatically safer.',
              },
              {
                question:
                  'How is frequency for portable RCDs different from frequency for the equipment they protect?',
                answer:
                  'IET CoP §7 / Chapter 14 treats portable RCDs as separate items, with their own combined inspection-and-test cycle that includes a trip-time test at I&Delta;n. Frequencies typically follow the same Table 7.1 logic for the environment, but the RCD function specifically should be tested every cycle, not just visual-checked. A failed portable RCD silently removes a layer of protection.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Frequency of inspection and testing — Module 1.4"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-1-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 User checks vs formal inspection
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

export default PATTestingModule1Section4;
