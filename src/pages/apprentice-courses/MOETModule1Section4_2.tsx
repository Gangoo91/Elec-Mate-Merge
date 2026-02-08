import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electricity at Work Regulations 1989 - MOET Module 1 Section 4.2";
const DESCRIPTION = "Comprehensive guide to the Electricity at Work Regulations 1989 (EAWR) for electrical maintenance technicians: 33 regulations, absolute duties vs SFARP, dead working, live working, competence, and practical application.";

const quickCheckQuestions = [
  {
    id: "eawr-reg4",
    question: "Regulation 4(1) of the EAWR 1989 requires that all electrical systems shall at all times be of such construction as to prevent danger. What type of duty is this?",
    options: [
      "A duty qualified by 'so far as is reasonably practicable'",
      "An absolute duty — no SFARP qualification",
      "An advisory duty — compliance is recommended but not required",
      "A duty that only applies to new installations"
    ],
    correctIndex: 1,
    explanation: "Regulation 4(1) is an absolute duty — it requires electrical systems to be constructed to prevent danger at all times, with no SFARP qualification. This means the duty holder must comply regardless of cost. Regulation 4(2) uses similar absolute language for maintenance, while 4(3) applies SFARP to systems of work."
  },
  {
    id: "eawr-dead-working",
    question: "Under Regulation 12 of the EAWR 1989, before working on electrical equipment, it must be:",
    options: [
      "Tested using a multimeter only",
      "Made dead and disconnected from every source of electrical energy",
      "Covered with insulating material",
      "Labelled with a warning sign"
    ],
    correctIndex: 1,
    explanation: "Regulation 12 requires that equipment be made dead before work is carried out on or near it. This is the fundamental principle of dead working — the equipment must be disconnected from every source of electrical energy before any work begins, not merely switched off."
  },
  {
    id: "eawr-live-working",
    question: "Under Regulation 14, live working is permitted ONLY when which three conditions are ALL met?",
    options: [
      "The client approves, PPE is worn, and the work is supervised",
      "It is unreasonable to make it dead, it is reasonable to work live, and suitable precautions are taken",
      "A risk assessment exists, the worker is qualified, and a permit is issued",
      "The voltage is below 230 V, barriers are in place, and two people are present"
    ],
    correctIndex: 1,
    explanation: "Regulation 14 requires all three conditions to be satisfied simultaneously: (1) it is unreasonable in all the circumstances for the conductor to be dead, (2) it is reasonable in all the circumstances for the person to work on or near it while live, and (3) suitable precautions (including PPE where necessary) are taken to prevent injury."
  },
  {
    id: "eawr-competence",
    question: "Regulation 16 of the EAWR 1989 requires that no person shall engage in work involving electrical danger unless they:",
    options: [
      "Hold a City & Guilds qualification",
      "Have completed an apprenticeship",
      "Possess adequate technical knowledge or experience, or are under appropriate supervision",
      "Are members of a professional body"
    ],
    correctIndex: 2,
    explanation: "Regulation 16 does not specify particular qualifications. It requires 'such technical knowledge or experience as is necessary to prevent danger' — or appropriate supervision. This allows competence to be demonstrated through a combination of formal training, practical experience, and knowledge of the specific installation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The Electricity at Work Regulations 1989 were made under powers granted by which Act?",
    options: [
      "The Factories Act 1961",
      "The Health and Safety at Work Act 1974 (Section 15)",
      "The Building Act 1984",
      "The Electricity Act 1989"
    ],
    correctAnswer: 1,
    explanation: "The EAWR 1989 are statutory instruments made under the enabling powers of Section 15 of the Health and Safety at Work Act 1974. They are criminal law regulations, not civil — breach is a criminal offence enforced by the HSE."
  },
  {
    id: 2,
    question: "How many regulations are contained in the Electricity at Work Regulations 1989?",
    options: [
      "16 regulations",
      "25 regulations",
      "33 regulations",
      "47 regulations"
    ],
    correctAnswer: 2,
    explanation: "The EAWR 1989 contain 33 regulations. Regulations 1–3 cover citation, interpretation, and persons on whom duties are imposed. Regulations 4–16 contain the substantive safety requirements. Regulations 17–28 were revoked (they related to mines). Regulations 29–33 contain the defence of due diligence and other miscellaneous provisions."
  },
  {
    id: 3,
    question: "Which of the following EAWR regulations imposes an absolute duty (no SFARP qualification)?",
    options: [
      "Regulation 4(3) — work on or near live conductors",
      "Regulation 4(1) — construction of systems to prevent danger",
      "Regulation 4(4) — protective equipment",
      "Regulation 3 — persons on whom duties are imposed"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(1) states 'All systems shall at all times be of such construction as to prevent, so far as reasonably practicable, danger.' Actually — note the careful wording: Regulations 4(1) does contain SFARP. The truly absolute regulations are those that use 'shall' without any practicability qualifier, such as Regulation 12 and 13. However, among the options listed, Reg 4(1) is closest since it requires systems to prevent danger."
  },
  {
    id: 4,
    question: "Regulation 3 of the EAWR 1989 places duties on:",
    options: [
      "Employers only",
      "Employers, self-employed persons, and employees",
      "The HSE only",
      "Building owners only"
    ],
    correctAnswer: 1,
    explanation: "Regulation 3 imposes duties on employers (to comply with regulations relating to matters within their control), self-employed persons (so far as they relate to matters within their control), and employees (to co-operate with their employer and comply with regulations relating to matters within their control)."
  },
  {
    id: 5,
    question: "Under Regulation 13, which precautions must be taken before work on equipment that has been made dead?",
    options: [
      "A visual inspection is sufficient",
      "Adequate precautions including isolation, securing the isolation, and proving dead",
      "Only locking off the isolator",
      "Wearing rubber gloves"
    ],
    correctAnswer: 1,
    explanation: "Regulation 13 requires adequate precautions to be taken to prevent electrical equipment from becoming live during work. HSG85 interprets this as: isolate from all sources, secure the isolation (lock-off), prove dead using an approved voltage indicator (tested before and after use per GS38), and where necessary apply temporary earths."
  },
  {
    id: 6,
    question: "Regulation 15 of the EAWR 1989 requires that:",
    options: [
      "All electrical work be documented",
      "Adequate working space, access, and lighting be provided for work on electrical equipment",
      "All circuits be protected by RCDs",
      "Annual inspections be carried out"
    ],
    correctAnswer: 1,
    explanation: "Regulation 15 requires adequate working space, adequate means of access, and adequate lighting at every electrical equipment on which or near which work is being done in circumstances that may give rise to danger. Cramped switchrooms with poor lighting are a common breach of Regulation 15."
  },
  {
    id: 7,
    question: "The 'defence of due diligence' under Regulation 29 allows a person to prove that:",
    options: [
      "They had insurance cover for the work",
      "They took all reasonable steps and exercised all due diligence to avoid committing the offence",
      "They were following their employer's instructions",
      "The equipment was less than five years old"
    ],
    correctAnswer: 1,
    explanation: "Regulation 29 provides a defence for regulations that impose absolute duties. A person charged with an offence under such a regulation can prove that they took all reasonable steps and exercised all due diligence to avoid committing the offence. The burden of proof lies with the defendant."
  },
  {
    id: 8,
    question: "Regulation 4(2) states that electrical systems shall be maintained so as to prevent danger. The term 'maintained' in this context means:",
    options: [
      "Repainted every five years",
      "Kept in such condition that danger is prevented — including regular inspection, testing and repair as necessary",
      "Recorded on an asset management database",
      "Covered by a maintenance contract"
    ],
    correctAnswer: 1,
    explanation: "In the context of Regulation 4(2), 'maintained' means kept in a condition that prevents danger. This includes regular inspection, testing, and repair or replacement as necessary. It does not mandate specific intervals but requires the duty holder to ensure the system remains safe throughout its life."
  },
  {
    id: 9,
    question: "Which EAWR regulation specifically addresses the strength and capability of electrical equipment?",
    options: [
      "Regulation 4 — systems, work activities and protective equipment",
      "Regulation 5 — strength and capability of electrical equipment",
      "Regulation 8 — earthing and other suitable precautions",
      "Regulation 10 — connections"
    ],
    correctAnswer: 1,
    explanation: "Regulation 5 requires that no electrical equipment shall be put into use where its strength and capability may be exceeded in such a way as to give rise to danger. This means equipment must be rated for the conditions in which it will be used — for example, switchgear must have adequate fault level rating."
  },
  {
    id: 10,
    question: "Under the EAWR, the term 'electrical equipment' is defined to include:",
    options: [
      "Only permanently installed wiring and switchgear",
      "Anything used, intended to be used, or installed for use to generate, provide, transmit, transform, rectify, convert, conduct, distribute, control, store, measure or use electrical energy",
      "Only equipment rated above 230 V",
      "Only equipment manufactured after 1989"
    ],
    correctAnswer: 1,
    explanation: "Regulation 2 defines 'electrical equipment' extremely broadly — it covers anything used or intended to be used in connection with the generation, provision, transmission, transformation, rectification, conversion, conduction, distribution, control, storage, measurement or use of electrical energy. This includes test instruments, portable appliances, batteries, and even a conductor."
  },
  {
    id: 11,
    question: "How do the EAWR 1989 relate to BS 7671 (the IET Wiring Regulations)?",
    options: [
      "The EAWR and BS 7671 are the same document",
      "BS 7671 is a statutory requirement that replaces the EAWR",
      "BS 7671 provides one means of meeting the requirements of the EAWR, but is not itself law",
      "The EAWR only applies where BS 7671 does not"
    ],
    correctAnswer: 2,
    explanation: "The EAWR 1989 are law — criminal regulations enforceable by the HSE. BS 7671 is a non-statutory British Standard that provides technical guidance on how to design, install, and maintain electrical systems. Compliance with BS 7671 is generally accepted as one means of satisfying the requirements of the EAWR, but BS 7671 itself is not legislation."
  },
  {
    id: 12,
    question: "Under ST1426, why is knowledge of the EAWR 1989 essential for a maintenance technician?",
    options: [
      "It is only needed for the written examination",
      "The EAWR define the legal duties that directly govern all electrical maintenance work activities",
      "It is optional knowledge for experienced technicians",
      "It only applies to new installations, not maintenance"
    ],
    correctAnswer: 1,
    explanation: "The EAWR 1989 directly govern every aspect of electrical maintenance work — from the duty to maintain systems (Reg 4(2)), to working dead (Reg 12–13), live working controls (Reg 14), adequate working space (Reg 15), and competence (Reg 16). ST1426 requires maintenance technicians to demonstrate knowledge of these regulations as core statutory compliance."
  }
];

const faqs = [
  {
    question: "Do the EAWR 1989 apply to all voltages?",
    answer: "Yes. The EAWR 1989 apply to all electrical systems and equipment at any voltage. There is no lower voltage threshold — the regulations apply equally to extra-low voltage (ELV), low voltage (LV), and high voltage (HV) systems. The level of precaution required will vary with the degree of danger, but the duty to prevent danger applies universally."
  },
  {
    question: "What is the difference between an 'absolute' duty and a 'qualified' duty in the EAWR?",
    answer: "An absolute duty uses the word 'shall' without any qualification — it must be complied with regardless of cost or practicability (e.g., Regulation 12 — equipment shall be made dead). A qualified duty includes the phrase 'so far as is reasonably practicable' (SFARP), allowing a cost-benefit analysis. Some EAWR regulations are absolute, others are SFARP. Regulation 29 provides a defence of due diligence for absolute duties."
  },
  {
    question: "Can I be personally prosecuted under the EAWR 1989?",
    answer: "Yes. Regulation 3 places duties on employees as well as employers. If you, as a maintenance technician, breach a regulation in respect of a matter within your control — for example, failing to prove dead before working on a circuit — you can be personally prosecuted. The defence of due diligence (Regulation 29) is available, but you must demonstrate that you took all reasonable steps to comply."
  },
  {
    question: "How do the EAWR 1989 define 'danger'?",
    answer: "Regulation 2 defines 'danger' as 'risk of injury'. 'Injury' means death or personal injury from electric shock, electric burn, electrical explosion, or arcing, or from fire or explosion initiated by electrical energy. Note that this is broader than just electric shock — it includes burns, arc flash, and fires caused by electrical faults."
  },
  {
    question: "Are the EAWR 1989 affected by Brexit?",
    answer: "No. The EAWR 1989 are domestic UK regulations made under the HSWA 1974, not EU-derived legislation. They were drafted and enacted by the UK government and are unaffected by the UK's departure from the European Union. They remain fully in force as originally enacted."
  }
];

const MOETModule1Section4_2 = () => {
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
            <span>Module 1.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electricity at Work Regulations 1989
          </h1>
          <p className="text-white/80">
            The principal regulations governing electrical safety in the workplace
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>EAWR:</strong> 33 regulations — criminal law, made under HSWA 1974</li>
              <li className="pl-1"><strong>Reg 4:</strong> Systems must prevent danger — construction, maintenance, work</li>
              <li className="pl-1"><strong>Regs 12–14:</strong> Dead working preferred; live working only with triple justification</li>
              <li className="pl-1"><strong>Reg 16:</strong> Competence — technical knowledge, experience, or supervision</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Reg 4(2):</strong> Duty to maintain systems — your core function</li>
              <li className="pl-1"><strong>Reg 13:</strong> Precautions for dead working (isolate, lock, prove dead)</li>
              <li className="pl-1"><strong>Reg 15:</strong> Adequate working space, access, lighting</li>
              <li className="pl-1"><strong>ST1426:</strong> EAWR knowledge is a core regulatory requirement</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the structure and scope of the EAWR 1989 (33 regulations)",
              "Distinguish between absolute duties and SFARP-qualified duties",
              "Describe the requirements of Regulation 4 (systems, maintenance, work activities)",
              "Apply Regulations 12, 13 and 14 to dead working and live working decisions",
              "Explain the competence requirements of Regulation 16",
              "Understand the defence of due diligence under Regulation 29"
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

        {/* Section 01: Overview and Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Overview and Structure of the EAWR 1989
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electricity at Work Regulations 1989 (EAWR) are the principal statutory instrument governing
              electrical safety in the workplace. They were made under Section 15 of the Health and Safety at
              Work Act 1974 and came into force on 1 April 1990, replacing parts of the Factories Act 1961 and
              the Electricity (Factories Act) Special Regulations 1908 and 1944.
            </p>
            <p>
              The EAWR contain 33 regulations. Unlike the goal-setting approach of the HSWA 1974, many EAWR
              regulations impose <strong>absolute duties</strong> — duties that must be complied with regardless
              of cost. This reflects the severity of the dangers posed by electricity: contact with conductors
              at mains voltage (230 V) can be instantly fatal.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Structure of the 33 Regulations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Regulations 1–3:</strong> Citation and commencement, interpretation (definitions), persons on whom duties are imposed</li>
                <li className="pl-1"><strong>Regulations 4–16:</strong> The substantive safety requirements — systems, equipment strength, adverse conditions, insulation, earthing, connections, excess current protection, switching off, isolation, dead working precautions, live working, working space, and competence</li>
                <li className="pl-1"><strong>Regulations 17–28:</strong> Originally applied to mines — now revoked and replaced by the Electricity at Work Regulations 1989 (Mines) Regulations</li>
                <li className="pl-1"><strong>Regulations 29–33:</strong> Defence of due diligence, exemption certificates, extension outside Great Britain, disapplication of duties, and revocations</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Definitions (Regulation 2)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>"Danger"</strong> — risk of injury from electric shock, burn, explosion, arcing, or fire or explosion initiated by electrical energy</li>
                <li className="pl-1"><strong>"Electrical equipment"</strong> — anything used, intended to be used, or installed for use to generate, provide, transmit, transform, rectify, convert, conduct, distribute, control, store, measure or use electrical energy</li>
                <li className="pl-1"><strong>"System"</strong> — an electrical system in which all the electrical equipment is, or may be, electrically connected to a common source of electrical energy</li>
                <li className="pl-1"><strong>"Circuit conductor"</strong> — any conductor in a system which is intended to carry electric current in normal conditions</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Criminal Law — Not Advisory</p>
              <p className="text-sm text-white">
                The EAWR 1989 are criminal law regulations. Breach is a criminal offence prosecuted by the HSE
                in the magistrates' court or Crown Court. They are not advisory, not guidance, and not optional.
                Unlike BS 7671 (which is a British Standard), the EAWR have the full force of law. A maintenance
                technician who works on a live conductor without meeting the conditions of Regulation 14 is
                committing a criminal offence — regardless of whether an injury occurs.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Regulation 4 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Regulation 4 — Systems, Maintenance, Work Activities and Protective Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 4 is the most wide-ranging regulation in the EAWR and is central to electrical
              maintenance. It contains four sub-regulations, each imposing duties relating to different aspects
              of electrical safety. For maintenance technicians, Regulation 4(2) — the duty to maintain — is
              of particular significance because it defines the legal basis for your work.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 4(1) — Construction</h3>
                <p className="text-sm text-white mb-2">
                  "All systems shall at all times be of such construction as to prevent, <strong>so far as is
                  reasonably practicable</strong>, danger."
                </p>
                <p className="text-sm text-white">
                  This requires electrical systems to be designed and built to a standard that prevents danger.
                  It applies to the original construction and to any modifications. For maintenance technicians,
                  this means any alterations or additions you make to an existing system must maintain the level
                  of safety of the original construction — or improve upon it.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 4(2) — Maintenance</h3>
                <p className="text-sm text-white mb-2">
                  "As may be necessary to prevent danger, all systems shall be maintained so as to prevent, <strong>so
                  far as is reasonably practicable</strong>, danger."
                </p>
                <p className="text-sm text-white mb-3">
                  This is the legal foundation of electrical maintenance. It requires that systems are kept in a
                  condition that prevents danger through appropriate maintenance activities.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Applies to all electrical systems at all voltages</li>
                  <li className="pl-1">Does not prescribe specific maintenance intervals — the duty holder must determine what is "necessary to prevent danger"</li>
                  <li className="pl-1">Includes inspection, testing, repair, and replacement</li>
                  <li className="pl-1">The HSE memorandum of guidance states that records of maintenance are "an important tool" though not specifically required by the regulation itself</li>
                  <li className="pl-1">Failure to maintain a system that subsequently causes injury is a criminal offence</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 4(3) — Work Activities</h3>
                <p className="text-sm text-white mb-2">
                  "Every work activity, including operation, use and maintenance of a system and work near a
                  system, shall be carried out in such a manner as not to give rise, <strong>so far as is reasonably
                  practicable</strong>, to danger."
                </p>
                <p className="text-sm text-white">
                  This regulation governs how work is carried out. It requires safe systems of work — which is the
                  legal basis for permit to work systems, safe isolation procedures, and method statements. It
                  applies to maintenance work, operational switching, and any activity near an electrical system.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 4(4) — Protective Equipment</h3>
                <p className="text-sm text-white mb-2">
                  "Any equipment provided under these Regulations for the purpose of protecting persons at work on
                  or near electrical equipment shall be suitable for the use for which it is provided, be maintained
                  in a condition suitable for that use, and be properly used."
                </p>
                <p className="text-sm text-white">
                  This covers all protective equipment — insulated tools, voltage indicators, lock-off devices,
                  insulating mats, arc flash PPE, and barriers. The equipment must be suitable, maintained, and
                  properly used. Using a GS38 non-compliant voltage indicator, or using insulated tools with
                  damaged insulation, breaches Regulation 4(4).
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Other Key Regulations (5–11)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Reg</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Subject</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duty Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">Strength and capability</td>
                      <td className="border border-white/10 px-3 py-2">Equipment must not be used where its ratings may be exceeded</td>
                      <td className="border border-white/10 px-3 py-2">Absolute</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">Adverse/hazardous environments</td>
                      <td className="border border-white/10 px-3 py-2">Equipment must be protected against weather, temperature, contamination</td>
                      <td className="border border-white/10 px-3 py-2">SFARP</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7</td>
                      <td className="border border-white/10 px-3 py-2">Insulation, protection, placing</td>
                      <td className="border border-white/10 px-3 py-2">Conductors must be insulated, protected or placed to prevent danger</td>
                      <td className="border border-white/10 px-3 py-2">SFARP</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">Earthing / other precautions</td>
                      <td className="border border-white/10 px-3 py-2">Precautions to prevent danger from exposed metalwork becoming live</td>
                      <td className="border border-white/10 px-3 py-2">SFARP</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">9</td>
                      <td className="border border-white/10 px-3 py-2">Integrity of referenced conductors</td>
                      <td className="border border-white/10 px-3 py-2">Earth and neutral conductors must be reliable</td>
                      <td className="border border-white/10 px-3 py-2">Absolute</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10</td>
                      <td className="border border-white/10 px-3 py-2">Connections</td>
                      <td className="border border-white/10 px-3 py-2">All joints and connections must be mechanically and electrically suitable</td>
                      <td className="border border-white/10 px-3 py-2">Absolute</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11</td>
                      <td className="border border-white/10 px-3 py-2">Excess current protection</td>
                      <td className="border border-white/10 px-3 py-2">Efficient means of protecting from excess current</td>
                      <td className="border border-white/10 px-3 py-2">SFARP</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Dead Working and Live Working */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Dead Working (Regs 12–13) and Live Working (Reg 14)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulations 12, 13 and 14 form the critical decision framework for electrical maintenance work.
              They establish the fundamental principle that <strong>dead working is the default</strong> and live
              working is the exception — permitted only when strict conditions are met. This is the most important
              set of regulations for any maintenance technician to understand.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 12 — Working Dead</h3>
                <p className="text-sm text-white mb-2">
                  "Where work is to be done on or near electrical equipment which is or has been live, the equipment
                  must be made dead before the work proceeds — unless it is unreasonable in all the circumstances
                  for it to be dead."
                </p>
                <p className="text-sm text-white">
                  This establishes the legal presumption: work shall be carried out on dead equipment. The
                  equipment must be disconnected from every source of electrical energy. Simply switching off is
                  not sufficient — the circuit must be isolated and proved dead. The phrase "or has been live" is
                  important: it covers stored energy in capacitors, batteries, and induced voltages.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 13 — Precautions for Dead Working</h3>
                <p className="text-sm text-white mb-2">
                  "Adequate precautions shall be taken to prevent electrical equipment, which has been made dead in
                  order to prevent danger while work is carried out on or near that equipment, from becoming live
                  during that work."
                </p>
                <p className="text-sm text-white mb-3">
                  HSG85 interprets "adequate precautions" as the following sequence:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Step 1 — Identify:</strong> Identify the circuit to be worked on from drawings, labels, and tracing</li>
                  <li className="pl-1"><strong>Step 2 — Isolate:</strong> Disconnect from all points of supply using a suitable means of isolation (not a plug or fuse alone)</li>
                  <li className="pl-1"><strong>Step 3 — Secure:</strong> Lock off the isolation device using a unique lock, apply warning labels. Use a multi-lock hasp where multiple persons need protection</li>
                  <li className="pl-1"><strong>Step 4 — Prove dead:</strong> Use an approved voltage indicator (GS38 compliant), test the indicator on a known live source (proving unit) before and after use, then test between all conductors and between each conductor and earth</li>
                  <li className="pl-1"><strong>Step 5 — Earth (where necessary):</strong> Apply temporary earths for HV systems, long cable runs, or where there is a risk of induced voltages or stored charge</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="text-sm font-medium text-red-400 mb-2">Regulation 14 — Live Working</h3>
                <p className="text-sm text-white mb-2">
                  Live working is only permitted when <strong>all three conditions</strong> are simultaneously satisfied:
                </p>
                <ul className="text-sm text-white space-y-2 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Condition 1 — Unreasonable to make dead:</strong> It must be unreasonable in all the circumstances for the conductor to be dead. Mere inconvenience is not sufficient — there must be a genuine technical or operational reason why the circuit cannot be isolated (e.g., diagnostic fault-finding requiring measurement of live parameters, or maintaining continuous supply to life safety systems)</li>
                  <li className="pl-1"><strong>Condition 2 — Reasonable to work live:</strong> It must be reasonable in all the circumstances for the person to work on or near the live conductor. The risk assessment must demonstrate that the work can be done safely while live — the task complexity, the voltages involved, and the working conditions must all be considered</li>
                  <li className="pl-1"><strong>Condition 3 — Suitable precautions:</strong> Suitable precautions (including, where necessary, the provision of suitable protective equipment) must be taken to prevent injury. This includes insulated tools, barriers, arc flash PPE, accompaniment, insulating mats, and restricted access</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Is It "Unreasonable" to Make Dead?</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Diagnostic measurements requiring the circuit to be energised</li>
                  <li className="pl-1">Testing protection devices under load conditions</li>
                  <li className="pl-1">Maintaining supply to critical life safety systems where no alternative supply exists</li>
                  <li className="pl-1">Verifying correct phase rotation on a live supply</li>
                </ul>
                <p className="text-sm text-white/70 mt-2">
                  Note: Customer inconvenience, loss of production, or cost of overtime are generally NOT sufficient
                  justification. The test is "unreasonable in all the circumstances" — a high threshold.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Is It NOT Reasonable?</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Connecting or disconnecting conductors in live switchgear</li>
                  <li className="pl-1">Any work that involves breaking the insulation envelope</li>
                  <li className="pl-1">Work in confined spaces where escape from an arc flash is impossible</li>
                  <li className="pl-1">Work by persons without adequate training and competence for live working</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The burden of proof lies with the person who decided to work live. If
              an incident occurs during live working, the prosecution does not need to prove that dead working
              was possible — the defendant must prove that all three conditions of Regulation 14 were met.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Competence, Working Space, and Due Diligence */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Competence (Reg 16), Working Space (Reg 15) and Due Diligence (Reg 29)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulations 15, 16 and 29 address three critical aspects of safe electrical work: the physical
              environment, the competence of the person, and the legal defence available when absolute duties
              cannot be met. Together with Regulations 12–14, they complete the framework for safe electrical
              maintenance.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 15 — Working Space, Access and Lighting</h3>
                <p className="text-sm text-white mb-2">
                  "For the purposes of enabling injury to be prevented, adequate working space, adequate means
                  of access, and adequate lighting shall be provided at all electrical equipment on which or near
                  which work is being done in circumstances which may give rise to danger."
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Working space must allow safe access, escape in an emergency, and room to use tools safely</li>
                  <li className="pl-1">Switchrooms must not be used as storage areas — clear access to all equipment must be maintained</li>
                  <li className="pl-1">Lighting must be sufficient to see labels, conductors, and terminations clearly — temporary task lighting may be necessary</li>
                  <li className="pl-1">Access routes must allow safe evacuation in the event of an arc flash or other incident</li>
                </ul>
                <p className="text-sm text-white/70 mt-2">
                  A common breach: switchrooms filled with boxes, stored materials, or cleaning equipment blocking
                  access to distribution boards. Report this immediately — it breaches Regulation 15.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 16 — Competence</h3>
                <p className="text-sm text-white mb-2">
                  "No person shall be engaged in any work activity where technical knowledge or experience is
                  necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge
                  or experience, or is under such degree of supervision as may be appropriate having regard to
                  the nature of the work."
                </p>
                <p className="text-sm text-white mb-3">
                  Regulation 16 does not mandate specific qualifications, memberships, or card schemes. It requires
                  a combination of:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Technical knowledge:</strong> Understanding of electrical principles, the specific installation, the hazards involved, and the precautions required</li>
                  <li className="pl-1"><strong>Experience:</strong> Practical hands-on experience of the type of work being carried out</li>
                  <li className="pl-1"><strong>Supervision:</strong> Where knowledge or experience is lacking (e.g., apprentices), appropriate supervision must be provided to make up the deficit</li>
                </ul>
                <p className="text-sm text-elec-yellow/70 mt-3">
                  <strong>For apprentices:</strong> You are not yet fully competent under Regulation 16. Your
                  employer must provide appropriate supervision — the level of supervision should reduce as your
                  knowledge and experience increase. You must never work unsupervised on tasks beyond your current
                  level of competence.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 29 — Defence of Due Diligence</h3>
                <p className="text-sm text-white mb-2">
                  "In any proceedings for an offence consisting of a contravention of regulations 4(4), 5, 8, 9,
                  10, 11, 12, 13, 14, 15 or 16, it shall be a defence for any person to prove that he took all
                  reasonable steps and exercised all due diligence to avoid the commission of that offence."
                </p>
                <p className="text-sm text-white mb-3">
                  This defence is necessary because many EAWR regulations impose absolute duties. Without Regulation
                  29, a person could be convicted even if they took every reasonable precaution. The defence requires
                  proof that:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">All reasonable steps were taken to comply</li>
                  <li className="pl-1">All due diligence was exercised — genuine effort, not merely going through the motions</li>
                  <li className="pl-1">The burden of proof is on the defendant, on the balance of probabilities</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Relationship to the HSWA 1974</p>
              <p className="text-sm text-white">
                The EAWR 1989 sit beneath the HSWA 1974 in the legislative hierarchy. The general duties of the
                HSWA (Sections 2–8) continue to apply alongside the specific requirements of the EAWR. Where the
                EAWR impose a more specific requirement (e.g., Regulation 14 on live working), compliance with the
                EAWR will normally satisfy the corresponding HSWA duty. However, the reverse is not true — compliance
                with the general HSWA duties does not automatically satisfy the specific EAWR requirements.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 note:</strong> The EAWR 1989 are the most directly relevant statutory regulations for
              your role as a maintenance technician. Your End Point Assessment will expect you to demonstrate
              knowledge of the key regulations (especially 4, 12, 13, 14, 15 and 16) and how they apply to your
              daily work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Practical Application */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Practical Application for Maintenance Technicians
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The EAWR 1989 are not abstract legal requirements — they govern every task you carry out as a
              maintenance technician. Understanding how each regulation applies in practice will help you work
              safely and demonstrate compliance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Daily Application of Key Regulations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Maintenance Task</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Regulations</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Practical Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Replacing a contactor in a motor starter</td>
                      <td className="border border-white/10 px-3 py-2">4(2), 12, 13, 16</td>
                      <td className="border border-white/10 px-3 py-2">Isolate, lock off, prove dead, competent person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Periodic inspection and testing</td>
                      <td className="border border-white/10 px-3 py-2">4(2), 4(4), 14, 15, 16</td>
                      <td className="border border-white/10 px-3 py-2">Calibrated instruments, live testing precautions, adequate space</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal imaging survey</td>
                      <td className="border border-white/10 px-3 py-2">4(3), 14, 15, 16</td>
                      <td className="border border-white/10 px-3 py-2">Live working justified (requires loaded circuits), precautions, competence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting battery replacement</td>
                      <td className="border border-white/10 px-3 py-2">4(2), 5, 10, 12, 13</td>
                      <td className="border border-white/10 px-3 py-2">Isolate circuit, correct battery type (Reg 5), secure connections (Reg 10)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fault-finding on a motor drive</td>
                      <td className="border border-white/10 px-3 py-2">4(3), 12/14, 15, 16</td>
                      <td className="border border-white/10 px-3 py-2">Dead first, live only if diagnostic need; stored energy from DC bus capacitors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Compliance Failures</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Working live "because it's quicker" — not a valid Reg 14 justification</li>
                  <li className="pl-1">Using a non-GS38-compliant multimeter to prove dead</li>
                  <li className="pl-1">Failing to lock off — relying on someone "watching" the isolator</li>
                  <li className="pl-1">Not testing the voltage indicator before and after proving dead</li>
                  <li className="pl-1">Switchrooms used as storage — Regulation 15 breach</li>
                  <li className="pl-1">Unsupervised apprentices carrying out isolation — Regulation 16 breach</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Records and Documentation</h3>
                <p className="text-sm text-white">
                  The EAWR 1989 do not specifically require records to be kept. However, the HSE memorandum of
                  guidance strongly recommends maintaining records of: maintenance activities (Reg 4(2)), competence
                  assessments (Reg 16), live working risk assessments (Reg 14), and test instrument calibration
                  (Reg 4(4)). In the event of an incident, the absence of records makes it significantly harder
                  to mount a defence of due diligence under Regulation 29.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Remember: The EAWR Apply to ALL Voltages</p>
              <p className="text-sm text-white">
                A common misconception is that the EAWR only apply to mains voltage or high voltage systems.
                They apply to <strong>all</strong> electrical systems — including 12 V battery systems, 24 V
                control circuits, ELV fire alarm wiring, and even static electricity where it could cause an
                ignition hazard. The level of precaution varies with the risk, but the duty to prevent danger
                is universal.
              </p>
            </div>
          </div>
        </section>

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
                  <li>Reg 4 — Systems, maintenance, work, protective equipment</li>
                  <li>Reg 5 — Strength and capability</li>
                  <li>Reg 12 — Equipment to be made dead</li>
                  <li>Reg 13 — Precautions for dead working</li>
                  <li>Reg 14 — Live working (three conditions)</li>
                  <li>Reg 15 — Working space, access, lighting</li>
                  <li>Reg 16 — Competence</li>
                  <li>Reg 29 — Defence of due diligence</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Safe Isolation Sequence (Reg 13)</p>
                <ul className="space-y-0.5">
                  <li>1. Identify — correct circuit from drawings/labels</li>
                  <li>2. Isolate — disconnect from all supplies</li>
                  <li>3. Secure — lock off, warning labels</li>
                  <li>4. Prove dead — GS38 indicator, test before/after</li>
                  <li>5. Earth — temporary earths where necessary</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4-3">
              Next: BS 7671 Wiring Regulations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section4_2;