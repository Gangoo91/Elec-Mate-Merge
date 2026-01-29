import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electricity at Work Regulations 1989 - HNC Module 1 Section 1.2";
const DESCRIPTION = "Master the Electricity at Work Regulations 1989 for building services: key regulations, duties on systems and equipment, live working provisions, competence requirements and the defence of due diligence.";

const quickCheckQuestions = [
  {
    id: "eawr-scope",
    question: "To whom do the Electricity at Work Regulations 1989 apply?",
    options: ["Only qualified electricians", "Only electrical contractors", "All employers and employees at work", "Only building services engineers"],
    correctIndex: 2,
    explanation: "EAWR 1989 applies to ALL employers and employees who work with or near electrical systems. The regulations impose duties on everyone at work, not just electrical specialists."
  },
  {
    id: "regulation-14",
    question: "Under Regulation 14, when is live working permitted?",
    options: ["Whenever it is more convenient", "Only when unreasonable to work dead and reasonable to work live", "Only by qualified electricians", "Never under any circumstances"],
    correctIndex: 1,
    explanation: "Regulation 14 permits live working ONLY when it is unreasonable in all circumstances to make the equipment dead AND it is reasonable in all circumstances to work live. Both conditions must be satisfied."
  },
  {
    id: "regulation-16",
    question: "What does Regulation 16 require regarding competence?",
    options: ["A minimum of 5 years experience", "NVQ Level 3 qualification", "Technical knowledge, experience and ability to prevent danger", "Registration with a competent persons scheme"],
    correctIndex: 2,
    explanation: "Regulation 16 requires persons to possess technical knowledge or experience, or be under appropriate supervision, to prevent danger and injury. It defines competence by outcome, not by specific qualifications."
  },
  {
    id: "due-diligence",
    question: "What is the 'defence of due diligence' under EAWR 1989?",
    options: ["Ignorance of the law", "Having insurance cover", "Taking all reasonable steps and exercising all due diligence to avoid committing an offence", "Employing a qualified electrician"],
    correctIndex: 2,
    explanation: "Regulation 29 provides a defence if the duty holder can prove they took all reasonable steps and exercised all due diligence to avoid committing the offence. This requires documented evidence of precautions taken."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which regulation of EAWR 1989 deals with the construction of electrical systems?",
    options: [
      "Regulation 4",
      "Regulation 5",
      "Regulation 8",
      "Regulation 12"
    ],
    correctAnswer: 0,
    explanation: "Regulation 4 requires that all systems shall at all times be of such construction as to prevent danger, so far as is reasonably practicable. This covers initial design, selection and installation."
  },
  {
    id: 2,
    question: "What does Regulation 12 require regarding means of cutting off supply?",
    options: [
      "Main switch only at the origin of supply",
      "Suitable means for cutting off supply and isolation from every source of electrical energy",
      "Circuit breakers on all circuits",
      "Emergency stop buttons in all areas"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12 requires suitable means for cutting off the supply of electrical energy to any electrical equipment AND for isolation of any electrical equipment from every source of electrical energy."
  },
  {
    id: 3,
    question: "Under EAWR 1989, what is considered 'danger'?",
    options: [
      "Any electrical installation",
      "Risk of injury from electric shock, burn, fire or explosion arising from electricity",
      "Working at height near electrical equipment",
      "Exceeding design current ratings"
    ],
    correctAnswer: 1,
    explanation: "Regulation 2 defines 'danger' as risk of injury from electric shock, electrical burn, electrical explosion or arcing, or from fire or explosion initiated by electrical energy."
  },
  {
    id: 4,
    question: "Which regulation deals with work on or near live conductors?",
    options: [
      "Regulation 4",
      "Regulation 13",
      "Regulation 14",
      "Regulation 16"
    ],
    correctAnswer: 2,
    explanation: "Regulation 14 specifically addresses work on or near live conductors. It requires that no person shall work on or near live conductors unless certain strict conditions are met."
  },
  {
    id: 5,
    question: "What must be ensured before dead working according to Regulation 13?",
    options: [
      "The circuit breaker is switched off",
      "Adequate precautions are taken to prevent the conductor becoming live",
      "A permit to work is issued",
      "The installation is less than 5 years old"
    ],
    correctAnswer: 1,
    explanation: "Regulation 13 requires that adequate precautions shall be taken to prevent any conductor from becoming electrically charged during work. This includes isolation, proving dead, and applying locks/tags."
  },
  {
    id: 6,
    question: "What does 'so far as is reasonably practicable' mean under EAWR?",
    options: [
      "If it is technically possible",
      "When it is convenient",
      "Unless the cost and effort greatly outweigh the risk reduction",
      "Only if specifically requested"
    ],
    correctAnswer: 2,
    explanation: "Reasonably practicable involves weighing the risk against the sacrifice (time, trouble, cost) needed to avert the risk. Duty holders must take precautions unless the cost is grossly disproportionate to the risk."
  },
  {
    id: 7,
    question: "Which regulation requires that electrical systems be maintained to prevent danger?",
    options: [
      "Regulation 4",
      "Regulation 5",
      "Regulation 6",
      "Regulation 10"
    ],
    correctAnswer: 0,
    explanation: "Regulation 4(2) states that all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger. This is part of the overall Regulation 4 on systems construction."
  },
  {
    id: 8,
    question: "What does Regulation 6 require for adverse or hazardous environments?",
    options: [
      "Special training for all workers",
      "Electrical equipment to be suitable for its environment or protected from adverse conditions",
      "Inspection every 6 months",
      "Only IP68 rated equipment"
    ],
    correctAnswer: 1,
    explanation: "Regulation 6 requires that electrical equipment exposed to adverse or hazardous environments (mechanical damage, weather, temperature, wet, dirty, corrosive, flammable) shall be suitable or protected."
  },
  {
    id: 9,
    question: "In a building services context, what does Regulation 7 require for conductors in a system?",
    options: [
      "All conductors must be copper",
      "Conductors must have earthing or other suitable precautions to prevent danger if they become charged",
      "Minimum 2.5mm² cable for all circuits",
      "Conductors must be tested annually"
    ],
    correctAnswer: 1,
    explanation: "Regulation 7 requires that all conductors in a system that may give rise to danger shall either be suitably insulated or have other suitable precautions taken (such as placing out of reach or earthing)."
  },
  {
    id: 10,
    question: "Who can be prosecuted under EAWR 1989?",
    options: [
      "Only employers",
      "Only employees working with electricity",
      "Both employers and employees with duties under the regulations",
      "Only the client or building owner"
    ],
    correctAnswer: 2,
    explanation: "EAWR 1989 imposes duties on both employers and employees. Regulation 3 states that it shall be the duty of every employer and self-employed person to comply, and employees have duties under specific regulations."
  },
  {
    id: 11,
    question: "What does Regulation 15 require regarding working space, access and lighting?",
    options: [
      "Natural daylight in all electrical rooms",
      "Adequate working space, means of access and lighting for safe working",
      "Minimum 3 metre clearance around switchgear",
      "Emergency lighting in all areas"
    ],
    correctAnswer: 1,
    explanation: "Regulation 15 requires adequate working space, adequate means of access, and adequate lighting for all work activities on or near electrical equipment where danger may arise."
  },
  {
    id: 12,
    question: "Which precautions would satisfy Regulation 14 for live working on a building services distribution board?",
    options: [
      "Simply informing colleagues you are working live",
      "Insulated tools, barriers, PPE, accompaniment, and competent supervision",
      "Working quickly to minimise exposure time",
      "Having a first aider on standby"
    ],
    correctAnswer: 1,
    explanation: "Regulation 14 requires suitable precautions including: insulated tools, barriers/screens, appropriate PPE, accompaniment by another competent person, and competent supervision where appropriate."
  }
];

const faqs = [
  {
    question: "What is the difference between EAWR and BS 7671?",
    answer: "EAWR 1989 is criminal law - breach can result in prosecution, fines and imprisonment. It sets general safety objectives that must be achieved. BS 7671 (the Wiring Regulations) is a British Standard providing detailed technical requirements that, if followed, will likely satisfy EAWR. Compliance with BS 7671 is not mandatory but provides a presumption of compliance with EAWR for installation work."
  },
  {
    question: "Can employees be prosecuted under EAWR 1989?",
    answer: "Yes. EAWR imposes duties on both employers and employees. Employees have specific duties under Regulations 4, 7-16, and can be prosecuted for breaches. For example, an employee who knowingly works unsafely on live equipment without proper precautions could face personal prosecution."
  },
  {
    question: "What records should be kept to demonstrate due diligence?",
    answer: "Comprehensive records including: risk assessments, maintenance records, inspection certificates (EICR), training records, competence assessments, safe systems of work, permit to work documentation, equipment test records, and evidence of remedial actions taken. The HSE advises that records should demonstrate a systematic approach to electrical safety."
  },
  {
    question: "Does EAWR apply to low voltage DC systems in building services?",
    answer: "Yes. EAWR applies to all electrical systems regardless of voltage. This includes 24V DC BMS controls, emergency lighting systems, fire alarm circuits, and data/communications cabling where it interfaces with mains power. All such systems must be constructed and maintained to prevent danger."
  },
  {
    question: "What constitutes 'competence' under Regulation 16?",
    answer: "Competence is not defined by specific qualifications but by three factors: technical knowledge, experience, and the ability to prevent danger and injury. A person may be competent for some tasks but not others. Competence must be matched to the complexity and risk of the work. Supervision can supplement an individual's competence."
  },
  {
    question: "When would the HSE prosecute for EAWR breaches?",
    answer: "The HSE typically prosecutes when: there has been a serious incident or near-miss, there is evidence of systematic failure, previous advice or enforcement has been ignored, or the duty holder has shown reckless disregard for safety. Prosecution can result in unlimited fines for organisations and imprisonment for individuals in serious cases."
  }
];

const HNCModule1Section1_2 = () => {
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

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electricity at Work Regulations 1989
          </h1>
          <p className="text-white/80">
            Criminal law provisions for electrical safety in the workplace - duties, defences and building services applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>EAWR 1989:</strong> Criminal law imposing duties on employers and employees</li>
              <li className="pl-1"><strong>33 Regulations:</strong> Covering systems, equipment, maintenance and working practices</li>
              <li className="pl-1"><strong>Regulation 14:</strong> Strict controls on live working</li>
              <li className="pl-1"><strong>Regulation 16:</strong> Competence requirements for all electrical work</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Applies to:</strong> All electrical work in buildings</li>
              <li className="pl-1"><strong>Duty holders:</strong> Designers, installers, maintainers, owners</li>
              <li className="pl-1"><strong>Records:</strong> Essential for demonstrating compliance</li>
              <li className="pl-1"><strong>Penalties:</strong> Unlimited fines, imprisonment for breaches</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the scope and application of EAWR 1989",
              "Identify the key regulations (3-16) and their requirements",
              "Understand duties on systems, equipment and conductors",
              "Apply Regulation 14 provisions for live working",
              "Define competence requirements under Regulation 16",
              "Demonstrate the defence of due diligence"
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

        {/* Section 1: Key Regulations Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Key Regulations Overview (Regulations 3-16)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electricity at Work Regulations 1989 are made under the Health and Safety at Work etc. Act 1974.
              They impose duties on employers, employees and self-employed persons to ensure electrical safety
              in all workplaces. Unlike BS 7671, EAWR is criminal law - breaches can result in prosecution.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Criminal Law Status</p>
              <p className="text-sm text-white">
                EAWR 1989 is enforced by the Health and Safety Executive (HSE). Breaches can result in unlimited
                fines for organisations, and individuals can face personal prosecution with penalties including
                imprisonment. This distinguishes EAWR from BS 7671, which is a technical standard without direct
                legal force.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Structure of the Regulations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Regulations</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Coverage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1-3</td>
                      <td className="border border-white/10 px-3 py-2">Interpretation and duties</td>
                      <td className="border border-white/10 px-3 py-2">Defines terms; establishes who has duties</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4-5</td>
                      <td className="border border-white/10 px-3 py-2">Systems and equipment</td>
                      <td className="border border-white/10 px-3 py-2">Construction and maintenance; equipment strength</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6-9</td>
                      <td className="border border-white/10 px-3 py-2">Protective provisions</td>
                      <td className="border border-white/10 px-3 py-2">Environment; insulation; earthing; integrity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10-12</td>
                      <td className="border border-white/10 px-3 py-2">Protective devices</td>
                      <td className="border border-white/10 px-3 py-2">Connections; excess current; isolation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">13-16</td>
                      <td className="border border-white/10 px-3 py-2">Working practices</td>
                      <td className="border border-white/10 px-3 py-2">Dead working; live working; space/access; competence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">29</td>
                      <td className="border border-white/10 px-3 py-2">Defence</td>
                      <td className="border border-white/10 px-3 py-2">Due diligence defence for criminal proceedings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The phrase 'so far as is reasonably practicable' (SFAIRP) qualifies most duties.
              This requires a risk-based approach where precautions must be taken unless grossly disproportionate to the risk.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Duties on Systems, Equipment and Conductors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Duties on Systems, Equipment and Conductors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulations 4-12 establish fundamental requirements for electrical systems and equipment.
              These regulations apply throughout the lifecycle of building services installations - from
              design and installation through to maintenance and eventual decommissioning.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 4: Systems - Construction and Maintenance</p>
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-sm text-white mb-3">
                  <strong>4(1):</strong> All systems shall at all times be of such construction as to prevent,
                  so far as is reasonably practicable, danger.
                </p>
                <p className="text-sm text-white mb-3">
                  <strong>4(2):</strong> All systems shall be maintained so as to prevent, so far as is
                  reasonably practicable, such danger.
                </p>
                <p className="text-sm text-white/70">
                  This regulation covers the entire electrical system including all electrical equipment.
                  'Maintained' includes regular inspection, testing, repair and replacement as necessary.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulations 5-9: Equipment Protection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Reg 5:</strong> Equipment strength and capability</li>
                  <li className="pl-1"><strong>Reg 6:</strong> Suitability for adverse environments</li>
                  <li className="pl-1"><strong>Reg 7:</strong> Insulation and protection of conductors</li>
                  <li className="pl-1"><strong>Reg 8:</strong> Earthing and other precautions</li>
                  <li className="pl-1"><strong>Reg 9:</strong> Integrity of referenced conductors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulations 10-12: Protective Devices</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Reg 10:</strong> Proper connections</li>
                  <li className="pl-1"><strong>Reg 11:</strong> Protection against excess current</li>
                  <li className="pl-1"><strong>Reg 12:</strong> Means of cutting off supply and isolation</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Regulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 5 (Strength)</td>
                      <td className="border border-white/10 px-3 py-2">Switchgear rated for prospective fault current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 6 (Environment)</td>
                      <td className="border border-white/10 px-3 py-2">IP-rated equipment in plant rooms; ATEX zones</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 7 (Insulation)</td>
                      <td className="border border-white/10 px-3 py-2">Cable insulation; busbars in trunking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 11 (Excess current)</td>
                      <td className="border border-white/10 px-3 py-2">MCBs, fuses, RCBOs properly coordinated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reg 12 (Isolation)</td>
                      <td className="border border-white/10 px-3 py-2">Local isolators at AHUs; emergency stops</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> These regulations require the outcome (prevention of danger) rather
              than prescribing specific methods. Compliance with BS 7671 generally satisfies these regulations
              for new installations.
            </p>
          </div>
        </section>

        {/* Section 3: Work on Live Equipment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Work on Live Equipment (Regulation 14)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 14 is one of the most important provisions in EAWR. It establishes a strong
              presumption against live working and requires strict conditions to be met before any
              live work can be undertaken.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Regulation 14 - The Legal Test</p>
              <p className="text-sm text-white italic mb-3">
                "No person shall be engaged in any work activity on or so near any live conductor
                (other than one suitably covered with insulating material so as to prevent danger)
                that danger may arise unless—"
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-400">(a)</span>
                  <span>it is unreasonable in all the circumstances for it to be dead; and</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-400">(b)</span>
                  <span>it is reasonable in all the circumstances for him to be at work on or near it while it is live; and</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-400">(c)</span>
                  <span>suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury.</span>
                </li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Live Working May Be Justified</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fault finding:</strong> Diagnostic measurements requiring live circuits</li>
                <li className="pl-1"><strong>Commissioning:</strong> Initial energisation and testing of systems</li>
                <li className="pl-1"><strong>Critical services:</strong> Where isolation would cause greater risk (e.g., life support)</li>
                <li className="pl-1"><strong>Functional testing:</strong> Verifying correct operation of protective devices</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Required Precautions for Live Working</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="font-medium text-white text-sm mb-2">Technical Controls</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Insulated tools (1000V rated)</li>
                    <li>Insulating matting</li>
                    <li>Barriers and screens</li>
                    <li>Test instruments with shrouded probes</li>
                    <li>Restricted access</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="font-medium text-white text-sm mb-2">Administrative Controls</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Written risk assessment</li>
                    <li>Safe system of work / method statement</li>
                    <li>Competent person undertaking work</li>
                    <li>Accompaniment (second person)</li>
                    <li>Competent supervision</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-2">Regulation 13: Precautions for Dead Working</p>
              <p className="text-sm text-white/90 mb-2">
                Before Regulation 14 applies, Regulation 13 requires adequate precautions to prevent
                conductors becoming live during work:
              </p>
              <ol className="text-sm text-white/90 space-y-1 list-decimal list-outside ml-5">
                <li className="pl-1">Identify the circuit to be worked on</li>
                <li className="pl-1">Isolate from all points of supply</li>
                <li className="pl-1">Prove the isolation is effective</li>
                <li className="pl-1">Lock off and apply warning notices</li>
                <li className="pl-1">Prove the circuit is dead at the point of work</li>
              </ol>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>HSE Guidance:</strong> The HSE memorandum of guidance on EAWR (HSR25) states that
              live working should be the exception, not the rule. Convenience or cost savings alone
              do not justify live working.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Competence and Due Diligence */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Competence Requirements and Defence of Due Diligence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 16 is fundamental to electrical safety - it requires that only competent
              persons undertake electrical work. Regulation 29 provides a defence for duty holders
              who can demonstrate they took all reasonable precautions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">Regulation 16 - Competence</p>
              <p className="text-sm text-white italic">
                "No person shall be engaged in any work activity where technical knowledge or experience
                is necessary to prevent danger or, where appropriate, injury, unless he possesses such
                knowledge or experience, or is under such degree of supervision as may be appropriate
                having regard to the nature of the work."
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Components of Competence</p>
              <div className="grid sm:grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Technical Knowledge</p>
                  <p className="text-white/70 text-xs">Understanding of electrical principles, regulations and standards</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Experience</p>
                  <p className="text-white/70 text-xs">Practical skills developed through hands-on work</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Ability to Prevent Danger</p>
                  <p className="text-white/70 text-xs">Judgement to recognise and avoid hazards</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Competence in Building Services Context</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Work Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Competence Indicators</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Supervision Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Simple replacement (lamp, fuse)</td>
                      <td className="border border-white/10 px-3 py-2">Basic electrical awareness</td>
                      <td className="border border-white/10 px-3 py-2">General supervision</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circuit installation</td>
                      <td className="border border-white/10 px-3 py-2">NVQ Level 3 / AM2 or equivalent</td>
                      <td className="border border-white/10 px-3 py-2">Periodic checking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution board work</td>
                      <td className="border border-white/10 px-3 py-2">Qualified electrician with relevant experience</td>
                      <td className="border border-white/10 px-3 py-2">Self-supervising</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HV switchgear</td>
                      <td className="border border-white/10 px-3 py-2">HV authorisation; specific equipment training</td>
                      <td className="border border-white/10 px-3 py-2">Authorised person system</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Regulation 29 - Defence of Due Diligence</p>
              <p className="text-sm text-white mb-3">
                In criminal proceedings, it is a defence to prove that all reasonable steps were
                taken and all due diligence was exercised to avoid committing the offence.
              </p>
              <p className="text-sm font-medium text-white mb-2">Evidence required:</p>
              <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Documented risk assessments and method statements</li>
                <li className="pl-1">Records of inspection and testing (EICR certificates)</li>
                <li className="pl-1">Training records and competence assessments</li>
                <li className="pl-1">Maintenance schedules and records</li>
                <li className="pl-1">Evidence of acting on inspection findings</li>
                <li className="pl-1">Safe systems of work and permit procedures</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Demonstrating Due Diligence</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Proactive management:</strong> Systematic approach to electrical safety, not reactive</li>
                <li className="pl-1"><strong>Competent advice:</strong> Using qualified persons for design, installation and inspection</li>
                <li className="pl-1"><strong>Regular inspection:</strong> EICR at appropriate intervals (typically 5 years commercial)</li>
                <li className="pl-1"><strong>Prompt remediation:</strong> Acting on defects identified during inspections</li>
                <li className="pl-1"><strong>Record keeping:</strong> Comprehensive documentation of all safety measures</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical point:</strong> The defence of due diligence is not available for all regulations.
              Regulations 4(4), 7-9, 11, and 13 are absolute duties where the defence does not apply -
              these regulations do not include 'so far as is reasonably practicable'.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Building Services Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Building Services Applications</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Application 1: Commercial Office Building</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Managing electrical safety in a multi-tenancy office building
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="mb-2"><strong>EAWR duties include:</strong></p>
                <ul className="space-y-1 list-disc list-outside ml-5">
                  <li>Reg 4: Maintain common electrical systems (risers, distribution boards)</li>
                  <li>Reg 12: Ensure tenants can isolate their supplies safely</li>
                  <li>Reg 15: Adequate access and lighting in electrical intake rooms</li>
                  <li>Reg 16: Use competent contractors for all electrical work</li>
                  <li>EICR every 5 years; PAT testing; emergency lighting testing</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Application 2: Industrial Facility</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> HVAC system maintenance in a manufacturing plant
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="mb-2"><strong>Key considerations:</strong></p>
                <ul className="space-y-1 list-disc list-outside ml-5">
                  <li>Reg 6: Equipment rated for industrial environment (dust, vibration, temperature)</li>
                  <li>Reg 11: Motor protection coordinated with upstream devices</li>
                  <li>Reg 12: Local isolation at each AHU, FCU, and motor</li>
                  <li>Reg 13: Lock-out/tag-out procedures for maintenance</li>
                  <li>Reg 14: Live fault-finding only with full precautions</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Application 3: Healthcare Facility</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Electrical safety in hospital building services
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="mb-2"><strong>Enhanced requirements:</strong></p>
                <ul className="space-y-1 list-disc list-outside ml-5">
                  <li>HTM 06-01 supplements EAWR for healthcare premises</li>
                  <li>Critical supplies: Cannot simply isolate - life support systems</li>
                  <li>Reg 14 considerations: May justify live working where isolation unacceptable</li>
                  <li>Enhanced competence: Medical location awareness required</li>
                  <li>More frequent inspection: Annual EICR for Group 2 medical locations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Regulations Summary</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reg 3:</strong> Duties on employers and employees</li>
                <li className="pl-1"><strong>Reg 4:</strong> Systems construction and maintenance</li>
                <li className="pl-1"><strong>Reg 12:</strong> Means of cutting off and isolation</li>
                <li className="pl-1"><strong>Reg 13:</strong> Precautions for working dead</li>
                <li className="pl-1"><strong>Reg 14:</strong> Live working restrictions</li>
                <li className="pl-1"><strong>Reg 16:</strong> Competence requirements</li>
                <li className="pl-1"><strong>Reg 29:</strong> Defence of due diligence</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Current EICR in place (within 5 years for commercial)</li>
                <li className="pl-1">All C1/C2 defects remediated</li>
                <li className="pl-1">Competent persons appointed for electrical work</li>
                <li className="pl-1">Safe isolation procedures documented</li>
                <li className="pl-1">Training records maintained</li>
                <li className="pl-1">Risk assessments for electrical work activities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Non-Compliances</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inadequate maintenance:</strong> No EICR or inspection regime</li>
                <li className="pl-1"><strong>Unauthorised work:</strong> Unqualified persons doing electrical work</li>
                <li className="pl-1"><strong>Unsafe live working:</strong> Without proper risk assessment/precautions</li>
                <li className="pl-1"><strong>Missing isolation:</strong> No local means of isolation at equipment</li>
                <li className="pl-1"><strong>Poor records:</strong> Unable to demonstrate due diligence</li>
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
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>Reg 4 - Systems construction & maintenance</li>
                  <li>Reg 12 - Means of isolation</li>
                  <li>Reg 13 - Dead working precautions</li>
                  <li>Reg 14 - Live working restrictions</li>
                  <li>Reg 16 - Competence requirements</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Services Duties</p>
                <ul className="space-y-0.5">
                  <li>EICR at appropriate intervals</li>
                  <li>Competent contractors only</li>
                  <li>Safe isolation procedures</li>
                  <li>Record keeping for due diligence</li>
                  <li>Prompt defect remediation</li>
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
            <Link to="../h-n-c-module1-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Health and Safety at Work Act
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section1-3">
              Next: BS 7671 Requirements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section1_2;
