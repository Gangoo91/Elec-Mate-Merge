import {
  ArrowLeft,
  Layers,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pollutant-linkage",
    question:
      "What three elements must be present for a pollutant linkage to exist under Part IIA of the EPA 1990?",
    options: [
      "Source, pathway, and receptor",
      "Contaminant, soil, and groundwater",
      "Developer, regulator, and landowner",
      "Desk study, site investigation, and risk assessment",
    ],
    correctIndex: 0,
    explanation:
      "A pollutant linkage under Part IIA of the Environmental Protection Act 1990 requires three elements: a source of contamination (the contaminant itself), a pathway (the route by which the contaminant reaches a target), and a receptor (a person, ecosystem, property, or controlled water that could be harmed). All three must be present simultaneously for land to be formally determined as contaminated land. If any one element is absent, there is no pollutant linkage and the land cannot be determined as contaminated under Part IIA.",
  },
  {
    id: "clea-framework",
    question:
      "What does the CLEA framework provide for contaminated land risk assessment?",
    options: [
      "Generic assessment criteria (GAC) that set threshold concentrations for common contaminants based on standard land-use scenarios",
      "A list of all contaminated sites in England and Wales",
      "Mandatory remediation methods for all types of contamination",
      "Insurance cover for developers working on brownfield sites",
    ],
    correctIndex: 0,
    explanation:
      "The Contaminated Land Exposure Assessment (CLEA) framework, published by the Environment Agency and Defra, provides generic assessment criteria (GAC) — also known as soil guideline values — for common contaminants. These are threshold concentrations based on standard land-use scenarios (residential with gardens, residential without gardens, allotments, and commercial/industrial). If a contaminant exceeds its GAC for the proposed land use, a site-specific detailed quantitative risk assessment (DQRA) is required. CLEA is a screening tool, not a mandatory remediation standard.",
  },
  {
    id: "claire-cop",
    question:
      "What is the primary purpose of the CL:AIRE Definition of Waste: Development Industry Code of Practice?",
    options: [
      "To enable the re-use of excavated materials on the development site or between sites without classifying them as waste, saving landfill tax and disposal costs",
      "To classify all excavated soil as hazardous waste requiring licensed disposal",
      "To set maximum contaminant concentrations in drinking water",
      "To require all brownfield sites to be remediated to greenfield standards",
    ],
    correctIndex: 0,
    explanation:
      "The CL:AIRE Definition of Waste: Development Industry Code of Practice (DoW CoP) provides a framework that allows excavated materials to be re-used on the development site (or moved between sites) without being classified as waste — provided they are demonstrated to be suitable for their intended use. This avoids the materials entering the waste management regime, saving significant landfill tax (currently over £100 per tonne) and disposal costs. A qualified person must prepare a materials management plan (MMP) and a declaration confirming the materials are suitable for use.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between brownfield and greenfield land?",
    answer:
      "Brownfield land (previously developed land) is land that has been subject to previous development — for example, former factories, gasworks, petrol stations, or industrial estates. It may or may not be contaminated, but its history means contamination should always be considered. Greenfield land has not been previously developed and is typically agricultural or undeveloped land. Planning policy in England strongly encourages the re-use of brownfield land for new development to protect greenfield sites. However, brownfield development often requires additional site investigation and potentially remediation, which adds cost and time to projects.",
  },
  {
    question:
      "What is the difference between a Phase 1 and Phase 2 site investigation?",
    answer:
      "A Phase 1 investigation (desk study) is a non-intrusive review of the site's history, environmental setting, and potential contamination sources. It involves examining historical maps, trade directories, regulatory records, geological maps, and a site walkover to build a conceptual site model (CSM) identifying potential pollutant linkages. A Phase 2 investigation (intrusive investigation) involves physically sampling the ground — typically through trial pits, boreholes, and groundwater monitoring wells — followed by laboratory chemical analysis. Phase 2 is only required if Phase 1 identifies potential contamination risks. Together they form the basis for risk assessment and, if needed, a remediation strategy.",
  },
  {
    question:
      "What is 'dig and dump' and why is it considered the least sustainable remediation option?",
    answer:
      "Dig and dump involves excavating contaminated soil and transporting it off-site to a licensed landfill for disposal. Whilst it is quick and provides certainty that the contamination has been physically removed from the site, it is considered the least sustainable remediation option because it merely moves the problem to another location (the landfill) rather than treating it. It consumes landfill capacity, generates significant HGV traffic and associated carbon emissions, incurs high landfill tax costs (currently over £100 per tonne for hazardous waste), and does nothing to treat or break down the contaminants. Modern practice strongly favours in-situ or ex-situ treatment methods that destroy, stabilise, or immobilise contaminants on or near the site.",
  },
  {
    question:
      "What is a source protection zone (SPZ) and how does it affect development?",
    answer:
      "Source protection zones (SPZs) are areas of land around public water supply abstractions (boreholes, wells, and springs) where the risk of contamination reaching the water supply is highest. The Environment Agency defines three zones: SPZ1 (Inner Protection Zone — 50-day travel time), SPZ2 (Outer Protection Zone — 400-day travel time), and SPZ3 (Total Catchment — the entire area from which the abstraction draws water). Development within SPZs is subject to additional scrutiny from the Environment Agency. Activities that could pollute groundwater — such as certain remediation methods, soakaways, underground storage tanks, or infiltration drainage — may be restricted or prohibited within SPZ1 or SPZ2. Developers must consult the Environment Agency at an early stage if the site is within an SPZ.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under Part IIA of the Environmental Protection Act 1990, what must be present for land to be formally determined as 'contaminated land'?",
    options: [
      "Any detectable level of a contaminant in the soil",
      "A significant pollutant linkage comprising source, pathway, and receptor",
      "Evidence of historical industrial use on the site",
      "A failed Phase 2 site investigation result",
    ],
    correctAnswer: 1,
    explanation:
      "Part IIA defines contaminated land as land where substances are causing or could cause significant harm to a receptor, or significant pollution of controlled waters. For this determination, a significant pollutant linkage must exist — a source (the contaminant), a pathway (the route by which it reaches a target), and a receptor (a person, ecosystem, property, or controlled water that could suffer significant harm). The mere presence of a contaminant is not sufficient; all three elements must be connected.",
  },
  {
    id: 2,
    question:
      "Which of the following is classified as a common heavy metal contaminant found on former industrial land?",
    options: [
      "Methane",
      "Total petroleum hydrocarbons (TPH)",
      "Lead",
      "Radon",
    ],
    correctAnswer: 2,
    explanation:
      "Lead is one of the most common heavy metal contaminants found on former industrial sites, particularly those with a history of paint manufacture, smelting, battery production, or leaded petrol storage. Other common heavy metals include arsenic, cadmium, chromium, mercury, and nickel. Methane and radon are gases, while TPH (total petroleum hydrocarbons) is an organic contaminant rather than a heavy metal.",
  },
  {
    id: 3,
    question:
      "What is the purpose of a conceptual site model (CSM) in a contaminated land investigation?",
    options: [
      "To provide a 3D computer model of the underground geology",
      "To identify and illustrate all potential pollutant linkages between sources, pathways, and receptors on the site",
      "To calculate the exact cost of remediation",
      "To satisfy building regulations for foundation design",
    ],
    correctAnswer: 1,
    explanation:
      "A conceptual site model (CSM) is a written and/or diagrammatic representation of the site that identifies all potential sources of contamination, all possible pathways by which contaminants could migrate, and all receptors that could be affected. It is developed during the Phase 1 desk study and refined during the Phase 2 intrusive investigation. The CSM is the foundation of the risk assessment — it determines which pollutant linkages exist and which require further investigation or remediation.",
  },
  {
    id: 4,
    question:
      "What does a generic assessment criterion (GAC) under the CLEA framework represent?",
    options: [
      "The maximum concentration of a contaminant permitted in drinking water",
      "A screening value — the soil concentration below which the risk to human health is considered acceptable for a standard land-use scenario",
      "The cost per tonne of remediating a specific contaminant",
      "The depth at which a contaminant is no longer dangerous",
    ],
    correctAnswer: 1,
    explanation:
      "Generic assessment criteria (GAC) are screening values published under the CLEA framework. They represent the soil concentration of a contaminant below which the risk to human health is considered acceptable for a standard land-use scenario (residential with gardens, residential without gardens, allotments, or commercial/industrial). If a site's contaminant concentrations are below the relevant GAC, no further assessment or remediation is typically required for human health. If concentrations exceed the GAC, a site-specific detailed quantitative risk assessment (DQRA) is needed.",
  },
  {
    id: 5,
    question:
      "Which remediation technique involves using naturally occurring or introduced micro-organisms to break down organic contaminants in the ground?",
    options: [
      "Soil washing",
      "Bioremediation",
      "Chemical oxidation",
      "Capping and containment",
    ],
    correctAnswer: 1,
    explanation:
      "Bioremediation uses micro-organisms (bacteria, fungi) — either those naturally present in the soil or introduced cultures — to biologically break down organic contaminants such as petroleum hydrocarbons, solvents, and some pesticides. It can be carried out in-situ (treating the soil in place) or ex-situ (excavating the soil and treating it in biopiles or windrows). Bioremediation is considered a sustainable technique because it destroys contaminants rather than simply moving or containing them, and it typically has lower energy requirements and carbon emissions than other methods.",
  },
  {
    id: 6,
    question:
      "Under the CL:AIRE Definition of Waste Code of Practice, what document must a qualified person prepare to enable re-use of excavated materials on site?",
    options: [
      "A waste transfer note",
      "A materials management plan (MMP)",
      "A hazardous waste consignment note",
      "An environmental impact assessment",
    ],
    correctAnswer: 1,
    explanation:
      "Under the CL:AIRE Definition of Waste: Development Industry Code of Practice (DoW CoP), a qualified person must prepare a materials management plan (MMP) that demonstrates the excavated materials are suitable for their intended use on the development site. The MMP must include details of the materials, their chemical and geotechnical properties, the proposed end use, and verification that they meet the required standards. A declaration is then submitted to CL:AIRE confirming compliance. This process allows the materials to be re-used without entering the waste management regime, saving landfill tax and disposal costs.",
  },
  {
    id: 7,
    question:
      "What is the primary purpose of a groundwater monitoring well on a contaminated site?",
    options: [
      "To provide drinking water for site workers during construction",
      "To sample and monitor groundwater quality, track contaminant plume movement, and verify remediation effectiveness",
      "To lower the water table so foundations can be constructed",
      "To inject chemicals directly into the aquifer",
    ],
    correctAnswer: 1,
    explanation:
      "Groundwater monitoring wells are installed during site investigation and remediation to allow regular sampling of groundwater quality beneath and around the site. They enable consultants to track the movement and concentration of contaminant plumes over time, assess whether contamination is migrating off-site, and verify the effectiveness of remediation measures. Monitoring wells are typically small-diameter boreholes with slotted screen sections at the depth of the water table, fitted with protective covers at ground level.",
  },
  {
    id: 8,
    question:
      "What document must typically be submitted to the local planning authority to demonstrate that a contaminated site has been successfully remediated?",
    options: [
      "A Phase 1 desk study report",
      "A remediation verification report (also known as a validation report)",
      "A building control completion certificate",
      "A waste carrier's licence",
    ],
    correctAnswer: 1,
    explanation:
      "A remediation verification report (historically called a validation report) must be submitted to the local planning authority to demonstrate that the approved remediation strategy has been successfully implemented and the site is now suitable for its intended use. It includes records of all remediation works carried out, verification sampling and testing results, comparison against agreed remediation targets, and confirmation that all planning conditions relating to contamination have been discharged. This is typically required before occupation of the development is permitted.",
  },
];

export default function EnvironmentalSustainabilityModule4Section4() {
  useSEO({
    title:
      "Land Contamination & Remediation | Environmental Sustainability Module 4.4",
    description:
      "Contaminated land definitions, common contaminants, site investigation, CLEA risk assessment, remediation strategies, CL:AIRE materials management, groundwater protection, and regulatory requirements.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Layers className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Land Contamination &amp; Remediation
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Contaminated land law, common contaminants, site investigation,
            CLEA&nbsp;risk assessment, remediation strategies, materials
            management, groundwater protection, and regulatory requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Part IIA:</strong> Source-pathway-receptor pollutant
                linkage model
              </li>
              <li>
                <strong>CLEA:</strong> Generic assessment criteria for screening
                contaminated sites
              </li>
              <li>
                <strong>CL:AIRE DoW CoP:</strong> Re-use excavated materials
                without waste classification
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Phase 1:</strong> Desk study (non-intrusive review of
                history)
              </li>
              <li>
                <strong>Phase 2:</strong> Intrusive investigation (boreholes,
                sampling)
              </li>
              <li>
                <strong>Landfill tax:</strong> Over &pound;100/tonne &mdash;
                drives sustainable remediation
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define contaminated land under Part IIA of the Environmental Protection Act 1990 and explain the pollutant linkage model",
              "Identify common contaminants found on brownfield sites including heavy metals, hydrocarbons, asbestos, and ground gases",
              "Describe the phased approach to site investigation — desk study, intrusive investigation, and risk assessment",
              "Explain the CLEA risk assessment framework and the role of generic assessment criteria",
              "Compare remediation strategies including dig and dump, in-situ treatment, ex-situ treatment, and containment",
              "Understand materials management under the CL:AIRE Definition of Waste Code of Practice",
              "Describe groundwater protection measures including source protection zones and monitoring wells",
              "Outline the regulatory framework for contaminated land including planning conditions and verification reports",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is Contaminated Land? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            What Is Contaminated Land?
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The legal definition of contaminated land in England and Wales
                comes from{" "}
                <strong>
                  Part IIA of the Environmental Protection Act 1990
                </strong>
                , inserted by the Environment Act 1995. Land is &ldquo;contaminated
                land&rdquo; if substances in, on, or under the land are causing
                or could cause{" "}
                <strong>significant harm</strong> to a receptor, or{" "}
                <strong>significant pollution of controlled waters</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Pollutant Linkage (Source &ndash; Pathway &ndash; Receptor)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  For land to be formally determined as contaminated under
                  Part&nbsp;IIA, a <strong className="text-white">significant pollutant linkage</strong> must
                  exist. This requires three elements connected together:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Source:</strong> A
                      contaminant present in, on, or under the land (e.g. heavy
                      metals, hydrocarbons, asbestos fibres, ground gases)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pathway:</strong> A route
                      by which the contaminant can reach a receptor (e.g. direct
                      soil contact, dust inhalation, leaching to groundwater,
                      gas migration through permeable strata)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Receptor:</strong> A target
                      that could suffer significant harm &mdash; human beings,
                      ecological systems, property, or controlled waters
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Brownfield vs Greenfield
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Brownfield land</strong>{" "}
                      (previously developed land) &mdash; former factories,
                      gasworks, petrol stations, railways, dockyards, mines, and
                      other industrial or commercial sites. May or may not be
                      contaminated, but investigation is essential.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Greenfield land</strong>{" "}
                      &mdash; undeveloped agricultural or natural land with no
                      history of industrial use. Lower contamination risk but
                      not zero &mdash; agricultural chemicals and naturally
                      occurring substances (e.g. arsenic, radon) can still be
                      present.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Historical Land Uses of Concern
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Gasworks and coal carbonisation plants (coal tar, cyanide,
                      heavy metals, PAHs)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Petrol filling stations and fuel storage depots
                      (hydrocarbons, BTEX, MTBE)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Metal smelting and electroplating works (lead, chromium,
                      cadmium, nickel, zinc)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Tanneries and chemical manufacturing (solvents,
                      chlorinated compounds, acids)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Landfill sites and waste tips (mixed contaminants, landfill
                      gas, leachate)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Railway land, docks, and shipyards (asbestos, heavy
                      metals, hydrocarbons, made ground)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Key Point:</strong> The
                  mere presence of contamination does not automatically make land
                  &ldquo;contaminated land&rdquo; under Part IIA. There must be
                  a <strong>significant pollutant linkage</strong> &mdash; if
                  there is no pathway connecting the source to a receptor, or no
                  receptor that could suffer significant harm, the land is not
                  contaminated land in the legal sense.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Common Contaminants */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">02</span>
            Common Contaminants
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Brownfield sites may contain a wide range of contaminants
                depending on their historical use. The most commonly encountered
                groups are <strong>heavy metals</strong>,{" "}
                <strong>organic compounds</strong> (hydrocarbons),{" "}
                <strong>asbestos in soil</strong>,{" "}
                <strong>ground gases</strong>, and{" "}
                <strong>made ground</strong> (fill materials of unknown origin
                and composition).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Heavy Metals
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lead (Pb):</strong>{" "}
                      Extremely common on former industrial sites &mdash; paint
                      manufacture, smelting, battery production, leaded petrol
                      storage. Toxic to humans, particularly children.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Arsenic (As):</strong>{" "}
                      Found on sites associated with pesticide manufacture,
                      tanneries, and smelting. Also occurs naturally in some
                      geological formations. Carcinogenic.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cadmium (Cd):</strong>{" "}
                      Associated with electroplating, battery production, and
                      zinc smelting. Highly toxic and accumulates in the food
                      chain.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Chromium (Cr):</strong>{" "}
                      Chromium VI (hexavalent) is the most dangerous form
                      &mdash; associated with electroplating, tanning, and
                      chemical production. Carcinogenic and highly mobile in
                      groundwater.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Hydrocarbons
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Total Petroleum Hydrocarbons (TPH):
                      </strong>{" "}
                      A broad measure of petroleum-derived hydrocarbons in soil
                      &mdash; includes petrol, diesel, oils, and lubricants.
                      Common around fuel storage and distribution sites.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Polycyclic Aromatic Hydrocarbons (PAH):
                      </strong>{" "}
                      Formed during incomplete combustion of organic materials
                      &mdash; associated with gasworks, coal tar, and asphalt.
                      Several PAHs are carcinogenic (e.g. benzo[a]pyrene).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Asbestos in Soil
                </p>
                <p className="text-sm text-white/80">
                  Asbestos fibres and fragments of asbestos-containing materials
                  (ACMs) are frequently found in made ground and demolition
                  fill, particularly on sites where pre-2000 buildings have been
                  demolished. Asbestos in soil presents a risk through{" "}
                  <strong className="text-white">inhalation of fibres</strong>{" "}
                  if disturbed during excavation, landscaping, or construction
                  work. Specialist risk assessment methods (following CIRIA
                  C733) are required because standard CLEA GACs do not cover
                  asbestos.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Ground Gases
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Methane (CH&#8324;):</strong>{" "}
                      Generated by decomposition of organic matter in landfills,
                      peat, and made ground. Flammable and explosive at
                      5&ndash;15% concentration in air. Can migrate through
                      permeable soils and accumulate in enclosed spaces.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Carbon dioxide (CO&#8322;):
                      </strong>{" "}
                      Also generated by organic decomposition. An asphyxiant
                      &mdash; displaces oxygen in enclosed spaces. Heavier than
                      air, so accumulates at low levels.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Radon:</strong> A naturally
                      occurring radioactive gas produced by decay of uranium in
                      rocks and soil. Found in certain geological areas across
                      the UK. Can accumulate in buildings, particularly
                      basements and ground floors.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Made Ground
                </p>
                <p className="text-sm text-white/80">
                  Made ground is material placed by human activity &mdash;
                  fill, rubble, waste, and other materials used to raise levels,
                  fill excavations, or form embankments. It is{" "}
                  <strong className="text-white">extremely variable</strong> in
                  composition and may contain any combination of the above
                  contaminants. Made ground is common across urban and
                  industrial areas and must always be investigated if
                  encountered during site works.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Site Investigation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">03</span>
            Site Investigation
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Site investigation follows a{" "}
                <strong>phased approach</strong> designed to identify
                contamination risks efficiently without unnecessary expense. The
                investigation begins with a desk-based review and progresses to
                intrusive sampling only where the desk study identifies
                potential risks.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Phase 1 &mdash; Desk Study
                </p>
                <p className="text-sm text-white/80 mb-2">
                  A non-intrusive review of the site&rsquo;s history,
                  environmental setting, and potential contamination sources.
                  Carried out by an environmental consultant.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Historical maps:</strong>{" "}
                      Ordnance Survey maps from the 1800s onwards showing
                      previous land uses, buildings, and industrial features
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Environmental database search:
                      </strong>{" "}
                      Landfill records, pollution incidents, waste licences,
                      discharge consents, and industrial permits
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Geological and hydrogeological data:
                      </strong>{" "}
                      British Geological Survey maps, aquifer designations,
                      groundwater vulnerability, and nearby abstractions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Site walkover:</strong>{" "}
                      Visual inspection to identify evidence of contamination
                      &mdash; staining, odours, stressed vegetation, fly-tipping,
                      above-ground storage tanks, or suspect materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Conceptual site model (CSM):
                      </strong>{" "}
                      Developed from the above data &mdash; identifies all
                      potential sources, pathways, and receptors to determine
                      whether further investigation is needed
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Phase 2 &mdash; Intrusive Investigation
                </p>
                <p className="text-sm text-white/80 mb-2">
                  Physical investigation of the ground involving sampling and
                  laboratory analysis. Only carried out where Phase 1 identifies
                  potential contamination risks.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Trial pits:</strong>{" "}
                      Machine-excavated pits (typically 3&ndash;4m deep)
                      allowing visual inspection and sampling of soil layers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Boreholes:</strong>{" "}
                      Drilled to greater depths (10m+) to investigate deeper
                      contamination, geological strata, and groundwater
                      conditions. Borehole logs record soil and rock types
                      encountered.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Groundwater monitoring wells:
                      </strong>{" "}
                      Installed within boreholes to sample and monitor
                      groundwater quality over time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Gas monitoring wells:
                      </strong>{" "}
                      Installed to measure ground gas concentrations and flow
                      rates over a minimum monitoring period (typically
                      6&nbsp;visits over 3&nbsp;months)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Chemical analysis:
                      </strong>{" "}
                      Soil and groundwater samples sent to UKAS-accredited
                      laboratories for analysis of target contaminants
                      identified in the CSM
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">
                    The Conceptual Site Model:
                  </strong>{" "}
                  The CSM is the{" "}
                  <strong>foundation of all contaminated land work</strong>. It
                  is developed during Phase 1, refined during Phase 2, and
                  drives the risk assessment. The CSM identifies which pollutant
                  linkages exist and which require further investigation or
                  remediation. Without a robust CSM, risk assessment and
                  remediation decisions cannot be properly justified.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Risk Assessment Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">04</span>
            Risk Assessment Framework
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The risk assessment determines whether contamination at a site
                poses an unacceptable risk to human health, controlled waters,
                or ecological receptors &mdash; and if so, what level of
                remediation is required. The UK uses a{" "}
                <strong>tiered approach</strong> starting with generic
                screening and progressing to site-specific assessment where
                needed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  CLEA &mdash; Contaminated Land Exposure Assessment
                </p>
                <p className="text-sm text-white/80 mb-2">
                  The CLEA framework, published by the Environment Agency and
                  Defra, provides the scientific basis for assessing risks to
                  human health from soil contamination.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Generic Assessment Criteria (GAC):
                      </strong>{" "}
                      Screening values for common contaminants based on four
                      standard land-use scenarios: residential with gardens,
                      residential without gardens, allotments, and
                      commercial/industrial
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If concentrations are{" "}
                      <strong className="text-white">below the GAC</strong>,
                      the risk is considered acceptable for that land use
                      &mdash; no further action is typically needed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If concentrations{" "}
                      <strong className="text-white">exceed the GAC</strong>,
                      this does not automatically mean the site is contaminated
                      &mdash; it triggers the need for a more detailed
                      site-specific assessment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Site-Specific Assessment
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Detailed Quantitative Risk Assessment (DQRA):
                      </strong>{" "}
                      Uses site-specific data (actual exposure patterns, soil
                      type, building design, receptor behaviour) rather than
                      conservative generic assumptions. May demonstrate that
                      risks are acceptable even where GACs are exceeded.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Appropriate use:
                      </strong>{" "}
                      The concept of &ldquo;suitable for use&rdquo; is central
                      to UK contaminated land policy. Land does not need to be
                      remediated to pristine condition &mdash; only to a
                      standard that is appropriate for its intended use. A
                      commercial car park has very different requirements from a
                      residential garden with home-grown vegetables.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    GAC Exceedance &ne; Contaminated Land
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Exceeding a generic assessment criterion does{" "}
                  <strong className="text-white">NOT</strong> automatically
                  mean the land is contaminated or that remediation is required.
                  GACs are conservative screening values based on worst-case
                  generic assumptions. A site-specific DQRA using actual site
                  conditions may demonstrate that the risk is acceptable. The
                  GAC exceedance simply triggers the need for{" "}
                  <strong className="text-white">further assessment</strong>,
                  not automatic remediation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Diagram: Source-Pathway-Receptor Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">
              &nbsp;
            </span>
            Source &ndash; Pathway &ndash; Receptor Model
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="bg-[#111] border-2 border-emerald-500/40 rounded-xl p-4 sm:p-6 overflow-x-auto">
              <p className="text-xs text-emerald-400 font-semibold mb-4 text-center tracking-widest uppercase">
                Pollutant Linkage &mdash; Conceptual Diagram
              </p>

              <div className="min-w-[320px]">
                {/* Source row */}
                <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-4">
                  <div className="flex-1 border-2 border-red-400/50 bg-red-500/10 rounded-lg p-3 text-center">
                    <span className="text-[10px] sm:text-xs font-bold text-red-400 block">
                      SOURCE
                    </span>
                    <span className="text-[9px] text-white/60 block mt-1">
                      Contaminant present in soil
                    </span>
                    <div className="mt-2 flex flex-wrap justify-center gap-1">
                      {[
                        "Heavy metals",
                        "Hydrocarbons",
                        "Asbestos",
                        "Ground gas",
                      ].map((s) => (
                        <span
                          key={s}
                          className="text-[8px] sm:text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow down */}
                <div className="flex justify-center mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-[2px] h-6 bg-emerald-400/50" />
                    <span className="text-emerald-400 text-sm">&darr;</span>
                  </div>
                </div>

                {/* Pathway row */}
                <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-4">
                  <div className="flex-1 border-2 border-amber-400/50 bg-amber-500/10 rounded-lg p-3 text-center">
                    <span className="text-[10px] sm:text-xs font-bold text-amber-400 block">
                      PATHWAY
                    </span>
                    <span className="text-[9px] text-white/60 block mt-1">
                      Route contaminant travels to receptor
                    </span>
                    <div className="mt-2 flex flex-wrap justify-center gap-1">
                      {[
                        "Direct contact",
                        "Dust inhalation",
                        "Leaching to groundwater",
                        "Gas migration",
                        "Crop uptake",
                      ].map((p) => (
                        <span
                          key={p}
                          className="text-[8px] sm:text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow down */}
                <div className="flex justify-center mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-[2px] h-6 bg-emerald-400/50" />
                    <span className="text-emerald-400 text-sm">&darr;</span>
                  </div>
                </div>

                {/* Receptor row */}
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  <div className="flex-1 border-2 border-blue-400/50 bg-blue-500/10 rounded-lg p-3 text-center">
                    <span className="text-[10px] sm:text-xs font-bold text-blue-400 block">
                      RECEPTOR
                    </span>
                    <span className="text-[9px] text-white/60 block mt-1">
                      Target that could suffer significant harm
                    </span>
                    <div className="mt-2 flex flex-wrap justify-center gap-1">
                      {[
                        "Human health",
                        "Controlled waters",
                        "Ecosystems",
                        "Property",
                        "Crops/livestock",
                      ].map((r) => (
                        <span
                          key={r}
                          className="text-[8px] sm:text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key rule */}
                <div className="mt-5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                  <p className="text-[10px] sm:text-xs text-emerald-300 font-medium">
                    All three elements must be present and connected for a
                    pollutant linkage to exist
                  </p>
                  <p className="text-[9px] text-white/50 mt-1">
                    Remove any one element (e.g. break the pathway) and the
                    linkage is broken &mdash; this is the basis of remediation
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded border-2 border-red-400/50 bg-red-500/10" />
                  <span className="text-[9px] text-white/50">Source</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded border-2 border-amber-400/50 bg-amber-500/10" />
                  <span className="text-[9px] text-white/50">Pathway</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded border-2 border-blue-400/50 bg-blue-500/10" />
                  <span className="text-[9px] text-white/50">Receptor</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Remediation Strategies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">05</span>
            Remediation Strategies
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Remediation is the process of treating or managing contaminated
                land to make it suitable for its intended use. The choice of
                strategy depends on the type and extent of contamination, the
                proposed land use, cost, timescale, and{" "}
                <strong>sustainability</strong>. Modern practice strongly
                favours approaches that treat contamination in place rather than
                simply moving it to landfill.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Dig and Dump (Least Sustainable)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Excavation of contaminated soil and transport off-site to
                      a licensed landfill for disposal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Quick and provides certainty, but{" "}
                      <strong className="text-white">
                        merely moves the problem
                      </strong>{" "}
                      to another location
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      High cost due to landfill tax (over &pound;100/tonne for
                      hazardous waste), transport, and replacement clean fill
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Generates significant HGV traffic and associated carbon
                      emissions
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  In-Situ Treatment (Treating Soil in Place)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Bioremediation:</strong>{" "}
                      Uses micro-organisms to biologically break down organic
                      contaminants (hydrocarbons, solvents). Can be enhanced by
                      adding nutrients or oxygen to the ground.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Chemical oxidation:
                      </strong>{" "}
                      Injection of oxidising agents (e.g. permanganate,
                      persulphate, Fenton&rsquo;s reagent) into the ground to
                      chemically destroy organic contaminants in soil and
                      groundwater.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stabilisation:</strong>{" "}
                      Mixing contaminated soil with binding agents (e.g. cement,
                      pozzolanic materials) to immobilise contaminants and
                      reduce leachability. Does not destroy the contaminant but
                      breaks the pathway.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Ex-Situ Treatment (Excavate, Treat, and Return)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Soil washing:</strong>{" "}
                      Excavated soil is washed with water or chemical solutions
                      to physically separate contaminants from the soil
                      particles. The clean fraction is returned to site; the
                      contaminated fraction (typically fine material) is
                      disposed of.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Biopiles and windrows:
                      </strong>{" "}
                      Excavated soil is formed into heaps or rows and treated
                      biologically on site. Nutrients, water, and air are
                      managed to optimise microbial breakdown of organic
                      contaminants.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Thermal treatment:
                      </strong>{" "}
                      Heating contaminated soil to high temperatures to
                      volatilise or destroy organic contaminants. Effective but
                      energy-intensive and expensive.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Containment (Capping and Barriers)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Capping:</strong> Placing a
                      physical barrier (e.g. clean soil, clay, geomembrane,
                      hardstanding) over the contaminated land to break the
                      pathway between source and receptor. Common under car
                      parks, roads, and landscaped areas.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Vertical barriers:
                      </strong>{" "}
                      Slurry walls, sheet piling, or grouted curtains installed
                      around contaminated zones to prevent lateral migration of
                      contaminants in groundwater.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Gas protection measures:
                      </strong>{" "}
                      Gas-resistant membranes and ventilation systems installed
                      beneath buildings to prevent ground gas ingress. Required
                      where gas risk assessments indicate a risk.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram: Remediation Options Comparison Grid */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">
              &nbsp;
            </span>
            Remediation Options Comparison
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="bg-[#111] border-2 border-emerald-500/40 rounded-xl p-4 sm:p-6 overflow-x-auto">
              <p className="text-xs text-emerald-400 font-semibold mb-4 text-center tracking-widest uppercase">
                Comparison of Key Remediation Approaches
              </p>

              <div className="min-w-[320px] space-y-3">
                {/* Header */}
                <div className="grid grid-cols-5 gap-2 text-center">
                  <div className="text-[9px] sm:text-[10px] text-white/50 font-semibold">
                    Method
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/50 font-semibold">
                    Sustainability
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/50 font-semibold">
                    Cost
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/50 font-semibold">
                    Speed
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/50 font-semibold">
                    Treats Contaminant?
                  </div>
                </div>

                {/* Dig & Dump */}
                <div className="grid grid-cols-5 gap-2 items-center bg-red-500/5 border border-red-500/20 rounded-lg p-2">
                  <div className="text-[9px] sm:text-[10px] text-white font-medium text-center">
                    Dig &amp; Dump
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">
                      Low
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">
                      High
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">
                      Fast
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">
                      No
                    </span>
                  </div>
                </div>

                {/* Bioremediation */}
                <div className="grid grid-cols-5 gap-2 items-center bg-green-500/5 border border-green-500/20 rounded-lg p-2">
                  <div className="text-[9px] sm:text-[10px] text-white font-medium text-center">
                    Bioremediation
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">
                      High
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">
                      Low
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                      Slow
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">
                      Yes
                    </span>
                  </div>
                </div>

                {/* Chemical Oxidation */}
                <div className="grid grid-cols-5 gap-2 items-center bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-2">
                  <div className="text-[9px] sm:text-[10px] text-white font-medium text-center">
                    Chemical Oxidation
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                      Medium&ndash;High
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                      Medium
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                      Medium
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">
                      Yes
                    </span>
                  </div>
                </div>

                {/* Soil Washing */}
                <div className="grid grid-cols-5 gap-2 items-center bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-2">
                  <div className="text-[9px] sm:text-[10px] text-white font-medium text-center">
                    Soil Washing
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                      Medium
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                      Medium
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                      Medium
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                      Separates
                    </span>
                  </div>
                </div>

                {/* Containment */}
                <div className="grid grid-cols-5 gap-2 items-center bg-amber-500/5 border border-amber-500/20 rounded-lg p-2">
                  <div className="text-[9px] sm:text-[10px] text-white font-medium text-center">
                    Containment
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                      Medium
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">
                      Low&ndash;Med
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">
                      Fast
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">
                      No (breaks pathway)
                    </span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                <p className="text-[10px] sm:text-xs text-emerald-300 font-medium">
                  Best practice: Use the most sustainable method appropriate for
                  the site conditions and proposed land use
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Materials Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">06</span>
            Materials Management
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most significant cost and sustainability drivers in
                contaminated land development is the management of excavated
                materials. The{" "}
                <strong>
                  CL:AIRE Definition of Waste: Development Industry Code of
                  Practice (DoW CoP)
                </strong>{" "}
                provides a framework that can save developers enormous sums by
                enabling the re-use of suitable materials without classifying
                them as waste.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The CL:AIRE DoW Code of Practice
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Enables excavated materials to be{" "}
                      <strong className="text-white">
                        re-used on the development site
                      </strong>{" "}
                      (or moved between sites) without entering the waste
                      management regime
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Materials must be demonstrated to be{" "}
                      <strong className="text-white">
                        suitable for their intended use
                      </strong>{" "}
                      &mdash; not contaminated beyond acceptable levels for the
                      proposed end use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Avoids materials being classified as waste, which would
                      require a waste management licence or environmental permit
                      to handle, store, and move
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Materials Management Plan (MMP)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Prepared by a{" "}
                      <strong className="text-white">qualified person</strong>{" "}
                      (typically the environmental consultant) in accordance
                      with the DoW CoP
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Describes the materials to be re-used, their chemical and
                      geotechnical properties, and the proposed end use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Includes a{" "}
                      <strong className="text-white">tracking system</strong>{" "}
                      to record where materials are placed on site and verify
                      suitability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      A{" "}
                      <strong className="text-white">
                        declaration
                      </strong>{" "}
                      is submitted to CL:AIRE confirming compliance with the
                      Code of Practice
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Financial Benefits
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Landfill tax saved:</strong>{" "}
                      Currently over &pound;100 per tonne for hazardous waste
                      and over &pound;100 per tonne for non-hazardous waste
                      &mdash; on a large site this can amount to hundreds of
                      thousands of pounds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Transport costs saved:
                      </strong>{" "}
                      No need for HGV movements to and from landfill, plus
                      no need to import clean replacement fill
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Carbon reduction:
                      </strong>{" "}
                      Fewer vehicle movements mean lower carbon emissions from
                      the project
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Key Point:</strong> The
                  CL:AIRE DoW CoP does{" "}
                  <strong>not</strong> allow contaminated waste to be dumped on
                  site and called &ldquo;re-use&rdquo;. Materials must
                  genuinely be{" "}
                  <strong>
                    suitable for their intended use
                  </strong>{" "}
                  and this must be demonstrated through chemical testing and
                  documented in the MMP. The process is audited and the
                  qualified person takes professional responsibility for the
                  declaration.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Groundwater Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">07</span>
            Groundwater Protection
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Groundwater is a vital resource for public water supply,
                agriculture, and ecosystems. Contaminated land can pose a
                serious threat to groundwater quality if contaminants leach
                from the soil into underlying aquifers. The{" "}
                <strong>Environment Agency</strong> is responsible for
                protecting groundwater in England and publishes detailed
                guidance on contaminated land and groundwater.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Groundwater Vulnerability
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Aquifers are classified as{" "}
                      <strong className="text-white">Principal</strong> (major
                      aquifers providing significant water supply),{" "}
                      <strong className="text-white">Secondary A</strong>{" "}
                      (moderate supply), or{" "}
                      <strong className="text-white">Secondary B</strong>{" "}
                      (limited supply) &mdash; these affect how strictly
                      contamination is controlled
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Vulnerability depends on the soil type, geology, and
                      depth to groundwater &mdash; thin permeable soils over
                      shallow aquifers are{" "}
                      <strong className="text-white">highly vulnerable</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The Environment Agency publishes{" "}
                      <strong className="text-white">
                        groundwater vulnerability maps
                      </strong>{" "}
                      that must be consulted during Phase 1 desk studies
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Source Protection Zones (SPZs)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">SPZ1 (Inner):</strong>{" "}
                      50-day travel time from any point below the water table to
                      the abstraction. The highest level of protection &mdash;
                      many potentially polluting activities are prohibited.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">SPZ2 (Outer):</strong>{" "}
                      400-day travel time. Additional scrutiny applies to
                      development proposals.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        SPZ3 (Total Catchment):
                      </strong>{" "}
                      The entire recharge area from which the abstraction draws
                      water.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Monitoring Wells and Plume Management
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Monitoring wells:
                      </strong>{" "}
                      Small-diameter boreholes with slotted screens at the
                      water table level, allowing regular groundwater sampling
                      to track contaminant concentrations over time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Contaminant plumes:
                      </strong>{" "}
                      When contaminants dissolve into groundwater, they form a
                      plume that migrates in the direction of groundwater flow.
                      Monitoring wells are positioned upgradient, within, and
                      downgradient of the plume to track its extent and
                      movement.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Pump and treat:
                      </strong>{" "}
                      Contaminated groundwater is pumped to the surface, treated
                      (e.g. by activated carbon filtration, air stripping), and
                      either discharged or re-injected. Used for large
                      dissolved-phase plumes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Permeable reactive barriers:
                      </strong>{" "}
                      Trenches filled with reactive media (e.g. zero-valent
                      iron) installed across the path of a contaminant plume.
                      The groundwater passes through the barrier and the
                      contaminants are treated in place.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Groundwater Contamination Is Extremely Difficult to Reverse
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Once contaminants enter an aquifer, remediation is{" "}
                  <strong className="text-white">
                    extremely expensive and can take decades
                  </strong>
                  . Prevention is always far better than cure. This is why the
                  Environment Agency takes such a strict approach to
                  groundwater protection &mdash; particularly in source
                  protection zones where contamination could directly affect
                  public water supplies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Regulatory Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">08</span>
            Regulatory Requirements
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Contaminated land is regulated through a combination of{" "}
                <strong>environmental protection legislation</strong>,{" "}
                <strong>planning conditions</strong>, and{" "}
                <strong>building regulations</strong>. Understanding the
                regulatory framework is essential for anyone involved in
                brownfield development or land remediation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Part IIA &mdash; Contaminated Land Register and Enforcement
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Local authorities maintain a{" "}
                      <strong className="text-white">
                        contaminated land register
                      </strong>{" "}
                      (public register) of all land formally determined as
                      contaminated under Part IIA
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The local authority is the primary regulator for most
                      contaminated land. The Environment Agency regulates{" "}
                      <strong className="text-white">
                        special sites
                      </strong>{" "}
                      (e.g. land contaminated by radioactive substances,
                      Ministry of Defence sites, certain water pollution cases)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The regulator can issue a{" "}
                      <strong className="text-white">
                        remediation notice
                      </strong>{" "}
                      requiring the &ldquo;appropriate person&rdquo; (typically
                      the polluter, or failing that, the current landowner) to
                      carry out remediation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      In practice, most contaminated land is dealt with through
                      the <strong className="text-white">planning system</strong>{" "}
                      rather than Part IIA enforcement, because development
                      triggers investigation and remediation through planning
                      conditions
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Planning Conditions
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      When planning permission is granted for development on
                      potentially contaminated land, the local planning
                      authority typically imposes{" "}
                      <strong className="text-white">
                        contamination-related conditions
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Typical sequence: Phase 1 desk study &rarr; Phase 2
                      intrusive investigation (if needed) &rarr; remediation
                      strategy (if needed) &rarr;{" "}
                      <strong className="text-white">
                        remediation verification report
                      </strong>{" "}
                      (also known as a validation report)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The verification report must demonstrate that the approved
                      remediation has been carried out and the site is now{" "}
                      <strong className="text-white">
                        suitable for its intended use
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Occupation is typically not permitted
                      </strong>{" "}
                      until the verification report has been approved by the
                      local planning authority
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Building Regulations
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Approved Document C (Site Preparation):
                      </strong>{" "}
                      Requires that the ground to be covered by a building
                      shall be reasonably free from material that could damage
                      the building or affect its stability, and that the site
                      is adequately prepared
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Addresses contaminants that could attack building
                      materials (e.g. sulphate attack on concrete, aggressive
                      ground conditions), gas ingress into buildings, and
                      removal of unsuitable fill
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Building control inspectors check that ground conditions
                      have been assessed and, where necessary, appropriate
                      protective measures (e.g. gas membranes, sulphate-resistant
                      concrete) have been installed
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Environmental Permitting Regulations
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Some remediation activities (e.g. soil treatment,
                      operation of mobile treatment plants) may require an{" "}
                      <strong className="text-white">
                        environmental permit
                      </strong>{" "}
                      or a <strong className="text-white">mobile treatment licence</strong> from
                      the Environment Agency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Discharge of treated water (e.g. from pump-and-treat
                      systems) to surface water or sewer requires a discharge
                      permit or trade effluent consent
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Waste removed from site must be handled under{" "}
                      <strong className="text-white">duty of care</strong>{" "}
                      requirements &mdash; waste transfer notes (non-hazardous)
                      or hazardous waste consignment notes, transported by
                      registered waste carriers, and disposed of at appropriately
                      licensed facilities
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">
                    Part IIA vs Planning:
                  </strong>{" "}
                  In practice, the vast majority of contaminated land in
                  England is dealt with through the{" "}
                  <strong>planning system</strong> (conditions imposed on
                  planning permissions) rather than through formal Part IIA
                  determination and enforcement. Part IIA is intended as a{" "}
                  <strong>last resort</strong> for sites where contamination
                  causes unacceptable risks but no development is proposed to
                  trigger investigation through the planning route.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-5">
              Next: Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
