import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Hazard Identification - MOET Module 1 Section 3.1";
const DESCRIPTION = "Comprehensive guide to hazard identification for electrical maintenance technicians: hazard vs risk, workplace inspection techniques, hazard categories, electrical hazards, reporting systems, near-miss reporting and toolbox talks.";

const quickCheckQuestions = [
  {
    id: "hazard-vs-risk",
    question: "What is the key difference between a hazard and a risk?",
    options: [
      "A hazard is always more dangerous than a risk",
      "A hazard is something with the potential to cause harm; a risk is the likelihood and severity of that harm occurring",
      "A risk exists only in high-voltage environments; a hazard applies everywhere",
      "There is no meaningful difference — the terms are interchangeable"
    ],
    correctIndex: 1,
    explanation: "A hazard is anything with the potential to cause harm — for example, an exposed live conductor. A risk is the combination of how likely it is that someone will be harmed by the hazard and how severe that harm could be. Understanding this distinction is fundamental to effective risk assessment under the Management of Health and Safety at Work Regulations 1999."
  },
  {
    id: "hazard-categories",
    question: "Which of the following is an example of an ergonomic hazard in electrical maintenance?",
    options: [
      "Exposed live busbars in a distribution board",
      "Repetitive strain from pulling cables through conduit over extended periods",
      "Asbestos-containing materials in an old switchroom ceiling",
      "Aggressive behaviour from a site occupant"
    ],
    correctIndex: 1,
    explanation: "Ergonomic hazards relate to the physical demands of work and the body's ability to cope. Repetitive cable pulling, working in awkward postures inside ceiling voids, and prolonged overhead work are all ergonomic hazards common in electrical maintenance. The other options describe electrical, biological/chemical and psychological hazards respectively."
  },
  {
    id: "near-miss-reporting",
    question: "Why is near-miss reporting important in a workplace safety system?",
    options: [
      "It is only required for HSE prosecutions",
      "Near-misses identify hazards and weaknesses in controls before someone is actually harmed",
      "It is a legal requirement to report every near-miss to the HSE under RIDDOR",
      "Near-miss reports are only useful for insurance claims"
    ],
    correctIndex: 1,
    explanation: "Near-miss reporting is a proactive safety tool. Research shows that for every serious injury, there are hundreds of near-misses. By reporting and investigating near-misses, organisations can identify hazards and control failures before they result in actual harm. Not all near-misses are RIDDOR-reportable — but all should be recorded and reviewed internally."
  },
  {
    id: "inspection-technique",
    question: "During a workplace inspection for hazard identification, what is the most effective approach?",
    options: [
      "Complete the inspection from the site office using drawings only",
      "Walk the work area systematically, using a checklist and noting observed conditions",
      "Ask the client whether there are any hazards",
      "Only inspect the immediate work area, ignoring surrounding conditions"
    ],
    correctIndex: 1,
    explanation: "Effective hazard identification requires a systematic, physical walk-through of the work area and its surroundings. Using a structured checklist ensures no hazard category is overlooked. Drawing reviews and client discussions are useful supplements, but they cannot replace direct observation of actual site conditions."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under the Management of Health and Safety at Work Regulations 1999, a 'hazard' is defined as:",
    options: [
      "The chance that someone will be injured at work",
      "Something with the potential to cause harm",
      "A situation where PPE is not being worn",
      "Any substance classified as dangerous under COSHH"
    ],
    correctAnswer: 1,
    explanation: "The Regulations define a hazard as anything with the potential to cause harm. This broad definition encompasses physical objects, substances, activities, conditions and situations. The likelihood and severity of that harm being realised is the 'risk'."
  },
  {
    id: 2,
    question: "Which of the following is a chemical hazard that an electrical maintenance technician might encounter?",
    options: [
      "Working at height on a scaffold tower",
      "Solvents used for cleaning switchgear contacts",
      "Noise from a diesel generator",
      "Manual handling of a heavy transformer"
    ],
    correctAnswer: 1,
    explanation: "Solvents and cleaning agents used during switchgear maintenance are chemical hazards. They may be harmful if inhaled, cause skin irritation, or present a fire risk. These must be identified and controlled under COSHH Regulations 2002. The other options represent physical, physical (noise) and ergonomic hazards respectively."
  },
  {
    id: 3,
    question: "Damaged insulation on a cable is classified as which type of hazard?",
    options: [
      "Ergonomic hazard",
      "Psychological hazard",
      "Electrical hazard",
      "Biological hazard"
    ],
    correctAnswer: 2,
    explanation: "Damaged cable insulation is an electrical hazard because it exposes conductors that could cause electric shock or arc flash if contacted. Identifying degraded insulation during visual inspections is a critical skill for maintenance technicians — it should be recorded, reported and rectified before any work proceeds."
  },
  {
    id: 4,
    question: "A toolbox talk is best described as:",
    options: [
      "A formal, documented risk assessment lasting at least two hours",
      "A short, focused briefing delivered at the point of work covering specific hazards and controls",
      "A written exam taken before starting work on a new site",
      "A legal requirement under RIDDOR for every job"
    ],
    correctAnswer: 1,
    explanation: "A toolbox talk is a short, practical safety briefing — typically 10 to 15 minutes — delivered at or near the work area. It focuses on specific hazards relevant to the day's tasks and reinforces safe working practices. Toolbox talks are an administrative control and a key part of site safety communication, though they are not a statutory requirement in themselves."
  },
  {
    id: 5,
    question: "When carrying out a workplace inspection for hazard identification, which of the following should you do FIRST?",
    options: [
      "Begin writing the risk assessment",
      "Review existing documentation such as site plans, previous risk assessments and incident reports",
      "Order PPE for the work team",
      "Ask the client to sign a disclaimer"
    ],
    correctAnswer: 1,
    explanation: "Before physically inspecting the work area, you should review existing documentation. Previous risk assessments, site plans, maintenance records and incident reports provide context and help you identify hazards that may not be immediately visible. This desktop review informs the subsequent physical inspection."
  },
  {
    id: 6,
    question: "Water ingress into an electrical panel presents which combination of hazards?",
    options: [
      "Ergonomic and psychological",
      "Electrical (shock/short circuit) and fire (tracking/arcing)",
      "Chemical and biological only",
      "Noise and vibration"
    ],
    correctAnswer: 1,
    explanation: "Water in an electrical panel creates an immediate electrical hazard — it can cause short circuits, tracking across insulation surfaces, and arc faults. Water also increases the risk of corrosion, which degrades connections and can lead to overheating and fire. This is a serious combined hazard that must be addressed before any maintenance work proceeds."
  },
  {
    id: 7,
    question: "Photographic evidence taken during hazard identification is useful because:",
    options: [
      "It is a legal requirement under the Health and Safety at Work Act 1974",
      "It provides an objective, time-stamped record of site conditions that supports the written risk assessment",
      "Photographs replace the need for a written hazard report",
      "It is only needed for insurance purposes"
    ],
    correctAnswer: 1,
    explanation: "Photographs provide objective evidence of site conditions at a specific point in time. They support written hazard reports, help communicate hazards to others who were not present, and create an audit trail. However, photographs supplement written records — they do not replace them. There is no specific legal requirement to take photographs, but it is strongly recommended good practice."
  },
  {
    id: 8,
    question: "An overloaded circuit is a hazard because:",
    options: [
      "It increases the electricity bill for the client",
      "Excessive current causes conductor heating, which can degrade insulation and lead to fire",
      "It reduces the voltage available to connected equipment",
      "Overloaded circuits always trip the MCB immediately"
    ],
    correctAnswer: 1,
    explanation: "When a circuit carries more current than its conductors and protective devices are rated for, the conductors heat up. Sustained overloading degrades insulation, loosens connections (due to thermal cycling) and can ignite combustible materials in the vicinity. Overloading is a significant fire hazard and must be identified during maintenance inspections."
  },
  {
    id: 9,
    question: "Which of the following is an example of a psychological hazard in the workplace?",
    options: [
      "Excessive noise from machinery",
      "Unrealistic deadline pressure leading to rushed, unsafe work",
      "A heavy distribution board that requires manual lifting",
      "Exposure to lead dust from old paintwork"
    ],
    correctAnswer: 1,
    explanation: "Psychological hazards include stress, fatigue, bullying, harassment and unrealistic time pressures. In electrical maintenance, time pressure is particularly dangerous because it can lead technicians to take shortcuts — such as skipping safe isolation procedures or not proving dead. Employers have a duty to manage psychological hazards under the Management of Health and Safety at Work Regulations 1999."
  },
  {
    id: 10,
    question: "Under RIDDOR 2013, which of the following events MUST be reported to the HSE?",
    options: [
      "Every near-miss, regardless of severity",
      "A dangerous occurrence such as an electrical short circuit causing a fire, or an over-7-day injury",
      "Any minor cut or bruise sustained at work",
      "A near-miss that did not result in any injury or damage"
    ],
    correctAnswer: 1,
    explanation: "RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) requires employers to report deaths, specified injuries, over-7-day incapacitation injuries, certain occupational diseases, and dangerous occurrences (including electrical incidents causing fire or explosion). Not every near-miss or minor injury is RIDDOR-reportable, but all should be recorded internally."
  },
  {
    id: 11,
    question: "A hazard checklist used during workplace inspection should include:",
    options: [
      "Only electrical hazards, as that is the technician's specialism",
      "All hazard categories including physical, chemical, biological, ergonomic and psychological hazards",
      "Only hazards listed in the client's health and safety policy",
      "Only hazards that have previously caused injuries on the site"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive hazard checklist must cover all five hazard categories. Electrical maintenance technicians work in diverse environments and may encounter hazards outside their immediate specialism — asbestos in old buildings, confined spaces, chemical substances, manual handling demands and psychological pressures. A thorough checklist ensures nothing is overlooked."
  },
  {
    id: 12,
    question: "In the context of ST1426 Maintenance and Operations Engineering Technician standard, hazard identification is part of which knowledge requirement?",
    options: [
      "Technical drawing interpretation",
      "Health and safety legislation and safe working practices",
      "Electrical science and principles",
      "Business improvement techniques"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to demonstrate knowledge of health and safety legislation and safe working practices, which includes the ability to identify workplace hazards, conduct risk assessments, and implement appropriate control measures. This is a core knowledge requirement assessed through the end-point assessment."
  }
];

const faqs = [
  {
    question: "What is the difference between a hazard and a risk?",
    answer: "A hazard is anything with the potential to cause harm — for example, an exposed live conductor, a slippery floor, or a hazardous chemical. A risk is the combination of the likelihood that someone will be harmed by the hazard and the severity of that harm. Risk assessment involves identifying hazards and then evaluating the risk they present so that appropriate controls can be put in place."
  },
  {
    question: "Who is responsible for identifying hazards in the workplace?",
    answer: "Under the Health and Safety at Work Act 1974, employers have the primary duty to ensure the health and safety of their employees. However, the Management of Health and Safety at Work Regulations 1999 require employers to carry out risk assessments — which begins with hazard identification. In practice, everyone has a role: employers provide the systems, supervisors oversee implementation, and employees (including maintenance technicians) are expected to identify and report hazards they encounter during their work."
  },
  {
    question: "How often should workplace hazard inspections be carried out?",
    answer: "There is no single prescribed frequency — it depends on the nature and level of risk. High-risk environments such as construction sites or industrial facilities may require daily inspections. For routine electrical maintenance, a pre-work inspection should be carried out before each task, with more formal periodic inspections at intervals determined by the risk assessment. Any significant change in conditions, equipment or work activity should trigger a fresh inspection."
  },
  {
    question: "What should I do if I identify a hazard that I cannot control myself?",
    answer: "Report it immediately to your supervisor or site manager using the organisation's hazard reporting system. If the hazard presents an immediate danger to life, stop work and withdraw to a safe area before reporting. Do not attempt to rectify hazards that are outside your competence — for example, suspected asbestos-containing materials must only be handled by licensed asbestos removal contractors."
  },
  {
    question: "Are near-misses worth reporting if nobody was hurt?",
    answer: "Absolutely. Near-miss reporting is one of the most valuable proactive safety tools available. Heinrich's safety triangle suggests that for every major injury, there are approximately 300 near-misses. Each near-miss is an opportunity to identify and fix a hazard or control weakness before it causes actual harm. Organisations with strong near-miss reporting cultures consistently have lower injury rates."
  }
];

const MOETModule1Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3">
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
            <span>Module 1.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Hazard Identification
          </h1>
          <p className="text-white/80">
            Recognising and recording workplace hazards before they cause harm
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Hazard:</strong> Anything with the potential to cause harm</li>
              <li className="pl-1"><strong>Risk:</strong> Likelihood x severity of harm from a hazard</li>
              <li className="pl-1"><strong>Categories:</strong> Physical, chemical, biological, ergonomic, psychological</li>
              <li className="pl-1"><strong>Method:</strong> Systematic inspection, checklists, observation, reporting</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Electrical hazards:</strong> Exposed conductors, damaged insulation, overloading</li>
              <li className="pl-1"><strong>Environmental:</strong> Water ingress, confined spaces, asbestos</li>
              <li className="pl-1"><strong>Reporting:</strong> Near-miss systems, toolbox talks, photographic evidence</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to health and safety knowledge KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define the difference between a hazard and a risk with workplace examples",
              "Identify the five main hazard categories and give electrical maintenance examples",
              "Describe systematic workplace inspection techniques for hazard identification",
              "Explain common electrical hazards encountered during maintenance activities",
              "Understand hazard reporting systems, near-miss reporting and toolbox talks",
              "Apply observation techniques and photographic evidence to support risk assessments"
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

        {/* Section 01: Hazard vs Risk */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Hazard vs Risk — The Fundamental Distinction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before you can assess risk, you must first understand what a hazard is and how it differs from a risk.
              These two terms are often used interchangeably in everyday language, but in health and safety they have
              precise, legally significant meanings. Getting this distinction right is the foundation of everything
              that follows in risk assessment and method statement writing.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Definitions</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-1">Hazard</p>
                  <p className="text-sm text-white">
                    Anything with the <strong>potential to cause harm</strong>. This includes physical objects,
                    substances, work activities, environmental conditions and human behaviours. A hazard exists
                    regardless of whether anyone is actually exposed to it.
                  </p>
                </div>
                <div className="p-3 rounded bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-1">Risk</p>
                  <p className="text-sm text-white">
                    The <strong>likelihood</strong> that a hazard will cause harm, combined with the
                    <strong> severity</strong> of that harm. Risk is a measure of how dangerous a hazard actually
                    is in the specific circumstances — it depends on who is exposed, for how long, and what
                    controls are in place.
                  </p>
                </div>
              </div>
            </div>

            <p>
              Consider a 400 V three-phase distribution board. The board itself is a hazard — it contains
              conductors at a voltage capable of causing fatal electric shock. However, the risk depends on the
              circumstances. If the board is properly enclosed, locked, labelled, and only accessed by competent
              persons using safe isolation procedures, the risk is managed to an acceptable level. If the same
              board has a missing cover, damaged insulation, and is accessible to untrained personnel, the risk
              is very high — even though the hazard (400 V) has not changed.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Relationship Between Hazard and Risk</p>
              <p className="text-sm text-white mb-3">
                Risk can be expressed as a simple formula:
              </p>
              <div className="p-3 rounded bg-elec-yellow/10 border border-elec-yellow/30 text-center">
                <p className="text-base font-semibold text-elec-yellow">
                  Risk = Likelihood of Harm x Severity of Harm
                </p>
              </div>
              <p className="text-sm text-white mt-3">
                This means that a hazard with extreme severity (e.g., contact with 11 kV overhead lines = death)
                presents a high risk even if the likelihood is relatively low. Conversely, a hazard with low severity
                (e.g., minor scratch from a rough cable edge) may present a low risk even if it happens frequently.
                The purpose of hazard identification is to find all the hazards; risk evaluation then determines
                which ones require the most urgent attention.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Everyday Examples for Electrical Maintenance Technicians</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Hazard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Potential Harm</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Factors Affecting Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Exposed live conductors</td>
                      <td className="border border-white/10 px-3 py-2">Electric shock, burns, death</td>
                      <td className="border border-white/10 px-3 py-2">Voltage, accessibility, presence of barriers, competence of persons nearby</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Working at height (cable tray installation)</td>
                      <td className="border border-white/10 px-3 py-2">Falls, fractures, death</td>
                      <td className="border border-white/10 px-3 py-2">Height, edge protection, platform condition, weather (outdoor work)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Asbestos in old switchroom ceiling</td>
                      <td className="border border-white/10 px-3 py-2">Mesothelioma, asbestosis, lung cancer</td>
                      <td className="border border-white/10 px-3 py-2">Material condition, disturbance during work, duration of exposure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heavy transformer requiring manual lifting</td>
                      <td className="border border-white/10 px-3 py-2">Back injury, musculoskeletal damage</td>
                      <td className="border border-white/10 px-3 py-2">Weight, awkwardness, distance, frequency, individual capability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Time pressure from client</td>
                      <td className="border border-white/10 px-3 py-2">Stress, fatigue, shortcuts leading to unsafe work</td>
                      <td className="border border-white/10 px-3 py-2">Severity of pressure, support from employer, fatigue management</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Hazard identification always comes before risk evaluation. You cannot
              assess the risk of something you have not identified. A thorough, systematic approach to finding
              hazards is the essential first step in the risk assessment process required by Regulation 3 of the
              Management of Health and Safety at Work Regulations 1999.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Hazard Categories */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Five Hazard Categories
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hazards in the workplace are conventionally grouped into five categories. Using these categories as a
              framework during inspections ensures you consider all types of hazard — not just the obvious ones
              related to your specialism. As an electrical maintenance technician, you will naturally focus on
              electrical hazards, but you must also be aware of the other categories because they directly affect
              your safety and the safety of those around you.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">1. Physical Hazards</h3>
                <p className="text-sm text-white mb-2">
                  Physical hazards are the most common category and include anything in the environment that can
                  cause physical harm without necessarily being touched. They include noise, vibration, extreme
                  temperatures, radiation, slips, trips and falls, moving machinery, and falling objects.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Electrical maintenance examples:</strong> Noise from generators or UPS systems, heat from overloaded cables or transformers, UV radiation from arc welding nearby, trip hazards from trailing cables, falling tools when working at height</li>
                  <li className="pl-1"><strong>Identification method:</strong> Visual inspection, noise level assessment, temperature checks, housekeeping review</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">2. Chemical Hazards</h3>
                <p className="text-sm text-white mb-2">
                  Chemical hazards arise from exposure to harmful substances — solids, liquids, gases, vapours, fumes
                  or dusts. They can enter the body through inhalation, ingestion, skin absorption or injection.
                  Chemical hazards are controlled under the COSHH Regulations 2002.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Electrical maintenance examples:</strong> Solvents for cleaning contacts, flux fumes from soldering, SF6 gas in HV switchgear, battery acid from UPS systems, cable lubricant, PVC fumes from overheated insulation</li>
                  <li className="pl-1"><strong>Identification method:</strong> COSHH data sheets, product labelling, smell (though this is not always reliable), previous incident records</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">3. Biological Hazards</h3>
                <p className="text-sm text-white mb-2">
                  Biological hazards include bacteria, viruses, fungi, parasites and other living organisms that can
                  cause disease or infection. They may be present in water systems, soil, animal droppings, or
                  building materials.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Electrical maintenance examples:</strong> Legionella in water-cooled systems, pigeon droppings in ceiling voids and substations, rat urine (Weil's disease) in cable ducts, mould in damp switchrooms, contaminated water in flooded plant rooms</li>
                  <li className="pl-1"><strong>Identification method:</strong> Visual inspection for animal evidence, water testing records, building condition assessment, damp surveys</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">4. Ergonomic Hazards</h3>
                <p className="text-sm text-white mb-2">
                  Ergonomic hazards relate to the physical demands of work and how well the work environment, tools
                  and tasks are matched to the human body. Poor ergonomics causes musculoskeletal disorders (MSDs),
                  which are the most common cause of work-related ill health in the UK.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Electrical maintenance examples:</strong> Pulling cables through conduit (repetitive strain), working overhead in ceiling voids (awkward posture), lifting heavy distribution boards (manual handling), using hand tools for extended periods (vibration, grip fatigue), working in cramped switchrooms</li>
                  <li className="pl-1"><strong>Identification method:</strong> Task analysis, manual handling assessment, posture observation, worker feedback</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">5. Psychological Hazards</h3>
                <p className="text-sm text-white mb-2">
                  Psychological hazards affect mental health and wellbeing. They include work-related stress, bullying,
                  harassment, violence, lone working, fatigue, and unrealistic workload or time pressures. These hazards
                  are increasingly recognised as significant contributors to accidents because they impair concentration
                  and decision-making.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Electrical maintenance examples:</strong> Pressure to complete work quickly leading to shortcuts on isolation procedures, lone working in remote substations, fatigue from long shifts or call-outs, verbal aggression from building occupants during shutdowns, anxiety about working on unfamiliar systems</li>
                  <li className="pl-1"><strong>Identification method:</strong> Worker surveys, stress risk assessments, absence records, supervision and one-to-one discussions, observation of behaviour changes</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Combined Hazards</p>
              <p className="text-sm text-white">
                In practice, most work activities involve multiple hazard categories simultaneously. For example,
                replacing a distribution board in an occupied school involves electrical hazards (the installation
                itself), physical hazards (working at height, manual handling), chemical hazards (dust, possible
                asbestos), ergonomic hazards (awkward postures, heavy lifting) and psychological hazards (pressure to
                complete during a holiday shutdown). Your hazard identification must consider all categories, not just
                the most obvious one.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Electrical Hazards in Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrical Hazards in Maintenance Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As an electrical maintenance technician, you must be particularly skilled at identifying electrical
              hazards. The Electricity at Work Regulations 1989 place absolute duties on employers and employees to
              prevent danger from electrical systems. Understanding the specific electrical hazards you are likely
              to encounter is essential for meeting these duties and protecting yourself and others.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Electrical Hazards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Hazard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Consequences</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Exposed conductors</td>
                      <td className="border border-white/10 px-3 py-2">Missing covers, open junction boxes, damaged terminations, conductors protruding from accessories</td>
                      <td className="border border-white/10 px-3 py-2">Electric shock, burns, cardiac arrest, death</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Damaged insulation</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical damage, heat degradation, rodent damage, UV exposure, age-related deterioration</td>
                      <td className="border border-white/10 px-3 py-2">Short circuits, earth faults, fire, electric shock</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Overloaded circuits</td>
                      <td className="border border-white/10 px-3 py-2">Circuits carrying current in excess of their design rating due to additional loads or undersized cables</td>
                      <td className="border border-white/10 px-3 py-2">Conductor overheating, insulation degradation, fire, nuisance tripping</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Water ingress</td>
                      <td className="border border-white/10 px-3 py-2">Leaks, condensation, flooding, inadequate IP rating for the environment</td>
                      <td className="border border-white/10 px-3 py-2">Short circuits, tracking, corrosion, arc faults, electric shock</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Loose connections</td>
                      <td className="border border-white/10 px-3 py-2">Poorly tightened terminations, thermal cycling causing conductor relaxation, vibration</td>
                      <td className="border border-white/10 px-3 py-2">Arcing, overheating, fire, intermittent supply, equipment damage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Arc flash</td>
                      <td className="border border-white/10 px-3 py-2">Rapid release of energy from a fault in an electrical system, particularly at higher voltages and fault levels</td>
                      <td className="border border-white/10 px-3 py-2">Severe burns, blast injuries, hearing damage, ignition of clothing, death</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Hidden Electrical Hazards</p>
              <p className="text-sm text-white">
                Some of the most dangerous electrical hazards are not immediately visible. Circuits that appear dead
                may still be live due to back-feeds from alternative supplies, generators, solar PV systems, or
                battery storage systems. Capacitors in motor drives and UPS equipment can retain lethal charges long
                after isolation. Induced voltages can be present on cables running parallel to high-voltage circuits.
                Never assume a circuit is safe based on appearance alone — always prove dead using an approved voltage
                indicator tested immediately before and after use in accordance with GS38.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Indicators of Electrical Hazards</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Discolouration or scorching on enclosures and conductors</li>
                  <li className="pl-1">Burning smell or signs of overheating</li>
                  <li className="pl-1">Missing blanking plates or cover screws</li>
                  <li className="pl-1">Cable damage — cuts, abrasion, crushing, rodent gnawing</li>
                  <li className="pl-1">Moisture, condensation or corrosion inside enclosures</li>
                  <li className="pl-1">Buzzing or crackling sounds from equipment</li>
                  <li className="pl-1">Flickering lights or intermittent operation indicating loose connections</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Systematic Electrical Hazard Checks</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Check all enclosures are complete and securely fixed</li>
                  <li className="pl-1">Verify warning labels and circuit identification are present and legible</li>
                  <li className="pl-1">Inspect cable entries for correct glands and seals</li>
                  <li className="pl-1">Look for signs of water ingress or damp conditions</li>
                  <li className="pl-1">Confirm earthing and bonding conductors are intact</li>
                  <li className="pl-1">Check for evidence of overheating — thermal imaging if available</li>
                  <li className="pl-1">Review the condition of protective devices (MCBs, RCDs, fuses)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Under the Electricity at Work Regulations 1989, Regulation 4(2) requires
              that all electrical systems are maintained so as to prevent danger. Identifying electrical hazards
              during routine maintenance inspections is a core part of meeting this duty. Document everything you
              find — it provides evidence of compliance and supports the ongoing risk assessment process.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 04: Workplace Inspection Techniques */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Workplace Inspection and Observation Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective hazard identification is not a casual glance around the work area — it is a structured,
              systematic process that uses multiple techniques to ensure all hazards are found. The Management of
              Health and Safety at Work Regulations 1999 (Regulation 3) requires employers to make a "suitable and
              sufficient" assessment of risks, which begins with thorough hazard identification.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Stage 1 — Desktop Review</h3>
                <p className="text-sm text-white mb-2">
                  Before visiting the work area, gather and review existing documentation. This gives you context
                  and alerts you to hazards that may not be visible during a physical inspection.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Previous risk assessments and method statements for similar work</li>
                  <li className="pl-1">Site plans, electrical drawings and schematics</li>
                  <li className="pl-1">Asbestos register and refurbishment/demolition survey</li>
                  <li className="pl-1">Incident and near-miss reports from the site</li>
                  <li className="pl-1">Maintenance records and defect logs</li>
                  <li className="pl-1">Manufacturer's safety data sheets for chemicals used</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Stage 2 — Physical Walk-Through</h3>
                <p className="text-sm text-white mb-2">
                  Carry out a systematic walk-through of the work area and its immediate surroundings. Use a structured
                  checklist to ensure you cover all hazard categories. Walk the route you will take to and from the
                  work area — access routes can contain hazards too.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Start from the site entrance and follow the access route to the work area</li>
                  <li className="pl-1">Inspect the work area itself — look up, down and all around</li>
                  <li className="pl-1">Check adjacent areas that could be affected by or affect your work</li>
                  <li className="pl-1">Identify emergency exits, assembly points and first aid provision</li>
                  <li className="pl-1">Note the activities of other workers nearby</li>
                  <li className="pl-1">Assess lighting, ventilation and environmental conditions</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Stage 3 — Worker Consultation</h3>
                <p className="text-sm text-white mb-2">
                  Talk to people who work regularly in the area. They often know about hazards that are not
                  immediately obvious to a visitor — intermittent problems, seasonal conditions, or historical
                  issues that have not been formally recorded.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Ask site personnel about known hazards and previous incidents</li>
                  <li className="pl-1">Consult with other contractors working on site</li>
                  <li className="pl-1">Discuss the planned work with the facilities manager or duty holder</li>
                  <li className="pl-1">Review the site induction briefing for site-specific hazards</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Using Checklists Effectively</h3>
              <p className="text-sm text-white mb-3">
                A hazard identification checklist is a structured prompt — it reminds you to consider hazard
                categories that you might otherwise overlook. However, a checklist should never be treated as a
                tick-box exercise. Each item must prompt genuine observation and thought about the specific
                conditions on site.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Checklist Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Items to Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Access and egress</td>
                      <td className="border border-white/10 px-3 py-2">Route condition, lighting, obstructions, emergency exits, stairs, ladders</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Electrical</td>
                      <td className="border border-white/10 px-3 py-2">Condition of enclosures, exposed conductors, labelling, earthing, isolation facilities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Fire</td>
                      <td className="border border-white/10 px-3 py-2">Combustible materials, ignition sources, fire detection, extinguishers, escape routes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Working at height</td>
                      <td className="border border-white/10 px-3 py-2">Height of work, edge protection, fragile surfaces, anchor points, access equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Substances</td>
                      <td className="border border-white/10 px-3 py-2">Chemicals present, asbestos, dust, fumes, biological agents</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Environment</td>
                      <td className="border border-white/10 px-3 py-2">Temperature, ventilation, noise, lighting, confined spaces, weather</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">People</td>
                      <td className="border border-white/10 px-3 py-2">Other workers, public, vulnerable persons, lone working, fatigue</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Photographic Evidence</h3>
              <p className="text-sm text-white">
                Taking photographs during hazard identification is strongly recommended. Photographs provide an
                objective, time-stamped record of site conditions that supports the written risk assessment. They are
                particularly useful for recording the condition of existing electrical installations, evidence of
                damage or deterioration, and any temporary conditions that may change before the risk assessment is
                formally reviewed. Modern smartphones produce images with embedded GPS coordinates and timestamps,
                creating a robust evidence trail. Ensure photographs are stored securely, labelled clearly, and
                referenced in the written hazard report.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A hazard identification is only as good as the time and attention you give
              it. Rushing through a checklist to "get the paperwork done" defeats the entire purpose. The objective
              is to find the hazards that could harm you or others — your life may depend on how thoroughly you do it.
            </p>
          </div>
        </section>

        {/* Section 05: Reporting, Near-Misses and Toolbox Talks */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Hazard Reporting, Near-Miss Reporting and Toolbox Talks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Identifying a hazard is only useful if you do something about it. Effective hazard reporting systems
              ensure that identified hazards are communicated to the right people, recorded for tracking, and
              actioned in a timely manner. Three key communication tools are hazard reporting systems, near-miss
              reporting and toolbox talks.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Hazard Reporting Systems</h3>
                <p className="text-sm text-white mb-2">
                  Every employer should have a formal system for reporting hazards. This may be a paper-based form,
                  a digital app, or a combination of both. The system should be simple to use, accessible to all
                  workers, and result in a documented response within a defined timescale.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>What to report:</strong> Any hazard you identify that is not already controlled — whether it is an existing condition you have discovered or a new hazard created by work activities</li>
                  <li className="pl-1"><strong>How to report:</strong> Use the organisation's prescribed form or system. Include the location, description of the hazard, date and time, your name, and any immediate action you have taken</li>
                  <li className="pl-1"><strong>When to report:</strong> Immediately for imminent danger; as soon as practicable for other hazards. If a hazard presents an immediate risk of serious injury, stop work and verbally alert those in the vicinity before completing the formal report</li>
                  <li className="pl-1"><strong>Follow-up:</strong> Check that your report has been acknowledged and that appropriate action has been taken. If the hazard remains uncontrolled, escalate through your supervisor or safety representative</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Near-Miss Reporting</h3>
                <p className="text-sm text-white mb-2">
                  A near-miss is an unplanned event that did not result in injury, illness or damage but had the
                  potential to do so. Near-miss reporting is a proactive safety tool — it identifies hazards and
                  control failures before they result in actual harm.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Examples in electrical maintenance:</strong> An electrician discovers a circuit is still live after being told it was isolated; a tool is dropped from height but misses all personnel; a cable is nicked during chasing but does not penetrate to the conductor; a worker receives a slight tingle when touching metalwork</li>
                  <li className="pl-1"><strong>Why report:</strong> Heinrich's safety triangle shows the relationship between near-misses and serious incidents — for every major injury, there are approximately 10 minor injuries, 30 property damage events, and 600 near-misses. Addressing near-misses reduces the likelihood of actual injuries</li>
                  <li className="pl-1"><strong>Barriers to reporting:</strong> Fear of blame, belief that it is not important, not knowing how to report, time pressure. A positive safety culture actively encourages and rewards near-miss reporting</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Toolbox Talks</h3>
                <p className="text-sm text-white mb-2">
                  A toolbox talk is a short, focused safety briefing — typically 10 to 15 minutes — delivered at or
                  near the work area before work begins or at the start of a shift. It covers specific hazards
                  relevant to the day's tasks and reinforces safe working practices.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Purpose:</strong> To communicate hazard information, reinforce controls, share lessons learned, and give workers the opportunity to raise concerns</li>
                  <li className="pl-1"><strong>Who delivers:</strong> Usually the site supervisor, foreman or team leader — but any competent person can deliver a toolbox talk. As a maintenance technician, you may be asked to deliver toolbox talks on electrical safety topics</li>
                  <li className="pl-1"><strong>Content:</strong> Specific to the work being done that day — not generic. Good topics for electrical maintenance include safe isolation procedures, arc flash awareness, cable avoidance, and working in confined spaces</li>
                  <li className="pl-1"><strong>Recording:</strong> A brief record should be kept — typically a form showing the date, topic, presenter, attendees and any issues raised. This provides evidence of safety communication for audits</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">RIDDOR — When Formal Reporting to the HSE Is Required</h3>
              <p className="text-sm text-white mb-3">
                The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) require
                employers to report certain events to the HSE. As a maintenance technician, you should be aware of
                the types of events that trigger a RIDDOR report, because you may be the first person to witness or
                discover them.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Deaths:</strong> All work-related deaths must be reported immediately</li>
                <li className="pl-1"><strong>Specified injuries:</strong> Fractures (other than fingers/thumbs/toes), amputations, permanent loss of sight, crush injuries, burns requiring hospital treatment, loss of consciousness from electric shock or lack of oxygen</li>
                <li className="pl-1"><strong>Over-7-day injuries:</strong> Any injury that results in more than 7 consecutive days off work (not counting the day of the incident)</li>
                <li className="pl-1"><strong>Dangerous occurrences:</strong> Electrical short circuit or overload causing fire or explosion; accidental release of a substance that could cause injury; collapse of scaffolding over 5 m</li>
                <li className="pl-1"><strong>Occupational diseases:</strong> Certain diseases linked to work exposure, such as hand-arm vibration syndrome or occupational asthma</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to understand and apply
              hazard reporting procedures as part of your health and safety knowledge. You are expected to take
              personal responsibility for identifying and reporting hazards, contributing to a positive safety
              culture in your workplace. This is assessed through both the knowledge test and the professional
              discussion in the end-point assessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3-2">
              Next: Risk Evaluation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section3_1;
