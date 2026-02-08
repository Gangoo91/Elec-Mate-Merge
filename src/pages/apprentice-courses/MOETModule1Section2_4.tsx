import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Approach Distances and Live Working Restrictions - MOET Module 1.2.4";
const DESCRIPTION = "Complete guide to safe approach distances and live working restrictions for electrical maintenance: EAWR Regulation 14, HV approach distances, LV limits, barriering, ENA TS 43-8, risk assessment, competence and Regulation 29 defence.";

const quickCheckQuestions = [
  {
    id: "reg14-conditions",
    question: "Under EAWR 1989 Regulation 14, live working is permitted ONLY when which three conditions are ALL satisfied?",
    options: [
      "The work is urgent, the worker is experienced, and PPE is available",
      "It is unreasonable to work dead, it is reasonable to work live, and suitable precautions are taken",
      "The client requests it, the worker agrees, and a risk assessment exists",
      "The voltage is below 1000 V, the worker is competent, and barriers are in place"
    ],
    correctIndex: 1,
    explanation: "Regulation 14 has three cumulative conditions that ALL must be met: (1) it is unreasonable in all circumstances for the conductor to be dead, (2) it is reasonable in all circumstances for the person to be at work on or near the conductor while it is live, and (3) suitable precautions (including PPE) are taken to prevent injury. All three must be satisfied — if any one fails, the work must not proceed live."
  },
  {
    id: "hv-approach",
    question: "For an 11 kV system, what is the minimum safe approach distance for untrained persons?",
    options: [
      "1.0 metre",
      "1.5 metres",
      "3.0 metres",
      "5.0 metres"
    ],
    correctIndex: 2,
    explanation: "For 11 kV systems, the minimum safe approach distance for untrained or unaccompanied persons is typically 3.0 metres (ENA TS 43-8). Authorised persons working under controlled conditions with appropriate PPE may work within closer defined limits, but these distances require formal authorisation, risk assessment and specific competence. The exact distances vary between DNO and organisational safety rules."
  },
  {
    id: "accompaniment",
    question: "When carrying out live working on a low voltage system, the minimum requirement for accompaniment is:",
    options: [
      "No accompaniment is needed at any voltage",
      "A second competent person must be present who can render the circuit dead in an emergency",
      "Any other person on site, regardless of competence",
      "Accompaniment is only required for HV work"
    ],
    correctIndex: 1,
    explanation: "For live LV work, a second competent person must be present who is capable of rendering the circuit dead in an emergency and providing first aid (including CPR). This person must know the location of the isolation point and be able to reach it quickly. They should also know how to call for emergency services. This accompaniment requirement is a fundamental precaution under Regulation 14."
  },
  {
    id: "reg29-defence",
    question: "Regulation 29 of the EAWR 1989 provides what type of legal defence?",
    options: [
      "Absolute immunity from prosecution",
      "A defence that the person took all reasonable precautions and exercised all due diligence to avoid the offence",
      "A defence that the employer should be blamed instead of the worker",
      "A defence that the regulations do not apply to self-employed persons"
    ],
    correctIndex: 1,
    explanation: "Regulation 29 provides a 'due diligence' defence: if charged with an offence under Regulations 4-16 (which impose absolute duties), a person may prove that they took all reasonable precautions and exercised all due diligence to avoid committing the offence. This is a high bar — it requires demonstrating systematic, documented compliance, not just good intentions."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Regulation 14 of the EAWR 1989 states that no person shall work on or near a live conductor UNLESS:",
    options: [
      "The work is minor and will take less than 5 minutes",
      "It is unreasonable to work dead, reasonable to work live, and suitable precautions are taken",
      "The voltage is below 50 V AC",
      "The worker has more than 5 years' experience"
    ],
    correctAnswer: 1,
    explanation: "Regulation 14 establishes the absolute principle that live working is prohibited unless all three conditions are satisfied simultaneously. There is no exemption based on duration, voltage level (below a certain threshold) or experience alone. Even 230 V work must satisfy all three conditions."
  },
  {
    id: 2,
    question: "When justifying live working, 'unreasonable to work dead' means:",
    options: [
      "The client does not want the power turned off",
      "There is a genuine technical or safety reason why making the circuit dead would create equal or greater danger, or is not possible",
      "It would be more convenient to work live",
      "The cost of arranging isolation is too high"
    ],
    correctAnswer: 1,
    explanation: "The justification must be a genuine technical or safety reason — not convenience, cost or client preference. Legitimate reasons include: diagnostic fault-finding that requires the circuit to be energised, process loads that cannot be safely interrupted (e.g., life-support systems, continuous chemical processes), or situations where isolating the supply would create a greater hazard (e.g., emergency lighting during evacuation)."
  },
  {
    id: 3,
    question: "For a 33 kV overhead line, the minimum safe approach distance for persons and equipment is approximately:",
    options: [
      "1.2 metres",
      "3.0 metres",
      "6.0 metres",
      "15.0 metres"
    ],
    correctAnswer: 2,
    explanation: "For 33 kV overhead lines, the minimum safe approach distance is approximately 6.0 metres for persons and non-insulated equipment (GS6 / ENA TS 43-8). This distance accounts for the possibility of flashover across the air gap at this voltage level. For cranes, excavators and other plant, additional clearances may apply depending on the equipment reach and site conditions."
  },
  {
    id: 4,
    question: "Barriering around live electrical equipment serves to:",
    options: [
      "Provide physical separation between workers and live parts, preventing accidental contact",
      "Improve the appearance of the work area",
      "Replace the need for PPE entirely",
      "Allow unaccompanied workers to work near live parts"
    ],
    correctAnswer: 0,
    explanation: "Barriers provide physical separation between the worker and live parts, preventing accidental contact. They are an engineering control in the hierarchy and should be used alongside (not instead of) PPE and safe systems of work. Barriers must be robust, clearly identified, and positioned so that they cannot be easily bypassed. Warning signs should be attached to barriers."
  },
  {
    id: 5,
    question: "ENA Technical Specification 43-8 primarily addresses:",
    options: [
      "Cable sizing calculations for domestic installations",
      "Overhead line design and construction",
      "Safe approach distances and safe working practices near electricity distribution network equipment",
      "Metering and billing arrangements"
    ],
    correctAnswer: 2,
    explanation: "ENA TS 43-8 'Overhead Line Clearances' provides guidance on safe approach distances for persons, vehicles and equipment working near electricity distribution network assets, including overhead lines and substations. It is a key reference for anyone working near DNO equipment and defines the clearance zones that must be maintained."
  },
  {
    id: 6,
    question: "A live working risk assessment must specifically address:",
    options: [
      "The cost of the job and profit margin",
      "The justification for live working, specific hazards, controls, competence of persons, accompaniment and emergency procedures",
      "Only the voltage and current of the circuit",
      "The client's insurance arrangements"
    ],
    correctAnswer: 1,
    explanation: "A live working risk assessment must be task-specific and cover: the documented justification (why dead working is unreasonable), the specific electrical and arc flash hazards, the control measures (barriers, PPE, insulated tools), the competence of each person involved, accompaniment arrangements, emergency procedures (including first aid and isolation), and the recording of the assessment."
  },
  {
    id: 7,
    question: "Which of the following is a legitimate justification for live working?",
    options: [
      "The customer is in a hurry and does not want a power cut",
      "Diagnostic fault-finding on a motor control circuit that requires the motor to be running for vibration analysis",
      "The electrician prefers not to go through the isolation procedure",
      "The distribution board is difficult to access for isolation"
    ],
    correctAnswer: 1,
    explanation: "Diagnostic fault-finding that specifically requires the circuit to be energised (such as measuring running currents, checking motor vibration, or tracing intermittent faults) is a legitimate technical justification for live working. Customer convenience, personal preference and difficulty of access are NOT valid justifications — they do not make it 'unreasonable' to work dead."
  },
  {
    id: 8,
    question: "The 'dead working' principle under Regulation 12 requires:",
    options: [
      "Work to be done during the night when nobody is present",
      "Equipment to be isolated, secured against re-energisation, and proved dead before work begins",
      "Work to be done only on circuits that have never been energised",
      "Workers to wear full arc flash PPE even on dead circuits"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12 requires that where there is danger from working on or near live conductors, the conductors must be made dead before work begins. This means proper isolation (at an identified point), securing against re-energisation (lock-off), and proving dead (using a GS38-compliant voltage indicator with the prove-test-prove procedure). Only after all three steps is the circuit considered safe."
  },
  {
    id: 9,
    question: "For LV work (230/400 V), the safe approach distance for live parts that are exposed and uninsulated is:",
    options: [
      "Any distance is safe at LV",
      "Direct contact must be prevented — barriers and/or insulated tools required, with no body part or uninsulated tool within reaching distance of live parts",
      "A minimum of 3 metres",
      "A minimum of 6 metres"
    ],
    correctAnswer: 1,
    explanation: "At LV, there is no defined 'flashover distance' as there is for HV, but direct contact with live parts must be prevented. This means that barriers, insulating covers, or shrouds should be placed over all live parts that are not being directly worked on, and insulated tools must be used. No uninsulated body part, tool or object should be within reaching distance of exposed live conductors."
  },
  {
    id: 10,
    question: "A person who is 'competent' for live electrical work must have:",
    options: [
      "A university degree in electrical engineering",
      "Sufficient technical knowledge, experience and skill to prevent danger, appropriate to the nature of the work",
      "At least 10 years of practical experience",
      "A current first aid certificate only"
    ],
    correctAnswer: 1,
    explanation: "Regulation 16 of the EAWR 1989 defines competence in terms of 'technical knowledge or experience' sufficient to prevent danger. For live working, this means specific training in live working techniques, understanding of the hazards, experience with the type of equipment involved, and the ability to recognise and respond to danger. Formal qualifications support competence but are not sufficient alone — practical experience and task-specific training are essential."
  },
  {
    id: 11,
    question: "The decision to work live must be:",
    options: [
      "Made verbally by the electrician on site",
      "Documented in writing with a formal justification, risk assessment and approval by a responsible person",
      "Left to the apprentice to decide",
      "Made by the client"
    ],
    correctAnswer: 1,
    explanation: "The decision to work live is a significant safety decision that must be documented. The justification (why dead working is unreasonable), the risk assessment (specific to the task), the control measures, and the approval by a competent responsible person should all be recorded in writing. This provides evidence of compliance with Regulation 14 and supports the Regulation 29 defence if an incident occurs."
  },
  {
    id: 12,
    question: "If an HV cable is being excavated and the exact position is uncertain, the recommended approach is:",
    options: [
      "Dig with a mechanical excavator to find the cable quickly",
      "Use hand-digging techniques within the defined safety zone, with cable locating equipment and trial holes",
      "Assume the cable is at the depth shown on the drawing and dig to that level",
      "Wait until the cable can be de-energised before starting"
    ],
    correctAnswer: 1,
    explanation: "HSG47 and ENA TS 43-8 require that when the exact position of an HV cable is uncertain, hand-digging (using insulated hand tools) must be used within the defined safety zone around the cable's expected location. Cable locating equipment (CAT and Genny) should be used to identify the approximate position, and trial holes dug to confirm the exact depth and route. Mechanical excavation is prohibited within the safety zone."
  }
];

const faqs = [
  {
    question: "Can I ever work live on a domestic installation?",
    answer: "Yes, but only when all three conditions of Regulation 14 are met. Common legitimate scenarios include diagnostic fault-finding (measuring voltages and currents to identify a fault) and verifying that a circuit is dead (the act of testing itself involves proximity to live parts). However, the actual installation or modification work (connecting, disconnecting, replacing components) should almost always be done dead. If you find yourself routinely working live on domestic circuits, the justification should be critically reviewed."
  },
  {
    question: "What is the difference between 'working on' and 'working near' live conductors?",
    answer: "'Working on' means physically touching or manipulating live conductors or equipment — for example, testing at live terminals. 'Working near' means working in proximity where there is a risk of accidental contact with live parts — for example, pulling cables through a cable tray that passes close to a live busbar. Both situations are covered by Regulation 14, and both require the same three-condition justification."
  },
  {
    question: "Do approach distances apply to LV as well as HV?",
    answer: "Yes, although the nature of the risk is different. At HV, there is a significant flashover risk across air gaps, which is why defined clearance distances are specified in metres. At LV, the flashover distance is negligible, but the risk of direct contact remains. For LV, the approach distance is essentially 'contact distance' — barriers, insulating covers and insulated tools are used to prevent any possibility of touching live parts."
  },
  {
    question: "Who can authorise live working?",
    answer: "The decision to permit live working should be made by a person with sufficient authority and technical knowledge to assess the justification and the adequacy of the precautions. In many organisations, this is the appointed Authorised Person or a senior engineer. It should never be a decision made unilaterally by the person carrying out the work — independent oversight is a key safety control."
  },
  {
    question: "What records should I keep of live working decisions?",
    answer: "As a minimum: the written justification for why dead working was unreasonable, the task-specific risk assessment, the control measures in place (barriers, PPE, accompaniment), the names and competence records of those involved, the authorisation signature, and the date and time. These records provide evidence of compliance with Regulation 14 and support a Regulation 29 defence. They should be retained for at least the statute of limitations period (typically 3 years for summary offences, but longer is prudent)."
  }
];

const MOETModule1Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 1.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Approach Distances and Live Working Restrictions
          </h1>
          <p className="text-white/80">
            Legal requirements, safe distances and justification for live electrical work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Reg 14:</strong> No live working unless unreasonable to work dead</li>
              <li className="pl-1"><strong>Three tests:</strong> Unreasonable dead, reasonable live, suitable precautions</li>
              <li className="pl-1"><strong>HV distances:</strong> Defined clearances per voltage level</li>
              <li className="pl-1"><strong>Documentation:</strong> Justify, assess, record every decision</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Key References</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>EAWR 1989:</strong> Regulations 12, 13, 14, 16, 29</li>
              <li className="pl-1"><strong>HSG85:</strong> Safe working practices guidance</li>
              <li className="pl-1"><strong>ENA TS 43-8:</strong> Overhead line clearances</li>
              <li className="pl-1"><strong>GS6:</strong> Avoidance of danger from overhead lines</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State the three conditions of EAWR Regulation 14 for live working",
              "Explain what constitutes a valid justification for live working",
              "Identify safe approach distances for HV systems at different voltage levels",
              "Describe barriering requirements and LV approach limits",
              "Explain accompaniment and competence requirements for live working",
              "Understand the Regulation 29 defence and the importance of record-keeping"
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

        {/* Section 01: Regulation 14 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            EAWR Regulation 14 — The Three Conditions for Live Working
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 14 of the Electricity at Work Regulations 1989 is the primary legal control on
              live working. It establishes an absolute prohibition on working on or near live conductors,
              with a tightly defined exception that requires ALL THREE conditions to be satisfied
              simultaneously. This is not a discretionary decision — it is a legal requirement with
              criminal sanctions for non-compliance.
            </p>
            <p>
              The regulation states: <em>"No person shall be engaged in any work activity on or so near any
              live conductor (other than one suitably covered with insulating material so as to prevent
              danger) that danger may arise unless — (a) it is unreasonable in all the circumstances for
              it to be dead; (b) it is reasonable in all the circumstances for him to be at work on or
              near it while it is live; and (c) suitable precautions (including where necessary the
              provision of suitable protective equipment) have been taken to prevent injury."</em>
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Condition (a) — Unreasonable to Work Dead</p>
              <p className="text-sm text-white mb-3">
                This is the highest bar and must be considered first. The burden of proof is on the duty
                holder to demonstrate why it is unreasonable to make the conductor dead.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Valid justifications:</strong> Diagnostic testing requiring energised circuits, life-support or critical process systems that cannot be interrupted, situations where isolation would create a greater hazard</li>
                <li className="pl-1"><strong>Invalid justifications:</strong> Customer convenience or preference, cost of arranging shutdown, time pressure, difficulty of access to isolation point, 'we always do it this way'</li>
                <li className="pl-1"><strong>Test:</strong> Would a reasonable, competent electrical engineer agree that dead working is genuinely unreasonable in these specific circumstances?</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Condition (b) — Reasonable to Work Live</p>
              <p className="text-sm text-white mb-3">
                Even if condition (a) is met, it must also be reasonable for the specific person to work
                on or near the live conductor. This considers the competence of the individual, the nature
                of the work, and the environment.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Competence:</strong> The person must have specific training and experience in live working techniques</li>
                <li className="pl-1"><strong>Physical fitness:</strong> The person must be physically and mentally fit (not fatigued, unwell or under the influence of substances)</li>
                <li className="pl-1"><strong>Environment:</strong> Conditions must be suitable — adequate lighting, space, absence of rain or moisture, stable footing</li>
                <li className="pl-1"><strong>Accompaniment:</strong> A second competent person must be present for LV live work; additional support for HV</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Condition (c) — Suitable Precautions Taken</p>
              <p className="text-sm text-white mb-3">
                If conditions (a) and (b) are satisfied, suitable precautions must be taken to prevent injury.
                These precautions must be appropriate to the specific task, voltage, and environment.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>PPE:</strong> Insulating gloves, arc flash clothing, face shield — rated for the voltage and calculated incident energy</li>
                <li className="pl-1"><strong>Tools:</strong> VDE 1000 V rated insulated tools (BS EN 60900)</li>
                <li className="pl-1"><strong>Barriers:</strong> Insulating covers/shrouds on adjacent live parts not being worked on</li>
                <li className="pl-1"><strong>Accompaniment:</strong> Second competent person present with knowledge of emergency isolation</li>
                <li className="pl-1"><strong>Emergency plan:</strong> Clear procedure for emergency isolation, first aid and rescue</li>
                <li className="pl-1"><strong>Insulating matting:</strong> BS EN 61111 rated matting in front of switchgear</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Legal Point</p>
              <p className="text-sm text-white">
                Regulations 4-16 of the EAWR 1989 impose ABSOLUTE duties — there is no 'so far as reasonably
                practicable' qualifier. If live working results in injury and any of the three conditions was
                not properly satisfied, it is a criminal offence. The only defence available is Regulation 29
                (due diligence), which requires the defendant to prove they took ALL reasonable precautions and
                exercised ALL due diligence to avoid the offence. This places an extremely high evidential
                burden on proper documentation and record-keeping.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> If in doubt, work dead. The default position under the EAWR 1989
              is always dead working. Live working is the exception, not the rule, and must be formally
              justified every single time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: HV Approach Distances */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safe Approach Distances for High Voltage Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              High voltage systems present the additional hazard of flashover — the breakdown of the
              air gap between a live conductor and an earthed object (including the human body). At
              sufficiently high voltages, current can arc across air gaps of significant distance.
              Safe approach distances define the minimum clearance that must be maintained between
              persons, equipment and live HV conductors to prevent flashover.
            </p>
            <p>
              These distances are defined by ENA TS 43-8, the Distribution Safety Rules (DSR),
              and organisational safety rules. They vary according to the voltage level, whether
              the person is authorised or untrained, and whether the work is planned or unplanned.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Safe Approach Distances (ENA TS 43-8 / GS6)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Clearance (General)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Clearance (Cranes/Plant)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to 1 kV (LV)</td>
                      <td className="border border-white/10 px-3 py-2">Contact distance</td>
                      <td className="border border-white/10 px-3 py-2">1.0 m (overhead)</td>
                      <td className="border border-white/10 px-3 py-2">Prevent direct contact; barriers for exposed parts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11 kV</td>
                      <td className="border border-white/10 px-3 py-2">3.0 m</td>
                      <td className="border border-white/10 px-3 py-2">3.0 m minimum</td>
                      <td className="border border-white/10 px-3 py-2">Most common distribution voltage in UK</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">33 kV</td>
                      <td className="border border-white/10 px-3 py-2">6.0 m</td>
                      <td className="border border-white/10 px-3 py-2">6.0 m minimum</td>
                      <td className="border border-white/10 px-3 py-2">Primary distribution; larger clearance zone</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">66 kV</td>
                      <td className="border border-white/10 px-3 py-2">7.0 m</td>
                      <td className="border border-white/10 px-3 py-2">7.0 m minimum</td>
                      <td className="border border-white/10 px-3 py-2">Sub-transmission level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">132 kV</td>
                      <td className="border border-white/10 px-3 py-2">9.0 m</td>
                      <td className="border border-white/10 px-3 py-2">9.0 m minimum</td>
                      <td className="border border-white/10 px-3 py-2">Grid supply point level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">275 kV</td>
                      <td className="border border-white/10 px-3 py-2">12.0 m</td>
                      <td className="border border-white/10 px-3 py-2">12.0 m minimum</td>
                      <td className="border border-white/10 px-3 py-2">National Grid transmission</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">400 kV</td>
                      <td className="border border-white/10 px-3 py-2">15.0 m</td>
                      <td className="border border-white/10 px-3 py-2">15.0 m minimum</td>
                      <td className="border border-white/10 px-3 py-2">National Grid supergrid; largest clearance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Important Notes on Approach Distances</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wind and weather:</strong> Overhead conductors can swing in wind, reducing clearances. Additional margins must be applied in adverse weather</li>
                <li className="pl-1"><strong>Sag:</strong> Conductors sag under heat load. Maximum sag conditions may bring conductors closer to the ground</li>
                <li className="pl-1"><strong>Plant and equipment:</strong> The clearance applies to the nearest point of the equipment (e.g., jib tip of a crane, bucket of an excavator), not just the operator</li>
                <li className="pl-1"><strong>Materials:</strong> Long conductive objects (scaffolding poles, ladders, metal pipes) effectively extend the reach of the person carrying them</li>
                <li className="pl-1"><strong>Underground cables:</strong> Different clearance rules apply — HSG47 provides guidance on safe excavation near underground services</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Barriering and Demarcation</p>
              <p className="text-sm text-white mb-3">
                Where work is being carried out near HV equipment, physical barriers must be erected to
                prevent inadvertent encroachment into the danger zone.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Physical barriers:</strong> Rigid barriers (e.g., Heras fencing) at the boundary of the safe approach distance</li>
                <li className="pl-1"><strong>Warning signs:</strong> 'DANGER — HIGH VOLTAGE' signs on barriers and at access points</li>
                <li className="pl-1"><strong>Goal posts:</strong> For vehicle routes passing under overhead lines — physical height restrictors</li>
                <li className="pl-1"><strong>Banksmen:</strong> For crane and plant operations near overhead lines — a dedicated person to monitor clearances</li>
                <li className="pl-1"><strong>Bunting and tape:</strong> Acceptable for demarcation but NOT as a physical barrier — it indicates a boundary but does not prevent encroachment</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> These are MINIMUM distances. Where practicable, maintain the greatest
              possible clearance from HV equipment. The consequence of breaching the clearance zone at
              high voltages is almost always fatal.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: LV Live Working and Accompaniment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            LV Approach Limits, Accompaniment and Competence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Low voltage (230/400 V) presents a different risk profile to HV. The flashover distance at
              LV is negligible (a few millimetres in contaminated conditions), so the primary risk is
              direct contact with live parts. However, LV kills more people than HV in the UK because of
              the far greater number of people exposed to it. The controls for LV live working focus on
              preventing direct contact and ensuring rapid response in an emergency.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LV Approach Limits and Controls</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Approach limit:</strong> At LV, the approach limit is effectively contact distance — any exposed live part must be protected by barriers, insulating covers or shrouds</li>
                <li className="pl-1"><strong>Adjacent live parts:</strong> When working on one conductor, all adjacent live parts that are not being directly worked on must be covered with insulating material</li>
                <li className="pl-1"><strong>Workspace:</strong> Ensure adequate space to work without inadvertent contact — cramped conditions increase the risk of accidental contact</li>
                <li className="pl-1"><strong>Lighting:</strong> Adequate lighting is essential — you must be able to clearly see the conductors and their identification</li>
                <li className="pl-1"><strong>Insulating matting:</strong> Place BS EN 61111 rated matting in front of switchgear and distribution boards</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Accompaniment Requirements</p>
              <p className="text-sm text-white mb-3">
                Live working at any voltage should not be carried out alone. The accompaniment requirement
                ensures that if an incident occurs, there is someone present who can respond immediately.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>LV live working:</strong> A second competent person must be present who can isolate the supply in an emergency and administer first aid including CPR</li>
                <li className="pl-1"><strong>HV live working:</strong> Additional accompaniment as defined by the safety rules — typically an authorised person and a safety observer</li>
                <li className="pl-1"><strong>Competence of companion:</strong> The companion must know the location of the isolation point, be able to operate it, and be trained in emergency first aid (including CPR and AED use)</li>
                <li className="pl-1"><strong>Proximity:</strong> The companion must be close enough to respond immediately — not in a different room or building</li>
                <li className="pl-1"><strong>Communication:</strong> Clear verbal communication must be maintained throughout the live work</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Competence for Live Working (Regulation 16)</p>
              <p className="text-sm text-white mb-3">
                Regulation 16 of the EAWR 1989 requires that no person shall be engaged in electrical work
                unless they possess sufficient 'technical knowledge or experience' to prevent danger. For
                live working, the competence bar is higher than for dead working.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Training:</strong> Specific formal training in live working techniques, not just general electrical competence</li>
                <li className="pl-1"><strong>Knowledge:</strong> Understanding of the specific hazards (shock, arc flash, burns), the relevant regulations, and the controls required</li>
                <li className="pl-1"><strong>Experience:</strong> Practical experience of the type of equipment and work being undertaken, ideally gained under supervision</li>
                <li className="pl-1"><strong>Assessment:</strong> Formal assessment of competence by the employer — typically documented in a competence register</li>
                <li className="pl-1"><strong>Supervision:</strong> Where a person is gaining competence (e.g., an apprentice), they must be directly supervised by a competent person at all times</li>
                <li className="pl-1"><strong>Refresher:</strong> Competence must be maintained through regular practice and periodic refresher training</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> As a maintenance technician apprentice, you will develop competence
              progressively. Live working should only be carried out under direct supervision of your mentor
              until you have been formally assessed as competent. Your training log should record the specific
              live working competences you have demonstrated.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Recording Decisions and Regulation 29 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Recording Decisions and the Regulation 29 Defence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Documenting live working decisions is not just good practice — it is the primary means of
              demonstrating compliance with Regulation 14 and building a defence under Regulation 29.
              In the event of an incident, the first question an HSE inspector will ask is: 'Where is
              the documented justification for this live work?' If it does not exist, the prosecution
              case is essentially established.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Must Be Recorded</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Justification:</strong> Written statement of why dead working is unreasonable in these specific circumstances</li>
                <li className="pl-1"><strong>Risk assessment:</strong> Task-specific assessment of the electrical hazards, arc flash risk and control measures</li>
                <li className="pl-1"><strong>Method statement:</strong> Step-by-step description of the work to be done and the sequence of operations</li>
                <li className="pl-1"><strong>Authorisation:</strong> Name and signature of the person who authorised the live work</li>
                <li className="pl-1"><strong>Personnel:</strong> Names, roles and competence records of all persons involved</li>
                <li className="pl-1"><strong>Precautions:</strong> Specific PPE, insulated tools, barriers, accompaniment and emergency procedures</li>
                <li className="pl-1"><strong>Date and time:</strong> When the decision was made and when the work was carried out</li>
                <li className="pl-1"><strong>Review:</strong> Post-work review confirming the work was completed safely within the planned scope</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 29 — The Due Diligence Defence</p>
              <p className="text-sm text-white mb-3">
                Because Regulations 4-16 impose absolute duties (no 'reasonably practicable' qualifier),
                the only defence available when charged with an offence is Regulation 29.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>The defence:</strong> "In any proceedings for an offence under these Regulations, it shall be a defence for the person charged to prove that he took all reasonable precautions and exercised all due diligence to avoid the commission of that offence"</li>
                <li className="pl-1"><strong>Burden of proof:</strong> On the defendant — you must prove you took all reasonable precautions, not that the prosecution must prove you did not</li>
                <li className="pl-1"><strong>Evidence required:</strong> Documented risk assessments, method statements, training records, competence assessments, tool calibration records, PPE inspection records, and the live working authorisation</li>
                <li className="pl-1"><strong>Systematic approach:</strong> The defence requires a systematic, documented approach to safety management — not just a one-off decision on the day</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Live Working Decision Flowchart</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">1. Can the work be done dead? → YES → Work dead (Reg 12)</li>
                  <li className="pl-1">2. Is it unreasonable to work dead? → NO → Work dead</li>
                  <li className="pl-1">3. Is it reasonable to work live? → NO → Do not proceed</li>
                  <li className="pl-1">4. Are suitable precautions in place? → NO → Implement precautions</li>
                  <li className="pl-1">5. All three conditions met? → YES → Document and proceed</li>
                  <li className="pl-1">6. Record all decisions and outcomes</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Record Retention</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Live working authorisations: minimum 3 years</li>
                  <li className="pl-1">Risk assessments: retain for duration of the activity plus 3 years</li>
                  <li className="pl-1">Training and competence records: duration of employment plus 6 years</li>
                  <li className="pl-1">Incident reports: minimum 3 years (40 years for health surveillance)</li>
                  <li className="pl-1">PPE inspection records: duration of item life plus 3 years</li>
                  <li className="pl-1">Best practice: retain all records for at least 6 years</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Personal Criminal Liability</p>
              <p className="text-sm text-white">
                Under the EAWR 1989, duties fall on individuals — not just companies. As an employee
                (Regulation 3(2)(b)), you have a personal legal duty to cooperate with your employer on
                safety matters and not to place yourself or others at risk. If you carry out live work
                without proper justification, risk assessment and authorisation, you can be personally
                prosecuted and fined, regardless of whether your employer instructed you to do so. Never
                allow yourself to be pressured into unsafe live working.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Documentation is your protection. If it isn't written down, it
              didn't happen — at least in the eyes of a court. Always ensure live working decisions are
              formally recorded before the work begins.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Regulation 14 — Three Conditions</p>
                <ul className="space-y-0.5">
                  <li>(a) Unreasonable to work dead</li>
                  <li>(b) Reasonable to work live</li>
                  <li>(c) Suitable precautions taken</li>
                  <li>ALL THREE must be satisfied</li>
                  <li>Document everything</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>EAWR 1989 — Regulations 12, 13, 14, 16, 29</li>
                  <li>HSG85 — Safe working practices</li>
                  <li>ENA TS 43-8 — Overhead line clearances</li>
                  <li>GS6 — Overhead line avoidance</li>
                  <li>ST1426 — Maintenance technician KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: PPE
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2-5">
              Next: Earthing and Bonding
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section2_4;
