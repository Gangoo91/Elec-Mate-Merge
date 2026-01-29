import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Environmental Management - HNC Module 5 Section 6.5";
const DESCRIPTION = "Master environmental management for building services sites: Site Waste Management Plans (SWMP), waste hierarchy, noise monitoring, dust control, environmental permits, pollution prevention, and ISO 14001 principles.";

const quickCheckQuestions = [
  {
    id: "swmp-purpose",
    question: "What is the primary purpose of a Site Waste Management Plan (SWMP)?",
    options: ["To reduce material costs", "To plan and monitor waste management throughout a project", "To comply with fire regulations", "To calculate carbon emissions"],
    correctIndex: 1,
    explanation: "A Site Waste Management Plan is a document that plans, records, and monitors how waste is managed on a construction site throughout the project lifecycle, promoting resource efficiency and legal compliance."
  },
  {
    id: "waste-hierarchy",
    question: "What is the correct order of the waste hierarchy from most to least preferred?",
    options: ["Recycle, Reduce, Reuse, Dispose", "Dispose, Recover, Recycle, Reduce", "Prevention, Reuse, Recycle, Recovery, Disposal", "Recovery, Recycle, Prevention, Disposal"],
    correctIndex: 2,
    explanation: "The waste hierarchy prioritises: Prevention (most preferred), then Reuse, Recycle, Recovery (energy), and finally Disposal (least preferred). This maximises resource efficiency and minimises environmental impact."
  },
  {
    id: "noise-limit",
    question: "Under the Control of Pollution Act 1974, local authorities can impose noise limits through which mechanism?",
    options: ["Environmental Permit", "Section 61 consent", "Building Regulations Part E", "RIDDOR notification"],
    correctIndex: 1,
    explanation: "Section 61 of the Control of Pollution Act 1974 allows contractors to apply for prior consent for construction works. Local authorities can specify noise limits, permitted hours, and required control measures."
  },
  {
    id: "environmental-permit",
    question: "When is an environmental permit typically required for building services work?",
    options: ["For all construction projects", "When working near watercourses or installing certain equipment", "Only for residential properties", "When using power tools"],
    correctIndex: 1,
    explanation: "Environmental permits may be required when working near watercourses (discharge consents), installing standby generators (air quality), or for activities that could cause pollution. The Environment Agency regulates these permits."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which legislation introduced the duty of care for waste management in England?",
    options: [
      "Health and Safety at Work Act 1974",
      "Environmental Protection Act 1990",
      "Building Regulations 2010",
      "CDM Regulations 2015"
    ],
    correctAnswer: 1,
    explanation: "The Environmental Protection Act 1990 introduced the statutory duty of care for waste. Section 34 requires anyone who produces, imports, keeps, stores, transports, treats or disposes of waste to take all reasonable steps to prevent environmental harm."
  },
  {
    id: 2,
    question: "What documentation must accompany hazardous waste when removed from site?",
    options: ["Risk assessment only", "Consignment note", "Method statement", "Site diary entry"],
    correctAnswer: 1,
    explanation: "Hazardous waste must be accompanied by a consignment note containing details of the waste type, quantity, carrier details, and destination. These records must be kept for a minimum of 3 years."
  },
  {
    id: 3,
    question: "At what noise level (LAeq) should hearing protection zones be established on construction sites?",
    options: ["70 dB(A)", "80 dB(A)", "85 dB(A)", "90 dB(A)"],
    correctAnswer: 2,
    explanation: "Under the Control of Noise at Work Regulations 2005, when daily exposure reaches 85 dB(A), hearing protection zones must be established, PPE is mandatory, and health surveillance is required."
  },
  {
    id: 4,
    question: "Which document forms the basis of ISO 14001 environmental management?",
    options: ["Site induction form", "Environmental Policy", "Health and Safety Plan", "Quality Control Plan"],
    correctAnswer: 1,
    explanation: "ISO 14001 requires a documented Environmental Policy as the foundation of the Environmental Management System (EMS). This policy commits the organisation to compliance, pollution prevention, and continual improvement."
  },
  {
    id: 5,
    question: "What is the maximum permitted working time for noisy construction activities under typical Section 61 consent?",
    options: [
      "24 hours any day",
      "08:00-18:00 Monday to Friday only",
      "07:30-18:00 weekdays, 08:00-13:00 Saturdays",
      "06:00-22:00 any day"
    ],
    correctAnswer: 2,
    explanation: "Typical Section 61 consents permit noisy works 07:30-18:00 Monday to Friday and 08:00-13:00 on Saturdays. No noisy works on Sundays or Bank Holidays. Times may vary by local authority."
  },
  {
    id: 6,
    question: "Under the waste hierarchy, what does 'recovery' typically mean in building services?",
    options: [
      "Finding lost materials",
      "Using waste to generate energy",
      "Returning materials to suppliers",
      "Documenting waste quantities"
    ],
    correctAnswer: 1,
    explanation: "Recovery in the waste hierarchy refers to extracting value from waste, typically through energy recovery (incineration with energy capture). This is preferred over landfill disposal but is below recycling in the hierarchy."
  },
  {
    id: 7,
    question: "What is the primary purpose of dust suppression using water misting on construction sites?",
    options: [
      "To cool workers in hot weather",
      "To capture airborne particles and prevent them spreading",
      "To reduce fire risk",
      "To clean equipment"
    ],
    correctAnswer: 1,
    explanation: "Water misting captures airborne dust particles, causing them to settle rather than spread across the site or beyond site boundaries. This protects workers, neighbours, and the environment from harmful particulates."
  },
  {
    id: 8,
    question: "Which waste streams require segregation on a building services site?",
    options: [
      "Only hazardous waste",
      "Metals, wood, plastics, hazardous, and general waste",
      "Only cable and copper",
      "Packaging materials only"
    ],
    correctAnswer: 1,
    explanation: "Effective waste management requires segregating multiple streams: metals (copper, steel, aluminium), wood, plastics, hazardous waste (fluorescent tubes, batteries, oils), and general waste. This maximises recycling and reduces disposal costs."
  },
  {
    id: 9,
    question: "What does COSHH require regarding substances that could cause environmental harm?",
    options: [
      "Disposal in general waste",
      "Assessment and appropriate storage, handling and disposal",
      "Use only outdoors",
      "No specific requirements"
    ],
    correctAnswer: 1,
    explanation: "COSHH requires assessment of all hazardous substances including their environmental impact. Substances must be stored to prevent environmental release, with appropriate containment (bunding) and disposal through licensed routes."
  },
  {
    id: 10,
    question: "What is the purpose of an Environmental Aspects Register in ISO 14001?",
    options: [
      "To list all employees with environmental training",
      "To identify activities that interact with the environment and assess their significance",
      "To record permit numbers",
      "To document recycling targets"
    ],
    correctAnswer: 1,
    explanation: "An Environmental Aspects Register identifies all activities, products and services that can interact with the environment (aspects), evaluates their potential impacts, and determines their significance. This drives the setting of objectives and targets."
  },
  {
    id: 11,
    question: "When must a waste transfer note be provided?",
    options: [
      "Only for hazardous waste",
      "When waste is transferred from one party to another",
      "Only for waste going to landfill",
      "Only for waste over 1 tonne"
    ],
    correctAnswer: 1,
    explanation: "A waste transfer note must accompany all controlled waste when transferred between parties. It must describe the waste, state SIC codes, and be signed by both parties. Notes must be retained for 2 years (3 years for hazardous waste consignment notes)."
  },
  {
    id: 12,
    question: "What action should be taken if a pollution incident occurs on site?",
    options: [
      "Continue working and report at the end of the day",
      "Stop the source, contain the spill, report to the Environment Agency",
      "Cover with soil and leave",
      "Inform the client only"
    ],
    correctAnswer: 1,
    explanation: "For pollution incidents: immediately stop the source, contain the spill using spill kits/absorbents, prevent entry to drains/watercourses, and report to the Environment Agency incident hotline (0800 807060). Document all actions taken."
  }
];

const faqs = [
  {
    question: "Do I still need a Site Waste Management Plan after the regulations were revoked?",
    answer: "While the Site Waste Management Plans Regulations 2008 were revoked in 2013, SWMPs remain best practice and are often required contractually. Many clients, particularly public sector, require SWMPs. They demonstrate duty of care compliance under the Environmental Protection Act 1990 and help achieve BREEAM/LEED credits. The principles remain essential for legal compliance and efficient project delivery."
  },
  {
    question: "What are the key noise control measures for building services installation?",
    answer: "Key measures include: selecting quieter equipment (silenced generators, low-noise tools), scheduling noisy works during permitted hours, using acoustic barriers/screens around noisy operations, maintaining equipment to prevent increased noise, briefing operatives on noise minimisation, monitoring noise levels at site boundaries, and communicating with neighbours about planned noisy activities."
  },
  {
    question: "How do I segregate electrical waste on site?",
    answer: "Segregate into: copper cable (high value, specialist recycler), ferrous metals (cable tray, trunking), non-ferrous metals (aluminium), WEEE (waste electrical equipment - luminaires, controls), hazardous waste (fluorescent tubes containing mercury, batteries, capacitors), packaging (cardboard, plastic), and general waste. Label all containers clearly and prevent contamination between streams."
  },
  {
    question: "What environmental permits might affect building services work?",
    answer: "Potentially required permits include: discharge consents (surface water drainage to watercourses), abstraction licences (using water for dust suppression), waste carrier licences (transporting waste), environmental permits for standby generators over certain thresholds, and permits for work affecting protected species or habitats. Always check with the Environment Agency early in the project."
  },
  {
    question: "What are the penalties for environmental non-compliance?",
    answer: "Penalties can be severe: unlimited fines for waste duty of care breaches, up to 5 years imprisonment for illegal waste disposal, fixed penalty notices up to 400 pounds for minor offences, remediation orders requiring cleanup at polluter's expense, prohibition notices stopping work, and director liability for corporate offences. Reputational damage and loss of contracts often exceed the direct penalties."
  },
  {
    question: "How does ISO 14001 certification benefit an electrical contractor?",
    answer: "Benefits include: competitive advantage in tender processes (many clients require certified contractors), framework for legal compliance reducing risk of prosecution, cost savings through improved resource efficiency, reduced waste disposal costs, improved reputation with clients and communities, staff engagement through environmental awareness, and alignment with sustainability requirements of major projects."
  }
];

const HNCModule5Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section6">
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
            <Zap className="h-4 w-4" />
            <span>Module 5.6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Environmental Management
          </h1>
          <p className="text-white/80">
            Waste management, noise control, dust suppression, permit requirements and environmental compliance for building services sites
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Waste hierarchy:</strong> Prevent, Reuse, Recycle, Recover, Dispose</li>
              <li className="pl-1"><strong>SWMP:</strong> Plans and monitors waste throughout project</li>
              <li className="pl-1"><strong>Noise control:</strong> Section 61 consent, permitted hours</li>
              <li className="pl-1"><strong>Environmental permits:</strong> May be required for discharges, generators</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Cable waste:</strong> Segregate copper for recycling</li>
              <li className="pl-1"><strong>Fluorescent tubes:</strong> Hazardous waste (mercury)</li>
              <li className="pl-1"><strong>Dust from chasing:</strong> Silica hazard, suppression required</li>
              <li className="pl-1"><strong>Generator noise:</strong> May need acoustic enclosure</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Develop and implement Site Waste Management Plans",
              "Apply the waste hierarchy to minimise environmental impact",
              "Implement noise monitoring and control measures",
              "Apply dust suppression techniques for worker and environmental protection",
              "Understand environmental permit requirements",
              "Implement pollution prevention measures aligned with ISO 14001"
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

        {/* Section 1: Site Waste Management Plans */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Site Waste Management Plans and Waste Hierarchy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective waste management is both a legal duty and a commercial necessity in building services.
              The Environmental Protection Act 1990 imposes a duty of care on all those who handle waste,
              from production through to final disposal.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Waste Hierarchy (most to least preferred):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Prevention:</strong> Avoid generating waste through better design and ordering</li>
                <li className="pl-1"><strong>Reuse:</strong> Use materials again for same or different purpose</li>
                <li className="pl-1"><strong>Recycle:</strong> Process waste into new materials or products</li>
                <li className="pl-1"><strong>Recovery:</strong> Extract value through energy recovery</li>
                <li className="pl-1"><strong>Disposal:</strong> Landfill or incineration without energy recovery</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Site Waste Management Plan Contents</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Project details</td>
                      <td className="border border-white/10 px-3 py-2">Client, location, value, description</td>
                      <td className="border border-white/10 px-3 py-2">Start of project</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Waste forecast</td>
                      <td className="border border-white/10 px-3 py-2">Expected types, quantities, disposal routes</td>
                      <td className="border border-white/10 px-3 py-2">Pre-construction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Waste carriers</td>
                      <td className="border border-white/10 px-3 py-2">Licensed carriers, registration numbers</td>
                      <td className="border border-white/10 px-3 py-2">As appointed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Destination sites</td>
                      <td className="border border-white/10 px-3 py-2">Licensed facilities, permit numbers</td>
                      <td className="border border-white/10 px-3 py-2">As identified</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Actual waste data</td>
                      <td className="border border-white/10 px-3 py-2">Quantities removed, transfer notes</td>
                      <td className="border border-white/10 px-3 py-2">Ongoing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final reconciliation</td>
                      <td className="border border-white/10 px-3 py-2">Comparison of forecast vs actual</td>
                      <td className="border border-white/10 px-3 py-2">Project completion</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Waste Streams</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">Recyclable Materials</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Copper cable offcuts (high value)</li>
                    <li>Steel cable tray and trunking</li>
                    <li>Aluminium conduit and fittings</li>
                    <li>Cardboard packaging</li>
                    <li>Plastic drum packaging</li>
                    <li>Clean wood from cable drums</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Hazardous Waste</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Fluorescent tubes (mercury)</li>
                    <li>Batteries (various chemistries)</li>
                    <li>Capacitors (may contain PCBs)</li>
                    <li>Oils and lubricants</li>
                    <li>Solvents and cleaning agents</li>
                    <li>Asbestos (legacy installations)</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Legal requirement:</strong> Waste transfer notes must be retained for 2 years; hazardous waste consignment notes for 3 years.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Noise Monitoring and Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Noise Monitoring and Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Construction noise is regulated under multiple legislative frameworks including the Control
              of Pollution Act 1974, the Environmental Protection Act 1990 (statutory nuisance), and the
              Control of Noise at Work Regulations 2005 (worker protection).
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Control of Noise at Work Regulations 2005</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lower action level (80 dB):</strong> Information, training, hearing protection available</li>
                <li className="pl-1"><strong>Upper action level (85 dB):</strong> Hearing protection mandatory, zones marked</li>
                <li className="pl-1"><strong>Exposure limit (87 dB):</strong> Must not be exceeded (with PPE)</li>
                <li className="pl-1">Health surveillance required above 85 dB daily exposure</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Section 61 Prior Consent</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Apply before starting noisy works</li>
                  <li className="pl-1">Specify methods and equipment</li>
                  <li className="pl-1">Propose noise limits and hours</li>
                  <li className="pl-1">Provides defence against prosecution</li>
                  <li className="pl-1">28 days for LA to respond</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Section 60 Notice</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Issued by local authority</li>
                  <li className="pl-1">Specifies permitted hours</li>
                  <li className="pl-1">May limit equipment types</li>
                  <li className="pl-1">Requires specific methods</li>
                  <li className="pl-1">Breach is criminal offence</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Noise Levels - Building Services Activities</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical dB(A)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Measures</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chasing walls</td>
                      <td className="border border-white/10 px-3 py-2">95-105</td>
                      <td className="border border-white/10 px-3 py-2">Hearing protection, dust suppression</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Core drilling</td>
                      <td className="border border-white/10 px-3 py-2">85-95</td>
                      <td className="border border-white/10 px-3 py-2">Water suppression, hearing protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Angle grinder</td>
                      <td className="border border-white/10 px-3 py-2">90-100</td>
                      <td className="border border-white/10 px-3 py-2">Hearing protection, local screens</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mobile generator</td>
                      <td className="border border-white/10 px-3 py-2">75-85</td>
                      <td className="border border-white/10 px-3 py-2">Silenced unit, acoustic enclosure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hand tools (general)</td>
                      <td className="border border-white/10 px-3 py-2">70-80</td>
                      <td className="border border-white/10 px-3 py-2">Low-noise alternatives where available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Noise Control Hierarchy</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Elimination:</strong> Prefabricate off-site, use quieter methods</li>
                <li className="pl-1"><strong>Substitution:</strong> Select quieter equipment (e.g., hydraulic vs pneumatic)</li>
                <li className="pl-1"><strong>Engineering controls:</strong> Acoustic barriers, enclosures, silencers</li>
                <li className="pl-1"><strong>Administrative controls:</strong> Restrict hours, rotate workers, limit duration</li>
                <li className="pl-1"><strong>PPE:</strong> Hearing protection (last resort)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Good neighbour practice:</strong> Notify affected parties before noisy works, provide contact details for complaints, monitor and respond promptly to concerns.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Dust Control and Suppression */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Dust Control and Suppression
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dust from construction activities poses both occupational health risks (particularly
              respirable crystalline silica from concrete and masonry) and environmental nuisance
              issues. Effective control protects workers, neighbours, and the wider environment.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Silica Dust Hazard - Building Services</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Chasing into concrete, brick, and block releases silica dust</li>
                <li className="pl-1">Respirable crystalline silica (RCS) causes silicosis and lung cancer</li>
                <li className="pl-1">Workplace Exposure Limit: 0.1 mg/m3 (8-hour TWA)</li>
                <li className="pl-1">Water suppression or extraction required for all masonry work</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Water Suppression Methods</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">On-tool water feed systems</li>
                  <li className="pl-1">Misting sprays at point of work</li>
                  <li className="pl-1">Damping down access routes</li>
                  <li className="pl-1">Boundary misting systems</li>
                  <li className="pl-1">Wet cutting methods</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Extraction and Capture</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">On-tool extraction (M/H class vacuum)</li>
                  <li className="pl-1">Local exhaust ventilation (LEV)</li>
                  <li className="pl-1">Enclosed cutting stations</li>
                  <li className="pl-1">Dust screens and barriers</li>
                  <li className="pl-1">Covered skips and containers</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dust Control by Activity</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary Control</th>
                      <th className="border border-white/10 px-3 py-2 text-left">RPE Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chasing masonry</td>
                      <td className="border border-white/10 px-3 py-2">On-tool extraction + water</td>
                      <td className="border border-white/10 px-3 py-2">FFP3 minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Core drilling</td>
                      <td className="border border-white/10 px-3 py-2">Water feed to core bit</td>
                      <td className="border border-white/10 px-3 py-2">FFP3 if water fails</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cutting cable tray</td>
                      <td className="border border-white/10 px-3 py-2">Cold cut where possible</td>
                      <td className="border border-white/10 px-3 py-2">P2 for metal fume</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sweeping/cleaning</td>
                      <td className="border border-white/10 px-3 py-2">Vacuum, damp methods</td>
                      <td className="border border-white/10 px-3 py-2">FFP2/P2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Demolition work</td>
                      <td className="border border-white/10 px-3 py-2">Enclosure, misting</td>
                      <td className="border border-white/10 px-3 py-2">FFP3 + face fit test</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Dust Nuisance Prevention</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Cover stockpiles of dusty materials</li>
                <li className="pl-1">Sheet vehicles carrying dusty loads</li>
                <li className="pl-1">Install wheel wash for site exits</li>
                <li className="pl-1">Damp down haul routes in dry weather</li>
                <li className="pl-1">Position dust-generating activities away from boundaries</li>
                <li className="pl-1">Monitor dust levels at sensitive receptors</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>HSE enforcement:</strong> Silica dust exposure is a priority area for HSE inspectors. Expect scrutiny of control measures during site inspections.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Environmental Permits and ISO 14001 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Environmental Permits and ISO 14001 Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building services work may require various environmental permits depending on the
              activities undertaken and site location. ISO 14001 provides a framework for systematic
              environmental management that helps ensure compliance and drive continuous improvement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Permits That May Apply</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Permit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When Required</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Regulator</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Discharge consent</td>
                      <td className="border border-white/10 px-3 py-2">Surface water discharge to watercourse</td>
                      <td className="border border-white/10 px-3 py-2">Environment Agency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Abstraction licence</td>
                      <td className="border border-white/10 px-3 py-2">Taking water from surface/ground (&gt;20m³/day)</td>
                      <td className="border border-white/10 px-3 py-2">Environment Agency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Waste carrier registration</td>
                      <td className="border border-white/10 px-3 py-2">Transporting controlled waste</td>
                      <td className="border border-white/10 px-3 py-2">Environment Agency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part B permit</td>
                      <td className="border border-white/10 px-3 py-2">Standby generators &gt;1MW (air quality)</td>
                      <td className="border border-white/10 px-3 py-2">Local Authority</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Protected species licence</td>
                      <td className="border border-white/10 px-3 py-2">Work affecting bats, newts, etc.</td>
                      <td className="border border-white/10 px-3 py-2">Natural England</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ISO 14001 Environmental Management System Structure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Context:</strong> Understand organisation and stakeholder needs</li>
                <li className="pl-1"><strong>Leadership:</strong> Environmental policy and top management commitment</li>
                <li className="pl-1"><strong>Planning:</strong> Aspects/impacts register, objectives and targets</li>
                <li className="pl-1"><strong>Support:</strong> Resources, competence, awareness, communication</li>
                <li className="pl-1"><strong>Operation:</strong> Operational controls, emergency preparedness</li>
                <li className="pl-1"><strong>Performance evaluation:</strong> Monitoring, audit, management review</li>
                <li className="pl-1"><strong>Improvement:</strong> Nonconformity, corrective action, continual improvement</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pollution Prevention Measures</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Bunded storage for oils and chemicals</li>
                  <li className="pl-1">Spill kits at high-risk locations</li>
                  <li className="pl-1">Drip trays under plant and equipment</li>
                  <li className="pl-1">Drain covers and interceptors</li>
                  <li className="pl-1">Designated refuelling areas</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Response</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Environmental emergency plan</li>
                  <li className="pl-1">Spill response procedures</li>
                  <li className="pl-1">EA incident hotline: 0800 807060</li>
                  <li className="pl-1">Incident investigation and reporting</li>
                  <li className="pl-1">Corrective action to prevent recurrence</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Aspects for Building Services</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Energy consumption:</strong> Site power, vehicles, equipment</li>
                <li className="pl-1"><strong>Waste generation:</strong> Cable offcuts, packaging, hazardous waste</li>
                <li className="pl-1"><strong>Emissions to air:</strong> Vehicle exhaust, generator fumes, dust</li>
                <li className="pl-1"><strong>Emissions to water:</strong> Washdown, spills, contaminated drainage</li>
                <li className="pl-1"><strong>Noise:</strong> Power tools, plant, generators</li>
                <li className="pl-1"><strong>Resource use:</strong> Water, materials, consumables</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance obligation:</strong> Environmental permits are legal requirements. Operating without necessary permits is a criminal offence with potentially unlimited fines.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real-World Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Hospital Electrical Upgrade</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Installing new distribution boards in an occupied hospital wing. Works include chasing, core drilling, and temporary generator use.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Environmental considerations:</p>
                <p className="mt-2">1. Noise: Section 61 consent for restricted hours</p>
                <p>2. Dust: Full extraction with HEPA filtration (infection control)</p>
                <p>3. Waste: Segregate fluorescent tubes as hazardous waste</p>
                <p>4. Generator: Acoustic enclosure, position away from air intakes</p>
                <p className="mt-2 text-green-400">Result: Works completed without complaints or regulatory action</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Commercial Development Near River</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> New build commercial premises adjacent to a watercourse. Electrical installation includes external lighting and buried cables.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Environmental permit requirements:</p>
                <p className="mt-2">1. Discharge consent for surface water drainage</p>
                <p>2. Pollution prevention plan for construction phase</p>
                <p>3. Silt fencing to protect watercourse</p>
                <p>4. Emergency spill response procedures</p>
                <p className="mt-2 text-green-400">Key: Early engagement with Environment Agency avoided delays</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Waste Segregation Success</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Major refit project generating significant cable waste and packaging materials.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">SWMP implementation:</p>
                <p className="mt-2">Copper cable recovered: 2.3 tonnes @ 5,200/tonne = 11,960</p>
                <p>Steel tray recycled: 4.1 tonnes (free collection)</p>
                <p>Cardboard recycled: 1.8 tonnes (rebate 45/tonne = 81)</p>
                <p>General waste: 0.9 tonnes @ 180/tonne = 162</p>
                <p className="mt-2 text-green-400">Net position: 11,879 recovered vs 1,638 disposal if mixed</p>
                <p className="text-green-400">Diversion rate: 91% from landfill</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Compliance Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Prepare Site Waste Management Plan before works commence</li>
                <li className="pl-1">Check if Section 61 consent required for noisy works</li>
                <li className="pl-1">Verify waste carrier registration of all contractors</li>
                <li className="pl-1">Confirm destination sites are appropriately licensed</li>
                <li className="pl-1">Identify any environmental permits required</li>
                <li className="pl-1">Brief all operatives on environmental responsibilities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Noise upper action level: <strong>85 dB(A)</strong></li>
                <li className="pl-1">Silica WEL: <strong>0.1 mg/m3</strong></li>
                <li className="pl-1">Waste transfer note retention: <strong>2 years</strong></li>
                <li className="pl-1">Hazardous waste consignment note retention: <strong>3 years</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Mixing hazardous with general waste</strong> - Contaminates entire load</li>
                <li className="pl-1"><strong>No Section 61 consent</strong> - Vulnerable to Section 60 restrictions</li>
                <li className="pl-1"><strong>Dry sweeping</strong> - Spreads silica dust rather than controlling it</li>
                <li className="pl-1"><strong>Unlicensed waste carriers</strong> - Duty of care breach</li>
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
                <p className="font-medium text-white mb-1">Waste Management</p>
                <ul className="space-y-0.5">
                  <li>Hierarchy: Prevent, Reuse, Recycle, Recover, Dispose</li>
                  <li>SWMP: Plan, record, monitor throughout project</li>
                  <li>Duty of care: Environmental Protection Act 1990</li>
                  <li>Segregate: Metals, wood, hazardous, general</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Environmental Controls</p>
                <ul className="space-y-0.5">
                  <li>Noise: Section 61 consent, 85 dB upper action</li>
                  <li>Dust: Water suppression, extraction, RPE</li>
                  <li>Permits: Check EA requirements early</li>
                  <li>ISO 14001: Plan-Do-Check-Act cycle</li>
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
            <Link to="../h-n-c-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Site Management and CDM
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section6_5;
