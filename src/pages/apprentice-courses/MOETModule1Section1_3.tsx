import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Lock-Out / Tag-Out (LOTO) - MOET Module 1.1.3";
const DESCRIPTION = "Complete guide to Lock-Out / Tag-Out (LOTO) procedures for electrical engineering maintenance technicians: energy isolation, LOTO equipment, the 6-step procedure, group lockout, HSE/OSHA requirements and common failures.";

const quickCheckQuestions = [
  {
    id: "loto-purpose",
    question: "What is the PRIMARY purpose of a Lock-Out / Tag-Out (LOTO) procedure?",
    options: [
      "To comply with insurance requirements",
      "To prevent the unexpected release of hazardous energy during maintenance or servicing",
      "To indicate that equipment is out of service for production scheduling",
      "To provide a record of maintenance work completed"
    ],
    correctIndex: 1,
    explanation: "The primary purpose of LOTO is to prevent the unexpected energisation, start-up, or release of stored energy that could cause injury or death during maintenance, servicing, or repair activities. It is a life-critical control measure, not merely a paperwork exercise."
  },
  {
    id: "energy-sources",
    question: "Which of the following is an example of stored energy that must be addressed during LOTO?",
    options: [
      "Ambient lighting in the work area",
      "A compressed spring in a circuit breaker mechanism",
      "The colour of warning labels on equipment",
      "The temperature of the surrounding air"
    ],
    correctIndex: 1,
    explanation: "A compressed spring — such as the closing mechanism in a circuit breaker — stores mechanical energy that can be released unexpectedly. During LOTO, all forms of stored energy must be identified and controlled, including springs, elevated components (gravitational), charged capacitors (electrical), pressurised systems (hydraulic/pneumatic), and thermal energy."
  },
  {
    id: "personal-lock-rule",
    question: "Under a LOTO system, who is permitted to remove a personal safety lock from an energy isolating device?",
    options: [
      "Any competent person on site",
      "The shift supervisor at the end of the shift",
      "Only the person who applied the lock",
      "The equipment owner or manufacturer"
    ],
    correctIndex: 2,
    explanation: "A fundamental principle of LOTO is that only the person who applied a lock may remove it. This 'one person, one lock, one key' rule ensures that no individual can be exposed to hazardous energy by another person's actions. Emergency removal procedures exist but require senior management authorisation and strict safeguards."
  },
  {
    id: "group-lockout",
    question: "In a group lockout situation, what device allows multiple workers to secure the same energy isolating point?",
    options: [
      "A cable tie",
      "A multi-lock hasp (scissor hasp)",
      "A single master padlock",
      "An electronic access control card"
    ],
    correctIndex: 1,
    explanation: "A multi-lock hasp (also called a scissor hasp or lockout hasp) is a device that accepts multiple padlocks. Each worker attaches their own personal lock to the hasp, preventing the isolating device from being operated until every individual has removed their lock. The hasp ensures that the isolation cannot be defeated while any worker remains at risk."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Lock-Out / Tag-Out procedures are required to protect workers from:",
    options: [
      "Noise exposure during routine operations",
      "The unexpected release of hazardous energy during maintenance or servicing",
      "Slips, trips and falls in the workplace",
      "Manual handling injuries"
    ],
    correctAnswer: 1,
    explanation: "LOTO specifically protects workers from the unexpected energisation, start-up, or release of stored energy during maintenance, servicing, or repair. Without LOTO, equipment could start unexpectedly, exposing workers to electrical shock, crushing, amputation, or burns."
  },
  {
    id: 2,
    question: "Which of the following energy sources must be considered during a LOTO procedure?",
    options: [
      "Only electrical energy",
      "Electrical and mechanical energy only",
      "Electrical, mechanical, hydraulic, pneumatic, thermal, chemical and gravitational energy",
      "Only the energy source most recently used"
    ],
    correctAnswer: 2,
    explanation: "LOTO must address ALL forms of hazardous energy, not just electrical. A motor control centre (MCC) may have electrical supply, pneumatic actuators, hydraulic systems, spring-loaded mechanisms, and thermal energy from hot components. Every energy source must be identified, isolated, and verified as de-energised."
  },
  {
    id: 3,
    question: "Which of the following is NOT an approved energy isolating device for LOTO?",
    options: [
      "A switch-disconnector with lockable handle",
      "A push-button start/stop station",
      "A circuit breaker with a lock-off facility",
      "A manual valve with a lockable handle"
    ],
    correctAnswer: 1,
    explanation: "A push-button start/stop station is a control device, not an energy isolating device. It does not provide a physical break in the energy supply and can be bypassed by control system faults. LOTO must always use true isolating devices that provide a positive, physical disconnection of the energy source — such as switch-disconnectors, circuit breakers, or lockable valves."
  },
  {
    id: 4,
    question: "The correct sequence for the six-step LOTO procedure is:",
    options: [
      "Lock out, tag out, isolate, prepare, verify, notify",
      "Prepare, shut down, isolate, lock out/tag out, verify isolation, perform work",
      "Notify, isolate, test, lock, tag, work",
      "Risk assess, isolate, lock, verify, tag, notify"
    ],
    correctAnswer: 1,
    explanation: "The six-step LOTO procedure follows a logical sequence: (1) Prepare — identify all energy sources; (2) Shut down — stop the equipment using normal procedures; (3) Isolate — operate energy isolating devices; (4) Lock out/Tag out — apply personal locks and tags; (5) Verify isolation — prove energy sources are de-energised; (6) Perform the work safely."
  },
  {
    id: 5,
    question: "A LOTO tag (danger tag) is used to:",
    options: [
      "Replace a padlock when one is not available",
      "Provide a written warning identifying who applied the lockout, why, and when",
      "Indicate that equipment has passed its annual inspection",
      "Authorise the equipment to be returned to service"
    ],
    correctAnswer: 1,
    explanation: "LOTO tags are informational warning devices that supplement padlocks. They identify the person who applied the lockout, the date and time, the reason for the lockout, and contact information. Tags alone do not provide physical restraint — they must always be used in conjunction with padlocks, not as a substitute."
  },
  {
    id: 6,
    question: "When performing LOTO on a motor control centre (MCC), which of the following stored energy sources must be specifically addressed?",
    options: [
      "Only the incoming mains supply",
      "Incoming supply, control voltages, capacitor banks, and spring-charged mechanisms",
      "Only the motor circuit",
      "The building's main incoming supply"
    ],
    correctAnswer: 1,
    explanation: "An MCC presents multiple energy sources: the main incoming supply, separate control voltage supplies (often from a different source), power factor correction capacitor banks (which retain charge after isolation), and spring-charged circuit breaker mechanisms. Each must be individually identified, isolated, and verified as de-energised."
  },
  {
    id: 7,
    question: "During a shift changeover, the correct LOTO procedure requires:",
    options: [
      "The outgoing shift simply tells the incoming shift which locks are theirs",
      "The outgoing worker removes their lock and the incoming worker immediately applies theirs, maintaining continuous lockout",
      "All locks are removed at shift end and the incoming shift starts a new LOTO from scratch",
      "The supervisor holds a single master lock that covers all shifts"
    ],
    correctAnswer: 1,
    explanation: "Shift changeover is a critical period for LOTO safety. The correct procedure requires the incoming worker to apply their personal lock BEFORE the outgoing worker removes theirs. This ensures continuous lockout protection with no gap in isolation. The equipment is never in an unlocked state during the transition."
  },
  {
    id: 8,
    question: "How often should LOTO procedures be formally inspected and reviewed?",
    options: [
      "Only after an incident occurs",
      "At least annually, by an authorised person not involved in the procedure being inspected",
      "Every five years as part of a general safety review",
      "Only when new equipment is installed"
    ],
    correctAnswer: 1,
    explanation: "LOTO procedures must be formally inspected at least annually. The inspection should be carried out by an authorised person who is not involved in the procedure being reviewed. The inspection verifies that workers understand and correctly follow the procedure, that equipment is adequate, and that the written procedure matches actual practice."
  },
  {
    id: 9,
    question: "A variable speed drive (VSD) has been isolated at its incoming supply. What additional LOTO consideration is essential?",
    options: [
      "No additional considerations — isolating the supply is sufficient",
      "The DC bus capacitors may retain lethal voltage and must be verified as discharged",
      "The drive's programming must be backed up",
      "The motor must be disconnected from the load"
    ],
    correctAnswer: 1,
    explanation: "Variable speed drives contain large DC bus capacitors that can retain lethal voltage (typically 300-800V DC) for several minutes after the supply is isolated. The LOTO procedure must include verification that the DC bus has discharged to a safe level. Many drives have a 'charge' indicator LED — this must be confirmed as extinguished, and a voltage test performed at the DC bus terminals."
  },
  {
    id: 10,
    question: "Under the Health and Safety at Work Act 1974, employers must:",
    options: [
      "Provide LOTO equipment only when requested by employees",
      "Provide adequate LOTO equipment, procedures, training and supervision free of charge",
      "Allow employees to supply their own padlocks from home",
      "Only implement LOTO for high voltage systems"
    ],
    correctAnswer: 1,
    explanation: "The HSWA 1974 (Sections 2 and 3) places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare of employees. This includes providing adequate LOTO equipment (locks, hasps, tags, lockout devices), written procedures, competence-based training, and effective supervision — all provided free of charge."
  },
  {
    id: 11,
    question: "Which statement about LOTO tags is correct?",
    options: [
      "Tags provide the same level of protection as padlocks",
      "Tags should be used alone when padlocks are not available",
      "Tags are supplementary warnings — they must be used with locks, not instead of them",
      "Tags are only required for electrical isolation"
    ],
    correctAnswer: 2,
    explanation: "LOTO tags are supplementary warning devices. They do not provide physical restraint and can be removed by anyone. They must always be used in conjunction with padlocks, not as a substitute. Tags provide critical information (who, what, when, why) but only a padlock provides the physical barrier that prevents operation of the energy isolating device."
  },
  {
    id: 12,
    question: "A common cause of LOTO-related fatalities is:",
    options: [
      "Using too many padlocks on a single hasp",
      "Failure to identify and isolate all energy sources, particularly stored energy and alternative supplies",
      "Applying locks and tags too quickly",
      "Conducting the annual LOTO inspection too frequently"
    ],
    correctAnswer: 1,
    explanation: "The most common cause of LOTO fatalities is incomplete energy isolation — typically failing to identify all sources of energy. Stored energy (capacitors, springs, elevated loads), alternative supplies (UPS, generators, solar PV), and interconnected systems are frequently overlooked. A thorough energy survey during the preparation step is essential to preventing these deaths."
  }
];

const faqs = [
  {
    question: "What is the difference between lockout and tagout?",
    answer: "Lockout is the physical securing of an energy isolating device using a padlock, preventing the device from being operated. Tagout is the attachment of a warning tag providing information about who applied the lockout, when, and why. Lockout provides physical restraint; tagout provides information and warning. Both must be used together — tags alone are never an acceptable substitute for locks."
  },
  {
    question: "Can I use a cable tie instead of a padlock for LOTO?",
    answer: "No. Cable ties, tape, wire, and similar improvised devices do not provide adequate physical restraint. They can be easily cut, broken, or removed without tools. Only purpose-designed LOTO padlocks with unique keys should be used. These are typically lightweight, brightly coloured (often red or yellow), and engraved or labelled with the owner's identity."
  },
  {
    question: "What should I do if someone else's lock is on equipment I need to operate?",
    answer: "You must never cut, remove, or tamper with another person's lock. Contact the lock owner and request that they remove it when they have confirmed it is safe to do so. If the lock owner cannot be contacted (e.g., they have left site or are absent), a formal emergency lock removal procedure must be followed — this requires senior management authorisation, verification of safety, and documentation."
  },
  {
    question: "Do I need LOTO for 'quick' jobs that only take a few minutes?",
    answer: "Yes, absolutely. There is no time exemption for LOTO. Equipment can start unexpectedly in a fraction of a second — far faster than any human reaction time. Many serious LOTO incidents involve workers who thought the job would 'only take a minute' and did not apply locks. The full LOTO procedure must be followed regardless of the expected duration of the work."
  },
  {
    question: "How does LOTO relate to the safe isolation procedure taught in Module 1.1.2?",
    answer: "LOTO and safe isolation are complementary procedures. Safe isolation (switch off, isolate, secure, prove dead) addresses the electrical circuit specifically. LOTO extends this to cover ALL energy sources — not just electrical — and adds formal documentation, tagging, and management controls. In practice, the safe isolation procedure for electrical energy is performed as part of the wider LOTO procedure. An electrical maintenance technician must be competent in both."
  }
];

const MOETModule1Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1">
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
            <span>Module 1.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Lock-Out / Tag-Out (LOTO)
          </h1>
          <p className="text-white/80">
            Controlling hazardous energy through systematic isolation, locking and tagging procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>LOTO:</strong> Prevents unexpected release of hazardous energy during maintenance</li>
              <li className="pl-1"><strong>7 energy types:</strong> Electrical, mechanical, hydraulic, pneumatic, thermal, chemical, gravitational</li>
              <li className="pl-1"><strong>6 steps:</strong> Prepare, shut down, isolate, lock/tag, verify, work</li>
              <li className="pl-1"><strong>Rule:</strong> One person, one lock, one key — only you remove your lock</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>MCCs:</strong> Multiple energy sources — supply, control, capacitors, springs</li>
              <li className="pl-1"><strong>VSDs:</strong> DC bus capacitors retain lethal voltage after isolation</li>
              <li className="pl-1"><strong>Switchgear:</strong> Spring-charged mechanisms store mechanical energy</li>
              <li className="pl-1"><strong>ST1426:</strong> Core competency for maintenance technicians</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and legal basis of Lock-Out / Tag-Out procedures",
              "Identify all seven categories of hazardous energy requiring LOTO",
              "Select appropriate LOTO equipment for different isolation scenarios",
              "Carry out the six-step LOTO procedure from preparation to safe work",
              "Apply group lockout and shift changeover procedures correctly",
              "Recognise common LOTO failures and describe how to prevent them"
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

        {/* Section 01: What Is LOTO and Why Does It Matter? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is LOTO and Why Does It Matter?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lock-Out / Tag-Out (LOTO) is a safety procedure used to ensure that equipment is properly
              shut down, isolated from all energy sources, and secured before maintenance, servicing, or
              repair work begins. The 'lock-out' element involves applying a physical lock to an energy
              isolating device, preventing it from being operated. The 'tag-out' element involves attaching
              a warning tag that identifies who applied the lock, when, and why.
            </p>
            <p>
              LOTO procedures are essential because modern industrial and commercial equipment can contain
              multiple forms of hazardous energy — electrical, mechanical, hydraulic, pneumatic, thermal,
              chemical, and gravitational. The unexpected release of any of these energy forms during
              maintenance work can cause serious injury or death. LOTO provides a systematic, verifiable
              method of controlling all energy sources before work begins.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Human Cost of LOTO Failure</p>
              <p className="text-sm text-white mb-3">
                HSE data consistently shows that failure to control hazardous energy is one of the leading
                causes of workplace fatalities in the UK. Across all industries, LOTO-related incidents cause
                significant numbers of deaths and major injuries annually. In the electrical sector specifically,
                failures include electrocution from unexpected energisation, burns from arc flash on supposedly
                isolated switchgear, and injuries from machinery restarting during maintenance.
              </p>
              <p className="text-sm text-white">
                The common thread in most incidents is not a lack of equipment or knowledge — it is a failure
                to follow the procedure. Shortcuts, complacency, and time pressure are the real killers.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Framework for LOTO in the UK</p>
              <p className="text-sm text-white mb-3">
                Unlike the United States, where OSHA 29 CFR 1910.147 provides a specific lockout/tagout
                standard, the UK does not have a single dedicated LOTO regulation. Instead, LOTO requirements
                are derived from several overlapping pieces of legislation:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Legislation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">LOTO Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HSWA 1974, s.2</td>
                      <td className="border border-white/10 px-3 py-2">General duty to provide safe systems of work and safe plant/equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EAWR 1989, Regs 12-13</td>
                      <td className="border border-white/10 px-3 py-2">Duty to work dead; precautions to prevent becoming live during work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PUWER 1998, Regs 19-22</td>
                      <td className="border border-white/10 px-3 py-2">Isolation from energy sources; measures to prevent inadvertent reconnection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MHSWR 1999, Reg 3</td>
                      <td className="border border-white/10 px-3 py-2">Suitable and sufficient risk assessment for all work activities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HSG85</td>
                      <td className="border border-white/10 px-3 py-2">Guidance on safe working practices including isolation and locking off</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BS 7671:2018+A3:2024</td>
                      <td className="border border-white/10 px-3 py-2">Section 537 — requirements for isolating and switching devices</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The Maintenance and Operations Engineering Technician
              standard requires you to demonstrate competence in energy isolation and LOTO procedures
              as part of the safe working practices knowledge and skills requirements. This is assessed
              during your End-Point Assessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Identifying Hazardous Energy Sources */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Identifying Hazardous Energy Sources
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The first and most critical step in any LOTO procedure is identifying all sources of
              hazardous energy associated with the equipment. This requires a thorough understanding
              of the equipment's design, operation, and interconnections. Missing even one energy source
              can be fatal. For electrical maintenance technicians, the challenge is that modern equipment
              often combines multiple energy types in a single system.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">The Seven Categories of Hazardous Energy</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                    <p className="text-sm font-medium text-blue-400 mb-1">1. Electrical Energy</p>
                    <p className="text-xs text-white/80">
                      Mains supplies (single-phase, three-phase), control voltages, battery-backed systems
                      (UPS), solar PV arrays, standby generators, stored charge in capacitors, electromagnetic
                      energy in inductors and transformers. Electrical energy can cause electrocution, burns,
                      and arc flash.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20">
                    <p className="text-sm font-medium text-purple-400 mb-1">2. Mechanical Energy</p>
                    <p className="text-xs text-white/80">
                      Rotating machinery (motors, fans, pumps), moving parts (conveyors, lifts), compressed
                      springs (circuit breaker mechanisms), flywheels, and gears. Mechanical energy can cause
                      crushing, entanglement, amputation, and impact injuries.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                    <p className="text-sm font-medium text-green-400 mb-1">3. Hydraulic Energy</p>
                    <p className="text-xs text-white/80">
                      Pressurised hydraulic fluid in actuators, cylinders, accumulators, and pipework. Hydraulic
                      systems can operate at pressures exceeding 200 bar (2,900 psi). A hydraulic fluid injection
                      injury — where pressurised fluid penetrates the skin — is a medical emergency.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-cyan-500/10 border border-cyan-500/20">
                    <p className="text-sm font-medium text-cyan-400 mb-1">4. Pneumatic Energy</p>
                    <p className="text-xs text-white/80">
                      Compressed air in cylinders, receivers, pipework, and actuators. Pneumatic energy can
                      cause unexpected movement of actuators, ejection of components, and blast injuries.
                      Air receivers may retain pressure long after the compressor is isolated.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                    <p className="text-sm font-medium text-red-400 mb-1">5. Thermal Energy</p>
                    <p className="text-xs text-white/80">
                      Heat from electrical equipment (transformers, motors, resistors), steam systems, hot
                      surfaces, and process fluids. Cold can also be hazardous — cryogenic systems and
                      refrigeration plant. Thermal energy causes burns, scalds, and cold injuries.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm font-medium text-amber-400 mb-1">6. Chemical Energy</p>
                    <p className="text-xs text-white/80">
                      Hazardous substances in pipework, vessels, and processes — acids, solvents, gases,
                      and reactive chemicals. Battery electrolyte (sulphuric acid in lead-acid, lithium
                      compounds in Li-ion) is a common chemical hazard in electrical maintenance. Chemical
                      energy can cause burns, poisoning, and asphyxiation.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-orange-500/10 border border-orange-500/20">
                    <p className="text-sm font-medium text-orange-400 mb-1">7. Gravitational Energy</p>
                    <p className="text-xs text-white/80">
                      Elevated loads, raised platforms, suspended components, and counterweights. Any object
                      that is raised above its rest position stores gravitational potential energy. Cable
                      drums, transformer lifting gear, and elevated switchgear compartments are common
                      examples in electrical maintenance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Energy Source Identification for Common Electrical Equipment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Energy Sources</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Stored Energy Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor Control Centre</td>
                      <td className="border border-white/10 px-3 py-2">Electrical (mains + control), mechanical (motor), pneumatic (actuators)</td>
                      <td className="border border-white/10 px-3 py-2">Capacitor banks, spring-charged breakers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Variable Speed Drive</td>
                      <td className="border border-white/10 px-3 py-2">Electrical (AC supply + DC bus)</td>
                      <td className="border border-white/10 px-3 py-2">DC bus capacitors (300-800V DC for several minutes)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HV Switchgear</td>
                      <td className="border border-white/10 px-3 py-2">Electrical (HV + LV control), mechanical</td>
                      <td className="border border-white/10 px-3 py-2">Spring mechanisms, cable capacitance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UPS System</td>
                      <td className="border border-white/10 px-3 py-2">Electrical (mains + battery + output)</td>
                      <td className="border border-white/10 px-3 py-2">Battery bank, DC bus capacitors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hydraulic Press</td>
                      <td className="border border-white/10 px-3 py-2">Electrical (motor), hydraulic, gravitational</td>
                      <td className="border border-white/10 px-3 py-2">Pressurised accumulator, raised ram</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Never assume you know all the energy sources from memory alone.
              Always consult the equipment manual, site documentation, and plant drawings. If in doubt,
              ask — it is far better to delay the work than to miss a hidden energy source.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: LOTO Equipment and the Six-Step Procedure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            LOTO Equipment and the Six-Step Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective LOTO requires both the correct equipment and a systematic procedure. The equipment
              provides the physical barrier that prevents energy release; the procedure ensures the
              equipment is applied correctly, consistently, and completely. Neither element works without
              the other — locks without procedure lead to incomplete isolation; procedure without locks
              provides no physical protection.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Essential LOTO Equipment</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-3 rounded bg-white/5">
                    <p className="text-sm font-medium text-white mb-1">Personal Safety Padlocks</p>
                    <p className="text-xs text-white/80">
                      Purpose-designed LOTO padlocks — lightweight, brightly coloured, with unique keys.
                      Each worker has their own individually keyed lock. Must be durable, corrosion-resistant,
                      and clearly identifiable. Never use standard commercial padlocks.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white/5">
                    <p className="text-sm font-medium text-white mb-1">Multi-Lock Hasps</p>
                    <p className="text-xs text-white/80">
                      Scissor hasps or jaw hasps that accept multiple padlocks. Allow several workers to
                      secure the same isolation point simultaneously. Available in 4-lock, 6-lock, 8-lock,
                      and 12-lock configurations.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white/5">
                    <p className="text-sm font-medium text-white mb-1">Lockout Devices</p>
                    <p className="text-xs text-white/80">
                      Purpose-designed devices that fit specific types of energy isolating equipment:
                      MCB lockouts, fuse carrier lockouts, valve lockouts, plug lockouts, gate valve
                      lockouts, and universal lockout devices. Must be matched to the equipment.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded bg-white/5">
                    <p className="text-sm font-medium text-white mb-1">Danger Tags</p>
                    <p className="text-xs text-white/80">
                      Durable, weather-resistant tags with spaces for: name of person, date, time,
                      reason for lockout, and contact information. Attached to the lock or hasp with
                      a non-reusable cable tie or self-locking nylon tie.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white/5">
                    <p className="text-sm font-medium text-white mb-1">Lockout Kits and Stations</p>
                    <p className="text-xs text-white/80">
                      Portable kits containing a selection of lockout devices, padlocks, hasps, and tags
                      for field use. Lockout stations provide wall-mounted storage near equipment with
                      a visual display showing which locks are in use.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white/5">
                    <p className="text-sm font-medium text-white mb-1">Group Lockout Boxes</p>
                    <p className="text-xs text-white/80">
                      Secure boxes that hold the keys for all isolation point locks. The box itself is
                      then locked with each worker's personal padlock. Used for complex isolations
                      involving many isolation points.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 space-y-3">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Six-Step LOTO Procedure</p>
              {[
                {
                  step: "1",
                  title: "Prepare",
                  colour: "text-blue-400",
                  border: "border-blue-500/30",
                  bg: "bg-blue-500/10",
                  content: "Identify the equipment to be worked on, all energy sources (use the equipment's Energy Isolation Procedure or create one), and all isolation points. Gather the required LOTO equipment. Notify all affected personnel that the equipment will be shut down and locked out. Review the risk assessment and method statement."
                },
                {
                  step: "2",
                  title: "Shut Down",
                  colour: "text-purple-400",
                  border: "border-purple-500/30",
                  bg: "bg-purple-500/10",
                  content: "Stop the equipment using the normal operating procedures and controls. This controlled shutdown prevents additional hazards that could arise from an abrupt stop — for example, a sudden stop of a pump could cause water hammer, or an uncontrolled motor stop could damage the drive system. Never start the LOTO process by going directly to the isolation devices."
                },
                {
                  step: "3",
                  title: "Isolate",
                  colour: "text-green-400",
                  border: "border-green-500/30",
                  bg: "bg-green-500/10",
                  content: "Operate all energy isolating devices to disconnect the equipment from every energy source. This includes electrical isolators, valve shut-offs, pneumatic disconnects, and any other isolation points identified in Step 1. Ensure each device provides a positive, physical break in the energy supply. Address stored energy: discharge capacitors, relieve pressure, block raised loads, allow hot surfaces to cool."
                },
                {
                  step: "4",
                  title: "Lock Out and Tag Out",
                  colour: "text-amber-400",
                  border: "border-amber-500/30",
                  bg: "bg-amber-500/10",
                  content: "Apply your personal safety padlock to each energy isolating device. Attach a completed danger tag to each lock identifying you as the person who applied it. If multiple workers are involved, apply a multi-lock hasp first, then each worker applies their own lock. For complex isolations with many points, use a group lockout box system."
                },
                {
                  step: "5",
                  title: "Verify Isolation",
                  colour: "text-red-400",
                  border: "border-red-500/30",
                  bg: "bg-red-500/10",
                  content: "This is the critical step that confirms the isolation is effective. For electrical energy: follow the Prove-Test-Prove sequence using a GS38-compliant voltage indicator. For mechanical energy: attempt to operate the equipment using normal controls. For hydraulic/pneumatic: check pressure gauges read zero. For stored energy: verify capacitors are discharged, springs are released, loads are lowered or blocked."
                },
                {
                  step: "6",
                  title: "Perform the Work",
                  colour: "text-elec-yellow",
                  border: "border-elec-yellow/30",
                  bg: "bg-elec-yellow/10",
                  content: "Only after all energy sources have been isolated, locked, tagged, and verified may the maintenance work begin. Throughout the work, the locks and tags must remain in place. If the scope of work changes, stop and reassess whether additional energy sources need to be isolated. When work is complete, follow the controlled re-energisation procedure."
                }
              ].map((item) => (
                <div key={item.step} className={`p-4 rounded-lg ${item.bg} border-l-2 ${item.border}`}>
                  <p className={`text-sm font-medium ${item.colour} mb-2`}>Step {item.step}: {item.title}</p>
                  <p className="text-sm text-white/90">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">Verification Is Non-Negotiable</p>
              <p className="text-sm text-white/90">
                Step 5 — Verify Isolation — is the step that saves lives. Without verification, you are
                trusting that you operated the correct isolation devices, that they functioned properly,
                and that no other energy source exists. Verification removes this trust and replaces it
                with physical evidence. Never skip this step.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Group Lockout, Shift Changeover and Periodic Inspection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Group Lockout, Shift Changeover and Periodic Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Many maintenance activities involve multiple workers, extend across shift changes, or
              require complex isolations with numerous energy sources. These situations introduce
              additional risks that must be managed through specific LOTO procedures. Getting these
              right is essential — they represent the scenarios where LOTO failures most commonly occur.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Group Lockout Procedures</h3>
              <p className="text-sm text-white mb-3">
                When multiple workers need to work on the same equipment, a group lockout system ensures
                that every individual is protected. There are two primary methods:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Method 1: Multi-Lock Hasp</p>
                  <p className="text-xs text-white/80 mb-2">
                    For simple isolations with few isolation points:
                  </p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>A multi-lock hasp is fitted to each isolation point</li>
                    <li>Each worker applies their personal lock to the hasp</li>
                    <li>The isolation cannot be removed until all locks are removed</li>
                    <li>Best suited for 2-6 workers on a single isolation point</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Method 2: Group Lockout Box</p>
                  <p className="text-xs text-white/80 mb-2">
                    For complex isolations with many isolation points:
                  </p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>An authorised person isolates and locks all isolation points</li>
                    <li>The keys to these locks are placed in a lockout box</li>
                    <li>The box is locked — each worker applies their personal lock to the box</li>
                    <li>No one can access the isolation keys until all personal locks are removed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <h3 className="text-sm font-medium text-orange-400 mb-3">Shift Changeover — The Critical Gap</h3>
              <p className="text-sm text-white mb-3">
                Shift changeover is one of the most dangerous periods for LOTO. If the outgoing worker
                removes their lock before the incoming worker applies theirs, there is a window during
                which the equipment is not locked out — and could be re-energised.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Safe Shift Changeover Procedure:</p>
                <p>1. Outgoing worker briefs incoming worker on the status of the work and LOTO</p>
                <p>2. Incoming worker inspects the isolation and verifies it is still effective</p>
                <p>3. <span className="text-green-400 font-medium">Incoming worker applies their personal lock</span></p>
                <p>4. <span className="text-amber-400 font-medium">Outgoing worker removes their personal lock</span></p>
                <p>5. Incoming worker verifies that they have sole control of the isolation</p>
                <p>6. Outgoing worker signs off the LOTO log; incoming worker signs on</p>
              </div>
              <p className="text-xs text-white/60 mt-3">
                Note: The incoming lock is always applied BEFORE the outgoing lock is removed. This ensures
                continuous lockout protection with no unprotected gap.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Periodic Inspection of LOTO Procedures</h3>
              <p className="text-sm text-white mb-3">
                LOTO procedures must be formally inspected at regular intervals to ensure they remain
                effective and are being correctly followed. Best practice requires annual inspections,
                though more frequent reviews may be appropriate for high-risk activities.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Frequency:</strong> At least annually for each energy isolation procedure</li>
                <li className="pl-1"><strong>Inspector:</strong> An authorised person who is NOT routinely involved in the procedure being inspected</li>
                <li className="pl-1"><strong>Scope:</strong> Observe the procedure being carried out, interview workers, check equipment condition</li>
                <li className="pl-1"><strong>Verification:</strong> Confirm workers understand each step, can identify all energy sources, and know emergency procedures</li>
                <li className="pl-1"><strong>Documentation:</strong> Record the inspection findings, corrective actions, and date of next review</li>
                <li className="pl-1"><strong>Corrective action:</strong> Any deficiencies must be corrected before the next LOTO activity on that equipment</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-red-400 mb-3">Emergency Lock Removal Procedure</h3>
              <p className="text-sm text-white mb-3">
                In exceptional circumstances, it may be necessary to remove a lock when the person who
                applied it is not available. This is a last resort and must follow a formal, documented
                procedure:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All reasonable efforts to contact the lock owner have been exhausted</li>
                <li className="pl-1">A senior authorised person has assessed that it is safe to remove the lock</li>
                <li className="pl-1">A thorough check of the work area confirms no one is at risk</li>
                <li className="pl-1">The removal is authorised in writing by a named senior manager</li>
                <li className="pl-1">The lock owner is notified at the earliest opportunity that their lock has been removed</li>
                <li className="pl-1">The incident is documented and reviewed to prevent recurrence</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: LOTO for Electrical Maintenance and Common Failures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            LOTO for Electrical Maintenance and Common Failures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical maintenance presents unique LOTO challenges. Equipment such as motor control
              centres, switchgear, variable speed drives, and UPS systems combine multiple energy types
              and often have hidden stored energy sources. Understanding these specific challenges is
              essential for safe working.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-blue-400 mb-3">Motor Control Centres (MCCs)</h3>
                <p className="text-sm text-white mb-3">
                  MCCs are among the most complex equipment for LOTO because they contain multiple
                  independent energy sources within a single assembly:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Main incoming supply:</strong> Isolate at the incoming switch-disconnector and lock off</li>
                  <li className="pl-1"><strong>Control voltage supplies:</strong> Often fed from a separate source — isolate independently</li>
                  <li className="pl-1"><strong>Power factor correction capacitors:</strong> Retain charge after isolation — verify discharge (wait for bleed-down time, typically 1-5 minutes)</li>
                  <li className="pl-1"><strong>Spring-charged circuit breaker mechanisms:</strong> Release stored mechanical energy before working inside compartments</li>
                  <li className="pl-1"><strong>Pneumatic actuators:</strong> Depressurise and lock out air supply</li>
                  <li className="pl-1"><strong>Back-feeds:</strong> Check for inter-bus connections, emergency tie switches, or alternative feeds from other sections</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-purple-400 mb-3">Variable Speed Drives (VSDs)</h3>
                <p className="text-sm text-white mb-3">
                  VSDs present a particular stored energy hazard from their DC bus capacitors:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>DC bus voltage:</strong> Typically 300-800V DC — potentially lethal</li>
                  <li className="pl-1"><strong>Discharge time:</strong> Can take 5-15 minutes after supply isolation, depending on drive size</li>
                  <li className="pl-1"><strong>Verification:</strong> Check the 'DC bus active' or 'charge' indicator LED; measure DC bus voltage with an approved instrument</li>
                  <li className="pl-1"><strong>Never assume:</strong> Even if the display is blank, the DC bus may still be charged — always measure</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-green-400 mb-3">HV Switchgear</h3>
                <p className="text-sm text-white mb-3">
                  High voltage switchgear requires the most rigorous LOTO, typically combined with a
                  formal permit to work system:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Isolation:</strong> Withdraw circuit breakers, open disconnectors, apply safety earths</li>
                  <li className="pl-1"><strong>Locking:</strong> Lock off all disconnectors and earth switches in their safe position</li>
                  <li className="pl-1"><strong>Spring mechanisms:</strong> Discharge stored energy in spring-charged mechanisms</li>
                  <li className="pl-1"><strong>Cable capacitance:</strong> Long HV cables can retain charge — apply temporary earths</li>
                  <li className="pl-1"><strong>Interlocks:</strong> Verify that all mechanical and key interlocks are engaged</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common LOTO Failures in Electrical Maintenance</p>
              <ul className="text-sm text-white space-y-2 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Incomplete energy survey:</strong> Failing to identify all energy sources — especially
                  stored energy in capacitors, springs, and elevated loads. <span className="text-green-400">Prevention: Always use a
                  documented Energy Isolation Procedure specific to the equipment.</span>
                </li>
                <li className="pl-1">
                  <strong>Tags without locks:</strong> Using danger tags as the sole means of protection, without
                  padlocks. Tags can be ignored or removed. <span className="text-green-400">Prevention: Always use locks AND tags together.</span>
                </li>
                <li className="pl-1">
                  <strong>Skipping verification:</strong> Failing to verify that isolation is effective after
                  applying locks. <span className="text-green-400">Prevention: Always perform the Prove-Test-Prove sequence for
                  electrical energy, and physical verification for all other energy types.</span>
                </li>
                <li className="pl-1">
                  <strong>Improper lockout devices:</strong> Using cable ties, tape, or ill-fitting devices that
                  do not properly secure the isolating device. <span className="text-green-400">Prevention: Use only purpose-designed
                  LOTO devices matched to the specific equipment.</span>
                </li>
                <li className="pl-1">
                  <strong>Complacency on routine tasks:</strong> Believing that familiar equipment does not need
                  full LOTO because 'I've done this a hundred times.' <span className="text-green-400">Prevention: Follow the full procedure
                  every time, without exception.</span>
                </li>
                <li className="pl-1">
                  <strong>Poor shift handover:</strong> Removing locks at shift end without ensuring continuity
                  of lockout by the incoming shift. <span className="text-green-400">Prevention: Incoming lock applied before outgoing
                  lock removed.</span>
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Case Study: The Hidden Energy Source</h3>
              <p className="text-sm text-white">
                A maintenance technician was tasked with replacing a contactor in a motor starter within
                an MCC. The technician correctly isolated the incoming supply to the MCC section and applied
                a personal lock. However, the control circuit for the starter was fed from a separate 110V
                control transformer, located in a different section of the MCC. When the technician
                disconnected the contactor coil wires, they received a 110V shock. The investigation
                found that the Energy Isolation Procedure for the MCC had not been updated after a
                modification that added the separate control supply. The technician survived, but the
                incident highlighted the critical importance of verifying that documented procedures
                reflect the current state of the installation.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under the Electricity at Work Regulations 1989, Regulation 13 requires
              adequate precautions to prevent conductors becoming electrically charged during work. A
              properly implemented LOTO procedure is the primary means of demonstrating compliance with
              this regulation. LOTO is not optional — it is a legal requirement for electrical maintenance.
            </p>
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
                <p className="font-medium text-white mb-1">LOTO Procedure (6 Steps)</p>
                <ul className="space-y-0.5">
                  <li>1. Prepare — identify all energy sources</li>
                  <li>2. Shut down — use normal stop procedures</li>
                  <li>3. Isolate — operate all isolating devices</li>
                  <li>4. Lock out / Tag out — personal lock + tag</li>
                  <li>5. Verify isolation — prove all energy sources are zero</li>
                  <li>6. Perform the work — maintain LOTO throughout</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Seven Energy Types</p>
                <ul className="space-y-0.5">
                  <li>1. Electrical — mains, stored charge, batteries</li>
                  <li>2. Mechanical — rotation, springs, flywheels</li>
                  <li>3. Hydraulic — pressurised fluid, accumulators</li>
                  <li>4. Pneumatic — compressed air, receivers</li>
                  <li>5. Thermal — heat, steam, cold</li>
                  <li>6. Chemical — acids, gases, reactive substances</li>
                  <li>7. Gravitational — elevated loads, counterweights</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>HSWA 1974 — Safe systems of work</li>
                  <li>EAWR 1989 — Regs 12, 13 (isolation, dead working)</li>
                  <li>PUWER 1998 — Regs 19-22 (energy isolation)</li>
                  <li>BS 7671:2018+A3:2024 — Section 537</li>
                  <li>HSG85 — Safe working practices</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">LOTO Equipment</p>
                <ul className="space-y-0.5">
                  <li>Personal safety padlocks (unique key)</li>
                  <li>Multi-lock hasps (group lockout)</li>
                  <li>MCB/fuse/valve lockout devices</li>
                  <li>Danger tags (supplementary to locks)</li>
                  <li>Group lockout boxes (complex isolations)</li>
                </ul>
              </div>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Isolation Procedures
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1-4">
              Next: Work at Height
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section1_3;
