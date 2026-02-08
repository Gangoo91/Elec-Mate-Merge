import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Shift Handover Procedures - MOET Module 6 Section 4.1";
const DESCRIPTION = "Shift handover protocols, information transfer, continuity procedures, handover documentation and communication standards for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "handover-purpose",
    question: "What is the primary purpose of a shift handover procedure?",
    options: [
      "To finish work early",
      "To ensure all safety-critical information, outstanding work, and system status is accurately transferred from the outgoing to the incoming shift",
      "To check attendance",
      "To allocate car parking spaces"
    ],
    correctIndex: 1,
    explanation: "Shift handover ensures continuity of safety and operations. The incoming team must know: what work is in progress, what hazards are present, what permits are active, what equipment is isolated, and what requires attention."
  },
  {
    id: "handover-content",
    question: "A shift handover report should include which of the following?",
    options: [
      "Only the weather forecast",
      "Current system status, active permits, outstanding work, safety concerns, abnormal conditions, and any items requiring follow-up",
      "Only the names of staff on duty",
      "Only completed work"
    ],
    correctIndex: 1,
    explanation: "A comprehensive handover covers: current system status, active permits to work, outstanding tasks and their priority, safety hazards and precautions in place, abnormal conditions, equipment status, and any items the incoming shift must act upon."
  },
  {
    id: "handover-failure",
    question: "What is the most common cause of handover-related incidents?",
    options: [
      "Too much information being transferred",
      "Incomplete or inaccurate transfer of safety-critical information, particularly regarding equipment isolation status and active permits",
      "Handovers being too formal",
      "Using written rather than verbal handovers"
    ],
    correctIndex: 1,
    explanation: "HSE investigations consistently identify inadequate handovers as a factor in incidents. The most dangerous failures involve: not communicating that equipment is isolated, not transferring active permit information, or not reporting abnormal conditions."
  },
  {
    id: "handover-walkround",
    question: "Why is a joint walk-around considered essential during a shift handover?",
    options: [
      "It gives both teams a chance to stretch their legs",
      "It physically verifies that conditions on the ground match the handover report, confirming isolation status, active work areas, and any temporary safety measures",
      "It is only needed when the weather is good",
      "It replaces the need for written documentation"
    ],
    correctIndex: 1,
    explanation: "A walk-around bridges the gap between what is reported and what is real. It allows the incoming shift to physically verify isolation points, check barriers and warning signs, confirm alarm panel states, and see any temporary measures first-hand. Discrepancies between the report and reality can be resolved before the handover is signed off."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A shift handover should be:",
    options: [
      "A casual conversation in the corridor",
      "A structured, documented process carried out face-to-face at the point of work or control room, with written record",
      "An email sent after leaving site",
      "A text message to the incoming technician"
    ],
    correctAnswer: 1,
    explanation: "Handovers must be structured and documented. A face-to-face exchange ensures information is clearly communicated and questions can be asked. The written record provides an audit trail."
  },
  {
    id: 2,
    question: "During a handover, active permits to work must be:",
    options: [
      "Filed away in the office",
      "Physically transferred to the incoming shift with a face-to-face explanation of the permit conditions, isolation points, and current status",
      "Left on the work area without explanation",
      "Cancelled automatically"
    ],
    correctAnswer: 1,
    explanation: "Active permits must be physically handed over with a verbal explanation. The incoming shift must understand the permit conditions, what work is in progress, where isolation points are, and who the permit holder is."
  },
  {
    id: 3,
    question: "A handover log should be signed by:",
    options: [
      "Only the outgoing shift",
      "Both the outgoing and incoming shift, confirming that information has been accurately transferred and understood",
      "Only the supervisor",
      "Nobody — it is not a legal document"
    ],
    correctAnswer: 1,
    explanation: "Both parties sign to confirm the handover was completed. The outgoing signature confirms they communicated accurately; the incoming signature confirms they received and understood the information."
  },
  {
    id: 4,
    question: "Which of the following should trigger an enhanced or extended handover?",
    options: [
      "A quiet shift with no incidents",
      "Any abnormal condition, active emergency, ongoing work with safety implications, or significant change in system status",
      "A change in the weather",
      "A new menu in the canteen"
    ],
    correctAnswer: 1,
    explanation: "Enhanced handovers are needed when conditions are non-routine: emergencies, abnormal equipment states, active complex work, or any situation where the incoming shift faces unusual risks."
  },
  {
    id: 5,
    question: "If a handover is interrupted before completion, the correct action is to:",
    options: [
      "Continue working without completing the handover",
      "Resume and complete the handover before either party takes on operational responsibility",
      "Send the information by email later",
      "Assume the incoming shift will figure it out"
    ],
    correctAnswer: 1,
    explanation: "An incomplete handover is a safety risk. Both parties must ensure the handover is completed fully. Until the incoming shift has received all critical information, the outgoing shift retains responsibility."
  },
  {
    id: 6,
    question: "The SBAR framework for handover communication stands for:",
    options: [
      "Safety, Budget, Alignment, Records",
      "Situation, Background, Assessment, Recommendation",
      "System, Building, Asset, Report",
      "Site, Building, Area, Room"
    ],
    correctAnswer: 1,
    explanation: "SBAR provides a structured communication format: Situation (what is happening now), Background (context and history), Assessment (what you think the issue is), Recommendation (what action is needed)."
  },
  {
    id: 7,
    question: "Equipment that has been temporarily isolated during maintenance must be:",
    options: [
      "Left for the incoming shift to discover",
      "Clearly communicated during handover with the isolation status, lock-off details, and whether the isolation can be removed",
      "Re-energised before handover",
      "Ignored during handover"
    ],
    correctAnswer: 1,
    explanation: "Isolation status is safety-critical information. The incoming shift must know: what is isolated, where the isolation points are, who holds the locks/keys, and whether the isolation should be maintained or removed."
  },
  {
    id: 8,
    question: "A handover 'walk-around' involves:",
    options: [
      "Taking a walk during the break",
      "The outgoing and incoming shift physically visiting key areas together to verify conditions match the handover report",
      "Walking to the car park",
      "Walking to the nearest coffee shop"
    ],
    correctAnswer: 1,
    explanation: "A walk-around verifies that what is reported in the handover matches reality on the ground. This is particularly important for: isolated equipment, active work areas, temporary safety measures, and any abnormal conditions."
  },
  {
    id: 9,
    question: "In a 24/7 maintenance operation, the handover log provides:",
    options: [
      "A record of who arrived late",
      "A continuous chronological record across all shifts, enabling any manager or investigator to trace the history of events and decisions",
      "A list of TV programmes watched",
      "A record of break times only"
    ],
    correctAnswer: 1,
    explanation: "The handover log creates a continuous narrative across shifts. It enables managers to understand what happened, investigators to trace events, and auditors to verify that safety-critical information was communicated."
  },
  {
    id: 10,
    question: "Under ST1426, effective handover communication demonstrates:",
    options: [
      "The ability to talk quickly",
      "Professional communication skills, attention to safety, and responsibility for ensuring continuity of safe operations",
      "The ability to write neatly",
      "The ability to use social media"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires technicians to demonstrate professional communication and responsibility for safety. Effective handovers show both of these — clear communication of safety-critical information with a sense of personal responsibility for continuity."
  },
  {
    id: 11,
    question: "If you disagree with information in the handover, the correct action is to:",
    options: [
      "Accept it without question",
      "Raise the concern immediately, verify the facts jointly, and resolve the discrepancy before completing the handover",
      "Ignore the discrepancy",
      "Complain to a colleague later"
    ],
    correctAnswer: 1,
    explanation: "Discrepancies must be resolved before the handover is signed off. This may require jointly checking equipment, reviewing logs, or consulting a supervisor. An unresolved discrepancy is a safety risk."
  },
  {
    id: 12,
    question: "A good handover takes:",
    options: [
      "As little time as possible",
      "As long as necessary to communicate all safety-critical information clearly, with time for questions and clarification",
      "Exactly 5 minutes",
      "No time — it should be done by email"
    ],
    correctAnswer: 1,
    explanation: "Handovers should be thorough, not rushed. Complex situations require longer handovers. The goal is clear, accurate communication — not speed. Rushing a handover to save time has contributed to numerous serious incidents."
  }
];

const faqs = [
  {
    question: "What if the incoming shift does not arrive on time?",
    answer: "The outgoing shift must remain on duty until a proper handover can be completed. Never leave a site unmanned or hand over to someone who has not received the full briefing. Report the late arrival to your supervisor and record it in the handover log."
  },
  {
    question: "Should I hand over problems I could not solve?",
    answer: "Absolutely. Outstanding problems, partial repairs, temporary measures, and unresolved faults are the most important handover items. Be specific: what you found, what you tried, what worked, what did not, and what the incoming shift needs to do next."
  },
  {
    question: "How detailed should a handover log entry be?",
    answer: "Detailed enough that someone who was not present can understand the current state of affairs. Include: system status, active work, safety concerns, abnormal conditions, outstanding tasks, and any decisions made. Err on the side of too much detail rather than too little."
  },
  {
    question: "Can a handover be done remotely?",
    answer: "Face-to-face handovers are always preferred for safety-critical information. Remote handovers (phone, video) may be acceptable for low-risk situations but are not suitable when permits to work are active, equipment is isolated, or abnormal conditions exist. Your organisation's procedures will define when remote handovers are acceptable."
  },
  {
    question: "What is a 'cold handover' vs a 'hot handover'?",
    answer: "A 'hot handover' is the standard face-to-face exchange between shifts. A 'cold handover' occurs when there is a gap between shifts (e.g., weekday to weekend) — the outgoing shift leaves a comprehensive written record for the incoming shift to review. Cold handovers carry higher risk because there is no opportunity for questions, so the written record must be especially thorough."
  }
];

const MOETModule6Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 6.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Shift Handover Procedures
          </h1>
          <p className="text-white/80">
            Information transfer, continuity and safety communication between maintenance shifts
          </p>
        </header>

        {/* Summary boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Purpose:</strong> Safe transfer of all critical information between shifts</li>
              <li className="pl-1"><strong>Content:</strong> System status, active permits, outstanding work, hazards</li>
              <li className="pl-1"><strong>Method:</strong> Face-to-face, structured, documented, signed by both parties</li>
              <li className="pl-1"><strong>Framework:</strong> SBAR — Situation, Background, Assessment, Recommendation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Isolation status:</strong> Critical — who is locked off and where</li>
              <li className="pl-1"><strong>Active permits:</strong> Must be physically transferred</li>
              <li className="pl-1"><strong>Walk-around:</strong> Joint verification of conditions</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to communication and safety KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Conduct a structured shift handover following organisational procedures",
              "Communicate safety-critical information including isolation and permit status",
              "Complete handover documentation to an auditable standard",
              "Apply the SBAR communication framework to handover situations",
              "Carry out a handover walk-around to verify reported conditions",
              "Recognise the consequences of inadequate handover communication"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Handovers Matter
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Shift handovers are one of the highest-risk communication events in maintenance
              operations. At the point of handover, safety-critical information must transfer
              from one team to another with complete accuracy. Failures in this transfer have
              been identified as contributing factors in numerous serious incidents across the
              energy, manufacturing and utilities sectors.
            </p>
            <p>
              The Health and Safety Executive (HSE) has published specific guidance on shift
              handovers (HSG256 — &quot;Improving shift handover&quot;) because the evidence is
              clear: the period around shift change is when incidents are most likely to occur.
              The outgoing team is fatigued and focused on finishing; the incoming team has not
              yet established situational awareness. A structured handover procedure closes this
              dangerous gap by ensuring that every piece of safety-critical information is
              formally communicated, documented and acknowledged.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Must Be Communicated</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>System status:</strong> What is running, what is shut down, what is in alarm</li>
                <li className="pl-1"><strong>Active permits:</strong> What work is in progress under permit, isolation details</li>
                <li className="pl-1"><strong>Outstanding tasks:</strong> Incomplete work, pending repairs, follow-up required</li>
                <li className="pl-1"><strong>Safety hazards:</strong> Temporary safety measures, barriers, warning signs</li>
                <li className="pl-1"><strong>Abnormal conditions:</strong> Anything different from normal operation</li>
                <li className="pl-1"><strong>Upcoming events:</strong> Planned shutdowns, deliveries, visitor access</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Handover Gap</p>
              <p className="text-sm text-white">
                The period around shift change is when incidents are most likely to occur. The outgoing
                team is fatigued and focused on finishing; the incoming team has not yet established
                situational awareness. A structured handover procedure closes this dangerous gap.
                Research shows that up to 70% of maintenance-related incidents have poor communication
                as a contributing factor, with handover failures being the most frequently cited
                communication breakdown.
              </p>
            </div>

            <p>
              For electrical maintenance specifically, the risks at handover are acute. Equipment
              may be isolated with lock-off devices in place, live working permits may be active,
              temporary earthing may be applied, or circuits may be in a partially re-energised
              state following testing. If any of this information fails to transfer accurately,
              the incoming technician faces the risk of contact with live conductors, energisation
              of equipment under repair, or removal of safety measures that are still required.
              This is not theoretical — it has happened, and the consequences have been fatal.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The SBAR Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SBAR (Situation, Background, Assessment, Recommendation) provides a structured format
              for communicating complex information clearly and concisely. Originally developed in
              healthcare to reduce communication errors, it has been widely adopted in maintenance
              operations because it forces the communicator to organise their thoughts before speaking
              and ensures the receiver gets information in a logical sequence.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SBAR Applied to Maintenance Handover</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Situation:</strong> &quot;Chiller 2 is currently isolated for compressor bearing replacement. Permit PTW-2847 is active.&quot;</li>
                <li className="pl-1"><strong>Background:</strong> &quot;High vibration was detected during Monday&apos;s PPM. Bearings were ordered Tuesday, arrived this morning.&quot;</li>
                <li className="pl-1"><strong>Assessment:</strong> &quot;Bearings have been replaced. Need to run the compressor on test for 2 hours before returning to normal service.&quot;</li>
                <li className="pl-1"><strong>Recommendation:</strong> &quot;Complete the 2-hour test run, check vibration readings, then cancel the permit and return Chiller 2 to auto.&quot;</li>
              </ul>
            </div>

            <p>
              The power of SBAR is that it prevents the two most common communication failures in
              handovers: information overload (dumping everything at once without structure) and
              information omission (forgetting critical context). By working through each element
              in sequence, the outgoing technician covers the current state, the history, their
              professional judgement, and what needs to happen next. The incoming technician receives
              a complete, logical picture rather than a disjointed collection of facts.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">SBAR Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electrical Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Situation</td>
                      <td className="border border-white/10 px-3 py-2">What is happening right now</td>
                      <td className="border border-white/10 px-3 py-2">DB-3 is isolated — feeds lighting circuits L1-L12 in Zone B</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Background</td>
                      <td className="border border-white/10 px-3 py-2">Context and history</td>
                      <td className="border border-white/10 px-3 py-2">Earth fault detected on L7; IR testing traced to damaged cable in ceiling void</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Assessment</td>
                      <td className="border border-white/10 px-3 py-2">Your professional judgement</td>
                      <td className="border border-white/10 px-3 py-2">Cable needs replacing — approximately 15m run, 2.5mm&#178; T&E through void</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Recommendation</td>
                      <td className="border border-white/10 px-3 py-2">What the incoming shift should do</td>
                      <td className="border border-white/10 px-3 py-2">Replace cable run, test, restore supply. Maintain isolation until complete.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-400 mb-2">Practice SBAR Before You Need It</p>
              <p className="text-sm text-white">
                SBAR becomes second nature with practice. Start using it for everyday communication —
                when reporting faults to your supervisor, briefing colleagues, or requesting materials.
                The more you practise the structure, the more naturally it will flow during the
                high-pressure environment of a shift handover when multiple items need communicating.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Handover Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The handover log or report is a critical document. It provides continuity across shifts,
              creates an audit trail of what information was communicated and when, and serves as a
              reference for anyone who needs to understand the state of operations at any point in
              time. In the event of an incident, the handover log will be one of the first documents
              reviewed by investigators.
            </p>
            <p>
              A well-maintained handover log tells a continuous story across shifts. Reading back
              through several days of entries should give any competent person a clear picture of
              what has been happening: what work was planned, what was completed, what problems
              arose, and how they were resolved. Gaps, vague entries, or missing signatures
              undermine this narrative and create risk — both operational and legal.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Log Contents</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Date and time:</strong> Of the handover</li>
                <li className="pl-1"><strong>Personnel:</strong> Names of outgoing and incoming team members</li>
                <li className="pl-1"><strong>System status summary:</strong> Current state of all major systems</li>
                <li className="pl-1"><strong>Active permits:</strong> Permit numbers, locations, scope, status</li>
                <li className="pl-1"><strong>Outstanding work:</strong> Tasks in progress, pending, or overdue</li>
                <li className="pl-1"><strong>Safety items:</strong> Isolations, temporary measures, hazards</li>
                <li className="pl-1"><strong>Actions for incoming:</strong> Specific tasks for the next shift</li>
                <li className="pl-1"><strong>Signatures:</strong> Both parties confirming the handover</li>
              </ul>
            </div>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Format</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Handover log</td>
                      <td className="border border-white/10 px-3 py-2">Bound book or electronic log</td>
                      <td className="border border-white/10 px-3 py-2">Minimum 3 years (check local policy)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Permit register</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated permit tracking system</td>
                      <td className="border border-white/10 px-3 py-2">Duration of permit + audit period</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Isolation schedule</td>
                      <td className="border border-white/10 px-3 py-2">Whiteboard, CMMS or printed sheet</td>
                      <td className="border border-white/10 px-3 py-2">Until isolation removed and verified</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Walk-around checklist</td>
                      <td className="border border-white/10 px-3 py-2">Printed or electronic form</td>
                      <td className="border border-white/10 px-3 py-2">Filed with handover log</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Digital handover systems are increasingly common, offering advantages such as
              searchability, automatic time-stamping, and integration with the CMMS. However,
              the technology is only as good as the information entered. Whether your organisation
              uses a paper logbook or a digital platform, the principles are identical: be
              thorough, be accurate, be specific, and ensure both parties sign off.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Walk-Around Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A handover walk-around physically verifies that conditions on the ground match the
              handover report. This is particularly important for isolated equipment, active work
              areas, and temporary safety measures. It transforms the handover from a purely
              verbal and written exercise into a physical confirmation of reality.
            </p>
            <p>
              The walk-around should be conducted jointly — the outgoing and incoming technicians
              visit key areas together, with the outgoing technician pointing out specific items
              and the incoming technician confirming they can see and understand them. This is
              not a casual stroll; it is a structured verification exercise that should follow
              a consistent route covering all areas where work has been carried out, equipment
              is isolated, or conditions are abnormal.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Walk-Around Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify isolation points — locks in place, caution notices displayed</li>
                <li className="pl-1">Check active work areas — barriers, warning signs, housekeeping</li>
                <li className="pl-1">Inspect temporary measures — temporary earths, safety barriers, scaffolding</li>
                <li className="pl-1">Review alarm panels — confirm reported alarm states match actual</li>
                <li className="pl-1">Check critical equipment — running status matches handover report</li>
                <li className="pl-1">Verify tools and materials — confirm location of equipment left in work areas</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Extend the Walk-Around</h3>
              <p className="text-sm text-white mb-2">
                Standard walk-arounds cover routine areas, but certain conditions require a more
                thorough physical inspection:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Multiple isolations active:</strong> Visit every isolation point and verify lock-off details</li>
                <li className="pl-1"><strong>Live working in progress:</strong> Verify barriers, supervision arrangements, and rescue equipment</li>
                <li className="pl-1"><strong>Post-incident:</strong> Review any areas affected by the incident, confirm temporary measures</li>
                <li className="pl-1"><strong>Contractor presence:</strong> Verify contractor work areas, permits, and interface points</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The walk-around demonstrates the professional behaviour
              of verifying information rather than accepting it at face value — a critical safety
              habit for maintenance technicians. In your EPA, discussing how you use walk-arounds
              to confirm handover information shows genuine safety awareness.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Building Effective Handover Habits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective handovers are not just about following a procedure — they are about
              developing a professional mindset of responsibility and care. The best maintenance
              technicians treat handovers with the same seriousness as any other safety-critical
              task because they understand that the information they transfer directly affects
              the safety of their colleagues.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Best Practices</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Prepare in advance:</strong> Start writing your handover notes 30 minutes before the end of shift, not at the last minute</li>
                <li className="pl-1"><strong>Use a consistent format:</strong> Follow the SBAR structure for every item to ensure nothing is missed</li>
                <li className="pl-1"><strong>Prioritise safety items:</strong> Cover isolations, permits and hazards first — before routine operational items</li>
                <li className="pl-1"><strong>Encourage questions:</strong> Create an environment where the incoming team feels comfortable asking for clarification</li>
                <li className="pl-1"><strong>Never rush:</strong> If the handover is not complete, it is not complete — do not sign off until you are satisfied</li>
                <li className="pl-1"><strong>Read back critical items:</strong> Ask the incoming technician to repeat back isolation details and permit conditions</li>
              </ul>
            </div>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Common Handover Failure</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consequence</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Prevention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Rushing the handover</td>
                      <td className="border border-white/10 px-3 py-2">Critical information omitted</td>
                      <td className="border border-white/10 px-3 py-2">Allocate adequate time, use a checklist</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Verbal-only handover</td>
                      <td className="border border-white/10 px-3 py-2">No audit trail, details forgotten</td>
                      <td className="border border-white/10 px-3 py-2">Always produce a written record</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Skipping the walk-around</td>
                      <td className="border border-white/10 px-3 py-2">Report does not match reality</td>
                      <td className="border border-white/10 px-3 py-2">Make walk-around mandatory in procedure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Assuming knowledge</td>
                      <td className="border border-white/10 px-3 py-2">Incoming team unaware of changes</td>
                      <td className="border border-white/10 px-3 py-2">Brief as if the incoming team knows nothing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Not flagging abnormal states</td>
                      <td className="border border-white/10 px-3 py-2">Incoming team operates under false assumptions</td>
                      <td className="border border-white/10 px-3 py-2">Highlight deviations from normal prominently</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Responsibility Does Not End at Sign-Off</p>
              <p className="text-sm text-white">
                If you realise after leaving site that you forgot to communicate something important,
                contact the incoming shift immediately — by phone if necessary. A late notification
                is far better than no notification. Record that the additional information was
                communicated and add a supplementary entry to the handover log at your next
                opportunity.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>EPA preparation:</strong> In the professional discussion, you may be asked
              about a time when you had to communicate safety-critical information. Describing a
              well-conducted shift handover — using SBAR, completing the walk-around, and ensuring
              the incoming team understood the situation — demonstrates the communication skills,
              safety awareness and professional responsibility that assessors are looking for.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">SBAR Framework</p>
                <ul className="space-y-0.5">
                  <li>Situation — what is happening now</li>
                  <li>Background — context and history</li>
                  <li>Assessment — your professional judgement</li>
                  <li>Recommendation — what to do next</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Handover Content</p>
                <ul className="space-y-0.5">
                  <li>System status and alarm states</li>
                  <li>Active permits and isolation details</li>
                  <li>Outstanding tasks and priorities</li>
                  <li>Safety hazards and temporary measures</li>
                  <li>Actions required by incoming shift</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Walk-Around Checks</p>
                <ul className="space-y-0.5">
                  <li>Isolation points — locks, notices</li>
                  <li>Active work areas — barriers, signs</li>
                  <li>Temporary safety measures in place</li>
                  <li>Alarm panels — match reported states</li>
                  <li>Equipment running status confirmed</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Principles</p>
                <ul className="space-y-0.5">
                  <li>Face-to-face, structured, documented</li>
                  <li>Both parties sign to confirm</li>
                  <li>Safety items communicated first</li>
                  <li>Never rush — thoroughness over speed</li>
                  <li>HSE guidance: HSG256</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section4-2">
              Next: Communicating with Supervisors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule6Section4_1;
