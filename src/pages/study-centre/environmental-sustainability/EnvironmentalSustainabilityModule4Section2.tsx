import { ArrowLeft, Droplets, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "cement-washout-ph",
    question:
      "Why is cement and concrete washout water particularly dangerous to watercourses?",
    options: [
      "It is highly alkaline with a pH of 11-13, which kills aquatic life rapidly",
      "It contains high levels of bacteria that infect fish populations",
      "It is radioactive and contaminates groundwater for decades",
      "It has a very low pH that dissolves riverbed rocks",
    ],
    correctIndex: 0,
    explanation:
      "Cement and concrete washout water is highly alkaline, typically with a pH of 11-13. This extreme alkalinity is lethal to aquatic life — even small quantities can kill fish, invertebrates, and plants within minutes. It must NEVER be washed into drains or watercourses. Designated washout areas with containment and neutralisation are required on every construction site.",
  },
  {
    id: "bunding-requirement",
    question:
      "Under the Oil Storage Regulations 2001, what is the minimum bund capacity required for a single oil container?",
    options: [
      "50% of the container's capacity",
      "75% of the container's capacity",
      "110% of the largest container's capacity",
      "200% of the container's capacity",
    ],
    correctIndex: 2,
    explanation:
      "The Oil Storage Regulations 2001 require that bunding must be capable of holding 110% of the capacity of the largest container within the bund, or 25% of the total storage capacity — whichever is greater. This ensures that even a complete failure of the largest container can be contained without overflow.",
  },
  {
    id: "ea-incident-hotline",
    question:
      "What is the Environment Agency incident hotline number that must be called to report a water pollution incident?",
    options: [
      "0800 80 70 60",
      "999",
      "0300 123 1110",
      "111",
    ],
    correctIndex: 0,
    explanation:
      "The Environment Agency incident hotline is 0800 80 70 60 and must be called immediately to report any water pollution incident. This is a 24-hour service. Failure to report a pollution incident is itself an offence. The number should be displayed prominently on every construction site and included in all emergency spill response procedures.",
  },
];

const faqs = [
  {
    question:
      "What should I do if I see a colleague washing concrete or cement into a drain?",
    answer:
      "You must intervene immediately and stop the activity. Washing cement or concrete into any drain — whether surface water or foul — is a criminal offence under the Water Resources Act 1991 and the Environmental Permitting Regulations. The alkalinity (pH 11-13) of cement washout kills aquatic life within minutes. Direct the colleague to the designated washout area on site. If material has already entered a drain or watercourse, treat it as a pollution incident: contain what you can, report to your site manager immediately, and ensure the Environment Agency is notified on 0800 80 70 60. Record the incident and co-operate fully with any investigation. Remember, ignorance of the rules is not a defence.",
  },
  {
    question:
      "Do the Oil Storage Regulations apply to small quantities of fuel on construction sites?",
    answer:
      "The Oil Storage Regulations 2001 apply to any oil storage above 200 litres in fixed tanks or containers at commercial or industrial premises. However, even where the regulations do not technically apply (e.g. smaller volumes or mobile bowsers), you still have a general duty of care under the Environmental Permitting Regulations and the Water Resources Act 1991 to prevent pollution of controlled waters. Best practice is to bund ALL oil and fuel storage on site regardless of quantity, use drip trays under all connections and dispensing points, keep spill kits readily available, and ensure all operatives know the spill response procedure. The cost of a small drip tray is negligible compared to the cost of a prosecution for polluting a watercourse.",
  },
  {
    question:
      "What is the difference between temporary and permanent Sustainable Drainage Systems (SuDS)?",
    answer:
      "Temporary SuDS are installed during the construction phase to manage surface water runoff and prevent sediment-laden water from leaving the site. Examples include silt fences, settlement lagoons, temporary swales, and straw bale barriers. They are designed to be removed or adapted once construction is complete. Permanent SuDS are designed into the completed development to manage surface water for the lifetime of the project. Examples include permeable paving, rain gardens, green roofs, detention basins, swales, and wetlands. Permanent SuDS follow the treatment train principle — managing water quality and quantity through a series of stages. Both temporary and permanent SuDS are important: temporary SuDS protect watercourses during the high-risk construction phase, while permanent SuDS provide ongoing sustainable drainage.",
  },
  {
    question:
      "Can I be personally prosecuted for causing water pollution, or is it only the company that is liable?",
    answer:
      "Both individuals AND companies can be prosecuted. Under Section 85 of the Water Resources Act 1991, it is an offence to cause or knowingly permit any poisonous, noxious or polluting matter to enter controlled waters. This applies to any person — which includes individual workers, supervisors, and site managers, as well as the company. The penalties are severe: unlimited fines and up to two years' imprisonment on summary conviction, or up to five years on indictment. In practice, the Environment Agency often prosecutes both the company and the individuals directly responsible. Directors and senior managers can also be prosecuted under corporate liability provisions if pollution occurs due to their consent, connivance, or neglect. Taking reasonable precautions and exercising due diligence is your best defence.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is NOT a common source of water pollution from construction sites?",
    options: [
      "Silt and sediment from earthworks and exposed ground",
      "Cement and concrete washout water entering surface drains",
      "Treated and filtered rainwater from site roof drainage",
      "Oil and fuel leaks from plant and machinery",
    ],
    correctAnswer: 2,
    explanation:
      "Common sources of water pollution from construction sites include silt/sediment runoff, cement/concrete washout (highly alkaline), oils and fuels, chemicals, sewage from welfare facilities, and dewatering discharge. Treated and filtered rainwater from roof drainage is not a typical pollutant — in fact, managing clean rainwater separately is good practice.",
  },
  {
    id: 2,
    question:
      "Under Section 85 of the Water Resources Act 1991, what is the maximum penalty for causing water pollution?",
    options: [
      "A fixed penalty notice of up to £1,000",
      "Unlimited fine and/or imprisonment",
      "A formal caution with no further action",
      "A maximum fine of £20,000",
    ],
    correctAnswer: 1,
    explanation:
      "Section 85 of the Water Resources Act 1991 makes it an offence to cause or knowingly permit polluting matter to enter controlled waters. The penalties are unlimited fines and/or imprisonment — up to 2 years on summary conviction or up to 5 years on indictment. The offence can be committed by both companies and individuals.",
  },
  {
    id: 3,
    question:
      "What does GPP5 provide guidance on?",
    options: [
      "Electrical installations in wet environments",
      "Works and maintenance in or near water",
      "Fire safety procedures on construction sites",
      "Noise pollution limits for construction plant",
    ],
    correctAnswer: 1,
    explanation:
      "GPP5 (Guidance for Pollution Prevention 5) is Environment Agency guidance covering works and maintenance in or near water. It provides practical advice on planning works near watercourses, seasonal restrictions to protect aquatic life, protected species considerations, and pollution prevention measures for activities that could affect water quality.",
  },
  {
    id: 4,
    question:
      "Which silt control measure works by allowing suspended particles to settle out of water before it is discharged?",
    options: [
      "A silt fence installed across the slope",
      "A settlement lagoon or settlement tank",
      "A geotextile wrap around a drainage outlet",
      "A straw bale barrier across a ditch",
    ],
    correctAnswer: 1,
    explanation:
      "A settlement lagoon or settlement tank works by slowing water flow sufficiently to allow suspended silt and sediment particles to settle out under gravity before the clarified water is discharged. The settled material (sludge) is periodically removed. Settlement lagoons must be sized correctly for the expected flow rate — undersized lagoons are ineffective because the water passes through too quickly for settlement to occur.",
  },
  {
    id: 5,
    question:
      "Under the Oil Storage Regulations 2001, if you have multiple containers in a single bund, what is the minimum bund capacity?",
    options: [
      "110% of the smallest container or 10% of total capacity",
      "110% of the largest container or 25% of total capacity, whichever is greater",
      "50% of the total combined storage capacity",
      "Equal to the total combined capacity of all containers",
    ],
    correctAnswer: 1,
    explanation:
      "The Oil Storage Regulations 2001 require bunding capable of holding 110% of the largest container OR 25% of the total storage capacity — whichever is GREATER. This ensures that even in a worst-case scenario (complete failure of the largest container, plus rainwater accumulation), the bund can contain the spill without overflowing into the environment.",
  },
  {
    id: 6,
    question:
      "Why must cement and concrete washout NEVER be discharged into drains or watercourses?",
    options: [
      "Because it has a pleasant smell that attracts vermin to the watercourse",
      "Because its high alkalinity (pH 11-13) is lethal to aquatic life",
      "Because it improves water clarity and confuses aquatic organisms",
      "Because it is mildly acidic and dissolves concrete bridge foundations",
    ],
    correctAnswer: 1,
    explanation:
      "Cement and concrete washout water has a pH of 11-13, making it highly alkaline. This extreme alkalinity is lethal to aquatic life — fish, invertebrates, and aquatic plants can be killed within minutes of exposure. Even small quantities can cause devastating environmental damage. All washout must be directed to designated containment areas where the pH can be neutralised before controlled disposal.",
  },
  {
    id: 7,
    question:
      "A fuel spill occurs on site near a watercourse. After containing the spill, what is the FIRST reporting action you should take?",
    options: [
      "Wait until the end of the shift and include it in the daily site report",
      "Call the Environment Agency incident hotline on 0800 80 70 60 immediately",
      "Post a notice on the site safety board and inform colleagues at the next toolbox talk",
      "Contact the fuel supplier to arrange replacement of the spilled fuel",
    ],
    correctAnswer: 1,
    explanation:
      "After containing a spill near a watercourse, you must call the Environment Agency incident hotline on 0800 80 70 60 immediately. This is a 24-hour service. Prompt reporting allows the EA to assess the risk, advise on further action, and deploy resources if needed. Failure to report a pollution incident is itself an offence. Do not wait — minutes matter when pollutants are near or entering water.",
  },
  {
    id: 8,
    question:
      "Which of the following best describes the 'treatment train' principle in Sustainable Drainage Systems (SuDS)?",
    options: [
      "Using a single large detention basin to store all surface water",
      "Pumping all surface water directly to the nearest watercourse",
      "Managing water quality and quantity through a series of progressive treatment stages",
      "Diverting all rainfall into the foul sewer system for treatment at a sewage works",
    ],
    correctAnswer: 2,
    explanation:
      "The treatment train is a fundamental SuDS principle where surface water passes through a series of progressive treatment stages — from source control (e.g. permeable paving), through local management (e.g. swales and filter strips), to regional management (e.g. detention basins and wetlands). Each stage removes more pollutants and reduces flow rates, so that by the time water reaches a watercourse it is cleaner and flows at a more natural rate.",
  },
];

const EnvironmentalSustainabilityModule4Section2 = () => {
  useSEO({
    title: "Water Pollution Prevention | Environmental & Sustainability Module 4.2",
    description:
      "Learn about water pollution prevention on construction sites including legal framework, silt control, oil storage, cement washout, emergency spill response, and sustainable drainage systems (SuDS).",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 mb-4">
            <Droplets className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-emerald-400">MODULE 4</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Water Pollution Prevention
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Understanding the sources of water pollution on construction sites,
            the legal framework, control measures for silt, oil, and cement,
            emergency spill response, and sustainable drainage systems
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Pollutants:</strong> silt,
                  cement washout, oils, chemicals, sewage, and dewatering discharge
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Legal:</strong> unlimited fines
                  and imprisonment under the Water Resources Act 1991
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Cement pH:</strong> 11-13 —
                  highly alkaline, lethal to aquatic life within minutes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Bunding:</strong> 110% of
                  largest container or 25% total — whichever is greater
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="font-semibold text-emerald-400/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Spill kits:</strong> know where
                  they are, what they contain, and how to use them
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">EA hotline:</strong> 0800 80 70
                  60 — report ALL pollution incidents immediately
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Drains:</strong> NEVER pour
                  cement, oil, chemicals, or silty water into any drain
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">SuDS:</strong> temporary
                  drainage controls must be in place before earthworks begin
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4">
            By the end of this section, you will be able to:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Identify the main sources of water pollution from construction sites and explain why each is harmful",
              "Describe the legal framework including the Water Resources Act 1991 and Environmental Permitting Regulations",
              "Explain the key principles of GPP5 for works in or near water, including seasonal restrictions",
              "Select and implement appropriate silt and sediment control measures for different site conditions",
              "Apply the Oil Storage Regulations 2001 including bunding requirements and refuelling procedures",
              "Explain why cement and concrete washout must be contained and how to manage it on site",
              "Carry out an emergency spill response including containment, reporting, and clean-up",
              "Describe the principles of Sustainable Drainage Systems (SuDS) and the treatment train approach",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Water Pollution from Construction */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">01</span>
              Water Pollution from Construction
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Construction sites are one of the{" "}
                <strong className="text-white">most significant sources of water pollution</strong>{" "}
                in the UK. The Environment Agency estimates that construction-related pollution
                incidents account for a disproportionately high number of serious water quality
                incidents each year. Understanding the sources of pollution is the first step to
                preventing it.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Key Principle
                </h3>
                <p className="text-white/80 text-sm">
                  It is{" "}
                  <strong className="text-white">
                    always cheaper to prevent pollution than to clean it up
                  </strong>
                  . A single pollution incident can result in prosecution, unlimited fines,
                  imprisonment, site shutdown orders, clean-up costs running to hundreds of
                  thousands of pounds, reputational damage, and loss of future contracts. Prevention
                  is not just good environmental practice — it is essential business practice.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  Main Sources of Water Pollution on Construction Sites
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Silt and sediment:</strong>{" "}
                      the single most common cause of water pollution from construction sites.
                      Exposed ground, earthworks, stockpiles, haul roads, and vehicle tracking
                      all generate fine sediment that is carried by rainwater into drains and
                      watercourses. Silt smothers riverbeds, destroys spawning gravels, blocks
                      fish gills, and reduces light penetration needed by aquatic plants.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Cement and concrete washout:</strong>{" "}
                      cement washout water is{" "}
                      <strong className="text-white">highly alkaline with a pH of 11-13</strong>.
                      This extreme alkalinity kills aquatic life rapidly — fish, invertebrates,
                      and plants can die within minutes of exposure. Sources include concrete
                      mixer wash-down, chute cleaning, tool washing, and wet cutting of concrete
                      and blockwork.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Oils, fuels, and hydraulic fluids:</strong>{" "}
                      leaks and spills from plant, machinery, generators, fuel stores, and
                      refuelling operations. Even small quantities of oil are highly visible on
                      water surfaces and toxic to aquatic life. One litre of oil can contaminate
                      one million litres of water.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Chemicals:</strong>{" "}
                      paints, solvents, adhesives, mould oils, curing compounds, cleaning agents,
                      and preservatives. Many of these are toxic to aquatic life even in very small
                      concentrations and can persist in the environment.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Sewage from welfare facilities:</strong>{" "}
                      improperly connected or maintained portaloos, welfare units, and temporary
                      sewage systems can discharge raw sewage into surface water drains or
                      watercourses, causing oxygen depletion and bacterial contamination.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Dewatering discharge:</strong>{" "}
                      pumping groundwater or accumulated rainwater from excavations can discharge
                      silt-laden, contaminated, or chemically-altered water directly into drains
                      or watercourses if not properly managed and treated before discharge.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">
                    Surface Water Drains Go Directly to Watercourses
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Many workers assume that all drains go to a sewage treatment works. They do
                  not.{" "}
                  <strong className="text-white">
                    Surface water drains (often marked with a round cover) discharge directly
                    to rivers, streams, and ponds with NO treatment
                  </strong>
                  . Anything that enters a surface water drain enters the environment immediately.
                  Foul drains (typically rectangular covers) go to sewage works — but even these
                  must not receive construction pollutants. If you are unsure which type of drain
                  is present, assume it is surface water and treat it accordingly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Legal Framework */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">02</span>
              Legal Framework
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Water pollution is taken extremely seriously by regulators in England and Wales.
                The legal framework provides the Environment Agency with{" "}
                <strong className="text-white">powerful enforcement tools</strong>, and penalties
                for pollution offences are among the most severe in environmental law.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Water Resources Act 1991 — Section 85
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  Section 85 of the Water Resources Act 1991 creates the principal offence of
                  water pollution. It is an offence to:
                </p>
                <ul className="text-white/70 space-y-2 text-sm ml-4">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cause</strong> any poisonous,
                      noxious, or polluting matter to enter controlled waters
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Knowingly permit</strong> any
                      such matter to enter controlled waters
                    </span>
                  </li>
                </ul>
                <p className="text-white/70 text-sm mt-3">
                  <strong className="text-white">Controlled waters</strong> include rivers,
                  streams, lakes, ponds, canals, estuaries, coastal waters, and{" "}
                  <strong className="text-white">groundwater</strong>. The penalties are{" "}
                  <strong className="text-red-300">unlimited fines</strong> and/or{" "}
                  <strong className="text-red-300">imprisonment</strong> — up to 2 years on
                  summary conviction, or up to 5 years on indictment.
                </p>
              </div>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">
                  Key Legislation Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Water Resources Act 1991
                      </p>
                      <p className="text-white/60">
                        The principal Act covering pollution of controlled waters. Section 85
                        creates the offence of causing or knowingly permitting pollution.
                        Section 161 gives the EA power to carry out remedial works and recover
                        costs from the polluter.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Environmental Permitting Regulations 2016
                      </p>
                      <p className="text-white/60">
                        Require an environmental permit for any discharge to controlled waters
                        or groundwater. Operating without a permit where one is required is a
                        criminal offence with unlimited fines.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Environmental Damage Regulations 2015
                      </p>
                      <p className="text-white/60">
                        Require those responsible for environmental damage to take preventive
                        and remedial action. The polluter pays principle — the cost of clean-up
                        falls on the person or company that caused the pollution.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Oil Storage Regulations 2001
                      </p>
                      <p className="text-white/60">
                        Specific regulations covering the storage of oil on commercial and
                        industrial premises, including mandatory bunding requirements, container
                        standards, and maintenance obligations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">
                    Strict Liability
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  The offence of &ldquo;causing&rdquo; water pollution is a{" "}
                  <strong className="text-white">strict liability offence</strong> — the
                  prosecution does not need to prove that you intended to cause pollution or
                  were negligent. If your actions caused polluting matter to enter controlled
                  waters, you have committed the offence regardless of intent. The only
                  question is whether your actions were the cause of the pollution. Both{" "}
                  <strong className="text-white">individuals and companies</strong> can be
                  prosecuted.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: GPP5 — Works and Maintenance in or Near Water */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">03</span>
              GPP5: Works and Maintenance in or Near Water
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">GPP5</strong> (Guidance for Pollution Prevention 5)
                is published by the Environment Agency and provides practical guidance for anyone
                carrying out works or maintenance in or near water. It is essential reading for
                construction projects that involve work within or adjacent to rivers, streams,
                ponds, lakes, canals, or other watercourses.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Key GPP5 Principles
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Planning:</strong>{" "}
                      all works near watercourses must be carefully planned in advance. Identify
                      potential pollution pathways, install appropriate controls before work
                      begins, and have contingency plans for heavy rainfall events and equipment
                      failure.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Buffer zones:</strong>{" "}
                      maintain an undisturbed buffer zone between the works and the watercourse
                      wherever possible. Store materials, refuel plant, and mix concrete well
                      away from watercourses. A minimum 10-metre buffer is recommended where
                      practicable.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Seasonal restrictions:</strong>{" "}
                      avoid in-river work during fish spawning seasons (typically October to
                      March for salmon and trout). The Environment Agency may impose specific
                      timing restrictions through permits or consents. Works during breeding
                      seasons may also affect nesting birds, which are protected under the
                      Wildlife and Countryside Act 1981.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Protected species:</strong>{" "}
                      watercourses often support protected species including otters, water voles,
                      great crested newts, white-clawed crayfish, and various fish species. An
                      ecological survey may be required before works begin, and a licence from
                      Natural England may be needed if protected species are present.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Permits and consents:</strong>{" "}
                      you may need a Flood Risk Activity Permit for works within 8 metres of a
                      main river (or 16 metres for a tidal main river). Works affecting ordinary
                      watercourses may require Land Drainage Consent from the Lead Local Flood
                      Authority.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Emergency preparedness:</strong>{" "}
                      have spill kits, containment booms, and absorbent materials readily
                      available at all times during works near water. Ensure all operatives know
                      the emergency spill response procedure and the EA incident hotline number.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Practical Tip: Before You Start
                </h3>
                <p className="text-white/80 text-sm">
                  Before starting any work near a watercourse, contact the{" "}
                  <strong className="text-white">Environment Agency</strong> for advice on
                  permits, restrictions, and pollution prevention measures specific to that
                  watercourse. It is far better to ask for guidance before work begins than to
                  face enforcement action afterwards. Early engagement with the EA demonstrates
                  good practice and can help avoid costly delays.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Silt & Sediment Control */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">04</span>
              Silt & Sediment Control
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Silt and sediment are the{" "}
                <strong className="text-white">most common cause of water pollution</strong>{" "}
                from construction sites. Fine particles suspended in runoff water can travel
                long distances and cause serious ecological damage to watercourses. Effective
                silt management requires a combination of control measures, installed{" "}
                <strong className="text-white">before earthworks begin</strong> and maintained
                throughout the construction phase.
              </p>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-3">
                  Silt Control Measures
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Silt Fences
                      </p>
                      <p className="text-white/60">
                        Geotextile fabric barriers staked into the ground along the contour,
                        typically downslope of disturbed areas. Water passes through the fabric
                        while sediment is trapped on the uphill side. Effective for sheet flow
                        over moderate slopes but NOT suitable for concentrated flows or steep
                        gradients. Must be inspected after every rainfall event and repaired or
                        replaced as needed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Settlement Lagoons and Tanks
                      </p>
                      <p className="text-white/60">
                        Excavated ponds or prefabricated tanks that slow water flow sufficiently
                        for suspended sediment to settle out under gravity. The clarified water
                        is then discharged (subject to permit requirements). Settlement lagoons
                        must be sized correctly for the expected flow rate and sediment load —
                        undersized lagoons are ineffective. Settled sludge must be regularly
                        removed and disposed of correctly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Silt Busters (Active Treatment Systems)
                      </p>
                      <p className="text-white/60">
                        Mechanical treatment units that use flocculants and settlement chambers
                        to remove very fine sediment from pumped water. Used where passive
                        settlement alone cannot achieve acceptable discharge quality, such as
                        dewatering operations with very fine clay or silt particles. More
                        expensive but significantly more effective than passive settlement.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Straw Bale Barriers
                      </p>
                      <p className="text-white/60">
                        Straw bales staked into the ground across drainage channels or around
                        drain inlets to filter sediment from runoff water. Simple and cheap but
                        limited in effectiveness — suitable only for low-flow situations and as
                        a secondary measure. Must be replaced regularly as they become saturated
                        and compressed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Geotextile Wraps and Drain Covers
                      </p>
                      <p className="text-white/60">
                        Geotextile fabric wrapped around drainage outlet pipes or placed over
                        drain gullies to filter sediment before water enters the drainage
                        system. Must be monitored frequently as they can block and cause
                        flooding if not maintained. Used as a last line of defence, not a
                        primary control.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">6</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Surface Water Management
                      </p>
                      <p className="text-white/60">
                        Diverting clean surface water away from disturbed areas using cut-off
                        ditches, bunds, and diversion channels prevents it from becoming
                        contaminated with sediment. Keep clean water clean — it is far easier
                        than cleaning dirty water. Minimise the area of exposed ground at any
                        one time and re-vegetate or cover completed areas as soon as possible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">
                    Maintenance Is Critical
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Silt controls are only effective if they are{" "}
                  <strong className="text-white">regularly inspected and maintained</strong>.
                  A silt fence that has fallen over, a settlement lagoon that is full of sludge,
                  or a blocked drain cover provides{" "}
                  <strong className="text-white">zero protection</strong>. Inspect all silt
                  controls at least daily and after every significant rainfall event. Repair,
                  clean out, or replace controls as needed. Record all inspections.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Oil & Fuel Storage */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">05</span>
              Oil & Fuel Storage
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The <strong className="text-white">Oil Storage Regulations 2001</strong> set out
                mandatory requirements for storing oil on commercial and industrial premises,
                including construction sites. Oil includes diesel, petrol, hydraulic oil,
                lubricating oil, vegetable oil, and waste oil. One litre of oil can contaminate
                up to one million litres of water.
              </p>

              {/* Oil Storage Bunding Requirements Diagram */}
              <div className="my-6">
                <h3 className="text-emerald-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  Oil Storage Bunding Requirements
                </h3>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                  <div className="space-y-4">
                    {/* Single Container */}
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                      <p className="text-orange-300 font-bold text-sm mb-2">SINGLE CONTAINER</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-16 h-20 bg-orange-500/20 border-2 border-orange-400/50 rounded flex items-center justify-center">
                          <span className="text-orange-300 text-xs font-bold">OIL</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">
                            Bund capacity = <span className="text-orange-300">110%</span> of container
                          </p>
                          <p className="text-white/60 text-xs mt-1">
                            Example: 1,000L tank requires 1,100L bund capacity
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Multiple Containers */}
                    <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
                      <p className="text-teal-300 font-bold text-sm mb-2">MULTIPLE CONTAINERS</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 flex gap-1">
                          <div className="w-10 h-16 bg-teal-500/20 border-2 border-teal-400/50 rounded flex items-center justify-center">
                            <span className="text-teal-300 text-[10px] font-bold">OIL</span>
                          </div>
                          <div className="w-10 h-20 bg-teal-500/20 border-2 border-teal-400/50 rounded flex items-center justify-center">
                            <span className="text-teal-300 text-[10px] font-bold">OIL</span>
                          </div>
                          <div className="w-10 h-14 bg-teal-500/20 border-2 border-teal-400/50 rounded flex items-center justify-center">
                            <span className="text-teal-300 text-[10px] font-bold">OIL</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">
                            Bund capacity = <span className="text-teal-300">110%</span> of largest
                            container <span className="text-white/50">OR</span>{" "}
                            <span className="text-teal-300">25%</span> of total capacity
                          </p>
                          <p className="text-white/60 text-xs mt-1">
                            Whichever is GREATER
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bund Requirements */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-emerald-300 text-xs sm:text-sm font-medium">
                        Bunds must be impermeable, have no drainage valve, and be regularly
                        inspected. Rainwater accumulation must be managed — never drain bund
                        contents directly to the ground or a watercourse.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-400/30 p-4 rounded-lg">
                <h3 className="text-orange-300 font-medium mb-3">
                  Oil Storage and Refuelling Requirements
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Bunding:</strong>{" "}
                      all oil storage containers must be bunded — 110% of the largest container
                      or 25% of total capacity, whichever is greater. Bunds must be impermeable,
                      structurally sound, and have no drainage valve. Inspect bunds regularly for
                      cracks, leaks, or deterioration.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Drip trays:</strong>{" "}
                      use drip trays under all connections, valves, sight gauges, and fill/draw
                      points. Drip trays must be emptied regularly and the contents disposed of
                      correctly — never pour drip tray contents onto the ground.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Refuelling procedures:</strong>{" "}
                      refuel on hard standing, well away from drains and watercourses. Use drip
                      trays during refuelling. Never leave fuel dispensing unattended. Use
                      automatic shut-off nozzles where possible. Carry a spill kit in all
                      refuelling vehicles.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Spill kits:</strong>{" "}
                      keep spill kits at every fuel storage location and on all plant and
                      machinery that carries fuel or oil. Spill kits must contain absorbent
                      pads, booms, granules, disposal bags, and PPE (gloves, goggles). All
                      operatives must be trained in their use.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">DSEAR considerations:</strong>{" "}
                      the Dangerous Substances and Explosive Atmospheres Regulations 2002
                      (DSEAR) apply to the storage and handling of flammable fuels. Ensure
                      adequate separation from ignition sources, appropriate signage, fire
                      extinguishers, and no-smoking zones around fuel storage areas.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Daily Checks
                </h3>
                <p className="text-white/80 text-sm">
                  Inspect all oil and fuel storage daily. Check containers for damage, leaks,
                  and corrosion. Check bunds for cracks, standing water, and contamination.
                  Check valves, connections, and sight gauges for drips. Check that drip trays
                  are in place and not overflowing. Check that spill kits are stocked and
                  accessible. Report and rectify any defects immediately — a small drip today
                  becomes a major spill tomorrow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Concrete & Cement Washout */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">06</span>
              Concrete & Cement Washout
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Concrete and cement washout is one of the{" "}
                <strong className="text-white">most dangerous pollutants</strong> found on
                construction sites. Fresh concrete, cement mortar, and grout produce washout
                water with a <strong className="text-white">pH of 11-13</strong> — this is
                highly alkaline and extremely toxic to aquatic life. Even a small quantity
                entering a watercourse can cause catastrophic ecological damage.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    NEVER Wash Cement Into Drains or Watercourses
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  This cannot be overstated:{" "}
                  <strong className="text-white">
                    NEVER wash cement, concrete, mortar, or grout into any drain, ditch,
                    watercourse, or onto the ground where it could reach water
                  </strong>
                  . The high alkalinity (pH 11-13) of cement washout kills fish, invertebrates,
                  and aquatic plants within minutes. A single incident of concrete washout
                  entering a river can kill thousands of fish over several kilometres. This is
                  a criminal offence carrying unlimited fines and imprisonment.
                </p>
              </div>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">
                  Managing Concrete and Cement Washout
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Designated washout areas:</strong>{" "}
                      every site that uses concrete, cement, mortar, or grout must have a
                      designated washout area. This must be lined (impermeable membrane),
                      bunded, and located well away from any drain, watercourse, or low point
                      where water could escape. All concrete mixer trucks, chutes, tools, and
                      equipment must be washed out in this designated area only.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">pH neutralisation:</strong>{" "}
                      washout water can be neutralised by adding a controlled quantity of acid
                      (typically carbon dioxide or citric acid) to bring the pH down to
                      acceptable levels (pH 6-9) before controlled disposal. pH must be tested
                      before any discharge. Never attempt to discharge alkaline water.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Settlement and recycling:</strong>{" "}
                      allow washout water to settle so that cement solids drop out. The settled
                      water can often be reused for further washout or dampening haul roads. The
                      settled solids must be disposed of as waste. Some sites use recirculating
                      washout systems that continuously settle and recycle the water.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Wet cutting:</strong>{" "}
                      wet cutting of concrete, blockwork, and paving slabs produces alkaline
                      slurry that must also be contained. Use a wet vacuum or containment system
                      to collect the slurry — do not allow it to run off into drains. The same
                      containment and disposal requirements apply.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Signage and briefings:</strong>{" "}
                      clearly mark the designated washout area with signage. Brief all
                      operatives — including delivery drivers — on the washout procedure.
                      Concrete truck drivers must be directed to the washout area before they
                      arrive on site. Monitor compliance and take corrective action immediately
                      if anyone washes cement elsewhere.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Understanding the pH Scale
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  The pH scale runs from 0 (strongly acidic) to 14 (strongly alkaline). Clean
                  water is pH 7 (neutral). Most aquatic life requires a pH between 6 and 9 to
                  survive. Cement washout at pH 11-13 is{" "}
                  <strong className="text-white">
                    100 to 10,000 times more alkaline than the upper limit
                  </strong>{" "}
                  most aquatic organisms can tolerate, because the pH scale is logarithmic —
                  each whole number represents a tenfold change.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Emergency Spill Response */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">07</span>
              Emergency Spill Response
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Despite the best preventive measures, spills can and do occur on construction
                sites. The difference between a contained incident and an environmental
                catastrophe often comes down to the{" "}
                <strong className="text-white">speed and quality of the response</strong>. Every
                operative on site must know the spill response procedure.
              </p>

              {/* Water Pollution Prevention Controls Flowchart */}
              <div className="my-6">
                <h3 className="text-emerald-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  Water Pollution Prevention Controls
                </h3>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                  <div className="space-y-3">
                    {/* Step 1: Source Control */}
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                      <p className="text-emerald-300 font-bold text-xs sm:text-sm">
                        STEP 1: SOURCE CONTROL
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        Prevent pollution at the source — bunding, drip trays, designated washout areas, covered storage
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-0.5 h-4 bg-white/20"></div>
                    </div>

                    {/* Step 2: Pathway Control */}
                    <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-3">
                      <p className="text-teal-300 font-bold text-xs sm:text-sm">
                        STEP 2: PATHWAY CONTROL
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        Block routes to water — silt fences, drain covers, cut-off ditches, buffer zones
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-0.5 h-4 bg-white/20"></div>
                    </div>

                    {/* Step 3: Treatment */}
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                      <p className="text-cyan-300 font-bold text-xs sm:text-sm">
                        STEP 3: TREATMENT
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        Remove pollutants before discharge — settlement lagoons, silt busters, pH neutralisation
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-0.5 h-4 bg-white/20"></div>
                    </div>

                    {/* Step 4: Emergency Response */}
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <p className="text-red-300 font-bold text-xs sm:text-sm">
                        STEP 4: EMERGENCY RESPONSE
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        If controls fail — spill kits, containment booms, EA notification on 0800 80 70 60
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-white/5 border border-emerald-500/30 rounded-lg p-3">
                    <p className="text-emerald-300 text-xs sm:text-sm font-medium">
                      Defence in depth — multiple layers of protection ensure that if one
                      control fails, the next layer catches the problem before pollutants
                      reach water.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Spill Kit Contents and Use
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Absorbent pads:</strong>{" "}
                      for soaking up liquid spills on hard surfaces. Oil-only pads (white)
                      absorb oil but repel water — ideal for use in wet conditions. Universal
                      pads (grey) absorb all liquids including water-based chemicals.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Absorbent booms/socks:</strong>{" "}
                      long tubes of absorbent material placed around a spill to contain it and
                      prevent it spreading. Also used to surround drain gullies to prevent
                      pollutants entering the drainage system.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Absorbent granules:</strong>{" "}
                      loose granular material scattered over spills on hard surfaces to absorb
                      liquid. Swept up after absorption and disposed of as contaminated waste.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Disposal bags:</strong>{" "}
                      heavy-duty bags for collecting used absorbent materials. All used spill
                      kit materials are classified as contaminated waste and must be disposed of
                      through a licensed waste carrier.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">PPE:</strong>{" "}
                      chemical-resistant gloves, safety goggles, and coveralls. Always wear PPE
                      when dealing with spills — you may not know exactly what has been spilled
                      or its toxicity.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Emergency Spill Response Procedure
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">1</span>
                    </div>
                    <p className="text-white/70">
                      <strong className="text-white">STOP</strong> the source — turn off
                      the tap, close the valve, right the container, plug the leak
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">2</span>
                    </div>
                    <p className="text-white/70">
                      <strong className="text-white">CONTAIN</strong> the spill — use booms
                      and absorbent socks to surround the spill and block drains
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">3</span>
                    </div>
                    <p className="text-white/70">
                      <strong className="text-white">NOTIFY</strong> your site manager and
                      the Environment Agency on{" "}
                      <strong className="text-white">0800 80 70 60</strong> immediately
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">4</span>
                    </div>
                    <p className="text-white/70">
                      <strong className="text-white">CLEAN UP</strong> using absorbent pads,
                      granules, and booms. Collect all contaminated material for proper disposal
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">5</span>
                    </div>
                    <p className="text-white/70">
                      <strong className="text-white">RECORD</strong> the incident — what
                      was spilled, the quantity, the cause, the response actions taken, and any
                      environmental impact observed
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">6</span>
                    </div>
                    <p className="text-white/70">
                      <strong className="text-white">INVESTIGATE</strong> the root cause
                      and implement corrective actions to prevent recurrence
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">
                    Never Use Detergent to Disperse Oil Spills
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  A common mistake is to use washing-up liquid or detergent to &ldquo;clean
                  up&rdquo; an oil spill. This does{" "}
                  <strong className="text-white">NOT</strong> remove the oil — it disperses
                  it into the water, making it invisible but still present and toxic. In fact,
                  using detergent makes the pollution{" "}
                  <strong className="text-white">worse</strong> because the dispersed oil
                  is more bioavailable and harder to clean up. The detergent itself is also a
                  pollutant. Always use absorbent materials to physically remove oil from the
                  water or surface.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Sustainable Drainage Systems (SuDS) */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">08</span>
              Sustainable Drainage Systems (SuDS)
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">Sustainable Drainage Systems (SuDS)</strong> are
                designed to manage surface water in a way that mimics natural drainage processes.
                Rather than piping rainwater directly into drains and watercourses — which
                increases flood risk, pollution, and erosion — SuDS slow water down, filter
                out pollutants, and allow water to soak into the ground or be released gradually.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  The Four Pillars of SuDS
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-emerald-300 font-bold text-xs mb-1">WATER QUANTITY</p>
                    <p className="text-white/60 text-xs">
                      Reduce flood risk by slowing runoff and reducing peak flow rates
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-emerald-300 font-bold text-xs mb-1">WATER QUALITY</p>
                    <p className="text-white/60 text-xs">
                      Remove pollutants through filtration, settlement, and biological treatment
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-emerald-300 font-bold text-xs mb-1">AMENITY</p>
                    <p className="text-white/60 text-xs">
                      Create attractive, usable spaces that benefit people and communities
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-emerald-300 font-bold text-xs mb-1">BIODIVERSITY</p>
                    <p className="text-white/60 text-xs">
                      Support wildlife habitats and ecological connectivity
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-3">
                  Temporary vs Permanent SuDS
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">
                      Temporary SuDS (Construction Phase)
                    </p>
                    <ul className="text-white/60 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Silt fences, settlement lagoons, temporary swales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Straw bale barriers, geotextile drain covers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Temporary attenuation tanks and oversized pipes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Designed to be removed or adapted after construction</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">
                      Permanent SuDS (Operational Phase)
                    </p>
                    <ul className="text-white/60 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Permeable paving, rain gardens, green roofs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Swales, filter strips, detention basins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Constructed wetlands, infiltration trenches</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Designed for the lifetime of the development</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  The Treatment Train
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  The <strong className="text-white">treatment train</strong> is a fundamental
                  SuDS principle where surface water passes through a series of progressive
                  treatment stages:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Source Control</p>
                      <p className="text-white/60">
                        Manage rainfall where it falls — green roofs, permeable paving,
                        rainwater harvesting. Prevents runoff being generated in the first place.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Local Management</p>
                      <p className="text-white/60">
                        Manage runoff close to its source — rain gardens, filter strips, swales,
                        and bioretention areas that filter, infiltrate, and attenuate water at
                        a local level.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Regional Management</p>
                      <p className="text-white/60">
                        Manage larger volumes — detention basins, constructed wetlands,
                        attenuation ponds. These provide storage, further treatment, and
                        controlled release of water into watercourses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-3">
                  Key SuDS Concepts
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Attenuation:</strong>{" "}
                      storing water temporarily and releasing it slowly to reduce peak flow
                      rates. This reduces downstream flood risk and erosion. Attenuation can
                      be above-ground (ponds, basins) or below-ground (tanks, oversized pipes,
                      crates).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Infiltration:</strong>{" "}
                      allowing water to soak into the ground through permeable surfaces, soakaways,
                      and infiltration trenches. This recharges groundwater and reduces runoff
                      volume. Not suitable where ground conditions are impermeable (clay), where
                      the water table is high, or where ground contamination could be mobilised.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">SuDS Approval Bodies (SABs):</strong>{" "}
                      local authorities acting as SuDS Approval Bodies have statutory
                      responsibility for approving, adopting, and maintaining SuDS that serve
                      more than one property. Developers must obtain SAB approval for their
                      SuDS designs before construction can begin.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Why SuDS Matter for Electricians
                </h3>
                <p className="text-white/80 text-sm">
                  As an electrician working on construction sites, you may not design SuDS, but
                  you need to understand them. You will encounter temporary SuDS on site that
                  you must not damage or obstruct. You may install electrical services (lighting,
                  pumps, monitoring equipment) associated with permanent SuDS. Most importantly,
                  you must understand that{" "}
                  <strong className="text-white">
                    your actions on site directly affect water quality
                  </strong>{" "}
                  — from where you refuel your van, to how you dispose of cable stripping waste,
                  to whether you wash your tools into a drain. Every operative has a role in
                  water pollution prevention.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz
            title="Section 2 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-4-section-3">
              Next: Section 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EnvironmentalSustainabilityModule4Section2;
