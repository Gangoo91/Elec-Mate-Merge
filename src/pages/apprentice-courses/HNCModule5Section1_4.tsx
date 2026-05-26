/**
 * Module 5 · Section 1 · Subsection 4 — Resource Planning
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Matching labour, plant and materials to the programme — the operational backbone of cost control and productive site delivery.
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

const TITLE = 'Resource Planning - HNC Module 5 Section 1.4';
const DESCRIPTION =
  'Master resource planning for building services: labour allocation, materials procurement, plant requirements, resource levelling and productivity factors for MEP installations.';

const quickCheckQuestions = [
  {
    id: 'resource-histogram',
    question: 'What does a resource histogram display?',
    options: [
      'Conduct suitable and sufficient risk assessments',
      'The purchase price of the equipment',
      'Resource requirements plotted against time periods',
      'They are unresponsive and not breathing normally',
    ],
    correctIndex: 2,
    explanation:
      'A resource histogram is a bar chart showing resource requirements (typically labour hours or personnel numbers) plotted against time periods, enabling project managers to visualise demand peaks and troughs.',
  },
  {
    id: 'resource-levelling',
    question: 'The primary purpose of resource levelling is to:',
    options: [
      'Employer liability for acts of employees in the course of employment',
      'Document setting out health and safety arrangements for construction phase',
      'Reduce resource demand peaks by adjusting activity timing',
      'The associated input or coil is ON (energised)',
    ],
    correctIndex: 2,
    explanation:
      'Resource levelling aims to smooth out peaks in resource demand by adjusting activity timing within available float, avoiding excessive hiring/firing cycles and overtime costs.',
  },
  {
    id: 'productivity-rate',
    question:
      'An electrician installing containment achieves 25 metres per day. If 200 metres are required, what labour duration is needed?',
    options: [
      '5 days',
      '10 days',
      '8 days',
      '25 days',
    ],
    correctIndex: 2,
    explanation:
      'Labour duration = Quantity required / Productivity rate = 200m / 25m per day = 8 days. Always verify productivity rates against project-specific conditions.',
  },
  {
    id: 'lead-time',
    question: 'Which item typically has the longest procurement lead time?',
    options: [
      'Standard trunking',
      'Twin and earth cable',
      'Modular wiring accessories',
      'Bespoke LV switchgear panels',
    ],
    correctIndex: 3,
    explanation:
      'Bespoke LV switchgear panels typically require 12-16 weeks lead time due to design approval, manufacturing, and testing requirements. Standard materials are usually available within days.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the relationship between resource loading and resource levelling?',
    options: [
      'From MET to the connection point on the service (gas, water)',
      'Loading identifies requirements; levelling optimises timing',
      'Higher sound reduction at most frequencies',
      'To ensure materials arrive when needed and prevent storage problems',
    ],
    correctAnswer: 1,
    explanation:
      'Resource loading determines the resource requirements for each activity. Resource levelling then adjusts activity timing within float to smooth demand peaks and optimise resource utilisation.',
  },
  {
    id: 2,
    question:
      'A project requires 3 electricians for 4 weeks. What is the total labour resource in person-weeks?',
    options: [
      '16 person-weeks',
      '4 person-weeks',
      '12 person-weeks',
      '7 person-weeks',
    ],
    correctAnswer: 2,
    explanation:
      'Total labour = Number of resources x Duration = 3 electricians x 4 weeks = 12 person-weeks. This metric helps compare different resource/duration combinations.',
  },
  {
    id: 3,
    question: 'Which factor most significantly affects electrical installation productivity rates?',
    options: [
      'The bill of quantities or material schedule',
      'Productivity improves as workers gain familiarity',
      'At tender stage with confirmed lead times',
      'Working at height and access restrictions',
    ],
    correctAnswer: 3,
    explanation:
      'Working at height, scaffold access, occupied buildings, and coordination with other trades significantly impact productivity. MEWP use can reduce productivity by 30-40% compared to working at floor level.',
  },
  {
    id: 4,
    question: 'When should long lead time items be ordered on a building services project?',
    options: [
      'At tender stage with confirmed lead times',
      'Productivity improves as workers gain familiarity',
      'The bill of quantities or material schedule',
      'Working at height and access restrictions',
    ],
    correctAnswer: 0,
    explanation:
      'Long lead items (switchgear, generators, chillers) must be identified at tender stage with confirmed lead times. Orders should be placed immediately after contract award to avoid programme delays.',
  },
  {
    id: 5,
    question:
      'A resource histogram shows a peak of 15 electricians but only 10 are available. What is the resource conflict?',
    options: [
      '15 electricians short',
      '5 electricians short',
      'No conflict exists',
      '10 electricians excess',
    ],
    correctAnswer: 1,
    explanation:
      'Resource conflict = Peak demand - Available resources = 15 - 10 = 5 electricians short. This must be resolved through levelling, overtime, subcontracting, or programme extension.',
  },
  {
    id: 6,
    question: 'What is the typical productivity allowance for working in an occupied hospital?',
    options: [
      'No allowance needed',
      '10-15% reduction',
      '30-50% reduction',
      '100% reduction',
    ],
    correctAnswer: 2,
    explanation:
      'Working in occupied hospitals typically reduces productivity by 30-50% due to access restrictions, infection control, noise limitations, and coordination with clinical activities.',
  },
  {
    id: 7,
    question: 'Which document forms the basis for material procurement planning?',
    options: [
      'Working at height and access restrictions',
      'Productivity improves as workers gain familiarity',
      'At tender stage with confirmed lead times',
      'The bill of quantities or material schedule',
    ],
    correctAnswer: 3,
    explanation:
      'The bill of quantities or material schedule lists all materials required with quantities, forming the basis for procurement planning, ordering schedules, and cost control.',
  },
  {
    id: 8,
    question: 'Plant utilisation rate measures:',
    options: [
      'The percentage of available time equipment is productively used',
      'To allow systematic fault identification and prevent cascading failures',
      'Unlimited fine and/or up to 5 years imprisonment',
      'Reduced pumping energy while maintaining heat delivery',
    ],
    correctAnswer: 0,
    explanation:
      'Plant utilisation = (Productive time / Available time) x 100%. High utilisation improves cost-effectiveness; low utilisation indicates poor planning or over-allocation.',
  },
  {
    id: 9,
    question:
      'Why is resource levelling performed within float rather than extending the programme?',
    options: [
      'Providing a known voltage to test that the voltage indicator works',
      'Extending the programme increases costs and may breach contract dates',
      'Hearing only the parts of a message that interest you or confirm your existing views',
      'Reduced operational energy with residual emissions offset',
    ],
    correctAnswer: 1,
    explanation:
      'Programme extension typically incurs preliminary costs, may attract liquidated damages, and delays client occupation. Levelling within float achieves smoother resource demand without these penalties.',
  },
  {
    id: 10,
    question:
      'A cable installation requires 500m at a productivity rate of 40m/hour. With two electricians, how many hours to complete?',
    options: [
      '50 hours',
      '12.5 hours',
      '6.25 hours',
      '25 hours',
    ],
    correctAnswer: 2,
    explanation:
      'Total hours = Quantity / (Rate x Number of workers) = 500m / (40m/hr x 2) = 500/80 = 6.25 hours. Doubling resources halves the duration for linear work.',
  },
  {
    id: 11,
    question: 'Which procurement strategy minimises storage costs on a congested city centre site?',
    options: [
      'Bulk ordering at project start',
      'Consignment stock',
      'Owner-furnished materials',
      'Just-in-time delivery',
    ],
    correctAnswer: 3,
    explanation:
      'Just-in-time (JIT) delivery schedules materials to arrive as needed, minimising on-site storage requirements - essential on congested sites with limited lay-down areas.',
  },
  {
    id: 12,
    question: 'What is the effect of learning curve on productivity rates?',
    options: [
      'Productivity improves as workers gain familiarity',
      'Learning curve only applies to manufacturing',
      'No effect on productivity',
      'Productivity decreases as work progresses',
    ],
    correctAnswer: 0,
    explanation:
      'The learning curve shows productivity improvement as workers become familiar with the work, site, and methods. First-fix in initial areas takes longer than later, repetitive work.',
  },
];

const faqs = [
  {
    question: 'How do I estimate labour requirements for an electrical installation?',
    answer:
      'Start with a detailed material schedule, then apply productivity rates (metres per hour for containment/cables, hours per point for accessories). Factor in site-specific conditions: working height, access, occupied premises, coordination with other trades. Build up from activity level to weekly resource histograms. Always include supervision, testing, and commissioning labour.',
  },
  {
    question: 'What causes productivity rates to vary so significantly between projects?',
    answer:
      'Key factors include: access conditions (floor level vs MEWP vs scaffold), building occupancy (empty vs operational), complexity (standard vs complex containment routes), coordination requirements (single trade vs multi-trade congestion), location (urban vs rural), and worker experience. A 2:1 productivity variation between best and worst conditions is common.',
  },
  {
    question: 'How far ahead should I plan material deliveries?',
    answer:
      'For standard materials (cables, accessories): 2-4 weeks. For distribution boards and consumer units: 4-8 weeks. For bespoke switchgear: 12-16 weeks. For generators and transformers: 16-26 weeks. Always confirm lead times at tender and reconfirm at order - supply chain issues can significantly extend times.',
  },
  {
    question: 'What is the difference between resource smoothing and resource levelling?',
    answer:
      'Resource smoothing adjusts activities within total float to reduce peaks while maintaining the original completion date - the programme end date is fixed. Resource levelling allows the programme to extend if necessary to achieve an acceptable resource profile. Smoothing is preferred; levelling is a last resort when smoothing cannot resolve conflicts.',
  },
  {
    question: 'How do I handle resource conflicts when activities cannot be delayed?',
    answer:
      'Options include: increase shift length (overtime), add weekend working, bring in additional subcontract labour, split activities to use available resources in parallel, pre-fabricate off-site, or re-sequence work to use different trade resources. Each option has cost and quality implications requiring careful evaluation.',
  },
  {
    question: 'What plant is typically required for building services installation?',
    answer:
      'Common plant includes: MEWPs (scissor lifts, boom lifts), hand tools (battery drills, cable cutters), specialist equipment (cable pulling winches, crimping tools), testing instruments (insulation testers, multifunction testers), and temporary services (lighting, power). Plan availability to match programme peaks and minimise idle time charges.',
  },
];

const HNCModule5Section1_4 = () => {
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
            eyebrow="Module 5 · Section 1 · Subsection 4"
            title="Resource Planning"
            description="Labour allocation, materials procurement, plant requirements and resource optimisation for building services projects."
            tone="purple"
          />

          <TLDR
            points={[
              "Resource planning takes each work package and assigns labour grades, plant, materials and supervision against the programme bars.",
              "Resource histograms reveal peaks and troughs — flat resource demand is cheaper, more sustainable and safer than a saw-tooth profile.",
              "Resource-levelling within float smooths peaks; resource-smoothing extends the programme — choose deliberately, never by accident.",
              "For MEP, lead-time materials (switchgear, cable, AHUs) need ordering against need-by dates derived from the programme, not \"as soon as possible\".",
              "Productivity assumptions must be defensible — typical UK electrical second-fix is 0.4–0.6 hr/m² depending on density; calibrate against measured outputs, not optimism.",
            ]}
          />

          <RegsCallout
            source="CDM 2015 — Regulation 13(1) (Duties of a principal contractor)"
            clause="The principal contractor must plan, manage and monitor the construction phase and coordinate matters relating to health and safety during the construction phase to ensure that, so far as is reasonably practicable, construction work is carried out without risks to health or safety."
            meaning={
              <>
                Resource planning is one of the practical means by which a principal contractor evidences Reg 13 compliance. Over-loading a workface (too many trades in one zone) is a Reg 13 breach as much as a productivity problem — you cannot manage the construction phase if you have not planned the resources.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 — legislation.gov.uk"
          />


          <LearningOutcomes
            outcomes={[
              'Calculate labour requirements using productivity rates',
              'Develop resource histograms for building services projects',
              'Apply resource levelling techniques within programme float',
              'Plan material procurement with appropriate lead times',
              'Schedule plant and equipment to match programme peaks',
              'Adjust productivity rates for site-specific conditions',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Labour Planning Fundamentals">
            <p>
              Labour is typically the largest controllable cost on building services projects,
              representing 40-60% of installation value. Effective labour planning ensures the right
              number of workers with appropriate skills are available when needed, avoiding costly
              over-manning or programme-threatening under-resourcing.
            </p>
            <p>
              <strong>Labour planning process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Activity identification:</strong> Break work into measurable activities
              </li>
              <li>
                <strong>Quantity take-off:</strong> Measure work content for each activity
              </li>
              <li>
                <strong>Productivity application:</strong> Apply appropriate output rates
              </li>
              <li>
                <strong>Duration calculation:</strong> Hours = Quantity / Productivity rate
              </li>
              <li>
                <strong>Resource aggregation:</strong> Sum requirements by time period
              </li>
            </ul>
            <p>
              <strong>Typical Electrical Installation Productivity Rates:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable tray installation:</strong> m/day — Good 35-45, Difficult 15-25
              </li>
              <li>
                <strong>Conduit installation:</strong> m/day — Good 25-35, Difficult 12-18
              </li>
              <li>
                <strong>SWA cable pulling:</strong> m/day (pair) — Good 80-120, Difficult 40-60
              </li>
              <li>
                <strong>Lighting point complete:</strong> points/day — Good 8-12, Difficult 4-6
              </li>
              <li>
                <strong>Socket outlet complete:</strong> points/day — Good 10-15, Difficult 5-8
              </li>
              <li>
                <strong>Distribution board install:</strong> hours each — Good 4-6, Difficult 6-10
              </li>
            </ul>
            <p>
              <strong>Key principle:</strong> Productivity rates vary significantly with
              conditions. Always adjust base rates for project-specific factors.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Resource Histograms and Levelling">
            <p>
              A resource histogram displays resource requirements over time, revealing demand peaks
              and troughs. Resource levelling adjusts activity timing to smooth these variations,
              optimising workforce utilisation and reducing costly fluctuations.
            </p>
            <p>
              <strong>Resource Histogram Elements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>X-axis: Time periods (weeks/days)</li>
              <li>Y-axis: Resource quantity (persons)</li>
              <li>Bars: Demand per period</li>
              <li>Availability line: Maximum resources</li>
              <li>Cumulative curve: Total person-days</li>
            </ul>
            <p>
              <strong>Levelling Techniques:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Delay non-critical activities</li>
              <li>Split activities where practical</li>
              <li>Extend durations with fewer resources</li>
              <li>Accelerate to fill troughs</li>
              <li>Re-sequence within constraints</li>
            </ul>
            <p>
              <strong>Resource Levelling Example (Week — Before — After — Available):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Week 1:</strong> Before 4, After 6, Available 8
              </li>
              <li>
                <strong>Week 2:</strong> Before 12, After 8, Available 8
              </li>
              <li>
                <strong>Week 3:</strong> Before 14, After 8, Available 8
              </li>
              <li>
                <strong>Week 4:</strong> Before 6, After 8, Available 8
              </li>
              <li>
                <strong>Week 5:</strong> Before 4, After 6, Available 8
              </li>
            </ul>
            <p>
              By delaying non-critical activities and extending durations, peaks of 12-14 are
              reduced to maximum 8, matching available resources.
            </p>
            <p>
              <strong>Resource Conflict Resolution —</strong> When demand exceeds availability and
              levelling within float is insufficient, options include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Authorised overtime (cost premium: 1.5-2.0x)</li>
              <li>Weekend working (requires client consent)</li>
              <li>Additional subcontract labour (mobilisation lead time)</li>
              <li>Programme extension (last resort - cost/contractual implications)</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Level resources early in planning. It becomes
              increasingly difficult to resolve conflicts as the project progresses and float is
              consumed.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Materials Procurement Planning">
            <p>
              Effective material procurement ensures items arrive when needed without excessive
              early delivery consuming storage space and working capital. Lead time management is
              critical for long lead items that can delay the entire project if not ordered
              promptly.
            </p>
            <p>
              <strong>Typical Building Services Lead Times:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard cables, accessories:</strong> 1-2 weeks — As required (call-off)
              </li>
              <li>
                <strong>Containment systems:</strong> 2-4 weeks — 2 weeks before first-fix
              </li>
              <li>
                <strong>Distribution boards:</strong> 4-8 weeks — Design approval + 1 week
              </li>
              <li>
                <strong>Bespoke LV switchgear:</strong> 12-16 weeks — Contract award
              </li>
              <li>
                <strong>Standby generators:</strong> 16-26 weeks — Contract award
              </li>
              <li>
                <strong>Transformers (HV/LV):</strong> 20-30 weeks — Pre-contract if possible
              </li>
            </ul>
            <p>
              <strong>Procurement Strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bulk order:</strong> Volume discount, requires storage
              </li>
              <li>
                <strong>Call-off:</strong> Agreed price, deliver as needed
              </li>
              <li>
                <strong>JIT:</strong> Minimal storage, supplier reliability critical
              </li>
              <li>
                <strong>Consignment:</strong> Pay on use, wholesaler holds stock
              </li>
            </ul>
            <p>
              <strong>Material Schedule Contents:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Item description and specification</li>
              <li>Quantity with waste allowance</li>
              <li>Required delivery date</li>
              <li>Approved supplier/manufacturer</li>
              <li>Order status tracking</li>
            </ul>
            <p>
              <strong>Critical action:</strong> Identify and order long lead items immediately after
              contract award. A 16-week switchgear delay cannot be recovered.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Plant Requirements and Productivity Factors">
            <p>
              Plant and equipment requirements must be planned to match programme needs while
              avoiding excessive hire costs from over-ordering. Productivity factors adjust base
              rates for site-specific conditions that affect output.
            </p>
            <p>
              <strong>Common Building Services Plant:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Scissor lift (electric):</strong> Internal high-level work — £150-250/week
              </li>
              <li>
                <strong>Boom lift (diesel):</strong> External/reach-over work — £400-600/week
              </li>
              <li>
                <strong>Cable pulling winch:</strong> Large cable installation — £200-350/week
              </li>
              <li>
                <strong>Hydraulic crimping tools:</strong> Cable termination — £80-120/week
              </li>
              <li>
                <strong>Multifunction tester:</strong> Testing and commissioning — £75-100/week
              </li>
            </ul>
            <p>
              <strong>Productivity Adjustment Factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Working at floor level:</strong> 1.0 — Base rate applies
              </li>
              <li>
                <strong>Stepladder access (under 3m):</strong> 0.85 — 15% reduction
              </li>
              <li>
                <strong>MEWP access required:</strong> 0.60-0.70 — 30-40% reduction
              </li>
              <li>
                <strong>Scaffold tower:</strong> 0.65-0.75 — 25-35% reduction
              </li>
              <li>
                <strong>Occupied building:</strong> 0.70-0.85 — 15-30% reduction
              </li>
              <li>
                <strong>Hospital/clean room:</strong> 0.50-0.70 — 30-50% reduction
              </li>
              <li>
                <strong>Confined spaces:</strong> 0.50-0.65 — 35-50% reduction
              </li>
            </ul>
            <p>
              <strong>Adjusted Productivity Calculation:</strong> Adjusted Rate = Base Rate × Access
              Factor × Occupancy Factor. Example: 40m/day × 0.65 (MEWP) × 0.80 (occupied) =
              20.8m/day.
            </p>
            <p>
              <strong>Planning tip:</strong> Match plant hire periods to actual need. A scissor lift
              needed for 3 weeks of first-fix should not be on hire for the entire project duration.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Labour Duration Calculation:</strong> Calculate the labour
              duration for installing 450m of cable tray at 4m height using scissor lifts. Base
              productivity is 40m/day.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Base productivity: 40m/day</li>
              <li>MEWP factor: 0.65</li>
              <li>
                Adjusted productivity = 40 × 0.65 = <strong>26m/day</strong>
              </li>
              <li>Duration = Quantity / Adjusted rate</li>
              <li>
                Duration = 450m / 26m/day = <strong>17.3 days</strong>
              </li>
              <li>
                <strong>Result:</strong> Allow 18 days (round up for planning).
              </li>
            </ul>
            <p>
              <strong>Example 2 — Resource Levelling:</strong> Week 3 shows demand for 14
              electricians but only 10 are available. Activity B has 2 weeks float. How can this be
              resolved?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Resource conflict = 14 - 10 = 4 electricians over capacity</li>
              <li>Activity B requires 5 electricians</li>
              <li>Activity B has 2 weeks total float</li>
              <li>Solution: Delay Activity B by 1 week</li>
              <li>Week 3 demand reduces from 14 to 9 (within capacity)</li>
              <li>Week 4 demand increases by 5 to accommodate B</li>
              <li>Float consumed: 1 week (1 week remaining)</li>
              <li>
                <strong>Result:</strong> Conflict resolved within float, no programme extension.
              </li>
            </ul>
            <p>
              <strong>Example 3 — Material Delivery Schedule:</strong> Main LV switchgear is
              required on site by Week 20. Lead time is 14 weeks. When must the order be placed and
              what precedes it?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Required on site: Week 20</li>
              <li>Manufacturing lead time: 14 weeks</li>
              <li>
                Latest order date = Week 20 - 14 = <strong>Week 6</strong>
              </li>
              <li>Prerequisites before ordering: design approval (allow 2-3 weeks)</li>
              <li>Technical submittal review (allow 2 weeks)</li>
              <li>Design completion required by: Week 1-2</li>
              <li>
                <strong>Result:</strong> Design must be finalised at contract start for Week 20
                delivery.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Resource planning checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify all activities from WBS with durations</li>
              <li>Assign resource requirements to each activity</li>
              <li>Aggregate resources by time period (histogram)</li>
              <li>Identify peaks exceeding availability</li>
              <li>Level within float where possible</li>
              <li>Plan overtime/additional resources for remaining conflicts</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Cable tray: <strong>35-45m/day</strong> (floor level)
              </li>
              <li>
                MEWP productivity impact: <strong>30-40% reduction</strong>
              </li>
              <li>
                Switchgear lead time: <strong>12-16 weeks</strong>
              </li>
              <li>
                Generator lead time: <strong>16-26 weeks</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Using unadjusted productivity rates</strong> — Always factor in access and
                  conditions
                </li>
                <li>
                  <strong>Ignoring long lead items</strong> — Order immediately after contract award
                </li>
                <li>
                  <strong>Over-manning without benefit</strong> — More workers do not always mean
                  faster completion
                </li>
                <li>
                  <strong>Late levelling</strong> — Level early when float is available
                </li>
              </ul>
            }
            doInstead="Always adjust base productivity rates for access and occupancy, identify and order long lead items immediately after contract award, size crews to match work content rather than over-manning, and level resources early when float is still available."
          />

          <SectionRule />

          <Scenario
            title="Resource peak that triggers an HSE intervention"
            situation={
              <>
                To recover a slipped programme, the project director instructs you to add a second shift of electricians on the Level 4 fit-out. Your resource histogram now shows 28 operatives concurrent in a 600 m² zone, alongside the mechanical second-fix gang of 12 and ceiling installers of 9. Within a week the HSE inspector visits after a near-miss with a falling tool — overcrowding is cited.
              </>
            }
            whatToDo={
              <>
                Halt the doubling-up. Re-resource against the programme using zoning: split Level 4 into east and west halves with electrical leading east one week, mechanical the next, ceilings following. Update the resource histogram and the construction phase plan. Brief the foremen. The genuine recovery comes from sequence and zoning, not headcount.
              </>
            }
            whyItMatters={
              <>
                Workface density is both a productivity issue (rework, wasted travel time, supervision dilution) and a CDM Reg 13 issue. The HSE will judge whether the principal contractor planned resources properly — your histogram and zoning plan is the answer.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Resource = labour (by grade), plant, materials, supervision — assigned to each work package against the programme.",
              "Build a resource histogram — flat is cheap and safe; saw-tooth is expensive, dangerous and disruptive.",
              "Levelling smooths within float; smoothing extends the programme. Choose the trade-off explicitly.",
              "Lead-time materials ordered against need-by dates — not \"as soon as possible\" which lets float decay.",
              "Productivity rates must be defensible — measured outputs from previous projects beat optimism every time.",
              "Workface density is both a productivity and a CDM Reg 13 issue — overcrowding kills both output and people.",
              "Plant utilisation: aim 70–85% — below is waste, above means breakdowns and clashes.",
              "Subcontractor resource plans should be checked against your programme and zoning before they mobilise.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Critical path analysis
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Risk Management
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section1_4;
