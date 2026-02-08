import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "PUWER - Provision and Use of Work Equipment Regulations 1998 - MOET Module 1 Section 4.4";
const DESCRIPTION = "Comprehensive guide to PUWER 1998 for electrical maintenance technicians: suitability, maintenance, inspection, specific risks, controls, isolation, and application to test instruments, power tools and lifting equipment.";

const quickCheckQuestions = [
  {
    id: "puwer-scope",
    question: "PUWER 1998 applies to which of the following used by an electrical maintenance technician?",
    options: [
      "Only heavy machinery and plant equipment",
      "Any work equipment provided for use or used at work — including hand tools, power tools, test instruments and ladders",
      "Only equipment that has an electrical supply",
      "Only equipment manufactured after 1998"
    ],
    correctIndex: 1,
    explanation: "PUWER has a very broad scope. 'Work equipment' is defined as any machinery, appliance, apparatus, tool or installation for use at work. This includes a screwdriver, a multifunction tester, a cordless drill, a ladder, and a cable pulling winch. If you use it for work, PUWER applies to it."
  },
  {
    id: "puwer-maintenance",
    question: "Regulation 5 of PUWER requires that work equipment is:",
    options: [
      "Replaced every five years regardless of condition",
      "Maintained in an efficient state, in efficient working order and in good repair",
      "Cleaned and stored in a locked cabinet",
      "Tested by an external calibration laboratory annually"
    ],
    correctIndex: 1,
    explanation: "Regulation 5 requires work equipment to be maintained in an efficient state, in efficient working order and in good repair. Where a maintenance log is required, this must be kept up to date. The regulation does not prescribe specific intervals — the duty holder must determine what is necessary based on risk and manufacturer guidance."
  },
  {
    id: "puwer-inspection",
    question: "Under Regulation 6 of PUWER, when must work equipment be inspected?",
    options: [
      "Only when it is new",
      "After installation, before first use, and at suitable intervals thereafter — or after exceptional circumstances that could affect safety",
      "Only after an accident has occurred",
      "Only when the manufacturer recommends it"
    ],
    correctIndex: 1,
    explanation: "Regulation 6 requires inspection after installation and before first use (where safety depends on installation conditions), at suitable intervals determined by risk assessment, and after exceptional circumstances (such as damage, prolonged disuse, or modification) that could jeopardise safety."
  },
  {
    id: "puwer-isolation",
    question: "Regulation 19 of PUWER requires work equipment to have:",
    options: [
      "A paint scheme matching the company colours",
      "Clearly identifiable means of isolating it from all sources of energy",
      "A user manual in at least three languages",
      "An asset identification label"
    ],
    correctIndex: 1,
    explanation: "Regulation 19 requires that work equipment is provided with clearly identifiable and readily accessible means of isolating it from all sources of energy. The isolation must be confirmed — reconnection must not expose any person to risk. This directly supports safe isolation procedures for electrical maintenance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "PUWER 1998 was made under which Act?",
    options: [
      "The Factories Act 1961",
      "The Health and Safety at Work Act 1974",
      "The Consumer Protection Act 1987",
      "The Supply of Machinery (Safety) Regulations 2008"
    ],
    correctAnswer: 1,
    explanation: "PUWER 1998 is a statutory instrument made under the Health and Safety at Work Act 1974. It implements the European Use of Work Equipment Directive (2009/104/EC, originally 89/655/EEC) and remains in force as retained UK law."
  },
  {
    id: 2,
    question: "Under Regulation 4 of PUWER, work equipment must be:",
    options: [
      "The cheapest available option",
      "Suitable for the purpose for which it is provided, having regard to the working conditions and health and safety risks",
      "Manufactured in the United Kingdom",
      "Less than 10 years old"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 (Suitability) requires employers to ensure work equipment is suitable for the purpose for which it is used or provided. Suitability considers the working conditions, the nature of the work, and the health and safety risks. Equipment must be used only for operations and under conditions for which it is suitable."
  },
  {
    id: 3,
    question: "A maintenance technician's multifunction tester is covered by PUWER because:",
    options: [
      "It costs more than £100",
      "It is 'work equipment' — any apparatus or tool provided for use at work",
      "It contains a rechargeable battery",
      "It is calibrated annually"
    ],
    correctAnswer: 1,
    explanation: "The definition of 'work equipment' in PUWER is extremely broad — it includes any machinery, appliance, apparatus, tool or installation for use at work. A multifunction tester, voltage indicator, insulation resistance tester, or even a basic screwdriver are all work equipment subject to PUWER requirements."
  },
  {
    id: 4,
    question: "Regulation 7 of PUWER addresses specific risks. This requires that:",
    options: [
      "All equipment is painted with safety markings",
      "Where use involves a specific risk, use is restricted to designated persons and maintenance is carried out by specifically designated persons",
      "A risk assessment is filed with the HSE",
      "Insurance is obtained for the equipment"
    ],
    correctAnswer: 1,
    explanation: "Regulation 7 requires that where work equipment involves a specific risk to health or safety, its use is restricted to those designated persons who have been given the task of using it, and that repairs, modifications, maintenance or servicing are restricted to specifically designated persons."
  },
  {
    id: 5,
    question: "Regulations 8 and 9 of PUWER require employers to provide:",
    options: [
      "Free tea and coffee during equipment training",
      "Adequate information, instruction and training on the use of work equipment",
      "A personal copy of the manufacturer's manual for each employee",
      "Weekly equipment demonstrations"
    ],
    correctAnswer: 1,
    explanation: "Regulation 8 requires adequate health and safety information (and written instructions where appropriate) on the use of work equipment. Regulation 9 requires adequate training for persons who use, supervise or manage the use of work equipment. This includes training on the risks involved, precautions to be taken, and the correct methods of use."
  },
  {
    id: 6,
    question: "Regulation 10 of PUWER requires that work equipment conforms to:",
    options: [
      "The employer's preferred brand specifications",
      "Essential requirements of relevant EU/UK product supply legislation (e.g., UKCA/CE marking)",
      "The ISO 9001 quality standard",
      "Environmental sustainability criteria"
    ],
    correctAnswer: 1,
    explanation: "Regulation 10 requires work equipment to comply with the essential requirements of relevant product supply legislation. For electrical equipment, this means conformity with the Electrical Equipment (Safety) Regulations 2016 and the Supply of Machinery (Safety) Regulations 2008 where applicable — evidenced by UKCA or CE marking."
  },
  {
    id: 7,
    question: "Regulations 11 to 13 of PUWER cover protection against dangerous parts of machinery. Which measures are required?",
    options: [
      "Only fixed guards",
      "Guards, protection devices, information/instruction/training, and supervision — in a hierarchy of measures",
      "Warning labels only",
      "Verbal warnings from the supervisor"
    ],
    correctAnswer: 1,
    explanation: "Regulations 11–13 require a hierarchy of measures to prevent contact with dangerous parts: (1) fixed enclosing guards where practicable, (2) other guards or protection devices, (3) protection appliances (jigs, holders), and (4) provision of information, instruction, training and supervision. These are applied in descending order of preference."
  },
  {
    id: 8,
    question: "Regulation 14 of PUWER requires controls for starting and stopping work equipment. For electrical maintenance equipment, this means:",
    options: [
      "All tools must have key-operated switches",
      "Equipment must have suitable controls for starting, stopping and emergency stop where necessary — properly designed and clearly visible",
      "Only cordless tools may be used",
      "Control switches must be colour-coded red"
    ],
    correctAnswer: 1,
    explanation: "Regulations 14–18 require work equipment to have suitable and sufficient controls for starting, stopping (including emergency stop where there is a risk). Controls must be clearly visible, identifiable, and arranged so that inadvertent operation is prevented. For power tools, this means dead-man switches, trigger locks, and accessible stop controls."
  },
  {
    id: 9,
    question: "Under PUWER, which of the following is an example of a maintenance record that should be kept?",
    options: [
      "The purchase invoice for the equipment",
      "A log of maintenance activities, inspections and any defects found — as required by Regulation 5(2)",
      "The employee's national insurance number",
      "The name of the equipment manufacturer's CEO"
    ],
    correctAnswer: 1,
    explanation: "Regulation 5(2) states that where a maintenance log is appropriate for the type of work equipment, it must be kept up to date. This should record inspection dates, maintenance carried out, defects found and remedied, and the name of the person carrying out the maintenance. For test instruments, this includes calibration records."
  },
  {
    id: 10,
    question: "How does PUWER 1998 interact with the EAWR 1989 for electrical maintenance?",
    options: [
      "PUWER replaces the EAWR for work equipment",
      "They are complementary — PUWER covers the equipment itself, while the EAWR cover the electrical system being worked on and the safe system of work",
      "The EAWR take precedence and PUWER does not apply",
      "Only one set of regulations applies at any time"
    ],
    correctAnswer: 1,
    explanation: "PUWER and the EAWR are complementary. PUWER governs the suitability, maintenance, inspection and safe use of the equipment you use (your tools and instruments). The EAWR govern the electrical system you are working on and the safe systems of work. Both apply simultaneously — a maintenance technician must comply with both."
  },
  {
    id: 11,
    question: "A power tool used for electrical maintenance has a damaged guard. Under PUWER, the maintenance technician should:",
    options: [
      "Continue using it carefully until a replacement is available",
      "Stop using the equipment immediately, report the defect, and not use it until it is repaired or replaced",
      "Tape over the damaged area as a temporary repair",
      "Only use it for light-duty tasks"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 5 (maintenance), Regulation 11 (dangerous parts) and the employee's Section 7 HSWA duty, a damaged guard makes the equipment unsafe. It must be taken out of service immediately, the defect reported, and the equipment not used until properly repaired or replaced. Using damaged equipment is both a PUWER breach and a personal safety failure."
  },
  {
    id: 12,
    question: "Under ST1426, knowledge of PUWER is relevant because:",
    options: [
      "It is a theoretical requirement with no practical application",
      "PUWER governs the safe provision, use and maintenance of all the equipment a maintenance technician uses daily — from hand tools to test instruments to access equipment",
      "It only applies to factory-based maintenance",
      "It is only relevant to supervisors and managers"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to understand the regulations governing their work equipment. PUWER directly governs every tool, instrument and piece of access equipment you use. Knowledge of PUWER requirements for suitability, maintenance, inspection, training and safe use is essential for regulatory compliance and for your End Point Assessment."
  }
];

const faqs = [
  {
    question: "Does PUWER apply to my personal tools that I bring to site?",
    answer: "If you use personal tools for work, they become 'work equipment' under PUWER and must meet the same standards of suitability, maintenance and safety. However, the primary duty under PUWER is on the employer to provide suitable work equipment. If your employer requires you to use your own tools, they must ensure those tools are suitable and safe. Many employers prohibit the use of personal tools for this reason."
  },
  {
    question: "What counts as 'inspection' under PUWER Regulation 6?",
    answer: "Inspection can range from a simple visual check before use to a detailed examination by a competent person. The level of inspection depends on the risk. For a voltage indicator, a pre-use visual check for damage and a functional test is appropriate. For a portable appliance, combined inspection and testing (PAT) may be needed. For lifting equipment, a thorough examination under LOLER may be required (LOLER provides more specific requirements for lifting equipment)."
  },
  {
    question: "How does PUWER relate to the Supply of Machinery (Safety) Regulations 2008?",
    answer: "The Supply of Machinery Regulations govern the design, manufacture and supply of new machinery — they impose duties on manufacturers and suppliers. PUWER governs the provision and use of equipment in the workplace — it imposes duties on employers and users. They are complementary: the manufacturer must ensure the machine is safe when supplied (UKCA/CE marking); the employer must ensure it is suitable, maintained and used safely in the workplace."
  },
  {
    question: "Do I need to keep records of every tool inspection?",
    answer: "PUWER Regulation 6(3) requires that inspections are recorded and kept until the next inspection. Regulation 5(2) requires maintenance logs where appropriate. In practice, most employers maintain an equipment register with inspection records for powered tools and test instruments. For simple hand tools, a pre-use visual check is normally sufficient without formal documentation, though company policies may require more."
  },
  {
    question: "What if my employer provides equipment that I believe is unsuitable or unsafe?",
    answer: "You should report your concerns to your supervisor or employer immediately. Under HSWA Section 7, you have a duty to take reasonable care — using equipment you know to be unsuitable could breach this duty. Under PUWER Regulation 4, your employer has a duty to provide suitable equipment. If the issue is not resolved, you can raise a concern with the HSE or your trade union safety representative."
  }
];

const MOETModule1Section4_4 = () => {
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
            <span>Module 1.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            PUWER — Provision and Use of Work Equipment Regulations 1998
          </h1>
          <p className="text-white/80">
            Legal requirements for all work equipment used by maintenance technicians
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>PUWER:</strong> Governs all work equipment — from hand tools to plant</li>
              <li className="pl-1"><strong>Reg 4:</strong> Equipment must be suitable for the purpose</li>
              <li className="pl-1"><strong>Reg 5:</strong> Maintained in efficient state and good repair</li>
              <li className="pl-1"><strong>Reg 19:</strong> Means of isolation from energy sources</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Test instruments:</strong> GS38-compliant, calibrated, maintained</li>
              <li className="pl-1"><strong>Power tools:</strong> Suitable, guarded, inspected (110 V on site)</li>
              <li className="pl-1"><strong>Access equipment:</strong> Ladders, platforms, MEWPs — PUWER applies</li>
              <li className="pl-1"><strong>ST1426:</strong> Knowledge of equipment regulations for maintenance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the scope and purpose of PUWER 1998 and its definition of 'work equipment'",
              "Describe the suitability requirement (Reg 4) and how it applies to electrical tools",
              "Explain the maintenance and inspection requirements (Regs 5 and 6)",
              "Identify the information, instruction and training duties (Regs 8 and 9)",
              "Describe the controls and isolation requirements (Regs 14–19)",
              "Apply PUWER to test instruments, power tools and access equipment"
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

        {/* Section 01: Scope and Suitability */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Scope of PUWER and Suitability (Regulation 4)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Provision and Use of Work Equipment Regulations 1998 (PUWER) implement the European Work
              Equipment Directive and were made under the Health and Safety at Work Act 1974. They apply to all
              work equipment provided for use or used at work — an extremely broad scope that covers everything
              from a simple screwdriver to a complex CNC machine.
            </p>
            <p>
              For electrical maintenance technicians, PUWER governs every tool and instrument you use daily:
              your voltage indicator, multifunction tester, insulation resistance tester, power tools, hand tools,
              ladders, steps, cable pulling equipment, torque wrenches, and crimping tools. Understanding PUWER
              is not optional — it is the law that governs the equipment you depend on for your safety.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Definition of "Work Equipment" (Regulation 2)</p>
              <p className="text-sm text-white mb-2">
                "Work equipment" means any machinery, appliance, apparatus, tool or installation for use at work
                (whether exclusively or not). This includes:
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Hand tools — screwdrivers, pliers, cable strippers, spanners</li>
                <li className="pl-1">Power tools — drills, grinders, saws, crimping machines</li>
                <li className="pl-1">Test instruments — voltage indicators, MFTs, loop impedance testers, thermal cameras</li>
                <li className="pl-1">Access equipment — ladders, stepladders, scaffold towers, platforms</li>
                <li className="pl-1">Lifting equipment — chain hoists, cable winches (also subject to LOLER)</li>
                <li className="pl-1">PPE ancillary equipment — insulating mats, barriers, screening</li>
                <li className="pl-1">Installations — fixed plant such as compressors, generators, workshop equipment</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 4 — Suitability</p>
              <p className="text-sm text-white mb-3">
                Regulation 4 requires that work equipment is suitable for the purpose for which it is provided.
                Suitability must consider:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>The initial integrity:</strong> Equipment must be constructed or adapted to be suitable — this includes selecting the correct rating, category, and specification</li>
                <li className="pl-1"><strong>The working conditions:</strong> The place where the equipment will be used (e.g., a damp cable tunnel, a dusty factory, an explosive atmosphere) must be considered</li>
                <li className="pl-1"><strong>Health and safety risks:</strong> Selection must account for the risks created by the use of the equipment and ensure they are eliminated or controlled</li>
                <li className="pl-1"><strong>Used only for suitable operations:</strong> Equipment must be used only for operations and under conditions for which it is suitable</li>
              </ul>
              <p className="text-sm text-elec-yellow/70 mt-3">
                <strong>Example:</strong> Using a standard multimeter (not GS38 compliant) to prove dead on a
                230 V distribution board breaches Regulation 4 — the equipment is not suitable for the purpose.
                A GS38-compliant voltage indicator with fused probes, finger guards, and suitable CAT rating is required.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PUWER Duties and Duty Holders</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Duty Holder</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PUWER Duty</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electrical Maintenance Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Employer</td>
                      <td className="border border-white/10 px-3 py-2">Provide suitable equipment, maintain, inspect, train</td>
                      <td className="border border-white/10 px-3 py-2">Provide calibrated MFT, maintain power tools, train on new instruments</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Self-employed</td>
                      <td className="border border-white/10 px-3 py-2">Same duties as employer for own equipment</td>
                      <td className="border border-white/10 px-3 py-2">Maintain own test instruments, keep calibration records</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Employee</td>
                      <td className="border border-white/10 px-3 py-2">Use equipment correctly, report defects</td>
                      <td className="border border-white/10 px-3 py-2">Pre-use checks, report damaged leads, do not misuse tools</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Maintenance and Inspection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Maintenance (Reg 5), Inspection (Reg 6) and Specific Risks (Reg 7)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulations 5, 6 and 7 address the ongoing management of work equipment throughout its life.
              For maintenance technicians, these regulations are doubly relevant — they govern both the equipment
              you use and (in many cases) the equipment you maintain for others.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 5 — Maintenance</h3>
                <p className="text-sm text-white mb-2">
                  "Every employer shall ensure that work equipment is maintained in an efficient state, in efficient
                  working order and in good repair."
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Efficient state:</strong> The equipment functions as intended — test instruments read accurately, power tools operate at correct speed</li>
                  <li className="pl-1"><strong>Efficient working order:</strong> All safety features are operational — guards in place, dead-man switches functional, insulation intact</li>
                  <li className="pl-1"><strong>Good repair:</strong> No damage, wear or deterioration that could affect safety or function</li>
                  <li className="pl-1"><strong>Maintenance log:</strong> Where appropriate to the nature of the equipment, a maintenance log must be kept up to date</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 6 — Inspection</h3>
                <p className="text-sm text-white mb-2">
                  Regulation 6 requires inspection at specific trigger points:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>After installation/assembly:</strong> Where safety depends on how the equipment is installed — check it is installed correctly before first use</li>
                  <li className="pl-1"><strong>At suitable intervals:</strong> Regular inspections determined by risk assessment, manufacturer guidance, and operating conditions</li>
                  <li className="pl-1"><strong>After exceptional circumstances:</strong> Following significant damage, prolonged disuse, modification, or any event that could have affected safety</li>
                </ul>
                <p className="text-sm text-white mt-2">
                  Inspection results must be recorded and kept available until the next inspection is recorded.
                  The records must show the date, findings, and any actions taken.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 7 — Specific Risks</h3>
                <p className="text-sm text-white">
                  Where the use of work equipment involves a specific risk to health or safety, the employer must
                  restrict its use to designated persons who have received specific training. Maintenance and repair
                  must also be restricted to designated persons. For electrical maintenance, this applies to
                  specialised equipment such as HV phasing sticks, portable earthing equipment, cable fault locators
                  used on energised systems, and live line tools.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Application to Electrical Test Instruments</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Instrument</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PUWER Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Practical Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage indicator</td>
                      <td className="border border-white/10 px-3 py-2">Suitable (Reg 4), maintained (Reg 5)</td>
                      <td className="border border-white/10 px-3 py-2">GS38 compliant, pre-use visual check, proving unit test</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multifunction tester</td>
                      <td className="border border-white/10 px-3 py-2">Suitable, maintained, calibrated</td>
                      <td className="border border-white/10 px-3 py-2">Annual calibration, pre-use check, intact leads with fused probes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulated tools</td>
                      <td className="border border-white/10 px-3 py-2">Suitable (VDE rated), maintained</td>
                      <td className="border border-white/10 px-3 py-2">Pre-use check for damaged insulation, replace if compromised</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal imaging camera</td>
                      <td className="border border-white/10 px-3 py-2">Suitable, training (Reg 9)</td>
                      <td className="border border-white/10 px-3 py-2">Trained user, calibrated, suitable for voltage rating of panels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lock-off kit</td>
                      <td className="border border-white/10 px-3 py-2">Suitable, maintained (Reg 5)</td>
                      <td className="border border-white/10 px-3 py-2">Correct type for isolation devices on site, locks in good condition</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Information, Training and Conformity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Information, Training and Conformity (Regs 8–10)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulations 8, 9 and 10 ensure that persons using work equipment have the knowledge needed to use
              it safely, and that the equipment itself meets required product safety standards. These regulations
              are complementary to the EAWR Regulation 16 (competence) and the HSWA Section 2(2)(c) (training).
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 8 — Information and Instructions</h3>
                <p className="text-sm text-white mb-3">
                  Employers must ensure that all persons who use, supervise or manage work equipment have adequate
                  health and safety information, including written instructions where appropriate. This covers:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Conditions in which the equipment may be used</li>
                  <li className="pl-1">Foreseeable abnormal situations and the action to take</li>
                  <li className="pl-1">Conclusions from experience of using the equipment (lessons learned)</li>
                  <li className="pl-1">Manufacturer's instructions where relevant</li>
                </ul>
                <p className="text-sm text-white/70 mt-2">
                  For test instruments, this means access to the operating manual, understanding of measurement
                  categories (CAT I–IV), and knowledge of the limitations of each instrument.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 9 — Training</h3>
                <p className="text-sm text-white mb-3">
                  Employers must ensure adequate training is provided for:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Persons who use the equipment — methods of use, risks, precautions</li>
                  <li className="pl-1">Persons who supervise or manage the use — knowledge to ensure safe use by others</li>
                  <li className="pl-1">Training must be adequate — proportionate to the risk and complexity of the equipment</li>
                </ul>
                <p className="text-sm text-elec-yellow/70 mt-2">
                  <strong>Example:</strong> Before using a new type of insulation resistance tester, you should
                  receive training on its operation, its safety features, and any differences from the previous model.
                  For complex equipment like HV test sets, formal manufacturer training may be required.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 10 — Conformity with Community Requirements</h3>
                <p className="text-sm text-white">
                  Work equipment must conform to relevant product supply legislation. For electrical equipment,
                  this includes the Electrical Equipment (Safety) Regulations 2016 (LVD), the Electromagnetic
                  Compatibility Regulations 2016 (EMC), and the Supply of Machinery (Safety) Regulations 2008 where
                  applicable. Conformity is normally demonstrated by UKCA or CE marking and a Declaration of
                  Conformity. As a maintenance technician, you should verify that test instruments and power tools
                  carry the appropriate markings.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Controls and Isolation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Dangerous Parts, Controls and Isolation (Regs 11–19)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulations 11 to 19 address the physical safety features of work equipment — guarding against
              dangerous parts, controls for operation, and means of isolation. Regulation 19 (isolation from
              energy sources) is particularly relevant to electrical maintenance, as it complements the safe
              isolation requirements of EAWR Regulations 12 and 13.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulations 11–13 — Dangerous Parts of Machinery</h3>
                <p className="text-sm text-white mb-2">
                  A hierarchy of measures must be applied to prevent access to dangerous parts:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Priority 1:</strong> Fixed enclosing guards (most effective — e.g., guards on bench grinders)</li>
                  <li className="pl-1"><strong>Priority 2:</strong> Other guards or protection devices (e.g., interlocked guards, light curtains)</li>
                  <li className="pl-1"><strong>Priority 3:</strong> Protection appliances (jigs, holders, push sticks)</li>
                  <li className="pl-1"><strong>Priority 4:</strong> Information, instruction, training and supervision (least effective — last resort)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulations 14–18 — Controls</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Reg 14 — Controls:</strong> Suitable and sufficient controls for starting, stopping and changing operating conditions. Controls must be clearly visible and identifiable</li>
                  <li className="pl-1"><strong>Reg 15 — Stop controls:</strong> Readily accessible, bringing equipment to a safe condition as quickly as possible</li>
                  <li className="pl-1"><strong>Reg 16 — Emergency stop:</strong> Where there is a risk, emergency stop controls must be provided — readily accessible, coloured red on yellow background</li>
                  <li className="pl-1"><strong>Reg 17 — Controls (additional):</strong> Controls positioned so the operator can see that no person is at risk. Audible/visual warnings where necessary</li>
                  <li className="pl-1"><strong>Reg 18 — Control systems:</strong> Must be safe — failure of the control system must not create additional risks. Control systems should be designed to fail safe</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="text-sm font-medium text-red-400 mb-2">Regulation 19 — Isolation from Sources of Energy</h3>
                <p className="text-sm text-white mb-2">
                  "Every employer shall ensure that where appropriate work equipment is provided with suitable means
                  to isolate it from all its sources of energy."
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Applies to all energy sources — electrical, pneumatic, hydraulic, mechanical (stored energy), thermal</li>
                  <li className="pl-1">The means of isolation must be clearly identifiable and readily accessible</li>
                  <li className="pl-1">Reconnection must not expose any person to risk</li>
                  <li className="pl-1">Complements EAWR Regs 12 and 13 for electrical isolation specifically</li>
                </ul>
                <p className="text-sm text-white mt-2">
                  For maintenance technicians working on motor-driven equipment, you must isolate both the
                  electrical supply (EAWR) and any other energy sources (PUWER Reg 19) — pneumatic, hydraulic,
                  gravitational (raised loads), or stored mechanical energy (springs, flywheels).
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Records and Documentation</h3>
              <p className="text-sm text-white">
                PUWER requires maintenance logs (Regulation 5(2)) where appropriate, and inspection records
                (Regulation 6(3)) to be kept until the next inspection. For electrical maintenance technicians,
                good practice includes maintaining: a tool and instrument register, calibration certificates for
                test instruments, records of PAT testing for portable power tools, pre-use check records for
                access equipment, and training records for specialised equipment. These records demonstrate
                compliance and support a defence of due diligence.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 note:</strong> PUWER is one of the "six-pack" regulations that every maintenance
              technician must understand. Your EPA will expect you to demonstrate knowledge of equipment suitability,
              maintenance, inspection, and safe use — particularly as they apply to the specific tools and
              instruments you use in electrical maintenance.
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
                  <li>Reg 4 — Suitability for purpose</li>
                  <li>Reg 5 — Maintenance in efficient state</li>
                  <li>Reg 6 — Inspection at suitable intervals</li>
                  <li>Reg 7 — Specific risks — designated persons</li>
                  <li>Regs 8/9 — Information, instruction, training</li>
                  <li>Reg 10 — Product conformity (UKCA/CE)</li>
                  <li>Regs 11–13 — Guarding dangerous parts</li>
                  <li>Regs 14–18 — Controls and emergency stop</li>
                  <li>Reg 19 — Isolation from energy sources</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Maintenance Technician Equipment</p>
                <ul className="space-y-0.5">
                  <li>Voltage indicators — GS38, pre-use check</li>
                  <li>MFTs — calibrated, intact leads</li>
                  <li>Power tools — guarded, 110 V on site, PAT tested</li>
                  <li>Insulated tools — VDE rated, inspect insulation</li>
                  <li>Lock-off kits — correct type, good condition</li>
                  <li>Access equipment — inspected, suitable height</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4-5">
              Next: LOLER 1998
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section4_4;