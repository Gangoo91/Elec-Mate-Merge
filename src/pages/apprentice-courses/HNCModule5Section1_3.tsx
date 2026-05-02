/**
 * Module 5 · Section 1 · Subsection 3 — Critical Path Method
 * HNC Electrical Engineering for Building Services (Project Management)
 *   Network analysis techniques for building services programme planning, float calculations,
 *   and schedule optimisation.
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

const TITLE = 'Critical Path Method - HNC Module 5 Section 1.3';
const DESCRIPTION =
  'Master the Critical Path Method (CPM) for building services project management: network analysis, forward/backward pass calculations, float determination, activity-on-node diagrams, and programme optimisation techniques.';

const quickCheckQuestions = [
  {
    id: 'cpm-definition',
    question: 'What does the critical path represent in project scheduling?',
    options: [
      'The shortest route through the network',
      'The longest sequence of dependent activities',
      'The most expensive activities',
      'Activities that can be delayed',
    ],
    correctIndex: 1,
    explanation:
      'The critical path is the longest sequence of dependent activities through the network. It determines the minimum project duration - any delay on critical activities directly extends the project end date.',
  },
  {
    id: 'total-float',
    question: 'Total float is calculated as:',
    options: [
      'Early Start minus Early Finish',
      'Late Finish minus Early Finish',
      'Duration minus Early Start',
      'Early Finish minus Late Start',
    ],
    correctIndex: 1,
    explanation:
      'Total float = Late Finish - Early Finish (or Late Start - Early Start). It represents the maximum time an activity can be delayed without affecting the project completion date.',
  },
  {
    id: 'forward-pass',
    question: 'During the forward pass calculation, what are we determining?',
    options: [
      'Late Start and Late Finish times',
      'Early Start and Early Finish times',
      'Total and free float values',
      'Activity dependencies',
    ],
    correctIndex: 1,
    explanation:
      'The forward pass works from project start to finish, calculating the earliest possible start (ES) and finish (EF) times for each activity. EF = ES + Duration.',
  },
  {
    id: 'critical-activity',
    question: 'An activity on the critical path will have:',
    options: ['Maximum float', 'Free float only', 'Zero total float', 'Negative duration'],
    correctIndex: 2,
    explanation:
      'Critical activities have zero total float - there is no spare time available. Any delay to these activities will delay the entire project completion by the same amount.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In an activity-on-node (AON) diagram, what do the boxes represent?',
    options: [
      'Milestones only',
      'Dependencies between tasks',
      'Individual activities with their attributes',
      'Resource allocations',
    ],
    correctAnswer: 2,
    explanation:
      'In AON diagrams, boxes (nodes) represent activities and contain information such as activity name, duration, early/late start and finish times, and float. Arrows show dependencies.',
  },
  {
    id: 2,
    question: 'Activity A has ES=5, Duration=3, LF=12. What is the total float?',
    options: ['3 days', '4 days', '5 days', '7 days'],
    correctAnswer: 1,
    explanation:
      'EF = ES + Duration = 5 + 3 = 8. Total Float = LF - EF = 12 - 8 = 4 days. This activity can slip 4 days without affecting the project end date.',
  },
  {
    id: 3,
    question: 'What is the relationship between free float and total float?',
    options: [
      'Free float is always greater than total float',
      'They are always equal',
      'Free float is always less than or equal to total float',
      'They are unrelated measures',
    ],
    correctAnswer: 2,
    explanation:
      'Free float is always less than or equal to total float. Free float only considers impact on the next activity, while total float considers impact on project completion.',
  },
  {
    id: 4,
    question: 'When performing the backward pass, which value is calculated first?',
    options: ['Early Start', 'Late Finish', 'Early Finish', 'Duration'],
    correctAnswer: 1,
    explanation:
      'The backward pass starts from the project end, setting the Late Finish of the final activity equal to the project completion date, then works backwards. LS = LF - Duration.',
  },
  {
    id: 5,
    question: "A chiller installation has predecessor 'pipework complete'. This is an example of:",
    options: [
      'Start-to-Start dependency',
      'Finish-to-Finish dependency',
      'Finish-to-Start dependency',
      'Start-to-Finish dependency',
    ],
    correctAnswer: 2,
    explanation:
      'Finish-to-Start (FS) is the most common dependency type - the predecessor must finish before the successor can start. The pipework must be complete before the chiller can be installed.',
  },
  {
    id: 6,
    question: 'Programme compression (crashing) should prioritise:',
    options: [
      'Activities with the longest duration',
      'Activities with the most float',
      'Critical path activities with lowest crash cost per day',
      'All activities equally',
    ],
    correctAnswer: 2,
    explanation:
      'Crashing should target critical path activities (they determine duration) with the lowest cost per day saved. Crashing non-critical activities or high-cost activities is inefficient.',
  },
  {
    id: 7,
    question:
      'On a hospital MEP project, which trade typically drives the critical path for plant room completion?',
    options: [
      'Electrical containment',
      'Mechanical pipework',
      'Fire alarm installation',
      'BMS controls',
    ],
    correctAnswer: 1,
    explanation:
      'Mechanical pipework (especially large bore heating/chilled water) typically has the longest duration and drives the critical path. Electrical and controls work often has more float.',
  },
  {
    id: 8,
    question: 'What happens if an activity on a parallel path gains zero float?',
    options: [
      'It becomes non-critical',
      'It becomes critical - there are now two critical paths',
      'The project duration increases',
      'Free float increases',
    ],
    correctAnswer: 1,
    explanation:
      "When a parallel path's float reduces to zero, that path also becomes critical. Projects can have multiple critical paths, making schedule management more complex.",
  },
  {
    id: 9,
    question: 'Lead time (negative lag) between activities means:',
    options: [
      'A delay must occur between activities',
      'Activities must start simultaneously',
      'The successor can start before the predecessor finishes',
      'The predecessor duration increases',
    ],
    correctAnswer: 2,
    explanation:
      'Lead time allows overlap - the successor activity can start a specified time before the predecessor finishes. Example: cable pulling can start before all containment is complete.',
  },
  {
    id: 10,
    question: 'Fast-tracking a project involves:',
    options: [
      'Adding more resources to critical activities',
      'Reducing activity scope',
      'Overlapping activities that would normally be sequential',
      'Removing non-critical activities',
    ],
    correctAnswer: 2,
    explanation:
      'Fast-tracking compresses the schedule by overlapping activities, often using lead times. It increases risk as later activities start before predecessors are fully complete.',
  },
  {
    id: 11,
    question: 'In MEP coordination, why is early identification of the critical path essential?',
    options: [
      'To determine which trade gets paid first',
      'To focus coordination efforts and resources on schedule-critical work',
      'To reduce the number of activities',
      'To eliminate float from all activities',
    ],
    correctAnswer: 1,
    explanation:
      'Identifying the critical path ensures coordination meetings, resources, and management attention focus on the work that determines project duration. Non-critical work has more flexibility.',
  },
  {
    id: 12,
    question:
      "Activity B follows Activity A (FS). A has EF=10, B has duration=5, LF=18. What is B's free float?",
    options: ['3 days', '0 days', '5 days', 'Cannot be determined without more information'],
    correctAnswer: 3,
    explanation:
      "Free float requires knowing the Early Start of B's successor. Free Float = ES of successor - EF of activity. Without successor information, free float cannot be calculated.",
  },
];

const faqs = [
  {
    question: 'What is the difference between total float and free float?',
    answer:
      'Total float is the time an activity can be delayed without affecting the project end date. Free float is the time an activity can be delayed without affecting the early start of any successor activity. Free float is always less than or equal to total float. An activity with free float can slip without impacting anything; using total float may delay successors (but not the project end).',
  },
  {
    question: 'How do I identify the critical path on a network diagram?',
    answer:
      'After completing forward and backward pass calculations, identify activities where Early Start = Late Start (or Early Finish = Late Finish). These activities have zero total float and form the critical path. Trace these through the network from start to finish - this is the longest path determining minimum project duration.',
  },
  {
    question: 'Why might a project have multiple critical paths?',
    answer:
      'Multiple critical paths occur when parallel sequences have identical durations. This is common in building services where different trades work simultaneously. Multiple critical paths increase risk because a delay on ANY critical path extends the project. Close monitoring of all critical and near-critical paths is essential.',
  },
  {
    question: 'What is the difference between crashing and fast-tracking?',
    answer:
      'Crashing adds resources to reduce activity duration (e.g., more electricians to speed up cable pulling). It increases cost but maintains work sequence. Fast-tracking overlaps activities that would normally be sequential (e.g., starting second fix before first fix is complete). It increases risk but may not increase cost significantly.',
  },
  {
    question: 'How does lag and lead time affect CPM calculations?',
    answer:
      'Lag adds waiting time between activities (e.g., 7-day concrete curing before plant can be installed). Lead allows overlap - the successor starts before the predecessor finishes. Both modify the simple Finish-to-Start relationship. ES of successor = EF of predecessor + lag (positive) or - lead (negative).',
  },
  {
    question: 'How should I handle resource constraints in CPM?',
    answer:
      'Basic CPM assumes unlimited resources, which is unrealistic. After initial CPM analysis, apply resource levelling: adjust activity timing within available float to smooth resource demand. Critical Chain Project Management (CCPM) explicitly incorporates resource constraints and adds buffers rather than activity-level float.',
  },
];

const HNCModule5Section1_3 = () => {
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
            eyebrow="Module 5 · Section 1 · Subsection 3"
            title="Critical Path Method"
            description="Network analysis techniques for building services programme planning, float calculations, and schedule optimisation."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Construct activity-on-node network diagrams for MEP projects',
              'Perform forward and backward pass calculations',
              'Calculate total float and free float for all activities',
              'Identify the critical path through complex networks',
              'Apply programme compression techniques (crashing, fast-tracking)',
              'Coordinate multiple trades around critical path constraints',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Critical Path Method Fundamentals">
            <p>
              The Critical Path Method (CPM) is the foundation of modern project scheduling.
              Developed in the 1950s for complex construction and engineering projects, it remains
              essential for managing building services installations where multiple trades must
              coordinate their work precisely.
            </p>
            <p>
              <strong>Key CPM terminology:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Activity:</strong> A task that consumes time and resources
              </li>
              <li>
                <strong>Dependency:</strong> The logical relationship between activities
              </li>
              <li>
                <strong>Critical path:</strong> The longest sequence through the network
              </li>
              <li>
                <strong>Float (slack):</strong> Available time flexibility for activities
              </li>
              <li>
                <strong>Network diagram:</strong> Graphical representation of project logic
              </li>
            </ul>
            <p>
              <strong>Activity-on-Node (AON) representation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Activity ID:</strong> Unique identifier — example E-101
              </li>
              <li>
                <strong>Activity Name:</strong> Description of work — example Install DB1
              </li>
              <li>
                <strong>Duration:</strong> Time to complete — example 5 days
              </li>
              <li>
                <strong>ES (Early Start):</strong> Earliest possible start — example Day 10
              </li>
              <li>
                <strong>EF (Early Finish):</strong> Earliest possible finish — example Day 15
              </li>
              <li>
                <strong>LS (Late Start):</strong> Latest start without delay — example Day 12
              </li>
              <li>
                <strong>LF (Late Finish):</strong> Latest finish without delay — example Day 17
              </li>
              <li>
                <strong>Total Float:</strong> LF - EF (or LS - ES) — example 2 days
              </li>
            </ul>
            <p>
              <strong>Standard AON node layout:</strong> A node box typically shows ES, Duration,
              EF on the top row; the Activity ID/Name in the middle; and LS, Float, LF on the
              bottom row. Arrows connect nodes to show dependencies (predecessors to successors).
            </p>
            <p>
              <strong>Building services insight:</strong> For MEP projects, activities typically
              represent installation packages (e.g., "Install Level 2 containment") rather than
              individual tasks.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Forward and Backward Pass Calculations">
            <p>
              CPM analysis requires two calculation passes through the network: the forward pass
              determines the earliest possible times, while the backward pass determines the latest
              allowable times.
            </p>
            <p>
              <strong>Forward pass (start to finish):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Begin at project start (ES = 0 for first activities)</li>
              <li>
                Calculate: <strong>EF = ES + Duration</strong>
              </li>
              <li>ES of successor = EF of predecessor</li>
              <li>Multiple predecessors: ES = MAX(all predecessor EFs)</li>
              <li>Final EF = minimum project duration</li>
            </ul>
            <p>
              <strong>Backward pass (finish to start):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Begin at project end (LF = project duration)</li>
              <li>
                Calculate: <strong>LS = LF - Duration</strong>
              </li>
              <li>LF of predecessor = LS of successor</li>
              <li>Multiple successors: LF = MIN(all successor LSs)</li>
              <li>Final LS = 0 confirms calculation accuracy</li>
            </ul>
            <p>
              <strong>Dependency types:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Finish-to-Start (FS):</strong> B starts when A finishes — containment
                complete before cabling
              </li>
              <li>
                <strong>Start-to-Start (SS):</strong> B starts when A starts — parallel containment
                runs
              </li>
              <li>
                <strong>Finish-to-Finish (FF):</strong> B finishes when A finishes — testing
                completes with installation
              </li>
              <li>
                <strong>Start-to-Finish (SF):</strong> B finishes when A starts — rare, old system
                until new commissioned
              </li>
            </ul>
            <p>
              <strong>Lag and lead time:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lag (+):</strong> Waiting time between activities. Example: FS+7 = 7-day
                concrete cure before plant installation
              </li>
              <li>
                <strong>Lead (-):</strong> Overlap allowed. Example: FS-3 = cabling can start 3
                days before containment finishes
              </li>
              <li>
                Lag and lead modify the basic dependency relationship, affecting ES/EF
                calculations.
              </li>
            </ul>
            <p>
              <strong>Practical tip:</strong> Always verify calculations by checking that first
              activity LS = 0 after backward pass. If not, there is a calculation error.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Float Calculations and Critical Path Identification">
            <p>
              Float represents the scheduling flexibility available for activities. Understanding
              float is essential for resource allocation, risk management, and determining which
              activities require the closest management attention.
            </p>
            <p>
              <strong>Critical path rule:</strong> Activities with <strong>zero total float</strong>{' '}
              are on the critical path. Any delay to these activities directly delays the project
              completion date by the same amount. The critical path is the longest path through the
              network.
            </p>
            <p>
              <strong>Float types and formulae:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Total Float (TF):</strong> LF - EF (or LS - ES) — may delay successors (not
                project end)
              </li>
              <li>
                <strong>Free Float (FF):</strong> ES(successor) - EF(activity) — no impact on any
                other activity
              </li>
              <li>
                <strong>Interfering Float:</strong> TF - FF — delays successors but not project
              </li>
            </ul>
            <p>
              <strong>Critical activities (TF = 0):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Require highest management priority</li>
              <li>Resources must be protected</li>
              <li>Progress monitored daily</li>
              <li>Delays escalated immediately</li>
              <li>No schedule flexibility</li>
            </ul>
            <p>
              <strong>Non-critical activities (TF greater than 0):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Can be rescheduled within float</li>
              <li>Resources can be borrowed for critical work</li>
              <li>Useful for resource levelling</li>
              <li>Monitor float consumption</li>
              <li>Near-critical (low float) needs attention</li>
            </ul>
            <p>
              <strong>Float calculation example:</strong> Activity Install distribution board
              (DB-L2), duration 3 days. ES = 15, EF = 18 (from forward pass). LS = 18, LF = 21
              (from backward pass). Total Float = LF - EF = 21 - 18 = <strong>3 days</strong>. If
              successor ES = 20, Free Float = ES(successor) - EF = 20 - 18 = <strong>2 days</strong>.
            </p>
            <p>
              <strong>Management insight:</strong> Float belongs to the project, not individual
              subcontractors. Consuming float reduces flexibility for all subsequent work.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Programme Optimisation and MEP Coordination">
            <p>
              Once the critical path is identified, programme optimisation techniques can reduce
              project duration or improve resource utilisation. In building services, this requires
              close coordination between mechanical, electrical, and public health trades.
            </p>
            <p>
              <strong>Programme compression techniques:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Crashing:</strong> Add resources to reduce duration — higher cost,
                diminishing returns
              </li>
              <li>
                <strong>Fast-tracking:</strong> Overlap sequential activities — increased risk,
                rework potential
              </li>
              <li>
                <strong>Scope reduction:</strong> Remove non-essential work — client approval
                required
              </li>
              <li>
                <strong>Method change:</strong> Prefabrication, modular builds — quality control,
                coordination
              </li>
              <li>
                <strong>Overtime/shifts:</strong> Extended working hours — fatigue, productivity
                loss
              </li>
            </ul>
            <p>
              <strong>Crashing priority rule:</strong> When crashing to reduce project duration:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Only crash activities on the critical path (others have no impact)</li>
              <li>Select activities with lowest crash cost per time unit saved</li>
              <li>Crash until another path becomes critical</li>
              <li>Then crash activities on ALL critical paths simultaneously</li>
              <li>Stop when crash cost exceeds benefit or no further reduction possible</li>
            </ul>
            <p>
              <strong>MEP critical path considerations — mechanical drivers:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Large bore pipework (longest duration)</li>
              <li>Plant room coordination</li>
              <li>AHU installations</li>
              <li>Chiller/boiler connections</li>
              <li>Ductwork in restricted areas</li>
            </ul>
            <p>
              <strong>MEP critical path considerations — electrical constraints:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main switchgear delivery</li>
              <li>Transformer installation</li>
              <li>Busbar riser systems</li>
              <li>Commissioning sequences</li>
              <li>DNO connection timing</li>
            </ul>
            <p>
              <strong>Coordination meeting focus areas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Critical interfaces:</strong> Where critical paths of different trades
                intersect
              </li>
              <li>
                <strong>Float consumption:</strong> Monitor near-critical paths becoming critical
              </li>
              <li>
                <strong>Resource conflicts:</strong> Multiple critical activities needing same
                space/resource
              </li>
              <li>
                <strong>Look-ahead planning:</strong> 3-6 week window for procurement/coordination
              </li>
              <li>
                <strong>Mitigation actions:</strong> Recovery plans when critical activities slip
              </li>
            </ul>
            <p>
              <strong>Coordination principle:</strong> In MEP works, the trade with longest
              critical path duration typically leads coordination. Others must align their
              programmes to maintain interfaces.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Forward Pass Calculation:</strong> Calculate Early Start and
              Early Finish for a simple network: Activity A (5 days) leads to B (3 days) and C (4
              days). Both B and C lead to D (2 days).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Start at Day 0</li>
              <li>Activity A: ES=0, EF=0+5=<strong>5</strong></li>
              <li>A finishes at Day 5, so B and C can start</li>
              <li>Activity B: ES=5, EF=5+3=<strong>8</strong></li>
              <li>Activity C: ES=5, EF=5+4=<strong>9</strong></li>
              <li>D requires both B and C complete: ES(D) = MAX(EF of B, EF of C) = MAX(8, 9) =
                <strong>9</strong></li>
              <li>Activity D: ES=9, EF=9+2=<strong>11</strong></li>
              <li>Project duration = 11 days</li>
            </ul>
            <p>
              <strong>Example 2 — Float Calculation:</strong> Using the same network, calculate
              total float for Activity B if project duration is 11 days.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Backward pass for Activity B</li>
              <li>D must finish by Day 11: LF(D)=11, LS(D)=11-2=9</li>
              <li>B must finish before D starts: LF(B)=LS(D)=9</li>
              <li>LS(B) = LF(B) - Duration = 9-3=6</li>
              <li>From forward pass: ES(B)=5, EF(B)=8</li>
              <li>
                Total Float = LF - EF = 9 - 8 = <strong>1 day</strong> (Alternatively: LS - ES = 6
                - 5 = 1 day)
              </li>
            </ul>
            <p>
              <strong>Example 3 — Critical Path Identification:</strong> Which path is critical:
              A-B-D or A-C-D?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Path A-B-D: 5 + 3 + 2 = 10 days</li>
              <li>Path A-C-D: 5 + 4 + 2 = 11 days</li>
              <li>
                Critical path = <strong>A-C-D</strong> (longest duration)
              </li>
              <li>Verify: Activities on critical path have zero float</li>
              <li>Activity C: ES=5, EF=9; LF(C) = LS(D) = 9; TF = LF - EF = 9 - 9 =
                <strong>0 (Critical)</strong></li>
            </ul>
            <p>
              <strong>Example 4 — Crashing Decision:</strong> Project must finish in 10 days.
              Activity C can be crashed by 1 day for GBP500, Activity A by 1 day for GBP800. Which
              should be crashed?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Current critical path: A-C-D = 11 days</li>
              <li>Need to reduce by 1 day</li>
              <li>Both A and C are on critical path - either will work</li>
              <li>Activity C crash cost: GBP500/day; Activity A crash cost: GBP800/day</li>
              <li>Decision: Crash Activity C (lowest cost per day saved)</li>
              <li>New path A-C-D: 5 + 3 + 2 = 10 days</li>
              <li>Note: Path A-B-D is now also 10 days - both paths now critical</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>CPM analysis checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>List all activities with durations and dependencies</li>
              <li>Draw network diagram (AON format)</li>
              <li>Perform forward pass (ES, EF for all activities)</li>
              <li>Note project duration from final activity EF</li>
              <li>Perform backward pass (LF, LS for all activities)</li>
              <li>Calculate total float (LF - EF) for all activities</li>
              <li>Identify critical path (activities with TF = 0)</li>
              <li>Verify: first activity LS = 0, critical path duration = project duration</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>EF = ES + Duration (forward pass)</li>
              <li>LS = LF - Duration (backward pass)</li>
              <li>Total Float = LF - EF = LS - ES</li>
              <li>Critical path = zero total float</li>
              <li>Free Float = ES(successor) - EF(activity)</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Using MIN in forward pass</strong> - Use MAX for ES when multiple
                  predecessors
                </li>
                <li>
                  <strong>Using MAX in backward pass</strong> - Use MIN for LF when multiple
                  successors
                </li>
                <li>
                  <strong>Crashing non-critical activities</strong> - Only crash critical path
                  activities
                </li>
                <li>
                  <strong>Ignoring near-critical paths</strong> - Low float paths can become
                  critical
                </li>
                <li>
                  <strong>Forgetting lag/lead in calculations</strong> - Must include in ES/EF
                  calculations
                </li>
              </ul>
            }
            doInstead="Use MAX for ES at merge points and MIN for LF at burst points, target only critical path activities for crashing, monitor near-critical paths weekly so they do not silently become the new critical path, and always include lag/lead in your ES and EF arithmetic."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Programme development
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Resource planning
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section1_3;
