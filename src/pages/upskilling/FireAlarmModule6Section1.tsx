import { ArrowLeft, ChevronLeft, ChevronRight, ClipboardCheck } from 'lucide-react';
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
    id: 'fam6-s1-weekly',
    question:
      'Under BS 5839-1:2025, who is responsible for the weekly user test of the fire alarm, and what is the minimum content of that test?',
    options: [
      'The servicing organisation, who must attend weekly to test every device.',
      'The designated responsible person under the Regulatory Reform (Fire Safety) Order 2005, in conjunction with premises management. The minimum content is to operate one manual call point (MCP) at a different location each week, confirm the system goes into alarm condition, confirm the sounders / VADs are audible / visible at the locations expected, confirm the alarm transmission to any ARC is received, and reset the system to normal. The user records the event in the logbook.',
      'The fire and rescue service.',
      'Anyone passing the panel; no specific role.',
    ],
    correctIndex: 1,
    explanation:
      'The weekly user test is a duty of the responsible person (RRO 2005) — typically a member of premises management, trained by the commissioning / servicing organisation. The minimum content is the operation of one MCP, rotated through the building over successive weeks so every MCP is tested at least once per cycle, and verification that the sounders / VADs operate as expected. The event is recorded in the logbook.',
  },
  {
    id: 'fam6-s1-tolerance',
    question:
      'A site has its acceptance certificate dated 14 January 2025. The servicing organisation has just attended for the first six-monthly inspection. What is the BS 5839-1:2025 acceptable date window for that visit?',
    options: [
      'Strictly 14 July 2025 — no tolerance.',
      '14 June 2025 to 14 August 2025 — a five-to-seven-month window calculated from the previous service / acceptance date. Clause 43.2.1 Note 1 of the 2025 revision permits the visit to be carried out any time between five and seven months after the previous inspection. The acceptance date is the datum (Note 2). A visit outside that window means the system is not being maintained in accordance with the standard.',
      'Any time within the calendar year.',
      'Within four weeks of the six-month anniversary.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 clause 43.2.1 brings a long-standing custom and practice into the standard text — the six-monthly visit is acceptable any time between five and seven months after the previous one, with the acceptance date as the datum. The 2017 edition strictly required not more than six months; the 2025 edition recognises a one-month tolerance either side. Outside the window is non-compliant.',
  },
  {
    id: 'fam6-s1-coverage',
    question:
      'Across two consecutive six-monthly service visits, what proportion of devices and interfaces should have been functionally tested?',
    options: [
      '50% over the two visits combined.',
      '100% over the two visits combined — every detector, every MCP, every sounder, every VAD, every interface to ancillary equipment (fire dampers, AOVs, magnetic door holders, lift homing) should have been functionally tested at least once in any rolling twelve-month period. Each individual six-monthly visit functionally tests a representative sample; the two visits together must cover 100% of devices.',
      '100% at every six-monthly visit.',
      'No functional testing — only visual.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1 has long required that every device be functionally tested at least once per year. The 2025 standard retains this — the annual coverage is split across the two six-monthly visits in any pattern that suits the system size and layout. Recording which devices were tested at each visit, against the asset register, is how the servicing organisation evidences full annual coverage.',
  },
  {
    id: 'fam6-s1-ducts',
    question:
      'New in BS 5839-1:2025: at the twelve-monthly service visit, what additional functional test is now expected for any smoke detectors mounted in air-handling ductwork?',
    options: [
      'No specific requirement.',
      'Functional testing of the duct-mounted smoke detectors must now be carried out at the twelve-monthly visit (clause 43.2.1 list). Previously these detectors were often missed because access was awkward and they were treated as protected by the building-side detection. The 2025 standard explicitly adds them to the annual functional test list. Verification of the zone identification reported on the CIE against the zone plan is also added at the twelve-monthly visit.',
      'Only a visual inspection through the access hatch.',
      'A continuity test on the cabling only.',
    ],
    correctIndex: 1,
    explanation:
      'Two additions at the twelve-monthly visit are explicit in BS 5839-1:2025. First, smoke detectors in ventilation ducts must be functionally tested. Second, the zone descriptors / identification reported on the CIE must be verified against the current zone plan. Both close gaps that the 2017 wording did not formally require.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Who carries out the weekly fire alarm test under BS 5839-1:2025, and under what legislation does the duty arise?',
    options: [
      'The maintenance contractor, under BS 5839 alone.',
      'The designated responsible person (typically premises management or a trained occupier), under the Regulatory Reform (Fire Safety) Order 2005 (RRO 2005). BS 5839-1 sets out the recommended content of the test (operate one MCP, confirm alarm and signalling, reset, log) but the duty to perform it sits with the responsible person. The servicing organisation should train them at handover.',
      'The fire and rescue service.',
      'Anyone working in the building.',
    ],
    correctAnswer: 1,
    explanation:
      'The responsible person under RRO 2005 owns the duty. BS 5839-1 spells out the recommended weekly test content. The servicing organisation trains the responsible person at handover and reviews the logbook at each service visit.',
  },
  {
    id: 2,
    question: 'Which statement most accurately describes the BS 5839-1:2025 weekly test method?',
    options: [
      'Every MCP is tested every week.',
      'One MCP is operated each week, rotated to a different location across consecutive weeks so that every MCP is tested at least once per cycle. The system is taken into alarm, the sounders / VADs are confirmed to operate, any ARC connection is confirmed, and the system is reset. The event is recorded in the logbook.',
      'A detector is sprayed each week.',
      'The panel is just visually inspected.',
    ],
    correctAnswer: 1,
    explanation:
      'The weekly test is a one-MCP-per-week rolling test. The MCP is rotated so over time every MCP gets tested. The sounders / VADs and ARC signalling are verified at the same time. Time-of-day, identity of the operator, and outcome are recorded in the logbook.',
  },
  {
    id: 3,
    question:
      'BS 5839-1:2025 clause 43.2.1 sets the interval between successive six-monthly servicing visits. What is the acceptable window?',
    options: [
      'Strictly six months.',
      'Approximately six months, with the visit acceptable any time between five and seven months after the previous service. The acceptance date is the datum. This brings a long-standing custom into the standard text and is a recognised change from the 2017 edition (which read "should not exceed six months").',
      'Any time within twelve months.',
      'Three to nine months.',
    ],
    correctAnswer: 1,
    explanation:
      'Five-to-seven-month tolerance window, datum = acceptance date. Visits outside this window do not meet the recommended servicing regime and should be flagged as a system departure.',
  },
  {
    id: 4,
    question:
      'Across the two six-monthly service visits in any given year, what proportion of detectors / MCPs / sounders / VADs / interfaces should have been functionally tested?',
    options: [
      '50% across the year.',
      '100% across the year — split between the two visits in any pattern that suits the system. Every device and every interface must be functionally tested at least once in any rolling twelve-month period. The asset register is the means of evidencing that every device has been visited.',
      '100% at each visit.',
      '25% at each visit.',
    ],
    correctAnswer: 1,
    explanation:
      'Annual full coverage = the two visits combined. Each visit tests a sample; the asset register tracks which devices were tested when. Over twelve months, every device should have been tested.',
  },
  {
    id: 5,
    question:
      'A 2025 service visit at a school includes a smoke detector mounted in an air-handling duct above the main hall ceiling. What is the BS 5839-1:2025 functional-test requirement for this detector at the twelve-monthly visit?',
    options: [
      'Visual only.',
      'It must be functionally tested at the twelve-monthly visit. BS 5839-1:2025 explicitly adds duct-mounted smoke detectors to the list of devices that must be functional-tested at the twelve-monthly visit. Previously these were often missed because of access difficulty; the 2025 wording removes that ambiguity. Access provision must therefore be designed in (hatch, sample port, dust-cover practice).',
      'Only continuity tested.',
      'Excluded from servicing.',
    ],
    correctAnswer: 1,
    explanation:
      'New in 2025: duct smoke detectors are explicitly on the twelve-monthly functional test list. Access provisions must be available; if not, recorded as a service constraint and reported.',
  },
  {
    id: 6,
    question:
      'Also new at the twelve-monthly visit in BS 5839-1:2025: what verification of zone identification is now expected?',
    options: [
      'Verify only every five years.',
      'The zone identification reported on the CIE (the text descriptor or numeric zone label) should be verified against the current zone plan at the twelve-monthly service visit. This catches drift between as-installed labelling and post-modification reality. The premises management remains responsible for keeping the zone plan up to date when changes occur.',
      'Only at acceptance.',
      'Never — zone identification is set at commissioning and unchanged.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-1:2025 adds CIE zone-identification verification against the zone plan to the twelve-monthly visit. Catches mismatch caused by partition changes, room renumbering, addressable system reprogramming.',
  },
  {
    id: 7,
    question:
      'During the weekly user test, the responsible person operates an MCP and the panel goes into alarm but no sounders activate. What is the appropriate immediate action?',
    options: [
      'Ignore until the next service visit.',
      'Treat as a fire-alarm fault; reset the system if safe and possible, log the event in detail (date, time, MCP location, observed behaviour), and notify the servicing organisation immediately. Pending repair, premises management should institute an interim measure (e.g. fire wardens, manual roving alarm) appropriate to the risk and recorded in writing. The fault must not be concealed or its indication suppressed (clause 23, BS 5839-1:2025).',
      'Disable the panel.',
      'Tell the user to keep operating the MCP until they hear something.',
    ],
    correctAnswer: 1,
    explanation:
      'The weekly test is a finding mechanism, not a formality. A failed weekly test is a real failure. Immediate logging, immediate notification, interim risk management, no concealment of fault indication.',
  },
  {
    id: 8,
    question:
      'Who is responsible for the monthly test of any standby generator or auxiliary supply that powers the fire alarm system, and what is the minimum content?',
    options: [
      'Servicing organisation only.',
      "Premises management / the responsible person, with the test typically carried out as part of the building's wider standby supply check. The minimum content is to start the generator (or transfer the supply), confirm load is taken, run for the manufacturer-recommended duration, transfer back, and log the event. The fire alarm panel's mains/battery indications during the test confirm the alarm system rides through the changeover.",
      'No-one — generators are tested annually only.',
      'The grid supplier.',
    ],
    correctAnswer: 1,
    explanation:
      "The monthly test is a building-side responsibility. The fire alarm should ride through the test seamlessly — the panel's mains-fail / battery indications during the change-over confirm correct operation of the alarm power architecture.",
  },
  {
    id: 9,
    question:
      'What three actions does the servicing organisation perform on the standby battery at every six-monthly visit?',
    options: [
      'Replace the battery.',
      "Visual inspection (case integrity, terminal corrosion, vent / seal condition, installation date label per BS 5839-1:2025), measure float voltage at the battery terminals (against the manufacturer specification for the panel's charger), and either perform or review evidence of an in-service load test (panel's own internal test, or off-line load test) confirming the battery still meets its design back-up duration. Replacement is at end of design life — typically four years — and is a separate action at the appropriate visit.",
      'Only visual.',
      'Only voltage.',
    ],
    correctAnswer: 1,
    explanation:
      'Visual + float voltage + load-test evidence at every six-monthly visit. The installation-date label (now formally recommended in 2025) supports the end-of-life decision. Replacement at design life — typically four years — is a planned activity, not a "wait for failure" approach.',
  },
  {
    id: 10,
    question:
      "A maintenance organisation's service report after a six-monthly visit. Which of the following must it include?",
    options: [
      'Just the date and "system OK".',
      'A full report identifying what was tested (with reference to the asset register), what was found (test results, faults observed, defects, unresolved issues from previous visits), what was done (any repairs / replacements), what was disabled and for how long (and whether premises management was informed), what remains outstanding (recommendations / quoted remedial works), and the conformity status of the system as left (any uncorrected variations or non-compliances). The report is signed by the competent person and entered in the logbook.',
      'Only a list of faults.',
      'Only a one-page certificate.',
    ],
    correctAnswer: 1,
    explanation:
      'The service report is the audit trail. It links the asset register, the test outcomes, the fault list, the disablement record, the recommendations, and the conformity statement. It is the primary document the responsible person uses to demonstrate compliance to the AHJ or insurer.',
  },
];

const FireAlarmModule6Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Routine testing requirements | Fire Alarm Module 6.1 | Elec-Mate',
    description:
      'BS 5839-1:2025 routine testing — the weekly user duty under RRO 2005, monthly auxiliary supply test, six-monthly competent-person service with the new five-to-seven-month tolerance window, and annual full coverage. Duct detectors and zone-identification verification newly explicit at the twelve-monthly visit.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 1"
            title="Routine testing requirements"
            description="BS 5839-1:2025 sets two distinct testing rhythms running in parallel — the weekly user test (a duty of the responsible person under RRO 2005), and the six-monthly competent-person inspection and service. The 2025 revision clarifies the tolerance window (five to seven months), explicitly adds duct-mounted smoke detectors and CIE zone-identification verification to the twelve-monthly visit, and tightens the recording obligation."
            tone="yellow"
          />

          <TLDR
            points={[
              'Weekly test = user duty under RRO 2005. Operate one MCP, rotated through the building over successive weeks. Confirm alarm, sounders / VADs, ARC transmission. Reset. Log.',
              'Monthly test = generator / auxiliary supply, where applicable. Premises-side responsibility; the fire alarm should ride through the changeover.',
              'Six-monthly inspection and service = competent person under BS 5839-1:2025 clause 43.2.1. NEW 2025: five-to-seven-month tolerance window (was strict six months in 2017). Acceptance date is the datum.',
              'Annual full coverage = 100% of detectors / MCPs / sounders / VADs / interfaces, split across the two six-monthly visits. The asset register is the audit trail.',
              'Twelve-monthly visit additions in 2025: smoke detectors in ventilation ducts must be functionally tested; CIE zone identification verified against the zone plan; ARC alarm signal transmission verified per signal type.',
              'Battery service every six months: visual + float voltage + load-test evidence. Installation-date label now formally recommended. Replacement at design life — typically four years.',
              'Fault indications must NOT be concealed or suppressed (clause 23). Failed weekly tests are real failures requiring interim risk management until repair.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the weekly user-test duty under RRO 2005 and describe the minimum test content recommended by BS 5839-1:2025',
              'Describe the monthly test of any generator or auxiliary supply and how the fire alarm system should ride through the changeover',
              'State the six-monthly service interval and the new BS 5839-1:2025 five-to-seven-month tolerance window (clause 43.2.1, acceptance date as datum)',
              'Explain the annual full-coverage principle and how it is split across the two six-monthly visits using the asset register',
              'Identify the additions to the twelve-monthly visit in BS 5839-1:2025: duct-mounted smoke detector functional testing and CIE zone-identification verification against the zone plan',
              'Describe the battery service: visual, float voltage, in-service load test, installation-date label, end-of-design-life replacement (typically four years)',
              'Apply the no-concealment principle to failed weekly tests and instituted interim risk-management measures pending repair',
              'Produce a routine-testing schedule for a sample premises that aligns weekly user activity with planned six-monthly competent-person visits',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The four-tier testing rhythm</ContentEyebrow>

          <ConceptBlock
            title="Why testing is layered, not one event"
            plainEnglish="A fire alarm system is a piece of life-safety infrastructure that must work on a day it has never been called on before. The integrity of that promise comes from regular testing at multiple intervals, each interval looking for a different class of fault. Weekly tests catch gross failures and prove the headline functions to occupants. Monthly tests prove the standby supply chain. Six-monthly competent-person visits catch developing technical defects and verify a representative sample of the device population. Annual coverage proves every individual device. The four tiers together verify the whole system; no single tier on its own is enough."
            onSite="Treat the four tiers as a single integrated programme. Weekly = user. Monthly = premises supply test. Six-monthly = competent person, sample. Annual = competent person, 100% across the two visits. Skip a tier and the whole programme degrades."
          >
            <p>What each tier is designed to detect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Weekly user test</strong> — gross failure of the alarm function, sounder /
                VAD failure, ARC signalling failure, panel fault not being attended to. Catches the
                "would the system make a noise tomorrow morning if there was a fire" question.
              </li>
              <li>
                <strong>Monthly auxiliary supply test</strong> — generator / standby supply chain
                integrity, including how the fire alarm panel transitions through mains loss /
                restoration. Catches latent failures in supply changeover.
              </li>
              <li>
                <strong>Six-monthly competent-person service</strong> — developing technical defects
                in detectors (sensitivity drift, contamination, electronics drift), interface
                failures, battery performance trend, panel event log review for accumulated faults,
                a representative sample functional test.
              </li>
              <li>
                <strong>Annual full coverage</strong> — every individual device proven to operate.
                The two six-monthly visits together cover 100% of the device population. The asset
                register tracks which device was tested when.
              </li>
            </ul>
            <p>
              The standard does not say "service the system once a year". It says "service the
              system twice a year and over those two visits cover everything". The distinction is
              load-bearing for both compliance and safety.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 43.2.1 (Periodic inspection and servicing — interval)"
            clause={
              <>
                The recommendations in this subclause should be carried out by a competent person
                (see 3.13). Successive inspection and servicing visits should be undertaken at
                intervals of approximately 6 months (see Note 1). NOTE 1: It would be acceptable for
                one inspection, test and service of the system to be carried out any time between 5
                months and 7 months after the previous inspection, test and service. NOTE 2: The
                date of acceptance is to be regarded as the datum for these periods.
              </>
            }
            meaning="Three load-bearing changes vs the 2017 wording. First — the visit must be by a competent person, defined in clause 3.13 (qualified, trained, instructed, CPD-maintained — see Section 6.2). Second — interval is approximately six months, not strictly six months. Third — the new five-to-seven-month tolerance window is in the standard text, not custom and practice. The acceptance date is the datum so the schedule does not drift."
          />

          <SectionRule />

          <ContentEyebrow>The weekly user test — RRO 2005 duty</ContentEyebrow>

          <ConceptBlock
            title="The duty and the content"
            plainEnglish="The Regulatory Reform (Fire Safety) Order 2005 places a duty on the responsible person — typically the building owner, occupier, or employer — to ensure the fire safety provisions including the fire alarm are maintained in efficient working order. BS 5839-1:2025 implements that duty for the alarm system through the weekly user test. The user (a designated person on site, trained at handover by the commissioning / servicing organisation) operates one manual call point each week, observes the system go into alarm, confirms the sounders and VADs operate as expected at audible / visible locations, confirms any ARC transmission is received, then resets the panel and records the event."
          >
            <p>The recommended weekly test content:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Notify.</strong> Inform any ARC the test is about to take place (so a real
                FRS dispatch is not generated in error). Inform any premises occupants who need to
                know.
              </li>
              <li>
                <strong>Operate one MCP.</strong> Choose a different MCP each week, rotating through
                every MCP in the building over successive weeks. Use the test key supplied by the
                manufacturer. Record the MCP location.
              </li>
              <li>
                <strong>Observe alarm condition.</strong> Confirm the panel goes into alarm, the
                correct zone is indicated, the sounders / VADs operate, and (if connected) the ARC
                transmission is received and acknowledged.
              </li>
              <li>
                <strong>Audibility check.</strong> Walk to one or two distant locations and confirm
                the alarm signal is audible and visible. (Ideally rotate the listening locations
                week to week so audibility is verified building-wide over the cycle.)
              </li>
              <li>
                <strong>Reset.</strong> Reset the test MCP. Reset the panel. Confirm the system
                returns to quiescent (no fault, no remaining alarm, all zones clear).
              </li>
              <li>
                <strong>Notify ARC.</strong> Inform the ARC the test is complete and any attendance
                suppression can be removed.
              </li>
              <li>
                <strong>Log.</strong> Record date, time, identity of the operator, MCP tested,
                outcome (pass or any anomaly), and any follow-up action initiated.
              </li>
            </ol>
            <p>
              The test takes a competent user perhaps three to five minutes. Done weekly across a
              year, it functionally verifies every MCP, exercises the sounders / VADs frequently,
              and produces a continuous trickle of operational evidence in the logbook.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 17 (Maintenance) — implemented in BS 5839-1:2025"
            clause={
              <>
                Where necessary in order to safeguard the safety of relevant persons the responsible
                person must ensure that the premises and any facilities, equipment and devices
                provided in respect of the premises … are subject to a suitable system of
                maintenance and are maintained in an efficient state, in efficient working order and
                in good repair.
              </>
            }
            meaning="The legal duty to keep the fire alarm working sits on the responsible person under RRO 2005. BS 5839-1:2025 is the practical implementation — weekly, monthly, six-monthly, annual — that delivers 'efficient working order'. A failure to perform the recommended testing regime is not just a BS 5839-1 departure; it is potential breach of the RRO 2005 duty."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram — testing cadence calendar */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              BS 5839-1:2025 testing cadence — annual calendar view
            </h4>
            <svg
              viewBox="0 0 900 460"
              className="w-full h-auto"
              role="img"
              aria-label="Annual testing cadence — thirteen-month strip showing weekly user tests every week, monthly auxiliary supply tests, two six-monthly competent-person services with the five-to-seven-month tolerance window centred on M6 and M12, and annual full-coverage achieved across the two services."
            >
              {/* Title strip */}
              <rect
                x="20"
                y="20"
                width="860"
                height="36"
                rx="8"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="450"
                y="44"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                12-month testing cadence — datum: acceptance date
              </text>

              {/* Month axis — 14 grid lines (M0 datum to M13) so the M11-M13 service-2 tolerance window fits inside the chart */}
              {Array.from({ length: 14 }).map((_, i) => {
                const x = 40 + i * 60;
                return (
                  <g key={`m${i}`}>
                    <line
                      x1={x}
                      y1="80"
                      x2={x}
                      y2="430"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                    />
                    {i < 13 && (
                      <text
                        x={x + 30}
                        y="76"
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.6)"
                        fontSize="9.5"
                      >
                        {`M${i + 1}`}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Tier 1 — Weekly */}
              <rect
                x="40"
                y="92"
                width="840"
                height="58"
                rx="10"
                fill="rgba(34,211,238,0.06)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text x="52" y="112" fill="#22D3EE" fontSize="11" fontWeight="bold">
                WEEKLY · user test (RRO 2005)
              </text>
              <text x="52" y="126" fill="rgba(255,255,255,0.6)" fontSize="9">
                One MCP, rotated · sounders / VADs · ARC · log
              </text>
              {Array.from({ length: 56 }).map((_, w) => {
                const x = 40 + (w * 840) / 56;
                return (
                  <line
                    key={`w${w}`}
                    x1={x + 7}
                    y1="135"
                    x2={x + 7}
                    y2="146"
                    stroke="#22D3EE"
                    strokeWidth="1.4"
                  />
                );
              })}

              {/* Tier 2 — Monthly */}
              <rect
                x="40"
                y="160"
                width="840"
                height="58"
                rx="10"
                fill="rgba(168,85,247,0.06)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text x="52" y="180" fill="#A855F7" fontSize="11" fontWeight="bold">
                MONTHLY · auxiliary supply (where applicable)
              </text>
              <text x="52" y="194" fill="rgba(255,255,255,0.6)" fontSize="9">
                Generator / standby supply test · panel rides through changeover
              </text>
              {Array.from({ length: 13 }).map((_, m) => {
                const x = 40 + m * 60 + 30;
                return <circle key={`mo${m}`} cx={x} cy="208" r="3.5" fill="#A855F7" />;
              })}

              {/* Tier 3 — Six-monthly */}
              <rect
                x="40"
                y="228"
                width="840"
                height="100"
                rx="10"
                fill="rgba(251,191,36,0.06)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text x="52" y="248" fill="#FBBF24" fontSize="11" fontWeight="bold">
                SIX-MONTHLY · competent person (clause 43.2.1)
              </text>
              <text x="52" y="262" fill="rgba(255,255,255,0.6)" fontSize="9">
                Visual · sample function-test · battery · logbook · 5-to-7-month tolerance
              </text>

              {/* First service window M5-M7 (line index 5 to 7, centred on M6 target) */}
              <rect
                x={40 + 5 * 60}
                y="270"
                width={2 * 60}
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.18)"
                stroke="#FBBF24"
                strokeDasharray="3,2"
                strokeWidth="1.2"
              />
              <text
                x={40 + 6 * 60}
                y="285"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9.5"
                fontWeight="bold"
              >
                Service 1 window (5-7 mo)
              </text>
              <circle cx={40 + 6 * 60} cy="305" r="6" fill="#FBBF24" />
              <text x={40 + 6 * 60} y="322" textAnchor="middle" fill="#FBBF24" fontSize="9">
                target ~ 6 mo
              </text>

              {/* Second service window M11-M13 (line index 11 to 13, centred on M12 target) */}
              <rect
                x={40 + 11 * 60}
                y="270"
                width={2 * 60}
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.18)"
                stroke="#FBBF24"
                strokeDasharray="3,2"
                strokeWidth="1.2"
              />
              <text
                x={40 + 12 * 60}
                y="285"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9.5"
                fontWeight="bold"
              >
                Service 2 window (11-13 mo)
              </text>
              <circle cx={40 + 12 * 60} cy="305" r="6" fill="#FBBF24" />
              <text x={40 + 12 * 60} y="322" textAnchor="middle" fill="#FBBF24" fontSize="9">
                target ~ 12 mo
              </text>

              {/* Tier 4 — Annual coverage */}
              <rect
                x="40"
                y="338"
                width="840"
                height="76"
                rx="10"
                fill="rgba(239,68,68,0.06)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text x="52" y="358" fill="#EF4444" fontSize="11" fontWeight="bold">
                ANNUAL · 100% device coverage across the two services combined
              </text>
              <text x="52" y="374" fill="rgba(255,255,255,0.6)" fontSize="9">
                Every detector · MCP · sounder · VAD · interface · duct detector (NEW 2025) · zone
                ID verified vs zone plan (NEW 2025)
              </text>
              <line
                x1={40 + 6 * 60}
                y1="384"
                x2={40 + 6 * 60}
                y2="408"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="3,2"
              />
              <line
                x1={40 + 12 * 60}
                y1="384"
                x2={40 + 12 * 60}
                y2="408"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="3,2"
              />
              <text
                x={40 + 9 * 60}
                y="402"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                100% coverage achieved by end of Service 2
              </text>

              {/* Datum marker */}
              <text x="40" y="446" fill="rgba(255,255,255,0.5)" fontSize="9.5">
                Datum (M0): acceptance date
              </text>
              <text x="880" y="446" textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="9.5">
                Cycle re-bases at each service date
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The monthly auxiliary supply test</ContentEyebrow>

          <ConceptBlock
            title="When and how"
            plainEnglish="Where the building has a standby generator or other auxiliary supply that powers (or might power) the fire alarm system, BS 5839-1:2025 expects a monthly exercise of that supply chain. The exercise is usually done as part of the wider building's standby supply regime and is the responsibility of premises management. The fire alarm panel must ride through the supply changeover seamlessly — the panel's mains-fail / battery-on indications during the test are themselves evidence of correct operation."
          >
            <p>The monthly test sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Pre-notification.</strong> Inform anyone who needs to know — building
                occupants, ARC if signalling will be affected, lifts and other equipment that are
                powered through the standby supply.
              </li>
              <li>
                <strong>Initiate the test.</strong> Start the generator (or simulate mains failure)
                per the manufacturer's procedure. Confirm the supply transfers within the
                manufacturer-specified time. Run the generator for the recommended duration (often
                fifteen to thirty minutes) on load.
              </li>
              <li>
                <strong>Observe the fire alarm.</strong> The panel's mains-fail indicator should
                illuminate at the moment of mains loss. The panel should remain fully operational
                throughout (battery covering until the standby supply transfers, then the standby
                supply taking over). No alarm should be initiated; no fault other than the
                mains-fail indication should be present.
              </li>
              <li>
                <strong>Restore.</strong> Transfer back to the mains supply. Confirm the panel
                indicates normal status, mains-fail clears, the battery resumes charge.
              </li>
              <li>
                <strong>Log.</strong> Record date, time, duration, observed behaviour of the fire
                alarm panel, any faults observed and their resolution.
              </li>
            </ul>
            <p>
              For systems without a generator or auxiliary supply, the monthly test does not apply.
              For systems with one, the monthly test is the test that proves the standby supply
              chain — without it, the supply could degrade silently between annual tests and only be
              discovered the night the mains actually fails.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The six-monthly inspection and service</ContentEyebrow>

          <ConceptBlock
            title="What the competent person does"
            plainEnglish="The six-monthly inspection and service is the substantive technical visit. It is performed by a competent person — defined in clause 3.13 of BS 5839-1:2025 (qualified, suitably trained, with practical experience, given the necessary instructions, with continuing professional development). The visit follows a structured sequence: review the logbook and the asset register, examine the panel's event log, perform a visual inspection of the panel and a sample of devices, function-test a planned sample of detectors / MCPs / sounders / VADs / interfaces, verify the standby battery, verify any ARC transmission, observe and report on any defects, brief the responsible person, sign the report."
          >
            <p>The six-monthly visit deliverables:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Logbook review.</strong> Read all entries since the previous visit. Note the
                weekly tests, any faults, any alarms (real or false), any disablements, any
                interventions by other parties. Identify any pattern (recurring fault, repeated
                false alarm location).
              </li>
              <li>
                <strong>Panel event log.</strong> Read the panel's event memory. Compare to the
                logbook. Faults the panel logged but the logbook does not show should be
                investigated. Pre-existing alarm conditions or persistent faults should be resolved.
              </li>
              <li>
                <strong>Panel visual inspection.</strong> Confirm normal status. Check for any
                disabled zones / disabled outputs. Check the date / time. Check the configuration
                has not been altered without the certificate trail.
              </li>
              <li>
                <strong>Sample functional test.</strong> Function-test a planned sample of detectors
                (per the asset register), MCPs, sounders / VADs, interfaces. The sample size is
                calibrated to deliver 100% annual coverage when combined with the next visit's
                sample. Record each device tested and the outcome.
              </li>
              <li>
                <strong>Battery service.</strong> Visual condition check. Float voltage measured at
                the terminals and compared to the manufacturer specification. Load test (panel
                self-test or off-line test). Installation date label confirmed (or fitted, if
                missing). Replacement decision based on age and performance.
              </li>
              <li>
                <strong>ARC transmission test.</strong> Each signal type (fire alarm, fault, test,
                disablement) confirmed transmitted to the ARC and acknowledged. Where the
                transmission path is dual (e.g. cellular plus IP), each path is exercised.
              </li>
              <li>
                <strong>Defect reporting.</strong> Any defects observed are reported in writing with
                the recommended remedial action and a priority. Quoted remedial works are offered
                where applicable.
              </li>
              <li>
                <strong>Briefing the responsible person.</strong> The findings are explained. The
                logbook is signed. The next service date is agreed. The conformity status is stated
                explicitly (compliant, compliant with logged variations, or non-compliant).
              </li>
            </ol>
            <p>
              The visit is not a tick-box exercise. It is the principal evidence that the system is
              being maintained per BS 5839-1:2025 and per the responsible person's RRO 2005 duty.
              The report and logbook entries are the audit trail — see Section 6.4.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 43.2.1 (Inspection and servicing — actions)"
            clause={
              <>
                At every service visit, systems that incorporate automatic signalling to an ARC
                should have the alarm signals that are sent to the ARC checked. Where more than one
                form of alarm signal can be transmitted (e.g. fire and fault signals), the correct
                transmission of each signal should be confirmed. … The functional testing of smoke
                detectors in ventilation ducts has now been added to the list of actions undertaken
                at the 12 monthly service visit. During the 12 monthly service visit, the zone
                identification reported on the CIE should be verified that it is the same zone that
                has been tested and that it corresponds with the zone plan.
              </>
            }
            meaning="Two new explicit additions in 2025 close common gaps. Duct-mounted smoke detectors used to be missed because access was awkward; now they are formally on the twelve-monthly list. CIE zone identification used to drift after partition or addressable reprogramming changes; now formal verification against the zone plan is required at the twelve-monthly visit. Both changes belong on the service organisation's twelve-monthly checklist."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The annual full-coverage principle</ContentEyebrow>

          <ConceptBlock
            title="100% over twelve months, split across two visits"
            plainEnglish="The standard requires every device, every interface, and every output to be functionally tested at least once in any rolling twelve-month period. The two six-monthly visits combined deliver that. The split is operational — the servicing organisation chooses how to divide the building / system between the two visits. The asset register records which device is tested at which visit. By the end of the second visit in any twelve-month cycle, every entry in the asset register should carry a recent functional-test date."
          >
            <p>How the split works in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>By zone.</strong> Visit 1 tests zones 1, 3, 5, 7. Visit 2 tests zones 2, 4,
                6, 8. Simple to plan, easy to evidence, predictable for clients.
              </li>
              <li>
                <strong>By floor / area.</strong> Visit 1 tests basement, ground, second, fourth.
                Visit 2 tests first, third, fifth. Useful in tall buildings.
              </li>
              <li>
                <strong>By device type.</strong> Visit 1 tests all detectors. Visit 2 tests all MCPs
                / sounders / VADs / interfaces. Useful where stocking specific test equipment is the
                constraint.
              </li>
              <li>
                <strong>Hybrid.</strong> Most real schedules mix the above — by zone for detectors,
                by area for sounders, all interfaces every visit. Whatever the split, the
                deliverable is full coverage across the two visits.
              </li>
            </ul>
            <p>
              The asset register is the audit trail. Every device entry has a date-tested column;
              after both visits in a year, every row should carry a date no more than twelve months
              old. A device with no recent test is a gap that must be closed at the next visit.
            </p>
          </ConceptBlock>

          <Scenario
            title="Acceptance date drift across years"
            situation="A care home was commissioned with acceptance dated 14 January 2023. The first three years of servicing have run as: V1a 12 July 2023, V1b 16 January 2024, V2a 10 July 2024, V2b 12 January 2025, V3a 15 July 2025. The new service contract starts 2026 and the V3b visit is scheduled for 18 January 2026. The servicing manager checks the BS 5839-1:2025 tolerance window."
            whatToDo="The datum is the acceptance date — 14 January. Each anniversary the planned date is 14 July (six months) and 14 January. The five-to-seven-month tolerance window for V3b is 15 December 2025 to 15 February 2026. The 18 January 2026 visit sits comfortably inside that window. Continue. The earliest the V4a visit could be carried out is 18 June 2026 (five months from V3b); the latest is 18 August 2026 (seven months from V3b). Flag those bracket dates in the planning system. The acceptance date remains the original datum even as the tolerance has caused subsequent visits to drift slightly."
            whyItMatters="The five-to-seven-month tolerance is a service-friendly window, but if it is used aggressively in the same direction every cycle, the schedule drifts. Best practice: aim for the original anniversary date, use the tolerance only when operational reality requires it (Christmas, holiday cover, access constraints). Drifting backwards over consecutive cycles risks an interval that exceeds seven months — which is non-compliant with clause 43.2.1."
          />

          <SectionRule />

          <ContentEyebrow>Battery service at every visit</ContentEyebrow>

          <ConceptBlock
            title="Three actions, every six months"
            plainEnglish="The standby battery is the most safety-critical wearing component in the system. It has a finite life (typically four years), it degrades gradually, and its degradation is not visible from the panel until performance has already fallen significantly. Every six-monthly service visit performs the same three actions: visual, float voltage, load-test evidence. The cumulative trend across multiple visits is what tells the servicing organisation when to plan replacement."
          >
            <p>The three battery actions:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Visual.</strong> Open the panel; inspect the battery case for swelling,
                terminal corrosion, vent condition, electrolyte signs (sealed batteries should not
                show electrolyte). Confirm the battery is correctly secured. Confirm the
                installation-date label is present and legible. (The 2025 standard explicitly
                acknowledges the long-standing custom of permanent-marker labelling — Section 6.2
                covers this.) If no label exists, fit one. If the date is more than four years back,
                raise replacement.
              </li>
              <li>
                <strong>Float voltage.</strong> Measure DC voltage at the terminals. The reading
                should be at the manufacturer-specified float voltage for the panel\'s charger
                (typically 13.6 to 13.8 V dc for a 12 V battery, or 27.2 to 27.6 V dc for a 24 V
                pair). Significantly low or high readings indicate charger fault or end-of-life
                battery.
              </li>
              <li>
                <strong>Load-test evidence.</strong> Either initiate the panel\'s built-in battery
                test (which transiently loads the battery and reads back-projected back-up
                duration), or perform an off-line load test with a constant-current load and a
                stopwatch. The result is compared to the design back-up duration (typically 24 or 72
                hours of quiescent + half an hour of alarm — depends on category and application). A
                battery that no longer meets the design duration is at end of life irrespective of
                its age.
              </li>
            </ol>
            <p>
              Replacement at design life is planned; replacement on failure is reactive. Any
              servicing organisation worth its certification plans replacement at year four (or
              earlier if performance trending down), notifies the responsible person in writing, and
              has the replacement battery on hand at the V3b or V4a visit before performance has
              dropped to non-compliance.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating the weekly test as a calendar tick"
            whatHappens="A care-home operator delegates the weekly test to a senior care worker who does it on Monday afternoons. Twelve weeks in, the test has consistently been just operating MCP 1 by the front door and waving at the panel as it goes into alarm. MCPs 2 through 12 have not been tested since acceptance. A real fire occurs in a back corridor. The MCP 8 nearest the corridor was non-operational — broken glass cover from a contractor's mishap — and never tested. The alarm is delayed."
            doInstead="Train the user on the rotation principle: every MCP must be operated in turn over successive weeks. Provide a visual rotation list (a printed sheet by the panel), tick each MCP off as it is tested. The rotation should also vary the listening location for the audibility check. The servicing organisation reviews the rotation evidence at every six-monthly visit and challenges any pattern of repeated testing of the same MCP."
          />

          <CommonMistake
            title="Missing the duct detectors at the twelve-monthly visit"
            whatHappens="A 2026 service visit at an office building has the engineer test all the ceiling detectors and MCPs on the spreadsheet, complete the report, and leave. The asset register includes a duct-mounted smoke detector serving the kitchen extract. It is not on the spreadsheet (added by a different contractor during a refurbishment), the engineer does not see it, and it is not tested. Three months later it fails to operate during a real kitchen fire and the kitchen smoke spreads through the recirculation ductwork to other zones."
            doInstead="The 2025 standard explicitly adds duct-mounted smoke detectors to the twelve-monthly functional test list. Maintain the asset register so it includes every detector — including those installed during refurbishments by other parties. Cross-check the as-installed detectors against the asset register at every twelve-monthly visit. If access to a duct detector is awkward, work with premises management to arrange access; recording 'no access' is not an acceptable substitute for testing."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>When weekly tests fail — interim risk management</ContentEyebrow>

          <ConceptBlock
            title="The clause 23 principle: do not conceal"
            plainEnglish="A failed weekly test is a real failure of the alarm system. BS 5839-1:2025 clause 23 (new in this revision) makes explicit that fault indications must not be concealed or suppressed — including the practical case of a panel buzzer being permanently muted because it is annoying staff. The user's job is to log the failure in detail, notify the servicing organisation, and put a clearly-recorded interim measure in place until the system is repaired. The interim measure is proportional to the risk."
          >
            <p>The interim measures hierarchy:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Whole-system failure</strong> (panel down, no alarm function). Institute a
                continuous fire watch — staff or contractors patrolling the building during all
                occupancy hours, equipped with whistles / horns / radios, with rapid evacuation
                authority. Notify the FRS if the building is high-risk (sleeping accommodation,
                care). Restrict occupancy or close affected areas if possible. Repair within hours.
              </li>
              <li>
                <strong>Zone failure.</strong> Limit the failure (disable only the failed zone, not
                the entire panel). Institute roving alarm in the affected zone. Adjacent zone
                detection still active. Repair within twenty-four hours.
              </li>
              <li>
                <strong>Single device failure.</strong> Disable that device. Cover it physically if
                a smoke detector (to prevent false alarms during repair). The rest of the system
                functions. Repair at the next service visit if non-urgent, sooner if the device
                covers a high-risk area.
              </li>
              <li>
                <strong>Sounder / VAD failure.</strong> Localised failure does not warrant
                whole-building fire watch but does warrant local supplemental warning (e.g. a
                hand-bell rota in the affected area) until repair.
              </li>
            </ul>
            <p>
              All interim measures are recorded in writing in the logbook with a clear start time
              and clear end time at repair. A weekly test that is logged as "failed — fire watch
              instituted" is a system being managed responsibly. A weekly test that is logged as
              "OK" when the panel is buzzing fault is a logbook entry that may be evidence of gross
              negligence.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Weekly = user duty under RRO 2005. One MCP, rotated. Sounders / VADs. ARC. Reset. Log. Aim for three-to-five-minute test, every week, no exception.',
              'Monthly = generator / auxiliary supply. Premises responsibility. Fire alarm rides through the changeover. Log.',
              'Six-monthly = competent person. BS 5839-1:2025 clause 43.2.1 — five-to-seven-month tolerance window, acceptance date as datum. Logbook review, panel event log, sample functional test, battery, ARC, defects, briefing.',
              'Annual = 100% device coverage across the two visits combined. Asset register is the audit trail.',
              'NEW in 2025 at the twelve-monthly visit: duct-mounted smoke detectors functionally tested; CIE zone identification verified against zone plan.',
              'Battery: visual + float voltage + load-test evidence at every visit. Date label. End of design life — typically four years. Plan replacement, do not wait for failure.',
              'Fault must NOT be concealed (clause 23). A failed weekly test triggers logging, notification, and proportionate interim risk management.',
              'A service visit produces a written report linking asset register, test outcomes, fault list, disablement record, recommendations, and conformity status — the audit trail to the AHJ / insurer.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Who is the "responsible person" under RRO 2005, and how is the role linked to the weekly test?',
                answer:
                  'In most premises the responsible person is the employer for workplace areas, the person with control of premises in connection with carrying on a trade / business / undertaking for non-domestic premises, or the owner. Article 17 of the Order requires the responsible person to ensure the fire alarm is maintained in efficient working order. BS 5839-1:2025 implements that duty through the weekly user test, the monthly auxiliary supply test, and the contracted six-monthly servicing — the responsible person is the legal owner of the testing regime even where they delegate execution.',
              },
              {
                question: 'Can the weekly test be skipped during a holiday closure?',
                answer:
                  'No — the weekly test is a weekly recommendation, irrespective of occupation. If the building is closed, the responsible person should arrange for the test to be carried out by a designated person with site access. A logged "no test, building closed" entry is a system departure to be flagged at the next service visit. Continuous testing during closures also catches faults that occur in unoccupied buildings (rodent damage to cabling, water ingress) before they compound.',
              },
              {
                question:
                  'How does the BS 5839-1:2025 five-to-seven-month tolerance change planning vs the 2017 wording?',
                answer:
                  'Pre-2025, the standard read "should not exceed six months", which meant any overrun — even by a week — put the system into formal non-compliance. In practice servicing organisations operated on a one-month-either-side custom, but the standard text did not back that custom. BS 5839-1:2025 clause 43.2.1 Note 1 brings the custom into the standard text. Now five-to-seven-month is explicitly acceptable; outside that window remains non-compliant. Plan visits to target the six-month mark; use the tolerance only when operational reality requires it.',
              },
              {
                question: 'Is a single annual visit acceptable instead of two six-monthly visits?',
                answer:
                  'No. BS 5839-1:2025 requires inspection and servicing at intervals of approximately six months, with the five-to-seven-month tolerance. A single annual visit of any quality does not meet that interval. Two visits are also necessary to deliver the 100% annual coverage with sample-sized visits — a single annual visit would either cover only half the system or take so long that practical testing logistics break down.',
              },
              {
                question:
                  'How is the new requirement to functionally test duct-mounted smoke detectors actually achieved?',
                answer:
                  'Two practical methods. First, where access hatches and sample ports are designed in (best practice on new systems post-2025), the engineer accesses the detector head and applies the manufacturer\'s test smoke / heat per the device specification. Second, on legacy installations without hatches, the engineer may need to wait for HVAC maintenance work to coincide with fire-alarm servicing, or build access provision as a remedial recommendation in the service report. "No access" is documented as a service constraint with a recommended remedy, not accepted as a permanent state.',
              },
              {
                question:
                  'What evidence does the asset register need to provide for the AHJ or insurer?',
                answer:
                  'Each device row should record device type, location (zone, room, height, mounting position), addressable address (if applicable), installation date, last functional test date, last servicing organisation, replacement-due date (sensitivity-driven for some addressable detector types), and any open defect status. The register is the asset spine; the service reports update it; the responsible person can produce it in seconds at any AHJ or insurer audit.',
              },
              {
                question: 'How long is the standby battery design life and when should we replace?',
                answer:
                  'Design life depends on the battery type and operating temperature, but typically four years for sealed lead-acid batteries operating at panel ambient. The 2025 standard formally recognises the labelling of installation date on the battery (custom and practice in the trade for years). Plan replacement at year four — most servicing organisations build it into the schedule as part of the fourth or fifth six-monthly visit. Earlier replacement is appropriate if performance trending suggests degradation; later replacement is acceptable only with documented evidence the battery still meets design duration.',
              },
              {
                question:
                  'A weekly test fails because the sounder closest to the panel does not operate. What is the right interim measure?',
                answer:
                  'A single sounder failure is a localised failure, not a system failure. Log it in detail. Notify the servicing organisation for repair. Pending repair, ensure adjacent sounders provide adequate audibility coverage (BS 5839-1 audibility requirements may still be met without one sounder); if not, institute local supplemental warning (e.g. hand-bell rota in the area, increased patrolling). Do not silence or disable the panel as a workaround — the failure must remain indicated until repaired (clause 23). Record the start time of the interim measure and end time at repair.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Routine testing requirements — Module 6.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-6/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.2 Servicing and maintenance
              </div>
            </button>
          </div>

          <div className="hidden">
            <ClipboardCheck />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule6Section1;
