import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Other Industry-Specific Guidance - MOET Module 1 Section 4.6";
const DESCRIPTION = "Comprehensive guide to industry-specific guidance for electrical maintenance technicians: HSE Guidance Notes (GS38, GS6, HSG85, HSG47, HSG230), CDM 2015, DSEAR, ATEX zones, Management Regulations 1999, professional body guidance from IET and ECA.";

const quickCheckQuestions = [
  {
    id: "gs38-purpose",
    question: "What is the purpose of HSE Guidance Note GS38?",
    options: [
      "It provides guidance on working at height",
      "It specifies requirements for electrical test equipment used on low voltage systems to prevent danger",
      "It covers manual handling operations",
      "It addresses fire safety in commercial buildings"
    ],
    correctIndex: 1,
    explanation: "GS38 (Electrical Test Equipment for Use on Low Voltage Installations) specifies the requirements for voltage indicators, test lamps, and test probes used on low voltage systems. It requires fused probes, finger guards, minimum tip exposure, and specific construction standards to prevent electric shock and arc flash when testing."
  },
  {
    id: "cdm-role",
    question: "Under the Construction (Design and Management) Regulations 2015, which duty holder is responsible for planning, managing and monitoring the construction phase?",
    options: [
      "The client",
      "The principal designer",
      "The principal contractor",
      "The electrical subcontractor"
    ],
    correctIndex: 2,
    explanation: "Under CDM 2015, the principal contractor is responsible for planning, managing and monitoring the construction phase, including co-ordinating health and safety arrangements between contractors. The client has duties to make suitable arrangements, and the principal designer focuses on pre-construction design risk management."
  },
  {
    id: "dsear-zones",
    question: "Under DSEAR (Dangerous Substances and Explosive Atmospheres Regulations), electrical equipment used in a Zone 1 hazardous area must be:",
    options: [
      "Any standard IP-rated equipment",
      "Certified for use in explosive atmospheres (Ex-rated) appropriate to the zone classification",
      "Painted in a specific colour",
      "Inspected weekly by the HSE"
    ],
    correctIndex: 1,
    explanation: "In Zone 1 areas (where an explosive atmosphere is likely to occur occasionally in normal operation), all electrical equipment must be certified Ex-rated for that zone classification. Using standard equipment in a hazardous area creates a risk of ignition from sparks, hot surfaces, or electrical arcs."
  },
  {
    id: "management-regs",
    question: "The Management of Health and Safety at Work Regulations 1999 require employers to carry out:",
    options: [
      "Only fire risk assessments",
      "Suitable and sufficient risk assessments of all significant risks arising from the work activity",
      "Risk assessments only when requested by the HSE",
      "Risk assessments only for manual handling tasks"
    ],
    correctIndex: 1,
    explanation: "Regulation 3 of the Management Regulations requires every employer to make a suitable and sufficient assessment of the risks to the health and safety of employees and others arising from or in connection with the conduct of their undertaking. This is the overarching risk assessment requirement that applies to all work activities."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "GS38 specifies that voltage indicator probes for use on LV systems must have:",
    options: [
      "Bare metal tips at least 20 mm long for good contact",
      "Fused probes with finger guards and a maximum of 2 mm exposed tip, plus a maximum current through the body limited by high-value resistors",
      "Crocodile clips for hands-free operation",
      "Probes made entirely of insulated plastic"
    ],
    correctAnswer: 1,
    explanation: "GS38 requires voltage indicator probes to have: fused leads (to protect against short-circuit currents), finger guards (to prevent accidental contact with live parts), a maximum of 2 mm (or 4 mm) exposed tip, high-value resistors to limit the current that could flow through the body, and robust, insulated construction. These requirements prevent electric shock and arc flash during testing."
  },
  {
    id: 2,
    question: "HSG85 (Electricity at Work: Safe Working Practices) provides guidance on:",
    options: [
      "Plumbing installations",
      "Safe isolation procedures, permit to work systems, and live working controls for electrical maintenance",
      "Manual handling of heavy objects",
      "Fire detection systems"
    ],
    correctAnswer: 1,
    explanation: "HSG85 is the HSE's primary guidance on safe working practices for electrical work. It covers safe isolation procedures, permit to work systems, live working controls, competence, and the practical application of the Electricity at Work Regulations 1989. It is essential reading for all electrical maintenance technicians."
  },
  {
    id: 3,
    question: "GS6 (Avoidance of Danger from Overhead Electric Power Lines) is relevant to maintenance technicians when:",
    options: [
      "Installing domestic consumer units",
      "Working near overhead power lines with cranes, MEWPs, scaffold towers, or other equipment that could approach the lines",
      "Testing socket outlets in an office",
      "Replacing fluorescent lighting in a warehouse"
    ],
    correctAnswer: 1,
    explanation: "GS6 provides guidance on avoiding danger from overhead electric power lines. It is relevant whenever work equipment (cranes, MEWPs, scaffold towers, tipping vehicles, cable drums on trailers) could approach overhead lines. Minimum safe distances must be maintained, and specific precautions (goal posts, banksmen, barriers) may be required."
  },
  {
    id: 4,
    question: "HSG47 (Avoiding Danger from Underground Services) is relevant to electrical maintenance when:",
    options: [
      "Working in a switchroom",
      "Excavating near or locating underground cables and services",
      "Testing a distribution board",
      "Replacing a light fitting"
    ],
    correctAnswer: 1,
    explanation: "HSG47 provides guidance on avoiding danger when excavating near underground services — electricity cables, gas pipes, water mains and telecommunications. Electrical maintenance technicians may encounter underground cables when installing new supplies, carrying out external cable repairs, or working on street lighting and external installations."
  },
  {
    id: 5,
    question: "The INDG series of publications from the HSE are:",
    options: [
      "Statutory regulations with the force of law",
      "Free, short guidance leaflets aimed at workers and employers — providing practical, accessible advice",
      "Academic research papers",
      "Insurance industry documents"
    ],
    correctAnswer: 1,
    explanation: "INDG (Industry Guidance) publications are free, short leaflets published by the HSE. They provide practical, accessible guidance on specific topics — aimed at workers and employers. Examples include INDG231 (Electrical Safety and You), INDG354 (Managing Health and Safety in Construction), and INDG163 (Five Steps to Risk Assessment)."
  },
  {
    id: 6,
    question: "Under CDM 2015, electrical maintenance work on a construction site requires the maintenance contractor to:",
    options: [
      "Obtain planning permission",
      "Co-operate with the principal contractor, comply with site rules, and report any health and safety concerns",
      "Appoint their own principal designer",
      "File a notification with the HSE for all work"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015, every contractor must co-operate with the principal contractor and other contractors, comply with any directions from the principal contractor, comply with site-specific rules, and report anything likely to endanger anyone. Electrical maintenance contractors on construction sites must integrate with the overall site safety management."
  },
  {
    id: 7,
    question: "The Management of Health and Safety at Work Regulations 1999 require employers to appoint:",
    options: [
      "A full-time health and safety officer on every site",
      "One or more competent persons to assist with health and safety compliance",
      "An external health and safety consultant for all risk assessments",
      "A trade union safety representative"
    ],
    correctAnswer: 1,
    explanation: "Regulation 7 of the Management Regulations requires every employer to appoint one or more competent persons to assist them in complying with health and safety legislation. A 'competent person' is defined as someone with sufficient training, experience, knowledge and other qualities to enable them to properly assist."
  },
  {
    id: 8,
    question: "DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002) applies to electrical maintenance when:",
    options: [
      "Working in any commercial building",
      "Working in or near areas classified as hazardous zones due to the presence of flammable gases, vapours, mists or combustible dusts",
      "Working on any circuit above 400 V",
      "Working outdoors in wet conditions"
    ],
    correctAnswer: 1,
    explanation: "DSEAR applies wherever dangerous substances (flammable gases, vapours, mists, or combustible dusts) are present or may be present. This includes petrochemical plants, fuel storage facilities, grain stores, paint spray booths, battery charging rooms, and any location where an explosive atmosphere could form. Electrical equipment in these areas must be Ex-rated."
  },
  {
    id: 9,
    question: "The ATEX zone classification system categorises hazardous areas as:",
    options: [
      "Red, amber and green zones",
      "Zone 0, Zone 1 and Zone 2 for gases/vapours; Zone 20, Zone 21 and Zone 22 for dusts — based on the frequency and duration of the explosive atmosphere",
      "Category A, B and C based on voltage",
      "Level 1, 2 and 3 based on company size"
    ],
    correctAnswer: 1,
    explanation: "ATEX zones classify areas based on the likelihood and duration of an explosive atmosphere: Zone 0/20 (continuously or frequently present), Zone 1/21 (likely to occur occasionally in normal operation), Zone 2/22 (not likely in normal operation, but may occur for short periods). Each zone requires equipment with a specific level of protection."
  },
  {
    id: 10,
    question: "The ENA (Energy Networks Association) technical standards are relevant to electrical maintenance technicians who:",
    options: [
      "Only work on domestic installations",
      "Work on or near distribution network operator (DNO) equipment, or carry out work that interfaces with the public electricity supply",
      "Only work on IT equipment",
      "Only work in the rail industry"
    ],
    correctAnswer: 1,
    explanation: "ENA technical standards (including Engineering Recommendations such as G98, G99, and G12) are relevant when maintenance work interfaces with the distribution network — including work on substations, connections to the DNO network, embedded generation connections, and any work on equipment owned by or connected to the distribution system."
  },
  {
    id: 11,
    question: "The Distribution Safety Rules (DSR) govern:",
    options: [
      "Distribution of safety leaflets to employees",
      "Safe working procedures on electricity distribution networks — including isolation, earthing, and permit to work for DNO-owned equipment",
      "Distribution of PPE in warehouses",
      "Safety rules for delivery drivers"
    ],
    correctAnswer: 1,
    explanation: "The Distribution Safety Rules (DSR) are the safety rules that govern work on electricity distribution networks owned by distribution network operators (DNOs). They cover safe isolation, earthing, permit to work, competence requirements, and operational procedures for all persons working on or near the distribution system."
  },
  {
    id: 12,
    question: "Under ST1426, knowledge of industry-specific guidance is important because:",
    options: [
      "It is only needed for the knowledge test and has no practical application",
      "Maintenance technicians work across diverse environments and must understand the range of regulations, guidance and standards that apply to their specific work context",
      "It is only relevant to senior managers",
      "Guidance notes have the same force as law and must always be followed exactly"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to understand the regulatory and standards framework that governs their work. This goes beyond the core regulations (HSWA, EAWR) to include industry-specific guidance relevant to the specific work context — whether that is construction sites (CDM), hazardous areas (DSEAR), or distribution networks (DSR/ENA)."
  }
];

const faqs = [
  {
    question: "What is the legal status of HSE Guidance Notes (GS series, HSG series)?",
    answer: "HSE Guidance Notes are not law and are not approved codes of practice. They represent what the HSE considers to be good practice at the time of publication. While there is no legal obligation to follow the guidance exactly, following it will normally be sufficient to comply with the law. Departing from guidance without equivalent alternative measures may be used as evidence that the duty holder has not taken adequate precautions."
  },
  {
    question: "Do I need to comply with GS38 specifically, or is it just guidance?",
    answer: "GS38 is technically guidance, not law. However, the EAWR 1989 Regulation 4(4) requires protective equipment (including test equipment) to be 'suitable for the use for which it is provided'. The HSE considers that test equipment complying with GS38 is suitable; equipment that does not comply may be considered unsuitable, which would be a breach of Regulation 4(4). In practice, GS38 compliance is treated as a near-mandatory requirement."
  },
  {
    question: "When does CDM 2015 apply to electrical maintenance work?",
    answer: "CDM 2015 applies to all 'construction work' — which is broadly defined to include installation, maintenance, repair, alteration, and demolition of electrical installations in or on a structure. Most electrical maintenance work on buildings qualifies as construction work. However, routine maintenance (such as changing lamps or visual inspections) that does not involve construction work may fall outside CDM. When in doubt, assume CDM applies."
  },
  {
    question: "What is HSG230 and why is it relevant to electrical maintenance?",
    answer: "HSG230 (Keeping Electrical Switchgear Safe) provides guidance on the safe management of electrical switchgear, including maintenance, inspection, and safe working practices for distribution boards, control panels, and switchgear assemblies. It covers thermal imaging, maintenance scheduling, and the precautions needed when working on or near switchgear. It is directly relevant to any technician who maintains electrical distribution equipment."
  },
  {
    question: "How do professional body publications (IET, ECA) differ from HSE guidance?",
    answer: "Professional body publications represent industry best practice and technical guidance, but they have no statutory status. IET publications (Guidance Notes, the On-Site Guide, the Code of Practice for In-Service Inspection and Testing) provide practical interpretation of BS 7671 and electrical safety standards. ECA publications provide business and technical guidance for electrical contractors. Neither has the force of law, but both are widely respected and referenced by courts and regulators."
  }
];

const MOETModule1Section4_6 = () => {
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
            <span>Module 1.4.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Other Industry-Specific Guidance
          </h1>
          <p className="text-white/80">
            HSE guidance notes, CDM, DSEAR, and professional body publications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>GS38:</strong> Test equipment requirements for LV systems</li>
              <li className="pl-1"><strong>HSG85:</strong> Safe working practices for electrical work</li>
              <li className="pl-1"><strong>CDM 2015:</strong> Construction health and safety management</li>
              <li className="pl-1"><strong>DSEAR/ATEX:</strong> Explosive atmospheres and hazardous zones</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>HSG230:</strong> Keeping electrical switchgear safe</li>
              <li className="pl-1"><strong>GS6:</strong> Overhead power line safety for MEWPs/cranes</li>
              <li className="pl-1"><strong>ENA/DSR:</strong> Distribution network safety rules</li>
              <li className="pl-1"><strong>ST1426:</strong> Broad regulatory awareness for diverse work contexts</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the key HSE Guidance Notes relevant to electrical maintenance (GS38, GS6, HSG85, HSG47, HSG230)",
              "Explain the purpose and structure of CDM 2015 and its application to electrical work",
              "Describe the Management of Health and Safety at Work Regulations 1999 requirements",
              "Understand DSEAR and ATEX zone classifications for hazardous areas",
              "Explain the role of ENA technical standards and the Distribution Safety Rules",
              "Identify professional body guidance from the IET and ECA relevant to maintenance"
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

        {/* Section 01: HSE Guidance Notes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            HSE Guidance Notes (GS, HSG and INDG Series)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Health and Safety Executive publishes a range of guidance notes to help duty holders understand
              and comply with health and safety legislation. These are not law — they do not have the statutory
              force of regulations. However, they represent the HSE's view of what constitutes good practice, and
              departing from them without equivalent alternative measures may be used as evidence of non-compliance
              in legal proceedings.
            </p>
            <p>
              For electrical maintenance technicians, several guidance notes are directly relevant to your daily
              work. Knowing which guidance applies to your activities — and where to find it — is an important
              part of your professional competence.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">GS38 — Electrical Test Equipment for Use on Low Voltage Systems</h3>
                <p className="text-sm text-white mb-2">
                  GS38 is arguably the most important guidance note for electrical maintenance technicians. It
                  specifies the requirements for voltage indicators, test lamps, and test probes used on low
                  voltage systems (up to 1000 V AC).
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Fused probes:</strong> Test leads must incorporate fuses (typically 500 mA HRC) to protect against short-circuit currents if a probe slips and bridges two live parts</li>
                  <li className="pl-1"><strong>Finger guards:</strong> Probes must have finger barriers to prevent accidental contact with exposed metal tips — fingers must not be able to reach the live part</li>
                  <li className="pl-1"><strong>Tip exposure:</strong> Maximum 2 mm exposed tip for measurement probes; 4 mm for voltage indicators designed for shrouded contacts</li>
                  <li className="pl-1"><strong>Robust construction:</strong> Leads must be adequately insulated, flexible but not prone to damage, and firmly attached to the instrument</li>
                  <li className="pl-1"><strong>Two-pole testers:</strong> GS38 strongly recommends two-pole voltage indicators (not neon screwdrivers or indicator lights) for proving dead</li>
                  <li className="pl-1"><strong>Category rating:</strong> Instruments must be rated for the measurement category of the circuit (CAT III for distribution, CAT IV for origin of supply)</li>
                </ul>
                <p className="text-sm text-elec-yellow/70 mt-2">
                  <strong>Critical point:</strong> Using test equipment that does not comply with GS38 is likely to
                  breach EAWR Regulation 4(4) (suitability of protective equipment) and PUWER Regulation 4
                  (suitability of work equipment). Many electrical fatalities have involved non-compliant test equipment.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">HSG85 — Electricity at Work: Safe Working Practices</h3>
                <p className="text-sm text-white mb-2">
                  HSG85 is the HSE's primary guidance on the practical application of the Electricity at Work
                  Regulations 1989. It covers:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Safe isolation procedures — step-by-step practical guidance</li>
                  <li className="pl-1">Permit to work systems — design, implementation and management</li>
                  <li className="pl-1">Live working controls — risk assessment, precautions, documentation</li>
                  <li className="pl-1">Competence requirements — what constitutes a "competent person"</li>
                  <li className="pl-1">Portable electrical equipment — in-service inspection and testing</li>
                  <li className="pl-1">Accompanying persons and emergency procedures</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Other Key HSE Publications</h3>
                <div className="overflow-x-auto">
                  <table className="text-sm text-white w-full border-collapse">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="border border-white/10 px-3 py-2 text-left">Reference</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Title</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Relevance to Electrical Maintenance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">GS6</td>
                        <td className="border border-white/10 px-3 py-2">Avoidance of Danger from Overhead Electric Power Lines</td>
                        <td className="border border-white/10 px-3 py-2">Working near overhead lines with MEWPs, cranes, scaffold</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">HSG47</td>
                        <td className="border border-white/10 px-3 py-2">Avoiding Danger from Underground Services</td>
                        <td className="border border-white/10 px-3 py-2">Excavating near underground cables, CAT scanning</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">HSG230</td>
                        <td className="border border-white/10 px-3 py-2">Keeping Electrical Switchgear Safe</td>
                        <td className="border border-white/10 px-3 py-2">Switchgear maintenance, thermal imaging, scheduling</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">HSG65</td>
                        <td className="border border-white/10 px-3 py-2">Managing for Health and Safety</td>
                        <td className="border border-white/10 px-3 py-2">Plan-Do-Check-Act framework for safety management</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">INDG231</td>
                        <td className="border border-white/10 px-3 py-2">Electrical Safety and You</td>
                        <td className="border border-white/10 px-3 py-2">Basic guidance leaflet on electrical safety at work</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">INDG163</td>
                        <td className="border border-white/10 px-3 py-2">Five Steps to Risk Assessment</td>
                        <td className="border border-white/10 px-3 py-2">Fundamental risk assessment methodology</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: CDM 2015 and Management Regulations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            CDM 2015 and the Management of Health and Safety at Work Regulations 1999
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Two sets of regulations frequently apply alongside the EAWR for electrical maintenance work: the
              Construction (Design and Management) Regulations 2015 (CDM) and the Management of Health and Safety
              at Work Regulations 1999 (the "Management Regulations"). Both are made under the HSWA 1974 and
              impose additional duties on employers, clients, designers and contractors.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CDM 2015 — Overview</h3>
                <p className="text-sm text-white mb-3">
                  CDM 2015 applies to all "construction work" — which is broadly defined to include the installation,
                  commissioning, maintenance, repair, alteration, renewal, and dismantling of mechanical, electrical,
                  gas and other services in or on a structure. Most electrical maintenance work on buildings qualifies.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Client:</strong> The person for whom the project is carried out. Must make suitable arrangements for managing the project, ensure welfare facilities, appoint PC and PD (where applicable)</li>
                  <li className="pl-1"><strong>Principal Designer (PD):</strong> Plans, manages and monitors the pre-construction phase to eliminate or reduce health and safety risks in the design. Prepares the health and safety file</li>
                  <li className="pl-1"><strong>Principal Contractor (PC):</strong> Plans, manages and monitors the construction phase. Co-ordinates health and safety between contractors. Produces the construction phase plan</li>
                  <li className="pl-1"><strong>Designers:</strong> Must eliminate, reduce or control foreseeable risks in their designs — including electrical installation design</li>
                  <li className="pl-1"><strong>Contractors:</strong> Must plan, manage and monitor their own work, co-operate with others, comply with site rules, and report anything likely to endanger anyone</li>
                </ul>
              </div>

              <div className="my-6 p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CDM 2015 — Application to Electrical Maintenance</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Notification:</strong> Projects lasting more than 30 working days with more than 20 workers simultaneously, or exceeding 500 person-days, must be notified to the HSE (F10)</li>
                  <li className="pl-1"><strong>Construction Phase Plan:</strong> Required for all projects where CDM applies — sets out the arrangements for managing health and safety during the work</li>
                  <li className="pl-1"><strong>Health and Safety File:</strong> Must be compiled for the client — containing as-built drawings, maintenance information, and residual risk information for future maintenance</li>
                  <li className="pl-1"><strong>Welfare:</strong> Adequate welfare facilities (toilets, washing, rest, changing) must be provided for all construction workers</li>
                </ul>
                <p className="text-sm text-elec-yellow/70 mt-2">
                  <strong>Key point:</strong> Even a single maintenance electrician carrying out an electrical
                  alteration on a building is subject to CDM 2015. The level of paperwork scales with the risk and
                  size of the project, but the duties apply to all construction work.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Management of Health and Safety at Work Regulations 1999</h3>
                <p className="text-sm text-white mb-3">
                  The Management Regulations (sometimes called "MHSWR" or simply "the Management Regs") provide the
                  overarching framework for health and safety management. Key requirements include:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Regulation 3 — Risk assessment:</strong> Every employer must carry out a suitable and sufficient assessment of the risks to employees and non-employees. This is the legal foundation for all risk assessments in the workplace</li>
                  <li className="pl-1"><strong>Regulation 4 — Principles of prevention:</strong> The employer must implement preventive and protective measures based on the principles in Schedule 1 (which mirror the hierarchy of controls)</li>
                  <li className="pl-1"><strong>Regulation 5 — Health and safety arrangements:</strong> Employers must have effective arrangements for planning, organisation, control, monitoring and review of safety measures</li>
                  <li className="pl-1"><strong>Regulation 7 — Competent persons:</strong> Employers must appoint one or more competent persons to assist with health and safety</li>
                  <li className="pl-1"><strong>Regulation 10 — Information:</strong> Employees must be provided with comprehensible and relevant information on risks and safety measures</li>
                  <li className="pl-1"><strong>Regulation 13 — Training:</strong> Adequate training on recruitment, on exposure to new/changed risks, and periodically as required</li>
                  <li className="pl-1"><strong>Regulation 14 — Employees' duties:</strong> Employees must use equipment correctly and inform the employer of dangerous situations or shortcomings in safety arrangements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03: DSEAR and ATEX */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            DSEAR, ATEX Zones and Hazardous Area Classification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR) require employers to
              control the risks from fire, explosion and similar events arising from dangerous substances in the
              workplace. For electrical maintenance technicians, DSEAR is critical whenever you work in or near
              areas where flammable gases, vapours, mists or combustible dusts may be present.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DSEAR Key Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Risk assessment:</strong> Assess the risks from dangerous substances and the measures needed to control them</li>
                <li className="pl-1"><strong>Hazardous area classification:</strong> Classify areas where explosive atmospheres may occur into zones</li>
                <li className="pl-1"><strong>Elimination or reduction:</strong> Eliminate or reduce the amount of dangerous substance, or reduce the likelihood of an explosive atmosphere forming</li>
                <li className="pl-1"><strong>Ignition sources:</strong> Control ignition sources — including electrical equipment, static electricity, hot surfaces, and mechanical sparks</li>
                <li className="pl-1"><strong>Mitigation:</strong> Provide mitigation measures (explosion relief, suppression, containment) to reduce the effects of any explosion</li>
                <li className="pl-1"><strong>Information and training:</strong> Provide employees with information on dangerous substances and the precautions to take</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ATEX Zone Classifications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Zone</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Substance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Condition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Zone 0</td>
                      <td className="border border-white/10 px-3 py-2">Gas/vapour</td>
                      <td className="border border-white/10 px-3 py-2">Explosive atmosphere present continuously or for long periods</td>
                      <td className="border border-white/10 px-3 py-2">Category 1 Ex equipment (very high protection)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Zone 1</td>
                      <td className="border border-white/10 px-3 py-2">Gas/vapour</td>
                      <td className="border border-white/10 px-3 py-2">Likely to occur occasionally in normal operation</td>
                      <td className="border border-white/10 px-3 py-2">Category 2 Ex equipment (high protection)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Zone 2</td>
                      <td className="border border-white/10 px-3 py-2">Gas/vapour</td>
                      <td className="border border-white/10 px-3 py-2">Not likely in normal operation; may occur for short periods</td>
                      <td className="border border-white/10 px-3 py-2">Category 3 Ex equipment (normal protection)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Zone 20</td>
                      <td className="border border-white/10 px-3 py-2">Dust</td>
                      <td className="border border-white/10 px-3 py-2">Explosive dust cloud continuously or for long periods</td>
                      <td className="border border-white/10 px-3 py-2">Category 1 Ex equipment (very high protection)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Zone 21</td>
                      <td className="border border-white/10 px-3 py-2">Dust</td>
                      <td className="border border-white/10 px-3 py-2">Likely to occur occasionally in normal operation</td>
                      <td className="border border-white/10 px-3 py-2">Category 2 Ex equipment (high protection)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Zone 22</td>
                      <td className="border border-white/10 px-3 py-2">Dust</td>
                      <td className="border border-white/10 px-3 py-2">Not likely in normal operation; may occur for short periods</td>
                      <td className="border border-white/10 px-3 py-2">Category 3 Ex equipment (normal protection)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Electrical Maintenance in Hazardous Areas</p>
              <p className="text-sm text-white">
                Maintenance of electrical equipment in hazardous areas requires specialist knowledge and additional
                precautions. You must never use standard (non-Ex-rated) test instruments in a classified zone. All
                electrical work must maintain the integrity of the explosion protection — replacing an Ex-rated
                component with a standard component removes the protection and creates an explosion risk. If you
                are asked to work in a hazardous area, ensure you have received appropriate training (CompEx or
                equivalent) and understand the specific zone classification and equipment protection types.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: ENA Standards and Professional Body Guidance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            ENA Standards, Distribution Safety Rules and Professional Body Guidance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond HSE guidance and statutory regulations, electrical maintenance technicians must be aware of
              industry-specific standards from the Energy Networks Association (ENA) and guidance from professional
              bodies such as the Institution of Engineering and Technology (IET) and the Electrical Contractors'
              Association (ECA).
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">ENA Technical Standards</h3>
                <p className="text-sm text-white mb-2">
                  The Energy Networks Association publishes Engineering Recommendations and technical standards
                  that govern the interface between customer installations and the electricity distribution network.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>G98:</strong> Requirements for micro-generation equipment connected in parallel with public low voltage distribution networks (up to 16 A per phase)</li>
                  <li className="pl-1"><strong>G99:</strong> Requirements for generation equipment connected to the distribution network above the G98 threshold</li>
                  <li className="pl-1"><strong>G12:</strong> Requirements for the application of protective multiple earthing to low voltage networks</li>
                  <li className="pl-1"><strong>P28/P29:</strong> Voltage fluctuations, harmonics and power quality standards</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Safety Rules (DSR)</h3>
                <p className="text-sm text-white mb-2">
                  The Distribution Safety Rules are the safety rules that govern work on electricity distribution
                  networks. They are produced by the ENA and adopted by each distribution network operator (DNO).
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Prescribe the procedures for isolation, earthing, and proving dead on distribution equipment</li>
                  <li className="pl-1">Define the roles of Senior Authorised Person (SAP), Authorised Person, and Competent Person</li>
                  <li className="pl-1">Govern the permit to work system for distribution network work</li>
                  <li className="pl-1">Set out the safety procedures for switching operations</li>
                  <li className="pl-1">Require formal authorisation and appointment of all persons working on the network</li>
                </ul>
                <p className="text-sm text-elec-yellow/70 mt-2">
                  <strong>When do DSR apply?</strong> If you work on or near DNO-owned equipment (substations, HV
                  switchgear, distribution transformers, service cables), the DSR apply. This is distinct from
                  customer-owned equipment where the employer's own safety rules apply.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Site-Specific Rules</h3>
                <p className="text-sm text-white">
                  Many industrial, commercial and institutional clients have their own site-specific safety rules
                  that supplement national legislation and standards. These may include: enhanced permit to work
                  procedures, specific PPE requirements (e.g., arc flash clothing ratings), restricted working hours,
                  mandatory site inductions, buddy systems, and specific reporting procedures. As a maintenance
                  technician, you must identify and comply with site-specific rules at every location where you work.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">IET Publications</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Guidance Notes 1–8:</strong> Practical interpretation of BS 7671 requirements (GN3 on Inspection and Testing is essential)</li>
                  <li className="pl-1"><strong>On-Site Guide:</strong> Field reference for BS 7671 application</li>
                  <li className="pl-1"><strong>Code of Practice for In-Service Inspection and Testing:</strong> Guidance on PAT testing and in-service equipment management</li>
                  <li className="pl-1"><strong>Code of Practice for EV Charging:</strong> Guidance on Section 722 installations</li>
                  <li className="pl-1"><strong>Code of Practice for Grid-Connected Solar PV:</strong> Guidance on Section 712 installations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">ECA and Other Bodies</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>ECA:</strong> Technical guidance for electrical contractors, business management, and compliance</li>
                  <li className="pl-1"><strong>NICEIC/NAPIT/ELECSA:</strong> Competent person scheme requirements and technical bulletins</li>
                  <li className="pl-1"><strong>JIB:</strong> Joint Industry Board — grading, terms and conditions for electrical operatives</li>
                  <li className="pl-1"><strong>CIBSE:</strong> Guidance on building services design, including lighting and power standards</li>
                  <li className="pl-1"><strong>BSRIA:</strong> Practical guidance on commissioning and building services maintenance</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Industry Codes of Practice</h3>
              <p className="text-sm text-white mb-3">
                Various industry bodies publish codes of practice that, while not statutory, represent accepted good
                practice in specific sectors:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BS 5839:</strong> Fire detection and alarm systems — Part 1 (non-domestic) and Part 6 (domestic)</li>
                <li className="pl-1"><strong>BS 5266:</strong> Emergency lighting — Part 1 (Code of Practice)</li>
                <li className="pl-1"><strong>BS EN 62305:</strong> Protection against lightning</li>
                <li className="pl-1"><strong>BS EN 50110:</strong> Operation of electrical installations (European standard)</li>
                <li className="pl-1"><strong>IEC 60079 series:</strong> Equipment for explosive atmospheres (technical standards for Ex equipment)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 note:</strong> The maintenance technician standard requires you to demonstrate awareness
              of the broader regulatory and standards landscape — not just the core regulations (HSWA, EAWR) but
              also the guidance, standards and codes of practice that apply to your specific work context. In your
              EPA, you may be asked to identify which guidance or standard applies to a specific maintenance scenario.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

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
                <p className="font-medium text-white mb-1">Key HSE Guidance</p>
                <ul className="space-y-0.5">
                  <li>GS38 — Test equipment for LV systems</li>
                  <li>GS6 — Overhead power line safety</li>
                  <li>HSG85 — Safe working practices (electrical)</li>
                  <li>HSG47 — Underground services</li>
                  <li>HSG230 — Keeping switchgear safe</li>
                  <li>INDG231 — Electrical safety and you</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Other Regulations and Standards</p>
                <ul className="space-y-0.5">
                  <li>CDM 2015 — Construction safety management</li>
                  <li>Management Regs 1999 — Risk assessment, competent persons</li>
                  <li>DSEAR 2002 — Explosive atmospheres</li>
                  <li>ATEX — Zone classification (0/1/2, 20/21/22)</li>
                  <li>DSR — Distribution Safety Rules</li>
                  <li>ENA — G98, G99, G12 technical standards</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section4_6;