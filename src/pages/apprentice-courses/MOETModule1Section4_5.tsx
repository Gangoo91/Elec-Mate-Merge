import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "LOLER - Lifting Operations and Lifting Equipment Regulations 1998 - MOET Module 1 Section 4.5";
const DESCRIPTION = "Comprehensive guide to LOLER 1998 for electrical maintenance technicians: lifting operations, thorough examination, MEWPs, chain hoists, cable pulling equipment, and application to switchgear and transformer maintenance.";

const quickCheckQuestions = [
  {
    id: "loler-scope",
    question: "Which of the following items of equipment used by an electrical maintenance technician is subject to LOLER?",
    options: [
      "A voltage indicator",
      "A mobile elevating work platform (MEWP) used to access high-level cable tray",
      "A multifunction tester",
      "An insulated screwdriver"
    ],
    correctIndex: 1,
    explanation: "A MEWP is lifting equipment used for lifting persons — it is subject to LOLER. Voltage indicators, MFTs and screwdrivers are work equipment subject to PUWER, but they are not lifting equipment. LOLER applies to equipment used for lifting or lowering loads (including persons)."
  },
  {
    id: "loler-thorough-exam",
    question: "How often must lifting equipment used for lifting persons (such as a MEWP) undergo a thorough examination under LOLER?",
    options: [
      "Every 3 months",
      "Every 6 months",
      "Every 12 months",
      "Every 24 months"
    ],
    correctIndex: 1,
    explanation: "Under LOLER Regulation 9, lifting equipment used for lifting persons must undergo a thorough examination by a competent person at least every 6 months. Other lifting equipment (not used for lifting persons) requires thorough examination at least every 12 months. More frequent examinations may be required based on risk assessment."
  },
  {
    id: "loler-planning",
    question: "Regulation 8 of LOLER requires that every lifting operation shall be:",
    options: [
      "Completed as quickly as possible",
      "Properly planned by a competent person, appropriately supervised and carried out in a safe manner",
      "Authorised by the building owner",
      "Recorded on video"
    ],
    correctIndex: 1,
    explanation: "Regulation 8 requires every lifting operation to be properly planned by a competent person, appropriately supervised, and carried out in a safe manner. The plan must address the risks specific to the lift, the equipment to be used, the load weight and centre of gravity, the ground conditions, and the environmental factors."
  },
  {
    id: "loler-defects",
    question: "Under Regulation 11 of LOLER, if a thorough examination reveals a defect that involves an existing or imminent risk of serious personal injury, the competent person must:",
    options: [
      "Inform the employer verbally within 7 days",
      "Send a report to the HSE (or relevant enforcing authority) as soon as practicable",
      "Record the defect in the maintenance log only",
      "Allow continued use with additional precautions"
    ],
    correctIndex: 1,
    explanation: "Regulation 11 requires the competent person carrying out the thorough examination to notify the relevant enforcing authority (usually the HSE) as soon as is practicable if they find a defect that involves an existing or imminent risk of serious personal injury. The equipment must not be used until the defect is remedied."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "LOLER 1998 was made under which Act?",
    options: [
      "The Factories Act 1961",
      "The Health and Safety at Work Act 1974",
      "The Lifting Equipment Act 1998",
      "The Consumer Protection Act 1987"
    ],
    correctAnswer: 1,
    explanation: "LOLER 1998 is a statutory instrument made under the Health and Safety at Work Act 1974. It implements EU Directive 95/63/EC (amending the Work Equipment Directive) and remains in force as retained UK law."
  },
  {
    id: 2,
    question: "The definition of 'lifting equipment' under LOLER includes:",
    options: [
      "Only cranes and hoists",
      "Work equipment for lifting or lowering loads, including accessories used for attaching loads to machinery",
      "Only equipment with a safe working load greater than 1 tonne",
      "Only equipment operated by hydraulic power"
    ],
    correctAnswer: 1,
    explanation: "LOLER defines lifting equipment broadly as work equipment for lifting or lowering loads, including the load and anything attached for that purpose. This covers cranes, hoists, chain blocks, MEWPs, scissor lifts, gin wheels, cable pulling winches, lifting slings, shackles, and eyebolts."
  },
  {
    id: 3,
    question: "Regulation 4 of LOLER requires that lifting equipment shall be of adequate:",
    options: [
      "Colour and visibility",
      "Strength and stability for each load",
      "Insurance cover",
      "Age — less than 10 years old"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 requires lifting equipment to be of adequate strength and stability for each load, having regard in particular to the stress induced at its mounting or fixing point. This means the equipment and its supporting structure must be capable of withstanding the loads imposed during lifting operations."
  },
  {
    id: 4,
    question: "Regulation 5 of LOLER provides additional requirements for lifting equipment used for lifting persons. Which of the following is required?",
    options: [
      "The equipment must be painted bright yellow",
      "Measures must be taken to prevent persons being crushed, trapped, struck, or falling from the carrier",
      "A first aider must be present at all times",
      "The equipment must have GPS tracking"
    ],
    correctAnswer: 1,
    explanation: "Regulation 5 requires that where lifting equipment is used for lifting persons, measures must be taken to prevent the carrier (platform/cage) falling, the person being crushed/trapped/struck, and the person falling from the carrier. There must also be a means of rescue in case of emergency."
  },
  {
    id: 5,
    question: "Regulation 6 of LOLER covers the positioning and installation of lifting equipment. This requires consideration of:",
    options: [
      "Only the aesthetic appearance of the equipment",
      "The risk of the equipment or the load striking a person, the risk of the load drifting, falling freely or being released unintentionally, and adequate clearances",
      "Only the proximity to fire exits",
      "The availability of three-phase power supply"
    ],
    correctAnswer: 1,
    explanation: "Regulation 6 requires that lifting equipment is positioned or installed to reduce the risk of the equipment or load striking a person, the load drifting/falling/being released unintentionally. It also requires adequate clearances and consideration of the operating environment."
  },
  {
    id: 6,
    question: "Regulation 7 of LOLER requires lifting equipment to be clearly marked with:",
    options: [
      "The manufacturer's logo only",
      "Its safe working load (SWL) — and where the SWL depends on the configuration, the SWL for each configuration",
      "The date of manufacture only",
      "The name of the operator"
    ],
    correctAnswer: 1,
    explanation: "Regulation 7 requires lifting equipment to be clearly marked with its safe working load (SWL). Where the SWL varies with the configuration (e.g., boom length, radius of operation), the SWL for each configuration must be marked. Equipment designed for lifting persons must be appropriately and clearly marked to that effect."
  },
  {
    id: 7,
    question: "Under Regulation 9, a 'thorough examination' of lifting equipment must be carried out by:",
    options: [
      "Any employee of the company that owns the equipment",
      "A competent person — independent and with sufficient knowledge and experience",
      "The equipment manufacturer only",
      "An HSE inspector"
    ],
    correctAnswer: 1,
    explanation: "A thorough examination must be carried out by a competent person who has sufficient practical and theoretical knowledge and experience of the equipment to detect defects and assess their significance. The competent person should be independent — typically from an insurance company engineering inspection body or specialist inspection company."
  },
  {
    id: 8,
    question: "The maximum interval between thorough examinations for lifting equipment NOT used for lifting persons is:",
    options: [
      "3 months",
      "6 months",
      "12 months",
      "24 months"
    ],
    correctAnswer: 2,
    explanation: "For lifting equipment not used for lifting persons, the maximum interval between thorough examinations is 12 months. For equipment used for lifting persons (e.g., MEWPs), the maximum interval is 6 months. These are maximum intervals — more frequent examinations may be required based on risk assessment, intensity of use, or operating environment."
  },
  {
    id: 9,
    question: "Regulation 10 of LOLER requires that reports of thorough examinations are:",
    options: [
      "Sent to the equipment manufacturer",
      "Made by the competent person and contain specified information including any defects found and the next examination date",
      "Filed with the local authority",
      "Published on the company website"
    ],
    correctAnswer: 1,
    explanation: "Regulation 10 requires the competent person to make a report of every thorough examination as soon as practicable. The report must contain specified information including: identification of the equipment, date of the examination, any defects found, whether it is or will become a danger, the date by which defects must be remedied, and the date of the next examination."
  },
  {
    id: 10,
    question: "An electrical maintenance technician uses a chain hoist to remove a transformer from a substation. Under LOLER, this operation requires:",
    options: [
      "Only a visual check of the chain hoist before use",
      "A planned lifting operation (Reg 8), using equipment with a current thorough examination report (Reg 9), marked with the SWL (Reg 7), with adequate strength (Reg 4)",
      "Only a risk assessment",
      "Approval from the HSE before the lift"
    ],
    correctAnswer: 1,
    explanation: "Removing a transformer is a lifting operation under LOLER. It requires: planning by a competent person (Reg 8), equipment of adequate strength (Reg 4), correctly positioned (Reg 6), marked with SWL (Reg 7), with a current thorough examination report (Reg 9), and carried out safely under appropriate supervision."
  },
  {
    id: 11,
    question: "A MEWP is being used by an electrical maintenance technician to access high-level cable containment. Under LOLER, the MEWP must:",
    options: [
      "Only have an MOT certificate",
      "Have a current thorough examination report (within 6 months), be operated by a trained person, and the lift must be planned",
      "Only have third-party insurance",
      "Only be less than 5 years old"
    ],
    correctAnswer: 1,
    explanation: "A MEWP used for lifting persons must have a current thorough examination report (maximum 6-month intervals under Reg 9), be of adequate strength and stability (Reg 4), have measures to prevent falls (Reg 5), be operated by a person trained in its safe use (PUWER Reg 9), and the operation must be planned (Reg 8)."
  },
  {
    id: 12,
    question: "Under ST1426, knowledge of LOLER is relevant to maintenance technicians because:",
    options: [
      "All maintenance technicians must be certified crane operators",
      "Maintenance activities frequently involve lifting operations — using MEWPs, chain hoists, cable winches and lifting accessories to access and move heavy electrical equipment",
      "LOLER only applies to the construction industry",
      "It is only relevant if you work offshore"
    ],
    correctAnswer: 1,
    explanation: "Electrical maintenance frequently involves lifting operations: using MEWPs to access high-level equipment, chain hoists to remove transformers and switchgear, cable pulling winches, and lifting slings and shackles. ST1426 requires maintenance technicians to understand the regulations governing these activities."
  }
];

const faqs = [
  {
    question: "What is the difference between a 'thorough examination' and an 'inspection'?",
    answer: "A thorough examination under LOLER is a detailed examination by a competent person (typically an independent engineer) at statutory intervals (6 or 12 months). An inspection under PUWER Regulation 6 is a broader term covering visual checks, pre-use inspections, and periodic inspections at intervals determined by risk assessment. Both may be required — a thorough examination satisfies the LOLER requirement, while regular inspections satisfy PUWER requirements between thorough examinations."
  },
  {
    question: "Does LOLER apply to a ladder?",
    answer: "Generally no — a ladder is access equipment, not lifting equipment. It is covered by PUWER and the Work at Height Regulations 2005. However, if a ladder is used as part of a lifting operation (e.g., a ladder hoist used to raise materials), the hoist mechanism is subject to LOLER. The distinction is whether the equipment is used for lifting or lowering a load."
  },
  {
    question: "Who can carry out a thorough examination?",
    answer: "A thorough examination must be carried out by a competent person with sufficient practical and theoretical knowledge to detect defects and assess their significance. In practice, this is typically an engineer employed by an insurance company inspection body (such as Zurich, Allianz, or RSA), a specialist inspection company (such as BSRIA), or an independent competent person. The key requirement is competence and independence."
  },
  {
    question: "Do I need to keep thorough examination reports, and for how long?",
    answer: "Yes. Reports must be kept until the next report is made, or for at least 2 years — whichever is longer. For equipment used for lifting persons, the initial report (before first use) must be kept for as long as the equipment is in use. In practice, many organisations keep all reports for the life of the equipment plus a period for potential litigation (typically 6 years)."
  },
  {
    question: "What lifting equipment might I encounter as an electrical maintenance technician?",
    answer: "Common lifting equipment in electrical maintenance includes: mobile elevating work platforms (MEWPs/cherry pickers), scissor lifts, chain hoists and chain blocks (for removing transformers, switchgear, motors), cable pulling winches, gin wheels, lifting beams in substations, panel lifters for switchboard sections, and lifting slings, shackles and eyebolts. All are subject to LOLER requirements."
  }
];

const MOETModule1Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4">
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
            <Shield className="h-4 w-4" />
            <span>Module 1.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            LOLER — Lifting Operations and Lifting Equipment Regulations 1998
          </h1>
          <p className="text-white/80">
            Safe lifting operations for electrical maintenance activities
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>LOLER:</strong> Governs all lifting operations and lifting equipment</li>
              <li className="pl-1"><strong>Reg 8:</strong> Every lift must be planned, supervised, carried out safely</li>
              <li className="pl-1"><strong>Reg 9:</strong> Thorough examination — 6 months (persons) / 12 months (loads)</li>
              <li className="pl-1"><strong>SWL:</strong> Safe working load must be clearly marked</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>MEWPs:</strong> Cherry pickers, scissor lifts for high-level access</li>
              <li className="pl-1"><strong>Chain hoists:</strong> Removing transformers, switchgear, motors</li>
              <li className="pl-1"><strong>Cable winches:</strong> Pulling heavy cables through ducts</li>
              <li className="pl-1"><strong>ST1426:</strong> Lifting operations in maintenance work activities</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the scope and purpose of LOLER 1998 and what constitutes lifting equipment",
              "Describe the strength and stability requirements (Reg 4) and lifting persons provisions (Reg 5)",
              "Explain the requirements for planning lifting operations (Reg 8)",
              "Understand the thorough examination regime (Reg 9) and examination intervals",
              "Describe reporting requirements (Reg 10) and defect notification (Reg 11)",
              "Apply LOLER to MEWPs, chain hoists and cable pulling in electrical maintenance"
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

        {/* Section 01: Scope and Key Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Scope, Strength and Stability (Regs 4–7)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Lifting Operations and Lifting Equipment Regulations 1998 (LOLER) provide specific requirements
              for lifting equipment and lifting operations, supplementing the general requirements of PUWER 1998.
              Where PUWER applies to all work equipment, LOLER adds more specific and stringent requirements for
              equipment and operations that involve lifting or lowering loads — including persons.
            </p>
            <p>
              For electrical maintenance technicians, LOLER is directly relevant because your work frequently
              involves lifting operations: using mobile elevating work platforms (MEWPs) to access high-level
              cable tray and containment, chain hoists to remove heavy transformers and switchgear, cable pulling
              winches, and lifting slings and shackles for handling heavy electrical components.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Definition of Lifting Equipment</p>
              <p className="text-sm text-white mb-2">
                "Lifting equipment" means work equipment for lifting or lowering loads, and includes its attachments
                used for anchoring, fixing or supporting it. "Load" includes any person or animal lifted by the equipment.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Equipment:</strong> Cranes, hoists, chain blocks, MEWPs, scissor lifts, tail lifts, forklifts, gin wheels, cable winches, panel lifters, lifting beams</li>
                <li className="pl-1"><strong>Accessories:</strong> Slings (chain, wire rope, webbing), shackles, eyebolts, hooks, spreader beams, lifting clamps</li>
                <li className="pl-1"><strong>Not lifting equipment:</strong> Ladders (access only), escalators (in normal use), stacker trucks below a certain threshold (depending on risk)</li>
              </ul>
            </div>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 4 — Strength and Stability</h3>
                <p className="text-sm text-white mb-2">
                  Every employer must ensure lifting equipment is of adequate strength and stability for each load,
                  having regard in particular to the stress induced at its mounting or fixing point.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">The equipment must be strong enough for the intended load — including dynamic forces during lifting</li>
                  <li className="pl-1">The supporting structure (floor, ceiling, beam) must be adequate for the loads imposed</li>
                  <li className="pl-1">Stability must be maintained throughout the lifting operation — including during slewing, luffing and travel</li>
                  <li className="pl-1">For mobile equipment (MEWPs, mobile cranes), ground conditions must be suitable</li>
                </ul>
                <p className="text-sm text-elec-yellow/70 mt-2">
                  <strong>Maintenance example:</strong> Before using a ceiling-mounted lifting beam in a substation to
                  remove a transformer, you must verify the beam's SWL and confirm the building structure can support
                  the load. A competent structural assessment may be required.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 5 — Lifting Equipment for Lifting Persons</h3>
                <p className="text-sm text-white mb-2">
                  Where lifting equipment is used for lifting persons, additional requirements apply to protect
                  the persons being lifted:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">The carrier (platform, cage) must be prevented from falling — by reliable means such as redundant suspension</li>
                  <li className="pl-1">The person must be prevented from being crushed, trapped, or struck by objects</li>
                  <li className="pl-1">The person must be prevented from falling from the carrier — guardrails, gates, harness points</li>
                  <li className="pl-1">Means of evacuation must be provided in case the carrier becomes stranded</li>
                  <li className="pl-1">The equipment must have suitable devices to prevent the carrier falling (overspeed governors, check valves)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 6 — Positioning and Installation</h3>
                <p className="text-sm text-white">
                  Lifting equipment must be positioned or installed to reduce the risk of the equipment or load
                  striking a person, and to reduce the risk of the load drifting, falling freely, or being released
                  unintentionally. For electrical maintenance, this means positioning MEWPs and hoists so that loads
                  do not travel over occupied areas, and ensuring adequate clearances from live equipment.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 7 — Marking</h3>
                <p className="text-sm text-white mb-2">
                  All lifting equipment must be clearly marked with its safe working load (SWL). Additional
                  marking requirements include:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">SWL for each configuration (e.g., different boom lengths, radii)</li>
                  <li className="pl-1">Equipment designed for lifting persons must be marked accordingly</li>
                  <li className="pl-1">Equipment NOT designed for lifting persons must be marked to that effect</li>
                  <li className="pl-1">Lifting accessories (slings, shackles) must show their SWL and identifying markings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Planning Lifting Operations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Planning Lifting Operations (Regulation 8)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 8 is one of the most important requirements in LOLER. It establishes that every lifting
              operation must be properly planned, appropriately supervised, and carried out in a safe manner. The
              level of planning required is proportionate to the risk and complexity of the lift.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Must Be Planned?</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>The load:</strong> Weight, dimensions, centre of gravity, fragility, sling attachment points</li>
                <li className="pl-1"><strong>The equipment:</strong> Type of lifting equipment, SWL verification, accessories required, condition and thorough examination status</li>
                <li className="pl-1"><strong>The route:</strong> Travel path from pick-up to set-down, overhead obstructions, proximity to live electrical equipment</li>
                <li className="pl-1"><strong>The environment:</strong> Ground conditions, weather (for outdoor lifts), confined spaces, other activities in the area</li>
                <li className="pl-1"><strong>The people:</strong> Competent persons to plan, supervise and carry out the lift; slingers, signallers, banksmen as required</li>
                <li className="pl-1"><strong>Emergency procedures:</strong> What to do if the lift goes wrong, load becomes unstable, or equipment fails</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Routine Lifts</h3>
                <p className="text-sm text-white">
                  For routine, repetitive lifts (e.g., regularly using a MEWP to access cable tray at a known
                  location), the plan may be a generic method statement covering the standard procedure. However,
                  site-specific conditions must always be checked before each lift — ground conditions may have
                  changed, other activities may be in progress, or the equipment status may have changed.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Complex or Non-Routine Lifts</h3>
                <p className="text-sm text-white">
                  For complex lifts (e.g., removing a 2-tonne transformer from a basement substation using a
                  chain hoist and gantry), a specific lift plan is required. This should include a detailed
                  method statement, engineering calculations (or reference to the equipment load charts), and
                  a risk assessment. The plan must be prepared by a competent person — typically a Appointed
                  Person (Lifting) or an engineer with lifting experience.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Proximity to Live Electrical Equipment</p>
              <p className="text-sm text-white">
                When lifting operations take place near live electrical equipment (which is common in electrical
                maintenance), the lift plan must address the risk of the load, equipment, or personnel coming into
                contact with or approaching live conductors. For HV systems, minimum approach distances must be
                maintained. Barriers, exclusion zones, and earthing arrangements may be required. This is where
                LOLER and the EAWR 1989 overlap — the lift plan must comply with both sets of regulations.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Thorough Examination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thorough Examination and Reports (Regs 9–10)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The thorough examination regime is the centrepiece of LOLER's ongoing safety assurance. It requires
              independent, competent examination of all lifting equipment at statutory intervals, with detailed
              reporting and record-keeping. This is more rigorous than the general inspection requirements of
              PUWER Regulation 6 and provides a higher level of assurance appropriate to the risks of lifting.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 9 — Thorough Examination Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">When Required</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment for Lifting Persons</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Other Lifting Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Lifting Accessories</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Before first use</td>
                      <td className="border border-white/10 px-3 py-2">Yes (unless EC Declaration of Conformity &lt; 12 months)</td>
                      <td className="border border-white/10 px-3 py-2">Yes (unless EC/UKCA Declaration &lt; 12 months)</td>
                      <td className="border border-white/10 px-3 py-2">Yes (unless Declaration &lt; 12 months)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">After installation</td>
                      <td className="border border-white/10 px-3 py-2">Yes — where safety depends on installation</td>
                      <td className="border border-white/10 px-3 py-2">Yes — where safety depends on installation</td>
                      <td className="border border-white/10 px-3 py-2">N/A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Periodic</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">Every 6 months</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">Every 12 months</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">Every 6 months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">After exceptional circumstances</td>
                      <td className="border border-white/10 px-3 py-2">Yes</td>
                      <td className="border border-white/10 px-3 py-2">Yes</td>
                      <td className="border border-white/10 px-3 py-2">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 10 — Reports</p>
              <p className="text-sm text-white mb-3">
                The competent person must make a written report of every thorough examination. The report must contain:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identification of the equipment examined (make, model, serial number, location)</li>
                <li className="pl-1">Date of the examination and date of the previous examination</li>
                <li className="pl-1">The SWL of the equipment (or range of SWLs for different configurations)</li>
                <li className="pl-1">Whether the equipment is safe to operate or has defects</li>
                <li className="pl-1">Details of any defects found and whether they are, or could become, a danger to persons</li>
                <li className="pl-1">The latest date by which the next thorough examination must take place</li>
                <li className="pl-1">Particulars of any tests carried out</li>
                <li className="pl-1">Name, qualifications and address of the competent person</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">What to Check Before Using Lifting Equipment</p>
              <p className="text-sm text-white">
                As a maintenance technician, before using any lifting equipment you should verify: (1) the equipment
                has a current thorough examination report within the required interval, (2) the SWL is clearly marked
                and adequate for your load, (3) there are no visible defects (damage, wear, corrosion, missing pins),
                (4) the equipment is suitable for the task and environment. If any of these cannot be confirmed,
                do not use the equipment — report the issue to your supervisor.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Defects and Practical Application */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Defects (Reg 11) and Application to Electrical Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 11 imposes a duty to report serious defects to the enforcing authority. This provides
              an additional safety net — ensuring that dangerous equipment is not only taken out of service but
              that the regulatory body is informed, enabling wider action if a systemic problem is identified.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 11 — Defects</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">If a thorough examination reveals an <strong>existing or imminent risk of serious personal injury</strong>, the competent person must immediately inform the employer and the relevant enforcing authority (usually the HSE)</li>
                <li className="pl-1">The equipment must not be used until the defect is remedied</li>
                <li className="pl-1">The employer must ensure the defect is remedied before the equipment is used again</li>
                <li className="pl-1">The report must be sent to the enforcing authority as soon as is practicable</li>
                <li className="pl-1">Where the defect is not imminent but needs remedying within a specified timescale, the report will state the date by which the defect must be rectified</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Lifting Equipment in Electrical Maintenance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Thorough Exam Interval</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Checks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MEWP (cherry picker)</td>
                      <td className="border border-white/10 px-3 py-2">High-level cable tray, lighting, containment</td>
                      <td className="border border-white/10 px-3 py-2">6 months (lifting persons)</td>
                      <td className="border border-white/10 px-3 py-2">Hydraulics, guardrails, controls, outriggers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scissor lift</td>
                      <td className="border border-white/10 px-3 py-2">Ceiling work, busbar access</td>
                      <td className="border border-white/10 px-3 py-2">6 months (lifting persons)</td>
                      <td className="border border-white/10 px-3 py-2">Platform integrity, guardrails, descent safety</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chain hoist / block</td>
                      <td className="border border-white/10 px-3 py-2">Transformer, switchgear, motor removal</td>
                      <td className="border border-white/10 px-3 py-2">12 months</td>
                      <td className="border border-white/10 px-3 py-2">Chain wear, hook latch, brake, SWL marking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable pulling winch</td>
                      <td className="border border-white/10 px-3 py-2">Pulling heavy cables through ducts</td>
                      <td className="border border-white/10 px-3 py-2">12 months</td>
                      <td className="border border-white/10 px-3 py-2">Drum, brake, rope/cable condition, SWL</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifting slings</td>
                      <td className="border border-white/10 px-3 py-2">Attaching loads for hoisting</td>
                      <td className="border border-white/10 px-3 py-2">6 months (accessories)</td>
                      <td className="border border-white/10 px-3 py-2">Cuts, abrasion, deformation, stitching, labels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Shackles and eyebolts</td>
                      <td className="border border-white/10 px-3 py-2">Rigging connections</td>
                      <td className="border border-white/10 px-3 py-2">6 months (accessories)</td>
                      <td className="border border-white/10 px-3 py-2">Thread condition, pin security, SWL marking</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">LOLER and PUWER Together</h3>
                <p className="text-sm text-white">
                  Lifting equipment is subject to both LOLER and PUWER simultaneously. PUWER provides the general
                  requirements (suitability, maintenance, inspection, training, controls, isolation). LOLER adds
                  specific requirements for lifting (strength and stability, thorough examination, lift planning,
                  SWL marking, reporting). You must comply with both. Think of PUWER as the baseline and LOLER as
                  the additional layer for lifting-specific risks.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Your Role as a Technician</h3>
                <p className="text-sm text-white">
                  As a maintenance technician, you may not be the appointed person who plans complex lifts, but
                  you will use lifting equipment regularly. Your responsibilities include: checking thorough
                  examination certificates are current, verifying SWL markings, carrying out pre-use visual
                  inspections, not exceeding the SWL, reporting defects immediately, and not using equipment
                  that appears damaged or lacks documentation.
                </p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 note:</strong> LOLER is one of the key regulations covered in the maintenance
              technician standard. You should be able to explain the thorough examination requirements, identify
              lifting equipment you use, and describe the planning requirements for lifting operations. In your
              EPA, you may be asked about a scenario involving a lifting operation as part of electrical maintenance.
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
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>Reg 4 — Strength and stability</li>
                  <li>Reg 5 — Lifting persons (additional requirements)</li>
                  <li>Reg 6 — Positioning and installation</li>
                  <li>Reg 7 — SWL marking</li>
                  <li>Reg 8 — Planning of lifting operations</li>
                  <li>Reg 9 — Thorough examination</li>
                  <li>Reg 10 — Reports of examinations</li>
                  <li>Reg 11 — Defects — notify enforcing authority</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Thorough Examination Intervals</p>
                <ul className="space-y-0.5">
                  <li>Lifting persons: every 6 months maximum</li>
                  <li>Other lifting equipment: every 12 months maximum</li>
                  <li>Lifting accessories: every 6 months maximum</li>
                  <li>Before first use (unless recent Declaration)</li>
                  <li>After exceptional circumstances (damage, disuse)</li>
                  <li>Records kept until next examination or 2 years</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4-6">
              Next: Other Industry-Specific Guidance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section4_5;