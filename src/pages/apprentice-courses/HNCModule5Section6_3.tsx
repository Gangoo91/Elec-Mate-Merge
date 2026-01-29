import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Interface Coordination - HNC Module 5 Section 6.3";
const DESCRIPTION = "Master interface coordination in building services: trade coordination meetings, sequencing agreements, occupied premises management, isolation coordination, out-of-hours work, and client liaison protocols.";

const quickCheckQuestions = [
  {
    id: "coordination-meeting-purpose",
    question: "What is the primary purpose of trade coordination meetings?",
    options: ["To assign blame for delays", "To sequence work and resolve clashes before they occur on site", "To reduce the number of workers required", "To replace written method statements"],
    correctIndex: 1,
    explanation: "Trade coordination meetings bring all trades together to plan work sequences, identify potential clashes, and agree access arrangements before work begins, preventing costly on-site delays."
  },
  {
    id: "occupied-premises-priority",
    question: "When working in occupied premises, what should be the primary consideration?",
    options: ["Speed of work completion", "Minimising disruption to building users and maintaining safety", "Reducing material costs", "Maximising the workforce on site"],
    correctIndex: 1,
    explanation: "In occupied premises, minimising disruption to users whilst maintaining safety for both workers and occupants is paramount. This often requires out-of-hours work and careful phasing."
  },
  {
    id: "isolation-coordination",
    question: "Who must authorise electrical isolations affecting client operations?",
    options: ["Any electrician on site", "The main contractor only", "The client's authorised person and the electrical supervisor", "The building caretaker"],
    correctIndex: 2,
    explanation: "Electrical isolations affecting client operations require dual authorisation from the client's authorised person (who understands operational impact) and the electrical supervisor (who confirms safe isolation)."
  },
  {
    id: "live-services-work",
    question: "Before working near live services, what documentation is essential?",
    options: ["Only a verbal agreement", "A permit to work system and risk assessment", "Just a method statement", "An email confirmation"],
    correctIndex: 1,
    explanation: "Working near live services requires a formal permit to work system combined with specific risk assessments. This documents the hazards, controls, and authorisations required."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical frequency of trade coordination meetings on a major building services project?",
    options: [
      "Monthly",
      "Weekly during installation phases",
      "Only at project start",
      "Whenever problems occur"
    ],
    correctAnswer: 1,
    explanation: "Weekly coordination meetings during active installation phases ensure all trades remain aligned. Frequency may reduce during less intensive periods but should never rely solely on reactive meetings."
  },
  {
    id: 2,
    question: "A sequencing agreement should include which of the following?",
    options: [
      "Only start dates for each trade",
      "Access dates, duration, completion dates, and dependencies",
      "Just the final completion date",
      "Penalty clauses only"
    ],
    correctAnswer: 1,
    explanation: "Effective sequencing agreements define access dates, work duration, completion dates, and dependencies between trades. This allows realistic programming and identifies potential conflicts."
  },
  {
    id: 3,
    question: "When electrical work is required in an occupied hospital ward, what is the preferred approach?",
    options: [
      "Work during normal hours and ask patients to leave",
      "Plan work during quietest periods, often nights or weekends",
      "Close the ward permanently",
      "Work at maximum speed during the day"
    ],
    correctAnswer: 1,
    explanation: "Hospital work typically requires careful timing around patient needs, often during quieter night shifts or weekends, with close liaison with ward staff to minimise disruption to patient care."
  },
  {
    id: 4,
    question: "What is a 'look-ahead programme' in interface coordination?",
    options: [
      "A 3-6 week rolling schedule showing upcoming work sequences",
      "The original project programme",
      "A report on completed work",
      "The final handover schedule"
    ],
    correctAnswer: 0,
    explanation: "A look-ahead programme is a detailed 3-6 week rolling schedule that shows upcoming work in detail, allowing trades to plan resources and identify coordination requirements before work starts."
  },
  {
    id: 5,
    question: "Client liaison protocols should establish which of the following?",
    options: [
      "Only emergency contact numbers",
      "Single point of contact, communication frequency, escalation routes, and approval authorities",
      "Just the project manager's details",
      "A list of all workers on site"
    ],
    correctAnswer: 1,
    explanation: "Effective client liaison requires clear protocols defining single points of contact, regular communication schedules, escalation routes for issues, and understanding of who can approve changes."
  },
  {
    id: 6,
    question: "When working in live retail premises, isolation requests should typically be submitted:",
    options: [
      "On the morning of the work",
      "72 hours to one week in advance",
      "After the work is complete",
      "Only verbally to the store manager"
    ],
    correctAnswer: 1,
    explanation: "Retail environments need advance notice (typically 72 hours to one week) for isolations to allow business continuity planning, stock protection, and customer communication if required."
  },
  {
    id: 7,
    question: "What document defines the boundaries between different contractors' work scopes?",
    options: [
      "The health and safety plan",
      "The interface matrix or responsibility matrix",
      "The building regulations",
      "The insurance certificate"
    ],
    correctAnswer: 1,
    explanation: "An interface matrix clearly defines work scope boundaries, showing which contractor is responsible for each element and the handover points between packages."
  },
  {
    id: 8,
    question: "Out-of-hours work permits should specifically address:",
    options: [
      "Only the work to be done",
      "Welfare facilities, emergency procedures, lone working, and client site rules",
      "Just the overtime rates",
      "The weather forecast"
    ],
    correctAnswer: 1,
    explanation: "Out-of-hours permits must address reduced facilities (welfare, first aid), modified emergency procedures, lone working risks, site security, and any specific client requirements for unsupervised access."
  },
  {
    id: 9,
    question: "A 'hot works' permit near live data services should include:",
    options: [
      "Only fire extinguisher provision",
      "Fire precautions, isolation confirmations, fire watch requirements, and data backup confirmation",
      "Just the start time",
      "The worker's qualifications only"
    ],
    correctAnswer: 1,
    explanation: "Hot works near data services require comprehensive controls including fire precautions, confirmation of any required isolations, fire watch arrangements, and verification that critical data has been backed up."
  },
  {
    id: 10,
    question: "When a clash is identified between electrical containment and ductwork, who should make the final decision on the resolution?",
    options: [
      "Whichever contractor arrived first",
      "The design team, documented through an RFI or technical query",
      "The electrician installing the containment",
      "The building owner"
    ],
    correctAnswer: 1,
    explanation: "Design clashes should be resolved through formal processes (RFI - Request for Information) by the design team, ensuring the solution is properly documented and any contract implications addressed."
  },
  {
    id: 11,
    question: "What is the purpose of a daily briefing in occupied premises?",
    options: [
      "To replace the project programme",
      "To confirm work areas, access routes, isolations, and any changes from the plan",
      "To issue new contracts",
      "To replace method statements"
    ],
    correctAnswer: 1,
    explanation: "Daily briefings in occupied premises ensure all workers understand current work areas, permitted access routes, any isolations in effect, and changes from previous days - essential for safety and disruption management."
  },
  {
    id: 12,
    question: "A mechanical contractor needs access to an area where you have not completed first fix. The coordination meeting should establish:",
    options: [
      "That they must wait indefinitely",
      "Whether parallel working is possible, what is required for safe handover, or alternative sequences",
      "That you will speed up your work",
      "Nothing - it is not your problem"
    ],
    correctAnswer: 1,
    explanation: "Coordination meetings should explore options including parallel working with clear demarcation, partial handover of completed sections, or programme adjustments that maintain overall project timescales."
  }
];

const faqs = [
  {
    question: "How do I handle a situation where another trade is blocking my access?",
    answer: "Raise the issue immediately at the coordination meeting or with the site manager. Provide specific details: what access you need, when, for how long, and what the programme impact will be if not resolved. Document the discussion. Avoid confrontational approaches - focus on solving the problem collaboratively, often through adjusted sequences or temporary works arrangements."
  },
  {
    question: "What should I do if client operations change after isolation has been agreed?",
    answer: "Never proceed with the original plan if circumstances have changed. Re-engage with the client's authorised person to confirm the new operational requirements, reassess the isolation scope and timing, and formally re-authorise the work. Document the changes. Client operations take precedence over programme pressures."
  },
  {
    question: "How much notice should I give for out-of-hours work requests?",
    answer: "Typically 2-4 weeks for planned out-of-hours work to allow client approvals, security arrangements, welfare provision, and workforce planning. Emergency out-of-hours work may be authorised more quickly but requires documented justification. Always confirm client site rules for unsupervised access."
  },
  {
    question: "What is the best way to coordinate with multiple mechanical contractors?",
    answer: "Establish clear interface points documented in a responsibility matrix. Attend all M&E coordination meetings, not just electrical. Build relationships with mechanical supervisors for day-to-day coordination. Use BIM models or marked-up drawings to agree containment routes before installation. Share look-ahead programmes weekly."
  },
  {
    question: "How do I manage work in a school during term time?",
    answer: "Work during school hours requires meticulous planning: defined access routes avoiding pupil areas, enhanced DBS checking for workers, noise restrictions during lessons, dust and debris control, secure compound for materials, and close liaison with the school facilities manager. Many schools prefer holiday periods for disruptive work."
  },
  {
    question: "What records should I keep for interface coordination?",
    answer: "Maintain records of all coordination meeting minutes, sequencing agreements, isolation permits, access requests and approvals, RFIs and design change notices, client communications, and any programme impacts or delays. These records are essential for progress claims, delay analysis, and dispute resolution."
  }
];

const HNCModule5Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Interface Coordination
          </h1>
          <p className="text-white/80">
            Coordination with other trades, client operations interface, occupied premises and live services management
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Trade coordination:</strong> Weekly meetings, look-ahead programmes</li>
              <li className="pl-1"><strong>Occupied premises:</strong> Minimise disruption, maintain safety</li>
              <li className="pl-1"><strong>Isolation protocol:</strong> Dual authorisation, advance notice</li>
              <li className="pl-1"><strong>Client liaison:</strong> Single point of contact, clear escalation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>M&E coordination:</strong> Critical for containment routes</li>
              <li className="pl-1"><strong>Live services:</strong> Permit to work essential</li>
              <li className="pl-1"><strong>Out-of-hours:</strong> 2-4 weeks advance planning</li>
              <li className="pl-1"><strong>Documentation:</strong> Records for claims and disputes</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Plan and participate in effective trade coordination meetings",
              "Develop sequencing agreements with other building services trades",
              "Manage electrical work in occupied and operational premises",
              "Implement isolation coordination protocols with client operations",
              "Organise out-of-hours work safely and effectively",
              "Establish client liaison protocols and communication channels"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Trade Coordination Meetings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Trade Coordination Meetings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Trade coordination meetings are the cornerstone of successful building services installation.
              On complex projects, multiple M&E contractors must share limited space and coordinate
              their work sequences to avoid costly clashes and delays. Effective coordination requires
              structured meetings, clear documentation, and commitment from all parties.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Meeting Structure:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Frequency:</strong> Weekly during installation, fortnightly during quieter periods</li>
                <li className="pl-1"><strong>Attendees:</strong> Supervisors from all M&E trades, main contractor representative</li>
                <li className="pl-1"><strong>Agenda:</strong> Review of previous actions, look-ahead programme, clash resolution, access requests</li>
                <li className="pl-1"><strong>Output:</strong> Formal minutes with named actions and deadlines</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Meeting Agenda Template</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Item</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Previous actions review</td>
                      <td className="border border-white/10 px-3 py-2">Confirm completion, chase outstanding items</td>
                      <td className="border border-white/10 px-3 py-2">10 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3-week look-ahead</td>
                      <td className="border border-white/10 px-3 py-2">Review upcoming work, identify clashes</td>
                      <td className="border border-white/10 px-3 py-2">20 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Access and sequencing</td>
                      <td className="border border-white/10 px-3 py-2">Agree work area handovers</td>
                      <td className="border border-white/10 px-3 py-2">15 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Technical issues</td>
                      <td className="border border-white/10 px-3 py-2">Design changes, RFIs, clash resolution</td>
                      <td className="border border-white/10 px-3 py-2">15 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Programme impacts</td>
                      <td className="border border-white/10 px-3 py-2">Delays, recovery plans, milestones</td>
                      <td className="border border-white/10 px-3 py-2">10 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AOB and next meeting</td>
                      <td className="border border-white/10 px-3 py-2">Safety matters, welfare, upcoming events</td>
                      <td className="border border-white/10 px-3 py-2">5 minutes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World Example: Office Refurbishment</p>
              <p className="text-sm text-white/90">
                On a 10-floor office refurbishment, weekly M&E coordination meetings identified that
                electrical containment routes clashed with new ductwork on floors 3-5. Early identification
                allowed the design team to modify the containment routing before installation began,
                avoiding an estimated 3-week delay and significant abortive work costs.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Circulate meeting minutes within 24 hours whilst discussions
              are fresh. Named actions with clear deadlines ensure accountability.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Sequencing Agreements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Sequencing Agreements and Interface Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sequencing agreements formalise the order of work between trades, defining access dates,
              work durations, and handover requirements. On building services projects, electrical work
              typically follows structural completion and precedes or runs parallel to mechanical installation.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical M&E Sequence</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Builders work openings formed</li>
                  <li className="pl-1">Primary containment installation</li>
                  <li className="pl-1">Main ductwork installation</li>
                  <li className="pl-1">Secondary containment and pipework</li>
                  <li className="pl-1">Cable installation</li>
                  <li className="pl-1">Equipment mounting</li>
                  <li className="pl-1">Connections and terminations</li>
                  <li className="pl-1">Testing and commissioning</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interface Matrix Elements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Work package boundaries</li>
                  <li className="pl-1">Responsibility for builder's work</li>
                  <li className="pl-1">Power supply termination points</li>
                  <li className="pl-1">Control wiring interfaces</li>
                  <li className="pl-1">Testing and commissioning boundaries</li>
                  <li className="pl-1">Documentation handover requirements</li>
                  <li className="pl-1">Warranty interface points</li>
                  <li className="pl-1">Maintenance access requirements</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sequencing Agreement Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Detail Required</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Access date</td>
                      <td className="border border-white/10 px-3 py-2">When area becomes available</td>
                      <td className="border border-white/10 px-3 py-2">Floor 3 from 15/03/2024</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Preceding work</td>
                      <td className="border border-white/10 px-3 py-2">What must be complete first</td>
                      <td className="border border-white/10 px-3 py-2">Ceiling grid installed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Work duration</td>
                      <td className="border border-white/10 px-3 py-2">Time allocated for activity</td>
                      <td className="border border-white/10 px-3 py-2">2 weeks first fix containment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Completion date</td>
                      <td className="border border-white/10 px-3 py-2">Handover deadline</td>
                      <td className="border border-white/10 px-3 py-2">First fix complete by 29/03/2024</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Following work</td>
                      <td className="border border-white/10 px-3 py-2">What depends on completion</td>
                      <td className="border border-white/10 px-3 py-2">Ceiling tile installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Handover condition</td>
                      <td className="border border-white/10 px-3 py-2">State area must be left in</td>
                      <td className="border border-white/10 px-3 py-2">Clean, labelled, safe for others</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Sequencing Issues</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Containment clashes:</strong> Always coordinate routes before installation</li>
                <li className="pl-1"><strong>Ceiling void congestion:</strong> Early BIM coordination essential</li>
                <li className="pl-1"><strong>Access for terminations:</strong> Plan access panels with ceiling contractor</li>
                <li className="pl-1"><strong>Testing sequences:</strong> Coordinate with mechanical commissioning</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Documentation tip:</strong> Always photograph and record interface conditions at
              handover. This protects against claims for damage caused by following trades.
            </p>
          </div>
        </section>

        {/* Section 3: Occupied Premises and Live Services */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Occupied Premises and Live Services Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Working in occupied premises presents unique challenges. Building users continue their
              activities whilst construction work proceeds around them. This requires exceptional
              planning, communication, and flexibility to maintain safety whilst minimising disruption
              to client operations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Occupied Premises</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Commercial Offices</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Work often restricted to out-of-hours</li>
                    <li>Noise limits during business hours</li>
                    <li>Data and IT systems protection critical</li>
                    <li>Weekend working may be required</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Healthcare Facilities</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>24/7 operations - no fully quiet periods</li>
                    <li>Critical life safety systems</li>
                    <li>Infection control requirements</li>
                    <li>Patient dignity considerations</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Retail Environments</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Customer safety paramount</li>
                    <li>Stock protection requirements</li>
                    <li>Trading hours restrictions</li>
                    <li>Visual impact considerations</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Educational Buildings</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Safeguarding requirements (DBS checks)</li>
                    <li>Term time vs holiday working</li>
                    <li>Exam period restrictions</li>
                    <li>Noise during teaching hours</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Isolation Coordination Protocol</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Identify circuits requiring isolation and affected areas</li>
                <li className="pl-1"><strong>Step 2:</strong> Submit isolation request with scope, duration, and date (typically 72+ hours advance)</li>
                <li className="pl-1"><strong>Step 3:</strong> Obtain written approval from client's authorised person</li>
                <li className="pl-1"><strong>Step 4:</strong> Coordinate timing with client operations</li>
                <li className="pl-1"><strong>Step 5:</strong> Implement isolation with lock-off and warning notices</li>
                <li className="pl-1"><strong>Step 6:</strong> Complete work and test</li>
                <li className="pl-1"><strong>Step 7:</strong> Re-energise with client authorisation</li>
                <li className="pl-1"><strong>Step 8:</strong> Document completion and close permit</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World Example: Hospital Theatre Upgrade</p>
              <p className="text-sm text-white/90">
                Upgrading the electrical infrastructure to operating theatres required careful coordination
                with clinical staff. Work was scheduled during planned maintenance shutdowns, with backup
                power from mobile generators for adjacent theatres. Each isolation was authorised by both
                the electrical supervisor and the clinical director, with theatre staff confirming no
                operations were scheduled. The work proceeded over six weekends without affecting any
                surgical procedures.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Live Services - Key Controls</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Permit to work:</strong> Mandatory for all work near live services</li>
                <li className="pl-1"><strong>Risk assessment:</strong> Specific to the task and environment</li>
                <li className="pl-1"><strong>Barriers and signage:</strong> Physical protection from contact</li>
                <li className="pl-1"><strong>Competent supervision:</strong> Appropriately qualified personnel</li>
                <li className="pl-1"><strong>Emergency procedures:</strong> Known and practised by all</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Golden rule:</strong> When in doubt, stop and seek clarification. Never proceed
              with work affecting live services without proper authorisation and controls in place.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />
        <div className="mt-8">
          <InlineCheck {...quickCheckQuestions[2]} />
        </div>

        {/* Section 4: Out-of-Hours Work and Client Liaison */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Out-of-Hours Work and Client Liaison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Out-of-hours work is often essential in occupied premises to minimise disruption. However,
              it introduces additional risks and requires enhanced planning. Effective client liaison
              protocols ensure clear communication and appropriate authorisations throughout the project.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Out-of-Hours Planning Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Day Work</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Out-of-Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Welfare facilities</td>
                      <td className="border border-white/10 px-3 py-2">Site facilities available</td>
                      <td className="border border-white/10 px-3 py-2">May need separate provision</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">First aid</td>
                      <td className="border border-white/10 px-3 py-2">Site first aider on duty</td>
                      <td className="border border-white/10 px-3 py-2">Trained person in team essential</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency contact</td>
                      <td className="border border-white/10 px-3 py-2">Site manager available</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated emergency contact required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Site security</td>
                      <td className="border border-white/10 px-3 py-2">Normal site access</td>
                      <td className="border border-white/10 px-3 py-2">Key/access card arrangements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lone working</td>
                      <td className="border border-white/10 px-3 py-2">Other workers present</td>
                      <td className="border border-white/10 px-3 py-2">Specific lone worker procedures</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire procedures</td>
                      <td className="border border-white/10 px-3 py-2">Building alarm monitored</td>
                      <td className="border border-white/10 px-3 py-2">Confirm alarm status, assembly point</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Client Liaison Protocol Elements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Single point of contact:</strong> Named client representative for day-to-day matters</li>
                <li className="pl-1"><strong>Escalation route:</strong> Clear path for issues requiring higher authority</li>
                <li className="pl-1"><strong>Communication schedule:</strong> Regular progress updates (weekly minimum)</li>
                <li className="pl-1"><strong>Approval authorities:</strong> Who can authorise isolations, variations, access</li>
                <li className="pl-1"><strong>Emergency contacts:</strong> 24/7 availability for urgent matters</li>
                <li className="pl-1"><strong>Documentation requirements:</strong> Reports, permits, completion records</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advance Notice Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Planned isolation:</strong> 72 hours - 1 week</li>
                  <li className="pl-1"><strong>Out-of-hours work:</strong> 2-4 weeks</li>
                  <li className="pl-1"><strong>Major shutdowns:</strong> 4-8 weeks</li>
                  <li className="pl-1"><strong>Emergency work:</strong> As soon as practicable</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Progress Reporting Content</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Work completed this period</li>
                  <li className="pl-1">Programme status and any delays</li>
                  <li className="pl-1">Upcoming work and access needs</li>
                  <li className="pl-1">Health and safety matters</li>
                  <li className="pl-1">Issues requiring client decision</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World Example: Data Centre Upgrade</p>
              <p className="text-sm text-white/90">
                A data centre electrical upgrade required work during a two-hour maintenance window each
                Sunday. The client liaison protocol included: 48-hour advance confirmation of the window,
                pre-agreed rollback procedures if work overran, direct communication with the data centre
                manager during work, and post-work energisation authorisation. All 12 weekend sessions
                completed successfully within the allocated windows.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Communication tip:</strong> Over-communicate rather than under-communicate. Clients
              prefer to know about potential issues early, even if they don't materialise, rather than
              be surprised by problems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Coordination Meeting Action</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> The mechanical contractor reports they cannot install ductwork
                on Level 2 because electrical containment is incomplete.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-elec-yellow">Issue raised:</p>
                <p>Level 2 ductwork installation blocked by incomplete containment</p>
                <p className="mt-2 text-elec-yellow">Discussion:</p>
                <p>- Electrical: First fix 70% complete, issue in riser area</p>
                <p>- Mechanical: Need riser access for main duct by Friday</p>
                <p>- Main contractor: Ceiling grid due following Monday</p>
                <p className="mt-2 text-elec-yellow">Resolution:</p>
                <p>1. Electrical to prioritise riser containment - complete by Thursday</p>
                <p>2. Mechanical to install riser duct Friday-Saturday</p>
                <p>3. Electrical to complete remaining containment Monday</p>
                <p>4. Ceiling contractor access from Tuesday (1 day slip)</p>
                <p className="mt-2 text-green-400">Action: Electrical supervisor to confirm Thursday completion by 14:00 today</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Isolation Request Process</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Need to replace a distribution board in an occupied office,
                requiring a 4-hour shutdown of half the floor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-elec-yellow">Isolation Request Form:</p>
                <p>Date of request: Monday 15th January</p>
                <p>Requested isolation date: Saturday 27th January</p>
                <p>Duration: 06:00 - 14:00 (8 hours including contingency)</p>
                <p className="mt-2 text-elec-yellow">Circuits affected:</p>
                <p>DB-2A supplying offices 201-210</p>
                <p>Lighting, small power, data rack supply</p>
                <p className="mt-2 text-elec-yellow">Business impact:</p>
                <p>- Area normally unoccupied Saturday</p>
                <p>- Server room on separate supply (unaffected)</p>
                <p>- Emergency lighting from DB-1 (unaffected)</p>
                <p className="mt-2 text-elec-yellow">Approvals required:</p>
                <p>- Facilities manager: Approved 17/01</p>
                <p>- IT manager: Confirmed no data impact</p>
                <p>- Security: Saturday access arranged</p>
                <p className="mt-2 text-green-400">Work completed 11:30 - 2.5 hours ahead of schedule</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Interface Matrix Extract</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Who is responsible for the control wiring between the BMS
                panel and the AHU motor control centre?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-elec-yellow">Interface Matrix Entry:</p>
                <p>Interface: BMS to AHU control wiring</p>
                <p className="mt-2">Electrical contractor responsibility:</p>
                <p>- Containment from BMS panel to MCC</p>
                <p>- Multi-core control cable supply and installation</p>
                <p>- Termination at MCC marshalling terminals</p>
                <p className="mt-2">BMS contractor responsibility:</p>
                <p>- Termination at BMS panel end</p>
                <p>- Point-to-point testing</p>
                <p>- Commissioning and integration</p>
                <p className="mt-2">Mechanical contractor responsibility:</p>
                <p>- Schedule of control points required</p>
                <p>- MCC internal terminations</p>
                <p className="mt-2 text-elec-yellow">Handover point: MCC marshalling terminals (row 1-24)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Meeting Preparation</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Review previous meeting actions before attending</li>
                <li className="pl-1">Prepare your 3-week look-ahead with resource requirements</li>
                <li className="pl-1">Identify any access or interface issues to raise</li>
                <li className="pl-1">Know your programme status and any delay impacts</li>
                <li className="pl-1">Bring marked-up drawings showing progress and issues</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Coordination meetings: <strong>Weekly</strong> during installation</li>
                <li className="pl-1">Isolation notice: <strong>72 hours minimum</strong></li>
                <li className="pl-1">Out-of-hours planning: <strong>2-4 weeks advance</strong></li>
                <li className="pl-1">Minutes circulation: <strong>Within 24 hours</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Informal agreements:</strong> Always document access and sequencing</li>
                <li className="pl-1"><strong>Late isolation requests:</strong> Plan ahead, not last minute</li>
                <li className="pl-1"><strong>Poor handover photos:</strong> Document interface conditions</li>
                <li className="pl-1"><strong>Ignoring client protocols:</strong> Follow their procedures exactly</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Coordination Essentials</p>
                <ul className="space-y-0.5">
                  <li>Weekly M&E coordination meetings</li>
                  <li>3-6 week look-ahead programmes</li>
                  <li>Interface matrix for boundaries</li>
                  <li>RFIs for design clash resolution</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Occupied Premises</p>
                <ul className="space-y-0.5">
                  <li>Minimise disruption, maintain safety</li>
                  <li>Dual authorisation for isolations</li>
                  <li>Permit to work for live services</li>
                  <li>Out-of-hours: lone worker procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section6_3;
