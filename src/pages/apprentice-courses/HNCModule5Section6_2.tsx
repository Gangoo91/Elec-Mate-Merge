/**
 * Module 5 · Section 6 · Subsection 2 — Progress Monitoring
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Site diaries, progress reports, programme updates, progress meetings and performance measurement — the daily and weekly disciplines of running a site.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Progress Monitoring - HNC Module 5 Section 6.2';
const DESCRIPTION =
  'Master progress monitoring techniques for building services projects: site diaries, progress reports, programme updates, progress meetings, KPI tracking, and delay analysis methods.';

const quickCheckQuestions = [
  {
    id: 'site-diary-purpose',
    question: 'What is the primary purpose of a site diary in building services projects?',
    options: [
      'Date, test type, results, faults, remedial action, and engineer details',
      'To ensure exits are clearly visible and accessible during evacuation',
      'To prevent accidents during critical shutdown procedures',
      'To create a contemporaneous record of daily site events',
    ],
    correctIndex: 3,
    explanation:
      'A site diary creates a contemporaneous (written at the time) record of daily events, which is essential for tracking progress, resolving disputes, and supporting extension of time claims.',
  },
  {
    id: 'progress-report-frequency',
    question:
      'How frequently are formal progress reports typically issued on building services projects?',
    options: [
      'Weekly or monthly',
      'Daily',
      'Annually',
      'Only at project completion',
    ],
    correctIndex: 0,
    explanation:
      'Formal progress reports are typically issued weekly on fast-moving projects or monthly on longer programmes. They provide structured updates to stakeholders on programme status, issues, and forecasts.',
  },
  {
    id: 'critical-path-definition',
    question: "What does 'critical path' mean in programme management?",
    options: [
      'Call 999 immediately, as the pain may indicate a heart attack',
      'A single-phase motor using a capacitor to create phase shift for starting',
      'The sequence of activities that determines project duration',
      'Incorrect energy modelling assumptions and operational factors',
    ],
    correctIndex: 2,
    explanation:
      'The critical path is the longest sequence of dependent activities that determines the minimum project duration. Any delay to critical path activities directly delays project completion.',
  },
  {
    id: 'kpi-measurement',
    question: 'Which KPI directly measures cost efficiency against the approved budget?',
    options: [
      'Cost Performance Index (CPI)',
      'Schedule Performance Index (SPI)',
      'Defect Density Rate',
      'Resource Utilisation',
    ],
    correctIndex: 0,
    explanation:
      'Cost Performance Index (CPI) measures cost efficiency by comparing earned value to actual costs. CPI = EV/AC, where a value above 1.0 indicates under-budget performance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What information should be recorded in a site diary every day?',
    options: [
      'Stop. Ask for the lock-off and the prove-dead. Won’t take long.',
      'Weather, workforce, visitors, work completed, deliveries, and issues',
      'To verify protective devices have adequate breaking capacity',
      'A habit triggered by a specific environment or situation rather than a time of day',
    ],
    correctAnswer: 1,
    explanation:
      'A comprehensive site diary should record weather conditions, workforce numbers and trades, visitors, work completed, deliveries received, plant on site, instructions received, and any issues or delays encountered.',
  },
  {
    id: 2,
    question: 'Why is a progress report different from a site diary?',
    options: [
      'It only contains positive information',
      'It is written weekly rather than daily',
      'It analyses trends and forecasts future performance',
      'It is confidential to the contractor',
    ],
    correctAnswer: 2,
    explanation:
      'While site diaries record daily facts, progress reports analyse trends, compare actual vs planned progress, identify risks, and forecast future performance. They are analytical documents, not just records.',
  },
  {
    id: 3,
    question: 'What is the purpose of a programme update meeting?',
    options: [
      'Adding delay events to the original baseline programme to show their impact',
      'How efficiently time is being used against the plan',
      'A detailed short-term programme showing activities for the next 2-6 weeks',
      'To review progress, update the programme, and agree recovery actions',
    ],
    correctAnswer: 3,
    explanation:
      'Programme update meetings review actual progress against the baseline programme, update remaining durations, identify delays, agree recovery measures, and produce revised completion forecasts.',
  },
  {
    id: 4,
    question:
      'In building services installation, what typically represents a key progress milestone?',
    options: [
      'First fix completion, pressure testing, and commissioning sign-off',
      'The amount of time an activity can be delayed without affecting the critical path',
      'It analyses trends and forecasts future performance',
      'Adding delay events to the original baseline programme to show their impact',
    ],
    correctAnswer: 0,
    explanation:
      'Key M&E milestones include first fix completion (containment and rough-in), second fix completion, pressure testing/leak testing, energisation, and commissioning/handover sign-off.',
  },
  {
    id: 5,
    question: "What is 'float' in programme management?",
    options: [
      'First fix completion, pressure testing, and commissioning sign-off',
      'The amount of time an activity can be delayed without affecting the critical path',
      'To review progress, update the programme, and agree recovery actions',
      'Adding delay events to the original baseline programme to show their impact',
    ],
    correctAnswer: 1,
    explanation:
      'Float (or slack) is the amount of time a non-critical activity can be delayed without delaying the project completion date. Activities on the critical path have zero float.',
  },
  {
    id: 6,
    question: 'What does SPI (Schedule Performance Index) measure?',
    options: [
      'The project is over budget and behind schedule',
      'It analyses trends and forecasts future performance',
      'How efficiently time is being used against the plan',
      'First fix completion, pressure testing, and commissioning sign-off',
    ],
    correctAnswer: 2,
    explanation:
      'Schedule Performance Index (SPI) measures schedule efficiency: SPI = Earned Value / Planned Value. An SPI of 1.0 means on schedule, below 1.0 means behind schedule, above 1.0 means ahead of schedule.',
  },
  {
    id: 7,
    question: 'When should a delay analysis be undertaken?',
    options: [
      'To review progress, update the programme, and agree recovery actions',
      'A detailed short-term programme showing activities for the next 2-6 weeks',
      'To provide visual proof of conditions, progress, and issues at specific points in time',
      'When delays occur that may affect the completion date or cause additional costs',
    ],
    correctAnswer: 3,
    explanation:
      'Delay analysis should be undertaken contemporaneously when significant delays occur, to establish cause, effect, responsibility, and any entitlement to extension of time or additional costs.',
  },
  {
    id: 8,
    question: "What is the 'impacted as-planned' method of delay analysis?",
    options: [
      'Adding delay events to the original baseline programme to show their impact',
      'When delays occur that may affect the completion date or cause additional costs',
      'To review progress, update the programme, and agree recovery actions',
      'To provide visual proof of conditions, progress, and issues at specific points in time',
    ],
    correctAnswer: 0,
    explanation:
      'The impacted as-planned method involves inserting delay events into the original baseline programme to demonstrate how each delay impacted the planned completion date.',
  },
  {
    id: 9,
    question:
      'A building services contractor has CPI of 0.85 and SPI of 0.92. What does this indicate?',
    options: [
      'The project is under budget and ahead of schedule',
      'The project is over budget and behind schedule',
      'The project is on track in all respects',
      'The project has been cancelled',
    ],
    correctAnswer: 1,
    explanation:
      'CPI of 0.85 means spending more than planned for work completed (over budget). SPI of 0.92 means less work completed than planned for the time elapsed (behind schedule). Both indices below 1.0 indicate problems.',
  },
  {
    id: 10,
    question: 'What should be the first item discussed at a progress meeting?',
    options: [
      'It analyses trends and forecasts future performance',
      'The project is over budget and behind schedule',
      'Review of actions from the previous meeting',
      'How efficiently time is being used against the plan',
    ],
    correctAnswer: 2,
    explanation:
      'Progress meetings should begin by reviewing actions from the previous meeting to ensure accountability and follow-through. This establishes whether agreed actions have been completed before discussing new matters.',
  },
  {
    id: 11,
    question: 'Why is photographic evidence important in progress monitoring?',
    options: [
      'First fix completion, pressure testing, and commissioning sign-off',
      'The amount of time an activity can be delayed without affecting the critical path',
      'A detailed short-term programme showing activities for the next 2-6 weeks',
      'To provide visual proof of conditions, progress, and issues at specific points in time',
    ],
    correctAnswer: 3,
    explanation:
      'Photographs provide date-stamped visual evidence of site conditions, work progress, quality issues, and problems. They support written records and are valuable evidence in disputes.',
  },
  {
    id: 12,
    question: "What is a 'look-ahead programme'?",
    options: [
      'A detailed short-term programme showing activities for the next 2-6 weeks',
      'To provide visual proof of conditions, progress, and issues at specific points in time',
      'First fix completion, pressure testing, and commissioning sign-off',
      'The amount of time an activity can be delayed without affecting the critical path',
    ],
    correctAnswer: 0,
    explanation:
      'A look-ahead programme (or rolling programme) provides detailed planning for the immediate future, typically 2-6 weeks. It shows day-by-day or week-by-week activities and resource requirements.',
  },
];

const faqs = [
  {
    question: "What should I do if the main contractor's progress report differs from my records?",
    answer:
      'Raise the discrepancy formally in writing at the next progress meeting. Reference your site diary entries and any photographic evidence. Request that the minutes record the dispute. Maintain your own records regardless - they may be crucial for extension of time claims or dispute resolution.',
  },
  {
    question: 'How detailed should my site diary entries be?',
    answer:
      'Detailed enough that someone unfamiliar with the project could understand what happened. Record weather (affecting work), workforce numbers by trade, areas worked, progress achieved, deliveries, plant, instructions received, visitors, delays encountered, and any issues. Be factual and objective - avoid opinions or blame.',
  },
  {
    question: 'What KPIs should I track for M&E installation progress?',
    answer:
      'Key KPIs include: metres of containment installed vs planned, percentage of first fix complete by area, number of outlets/points terminated, pressure test pass rate, commissioning sheets completed, defects raised and closed, labour productivity (units per man-hour), and programme milestone achievement.',
  },
  {
    question: 'When should I raise a potential delay with the project team?',
    answer:
      'Immediately when you identify it - early warning is a contractual requirement under NEC contracts and good practice under all forms. Provide written notice stating the potential delay, likely impact, and any mitigation measures. Waiting until the delay has occurred makes recovery more difficult and may prejudice claims.',
  },
  {
    question: 'How do I demonstrate progress to the client when work is hidden in ceiling voids?',
    answer:
      'Use photographic records before close-up, progress percentages based on measured quantities, commissioning test records, and walkover inspections with the client before areas are closed. Consider time-lapse photography for complex areas. Maintain as-built drawings showing what is installed where.',
  },
  {
    question: 'What is the difference between delay and disruption?',
    answer:
      'Delay extends the project duration (affecting completion date). Disruption reduces productivity without necessarily extending duration - work takes longer or costs more due to interference, but may be absorbed by working overtime or adding resources. Both can give rise to claims, but require different analysis methods.',
  },
];

const HNCModule5Section6_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 6 · Subsection 2"
            title="Progress Monitoring"
            description="Site diaries, progress reports, programme updates, progress meetings, and performance measurement."
            tone="purple"
          />

          <TLDR
            points={[
              "Progress monitoring = capturing actuals against plan, identifying variance, taking corrective action.",
              "Site diary daily: weather, labour count, plant on site, deliveries, key events, visitors, incidents — the contemporaneous record.",
              "Progress report weekly: programme update, % complete by trade, look-ahead 2–4 weeks, risks, issues, EWN summary.",
              "Programme update: bars statused with actuals, critical path re-run, slip identified, recovery plan documented.",
              "Progress meeting: client, design, contractor, key subs — chaired by PM, minuted, actions tracked.",
            ]}
          />

          <RegsCallout
            source="NEC4 ECC — Clause 32.2 (Revising the programme)"
            clause="The Contractor submits a revised programme to the Project Manager for acceptance within the period for reply or, if shorter, the period stated in the Contract Data, and at the intervals stated in the Contract Data, after the starting date."
            meaning={
              <>
                Under NEC4, programme revisions are a contractual rhythm — typically 4 weekly. Each revision is a CPM-disciplined update against actuals, accepted compensation events and forecast changes. The revised programme is the basis of monthly payment certification. Skipping or sloppy revisions break the contract's commercial logic.
              </>
            }
            cite="Source: NEC4 Engineering and Construction Contract — Clause 32 (refer to NEC4 published text for verbatim use)."
          />


          <LearningOutcomes
            outcomes={[
              'Maintain comprehensive site diaries for building services works',
              'Prepare and interpret progress reports for M&E installations',
              'Update programmes and identify critical path impacts',
              'Conduct effective progress meetings with clear outcomes',
              'Apply KPIs to measure installation performance',
              'Analyse delays and their effects on project completion',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Daily Site Diaries">
            <p>
              The site diary is the most important contemporaneous record on any construction
              project. For building services contractors, it provides essential evidence of
              progress, delays, instructions, and site conditions that may be needed months or years
              later for claims, disputes, or simply understanding what happened and when.
            </p>
            <p>
              <strong>Essential daily entries:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Date and weather:</strong> Temperature, precipitation, wind affecting work
              </li>
              <li>
                <strong>Workforce:</strong> Numbers by trade, subcontractors present
              </li>
              <li>
                <strong>Work areas:</strong> Locations worked, progress achieved
              </li>
              <li>
                <strong>Deliveries:</strong> Materials received, plant arriving/departing
              </li>
              <li>
                <strong>Instructions:</strong> Verbal and written directions received
              </li>
              <li>
                <strong>Visitors:</strong> Client, consultants, inspectors on site
              </li>
              <li>
                <strong>Issues:</strong> Delays, obstructions, coordination problems
              </li>
            </ul>
            <p>
              <strong>M&E-specific diary entries:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Containment progress:</strong> Metres installed by type and area —
                Productivity measurement
              </li>
              <li>
                <strong>Access issues:</strong> Scaffold not ready, ceiling closed early — Delay
                evidence
              </li>
              <li>
                <strong>Coordination clashes:</strong> HVAC duct blocking cable route —
                Variation/disruption claims
              </li>
              <li>
                <strong>Testing activities:</strong> Pressure tests, insulation resistance —
                Commissioning evidence
              </li>
              <li>
                <strong>Drawings received:</strong> Revision numbers, dates, from whom — Design
                responsibility
              </li>
            </ul>
            <p>
              <strong>Best practice — photographic records. Complement diary entries with
              date-stamped photographs showing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Work completed before close-up (especially in voids)</li>
              <li>Conditions preventing access or work</li>
              <li>Quality issues or defective work by others</li>
              <li>Site conditions (weather damage, flooding)</li>
              <li>Coordination clashes and obstruction</li>
            </ul>
            <p>
              <strong>Legal principle:</strong> Contemporaneous records (written at the time) carry
              more weight than recollections made later. Complete your diary daily, not
              retrospectively.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Progress Reports and Programme Updates">
            <p>
              While site diaries record daily facts, progress reports analyse and interpret that
              information to communicate status, identify trends, and forecast future performance.
              They transform raw data into actionable intelligence for project stakeholders.
            </p>
            <p>
              <strong>Weekly progress report:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Work completed this week by area</li>
              <li>Planned vs actual progress comparison</li>
              <li>Issues encountered and resolution</li>
              <li>Look-ahead for coming week</li>
              <li>Resource levels and requirements</li>
            </ul>
            <p>
              <strong>Monthly progress report:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Overall programme status and forecast</li>
              <li>Milestone achievement summary</li>
              <li>Cost vs budget analysis</li>
              <li>Risk register updates</li>
              <li>Variation and change status</li>
            </ul>
            <p>
              <strong>Programme update process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Data collection:</strong> Gather progress from site diaries, foremen —
                Actual start/finish dates, % complete
              </li>
              <li>
                <strong>2. Programme input:</strong> Update activity status in planning software —
                Updated programme file
              </li>
              <li>
                <strong>3. Analysis:</strong> Compare to baseline, identify variances — Critical
                path status, float consumed
              </li>
              <li>
                <strong>4. Forecasting:</strong> Adjust remaining durations, add delays — Revised
                completion forecast
              </li>
              <li>
                <strong>5. Recovery planning:</strong> Identify mitigation measures if behind —
                Recovery programme options
              </li>
            </ul>
            <p>
              <strong>Critical path monitoring:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Critical path activities have zero float - any delay extends completion</li>
              <li>M&E installation is often on the critical path in fit-out phases</li>
              <li>Monitor near-critical activities (low float) as they may become critical</li>
              <li>Report critical path delays immediately with recovery proposals</li>
            </ul>
            <p>
              <strong>Reporting principle:</strong> Progress reports should tell a story - what was
              planned, what happened, why any variance occurred, and what will be done about it.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Progress Meetings and Communication">
            <p>
              Progress meetings are the primary forum for coordinating activities, resolving issues,
              and maintaining alignment between project stakeholders. Effective meetings require
              preparation, clear agendas, and documented outcomes with assigned actions.
            </p>
            <p>
              <strong>Standard progress meeting agenda:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Previous actions:</strong> Review completion status of actions — 10
                minutes
              </li>
              <li>
                <strong>2. Health and safety:</strong> Incidents, near-misses, safety matters — 5
                minutes
              </li>
              <li>
                <strong>3. Programme review:</strong> Progress vs plan, critical path status — 15
                minutes
              </li>
              <li>
                <strong>4. Trade-by-trade:</strong> Each contractor reports progress/issues — 20
                minutes
              </li>
              <li>
                <strong>5. Design/RFIs:</strong> Outstanding information, drawing status — 10
                minutes
              </li>
              <li>
                <strong>6. Look-ahead:</strong> Key activities next 2-4 weeks — 10 minutes
              </li>
              <li>
                <strong>7. AOB:</strong> Other matters, next meeting date — 5 minutes
              </li>
            </ul>
            <p>
              <strong>Meeting preparation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Review previous meeting minutes and actions</li>
              <li>Update progress figures from site diaries</li>
              <li>Prepare list of issues to raise</li>
              <li>Bring supporting documents and photos</li>
              <li>Know your information requirements</li>
            </ul>
            <p>
              <strong>Effective actions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Specific - exactly what is required</li>
              <li>Measurable - how completion is verified</li>
              <li>Assigned - named person responsible</li>
              <li>Realistic - achievable in the timeframe</li>
              <li>Time-bound - clear deadline date</li>
            </ul>
            <p>
              <strong>Meeting minutes — what to record:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Attendees and apologies:</strong> Who was present, who sent representatives
              </li>
              <li>
                <strong>Decisions made:</strong> What was agreed, by whom
              </li>
              <li>
                <strong>Actions assigned:</strong> Task, owner, deadline
              </li>
              <li>
                <strong>Issues raised:</strong> Problems reported, especially if disputed
              </li>
              <li>
                <strong>Programme status:</strong> Current position, forecast completion
              </li>
            </ul>
            <p>
              <strong>Meeting discipline:</strong> Always review minutes when issued. If they do not
              accurately reflect what was said or agreed, respond in writing within 7 days
              requesting correction.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Performance Measurement and Delay Analysis">
            <p>
              Objective performance measurement using Key Performance Indicators (KPIs) enables
              early identification of problems and supports evidence-based decision making. When
              delays occur, formal delay analysis establishes cause, effect, and entitlement.
            </p>
            <p>
              <strong>Key performance indicators for M&E projects:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Schedule Performance Index:</strong> SPI = Earned Value / Planned Value —
                Target ≥ 1.0
              </li>
              <li>
                <strong>Cost Performance Index:</strong> CPI = Earned Value / Actual Cost — Target ≥
                1.0
              </li>
              <li>
                <strong>Productivity rate:</strong> Units installed / Labour hours — Per tender
                allowance
              </li>
              <li>
                <strong>First-time test pass rate:</strong> Tests passed / Tests conducted — Target
                ≥ 95%
              </li>
              <li>
                <strong>Defect closure rate:</strong> Defects closed / Defects raised — Target ≥ 90%
              </li>
              <li>
                <strong>RFI response time:</strong> Average days to receive response — Target ≤ 5
                days
              </li>
            </ul>
            <p>
              <strong>Earned value analysis example — Week 8 of 20-week programme, Budget =
              £500,000:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Planned Value (PV):</strong> £200,000 (40% of budget should be complete)
              </li>
              <li>
                <strong>Earned Value (EV):</strong> £170,000 (34% of work actually complete)
              </li>
              <li>
                <strong>Actual Cost (AC):</strong> £190,000 (spent to date)
              </li>
              <li>
                <strong>SPI = 170/200 = 0.85</strong> (15% behind schedule)
              </li>
              <li>
                <strong>CPI = 170/190 = 0.89</strong> (11% over budget for work done)
              </li>
            </ul>
            <p>
              <strong>Impacted as-planned method:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Start with baseline programme</li>
              <li>Insert delay events</li>
              <li>Recalculate end date</li>
              <li>Shows theoretical impact</li>
              <li>Simpler but less accurate</li>
            </ul>
            <p>
              <strong>Time impact analysis:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use updated programme at delay date</li>
              <li>Insert delay event</li>
              <li>Compare completion dates</li>
              <li>Shows actual impact on critical path</li>
              <li>More accurate but requires good records</li>
            </ul>
            <p>
              <strong>Delay categories:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Excusable, compensable:</strong> Client-caused delay (entitlement to time
                and money)
              </li>
              <li>
                <strong>Excusable, non-compensable:</strong> Neutral event like weather (time only)
              </li>
              <li>
                <strong>Non-excusable:</strong> Contractor-caused delay (no entitlement)
              </li>
              <li>
                <strong>Concurrent:</strong> Multiple delays at same time (complex allocation)
              </li>
            </ul>
            <p>
              <strong>Claims tip:</strong> Maintain a delay register recording all delay events as
              they occur, with dates, causes, effects, and supporting evidence. Do not wait until
              project end to analyse delays.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Site diary entry:</strong> Record today's events for an M&E
              subcontractor on a commercial office fit-out.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Date:</strong> 15 January 2026
              </li>
              <li>
                <strong>Weather:</strong> Overcast, 8°C, dry
              </li>
              <li>
                <strong>Workforce:</strong> 4 electricians, 2 apprentices, 1 supervisor
              </li>
              <li>
                <strong>Work areas:</strong> Level 2 North - containment installation
              </li>
              <li>
                <strong>Progress:</strong> 45m cable tray installed, 30m conduit
              </li>
              <li>
                <strong>Deliveries:</strong> Cable drums (10 x 100m 4c 6mm SWA)
              </li>
              <li>
                <strong>Issues:</strong> Unable to access Level 3 South - ceiling grid installed by
                others before our first fix. Raised with MC at 10:30.
              </li>
              <li>
                <strong>Instructions:</strong> Site instruction SI-042 received - additional socket
                outlets to meeting rooms.
              </li>
              <li>
                <strong>Visitors:</strong> M&E consultant walkover 14:00-15:00
              </li>
            </ul>
            <p>
              <strong>Example 2 — Progress status calculation:</strong> Calculate SPI and CPI for a
              project with: Planned Value £80,000, Earned Value £72,000, Actual Cost £78,000.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                SPI = EV / PV = £72,000 / £80,000 = <strong>0.90</strong>
              </li>
              <li>
                CPI = EV / AC = £72,000 / £78,000 = <strong>0.92</strong>
              </li>
              <li>SPI 0.90 = 10% behind schedule</li>
              <li>CPI 0.92 = 8% over budget for work completed</li>
              <li>Recovery action required to meet programme and budget</li>
            </ul>
            <p>
              <strong>Example 3 — Delay impact assessment:</strong> Late design information delayed
              containment installation by 2 weeks. Original programme showed 4 weeks float on this
              activity. Assess impact.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Activity float: 4 weeks</li>
              <li>Delay event: 2 weeks</li>
              <li>Remaining float = 4 - 2 = 2 weeks</li>
              <li>Activity NOT on critical path (float remains)</li>
              <li>Float consumption should be recorded</li>
              <li>Future delays may consume remaining float</li>
              <li>Disruption costs may still be claimable</li>
              <li>Notify client of delay event regardless of float impact</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Daily monitoring checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete site diary entries by end of each day</li>
              <li>Take photographs of progress and issues</li>
              <li>Record any verbal instructions in writing</li>
              <li>Note access restrictions or coordination problems</li>
              <li>Update progress on look-ahead programme</li>
              <li>Communicate issues to project manager same day</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                SPI/CPI target: <strong>≥ 1.0</strong> (on or better than plan)
              </li>
              <li>
                Minutes response: <strong>7 days</strong> to dispute
              </li>
              <li>
                Progress reports: <strong>Weekly or monthly</strong>
              </li>
              <li>
                Look-ahead: <strong>2-6 weeks</strong> rolling detail
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Retrospective diary entries</strong> - Complete daily, not at week end
                </li>
                <li>
                  <strong>Vague progress descriptions</strong> - Be specific: metres, quantities,
                  locations
                </li>
                <li>
                  <strong>Not photographing hidden work</strong> - No evidence once covered
                </li>
                <li>
                  <strong>Late delay notification</strong> - Report immediately when identified
                </li>
                <li>
                  <strong>Accepting inaccurate minutes</strong> - Challenge within 7 days
                </li>
              </ul>
            }
            doInstead="Write site diaries on the day with measured quantities, photograph all concealed work before close-up, raise potential delays in writing the moment they appear, and challenge inaccurate meeting minutes within 7 days."
          />

          <SectionRule />

          <Scenario
            title="Site diary reveals a 6-week pattern of late starts"
            situation={
              <>
                The project is running two weeks behind. The site diary review shows that, over the last six weeks, the electrical sub has averaged 09:30 starts (against a 08:00 contractual start), losing approximately 7.5 hours per week per operative. With 12 operatives, that is 90 lost hours per week, or roughly 540 hours over the period — equivalent to two weeks of work on a 5-day/8-hour basis.
              </>
            }
            whatToDo={
              <>
                Use the site diary as evidence in a performance meeting with the subcontractor. Document the pattern; agree corrective action (8:00 start enforced, supervisor on site for tea and morning brief, late starts logged as time-related contractor cost). Track for two weeks; if not corrected, escalate to formal warning under the subcontract. The site diary is the contemporaneous evidence base — without it, the conversation becomes "your word against theirs".
              </>
            }
            whyItMatters={
              <>
                Progress monitoring is what catches drift before it becomes crisis. The disciplined site diary, weekly progress report and monthly programme update create the audit trail that supports every commercial conversation — from subcontractor performance management to NEC compensation event assessment.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Progress monitoring = capture actuals, identify variance, take action.",
              "Site diary daily: weather, labour, plant, deliveries, events, visitors, incidents.",
              "Weekly progress report: programme, % complete, 2–4 week look-ahead, risks, EWN.",
              "Programme update: bars statused, CPM re-run, slip and recovery documented.",
              "Progress meeting: client, design, contractor, subs — minuted, actions tracked.",
              "Earned Value tracking gives objective progress measure beyond %-complete.",
              "Photographic record at key milestones supports as-built and dispute defence.",
              "Under NEC4 Clause 32, programme revisions are contractual — typically 4-weekly.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Site management and CDM
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Interface coordination
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section6_2;
