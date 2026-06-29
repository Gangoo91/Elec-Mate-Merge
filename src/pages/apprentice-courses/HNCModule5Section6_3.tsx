/**
 * Module 5 · Section 6 · Subsection 3 — Interface Coordination
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Coordination with other trades, client operations, occupied premises and live services — the people-and-process side of MEP delivery.
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

const TITLE = 'Interface Coordination - HNC Module 5 Section 6.3';
const DESCRIPTION =
  'Master interface coordination in building services: trade coordination meetings, sequencing agreements, occupied premises management, isolation coordination, out-of-hours work, and client liaison protocols.';

const quickCheckQuestions = [
  {
    id: 'coordination-meeting-purpose',
    question: 'What is the primary purpose of trade coordination meetings?',
    options: [
      'To agree the final account between the trades on site',
      'To sequence work and resolve clashes before they occur on site',
      'To record daily progress for the site diary',
      'To brief operatives on health and safety before work begins',
    ],
    correctIndex: 1,
    explanation:
      'Trade coordination meetings bring all trades together to plan work sequences, identify potential clashes, and agree access arrangements before work begins, preventing costly on-site delays.',
  },
  {
    id: 'occupied-premises-priority',
    question: 'When working in occupied premises, what should be the primary consideration?',
    options: [
      'Completing the work in the shortest possible time regardless of cost',
      'Keeping the cost of the works to an absolute minimum',
      'Maximising the number of operatives on site each day',
      'Minimising disruption to building users and maintaining safety',
    ],
    correctIndex: 3,
    explanation:
      'In occupied premises, minimising disruption to users whilst maintaining safety for both workers and occupants is paramount. This often requires out-of-hours work and careful phasing.',
  },
  {
    id: 'isolation-coordination',
    question: 'Who must authorise electrical isolations affecting client operations?',
    options: [
      "The site labourer who first identified the circuit",
      "The client's authorised person and the electrical supervisor",
      "The main contractor's quantity surveyor",
      "Any operative holding a current ECS card",
    ],
    correctIndex: 1,
    explanation:
      "Electrical isolations affecting client operations require dual authorisation from the client's authorised person (who understands operational impact) and the electrical supervisor (who confirms safe isolation).",
  },
  {
    id: 'live-services-work',
    question: 'Before working near live services, what documentation is essential?',
    options: [
      'A permit to work system and risk assessment',
      'A signed copy of the contract programme',
      'A delivery note for the materials being installed',
      'The site induction record for each operative',
    ],
    correctIndex: 0,
    explanation:
      'Working near live services requires a formal permit to work system combined with specific risk assessments. This documents the hazards, controls, and authorisations required.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the typical frequency of trade coordination meetings on a major building services project?',
    options: [
      'Daily, at the start of every shift',
      'Weekly during installation phases',
      'Monthly, aligned with the valuation cycle',
      'Only when a clash has already occurred',
    ],
    correctAnswer: 1,
    explanation:
      'Weekly coordination meetings during active installation phases ensure all trades remain aligned. Frequency may reduce during less intensive periods but should never rely solely on reactive meetings.',
  },
  {
    id: 2,
    question: 'A sequencing agreement should include which of the following?',
    options: [
      'The agreed valuation dates and interim payment milestones',
      'The full list of operatives and their ECS card numbers',
      'Access dates, duration, completion dates, and dependencies',
      'The final account figures for each work package',
    ],
    correctAnswer: 2,
    explanation:
      'Effective sequencing agreements define access dates, work duration, completion dates, and dependencies between trades. This allows realistic programming and identifies potential conflicts.',
  },
  {
    id: 3,
    question:
      'When electrical work is required in an occupied hospital ward, what is the preferred approach?',
    options: [
      'Carry out the work during normal daytime ward rounds for supervision',
      'Complete the whole ward in one continuous shift to finish fastest',
      'Isolate the ward supply without notifying clinical staff in advance',
      'Plan work during quietest periods, often nights or weekends',
    ],
    correctAnswer: 3,
    explanation:
      'Hospital work typically requires careful timing around patient needs, often during quieter night shifts or weekends, with close liaison with ward staff to minimise disruption to patient care.',
  },
  {
    id: 4,
    question: "What is a 'look-ahead programme' in interface coordination?",
    options: [
      'A 3-6 week rolling schedule showing upcoming work sequences',
      'The full contract programme fixed at tender stage for the whole job',
      'A record of work already completed in the previous fortnight',
      'A long-term forecast of labour demand across the next 12 months',
    ],
    correctAnswer: 0,
    explanation:
      'A look-ahead programme is a detailed 3-6 week rolling schedule that shows upcoming work in detail, allowing trades to plan resources and identify coordination requirements before work starts.',
  },
  {
    id: 5,
    question: 'Client liaison protocols should establish which of the following?',
    options: [
      'Material order quantities, delivery dates, and supplier contact details',
      'Single point of contact, communication frequency, escalation routes, and approval authorities',
      'Interim valuation amounts, retention percentages, and payment terms',
      'Operative tool registers, plant hire records, and consumable stock levels',
    ],
    correctAnswer: 1,
    explanation:
      'Effective client liaison requires clear protocols defining single points of contact, regular communication schedules, escalation routes for issues, and understanding of who can approve changes.',
  },
  {
    id: 6,
    question:
      'When working in live retail premises, isolation requests should typically be submitted:',
    options: [
      'On the morning of the work',
      'After the work is complete',
      '72 hours to one week in advance',
      'Only verbally to the store manager',
    ],
    correctAnswer: 2,
    explanation:
      'Retail environments need advance notice (typically 72 hours to one week) for isolations to allow business continuity planning, stock protection, and customer communication if required.',
  },
  {
    id: 7,
    question: "What document defines the boundaries between different contractors' work scopes?",
    options: [
      'The look-ahead programme',
      'The construction phase plan',
      'The contract sum analysis',
      'The interface matrix or responsibility matrix',
    ],
    correctAnswer: 3,
    explanation:
      'An interface matrix clearly defines work scope boundaries, showing which contractor is responsible for each element and the handover points between packages.',
  },
  {
    id: 8,
    question: 'Out-of-hours work permits should specifically address:',
    options: [
      'Welfare facilities, emergency procedures, lone working, and client site rules',
      'Interim payment dates, retention release, and final account agreement',
      'Material delivery schedules, storage locations, and waste collection times',
      'Operative qualifications, ECS card expiry dates, and CSCS renewal records',
    ],
    correctAnswer: 0,
    explanation:
      'Out-of-hours permits must address reduced facilities (welfare, first aid), modified emergency procedures, lone working risks, site security, and any specific client requirements for unsupervised access.',
  },
  {
    id: 9,
    question: "A 'hot works' permit near live data services should include:",
    options: [
      'Material quantities, delivery dates, storage and waste removal arrangements',
      'Fire precautions, isolation confirmations, fire watch requirements, and data backup confirmation',
      'Interim valuation amounts, retention percentages, and payment milestones',
      'Operative tool registers, plant hire records, and consumable stock levels',
    ],
    correctAnswer: 1,
    explanation:
      'Hot works near data services require comprehensive controls including fire precautions, confirmation of any required isolations, fire watch arrangements, and verification that critical data has been backed up.',
  },
  {
    id: 10,
    question:
      'When a clash is identified between electrical containment and ductwork, who should make the final decision on the resolution?',
    options: [
      'Whichever trade reaches the area first and installs its services',
      'The site labourer who first noticed the clash on the drawings',
      'The design team, documented through an RFI or technical query',
      'The quantity surveyor, based on which solution costs least',
    ],
    correctAnswer: 2,
    explanation:
      'Design clashes should be resolved through formal processes (RFI - Request for Information) by the design team, ensuring the solution is properly documented and any contract implications addressed.',
  },
  {
    id: 11,
    question: 'What is the purpose of a daily briefing in occupied premises?',
    options: [
      'To record operatives’ hours worked for payroll and timesheets',
      'To agree the day’s interim valuation with the quantity surveyor',
      'To order materials and arrange deliveries for the following week',
      'To confirm work areas, access routes, isolations, and any changes from the plan',
    ],
    correctAnswer: 3,
    explanation:
      'Daily briefings in occupied premises ensure all workers understand current work areas, permitted access routes, any isolations in effect, and changes from previous days - essential for safety and disruption management.',
  },
  {
    id: 12,
    question:
      'A mechanical contractor needs access to an area where you have not completed first fix. The coordination meeting should establish:',
    options: [
      'Whether parallel working is possible, what is required for safe handover, or alternative sequences',
      'Which contractor will bear the cost of any resulting programme delay',
      'How many additional operatives each trade can deploy to the area',
      'The interim valuation date and retention release for the work package',
    ],
    correctAnswer: 0,
    explanation:
      'Coordination meetings should explore options including parallel working with clear demarcation, partial handover of completed sections, or programme adjustments that maintain overall project timescales.',
  },
];

const faqs = [
  {
    question: 'How do I handle a situation where another trade is blocking my access?',
    answer:
      'Raise the issue immediately at the coordination meeting or with the site manager. Provide specific details: what access you need, when, for how long, and what the programme impact will be if not resolved. Document the discussion. Avoid confrontational approaches - focus on solving the problem collaboratively, often through adjusted sequences or temporary works arrangements.',
  },
  {
    question: 'What should I do if client operations change after isolation has been agreed?',
    answer:
      "Never proceed with the original plan if circumstances have changed. Re-engage with the client's authorised person to confirm the new operational requirements, reassess the isolation scope and timing, and formally re-authorise the work. Document the changes. Client operations take precedence over programme pressures.",
  },
  {
    question: 'How much notice should I give for out-of-hours work requests?',
    answer:
      'Typically 2-4 weeks for planned out-of-hours work to allow client approvals, security arrangements, welfare provision, and workforce planning. Emergency out-of-hours work may be authorised more quickly but requires documented justification. Always confirm client site rules for unsupervised access.',
  },
  {
    question: 'What is the best way to coordinate with multiple mechanical contractors?',
    answer:
      'Establish clear interface points documented in a responsibility matrix. Attend all M&E coordination meetings, not just electrical. Build relationships with mechanical supervisors for day-to-day coordination. Use BIM models or marked-up drawings to agree containment routes before installation. Share look-ahead programmes weekly.',
  },
  {
    question: 'How do I manage work in a school during term time?',
    answer:
      'Work during school hours requires meticulous planning: defined access routes avoiding pupil areas, enhanced DBS checking for workers, noise restrictions during lessons, dust and debris control, secure compound for materials, and close liaison with the school facilities manager. Many schools prefer holiday periods for disruptive work.',
  },
  {
    question: 'What records should I keep for interface coordination?',
    answer:
      'Maintain records of all coordination meeting minutes, sequencing agreements, isolation permits, access requests and approvals, RFIs and design change notices, client communications, and any programme impacts or delays. These records are essential for progress claims, delay analysis, and dispute resolution.',
  },
];

const HNCModule5Section6_3 = () => {
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
            eyebrow="Module 5 · Section 6 · Subsection 3"
            title="Interface Coordination"
            description="Coordination with other trades, client operations interface, occupied premises and live services management."
            tone="purple"
          />

          <TLDR
            points={[
              "Interface coordination = managing the boundaries between trades, between phases, and between contractor and operating client.",
              "Trade interfaces: who installs what, who terminates what, who tests what — defined in the WBS and reinforced in pre-start meetings.",
              "Client operations interface: occupied building working, live services, business continuity — risk-assessed and method-statemented.",
              "Live services: isolation procedures, permits to work, lock-off — EAWR Reg 4 mandates working dead unless proven otherwise.",
              "Permits to work: hot work, confined space, working at height, energised — formal authorisation system.",
            ]}
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 14 (Work on or near live conductors)"
            clause="No person shall be engaged in any work activity on or so near any live conductor (other than one suitably covered with insulating material so as to prevent danger) that danger may arise unless — it is unreasonable in all the circumstances for it to be dead; and it is reasonable in all the circumstances for him to be at work on or near it while it is live; and suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury."
            meaning={
              <>
                EAWR Reg 14 is one of the very few absolute duties in UK H&S law: working dead is the default; working live requires all three conditions to be satisfied AND demonstrably so. Permits to work on energised systems must be the exception, not the routine. The PM signing live work permits should be challenging the necessity at every request.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 — legislation.gov.uk"
          />


          <LearningOutcomes
            outcomes={[
              'Plan and participate in effective trade coordination meetings',
              'Develop sequencing agreements with other building services trades',
              'Manage electrical work in occupied and operational premises',
              'Implement isolation coordination protocols with client operations',
              'Organise out-of-hours work safely and effectively',
              'Establish client liaison protocols and communication channels',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Trade Coordination Meetings">
            <p>
              Trade coordination meetings are the cornerstone of successful building services
              installation. On complex projects, multiple M&E contractors must share limited space
              and coordinate their work sequences to avoid costly clashes and delays. Effective
              coordination requires structured meetings, clear documentation, and commitment from
              all parties.
            </p>
            <p>
              <strong>Meeting structure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Frequency:</strong> Weekly during installation, fortnightly during quieter
                periods
              </li>
              <li>
                <strong>Attendees:</strong> Supervisors from all M&E trades, main contractor
                representative
              </li>
              <li>
                <strong>Agenda:</strong> Review of previous actions, look-ahead programme, clash
                resolution, access requests
              </li>
              <li>
                <strong>Output:</strong> Formal minutes with named actions and deadlines
              </li>
            </ul>
            <p>
              <strong>Coordination meeting agenda template:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Previous actions review:</strong> Confirm completion, chase outstanding
                items — 10 minutes
              </li>
              <li>
                <strong>3-week look-ahead:</strong> Review upcoming work, identify clashes — 20
                minutes
              </li>
              <li>
                <strong>Access and sequencing:</strong> Agree work area handovers — 15 minutes
              </li>
              <li>
                <strong>Technical issues:</strong> Design changes, RFIs, clash resolution — 15
                minutes
              </li>
              <li>
                <strong>Programme impacts:</strong> Delays, recovery plans, milestones — 10 minutes
              </li>
              <li>
                <strong>AOB and next meeting:</strong> Safety matters, welfare, upcoming events — 5
                minutes
              </li>
            </ul>
            <p>
              <strong>Real-world example — office refurbishment:</strong> On a 10-floor office
              refurbishment, weekly M&E coordination meetings identified that electrical containment
              routes clashed with new ductwork on floors 3-5. Early identification allowed the
              design team to modify the containment routing before installation began, avoiding an
              estimated 3-week delay and significant abortive work costs.
            </p>
            <p>
              <strong>Best practice:</strong> Circulate meeting minutes within 24 hours whilst
              discussions are fresh. Named actions with clear deadlines ensure accountability.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Sequencing Agreements and Interface Management">
            <p>
              Sequencing agreements formalise the order of work between trades, defining access
              dates, work durations, and handover requirements. On building services projects,
              electrical work typically follows structural completion and precedes or runs parallel
              to mechanical installation.
            </p>
            <p>
              <strong>Typical M&E sequence:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Builders work openings formed</li>
              <li>Primary containment installation</li>
              <li>Main ductwork installation</li>
              <li>Secondary containment and pipework</li>
              <li>Cable installation</li>
              <li>Equipment mounting</li>
              <li>Connections and terminations</li>
              <li>Testing and commissioning</li>
            </ul>
            <p>
              <strong>Interface matrix elements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Work package boundaries</li>
              <li>Responsibility for builder's work</li>
              <li>Power supply termination points</li>
              <li>Control wiring interfaces</li>
              <li>Testing and commissioning boundaries</li>
              <li>Documentation handover requirements</li>
              <li>Warranty interface points</li>
              <li>Maintenance access requirements</li>
            </ul>
            <p>
              <strong>Sequencing agreement components:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Access date:</strong> When area becomes available — Floor 3 from 15/03/2024
              </li>
              <li>
                <strong>Preceding work:</strong> What must be complete first — Ceiling grid
                installed
              </li>
              <li>
                <strong>Work duration:</strong> Time allocated for activity — 2 weeks first fix
                containment
              </li>
              <li>
                <strong>Completion date:</strong> Handover deadline — First fix complete by
                29/03/2024
              </li>
              <li>
                <strong>Following work:</strong> What depends on completion — Ceiling tile
                installation
              </li>
              <li>
                <strong>Handover condition:</strong> State area must be left in — Clean, labelled,
                safe for others
              </li>
            </ul>
            <p>
              <strong>Common sequencing issues:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Containment clashes:</strong> Always coordinate routes before installation
              </li>
              <li>
                <strong>Ceiling void congestion:</strong> Early BIM coordination essential
              </li>
              <li>
                <strong>Access for terminations:</strong> Plan access panels with ceiling contractor
              </li>
              <li>
                <strong>Testing sequences:</strong> Coordinate with mechanical commissioning
              </li>
            </ul>
            <p>
              <strong>Documentation tip:</strong> Always photograph and record interface conditions
              at handover. This protects against claims for damage caused by following trades.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Occupied Premises and Live Services Management">
            <p>
              Working in occupied premises presents unique challenges. Building users continue their
              activities whilst construction work proceeds around them. This requires exceptional
              planning, communication, and flexibility to maintain safety whilst minimising
              disruption to client operations.
            </p>
            <p>
              <strong>Commercial offices:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Work often restricted to out-of-hours</li>
              <li>Noise limits during business hours</li>
              <li>Data and IT systems protection critical</li>
              <li>Weekend working may be required</li>
            </ul>
            <p>
              <strong>Healthcare facilities:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>24/7 operations - no fully quiet periods</li>
              <li>Critical life safety systems</li>
              <li>Infection control requirements</li>
              <li>Patient dignity considerations</li>
            </ul>
            <p>
              <strong>Retail environments:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Customer safety paramount</li>
              <li>Stock protection requirements</li>
              <li>Trading hours restrictions</li>
              <li>Visual impact considerations</li>
            </ul>
            <p>
              <strong>Educational buildings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Safeguarding requirements (DBS checks)</li>
              <li>Term time vs holiday working</li>
              <li>Exam period restrictions</li>
              <li>Noise during teaching hours</li>
            </ul>
            <p>
              <strong>Isolation coordination protocol:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Identify circuits requiring isolation and affected areas
              </li>
              <li>
                <strong>Step 2:</strong> Submit isolation request with scope, duration, and date
                (typically 72+ hours advance)
              </li>
              <li>
                <strong>Step 3:</strong> Obtain written approval from client's authorised person
              </li>
              <li>
                <strong>Step 4:</strong> Coordinate timing with client operations
              </li>
              <li>
                <strong>Step 5:</strong> Implement isolation with lock-off and warning notices
              </li>
              <li>
                <strong>Step 6:</strong> Complete work and test
              </li>
              <li>
                <strong>Step 7:</strong> Re-energise with client authorisation
              </li>
              <li>
                <strong>Step 8:</strong> Document completion and close permit
              </li>
            </ul>
            <p>
              <strong>Real-world example — hospital theatre upgrade:</strong> Upgrading the
              electrical infrastructure to operating theatres required careful coordination with
              clinical staff. Work was scheduled during planned maintenance shutdowns, with backup
              power from mobile generators for adjacent theatres. Each isolation was authorised by
              both the electrical supervisor and the clinical director, with theatre staff
              confirming no operations were scheduled. The work proceeded over six weekends without
              affecting any surgical procedures.
            </p>
            <p>
              <strong>Live services — key controls:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Permit to work:</strong> Mandatory for all work near live services
              </li>
              <li>
                <strong>Risk assessment:</strong> Specific to the task and environment
              </li>
              <li>
                <strong>Barriers and signage:</strong> Physical protection from contact
              </li>
              <li>
                <strong>Competent supervision:</strong> Appropriately qualified personnel
              </li>
              <li>
                <strong>Emergency procedures:</strong> Known and practised by all
              </li>
            </ul>
            <p>
              <strong>Golden rule:</strong> When in doubt, stop and seek clarification. Never
              proceed with work affecting live services without proper authorisation and controls in
              place.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />
          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Out-of-Hours Work and Client Liaison">
            <p>
              Out-of-hours work is often essential in occupied premises to minimise disruption.
              However, it introduces additional risks and requires enhanced planning. Effective
              client liaison protocols ensure clear communication and appropriate authorisations
              throughout the project.
            </p>
            <p>
              <strong>Out-of-hours planning requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Welfare facilities:</strong> Day work — Site facilities available;
                Out-of-hours — May need separate provision
              </li>
              <li>
                <strong>First aid:</strong> Day work — Site first aider on duty; Out-of-hours —
                Trained person in team essential
              </li>
              <li>
                <strong>Emergency contact:</strong> Day work — Site manager available; Out-of-hours
                — Dedicated emergency contact required
              </li>
              <li>
                <strong>Site security:</strong> Day work — Normal site access; Out-of-hours —
                Key/access card arrangements
              </li>
              <li>
                <strong>Lone working:</strong> Day work — Other workers present; Out-of-hours —
                Specific lone worker procedures
              </li>
              <li>
                <strong>Fire procedures:</strong> Day work — Building alarm monitored; Out-of-hours
                — Confirm alarm status, assembly point
              </li>
            </ul>
            <p>
              <strong>Client liaison protocol elements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single point of contact:</strong> Named client representative for day-to-day
                matters
              </li>
              <li>
                <strong>Escalation route:</strong> Clear path for issues requiring higher authority
              </li>
              <li>
                <strong>Communication schedule:</strong> Regular progress updates (weekly minimum)
              </li>
              <li>
                <strong>Approval authorities:</strong> Who can authorise isolations, variations,
                access
              </li>
              <li>
                <strong>Emergency contacts:</strong> 24/7 availability for urgent matters
              </li>
              <li>
                <strong>Documentation requirements:</strong> Reports, permits, completion records
              </li>
            </ul>
            <p>
              <strong>Advance notice requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Planned isolation:</strong> 72 hours - 1 week
              </li>
              <li>
                <strong>Out-of-hours work:</strong> 2-4 weeks
              </li>
              <li>
                <strong>Major shutdowns:</strong> 4-8 weeks
              </li>
              <li>
                <strong>Emergency work:</strong> As soon as practicable
              </li>
            </ul>
            <p>
              <strong>Progress reporting content:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Work completed this period</li>
              <li>Programme status and any delays</li>
              <li>Upcoming work and access needs</li>
              <li>Health and safety matters</li>
              <li>Issues requiring client decision</li>
            </ul>
            <p>
              <strong>Real-world example — data centre upgrade:</strong> A data centre electrical
              upgrade required work during a two-hour maintenance window each Sunday. The client
              liaison protocol included: 48-hour advance confirmation of the window, pre-agreed
              rollback procedures if work overran, direct communication with the data centre manager
              during work, and post-work energisation authorisation. All 12 weekend sessions
              completed successfully within the allocated windows.
            </p>
            <p>
              <strong>Communication tip:</strong> Over-communicate rather than under-communicate.
              Clients prefer to know about potential issues early, even if they don't materialise,
              rather than be surprised by problems.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Coordination meeting action:</strong> The mechanical contractor
              reports they cannot install ductwork on Level 2 because electrical containment is
              incomplete.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Issue raised:</strong> Level 2 ductwork installation blocked by incomplete
                containment
              </li>
              <li>Electrical: First fix 70% complete, issue in riser area</li>
              <li>Mechanical: Need riser access for main duct by Friday</li>
              <li>Main contractor: Ceiling grid due following Monday</li>
              <li>1. Electrical to prioritise riser containment - complete by Thursday</li>
              <li>2. Mechanical to install riser duct Friday-Saturday</li>
              <li>3. Electrical to complete remaining containment Monday</li>
              <li>4. Ceiling contractor access from Tuesday (1 day slip)</li>
              <li>
                <strong>Action:</strong> Electrical supervisor to confirm Thursday completion by
                14:00 today
              </li>
            </ul>
            <p>
              <strong>Example 2 — Isolation request process:</strong> Need to replace a distribution
              board in an occupied office, requiring a 4-hour shutdown of half the floor.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Date of request: Monday 15th January</li>
              <li>Requested isolation date: Saturday 27th January</li>
              <li>Duration: 06:00 - 14:00 (8 hours including contingency)</li>
              <li>DB-2A supplying offices 201-210</li>
              <li>Lighting, small power, data rack supply</li>
              <li>Area normally unoccupied Saturday</li>
              <li>Server room on separate supply (unaffected)</li>
              <li>Emergency lighting from DB-1 (unaffected)</li>
              <li>Facilities manager: Approved 17/01</li>
              <li>IT manager: Confirmed no data impact</li>
              <li>Security: Saturday access arranged</li>
              <li>Work completed 11:30 - 2.5 hours ahead of schedule</li>
            </ul>
            <p>
              <strong>Example 3 — Interface matrix extract:</strong> Who is responsible for the
              control wiring between the BMS panel and the AHU motor control centre?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Interface:</strong> BMS to AHU control wiring
              </li>
              <li>
                <strong>Electrical contractor responsibility:</strong> Containment from BMS panel to
                MCC
              </li>
              <li>Multi-core control cable supply and installation</li>
              <li>Termination at MCC marshalling terminals</li>
              <li>
                <strong>BMS contractor responsibility:</strong> Termination at BMS panel end
              </li>
              <li>Point-to-point testing</li>
              <li>Commissioning and integration</li>
              <li>
                <strong>Mechanical contractor responsibility:</strong> Schedule of control points
                required
              </li>
              <li>MCC internal terminations</li>
              <li>
                <strong>Handover point:</strong> MCC marshalling terminals (row 1-24)
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Coordination meeting preparation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Review previous meeting actions before attending</li>
              <li>Prepare your 3-week look-ahead with resource requirements</li>
              <li>Identify any access or interface issues to raise</li>
              <li>Know your programme status and any delay impacts</li>
              <li>Bring marked-up drawings showing progress and issues</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Coordination meetings: <strong>Weekly</strong> during installation
              </li>
              <li>
                Isolation notice: <strong>72 hours minimum</strong>
              </li>
              <li>
                Out-of-hours planning: <strong>2-4 weeks advance</strong>
              </li>
              <li>
                Minutes circulation: <strong>Within 24 hours</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Informal agreements:</strong> Always document access and sequencing
                </li>
                <li>
                  <strong>Late isolation requests:</strong> Plan ahead, not last minute
                </li>
                <li>
                  <strong>Poor handover photos:</strong> Document interface conditions
                </li>
                <li>
                  <strong>Ignoring client protocols:</strong> Follow their procedures exactly
                </li>
              </ul>
            }
            doInstead="Capture every access and sequencing decision in coordination minutes, submit isolations 72hr+ in advance, photograph interface handovers, and follow client site rules to the letter."
          />

          <SectionRule />

          <Scenario
            title="Live working permit challenged after near-miss"
            situation={
              <>
                An MEP refurbishment in an occupied data centre. The project manager has been signing live work permits routinely for cable additions to live LV switchboards because "the client cannot accept a power-down". A near-miss occurs: an operative drops a tool onto a live busbar, narrowly avoiding contact. The HSE inspects.
              </>
            }
            whatToDo={
              <>
                Stop all live work immediately. Audit every live work permit issued: was working dead truly unreasonable? Was the work itself reasonable to do live? Were the precautions sufficient? In a data centre, alternatives include redundant supply switching, planned outage windows, or staged migration. Engage the client genuinely — most "cannot accept power-down" positions soften when the alternative is a fatality. Issue revised live working procedure aligned to EAWR Reg 14; PM must challenge every request.
              </>
            }
            whyItMatters={
              <>
                EAWR Reg 14 is absolute. Routine live working in MEP refurbishment is the single biggest cause of electrical fatalities in UK construction. The PM's discipline at permit-signing is the difference between a safe project and a Crown Court appearance.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Interface coordination = boundaries between trades, phases, contractor/operating client.",
              "Trade interfaces defined in WBS and reinforced in pre-start meetings.",
              "Client operations interface: occupied working, live services, business continuity.",
              "Live services: EAWR Reg 14 mandates working dead unless proven otherwise.",
              "Permits to work: hot work, confined space, height, energised — formal authorisation.",
              "Lock-off procedures: prove dead before work, prove dead before re-work after break.",
              "PM signs live permits sparingly; challenges every request against Reg 14 three-test.",
              "Routine live working is the leading cause of UK construction electrical fatalities.",
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
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                CDM site compliance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section6_3;
