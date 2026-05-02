/**
 * Module 5 · Section 1 · Subsection 2 — Programme Development
 * HNC Electrical Engineering for Building Services (Project Management)
 *   Gantt charts, milestones, programme logic and scheduling techniques for MEP installations.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Programme Development - HNC Module 5 Section 1.2';
const DESCRIPTION =
  'Master programme development for MEP installations: Gantt charts, bar charts, milestones, programme logic, scheduling techniques, and software tools like Primavera and MS Project.';

const quickCheckQuestions = [
  {
    id: 'gantt-purpose',
    question: 'What is the primary purpose of a Gantt chart in MEP project management?',
    options: [
      'To calculate material costs',
      'To visualise task durations and dependencies over time',
      'To record quality inspections',
      'To allocate budget codes',
    ],
    correctIndex: 1,
    explanation:
      'A Gantt chart is a horizontal bar chart that displays project tasks against time, showing task durations, start/end dates, dependencies, and overlaps at a glance.',
  },
  {
    id: 'milestone-definition',
    question: 'In construction programming, a milestone represents:',
    options: [
      'A long-duration activity',
      'A significant achievement point with zero duration',
      'A resource allocation',
      'A cost centre',
    ],
    correctIndex: 1,
    explanation:
      "Milestones are key achievement points in a programme with zero duration. They mark significant events such as 'First fix complete' or 'Commissioning start'.",
  },
  {
    id: 'fs-dependency',
    question: 'A Finish-to-Start (FS) dependency means:',
    options: [
      'Both activities finish together',
      'Both activities start together',
      'The successor cannot start until the predecessor finishes',
      'Activities can overlap freely',
    ],
    correctIndex: 2,
    explanation:
      'Finish-to-Start is the most common dependency type. The successor activity cannot begin until the predecessor activity is complete, such as cable pulling cannot start until containment is installed.',
  },
  {
    id: 'critical-path',
    question: 'The critical path in a construction programme is:',
    options: [
      'The shortest route through the project',
      'The longest sequence of dependent activities determining minimum duration',
      'The path with most resources',
      'The path with highest cost',
    ],
    correctIndex: 1,
    explanation:
      'The critical path is the longest sequence of dependent activities that determines the minimum project duration. Any delay on the critical path delays the entire project.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What information does a Gantt chart NOT typically display?',
    options: [
      'Task durations and start/end dates',
      'Dependencies between activities',
      'Detailed cost breakdowns per task',
      'Milestone achievements',
    ],
    correctAnswer: 2,
    explanation:
      'Gantt charts show task timing, durations, dependencies, and milestones. Detailed cost breakdowns are typically managed in separate cost schedules or earned value reports.',
  },
  {
    id: 2,
    question: 'Which dependency type allows a successor to start before the predecessor finishes?',
    options: [
      'Finish-to-Start (FS)',
      'Start-to-Start (SS)',
      'Finish-to-Finish (FF)',
      'Start-to-Finish (SF)',
    ],
    correctAnswer: 1,
    explanation:
      'Start-to-Start (SS) allows activities to overlap, with the successor starting when or after the predecessor starts. This enables parallel working, such as cable pulling starting as containment progresses.',
  },
  {
    id: 3,
    question: 'What is float (or slack) in programme logic?',
    options: [
      'The time an activity can be delayed without affecting project completion',
      'Additional resources allocated to critical activities',
      'The time between project phases',
      'Buffer stock of materials',
    ],
    correctAnswer: 0,
    explanation:
      'Float is the amount of time an activity can be delayed without delaying the project finish date. Critical path activities have zero float.',
  },
  {
    id: 4,
    question:
      'For a large MEP installation on a commercial building, which scheduling software is typically specified?',
    options: [
      'Microsoft Excel only',
      'Primavera P6 or Microsoft Project',
      'Basic calendar applications',
      'Word processing documents',
    ],
    correctAnswer: 1,
    explanation:
      'Large commercial projects typically require professional scheduling software like Primavera P6 or Microsoft Project, which offer critical path analysis, resource levelling, and multi-user collaboration.',
  },
  {
    id: 5,
    question: "A 'two-week look-ahead programme' is used to:",
    options: [
      'Replace the master programme',
      'Provide detailed short-term planning from the master programme',
      'Calculate final account values',
      'Record completed work only',
    ],
    correctAnswer: 1,
    explanation:
      'A two-week look-ahead extracts detailed information from the master programme, showing specific daily activities, resource requirements, and coordination needs for the immediate period.',
  },
  {
    id: 6,
    question: "What does 'levelling' resources in a programme mean?",
    options: [
      'Reducing the project budget',
      'Adjusting activity timing to avoid resource overallocation',
      'Making all bars the same length',
      'Removing dependencies',
    ],
    correctAnswer: 1,
    explanation:
      'Resource levelling adjusts activity timing within available float to prevent overallocation of resources (such as having more electricians scheduled than available), smoothing demand peaks.',
  },
  {
    id: 7,
    question: 'MEP coordination in programme development primarily addresses:',
    options: [
      'Financial reconciliation',
      'Sequencing between mechanical, electrical, and plumbing trades to avoid clashes',
      'Legal contract review',
      'Marketing activities',
    ],
    correctAnswer: 1,
    explanation:
      'MEP coordination ensures that mechanical, electrical, and plumbing trades work in the correct sequence, avoiding physical clashes in risers and ceiling voids, and optimising workflow efficiency.',
  },
  {
    id: 8,
    question: 'A lag of 2 days on a Finish-to-Start dependency means:',
    options: [
      'The successor starts 2 days before the predecessor finishes',
      'The successor waits 2 days after the predecessor finishes before starting',
      'Both activities are 2 days long',
      'The predecessor is delayed by 2 days',
    ],
    correctAnswer: 1,
    explanation:
      'A lag adds waiting time between activities. A 2-day lag on an FS dependency means the successor cannot start until 2 days after the predecessor completes, allowing for curing time or inspections.',
  },
  {
    id: 9,
    question: 'Which MEP activity typically appears on the critical path of a commercial building?',
    options: [
      'Final decorations',
      'Main switchboard installation and energisation',
      'Furniture installation',
      'Car park lighting',
    ],
    correctAnswer: 1,
    explanation:
      'Main switchboard installation and energisation is typically critical as it enables all subsequent electrical testing, commissioning, and handover. Delays here delay the entire project.',
  },
  {
    id: 10,
    question: 'What is the purpose of a programme baseline?',
    options: [
      'To show the original approved programme for comparison',
      'To delete completed activities',
      'To hide sensitive information',
      'To reduce the number of activities',
    ],
    correctAnswer: 0,
    explanation:
      'A baseline captures the original approved programme. Progress is tracked against this baseline to identify variances, delays, and acceleration, essential for project control and claims.',
  },
  {
    id: 11,
    question: 'In Primavera P6, WBS stands for:',
    options: [
      'Weekly Budget Summary',
      'Work Breakdown Structure',
      'Wiring Budget Schedule',
      'Workforce Balance Sheet',
    ],
    correctAnswer: 1,
    explanation:
      'Work Breakdown Structure (WBS) is a hierarchical decomposition of the project scope into manageable sections, organising activities by location, system, or phase.',
  },
  {
    id: 12,
    question:
      'When scheduling containment installation before cable pulling, what dependency type is used?',
    options: ['Start-to-Start', 'Finish-to-Finish', 'Finish-to-Start', 'No dependency needed'],
    correctAnswer: 2,
    explanation:
      'Containment must be complete before cable pulling can begin in that area, requiring a Finish-to-Start dependency. This reflects the physical reality that cables cannot be pulled through uninstalled containment.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a Gantt chart and a programme?',
    answer:
      'A Gantt chart is a visual representation format showing tasks as horizontal bars against time. A programme (or schedule) is the underlying data including activities, durations, dependencies, resources, and logic. Gantt charts are one way to display programme information - others include network diagrams, milestone charts, and resource histograms.',
  },
  {
    question: 'How detailed should an MEP programme be?',
    answer:
      'Programme detail depends on project stage and purpose. Master programmes typically show activities of 1-4 weeks duration at trade level. Detailed programmes break this down to daily activities per area. The principle is that activities should be short enough to measure progress meaningfully but not so detailed that the programme becomes unmanageable.',
  },
  {
    question: 'When should I use Primavera P6 versus Microsoft Project?',
    answer:
      'Primavera P6 is typically required on large infrastructure and commercial projects, offering enterprise-level multi-project management, robust resource handling, and earned value analysis. Microsoft Project suits small-medium projects and is more accessible. Many clients specify which software must be used in contract documents.',
  },
  {
    question: 'How do I handle delays in the programme?',
    answer:
      'When delays occur: (1) Update actual progress dates, (2) Re-run the schedule to identify impact on the critical path, (3) Assess if mitigation is possible through acceleration, resequencing, or additional resources, (4) Notify the client formally if completion dates are affected, and (5) Maintain records for extension of time claims.',
  },
  {
    question: 'What is the relationship between the programme and weekly progress meetings?',
    answer:
      'The programme should be updated weekly with actual progress (start/finish dates, percentage complete). This updated programme informs weekly progress meetings, showing whether the project is on track, identifying delayed activities, and highlighting upcoming critical work. The two-week look-ahead programme is typically issued for coordination meetings.',
  },
  {
    question: 'How do I coordinate MEP trades in a programme?',
    answer:
      'MEP coordination requires: (1) Sequencing trades logically (typically mechanical first in risers for largest pipes), (2) Allowing for inspection hold points, (3) Avoiding clashes using BIM coordination meetings, (4) Building in buffer time for coordination delays, and (5) Regular coordination meetings with all trades to resolve sequence conflicts.',
  },
];

const HNCModule5Section1_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · Subsection 2"
            title="Programme Development"
            description="Gantt charts, milestones, programme logic and scheduling techniques for MEP installations."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Create and interpret Gantt charts for MEP installations',
              'Identify and define project milestones appropriate to building services',
              'Apply programme logic including dependencies, leads, and lags',
              'Understand critical path methodology and float calculation',
              'Use scheduling software effectively (Primavera P6, MS Project)',
              'Coordinate MEP trades within the construction programme',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Gantt Charts and Bar Charts">
            <p>
              The Gantt chart, developed by Henry Gantt in the 1910s, remains the fundamental tool
              for construction programme visualisation. It displays activities as horizontal bars
              positioned against a calendar timescale, making it easy to understand project timing
              at a glance.
            </p>
            <p>
              <strong>Key Gantt chart elements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Activity bar:</strong> Horizontal bar showing duration from start to finish
                date
              </li>
              <li>
                <strong>Timescale:</strong> Calendar showing weeks, months, or days across the top
              </li>
              <li>
                <strong>Dependency arrows:</strong> Lines connecting related activities
              </li>
              <li>
                <strong>Milestone diamonds:</strong> Zero-duration achievement points
              </li>
              <li>
                <strong>Progress bar:</strong> Shaded portion showing percentage complete
              </li>
            </ul>
            <p>
              <strong>MEP installation programme example:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Containment installation:</strong> 4 weeks — predecessor: structure
                complete — 1st fix phase
              </li>
              <li>
                <strong>Cable pulling:</strong> 3 weeks — predecessor: containment (SS+1w) — 1st
                fix phase
              </li>
              <li>
                <strong>Distribution board installation:</strong> 1 week — predecessor: cables
                terminated — 1st fix complete
              </li>
              <li>
                <strong>Accessories installation:</strong> 2 weeks — predecessor: 2nd fix start —
                2nd fix phase
              </li>
              <li>
                <strong>Testing and commissioning:</strong> 2 weeks — predecessor: all installation
                complete — commissioning
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Break down programmes by floor or zone for large
              buildings, enabling progress tracking per area and clearer resource allocation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Milestones and Key Dates">
            <p>
              Milestones are zero-duration events representing significant achievements in the
              project. They provide clear targets for teams and enable management to track progress
              against key deliverables without examining every activity in detail.
            </p>
            <p>
              <strong>Typical MEP milestones:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main switchboard delivered to site</li>
              <li>First fix electrical complete per floor</li>
              <li>Temporary power available</li>
              <li>Permanent power energisation</li>
              <li>Fire alarm system operational</li>
              <li>Commissioning complete</li>
            </ul>
            <p>
              <strong>Contractual key dates:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Access to site date</li>
              <li>Sectional completion dates</li>
              <li>Practical completion date</li>
              <li>Client occupation dates</li>
              <li>Defects liability end date</li>
              <li>Final account agreement</li>
            </ul>
            <p>
              <strong>Milestone vs activity:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Milestone:</strong> Zero duration, achievement point, diamond symbol —
                example "First fix complete"
              </li>
              <li>
                <strong>Activity:</strong> Has duration, work package, horizontal bar — example
                "Install containment L2"
              </li>
            </ul>
            <p>
              <strong>Programming tip:</strong> Link milestones to payment applications. Achieving
              milestones often triggers stage payments, making accurate milestone dating financially
              critical.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Programme Logic and Dependencies">
            <p>
              Programme logic defines the relationships between activities, determining what must
              happen before, after, or concurrently with other activities. Correct logic is
              essential for accurate critical path analysis and realistic scheduling.
            </p>
            <p>
              <strong>Dependency types:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Finish-to-Start (FS):</strong> B starts when A finishes — cable pulling
                after containment complete
              </li>
              <li>
                <strong>Start-to-Start (SS):</strong> B starts when A starts — cable pulling
                following containment (with lag)
              </li>
              <li>
                <strong>Finish-to-Finish (FF):</strong> B finishes when A finishes — testing
                complete when installation complete
              </li>
              <li>
                <strong>Start-to-Finish (SF):</strong> B finishes when A starts — temporary power
                ends when permanent starts (rare)
              </li>
            </ul>
            <p>
              <strong>Leads and lags:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lag:</strong> Waiting time added after the dependency. Example: FS + 2 days
                lag for concrete curing before drilling
              </li>
              <li>
                <strong>Lead:</strong> Overlap time (negative lag). Example: FS - 3 days allows
                successor to start before predecessor finishes
              </li>
              <li>
                <strong>Application:</strong> Use lags for inspection hold points, material
                delivery, or curing times
              </li>
            </ul>
            <p>
              <strong>Critical path methodology:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Critical path:</strong> The longest sequence of dependent activities
              </li>
              <li>
                <strong>Float:</strong> Time an activity can slip without delaying completion
              </li>
              <li>
                <strong>Critical activities:</strong> Those with zero float - any delay delays the
                project
              </li>
              <li>
                <strong>Near-critical:</strong> Activities with less than 5 days float requiring
                monitoring
              </li>
            </ul>
            <p>
              <strong>Logic rule:</strong> Every activity (except project start) should have at
              least one predecessor. Dangling activities without logic links create unrealistic
              schedules.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Scheduling Software and MEP Coordination">
            <p>
              Professional scheduling software enables complex programme management beyond simple
              Gantt charts. Understanding these tools is essential for MEP project managers working
              on commercial and infrastructure projects.
            </p>
            <p>
              <strong>Primavera P6:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Enterprise-level scheduling</li>
              <li>Multi-project management</li>
              <li>Robust resource handling</li>
              <li>Earned value analysis</li>
              <li>Industry standard for large projects</li>
              <li>Oracle-owned database system</li>
            </ul>
            <p>
              <strong>Microsoft Project:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Desktop and cloud versions</li>
              <li>Familiar Microsoft interface</li>
              <li>Good for small-medium projects</li>
              <li>Integration with Office 365</li>
              <li>More accessible learning curve</li>
              <li>Lower licence cost than P6</li>
            </ul>
            <p>
              <strong>Key software features for MEP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>WBS (Work Breakdown Structure):</strong> Hierarchical organisation —
                organise by floor, zone, or system
              </li>
              <li>
                <strong>Resource levelling:</strong> Avoid overallocation — balance electrician
                numbers across activities
              </li>
              <li>
                <strong>Baseline comparison:</strong> Track variance — identify delays against
                original programme
              </li>
              <li>
                <strong>Activity codes:</strong> Filtering and reporting — filter by trade
                (elec/mech/plumb)
              </li>
              <li>
                <strong>Look-ahead reports:</strong> Short-term planning — 2-week look-ahead for
                coordination meetings
              </li>
            </ul>
            <p>
              <strong>MEP trade coordination sequence — typical priority order in congested areas
              (risers, ceiling voids):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mechanical:</strong> Largest ducts/pipes first (least flexible)
              </li>
              <li>
                <strong>Plumbing:</strong> Drainage with fixed gradients
              </li>
              <li>
                <strong>Electrical:</strong> Containment routes around M&amp;P services
              </li>
              <li>
                <strong>Fire protection:</strong> Sprinkler pipework
              </li>
              <li>
                <strong>Controls:</strong> BMS sensors and cabling
              </li>
            </ul>
            <p>
              <strong>Coordination tip:</strong> Use BIM coordination meetings to resolve clashes
              before they affect the programme. Virtual clashes are far cheaper to resolve than site
              conflicts.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Calculating Float:</strong> Activity A takes 5 days. Activity B
              depends on A (FS) and takes 3 days. Project must finish on Day 15. A can start Day 1.
              What is the float?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Early Start A = Day 1</li>
              <li>Early Finish A = Day 1 + 5 = Day 6</li>
              <li>Early Start B = Day 6</li>
              <li>Early Finish B = Day 6 + 3 = Day 9</li>
              <li>Project requires finish Day 15, earliest finish Day 9</li>
              <li>
                <strong>Total Float = 15 - 9 = 6 days</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2 — Dependency Selection:</strong> Containment installation takes 10
              days. Cable pulling takes 8 days but can start 3 days after containment starts. What
              dependency and lag?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable pulling starts when containment starts (not finishes)</li>
              <li>This is a Start-to-Start (SS) relationship</li>
              <li>3 days must elapse before cables can follow</li>
              <li>
                <strong>Answer: SS + 3 days lag</strong>
              </li>
              <li>
                This allows cable pulling to begin in areas where containment is complete, while
                containment continues in other areas.
              </li>
            </ul>
            <p>
              <strong>Example 3 — Critical Path Identification:</strong> Three parallel paths: (A)
              Containment 10d + Cables 8d = 18d, (B) Switchboard delivery 12d + Install 3d = 15d,
              (C) Generator install 20d. Which is critical?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Path A: 10 + 8 = 18 days</li>
              <li>Path B: 12 + 3 = 15 days</li>
              <li>Path C: 20 days</li>
              <li>
                <strong>Critical Path = Path C (Generator) at 20 days</strong>
              </li>
              <li>Path A has 2 days float (20-18)</li>
              <li>Path B has 5 days float (20-15)</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Programme development checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Define the Work Breakdown Structure by location/system</li>
              <li>Identify all activities with realistic durations</li>
              <li>Establish logical dependencies (avoid excessive constraints)</li>
              <li>Set key milestones aligned with contract requirements</li>
              <li>Assign resources and check for overallocation</li>
              <li>Calculate critical path and review logic</li>
              <li>Set baseline before work commences</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Finish-to-Start (FS): <strong>Most common dependency</strong>
              </li>
              <li>
                Float = 0: <strong>Critical activity</strong>
              </li>
              <li>
                Near-critical: <strong>Less than 5 days float</strong>
              </li>
              <li>
                Look-ahead period: <strong>2-4 weeks typical</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common programming mistakes"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Missing logic links</strong> - Activities without predecessors create
                  unrealistic schedules
                </li>
                <li>
                  <strong>Excessive constraints</strong> - Fixed dates should be used sparingly
                </li>
                <li>
                  <strong>Ignoring resource limits</strong> - Scheduling more workers than available
                </li>
                <li>
                  <strong>No baseline</strong> - Cannot measure progress without a baseline
                </li>
              </ul>
            }
            doInstead="Link every activity (except project start) to at least one predecessor, use date constraints sparingly, level resources within available float, and set the baseline before work commences so progress can be tracked against it."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Work Breakdown Structure
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Critical path method
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section1_2;
