import { ArrowLeft, Wrench, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "PUWER and Work Equipment - HNC Module 1 Section 1.5";
const DESCRIPTION = "Comprehensive guide to the Provision and Use of Work Equipment Regulations 1998 (PUWER) for building services engineers, covering equipment selection, maintenance, inspection, guarding, and training requirements.";

const quickCheckQuestions = [
  {
    id: "puwer-definition",
    question: "Under PUWER, what constitutes 'work equipment'?",
    options: ["Only powered machinery", "Any machinery, appliance, apparatus, tool or installation used at work", "Only electrical equipment", "Equipment costing over £500"],
    correctIndex: 1,
    explanation: "PUWER defines work equipment very broadly as 'any machinery, appliance, apparatus, tool or installation for use at work'. This includes everything from a simple hand tool to complex machinery."
  },
  {
    id: "puwer-suitability",
    question: "Who has the primary duty to ensure work equipment is suitable under PUWER?",
    options: ["The equipment manufacturer", "The employee using it", "The employer", "The Health and Safety Executive"],
    correctIndex: 2,
    explanation: "PUWER places the primary duty on employers to ensure that work equipment is suitable for the purpose for which it is used or provided, and for the conditions in which it will be used."
  },
  {
    id: "puwer-inspection",
    question: "When must work equipment be inspected under PUWER?",
    options: ["Only when new", "Annually without exception", "After installation, after assembly, and at suitable intervals", "Only when it breaks down"],
    correctIndex: 2,
    explanation: "PUWER requires inspection after installation and before first use, after assembly at a new location, and at suitable intervals depending on the nature of the equipment and conditions of use."
  },
  {
    id: "puwer-guards",
    question: "What is the hierarchy of guarding measures under PUWER?",
    options: ["PPE first, then guards", "Fixed guards, then other guards/protection devices, then PPE", "Warning signs only", "Training instead of guards"],
    correctIndex: 1,
    explanation: "PUWER establishes a hierarchy: fixed enclosing guards where practicable, then other guards or protection devices, then information/instruction/training/supervision. PPE is always the last resort."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What year did the Provision and Use of Work Equipment Regulations come into force?",
    options: [
      "1992",
      "1998",
      "2002",
      "2005"
    ],
    correctAnswer: 1,
    explanation: "PUWER 1998 came into force on 5 December 1998, replacing the earlier 1992 regulations. It implements European Directive 89/655/EEC as amended by Directive 95/63/EC."
  },
  {
    id: 2,
    question: "Which of the following is NOT considered work equipment under PUWER?",
    options: [
      "A cordless drill",
      "A ladder",
      "Livestock",
      "A multifunction tester"
    ],
    correctAnswer: 2,
    explanation: "PUWER specifically excludes livestock from the definition of work equipment. However, it covers virtually all other equipment used at work, including hand tools, power tools, ladders, test equipment, and machinery."
  },
  {
    id: 3,
    question: "Under PUWER Regulation 4, equipment must be suitable for which of the following?",
    options: [
      "Only the task it was designed for",
      "The purpose used, conditions of use, and any foreseeable risk",
      "Any task the employer requires",
      "Only indoor use"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 requires equipment to be suitable for the purpose for which it is used, suitable for the conditions of use (location, environment), and account for foreseeable risks to health and safety."
  },
  {
    id: 4,
    question: "What must an employer ensure regarding maintenance under PUWER Regulation 5?",
    options: [
      "Maintenance is carried out only by the manufacturer",
      "Equipment is maintained in efficient state, working order and good repair",
      "Maintenance records are kept for 10 years minimum",
      "Only electrical equipment requires maintenance"
    ],
    correctAnswer: 1,
    explanation: "Regulation 5 requires employers to ensure work equipment is maintained in an efficient state, in efficient working order and in good repair. Where there is a maintenance log, it must be kept up to date."
  },
  {
    id: 5,
    question: "A building services engineer using a 110V angle grinder on a construction site must ensure the grinder has:",
    options: [
      "A CE mark only",
      "Appropriate guards, a dead man's switch, and is properly maintained",
      "Been purchased within the last year",
      "A 13A plug"
    ],
    correctAnswer: 1,
    explanation: "Under PUWER, the grinder must have appropriate guards to prevent contact with the rotating disc, a hold-to-run (dead man's) control device, proper maintenance, and be suitable for site conditions. 110V CTE is required on construction sites."
  },
  {
    id: 6,
    question: "PUWER Regulation 9 requires that adequate training is provided. This training must include:",
    options: [
      "Methods of use, risks involved, and precautions to take",
      "Only manufacturer instructions",
      "Online courses exclusively",
      "Training is optional for experienced workers"
    ],
    correctAnswer: 0,
    explanation: "Regulation 9 requires training to include methods of using the equipment, any risks arising from use, and precautions to be taken. This applies regardless of experience level."
  },
  {
    id: 7,
    question: "What type of control does PUWER require to prevent accidental starting of dangerous machinery?",
    options: [
      "A key switch",
      "A password",
      "A deliberate action control requiring intentional operation",
      "Voice activation"
    ],
    correctAnswer: 2,
    explanation: "PUWER Regulation 14 requires controls to require a deliberate action to operate. This prevents accidental starting due to unintentional contact with controls."
  },
  {
    id: 8,
    question: "Under PUWER, when must a mobile work platform (MEWP) be inspected?",
    options: [
      "Only annually",
      "Before first use at each site, and at intervals not exceeding 6 months",
      "Only when visibly damaged",
      "Every 2 years"
    ],
    correctAnswer: 1,
    explanation: "MEWPs must be thoroughly examined before first use, after assembly at each new site, and at intervals not exceeding 6 months (or in accordance with an examination scheme). Daily pre-use checks are also required."
  },
  {
    id: 9,
    question: "What is the employer's duty regarding specific risks under PUWER Regulation 7?",
    options: [
      "Accept that some risks are unavoidable",
      "Ensure use is restricted to designated persons and repairs by competent persons only",
      "Transfer risk to employees through disclaimers",
      "Only address risks to visitors"
    ],
    correctAnswer: 1,
    explanation: "Where specific risks exist, Regulation 7 requires employers to ensure use is restricted to designated persons for that purpose, and that repairs, modifications, maintenance or servicing is carried out only by specifically designated competent persons."
  },
  {
    id: 10,
    question: "A multifunction tester used for verification testing falls under PUWER. What must the employer ensure?",
    options: [
      "It has a UKCA/CE mark only",
      "It is suitable, maintained, calibrated, and users are trained in its safe use",
      "It was manufactured in the UK",
      "It is replaced every year"
    ],
    correctAnswer: 1,
    explanation: "Test equipment under PUWER must be suitable for the tests being performed, properly maintained and calibrated (typically annually), and users must be trained in its correct and safe use including understanding limitations."
  },
  {
    id: 11,
    question: "What does PUWER Regulation 11 require regarding dangerous parts of machinery?",
    options: [
      "Dangerous parts should be painted red",
      "Effective measures to prevent contact with dangerous parts or arrest movement before contact",
      "Warning labels are sufficient",
      "Workers must sign a disclaimer"
    ],
    correctAnswer: 1,
    explanation: "Regulation 11 requires effective measures to prevent access to dangerous parts, or to stop the movement of dangerous parts before any part of a person can reach them."
  },
  {
    id: 12,
    question: "Under PUWER, who can carry out inspections of work equipment?",
    options: [
      "Any employee",
      "Only HSE inspectors",
      "A competent person with appropriate knowledge, training and experience",
      "Only the manufacturer"
    ],
    correctAnswer: 2,
    explanation: "PUWER requires inspections to be carried out by a competent person - someone with sufficient training and experience or knowledge to enable them to detect defects and assess their significance."
  }
];

const faqs = [
  {
    question: "Does PUWER apply to my own tools that I bring to work?",
    answer: "Yes. PUWER applies to all work equipment used at work, regardless of ownership. If you bring your own tools to use for work purposes, your employer must still ensure they are suitable, maintained, and safe. Many employers require personal tools to undergo the same inspection regime as company equipment, or restrict their use entirely."
  },
  {
    question: "How often should portable power tools be inspected?",
    answer: "PUWER does not specify fixed intervals - it requires inspection at 'suitable intervals'. For portable power tools in construction/building services, industry practice typically includes: user checks before each use (visual inspection), formal visual inspection weekly/monthly by a competent person, and combined inspection and PAT testing at intervals determined by risk assessment (commonly 3-6 months for 110V site equipment)."
  },
  {
    question: "What is the relationship between PUWER and LOLER for lifting equipment?",
    answer: "PUWER covers all work equipment including lifting equipment, setting general requirements. LOLER (Lifting Operations and Lifting Equipment Regulations 1998) provides additional, more specific requirements for lifting equipment and operations. Both regulations apply - LOLER supplements but does not replace PUWER requirements for lifting equipment."
  },
  {
    question: "Can an employer be prosecuted for PUWER breaches even if no accident occurs?",
    answer: "Yes. PUWER creates absolute duties in many areas - the employer must comply regardless of whether an accident results. HSE can and does prosecute for breaches such as unguarded machinery, lack of training, inadequate maintenance, or failure to inspect, even where no injury has occurred."
  },
  {
    question: "What records should be kept for PUWER compliance?",
    answer: "Essential records include: maintenance logs and records of repairs, inspection reports and certificates (especially for equipment requiring statutory thorough examination), training records for equipment users, risk assessments relating to equipment use, and manufacturer instructions/manuals. Keep records for at least 2 years after equipment disposal, though many organisations retain them longer."
  }
];

const HNCModule1Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section1">
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
            <Wrench className="h-4 w-4" />
            <span>Module 1.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            PUWER and Work Equipment
          </h1>
          <p className="text-white/80">
            The Provision and Use of Work Equipment Regulations 1998 - essential requirements for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>PUWER:</strong> Requires equipment to be suitable, safe and maintained</li>
              <li className="pl-1"><strong>Scope:</strong> All work equipment from hand tools to machinery</li>
              <li className="pl-1"><strong>Duties:</strong> Employer must assess, select, maintain, inspect, train</li>
              <li className="pl-1"><strong>Guarding:</strong> Hierarchy from fixed guards to PPE as last resort</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Power tools:</strong> Drills, grinders, saws - all require guarding</li>
              <li className="pl-1"><strong>Test equipment:</strong> MFTs, insulation testers - calibration required</li>
              <li className="pl-1"><strong>Access equipment:</strong> Ladders, platforms, MEWPs - inspection regime</li>
              <li className="pl-1"><strong>110V systems:</strong> Mandatory for construction site tools</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define work equipment and understand PUWER's scope and application",
              "Explain employer duties for equipment selection and suitability",
              "Describe maintenance and inspection requirements under PUWER",
              "Identify training and competence requirements for equipment users",
              "Understand guarding requirements and the hierarchy of protection",
              "Apply PUWER requirements to building services tools and equipment"
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

        {/* Section 1: Definition and Scope */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Definition of Work Equipment and PUWER Scope
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Provision and Use of Work Equipment Regulations 1998 (PUWER) establishes fundamental
              requirements to ensure that work equipment is safe throughout its working life. These
              regulations implement European Directive requirements and apply across all industry sectors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What is Work Equipment?</p>
              <p className="text-sm text-white mb-3">
                PUWER defines <strong>work equipment</strong> as: "any machinery, appliance, apparatus, tool
                or installation for use at work (whether exclusively or not)". This definition is deliberately
                broad and includes:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Hand tools:</strong> Screwdrivers, spanners, hammers, chisels</li>
                <li className="pl-1"><strong>Power tools:</strong> Drills, grinders, saws, heat guns</li>
                <li className="pl-1"><strong>Electrical equipment:</strong> Extension leads, transformers, distribution units</li>
                <li className="pl-1"><strong>Test instruments:</strong> Multifunction testers, clamp meters, thermal imagers</li>
                <li className="pl-1"><strong>Access equipment:</strong> Ladders, stepladders, scaffolding, MEWPs</li>
                <li className="pl-1"><strong>Fixed installations:</strong> Machine tools, lifts, escalators</li>
                <li className="pl-1"><strong>Vehicles:</strong> When used as work equipment (e.g., forklift trucks)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key PUWER Regulations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Regulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 4</td>
                      <td className="border border-white/10 px-3 py-2">Suitability of work equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 5</td>
                      <td className="border border-white/10 px-3 py-2">Maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 6</td>
                      <td className="border border-white/10 px-3 py-2">Inspection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 7</td>
                      <td className="border border-white/10 px-3 py-2">Specific risks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 8</td>
                      <td className="border border-white/10 px-3 py-2">Information and instructions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 9</td>
                      <td className="border border-white/10 px-3 py-2">Training</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Regs 11-24</td>
                      <td className="border border-white/10 px-3 py-2">Dangerous parts, controls, stability, lighting, markings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Who Does PUWER Apply To?</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Employers:</strong> Primary duty holders - must ensure compliance</li>
                <li className="pl-1"><strong>Self-employed persons:</strong> Same duties as employers for their own equipment</li>
                <li className="pl-1"><strong>Persons in control of equipment:</strong> Those who control non-domestic premises</li>
                <li className="pl-1"><strong>Users and supervisors:</strong> Duties to use correctly and report defects</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> PUWER applies to privately owned equipment used for work. If an electrician
              uses their own tools at work, the employer still has duties to ensure those tools are safe.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Selection and Suitability */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Selection and Suitability Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PUWER Regulation 4 requires that work equipment is suitable for the purpose for which it
              is used or provided. This is a fundamental requirement that must be satisfied before
              equipment is put into use.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Suitability Considerations (Regulation 4)</p>
              <p className="text-sm text-white mb-3">Equipment must be suitable having regard to:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Initial integrity:</strong> Constructed or adapted to be suitable for the purpose</li>
                <li className="pl-1"><strong>Conditions of use:</strong> The place and environment where it will be used</li>
                <li className="pl-1"><strong>Purpose:</strong> The operations for which it will be used</li>
                <li className="pl-1"><strong>Foreseeable risks:</strong> Any risks to health and safety from its use</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selecting Power Tools</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">110V CTE for construction sites</li>
                  <li className="pl-1">Appropriate power rating for task</li>
                  <li className="pl-1">Correct tool for the material</li>
                  <li className="pl-1">UKCA/CE marking present</li>
                  <li className="pl-1">Suitable for environmental conditions</li>
                  <li className="pl-1">Ergonomic design for user</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selecting Test Equipment</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Meets BS EN 61557 requirements</li>
                  <li className="pl-1">Appropriate category rating (CAT III/IV)</li>
                  <li className="pl-1">Capable of required tests</li>
                  <li className="pl-1">Calibration status current</li>
                  <li className="pl-1">Suitable accuracy for application</li>
                  <li className="pl-1">Leads and probes included</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Criteria for Building Services Equipment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Selection Criteria</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PUWER Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cordless drill</td>
                      <td className="border border-white/10 px-3 py-2">Torque, speed, battery capacity</td>
                      <td className="border border-white/10 px-3 py-2">Clutch for torque control, side handle provision</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Angle grinder</td>
                      <td className="border border-white/10 px-3 py-2">Disc size, power, disc type</td>
                      <td className="border border-white/10 px-3 py-2">Guard fitted, dead man's switch, anti-vibration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MFT (tester)</td>
                      <td className="border border-white/10 px-3 py-2">Test range, accuracy, features</td>
                      <td className="border border-white/10 px-3 py-2">CAT rating suitable, calibration valid</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ladder</td>
                      <td className="border border-white/10 px-3 py-2">Height, duty rating, material</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 131 compliance, suitable for load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SDS drill</td>
                      <td className="border border-white/10 px-3 py-2">Impact energy, drill diameter capacity</td>
                      <td className="border border-white/10 px-3 py-2">Vibration rating, dust extraction provision</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400/90 mb-2">Unsuitable Equipment Examples</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Domestic vacuum cleaner used for construction dust (not suitable for fine particles)</li>
                <li className="pl-1">230V power tools on construction sites (110V CTE required)</li>
                <li className="pl-1">Standard multimeter for mains testing (needs CAT III/IV rating)</li>
                <li className="pl-1">Timber ladder for electrical work near live parts (non-conducting required)</li>
                <li className="pl-1">Unguarded bench grinder (must have guards and eye shields)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The employer must consider suitability at the point of selection AND
              throughout the equipment's use - conditions may change requiring reassessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Maintenance and Inspection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Maintenance and Inspection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PUWER Regulations 5 and 6 establish requirements for maintenance and inspection. These
              ensure equipment remains in safe working condition throughout its service life and that
              deterioration is detected before it leads to dangerous situations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Requirements (Regulation 5)</p>
              <p className="text-sm text-white mb-3">
                Every employer shall ensure that work equipment is maintained in:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Efficient state:</strong> Performs its function effectively</li>
                <li className="pl-1"><strong>Efficient working order:</strong> Operates correctly and safely</li>
                <li className="pl-1"><strong>Good repair:</strong> No deterioration affecting safety</li>
              </ul>
              <p className="text-sm text-white mt-3">
                Where a maintenance log is appropriate, it must be kept up to date. The type and frequency
                of maintenance depends on:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-2">
                <li className="pl-1">Manufacturer's recommendations</li>
                <li className="pl-1">Intensity and conditions of use</li>
                <li className="pl-1">Risk from failure or deterioration</li>
                <li className="pl-1">Previous fault history</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Requirements (Regulation 6)</p>
              <p className="text-sm text-white mb-3">Inspection is required where:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">The safety of equipment depends on the installation conditions</li>
                <li className="pl-1">Equipment is exposed to conditions causing deterioration liable to result in danger</li>
              </ul>
              <p className="text-sm text-white mt-3">Inspections must be carried out:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-2">
                <li className="pl-1"><strong>After installation:</strong> Before first use at that location</li>
                <li className="pl-1"><strong>After assembly:</strong> After assembly at a new site or location</li>
                <li className="pl-1"><strong>At suitable intervals:</strong> Determined by risk assessment</li>
                <li className="pl-1"><strong>After exceptional circumstances:</strong> That may have affected safety</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Regime for Building Services Equipment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">User Check</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formal Inspection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">110V power tools</td>
                      <td className="border border-white/10 px-3 py-2">Before each use</td>
                      <td className="border border-white/10 px-3 py-2">Weekly/monthly visual + PAT 3-6 monthly</td>
                      <td className="border border-white/10 px-3 py-2">Higher frequency on construction sites</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extension leads</td>
                      <td className="border border-white/10 px-3 py-2">Before each use</td>
                      <td className="border border-white/10 px-3 py-2">Monthly visual + PAT 3-6 monthly</td>
                      <td className="border border-white/10 px-3 py-2">Check for damage, overheating signs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test instruments</td>
                      <td className="border border-white/10 px-3 py-2">Before use (proving unit)</td>
                      <td className="border border-white/10 px-3 py-2">Annual calibration + visual inspection</td>
                      <td className="border border-white/10 px-3 py-2">Check leads and probes condition</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ladders</td>
                      <td className="border border-white/10 px-3 py-2">Before each use</td>
                      <td className="border border-white/10 px-3 py-2">Monthly detailed inspection</td>
                      <td className="border border-white/10 px-3 py-2">Check rungs, stiles, feet, locking mechanisms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MEWPs</td>
                      <td className="border border-white/10 px-3 py-2">Daily pre-use checks</td>
                      <td className="border border-white/10 px-3 py-2">6-monthly thorough examination (LOLER)</td>
                      <td className="border border-white/10 px-3 py-2">Written report required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hand tools</td>
                      <td className="border border-white/10 px-3 py-2">Before each use</td>
                      <td className="border border-white/10 px-3 py-2">Periodic - risk-based</td>
                      <td className="border border-white/10 px-3 py-2">Check handles, heads, insulation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Competent Person for Inspections</p>
              <p className="text-sm text-white mb-2">
                Inspections must be carried out by a <strong>competent person</strong> - someone with:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Sufficient training and experience or knowledge</li>
                <li className="pl-1">Ability to detect defects or weaknesses</li>
                <li className="pl-1">Ability to assess their significance for continued safe use</li>
                <li className="pl-1">Independence from the work that may be affected by the inspection</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-400/90 mb-2">Record Keeping</p>
              <p className="text-sm text-white">
                Where inspection is required under Regulation 6, results must be recorded and kept
                available until the next inspection. Records should include: date, person carrying
                out inspection, equipment identified, defects found, and action taken. For thorough
                examinations under LOLER, specific documentary requirements apply.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Maintenance and inspection are complementary but different.
              Maintenance keeps equipment working; inspection verifies it is safe.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Training, Guarding and Protection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Training, Competence, Guards and Protection Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PUWER establishes comprehensive requirements for training users and protecting them
              from dangerous parts of machinery. These regulations work together to ensure both
              competent operation and engineered safety measures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Information and Instructions (Regulation 8)</p>
              <p className="text-sm text-white mb-3">
                Employers must ensure all persons using work equipment have available:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Adequate health and safety information</li>
                <li className="pl-1">Written instructions where appropriate</li>
                <li className="pl-1">Information on conditions of use and foreseeable abnormal situations</li>
                <li className="pl-1">Conclusions from experience of using the equipment</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training Requirements (Regulation 9)</p>
              <p className="text-sm text-white mb-3">
                Training must be adequate and must include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Methods of use:</strong> Correct operation techniques</li>
                <li className="pl-1"><strong>Risks:</strong> Hazards that may arise from use</li>
                <li className="pl-1"><strong>Precautions:</strong> Actions to mitigate those risks</li>
              </ul>
              <p className="text-sm text-white mt-3">
                This applies to users, supervisors, and managers. Training must be provided before use
                and refreshed when equipment changes, work methods change, or competence declines.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training for Power Tools</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Pre-use inspection procedures</li>
                  <li className="pl-1">Correct fitting of accessories</li>
                  <li className="pl-1">Safe operating techniques</li>
                  <li className="pl-1">Guard adjustment and use</li>
                  <li className="pl-1">PPE requirements</li>
                  <li className="pl-1">Emergency stop procedures</li>
                  <li className="pl-1">Defect reporting</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training for Test Equipment</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Understanding measurement principles</li>
                  <li className="pl-1">Correct connection methods</li>
                  <li className="pl-1">Safe isolation procedures</li>
                  <li className="pl-1">Interpretation of results</li>
                  <li className="pl-1">Limitations of the instrument</li>
                  <li className="pl-1">Proving unit use</li>
                  <li className="pl-1">Calibration awareness</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dangerous Parts of Machinery (Regulation 11)</p>
              <p className="text-sm text-white mb-3">
                Where there is risk from contact with dangerous parts, effective measures must be taken to:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Prevent access to dangerous parts, OR</li>
                <li className="pl-1">Stop the movement of dangerous parts before any part of a person can reach them</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hierarchy of Protection Measures</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-green-500/10 border-l-4 border-green-500">
                  <p className="text-sm font-medium text-green-400">1. Fixed Enclosing Guards</p>
                  <p className="text-sm text-white/80 mt-1">
                    Where practicable, use fixed guards that can only be removed with tools. These
                    completely enclose the danger zone. Example: guards on bench grinders.
                  </p>
                </div>
                <div className="p-3 rounded bg-blue-500/10 border-l-4 border-blue-500">
                  <p className="text-sm font-medium text-blue-400">2. Other Guards or Protection Devices</p>
                  <p className="text-sm text-white/80 mt-1">
                    Where fixed guards are not practicable: interlocking guards (stop machine when
                    opened), adjustable guards, self-adjusting guards, photoelectric devices,
                    pressure mats, or two-hand controls.
                  </p>
                </div>
                <div className="p-3 rounded bg-amber-500/10 border-l-4 border-amber-500">
                  <p className="text-sm font-medium text-amber-400">3. Protection Appliances</p>
                  <p className="text-sm text-white/80 mt-1">
                    Jigs, holders, push sticks - devices that keep hands away from danger zones
                    while allowing the work to proceed.
                  </p>
                </div>
                <div className="p-3 rounded bg-purple-500/10 border-l-4 border-purple-500">
                  <p className="text-sm font-medium text-purple-400">4. Information, Instruction, Training, Supervision</p>
                  <p className="text-sm text-white/80 mt-1">
                    When engineering controls alone cannot provide adequate protection, these must
                    supplement (not replace) physical measures.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Requirements (Regulations 14-18)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Regulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 14</td>
                      <td className="border border-white/10 px-3 py-2">Controls requiring deliberate action</td>
                      <td className="border border-white/10 px-3 py-2">Dead man's switch on angle grinder</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 15</td>
                      <td className="border border-white/10 px-3 py-2">Start controls</td>
                      <td className="border border-white/10 px-3 py-2">On/off switch on power tool</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 16</td>
                      <td className="border border-white/10 px-3 py-2">Stop controls</td>
                      <td className="border border-white/10 px-3 py-2">Trigger release stops drill</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 17</td>
                      <td className="border border-white/10 px-3 py-2">Emergency stop</td>
                      <td className="border border-white/10 px-3 py-2">E-stop on workshop machinery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 18</td>
                      <td className="border border-white/10 px-3 py-2">Controls clearly visible/identifiable</td>
                      <td className="border border-white/10 px-3 py-2">Colour-coded switches, labels</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Specific Risks (Regulation 7)</p>
              <p className="text-sm text-white mb-2">
                Where use involves specific risks, employers must ensure:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use is restricted to persons given the task of using it</li>
                <li className="pl-1">Repairs, modifications, maintenance, or servicing only by specifically designated persons</li>
              </ul>
              <p className="text-sm text-white/80 mt-2">
                Example: Only trained and authorised persons should operate MEWPs or high-voltage test equipment.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Guards and protection devices are the first line of defence.
              Training and supervision supplement but never replace engineering controls.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Application in Building Services</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Case Study: 110V Power Tool System</h3>
              <p className="text-sm text-white mb-2">
                A building services contractor implements PUWER compliance for site power tools:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Selection:</strong> All tools rated 110V CTE, UKCA marked, appropriate for tasks</li>
                <li className="pl-1"><strong>Maintenance:</strong> Monthly servicing schedule, replacement of worn parts</li>
                <li className="pl-1"><strong>Inspection:</strong> User pre-use checks (laminated checklist), weekly formal inspection, quarterly PAT testing</li>
                <li className="pl-1"><strong>Training:</strong> Tool induction for all operatives, refresher annually</li>
                <li className="pl-1"><strong>Records:</strong> Asset register, inspection log, training matrix maintained</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Case Study: Multifunction Test Equipment</h3>
              <p className="text-sm text-white mb-2">
                Applying PUWER to electrical test instruments:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Suitability:</strong> Instruments meet BS EN 61557, CAT III/IV rated for supply work</li>
                <li className="pl-1"><strong>Maintenance:</strong> Firmware updates, battery replacement, lead replacement</li>
                <li className="pl-1"><strong>Inspection:</strong> Proving unit check before each test sequence, annual calibration</li>
                <li className="pl-1"><strong>Training:</strong> Instrument-specific training, understanding of test methods and limitations</li>
                <li className="pl-1"><strong>Records:</strong> Calibration certificates, user training records, defect reports</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Case Study: Access Equipment</h3>
              <p className="text-sm text-white mb-2">
                PUWER and WAHR compliance for ladders and platforms:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Selection:</strong> BS EN 131 ladders, appropriate class for trade use, fibreglass for electrical work</li>
                <li className="pl-1"><strong>Maintenance:</strong> Cleaning, adjustment of locking mechanisms, replacement of worn feet</li>
                <li className="pl-1"><strong>Inspection:</strong> Pre-use visual check, monthly detailed inspection with tagging system</li>
                <li className="pl-1"><strong>Training:</strong> Safe use of ladders, 3-point contact rule, angle of placement</li>
                <li className="pl-1"><strong>Records:</strong> Ladder register, inspection records, training evidence</li>
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
                <p className="font-medium text-white mb-1">Key PUWER Regulations</p>
                <ul className="space-y-0.5">
                  <li>Reg 4 - Suitability of equipment</li>
                  <li>Reg 5 - Maintenance requirements</li>
                  <li>Reg 6 - Inspection requirements</li>
                  <li>Reg 9 - Training</li>
                  <li>Reg 11 - Dangerous parts</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Employer Duties</p>
                <ul className="space-y-0.5">
                  <li>Select suitable equipment</li>
                  <li>Maintain in safe condition</li>
                  <li>Inspect at appropriate intervals</li>
                  <li>Train users adequately</li>
                  <li>Provide guards and protection</li>
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
            <Link to="../h-n-c-module1-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section1-6">
              Next: COSHH
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section1_5;
