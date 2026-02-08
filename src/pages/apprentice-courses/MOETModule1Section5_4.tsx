import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Environmental Legislation and Local Policies - MOET Module 1 Section 5.4";
const DESCRIPTION = "Comprehensive guide to environmental legislation for electrical maintenance technicians: Environmental Protection Act 1990, Environment Act 2021, Climate Change Act 2008, Building Regulations Part L, F-Gas Regulations, oil storage, noise regulations, pollution prevention and spill response aligned to ST1426.";

const quickCheckQuestions = [
  {
    id: "epa-1990",
    question: "What is the primary purpose of the Environmental Protection Act 1990?",
    options: [
      "To set electricity prices for industrial consumers",
      "To provide the framework for waste management, contaminated land control and statutory nuisance, protecting the environment from pollution",
      "To regulate the construction of new power stations",
      "To control the import of electrical equipment"
    ],
    correctIndex: 1,
    explanation: "The Environmental Protection Act 1990 is the cornerstone of UK environmental legislation. It establishes the framework for integrated pollution control, waste management (including the duty of care for waste), contaminated land remediation, and statutory nuisance. For maintenance technicians, Parts II (waste management) and III (statutory nuisance) are most directly relevant."
  },
  {
    id: "fgas-sf6",
    question: "Under the F-Gas Regulations, what is required when maintaining switchgear containing SF6?",
    options: [
      "SF6 can be vented to atmosphere during routine maintenance",
      "SF6 must be recovered by certified personnel, leaks detected and repaired, and records maintained",
      "SF6 switchgear can only be maintained by the manufacturer",
      "SF6 does not require any special handling procedures"
    ],
    correctIndex: 1,
    explanation: "The Fluorinated Greenhouse Gases Regulations (F-Gas Regulations) require that SF6 is recovered from switchgear during maintenance and decommissioning by certified personnel. Regular leak checks are mandatory for equipment containing SF6 above specified thresholds. Records of quantities installed, added, recovered and recycled must be maintained. Deliberate release of SF6 to atmosphere is a criminal offence."
  },
  {
    id: "oil-storage",
    question: "What is the minimum secondary containment requirement for oil storage under the Oil Storage Regulations?",
    options: [
      "A drip tray under the tap only",
      "A bund capable of containing 110% of the volume of the largest container or 25% of the total volume, whichever is greater",
      "No secondary containment is required if the container is double-skinned",
      "A bund capable of containing 50% of the total volume"
    ],
    correctIndex: 1,
    explanation: "The Oil Storage Regulations (Control of Pollution (Oil Storage) (England) Regulations 2001) require secondary containment (bunding) capable of holding 110% of the largest container within the bund, or 25% of the total volume of all containers, whichever is greater. The bund must be impermeable and able to resist the stored oil. This applies to transformer oil, hydraulic oil and any other oil stored on site above the threshold quantity."
  },
  {
    id: "pollution-incident",
    question: "If transformer oil spills into a surface water drain during maintenance, what should you do FIRST?",
    options: [
      "Continue working and clean up at the end of the day",
      "Contain the spill to prevent further spread, prevent oil entering the drain, and notify the Environment Agency immediately",
      "Cover the spill with sand and dispose of it in a general skip",
      "Dilute the oil with water from a hose"
    ],
    correctIndex: 1,
    explanation: "A spill of transformer oil into a watercourse or drain is a pollution incident that could cause serious environmental damage. Your immediate actions should be: (1) Stop the source of the spill; (2) Contain the spill using absorbent materials, drain mats or booms to prevent further spread; (3) Prevent oil entering drains using drain covers or absorbent socks; (4) Notify the Environment Agency incident hotline (0800 80 70 60) immediately. Never dilute oil with water or wash it into a drain."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The Environment Act 2021 introduced several new environmental provisions. Which of the following is a key feature?",
    options: [
      "It repealed all previous environmental legislation",
      "It established the Office for Environmental Protection (OEP) as an independent body to scrutinise environmental law and policy",
      "It removed all environmental obligations from businesses",
      "It transferred environmental regulation to local councils"
    ],
    correctAnswer: 1,
    explanation: "The Environment Act 2021 established the Office for Environmental Protection (OEP) as an independent body to hold government and public authorities to account on environmental law. It also introduced legally binding environmental targets, enhanced biodiversity requirements (biodiversity net gain for development), extended producer responsibility, and deposit return schemes. It builds upon rather than replaces the Environmental Protection Act 1990."
  },
  {
    id: 2,
    question: "The Climate Change Act 2008 (as amended) commits the UK to:",
    options: [
      "Reducing greenhouse gas emissions by 50% by 2050",
      "Achieving net zero greenhouse gas emissions by 2050",
      "Eliminating all use of fossil fuels by 2030",
      "Reducing electricity consumption by 80% by 2040"
    ],
    correctAnswer: 1,
    explanation: "The Climate Change Act 2008, amended in 2019, commits the UK to achieving net zero greenhouse gas emissions by 2050. This legally binding target drives policy across all sectors, including the built environment and industry. For maintenance technicians, this means increasing demand for energy efficiency improvements, electrification of heating, and management of fluorinated greenhouse gases like SF6."
  },
  {
    id: 3,
    question: "Building Regulations Part L relates to:",
    options: [
      "Structural safety of buildings",
      "Conservation of fuel and power — energy efficiency requirements for buildings",
      "Fire safety in buildings",
      "Drainage and waste disposal"
    ],
    correctAnswer: 1,
    explanation: "Building Regulations Approved Document L covers the conservation of fuel and power — it sets minimum energy efficiency standards for both new and existing buildings. Part L applies to electrical work including lighting (minimum efficacy requirements), controls (time and occupancy controls), and power (energy metering). When upgrading electrical systems as part of maintenance or refurbishment, Part L compliance may be required."
  },
  {
    id: 4,
    question: "SF6 has a global warming potential (GWP) of approximately:",
    options: [
      "100 times CO2",
      "1,000 times CO2",
      "23,500 times CO2",
      "100,000 times CO2"
    ],
    correctAnswer: 2,
    explanation: "SF6 has a global warming potential of approximately 23,500 — meaning one kilogram of SF6 released to the atmosphere has the same warming effect as 23,500 kilograms of CO2. Its atmospheric lifetime is over 3,200 years. This extreme potency is why the F-Gas Regulations strictly control its use, require leak detection and repair, mandate recovery during maintenance, and encourage the development of SF6-free switchgear alternatives."
  },
  {
    id: 5,
    question: "Under the Control of Pollution (Oil Storage) Regulations, which of the following applies to transformer oil storage?",
    options: [
      "Transformer oil is exempt from the regulations",
      "Oil must be stored in containers within impermeable bunds, with secure fittings, and away from drains and watercourses",
      "Oil can be stored in any container on bare ground",
      "Only containers larger than 10,000 litres need bunding"
    ],
    correctAnswer: 1,
    explanation: "The Oil Storage Regulations apply to the storage of any oil (including transformer oil) in containers above 200 litres. Oil must be stored in suitable containers within an impermeable bund. The bund must not have any drainage valve. Containers must have secure, tamper-proof fittings. The storage area must be positioned away from drains, watercourses and sensitive areas. Sight gauges must be properly maintained to prevent leaks."
  },
  {
    id: 6,
    question: "The Environmental Permitting (England and Wales) Regulations 2016 require an environmental permit for:",
    options: [
      "All electrical maintenance work",
      "Activities that have the potential to pollute the environment, including waste operations, industrial emissions, water discharge and flood risk activities",
      "Only activities involving radioactive materials",
      "Only activities in designated conservation areas"
    ],
    correctAnswer: 1,
    explanation: "The Environmental Permitting Regulations consolidate several pollution control regimes into a single permitting system. Activities that may require a permit include waste operations (storage, treatment, disposal), industrial installations with significant emissions, discharges to surface water or groundwater, and activities that could affect flood risk. Some lower-risk activities may be covered by exemptions rather than full permits."
  },
  {
    id: 7,
    question: "Noise from electrical maintenance activities is regulated under:",
    options: [
      "Only the Electricity at Work Regulations 1989",
      "The Control of Noise at Work Regulations 2005 (occupational) and the Environmental Protection Act 1990 Part III (environmental/nuisance)",
      "Only local council bylaws",
      "BS 7671 Wiring Regulations"
    ],
    correctAnswer: 1,
    explanation: "Noise from maintenance is regulated under two separate frameworks: The Control of Noise at Work Regulations 2005 protect workers from hearing damage (lower exposure action value 80 dB(A), upper 85 dB(A)). The Environmental Protection Act 1990 Part III deals with statutory nuisance — noise from sites that unreasonably disturbs neighbours. Maintenance technicians must comply with both: protecting their own hearing and avoiding nuisance to others."
  },
  {
    id: 8,
    question: "A site environmental management plan (SEMP) for a maintenance project should include:",
    options: [
      "Only a list of chemicals used on site",
      "Identification of environmental risks, pollution prevention measures, waste management procedures, emergency response plans, and monitoring arrangements",
      "Only the project budget and timeline",
      "Only the names of the maintenance technicians"
    ],
    correctAnswer: 1,
    explanation: "A SEMP is a practical document that identifies the environmental risks associated with the work (pollution, waste, noise, dust, contamination), sets out the prevention and control measures, defines waste management procedures, describes emergency response plans for spills and pollution incidents, and establishes monitoring and reporting arrangements. It is a comprehensive environmental control document for the project."
  },
  {
    id: 9,
    question: "If you discover asbestos-containing material while carrying out electrical maintenance in an older building, you should:",
    options: [
      "Remove it carefully and dispose of it in a general skip",
      "Stop work immediately, do not disturb the material, secure the area, and report to your supervisor and the duty holder for the building",
      "Cover it with tape and continue working",
      "Only report it if it is damaged"
    ],
    correctAnswer: 1,
    explanation: "If you encounter suspected asbestos during maintenance (common in older buildings — cable routes, switchrooms, boiler rooms), you must stop work immediately. Do not disturb the material. Seal off the area to prevent access. Report to your supervisor and the duty holder (who should have an asbestos management plan and register). Only licensed asbestos removal contractors can remove asbestos-containing materials. The Control of Asbestos Regulations 2012 apply."
  },
  {
    id: 10,
    question: "Corporate environmental responsibility for a maintenance company includes:",
    options: [
      "Only complying with the minimum legal requirements",
      "Complying with legislation, implementing an environmental management system, setting improvement targets, training staff, reporting performance and engaging with the supply chain on environmental standards",
      "Only recycling office waste",
      "Displaying an environmental policy poster in the office"
    ],
    correctAnswer: 1,
    explanation: "Corporate environmental responsibility goes beyond minimum legal compliance. It includes implementing an environmental management system (e.g., ISO 14001), setting measurable improvement targets (waste reduction, carbon reduction, energy efficiency), providing environmental training for all staff, transparently reporting environmental performance, and working with suppliers and subcontractors to improve environmental standards throughout the supply chain."
  },
  {
    id: 11,
    question: "The Environment Agency incident hotline number for reporting pollution incidents in England is:",
    options: [
      "999",
      "101",
      "0800 80 70 60",
      "111"
    ],
    correctAnswer: 2,
    explanation: "The Environment Agency incident hotline is 0800 80 70 60. This should be used to report pollution incidents (oil spills, chemical releases, fish kills, illegal waste disposal, water contamination) in England. In Scotland, contact SEPA on 0800 80 70 60 (same number). In Wales, contact Natural Resources Wales on 0300 065 3000. The hotline operates 24 hours a day, 7 days a week."
  },
  {
    id: 12,
    question: "Under the F-Gas Regulations, leak checks on switchgear containing SF6 must be carried out:",
    options: [
      "Only when a leak is suspected",
      "At specified intervals depending on the quantity of SF6, by certified personnel, with records maintained for at least 5 years",
      "Only when the equipment is decommissioned",
      "Monthly by any qualified electrician"
    ],
    correctAnswer: 1,
    explanation: "The F-Gas Regulations require leak checks on SF6-containing equipment at intervals determined by the quantity of gas: equipment containing 5 tonnes CO2 equivalent or more (approximately 0.21 kg SF6) must be checked at least annually, with more frequent checks for larger quantities. Checks must be carried out by certified personnel, and records must be maintained for at least 5 years. Automatic leak detection systems may extend the intervals between manual checks."
  }
];

const faqs = [
  {
    question: "What environmental legislation applies when I am working on a client's site?",
    answer: "All relevant environmental legislation applies regardless of whose site you are working on. As a contractor, you must comply with the Environmental Protection Act 1990 (duty of care for waste), COSHH Regulations (hazardous substances), the Oil Storage Regulations (if handling oils), F-Gas Regulations (if working with SF6 or refrigerants), and noise regulations. Additionally, you must comply with the client's site environmental rules and any conditions in their environmental permit. Ignorance of the client's requirements is not a defence."
  },
  {
    question: "Do I need to worry about F-Gas Regulations as an electrical maintenance technician?",
    answer: "Yes, if you work with HV or MV switchgear containing SF6, or if you maintain air conditioning or heat pump systems containing fluorinated refrigerants. The F-Gas Regulations require that SF6 is recovered by certified personnel during maintenance and decommissioning. If you work on refrigeration/air conditioning systems, you need an F-Gas handling certificate. Even if you do not handle these gases directly, you should understand the regulations to ensure specialists are engaged when needed."
  },
  {
    question: "What should be in my van's spill kit for environmental protection?",
    answer: "A basic maintenance van spill kit should include: oil-absorbent granules or pads (for transformer oil and hydraulic oil spills), a drain cover or mat (to prevent spills reaching surface water drains), nitrile gloves and safety glasses, waste bags for contaminated absorbent material, and the Environment Agency incident hotline number (0800 80 70 60). If you regularly work with batteries, include acid-neutralising absorbent. The kit should be easily accessible and regularly checked."
  },
  {
    question: "What is the difference between a statutory nuisance and a planning condition?",
    answer: "A statutory nuisance (under the Environmental Protection Act 1990 Part III) is a condition that is prejudicial to health or a nuisance — such as excessive noise, dust, fumes or artificial light from a premises. It can be enforced by the local authority through abatement notices. Planning conditions are requirements attached to a planning permission — they may include restrictions on operating hours, noise levels, lighting design, and waste management. Both may affect when and how you carry out maintenance work on a site."
  },
  {
    question: "How does environmental legislation connect to my ST1426 apprenticeship?",
    answer: "ST1426 requires maintenance technicians to understand and comply with environmental legislation and organisational policies. You must demonstrate knowledge of waste management regulations, pollution prevention, energy efficiency requirements, and sustainable working practices. This is assessed in your end-point assessment through knowledge tests and professional discussion. Showing that you understand the legal framework — not just the practical actions — demonstrates the depth of knowledge expected at technician level."
  }
];

const MOETModule1Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section5">
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
            <span>Module 1.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Environmental Legislation and Local Policies
          </h1>
          <p className="text-white/80">
            Understanding the legal framework for environmental protection in electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>EPA 1990:</strong> Waste duty of care, pollution control, statutory nuisance</li>
              <li className="pl-1"><strong>Environment Act 2021:</strong> OEP, biodiversity net gain, producer responsibility</li>
              <li className="pl-1"><strong>Climate Change Act:</strong> Net zero by 2050 — legally binding target</li>
              <li className="pl-1"><strong>F-Gas Regs:</strong> SF6 recovery, leak detection, certified personnel</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Oil storage:</strong> Transformer oil requires bunding and spill prevention</li>
              <li className="pl-1"><strong>SF6 switchgear:</strong> F-Gas certified technicians only</li>
              <li className="pl-1"><strong>Part L:</strong> Applies to lighting and controls upgrades</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to environmental and regulatory compliance KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the key provisions of the Environmental Protection Act 1990 and Environment Act 2021",
              "Describe the UK's net zero commitment under the Climate Change Act 2008",
              "Apply Building Regulations Part L requirements to electrical maintenance and upgrade work",
              "Understand F-Gas Regulations as they apply to SF6 in switchgear",
              "Implement oil storage and pollution prevention measures on maintenance sites",
              "Develop appropriate spill response plans for electrical oils and hazardous substances"
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

        {/* Section 01: Core Environmental Legislation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Core Environmental Legislation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              UK environmental legislation has developed over decades into a comprehensive framework
              that protects air, water, land and communities from pollution. As a maintenance technician,
              you must understand the key legislation that affects your work — not just to avoid
              prosecution, but because environmental responsibility is a professional obligation and
              a core part of the ST1426 standard.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Protection Act 1990 (EPA)</h3>
                <p className="text-sm text-white mb-2">
                  The EPA is the foundation of UK environmental law. Its key parts relevant to electrical
                  maintenance are:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Part I — Integrated Pollution Control:</strong> Controls emissions to air, water and land from industrial processes. Applies to large industrial installations where you may carry out maintenance</li>
                  <li className="pl-1"><strong>Part II — Waste Management:</strong> Establishes the duty of care for waste (Section 34), the offence of unlawful deposit (Section 33), and the licensing system for waste management. This part is directly relevant every time you create waste on site</li>
                  <li className="pl-1"><strong>Part III — Statutory Nuisance:</strong> Covers noise, dust, fumes, artificial light and other nuisances from premises. Your maintenance activities must not create a statutory nuisance for neighbouring occupants</li>
                  <li className="pl-1"><strong>Part IIA — Contaminated Land:</strong> Establishes the regime for identifying and remediating contaminated land. Relevant when working on brownfield sites or near historically contaminated areas</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Environment Act 2021</h3>
                <p className="text-sm text-white mb-2">
                  The Environment Act 2021 is the most significant piece of environmental legislation since
                  the EPA. It was enacted partly to replace EU environmental governance following Brexit and
                  introduces several new provisions:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Office for Environmental Protection (OEP):</strong> Independent body to scrutinise government environmental policy and enforce environmental law</li>
                  <li className="pl-1"><strong>Legally binding environmental targets:</strong> For air quality, water, biodiversity and resource efficiency</li>
                  <li className="pl-1"><strong>Biodiversity net gain:</strong> New developments must deliver a minimum 10% biodiversity net gain — affects construction and major refurbishment projects</li>
                  <li className="pl-1"><strong>Extended producer responsibility:</strong> Manufacturers bear greater responsibility for the end-of-life costs of their products — relevant to WEEE</li>
                  <li className="pl-1"><strong>Deposit return schemes:</strong> For drinks containers — may affect waste management on sites</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Climate Change Act 2008 (as amended 2019)</h3>
                <p className="text-sm text-white mb-2">
                  The Climate Change Act set the world's first legally binding national greenhouse gas
                  reduction target. As amended in 2019, it commits the UK to net zero emissions by 2050.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Net zero target:</strong> All sectors must reduce emissions to achieve net zero by 2050</li>
                  <li className="pl-1"><strong>Carbon budgets:</strong> Five-yearly caps on total UK emissions, enforced by the Climate Change Committee</li>
                  <li className="pl-1"><strong>Adaptation:</strong> Organisations must assess and plan for climate change impacts</li>
                  <li className="pl-1"><strong>Maintenance impact:</strong> Drives demand for energy efficiency, electrification of heating, SF6 phase-down, and low-carbon technologies</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Enforcement Powers</p>
              <p className="text-sm text-white">
                Environmental legislation is enforced by the Environment Agency in England, Natural Resources
                Wales, SEPA in Scotland, and NIEA in Northern Ireland. These regulators have extensive powers
                including prosecution (unlimited fines and imprisonment), civil sanctions (variable monetary
                penalties), enforcement notices, and stop notices. Local authorities enforce statutory nuisance
                provisions. Environmental offences carry a criminal record and can result in directors' personal
                liability.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Environmental legislation applies to everyone — not just large
              industrial companies. A sole trader electrician who fly-tips waste, allows oil to pollute
              a watercourse, or releases SF6 to atmosphere faces the same criminal penalties as a
              multinational corporation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Building Regulations Part L and Energy-Related Legislation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Building Regulations Part L and Energy-Related Legislation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Regulations Approved Document L (Conservation of fuel and power) sets minimum
              energy efficiency standards for buildings. While Part L primarily applies to new buildings
              and major renovations, it also has implications for maintenance work that involves replacing
              or upgrading controlled services — including lighting, heating controls, and mechanical
              ventilation systems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Requirements for Electrical Work</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Lighting efficacy:</strong> When replacing lighting systems, new luminaires must meet minimum
                  efficacy requirements (lumens per circuit watt). This effectively mandates LED or other high-efficiency
                  sources in most applications
                </li>
                <li className="pl-1">
                  <strong>Lighting controls:</strong> Replaced lighting systems must include appropriate controls —
                  time switches, occupancy sensors, daylight dimming — depending on the building type and space
                </li>
                <li className="pl-1">
                  <strong>Metering:</strong> Part L requires energy metering provisions for new and refurbished
                  buildings to enable monitoring of energy consumption
                </li>
                <li className="pl-1">
                  <strong>Consequential improvements:</strong> When extending or renovating a building above certain
                  thresholds, energy efficiency improvements to the existing building may be required
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Performance Certificates (EPCs)</h3>
              <p className="text-sm text-white mb-2">
                EPCs rate buildings from A (most efficient) to G (least efficient). The Minimum Energy
                Efficiency Standards (MEES) set minimum EPC ratings for rented buildings:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Current requirement:</strong> Commercial and residential rented properties must achieve a minimum EPC rating of E</li>
                <li className="pl-1"><strong>Future trajectory:</strong> The government has indicated that minimum standards will rise to EPC C for commercial properties, driving significant demand for energy efficiency upgrades</li>
                <li className="pl-1"><strong>Maintenance relevance:</strong> Energy efficiency improvements carried out during maintenance (LED lighting, controls upgrades, power factor correction) directly improve EPC ratings</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Efficiency Related Legislation</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Legislation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Relevance to Maintenance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building Regulations Part L</td>
                      <td className="border border-white/10 px-3 py-2">Minimum standards for lighting, controls and metering in new and refurbished buildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ESOS Regulations</td>
                      <td className="border border-white/10 px-3 py-2">Large organisations must carry out energy audits — maintenance data feeds into these assessments</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SECR Regulations</td>
                      <td className="border border-white/10 px-3 py-2">Companies must report energy consumption and carbon emissions — maintenance affects these figures</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EU Ecodesign (retained UK law)</td>
                      <td className="border border-white/10 px-3 py-2">Minimum efficiency classes for motors (IE3/IE4), fans, pumps, lighting — affects replacement specifications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MEES Regulations</td>
                      <td className="border border-white/10 px-3 py-2">Minimum EPC rating for rented properties — drives demand for efficiency upgrades</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> When specifying replacement motors during maintenance, you must
              now comply with Ecodesign requirements. Since 1 July 2023, single-speed three-phase motors
              from 0.75 kW to 200 kW must be IE3 efficiency class (IE4 for 75-200 kW). Do not replace a
              failed motor with a lower efficiency unit — it may be illegal and it will increase energy costs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: F-Gas Regulations and SF6 in Switchgear */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            F-Gas Regulations and SF6 in Switchgear
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Fluorinated Greenhouse Gases Regulations (commonly called the F-Gas Regulations) control
              the use, handling and disposal of fluorinated greenhouse gases, including SF6 (sulphur
              hexafluoride) used in medium and high-voltage switchgear. SF6 is the most potent greenhouse
              gas known — with a global warming potential 23,500 times that of CO2 and an atmospheric
              lifetime exceeding 3,200 years. Even small releases have a disproportionate climate impact.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SF6 in Electrical Switchgear</h3>
              <p className="text-sm text-white mb-2">
                SF6 is used as an insulating and arc-quenching medium in gas-insulated switchgear (GIS)
                and ring main units (RMUs) at voltages from 6.6 kV to 400 kV and above. Its excellent
                dielectric properties allow compact switchgear designs, but its environmental impact
                is driving a transition to alternative technologies.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Applications:</strong> GIS, RMUs, circuit breakers, current transformers, bushings</li>
                <li className="pl-1"><strong>Quantity:</strong> A typical 11 kV RMU may contain 1-5 kg of SF6; large 400 kV GIS substations may contain hundreds of kilograms</li>
                <li className="pl-1"><strong>Alternatives:</strong> Manufacturers are developing SF6-free switchgear using clean air, fluoronitrile (C4F7N) and fluoroketone (C5F10O) mixtures</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">F-Gas Regulation Requirements for SF6</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Leak detection:</strong> Equipment containing SF6 above 5 tonnes CO2e (approx. 0.21 kg SF6) must have regular leak checks at intervals depending on quantity</li>
                <li className="pl-1"><strong>Leak repair:</strong> Detected leaks must be repaired without undue delay, with a follow-up check within 1 month</li>
                <li className="pl-1"><strong>Recovery:</strong> SF6 must be recovered during maintenance and decommissioning — never vented to atmosphere</li>
                <li className="pl-1"><strong>Certification:</strong> Personnel handling SF6 must hold appropriate certification</li>
                <li className="pl-1"><strong>Record keeping:</strong> Operators must maintain records of SF6 quantities installed, added, recovered, recycled, reclaimed and destroyed — records kept for 5 years minimum</li>
                <li className="pl-1"><strong>Labelling:</strong> Equipment containing SF6 must be labelled with the type and quantity of gas</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Deliberate Release is a Criminal Offence</p>
              <p className="text-sm text-white">
                The deliberate release of SF6 to the atmosphere is a criminal offence under the F-Gas
                Regulations. This includes venting gas during maintenance rather than using recovery
                equipment. Penalties include unlimited fines. Even accidental releases through poor
                maintenance must be reported and recorded. If you discover that SF6 equipment has a leak,
                report it immediately and arrange certified repair.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SF6 Phase-Down</h3>
              <p className="text-sm text-white">
                The UK (and EU) are progressively restricting the use of SF6 in new equipment. The trend
                is towards SF6-free switchgear using alternative insulating media. As a maintenance technician,
                you should expect to encounter both legacy SF6 equipment (requiring certified maintenance and
                eventual decommissioning) and new SF6-free technologies. Understanding both is important for
                your career development and for supporting your employer's environmental objectives.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> If you are asked to work on SF6-containing switchgear and you
              do not hold the appropriate F-Gas certification, you must refuse and explain why. Working
              on SF6 equipment without certification is not only illegal — it is potentially dangerous
              due to the toxic decomposition products of SF6 after arcing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Oil Storage, Pollution Prevention and Spill Response */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Oil Storage, Pollution Prevention and Spill Response
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Oil is one of the most common pollutants in the UK environment. Transformer oil, hydraulic
              oil, lubricating oil and diesel fuel are all present on many maintenance sites. A single
              litre of oil can contaminate one million litres of drinking water. The legal and environmental
              consequences of an oil spill are severe, and as a maintenance technician handling or working
              near oil-filled equipment, you must understand your obligations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Oil Storage Regulations</h3>
              <p className="text-sm text-white mb-2">
                The Control of Pollution (Oil Storage) (England) Regulations 2001 set out requirements
                for the storage of oil in containers above 200 litres:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Containers:</strong> Must be of sufficient strength and structural integrity to prevent leakage in normal use</li>
                <li className="pl-1"><strong>Bunding:</strong> Secondary containment (bund) must hold 110% of the largest container or 25% of total volume, whichever is greater</li>
                <li className="pl-1"><strong>Bund construction:</strong> Impermeable to water and oil, with no drainage valve</li>
                <li className="pl-1"><strong>Fittings:</strong> Taps, valves, sight gauges and fill pipes must be within the bund and protected from damage</li>
                <li className="pl-1"><strong>Location:</strong> Away from drains, watercourses, sensitive areas; on stable, impermeable ground</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pollution Prevention for Electrical Maintenance</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Transformer maintenance:</strong> Use drip trays under any connection being broken; have absorbent material ready; check bund condition before oil-fill or oil-drain operations</li>
                <li className="pl-1"><strong>Cable installation:</strong> When pulling cables near watercourses, use containment measures for cable-pulling lubricant</li>
                <li className="pl-1"><strong>Generator maintenance:</strong> Diesel generators have fuel tanks and lubricating oil — check bunding, inspect for leaks, and have spill kits available</li>
                <li className="pl-1"><strong>Hydraulic equipment:</strong> Hydraulic access platforms and lifting equipment contain oil that can leak — inspect hoses and connections before use</li>
                <li className="pl-1"><strong>Vehicle drips:</strong> Your maintenance van or work vehicle can drip oil and fuel — be aware of parking location relative to drains</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Spill Response Procedure</p>
              <p className="text-sm text-white mb-2">
                If an oil or chemical spill occurs during maintenance, follow the STOP procedure:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>S — Stop the source:</strong> Close valves, stem the flow, prevent further release</li>
                <li className="pl-1"><strong>T — Tell someone:</strong> Report to your supervisor. If the spill reaches or threatens a watercourse or drain, call the Environment Agency on 0800 80 70 60</li>
                <li className="pl-1"><strong>O — Obstruct the flow:</strong> Deploy drain covers, absorbent booms, earth bunds to contain the spill and prevent it reaching drains or water</li>
                <li className="pl-1"><strong>P — Prevent recurrence:</strong> Investigate the cause. Implement corrective actions to prevent a similar incident</li>
              </ul>
              <p className="text-sm text-white mt-2">
                <strong>Never</strong> wash oil into a drain with water. Never use detergent to disperse an oil
                spill — this makes it harder to recover and increases environmental damage. Always contain,
                absorb and recover.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Noise Regulations</h3>
              <p className="text-sm text-white mb-2">
                Noise from maintenance activities is controlled by two separate regulatory frameworks:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Occupational noise:</strong> The Control of Noise at Work Regulations 2005 protect workers. Lower exposure action value: 80 dB(A) daily average (provide hearing protection). Upper action value: 85 dB(A) (hearing protection mandatory, exposure reduction required). Exposure limit: 87 dB(A) (must not be exceeded)</li>
                <li className="pl-1"><strong>Environmental noise:</strong> The EPA 1990 Part III covers statutory nuisance from noise. Local planning conditions may also restrict hours and noise levels. Best practice: Section 61 of the Control of Pollution Act 1974 allows you to agree a 'prior consent' with the local authority for noisy works</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Environmental incidents must be reported and recorded. Even if a spill
              is contained and cleaned up quickly, record it as a near miss. Analysis of near misses prevents
              future incidents that could result in prosecution, environmental damage and reputational harm.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Site Environmental Management and Corporate Responsibility */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Site Environmental Management and Corporate Responsibility
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond individual legal obligations, organisations are increasingly expected to demonstrate
              broader environmental responsibility. Clients, regulators and the public expect maintenance
              companies to have robust environmental management systems, set improvement targets, and
              report on their environmental performance. Understanding this context helps you appreciate
              why environmental compliance matters and how your actions contribute to the bigger picture.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Site Environmental Management Plans (SEMPs)</h3>
              <p className="text-sm text-white mb-2">
                For maintenance projects — particularly those on sensitive sites or involving hazardous
                substances — a site environmental management plan (SEMP) sets out how environmental
                risks will be managed:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Risk identification:</strong> What environmental risks does the work create? (Oil spill, chemical release, dust, noise, waste)</li>
                <li className="pl-1"><strong>Prevention measures:</strong> How will each risk be prevented? (Bunding, containment, dust suppression, noise barriers)</li>
                <li className="pl-1"><strong>Waste management:</strong> How will waste be segregated, stored, documented and disposed of?</li>
                <li className="pl-1"><strong>Emergency response:</strong> What are the procedures for spills, releases and pollution incidents?</li>
                <li className="pl-1"><strong>Monitoring:</strong> How will environmental performance be checked during the works?</li>
                <li className="pl-1"><strong>Responsibilities:</strong> Who is responsible for each element of the SEMP?</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">ISO 14001 Environmental Management</h3>
                <p className="text-sm text-white">
                  ISO 14001 is the international standard for environmental management systems (EMS). Many
                  maintenance companies and their clients are certified to ISO 14001, which requires the
                  organisation to identify its environmental impacts, set objectives and targets for
                  improvement, implement operational controls, monitor performance, and carry out regular
                  management reviews. As a technician working for an ISO 14001 certified company, you must
                  follow the EMS procedures and contribute to the environmental objectives.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Permits</h3>
                <p className="text-sm text-white">
                  Some sites where you carry out maintenance will operate under environmental permits
                  issued by the Environment Agency. These permits set conditions for emissions, waste
                  management, noise and other environmental aspects. When working on a permitted site,
                  you must understand and comply with any permit conditions that affect your work — for
                  example, restrictions on hours of operation, requirements for pollution prevention
                  measures, or specific waste handling procedures.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Corporate Environmental Responsibility</h3>
              <p className="text-sm text-white mb-2">
                Modern businesses are expected to go beyond minimum legal compliance. Corporate environmental
                responsibility includes:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Carbon reporting:</strong> Measuring and reporting the company's carbon footprint under SECR or voluntary schemes</li>
                <li className="pl-1"><strong>Net zero commitments:</strong> Setting science-based targets for reducing greenhouse gas emissions</li>
                <li className="pl-1"><strong>Supply chain engagement:</strong> Working with suppliers and subcontractors to improve environmental performance</li>
                <li className="pl-1"><strong>Staff training:</strong> Ensuring all employees understand their environmental responsibilities</li>
                <li className="pl-1"><strong>Continuous improvement:</strong> Setting and reviewing annual environmental performance targets</li>
                <li className="pl-1"><strong>Transparency:</strong> Publishing environmental performance data in annual reports and on company websites</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Many major clients now require contractors to demonstrate environmental
              competence as a condition of tendering for maintenance contracts. PAS 2080 (carbon management
              in infrastructure), ISO 14001, and sector-specific environmental qualifications are increasingly
              required. Building your environmental knowledge is not just about compliance — it is about
              employability.
            </p>
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
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>EPA 1990 — Waste, pollution, statutory nuisance</li>
                  <li>Environment Act 2021 — OEP, biodiversity, targets</li>
                  <li>Climate Change Act 2008 — Net zero by 2050</li>
                  <li>Building Regulations Part L — Energy efficiency</li>
                  <li>F-Gas Regulations — SF6 recovery, leak checks</li>
                  <li>Oil Storage Regulations — Bunding, containment</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Emergency Numbers</p>
                <ul className="space-y-0.5">
                  <li>Environment Agency — 0800 80 70 60</li>
                  <li>SEPA (Scotland) — 0800 80 70 60</li>
                  <li>NRW (Wales) — 0300 065 3000</li>
                  <li>HSE — 0345 300 9923</li>
                  <li>Emergency services — 999</li>
                  <li>Spill procedure — STOP (Stop, Tell, Obstruct, Prevent)</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Energy Efficiency
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section5-5">
              Next: Sustainable Work Practices
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section5_4;
